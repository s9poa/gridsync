document.addEventListener("DOMContentLoaded", function() {
  const projectFolder = "gridsync";
  const pathSegments = window.location.pathname.split('/').filter(seg => seg !== "");
  const folderIndex = pathSegments.findIndex(seg => seg === projectFolder);
  let basePath = "";
  if (folderIndex !== -1) {
    basePath = "/" + pathSegments.slice(0, folderIndex + 1).join('/');
  }
  var footerContainer = document.getElementById("footer");
  if (footerContainer) {
    var footerHTML = `
      <footer>
        <div class="top-footer wrapper">
          <div class="left-wrapper">
            <nav>
              <h2><i class="fa-solid fa-list"></i> Categories</h2>
              <a href="./directory/pages/best-sellers.html" title="Best Sellers">Best Sellers</a>
              <a href="./directory/pages/gift-cards.html" title="Gift Cards">Gift Cards</a>
              <a href="./directory/pages/random-keys.html" title="Random Keys">Random Keys</a>
              <a href="./404.html" title="Upcoming Games">Upcoming Games</a>
              <a href="./404.html" title="Trending Categories">Trending Categories</a>
            </nav>
            <nav>
              <h2><i class="fa-solid fa-layer-group"></i> Platform</h2>
              <a href="./404.html">PC</a>
              <a href="./404.html">Xbox</a>
              <a href="./404.html">Playstation</a>
              <a href="./404.html">Nintendo</a>
            </nav>
          </div>
          <div class="right-wrapper">
            <div>
              <h2>Install the GridSync app</h2>
              <p>Get great deals on games wherever you go!</p>
            </div>
            <div class="rating-container">
              <i class="fa-solid fa-star"></i>
              <i class="fa-solid fa-star"></i>
              <i class="fa-solid fa-star"></i>
              <i class="fa-solid fa-star"></i>
              <i class="fa-solid fa-star"></i>
              <span class="rating">4.4 - 55,900</span>
            </div>
            <div class="publishing-services">
              <a href="./404.html"><i class="fa-brands fa-google-play"></i> Google Play</a>
              <a href="./404.html"><i class="fa-brands fa-apple"></i> App Store</a>
            </div>
          </div>
        </div>
        <div class="divider"></div>
        <div class="bottom-footer wrapper">
          <h2>Built with ❤️ using:</h2>
          <div class="marquee">
            <div class="marquee__content">
              <span>HTML</span>
              <span>CSS</span>
              <span>JavaScript</span>
            </div>
            <div class="marquee__content">
              <span>HTML</span>
              <span>CSS</span>
              <span>JavaScript</span>
            </div>
          </div>
        </div>
      </footer>
    `;
    footerContainer.innerHTML = footerHTML;
  }
  var anchors = footerContainer.querySelectorAll("a");
  anchors.forEach(anchor => {
    const href = anchor.getAttribute("href");
    if (href && href.startsWith("./")) {
      anchor.setAttribute("href", basePath + "/" + href.slice(2));
    }
  });
});
