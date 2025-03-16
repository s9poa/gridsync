/*
 * Requirements:
 * - Add class "lazy-bg" to any element that should lazy load a background.
 * - Set the background via the data attribute: data-bg="background-image: url('./img.jpg');"
 * - Include this script after the DOM is loaded.
 */

document.addEventListener("DOMContentLoaded", function() {
  var lazyEls = document.querySelectorAll(".lazy-bg"),
      prefix = "background-image:",
      prefixLen = prefix.length;

  function clean(value) {
    value = value.trim();
    if (value.indexOf(prefix) === 0) {
      value = value.substring(prefixLen).trim();
    }
    if (value.charAt(value.length - 1) === ";") {
      value = value.slice(0, -1).trim();
    }
    return value;
  }

  function setBg(el) {
    el.style.backgroundImage = clean(el.dataset.bg);
  }

  if ("IntersectionObserver" in window) {
    var observer = new IntersectionObserver(function(entries) {
      for (var i = 0, len = entries.length; i < len; i++) {
        var entry = entries[i];
        if (entry.isIntersecting) {
          setBg(entry.target);
          entry.target.classList.remove("lazy-bg");
          observer.unobserve(entry.target);
        }
      }
    });
    for (var i = 0, len = lazyEls.length; i < len; i++) {
      observer.observe(lazyEls[i]);
    }
  } else {
    for (var i = 0, len = lazyEls.length; i < len; i++) {
      setBg(lazyEls[i]);
    }
  }
});
