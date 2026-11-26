/**
 * Content for the /docker design study.
 *
 * The copy and logos are taken from docker.com's homepage hero so the
 * recreation can be compared side by side with the original. They are not
 * part of the portfolio's own content and can be swapped later.
 */

export interface DockerNavLink {
  label: string;
  href: string;
}

export interface DockerMegaItem {
  title: string;
  description: string;
  href: string;
  badge?: string;
}

export interface DockerLogo {
  file: string;
  alt: string;
  /** Rendered height in px, matching the source site. */
  height: number;
  /** Intrinsic dimensions, used for layout stability. */
  width: number;
  intrinsicHeight: number;
}

export const DOCKER_URL = "https://www.docker.com";

export const dockerNavLinks: DockerNavLink[] = [
  { label: "Products", href: `${DOCKER_URL}/products/` },
  { label: "Solutions", href: `${DOCKER_URL}/solutions/` },
  { label: "Support", href: `${DOCKER_URL}/support/` },
  { label: "Pricing", href: `${DOCKER_URL}/pricing/` },
  { label: "Blog", href: `${DOCKER_URL}/blog/` },
  { label: "Docs", href: "https://docs.docker.com/" },
];

export const dockerMegaProducts: DockerMegaItem[] = [
  {
    title: "Sandboxes",
    badge: "New",
    description: "Isolated environments for coding agents",
    href: `${DOCKER_URL}/products/sandboxes/`,
  },
  {
    title: "AI Governance",
    badge: "New",
    description: "Govern agents and Claws across every team",
    href: `${DOCKER_URL}/products/ai-governance/`,
  },
  {
    title: "Hardened Images (DHI)",
    description: "Ship with secure, enterprise-ready images",
    href: `${DOCKER_URL}/products/hardened-images/`,
  },
  {
    title: "MCP Enterprise Gateway",
    badge: "New",
    description: "Connect and manage MCP tools",
    href: `${DOCKER_URL}/products/mcp-gateway/`,
  },
  {
    title: "Hub",
    description: "Discover and share container images",
    href: `${DOCKER_URL}/products/hub/`,
  },
  {
    title: "Desktop",
    description: "Containerize your applications",
    href: `${DOCKER_URL}/products/desktop/`,
  },
  {
    title: "Offload",
    description: "Run your Docker workloads in the cloud",
    href: `${DOCKER_URL}/products/offload/`,
  },
];

/** Five cells rotate through this list, exactly like the source hero. */
export const dockerLogos: DockerLogo[] = [
  { file: "cloudflare.svg", alt: "Cloudflare", height: 18, width: 251, intrinsicHeight: 36 },
  { file: "rakuten.svg", alt: "Rakuten", height: 22, width: 166, intrinsicHeight: 49 },
  { file: "adobe.svg", alt: "Adobe", height: 15, width: 112, intrinsicHeight: 27 },
  { file: "lego.svg", alt: "LEGO", height: 28, width: 120, intrinsicHeight: 54 },
  { file: "jpmorgan.svg", alt: "JPMorganChase", height: 16, width: 237, intrinsicHeight: 33 },
  { file: "novo-nordisk.svg", alt: "Novo Nordisk", height: 37, width: 96, intrinsicHeight: 68 },
  { file: "notion.svg", alt: "Notion", height: 24, width: 181, intrinsicHeight: 63 },
];

/** Number of logo cells visible at once (3 on phones, 5 from 600px up). */
export const dockerLogoCellCount = 5;

/** Copy used by the hero recreation. */
export const dockerHero = {
  pillTag: "New",
  pill: "Claim $250 in Cloud Credits for Docker Sandboxes",
  pillHref: `${DOCKER_URL}/c/sbx-promo`,
  titleLead: "Trust Docker",
  titleSoft: "for the agents you don’t",
  subtitle:
    "Docker securely contains autonomous agents so you can confidently build, ship, and run on trust.",
  logosLabel:
    "Trusted by Cloudflare, Rakuten, Adobe, LEGO, JPMorganChase, Novo Nordisk and Notion",
};
