# Design System v2 — Portfolio

Sistema base para el rediseño del portafolio. Extraído de `/docker`.
Todos los colores en OKLCH. Implementación Tailwind v4 CSS-first
(`@theme` en `src/styles/global.css`, sin `tailwind.config`).

## 1. Paleta

| Token          | Valor                                        | Uso                                    |
| -------------- | -------------------------------------------- | -------------------------------------- |
| `--v2-ink`     | `oklch(17.30% 0 0)`                          | Fondo base (dark-first), texto en claro |
| `--v2-cream`   | `oklch(99.47% 0.004 78)`                     | Superficie clara, texto en oscuro      |
| `--v2-soft`    | `color-mix(in oklch, oklch(99.47% 0.004 78) 62%, oklch(17.30% 0 0))` | Texto secundario en claro |
| `--v2-line`    | `oklch(99.47% 0.004 78 / 0.09)`              | Bordes sutiles en oscuro               |
| `--v2-ember`   | `oklch(65.85% 0.167 44)`                     | Acento principal en oscuro             |
| `--v2-ember-hover` | `oklch(71.08% 0.154 46)`                 | Hover del acento en oscuro             |
| `--v2-ember-deep`  | `oklch(55.64% 0.139 46)`                | Acento como texto en claro             |
| `--v2-ring`    | `oklch(65.85% 0.167 44)`                     | Anillo de foco visible                 |

Contrastes verificados: ink↔cream **18.5:1 (AAA)** · ember sobre ink
**5.70:1 (AA)** · ember-hover sobre ink **7.03:1 (AA)** ·
ember-deep sobre cream **4.92:1 (AA)**.

Reglas del acento:

1. Un solo elemento ember por viewport.
2. En oscuro: `ember` base, `ember-hover` para hover. En claro: texto
   siempre con `ember-deep`; `ember` solo en detalles grandes o decorativos.
3. Nunca `ember` sobre `cream` como texto (3.29:1, no pasa AA).

## 2. Tipografía — trío v2

Servidas en local con `astro:experimentalFonts` (ya configuradas en
`astro.config.mjs`). Rango de pesos estrecho (300–500): el sistema habla
en voz baja, el contraste lo pone el tamaño, no el grosor.

| Rol                 | Familia              | Variable                | Pesos   | Uso |
| ------------------- | -------------------- | ----------------------- | ------- | --- |
| Principal (display) | Inter Tight (Docker) | `--font-docker-display` | 300–500 | Titulares y cifras heroicas. `letter-spacing: -0.02em`, `line-height: 1.04`. |
| Secundaria (texto)  | Inter (Docker)       | `--font-docker-body`    | 300–500 | Párrafos, UI, navegación, botones. Recomendada por legibilidad en cuerpo pequeño y coherencia con la principal. |
| Mono (actual)       | Geist Mono           | `--font-mono`           | 400     | Etiquetas, meta (`11px`, `0.12em`, uppercase), código, contadores. Se mantiene la actual. |

Reglas:

1. Tres familias, ni una más. Bebas Neue y Space Grotesk quedan fuera de v2.
2. Display solo en titulares (h1/h2) y cifras destacadas; nunca en cuerpo, botones o navegación.
3. Secundaria para todo texto corrido e interfaz.
4. Mono para metadatos y código; en navegación se permite (estilo actual del portafolio).

## 3. Implementación Tailwind

```css
@import "tailwindcss";

@theme {
  --color-ink: oklch(17.30% 0 0);
  --color-cream: oklch(99.47% 0.004 78);
  --color-soft-ink: color-mix(in oklch, oklch(99.47% 0.004 78) 62%, oklch(17.30% 0 0));
  --color-line: oklch(99.47% 0.004 78 / 0.09);

  --color-ember: oklch(65.85% 0.167 44);
  --color-ember-hover: oklch(71.08% 0.154 46);
  --color-ember-deep: oklch(55.64% 0.139 46);
  --color-ember-soft: color-mix(in oklch, oklch(65.85% 0.167 44) 12%, transparent);

  --color-ring: oklch(65.85% 0.167 44);

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
opt-in), `text-ember` / `bg-ember` / `border-ember`, `text-ember-deep`,
`font-display` / `font-body` / `font-mono`, `ease-site`. Nunca valores
arbitrarios de color.

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
Comportamiento observado (no implementado aún): el header se oculta al
bajar scroll (más de 120px) y reaparece al subir o cerca del top.

## 5. Componentes (Astro)

Sin React/CVA: props tipadas + `class:list`. Patrón Base → Variantes →
Tamaños → Estados (`hover:` con token hover, `focus-visible:` con
`outline-ring`, `disabled:` con opacidad, `aria-*` donde aplique).
Reglas de tipos aplicables en §7.

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
  ghost: "text-cream hover:bg-ember-soft hover:text-ember",
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
  (`bg-cream` + `text-ember-deep`) y con `prefers-reduced-motion`.

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
