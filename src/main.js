const header = document.querySelector(".site-header");
const nav = document.querySelector("#site-nav");
const toggle = document.querySelector(".nav-toggle");
const year = document.querySelector("#year");

if (year) {
  year.textContent = String(new Date().getFullYear());
}

function setNavOpen(open) {
  document.body.classList.toggle("nav-open", open);
  if (toggle) {
    toggle.setAttribute("aria-expanded", String(open));
    toggle.setAttribute("aria-label", open ? "Fechar menu" : "Abrir menu");
  }
}

toggle?.addEventListener("click", () => {
  setNavOpen(!document.body.classList.contains("nav-open"));
});

nav?.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => setNavOpen(false));
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") setNavOpen(false);
});

/* Smooth scroll with sticky header offset */
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", (event) => {
    const id = anchor.getAttribute("href");
    if (!id || id === "#") return;
    const target = document.querySelector(id);
    if (!target) return;

    event.preventDefault();

    if (id === "#inicio" || id === "#topo") {
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }

    const headerOffset = header?.offsetHeight ?? 68;
    const top =
      target.getBoundingClientRect().top + window.scrollY - headerOffset - 8;
    window.scrollTo({ top, behavior: "smooth" });
  });
});

/* Scroll reveal */
const reveals = document.querySelectorAll(".reveal");

if ("IntersectionObserver" in window && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.14, rootMargin: "0px 0px -8% 0px" },
  );

  reveals.forEach((el) => observer.observe(el));
} else {
  reveals.forEach((el) => el.classList.add("is-visible"));
}

/* Acordeão (FAQ e Serviços no mobile): abre um item por vez dentro do grupo */
document.querySelectorAll("[data-accordion]").forEach((group) => {
  group.addEventListener("toggle", (event) => {
    const item = event.target;
    if (!(item instanceof HTMLDetailsElement) || !item.open) return;

    group.querySelectorAll("details").forEach((other) => {
      if (other !== item) other.open = false;
    });
  }, true);
});
