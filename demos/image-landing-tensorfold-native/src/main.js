// Fernwell — CTA smooth-scroll + subtle reveal motion, gated on prefers-reduced-motion.

document.documentElement.classList.add('js');

const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

// Call to action scrolls to the closing section.
document.querySelectorAll('a[data-cta]').forEach((link) => {
  link.addEventListener('click', (event) => {
    const target = document.querySelector(link.getAttribute('href'));
    if (!target) return;
    event.preventDefault();
    // Small top offset: keeps the section from hugging the viewport edge and
    // keeps the landing position stable against subpixel rounding.
    const top = Math.max(0, target.getBoundingClientRect().top + window.scrollY - 12);
    window.scrollTo({ top, behavior: reduceMotion.matches ? 'auto' : 'smooth' });
  });
});

// Subtle reveal on scroll.
const reveals = document.querySelectorAll('.reveal');
if (reduceMotion.matches) {
  reveals.forEach((el) => el.classList.add('is-visible'));
} else {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15 }
  );
  reveals.forEach((el) => observer.observe(el));
}
