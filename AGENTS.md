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
│   ├── starwind/        # Starwind UI components (PascalCase, CLI-generated)
│   └── v2/              # All V2 UI lives here (no flat v2-* files at components root)
│       ├── hero.astro   # V2 sticky hero (one-line name, summary, ordered logos)
│       ├── hero-logos.astro # Ordered logo conveyor + Starwind Tooltip labels
│       ├── navbar.astro # V2 navbar: NavigationMenu + Sheet drawer + Button CTAs
│       ├── nav-menu.astro # Shared Starwind NavigationMenu (desktop / sheet)
│       ├── scroll-study.astro # Temporary fake section for scroll tests
│       ├── icon-library.astro # Temporary icon comparison study
│       └── language-switcher.astro
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
│   ├── hero-logos.ts    # Legacy home hero: random crossfade + tooltip label
│   ├── v2/              # All V2 client scripts live here
│   │   ├── hero.ts      # Particle intro anchored to the hero art zone
│   │   ├── hero-logos.ts # Ordered conveyor: one cell per tick, no duplicate labels
│   │   ├── navbar.ts    # Scroll % + active section (drawer state lives in Starwind Sheet)
│   │   └── scroll-study.ts # Reveal-on-scroll + corner radius animation
│   └── top-bar.ts       # Live UTC clock
├── styles/
│   ├── global.css       # Legacy Tailwind v4 tokens + global CSS layers
│   ├── docker.css       # Namespaced /docker study styles
│   └── starwind.css     # V2 + Starwind: única hoja de estilos de v2 (tokens, primitivas, componentes)
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
- **Starwind exception**: everything under `src/components/starwind/` is CLI-generated and keeps its PascalCase names (`Button.astro`, `SheetContent.astro`, `variants.ts`). Do not rename these files or their imports; the Starwind CLI tracks them in `starwind.config.json`.

## Quick reference (important points)

- Do not run a full build unless the site owner explicitly asks you to. Development work should be done against the dev server.
- Import alias: use `@/` for imports (e.g. `import Layout from "@/layouts/layout.astro"`).
- Stack: Astro v7, Tailwind CSS v4 (V2 tokens live in `src/styles/starwind.css`; legacy tokens in `src/styles/global.css`), Starwind UI v3 (generated components in `src/components/starwind/`), Motion (client script under `src/scripts/home-motion.ts` and used from `home.astro`).
- Dev / Build / Preview (use Bun to run scripts):
  - `bun run dev` (http://localhost:4321)
  - `bun run build`
  - `bun run preview`
  Note: package.json scripts are standard Astro scripts ("dev": "astro dev", "build": "astro build", "preview": "astro preview"). Bun can run these npm scripts. The repository's `packageManager` field may still mention pnpm — that's informational and can be updated if you want to standardize on Bun.
- Node: project requires Node >= 22.12.0 (see `package.json` engines).
- Tailwind and styling:
  - V2 orange rule: only `--color-ember` (base CTA/active) and `--color-ember-hover` (CTA hover) are allowed. Use `ink` for text on cream; do not add another orange token.
  - There is intentionally no `tailwind.config.*` file in this project: the design tokens and theme are declared inside CSS using `@theme` and custom layers. V2 uses a single stylesheet, `src/styles/starwind.css` (design-system tokens + Starwind tokens + v2 primitives); the legacy site uses `src/styles/global.css`. There is no `v2.css` anymore.
  - Tailwind utilities should take priority over custom CSS for most styling. Use Tailwind utility classes for layout/spacing/typography/responsive behavior. Reserve custom CSS for global tokens, component primitives, and exceptional cases (complex selectors, theme variables, keyframes that are not provided by Tailwind).
  - If you add a `tailwind.config.*` later, ensure `content` globs include `.astro`, `.ts`, `.tsx`, `.js`, and templates under `src/` so Tailwind can scan and generate utilities.
- Editing content:
  - Edit `src/data/content.ts` for site copy: site config, experience, projects, skills, tech icon maps, marquee labels, and any derived lists. Types are in `src/data/types.ts` (only edit types if needed).
- GitHub stats for the hero section:
  - `getGithubStats()` lives in `src/lib/get-github-stats.ts` and is called from `home.astro` at build time to produce repo/star/follower counters for the hero.
- Marquee & tech icons:
  - `TechIcon` is the single entry point for tech labels. It resolves to the original `.astro` logo first (`src/components/icons/tech/`) and falls back to a real Tabler icon from `techIcons` in `content.ts`. Raw Tabler tech SVGs live in `src/data/tabler-icons.ts` and render through `tabler-tech-icon.astro`.
  - The hero logo strips (`home.astro` and `v2.astro`) use `heroLogoLabels`: real Tabler brand glyphs plus the `.astro` OpenCode, Claude Code, Pi and Claude AI logos, all rendered with `tone="mono"`. `heroPinnedLabels` pins OpenCode, Claude Code, Pi and GPT in the first cells; the remaining cells cycle through the rest. Outside the hero, `TechIcon` can render the original `.astro` brand fallbacks.
  - `techIcons` contains only real Tabler glyphs (brand or neutral generic where no brand exists: SQL, Prometheus, Open LLMs). `techLabels` is the full ordered list of tech labels.
  - Tabler has brand glyphs for Go, Rust, TypeScript, JavaScript, Python, MySQL, React, Node.js, Astro, Vue, Tailwind, Svelte, GraphQL, Docker, Git, GitHub Copilot, AWS, Cloudflare and OpenAI. Java, PostgreSQL, Redis, Kubernetes, Linux, Kafka, RabbitMQ, gRPC, CI/CD, FastAPI, Hono, Drizzle, Turso, SQLite, Grafana, GCP, Cloudflare Workers, Claude/Opus, OpenCode, Pi, Oh-my-pi and AI Harness use the original `.astro` logos outside the hero.
  - The hero logo tooltip is updated by `hero-logos.ts` from the active logo's `data-hero-logo-label`, so it never reads a hidden layer. It is hover-only (`(hover: hover) and (pointer: fine)`).
  - The marquee animation is handled entirely by Motion in `src/scripts/marquee.ts`. The `<style>` block in `marquee.astro` only contains `width: max-content` and `noscript` fallbacks — no CSS keyframes or animations.
- SVG icons & UI icons:
  - All icon files under `src/components/icons/` use kebab-case. UI icons use Tabler raw SVGs in `src/data/tabler-ui-icons.ts` via `tabler-ui-icon.astro` or `IconByName`. Tech icons use `TechIcon`; social icons stay in `src/components/icons/`. There is no `@lucide/astro` dependency.
- Components & client scripts:
  - All hand-written component files use kebab-case naming. All client-side logic lives in `src/scripts/*.ts`. Components import them like `<script>import "@/scripts/home-motion"</script>` inside `.astro` files. There should be no inline script tags with raw JavaScript in `.astro` files.
  - Starwind components under `src/components/starwind/` are the exception: CLI-generated PascalCase files whose behavior comes from `@starwind-ui/astro` primitives. Do not restructure them; tune classes in `variants.ts` or override tokens in `src/styles/starwind.css`.
- Layout & sections:
  - The legacy site uses `src/layouts/layout.astro` (language attributes, description, `hreflang` alternates) with `src/styles/global.css`. The V2 draft uses `src/layouts/v2-layout.astro`, which imports the single v2 stylesheet `src/styles/starwind.css` and sets `<html class="dark">`. Home pages are at `src/pages/index.astro` and `src/pages/es/index.astro`; the v2 draft is `src/pages/v2.astro`.
- Breakpoints and responsive behavior:
  - Breakpoints used across the project: `md:` (~768px) and `lg:` (~1024px). Keep consistent spacing and utility usage.
- Internationalization (i18n):
  - Two locales are supported: English (`/`) and Spanish (`/es/`). UI strings and translation helpers are in `src/i18n/config.ts` and `src/i18n/ui.ts`. When adding copy, maintain `*Es` fields for long-form Spanish variants where used.
- Motion & accessibility:
  - Motion scripts and reveal animations live under `src/scripts/` (hero-motion, home-motion, marquee). Respect `prefers-reduced-motion` — where the project already removes animations when reduced-motion is requested by the user.
- CTA rule: V2 CTAs use Starwind `Button` from `@/components/starwind/button` with `variant="primary"` (ember surface, ink text) or `variant="outline"`, plus `class="font-mono"` to keep the V2 mono treatment. There is no custom `v2-button` anymore. `ButtonGroup` is legacy and already mono.
- Starwind UI (V2):
  - **Starwind-first rule**: build every UI piece with Starwind components. Only create a custom component when Starwind has no concrete equivalent, and document the gap next to it. Do not reimplement buttons, menus, dialogs, sheets, tooltips, inputs, cards, etc. by hand. Brand/tech logos (`TechIcon`) are content, not UI controls, so they stay as SVG components; wrap them with Starwind primitives (e.g. `Tooltip`) when they need behavior.
  - Install/add components with the Starwind CLI from the repo root: `bunx starwind@latest add <name>` (e.g. `bunx starwind@latest add dialog`). Check for updates with `bunx starwind@latest update --all --dry-run`; remove with `bunx starwind@latest remove <name>`.
  - Navbar composition (reference for future work): `src/components/v2/navbar.astro` is only a layout shell because Starwind has no site-navbar block. Its interactive parts are Starwind components: `NavigationMenu` for desktop links, `Sheet` + `SheetTrigger`/`SheetContent` for the mobile drawer, `Button` for CTAs and icon actions, `Tooltip` for the GitHub action, and `Separator` inside the sheet. `src/components/v2/nav-menu.astro` owns the shared `NavigationMenu` (horizontal desktop / vertical sheet); `src/scripts/v2/navbar.ts` only handles scroll % and the active section (`data-active` + `aria-current="page"`).
  - Hero logo conveyor (`src/components/v2/hero-logos.astro` + `src/scripts/v2/hero-logos.ts`): exactly one cell changes per tick, in source-list order, wrapping from last to first. The same label may never be visible in two cells at once (labels are deduped and the script checks the other cells before assigning). Hover labels use Starwind `Tooltip` with `disablePortal` so the script can update the text as the icon changes. The legacy home strip still uses `src/components/hero-logos.astro` + `src/scripts/hero-logos.ts` (random crossfade, pinned cells) — do not reuse it for V2.
  - V2 organization rule: all V2 components belong under `src/components/v2/` and all V2 client scripts under `src/scripts/v2/`. Do not add flat `v2-*.astro` or `v2-*.ts` files at the root of those folders; group by feature inside the `v2/` subfolders.
  - Config lives in `starwind.config.json` (root): framework `astro`, `componentDir` `src/components/starwind`, `utilsDir` `src/lib/utils`, CSS `src/styles/starwind.css`.
  - Installed components: `accordion`, `badge`, `button`, `card`, `input`, `label`, `navigation-menu`, `separator`, `sheet`, `textarea`, `toast`, `tooltip`. Import from `@/components/starwind/<name>`.
  - `SheetContent` has a `closeLabel` prop (local customization) so the close button's screen-reader text can be localized; pass it from the page/component using the sheet.
  - **Single stylesheet**: `src/styles/starwind.css` is the only v2 stylesheet (Starwind tokens + v2 design system + v2 navbar/lab primitives merged). It is imported only by `src/layouts/v2-layout.astro`; legacy pages use `global.css`. Do not create another v2 CSS file.
  - `v2-layout.astro` sets `<html class="dark">`: v2 is dark-only and this activates Starwind's `dark:` variants.
  - Token mapping in `src/styles/starwind.css` (do not reintroduce Starwind's blue theme):
    - `--background` → `--color-ink`, `--foreground` → `--color-cream`
    - `--primary` → `--color-ember`, `--primary-foreground` → `--color-ink`, `--primary-accent` → `--color-ember-hover`
    - `--card` / `--popover` / `--secondary` / `--muted` → neutral surfaces derived with `color-mix` from cream/ink; `--accent` → `--color-line`
    - `--muted-foreground` → `--color-soft-ink`
    - `--border` / `--input` → `--color-line`, `--outline` → `--color-ember`
    - `--radius` → `0.375rem` (matches v2 sm/md/lg scale)
    - `--font-sans` → `--font-body`, `--font-heading` → `--font-display`
    - `--info`, `--success`, `--warning`, `--error` keep Starwind defaults (outside the v2 palette; only for semantic states).
  - `Toast` needs the `<Toaster />` component mounted once (v2 layout or the page) before firing toasts.
  - Generated `variants.ts` files hold the Tailwind classes; edit them to tune a component, but keep using the mapped semantic tokens.
  - `.vscode/starwind.code-snippets` is generated by the CLI.
- Projects listing & icons:
  - Project cards are rendered in `src/components/projects.astro`. Tech stacks are shown as `.chip` elements and project action buttons live in `ButtonGroup`.

## Developer notes & best practices

- Prefer Tailwind utilities; use the project's CSS (`src/styles/starwind.css` for v2, `src/styles/global.css` for legacy) only for global tokens, fonts, Starwind theme mapping, and truly global layout primitives.
- Restart the dev server after changing critical CSS or when adding new Tailwind utility patterns so the build system picks up changes.
- When you modify content.ts, those changes will be reflected on the next build/dev reload — no extra config needed.
- When adjusting animations or class names, check DevTools to ensure the expected Tailwind class names are present and that the CSS rules are generated. If an animation utility is not available, add a small component-level CSS rule or add a keyframe in `global.css`.
- Keep `.astro` components thin: server-side rendering for markup and minimal client-side hydration only when necessary. Use Astro islands patterns where you need client interactivity.

## Useful paths

- Content & types: `src/data/content.ts`, `src/data/types.ts`
- Styles & tokens: `src/styles/starwind.css` (V2 + Starwind, única hoja v2), `src/styles/global.css` (legacy)
- Starwind UI: `starwind.config.json`, `src/components/starwind/`, `bunx starwind@latest add <name>`
- Scripts (client): `src/scripts/*.ts` (legacy) and `src/scripts/v2/` (all V2)
- Components: `src/components/*.astro` (legacy); `src/components/v2/` (all V2); `src/components/starwind/` (generated Starwind); icons under `src/components/icons/`
- GitHub stats helper: `src/lib/get-github-stats.ts`
- Pages / locales: `src/pages/index.astro`, `src/pages/es/index.astro`, `src/pages/v2.astro`
- Dev scripts (package.json): `dev`, `build`, `preview` → run them with `bun dev`, `bun build`, `bun preview` or `bun run dev` etc.
