/**
 * V2 hero: mesh-wave field anchored to the 12-column art zone.
 *
 * The /docker study pins the hero and disperses the field on scroll. V2
 * keeps the hero sticky instead, so this script only owns the intro
 * assembly and keeps the mesh aligned with the art zone on resize.
 */

import { mountDockerParticles, type DockerParticleField } from "@/scripts/docker-particles";

const INTRO_MS = 4800;

const clamp = (value: number, min: number, max: number): number =>
  Math.min(max, Math.max(min, value));

/** Sine in-out: a gentler, more even settle than the /docker quintic. */
const easeInOutSine = (value: number): number => {
  const t = clamp(value, 0, 1);
  return 0.5 - Math.cos(Math.PI * t) / 2;
};

export function initV2Hero(): void {
  const hero = document.querySelector<HTMLElement>("[data-v2-hero]");
  const canvas = document.querySelector<HTMLCanvasElement>("[data-v2-particles]");
  const zone = document.querySelector<HTMLElement>("[data-v2-zone]");
  if (!hero || !canvas || !zone) return;

  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
  const field: DockerParticleField | null = mountDockerParticles(canvas);

  const syncView = (): void => {
    if (!field) return;
    const zoneRect = zone.getBoundingClientRect();
    const heroRect = hero.getBoundingClientRect();
    if (zoneRect.width < 2) return;
    field.setView(
      zoneRect.left + zoneRect.width / 2 - heroRect.left,
      zoneRect.top + zoneRect.height / 2 - heroRect.top,
      zoneRect.width,
    );
  };

  syncView();

  if (field) {
    const heroRect = hero.getBoundingClientRect();
    field.setSpread(1.25 * Math.hypot(heroRect.width, heroRect.height));
    field.setDisperse(reduceMotion.matches ? 0 : 1);
    field.play();
  }

  if (!reduceMotion.matches) {
    const start = performance.now();
    const intro = (now: number): void => {
      const progress = clamp((now - start) / INTRO_MS, 0, 1);
      field?.setDisperse(1 - easeInOutSine(progress));
      syncView();
      if (progress < 1) {
        requestAnimationFrame(intro);
      } else {
        field?.setDisperse(0);
      }
    };
    requestAnimationFrame(intro);
  }

  const resizeObserver = new ResizeObserver(syncView);
  resizeObserver.observe(hero);
  resizeObserver.observe(zone);

  reduceMotion.addEventListener("change", (event) => {
    if (event.matches) {
      field?.setDisperse(0);
      field?.pause();
    } else {
      field?.play();
    }
    syncView();
  });
}
