import { animate } from "motion";

function initStatCounters() {
  const isReducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;

  if (isReducedMotion) return;

  const stats = document.querySelectorAll<HTMLElement>(".stat-number");
  if (!stats.length) return;

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
  });
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initStatCounters);
} else {
  initStatCounters();
}
