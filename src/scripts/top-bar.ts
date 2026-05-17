function initTopbarClock() {
  const clockEl = document.getElementById("topbar-time");

  if (!clockEl) return;

  function tick() {
    clockEl.textContent = new Date().toLocaleTimeString("en-US", { hour12: false });
  }

  tick();
  setInterval(tick, 1000);
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initTopbarClock);
} else {
  initTopbarClock();
}
