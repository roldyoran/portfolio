/**
 * Crossfades the client logos one at a time through a single global
 * scheduler: each swap picks a random cell (never the same twice in a row)
 * after a variable pause, so changes feel asynchronous instead of marching
 * in lockstep. Reduced-motion users keep the initial set.
 */

const MIN_GAP = 1400;
const GAP_RANGE = 2000;
const FIRST_SWAP_MIN = 1200;
const FIRST_SWAP_RANGE = 800;
const EXIT_CLEANUP = 1300;

export function initDockerLogos(): void {
  const root = document.querySelector<HTMLElement>("[data-dk-logos]");
  if (!root) return;

  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
  if (reduceMotion.matches) return;

  const cells = Array.from(root.querySelectorAll<HTMLElement>("[data-dk-logo-cell]"));
  if (cells.length === 0) return;

  const sequences = cells.map((cell) => {
    const images = Array.from(cell.querySelectorAll<HTMLImageElement>("[data-dk-logo]"));
    const activeIndex = images.findIndex((image) => image.classList.contains("is-in"));
    return { images, active: activeIndex < 0 ? 0 : activeIndex };
  });

  const total = sequences[0]?.images.length ?? 0;
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

    const previous = sequence.images[sequence.active];
    sequence.active = (sequence.active + 1) % total;
    const next = sequence.images[sequence.active];

    previous?.classList.remove("is-in");
    previous?.classList.add("is-out");
    next?.classList.remove("is-out");
    next?.classList.add("is-in");

    /* Drop the stale exit state after the fade so every cycle starts clean. */
    if (previous) {
      later(() => {
        if (sequence.images[sequence.active] !== previous) {
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
    visible = entry.isIntersecting;
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
