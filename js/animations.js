// Animations helper functions

document.addEventListener("DOMContentLoaded", function () {
  // Initialize all animations
  initScrollAnimations();
});

// Set up intersection observer for scroll animations
function initScrollAnimations() {
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

// Create staggered animation for multiple elements
function createStaggeredAnimation(elements, className, baseDelay = 100) {
  if (!elements || elements.length === 0) return;

  elements.forEach((element, index) => {
    const delay = index * baseDelay;
    element.setAttribute("data-delay", delay);
    element.classList.add(className);
  });
}

// Add typing animation to element
function addTypingAnimation(element, text, speed = 100) {
  if (!element) return;

  element.textContent = "";
  element.classList.add("typing-effect");

  let i = 0;
  const typeInterval = setInterval(() => {
    if (i < text.length) {
      element.textContent += text.charAt(i);
      i++;
    } else {
      clearInterval(typeInterval);
      element.classList.remove("typing-effect");
    }
  }, speed);
}

// Add parallax effect to element
function addParallaxEffect(element, intensity = 0.1) {
  if (!element) return;

  window.addEventListener("scroll", () => {
    const scrollPosition = window.pageYOffset;
    element.style.transform = `translateY(${scrollPosition * intensity}px)`;
  });
}

// Add reveal animation on hover
function addHoverReveal(container, revealElement) {
  if (!container || !revealElement) return;

  container.addEventListener("mouseenter", () => {
    revealElement.classList.add("animate");
  });

  container.addEventListener("mouseleave", () => {
    revealElement.classList.remove("animate");
  });
}