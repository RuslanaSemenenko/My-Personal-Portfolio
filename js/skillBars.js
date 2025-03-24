// Skill bars animation

document.addEventListener("DOMContentLoaded", function () {
  // Initialize skill bars if they exist on the page
  const skillBars = document.querySelectorAll(".skill-bar");
  if (skillBars.length > 0) {
    initSkillBars(skillBars);
  }
});

function initSkillBars(skillBars) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const skillBar = entry.target;
          const percentage = skillBar.getAttribute("data-percentage");
          const fillBar = skillBar.querySelector(".skill-bar-fill");

          if (fillBar) {
            // Add a slight delay for visual effect
            setTimeout(() => {
              fillBar.style.width = `${percentage}%`;
            }, 300);
          }

          observer.unobserve(skillBar);
        }
      });
    },
    { threshold: 0.1 }
  );

  skillBars.forEach((bar) => {
    observer.observe(bar);
  });
}

// Create staggered animation for multiple skill bars
function createStaggeredSkillBars(container, baseDelay = 100) {
  if (!container) return;

  const skillBars = container.querySelectorAll(".skill-bar");

  skillBars.forEach((bar, index) => {
    const delay = index * baseDelay;
    const fillBar = bar.querySelector(".skill-bar-fill");

    if (fillBar) {
      setTimeout(() => {
        const percentage = bar.getAttribute("data-percentage");
        fillBar.style.width = `${percentage}%`;
      }, 300 + delay);
    }
  });
}
