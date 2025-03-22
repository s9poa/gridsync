document.addEventListener('DOMContentLoaded', () => {
  const sliderContainers = document.querySelectorAll('.overflow-slider');

  sliderContainers.forEach(slider => {
    // Use data attribute for card selector or default to all direct children.
    const cardSelector = slider.dataset.cardSelector || ':scope > *';
    const cards = slider.querySelectorAll(cardSelector);
    if (!cards.length) return;
    
    const container = slider.parentElement;
    const arrowsContainer = container.querySelector('.previous-next-container');
    const nextBtn = container.querySelector('.next-card');
    const prevBtn = container.querySelector('.previous-card');
    const cardsLength = cards.length;
    const threshold = 5; // pixels threshold

    // Dynamic arrow visibility check based on the container.
    function isArrowsVisible() {
      // Cache the computed style for the arrows container.
      return arrowsContainer && getComputedStyle(arrowsContainer).display !== 'none';
    }

    // Easing function for smoother animation.
    function easeInOutQuad(t) {
      return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
    }

    // Animate scroll with requestAnimationFrame.
    function animateScrollTo(targetLeft, duration = 300, callback) {
      const startLeft = slider.scrollLeft;
      const distance = targetLeft - startLeft;
      const startTime = performance.now();

      function animate(time) {
        const elapsed = time - startTime;
        const progress = Math.min(elapsed / duration, 1);
        slider.scrollLeft = startLeft + distance * easeInOutQuad(progress);
        if (progress < 1) {
          requestAnimationFrame(animate);
        } else if (callback) {
          callback();
        }
      }
      requestAnimationFrame(animate);
    }

    // Get visible width of a card.
    function getVisibleWidth(card, sliderRect) {
      const rect = card.getBoundingClientRect();
      return Math.max(0, Math.min(rect.right, sliderRect.right) - Math.max(rect.left, sliderRect.left));
    }

    // Compute the active card index by caching the slider’s bounding rectangle.
    function getActiveIndex(direction) {
      const sliderRect = slider.getBoundingClientRect();
      let candidates = [];
      cards.forEach((card, index) => {
        const cardRect = card.getBoundingClientRect();
        const visibleWidth = Math.max(0, Math.min(cardRect.right, sliderRect.right) - Math.max(cardRect.left, sliderRect.left));
        if (visibleWidth > 0) {
          candidates.push({ index, visibleWidth, left: cardRect.left });
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

    // Update tabindex for focus management.
    function updateFocusableCard(activeIndex) {
      if (!isArrowsVisible()) {
        cards.forEach(card => card.removeAttribute('tabindex'));
        return;
      }
      cards.forEach((card, index) => {
        const desiredTabIndex = (index === activeIndex ? 0 : -1);
        if (card.tabIndex !== desiredTabIndex) {
          card.tabIndex = desiredTabIndex;
        }
      });
    }

    // Slide to a specific card.
    function slideTo(index) {
      if (index < 0) index = cardsLength - 1;
      if (index >= cardsLength) index = 0;
      const baseOffset = cards[0].offsetLeft;
      const targetLeft = cards[index].offsetLeft - baseOffset;
      animateScrollTo(targetLeft, 300, () => {
        if (isArrowsVisible()) {
          updateFocusableCard(index);
        }
      });
    }

    // Always attach event listeners if buttons exist.
    if (nextBtn) {
      nextBtn.addEventListener('click', () => {
        if (!isArrowsVisible()) return;
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
        if (!isArrowsVisible()) return;
        const activeIndex = getActiveIndex('prev');
        const activeCard = cards[activeIndex];
        const cardWidth = activeCard.offsetWidth;
        const sliderRect = slider.getBoundingClientRect();
        const visibleWidth = getVisibleWidth(activeCard, sliderRect);
        slideTo(visibleWidth < cardWidth - threshold ? activeIndex : activeIndex - 1);
      }, { passive: true });
    }

    // Initial update for focus.
    if (isArrowsVisible()) {
      updateFocusableCard(getActiveIndex('next'));
    } else {
      cards.forEach(card => card.removeAttribute('tabindex'));
    }

    // Use ResizeObserver if available for more efficient updates.
    if (typeof ResizeObserver !== 'undefined') {
      const ro = new ResizeObserver(() => {
        if (!isArrowsVisible()) {
          cards.forEach(card => card.removeAttribute('tabindex'));
        } else {
          updateFocusableCard(getActiveIndex('next'));
        }
      });
      ro.observe(slider);
    } else {
      // Fallback: Throttled window resize event.
      let resizeScheduled = false;
      window.addEventListener('resize', () => {
        if (!resizeScheduled) {
          resizeScheduled = true;
          requestAnimationFrame(() => {
            if (!isArrowsVisible()) {
              cards.forEach(card => card.removeAttribute('tabindex'));
            } else {
              updateFocusableCard(getActiveIndex('next'));
            }
            resizeScheduled = false;
          });
        }
      });
    }
  });
});
