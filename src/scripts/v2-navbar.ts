/**
 * V2 navbar: scroll percentage, active section and the mobile drawer.
 * The header is always visible; it never hides on scroll.
 */

interface SectionOffset {
  id: string;
  top: number;
}

const ACTIVE_OFFSET = 180;

function formatPercent(value: number): string {
  return `${String(value).padStart(2, "0")}%`;
}

function scrollTopOf(element: HTMLElement): number {
  return element.getBoundingClientRect().top + window.scrollY;
}

export function initV2Navbar(): void {
  const header = document.querySelector<HTMLElement>("[data-v2-header]");
  const nav = document.querySelector<HTMLElement>("[data-v2-nav]");
  if (!header || !nav) return;

  const pct = document.querySelector<HTMLElement>("#v2-scroll-pct");
  const links = Array.from(document.querySelectorAll<HTMLAnchorElement>("[data-v2-nav-link]"));
  const linkedIds = new Set(
    links
      .map((link) => link.getAttribute("href")?.replace("#", ""))
      .filter((id): id is string => Boolean(id)),
  );
  const sections = Array.from(document.querySelectorAll<HTMLElement>("main section[id]")).filter(
    (section) => linkedIds.has(section.id),
  );
  const burger = nav.querySelector<HTMLButtonElement>("[data-v2-burger]");
  const burgerLabelClosed = burger?.dataset.labelClosed ?? "Menú";
  const burgerLabelOpen = burger?.dataset.labelOpen ?? "Cerrar menú";
  const mobile = header.querySelector<HTMLElement>("[data-v2-mobile]");
  const mobileLinks = Array.from(
    header.querySelectorAll<HTMLAnchorElement>("[data-v2-mobile-link]"),
  );
  const desktop = window.matchMedia("(min-width: 1080px)");

  let sectionOffsets: SectionOffset[] = [];

  const cacheSections = (): void => {
    sectionOffsets = sections.map((section) => ({
      id: section.id,
      top: scrollTopOf(section),
    }));
  };

  /* ---------------------------------------------------------------------- */
  /* Mobile drawer                                                          */
  /* ---------------------------------------------------------------------- */

  const isMobileOpen = (): boolean => header.dataset.mobileOpen === "true";
  let lastTrigger: HTMLElement | null = null;

  const setMobile = (open: boolean, restoreFocus = false): void => {
    if (!burger || !mobile) return;

    header.dataset.mobileOpen = open ? "true" : "false";
    burger.setAttribute("aria-expanded", String(open));
    burger.setAttribute("aria-label", open ? burgerLabelOpen : burgerLabelClosed);
    mobile.toggleAttribute("inert", !open);
    document.body.classList.toggle("v2-scroll-lock", open);

    if (open) {
      lastTrigger = document.activeElement instanceof HTMLElement ? document.activeElement : null;
      mobileLinks[0]?.focus();
    } else if (restoreFocus) {
      (lastTrigger instanceof HTMLElement ? lastTrigger : burger).focus();
      lastTrigger = null;
    }
  };

  burger?.addEventListener("click", () => {
    setMobile(!isMobileOpen());
  });

  mobileLinks.forEach((link) => {
    link.addEventListener("click", () => setMobile(false));
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && isMobileOpen()) {
      setMobile(false, true);
    }
  });

  document.addEventListener("pointerdown", (event) => {
    if (!isMobileOpen()) return;
    const target = event.target;
    if (!(target instanceof Node)) return;
    if (!header.contains(target)) setMobile(false);
  });

  desktop.addEventListener("change", (event) => {
    if (event.matches) setMobile(false);
  });

  /* ---------------------------------------------------------------------- */
  /* Scroll state                                                           */
  /* ---------------------------------------------------------------------- */

  let ticking = false;

  const setActive = (scrollY: number): void => {
    let currentId = "";

    for (const section of sectionOffsets) {
      if (scrollY >= section.top - ACTIVE_OFFSET) {
        currentId = section.id;
      } else {
        break;
      }
    }

    links.forEach((link) => {
      const isActive = link.getAttribute("href") === `#${currentId}`;
      if (isActive) {
        link.setAttribute("aria-current", "true");
        link.classList.add("is-active");
      } else {
        link.removeAttribute("aria-current");
        link.classList.remove("is-active");
      }
    });
  };

  const update = (): void => {
    ticking = false;

    const scrollY = window.scrollY;
    const root = document.documentElement;
    const maxScroll = root.scrollHeight - root.clientHeight;
    const percent = maxScroll > 0 ? Math.round((scrollY / maxScroll) * 100) : 0;

    if (pct) pct.textContent = formatPercent(percent);
    setActive(scrollY);
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
  setActive(window.scrollY);
  update();
}
