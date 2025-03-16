document.addEventListener("DOMContentLoaded", () => {
    const heroSection = document.querySelector(".hero");
  
    if (!heroSection) return; // Prevent errors if element is missing
  
    // Check if the image is already in cache (avoids reloading)
    const img = new Image();
    img.src = "./images/index/index-hero-banner.avif";
  
    img.decode()
      .then(() => {
        requestAnimationFrame(() => {
          heroSection.style.backgroundImage = 
            "linear-gradient(rgba(0,0,0,.75), rgba(0,0,0,.75)), url('./images/index/index-hero-banner.avif')";
          heroSection.style.transition = "background-image 0.6s ease-in-out";
        });
      })
      .catch(() => {
        console.error("Hero background image failed to load.");
      });
  });
  