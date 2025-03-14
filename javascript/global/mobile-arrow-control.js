document.addEventListener('DOMContentLoaded', () => {
    // Initialize both slider types.
    const sliderContainers = document.querySelectorAll('.showcasing-card-grid, .mini-card-grid');
    
    sliderContainers.forEach(slider => {
      const cardSelector = slider.classList.contains('showcasing-card-grid')
        ? '.showcasing-card'
        : '.mini-card';
      const cards = slider.querySelectorAll(cardSelector);
      if (!cards.length) return;
      
      // Locate controls relative to slider's parent.
      const container = slider.parentElement;
      const nextBtn = container.querySelector('.next-card');
      const prevBtn = container.querySelector('.previous-card');
      const cardsLength = cards.length;
      const threshold = 5; // pixels threshold for "fully visible"
  
      // Calculate how much of a card is visible in the slider.
      function getVisibleWidth(card) {
        const sliderRect = slider.getBoundingClientRect();
        const rect = card.getBoundingClientRect();
        return Math.max(0, Math.min(rect.right, sliderRect.right) - Math.max(rect.left, sliderRect.left));
      }
  
      // Determine active card based on visibility; if two cards are nearly equal, use direction.
      function getActiveIndex(direction) {
        const sliderRect = slider.getBoundingClientRect();
        let candidates = [];
        cards.forEach((card, index) => {
          const rect = card.getBoundingClientRect();
          const visibleWidth = Math.max(0, Math.min(rect.right, sliderRect.right) - Math.max(rect.left, sliderRect.left));
          if (visibleWidth > 0) {
            candidates.push({ index, visibleWidth, left: rect.left });
          }
        });
        if (candidates.length === 0) return 0;
        if (candidates.length === 1) return candidates[0].index;
        if (candidates.length === 2) {
          const diff = Math.abs(candidates[0].visibleWidth - candidates[1].visibleWidth);
          if (diff < 10) {
            return direction === 'prev'
              ? (candidates[0].left < candidates[1].left ? candidates[0].index : candidates[1].index)
              : (candidates[0].left > candidates[1].left ? candidates[0].index : candidates[1].index);
          }
        }
        let activeIndex = candidates[0].index;
        let maxVisible = candidates[0].visibleWidth;
        candidates.forEach(item => {
          if (item.visibleWidth > maxVisible) {
            maxVisible = item.visibleWidth;
            activeIndex = item.index;
          }
        });
        return activeIndex;
      }
  
      // Recalculate the base offset on each slide.
      function slideTo(index) {
        if (index < 0) index = cardsLength - 1;
        if (index >= cardsLength) index = 0;
        const currentBaseOffset = cards[0].offsetLeft;
        slider.scrollTo({
          left: cards[index].offsetLeft - currentBaseOffset,
          behavior: 'smooth'
        });
      }
  
      if (nextBtn) {
        nextBtn.addEventListener('click', () => {
          const activeIndex = getActiveIndex('next');
          const activeCard = cards[activeIndex];
          const visibleWidth = getVisibleWidth(activeCard);
          const cardWidth = activeCard.offsetWidth;
          slideTo(visibleWidth < cardWidth - threshold ? activeIndex : activeIndex + 1);
        });
      }
  
      if (prevBtn) {
        prevBtn.addEventListener('click', () => {
          const activeIndex = getActiveIndex('prev');
          const activeCard = cards[activeIndex];
          const visibleWidth = getVisibleWidth(activeCard);
          const cardWidth = activeCard.offsetWidth;
          slideTo(visibleWidth < cardWidth - threshold ? activeIndex : activeIndex - 1);
        });
      }
    });
  });
  