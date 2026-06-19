interface Node {
  ox: number;
  oy: number;
  x: number;
  y: number;
  e: number;
}

interface Mouse {
  x: number;
  y: number;
  active: boolean;
}

const SPACING = 118;
const R = 340;
const PUSH = 42;
const ACID: [number, number, number] = [249, 115, 22];
const BASE: [number, number, number] = [150, 150, 145];

const lerp = (a: number, b: number, f: number): number =>
  Math.round(a + (b - a) * f);

export function initNeuralGrid(canvasSelector = "#neural-canvas") {
  const canvas = document.querySelector<HTMLCanvasElement>(canvasSelector);
  if (!canvas || !canvas.getContext) return;

  const ctx = canvas.getContext("2d");
  if (!ctx) return;

  const hero = canvas.closest<HTMLElement>(".hero-section");
  if (!hero) return;

  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const dpr = Math.min(window.devicePixelRatio || 1, 2);

  let w = 0;
  let h = 0;
  let cols = 0;
  let rows = 0;
  let nodes: Node[] = [];
  let t = 0;
  let raf: number | null = null;
  let visible = true;

  const mouse: Mouse = { x: -9999, y: -9999, active: false };

  function build() {
    const rect = hero.getBoundingClientRect();
    w = Math.max(1, rect.width);
    h = Math.max(1, rect.height);
    canvas.width = Math.round(w * dpr);
    canvas.height = Math.round(h * dpr);
    canvas.style.width = `${w}px`;
    canvas.style.height = `${h}px`;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    cols = Math.ceil(w / SPACING) + 2;
    rows = Math.ceil(h / SPACING) + 2;
    nodes = new Array(cols * rows);
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        const ox = c * SPACING;
        const oy = r * SPACING;
        nodes[r * cols + c] = { ox, oy, x: ox, y: oy, e: 0 };
      }
    }
  }

  function draw() {
    t += 0.016;
    ctx.clearRect(0, 0, w, h);

    const cursors = [
      {
        x:
          w * 0.5 +
          Math.sin(t * 0.13) * w * 0.36 +
          Math.sin(t * 0.07 + 1.3) * w * 0.16,
        y:
          h * 0.5 +
          Math.cos(t * 0.11) * h * 0.34 +
          Math.cos(t * 0.05 + 0.7) * h * 0.18,
      },
      {
        x:
          w * 0.5 +
          Math.cos(t * 0.09 + 2.1) * w * 0.4 +
          Math.sin(t * 0.05 + 0.4) * w * 0.12,
        y:
          h * 0.5 +
          Math.sin(t * 0.12 + 1.7) * h * 0.32 +
          Math.cos(t * 0.06 + 2.5) * h * 0.16,
      },
      {
        x:
          w * 0.5 +
          Math.sin(t * 0.07 + 4.2) * w * 0.34 +
          Math.cos(t * 0.1 + 3.3) * w * 0.18,
        y:
          h * 0.5 +
          Math.cos(t * 0.14 + 0.9) * h * 0.36 +
          Math.sin(t * 0.04 + 1.1) * h * 0.14,
      },
    ];
    if (mouse.active) cursors.push({ x: mouse.x, y: mouse.y });

    for (let i = 0; i < nodes.length; i++) {
      const n = nodes[i];
      const wx = reduce
        ? 0
        : Math.sin(n.ox * 0.012 + n.oy * 0.01 + t * 0.85) * 8 +
          Math.cos(n.oy * 0.016 - t * 0.7) * 5;
      const wy = reduce
        ? 0
        : Math.cos(n.ox * 0.014 - t * 0.8) * 6 +
          Math.sin(n.oy * 0.012 + t * 1.0) * 5;
      let tx = n.ox + wx;
      let ty = n.oy + wy;
      let e = 0;
      for (let g = 0; g < cursors.length; g++) {
        const dx = n.ox - cursors[g].x;
        const dy = n.oy - cursors[g].y;
        const d = Math.hypot(dx, dy);
        if (d < R) {
          const f = 1 - d / R;
          if (f > e) e = f;
          const ang = Math.atan2(dy, dx);
          const p = f * f * PUSH;
          tx += Math.cos(ang) * p;
          ty += Math.sin(ang) * p;
        }
      }
      n.e += (e - n.e) * 0.12;
      n.x += (tx - n.x) * 0.16;
      n.y += (ty - n.y) * 0.16;
    }

    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        const n = nodes[r * cols + c];
        const nb = [
          c + 1 < cols ? nodes[r * cols + c + 1] : null,
          r + 1 < rows ? nodes[(r + 1) * cols + c] : null,
        ];
        for (let k = 0; k < 2; k++) {
          const m = nb[k];
          if (!m) continue;
          const e = n.e > m.e ? n.e : m.e;
          ctx.strokeStyle = `rgba(${lerp(BASE[0], ACID[0], e)},${lerp(BASE[1], ACID[1], e)},${lerp(BASE[2], ACID[2], e)},${0.045 + e * 0.16})`;
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.moveTo(n.x, n.y);
          ctx.lineTo(m.x, m.y);
          ctx.stroke();
        }
      }
    }

    for (let i = 0; i < nodes.length; i++) {
      const n = nodes[i];
      const e = n.e;
      const col = `rgba(${lerp(BASE[0], ACID[0], e)},${lerp(BASE[1], ACID[1], e)},${lerp(BASE[2], ACID[2], e)},${0.2 + e * 0.22})`;
      ctx.fillStyle = col;
      ctx.shadowBlur = e > 0.3 ? 4 * e : 0;
      ctx.shadowColor = `rgba(249,115,22,${e * 0.4})`;
      ctx.beginPath();
      ctx.arc(n.x, n.y, 1.5 + e * 3, 0, 6.2832);
      ctx.fill();
    }
    ctx.shadowBlur = 0;
    raf = requestAnimationFrame(draw);
  }

  const start = () => {
    if (!raf) raf = requestAnimationFrame(draw);
  };
  const stop = () => {
    if (raf) {
      cancelAnimationFrame(raf);
      raf = null;
    }
  };

  function setMouse(cx: number, cy: number) {
    const rect = hero.getBoundingClientRect();
    mouse.x = cx - rect.left;
    mouse.y = cy - rect.top;
    mouse.active =
      mouse.x >= -R &&
      mouse.x <= w + R &&
      mouse.y >= -R &&
      mouse.y <= h + R;
  }

  window.addEventListener("mousemove", (e) => setMouse(e.clientX, e.clientY), {
    passive: true,
  });
  window.addEventListener(
    "touchmove",
    (e) => {
      if (e.touches[0])
        setMouse(e.touches[0].clientX, e.touches[0].clientY);
    },
    { passive: true }
  );
  hero.addEventListener("mouseleave", () => {
    mouse.active = false;
  });

  let rt: ReturnType<typeof setTimeout>;
  window.addEventListener("resize", () => {
    clearTimeout(rt);
    rt = setTimeout(build, 150);
  });

  if ("IntersectionObserver" in window) {
    new IntersectionObserver(
      (es) => {
        visible = es[0].isIntersecting;
        visible ? start() : stop();
      },
      { threshold: 0 }
    ).observe(hero);
  }

  document.addEventListener("visibilitychange", () => {
    document.hidden ? stop() : visible && start();
  });

  build();
  start();
}
