// Main JavaScript file

document.addEventListener("DOMContentLoaded", function () {
  // Initialize navigation
  initNavigation();

  // Initialize animations
  initAnimations();

  // Initialize theme switcher if it exists
  const themeSwitcher = document.getElementById("theme-switcher");
  if (themeSwitcher) {
    initThemeSwitcher(themeSwitcher);
  }
});

// Initialize navigation with active page highlighting
function initNavigation() {
  const currentPath = window.location.pathname;
  const navLinks = document.querySelectorAll(".nav-link");

  navLinks.forEach((link) => {
    const linkPath = link.getAttribute("href");

    // Check if current path matches link path
    if (
      currentPath === linkPath ||
      (linkPath !== "/" && currentPath.startsWith(linkPath))
    ) {
      link.classList.add("active");
    } else {
      link.classList.remove("active");
    }
  });
}

// Initialize animations
function initAnimations() {
  // Add any global animation initializations here
  const animatedElements = document.querySelectorAll(
    ".slide-up, .slide-down, .slide-left, .slide-right"
  );

  if (animatedElements.length > 0) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Get delay attribute if it exists
            const delay = entry.target.getAttribute("data-delay") || 0;

            // Apply animation with delay
            setTimeout(() => {
              entry.target.classList.add("animate");
            }, delay);

            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    animatedElements.forEach((element) => {
      observer.observe(element);
    });
  }
}

// Initialize theme switcher
function initThemeSwitcher(switcher) {
  // Check for saved theme preference or use default
  const currentTheme = localStorage.getItem("theme") || "dark";
  document.documentElement.setAttribute("data-theme", currentTheme);

  // Update switcher state
  if (currentTheme === "light") {
    switcher.checked = true;
  }

  // Add event listener for theme toggle
  switcher.addEventListener("change", function () {
    if (this.checked) {
      document.documentElement.setAttribute("data-theme", "light");
      localStorage.setItem("theme", "light");
    } else {
      document.documentElement.setAttribute("data-theme", "dark");
      localStorage.setItem("theme", "dark");
    }
  });
}
