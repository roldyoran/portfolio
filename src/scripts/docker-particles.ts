/**
 * Mesh-wave dot field for the /docker hero.
 *
 * Ports the "Malla ondulante" study from the reference mock
 * (`Docker – Trust Docker for the agents you don't.html`, data-demo="wave"):
 * a perspective dot grid whose rows grow and brighten with depth while a
 * travelling sine wave runs across the columns.
 *
 * The grid is anchored to the hero choreography (setView/setZoom) so the
 * existing intro assembly and pinned-scroll dispersion keep working:
 * - setView: mesh centre + zone size from the art zone.
 * - setDisperse/setSpread: scatter each dot outward with per-dot delay and
 *   late alpha falloff, used for the intro converge and scroll rain-off.
 * - setZoom: scales spans, dot size and wave amplitude.
 */

export interface DockerParticleField {
  setView: (centerX: number, centerY: number, size: number) => void;
  setDisperse: (value: number) => void;
  setSpread: (value: number) => void;
  setZoom: (value: number) => void;
  play: () => void;
  pause: () => void;
  destroy: () => void;
}

interface MeshParticle {
  u: number;
  v: number;
  i: number;
  j: number;
  dirX: number;
  dirY: number;
  delay: number;
  phase: number;
}

function clamp(value: number, min: number, max: number): number {
  return Math.min(max, Math.max(min, value));
}

function smooth(value: number): number {
  const t = clamp(value, 0, 1);
  return t * t * (3 - 2 * t);
}

function mulberry32(seed: number): () => number {
  let a = seed;
  return () => {
    a += 0x6b7b95;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function buildMesh(cols: number, rows: number, seed: number): MeshParticle[] {
  const random = mulberry32(seed);
  const particles: MeshParticle[] = [];
  for (let j = 0; j < rows; j += 1) {
    const v = rows === 1 ? 0.5 : j / (rows - 1);
    for (let i = 0; i < cols; i += 1) {
      const u = cols === 1 ? 0.5 : i / (cols - 1);
      const angle = random() * Math.PI * 2;
      const mag = 0.6 + 1.1 * random();
      particles.push({
        u,
        v,
        i,
        j,
        dirX: Math.cos(angle) * mag,
        dirY: Math.sin(angle) * mag - 0.35,
        delay: 0.45 * random(),
        phase: random() * Math.PI * 2,
      });
    }
  }
  return particles;
}

export function mountDockerParticles(canvas: HTMLCanvasElement): DockerParticleField | null {
  const context = canvas.getContext("2d");
  if (!context) return null;

  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
  let width = 1;
  let height = 1;
  let dpr = 1;
  let centerX = 0;
  let centerY = 0;
  let zoneSize = 1080;
  let disperse = 1;
  let spread = 0;
  let zoom = 1;
  let playing = false;
  let enabled = true;
  let raf = 0;
  let last = 0;
  let time = 0;
  let visible = true;

  let cols = 48;
  let rows = 16;
  let particles = buildMesh(cols, rows, 20261126);
  let ink = "#fffdfa";

  const readColor = (): void => {
    const computed = getComputedStyle(canvas).color;
    if (computed && computed !== ink) {
      ink = computed;
    }
  };

  const draw = (): void => {
    /* Fill the whole hero canvas (like the source wave study) instead of the
       small centred art square: spans come from the canvas size so the mesh
       stretches edge to edge, with zoom applied on top for scroll. */
    const norm = (Math.min(width, height) / 700) * zoom;
    const spanX = width * 0.92 * zoom;
    const spanY = height * 0.55 * zoom;
    /* Hero-scaled swell: ~4.5% of hero height at the deepest row so the wave
       reads at hero scale instead of demo-card scale (the card is ~300px,
       the hero is ~620px+, so the original 16px amplitude looked flat). */
    const swell = height * 0.045 * zoom;
    const travel = spread > 0 ? spread : 0.9 * Math.max(width, height);
    const f = smooth(disperse);

    context.setTransform(dpr, 0, 0, dpr, 0, 0);
    context.clearRect(0, 0, width, height);
    context.fillStyle = ink;

    for (let n = 0; n < particles.length; n += 1) {
      const p = particles[n];
      /* Perspective: lower rows are larger and brighter, like the source. */
      const k = p.v;
      const sc = 0.5 + k;
      const xBase = centerX + (p.u - 0.5) * spanX;
      const yBase = centerY + height * 0.09 * zoom + (p.v - 0.5) * spanY;
      const phase = p.i * 0.35 + time * 0.9 + p.j * 0.55;
      const wave = Math.sin(phase) * swell * sc;
      let sx = xBase;
      let sy = yBase + wave;
      let size = 2.6 * sc * norm;
      /* Crest highlight: dots riding the crest glow brighter so the wave reads. */
      let alpha =
        (0.22 + 0.68 * k) *
        (0.85 + 0.15 * Math.sin(time * 0.8 + p.phase)) *
        (0.82 + 0.18 * Math.sin(phase));

      if (f > 0.001) {
        const a = smooth((f - p.delay) / (1 - p.delay));
        if (a > 0.001) {
          sx += p.dirX * travel * a;
          sy += p.dirY * travel * a;
          if (a >= 0.7) {
            const t = (a - 0.7) / 0.3;
            alpha *= 1 - t * t;
          }
          size *= 1 + 0.5 * a;
        }
      }

      if (alpha <= 0.012) continue;
      if (sx < -48 || sx > width + 48 || sy < -48 || sy > height + 48) continue;
      if (size < 0.4) continue;

      context.globalAlpha = clamp(alpha, 0, 1);
      context.fillRect(sx - size / 2, sy - size / 2, size, size);
    }
    context.globalAlpha = 1;
  };

  const resize = (): void => {
    const rect = canvas.getBoundingClientRect();
    width = Math.max(1, rect.width);
    height = Math.max(1, rect.height);
    dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = Math.round(width * dpr);
    canvas.height = Math.round(height * dpr);

    const nextCols = width < 700 ? 28 : clamp(Math.round(width / 26), 44, 64);
    const nextRows = width < 700 ? 14 : 16;
    if (nextCols !== cols || nextRows !== rows || particles.length !== nextCols * nextRows) {
      cols = nextCols;
      rows = nextRows;
      particles = buildMesh(cols, rows, 20261126);
    }

    if (!centerX && !centerY) {
      centerX = width / 2;
      centerY = height / 2;
      zoneSize = Math.min(width, height) * 0.9;
    }

    context.setTransform(dpr, 0, 0, dpr, 0, 0);
    draw();
  };

  const frame = (now: number): void => {
    raf = 0;
    if (!playing) return;
    if (last) {
      time += Math.min(0.05, (now - last) / 1000);
    }
    last = now;
    draw();
    raf = requestAnimationFrame(frame);
  };

  const start = (): void => {
    if (reduceMotion.matches) {
      draw();
      return;
    }
    if (playing || !enabled || !visible) return;
    playing = true;
    last = 0;
    raf = requestAnimationFrame(frame);
  };

  const stop = (): void => {
    playing = false;
    if (raf) cancelAnimationFrame(raf);
    raf = 0;
  };

  const play = (): void => {
    enabled = true;
    start();
  };

  const pause = (): void => {
    enabled = false;
    stop();
  };

  readColor();
  resize();
  draw();
  canvas.classList.add("is-ready");

  const resizeObserver = new ResizeObserver(resize);
  resizeObserver.observe(canvas);

  const intersectionObserver = new IntersectionObserver(([entry]) => {
    visible = entry.isIntersecting;
    if (visible) start();
    else stop();
  });
  intersectionObserver.observe(canvas);

  const onVisibility = (): void => {
    if (document.hidden) stop();
    else start();
  };
  document.addEventListener("visibilitychange", onVisibility);

  const onMotionChange = (): void => {
    if (reduceMotion.matches) {
      stop();
      draw();
    } else {
      start();
    }
  };
  reduceMotion.addEventListener("change", onMotionChange);

  return {
    setView(nextCenterX, nextCenterY, nextSize) {
      centerX = nextCenterX;
      centerY = nextCenterY;
      zoneSize = Math.max(1, nextSize);
      if (!playing) draw();
    },
    setDisperse(value) {
      disperse = clamp(value, 0, 1);
      if (!playing) draw();
    },
    setSpread(value) {
      spread = Math.max(0, value);
      if (!playing) draw();
    },
    setZoom(value) {
      zoom = Math.max(0.5, value);
      if (!playing) draw();
    },
    play,
    pause,
    destroy() {
      stop();
      resizeObserver.disconnect();
      intersectionObserver.disconnect();
      document.removeEventListener("visibilitychange", onVisibility);
      reduceMotion.removeEventListener("change", onMotionChange);
    },
  };
}
