// Gallery Infinite Scroll Loader
// Automatically loads images as user scrolls - no buttons needed!

(function() {
  const itemsPerLoad = 40; // Number of images to show per batch
  let currentIndex = 0;
  let isLoading = false;
  let allItemsLoaded = false;
  let allItems = [];

  // Wait for DOM to be ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  function init() {
    const grid = document.querySelector('.gallery-full-grid');
    if (!grid) return;

    // Get all gallery items
    allItems = Array.from(grid.querySelectorAll('.gallery-full-item'));
    const totalItems = allItems.length;

    if (totalItems === 0) return;

    console.log(`Gallery: ${totalItems} items total`);

    // Hide all items initially
    allItems.forEach(item => {
      item.style.display = 'none';
    });

    // Load initial batch
    loadMore();

    // Set up scroll listener with debouncing
    let scrollTimeout;
    window.addEventListener('scroll', function() {
      if (scrollTimeout) clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(checkScrollPosition, 100);
    });

    // Also check on resize
    window.addEventListener('resize', checkScrollPosition);
  }

  function checkScrollPosition() {
    if (isLoading || allItemsLoaded) return;

    // Check if user is near bottom of page (within 800px)
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const windowHeight = window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight;

    if (scrollTop + windowHeight >= documentHeight - 800) {
      loadMore();
    }
  }

  function loadMore() {
    if (isLoading || allItemsLoaded) return;

    isLoading = true;
    const totalItems = allItems.length;
    const endIndex = Math.min(currentIndex + itemsPerLoad, totalItems);

    // Show next batch with a slight delay for smooth appearance
    setTimeout(() => {
      for (let i = currentIndex; i < endIndex; i++) {
        allItems[i].style.display = '';
      }

      currentIndex = endIndex;
      isLoading = false;

      // Check if all items are loaded
      if (currentIndex >= totalItems) {
        allItemsLoaded = true;
        console.log('Gallery: All images loaded');
      } else {
        console.log(`Gallery: Loaded ${currentIndex} of ${totalItems} items`);
        // Check if we need to load more immediately (in case the page isn't full)
        setTimeout(checkScrollPosition, 100);
      }
    }, 50);
  }
})();
