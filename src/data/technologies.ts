/**
 * Technology catalog — the single source of truth for every tech label the
 * portfolio can render, together with the icon that represents it.
 *
 * Each label resolves to exactly one icon:
 * - `astro`: one of the monochrome logos in `src/components/icons/tech/`.
 * - `tabler`: a raw glyph from `@tabler/icons` (see `./tabler-icons.ts`).
 *
 * `TechIcon` reads this catalog, so supporting a new technology means adding
 * one entry here plus its SVG (astro file or Tabler import). An unknown label
 * renders nothing and logs a warning in development.
 *
 * Flags:
 * - `original`: raw logo used by `variant="original"` and the icon study.
 * - `mono`: outline logo used by `variant="mono"` (hero strip), when one exists.
 * - `tabler`: glyph used by `variant="tabler"` when Tabler ships one.
 * - `generic: true`: neutral Tabler glyph, because the brand has no icon.
 * - `heroStrip: true`: labels the hero line-up cycles through.
 */
import type { TablerTechIcon } from "./tabler-icons";
import type { SkillCategory } from "./types";

export type TechCategory = SkillCategory;

/** Files in `src/components/icons/tech`, without the `.astro` extension. */
export const TECH_ASTRO_ICONS = [
  "antigravity",
  "astro",
  "aws",
  "cicd",
  "claude-ai",
  "claude-code",
  "cloudflare-workers",
  "cloudflare",
  "docker",
  "drizzle-orm",
  "fast-api",
  "gcp",
  "git",
  "github-copilot",
  "go",
  "grafana",
  "graphql",
  "grpc",
  "hono",
  "java",
  "javascript",
  "kubernetes",
  "linux",
  "mysql",
  "nodejs",
  "oh-my-pi",
  "openai",
  "opencode",
  "pi",
  "postgresql",
  "postgresql-outline",
  "python",
  "rabbitmq",
  "react",
  "redis",
  "rust",
  "sqlite",
  "tailwind",
  "turso",
  "typescript",
  "vue",
] as const;

export type TechAstroIcon = (typeof TECH_ASTRO_ICONS)[number];

export type TechIconRef =
  | { readonly kind: "tabler"; readonly name: TablerTechIcon }
  | { readonly kind: "astro"; readonly file: TechAstroIcon };

export interface TechEntry {
  /** Exact label used in `content.ts` (skills, projects, marquee, hero). */
  readonly label: string;
  readonly category: TechCategory;
  /** Icon `TechIcon` renders by default (`variant="auto"`). */
  readonly icon: TechIconRef;
  /** Raw `.astro` logo, when the project ships one. */
  readonly original?: TechAstroIcon;
  /** Outline `.astro` logo for `variant="mono"`; falls back to `icon`. */
  readonly mono?: TechAstroIcon;
  /** Tabler glyph, when Tabler ships one. */
  readonly tabler?: TablerTechIcon;
  /** True when the Tabler glyph is a neutral stand-in, not the brand logo. */
  readonly generic?: true;
  /** True for the labels the hero strip cycles through. */
  readonly heroStrip?: true;
}

export const technologies: readonly TechEntry[] = [
  /* Languages */
  { label: "Go", category: "Language", icon: { kind: "tabler", name: "brand-golang" }, original: "go", tabler: "brand-golang", heroStrip: true },
  { label: "Rust", category: "Language", icon: { kind: "tabler", name: "brand-rust" }, original: "rust", tabler: "brand-rust", heroStrip: true },
  { label: "TypeScript", category: "Language", icon: { kind: "tabler", name: "brand-typescript" }, original: "typescript", tabler: "brand-typescript", heroStrip: true },
  { label: "JavaScript", category: "Language", icon: { kind: "tabler", name: "brand-javascript" }, original: "javascript", tabler: "brand-javascript", heroStrip: true },
  { label: "Python", category: "Language", icon: { kind: "tabler", name: "brand-python" }, original: "python", tabler: "brand-python", heroStrip: true },
  { label: "Java", category: "Language", icon: { kind: "astro", file: "java" }, original: "java" },
  { label: "SQL", category: "Language", icon: { kind: "tabler", name: "database" }, tabler: "database", generic: true },

  /* Databases */
  { label: "PostgreSQL", category: "Database", icon: { kind: "astro", file: "postgresql" }, original: "postgresql", mono: "postgresql-outline" },
  { label: "MySQL", category: "Database", icon: { kind: "tabler", name: "brand-mysql" }, original: "mysql", tabler: "brand-mysql", heroStrip: true },
  { label: "Redis", category: "Database", icon: { kind: "astro", file: "redis" }, original: "redis" },
  { label: "Turso", category: "Database", icon: { kind: "astro", file: "turso" }, original: "turso" },
  { label: "SQLite", category: "Database", icon: { kind: "astro", file: "sqlite" }, original: "sqlite" },
  { label: "Drizzle ORM", category: "Database", icon: { kind: "astro", file: "drizzle-orm" }, original: "drizzle-orm" },
  { label: "Cloudflare D1", category: "Database", icon: { kind: "astro", file: "cloudflare" }, original: "cloudflare" },

  /* Frontend */
  { label: "React", category: "Frontend", icon: { kind: "tabler", name: "brand-react" }, original: "react", tabler: "brand-react", heroStrip: true },
  { label: "Astro", category: "Frontend", icon: { kind: "tabler", name: "brand-astro" }, original: "astro", tabler: "brand-astro", heroStrip: true },
  { label: "Vue.js", category: "Frontend", icon: { kind: "tabler", name: "brand-vue" }, original: "vue", tabler: "brand-vue", heroStrip: true },
  { label: "Tailwind CSS", category: "Frontend", icon: { kind: "tabler", name: "brand-tailwind" }, original: "tailwind", tabler: "brand-tailwind", heroStrip: true },
  { label: "Svelte", category: "Frontend", icon: { kind: "tabler", name: "brand-svelte" }, tabler: "brand-svelte", heroStrip: true },

  /* Backend */
  { label: "Node.js", category: "Backend", icon: { kind: "tabler", name: "brand-nodejs" }, original: "nodejs", tabler: "brand-nodejs", heroStrip: true },
  { label: "FastAPI", category: "Backend", icon: { kind: "astro", file: "fast-api" }, original: "fast-api" },
  { label: "Hono", category: "Backend", icon: { kind: "astro", file: "hono" }, original: "hono" },
  { label: "gRPC", category: "Backend", icon: { kind: "astro", file: "grpc" }, original: "grpc" },
  { label: "GraphQL", category: "Backend", icon: { kind: "tabler", name: "brand-graphql" }, original: "graphql", tabler: "brand-graphql", heroStrip: true },

  /* DevOps */
  { label: "CI/CD", category: "DevOps", icon: { kind: "astro", file: "cicd" }, original: "cicd" },
  { label: "Docker", category: "DevOps", icon: { kind: "tabler", name: "brand-docker" }, original: "docker", tabler: "brand-docker", heroStrip: true },
  { label: "Kubernetes", category: "DevOps", icon: { kind: "astro", file: "kubernetes" }, original: "kubernetes" },
  { label: "Linux", category: "DevOps", icon: { kind: "astro", file: "linux" }, original: "linux" },
  { label: "Git", category: "DevOps", icon: { kind: "tabler", name: "brand-git" }, original: "git", tabler: "brand-git", heroStrip: true },
  { label: "GitHub", category: "DevOps", icon: { kind: "tabler", name: "brand-github" }, tabler: "brand-github" },
  { label: "Grafana", category: "DevOps", icon: { kind: "astro", file: "grafana" }, original: "grafana" },
  { label: "Prometheus", category: "DevOps", icon: { kind: "tabler", name: "chart-line" }, tabler: "chart-line", generic: true },
  { label: "RabbitMQ", category: "DevOps", icon: { kind: "astro", file: "rabbitmq" }, original: "rabbitmq" },

  /* Cloud */
  { label: "AWS", category: "Cloud", icon: { kind: "tabler", name: "brand-aws" }, original: "aws", tabler: "brand-aws", heroStrip: true },
  { label: "GCP", category: "Cloud", icon: { kind: "astro", file: "gcp" }, original: "gcp" },
  { label: "Google Cloud", category: "Cloud", icon: { kind: "astro", file: "gcp" }, original: "gcp" },
  { label: "Cloudflare Workers", category: "Cloud", icon: { kind: "astro", file: "cloudflare-workers" }, original: "cloudflare-workers" },
  { label: "Cloudflare", category: "Cloud", icon: { kind: "tabler", name: "brand-cloudflare" }, original: "cloudflare", tabler: "brand-cloudflare", heroStrip: true },
  { label: "Google Kubernetes Engine", category: "Cloud", icon: { kind: "astro", file: "kubernetes" }, original: "kubernetes" },

  /* AI */
  { label: "Claude Code", category: "AI", icon: { kind: "astro", file: "claude-code" }, original: "claude-code" },
  { label: "Claude AI", category: "AI", icon: { kind: "astro", file: "claude-ai" }, original: "claude-ai" },
  { label: "Opus", category: "AI", icon: { kind: "astro", file: "claude-ai" }, original: "claude-ai" },
  { label: "GitHub Copilot", category: "AI", icon: { kind: "astro", file: "github-copilot" }, original: "github-copilot", tabler: "brand-github-copilot" },
  { label: "OpenCode", category: "AI", icon: { kind: "astro", file: "opencode" }, original: "opencode" },
  { label: "Pi", category: "AI", icon: { kind: "astro", file: "pi" }, original: "pi" },
  { label: "Oh-my-pi", category: "AI", icon: { kind: "astro", file: "oh-my-pi" }, original: "oh-my-pi" },
  { label: "Open LLMs", category: "AI", icon: { kind: "tabler", name: "brain" }, tabler: "brain", generic: true },
  { label: "GPT", category: "AI", icon: { kind: "tabler", name: "brand-openai" }, original: "openai", tabler: "brand-openai", heroStrip: true },
  { label: "OpenAI", category: "AI", icon: { kind: "tabler", name: "brand-openai" }, original: "openai", tabler: "brand-openai" },
  { label: "Antigravity", category: "AI", icon: { kind: "astro", file: "antigravity" }, original: "antigravity" },
];

/** Every label in the catalog, in display order. */
export const techLabels: string[] = technologies.map((tech) => tech.label);

const byLabel = new Map(technologies.map((tech) => [tech.label, tech]));

/** Catalog lookup; `undefined` means the label is missing from the catalog. */
export function getTech(label: string): TechEntry | undefined {
  return byLabel.get(label);
}

/**
 * Label -> Tabler glyph, for consumers that render Tabler only
 * (`skillsWithIcons`, `variant="tabler"` fallbacks).
 */
export const techIcons: Record<string, TablerTechIcon> = Object.fromEntries(
  technologies.flatMap((tech) => {
    const glyph = tech.tabler ?? (tech.icon.kind === "tabler" ? tech.icon.name : null);
    return glyph ? [[tech.label, glyph] as const] : [];
  }),
);

/** Labels with a real Tabler brand glyph that the hero strip cycles through. */
export const tablerBrandLabels: string[] = technologies
  .filter((tech) => tech.heroStrip)
  .map((tech) => tech.label);

export const technologiesByCategory: Record<TechCategory, TechEntry[]> = {
  Language: [],
  Frontend: [],
  Backend: [],
  Database: [],
  DevOps: [],
  Cloud: [],
  AI: [],
};

for (const tech of technologies) technologiesByCategory[tech.category].push(tech);
