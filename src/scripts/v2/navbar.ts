/**
 * V2 navbar behaviour.
 *
 * Responsibilities:
 * - Scroll progress indicator (`#v2-scroll-pct`).
 * - Active section highlight on the desktop Starwind NavigationMenu links.
 * - Navbar surface tone: follows the section behind it (ink/carbon).
 *
 * The mobile drawer is owned by Starwind `Sheet`; there is no drawer state here.
 */

const ACTIVE_OFFSET = 180;
/** Línea de detección bajo el navbar (su alto + margen superior). */
const BG_PROBE = 72;

interface SectionOffset {
  id: string;
  top: number;
  element: HTMLElement;
}

function formatPercent(value: number): string {
  return `${String(value).padStart(2, "0")}%`;
}

function scrollTopOf(element: HTMLElement): number {
  return element.getBoundingClientRect().top + window.scrollY;
}

export function initV2Navbar(): void {
  const nav = document.querySelector<HTMLElement>("[data-v2-nav]");
  if (!nav) return;

  const percentLabel = document.querySelector<HTMLElement>("#v2-scroll-pct");
  const links = Array.from(nav.querySelectorAll<HTMLAnchorElement>("[data-v2-nav-link]"));

  const linkedIds = new Set(
    links
      .map((link) => link.getAttribute("href")?.replace("#", ""))
      .filter((id): id is string => Boolean(id)),
  );

  const sections = Array.from(document.querySelectorAll<HTMLElement>("main section[id]")).filter(
    (section) => linkedIds.has(section.id),
  );

  /* Para el fondo solo importan las secciones de nivel superior: las internas
     heredan el fondo de su contenedor y confundirían la detección. */
  const bgSections = Array.from(
    document.querySelectorAll<HTMLElement>("main > section[id]"),
  );

  let sectionOffsets: SectionOffset[] = [];
  let bgBoxes: SectionOffset[] = [];

  const cacheSections = (): void => {
    sectionOffsets = sections.map((section) => ({
      id: section.id,
      top: scrollTopOf(section),
      element: section,
    }));
    bgBoxes = bgSections.map((section) => ({
      id: section.id,
      top: scrollTopOf(section),
      element: section,
    }));
  };

  const sectionAt = (probeY: number): HTMLElement | null => {
    let current: HTMLElement | null = null;
    for (const section of bgBoxes) {
      if (probeY < section.top) break;
      current = section.element;
    }
    return current;
  };

  const isTransparentBackground = (color: string): boolean => {
    const match = color.match(
      /rgba?\(\s*([\d.]+)[,\s]+([\d.]+)[,\s]+([\d.]+)(?:[,\s/]+([\d.]+))?/,
    );
    if (!match) return false;
    const alpha = match[4] === undefined ? "1" : match[4];
    return Number.parseFloat(alpha) === 0;
  };

  /** Sube por los ancestros hasta el primer fondo opaco (las secciones internas son transparentes). */
  const resolveSectionBackground = (element: HTMLElement): string | null => {
    let node: HTMLElement | null = element;
    let depth = 0;
    while (node && depth < 8) {
      const background = getComputedStyle(node).backgroundColor;
      if (background && !isTransparentBackground(background)) return background;
      node = node.parentElement;
      depth += 1;
    }
    return null;
  };

  let lastBackground = "";

  /* v2 es full dark: la pill solo sigue el tono de la sección (ink/carbon). */
  const syncNavbarSurface = (scrollY: number): void => {
    const section = sectionAt(scrollY + BG_PROBE);
    if (!section) return;
    const background = resolveSectionBackground(section);
    if (background === null || background === lastBackground) return;
    lastBackground = background;
    nav.style.setProperty("--v2-nav-bg", background);
  };

  const setActiveLink = (scrollY: number): void => {
    let currentId = "";

    for (const section of sectionOffsets) {
      if (scrollY < section.top - ACTIVE_OFFSET) break;
      currentId = section.id;
    }

    for (const link of links) {
      const isActive = link.getAttribute("href") === `#${currentId}`;

      if (isActive) {
        link.setAttribute("aria-current", "page");
        link.setAttribute("data-active", "");
      } else {
        link.removeAttribute("aria-current");
        link.removeAttribute("data-active");
      }
    }
  };

  let ticking = false;

  const update = (): void => {
    ticking = false;

    const scrollY = window.scrollY;
    const root = document.documentElement;
    const maxScroll = root.scrollHeight - root.clientHeight;
    const percent = maxScroll > 0 ? Math.round((scrollY / maxScroll) * 100) : 0;

    if (percentLabel) percentLabel.textContent = formatPercent(percent);
    setActiveLink(scrollY);
    syncNavbarSurface(scrollY);
  };

  const requestUpdate = (): void => {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(update);
  };

  window.addEventListener("scroll", requestUpdate, { passive: true });
  window.addEventListener(
    "resize",
    () => {
      cacheSections();
      requestUpdate();
    },
    { passive: true },
  );

  cacheSections();
  update();
}
