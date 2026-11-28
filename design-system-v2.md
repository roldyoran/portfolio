# Design System v2 — Portfolio

Sistema base para el rediseño del portafolio. **Full dark**: no existe modo
claro ni sección clara. Todos los colores en OKLCH. Implementación Tailwind v4
CSS-first (`@theme` en `src/styles/starwind.css`, sin `tailwind.config`).
`global.css` conserva los tokens legacy del portafolio anterior; v2 no los
importa. `docker.css` es el estudio aparte de `/docker` y no forma parte de v2.

## 1. Paleta — full dark

Tres escalones de superficie y un único acento naranja. Nada de azules: los
azules Docker solo viven en el estudio `/docker`.

| Token          | Valor                                        | Uso                                    |
| -------------- | -------------------------------------------- | -------------------------------------- |
| `--color-ink`        | `oklch(11.5% 0.003 55)` · `#060504`      | Fondo base de la página y del hero |
| `--color-carbon`     | `oklch(16.5% 0.004 55)` · `#100e0d`      | Banda elevada: experiencia y cards |
| `--color-ash`        | `oklch(21.5% 0.005 55)` · `#1b1917`      | Superficies sobre carbon (tiles, hover denso) |
| `--color-cream`      | `oklch(98.4% 0.008 80)` · `#fdf9f4`      | Texto principal y trazos |
| `--color-soft-ink`   | `color-mix(in oklch, cream 66%, ink)`    | Texto secundario |
| `--color-line`       | `oklch(98.4% 0.008 80 / 0.1)`            | Bordes y separadores |
| `--color-ember`      | `oklch(72% 0.19 47)` · `#ff761c`         | Único acento: CTA, activo y foco |
| `--color-ember-hover`| `oklch(78% 0.16 55)` · `#ff9845`         | Hover del CTA |
| `--color-ring`       | `var(--color-ember)`                     | Anillo de foco |

Contrastes verificados (WCAG 2.2):

| Combinación | Ratio | Nivel |
| ----------- | ----- | ----- |
| cream sobre ink | **19.5:1** | AAA |
| cream sobre carbon | **18.4:1** | AAA |
| soft-ink sobre ink | **7.30:1** | AAA |
| ember sobre ink | **7.68:1** | AAA (texto normal) |
| ember sobre carbon | **7.27:1** | AAA (texto normal) |
| ember sobre ash | **6.61:1** | AA texto normal / AAA grande |
| ink sobre ember | **7.68:1** | AAA |
| ember-hover sobre ink | **9.74:1** | AAA |
| ink sobre ember-hover | **9.74:1** | AAA |

Solo existen dos naranjas: `ember` (base) y `ember-hover` (hover). Cualquier
otro naranja queda fuera del sistema V2. El texto dentro de un botón naranja
siempre es `ink`; nunca `cream`.

Reglas del acento:

1. El acento se reserva para la acción principal, el estado activo, el foco y
   metadatos cortos; nunca para párrafos.
2. `ember` es base y `ember-hover` el hover; no se inventan tonos intermedios.
3. Texto sobre `ember` o `ember-hover`: siempre `ink` (7.68:1 / 9.74:1).
   `cream` sobre naranja queda prohibido (~2.7:1).
4. Metadatos: `cream/60` o superior. El suelo del sistema es `cream/40`,
   que sobre ink/carbon sigue pasando AA por el fondo tan oscuro.
5. Los logos de marca (`TechIcon`) conservan su color propio: son contenido,
   no tokens del sistema.

### Escalones de superficie

El ritmo de scroll se lee por contraste de superficie, no por bordes:

| Sección | Superficie | Nota |
| ------- | ---------- | ---- |
| Hero | `ink` | Base fija (sticky). |
| Experiencia | `carbon` | Un escalón por encima del hero; el cambio se nota al hacer scroll. `pt-24 md:pt-32` separa el título del borde superior; el header cierra con `pb-6` y la lista arranca con `mt-2 md:mt-4`, así el primer rol queda pegado al titular. |
| Resto de secciones | `ink` | Vuelve a la base; las cards usan `carbon` y los tiles `ash`. |

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
   entrada es el `Button` de Starwind (`variant="primary"` = ember + ink,
   `variant="outline"`); no hay componente de botón propio.

## 3. Implementación Tailwind

```css
@import "tailwindcss";

@theme {
  /* Tres escalones de superficie + un único acento naranja. */
  --color-ink: oklch(11.5% 0.003 55);
  --color-carbon: oklch(16.5% 0.004 55);
  --color-ash: oklch(21.5% 0.005 55);
  --color-cream: oklch(98.4% 0.008 80);
  --color-soft-ink: color-mix(in oklch, oklch(98.4% 0.008 80) 66%, oklch(11.5% 0.003 55));
  --color-line: oklch(98.4% 0.008 80 / 0.1);

  /* Dos únicos naranjas: base del CTA y su hover. */
  --color-ember: oklch(72% 0.19 47);
  --color-ember-hover: oklch(78% 0.16 55);
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

Utilidades: `bg-ink text-cream` (base), `bg-carbon` (banda de experiencia y
cards), `bg-ash` (tiles sobre carbon), `text-ember` / `bg-ember` /
`border-ember`, `font-display` / `font-body` / `font-mono`, `ease-site`.
Nunca valores arbitrarios de color: usa solo `ember` y `ember-hover` para
naranja y `ink` para el texto sobre naranja.

v2 es **full dark** (`<html class="dark">`): no hay modo claro ni secciones
claras. El contraste entre secciones se logra subiendo un escalón de
superficie (`ink` → `carbon` → `ink`), no invirtiendo la paleta.

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
la sección activa.

La pill es sólida (sin blur ni transparencia) y su fondo sigue el tono de la
sección que tiene detrás: el script detecta el primer fondo opaco de la
sección y escribe `--v2-nav-bg` (`ink` o `carbon`). No hay tema claro: al
ser full dark no existe el modo `data-section-theme` ni inversión a cream.
El CTA principal del navbar es `ember` con texto `ink` (7.27:1) y pasa a
`ember-hover` en hover, con un anillo crema animado en el perímetro.

El hero es `position: sticky; top: 0`: se queda fijo mientras la banda
`carbon` siguiente (fondo sólido, `relative`) se desliza encima. La banda
arranca con las esquinas superiores a 48px y `v2-experience.ts` las lleva a 0
según avanza el scroll (`--v2-lab-radius`), de modo que el tono `ink` del
hero se ve en los recortes y se «descurva» al bajar. Esa curva es la que hace
legible el pequeño salto de superficie al entrar en experiencia.

El copy del hero se apila en una sola columna: nombre completo en una línea
(`white-space: nowrap` + `clamp()`) y resumen. El bloque se ancla arriba para
no dejar un hueco grande bajo el navbar; el nombre no se parte y el centro
queda ocupado por el texto en lugar de dos columnas separadas.

## 5. Componentes (Astro)

Todo lo que tenga comportamiento se construye con Starwind
(`@/components/starwind/*`): `Button`, `Sheet`, `Tooltip`, `NavigationMenu`,
`Separator`… La regla Starwind-first aplica también a los CTAs: no existe
`v2-button.astro`. Para un CTA:

```astro
<Button href="#contacto" variant="primary" size="sm" class="font-mono">
  Contáctame
</Button>
```

`variant="primary"` resuelve a `--primary` (ember) con
`--primary-foreground` (ink), y `variant="outline"` usa el borde `--input`
sobre el fondo oscuro. Lo único propio de V2 es el envoltorio
`v2-ring-cta` (anillo cónico animado) y el `font-mono` de los botones.

Los componentes propios se reservan a lo que Starwind no cubre (conveyor de
logos, timeline editorial, estudio de iconos). El resto de reglas de
tipado aplican en §7.

## 6. Responsive y reglas

- Breakpoints: `md:` (~768px), `lg:` (~1024px). Contenedor:
  `mx-auto w-full max-w-screen-xl px-4 sm:px-6 lg:px-8`.
- Tailwind primero; CSS propio solo para tokens, primitivas y keyframes.
- `size-*` en lugar de `w-* h-*`. Probar cada vista con `prefers-reduced-motion`
  y en los tres escalones de superficie (ink, carbon, ash).

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
- El anillo de foco es siempre `ember` (`--color-ring`): 7.68:1 sobre ink y
  7.27:1 sobre carbon. No hay superficies claras donde haya que invertirlo.
- La navbar nunca cambia a un tema claro; solo sincroniza su fondo con el
  escalón de superficie de la sección que tiene detrás.
