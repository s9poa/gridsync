document.addEventListener("DOMContentLoaded", function() {
  // Determine the base path for GitHub Pages.
  // If you are hosted as a project page (e.g. username.github.io/repositoryName),
  // the repository name is the first segment of the pathname.
  let basePath = "";
  if (window.location.hostname.includes("github.io")) {
    const pathParts = window.location.pathname.split('/');
    if (pathParts.length > 1 && pathParts[1] !== "") {
      basePath = "/" + pathParts[1];
    }
  }

  // Find the container where the header should be injected.
  var headerContainer = document.getElementById('header');
  if (headerContainer) {
    var headerHTML = `
      <div class="wrapper">
        <!-- Header Top Section -->
        <div class="header__top">
          <h1><a href="./index.html" class="logo">Grid<span>Sync</span></a></h1>
          <form class="desktop-form">
            <label for="desktop-search" class="visually-hidden">Search</label>
            <input type="text" placeholder="What are you looking for?" required id="desktop-search">
            <div class="connector">
              <!-- Form Category - Desktop View -->
              <div class="form-category">
                <button type="button" class="selected-category">
                  All categories <i class="fa-solid fa-chevron-down"></i>
                </button>
                <div class="form-category__listing">
                  <button class="default option" type="button">All categories</button>
                  <div class="header-label">
                    <div class="header-label__dash"></div>
                    <p>Categories</p>
                    <div class="header-label__dash"></div>
                  </div>
                  <button class="option" type="button">Gaming</button>
                  <button class="option" type="button">Software</button>
                  <button class="option" type="button">Gift cards</button>
                  <button class="option" type="button">Subscriptions</button>
                  <button class="option" type="button">E-Learning</button>
                  <button class="option" type="button">Charity</button>
                  <button class="option" type="button">Mobile Games</button>
                </div>
              </div>
              <button type="submit" aria-label="search" class="search-btn">
                <i class="fa-solid fa-magnifying-glass"></i>
              </button>
            </div>
          </form>
          <nav class="desktop-nav">
            <a href="./404.html" aria-label="wishlist"><i class="fa-solid fa-heart"></i></a>
            <a href="./404.html" aria-label="cart"><i class="fa-solid fa-cart-shopping"></i></a>
          </nav>
          <!-- Header Top Section - Mobile View -->
          <button class="mobile-menu" aria-label="menu">
            <i class="fa-solid fa-bars"></i>
          </button>
          <div class="menu-popup">
            <div class="header">
              <a href="./index.html" class="logo">Grid<span>Sync</span></a>
              <button class="close-menu" aria-label="close menu">
                <i class="fa-solid fa-xmark"></i>
              </button>
            </div>
            <nav class="mobile-nav">
              <a href="./404.html" aria-label="wishlist"><i class="fa-solid fa-heart"></i></a>
              <a href="./404.html" aria-label="cart"><i class="fa-solid fa-cart-shopping"></i></a>
            </nav>
            <form class="mobile-form">
              <div class="mobile-form__row">
                <div class="mobile-search-container">
                  <label for="mobile-search" class="mobile-search-label">Search</label>
                  <input type="text" placeholder="What are you looking for?" required id="mobile-search">
                </div>
                <button type="submit" aria-label="search" class="search-btn">
                  <i class="fa-solid fa-magnifying-glass"></i>
                </button>
              </div>
              <!-- Form Category - Mobile View -->
              <div class="form-category">
                <button type="button" class="selected-category">
                  All categories <i class="fa-solid fa-chevron-down"></i>
                </button>
                <div class="form-category__listing">
                  <button class="default option" type="button">All categories</button>
                  <button class="option" type="button">Gaming</button>
                  <button class="option" type="button">Software</button>
                  <button class="option" type="button">Gift cards</button>
                  <button class="option" type="button">Subscriptions</button>
                  <button class="option" type="button">E-Learning</button>
                  <button class="option" type="button">Charity</button>
                  <button class="option" type="button">Mobile Games</button>
                </div>
              </div>
            </form>
            <div class="mobile-links">
              <div class="header-label">
                <div class="header-label__dash"></div>
                <p>Links</p>
                <div class="header-label__dash"></div>
              </div>
            </div>
            <nav class="mobile-links__grouping">
              <a href="./directory/pages/best-sellers.html">Best Sellers</a>
              <a href="./directory/pages/gift-cards.html">Gift Cards</a>
              <a href="./directory/pages/random-keys.html">Random Keys</a>
              <a href="./404.html">Software</a>
              <a href="./directory/pages/gridsync-plus.html" class="cta">Save more with GridSync Plus</a>
            </nav>
          </div>
        </div>
        <!-- Header Bottom Section -->
        <nav class="header__bottom">
          <a href="./directory/pages/best-sellers.html">Best Sellers</a>
          <a href="./directory/pages/gift-cards.html">Gift Cards</a>
          <a href="./directory/pages/random-keys.html">Random Keys</a>
          <a href="./directory/pages/gridsync-plus.html" class="cta">Save more with GridSync Plus</a>
        </nav>
      `;
    headerContainer.innerHTML = headerHTML;
  }

  // Update links starting with "./" to use the absolute path with the base path.
  var anchors = document.querySelectorAll("header a");
  for (var i = 0; i < anchors.length; i++) {
    var href = anchors[i].getAttribute("href");
    if (href && href.indexOf("./") === 0) {
      // Prepend the basePath to the link
      anchors[i].setAttribute("href", basePath + "/" + href.substring(2));
    }
  }
});
