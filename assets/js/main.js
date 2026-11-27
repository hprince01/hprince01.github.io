/* =====================================================================
   EDIT YOUR CONTENT HERE
   ===================================================================== */
const YT_VIDEO = "xLOtq1KZApM"; // snowfall — Øneheart x reidenshi (the official Topic upload blocks embedding, error 150)
const CONTACT_EMAIL = "hirwaprince20@gmail.com";

const SOCIALS = [
  {name:"GitHub",    handle:"@hprince01",            url:"https://github.com/hprince01", icon:"github"},
  {name:"LinkedIn",  handle:"Hirwa Prince",          url:"https://www.linkedin.com/in/hirwa-prince-95153942a", icon:"linkedin"},
  {name:"Instagram", handle:"@ur_princ.2",           url:"https://instagram.com/ur_princ.2", icon:"instagram"},
  {name:"X",         handle:"@hprince_20",           url:"https://x.com/hprince_20", icon:"x"},
  {name:"TikTok",    handle:"@itskai776",            url:"https://www.tiktok.com/@itskai776", icon:"tiktok"},
  {name:"WhatsApp",  handle:"+250 794 029 490",      url:"https://wa.me/250794029490", icon:"whatsapp"},
];

const STACK = {
  "Frontend": [["React","react"],["Next.js","nextdotjs","fff"],["TypeScript","typescript"],["JavaScript","javascript"],["Tailwind CSS","tailwindcss"]],
  "Backend": [["Node.js","nodedotjs"],["Python","python"],["Express.js","express","fff"],["FastAPI","fastapi"],["REST APIs",null,null,"API"]],
  "AI & Machine Learning": [["TensorFlow","tensorflow"],["PyTorch","pytorch"],["Scikit-learn","scikitlearn"],["NumPy","numpy"],["Pandas","pandas","fff"]],
  "Databases": [["PostgreSQL","postgresql"],["Supabase","supabase"],["MongoDB","mongodb"],["Oracle",null,null,"ORA"]],
  "Cybersecurity & Networking": [["Kali Linux","kalilinux"],["Wireshark","wireshark"],["Nmap",null,null,"NM"],["Cisco","cisco"],["Linux","linux","fff"]],
  "Tools, Cloud & Design": [["Git","git"],["GitHub","github","fff"],["Docker","docker"],["Vercel","vercel","fff"],["AWS",null,null,"AWS"],["Postman","postman"],["Figma","figma"],["Adobe Illustrator",null,null,"Ai","#330000","#FF9A00"],["Adobe Photoshop",null,null,"Ps","#001E36","#31A8FF"]],
};

const CERTS = [
  {title:"Graphic Design Associate", issuer:"insiderOne University", date:"2026-11-25", img:"assets/certs/insiderone-graphic-design.jpg", verify:"https://insiderone.in/c/IO-GRD-EKFJNTWY", tags:["Typography","Layout","Brand Design"]},
  {title:"IT Support Specialist Career Path", issuer:"Cisco Networking Academy", date:"2026-08-22", img:"assets/certs/cisco-it-support.jpg", verify:"https://www.credly.com/badges/5a29de63-4e18-442c-ad70-8a90e4c6a79d", tags:["Troubleshooting","OS Support","Security"]},
  {title:"Introduction to Cybersecurity", issuer:"Cisco Networking Academy", date:"2026-08-17", img:"assets/certs/cisco-intro-cybersecurity.jpg", verify:"https://www.credly.com/badges/fbf1f57a-0653-42d7-81d9-4b48cd73d540", tags:["Cyber Threats","Online Safety"]},
  {title:"Computer Hardware Basics", issuer:"Cisco Networking Academy", date:"2026-07-09", img:"assets/certs/cisco-hardware-basics.jpg", verify:"https://www.credly.com/badges/47cdf624-1d79-497c-bea4-f2ad49304b22", tags:["Hardware","Maintenance"]},
  {title:"Getting Started with AI on Jetson Nano", issuer:"NVIDIA", date:"2026-06-17", img:"assets/certs/nvidia-jetson-nano.jpg", tags:["AI","Edge Computing"]},
  {title:"Career Essentials in Generative AI", issuer:"Microsoft & LinkedIn", date:"2024-08-27", img:"assets/certs/linkedin-microsoft-genai.jpg", tags:["Generative AI","AI Ethics"]},
];

/* ---------- translations (please review the Kinyarwanda) ---------- */
const I18N = {
  en: {
    roles:["Software Developer","Digital Designer","AI & Machine Learning Engineer","Cybersecurity Enthusiast"],
  },
  rw: {
    roles:["Umuhanga mu gukora porogaramu","Umuhanzi w'ibishushanyo by'ikoranabuhanga","Injeniyeri wa AI na Machine Learning","Ukunda umutekano w'ikoranabuhanga"],
    "loader.welcome":"Murakaza neza ku","loader.portfolio":"Rubuga rwanjye","loader.loading":"Birimo gufunguka",
    "loader.enterMusic":"Injira wumva umuziki","loader.enterQuiet":"Injira bucece",
    "nav.home":"Ahabanza","nav.about":"Abo ndi bo","nav.journey":"Urugendo","nav.portfolio":"Ibikorwa","nav.moments":"Ibihe","nav.contact":"Twandikire",
    "hero.location":"Kigali, Rwanda","hero.h1a":"Mpindura ibitekerezo","hero.h1b":"ibihangano bigaragara",
    "hero.lead":"Muraho, nitwa Prince Hirwa Rutagengwa — nkora porogaramu, ibishushanyo by'ikoranabuhanga, ndi injeniyeri wa AI na Machine Learning, kandi nkunda umutekano w'ikoranabuhanga. Nkunda guhindura ibitekerezo ibikorwa by'ikoranabuhanga bifite akamaro.",
    "hero.ctaProjects":"Reba imishinga","hero.ctaContact":"Mvugisha","hero.find":"Aho wansanga",
    "about.kicker":"Abo ndi bo","about.hi":"Muraho, nitwa",
    "about.bio":"Ndi Prince Hirwa, ukunda ikoranabuhanga cyane cyane gukora porogaramu, ibishushanyo by'ikoranabuhanga, ubwenge bw'ubukorano (AI), machine learning n'umutekano w'ikoranabuhanga. Nkunda guhuza ubuhanzi n'ikoranabuhanga kugira ngo nkore ibisubizo bishya, nkemure ibibazo, kandi ntange ubunararibonye bufite agaciro.",
    "about.bio2":"Ntwarwa n'amatsiko, kwiga buri gihe, n'icyifuzo cyo kumenya ikoranabuhanga rishya. Nshyira imbere ubuhanzi, udushya no gukura, kandi buri gihe niteguye guhangana n'imbogamizi nshya no guhindura ibitekerezo ukuri.",
    "about.location":"Aho ntuye","about.email":"Imeri","about.phone":"Telefone","about.languages":"Indimi","about.resume":"Reba CV",
    "stats.tech":"Ikoranabuhanga","stats.certs":"Impamyabushobozi","stats.domains":"Ibice by'ubumenyi","stats.programs":"Amasomo","stats.languages":"Indimi",
    "journey.kicker":"Urugendo rwanjye","journey.title":"Amashuri &","journey.title2":"Uburambe","journey.sub":"Aho niga kandi nkubaka.",
    "journey.edu":"Amashuri","journey.exp":"Uburambe","journey.auca":"BSc Software Engineering","journey.gpa":"GPA 3.88 / 4.00 · Nzarangiza muri 2028","journey.present":"Ubu",
    "journey.insider":"Graphic Design Associate","journey.insiderDate":"Nyakanga – Ugushyingo 2026",
    "journey.role":"Egocentric Data Operator","journey.roleDate":"Kanama 2026 – Ubu",
    "journey.roleDesc":"Gukusanya amashusho afashwe mu jisho ry'umuntu hakoreshejwe kamera zambarwa ku mutwe, hubakwa amakuru yo kwigisha no kugerageza za AI na robo.",
    "journey.alevel":"A-Level · Imibare, Ubugenge na Mudasobwa (MPC)","journey.olevel":"Icyiciro rusange (O-Level)","journey.ctf":"Amarushanwa y'umutekano w'ikoranabuhanga","journey.ctfRole":"Umunyamuryango w'itsinda","journey.ctfDesc":"Gukemura ibibazo by'umutekano mu itsinda, mu gihe gito.","journey.collab":"Imishinga ya porogaramu dufatanya","journey.collabDesc":"Gukora porogaramu mu matsinda, gutegura imirimo no kuyirangiza hamwe.",
    "portfolio.kicker":"Ibikorwa byanjye","portfolio.title":"Ibyo","portfolio.title2":"nkora n'ibyo nkoresha","portfolio.sub":"Imishinga, ikoranabuhanga nkoresha, n'impamyabushobozi.",
    "portfolio.projects":"Imishinga","portfolio.stack":"Ikoranabuhanga","portfolio.certs":"Impamyabushobozi",
    "projects.agri":"Urubuga rw'ubucuruzi ruhuza abahinzi n'abaguzi babo.","projects.code":"Reba code",
    "projects.soma":"AI isoma amakuru mu Kinyarwanda ikamenya insanganyamatsiko yayo, ikagaragaza amagambo yatumye ifata icyemezo. Yigishijwe muri Python inkuru 21,268 zo mu bitangazamakuru byo mu Rwanda, igereranywa n'izindi moderi, igeragezwa ku mbuga z'amakuru itigeze ibona, kandi ikorera muri browser yose.","projects.somaKind":"AI · Ururimi","projects.xss":"Laboratwari ikoreshwa mu mutekano: yerekana uko stored XSS ikora. Ohereza payload itagira ingaruka, urebe uko ibikwa n'uko ikora muri browser y'undi muntu, hanyuma uyihagarike ukoresheje output encoding, sanitizer cyangwa Content-Security-Policy.","projects.xssKind":"Umutekano","projects.gt":"Inkuru ya sinema ikurikira uko umanura urupapuro na 3D nzima yubaha BMW M4, ivanze n'amafoto n'amashusho y'imodoka yanjye ya BMW y'umukara. Amatara yaka, ifoto ya drone irahindukira, imodoka ya 3D ikazenguruka uko umanura. Umushinga w'umufana, utari uwa BMW.","projects.gtKind":"3D web","projects.gtCta":"Fungura","projects.umucyo":"Ikirango cy'igitekerezo cy'akabari k'ikawa i Kigali: ikirango cy'izuba rimeze nk'akabuto k'ikawa, amabara akomoka ku butaka bw'ibirunga n'imisozi itoshye, ishusho ishingiye ku migongo, n'ingero kuva ku gikombe kugeza ku iduka.","projects.poster":"Igikoresho cy'ubuhanzi gishushanya ama-poster hakoreshejwe code. Hitamo uburyo butanu n'amabara, uvange, wongereho inyandiko yawe hanyuma ubike PNG ya 2160 px.","projects.caseStudy":"Reba inyigo","projects.tryIt":"Gerageza","projects.brandKind":"Ikirango","projects.toolKind":"Creative coding",
    "projects.soonTitle":"Ibindi biva muri Kai Labs","projects.soon":"Imishinga mishya muri AI, ibishushanyo n'umutekano iraje. Nkurikira kuri GitHub.",
    "certs.empty":"Impamyabushobozi ziraza vuba.",
    "moments.kicker":"Hanze ya mudasobwa","moments.title":"Ibihe &","moments.title2":"Ibirori","moments.sub":"Ibirori, imiryango n'ahantu bigira uruhare mu rugendo rwanjye.",
    "moments.f1":"Formula 1 Grand Prix · Visit Rwanda","moments.globx":"Odoo for All · igikorwa cy'ikoranabuhanga","moments.learning":"Kwiga","moments.audience":"Muri Odoo for All","moments.style":"Imyambarire, umuco n'ibirori",
    "contact.kicker":"Twandikire","contact.title":"Reka","contact.title2":"dukorane","contact.sub":"Ufite umushinga, igitekerezo cyangwa ushaka kunsuhuza? Nkwandikire.",
    "contact.formTitle":"Ohereza ubutumwa","contact.formSub":"Nzagusubiza vuba bishoboka.",
    "form.name":"Izina ryawe","form.email":"Imeri yawe","form.message":"Ubutumwa","form.send":"Ohereza ubutumwa",
    "wall.title":"Urukuta rw'ibitekerezo","wall.sub":"Siga ubutumwa, igitekerezo cyangwa indamukanyo.","wall.comment":"Igitekerezo","wall.post":"Ohereza igitekerezo",
    "footer.made":"Byakorewe i Kigali","music.now":"Indirimbo y'umunsi",
  },
  msg:{
    en:{sending:"Sending…",issued:"Issued",verify:"Verify",sent:"Thanks! Your message was sent.",fail:"Couldn't send right now — email me directly at ",invalid:"Please fill in every field with a valid email.",empty:"No comments yet — be the first!",local:"Comments are saved in this browser for now."},
    rw:{sending:"Birimo koherezwa…",issued:"Yatanzwe",verify:"Genzura",sent:"Murakoze! Ubutumwa bwanyu bwoherejwe.",fail:"Ntibyakunze ubu — nyandikira kuri ",invalid:"Uzuza ibisabwa byose ukoresheje imeri nyayo.",empty:"Nta gitekerezo kiraboneka — ba uwa mbere!",local:"Ibitekerezo bibikwa muri iyi browser by'agateganyo."}
  }
};

/* =====================================================================
   APP
   ===================================================================== */
const $ = (s, el=document) => el.querySelector(s);
const $$ = (s, el=document) => [...el.querySelectorAll(s)];
const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
const hasGSAP = typeof window.gsap !== 'undefined';
$('#year').textContent = new Date().getFullYear();

/* ---------- icons ---------- */
const ICONS = {
  github:'<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 .5a12 12 0 0 0-3.8 23.4c.6.1.8-.3.8-.6v-2c-3.3.7-4-1.6-4-1.6-.6-1.4-1.4-1.8-1.4-1.8-1-.7.1-.7.1-.7 1.2.1 1.8 1.2 1.8 1.2 1 1.8 2.8 1.3 3.5 1 .1-.8.4-1.3.7-1.6-2.7-.3-5.5-1.3-5.5-6 0-1.2.5-2.3 1.2-3.1-.1-.4-.5-1.6.1-3.2 0 0 1-.3 3.3 1.2a11.5 11.5 0 0 1 6 0C17.3 4.7 18.3 5 18.3 5c.6 1.6.2 2.8.1 3.2.8.8 1.2 1.9 1.2 3.1 0 4.6-2.8 5.6-5.5 5.9.4.4.8 1.1.8 2.2v3.3c0 .3.2.7.8.6A12 12 0 0 0 12 .5z"/></svg>',
  linkedin:'<svg viewBox="0 0 24 24" fill="currentColor"><path d="M20.4 20.5h-3.6v-5.6c0-1.3 0-3-1.8-3s-2.1 1.4-2.1 2.9v5.7H9.4V9h3.4v1.6h.1c.5-.9 1.6-1.8 3.4-1.8 3.6 0 4.3 2.4 4.3 5.5v6.2zM5.3 7.4a2.1 2.1 0 1 1 0-4.2 2.1 2.1 0 0 1 0 4.2zM7.1 20.5H3.6V9h3.5v11.5zM22.2 0H1.8C.8 0 0 .8 0 1.7v20.6c0 .9.8 1.7 1.8 1.7h20.4c1 0 1.8-.8 1.8-1.7V1.7C24 .8 23.2 0 22.2 0z"/></svg>',
  instagram:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="2" width="20" height="20" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1" fill="currentColor"/></svg>',
  x:'<svg viewBox="0 0 24 24" fill="currentColor"><path d="M18.2 2.3h3.4l-7.4 8.4 8.7 11.5h-6.8l-5.3-7-6.1 7H1.3l7.9-9L.9 2.3h7l4.8 6.3 5.5-6.3zm-1.2 17.9h1.9L7 4.2H5z"/></svg>',
  tiktok:'<svg viewBox="0 0 24 24" fill="currentColor"><path d="M16.6 5.8A4.3 4.3 0 0 1 15.5 3h-3.1v12.4a2.6 2.6 0 1 1-1.8-2.5V9.7a5.7 5.7 0 1 0 4.9 5.7V9.1a7.3 7.3 0 0 0 4.3 1.4V7.4a4.3 4.3 0 0 1-3.2-1.6z"/></svg>',
  whatsapp:'<svg viewBox="0 0 24 24" fill="currentColor"><path d="M17.5 14.4c-.3-.1-1.8-.9-2-1-.3-.1-.5-.1-.7.1l-.9 1.2c-.2.2-.3.2-.6.1-1.6-.8-2.7-1.4-3.7-3.2-.3-.5.3-.4.8-1.4.1-.2 0-.3 0-.5l-.9-2.2c-.2-.6-.5-.5-.7-.5h-.6c-.2 0-.5.1-.8.4-.3.3-1 1-1 2.5s1.1 2.9 1.2 3.1c.1.2 2.1 3.2 5.1 4.5 1.9.8 2.6.9 3.6.7.6-.1 1.8-.7 2-1.4.3-.7.3-1.3.2-1.4-.1-.1-.3-.2-.6-.3zM12 21.8c-1.8 0-3.5-.5-5-1.4l-.4-.2-3.7 1 1-3.6-.2-.4A9.8 9.8 0 1 1 12 21.8zM20.5 3.5A11.8 11.8 0 0 0 1.8 17.8L.2 24l6.3-1.7A11.8 11.8 0 0 0 24 12c0-3.2-1.2-6.2-3.5-8.5z"/></svg>',
  mail:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 6-10 7L2 6"/></svg>',
};

/* ---------- socials ---------- */
const heroSoc = $('#heroSocials');
SOCIALS.slice(0,5).forEach(s => heroSoc.insertAdjacentHTML('beforeend',
  `<a class="icon-btn" href="${s.url}" target="_blank" rel="noopener" aria-label="${s.name}">${ICONS[s.icon]}</a>`));
const find = $('#findMe');
[...SOCIALS, {name:"Email",handle:CONTACT_EMAIL,url:"mailto:"+CONTACT_EMAIL,icon:"mail"}].forEach(s => find.insertAdjacentHTML('beforeend',
  `<a href="${s.url}" ${s.url.startsWith('http')?'target="_blank" rel="noopener"':''}>${ICONS[s.icon]}<div style="min-width:0"><b>${s.name}</b><small>${s.handle}</small></div></a>`));

/* ---------- tech stack ---------- */
const sg = $('#stackGroups');
Object.entries(STACK).forEach(([group, items]) => {
  const tiles = items.map(([label, slug, color, mono, bg, fg]) => {
    const icon = slug
      ? `<img src="https://cdn.simpleicons.org/${slug}${color?'/'+color:''}" alt="" loading="lazy" data-mono="${label.slice(0,2).toUpperCase()}">`
      : `<span class="mono"${bg ? ` style="background:${bg};color:${fg};border:1px solid ${fg}55"` : ""}>${mono}</span>`;
    return `<div class="tile">${icon}<span>${label}</span></div>`;
  }).join('');
  sg.insertAdjacentHTML('beforeend', `<div class="stack-group glass"><h4>${group}</h4><div class="tiles">${tiles}</div></div>`);
});
$$('.tile img').forEach(img => img.addEventListener('error', () => {
  const m = document.createElement('span'); m.className='mono'; m.textContent=img.dataset.mono; img.replaceWith(m);
}));

/* ---------- certificates + viewer ---------- */
$('#certCount').dataset.count = CERTS.length;
const fmtDate = d => new Date(d + 'T12:00:00').toLocaleDateString(lang==='rw'?'rw-RW':'en-GB', {month:'short', year:'numeric'});
function renderCerts(){
  const M = I18N.msg[lang];
  $('#certGrid').innerHTML = CERTS.map((c, i) => `
    <article class="cert glass">
      <button class="cert-thumb" data-cert="${i}" aria-label="View ${c.title} certificate">
        <img src="${c.img}" alt="${c.title} certificate from ${c.issuer}" loading="lazy">
        <span class="zoom" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="11" cy="11" r="7"/><path d="m21 21-4.3-4.3M11 8v6M8 11h6"/></svg></span>
      </button>
      <div class="cert-body">
        <span class="cert-issuer">${c.issuer}</span>
        <h4>${c.title}</h4>
        <div class="tags">${c.tags.map(t => `<span>${t}</span>`).join('')}</div>
        <div class="cert-foot"><span>${M.issued} ${fmtDate(c.date)}</span>${c.verify ? `<a href="${c.verify}" target="_blank" rel="noopener">${M.verify} ↗</a>` : ''}</div>
      </div>
    </article>`).join('');
}
const viewer = $('#viewer'); let vIdx = 0;
function showCert(i){
  vIdx = (i + CERTS.length) % CERTS.length; const c = CERTS[vIdx], M = I18N.msg[lang], v = $('#vVerify');
  $('#vImg').src = c.img; $('#vImg').alt = `${c.title} certificate from ${c.issuer}`;
  $('#vTitle').textContent = c.title; $('#vMeta').textContent = `${c.issuer} · ${M.issued} ${fmtDate(c.date)}`;
  v.hidden = !c.verify; if (c.verify){ v.href = c.verify; v.textContent = M.verify + ' ↗'; }
}
$('#certGrid').addEventListener('click', e => { const b = e.target.closest('[data-cert]'); if (b){ showCert(+b.dataset.cert); viewer.showModal(); } });
$('#vClose').addEventListener('click', () => viewer.close());
$('#vPrev').addEventListener('click', () => showCert(vIdx - 1));
$('#vNext').addEventListener('click', () => showCert(vIdx + 1));
viewer.addEventListener('click', e => { if (e.target === viewer) viewer.close(); });
viewer.addEventListener('keydown', e => { if (e.key === 'ArrowLeft') showCert(vIdx - 1); if (e.key === 'ArrowRight') showCert(vIdx + 1); });

/* ---------- tabs ---------- */
const tabs = $$('[role="tab"]');
function selectTab(t){
  tabs.forEach(x => { const on = x===t; x.setAttribute('aria-selected',on); x.tabIndex = on?0:-1; $('#'+x.getAttribute('aria-controls')).hidden = !on; });
  const panel = $('#'+t.getAttribute('aria-controls'));
  if (hasGSAP && !reduce) gsap.fromTo(panel.querySelectorAll('.project,.stack-group,.cert'),{y:24,opacity:0},{y:0,opacity:1,stagger:.06,duration:.6,ease:'power3.out'});
  if (window.ScrollTrigger) ScrollTrigger.refresh();
}
tabs.forEach((t,i) => {
  t.addEventListener('click', () => selectTab(t));
  t.addEventListener('keydown', e => {
    if (e.key==='ArrowRight'||e.key==='ArrowLeft'){ const n = tabs[(i+(e.key==='ArrowRight'?1:-1)+tabs.length)%tabs.length]; n.focus(); selectTab(n); }
  });
});

/* ---------- language ---------- */
const enText = {};
$$('[data-i18n]').forEach(el => enText[el.dataset.i18n] = el.innerHTML);
let lang = localStorage.getItem('kai-lang') || 'en';
function applyLang(l){
  lang = l; localStorage.setItem('kai-lang', l);
  document.documentElement.lang = l;
  $$('[data-i18n]').forEach(el => { const k = el.dataset.i18n; el.innerHTML = (l==='rw' && I18N.rw[k]) ? I18N.rw[k] : enText[k]; });
  $$('.lang button').forEach(b => b.setAttribute('aria-pressed', b.dataset.lang===l));
  roleIdx = 0; renderComments(); renderCerts();
}
$$('.lang button').forEach(b => b.addEventListener('click', () => applyLang(b.dataset.lang)));

/* ---------- typing roles ---------- */
let roleIdx = 0, charIdx = 0, deleting = false;
const roleEl = $('#role');
function typeLoop(){
  const roles = I18N[lang].roles, word = roles[roleIdx % roles.length];
  if (reduce){ roleEl.textContent = roles.join(' · '); return; }
  charIdx += deleting ? -1 : 1;
  roleEl.textContent = word.slice(0, charIdx);
  let wait = deleting ? 35 : 70;
  if (!deleting && charIdx >= word.length){ deleting = true; wait = 1600; }
  else if (deleting && charIdx <= 0){ deleting = false; roleIdx++; wait = 300; }
  setTimeout(typeLoop, wait);
}

/* ---------- nav ---------- */
const nav = $('#nav'), menuBtn = $('#menuBtn');
menuBtn.addEventListener('click', () => { const o = nav.classList.toggle('open'); menuBtn.setAttribute('aria-expanded', o); });
$$('.nav-links a').forEach(a => a.addEventListener('click', () => { nav.classList.remove('open'); menuBtn.setAttribute('aria-expanded', false); }));
const links = $$('.nav-links a');
const io = new IntersectionObserver(entries => entries.forEach(e => {
  if (e.isIntersecting) links.forEach(a => a.classList.toggle('active', a.getAttribute('href')==='#'+e.target.id));
}), {rootMargin:'-45% 0px -50% 0px'});
$$('main section').forEach(s => io.observe(s));

/* ---------- starfield ---------- */
(function stars(){
  const c = $('#stars'), ctx = c.getContext('2d');
  let w, h, dpr, pts = [], shooting = null;
  function size(){
    dpr = Math.min(devicePixelRatio||1, 2); w = innerWidth; h = innerHeight;
    c.width = w*dpr; c.height = h*dpr; ctx.setTransform(dpr,0,0,dpr,0,0);
    const n = Math.round(w*h/5200);
    pts = Array.from({length:n}, () => ({x:Math.random()*w, y:Math.random()*h, r:Math.random()*1.3+.2, a:Math.random(), s:Math.random()*.02+.004, d:Math.random()*.5+.1, hue:Math.random()<.25?265:230}));
  }
  size(); addEventListener('resize', size);
  let scrollY = 0; addEventListener('scroll', () => scrollY = window.scrollY, {passive:true});
  function frame(){
    ctx.clearRect(0,0,w,h);
    for (const p of pts){
      p.a += p.s; const al = .35 + Math.abs(Math.sin(p.a))*.65;
      const y = ((p.y - scrollY*p.d*.15) % h + h) % h;
      ctx.beginPath(); ctx.arc(p.x, y, p.r, 0, 6.283);
      ctx.fillStyle = `hsla(${p.hue},90%,88%,${al})`; ctx.fill();
    }
    if (!shooting && Math.random() < .004) shooting = {x:Math.random()*w*.7+w*.3, y:Math.random()*h*.4, l:0};
    if (shooting){
      shooting.l += 14; const {x,y,l} = shooting;
      const g = ctx.createLinearGradient(x-l, y+l*.45, x-l+120, y+l*.45-54);
      g.addColorStop(0,'rgba(196,181,253,0)'); g.addColorStop(1,'rgba(196,181,253,.9)');
      ctx.strokeStyle = g; ctx.lineWidth = 1.6; ctx.beginPath();
      ctx.moveTo(x-l, y+l*.45); ctx.lineTo(x-l+120, y+l*.45-54); ctx.stroke();
      if (l > w) shooting = null;
    }
    if (!reduce) requestAnimationFrame(frame);
  }
  frame();
})();

/* ---------- lightning (loader) ---------- */
const bolt = $('#bolt'), bctx = bolt.getContext('2d');
function sizeBolt(){ bolt.width = innerWidth; bolt.height = innerHeight; }
sizeBolt(); addEventListener('resize', sizeBolt);
function drawBolt(x0, y0, x1, y1, width, alpha, branch){
  const segs = 22, pts = [[x0,y0]];
  for (let i=1;i<segs;i++){
    const t=i/segs; pts.push([x0+(x1-x0)*t+(Math.random()-.5)*90*(1-t*.3), y0+(y1-y0)*t]);
  }
  pts.push([x1,y1]);
  bctx.shadowColor='#a855f7'; bctx.shadowBlur=28;
  bctx.strokeStyle=`rgba(221,214,254,${alpha})`; bctx.lineWidth=width; bctx.lineJoin='round';
  bctx.beginPath(); pts.forEach(([x,y],i)=> i?bctx.lineTo(x,y):bctx.moveTo(x,y)); bctx.stroke();
  if (branch) for (let k=0;k<3;k++){ const p = pts[4+Math.floor(Math.random()*(segs-8))];
    drawBolt(p[0],p[1],p[0]+(Math.random()-.5)*300,p[1]+Math.random()*200+80,width*.45,alpha*.7,false); }
}
function strike(){
  if (reduce) return;
  sizeBolt();
  const W = bolt.width, H = bolt.height, x = W*(.3+Math.random()*.4);
  bctx.clearRect(0,0,W,H);
  drawBolt(x, -20, x+(Math.random()-.5)*200, H+20, 3, 1, true);
  $('#loader').style.background = 'radial-gradient(circle at 50% 45%,#2a1766 0%,#0a0620 70%)';
  setTimeout(()=>{ bctx.clearRect(0,0,W,H); $('#loader').style.background=''; }, 140);
  setTimeout(()=>{ drawBolt(x, -20, x+(Math.random()-.5)*160, H+20, 2, .6, false); setTimeout(()=>bctx.clearRect(0,0,W,H), 90); }, 200);
}

/* ---------- music (YouTube IFrame API: full song, loops forever) ---------- */
let yt = null, ytReady = false, wantPlay = false;
const music = $('#music'), musicBtn = $('#musicBtn'), musicMore = $('#musicMore');
function setPlaying(on){ music.classList.toggle('playing', on); musicBtn.setAttribute('aria-pressed', on); musicBtn.setAttribute('aria-label', (on ? 'Pause' : 'Play') + ' snowfall by Øneheart and reidenshi'); }
function playMusic(){ wantPlay = true; if (ytReady){ yt.unMute(); yt.setVolume(55); yt.playVideo(); } }
function pauseMusic(){ wantPlay = false; if (ytReady) yt.pauseVideo(); }
window.onYouTubeIframeAPIReady = () => {
  yt = new YT.Player('ytPlayer', {
    videoId: YT_VIDEO, width: '100%', height: '100%',
    playerVars: {loop:1, playlist:YT_VIDEO, playsinline:1, rel:0, modestbranding:1},
    events: {
      onReady: () => { ytReady = true; if (wantPlay) playMusic(); },
      onStateChange: e => {
        if (e.data === YT.PlayerState.PLAYING) setPlaying(true);
        else if (e.data === YT.PlayerState.PAUSED) setPlaying(false);
        else if (e.data === YT.PlayerState.ENDED){ yt.seekTo(0); yt.playVideo(); } // never stop
      }
    }
  });
};
const ytApi = document.createElement('script'); ytApi.src = 'https://www.youtube.com/iframe_api'; document.body.appendChild(ytApi);
musicBtn.addEventListener('click', () => music.classList.contains('playing') ? pauseMusic() : playMusic());
musicMore.addEventListener('click', () => { const o = music.classList.toggle('open'); musicMore.setAttribute('aria-expanded', o); });
document.addEventListener('click', e => { if (!music.contains(e.target)) { music.classList.remove('open'); musicMore.setAttribute('aria-expanded', false); } });

/* ---------- loader ---------- */
function runLoader(){
  const pct = $('#pct'), fill = $('#barFill'); let p = 0;
  const strikes = reduce ? [] : [500, 1500, 2300];
  strikes.forEach(t => setTimeout(strike, t));
  if (hasGSAP && !reduce){
    gsap.from('.logo-stage', {scale:.6, opacity:0, duration:1.4, ease:'expo.out'});
    gsap.from('.loader-title span', {y:30, opacity:0, stagger:.15, duration:1, delay:.4, ease:'power3.out'});
  }
  const iv = setInterval(() => {
    p = Math.min(100, p + Math.random()*9 + 3);
    pct.textContent = Math.round(p) + '%'; fill.style.width = p + '%';
    if (p >= 100){ clearInterval(iv); $('#enter').classList.add('show'); $('#enterMusic').focus(); }
  }, reduce ? 20 : 120);
}
function closeLoader(withMusic){
  if (withMusic) playMusic();
  const L = $('#loader');
  const done = () => { L.remove(); document.body.classList.remove('loading'); startSite(); };
  if (hasGSAP && !reduce) gsap.to(L, {opacity:0, scale:1.04, duration:.8, ease:'power2.inOut', onComplete:done});
  else done();
}
$('#enterMusic').addEventListener('click', () => closeLoader(true));
$('#enterQuiet').addEventListener('click', () => closeLoader(false));

/* ---------- site animations ---------- */
function startSite(){
  typeLoop();
  if (!reduce && typeof Lenis !== 'undefined'){
    const lenis = new Lenis({lerp:.09, smoothWheel:true});
    if (hasGSAP){ lenis.on('scroll', ScrollTrigger.update); gsap.ticker.add(t => lenis.raf(t*1000)); gsap.ticker.lagSmoothing(0); }
    else { const raf = t => { lenis.raf(t); requestAnimationFrame(raf); }; requestAnimationFrame(raf); }
    $$('a[href^="#"]').forEach(a => a.addEventListener('click', e => { const id = a.getAttribute('href'); if (id.length>1){ e.preventDefault(); lenis.scrollTo(id, {offset:-20}); } }));
  }
  const counters = $$('[data-count]');
  if (!hasGSAP || reduce){ counters.forEach(c => c.textContent = c.dataset.count + (c.dataset.suffix||'')); return; }
  gsap.registerPlugin(ScrollTrigger);
  gsap.from('.h-word', {yPercent:110, duration:1.1, stagger:.12, ease:'expo.out'});
  gsap.from('.h-anim', {y:24, opacity:0, duration:.9, stagger:.1, delay:.25, ease:'power3.out'});
  gsap.from('.h-photo', {y:40, opacity:0, scale:.94, duration:1.3, delay:.2, ease:'expo.out'});
  gsap.from('.chip', {scale:.6, opacity:0, duration:.8, stagger:.15, delay:.8, ease:'back.out(2)'});
  gsap.to('.chip.c1', {y:-10, duration:3, yoyo:true, repeat:-1, ease:'sine.inOut'});
  gsap.to('.chip.c2', {y:12, duration:3.6, yoyo:true, repeat:-1, ease:'sine.inOut'});
  gsap.to('.chip.c3', {y:-8, duration:3.2, yoyo:true, repeat:-1, ease:'sine.inOut'});
  gsap.to('.photo-frame img', {yPercent:8, ease:'none', scrollTrigger:{trigger:'#home', start:'top top', end:'bottom top', scrub:true}});
  $$('.reveal').forEach(el => gsap.from(el, {y:40, opacity:0, duration:1, ease:'power3.out', scrollTrigger:{trigger:el, start:'top 88%'}}));
  counters.forEach(c => {
    const o = {v:0};
    gsap.to(o, {v:+c.dataset.count, duration:1.8, ease:'power2.out', scrollTrigger:{trigger:c, start:'top 90%'},
      onUpdate:() => c.textContent = Math.round(o.v) + (c.dataset.suffix||'')});
  });
  // magnetic buttons
  $$('.btn').forEach(b => {
    b.addEventListener('mousemove', e => { const r = b.getBoundingClientRect(); gsap.to(b, {x:(e.clientX-r.left-r.width/2)*.18, y:(e.clientY-r.top-r.height/2)*.25, duration:.4}); });
    b.addEventListener('mouseleave', () => gsap.to(b, {x:0, y:0, duration:.6, ease:'elastic.out(1,.4)'}));
  });
}

/* ---------- contact form (FormSubmit) ---------- */
$('#contactForm').addEventListener('submit', async e => {
  e.preventDefault();
  const f = e.target, st = $('#formStatus'), M = I18N.msg[lang];
  if (f._honey.value) return;
  if (!f.checkValidity()){ st.className='form-status err'; st.textContent = M.invalid; return; }
  st.className='form-status'; st.textContent = M.sending;
  try{
    const r = await fetch('https://formsubmit.co/ajax/'+CONTACT_EMAIL, {method:'POST', headers:{'Content-Type':'application/json',Accept:'application/json'},
      body: JSON.stringify({name:f.name.value, email:f.email.value, message:f.message.value, _subject:'New message from your portfolio', _template:'table'})});
    if (!r.ok) throw 0;
    st.className='form-status ok'; st.textContent = M.sent; f.reset();
  }catch{ st.className='form-status err'; st.innerHTML = M.fail + `<a href="mailto:${CONTACT_EMAIL}" style="text-decoration:underline">${CONTACT_EMAIL}</a>`; }
});

/* ---------- comment wall (saved in this browser; swap for Supabase later) ---------- */
const KEY = 'kai-comments';
const esc = s => s.replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
function renderComments(){
  const list = JSON.parse(localStorage.getItem(KEY) || '[]'), box = $('#comments'), M = I18N.msg[lang];
  box.innerHTML = list.length ? list.map(c => `<div class="comment"><div class="avatar">${esc(c.n[0]||'?').toUpperCase()}</div><div><div class="who">${esc(c.n)}<time>${new Date(c.t).toLocaleDateString(lang==='rw'?'rw-RW':'en-GB',{day:'numeric',month:'short'})}</time></div><p>${esc(c.m)}</p></div></div>`).join('')
    : `<p class="note">${M.empty}</p>`;
  box.insertAdjacentHTML('beforeend', `<p class="note">${M.local}</p>`);
}
$('#wallForm').addEventListener('submit', e => {
  e.preventDefault();
  const n = $('#wName').value.trim(), m = $('#wMsg').value.trim(); if (!n || !m) return;
  const list = JSON.parse(localStorage.getItem(KEY) || '[]'); list.unshift({n, m, t:Date.now()});
  localStorage.setItem(KEY, JSON.stringify(list.slice(0,50))); e.target.reset(); renderComments();
});

/* ---------- logo: turn the black background transparent ---------- */
(function keyLogo(){
  const src = new Image();
  src.onload = () => {
    const c = document.createElement('canvas'); c.width = src.naturalWidth; c.height = src.naturalHeight;
    const x = c.getContext('2d'); x.drawImage(src, 0, 0);
    const d = x.getImageData(0, 0, c.width, c.height), p = d.data;
    for (let i = 0; i < p.length; i += 4){
      const m = Math.max(p[i], p[i+1], p[i+2]);
      const a = m < 18 ? 0 : Math.min(255, (m - 18) * 1.6);
      if (a > 0){ const k = 255 / Math.max(a, 1); p[i] = Math.min(255, p[i]*k); p[i+1] = Math.min(255, p[i+1]*k); p[i+2] = Math.min(255, p[i+2]*k); }
      p[i+3] = a;
    }
    x.putImageData(d, 0, 0);
    // trim to the visible logo so it sits tight in the nav
    let t = c.height, b = 0, l = c.width, r = 0;
    for (let y = 0; y < c.height; y++) for (let xx = 0; xx < c.width; xx++) if (p[(y*c.width+xx)*4+3] > 30){ if(y<t)t=y; if(y>b)b=y; if(xx<l)l=xx; if(xx>r)r=xx; }
    const pad = 12, o = document.createElement('canvas');
    o.width = r - l + pad*2; o.height = b - t + pad*2;
    o.getContext('2d').drawImage(c, l - pad, t - pad, o.width, o.height, 0, 0, o.width, o.height);
    const url = o.toDataURL('image/png');
    $$('.logo-img,.nav-logo,.f-logo').forEach(img => img.src = url);
    $('.logo-stage').style.aspectRatio = o.width + '/' + o.height;
  };
  src.src = 'assets/logo.jpg';
})();

/* ---------- boot ---------- */
applyLang(lang);
runLoader();
