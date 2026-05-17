function initMobileNav() {
  const btn = document.getElementById("mobnav-btn");
  const menu = document.getElementById("mobmenu");

  if (!btn || !menu) return;

  function toggleMenu() {
    const isOpen = menu.classList.toggle("open");
    btn.setAttribute("aria-expanded", String(isOpen));
    if (isOpen) {
      menu.querySelector<HTMLAnchorElement>("a")?.focus();
    }
  }

  function closeMenu() {
    menu.classList.remove("open");
    btn.setAttribute("aria-expanded", "false");
  }

  btn.addEventListener("click", toggleMenu);

  menu.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", closeMenu);
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && menu.classList.contains("open")) {
      closeMenu();
      btn.focus();
    }
  });
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initMobileNav);
} else {
  initMobileNav();
}
