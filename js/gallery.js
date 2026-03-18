/* ============================================================
   gallery.js — Category filter for the Gallery page
   Castle's Custom Homes
   ============================================================ */

window.filterGallery = function (btn, category) {
  // Update active button state
  document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');

  // Show / hide items
  document.querySelectorAll('.gallery-full-item').forEach(item => {
    const match = category === 'all' || item.dataset.cat === category;
    item.style.display = match ? 'block' : 'none';
  });
};
