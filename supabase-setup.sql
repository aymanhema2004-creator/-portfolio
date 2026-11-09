-- Ayman Ibrahim Portfolio: shared visitor + like counters
-- Run once in a separate Supabase project: SQL Editor > New Query > Run.
-- Each unique browser ID is recorded once; one like per browser ID.
-- Browser IDs are random; no IP addresses, emails, or phone numbers are collected.
-- IMPORTANT: Do not put service_role / secret keys in frontend code.

CREATE TABLE IF NOT EXISTS public.portfolio_statistics (
    id smallint PRIMARY KEY DEFAULT 1 CHECK (id = 1),
    unique_visitors bigint NOT NULL DEFAULT 0 CHECK (unique_visitors >= 0),
    total_likes bigint NOT NULL DEFAULT 0 CHECK (total_likes >= 0)
);

CREATE TABLE IF NOT EXISTS public.portfolio_visitors (
    visitor_id uuid PRIMARY KEY,
    liked boolean NOT NULL DEFAULT false,
    first_seen timestamptz NOT NULL DEFAULT now()
);

-- Rows cannot be read/written directly by public API keys.
ALTER TABLE public.portfolio_statistics ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.portfolio_visitors ENABLE ROW LEVEL SECURITY;
REVOKE ALL ON public.portfolio_statistics FROM PUBLIC, anon, authenticated;
REVOKE ALL ON public.portfolio_visitors FROM PUBLIC, anon, authenticated;

INSERT INTO public.portfolio_statistics(id) VALUES (1) ON CONFLICT (id) DO NOTHING;

-- Register unique browsers, atomically. Returns public totals + current visitor's like state.
CREATE OR REPLACE FUNCTION public.portfolio_register_visit(p_visitor_id uuid)
RETURNS TABLE(visitors bigint, likes bigint, has_liked boolean)
LANGUAGE plpgsql SECURITY DEFINER SET search_path = ''
AS $$
DECLARE inserted_count integer;
BEGIN
    IF p_visitor_id IS NULL THEN
        RAISE EXCEPTION 'Visitor ID is required';
    END IF;

    INSERT INTO public.portfolio_visitors(visitor_id)
    VALUES (p_visitor_id)
    ON CONFLICT (visitor_id) DO NOTHING;
    GET DIAGNOSTICS inserted_count = ROW_COUNT;

    IF inserted_count = 1 THEN
        UPDATE public.portfolio_statistics s
           SET unique_visitors = s.unique_visitors + 1
         WHERE s.id = 1;
    END IF;

    RETURN QUERY
    SELECT s.unique_visitors, s.total_likes,
           COALESCE((SELECT v.liked FROM public.portfolio_visitors v
                     WHERE v.visitor_id = p_visitor_id), false)
      FROM public.portfolio_statistics s WHERE s.id = 1;
END;
$$;

-- Toggle one like on/off for the registered visitor.
CREATE OR REPLACE FUNCTION public.portfolio_toggle_like(p_visitor_id uuid)
RETURNS TABLE(visitors bigint, likes bigint, has_liked boolean)
LANGUAGE plpgsql SECURITY DEFINER SET search_path = ''
AS $$
DECLARE new_liked boolean;
BEGIN
    IF p_visitor_id IS NULL THEN
        RAISE EXCEPTION 'Visitor ID is required';
    END IF;

    UPDATE public.portfolio_visitors v
       SET liked = NOT v.liked
     WHERE v.visitor_id = p_visitor_id
     RETURNING v.liked INTO new_liked;

    IF NOT FOUND THEN
        RAISE EXCEPTION 'Register visit before reacting';
    END IF;

    UPDATE public.portfolio_statistics s
       SET total_likes = s.total_likes + CASE WHEN new_liked THEN 1 ELSE -1 END
     WHERE s.id = 1;

    RETURN QUERY
    SELECT s.unique_visitors, s.total_likes, new_liked
      FROM public.portfolio_statistics s WHERE s.id = 1;
END;
$$;

-- Read-only refresh without incrementing visitor totals.
CREATE OR REPLACE FUNCTION public.portfolio_read_stats(p_visitor_id uuid)
RETURNS TABLE(visitors bigint, likes bigint, has_liked boolean)
LANGUAGE sql STABLE SECURITY DEFINER SET search_path = ''
AS $$
    SELECT s.unique_visitors, s.total_likes,
           COALESCE((SELECT v.liked FROM public.portfolio_visitors v
                     WHERE v.visitor_id = p_visitor_id), false)
      FROM public.portfolio_statistics s WHERE s.id = 1;
$$;

-- SECURITY DEFINER functions run with their creator's privileges, so grant
-- only these three public counter functions to API roles.
REVOKE ALL ON FUNCTION public.portfolio_register_visit(uuid) FROM PUBLIC, anon, authenticated;
REVOKE ALL ON FUNCTION public.portfolio_toggle_like(uuid) FROM PUBLIC, anon, authenticated;
REVOKE ALL ON FUNCTION public.portfolio_read_stats(uuid) FROM PUBLIC, anon, authenticated;
GRANT EXECUTE ON FUNCTION public.portfolio_register_visit(uuid) TO anon, authenticated;
GRANT EXECUTE ON FUNCTION public.portfolio_toggle_like(uuid) TO anon, authenticated;
GRANT EXECUTE ON FUNCTION public.portfolio_read_stats(uuid) TO anon, authenticated;

-- Deployment note: the counts will start at 0 and are shared among browsers
-- after you enter the Project URL and public publishable/anon key in the config file.
-- These are approximate unique-browser counts, not verified human visitors;
-- clearing site storage can create a new visitor ID.
