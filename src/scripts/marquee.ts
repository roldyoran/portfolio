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
  if (contents.length < 1) {
    console.warn("[marquee] Need at least 1 .marquee-content element");
    return;
  }

  let marqueeAnimation: ReturnType<typeof animate> | null = null;

  function startAnimation() {
    const parent = marquee.parentElement;
    if (!parent) return;

    const contentWidth = contents[0].offsetWidth;
    if (contentWidth === 0) return;

    const parentWidth = parent.offsetWidth;
    const copiesNeeded = Math.ceil(parentWidth / contentWidth) + 1;

    const existing = marquee.querySelectorAll<HTMLElement>(".marquee-content");
    for (let i = 1; i < existing.length; i++) {
      existing[i].remove();
    }

    for (let i = 1; i < copiesNeeded; i++) {
      const clone = contents[0].cloneNode(true) as HTMLElement;
      clone.setAttribute("aria-hidden", "true");
      marquee.appendChild(clone);
    }

    const sx = config.direction === "right" ? -contentWidth : 0;
    const ex = config.direction === "right" ? 0 : -contentWidth;

    marqueeAnimation = animate(
      marquee,
      { x: [sx, ex] },
      {
        duration: config.speed,
        easing: "linear",
        repeat: Infinity,
      },
    );

    if (config.pauseOnHover) {
      const pause = () => marqueeAnimation?.pause();
      const play = () => marqueeAnimation?.play();
      marquee.addEventListener("mouseenter", pause);
      marquee.addEventListener("mouseleave", play);
      marquee.addEventListener("focusin", pause);
      marquee.addEventListener("focusout", play);
    }
  }

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
