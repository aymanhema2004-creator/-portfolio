/* Portfolio live visitor & like counters; shared across browsers via Supabase RPC.
 * No fabricated totals, no personal information collected, no storage of IP addresses.
 * Browser-local random ID means 'visitors' estimates unique browsers rather than people.
 */
(() => {
  'use strict';
  const config = window.PORTFOLIO_STATS_CONFIG || {};
  const apiBase = String(config.supabaseUrl || '').trim().replace(/\/+$/, '');
  const apiKey = String(config.publishableKey || '').trim();
  const viewsEl = document.getElementById('visitorCount');
  const likesEl = document.getElementById('likeCount');
  const button = document.getElementById('portfolioLikeBtn');
  const buttonLabel = document.getElementById('likeBtnLabel');
  const heartEl = button?.querySelector('.like-heart');
  const status = document.getElementById('metricsStatus');
  if (!viewsEl || !likesEl || !button || !status) return;

  const strings = {
    ar: { title:'تفاعل الزوار', sub:'عدد الزوار والإعجابات على الموقع كله.', views:'زائر', likes:'إعجاب', addLike:'عجبك شغلي؟ دوس لايك', removeLike:'إلغاء الإعجاب', disabled:'فعّل Supabase عشان تظهر الأرقام الحقيقية', loading:'جاري تحميل الإحصائيات...', ready:'عدادات حقيقية • كل الأجهزة', error:'تعذّر الاتصال بالعداد. جرّب تحديث الصفحة.', saving:'جاري تسجيل الإعجاب...' },
    en: { title:'Visitor engagement', sub:'Shared live visitors and likes across the website.', views:'Visitors', likes:'Likes', addLike:'Like this portfolio', removeLike:'Unlike', disabled:'Connect Supabase to enable real counters', loading:'Loading live statistics...', ready:'Live counters • all devices', error:'Counters unavailable. Try refreshing.', saving:'Saving your reaction...' }
  };
  let lang = document.documentElement.lang === 'en' ? 'en' : 'ar';
  let state = { liked:false, connected:false, busy:false, visitors:null, likes:null };
  let visitorId = null;
  let initialized = false;

  function textKey(k){ return strings[lang][k]; }
  function setStatus(kind, msg){ status.className = 'metrics-note' + (kind ? ' '+kind : ''); status.textContent = msg; }
  function updateButton(){
    button.disabled = !state.connected || state.busy;
    button.setAttribute('aria-pressed', String(state.liked));
    buttonLabel.textContent = textKey(state.liked ? 'removeLike' : 'addLike');
    if (heartEl) heartEl.textContent = state.liked ? '♥' : '♡';
  }
  function applyData(data){
    const row = Array.isArray(data) ? data[0] : data;
    if (!row || !Number.isSafeInteger(Number(row.visitors)) || !Number.isSafeInteger(Number(row.likes))) throw new Error('Invalid stats payload');
    state.visitors = Number(row.visitors);
    state.likes = Number(row.likes);
    viewsEl.textContent = state.visitors.toLocaleString(lang === 'ar' ? 'ar-EG' : 'en-US');
    likesEl.textContent = state.likes.toLocaleString(lang === 'ar' ? 'ar-EG' : 'en-US');
    state.liked = row.has_liked === true;
    state.connected = true;
    state.busy = false;
    updateButton();
    setStatus('ready', textKey('ready'));
  }
  function getVisitorId(){
    const storageKey = 'ayman_portfolio_visitor_id_v1';
    try {
      const saved = localStorage.getItem(storageKey);
      if (/^[0-9a-f]{8}-[0-9a-f-]{27,}$/i.test(saved || '')) return saved;
    } catch (_) { /* privacy mode: use ephemeral UUID */ }
    const id = typeof crypto.randomUUID === 'function' ? crypto.randomUUID() : 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, c => { const r=crypto.getRandomValues(new Uint8Array(1))[0] & 15; return (c==='x'?r:(r&3)|8).toString(16); });
    try { localStorage.setItem(storageKey,id); } catch (_) {}
    return id;
  }
  async function callRpc(name,payload,timeout=12000){
    const abort = new AbortController();
    const timeoutId = setTimeout(()=>abort.abort(),timeout);
    const headers = {'Content-Type':'application/json', 'apikey':apiKey, 'Accept':'application/json'};
    // Legacy anon JWT needs a bearer header; modern sb_publishable_ keys do not.
    if (apiKey.split('.').length === 3) headers.Authorization = 'Bearer '+apiKey;
    try {
      const response = await fetch(`${apiBase}/rest/v1/rpc/${name}`, {method:'POST',headers,body:JSON.stringify(payload),signal:abort.signal,cache:'no-store'});
      if (!response.ok) throw new Error('Stats API HTTP '+response.status);
      return await response.json();
    } finally { clearTimeout(timeoutId); }
  }
  function hasValidConfig(){ return /^https:\/\/[a-z0-9-]+\.supabase\.co$/i.test(apiBase) && !!apiKey && !/^(YOUR|PLACEHOLDER)/i.test(apiKey); }
  function translate(){
    const t=strings[lang];
    document.querySelector('[data-t="engagementTitle"]').textContent=t.title;
    document.querySelector('[data-t="engagementSub"]').textContent=t.sub;
    document.querySelector('[data-t="visitorsLabel"]').textContent=t.views;
    document.querySelector('[data-t="likesLabel"]').textContent=t.likes;
    updateButton();
    setStatus(state.connected ? 'ready' : '', textKey(state.connected?'ready': initialized?'error':hasValidConfig()?'loading':'disabled'));
    if (state.visitors !== null) viewsEl.textContent=state.visitors.toLocaleString(lang==='ar'?'ar-EG':'en-US');
    if (state.likes !== null) likesEl.textContent=state.likes.toLocaleString(lang==='ar'?'ar-EG':'en-US');
  }
  window.addEventListener('portfolio:languagechange', e => {lang=e.detail.language==='en'?'en':'ar';translate();});
  button.addEventListener('click', async()=>{
    if (!state.connected || state.busy || !visitorId) return;
    state.busy=true;updateButton();setStatus('',textKey('saving'));
    try{applyData(await callRpc('portfolio_toggle_like',{p_visitor_id:visitorId}));}
    catch(e){console.warn('Portfolio reaction failed',e);state.busy=false;updateButton();setStatus('error',textKey('error'));}
  });
  async function setup(){
    if (!hasValidConfig()){ translate(); return; }
    visitorId = getVisitorId();
    setStatus('',textKey('loading'));
    try { applyData(await callRpc('portfolio_register_visit',{p_visitor_id:visitorId})); }
    catch(e){console.warn('Portfolio visit failed',e);initialized=true;setStatus('error',textKey('error'));}
  }
  translate();
  setup();
  // Visitors and likes change on other devices too, refresh quietly once per minute.
  setInterval(async () => {
    if (!state.connected || state.busy || document.visibilityState !== 'visible') return;
    try { applyData(await callRpc('portfolio_read_stats', {p_visitor_id:visitorId}, 9000)); }
    catch(e){ console.warn('Portfolio stats refresh failed', e); }
  }, 60000);
})();
