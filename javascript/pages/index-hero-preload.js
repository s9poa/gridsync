document.addEventListener("DOMContentLoaded", () => {
    const heroSection = document.querySelector(".hero");
    const cards = document.querySelectorAll(".showcasing-card");
  
    if (heroSection) {
      preloadImage("./images/index/index-hero-banner.avif")
        .then(() => requestAnimationFrame(() => {
          heroSection.style.backgroundImage =
            "linear-gradient(rgba(0,0,0,.75), rgba(0,0,0,.75)), url('./images/index/index-hero-banner.avif')";
        }))
        .catch((error) => console.error("Hero background image failed to load:", error));
    }
  
    if (cards.length > 0) {
      const promises = Array.from(cards).map((card) => {
        const bgUrl = card.dataset.bg;
        if (!bgUrl) return Promise.resolve();
  
        return preloadImage(bgUrl).then(() => requestAnimationFrame(() => {
          card.style.backgroundImage = `url('${bgUrl}')`;
        })).catch((error) => console.error(`Background image failed to load: ${bgUrl}`, error));
      });
  
      Promise.all(promises).then(() => {
        console.log("✅ All background images successfully loaded.");
      });
    }
  });
  
  function preloadImage(src) {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.src = src;
      img.onload = resolve;
      img.onerror = reject;
      img.decoding = "async";
    });
  }
  