/* ============================================================
   reveal.js — Scroll-triggered fade-up animations
   Castle's Custom Homes

   Any element with the class "reveal" will start invisible
   (opacity: 0, shifted 22px down) and animate into view once
   it enters the viewport.

   CSS in global.css handles the visual transition:
     .reveal         { opacity: 0; transform: translateY(22px); }
     .reveal.visible { opacity: 1; transform: none; }

   This script uses IntersectionObserver to watch all .reveal
   elements and adds the .visible class when they cross the
   10% threshold (threshold: 0.1 means 10% of the element
   must be visible before it triggers).

   Staggered delays can be added with helper classes:
     .reveal-delay-1   → 0.1s delay
     .reveal-delay-2   → 0.2s delay
     .reveal-delay-3   → 0.3s delay
   These are useful for animating grid items in sequence.

   Fallback: if IntersectionObserver is not supported (very old
   browsers), all elements are immediately made visible.
   ============================================================ */

(function () {

  function initReveals() {
    const elements = document.querySelectorAll('.reveal');

    // Fallback for browsers without IntersectionObserver support
    if (!('IntersectionObserver' in window)) {
      elements.forEach(el => el.classList.add('visible'));
      return;
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          // Element is visible enough — trigger the animation
          entry.target.classList.add('visible');
          // Stop watching this element; no need to un-reveal it when scrolling back up
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.1  // Trigger when 10% of the element is in the viewport
    });

    // Watch every .reveal element on the current page
    elements.forEach(el => observer.observe(el));
  }

  // Run after the DOM is fully parsed
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initReveals);
  } else {
    initReveals();
  }

})();
