document.addEventListener('DOMContentLoaded', () => {
  // Use the common class 'overflow-slider' for all slider containers.
  const sliderContainers = document.querySelectorAll('.overflow-slider');

  sliderContainers.forEach(slider => {
    // Determine card selector: use data attribute if provided, else default to all direct children.
    const cardSelector = slider.dataset.cardSelector || ':scope > *';
    const cards = slider.querySelectorAll(cardSelector);
    if (!cards.length) return;
    
    // Find controls relative to the slider's parent.
    const container = slider.parentElement;
    const nextBtn = container.querySelector('.next-card');
    const prevBtn = container.querySelector('.previous-card');
    const cardsLength = cards.length;
    const threshold = 5; // pixels threshold for "fully visible"

    // Easing function for smoother animation.
    function easeInOutQuad(t) {
      return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
    }

    // Animate scroll using requestAnimationFrame.
    function animateScrollTo(targetLeft, duration = 300) {
      const startLeft = slider.scrollLeft;
      const distance = targetLeft - startLeft;
      const startTime = performance.now();

      function animate(time) {
        const elapsed = time - startTime;
        const progress = Math.min(elapsed / duration, 1);
        slider.scrollLeft = startLeft + distance * easeInOutQuad(progress);
        if (progress < 1) {
          requestAnimationFrame(animate);
        }
      }
      requestAnimationFrame(animate);
    }

    // Get the visible width of a card relative to the slider.
    function getVisibleWidth(card, sliderRect) {
      const rect = card.getBoundingClientRect();
      return Math.max(0, Math.min(rect.right, sliderRect.right) - Math.max(rect.left, sliderRect.left));
    }

    // Determine the active card index, caching the slider's bounding rectangle.
    function getActiveIndex(direction) {
      const sliderRect = slider.getBoundingClientRect();
      let candidates = [];
      cards.forEach((card, index) => {
        const visibleWidth = getVisibleWidth(card, sliderRect);
        if (visibleWidth > 0) {
          // Cache the card's left position.
          candidates.push({ index, visibleWidth, left: card.getBoundingClientRect().left });
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

    // Slide to the card at the given index using custom animation.
    function slideTo(index) {
      if (index < 0) index = cardsLength - 1;
      if (index >= cardsLength) index = 0;
      const baseOffset = cards[0].offsetLeft;
      const targetLeft = cards[index].offsetLeft - baseOffset;
      animateScrollTo(targetLeft);
    }

    if (nextBtn) {
      nextBtn.addEventListener('click', () => {
        const activeIndex = getActiveIndex('next');
        const activeCard = cards[activeIndex];
        const cardWidth = activeCard.offsetWidth;
        const sliderRect = slider.getBoundingClientRect();
        const visibleWidth = getVisibleWidth(activeCard, sliderRect);
        slideTo(visibleWidth < cardWidth - threshold ? activeIndex : activeIndex + 1);
      }, { passive: true });
    }

    if (prevBtn) {
      prevBtn.addEventListener('click', () => {
        const activeIndex = getActiveIndex('prev');
        const activeCard = cards[activeIndex];
        const cardWidth = activeCard.offsetWidth;
        const sliderRect = slider.getBoundingClientRect();
        const visibleWidth = getVisibleWidth(activeCard, sliderRect);
        slideTo(visibleWidth < cardWidth - threshold ? activeIndex : activeIndex - 1);
      }, { passive: true });
    }
  });
});
