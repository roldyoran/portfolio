/**
 * Central Lucide icon map for the bento redesign.
 * UI icons come from `@lucide/astro`; tech logos keep living in
 * `src/components/icons/tech/*.astro` and are referenced from content.ts.
 */
import {
  Server,
  Container,
  Cloud,
  Sparkles,
  Activity,
  GitBranch,
  MapPin,
  Mail,
  Copy,
  FileDown,
  ArrowRight,
  ArrowUpRight,
  Building2,
  Zap,
  Globe,
  Terminal,
} from "@lucide/astro";

export const bentoIcons = {
  backend: Server,
  cloud: Container,
  cloudAlt: Cloud,
  ai: Sparkles,
  signal: Activity,
  repo: GitBranch,
  location: MapPin,
  mail: Mail,
  copy: Copy,
  cv: FileDown,
  arrowRight: ArrowRight,
  arrowUpRight: ArrowUpRight,
  work: Building2,
  fast: Zap,
  globe: Globe,
  terminal: Terminal,
} as const;

export type BentoIconKey = keyof typeof bentoIcons;

/** Monogram fallback for AI tools without an SVG logo (neutral, 60/30/10). */
export function aiMonogram(name: string): string {
  const clean = name.replace(/^Oh-my-/i, "").trim();
  return (clean.charAt(0) || "A").toUpperCase();
}
