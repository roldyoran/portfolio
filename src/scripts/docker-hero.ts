/**
 * Hero choreography for the Docker study:
 * - mesh-wave dot field with its intro assembly
 * - pinned scroll state (copy fade, art zoom, particle dispersion)
 */

import { mountDockerParticles, type DockerParticleField } from "./docker-particles";

const clamp = (value: number, min: number, max: number): number =>
  Math.min(max, Math.max(min, value));

const easeOut = (value: number): number => 1 - Math.pow(1 - clamp(value, 0, 1), 3);

const easeInOutCubic = (value: number): number => {
  const t = clamp(value, 0, 1);
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
};

/** Quintic smootherstep — matches the source intro easing. */
const smoother = (value: number): number => {
  const t = clamp(value, 0, 1);
  return t * t * t * (t * (t * 6 - 15) + 10);
};

export function initDockerHero(): void {
  const pin = document.querySelector<HTMLElement>("[data-dk-pin]");
  const hero = document.querySelector<HTMLElement>("[data-dk-hero]");
  const zone = document.querySelector<HTMLElement>("[data-dk-zone]");
  const copy = document.querySelector<HTMLElement>("[data-dk-copy]");
  const canvas = document.querySelector<HTMLCanvasElement>("[data-dk-particles]");

  if (!pin || !hero || !zone || !copy) return;

  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
  const reduced = reduceMotion.matches;

  const field: DockerParticleField | null = canvas ? mountDockerParticles(canvas) : null;

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

  /* ---------------------------------------------------------------------- */
  /* Particle intro: the field starts scattered and converges over ~2.6s    */
  /* ---------------------------------------------------------------------- */

  let introDone = reduced;

  if (field) {
    const heroRect = hero.getBoundingClientRect();
    field.setSpread(1.8 * Math.hypot(heroRect.width, heroRect.height));
    field.setDisperse(reduced ? 0 : 1);
    field.play();
  }

  if (!reduced) {
    const start = performance.now();
    const intro = (now: number): void => {
      const t = clamp((now - start) / 2600, 0, 1);
      field?.setDisperse(1 - smoother(t));
      syncView();
      if (t < 1) {
        requestAnimationFrame(intro);
      } else {
        field?.setDisperse(0);
        introDone = true;
        update();
      }
    };
    requestAnimationFrame(intro);
  }

  /* ---------------------------------------------------------------------- */
  /* Pinned scroll effect                                                   */
  /* ---------------------------------------------------------------------- */

  let ticking = false;
  let particlesPaused = false;
  let lastProgress = -1;

  const measure = (): number => Math.max(1, pin.offsetHeight - hero.offsetHeight);

  const update = (): void => {
    ticking = false;
    if (!introDone || reduced) return;

    const progress = clamp(-pin.getBoundingClientRect().top / measure(), 0, 1);
    if (Math.abs(progress - lastProgress) < 0.0005) return;
    lastProgress = progress;

    const copyFade = Math.min(1, progress / 0.3);
    copy.style.opacity = (1 - copyFade).toFixed(3);
    copy.style.transform = `translateX(${(-48 * copyFade).toFixed(1)}px)`;

    const art = easeOut(Math.min(1, progress / 0.5));
    zone.style.transform = `scale(${(1 + 0.5 * art).toFixed(4)})`;

    syncView();

    if (field) {
      /* Source scroll mapping: E = S*(2-S) with S = progress/1.8. */
      const rain = clamp(progress / 1.8, 0, 1);
      const rainEased = rain * (2 - rain);
      field.setDisperse(rainEased);
      const iso = 1 + 1.6 * easeInOutCubic(rainEased);
      field.setZoom(iso);
      const heroRect = hero.getBoundingClientRect();
      field.setSpread((1.8 * Math.hypot(heroRect.width, heroRect.height)) / iso);

      if (rainEased >= 1) {
        if (!particlesPaused) {
          field.pause();
          particlesPaused = true;
        }
      } else if (particlesPaused) {
        field.play();
        particlesPaused = false;
      }
    }
  };

  const onScroll = (): void => {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(update);
  };

  window.addEventListener("scroll", onScroll, { passive: true });
  window.addEventListener("resize", () => {
    syncView();
    lastProgress = -1;
    onScroll();
  });

  reduceMotion.addEventListener("change", (event) => {
    if (event.matches) {
      zone.style.transform = "";
      copy.style.opacity = "";
      copy.style.transform = "";
      field?.setDisperse(0);
      field?.pause();
    }
  });

  update();
}
