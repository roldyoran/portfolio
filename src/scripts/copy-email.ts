function createTooltip(btn: HTMLButtonElement) {
  const text = btn.getAttribute("data-tooltip");
  if (!text) return null;

  const tip = document.createElement("div");
  tip.className = "copy-email-tooltip";
  tip.textContent = text;
  document.body.appendChild(tip);

  const positionTooltip = () => {
    const btnRect = btn.getBoundingClientRect();
    tip.style.left = `${btnRect.left + btnRect.width / 2}px`;
    tip.style.top = `${btnRect.top - 24}px`;
  };

  btn.addEventListener("mouseenter", () => {
    positionTooltip();
    tip.classList.add("show");
  });

  btn.addEventListener("mouseleave", () => {
    tip.classList.remove("show");
  });

  return tip;
}

function showToast(message: string) {
  const existing = document.querySelector(".copy-toast");
  if (existing) existing.remove();

  const toast = document.createElement("div");
  toast.className = "copy-toast";
  toast.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg><span>${message}</span>`;
  document.body.appendChild(toast);

  requestAnimationFrame(() => toast.classList.add("show"));

  setTimeout(() => {
    toast.classList.remove("show");
    setTimeout(() => toast.remove(), 300);
  }, 2200);
}

function initCopyEmail() {
  const buttons = document.querySelectorAll<HTMLButtonElement>("[data-copy-email]");
  if (!buttons.length) return;

  const isReducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;

  buttons.forEach((btn) => {
    const iconMail = btn.querySelector<HTMLElement>(".icon-mail");
    const iconCheck = btn.querySelector<HTMLElement>(".icon-check");

    if (iconCheck) {
      iconCheck.style.display = "none";
    }

    createTooltip(btn);

    btn.addEventListener("click", async () => {
      const email = btn.dataset.email;
      if (!email || !iconMail || !iconCheck) return;

      try {
        await navigator.clipboard.writeText(email);
      } catch {
        const textarea = document.createElement("textarea");
        textarea.value = email;
        textarea.style.position = "fixed";
        textarea.style.opacity = "0";
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand("copy");
        document.body.removeChild(textarea);
      }

      btn.classList.add("copied");
      iconMail.style.display = "none";
      iconCheck.style.display = "inline-flex";
      iconCheck.style.animation = "none";
      iconCheck.offsetHeight;
      iconCheck.style.animation = "iconPopIn 0.5s cubic-bezier(0.34, 1.56, 0.64, 1) forwards";

      const copiedText = btn.getAttribute("data-copied-text") || "Copied!";
      showToast(copiedText);

      const tip = document.querySelector<HTMLElement>(".copy-email-tooltip");
      if (tip) {
        tip.textContent = copiedText;
        tip.classList.add("show");
        setTimeout(() => tip.classList.remove("show"), 1500);
      }

      const restore = () => {
        btn.classList.remove("copied");
        iconMail.style.display = "inline-flex";
        iconCheck.style.display = "none";
        const tipText = btn.getAttribute("data-tooltip") || "";
        if (tip) tip.textContent = tipText;
      };

      setTimeout(restore, isReducedMotion ? 1500 : 2200);
    });
  });
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initCopyEmail);
} else {
  initCopyEmail();
}
