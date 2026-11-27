/* ============ DATA ============ */
const STYLES = [
  {id:'orbits',   name:'Orbits'},
  {id:'hills',    name:'Hills'},
  {id:'imigongo', name:'Imigongo'},
  {id:'flow',     name:'Flow'},
  {id:'bauhaus',  name:'Bauhaus'},
];
const PALETTES = [
  {id:'kai',    name:'Kai Violet', bg:'#07051a', c:['#8b5cf6','#6366f1','#a855f7','#c4b5fd','#f5f3ff'], ink:'#f5f3ff'},
  {id:'umucyo', name:'Umucyo',     bg:'#1E1512', c:['#F2A93B','#C8643B','#3E6B48','#6B3E26','#F6EEDF'], ink:'#F6EEDF'},
  {id:'kivu',   name:'Kivu Dusk',  bg:'#0b1d2a', c:['#1f6f8b','#e45826','#f0a500','#e6d5b8','#99a8b2'], ink:'#f3ead7'},
  {id:'neon',   name:'Neon Night', bg:'#050505', c:['#ff2e88','#00f0ff','#f8ff00','#7cff6b','#ffffff'], ink:'#ffffff'},
  {id:'paper',  name:'Paper Mono', bg:'#f2efe9', c:['#111111','#e4572e','#3a3a3a','#9a9a9a','#111111'], ink:'#111111'},
];
const FORMATS = [{id:'4x5',name:'4:5',r:5/4},{id:'1x1',name:'1:1',r:1},{id:'9x16',name:'9:16',r:16/9}];

/* ============ STATE ============ */
const S = {style:'orbits', palette:'kai', format:'4x5', seed:2026, density:60, complexity:50, title:'Build. Innovate. Empower.', subtitle:'Kai Labs — Kigali, Rwanda', showText:true, grain:true, animate:false, frame:true};
(function readHash(){
  try{ const h = new URLSearchParams(location.hash.slice(1)); for (const k of Object.keys(S)){ if (!h.has(k)) continue; const v = h.get(k);
    S[k] = typeof S[k] === 'number' ? +v : typeof S[k] === 'boolean' ? v === '1' : v; } }catch{}
})();

/* ============ RANDOM + NOISE ============ */
function mulberry32(a){ return function(){ a |= 0; a = a + 0x6D2B79F5 | 0; let t = Math.imul(a ^ a >>> 15, 1 | a); t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t; return ((t ^ t >>> 14) >>> 0) / 4294967296; }; }
function makeNoise(rand){
  const p = new Uint8Array(512), g = []; for (let i=0;i<256;i++){ p[i]=i; const a=rand()*Math.PI*2; g.push([Math.cos(a),Math.sin(a)]); }
  for (let i=255;i>0;i--){ const j=Math.floor(rand()*(i+1)); [p[i],p[j]]=[p[j],p[i]]; } for (let i=0;i<256;i++) p[i+256]=p[i];
  const fade = t => t*t*t*(t*(t*6-15)+10), dot=(h,x,y)=>{ const v=g[h&255]; return v[0]*x+v[1]*y; };
  return (x,y) => { const X=Math.floor(x)&255, Y=Math.floor(y)&255; x-=Math.floor(x); y-=Math.floor(y); const u=fade(x), v=fade(y);
    const a=p[X]+Y, b=p[X+1]+Y; const l1 = dot(p[a],x,y)+(dot(p[b],x-1,y)-dot(p[a],x,y))*u; const l2 = dot(p[a+1],x,y-1)+(dot(p[b+1],x-1,y-1)-dot(p[a+1],x,y-1))*u; return l1+(l2-l1)*v; };
}
const pick = (rand, arr) => arr[Math.floor(rand()*arr.length)];
function hexA(hex, a){ const n=parseInt(hex.slice(1),16); return `rgba(${n>>16&255},${n>>8&255},${n&255},${a})`; }
function mix(h1,h2,t){ const a=parseInt(h1.slice(1),16), b=parseInt(h2.slice(1),16); const r=(a>>16&255)+((b>>16&255)-(a>>16&255))*t, g=(a>>8&255)+((b>>8&255)-(a>>8&255))*t, bl=(a&255)+((b&255)-(a&255))*t; return `rgb(${r|0},${g|0},${bl|0})`; }

/* ============ STYLES ============ */
const DRAW = {
  orbits(ctx, W, H, P, rand, noise, o, t){
    const cx = W*(.42+rand()*.16), cy = H*(.36+rand()*.12);
    // stars
    const stars = 120 + o.density*6;
    for (let i=0;i<stars;i++){ const x=rand()*W, y=rand()*H, r=rand()*W*.0018+W*.0004; ctx.fillStyle=hexA(P.ink, .2+rand()*.6*(0.6+0.4*Math.sin(t*2+i))); ctx.beginPath(); ctx.arc(x,y,r,0,7); ctx.fill(); }
    // sun glow
    const gr = ctx.createRadialGradient(cx,cy,0,cx,cy,W*.32); gr.addColorStop(0,hexA(P.c[0],.9)); gr.addColorStop(.25,hexA(P.c[2],.45)); gr.addColorStop(1,hexA(P.c[1],0));
    ctx.fillStyle=gr; ctx.beginPath(); ctx.arc(cx,cy,W*.32,0,7); ctx.fill();
    ctx.fillStyle=P.c[4]; ctx.beginPath(); ctx.arc(cx,cy,W*.05,0,7); ctx.fill();
    // rings
    const rings = 4 + Math.round(o.complexity/8);
    for (let i=0;i<rings;i++){
      const rx = W*(.1 + i*.075 + rand()*.03), ry = rx*(.22+rand()*.25), rot = -.35 + rand()*.25;
      ctx.save(); ctx.translate(cx,cy); ctx.rotate(rot);
      ctx.strokeStyle = hexA(pick(rand,P.c), .35+rand()*.5); ctx.lineWidth = W*(.0012+rand()*.003);
      if (rand()<.35) ctx.setLineDash([W*.006, W*.01]); else ctx.setLineDash([]);
      ctx.beginPath(); ctx.ellipse(0,0,rx,ry,0,0,7); ctx.stroke(); ctx.setLineDash([]);
      const planets = rand()<.7 ? 1 + Math.floor(rand()*2) : 0;
      for (let k=0;k<planets;k++){ const a = rand()*Math.PI*2 + t*(.25+rand()*.4)*(i%2?1:-1); const pr = W*(.008+rand()*.022);
        ctx.fillStyle = pick(rand,P.c); ctx.beginPath(); ctx.arc(Math.cos(a)*rx, Math.sin(a)*ry, pr, 0, 7); ctx.fill(); }
      ctx.restore();
    }
    // sparkle
    const sx = cx + W*.22, sy = cy - W*.18, s = W*.035; ctx.fillStyle=P.c[3];
    ctx.beginPath(); ctx.moveTo(sx, sy-s); ctx.quadraticCurveTo(sx, sy, sx+s, sy); ctx.quadraticCurveTo(sx, sy, sx, sy+s); ctx.quadraticCurveTo(sx, sy, sx-s, sy); ctx.quadraticCurveTo(sx, sy, sx, sy-s); ctx.fill();
  },

  hills(ctx, W, H, P, rand, noise, o, t){
    const sky = ctx.createLinearGradient(0,0,0,H); sky.addColorStop(0,P.bg); sky.addColorStop(.7, mix(P.bg, P.c[1], .3)); ctx.fillStyle=sky; ctx.fillRect(0,0,W,H);
    const sunY = H*(.32+rand()*.12) + Math.sin(t*.5)*H*.01, sunX = W*(.3+rand()*.4), sunR = W*(.12+rand()*.08);
    const g = ctx.createRadialGradient(sunX,sunY,sunR*.6,sunX,sunY,sunR*2.6); g.addColorStop(0,hexA(P.c[0],.55)); g.addColorStop(1,hexA(P.c[0],0)); ctx.fillStyle=g; ctx.fillRect(0,0,W,H);
    ctx.fillStyle=P.c[0]; ctx.beginPath(); ctx.arc(sunX,sunY,sunR,0,7); ctx.fill();
    const layers = 3 + Math.round(o.complexity/14);
    for (let L=0; L<layers; L++){
      const d = L/(layers-1), base = H*(.48 + d*.42), amp = H*(.16 - d*.08)*(.6+o.density/120), freq = 1.2 + rand()*1.6 + d;
      const col = L===layers-1 ? P.c[3] : mix(mix(P.bg,P.c[0],.5), pick(rand,[P.c[1],P.c[2],P.c[3]]), .3+d*.7);
      ctx.fillStyle = col; ctx.beginPath(); ctx.moveTo(0,H);
      for (let x=0; x<=W; x+=W/200){ const n = noise(x/W*freq + L*10 + t*.02*(L+1), L*3.1); ctx.lineTo(x, base - (n*.5+.5)*amp); }
      ctx.lineTo(W,H); ctx.closePath(); ctx.fill();
      // mist between layers
      const m = ctx.createLinearGradient(0, base-amp, 0, base+H*.05); m.addColorStop(0,hexA(P.ink,0)); m.addColorStop(1,hexA(P.ink,.06)); ctx.fillStyle=m; ctx.fillRect(0, base-amp, W, amp+H*.05);
    }
    // terraces on the front hill
    ctx.strokeStyle = hexA(P.bg,.25); ctx.lineWidth = W*.0015;
    for (let i=0;i<14;i++){ const y = H*(.82 + i*.013); ctx.beginPath(); for (let x=0;x<=W;x+=W/120){ const yy = y + noise(x/W*3, i*.3+50)*H*.01; x?ctx.lineTo(x,yy):ctx.moveTo(x,yy);} ctx.stroke(); }
  },

  imigongo(ctx, W, H, P, rand, noise, o, t){
    const cols = 3 + Math.round(o.density/14), cell = W/cols, rows = Math.ceil(H/cell);
    const pad = cell*.06, motifs = ['zig','tri','diamond','chevron','stripes','hourglass'];
    const allowed = motifs.slice(0, 2 + Math.round(o.complexity/25));
    for (let r=0;r<rows;r++) for (let c=0;c<cols;c++){
      const x = c*cell, y = r*cell, m = pick(rand, allowed), fg = pick(rand,P.c), bg2 = rand()<.5 ? P.bg : mix(P.bg, P.c[1], .25);
      ctx.save(); ctx.translate(x+cell/2, y+cell/2); ctx.rotate((Math.floor(rand()*4))*Math.PI/2 + (o.animate? Math.sin(t+r+c)*.04 : 0)); ctx.translate(-cell/2,-cell/2);
      ctx.fillStyle = bg2; ctx.fillRect(pad,pad,cell-pad*2,cell-pad*2);
      ctx.fillStyle = fg; ctx.strokeStyle = fg; const s = cell-pad*2, o2 = pad;
      ctx.beginPath();
      if (m==='zig'){ const n=3; for (let k=0;k<n;k++){ const yy=o2+s*(k+.5)/n; ctx.moveTo(o2,yy); for (let i=0;i<=4;i++) ctx.lineTo(o2+s*i/4, yy+(i%2? -s/(n*2.6) : s/(n*2.6))); } ctx.lineWidth=s*.07; ctx.stroke(); }
      else if (m==='tri'){ ctx.moveTo(o2,o2+s); ctx.lineTo(o2+s/2,o2+s*.15); ctx.lineTo(o2+s,o2+s); ctx.closePath(); ctx.fill(); ctx.fillStyle=pick(rand,P.c); ctx.beginPath(); ctx.moveTo(o2+s*.3,o2+s); ctx.lineTo(o2+s/2,o2+s*.6); ctx.lineTo(o2+s*.7,o2+s); ctx.fill(); }
      else if (m==='diamond'){ ctx.moveTo(o2+s/2,o2+s*.1); ctx.lineTo(o2+s*.9,o2+s/2); ctx.lineTo(o2+s/2,o2+s*.9); ctx.lineTo(o2+s*.1,o2+s/2); ctx.closePath(); ctx.fill(); ctx.fillStyle=bg2; ctx.beginPath(); ctx.moveTo(o2+s/2,o2+s*.32); ctx.lineTo(o2+s*.68,o2+s/2); ctx.lineTo(o2+s/2,o2+s*.68); ctx.lineTo(o2+s*.32,o2+s/2); ctx.fill(); }
      else if (m==='chevron'){ for (let k=0;k<3;k++){ const yy=o2+s*(.2+k*.28); ctx.moveTo(o2+s*.1,yy+s*.2); ctx.lineTo(o2+s/2,yy); ctx.lineTo(o2+s*.9,yy+s*.2); } ctx.lineWidth=s*.09; ctx.lineJoin='miter'; ctx.stroke(); }
      else if (m==='stripes'){ for (let k=0;k<5;k++){ ctx.rect(o2, o2+s*k/5, s, s/10); } ctx.fill(); }
      else { ctx.moveTo(o2,o2); ctx.lineTo(o2+s,o2); ctx.lineTo(o2+s/2,o2+s/2); ctx.closePath(); ctx.moveTo(o2,o2+s); ctx.lineTo(o2+s,o2+s); ctx.lineTo(o2+s/2,o2+s/2); ctx.closePath(); ctx.fill(); }
      ctx.restore();
    }
  },

  flow(ctx, W, H, P, rand, noise, o, t){
    const n = 300 + o.density*28, steps = 20 + o.complexity*1.6, scale = 1.2 + rand()*2.2, len = W*.004;
    ctx.lineCap='round';
    for (let i=0;i<n;i++){
      let x = rand()*W, y = rand()*H; const col = pick(rand,P.c); ctx.strokeStyle = hexA(col, .25+rand()*.55); ctx.lineWidth = W*(.0006+rand()*.0022);
      ctx.beginPath(); ctx.moveTo(x,y);
      for (let s=0;s<steps;s++){ const a = noise(x/W*scale + t*.05, y/H*scale) * Math.PI*3; x += Math.cos(a)*len; y += Math.sin(a)*len; if (x<0||x>W||y<0||y>H) break; ctx.lineTo(x,y); }
      ctx.stroke();
    }
    const r = W*(.08+rand()*.08); ctx.fillStyle = P.c[2]; ctx.globalAlpha=.9; ctx.beginPath(); ctx.arc(W*(.2+rand()*.6), H*(.2+rand()*.4), r, 0, 7); ctx.fill(); ctx.globalAlpha=1;
  },

  bauhaus(ctx, W, H, P, rand, noise, o, t){
    const cols = 2 + Math.round(o.density/20), cell = W/cols, rows = Math.ceil(H/cell);
    for (let r=0;r<rows;r++) for (let c=0;c<cols;c++){
      const x=c*cell, y=r*cell, bg2 = rand()<.35 ? pick(rand,P.c) : P.bg; let fg = pick(rand,P.c); if (fg===bg2) fg = P.ink;
      ctx.fillStyle=bg2; ctx.fillRect(x,y,cell+1,cell+1); ctx.fillStyle=fg;
      ctx.save(); ctx.translate(x+cell/2,y+cell/2); ctx.rotate(Math.floor(rand()*4)*Math.PI/2 + (o.animate ? t*.3*((r+c)%2?1:-1) : 0)); ctx.translate(-cell/2,-cell/2);
      const k = Math.floor(rand()*(3 + o.complexity/20)); ctx.beginPath();
      if (k===0){ ctx.moveTo(0,0); ctx.arc(0,0,cell,0,Math.PI/2); ctx.closePath(); ctx.fill(); }
      else if (k===1){ ctx.arc(cell/2,cell/2,cell*.36,0,7); ctx.fill(); }
      else if (k===2){ ctx.moveTo(0,cell); ctx.lineTo(cell/2,0); ctx.lineTo(cell,cell); ctx.fill(); }
      else if (k===3){ ctx.arc(cell/2,cell,cell/2,Math.PI,0); ctx.fill(); }
      else if (k===4){ ctx.lineWidth=cell*.12; ctx.strokeStyle=fg; ctx.arc(cell/2,cell/2,cell*.3,0,7); ctx.stroke(); }
      else { ctx.fillRect(cell*.15,cell*.15,cell*.7,cell*.2); ctx.fillRect(cell*.15,cell*.55,cell*.7,cell*.2); }
      ctx.restore();
    }
  },
};

/* ============ RENDER ============ */
let grainTile = null;
function getGrain(){
  if (grainTile) return grainTile;
  const c = document.createElement('canvas'); c.width = c.height = 180; const x = c.getContext('2d'), d = x.createImageData(180,180);
  for (let i=0;i<d.data.length;i+=4){ const v = Math.random()*255; d.data[i]=d.data[i+1]=d.data[i+2]=v; d.data[i+3]=26; }
  x.putImageData(d,0,0); return grainTile = c;
}
function render(canvas, W, H, o, t=0){
  const ctx = canvas.getContext('2d'), P = PALETTES.find(p=>p.id===o.palette), rand = mulberry32(o.seed*7919 + 17), noise = makeNoise(mulberry32(o.seed));
  ctx.save(); ctx.fillStyle = P.bg; ctx.fillRect(0,0,W,H);
  DRAW[o.style](ctx, W, H, P, rand, noise, o, t);
  ctx.restore();
  if (o.grain){ ctx.save(); ctx.globalCompositeOperation = 'overlay'; const g = getGrain(); const sc = Math.max(1, W/900); ctx.scale(sc,sc); ctx.fillStyle = ctx.createPattern(g,'repeat'); ctx.fillRect(0,0,W/sc,H/sc); ctx.restore(); }
  if (o.showText && (o.title || o.subtitle)){
    const pad = W*.07; ctx.save();
    // readability veil
    const v = ctx.createLinearGradient(0, H*.62, 0, H); v.addColorStop(0, hexA(P.bg,0)); v.addColorStop(1, hexA(P.bg,.82)); ctx.fillStyle=v; ctx.fillRect(0,H*.62,W,H*.38);
    ctx.fillStyle = P.ink; ctx.textBaseline = 'alphabetic';
    let size = W*.085; ctx.font = `700 ${size}px "Space Grotesk", sans-serif`;
    const maxW = W - pad*2, words = (o.title||'').split(' '), lines = []; let line = '';
    for (const w of words){ const test = line ? line+' '+w : w; if (ctx.measureText(test).width > maxW && line){ lines.push(line); line = w; } else line = test; } if (line) lines.push(line);
    if (lines.length > 3){ size *= .75; ctx.font = `700 ${size}px "Space Grotesk", sans-serif`; }
    const subSize = W*.026, baseY = H - pad - (o.subtitle ? subSize*2.2 : 0);
    lines.slice(0,4).reverse().forEach((l,i) => ctx.fillText(l, pad, baseY - i*size*1.02));
    if (o.subtitle){ ctx.font = `500 ${subSize}px Inter, sans-serif`; ctx.globalAlpha=.85; ctx.fillText(o.subtitle, pad, H - pad); }
    ctx.globalAlpha=.6; ctx.font = `600 ${W*.016}px Inter, sans-serif`; ctx.textAlign='right';
    ctx.fillText(`KAI LABS · ${o.style.toUpperCase()} · #${o.seed}`, W - pad, pad*.9);
    ctx.restore();
  }
  if (o.frame){ ctx.save(); ctx.strokeStyle = hexA(P.ink,.85); ctx.lineWidth = W*.004; const m = W*.03; ctx.strokeRect(m,m,W-m*2,H-m*2); ctx.restore(); }
}

/* ============ UI ============ */
const $ = id => document.getElementById(id);
const canvas = $('poster');
function size(){
  const r = FORMATS.find(f=>f.id===S.format).r, wrap = canvas.parentElement.getBoundingClientRect();
  const maxH = Math.min(window.innerHeight - 220, wrap.height || 9999), maxW = wrap.width;
  let w = Math.min(maxW, maxH / r); if (window.innerWidth < 860) w = Math.min(maxW, (window.innerHeight*.62)/r);
  const dpr = Math.min(devicePixelRatio||1, 2);
  canvas.style.width = w+'px'; canvas.style.height = (w*r)+'px';
  canvas.width = Math.round(w*dpr); canvas.height = Math.round(w*r*dpr);
}
let raf = 0, t0 = performance.now();
function draw(){ size(); render(canvas, canvas.width, canvas.height, S, (performance.now()-t0)/1000); }
function loop(){ render(canvas, canvas.width, canvas.height, S, (performance.now()-t0)/1000); raf = requestAnimationFrame(loop); }
function update(){ cancelAnimationFrame(raf); syncUI(); writeHash(); draw(); if (S.animate) raf = requestAnimationFrame(loop); }
function writeHash(){ const h = new URLSearchParams(); for (const [k,v] of Object.entries(S)) h.set(k, typeof v === 'boolean' ? (v?'1':'0') : v); history.replaceState(null,'','#'+h.toString()); }

function seg(el, items, key){
  el.innerHTML = items.map((it,i) => `<button data-v="${it.id}" aria-pressed="false" title="${key==='style' ? 'Shortcut: '+(i+1) : ''}">${it.name}</button>`).join('');
  el.addEventListener('click', e => { const b = e.target.closest('button'); if (!b) return; S[key] = b.dataset.v; update(); });
}
seg($('styles'), STYLES, 'style'); seg($('formats'), FORMATS, 'format');
$('palettes').innerHTML = PALETTES.map(p => `<button class="pal" data-v="${p.id}" aria-pressed="false"><span class="chips"><i style="background:${p.bg}"></i>${p.c.slice(0,4).map(c=>`<i style="background:${c}"></i>`).join('')}</span><span>${p.name}</span></button>`).join('');
$('palettes').addEventListener('click', e => { const b = e.target.closest('button'); if (!b) return; S.palette = b.dataset.v; update(); });

function syncUI(){
  document.querySelectorAll('#styles button').forEach(b => b.setAttribute('aria-pressed', b.dataset.v===S.style));
  document.querySelectorAll('#formats button').forEach(b => b.setAttribute('aria-pressed', b.dataset.v===S.format));
  document.querySelectorAll('#palettes button').forEach(b => b.setAttribute('aria-pressed', b.dataset.v===S.palette));
  $('seed').value = S.seed; $('density').value = S.density; $('complexity').value = S.complexity; $('densityOut').textContent = S.density; $('complexityOut').textContent = S.complexity;
  $('title').value = S.title; $('subtitle').value = S.subtitle;
  ['showText','grain','animate','frame'].forEach(k => $(k).checked = S[k]);
}
$('seed').addEventListener('change', e => { S.seed = Math.max(1, Math.min(999999, +e.target.value||1)); update(); });
['density','complexity'].forEach(k => $(k).addEventListener('input', e => { S[k] = +e.target.value; $(k+'Out').textContent = S[k]; update(); }));
['title','subtitle'].forEach(k => $(k).addEventListener('input', e => { S[k] = e.target.value; update(); }));
['showText','grain','animate','frame'].forEach(k => $(k).addEventListener('change', e => { S[k] = e.target.checked; update(); }));

/* history */
const hist = [];
function remember(){
  const c = document.createElement('canvas'), r = FORMATS.find(f=>f.id===S.format).r; c.width = 120; c.height = Math.round(120*r);
  render(c, c.width, c.height, {...S, showText:false, frame:false}, 0);
  hist.unshift({state:{...S}, img:c.toDataURL('image/jpeg',.8)}); hist.splice(10);
  $('history').innerHTML = hist.map((h,i) => `<button data-i="${i}" aria-label="Restore poster ${h.state.style} seed ${h.state.seed}"><img src="${h.img}" alt=""></button>`).join('');
}
$('history').addEventListener('click', e => { const b = e.target.closest('button'); if (!b) return; Object.assign(S, hist[+b.dataset.i].state); update(); });

function shuffle(){
  remember();
  S.seed = 1 + Math.floor(Math.random()*999999);
  if (Math.random() < .5) S.style = STYLES[Math.floor(Math.random()*STYLES.length)].id;
  if (Math.random() < .4) S.palette = PALETTES[Math.floor(Math.random()*PALETTES.length)].id;
  S.density = 30 + Math.floor(Math.random()*60); S.complexity = 30 + Math.floor(Math.random()*60);
  update();
}
$('shuffle').addEventListener('click', shuffle);
$('dice').addEventListener('click', () => { remember(); S.seed = 1 + Math.floor(Math.random()*999999); update(); });

/* export */
const toast = (m) => { const t = $('toast'); t.textContent = m; t.classList.add('show'); setTimeout(()=>t.classList.remove('show'), 1600); };
async function download(){
  await document.fonts.ready;
  const r = FORMATS.find(f=>f.id===S.format).r, W = 2160, H = Math.round(W*r), c = document.createElement('canvas'); c.width = W; c.height = H;
  render(c, W, H, S, S.animate ? (performance.now()-t0)/1000 : 0);
  c.toBlob(b => { const a = document.createElement('a'); a.href = URL.createObjectURL(b); a.download = `kai-poster-${S.style}-${S.seed}.png`; a.click(); setTimeout(()=>URL.revokeObjectURL(a.href), 3000); toast(`Saved ${W}×${H} PNG`); }, 'image/png');
}
$('download').addEventListener('click', download);
$('share').addEventListener('click', async () => { writeHash(); try { await navigator.clipboard.writeText(location.href); toast('Link copied: it opens this exact poster'); } catch { toast('Copy the address bar to share'); } });

/* keyboard */
document.addEventListener('keydown', e => {
  if (e.target.matches('input')) return;
  if (e.code === 'Space'){ e.preventDefault(); shuffle(); }
  else if (e.key.toLowerCase() === 's'){ e.preventDefault(); download(); }
  else if (/^[1-5]$/.test(e.key)){ S.style = STYLES[+e.key-1].id; update(); }
});
addEventListener('resize', () => { if (!S.animate) draw(); });
document.fonts.ready.then(update);
update();
