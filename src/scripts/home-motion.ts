import { animate } from "motion";

const isReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

if (!isReducedMotion) {
  const revealElements = document.querySelectorAll<HTMLElement>(".reveal-hidden");
  if (revealElements.length) {
    const observer = new IntersectionObserver(
      (entries: IntersectionObserverEntry[]) => {
        entries.forEach((entry: IntersectionObserverEntry) => {
          if (entry.isIntersecting) {
            animate(
              entry.target,
              { opacity: [0, 1], y: [40, 0] },
              { duration: 0.7, easing: [0.25, 0.1, 0.25, 1], fill: "forwards" }
            );
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -50px 0px" }
    );
    revealElements.forEach((el: HTMLElement) => observer.observe(el));
  }
}