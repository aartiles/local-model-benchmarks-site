// Fernwell — main.js: small vanilla interactions, no dependencies.
// The CTAs are anchors to #preorder, so the page works without JS;
// this script only enhances them.

const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');

// Smooth-scroll for in-page anchors; instant under reduced motion.
document.addEventListener('click', (event) => {
  const link = event.target.closest('a[href^="#"]');
  if (!link) return;
  const target = document.querySelector(link.getAttribute('href'));
  if (!target) return; // leave external/unknown hrefs to the browser
  event.preventDefault();
  target.scrollIntoView({ behavior: reduced.matches ? 'auto' : 'smooth' });
  history.pushState(null, '', link.getAttribute('href'));
});

// Subtle reveal-on-scroll for the feature cards. The is-hidden class is
// added only here in JS, so content stays visible without JS, and the
// whole effect is skipped under reduced motion.
const cards = [...document.querySelectorAll('.feature-card')];
if (cards.length && !reduced.matches) {
  cards.forEach((card) => card.classList.add('reveal', 'is-hidden'));
  const observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        // Reveal on entry, or if the card was already passed (a jump
        // straight to the footer must not leave content hidden).
        if (entry.isIntersecting || entry.boundingClientRect.top < 0) {
          entry.target.classList.remove('is-hidden');
          observer.unobserve(entry.target);
        }
      }
    },
    { threshold: 0.15 }
  );
  cards.forEach((card) => observer.observe(card));
}
