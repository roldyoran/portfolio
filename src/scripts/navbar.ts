function initNavbar() {
  const pctEl = document.getElementById("scroll-pct");
  const sections = document.querySelectorAll<HTMLElement>("section[id]");
  const navLinks = document.querySelectorAll<HTMLAnchorElement>(".nav-item");

  if (!pctEl || !sections.length || !navLinks.length) return;

  function onScroll() {
    const root = document.documentElement;
    const scrolled = root.scrollTop;
    const maxScroll = root.scrollHeight - root.clientHeight;
    const percent = maxScroll > 0 ? Math.round((scrolled / maxScroll) * 100) : 0;

    pctEl.textContent = String(percent).padStart(2, "0") + "%";

    let currentId = "";
    sections.forEach((section) => {
      if (window.scrollY >= section.offsetTop - 180) {
        currentId = section.id;
      }
    });

    navLinks.forEach((link) => {
      const href = link.getAttribute("href");
      const isActive = href === `#${currentId}`;
      link.classList.toggle("active", isActive);
      link.setAttribute("aria-current", isActive ? "true" : "false");
    });
  }

  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initNavbar);
} else {
  initNavbar();
}
