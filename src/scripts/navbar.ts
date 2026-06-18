function initNavbar() {
  const pctEl = document.getElementById("scroll-pct");
  const sections = document.querySelectorAll<HTMLElement>("section[id]");
  const navLinks = document.querySelectorAll<HTMLAnchorElement>(".nav-item");

  if (!pctEl || !sections.length || !navLinks.length) return;

  const sectionOffsets: { id: string; offsetTop: number }[] = [];

  const cacheOffsets = () => {
    sectionOffsets.length = 0;
    sections.forEach((section) => {
      sectionOffsets.push({ id: section.id, offsetTop: section.offsetTop });
    });
  };

  cacheOffsets();

  let ticking = false;

  function onScroll() {
    if (ticking) return;
    ticking = true;

    requestAnimationFrame(() => {
      const root = document.documentElement;
      const scrolled = root.scrollTop;
      const maxScroll = root.scrollHeight - root.clientHeight;
      const percent = maxScroll > 0 ? Math.round((scrolled / maxScroll) * 100) : 0;

      pctEl.textContent = String(percent).padStart(2, "0") + "%";

      let currentId = "";
      for (const { id, offsetTop } of sectionOffsets) {
        if (scrolled >= offsetTop - 180) {
          currentId = id;
        } else {
          break;
        }
      }

      navLinks.forEach((link) => {
        const href = link.getAttribute("href");
        const isActive = href === `#${currentId}`;
        link.classList.toggle("active", isActive);
        link.setAttribute("aria-current", isActive ? "true" : "false");
      });

      ticking = false;
    });
  }

  window.addEventListener("scroll", onScroll, { passive: true });
  window.addEventListener("resize", () => {
    cacheOffsets();
  }, { passive: true });
  onScroll();
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initNavbar);
} else {
  initNavbar();
}
