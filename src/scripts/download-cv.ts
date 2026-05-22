const base = import.meta.env.BASE_URL || '/';
const baseUrl = base.endsWith('/') ? base : `${base}/`;
const cvPath = `${baseUrl}cv/CV_EDGAR_ALVAREZ_DEVOPS_DEV.pdf`;

export function initDownloadCV() {
  document.querySelectorAll("[data-download-cv]").forEach((btn) => {
    btn.addEventListener("click", async (e) => {
      e.preventDefault();
      try {
        const res = await fetch(cvPath);
        if (!res.ok) throw new Error("Failed to fetch CV");
        const blob = await res.blob();
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = "CV_Edgar_Alvarez.pdf";
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
      } catch (err) {
        window.location.href = cvPath;
      }
    });
  });
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initDownloadCV);
} else {
  initDownloadCV();
}
