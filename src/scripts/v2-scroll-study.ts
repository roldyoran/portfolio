/**
 * Temporary V2 study section:
 * - reveal-on-scroll for the fake content blocks
 * - “unrounding” of the light section's top corners as the hero is covered
 */

const MAX_EDGE_RADIUS = 48;

function initReveals(): void {
  const revealItems = Array.from(document.querySelectorAll<HTMLElement>("[data-v2-reveal]"));
  if (revealItems.length === 0) return;

  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

  const showAll = (): void => {
    revealItems.forEach((element) => element.classList.add("is-visible"));
  };

  if (reduceMotion.matches) {
    showAll();
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      }
    },
    { threshold: 0.08, rootMargin: "0px 0px -5% 0px" },
  );

  revealItems.forEach((element) => observer.observe(element));

  reduceMotion.addEventListener("change", (event) => {
    if (!event.matches) return;
    observer.disconnect();
    showAll();
  });
}

function initEdgeRadius(): void {
  const section = document.querySelector<HTMLElement>("#scroll-study");
  const hero = document.querySelector<HTMLElement>("[data-v2-hero]");
  if (!section || !hero) return;

  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
  let ticking = false;

  const update = (): void => {
    ticking = false;

    if (reduceMotion.matches) {
      section.style.setProperty("--v2-lab-radius", "0px");
      return;
    }

    const distance = Math.max(1, hero.offsetHeight * 0.75);
    const progress = Math.min(1, Math.max(0, window.scrollY / distance));
    const radius = MAX_EDGE_RADIUS * (1 - progress);
    section.style.setProperty("--v2-lab-radius", `${radius.toFixed(1)}px`);
  };

  const requestUpdate = (): void => {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(update);
  };

  window.addEventListener("scroll", requestUpdate, { passive: true });
  window.addEventListener("resize", requestUpdate, { passive: true });
  reduceMotion.addEventListener("change", requestUpdate);

  update();
}

export function initV2ScrollStudy(): void {
  initReveals();
  initEdgeRadius();
}
