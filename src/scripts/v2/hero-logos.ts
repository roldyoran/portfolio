/**
 * Ordered hero-logo conveyor.
 *
 * Rules:
 * - Exactly one cell changes per tick.
 * - New labels follow the source list order (first → last → first).
 * - A label shown in another cell is never assigned, so the same icon is
 *   never visible twice at the same time.
 *
 * Labels live in a single ordered cursor shared by all cells: cell 0 is the
 * initial label 0, cell 1 label 1, and so on. Each tick advances the cursor
 * once and replaces the next cell in round-robin order.
 */

const CHANGE_INTERVAL = 2400;
const EXIT_CLEANUP = 1300;

interface LogoCell {
  element: HTMLElement;
  icons: HTMLElement[];
  active: number;
}

export function initV2HeroLogos(): void {
  const root = document.querySelector<HTMLElement>("[data-v2-hero-logos]");
  if (!root) return;

  const cells: LogoCell[] = Array.from(
    root.querySelectorAll<HTMLElement>("[data-v2-logo-cell]"),
  ).map((element) => {
    const icons = Array.from(element.querySelectorAll<HTMLElement>("[data-v2-logo]"));
    const active = icons.findIndex((icon) => icon.classList.contains("is-in"));

    return { element, icons, active: active < 0 ? 0 : active };
  });

  if (cells.length === 0) return;

  const total = cells[0]?.icons.length ?? 0;

  /* Fewer labels than cells would make a duplicate unavoidable. */
  if (total <= cells.length) return;

  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
  if (reduceMotion.matches) return;

  let disposed = false;
  let visible = true;
  let timer = 0;
  let tick = 0;
  let nextIndex = cells.length;

  const syncTooltip = (cell: LogoCell, label: string): void => {
    const node = cell.element.querySelector<HTMLElement>("[data-v2-logo-tooltip]");
    if (node) node.textContent = label;
  };

  const advance = (): void => {
    const cell = cells[tick % cells.length];
    tick += 1;

    if (!cell) return;

    const candidate = nextIndex % total;
    nextIndex += 1;

    if (candidate === cell.active) return;
    if (cells.some((other) => other !== cell && other.active === candidate)) return;

    const previous = cell.icons[cell.active];
    const next = cell.icons[candidate];

    if (!previous || !next) return;

    previous.classList.remove("is-in");
    previous.classList.add("is-out");
    next.classList.remove("is-out");
    next.classList.add("is-in");

    cell.active = candidate;

    const label = next.dataset.label ?? "";
    cell.element.dataset.label = label;
    syncTooltip(cell, label);

    window.setTimeout(() => {
      if (disposed) return;
      if (cell.icons[cell.active] !== previous) previous.classList.remove("is-out");
    }, EXIT_CLEANUP);
  };

  const schedule = (): void => {
    timer = window.setTimeout(() => {
      if (disposed) return;

      if (visible && !document.hidden) advance();
      schedule();
    }, CHANGE_INTERVAL);
  };

  const observer = new IntersectionObserver(([entry]) => {
    visible = entry?.isIntersecting ?? false;
  });

  observer.observe(root);
  schedule();

  reduceMotion.addEventListener("change", () => {
    if (!reduceMotion.matches) return;

    disposed = true;
    window.clearTimeout(timer);
    observer.disconnect();
  });
}
