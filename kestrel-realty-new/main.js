// Mobile menu
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');
hamburger.addEventListener('click', () => mobileMenu.classList.toggle('open'));
mobileMenu.querySelectorAll('a').forEach(a => a.addEventListener('click', () => mobileMenu.classList.remove('open')));

// Buy / Sell / Rent search tabs
const tabCopy = {
  buy:  { placeholder: 'Neighborhood, city or ZIP', btn: 'Search Homes' },
  sell: { placeholder: 'Your property address',     btn: 'Get Home Value' },
  rent: { placeholder: 'Neighborhood or ZIP',        btn: 'Search Rentals' }
};
const searchTabs = document.getElementById('searchTabs');
searchTabs.addEventListener('click', (e) => {
  const b = e.target.closest('button[data-tab]');
  if (!b) return;
  searchTabs.querySelectorAll('button').forEach(x => x.classList.toggle('active', x === b));
  const c = tabCopy[b.dataset.tab];
  document.getElementById('searchInput').placeholder = c.placeholder;
  document.getElementById('searchBtn').textContent = c.btn;
});
document.getElementById('searchForm').addEventListener('submit', (e) => e.preventDefault());

// Listing filter chips
const filterChips = document.getElementById('filterChips');
filterChips.addEventListener('click', (e) => {
  const b = e.target.closest('button[data-filter]');
  if (!b) return;
  filterChips.querySelectorAll('button').forEach(x => x.classList.toggle('active', x === b));
  const f = b.dataset.filter;
  document.querySelectorAll('#listingGrid .listing-card').forEach(card => {
    card.classList.toggle('hidden', f !== 'all' && card.dataset.type !== f);
  });
});

// Neighborhood tabs
const nbTabs = document.getElementById('nbTabs');
nbTabs.addEventListener('click', (e) => {
  const b = e.target.closest('button[data-nb]');
  if (!b) return;
  nbTabs.querySelectorAll('button').forEach(x => x.classList.toggle('active', x === b));
  document.querySelectorAll('.nb-panel').forEach(p => p.classList.toggle('active', p.dataset.nb === b.dataset.nb));
});

// Scroll reveal
const observer = new IntersectionObserver((entries) => {
  entries.forEach(en => {
    if (en.isIntersecting) { en.target.classList.add('visible'); observer.unobserve(en.target); }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });
document.querySelectorAll('.listing-card, .agent, .nb-wrap, .sell-inner').forEach(el => {
  el.classList.add('reveal');
  observer.observe(el);
});

// Valuation form (demo)
document.getElementById('contactForm').addEventListener('submit', (e) => {
  e.preventDefault();
  const btn = e.target.querySelector('button[type="submit"]');
  const original = btn.textContent;
  btn.textContent = '✓ Request Sent — an agent will reach out';
  btn.disabled = true;
  setTimeout(() => { btn.textContent = original; btn.disabled = false; e.target.reset(); }, 4000);
});

// Rail active link
const sections = document.querySelectorAll('section[id]');
const railLinks = document.querySelectorAll('.rail-nav a');
window.addEventListener('scroll', () => {
  let current = 'home';
  sections.forEach(s => { if (window.scrollY >= s.offsetTop - 120) current = s.id; });
  railLinks.forEach(a => a.classList.toggle('current', a.getAttribute('href') === '#' + current));
}, { passive: true });
