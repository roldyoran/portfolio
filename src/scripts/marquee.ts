import { animate } from "motion";

export interface MarqueeOptions {
  selector?: string;
  speed?: number;
  pauseOnHover?: boolean;
  direction?: "left" | "right";
}

const defaultOptions: Required<MarqueeOptions> = {
  selector: ".marquee-inner",
  speed: 80,
  pauseOnHover: true,
  direction: "left",
};

export function initMarquee(options: MarqueeOptions = {}) {
  const config = { ...defaultOptions, ...options };
  const marquee = document.querySelector(config.selector) as HTMLElement | null;

  if (!marquee) {
    console.warn(`[marquee] Element not found: ${config.selector}`);
    return;
  }

  const contents = marquee.querySelectorAll<HTMLElement>(".marquee-content");
  if (contents.length < 2) {
    console.warn("[marquee] Need at least 2 .marquee-content elements for seamless loop");
    return;
  }

  let distance = 0;
  const startX = config.direction === "right" ? -distance : 0;
  const endX = config.direction === "right" ? 0 : -distance;

  let marqueeAnimation: ReturnType<typeof animate> | null = null;

  const startAnimation = () => {
    distance = contents[0].offsetWidth;
    const sx = config.direction === "right" ? -distance : 0;
    const ex = config.direction === "right" ? 0 : -distance;

    marqueeAnimation = animate(
      marquee,
      { x: [sx, ex] },
      {
        duration: config.speed,
        easing: "linear",
        repeat: Infinity,
      }
    );

    if (config.pauseOnHover) {
      marquee.addEventListener("mouseenter", () => marqueeAnimation?.pause());
      marquee.addEventListener("mouseleave", () => marqueeAnimation?.play());
    }
  };

  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      startAnimation();
    });
  });

  return {
    pause: () => marqueeAnimation?.pause(),
    play: () => marqueeAnimation?.play(),
    cancel: () => marqueeAnimation?.cancel(),
  };
}

document.addEventListener("DOMContentLoaded", () => {
  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (prefersReducedMotion) {
    return;
  }
  initMarquee();
});