# AGENTS

## Project Structure

```
src/
├── components/          # UI (kebab-case .astro, no inline scripts)
│   ├── home.astro       # Single homepage body: sections + GitHub fetch + Motion script
│   ├── icons/           # Social, Tabler UI/tech wrappers + IconByName/TechIcon
│   │   └── tech/        # Original .astro brand fallbacks (used outside the hero)
│   ├── about.astro
│   ├── button-group.astro
│   ├── contact.astro
│   ├── experience.astro
│   ├── footer.astro
│   ├── hero.astro
│   ├── language-switcher.astro
│   ├── marquee.astro
│   ├── mobile-nav.astro
│   ├── projects.astro
│   ├── navbar.astro
│   ├── top-bar.astro
│   ├── v2-hero.astro    # V2 sticky hero (Docker geometry + Tabler logos)
│   ├── v2-navbar.astro  # V2 glass navbar + mobile drawer
│   └── v2-scroll-study.astro # Temporary fake section for scroll tests
├── data/                # Portfolio content (single module) + shared types
│   ├── content.ts       # config, experience, projects, skills, tech labels + Tabler map
│   ├── icon-map.ts      # Bento UI icon names + AI monogram fallback
│   ├── tabler-icons.ts  # Raw Tabler tech SVG imports + TablerTechIcon union
│   ├── tabler-ui-icons.ts # Raw Tabler UI SVG imports + TablerUiIcon union
│   └── types.ts         # TypeScript interfaces for content + components
├── i18n/
│   ├── config.ts        # Lang keys, URL helpers
│   └── ui.ts            # UI strings + useTranslations(lang)
├── layouts/
│   ├── layout.astro     # HTML shell, meta, hreflang, global section scroll CSS
│   ├── docker-layout.astro
│   └── v2-layout.astro  # V2 shell: favicon, noindex, fonts, scroll margins
├── lib/
│   └── get-github-stats.ts
├── pages/               # Thin routes only
│   ├── index.astro      # English (/) → Layout + <Home lang="en" />
│   ├── v2.astro         # V2 draft: navbar + hero + scroll-study
│   ├── docker.astro     # Docker design study
│   └── es/
│       └── index.astro  # Spanish (/es/) → Layout + <Home lang="es" />
├── scripts/             # All client-side TypeScript (no inline scripts in .astro)
│   ├── copy-email.ts    # Clipboard copy for email (commented out, reserved)
│   ├── download-cv.ts   # CV download with blob fetch fallback
│   ├── hero-motion.ts   # Hero typewriter, stats counter, staggered reveal
│   ├── home-motion.ts   # IntersectionObserver reveal animations
│   ├── marquee.ts       # Infinite marquee scroll animation
│   ├── mobile-nav.ts    # Mobile menu toggle, close on link/Escape
│   ├── navbar.ts        # Scroll percentage counter, active section highlight
│   ├── hero-logos.ts    # Tech-logo crossfade + active tooltip label
│   ├── v2-navbar.ts     # V2 nav: scroll %, active section, always-visible header, drawer
│   ├── v2-hero.ts       # V2 particle intro anchored to the hero art zone
│   ├── v2-scroll-study.ts # Reveal-on-scroll + corner radius animation
│   └── top-bar.ts       # Live UTC clock
├── styles/
│   ├── global.css       # Legacy Tailwind v4 tokens + global CSS layers
│   ├── docker.css       # Namespaced /docker study styles
│   └── v2.css           # V2 design system tokens + navbar/hero/lab primitives
└── assets/
    ├── background.svg
    └── astro.svg
```

## Language conventions

- **TypeScript only**: All scripts, modules, and logic must be written in TypeScript (`.ts` or `.astro` files).
- **No JavaScript**: Plain JavaScript (`.js`) files are not allowed. Never create `.js` files or use `any` types unless absolutely unavoidable.

## Naming conventions

- All component files must use **kebab-case** (e.g. `marquee.astro`, `button-group.astro`).
- All icon files under `src/components/icons/` must use **kebab-case** (e.g. `tabler-tech-icon.astro`, `google-mail.astro`). Prefer Tabler for UI and tech icons. The `.astro` files in `src/components/icons/tech/` are the original brand fallbacks for logos Tabler does not ship; they are rendered unmodified outside the hero.
- Never use PascalCase, camelCase, or uppercase letters in file names.
- Imports must match the kebab-case file names exactly.

## Quick reference (important points)

- Do not run a full build unless the site owner explicitly asks you to. Development work should be done against the dev server.
- Import alias: use `@/` for imports (e.g. `import Layout from "@/layouts/layout.astro"`).
- Stack: Astro v7, Tailwind CSS v4 (V2 tokens live in `src/styles/v2.css`; legacy tokens in `src/styles/global.css`), Motion (client script under `src/scripts/home-motion.ts` and used from `home.astro`).
- Dev / Build / Preview (use Bun to run scripts):
  - `bun run dev` (http://localhost:4321)
  - `bun run build`
  - `bun run preview`
  Note: package.json scripts are standard Astro scripts ("dev": "astro dev", "build": "astro build", "preview": "astro preview"). Bun can run these npm scripts. The repository's `packageManager` field may still mention pnpm — that's informational and can be updated if you want to standardize on Bun.
- Node: project requires Node >= 22.12.0 (see `package.json` engines).
- Tailwind and styling:
  - There is intentionally no `tailwind.config.*` file in this project: the design tokens and theme are declared inside CSS using `@theme` and custom layers. V2 uses `src/styles/v2.css`; the legacy site uses `src/styles/global.css`.
  - Tailwind utilities should take priority over custom CSS for most styling. Use Tailwind utility classes for layout/spacing/typography/responsive behavior. Reserve custom CSS for global tokens, component primitives, and exceptional cases (complex selectors, theme variables, keyframes that are not provided by Tailwind).
  - If you add a `tailwind.config.*` later, ensure `content` globs include `.astro`, `.ts`, `.tsx`, `.js`, and templates under `src/` so Tailwind can scan and generate utilities.
- Editing content:
  - Edit `src/data/content.ts` for site copy: site config, experience, projects, skills, tech icon maps, marquee labels, and any derived lists. Types are in `src/data/types.ts` (only edit types if needed).
- GitHub stats for the hero section:
  - `getGithubStats()` lives in `src/lib/get-github-stats.ts` and is called from `home.astro` at build time to produce repo/star/follower counters for the hero.
- Marquee & tech icons:
  - `TechIcon` is the single entry point for tech labels. It resolves to the original `.astro` logo first (`src/components/icons/tech/`) and falls back to a real Tabler icon from `techIcons` in `content.ts`. Raw Tabler tech SVGs live in `src/data/tabler-icons.ts` and render through `tabler-tech-icon.astro`.
  - The hero logo strips (`home.astro` and `v2.astro`) use `heroLogoLabels`: real Tabler brand glyphs plus the `.astro` OpenCode, Pi and Claude AI logos, all rendered with `tone="mono"`. Outside the hero, `TechIcon` can render the original `.astro` brand fallbacks.
  - `techIcons` contains only real Tabler glyphs (brand or neutral generic where no brand exists: SQL, Prometheus, Open LLMs). `techLabels` is the full ordered list of tech labels.
  - Tabler has brand glyphs for Go, Rust, TypeScript, JavaScript, Python, MySQL, React, Node.js, Astro, Vue, Tailwind, Svelte, GraphQL, Docker, Git, AWS, Cloudflare and OpenAI. Java, PostgreSQL, Redis, Kubernetes, Linux, Kafka, RabbitMQ, gRPC, CI/CD, FastAPI, Hono, Drizzle, Turso, SQLite, Grafana, GCP, Cloudflare Workers, Claude/Opus, OpenCode, Pi, Oh-my-pi and AI Harness use the original `.astro` logos outside the hero.
  - The hero logo tooltip is updated by `hero-logos.ts` from the active logo's `data-hero-logo-label`, so it never reads a hidden layer. It is hover-only (`(hover: hover) and (pointer: fine)`).
  - The marquee animation is handled entirely by Motion in `src/scripts/marquee.ts`. The `<style>` block in `marquee.astro` only contains `width: max-content` and `noscript` fallbacks — no CSS keyframes or animations.
- SVG icons & UI icons:
  - All icon files under `src/components/icons/` use kebab-case. UI icons use Tabler raw SVGs in `src/data/tabler-ui-icons.ts` via `tabler-ui-icon.astro` or `IconByName`. Tech icons use `TechIcon`; social icons stay in `src/components/icons/`. There is no `@lucide/astro` dependency.
- Components & client scripts:
  - All component files use kebab-case naming. All client-side logic lives in `src/scripts/*.ts`. Components import them like `<script>import "@/scripts/home-motion"</script>` inside `.astro` files. There should be no inline script tags with raw JavaScript in `.astro` files.
- Layout & sections:
  - The site uses a single layout at `src/layouts/layout.astro` that sets language attributes (`lang`), description, and `hreflang` alternates. Home pages are at `src/pages/index.astro` and `src/pages/es/index.astro` for English and Spanish.
- Breakpoints and responsive behavior:
  - Breakpoints used across the project: `md:` (~768px) and `lg:` (~1024px). Keep consistent spacing and utility usage.
- Internationalization (i18n):
  - Two locales are supported: English (`/`) and Spanish (`/es/`). UI strings and translation helpers are in `src/i18n/config.ts` and `src/i18n/ui.ts`. When adding copy, maintain `*Es` fields for long-form Spanish variants where used.
- Motion & accessibility:
  - Motion scripts and reveal animations live under `src/scripts/` (hero-motion, home-motion, marquee). Respect `prefers-reduced-motion` — where the project already removes animations when reduced-motion is requested by the user.
- CTA rule: every button/link whose copy is «Contáctame» / «Contact Me» must use `font-mono` (V2 has `.v2-btn--contact`; `ButtonGroup` is already mono).
- Projects listing & icons:
  - Project cards are rendered in `src/components/projects.astro`. Tech stacks are shown as `.chip` elements and project action buttons live in `ButtonGroup`.

## Developer notes & best practices

- Prefer Tailwind utilities; use the project's CSS (`src/styles/global.css`) only for global tokens, fonts, and truly global layout primitives.
- Restart the dev server after changing critical CSS or when adding new Tailwind utility patterns so the build system picks up changes.
- When you modify content.ts, those changes will be reflected on the next build/dev reload — no extra config needed.
- When adjusting animations or class names, check DevTools to ensure the expected Tailwind class names are present and that the CSS rules are generated. If an animation utility is not available, add a small component-level CSS rule or add a keyframe in `global.css`.
- Keep `.astro` components thin: server-side rendering for markup and minimal client-side hydration only when necessary. Use Astro islands patterns where you need client interactivity.

## Useful paths

- Content & types: `src/data/content.ts`, `src/data/types.ts`
- Styles & tokens: `src/styles/v2.css` (V2), `src/styles/global.css` (legacy)
- Scripts (client): `src/scripts/*.ts`
- Components: `src/components/*.astro` (V2: `v2-*.astro`; icons under `src/components/icons/`)
- GitHub stats helper: `src/lib/get-github-stats.ts`
- Pages / locales: `src/pages/index.astro`, `src/pages/es/index.astro`, `src/pages/v2.astro`
- Dev scripts (package.json): `dev`, `build`, `preview` → run them with `bun dev`, `bun build`, `bun preview` or `bun run dev` etc.
