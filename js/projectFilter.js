// Project filtering functionality

document.addEventListener("DOMContentLoaded", function () {
  // Initialize project filter if it exists on the page
  const projectFilterContainer = document.getElementById("project-filter");
  if (projectFilterContainer) {
    initProjectFilter();
  }
});

// Project data
const projects = [
  {
    id: "benescola",
    title: "Benescola",
    technologies: [
      "HTML5",
      "CSS3",
      "SCSS",
      "JavaScript",
      "REST API",
      "Node.js",
      "MongoDB",
    ],
    description: [
      "Built drag-and-drop lesson scheduler with interactive UI",
      "Integrated REST API for automated attendance and grade synchronization",
      "Streamlined development workflow using Parcel, cutting build time by 40%",
    ],
    link: "https://benescola.pt/",
    gradient: "gradient-bg-cyan-purple",
  },
  {
    id: "filmoteka",
    title: "Filmoteka",
    technologies: ["HTML", "SASS", "REST API", "AJAX", "Parcel"],
    description: [
      "Integrated TMDB API for advanced search (genres, ratings, release year)",
      "Implemented client-side pagination and data caching to reduce API calls by 25%",
    ],
    link: "https://ruslanasemenenko.github.io/goit-react-hw-05-movies/",
    gradient: "gradient-bg-purple-cyan",
  },
  {
    id: "barbershop",
    title: "BarberShop",
    technologies: ["HTML5", "CSS3", "JavaScript", "Mobile-First"],
    description: [
      "Implemented dynamic booking system with real-time availability checks (Vanilla JS)",
      "Adaptive and mobile-first site showcasing services, hours, and contact information",
    ],
    link: "https://ruslanasemenenko.github.io/Barber-shop/",
    gradient: "gradient-bg-cyan-purple",
  },
  {
    id: "budbulb",
    title: "Budbulb",
    technologies: ["HTML5", "CSS3", "JavaScript", "Mobile-First"],
    description: [
      "Developed a mobile-first, responsive UI with seamless cross-device compatibility",
      "Built an interactive product catalog featuring dynamic filters",
      "Informational website for a flower store, boosting customer engagement",
    ],
    link: "https://budbulb.netlify.app/",
    gradient: "gradient-bg-purple-cyan",
  },
];

function initProjectFilter() {
  const filterButtons = document.querySelectorAll(".filter-btn");
  const projectsGrid = document.getElementById("projects-grid");

  // Set up filter button click handlers
  filterButtons.forEach((button) => {
    button.addEventListener("click", () => {
      // Remove active class from all buttons
      filterButtons.forEach((btn) => btn.classList.remove("active"));

      // Add active class to clicked button
      button.classList.add("active");

      // Get filter value
      const filter = button.getAttribute("data-filter");

      // Filter projects
      filterProjects(filter);
    });
  });

  // Initial render of all projects
  renderProjects(projects);

  // Filter projects based on selected filter
  function filterProjects(filter) {
    let filteredProjects;

    if (filter === "all") {
      filteredProjects = projects;
    } else {
      filteredProjects = projects.filter((project) =>
        project.technologies.some((tech) =>
          tech.toLowerCase().includes(filter.toLowerCase())
        )
      );
    }

    renderProjects(filteredProjects);
  }

  // Render projects to the DOM
  function renderProjects(projectsToRender) {
    // Clear projects grid
    projectsGrid.innerHTML = "";

    // If no projects match filter
    if (projectsToRender.length === 0) {
      projectsGrid.innerHTML =
        '<div class="text-center p-8">No projects match the selected filter.</div>';
      return;
    }

    // Create and append project cards
    projectsToRender.forEach((project) => {
      const projectCard = createProjectCard(project);
      projectsGrid.appendChild(projectCard);
    });

    // Initialize animations for new elements
    initAnimations();
  }

  // Create a project card element
  function createProjectCard(project) {
    const card = document.createElement("div");
    card.className = "card hover-scale slide-up";
    card.setAttribute("data-id", project.id);

    // Create card header
    const cardHeader = document.createElement("div");
    cardHeader.className = `h-48 ${project.gradient} flex items-center justify-center`;

    const title = document.createElement("h3");
    title.className = "text-2xl font-bold";
    title.textContent = project.title;

    cardHeader.appendChild(title);

    // Create card body
    const cardBody = document.createElement("div");
    cardBody.className = "p-6";

    // Technologies
    const techContainer = document.createElement("div");
    techContainer.className = "flex flex-wrap gap-2 mb-4";

    project.technologies.forEach((tech) => {
      const techBadge = document.createElement("span");
      techBadge.className = "px-2 py-1 bg-gray-700 rounded-full text-xs";
      techBadge.textContent = tech;
      techContainer.appendChild(techBadge);
    });

    // Description
    const descList = document.createElement("ul");
    descList.className = "text-gray-300 mb-4 space-y-2";

    project.description.forEach((item) => {
      const listItem = document.createElement("li");
      listItem.textContent = `• ${item}`;
      descList.appendChild(listItem);
    });

    // Link
    const link = document.createElement("a");
    link.href = project.link;
    link.className =
      "inline-block px-4 py-2 bg-cyan-600 rounded-full text-sm hover:bg-cyan-700 transition-colors";
    link.textContent = "View Project";

    // Assemble card
    cardBody.appendChild(techContainer);
    cardBody.appendChild(descList);
    cardBody.appendChild(link);

    card.appendChild(cardHeader);
    card.appendChild(cardBody);

    return card;
  }
}
