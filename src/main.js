const header = document.querySelector(".site-header");
const nav = document.querySelector("#site-nav");
const toggle = document.querySelector(".nav-toggle");
const year = document.querySelector("#year");
const form = document.querySelector("#contact-form");
const formNote = form?.querySelector(".form-note");

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

/* Contact form → mailto compose (no backend) */
form?.addEventListener("submit", (event) => {
  event.preventDefault();

  const data = new FormData(form);
  const nome = String(data.get("nome") || "").trim();
  const email = String(data.get("email") || "").trim();
  const telefone = String(data.get("telefone") || "").trim();
  const assunto = String(data.get("assunto") || "").trim();
  const mensagem = String(data.get("mensagem") || "").trim();

  const to = "contato@piramiders.com.br";
  const subject = encodeURIComponent(`Contato site — ${assunto}`);
  const body = encodeURIComponent(
    `Nome: ${nome}\nE-mail: ${email}\nTelefone: ${telefone}\nAssunto: ${assunto}\n\n${mensagem}`,
  );

  window.location.href = `mailto:${to}?subject=${subject}&body=${body}`;

  if (formNote) {
    formNote.hidden = false;
    formNote.textContent =
      "Abrindo seu e-mail… Se nada abrir, envie para contato@piramiders.com.br.";
  }
});
