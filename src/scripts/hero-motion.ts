import { animate, stagger } from "motion";

function initHeroAnimations() {
  const isReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  if (!isReducedMotion) {
    const elements = document.querySelectorAll(".hero-left, .hero-right, .hero-meta > div");

    elements.forEach((el) => {
      (el as HTMLElement).style.willChange = "transform, opacity";
    });

    animate(
      elements,
      { opacity: [0, 1], y: [40, 0] },
      { delay: stagger(0.15), duration: 0.8, easing: [0.25, 0.1, 0.25, 1], fill: "forwards" }
    );

    const typeName = (el: Element, duration = 0.6) => {
      if (!el) return;
      const full = el.getAttribute("data-text") || "";
      const total = full.length;
      if (!total) return;

      el.textContent = "";

      animate(0, 1, {
        duration,
        easing: "linear",
        onUpdate: (latest) => {
          const count = Math.max(1, Math.round(Number(latest) * total));
          el.textContent = full.slice(0, count);
        },
        onComplete: () => {
          el.textContent = full;
          (el as HTMLElement).style.willChange = "auto";
        },
      });
    };

    const namePrimary = document.querySelector(".hero-name-primary");
    const nameAccent = document.querySelector(".hero-name-accent");

    if (namePrimary) {
      namePrimary.textContent = "";
      typeName(namePrimary, 0.55);
    }

    if (nameAccent) {
      nameAccent.textContent = "";
      setTimeout(() => typeName(nameAccent, 0.45), 220);
    }

    const heroDescription = document.querySelector(".hero-description");
    if (heroDescription) {
      heroDescription.textContent = "";
      setTimeout(() => typeName(heroDescription, 0.9), 320);
    }

    const stats = document.querySelectorAll<HTMLElement>(".stat-number");
    if (stats.length) {
      const statData: { el: HTMLElement; target: number; suffix: string }[] = [];
      stats.forEach((el) => {
        statData.push({
          el,
          target: Number(el.getAttribute("data-count") || 0),
          suffix: el.getAttribute("data-suffix") || "",
        });
      });

      animate(0, 1, {
        duration: 1.4,
        easing: [0.25, 0.1, 0.25, 1],
        onUpdate: (latest) => {
          const progress = Number(latest);
          statData.forEach(({ el, target, suffix }) => {
            el.textContent = `${Math.round(target * progress)}${suffix}`;
          });
        },
        onComplete: () => {
          statData.forEach(({ el }) => {
            el.style.willChange = "auto";
          });
        },
      });
    }
  }
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initHeroAnimations);
} else {
  initHeroAnimations();
}