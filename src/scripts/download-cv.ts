export function initDownloadCV() {
  document.querySelectorAll("[data-download-cv]").forEach((btn) => {
    btn.addEventListener("click", async (e) => {
      // Always use the link's own href so the script never desyncs
      // from the filename set in the markup.
      const href = btn.getAttribute("href");
      if (!href) return;
      e.preventDefault();
      try {
        const res = await fetch(href);
        if (!res.ok) throw new Error("Failed to fetch CV");
        const blob = await res.blob();
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = href.split("/").pop() ?? "CV.pdf";
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
      } catch (err) {
        window.location.href = href;
      }
    });
  });
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initDownloadCV);
} else {
  initDownloadCV();
}
