/* ============ harmless demo payloads ============ */
const PAYLOADS = [
  { id:'bold',   name:'HTML injection',      lvl:'low',  code:'<b style="color:#c00;font-size:22px">FREE PRIZE!!! click me</b>', note:'Adds markup but runs no code.' },
  { id:'alert',  name:'Classic alert()',     lvl:'high', code:'<img src="x" onerror="alert(\'XSS on \' + location.hostname)">', note:'A broken image whose error handler runs JavaScript.' },
  { id:'steal',  name:'Read the session',    lvl:'high', code:'<img src="x" onerror="leak(window.FAKE_SESSION)">', note:'Shows the fake session token an attacker could send away.' },
  { id:'deface', name:'Deface the page',     lvl:'high', code:'<svg onload="document.body.innerHTML=\'<h1 style=&quot;color:#c00;font-family:sans-serif&quot;>Hacked by mallory</h1>\'"></svg>', note:'Replaces the whole page using an SVG onload handler.' },
  { id:'script', name:'<script> tag',        lvl:'med',  code:'<script>alert("hi")<\/script>', note:'Script tags added with innerHTML do NOT run, but handlers do.' },
  { id:'css',    name:'Fake login overlay',  lvl:'med',  code:'<div style="position:fixed;inset:0;background:#fff;display:grid;place-items:center;font-family:sans-serif"><div style="border:1px solid #ccc;padding:20px;border-radius:8px">Session expired.<br>Please log in again ▸</div></div>', note:'No script at all, just HTML/CSS phishing.' },
];
const EXPECT = { // what each defence does to each payload
  bold:  { none:'p', encode:'y', sanitize:'p', csp:'p' },
  alert: { none:'n', encode:'y', sanitize:'y', csp:'y' },
  steal: { none:'n', encode:'y', sanitize:'y', csp:'y' },
  deface:{ none:'n', encode:'y', sanitize:'y', csp:'y' },
  script:{ none:'y', encode:'y', sanitize:'y', csp:'y' },
  css:   { none:'n', encode:'y', sanitize:'y', csp:'n' },
};
const LABEL = { y:'Blocked', n:'Exploited', p:'Markup only' };

/* ============ state ============ */
const seed = () => [
  { name:'alice', text:'Loved this post about Kigali’s tech scene!' },
  { name:'jean',  text:'Can you share the slides from the meetup?' },
];
let db = seed(), defence = 'none', visitors = ['alice','jean','grace','eric','aline'], vi = 0;
const $ = id => document.getElementById(id);
const esc = s => String(s).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const looksBad = s => /<\s*[a-z!\/]|on\w+\s*=|javascript:/i.test(s);

/* ============ log ============ */
function log(type, msg){
  const d = new Date(), t = d.toTimeString().slice(0,8);
  $('log').insertAdjacentHTML('afterbegin', `<div class="ln ${type}"><time>${t}</time><span>${esc(msg)}</span></div>`);
}
$('clear').onclick = () => $('log').innerHTML = '';

/* ============ payload buttons + matrix ============ */
const lvlColor = { low:'var(--cyan)', med:'var(--amber)', high:'var(--red)' };
$('payloads').innerHTML = PAYLOADS.map(p => `<button class="pl" data-id="${p.id}" title="${esc(p.note)}"><span>${esc(p.name)}<br><small>${esc(p.note)}</small></span><span class="lvl" style="color:${lvlColor[p.lvl]}">${p.lvl}</span></button>`).join('');
$('payloads').addEventListener('click', e => { const b = e.target.closest('.pl'); if (!b) return; const p = PAYLOADS.find(x => x.id === b.dataset.id); $('msg').value = p.code; $('msg').focus(); log('info', `Loaded payload “${p.name}”. Click “Post comment” to store it.`); });
document.querySelector('#matrix tbody').innerHTML = PAYLOADS.map(p => `<tr><td>${esc(p.name)}<br><code style="font-size:.7rem;color:var(--muted)">${esc(p.code.slice(0,48))}${p.code.length>48?'…':''}</code></td>${['none','encode','sanitize','csp'].map(d => `<td class="${EXPECT[p.id][d]}">${LABEL[EXPECT[p.id][d]]}</td>`).join('')}</tr>`).join('');

/* ============ database view ============ */
function renderDB(){
  $('db').innerHTML = db.map((c,i) => { const bad = looksBad(c.text);
    return `<div class="rec ${bad?'bad':''}"><span class="k">#${i+1} name=</span><span class="v">${esc(c.name)}</span><br><span class="k">text=</span><span class="v">${esc(c.text)}</span>${bad?'<br><span class="flag">⚠ contains HTML / event handler</span>':''}</div>`; }).join('');
}

/* ============ the victim page (built fresh for every visit) ============ */
function victimDoc(){
  const nonce = Math.random().toString(36).slice(2);
  const data = JSON.stringify({ comments: db, defence, visitor: visitors[vi % visitors.length] }).replace(/</g,'\\u003c');
  const csp = defence === 'csp' ? `<meta http-equiv="Content-Security-Policy" content="default-src 'none'; style-src 'unsafe-inline'; img-src data:; script-src 'nonce-${nonce}'">` : '';
  return `<!DOCTYPE html><html><head><meta charset="utf-8">${csp}
<style>body{font-family:Georgia,serif;margin:0;padding:16px;color:#222;background:#fff}h3{margin:0 0 4px;font:700 18px system-ui}small{color:#777;font:12px system-ui}
.c{border-top:1px solid #eee;padding:10px 0;font-size:14px}.c b{font-family:system-ui}#toast{position:fixed;left:10px;right:10px;bottom:10px;background:#111;color:#fff;font:13px system-ui;padding:10px 12px;border-radius:8px;display:none}</style></head>
<body><h3>Kigali Tech Blog</h3><small>Post #42 · signed in as <b id="who"></b></small><div id="board"></div><div id="toast"></div>
<script nonce="${nonce}">
(function(){
  var D = ${data};
  window.FAKE_SESSION = 'sess_' + D.visitor + '_7f3a91c0 (fake demo token)';
  var send = function(type,msg){ parent.postMessage({ lab:'xss', type:type, msg:String(msg) }, '*'); };
  var toast = function(m){ var t=document.getElementById('toast'); if(!t){return;} t.textContent=m; t.style.display='block'; };
  window.alert = function(m){ toast('alert(): ' + m); send('ran','alert() executed: ' + m); };
  window.leak  = function(v){ toast('Attacker received: ' + v); send('ran','Session token read by attacker script: ' + v); };
  document.addEventListener('securitypolicyviolation', function(e){ send('csp','CSP blocked ' + e.violatedDirective + (e.sample ? ' → ' + e.sample.slice(0,40) : '')); });
  new MutationObserver(function(){ if(!document.getElementById('board')) send('ran','Page content was replaced (defacement)'); }).observe(document.body,{childList:true});
  document.getElementById('who').textContent = D.visitor;
  var board = document.getElementById('board');
  function sanitize(html){
    var doc = new DOMParser().parseFromString('<div>'+html+'</div>','text/html'), ok = {B:1,I:1,EM:1,STRONG:1,A:1,BR:1,P:1};
    (function walk(n){ Array.from(n.children).forEach(function(el){
      if(!ok[el.tagName]){ el.replaceWith(document.createTextNode(el.textContent)); return; }
      Array.from(el.attributes).forEach(function(a){ if(!(el.tagName==='A' && a.name==='href' && /^https?:/i.test(a.value))) el.removeAttribute(a.name); });
      walk(el); }); })(doc.body.firstChild);
    return doc.body.firstChild.innerHTML;
  }
  D.comments.forEach(function(c){
    var div = document.createElement('div'); div.className='c';
    if (D.defence === 'encode') { div.textContent = c.name + ': ' + c.text; }
    else if (D.defence === 'sanitize') { div.innerHTML = '<b>' + sanitize(c.name) + '</b>: ' + sanitize(c.text); }
    else { div.innerHTML = '<b>' + c.name + '</b>: ' + c.text; }   /* none + csp: vulnerable innerHTML */
    board.appendChild(div);
  });
  send('rendered', D.defence);
})();
<\/script></body></html>`;
}

let ranThisVisit = false, cspThisVisit = false, lastText = '', pendingDoc = null, visitNo = 0;
function visit(){
  ranThisVisit = false; cspThisVisit = false;
  const who = visitors[vi % visitors.length];
  $('visitor').textContent = 'visitor: ' + who;
  pendingDoc = victimDoc();
  const fr = $('victim'); fr.src = 'victim.html?v=' + (++visitNo); // fresh, empty victim page every visit
  setTimeout(updateStatus, 700);
}
function updateStatus(){
  const s = $('status'), hasBad = db.some(c => looksBad(c.text));
  if (ranThisVisit) { s.className = 'status bad'; s.textContent = '✗ Exploited: the attacker’s code ran in ' + visitors[vi % visitors.length] + '’s browser.'; }
  else if (cspThisVisit) { s.className = 'status mid'; s.textContent = '◐ CSP blocked the script, but injected HTML/CSS can still change the page.'; }
  else if (hasBad && (defence === 'encode' || defence === 'sanitize')) { s.className = 'status good'; s.textContent = '✓ Protected: the payload was shown as harmless text or stripped.'; }
  else if (hasBad) { s.className = 'status mid'; s.textContent = defence === 'csp' ? '◐ No script ran, but CSP does not stop injected HTML/CSS: the page can still be changed or faked.' : '◐ HTML was injected. Nothing ran this time, but the page can be changed.'; }
  else { s.className = 'status'; s.textContent = 'All comments are plain text.'; }
}
addEventListener('message', e => {
  if (e.source !== $('victim').contentWindow) return;
  const d = e.data; if (!d || d.lab !== 'xss') return;
  if (d.type === 'ready') { if (pendingDoc) e.source.postMessage({ lab:'xss-doc', html: pendingDoc }, '*'); return; }
  if (d.type === 'ran') { ranThisVisit = true; log('bad', '✗ ' + d.msg); updateStatus(); }
  else if (d.type === 'csp') { cspThisVisit = true; log('mid', '◐ ' + d.msg); updateStatus(); }
  else if (d.type === 'rendered') {
    log('info', `Page rendered for ${visitors[vi % visitors.length]} with defence: ${({none:'none (innerHTML)',encode:'output encoding',sanitize:'allowlist sanitizer',csp:'CSP + innerHTML'})[d.msg]}`);
    setTimeout(updateStatus, 300);
  }
});

/* ============ controls ============ */
$('post').onclick = () => {
  const text = $('msg').value.trim(), name = $('name').value.trim() || 'anon';
  if (!text) return;
  db.push({ name, text }); renderDB();
  log(looksBad(text) ? 'mid' : 'ok', `Stored comment from “${name}”${looksBad(text) ? ' (contains HTML/handlers)' : ''}.`);
  visit();
};
$('reset').onclick = () => { db = seed(); vi = 0; renderDB(); log('ok', 'Board reset to clean comments.'); visit(); };
$('revisit').onclick = () => { vi++; log('info', `A different user (${visitors[vi % visitors.length]}) opens the same page…`); visit(); };
document.querySelectorAll('.def').forEach(b => b.onclick = () => {
  defence = b.dataset.d; document.querySelectorAll('.def').forEach(x => x.setAttribute('aria-pressed', x === b));
  log('info', 'Defence switched → ' + b.textContent.replace(/\s+/g,' ').trim()); visit();
});

renderDB(); visit();
log('ok', 'Lab ready. Pick a payload on the left, post it, then try the defences.');
