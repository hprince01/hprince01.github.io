import * as THREE from 'three';
import { RoomEnvironment } from 'three/addons/environments/RoomEnvironment.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { EffectComposer } from 'three/addons/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/addons/postprocessing/RenderPass.js';
import { UnrealBloomPass } from 'three/addons/postprocessing/UnrealBloomPass.js';
import { OutputPass } from 'three/addons/postprocessing/OutputPass.js';

/* =========================================================
   REALISTIC MODEL: put a .glb file here and it is used automatically.
   ========================================================= */
const MODEL_URL = 'assets/m4.glb';
const MODEL_CREDIT = '“BMW M4 CSL 2023” by Black Snow (sketchfab.com/BlackSnow02), licensed CC BY 4.0.';

const { gsap, ScrollTrigger, Lenis } = window;
gsap.registerPlugin(ScrollTrigger);
const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
const fine = matchMedia('(pointer: fine)').matches;

/* ---------- smooth scroll ---------- */
let lenis = null;
if (!reduce) { lenis = new Lenis({ lerp: 0.08 }); lenis.on('scroll', ScrollTrigger.update); gsap.ticker.add(t => lenis.raf(t * 1000)); gsap.ticker.lagSmoothing(0); }
document.querySelectorAll('.nav-r a[href^="#"]').forEach(a => a.addEventListener('click', e => { e.preventDefault(); const t = document.querySelector(a.getAttribute('href')); lenis ? lenis.scrollTo(t) : t.scrollIntoView(); }));
ScrollTrigger.create({ start: 0, end: 'max', onUpdate: s => document.getElementById('progress').style.width = (s.progress * 100) + '%' });

/* ---------- 1 · hero: zoom into the field ---------- */
if (!reduce) {
  gsap.timeline({ scrollTrigger: { trigger: '#hero', start: 'top top', end: 'bottom bottom', scrub: true } })
    .to('#heroBg', { scale: 1.55, yPercent: 6, ease: 'none' }, 0)
    .to('#heroTitle', { scale: 1.5, opacity: 0, yPercent: -30, ease: 'none' }, 0)
    .to('.hero .sub, .hero .meta', { opacity: 0, y: -40, ease: 'none' }, 0);
  // headlights flicker on like a car starting
  gsap.timeline({ delay: 0.3 }).set('#heroBg', { opacity: 0 }).to('#heroBg', { opacity: 0.9, duration: 0.06 }, 0.2).to('#heroBg', { opacity: 0.1, duration: 0.05 }, 0.32).to('#heroBg', { opacity: 1, duration: 0.06 }, 0.5).to('#heroBg', { opacity: 0.35, duration: 0.05 }, 0.62).to('#heroBg', { opacity: 1, duration: 0.5 }, 0.8);
  gsap.from('#heroTitle span', { yPercent: 100, opacity: 0, duration: 1.4, stagger: 0.12, ease: 'expo.out' });
}
/* ---------- 2 · mine: drone shot tilts from a 3D angle to flat, hotspots pop ---------- */
if (!reduce) {
  gsap.timeline({ scrollTrigger: { trigger: '#mine', start: 'top top', end: 'bottom bottom', scrub: true } })
    .fromTo('#mineCard', { rotateX: 58, rotateZ: -22, scale: 0.78, y: 120 }, { rotateX: 0, rotateZ: 0, scale: 1, y: 0, ease: 'none', duration: 0.6 }, 0)
    .from('.mine-copy > *', { y: 60, opacity: 0, stagger: 0.05, ease: 'none', duration: 0.3 }, 0)
    .to('.hot', { opacity: 1, x: 0, stagger: 0.08, ease: 'none', duration: 0.12 }, 0.55)
    .to('#mineCard', { scale: 1.06, ease: 'none', duration: 0.4 }, 0.6);
} else { document.querySelectorAll('.hot').forEach(h => h.style.opacity = 1); }
/* ---------- 3 · wheel: background drifts slower than the phone (depth) ---------- */
if (!reduce) {
  gsap.fromTo('#wheelBg', { yPercent: -10 }, { yPercent: 10, ease: 'none', scrollTrigger: { trigger: '#wheel', start: 'top bottom', end: 'bottom top', scrub: true } });
  gsap.fromTo('#phone', { y: 120, rotateY: -18, rotateX: 8 }, { y: -60, rotateY: 10, rotateX: -4, ease: 'none', scrollTrigger: { trigger: '#wheel', start: 'top bottom', end: 'bottom top', scrub: true } });
  gsap.from('.wheel-copy > *', { y: 50, opacity: 0, stagger: 0.1, duration: 1, ease: 'power3.out', scrollTrigger: { trigger: '.wheel-copy', start: 'top 80%' } });
}
const phone = document.getElementById('phone'), vid = phone.querySelector('video');
if (fine && !reduce) {
  document.getElementById('phoneWrap').addEventListener('pointermove', e => { const r = phone.getBoundingClientRect(); gsap.to(phone, { rotateY: ((e.clientX - r.left) / r.width - 0.5) * 24, rotateX: (0.5 - (e.clientY - r.top) / r.height) * 16, duration: 0.5 }); });
}
// only play the clip while it's on screen
new IntersectionObserver(es => es.forEach(e => e.isIntersecting ? vid.play().catch(() => {}) : vid.pause()), { threshold: 0.2 }).observe(vid);

/* ---------- 4 · dark: push in to the headlights, lights flare ---------- */
if (!reduce) {
  gsap.timeline({ scrollTrigger: { trigger: '#dark', start: 'top top', end: 'bottom bottom', scrub: true } })
    .fromTo('#darkPhoto', { scale: 1.05, filter: 'brightness(.35)' }, { scale: 1.6, yPercent: 4, filter: 'brightness(1.05)', ease: 'none' }, 0)
    .fromTo('#glowfx', { opacity: 0 }, { opacity: 1, ease: 'none' }, 0.2)
    .from('#darkCopy > *', { y: 60, opacity: 0, stagger: 0.05, ease: 'none', duration: 0.3 }, 0)
    .fromTo('#tiltWrap', { yPercent: 40, opacity: 0, rotate: 4 }, { yPercent: 0, opacity: 1, rotate: 0, ease: 'none', duration: 0.4 }, 0.15)
    .to('#darkCopy, #tiltWrap', { opacity: 0, y: -60, ease: 'none', duration: 0.2 }, 0.8);
}
/* 3D tilt card follows the mouse */
const tilt = document.getElementById('tilt');
if (fine && !reduce) {
  tilt.addEventListener('pointermove', e => {
    const r = tilt.getBoundingClientRect(), x = (e.clientX - r.left) / r.width, y = (e.clientY - r.top) / r.height;
    gsap.to(tilt, { rotateY: (x - 0.5) * 22, rotateX: (0.5 - y) * 18, duration: 0.5, ease: 'power2.out' });
    tilt.style.setProperty('--mx', x * 100 + '%'); tilt.style.setProperty('--my', y * 100 + '%');
  });
  tilt.addEventListener('pointerleave', () => gsap.to(tilt, { rotateX: 0, rotateY: 0, duration: 0.8, ease: 'elastic.out(1,.5)' }));
}
/* ---------- 4/5 · parallax photos + counters ---------- */
if (!reduce) {
  gsap.fromTo('#numPhoto', { yPercent: -8, scale: 1.1 }, { yPercent: 8, scale: 1, ease: 'none', scrollTrigger: { trigger: '#numbers', start: 'top bottom', end: 'bottom top', scrub: true } });
  gsap.fromTo('#finPhoto', { scale: 1.35 }, { scale: 1, ease: 'none', scrollTrigger: { trigger: '#finale', start: 'top bottom', end: 'bottom bottom', scrub: true } });
  gsap.utils.toArray('.numbers .copy > *, .finale .copy > *').forEach(el => gsap.from(el, { y: 50, opacity: 0, duration: 1, ease: 'power3.out', scrollTrigger: { trigger: el, start: 'top 85%' } }));
}
document.querySelectorAll('[data-count]').forEach(el => {
  const end = +el.dataset.count, dec = +(el.dataset.dec || 0), unit = el.querySelector('small').outerHTML, o = { v: 0 };
  gsap.to(o, { v: end, duration: 1.8, ease: 'power2.out', scrollTrigger: { trigger: el, start: 'top 88%' }, onUpdate: () => el.innerHTML = (dec ? o.v.toFixed(dec) : Math.round(o.v).toLocaleString('en-US')) + unit });
});

/* =========================================================
   3 · REAL-TIME 3D STUDIO
   ========================================================= */
const canvas = document.getElementById('gl');
let renderer;
try { renderer = new THREE.WebGLRenderer({ canvas, antialias: true, powerPreference: 'high-performance' }); }
catch (e) { document.getElementById('loading3d').textContent = 'WEBGL NOT AVAILABLE ON THIS DEVICE'; throw e; }
renderer.setPixelRatio(Math.min(devicePixelRatio, 1.75));
renderer.toneMapping = THREE.ACESFilmicToneMapping;
const scene = new THREE.Scene();
const BG = new THREE.Color('#030407'); scene.background = BG; scene.fog = new THREE.Fog(BG, 11, 30);
const pmrem = new THREE.PMREMGenerator(renderer);
scene.environment = pmrem.fromScene(new RoomEnvironment(), 0.04).texture;
const camera = new THREE.PerspectiveCamera(30, 1, 0.1, 100);
const key = new THREE.DirectionalLight(0xcfe0ff, 1.4); key.position.set(4, 8, 5); scene.add(key);
const rim = new THREE.DirectionalLight(0x2f7bff, 2.6); rim.position.set(-6, 3, -5); scene.add(rim);
const fill = new THREE.DirectionalLight(0xe7222e, 0.6); fill.position.set(-4, 1.5, 6); scene.add(fill);

// stage: dark glossy floor, glowing ring, light bars
const floor = new THREE.Mesh(new THREE.CircleGeometry(30, 64), new THREE.MeshStandardMaterial({ color: 0x06080d, metalness: 0.4, roughness: 0.55 }));
floor.rotation.x = -Math.PI / 2; scene.add(floor);
const ring = new THREE.Mesh(new THREE.RingGeometry(3.3, 3.34, 128), new THREE.MeshBasicMaterial({ color: new THREE.Color('#5ad1ff').multiplyScalar(1.6), side: THREE.DoubleSide }));
ring.rotation.x = -Math.PI / 2; ring.position.y = 0.004; scene.add(ring);
const grid = new THREE.GridHelper(60, 60, 0x14295a, 0x0a1430); grid.material.transparent = true; grid.material.opacity = 0.3; grid.position.y = 0.002; scene.add(grid);
const barMat = new THREE.MeshBasicMaterial({ color: new THREE.Color('#dff1ff').multiplyScalar(1.8) });
for (let i = 0; i < 6; i++) { const b = new THREE.Mesh(new THREE.BoxGeometry(3.2, 0.03, 0.03), barMat); const a = i / 6 * Math.PI * 2; b.position.set(Math.cos(a) * 9, 4.2, Math.sin(a) * 9); b.lookAt(0, 4.2, 0); scene.add(b); }
const shadowTex = (() => { const c = document.createElement('canvas'); c.width = c.height = 256; const x = c.getContext('2d'); const g = x.createRadialGradient(128, 128, 8, 128, 128, 128); g.addColorStop(0, 'rgba(0,0,0,.9)'); g.addColorStop(1, 'rgba(0,0,0,0)'); x.fillStyle = g; x.fillRect(0, 0, 256, 256); return new THREE.CanvasTexture(c); })();
const shadow = new THREE.Mesh(new THREE.PlaneGeometry(6.2, 3.2), new THREE.MeshBasicMaterial({ map: shadowTex, transparent: true, depthWrite: false })); shadow.rotation.x = -Math.PI / 2; shadow.position.y = 0.006; scene.add(shadow);

const carRoot = new THREE.Group(); scene.add(carRoot);
const paintTarget = new THREE.Color("#0a0b0e");
let paintMats = [], glowMats = [], wheelsSpin = [];

/* ---- fallback: coded concept car (used until a realistic .glb is added) ---- */
function buildConceptCar() {
  const car = new THREE.Group();
  const paint = new THREE.MeshPhysicalMaterial({ color: '#1d4fa8', metalness: 0.6, roughness: 0.34, clearcoat: 1, clearcoatRoughness: 0.06 });
  const glass = new THREE.MeshPhysicalMaterial({ color: '#03050a', metalness: 0.3, roughness: 0.16, clearcoat: 0.6 });
  const trim = new THREE.MeshStandardMaterial({ color: '#0a0b0f', metalness: 0.6, roughness: 0.45 });
  const s = new THREE.Shape();
  s.moveTo(-2.32, 0.42); s.lineTo(-2.25, 0.30); s.lineTo(-1.92, 0.30); s.lineTo(-1.92, 0.36); s.absarc(-1.45, 0.36, 0.47, Math.PI, 0, true);
  s.lineTo(-0.98, 0.30); s.lineTo(0.98, 0.30); s.lineTo(0.98, 0.36); s.absarc(1.45, 0.36, 0.47, Math.PI, 0, true);
  s.lineTo(1.92, 0.30); s.lineTo(2.28, 0.32); s.quadraticCurveTo(2.46, 0.40, 2.43, 0.60); s.quadraticCurveTo(2.37, 0.80, 1.80, 0.86);
  s.quadraticCurveTo(1.20, 0.92, 0.70, 0.98); s.lineTo(-1.30, 1.00); s.quadraticCurveTo(-2.05, 0.98, -2.30, 0.82); s.quadraticCurveTo(-2.42, 0.62, -2.32, 0.42);
  const bg = new THREE.ExtrudeGeometry(s, { depth: 1.7, bevelEnabled: true, bevelThickness: 0.14, bevelSize: 0.09, bevelSegments: 8, curveSegments: 48 }); bg.translate(0, 0, -0.85);
  car.add(new THREE.Mesh(bg, paint));
  const g = new THREE.Shape(); g.moveTo(0.78, 0.97); g.quadraticCurveTo(0.35, 1.30, -0.15, 1.39); g.quadraticCurveTo(-0.6, 1.43, -0.98, 1.39); g.quadraticCurveTo(-1.55, 1.30, -1.80, 1.00); g.lineTo(0.78, 0.97);
  const gg = new THREE.ExtrudeGeometry(g, { depth: 1.26, bevelEnabled: true, bevelThickness: 0.12, bevelSize: 0.08, bevelSegments: 8, curveSegments: 32 }); gg.translate(0, 0, -0.63);
  car.add(new THREE.Mesh(gg, glass));
  const mk = (c, k) => { const m = new THREE.MeshBasicMaterial({ color: new THREE.Color(c) }); m.userData = { base: new THREE.Color(c), k }; glowMats.push(m); return m; };
  const head = mk('#dff4ff', 4), grille = mk('#5ad1ff', 4.2), tail = mk('#ff2340', 3);
  [-1, 1].forEach(z => { const h = new THREE.Mesh(new THREE.BoxGeometry(0.05, 0.04, 0.46), head); h.position.set(2.47, 0.70, z * 0.62); h.rotation.y = z * 0.18; car.add(h); });
  [-0.15, 0.15].forEach(z => { const k = new THREE.Mesh(new THREE.BoxGeometry(0.03, 0.3, 0.26), grille); k.position.set(2.55, 0.54, z); car.add(k); const f = new THREE.Mesh(new THREE.BoxGeometry(0.035, 0.25, 0.21), trim); f.position.set(2.56, 0.54, z); car.add(f); });
  const t = new THREE.Mesh(new THREE.BoxGeometry(0.04, 0.035, 1.75), tail); t.position.set(-2.4, 0.80, 0); car.add(t);
  const tire = new THREE.MeshStandardMaterial({ color: '#0b0b0d', roughness: 0.85 }), rimM = new THREE.MeshStandardMaterial({ color: '#9aa3b2', metalness: 1, roughness: 0.22 });
  [[1.45, 0.88], [1.45, -0.88], [-1.45, 0.88], [-1.45, -0.88]].forEach(([x, z]) => {
    const w = new THREE.Group(); const tr = new THREE.Mesh(new THREE.CylinderGeometry(0.37, 0.37, 0.24, 48), tire); tr.rotation.x = Math.PI / 2; w.add(tr);
    const rm = new THREE.Mesh(new THREE.CylinderGeometry(0.27, 0.27, 0.25, 40), rimM); rm.rotation.x = Math.PI / 2; w.add(rm);
    for (let k = 0; k < 5; k++) { const sp = new THREE.Mesh(new THREE.BoxGeometry(0.045, 0.24, 0.03), rimM); sp.position.z = Math.sign(z) * 0.13; sp.rotation.z = k * Math.PI * 2 / 5; sp.translateY(0.12); w.add(sp); }
    w.position.set(x, 0.37, z); car.add(w); wheelsSpin.push(w);
  });
  paintMats = [paint];
  return car;
}

/* ---- realistic model loader ---- */
function prepareModel(root) {
  // normalise size + position: longest side → 4.7 units, wheels on the floor, centred
  const box = new THREE.Box3().setFromObject(root), size = box.getSize(new THREE.Vector3());
  const long = Math.max(size.x, size.z), s = 4.7 / long; root.scale.setScalar(s);
  const b2 = new THREE.Box3().setFromObject(root), c = b2.getCenter(new THREE.Vector3());
  root.position.x -= c.x; root.position.z -= c.z; root.position.y -= b2.min.y;
  if (size.z > size.x) root.rotation.y = Math.PI / 2; // make the car's length run along X like the concept car
  // find paint + glowing parts
  const area = new Map();
  root.traverse(o => {
    if (!o.isMesh) return; o.castShadow = false;
    const mats = Array.isArray(o.material) ? o.material : [o.material];
    mats.forEach(m => {
      if (!m) return; m.envMapIntensity = 1.2;
      const n = (m.name + ' ' + o.name).toLowerCase();
      if (/paint|body|carpaint|car_paint|exterior|coat|primary/.test(n) && !/glass|tire|tyre|rubber|interior|chrome|rim|light|lamp/.test(n)) paintMats.push(m);
      if ((m.emissive && (m.emissiveMap || m.emissive.getHex() > 0)) || /headlight|head_light|lamp|drl|angel|led|light/.test(n)) {
        if (m.emissive) { m.userData.k = m.emissiveIntensity || 1; glowMats.push(m); }
      }
      const g = o.geometry; if (g) { g.computeBoundingBox(); const v = g.boundingBox.getSize(new THREE.Vector3()); area.set(m, (area.get(m) || 0) + v.x * v.y + v.y * v.z + v.x * v.z); }
    });
  });
  if (!paintMats.length) { // fall back: the most-used coloured, non-dark material is probably the paint
    const cands = [...area.entries()].filter(([m]) => m.color && m.color.getHSL({}).l > 0.06 && !m.transparent).sort((a, b) => b[1] - a[1]);
    if (cands[0]) paintMats.push(cands[0][0]);
  }
  paintMats = [...new Set(paintMats)];
  paintMats.forEach(m => { if ('clearcoat' in m) { m.clearcoat = 1; m.clearcoatRoughness = 0.05; } });
  return root;
}

async function loadCar() {
  let usedModel = false;
  try {
    const head = await fetch(MODEL_URL, { method: 'HEAD' });
    if (head.ok) {
      const gltf = await new GLTFLoader().loadAsync(MODEL_URL, e => { if (e.total) document.getElementById('loading3d').textContent = 'LOADING 3D · ' + Math.round(e.loaded / e.total * 100) + '%'; });
      carRoot.add(prepareModel(gltf.scene)); usedModel = true;
      document.getElementById('modelCredit').textContent = '3D model: ' + MODEL_CREDIT;
      document.getElementById('modelNote').textContent = 'Model: ' + MODEL_CREDIT;
    }
  } catch (e) { console.warn('Realistic model not loaded, using concept car.', e); }
  if (!usedModel) { carRoot.add(buildConceptCar()); document.getElementById('modelNote').textContent = 'Showing the coded concept car. Add assets/m4.glb for the realistic model.'; }
  if (paintMats[0]?.color) paintMats.forEach(m => m.color.copy(paintTarget));
  document.getElementById('loading3d').style.opacity = 0;
}
loadCar();

/* ---- bloom ---- */
const composer = new EffectComposer(renderer);
composer.addPass(new RenderPass(scene, camera));
const bloom = new UnrealBloomPass(new THREE.Vector2(1, 1), 0.6, 0.45, 0.9); composer.addPass(bloom);
composer.addPass(new OutputPass());

/* ---- scroll keyframes for the 3D section ---- */
const K = [
  { cam: [5.2, 1.5, 6.2], look: [0, 0.6, 0], exp: 1.0, lights: 0.4, spin: 0, shift: -0.16 },
  { cam: [6.6, 0.8, 1.2], look: [0, 0.6, 0], exp: 0.4, lights: 1.0, spin: 0, shift: 0.16 },
  { cam: [-5.6, 1.6, -4.2], look: [0, 0.7, 0], exp: 0.85, lights: 0.6, spin: 0, shift: -0.16 },
  { cam: [5.4, 2.1, 5.6], look: [0, 0.55, 0], exp: 1.05, lights: 0.7, spin: 1, shift: 0.16 },
];
const st = { p: 0 }, smooth = t => t * t * (3 - 2 * t), lerp = (a, b, t) => a + (b - a) * t;
function sample(p) {
  const f = Math.min(Math.max(p, 0), 1) * (K.length - 1), i = Math.min(Math.floor(f), K.length - 2), t = smooth(f - i), A = K[i], B = K[i + 1], o = { f };
  for (const k of ['exp', 'lights', 'spin', 'shift']) o[k] = lerp(A[k], B[k], t);
  o.cam = A.cam.map((v, j) => lerp(v, B.cam[j], t)); o.look = A.look.map((v, j) => lerp(v, B.look[j], t)); return o;
}
const panels = [...document.querySelectorAll('.studio .panel')];
let visible = false;
ScrollTrigger.create({ trigger: '#studio', start: 'top top', end: 'bottom bottom', scrub: reduce ? true : 0.7,
  onUpdate: s => { st.p = s.progress; const k = Math.min(3, Math.round(s.progress * 3)); panels.forEach(p => p.classList.toggle('on', +p.dataset.k === k)); document.getElementById('hudK').textContent = '0' + (k + 1); } });
ScrollTrigger.create({ trigger: '#studio', start: 'top bottom', end: 'bottom top', onToggle: s => visible = s.isActive });

const mouse = { x: 0, y: 0, tx: 0, ty: 0 };
addEventListener('pointermove', e => { mouse.tx = (e.clientX / innerWidth - 0.5) * 2; mouse.ty = (e.clientY / innerHeight - 0.5) * 2; });
document.querySelectorAll('.sw').forEach(b => b.addEventListener('click', () => {
  document.querySelectorAll('.sw').forEach(x => x.setAttribute('aria-pressed', x === b)); paintTarget.set(b.dataset.c);
  document.getElementById('hudPaint').textContent = b.dataset.n.toUpperCase();
}));

function resize() {
  const w = innerWidth, h = innerHeight; renderer.setSize(w, h, false); composer.setSize(w, h); bloom.setSize(w, h);
  camera.aspect = w / h; camera.fov = camera.aspect < 0.8 ? 50 : 30; camera.updateProjectionMatrix();
}
addEventListener('resize', resize); resize();

const clock = new THREE.Clock(), look = new THREE.Vector3(); let turn = 0;
function frame() {
  requestAnimationFrame(frame);
  const dt = Math.min(clock.getDelta(), 0.05), t = clock.elapsedTime;
  if (!visible) return;
  const o = sample(st.p);
  mouse.x += (mouse.tx - mouse.x) * 0.05; mouse.y += (mouse.ty - mouse.y) * 0.05;
  const port = camera.aspect < 0.8 ? 1.4 : 1, mx = reduce ? 0 : mouse.x, my = reduce ? 0 : mouse.y;
  camera.position.set(o.cam[0] * port + mx * 0.5, o.cam[1] - my * 0.3, o.cam[2] * port + mx * 0.25);
  look.set(...o.look); camera.lookAt(look);
  const sh = camera.aspect < 0.8 ? 0 : o.shift; camera.setViewOffset(innerWidth, innerHeight, innerWidth * sh, 0, innerWidth, innerHeight);
  turn += dt * 0.3 * o.spin; carRoot.rotation.y = turn;
  wheelsSpin.forEach(w => w.rotation.z -= dt * 2 * (1 - o.spin));
  renderer.toneMappingExposure = o.exp; scene.environmentIntensity = 0.15 + o.exp * 0.45; key.intensity = 1.4 * o.exp;
  glowMats.forEach(m => {
    if (m.isMeshBasicMaterial) m.color.copy(m.userData.base).multiplyScalar(0.15 + o.lights * m.userData.k);
    else m.emissiveIntensity = (m.userData.k || 1) * (0.4 + o.lights * 3);
  });
  paintMats.forEach(m => m.color && m.color.lerp(paintTarget, 0.06));
  ring.material.color.setRGB(0.35, 0.82, 1).multiplyScalar(0.6 + Math.sin(t * 2) * 0.2 + o.lights);
  composer.render();
}
frame();
