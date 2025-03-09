document.addEventListener('DOMContentLoaded', () => {
    const selectedCategoryBtn = document.querySelector('.selected-category');
    const categoryListing = document.querySelector('.form-category__listing');
  
    // Hide the listing by default.
    categoryListing.style.display = 'none';
  
    // Function to handle clicks outside the listing and button.
    function outsideClickListener(e) {
      if (
        !categoryListing.contains(e.target) &&
        !selectedCategoryBtn.contains(e.target)
      ) {
        categoryListing.style.display = 'none';
        document.removeEventListener('click', outsideClickListener);
      }
    }
  
    // Toggle listing when selectedCategoryBtn is clicked.
    selectedCategoryBtn.addEventListener('click', (e) => {
      // If currently closed, open and add the outside click listener.
      if (categoryListing.style.display === 'none') {
        categoryListing.style.display = 'flex';
        // Use a timeout to ensure this listener isn't immediately triggered by the current click.
        setTimeout(() => {
          document.addEventListener('click', outsideClickListener);
        }, 0);
      } else {
        categoryListing.style.display = 'none';
        document.removeEventListener('click', outsideClickListener);
      }
    });
  
    // Use event delegation on the listing container.
    categoryListing.addEventListener('click', (event) => {
      const button = event.target.closest('button.option');
      if (!button) return;
  
      // Remove "active" class from any currently active button.
      const activeButton = categoryListing.querySelector('button.active');
      if (activeButton) activeButton.classList.remove('active');
  
      // Add "active" to the clicked button.
      button.classList.add('active');
  
      // Update the selected-category button's content (preserving the dropdown icon).
      selectedCategoryBtn.innerHTML = button.textContent.trim() + ' <i class="fa-solid fa-chevron-down"></i>';
  
      // Hide the listing and remove the outside click listener.
      categoryListing.style.display = 'none';
      document.removeEventListener('click', outsideClickListener);
    });
  });
  