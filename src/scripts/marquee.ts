/**
 * El marquee se anima 100% por CSS (@keyframes) — ver Marquee.astro.
 * Esto es deliberado: una animación CSS de transform corre en el
 * compositor del navegador, no se desincroniza con resize, no requiere
 * medir anchos en JS, y no se rompe si este script falla en cargar.
 *
 * Este archivo es opcional y solo añade una mejora de UX: pausar el
 * marquee al hacer click/tap (útil en touch, donde no existe :hover).
 * Si no lo necesitas, puedes borrar este archivo y el <script> del
 * componente .astro sin que el marquee deje de funcionar.
 */

export function initMarqueePauseControls(): void {
  const marquees = document.querySelectorAll<HTMLElement>(".marquee");

  marquees.forEach((marquee) => {
    // Evita doble registro si esta función se vuelve a llamar
    // (por ejemplo en astro:page-load tras una View Transition).
    if (marquee.dataset.pauseBound === "true") return;
    marquee.dataset.pauseBound = "true";

    marquee.addEventListener("click", () => {
      const isPaused = marquee.dataset.paused === "true";
      marquee.dataset.paused = isPaused ? "false" : "true";
    });
  });
}
