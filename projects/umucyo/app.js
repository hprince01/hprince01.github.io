document.getElementById('y').textContent = new Date().getFullYear();
const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;

// copy hex
const toast = document.getElementById('copied');
document.querySelectorAll('.sw').forEach(b => b.addEventListener('click', async () => {
  try { await navigator.clipboard.writeText(b.dataset.hex); toast.textContent = b.dataset.hex + ' copied'; }
  catch { toast.textContent = b.dataset.hex; }
  toast.classList.add('show'); setTimeout(() => toast.classList.remove('show'), 1400);
}));

if (!reduce && window.gsap){
  gsap.registerPlugin(ScrollTrigger);
  if (window.Lenis){ const l = new Lenis({lerp:.09}); l.on('scroll', ScrollTrigger.update); gsap.ticker.add(t => l.raf(t*1000)); gsap.ticker.lagSmoothing(0); }
  // hero: mark rises like the sun
  gsap.from('.hero-mark', {y:80, scale:.7, opacity:0, duration:1.6, ease:'expo.out'});
  gsap.from('.h-in', {y:30, opacity:0, duration:1, stagger:.12, delay:.4, ease:'power3.out'});
  gsap.to('.hero-mark', {y:-60, ease:'none', scrollTrigger:{trigger:'.hero', start:'top top', end:'bottom top', scrub:true}});
  gsap.utils.toArray('.reveal').forEach(el => gsap.from(el, {y:40, opacity:0, duration:1, ease:'power3.out', scrollTrigger:{trigger:el, start:'top 88%'}}));
  // construction guides draw in
  gsap.from('#guides > *', {opacity:0, duration:.6, stagger:.12, scrollTrigger:{trigger:'.construct', start:'top 75%'}});
  // pattern slowly drifts
  gsap.to('.pattern-show svg', {x:-60, ease:'none', scrollTrigger:{trigger:'.pattern-show', start:'top bottom', end:'bottom top', scrub:true}});
}
