document.addEventListener('DOMContentLoaded', () => {
    const mobileMenuBtn = document.querySelector('.mobile-menu');
    const menuPopup = document.querySelector('.menu-popup');
    const closeMenuBtn = menuPopup.querySelector('.close-menu');
  
    // Initialize hidden state and ARIA attributes.
    menuPopup.style.display = 'none';
    mobileMenuBtn.setAttribute('aria-expanded', 'false');
    menuPopup.setAttribute('aria-hidden', 'true');
  
    let focusableElements = [];
    let firstFocusable;
    let lastFocusable;
  
    // Update the list of focusable elements inside the popup.
    function updateFocusableElements() {
      focusableElements = menuPopup.querySelectorAll(
        'a[href], area[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), button:not([disabled]), [tabindex]:not([tabindex="-1"])'
      );
      if (focusableElements.length) {
        firstFocusable = focusableElements[0];
        lastFocusable = focusableElements[focusableElements.length - 1];
      }
    }
  
    // Trap focus within the menu popup.
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
  
    // Close the menu popup.
    function closeMenu() {
      if (menuPopup.contains(document.activeElement)) {
        mobileMenuBtn.focus();
      }
      menuPopup.style.display = 'none';
      menuPopup.classList.remove('active');
      mobileMenuBtn.setAttribute('aria-expanded', 'false');
      menuPopup.setAttribute('aria-hidden', 'true');
      document.removeEventListener('keydown', trapFocus);
      document.removeEventListener('click', outsideClickHandler);
    }
  
    // Handler to close popup if clicking outside.
    const outsideClickHandler = (e) => {
      if (!menuPopup.contains(e.target) && !mobileMenuBtn.contains(e.target)) {
        closeMenu();
        document.removeEventListener('click', outsideClickHandler);
      }
    };
  
    // Open the menu popup and push focus to the first interactive element.
    function openMenu() {
      menuPopup.style.display = 'block';
      menuPopup.classList.add('active');
      mobileMenuBtn.setAttribute('aria-expanded', 'true');
      menuPopup.setAttribute('aria-hidden', 'false');
      updateFocusableElements();
      if (firstFocusable) {
        firstFocusable.focus();
      }
      document.addEventListener('keydown', trapFocus);
      setTimeout(() => {
        document.addEventListener('click', outsideClickHandler);
      }, 0);
    }
  
    // Toggle the menu popup when the mobile-menu button is clicked.
    mobileMenuBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      menuPopup.classList.contains('active') ? closeMenu() : openMenu();
    });
  
    // Close the menu popup when the close-menu button is clicked.
    closeMenuBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      closeMenu();
    });
  });
  