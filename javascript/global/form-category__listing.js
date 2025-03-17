document.addEventListener('DOMContentLoaded', () => {
  const dropdowns = document.querySelectorAll('.form-category');

  dropdowns.forEach((container, index) => {
    const selectedCategoryBtn = container.querySelector('.selected-category');
    const categoryListing = container.querySelector('.form-category__listing');

    // Set up ARIA on toggle button and listbox
    selectedCategoryBtn.setAttribute('aria-haspopup', 'listbox');
    selectedCategoryBtn.setAttribute('aria-expanded', 'false');
    if (!categoryListing.id) {
      categoryListing.id = 'category-list-' + index;
    }
    selectedCategoryBtn.setAttribute('aria-controls', categoryListing.id);
    categoryListing.setAttribute('role', 'listbox');
    categoryListing.setAttribute('aria-hidden', 'true');

    // Initialize ARIA for each option
    const optionButtons = categoryListing.querySelectorAll('button.option');
    optionButtons.forEach((button) => {
      button.setAttribute('role', 'option');
      button.setAttribute('aria-selected', button.classList.contains('active') ? 'true' : 'false');
    });

    categoryListing.style.display = 'none';

    // Variables for focus trap
    let focusableElements = [];
    let firstFocusable, lastFocusable;

    function updateFocusableElements() {
      focusableElements = categoryListing.querySelectorAll(
        'button, [href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'
      );
      if (focusableElements.length) {
        firstFocusable = focusableElements[0];
        lastFocusable = focusableElements[focusableElements.length - 1];
      }
    }

    function trapFocus(e) {
      if (e.key === 'Tab') {
        if (!focusableElements.length) return;
        if (e.shiftKey) {
          if (document.activeElement === firstFocusable) {
            e.preventDefault();
            lastFocusable.focus();
          }
        } else {
          if (document.activeElement === lastFocusable) {
            e.preventDefault();
            firstFocusable.focus();
          }
        }
      }
    }

    // Close dropdown if click is outside
    let outsideClickHandler = (e) => {
      if (!container.contains(e.target)) {
        if (categoryListing.contains(document.activeElement)) {
          selectedCategoryBtn.focus();
        }
        categoryListing.style.display = 'none';
        selectedCategoryBtn.setAttribute('aria-expanded', 'false');
        categoryListing.setAttribute('aria-hidden', 'true');
        categoryListing.removeEventListener('keydown', trapFocus);
        document.removeEventListener('click', outsideClickHandler);
      }
    };

    selectedCategoryBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      if (categoryListing.style.display === 'none') {
        categoryListing.style.display = 'flex';
        selectedCategoryBtn.setAttribute('aria-expanded', 'true');
        categoryListing.setAttribute('aria-hidden', 'false');

        // If activated by keyboard (e.detail === 0), update and trap focus
        if (e.detail === 0) {
          updateFocusableElements();
          if (firstFocusable) {
            firstFocusable.focus();
          }
          categoryListing.addEventListener('keydown', trapFocus);
        }

        setTimeout(() => {
          document.addEventListener('click', outsideClickHandler);
        }, 0);
      } else {
        if (categoryListing.contains(document.activeElement)) {
          selectedCategoryBtn.focus();
        }
        categoryListing.style.display = 'none';
        selectedCategoryBtn.setAttribute('aria-expanded', 'false');
        categoryListing.setAttribute('aria-hidden', 'true');
        categoryListing.removeEventListener('keydown', trapFocus);
        document.removeEventListener('click', outsideClickHandler);
      }
    });

    // Handle option selection using event delegation
    categoryListing.addEventListener('click', (event) => {
      const button = event.target.closest('button.option');
      if (!button) return;
      const activeButton = categoryListing.querySelector('button.active');
      if (activeButton) {
        activeButton.classList.remove('active');
        activeButton.setAttribute('aria-selected', 'false');
      }
      button.classList.add('active');
      button.setAttribute('aria-selected', 'true');
      selectedCategoryBtn.innerHTML =
        button.textContent.trim() + ' <i class="fa-solid fa-chevron-down"></i>';
      selectedCategoryBtn.focus();
      categoryListing.style.display = 'none';
      selectedCategoryBtn.setAttribute('aria-expanded', 'false');
      categoryListing.setAttribute('aria-hidden', 'true');
      categoryListing.removeEventListener('keydown', trapFocus);
      document.removeEventListener('click', outsideClickHandler);
    });
  });
});
