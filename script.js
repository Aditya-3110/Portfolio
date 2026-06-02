const animatedItems = document.querySelectorAll(
  ".section, .stats-band article, .project-grid article, .skills-grid article, .education-box"
);

animatedItems.forEach((item, index) => {
  item.classList.add("reveal");
  item.style.setProperty("--delay", `${Math.min(index * 45, 360)}ms`);
});

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.14 }
);

animatedItems.forEach((item) => observer.observe(item));

const sections = document.querySelectorAll("main section[id]");
const navLinks = document.querySelectorAll("nav a");

const setActiveLink = () => {
  let currentId = "home";

  sections.forEach((section) => {
    const top = section.getBoundingClientRect().top;
    if (top <= 120) {
      currentId = section.id;
    }
  });

  navLinks.forEach((link) => {
    link.classList.toggle("active", link.getAttribute("href") === `#${currentId}`);
  });
};

setActiveLink();
window.addEventListener("scroll", setActiveLink, { passive: true });
