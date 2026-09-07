document.addEventListener("DOMContentLoaded", () => {
  if (window.lucide) window.lucide.createIcons();

  const button = document.getElementById("menuButton");
  const backdrop = document.getElementById("mobileBackdrop");
  const drawer = document.getElementById("mobileDrawer");

  const setMenu = (open) => {
    button.classList.toggle("is-open", open);
    backdrop.classList.toggle("is-open", open);
    drawer.classList.toggle("is-open", open);
    button.setAttribute("aria-expanded", String(open));
    drawer.setAttribute("aria-hidden", String(!open));
    document.body.style.overflow = open ? "hidden" : "";
  };

  button.addEventListener("click", () => setMenu(!button.classList.contains("is-open")));
  backdrop.addEventListener("click", () => setMenu(false));
  drawer.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => setMenu(false));
  });

  document.getElementById("emailForm").addEventListener("submit", (event) => {
    event.preventDefault();
  });
});
