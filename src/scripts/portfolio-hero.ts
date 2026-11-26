/**
 * Portfolio hero choreography: mesh-wave dot field with its intro assembly.
 * Same particle field as the /docker study, without the pinned-scroll act —
 * the copy stays put while the mesh converges underneath it.
 */

import { mountDockerParticles, type DockerParticleField } from "./docker-particles";

const INTRO_MS = 2600;

const clamp = (value: number, min: number, max: number): number =>
  Math.min(max, Math.max(min, value));

/** Quintic smootherstep — matches the Docker study intro easing. */
const smoother = (value: number): number => {
  const t = clamp(value, 0, 1);
  return t * t * t * (t * (t * 6 - 15) + 10);
};

export function initPortfolioHero(): void {
  const hero = document.querySelector<HTMLElement>("[data-ph-hero]");
  const canvas = document.querySelector<HTMLCanvasElement>("[data-ph-particles]");
  if (!hero || !canvas) return;

  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

  const field: DockerParticleField | null = mountDockerParticles(canvas);

  const syncView = (): void => {
    if (!field) return;
    const rect = hero.getBoundingClientRect();
    if (rect.width < 2) return;
    field.setView(rect.width / 2, rect.height / 2, rect.width);
  };

  syncView();

  if (field) {
    const rect = hero.getBoundingClientRect();
    field.setSpread(1.8 * Math.hypot(rect.width, rect.height));
    field.setDisperse(reduceMotion.matches ? 0 : 1);
    field.play();
  }

  if (!reduceMotion.matches) {
    const start = performance.now();
    const intro = (now: number): void => {
      const t = clamp((now - start) / INTRO_MS, 0, 1);
      field?.setDisperse(1 - smoother(t));
      syncView();
      if (t < 1) {
        requestAnimationFrame(intro);
      } else {
        field?.setDisperse(0);
      }
    };
    requestAnimationFrame(intro);
  }

  window.addEventListener("resize", syncView);
}
