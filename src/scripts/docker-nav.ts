/**
 * Navbar behaviour for the Docker study: mega menu, expanding search,
 * mobile drawer and the hide-on-scroll animation of the source site.
 */

export function initDockerNav(): void {
  const header = document.querySelector<HTMLElement>("[data-dk-header]");
  const nav = document.querySelector<HTMLElement>("[data-dk-nav]");
  if (!header || !nav) return;

  const megaTrigger = nav.querySelector<HTMLAnchorElement>("[data-dk-mega-trigger]");
  const megaPanel = nav.querySelector<HTMLElement>("[data-dk-mega-panel]");
  const burger = nav.querySelector<HTMLButtonElement>("[data-dk-burger]");
  const mobile = header.querySelector<HTMLElement>("[data-dk-mobile]");
  const search = nav.querySelector<HTMLFormElement>("[data-dk-search]");
  const searchToggle = nav.querySelector<HTMLButtonElement>("[data-dk-search-toggle]");
  const searchClose = nav.querySelector<HTMLButtonElement>("[data-dk-search-close]");
  const searchInput = nav.querySelector<HTMLInputElement>("[data-dk-search-input]");
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

  const desktop = window.matchMedia("(min-width: 1080px)");

  /* ---------------------------------------------------------------------- */
  /* Mega menu                                                              */
  /* ---------------------------------------------------------------------- */

  const setMega = (open: boolean): void => {
    if (!megaTrigger || !megaPanel) return;
    nav.classList.toggle("is-mega-open", open);
    megaTrigger.setAttribute("aria-expanded", String(open));
    megaPanel.toggleAttribute("inert", !open);
    if (open) setSearch(false);
  };

  megaTrigger?.addEventListener("pointerenter", () => {
    if (desktop.matches) setMega(true);
  });
  megaTrigger?.addEventListener("focus", () => {
    if (desktop.matches) setMega(true);
  });

  nav.addEventListener("pointerleave", () => setMega(false));
  nav.addEventListener("focusout", (event) => {
    const next = event.relatedTarget as Node | null;
    if (next && nav.contains(next)) return;
    setMega(false);
  });

  /* ---------------------------------------------------------------------- */
  /* Search                                                                 */
  /* ---------------------------------------------------------------------- */

  const setSearch = (open: boolean, restoreFocus = false): void => {
    if (!searchToggle || !searchInput) return;
    nav.classList.toggle("is-search-open", open);
    searchToggle.setAttribute("aria-expanded", String(open));
    searchInput.tabIndex = open ? 0 : -1;
    if (open) {
      setMega(false);
      requestAnimationFrame(() => searchInput.focus());
    } else if (restoreFocus) {
      searchToggle.focus();
    }
  };

  searchToggle?.addEventListener("click", () => {
    setSearch(!nav.classList.contains("is-search-open"));
  });
  searchClose?.addEventListener("click", () => setSearch(false, true));
  search?.addEventListener("submit", (event) => {
    if (!searchInput?.value.trim()) {
      event.preventDefault();
      searchInput?.focus();
    }
  });

  /* ---------------------------------------------------------------------- */
  /* Mobile drawer                                                          */
  /* ---------------------------------------------------------------------- */

  const setMobile = (open: boolean): void => {
    if (!burger || !mobile) return;
    nav.classList.toggle("is-mobile-open", open);
    burger.setAttribute("aria-expanded", String(open));
    burger.setAttribute("aria-label", open ? "Close menu" : "Open menu");
    mobile.toggleAttribute("inert", !open);
    document.body.classList.toggle("dk-scroll-lock", open);
    if (open) {
      setMega(false);
      setSearch(false);
    }
  };

  burger?.addEventListener("click", () => {
    setMobile(!nav.classList.contains("is-mobile-open"));
  });

  mobile?.querySelectorAll<HTMLAnchorElement>("a").forEach((link) => {
    link.addEventListener("click", () => setMobile(false));
  });

  /* ---------------------------------------------------------------------- */
  /* Global dismissal                                                       */
  /* ---------------------------------------------------------------------- */

  document.addEventListener("keydown", (event) => {
    if (event.key !== "Escape") return;
    if (nav.classList.contains("is-mobile-open")) {
      setMobile(false);
      burger?.focus();
      return;
    }
    if (nav.classList.contains("is-search-open")) {
      setSearch(false, true);
      return;
    }
    setMega(false);
  });

  document.addEventListener("pointerdown", (event) => {
    const target = event.target as Node;
    if (search && !search.contains(target)) {
      setSearch(false);
    }
    if (mobile && !mobile.contains(target) && !burger?.contains(target)) {
      setMobile(false);
    }
  });

  desktop.addEventListener("change", (event) => {
    if (event.matches) setMobile(false);
  });

  /* ---------------------------------------------------------------------- */
  /* Hide on scroll down, reveal on scroll up                               */
  /* ---------------------------------------------------------------------- */

  let lastY = window.scrollY;
  let ticking = false;

  const update = (): void => {
    ticking = false;
    const y = window.scrollY;

    const interacting =
      nav.classList.contains("is-mega-open") ||
      nav.classList.contains("is-mobile-open") ||
      nav.classList.contains("is-search-open");

    if (!interacting && y > lastY + 6 && y > 120) {
      header.dataset.dkCollapsed = "";
    } else if (y < lastY - 6 || y < 80) {
      delete header.dataset.dkCollapsed;
    }

    lastY = y;
  };

  const onScroll = (): void => {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(update);
  };

  window.addEventListener("scroll", onScroll, { passive: true });

  if (reduceMotion.matches) {
    header.dataset.dkReducedMotion = "";
  }
}
