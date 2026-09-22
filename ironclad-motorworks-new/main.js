// Mobile menu toggle
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');
hamburger.addEventListener('click', () => {
  mobileMenu.classList.toggle('open');
});
mobileMenu.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => mobileMenu.classList.remove('open'));
});

// Scroll reveal
const observer = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('visible');
      observer.unobserve(e.target);
    }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

document.querySelectorAll('.build-card, .stage').forEach(el => {
  el.classList.add('reveal');
  observer.observe(el);
});

// Build gallery filter
const filterBtns = document.querySelectorAll('.filter-btn');
const buildCards = document.querySelectorAll('.build-card');
filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    filterBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    const filter = btn.dataset.filter;
    buildCards.forEach(card => {
      const match = filter === 'all' || card.dataset.cat === filter;
      card.classList.toggle('hidden', !match);
    });
  });
});

// Testimonial rotator
const slides = document.querySelectorAll('.quote-slide');
const dotsWrap = document.getElementById('quoteDots');
let activeSlide = 0;
slides.forEach((_, i) => {
  const dot = document.createElement('button');
  dot.className = 'quote-dot' + (i === 0 ? ' active' : '');
  dot.addEventListener('click', () => showSlide(i));
  dotsWrap.appendChild(dot);
});
function showSlide(i) {
  slides[activeSlide].classList.remove('active');
  dotsWrap.children[activeSlide].classList.remove('active');
  activeSlide = i;
  slides[activeSlide].classList.add('active');
  dotsWrap.children[activeSlide].classList.add('active');
}
setInterval(() => showSlide((activeSlide + 1) % slides.length), 5000);

// Build spotlight before/after drag slider
(function () {
  const wrap = document.getElementById('spotlightCompare');
  const handle = document.getElementById('spHandle');
  if (!wrap || !handle) return;
  let dragging = false;
  function setReveal(clientX) {
    const rect = wrap.getBoundingClientRect();
    const pct = Math.min(100, Math.max(0, ((clientX - rect.left) / rect.width) * 100));
    wrap.style.setProperty('--reveal', pct + '%');
  }
  handle.addEventListener('pointerdown', (e) => { dragging = true; e.preventDefault(); });
  window.addEventListener('pointerup', () => { dragging = false; });
  window.addEventListener('pointercancel', () => { dragging = false; });
  window.addEventListener('pointermove', (e) => { if (dragging) setReveal(e.clientX); });
  wrap.addEventListener('click', (e) => { if (e.target !== handle) setReveal(e.clientX); });
})();

// Quote form submit (demo)
document.getElementById('contactForm').addEventListener('submit', (e) => {
  e.preventDefault();
  const btn = e.target.querySelector('button[type="submit"]');
  const original = btn.textContent;
  btn.textContent = '✓ Quote Request Sent';
  btn.disabled = true;
  setTimeout(() => {
    btn.textContent = original;
    btn.disabled = false;
    e.target.reset();
  }, 4000);
});
