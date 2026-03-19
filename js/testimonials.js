/* ============================================================
   testimonials.js — Dynamic paginated carousel
   Castle's Custom Homes

   How it works:
   - All .testimonial-card elements live in #t-card-pool (hidden)
   - On load AND on resize, JS reads the viewport width, decides
     how many cards fit per page (3 / 2 / 1), then builds
     .t-page wrappers dynamically and injects them into #t-slides
   - Dots are also rebuilt to match the page count
   - Adding more cards to #t-card-pool is all you need to do —
     the carousel expands automatically
   ============================================================ */

(function () {

  const section     = document.getElementById('testimonials-section');
  const pool        = document.getElementById('t-card-pool');
  const slides      = document.getElementById('t-slides');
  const dotsWrap    = document.getElementById('t-dots');
  const prevBtn     = document.getElementById('t-prev');
  const nextBtn     = document.getElementById('t-next');
  const progressBar = document.getElementById('t-progress');

  if (!section || !pool || !slides) return;

  /* ── State ───────────────────────────────────────────────── */
  let current     = 0;
  let totalPages  = 0;
  let timer       = null;
  let rafId       = null;
  let rafStart    = null;
  let isVisible   = false;
  const DELAY     = 7000; // ms per page

  /* ── How many cards fit per page at current width ─────────
     ≤ 480px  → 1 card   (phone)
     ≤ 768px  → 2 cards  (tablet)
     > 768px  → 3 cards  (desktop)
  ─────────────────────────────────────────────────────────── */
  function cardsPerPage() {
    const w = window.innerWidth;
    if (w <= 480) return 1;
    if (w <= 768) return 2;
    return 3;
  }

  /* ── Build / rebuild the carousel ──────────────────────────
     Called on load and on window resize.
     Preserves the current page index as closely as possible.
  ─────────────────────────────────────────────────────────── */
  function build() {
    stopTimer();

    const perPage  = cardsPerPage();
    const allCards = Array.from(pool.querySelectorAll('.testimonial-card'));
    const newTotal = Math.ceil(allCards.length / perPage);

    // Clamp current page to valid range
    const newCurrent = Math.min(current, newTotal - 1);

    // Clear the slide strip
    slides.innerHTML = '';

    // Build pages
    for (let p = 0; p < newTotal; p++) {
      const page  = document.createElement('div');
      page.className = 't-page';

      // Set column count via inline style so it matches perPage
      page.style.gridTemplateColumns = 'repeat(' + perPage + ', 1fr)';

      const start = p * perPage;
      const slice = allCards.slice(start, start + perPage);
      slice.forEach(function(card) {
        page.appendChild(card.cloneNode(true));
      });

      slides.appendChild(page);
    }

    totalPages = newTotal;

    // Rebuild dots
    buildDots(newTotal);

    // Restore position without animation
    slides.style.transition = 'none';
    current = newCurrent;
    slides.style.transform = 'translateX(-' + (current * 100) + '%)';
    updateDots();

    // Re-enable transition on next frame
    requestAnimationFrame(function() {
      slides.style.transition = 'transform 0.6s cubic-bezier(0.77, 0, 0.18, 1)';
    });

    if (isVisible) startTimer();
  }

  /* ── Dot creation ───────────────────────────────────────── */
  function buildDots(count) {
    if (!dotsWrap) return;
    dotsWrap.innerHTML = '';
    for (let i = 0; i < count; i++) {
      const dot = document.createElement('button');
      dot.className = 't-dot' + (i === current ? ' active' : '');
      dot.setAttribute('aria-label', 'Page ' + (i + 1));
      dot.addEventListener('click', function() { goTo(i, true); });
      dotsWrap.appendChild(dot);
    }
  }

  function updateDots() {
    if (!dotsWrap) return;
    Array.from(dotsWrap.querySelectorAll('.t-dot')).forEach(function(d, i) {
      d.classList.toggle('active', i === current);
    });
  }

  /* ── Navigate ───────────────────────────────────────────── */
  function goTo(index, userAction) {
    current = ((index % totalPages) + totalPages) % totalPages;
    slides.style.transform = 'translateX(-' + (current * 100) + '%)';
    updateDots();
    if (userAction || isVisible) {
      stopTimer();
      if (isVisible) startTimer();
    }
  }

  /* ── Progress bar ───────────────────────────────────────── */
  function startProgress() {
    stopProgress();
    rafStart = performance.now();
    (function tick(now) {
      const pct = Math.min(((now - rafStart) / DELAY) * 100, 100);
      if (progressBar) progressBar.style.width = pct + '%';
      if (pct < 100) rafId = requestAnimationFrame(tick);
    })(performance.now());
  }

  function stopProgress() {
    if (rafId) { cancelAnimationFrame(rafId); rafId = null; }
    if (progressBar) progressBar.style.width = '0%';
  }

  /* ── Timer ──────────────────────────────────────────────── */
  function startTimer() {
    stopTimer();
    startProgress();
    timer = setTimeout(function() {
      goTo(current + 1, false);
    }, DELAY);
  }

  function stopTimer() {
    if (timer) { clearTimeout(timer); timer = null; }
    stopProgress();
  }

  /* ── Visibility observer ────────────────────────────────── */
  var observer = new IntersectionObserver(function(entries) {
    entries.forEach(function(entry) {
      if (entry.isIntersecting) {
        isVisible = true;
        startTimer();
      } else {
        isVisible = false;
        stopTimer();
      }
    });
  }, { threshold: 0.4 });

  observer.observe(section);

  /* ── Resize — debounced rebuild ─────────────────────────── */
  var resizeTimer;
  window.addEventListener('resize', function() {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(build, 150);
  });

  /* ── Arrow buttons ──────────────────────────────────────── */
  if (prevBtn) prevBtn.addEventListener('click', function() { goTo(current - 1, true); });
  if (nextBtn) nextBtn.addEventListener('click', function() { goTo(current + 1, true); });

  /* ── Touch / swipe ──────────────────────────────────────── */
  var touchX = 0;
  slides.addEventListener('touchstart', function(e) { touchX = e.touches[0].clientX; }, { passive: true });
  slides.addEventListener('touchend',   function(e) {
    var diff = touchX - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 44) goTo(diff > 0 ? current + 1 : current - 1, true);
  }, { passive: true });

  /* ── Init ───────────────────────────────────────────────── */
  build();

})();
