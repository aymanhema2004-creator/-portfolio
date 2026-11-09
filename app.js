'use strict';

// Two complete image galleries. Academy files are real user-provided screenshots;
// Nexora images are generated concept mockups (clearly labeled throughout the site).
const galleries = {
  academy: {
    name: 'Mr. Ayman Academy',
    images: ['assets/1.PNG', 'assets/2.PNG', 'assets/3.PNG', 'assets/4.PNG'],
    ar: ['الواجهة الرئيسية', 'استكشاف الكورسات', 'المجتمع', 'مشاريع الطلاب'],
    en: ['Home dashboard', 'Explore courses', 'Community', 'Student projects'],
    alt: ['Academy home dashboard screenshot', 'Academy course browser screenshot', 'Academy community screenshot', 'Academy student-project gallery screenshot'],
    index: 0
  },
  nexora: {
    name: 'Nexora POS',
    images: ['assets/nexora-dashboard.png', 'assets/nexora-cashier.png', 'assets/nexora-inventory.png', 'assets/nexora-reports.png'],
    ar: ['لوحة التحكم', 'نقطة البيع', 'المنتجات والمخزون', 'التقارير والتحليلات'],
    en: ['Dashboard concept', 'Cashier / POS concept', 'Inventory concept', 'Analytics concept'],
    alt: ['Nexora POS illustrated dashboard concept', 'Nexora POS illustrated cashier concept', 'Nexora POS illustrated inventory concept', 'Nexora POS illustrated analytics concept'],
    index: 0
  }
};

const translations = {
  ar: {
    brandSub: 'Developer Portfolio · معرض الأعمال', navHome: 'الرئيسية', navProjects: 'المشاريع', navServices: 'خدماتي', navSkills: 'المهارات', navAbout: 'عني', navContact: 'تواصل معي',
    welcome: 'أهلاً بيك في عالمي البرمجي', heroDesc: 'بصمّم وبطوّر تطبيقات ومنصات رقمية باستخدام Flutter، وبشرح Python. هدفي أحوّل الأفكار لحلول عملية بواجهات قوية وتجربة استخدام متقنة.',
    viewProjects: 'استكشف مشاريعي', contactBtn: 'تواصل معايا', projectsTitle: 'مشاريعي <span>المميزة</span>', projectsSub: 'مش مجرد صور للواجهات؛ دي أنظمة اشتغلت على تطويرها من الفكرة للتنفيذ.',
    actualImages: 'صور حقيقية من التطبيق', conceptImages: 'تصورات تصميمية للمشروع',
    academyType: 'منصة تعليم برمجة | E-learning Platform', academyDesc: 'منصة تعليمية لتعلّم البرمجة، فيها كورسات ومحاضرات ومجتمع تفاعلي ومشاريع للطلاب، مع لوحة تحكم للمحاضر وإدارة الوصول للمحتوى.',
    academyRelease: 'الإصدارات المنشورة', galleryHint: 'اضغط على الصورة لتكبيرها',
    nexoraType: 'نظام إدارة مبيعات ومخزون | Point of Sale', nexoraDesc: 'تطبيق لإدارة الكاشير والمنتجات والمخزون والفواتير والعملاء والتقارير، مع صلاحيات للموظفين وإعدادات قابلة للتخصيص.',
    nexoraDisclosure: 'الصور مصممة لعرض فكرة وواجهات Nexora POS بصريًا؛ ليست لقطات شاشة من النسخة الفعلية للتطبيق، والأرقام بداخلها تجريبية.',
    servicesTitle: 'خدمات <span>أقدمها</span>', servicesSub: 'حلول برمجية مصممة حسب احتياجات المشروع، من البداية لحد المنتج.',
    service1Title: 'تطبيقات موبايل وسطح مكتب', service1Desc: 'تطوير تطبيقات Flutter بواجهات متجاوبة وتجربة مستخدم سهلة.',
    service2Title: 'أنظمة إدارة الأعمال', service2Desc: 'حلول للمبيعات والمخزون والفواتير والصلاحيات وإدارة العمليات.',
    service3Title: 'منصات ومشاريع تعليمية', service3Desc: 'بناء منصات للكورسات والمحتوى والتواصل بين المتعلمين والمحاضرين.',
    skillsTitle: 'الأدوات <span>والتقنيات</span>', skillsSub: 'التقنيات اللي بستخدمها في مشاريعي.', aboutTitle: 'مين <span>أنا؟</span>',
    aboutDesc: 'أنا أيمن إبراهيم، مطور مهتم ببناء تطبيقات وأنظمة عملية. اشتغلت على منصة Mr. Ayman Academy ونظام Nexora POS، وبشارك شغفي بالبرمجة من خلال تدريس Python. بحب أجمع بين التفكير المنطقي والتصميم الواضح.',
    contactTitle: 'خلينا <span>نبني فكرتك</span> سوا', contactSub: 'عندك فكرة تطبيق أو منصة، أو حابب تتعاون معايا في مشروع؟ دي وسائل التواصل المتاحة.',
    contactNote: 'تقدر تشوف أعمالي على GitHub. هتظهر طرق التواصل المباشر بمجرد إضافة بياناتها.', backToTop: 'فوق',
    whatsappPreferred: 'واتساب هو وسيلة التواصل الأساسية للعملاء', inquiryTitle: 'احكيلي عن مشروعك', inquiryIntro: 'املا التفاصيل دي وهتتفتح رسالة واتساب جاهزة — من غير تسجيل أو إرسال بيانات لموقعنا.', inquiryName: 'اسمك', inquiryType: 'نوع المشروع', inquiryDetails: 'فكرة المشروع', inquiryBudget: 'الميزانية المتوقعة (اختياري)', inquirySend: 'ابعت الطلب على واتساب', inquiryPrivacy: 'المعلومات دي بتتحول لرسالة واتساب عند الضغط على الزر؛ مش بنخزنها على الموقع.', typeMobile: 'تطبيق موبايل', typeDesktop: 'برنامج كمبيوتر', typePOS: 'نظام مبيعات وإدارة', typeLearning: 'منصة تعليمية', typeOther: 'مشروع آخر', namePlace: 'الاسم', detailsPlace: 'احكيلي عايز التطبيق يعمل إيه...', budgetPlace: 'مثلاً 20,000 جنيه', github: 'GitHub', email: 'البريد الإلكتروني', whatsapp: 'واتساب', linkedin: 'LinkedIn', waMessage: 'أهلاً، شوفت البورتفوليو بتاعك وحابب أتكلم معاك بخصوص مشروع.', conceptLabel: 'تصميم توضيحي'
  },
  en: {
    brandSub: 'Developer Portfolio', navHome: 'Home', navProjects: 'Projects', navServices: 'Services', navSkills: 'Skills', navAbout: 'About', navContact: 'Contact',
    welcome: 'Welcome to my world of code', heroDesc: 'I develop Flutter applications and digital platforms, and teach Python. I turn ideas into useful software through clear interfaces, thoughtful design, and practical implementation.',
    viewProjects: 'Explore Projects', contactBtn: 'Contact Me', projectsTitle: 'Featured <span>Projects</span>', projectsSub: 'More than UI previews — real software projects I have developed from concept through implementation.',
    actualImages: 'Actual app screenshots', conceptImages: 'Concept design mockups',
    academyType: 'Programming Education Platform', academyDesc: 'An education platform for programming courses and lessons, with a student community, project showcases, instructor management, and content access control.',
    academyRelease: 'Published Releases', galleryHint: 'Select an image to enlarge',
    nexoraType: 'Point of Sale & Business Management System', nexoraDesc: 'A point-of-sale application for managing checkout, products, inventory, invoices, customers, and reports, with employee permissions and customizable settings.',
    nexoraDisclosure: 'These are illustrative Nexora POS interface concepts, NOT screenshots of the actual application. All numbers shown are sample data.',
    servicesTitle: 'What I <span>Build</span>', servicesSub: 'Software tailored to real project needs, from early planning through delivery.',
    service1Title: 'Mobile & Desktop Apps', service1Desc: 'Flutter applications with responsive interfaces and smooth user experiences.',
    service2Title: 'Business Management Systems', service2Desc: 'Sales, inventory, invoicing, roles, permissions, and operational workflows.',
    service3Title: 'Learning Platforms', service3Desc: 'Courses, learning content, and student–instructor communication.',
    skillsTitle: 'Skills & <span>Technologies</span>', skillsSub: 'Tools and technologies I use in my projects.', aboutTitle: 'About <span>Me</span>',
    aboutDesc: 'I’m Ayman Ibrahim, a developer focused on creating practical software products. I have worked on Mr. Ayman Academy and Nexora POS and teach Python. I enjoy combining problem-solving with clear, user-friendly design.',
    contactTitle: 'Let’s <span>Build Your Idea</span>', contactSub: 'Have an app idea or want to collaborate? Here are the available ways to reach me.',
    contactNote: 'Explore my work on GitHub. Direct contact options will appear once configured.', backToTop: 'Top',
    whatsappPreferred: 'WhatsApp is my preferred way to discuss new projects', inquiryTitle: 'Tell me about your project', inquiryIntro: 'Fill in these details to prepare a WhatsApp message. No registration or server submission is needed.', inquiryName: 'Your name', inquiryType: 'Project type', inquiryDetails: 'Project details', inquiryBudget: 'Estimated budget (optional)', inquirySend: 'Send request on WhatsApp', inquiryPrivacy: 'These details are turned into a WhatsApp message when you click send; this site does not store them.', typeMobile: 'Mobile app', typeDesktop: 'Desktop software', typePOS: 'POS / management system', typeLearning: 'Education platform', typeOther: 'Other project', namePlace: 'Your name', detailsPlace: 'What should your application do?', budgetPlace: 'e.g. EGP 20,000', github: 'GitHub', email: 'Email', whatsapp: 'WhatsApp', linkedin: 'LinkedIn', waMessage: 'Hello! I saw your portfolio and would like to discuss a project.', conceptLabel: 'Illustrative concept'
  }
};

let language = 'ar';
try { language = localStorage.getItem('aymanPortfolioLang') === 'en' ? 'en' : 'ar'; } catch (_) {}
let activeModalGallery = null;
let previousFocus = null;
const lightbox = document.getElementById('lightbox');
const lightboxImage = document.getElementById('lightboxImage');

function updateGallery(key) {
  const data = galleries[key];
  const root = document.querySelector(`[data-gallery="${key}"]`);
  if (!root) return;
  const picture = root.querySelector('.main-picture img');
  picture.src = data.images[data.index];
  picture.alt = data.alt[data.index];
  root.querySelector('.current-count').textContent = String(data.index + 1).padStart(2, '0');
  root.querySelector('.slide-name').textContent = data[language][data.index];
  root.querySelectorAll('.thumbnail').forEach((el, i) => {
    el.classList.toggle('active', i === data.index);
    el.setAttribute('aria-pressed', i === data.index ? 'true' : 'false');
  });
  if (activeModalGallery === key) updateLightbox();
}
function navigateGallery(key, direction) {
  const data = galleries[key];
  data.index = (data.index + direction + data.images.length) % data.images.length;
  updateGallery(key);
}
function initGalleries() {
  document.querySelectorAll('[data-gallery]').forEach(root => {
    const key = root.dataset.gallery;
    const data = galleries[key];
    const thumbs = root.querySelector('.thumbnail-strip');
    data.images.forEach((path, i) => {
      const button = document.createElement('button');
      button.type = 'button'; button.className = 'thumbnail';
      button.setAttribute('aria-label', `Image ${i + 1} - ${data.name}`);
      button.innerHTML = `<img src="${path}" alt="" loading="lazy">`;
      button.addEventListener('click', () => { data.index = i; updateGallery(key); });
      thumbs.appendChild(button);
    });
    root.querySelector('[data-nav="prev"]').addEventListener('click', () => navigateGallery(key, -1));
    root.querySelector('[data-nav="next"]').addEventListener('click', () => navigateGallery(key, 1));
    root.querySelector('.main-picture').addEventListener('click', () => openLightbox(key));
    let touchStartX = 0;
    root.querySelector('.main-picture').addEventListener('touchstart', e => { touchStartX = e.changedTouches[0].screenX; }, {passive: true});
    root.querySelector('.main-picture').addEventListener('touchend', e => {
      const delta = e.changedTouches[0].screenX - touchStartX;
      if (Math.abs(delta) > 45) navigateGallery(key, delta < 0 ? 1 : -1);
    }, {passive: true});
    updateGallery(key);
  });
}
function updateLightbox() {
  if (!activeModalGallery) return;
  const data = galleries[activeModalGallery];
  lightboxImage.src = data.images[data.index];
  lightboxImage.alt = data.alt[data.index];
  document.getElementById('lightboxHeading').textContent = `${data.name} · ${String(data.index + 1).padStart(2, '0')} / 04`;
  document.getElementById('lightboxCaption').textContent = `${data[language][data.index]}${activeModalGallery === 'nexora' ? ' · ' + translations[language].conceptLabel : ''}`;
}
function openLightbox(key) {
  previousFocus = document.activeElement;
  activeModalGallery = key;
  updateLightbox();
  lightbox.classList.add('open');
  lightbox.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';
  document.getElementById('lightboxClose').focus();
}
function closeLightbox() {
  activeModalGallery = null;
  lightbox.classList.remove('open');
  lightbox.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
  if (previousFocus?.focus) previousFocus.focus();
}
document.getElementById('lightboxClose').addEventListener('click', closeLightbox);
document.querySelector('[data-dismiss="true"]').addEventListener('click', closeLightbox);
document.getElementById('lightboxPrev').addEventListener('click', () => activeModalGallery && navigateGallery(activeModalGallery, -1));
document.getElementById('lightboxNext').addEventListener('click', () => activeModalGallery && navigateGallery(activeModalGallery, 1));
document.addEventListener('keydown', e => {
  if (activeModalGallery) {
    if (e.key === 'Escape') closeLightbox();
    else if (e.key === 'ArrowRight') navigateGallery(activeModalGallery, 1);
    else if (e.key === 'ArrowLeft') navigateGallery(activeModalGallery, -1);
    else if (e.key === 'Tab') {
      const actions = [...lightbox.querySelectorAll('button')];
      const first = actions[0], last = actions[actions.length - 1];
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
    }
  }
});

function createContactLink(href, icon, label, caption = '', isPrimary = false) {
  const a = document.createElement('a');
  a.className = 'contact-link' + (isPrimary ? ' contact-link-primary' : '');
  a.href = href;
  if (isPrimary) a.setAttribute('aria-label', label + ' — preferred contact');
  const iconEl = document.createElement('span');
  iconEl.className = 'contact-icon'; iconEl.textContent = icon;
  iconEl.setAttribute('aria-hidden', 'true');
  const body = document.createElement('span'); body.className = 'contact-link-body';
  const labelEl = document.createElement('strong'); labelEl.textContent = label;
  body.appendChild(labelEl);
  if (caption) { const cap = document.createElement('small'); cap.textContent = caption; body.appendChild(cap); }
  a.append(iconEl, body);
  if (href.startsWith('https://')) { a.target = '_blank'; a.rel = 'noopener noreferrer'; }
  return a;
}
function validContactPhone() {
  const config = window.PORTFOLIO_CONTACT || {};
  const number = String(config.whatsapp || '').replace(/\D/g, '');
  return /^[1-9][0-9]{7,14}$/.test(number) ? number : '';
}
function renderContact() {
  const config = window.PORTFOLIO_CONTACT || {};
  const t = translations[language];
  const links = document.getElementById('contactLinks');
  links.replaceChildren();
  const phone = validContactPhone();
  const github = String(config.github || '').trim();
  const email = String(config.email || '').trim();
  const linkedin = String(config.linkedin || '').trim();
  // WhatsApp is intentionally listed first, as requested by the portfolio owner.
  if (phone) {
    const message = encodeURIComponent(t.waMessage);
    links.appendChild(createContactLink(`https://wa.me/${phone}?text=${message}`, '✆', t.whatsapp, '+' + phone, true));
  }
  if (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) links.appendChild(createContactLink('mailto:' + email, '✉', t.email, email));
  if (/^https:\/\/github\.com\/[A-Za-z0-9-]+\/?(?:\?.*)?$/i.test(github)) links.appendChild(createContactLink(github, '⌘', t.github, 'aymanhema2004-creator'));
  if (/^https:\/\/(www\.)?linkedin\.com\/in\/[^\s/]+\/?/i.test(linkedin)) links.appendChild(createContactLink(linkedin, 'in', t.linkedin, 'linkedin.com/in/ayman-ibrahim-1b869532b'));
  document.getElementById('contactNote').hidden = !!phone || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  document.getElementById('preferredContact').hidden = !phone;
  document.getElementById('projectInquiry').hidden = !phone;
  const heroContact = document.getElementById('heroContactBtn');
  if (heroContact) {
    heroContact.href = phone ? `https://wa.me/${phone}?text=${encodeURIComponent(t.waMessage)}` : '#contact';
    if (phone) { heroContact.target = '_blank'; heroContact.rel = 'noopener noreferrer'; }
    else { heroContact.removeAttribute('target'); heroContact.removeAttribute('rel'); }
  }
}
// Form does not send data to a server; it prepares a WhatsApp draft in the visitor's own app.
document.getElementById('projectInquiryForm').addEventListener('submit', event => {
  event.preventDefault();
  const phone = validContactPhone();
  if (!phone) return;
  const name = document.getElementById('clientName').value.trim();
  const projectType = document.getElementById('projectType');
  const typeTranslation = translations[language]['type' + ({mobile:'Mobile',desktop:'Desktop',pos:'POS',learning:'Learning',other:'Other'}[projectType.value] || 'Other')];
  const details = document.getElementById('projectDetails').value.trim();
  const budget = document.getElementById('projectBudget').value.trim();
  if (!name || !details) return;
  const parts = language === 'ar'
    ? ['أهلاً أيمن، عايز أستفسر عن تنفيذ مشروع.', `الاسم: ${name}`, `نوع المشروع: ${typeTranslation}`, `التفاصيل: ${details}`]
    : ['Hi Ayman, I would like to discuss a software project.', `Name: ${name}`, `Project type: ${typeTranslation}`, `Details: ${details}`];
  if (budget) parts.push((language === 'ar' ? 'الميزانية المتوقعة: ' : 'Estimated budget: ') + budget);
  const url = `https://wa.me/${phone}?text=${encodeURIComponent(parts.join('\n'))}`;
  window.open(url, '_blank', 'noopener,noreferrer');
});
function setLanguage(nextLanguage) {
  language = nextLanguage;
  const t = translations[language];
  document.documentElement.lang = language;
  document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr';
  document.querySelectorAll('[data-t]').forEach(el => {
    const value = t[el.dataset.t];
    if (value === undefined) return;
    if (['projectsTitle', 'servicesTitle', 'skillsTitle', 'aboutTitle', 'contactTitle'].includes(el.dataset.t)) el.innerHTML = value;
    else el.textContent = value;
  });
  document.getElementById('languageName').textContent = language === 'ar' ? 'English' : 'العربية';
  document.getElementById('languageSwitch').setAttribute('aria-label', language === 'ar' ? 'Switch to English' : 'التبديل إلى العربية');
  Object.keys(galleries).forEach(updateGallery);
  document.querySelectorAll('[data-placeholder]').forEach(el => { const placeholder = t[el.dataset.placeholder]; if (placeholder) el.placeholder = placeholder; });
  renderContact();
  window.dispatchEvent(new CustomEvent('portfolio:languagechange', { detail: { language } }));
  try { localStorage.setItem('aymanPortfolioLang', language); } catch (_) {}
}
document.getElementById('languageSwitch').addEventListener('click', () => setLanguage(language === 'ar' ? 'en' : 'ar'));
const menu = document.getElementById('menuSwitch');
const nav = document.getElementById('nav');
menu.addEventListener('click', () => { const open = nav.classList.toggle('open'); menu.setAttribute('aria-expanded', String(open)); });
nav.querySelectorAll('a').forEach(a => a.addEventListener('click', () => { nav.classList.remove('open'); menu.setAttribute('aria-expanded', 'false'); }));
const sections = [...document.querySelectorAll('main > section[id]')];
if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      nav.querySelectorAll('a').forEach(a => a.classList.toggle('active', a.hash === '#' + entry.target.id));
    });
  }, {rootMargin:'-18% 0px -70% 0px'});
  sections.forEach(section => observer.observe(section));
}
function updateProgress() {
  const max = document.documentElement.scrollHeight - window.innerHeight;
  document.getElementById('readingProgress').style.width = `${max > 0 ? 100 * window.scrollY / max : 0}%`;
}
window.addEventListener('scroll', updateProgress, {passive: true});
window.addEventListener('resize', updateProgress);
document.getElementById('year').textContent = new Date().getFullYear();
if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  const rain = document.getElementById('codeRain');
  const snippets = ['101010110101','flutter run','const app = true;','<StatefulWidget/>','00110010101','python main.py'];
  for (let i = 0; i < 15; i++) {
    const span = document.createElement('span');
    span.className = 'rain-line'; span.textContent = snippets[i % snippets.length];
    span.style.left = `${(i * 7.1 + (i % 3) * 2) % 100}%`;
    span.style.animationDuration = `${17 + (i % 5) * 4}s`;
    span.style.animationDelay = `${-i * 2.1}s`;
    rain.appendChild(span);
  }
}
initGalleries();
setLanguage(language);
updateProgress();
