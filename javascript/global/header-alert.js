document.addEventListener('DOMContentLoaded', function() {
    const closeButton = document.querySelector('.close-alert');
    
    closeButton.addEventListener('click', function(event) {
      event.preventDefault(); // Prevent any default behavior
      const alertSection = this.closest('.header-alert');
      if (alertSection) {
        alertSection.style.display = 'none';
      }
    });
  });
  