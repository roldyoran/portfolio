/**
 * Tabler Icons source for real tech glyphs.
 *
 * The SVGs are imported raw at build time from the installed
 * `@tabler/icons` package (MIT). Brands that Tabler does not ship are
 * rendered by `TechIcon` from the monochrome `.astro` files in
 * `src/components/icons/tech/` instead of being approximated here.
 *
 * `GET /icons` is the icon browser if a name needs replacing:
 * https://tabler.io/icons
 */

import brandAstro from "../../node_modules/@tabler/icons/icons/outline/brand-astro.svg?raw";
import brandAws from "../../node_modules/@tabler/icons/icons/outline/brand-aws.svg?raw";
import brandCloudflare from "../../node_modules/@tabler/icons/icons/outline/brand-cloudflare.svg?raw";
import brandDocker from "../../node_modules/@tabler/icons/icons/outline/brand-docker.svg?raw";
import brandGit from "../../node_modules/@tabler/icons/icons/outline/brand-git.svg?raw";
import brandGithub from "../../node_modules/@tabler/icons/icons/outline/brand-github.svg?raw";
import brandGithubCopilot from "../../node_modules/@tabler/icons/icons/outline/brand-github-copilot.svg?raw";
import brandGolang from "../../node_modules/@tabler/icons/icons/outline/brand-golang.svg?raw";
import brandGraphql from "../../node_modules/@tabler/icons/icons/outline/brand-graphql.svg?raw";
import brandJavascript from "../../node_modules/@tabler/icons/icons/outline/brand-javascript.svg?raw";
import brandMysql from "../../node_modules/@tabler/icons/icons/outline/brand-mysql.svg?raw";
import brandNodejs from "../../node_modules/@tabler/icons/icons/outline/brand-nodejs.svg?raw";
import brandOpenai from "../../node_modules/@tabler/icons/icons/outline/brand-openai.svg?raw";
import brandPython from "../../node_modules/@tabler/icons/icons/outline/brand-python.svg?raw";
import brandReact from "../../node_modules/@tabler/icons/icons/outline/brand-react.svg?raw";
import brandRust from "../../node_modules/@tabler/icons/icons/outline/brand-rust.svg?raw";
import brandSvelte from "../../node_modules/@tabler/icons/icons/outline/brand-svelte.svg?raw";
import brandTailwind from "../../node_modules/@tabler/icons/icons/outline/brand-tailwind.svg?raw";
import brandTypescript from "../../node_modules/@tabler/icons/icons/outline/brand-typescript.svg?raw";
import brandVue from "../../node_modules/@tabler/icons/icons/outline/brand-vue.svg?raw";
import brain from "../../node_modules/@tabler/icons/icons/outline/brain.svg?raw";
import chartLine from "../../node_modules/@tabler/icons/icons/outline/chart-line.svg?raw";
import database from "../../node_modules/@tabler/icons/icons/outline/database.svg?raw";

export const tablerTechSvg = {
  "brand-astro": brandAstro,
  "brand-aws": brandAws,
  "brand-cloudflare": brandCloudflare,
  "brand-docker": brandDocker,
  "brand-git": brandGit,
  "brand-github": brandGithub,
  "brand-github-copilot": brandGithubCopilot,
  "brand-golang": brandGolang,
  "brand-graphql": brandGraphql,
  "brand-javascript": brandJavascript,
  "brand-mysql": brandMysql,
  "brand-nodejs": brandNodejs,
  "brand-openai": brandOpenai,
  "brand-python": brandPython,
  "brand-react": brandReact,
  "brand-rust": brandRust,
  "brand-svelte": brandSvelte,
  "brand-tailwind": brandTailwind,
  "brand-typescript": brandTypescript,
  "brand-vue": brandVue,
  brain,
  "chart-line": chartLine,
  database,
} as const;

export type TablerTechIcon = keyof typeof tablerTechSvg;
