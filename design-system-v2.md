# Design System v2 — Portfolio

Sistema base para el rediseño del portafolio. Extraído de `/docker`.
Todos los colores en OKLCH. Implementación Tailwind v4 CSS-first
(`@theme` en `src/styles/starwind.css`, sin `tailwind.config`). `global.css`
conserva los tokens legacy del portafolio anterior; v2 no los importa.

## 1. Paleta

| Token          | Valor                                        | Uso                                    |
| -------------- | -------------------------------------------- | -------------------------------------- |
| `--color-ink`        | `oklch(17.30% 0 0)`                          | Fondo base (dark-first), texto en claro |
| `--color-cream`      | `oklch(99.47% 0.004 78)`                     | Superficie clara, texto en oscuro      |
| `--color-soft-ink`   | `color-mix(in oklch, oklch(99.47% 0.004 78) 62%, oklch(17.30% 0 0))` | Texto secundario en claro |
| `--color-line`       | `oklch(99.47% 0.004 78 / 0.09)`              | Bordes sutiles en oscuro               |
| `--color-ember`      | `oklch(80% 0.20 60)`                         | Único naranja base: CTA, activo y acentos |
| `--color-ember-hover`| `oklch(86% 0.16 64)`                         | Único naranja secundario: hover del CTA |
| `--color-ring`       | `var(--color-ember)`                         | Anillo de foco en oscuro (mismo naranja) |

Contrastes verificados: ink↔cream **18.5:1 (AAA)** · ember sobre ink
**8.81:1 (AAA)** · ink sobre ember **8.81:1 (AAA)** ·
ember-hover sobre ink **11.09:1 (AAA)**.

Solo existen dos naranjas: `ember` (base) y `ember-hover` (secundario).
Cualquier otro naranja queda fuera del sistema V2.

Reglas del acento:

1. El acento se reserva para la acción principal, el estado activo y
   metadatos cortos; nunca para párrafos.
2. En oscuro: `ember` base, `ember-hover` para hover. En claro: texto
   siempre con `ink`; `ember` solo en detalles decorativos o bordes.
3. Nunca `ember` sobre `cream` como texto (2.01:1, no pasa AA).

## 2. Tipografía — trío v2

Servidas en local con `astro:experimentalFonts` (ya configuradas en
`astro.config.mjs`). Rango de pesos estrecho (300–500): el sistema habla
en voz baja, el contraste lo pone el tamaño, no el grosor.

| Rol                 | Familia              | Variable                | Pesos   | Uso |
| ------------------- | -------------------- | ----------------------- | ------- | --- |
| Principal (display) | Inter Tight (Docker) | `--font-docker-display` | 300–500 | Titulares y cifras heroicas. `letter-spacing: -0.02em`, `line-height: 1.04`. |
| Secundaria (texto)  | Inter (Docker)       | `--font-docker-body`    | 300–500 | Párrafos, UI y navegación. Recomendada por legibilidad en cuerpo pequeño y coherencia con la principal. |
| Mono (actual)       | Geist Mono           | `--font-mono`           | 400     | Etiquetas, meta (`11px`, `0.12em`, uppercase), código, contadores. Se mantiene la actual. |

Reglas:

1. Tres familias, ni una más. Bebas Neue y Space Grotesk quedan fuera de v2.
2. Display solo en titulares (h1/h2) y cifras destacadas; nunca en cuerpo, botones o navegación.
3. Secundaria para todo texto corrido e interfaz.
4. Mono para metadatos, código, navegación y utilidades.
5. Todos los botones V2 usan `--font-mono`, sin excepciones. El punto de
   entrada es `v2-button.astro` (variantes `primary` y `outline`).

## 3. Implementación Tailwind

```css
@import "tailwindcss";

@theme {
  --color-ink: oklch(17.30% 0 0);
  --color-cream: oklch(99.47% 0.004 78);
  --color-soft-ink: color-mix(in oklch, oklch(99.47% 0.004 78) 62%, oklch(17.30% 0 0));
  --color-line: oklch(99.47% 0.004 78 / 0.09);

  /* Dos únicos naranjas: base del CTA y su hover. */
  --color-ember: oklch(80% 0.20 60);
  --color-ember-hover: oklch(86% 0.16 64);
  --color-ring: var(--color-ember);

  --radius-sm: 0.125rem;
  --radius-md: 0.25rem;
  --radius-lg: 0.375rem;

  --ease-site: cubic-bezier(0.2, 0.7, 0.2, 1);
}

/* display/body son las Docker (trío v2 §2) */
@theme inline {
  --font-display: var(--font-docker-display), system-ui, sans-serif;
  --font-body: var(--font-docker-body), system-ui, sans-serif;
}
```

Utilidades: `bg-ink text-cream` (base), `bg-cream text-ink` (sección clara
opt-in), `text-ember` / `bg-ember` / `border-ember`, `font-display` /
`font-body` / `font-mono`, `ease-site`. Nunca valores arbitrarios de color:
usa solo `ember` y `ember-hover` para naranja.

v2 es dark-first sin clase `.dark`: el claro es opt-in por sección
(igual que `/docker`: hero oscuro + resto claro).

## 4. Animación

Keyframes dentro de `@theme`; retardos escalonados con
`--d` (`animation-delay: var(--d, 0s)`), como la cascada de logos.

```css
@theme {
  --animate-rise: rise 0.9s var(--ease-site) forwards;
  --animate-fade-in: fade-in 0.6s ease-out forwards;

  @keyframes rise {
    from { opacity: 0; transform: translateY(12px); }
    to { opacity: 1; transform: none; }
  }
  @keyframes fade-in {
    from { opacity: 0; }
    to { opacity: 1; }
  }
}

@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after { animation: none !important; transition: none !important; }
}
```

### Entrada del navbar (réplica Docker 1:1)

```css
.dk-header {
  opacity: 0;
  animation: dk-nav-in 0.9s ease 0.5s forwards;
}
@keyframes dk-nav-in {
  to { opacity: 1; }
}
```

Fade puro sin desplazamiento: 0.5s de retardo, 0.9s de duración,
easing `ease`. Con `prefers-reduced-motion`: visible sin animación.
Implementado en `v2-navbar.ts`: el header queda **siempre visible**.
No se oculta ni se traslada al hacer scroll; solo actualiza el porcentaje y
la sección activa. La barra tiene fondo sólido `--color-ink` (sin blur ni
transparencia), también en el drawer móvil.

El hero es `position: sticky; top: 0`: se queda fijo mientras la sección
clara siguiente (fondo sólido, `relative`) se desliza encima. La sección
clara arranca con las esquinas superiores a 48px y `v2-scroll-study.ts`
las lleva a 0 según avanza el scroll (`--v2-lab-radius`), de modo que el
negro del hero se ve en los recortes y se «descurva» al bajar.

El copy del hero se apila en una sola columna: nombre completo en una línea
(`white-space: nowrap` + `clamp()`) y resumen. El bloque se ancla arriba para
no dejar un hueco grande bajo el navbar; el nombre no se parte y el centro
queda ocupado por el texto en lugar de dos columnas separadas.

## 5. Componentes (Astro)

Sin React/CVA: props tipadas + `class:list`. Patrón Base → Variantes →
Tamaños → Estados (`hover:` con token hover, `focus-visible:` con
`outline-ring`, `disabled:` con opacidad, `aria-*` donde aplique).
Reglas de tipos aplicables en §7.

`v2-button.astro` es el CTA reutilizable de V2: renderiza `<a>` si recibe
`href` o `<button>` si no, aplica `.v2-btn` + variante (`primary`/`outline`) y
usa mono siempre. Se usa en el navbar, el menú móvil y los CTAs de sección.

```astro
---
type Variant = "primary" | "outline" | "ghost";
type Size = "sm" | "md" | "lg";

interface Props {
  variant?: Variant;
  size?: Size;
}
const { variant = "primary", size = "md" } = Astro.props;

const BASE = "inline-flex items-center justify-center rounded-md font-body transition-colors ease-site focus-visible:outline-2 focus-visible:outline-ring disabled:pointer-events-none disabled:opacity-50";
const VARIANTS: Record<Variant, string> = {
  primary: "bg-ember text-ink hover:bg-ember-hover",
  outline: "border border-line text-cream hover:border-ember hover:text-ember",
  ghost: "text-cream hover:bg-ember/10 hover:text-ember",
};
const SIZES: Record<Size, string> = {
  sm: "h-9 px-3 text-sm",
  md: "h-10 px-4",
  lg: "h-11 px-8",
};
---
<button class:list={[BASE, VARIANTS[variant], SIZES[size]]}><slot /></button>
```

## 6. Responsive y reglas

- Breakpoints: `md:` (~768px), `lg:` (~1024px). Contenedor:
  `mx-auto w-full max-w-screen-xl px-4 sm:px-6 lg:px-8`.
- Tailwind primero; CSS propio solo para tokens, primitivas y keyframes.
- `size-*` en lugar de `w-* h-*`. Probar cada vista en claro
  (`bg-cream` + `text-ink`) y con `prefers-reduced-motion`.

## 7. TypeScript — reglas y tipos avanzados

Principio (skills `typescript-best-practices` + `typescript-advanced-types`):
lo ilegal no se puede construir; lo externo se valida en la frontera;
de lo demás avisa el compilador. TS estricto, `any` prohibido, sin `.js`.

| Regla | En v2 |
| ----- | ----- |
| Uniones discriminadas | Variantes con `kind` literal (una sola palabra en todo el proyecto). Nada de bolsas de opcionales. |
| Sin `as` | Cada `as` es un crash futuro. Si TS no infiere: falta discriminante, fuente demasiado ancha o frontera sin parsear. |
| Exhaustividad | `const _exhaustive: never = x;` en ramas default: añadir variante sin caso no compila. |
| `satisfies` | Valida config sin ensanchar literales. |
| `unknown` en fronteras | fetch, `JSON.parse`, params. Dentro se confía en los tipos. |
| Sin zod en el repo | Guards verificadores `isX`/`hasX` (un guard que miente es peor que un `as`); no añadir dependencia por un guard. |
| Derivar antes que declarar | `Pick`/`Omit`/`Parameters`/`ReturnType`/`Awaited`/`typeof` antes que una interfaz nueva. |
| Args como objeto | Nada posicional (salvo hot paths como el loop de partículas). |
| Tipo total más simple | `T[]` mientras todo sea total; `NonEmpty<T>` solo donde el `[]` obligue a `!` o throw. |
| Formas y uniones | `interface` para objetos (props), `type` para uniones; inferir, anotar frontera pública; `as const` para literales. |
| Brands | `Delay` verificado con `isDelay`, nunca con `as` (ver ejemplo). Reservado para cuando dos primitivos iguales puedan mezclarse. |
| Dónde vive cada cosa | Tipos en `src/data/types.ts`; cliente en `src/scripts/*.ts`; sin `console.log` final. |
| Uniones de iconos | `TablerTechIcon` y `TablerUiIcon` son uniones de claves de sus mapas raw. `TechIcon` recibe el label humano y resuelve primero el logo `.astro` mono; `IconByName` resuelve UI/social. |

```ts
// Estados: solo existen los válidos; el switch es exhaustivo
type NavState =
  | { kind: "open" }
  | { kind: "closed"; reason: "scroll" | "escape" };

function onNav(s: NavState): void {
  switch (s.kind) {
    case "open":
      return show();
    case "closed":
      return hide(s.reason);
    default: {
      const _exhaustive: never = s;
      void _exhaustive;
    }
  }
}

// Marca verificada en la frontera, nunca con `as`
type Delay = string & { readonly __brand: "Delay" };

function isDelay(v: string): v is Delay {
  return /^\d+(\.\d+)?s$/.test(v);
}

function delay(i: number): Delay {
  const v = `${(i * 0.12).toFixed(2)}s`;
  if (!isDelay(v)) throw new Error(`Invalid delay: ${v}`);
  return v;
}

// Config validada sin perder literales
const SWAP = { gapMin: 1400, gapRange: 2000 } satisfies Record<string, number>;
```

Regla de oro: si un token o variante nuevo no rompe la compilación en
todos sus usos, el tipo está mal escrito.


## 8. Iconografía — Tabler + fallbacks originales

Toda la interfaz usa `@tabler/icons` (MIT). Hay dos capas:

| Capa | Archivo | Render |
| ---- | ------- | ------ |
| UI | `src/data/tabler-ui-icons.ts` | `tabler-ui-icon.astro` / `IconByName` |
| Tech | `src/data/tabler-icons.ts` | `tabler-tech-icon.astro` |
| Marcas sin glifo Tabler | `src/components/icons/tech/*.astro` | `TechIcon` (logo original) |

`TechIcon` es el punto de entrada para cualquier label de tecnología:
primero busca el logo propio en `src/components/icons/tech/`; si no existe,
usa el Tabler real de `techIcons` (`content.ts`).

**Regla del hero:** las tiras de logos de `home.astro` y `v2.astro` usan
`heroLogoLabels`: los glifos de marca reales de Tabler más los logos `.astro`
de OpenCode, Claude Code, Pi y Claude AI. `heroPinnedLabels` fija OpenCode,
Claude Code, Pi y GPT en las primeras celdas, así que siempre se ven al entrar;
las celdas restantes rotan por el resto. El hero se renderiza con `tone="mono"`,
así que esos logos propios salen en blanco. El resto de logos `.astro` se usa
fuera del hero (marquee, chips, proyectos, experiencia, about) sin modificarlos.

| Cobertura | Tecnologías |
| --------- | ----------- |
| Marca Tabler (hero) | Go, Rust, TypeScript, JavaScript, Python, MySQL, React, Node.js, Astro, Vue.js, Tailwind CSS, Svelte, GraphQL, Docker, Git, AWS, Cloudflare, OpenAI/GPT |
| Logo `.astro` original (fuera del hero; OpenCode, Claude Code, Pi y Claude AI también en el hero en mono) | Java, PostgreSQL, Redis, Kubernetes/GKE, Linux, Kafka/Apache Kafka, RabbitMQ, gRPC, CI/CD, FastAPI, Hono, Drizzle ORM, Turso, SQLite, Grafana, GCP/Google Cloud, Cloudflare Workers, Claude/Opus, OpenCode, Claude Code, Pi/Oh-my-pi, AI Harness/Automation |
| Genérico Tabler (fuera del hero) | SQL → `database`, Prometheus → `chart-line`, Open LLMs → `brain`, Cloudflare D1 → logo Cloudflare original |

El tooltip del hero muestra siempre el label del icono activo
(`data-label` actualizado por `hero-logos.ts`), nunca el de una capa oculta.
El tono `mono` del hero usa `brightness(0) invert(1)` sobre Tabler y los
logos `.astro` para que todos queden blancos y con el mismo peso visual.

## 9. Reglas de interacción

- Todos los botones V2 usan mono en cualquier idioma.
- El tooltip de logos es solo hover (`(hover: hover) and (pointer: fine)`),
  no aparece en táctil y se actualiza al mismo tiempo que el crossfade.
- En secciones claras el anillo de foco usa `ink` (el ember brillante no
  contrasta sobre cream).
