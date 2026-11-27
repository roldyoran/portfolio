/**
 * Central icon-name map for the bento redesign.
 *
 * UI icons are Tabler icons rendered through `IconByName`; tech logos are
 * resolved by `TechIcon` (Tabler brand glyphs or the project's monochrome
 * `.astro` logos).
 */

export const bentoIconNames = {
  backend: "server",
  cloud: "container",
  cloudAlt: "cloud",
  ai: "sparkles",
  signal: "activity",
  repo: "git-branch",
  location: "map-pin",
  mail: "mail",
  copy: "copy",
  cv: "file-download",
  arrowRight: "arrow-right",
  arrowUpRight: "arrow-up-right",
  work: "building",
  fast: "bolt",
  globe: "globe",
  terminal: "terminal",
} as const;

export type BentoIconKey = keyof typeof bentoIconNames;

/** Monogram fallback for AI tools without an SVG logo (neutral, 60/30/10). */
export function aiMonogram(name: string): string {
  const clean = name.replace(/^Oh-my-/i, "").trim();
  return (clean.charAt(0) || "A").toUpperCase();
}
