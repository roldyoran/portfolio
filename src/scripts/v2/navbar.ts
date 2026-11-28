/**
 * V2 navbar behaviour.
 *
 * Responsibilities:
 * - Scroll progress indicator (`#v2-scroll-pct`).
 * - Active section highlight on the desktop Starwind NavigationMenu links.
 *
 * The mobile drawer is owned by Starwind `Sheet`; there is no drawer state here.
 */

const ACTIVE_OFFSET = 180;

interface SectionOffset {
  id: string;
  top: number;
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

  let sectionOffsets: SectionOffset[] = [];

  const cacheSections = (): void => {
    sectionOffsets = sections.map((section) => ({
      id: section.id,
      top: scrollTopOf(section),
    }));
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
