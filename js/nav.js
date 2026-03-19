/* ============================================================
   nav.js — Navigation bar + overlay menu behavior
   Castle's Custom Homes

   Responsibilities:
   1. Hamburger button toggle (open/close overlay)
   2. Overlay open/close with body scroll lock
   3. Sub-menu accordion (one open at a time)
   4. Escape key to close overlay
   5. Nav bar transparency on the home page hero
      — starts transparent, darkens after scrolling 60px
      — on all other pages, nav is always solid dark

   How the hero/solid mode works:
     The <body> tag on each page has a data attribute:
       <body data-nav-style="hero">   → home page (transparent + scroll behavior)
       <body data-nav-style="solid">  → all other pages (always dark)
     This script reads that attribute on load and sets the
     appropriate CSS class on #main-nav.

   Global functions exposed on window (called by inline HTML onclick):
     window.closeNav()         — closes the overlay (used by sub-menu links)
     window.toggleSub(btn)     — opens/closes a sub-menu accordion
   ============================================================ */

(function () {

  /* ── Element references ───────────────────────────────────── */
  const hamburger = document.getElementById('hamburger');
  const overlay   = document.getElementById('nav-overlay');
  const nav       = document.getElementById('main-nav');

  // Track whether the overlay is currently open
  let navOpen = false;


  /* ── Open / close overlay ─────────────────────────────────── */

  function openNav() {
    navOpen = true;
    hamburger.classList.add('open');          // Animates lines → X
    hamburger.setAttribute('aria-expanded', 'true');
    overlay.classList.add('open');            // Triggers clip-path reveal
    document.body.style.overflow = 'hidden';  // Prevent page scrolling behind overlay
  }

  function closeNav() {
    navOpen = false;
    hamburger.classList.remove('open');       // Animates X → lines
    hamburger.setAttribute('aria-expanded', 'false');
    overlay.classList.remove('open');         // Collapses overlay
    document.body.style.overflow = '';        // Restore page scrolling
  }

  // Expose closeNav globally — sub-menu anchor tags call this via onclick
  // to close the overlay after navigating to a new page
  window.closeNav = closeNav;


  /* ── Hamburger click ──────────────────────────────────────── */
  hamburger.addEventListener('click', () => navOpen ? closeNav() : openNav());


  /* ── Escape key closes overlay ────────────────────────────── */
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && navOpen) closeNav();
  });


  /* ── Sub-menu accordion ───────────────────────────────────── */
  // Called by onclick on both the text label <a> and the + <button>
  // in each overlay-item-header.
  // Behavior: clicking an item opens its sub-menu and closes all others
  // (only one sub-menu can be open at a time).

  window.toggleSub = function (btn) {
    // Find the sub-menu inside the same .overlay-item as the clicked button
    const sub    = btn.closest('.overlay-item').querySelector('.sub-menu');
    const isOpen = sub.classList.contains('open');

    // Collapse all currently open sub-menus and reset their toggle buttons
    document.querySelectorAll('.sub-menu.open').forEach(s => s.classList.remove('open'));
    document.querySelectorAll('.overlay-toggle.open').forEach(b => b.classList.remove('open'));

    // If this one wasn't already open, open it now
    // (clicking an open item effectively closes it — the lines above already closed it)
    if (!isOpen) {
      sub.classList.add('open');
      // Also mark the + button as open so it rotates to ×
      const toggleBtn = btn.closest('.overlay-item').querySelector('.overlay-toggle');
      if (toggleBtn) toggleBtn.classList.add('open');
    }
  };


  /* ── Nav bar transparency / scroll behavior ───────────────── */
  // Read the data attribute set on <body> to determine nav mode
  const isHeroPage = document.body.dataset.navStyle === 'hero';

  if (isHeroPage) {
    // Home page: start transparent so the full-bleed hero photo shows through the nav
    nav.classList.add('transparent-hero');
  } else {
    // All other pages: solid dark nav at all times
    nav.classList.add('solid');
  }

  // On hero pages, add .scrolled class once the user scrolls past 60px.
  // This darkens the nav so links remain readable over the page content below the hero.
  window.addEventListener('scroll', () => {
    if (isHeroPage) {
      nav.classList.toggle('scrolled', window.scrollY > 60);
    }
  });

})();
