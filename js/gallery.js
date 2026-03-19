/* ============================================================
   gallery.js — Category filter for the Gallery page
   Castle's Custom Homes  |  pages/gallery.html

   Filters the photo grid by category (residential, remodel,
   commercial) or shows all photos when "All Work" is selected.

   How it works:
     Each .gallery-full-item element in the grid has a data-cat
     attribute matching one of the filter button values:
       data-cat="residential"
       data-cat="remodel"
       data-cat="commercial"

     When a filter button is clicked, this function:
       1. Marks the clicked button as active (crimson background)
       2. Shows/hides grid items based on whether their data-cat
          matches the selected category (or shows all if 'all')

   To add a new category:
     1. Add a new filter button in gallery.html with onclick="filterGallery(this,'yourcategory')"
     2. Add data-cat="yourcategory" to the relevant grid items

   Called by: onclick attributes on .filter-btn elements in gallery.html
   ============================================================ */

window.filterGallery = function (btn, category) {
  // Remove .active from all filter buttons, then mark only the clicked one
  document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');

  // Show items that match the selected category; hide all others
  // If category is 'all', every item is shown regardless of its data-cat
  document.querySelectorAll('.gallery-full-item').forEach(item => {
    const match = category === 'all' || item.dataset.cat === category;
    item.style.display = match ? 'block' : 'none';
  });
};
