/* ============================================================
   nav.js — Hamburger menu & overlay navigation behavior
   Castle's Custom Homes
   ============================================================ */

(function () {
  const hamburger = document.getElementById('hamburger');
  const overlay   = document.getElementById('nav-overlay');
  let navOpen = false;

  function openNav() {
    navOpen = true;
    hamburger.classList.add('open');
    hamburger.setAttribute('aria-expanded', 'true');
    overlay.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function closeNav() {
    navOpen = false;
    hamburger.classList.remove('open');
    hamburger.setAttribute('aria-expanded', 'false');
    overlay.classList.remove('open');
    document.body.style.overflow = '';
  }

  // Expose closeNav globally so inline onclick handlers can call it
  window.closeNav = closeNav;

  hamburger.addEventListener('click', () => navOpen ? closeNav() : openNav());

  // Close on Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && navOpen) closeNav();
  });

  // Sub-menu accordion toggle
  window.toggleSub = function (btn) {
    const sub    = btn.closest('.overlay-item').querySelector('.sub-menu');
    const isOpen = sub.classList.contains('open');

    // Collapse all open sub-menus first
    document.querySelectorAll('.sub-menu.open').forEach(s => s.classList.remove('open'));
    document.querySelectorAll('.overlay-toggle.open').forEach(b => b.classList.remove('open'));

    if (!isOpen) {
      sub.classList.add('open');
      btn.classList.add('open');
    }
  };

  // Sticky / transparent nav scroll behavior
  const nav = document.getElementById('main-nav');

  // Pages with a full-height hero get a transparent nav that darkens on scroll.
  // Other pages start solid. A data attribute on <body> controls this.
  const isHeroPage = document.body.dataset.navStyle === 'hero';

  if (isHeroPage) {
    nav.classList.add('transparent-hero');
  } else {
    nav.classList.add('solid');
  }

  window.addEventListener('scroll', () => {
    if (isHeroPage) {
      nav.classList.toggle('scrolled', window.scrollY > 60);
    }
  });
})();
