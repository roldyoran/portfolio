/**
 * Crossfades the hero tech logos one at a time through a single global
 * scheduler: each swap picks a random cell (never the same twice in a row)
 * after a variable pause, so changes feel asynchronous instead of marching
 * in lockstep. Same choreography as the /docker study. Reduced-motion
 * users keep the initial set.
 */

const MIN_GAP = 1400;
const GAP_RANGE = 2000;
const FIRST_SWAP_MIN = 1200;
const FIRST_SWAP_RANGE = 800;
const EXIT_CLEANUP = 1300;

interface LogoSequence {
  cell: HTMLElement;
  logos: HTMLElement[];
  active: number;
}

const labelOf = (logo: HTMLElement | undefined): string => logo?.dataset.heroLogoLabel ?? "";

const syncLabel = (sequence: LogoSequence, logo: HTMLElement | undefined): void => {
  const label = labelOf(logo);
  if (label) {
    sequence.cell.dataset.label = label;
  } else {
    delete sequence.cell.dataset.label;
  }
};

export function initHeroLogos(): void {
  const root = document.querySelector<HTMLElement>("[data-hero-logos]");
  if (!root) return;

  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
  const cells = Array.from(root.querySelectorAll<HTMLElement>("[data-hero-logo-cell]"));
  if (cells.length === 0) return;

  const sequences: LogoSequence[] = cells.map((cell) => {
    const logos = Array.from(cell.querySelectorAll<HTMLElement>("[data-hero-logo]"));
    const activeIndex = logos.findIndex((logo) => logo.classList.contains("is-in"));
    const sequence: LogoSequence = { cell, logos, active: activeIndex < 0 ? 0 : activeIndex };
    syncLabel(sequence, logos[sequence.active]);
    return sequence;
  });

  if (reduceMotion.matches) return;

  const total = sequences[0]?.logos.length ?? 0;
  if (total < 2) return;

  let visible = true;
  let disposed = false;
  let timers: number[] = [];
  let lastCell = -1;

  const later = (fn: () => void, delay: number): void => {
    const id = window.setTimeout(() => {
      timers = timers.filter((timer) => timer !== id);
      if (!disposed) fn();
    }, delay);
    timers.push(id);
  };

  const advance = (cellIndex: number): void => {
    const sequence = sequences[cellIndex];
    if (!sequence) return;

    /* Never show the same logo twice on screen: skip indexes visible elsewhere. */
    const taken = new Set<number>();
    sequences.forEach((other, otherIndex) => {
      if (otherIndex !== cellIndex) taken.add(other.active);
    });

    let incoming = sequence.active;
    if (total > cells.length) {
      do {
        incoming = (incoming + 1) % total;
      } while (taken.has(incoming));
    } else {
      incoming = (sequence.active + 1) % total;
    }

    const previous = sequence.logos[sequence.active];
    sequence.active = incoming;
    const next = sequence.logos[incoming];

    previous?.classList.remove("is-in");
    previous?.classList.add("is-out");
    next?.classList.remove("is-out");
    next?.classList.add("is-in");
    syncLabel(sequence, next);

    /* Drop the stale exit state after the fade so every cycle starts clean. */
    if (previous) {
      later(() => {
        if (sequence.logos[sequence.active] !== previous) {
          previous.classList.remove("is-out");
        }
      }, EXIT_CLEANUP);
    }
  };

  const pickNext = (): number => {
    if (cells.length < 2) return 0;
    let next = Math.floor(Math.random() * cells.length);
    while (next === lastCell) {
      next = Math.floor(Math.random() * cells.length);
    }
    return next;
  };

  const scheduleNext = (): void => {
    later(() => {
      if (visible && !document.hidden) {
        lastCell = pickNext();
        advance(lastCell);
      }
      scheduleNext();
    }, MIN_GAP + Math.random() * GAP_RANGE);
  };

  later(() => scheduleNext(), FIRST_SWAP_MIN + Math.random() * FIRST_SWAP_RANGE);

  const observer = new IntersectionObserver(([entry]) => {
    visible = entry?.isIntersecting ?? false;
  });
  observer.observe(root);

  reduceMotion.addEventListener("change", () => {
    if (reduceMotion.matches) {
      disposed = true;
      timers.forEach((id) => window.clearTimeout(id));
      timers = [];
      observer.disconnect();
    }
  });
}
