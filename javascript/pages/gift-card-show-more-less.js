document.addEventListener("DOMContentLoaded", () => {
    const showMoreBtn = document.querySelector('.show-more-a');
    const showLessBtn = document.querySelector('.show-less-a');
    const extraContent = document.querySelector('.show-more-b');
  
    if (!showMoreBtn || !showLessBtn || !extraContent) return;
  
    // Toggle extra content display
    showMoreBtn.addEventListener('click', () => {
      extraContent.style.display = 'block';
      showMoreBtn.style.display = 'none';
      showLessBtn.style.display = 'inline-block';
    });
  
    showLessBtn.addEventListener('click', () => {
      extraContent.style.display = 'none';
      showLessBtn.style.display = 'none';
      showMoreBtn.style.display = 'inline-block';
    });
  });
  