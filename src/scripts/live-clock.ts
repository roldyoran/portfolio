/**
 * Live Guatemala clock for the hero availability pill.
 * Reuses the original top-bar clock idea, scoped to [data-clock].
 */
function initLiveClock() {
  const els = document.querySelectorAll<HTMLElement>("[data-clock]");
  if (!els.length) return;

  const fmt = new Intl.DateTimeFormat("en-GB", {
    hour: "2-digit",
    minute: "2-digit",
    timeZone: "America/Guatemala",
  });

  const tick = () => {
    const value = `${fmt.format(new Date())} GT`;
    els.forEach((el) => {
      el.textContent = value;
    });
  };

  tick();
  setInterval(tick, 30000);
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initLiveClock);
} else {
  initLiveClock();
}
