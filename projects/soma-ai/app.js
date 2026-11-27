/* ================= i18n ================= */
const RW = {
  back:'← Urubuga', kick:'AI · Gusesengura ururimi · Ikinyarwanda',
  tagline:'Ireba icyo inkuru ivuga. Isoma amakuru mu Kinyarwanda ikakubwira insanganyamatsiko yayo.',
  lead:'Porogaramu ya AI yigishijwe inkuru 21,268 nyakuri zo mu bitangazamakuru 20 byo mu Rwanda. Shyira hano inkuru iyo ari yo yose mu Kinyarwanda, Soma AI iguhe insanganyamatsiko yayo n’amagambo yatumye ifata icyo cyemezo. Ikorera muri browser yawe gusa: ibyo wanditse ntibyoherezwa ahandi.',
  c1:'inkuru', c2:'insanganyamatsiko', c3:'ukuri ku igerageza', c4:'Ikorera muri browser yawe nta murandasi', k1:'Gerageza', h1:'Gerageza Soma AI',
  inputLabel:'Shyira hano umutwe w’inkuru cyangwa inkuru yose mu Kinyarwanda:', btn:'Soma', clear:'Siba', loading:'Biratangira…', ready:'Yiteguye',
  exl:'Ingero · imitwe nyakuri y’inkuru itarabonwe mu kwiga', empty:'Hitamo urugero cyangwa ushyire inkuru mu Kinyarwanda, hanyuma ukande Soma.',
  k2:'Uko ikora', h2:'Kuva mu bitangazamakuru byo mu Rwanda kugeza muri browser yawe', p1t:'Amakuru', p2t:'Gusukura', p3t:'Ibiranga', p4t:'Moderi', p5t:'Gusobanura',
  k3:'Ibisubizo', h3:'Ibizamini bibiri, imibare ibiri y’ukuri', s1:'Ukuri · imbuga nshya', s2:'Macro F1 · imbuga nshya', s3:'Weighted F1', s4:'Amagambo yize',
  t1:'Moderi', t2:'Ibiranga', t3:'Ukuri · imbuga nshya', t4:'Macro F1 · imbuga nshya', t5:'Ukuri · imbuga zizwi', s0:'Ukuri · imbuga z’amakuru zizwi', dsh:'Icyo twavumbuye: ihinduka ry’inkomoko', ds:'Inkuru zo kugerageza za KINNEWS zituruka ku <b>mbuga z’amakuru zitandukanye</b> n’izo yigiyeho. Ku nkuru nshya zo ku mbuga yigiyeho, Soma AI iba ifite ukuri hafi inshuro 9 kuri 10; ku mbuga itigeze ibona, hafi 7 kuri 10. Buri kinyamakuru cyandika kandi kigashyira inkuru mu byiciro mu buryo bwacyo, bityo kumenyera inkomoko nshya ni yo mbogamizi nyamukuru.', trs:'Imbuga yigiyeho', tes:'Imbuga zo kugerageza (nshya)', f1h:'F1 kuri buri nsanganyamatsiko', cmh:'Imbonerahamwe y’urujijo',
  k4:'Imbibi', h4:'Ibyo Soma AI itarashobora', topic:'Insanganyamatsiko', conf:'Icyizere', why:'Amagambo yafashije gufata icyemezo', all:'Insanganyamatsiko zose', short:'Inyandiko ngufi: icyizere gishobora kuba gito. Inkuru ndende itanga ibisubizo byiza.',
  for:'Ishyigikira', against:'Irwanya', none:'Nta magambo azwi yabonetse. Gerageza inkuru ndende mu Kinyarwanda.'
};
const EN = {}; let lang = 'en';
document.querySelectorAll('[data-t]').forEach(el => EN[el.dataset.t] = el.innerHTML);
Object.assign(EN, { t5:'Accuracy · known sites', t3:'Accuracy · new sites', t4:'Macro F1 · new sites' });
Object.assign(EN, { ready:'Model ready', topic:'Topic', conf:'Confidence', why:'Words that drove the decision', all:'All topics', short:'Short text: confidence may be low. A full article gives better results.', for:'Supports', against:'Against', none:'No known words found. Try a longer Kinyarwanda news text.' });
const T = k => (lang === 'rw' ? RW[k] : EN[k]) ?? EN[k] ?? k;
function applyLang(l){
  lang = l; document.documentElement.lang = l === 'rw' ? 'rw' : 'en';
  document.querySelectorAll('[data-t]').forEach(el => { const v = lang === 'rw' ? RW[el.dataset.t] : EN[el.dataset.t]; if (v) el.innerHTML = v; });
  document.querySelectorAll('.lang button').forEach(b => b.setAttribute('aria-pressed', b.dataset.l === l));
  if (M) { document.getElementById('modelState').textContent = T('ready'); if (last) render(last); }
}
document.querySelectorAll('.lang button').forEach(b => b.onclick = () => applyLang(b.dataset.l));

/* ================= model (mirrors train.py exactly) ================= */
let M = null, last = null;
const norm = s => s.toLowerCase().normalize('NFKD').replace(/[̀-ͯ᪰-᫿᷀-᷿⃐-⃿︠-︯]/g, '');
function tokens(s){ return norm(s).match(/[a-z]{2,}/g) || []; }
async function loadModel(){
  const m = await (await fetch('model.json')).json();
  const bin = atob(m.coef_int8_b64), F = m.vocab.length, C = m.classes.length;
  const q = new Int8Array(bin.length); for (let i = 0; i < bin.length; i++) q[i] = (bin.charCodeAt(i) << 24) >> 24;
  const W = new Float64Array(C * F); for (let c = 0; c < C; c++) for (let j = 0; j < F; j++) W[c*F + j] = q[c*F + j] * m.coef_scale[c];
  m.W = W; m.F = F; m.C = C; m.index = new Map(m.vocab.map((w,i) => [w,i]));
  return m;
}
function predict(text){
  const tk = tokens(text), [lo, hi] = M.preprocess.ngram, counts = new Map(), occ = [];
  for (let n = lo; n <= hi; n++) for (let i = 0; i + n <= tk.length; i++) {
    const g = tk.slice(i, i+n).join(' '), j = M.index.get(g);
    if (j !== undefined) { counts.set(j, (counts.get(j) || 0) + 1); occ.push({ j, start: i, n }); }
  }
  const feats = []; let ss = 0;
  counts.forEach((cnt, j) => { const v = (1 + Math.log(cnt)) * M.idf[j]; feats.push([j, v]); ss += v*v; });
  const nrm = Math.sqrt(ss) || 1; feats.forEach(f => f[1] /= nrm);
  const z = new Float64Array(M.C);
  for (let c = 0; c < M.C; c++) { let s = M.intercept[c]; for (const [j, v] of feats) s += M.W[c*M.F + j] * v; z[c] = s; }
  const mx = Math.max(...z), e = Array.from(z, v => Math.exp(v - mx)), se = e.reduce((a,b) => a+b, 0), p = e.map(v => v/se);
  const best = p.indexOf(Math.max(...p));
  const vals = new Map(feats);
  // token-level contribution towards the winning class (bigrams split between their two words)
  const contrib = new Float64Array(tk.length);
  for (const o of occ) { const v = vals.get(o.j), w = M.W[best*M.F + o.j] * v; for (let k = 0; k < o.n; k++) contrib[o.start + k] += w / o.n; }
  const terms = feats.map(([j, v]) => ({ term: M.vocab[j], w: M.W[best*M.F + j] * v })).sort((a,b) => b.w - a.w);
  return { probs: p, best, tokens: tk, contrib, terms, known: feats.length, text };
}
window.Soma = { predict: t => predict(t).probs, tokens };

/* ================= rendering ================= */
const esc = s => s.replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
function highlight(text, r){
  // walk the original text, colouring each word by its contribution
  const maxAbs = Math.max(1e-9, ...Array.from(r.contrib, Math.abs)); let ti = 0, out = '';
  const re = /[A-Za-zÀ-ÿ'’]+|[^A-Za-zÀ-ÿ'’]+/g; let m;
  while ((m = re.exec(text))) {
    const chunk = m[0], tks = tokens(chunk);
    if (!tks.length) { out += esc(chunk); continue; }
    let w = 0; for (let k = 0; k < tks.length && ti < r.tokens.length; k++, ti++) w += r.contrib[ti];
    const a = Math.min(1, Math.abs(w) / maxAbs);
    if (a < 0.08) { out += esc(chunk); continue; }
    const col = w > 0 ? `rgba(62,207,122,${0.15 + a*0.6})` : `rgba(255,107,127,${0.12 + a*0.5})`;
    out += `<mark style="background:${col}" title="${w>0?'+':''}${w.toFixed(3)}">${esc(chunk)}</mark>`;
  }
  return out;
}
function render(r){
  last = r; const cls = M.classes, order = r.probs.map((p,i) => [p,i]).sort((a,b) => b[0]-a[0]);
  const win = cls[r.best], pct = v => (v*100).toFixed(v < 0.1 ? 1 : 0) + '%';
  const pos = r.terms.filter(t => t.w > 0).slice(0, 10), neg = r.terms.filter(t => t.w < 0).slice(-5).reverse();
  document.getElementById('result').innerHTML = `
    <div class="top"><div><span class="hint">${T('topic')}</span><div class="lbl">${esc(win.kin)}</div><div class="en">${esc(win.en)}</div></div>
      <div class="conf">${pct(r.probs[r.best])}<small>${T('conf')}</small></div></div>
    ${r.tokens.length < 25 ? `<p class="warnline">⚠ ${T('short')}</p>` : ''}
    <div class="bars" aria-label="${T('all')}">${order.map(([p,i]) => `<div class="bar ${i===r.best?'win':''}"><span class="name">${esc(cls[i].kin)} · ${esc(cls[i].en)}</span><span class="track"><span class="fill" style="width:${(p*100).toFixed(1)}%"></span></span><span class="pct">${pct(p)}</span></div>`).join('')}</div>
    <div class="explain"><h4>${T('why')}</h4>
      ${r.known ? `<div class="hl">${highlight(r.text, r)}</div>
      <div class="legend"><span><i style="background:rgba(62,207,122,.6)"></i>${T('for')} “${esc(win.kin)}”</span><span><i style="background:rgba(255,107,127,.5)"></i>${T('against')}</span></div>
      <div class="words">${pos.map(t => `<span>${esc(t.term)}</span>`).join('')}${neg.map(t => `<span class="neg">${esc(t.term)}</span>`).join('')}</div>` : `<p class="hint">${T('none')}</p>`}
    </div>`;
}
function run(){ const t = document.getElementById('txt').value.trim(); if (!t || !M) return; render(predict(t)); }

/* ================= results section ================= */
function fillResults(m){
  const pc = v => (v*100).toFixed(1) + '%';
  document.getElementById('sAcc').textContent = pc(m.test_accuracy);
  document.getElementById('chipAcc').textContent = pc(m.test_accuracy);
  document.getElementById('sF1').textContent = pc(m.test_macro_f1);
  document.getElementById('sVal').textContent = pc(m.val_accuracy);
  document.getElementById('sVocab').textContent = M.F.toLocaleString('en-US');
  const chipsFor = o => Object.entries(o).map(([h,n]) => `<span class="chip" style="font-size:.76rem;padding:5px 10px">${esc(h)} <b>${n.toLocaleString('en-US')}</b></span>`).join('');
  document.getElementById('srcTrain').innerHTML = chipsFor(m.sources.train);
  document.getElementById('srcTest').innerHTML = chipsFor(m.sources.test);
  const rows = m.comparison.map(c => ({ name: c.model, feat: `${c.ngram[1]===2?'words + pairs':'words'}, ${c.max_features.toLocaleString('en-US')}`, va: c.val_acc, ta: c.test_acc, tf: c.test_macro_f1 }));
  rows.push({ name: m.model + ' ⭐ live demo', feat: `${M.preprocess.ngram[1]===2?'words + pairs':'words'}, ${M.F.toLocaleString('en-US')}`, va: m.val_accuracy, ta: m.test_accuracy, tf: m.test_macro_f1, sel: true });
  (m.experiments || []).forEach(e => rows.push({ name: 'Logistic Regression (C=5, balanced) · experiment', feat: e.features, va: e.val_acc, ta: e.test_acc, tf: e.test_macro_f1 }));
  document.querySelector('#cmp thead tr').innerHTML = `<th>${T('t1')}</th><th>${T('t2')}</th><th>${T('t5')}</th><th>${T('t3')}</th><th>${T('t4')}</th>`;
  document.querySelector('#cmp tbody').innerHTML = rows.map(r => `<tr class="${r.sel?'sel':''}"><td>${esc(r.name)}</td><td>${esc(r.feat)}</td><td>${r.va!=null?pc(r.va):'—'}</td><td>${pc(r.ta)}</td><td>${pc(r.tf)}</td></tr>`).join('');
  document.getElementById('f1').innerHTML = M.classes.map(c => { const v = m.per_class[c.en]['f1-score']; return `<div class="f1row"><span class="name">${esc(c.kin)}</span><span class="track"><span class="fill" style="width:${v*100}%"></span></span><span class="v">${v.toFixed(2)}</span></div>`; }).join('');
  const cm = m.confusion_matrix, n = cm.length, cmEl = document.getElementById('cm');
  cmEl.style.gridTemplateColumns = `90px repeat(${n}, minmax(16px, 1fr))`;
  let html = '<div class="rh"></div>' + M.classes.map(c => `<div class="h">${esc(c.en)}</div>`).join('');
  cm.forEach((row, i) => { const tot = row.reduce((a,b) => a+b, 0) || 1;
    html += `<div class="rh">${esc(M.classes[i].en)}</div>` + row.map((v, j) => { const r = v / tot;
      const bg = i === j ? `rgba(62,207,122,${0.12 + r*0.85})` : `rgba(0,161,222,${r*1.2})`;
      return `<div style="background:${bg}" title="true ${M.classes[i].en} → predicted ${M.classes[j].en}: ${v} (${(r*100).toFixed(0)}%)">${r >= 0.1 ? Math.round(r*100) : ''}</div>`; }).join(''); });
  cmEl.innerHTML = html;
}

/* ================= boot ================= */
(async () => {
  try {
    M = await loadModel();
    const ex = await (await fetch('examples.json')).json();
    document.getElementById('examples').innerHTML = ex.map((e,i) => `<button class="ex" data-i="${i}">${esc(e.title)}<small>${esc(e.source)}</small></button>`).join('');
    document.getElementById('examples').addEventListener('click', ev => { const b = ev.target.closest('.ex'); if (!b) return; document.getElementById('txt').value = ex[+b.dataset.i].title; run(); });
    fillResults(M.metrics);
    document.getElementById('go').disabled = false;
    document.getElementById('modelState').textContent = T('ready');
  } catch (e) { document.getElementById('modelState').textContent = 'Could not load the model.'; console.error(e); }
})();
document.getElementById('go').onclick = run;
document.getElementById('clear').onclick = () => { document.getElementById('txt').value = ''; last = null; document.getElementById('result').innerHTML = `<div class="result-empty">${T('empty')}</div>`; };
document.getElementById('txt').addEventListener('keydown', e => { if ((e.metaKey || e.ctrlKey) && e.key === 'Enter') run(); });
