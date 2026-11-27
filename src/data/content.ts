/**
 * Single editable module: site copy, experience, projects, skills, and tech icon maps.
 * Types live in ./types.ts
 */
import type {
  Config,
  Experience,
  IconProps,
  Project,
  Skill,
  SkillWithIcon,
} from "./types";
import type { TablerTechIcon } from "./tabler-icons";

/**
 * Tech label -> real Tabler icon.
 *
 * Only labels with an official Tabler brand glyph (or a neutral generic icon
 * where no brand exists) live here. Labels that use one of the project's
 * monochrome `.astro` logos are resolved first by `tech-icon.astro`, so they
 * do not need a misleading semantic fallback in this map.
 */
const techIcons: Record<string, TablerTechIcon> = {
  Go: "brand-golang",
  Rust: "brand-rust",
  TypeScript: "brand-typescript",
  JavaScript: "brand-javascript",
  Python: "brand-python",
  SQL: "database",
  MySQL: "brand-mysql",
  React: "brand-react",
  "Node.js": "brand-nodejs",
  Astro: "brand-astro",
  "Vue.js": "brand-vue",
  "Tailwind CSS": "brand-tailwind",
  Svelte: "brand-svelte",
  GraphQL: "brand-graphql",
  Docker: "brand-docker",
  Git: "brand-git",
  "GitHub Copilot": "brand-github-copilot",
  Prometheus: "chart-line",
  AWS: "brand-aws",
  Cloudflare: "brand-cloudflare",
  "Open LLMs": "brain",
  GPT: "brand-openai",
  OpenAI: "brand-openai",
};

/** Labels that have a real Tabler brand glyph. */
export const tablerBrandLabels: string[] = [
  "Go",
  "Rust",
  "TypeScript",
  "JavaScript",
  "Python",
  "MySQL",
  "React",
  "Node.js",
  "Astro",
  "Vue.js",
  "Tailwind CSS",
  "Svelte",
  "GraphQL",
  "Docker",
  "Git",
  "AWS",
  "Cloudflare",
  "GPT",
];

/**
 * Hero logo strip: Tabler brand glyphs plus the project's .astro logos that
 * the owner wants in the hero. The hero renders with `tone="mono"`, so the
 * custom OpenCode, Claude Code, Pi and Claude AI logos are forced to white.
 */
export const heroLogoLabels: string[] = [
  "OpenCode",
  "Claude Code",
  "Pi",
  "GPT",
  "Claude AI",
  ...tablerBrandLabels.filter((label) => label !== "GPT"),
];

/** Cells that stay visible on every page load instead of cycling away. */
export const heroPinnedLabels: string[] = [
  "OpenCode",
  "Claude Code",
  "Pi",
  "GPT",
];

/** Every tech label used by the portfolio, including the custom .astro logos. */
export const techLabels: string[] = [
  "Go",
  "Rust",
  "TypeScript",
  "JavaScript",
  "Python",
  "Java",
  "SQL",
  "PostgreSQL",
  "MySQL",
  "React",
  "Node.js",
  "Astro",
  "Vue.js",
  "Tailwind CSS",
  "Svelte",
  "FastAPI",
  "Hono",
  "Drizzle ORM",
  "Apache Kafka",
  "Kafka",
  "gRPC",
  "GraphQL",
  "CI/CD",
  "Redis",
  "Turso",
  "SQLite",
  "Docker",
  "Kubernetes",
  "Linux",
  "Git",
  "Grafana",
  "Prometheus",
  "RabbitMQ",
  "AWS",
  "GCP",
  "Google Cloud",
  "Cloudflare Workers",
  "Cloudflare",
  "Cloudflare D1",
  "Google Kubernetes Engine",
  "Claude Code",
  "GitHub Copilot",
  "Opus",
  "OpenCode",
  "Pi",
  "Oh-my-pi",
  "AI Harness",
  "AI Automation",
  "Open LLMs",
  "GPT",
];


export const experience: Experience[] = [
  {
    id: 1,
    company: "Universidad de San Carlos de Guatemala (USAC)",
    location: "Guatemala",
    role: "Academic Tutor, Operating Systems I Lab",
    roleEs: "Tutor Académico, Laboratorio de Sistemas Operativos 1",
    period: {
      start: "July 2025",
      startEs: "Julio 2025",
      end: "May 2026",
      endEs: "Mayo 2026",
    },
    description:
      "Teaching assistant for the Operating Systems I lab, supporting 139 students in hands-on Linux, virtualization with VirtManager, kernel modules and systems administration. I built distributed lab environments on Kubernetes with gRPC services, Kafka and RabbitMQ messaging, Redis and Valkey caching, plus Go and Rust automations for monitoring, with Grafana dashboards and Locust load testing.",
    descriptionEs:
      "Auxiliar del laboratorio de Sistemas Operativos I, apoyando a 139 estudiantes en Linux, virtualización con VirtManager, módulos del kernel y administración de sistemas. Armé entornos de prácticas distribuidos en Kubernetes con servicios gRPC, mensajería Kafka y RabbitMQ, caché Redis y Valkey, más automatizaciones en Go y Rust para monitoreo, con tableros Grafana y pruebas de carga Locust.",
    tech: ["Linux", "Kubernetes", "gRPC", "Kafka", "Redis", "Grafana"],
    link: "https://roly.top/tutordtt",
  },
];

export const projects: Project[] = [
  {
    id: 1,
    name: "URL Shortener",
    nameEs: "URL Shortener",
    tagline:
      "Production URL shortener with custom codes, a live visit counter and an OAuth-secured REST API, served from the edge in under 60ms.",
    taglineEs:
      "Acortador en producción con códigos personalizados, contador de visitas en vivo y API REST con OAuth, servido desde el edge en menos de 60ms.",
    tech: ["TypeScript", "Hono", "Drizzle ORM", "Cloudflare Workers", "Cloudflare D1", "Vue.js"],
    demo: "https://roly.top",
    github: "https://github.com/roldyoran/shorturl",
    // Image shown in the Projects section. Expected public path includes the 'porfolio' prefix per deployment.
    image: "/portfolio/imgs/url-shortener-demo-roldyoran.webp",
    metrics: ["Live · p99 <60ms", "REST API + OAuth", "Workers + D1"],
    metricsEs: ["En vivo · p99 <60ms", "API REST + OAuth", "Workers + D1"],
  },
  {
    id: 2,
    name: "Olympic Monitoring Platform",
    nameEs: "Plataforma de Monitoreo Olímpico",
    tagline:
      "Live monitoring platform with Go and Rust microservices, Kafka messaging and Grafana observability, autoscaled on GKE.",
    taglineEs:
      "Plataforma de monitoreo en vivo con microservicios en Go y Rust, mensajería Kafka y observabilidad Grafana, autoescalada en GKE.",
    tech: [
      "Go",
      "Rust",
      "gRPC",
      "Apache Kafka",
      "Redis",
      "Prometheus",
      "Grafana",
      "Google Kubernetes Engine",
      "Docker",
    ],
    demo: null,
    github: "https://github.com/roldyoran/gke-k8s-olympic-microservices",
    // Image shown in the Projects section. Expected public path includes the 'porfolio' prefix per deployment.
    image: "/portfolio/imgs/gke-olimpic-platform-roldyoran.webp",
    metrics: ["GKE autoscaling", "gRPC + Kafka", "Prometheus / Grafana"],
    metricsEs: ["Autoescalado GKE", "gRPC + Kafka", "Prometheus / Grafana"],
  },
  {
    id: 3,
    name: "AI Front Skills",
    nameEs: "AI Front Skills",
    tagline:
      "Skills registry for frontend design-engineering with visual before/after comparisons, full-text search and topic filters, in English and Spanish.",
    taglineEs:
      "Registro de skills de diseño e interfaces con comparativas visuales antes/después, búsqueda full-text y filtros por tema, en inglés y español.",
    tech: ["Astro", "TypeScript", "Tailwind CSS", "Svelte"],
    demo: "https://ai-front-skills.vercel.app",
    github: "https://github.com/roldyoran/ai-front-skills",
    // Image shown in the Projects section. Expected public path includes the 'porfolio' prefix per deployment.
    image: "/portfolio/imgs/ai-front-skills-demo-roldyoran.webp",
    metrics: ["Live registry", "Before/after visuals", "Search + filters"],
    metricsEs: ["Registro en vivo", "Comparativas visuales", "Búsqueda + filtros"],
  },
];

export const skillsData: Skill[] = [
  { name: "Go", category: "Language" },
  { name: "Rust", category: "Language" },
  { name: "TypeScript", category: "Language" },
  { name: "JavaScript", category: "Language" },
  { name: "Python", category: "Language" },
  { name: "Java", category: "Language" },
  { name: "SQL", category: "Language" },
  { name: "React", category: "Frontend" },
  { name: "Astro", category: "Frontend" },
  { name: "Vue.js", category: "Frontend" },
  { name: "Tailwind CSS", category: "Frontend" },
  { name: "FastAPI", category: "Backend" },
  { name: "Hono", category: "Backend" },
  { name: "gRPC", category: "Backend" },
  { name: "PostgreSQL", category: "Database" },
  { name: "MySQL", category: "Database" },
  { name: "Redis", category: "Database" },
  { name: "Turso", category: "Database" },
  { name: "SQLite", category: "Database" },
  { name: "Docker", category: "DevOps" },
  { name: "Kubernetes", category: "DevOps" },
  { name: "Linux", category: "DevOps" },
  { name: "Git", category: "DevOps" },
  { name: "Grafana", category: "DevOps" },
  { name: "RabbitMQ", category: "DevOps" },
  { name: "AWS", category: "Cloud" },
  { name: "Google Cloud", category: "Cloud" },
  { name: "Cloudflare Workers", category: "Cloud" },
  { name: "Claude Code", category: "AI" },
  { name: "OpenCode", category: "AI" },
  { name: "Pi", category: "AI" },
  { name: "Oh-my-pi", category: "AI" },
  { name: "GPT", category: "AI" },
  { name: "Opus", category: "AI" },
  { name: "Open LLMs", category: "AI" },
  { name: "AI Harness", category: "Automation" },
  { name: "AI Automation", category: "Automation" },
];

export const excludedSkills = ["Terraform"];

const config: Config = {
  name: "Edgar Rolando Alvarez Rodriguez",
  title: "DevOps & Systems Engineer",
  titleEs: "Ingeniero de Sistemas y DevOps",
  githubUsername: "roldyoran",
  location: "Prados de Villa Hermosa, San Miguel Petapa, Guatemala",
  locationEs: "Prados de Villa Hermosa, San Miguel Petapa, Guatemala",
  available: true,
  email: "edgaralvarez4204@gmail.com",
  social: {
    linkedin: "https://www.linkedin.com/in/roldyoran",
    github: "https://github.com/roldyoran",
    twitter: "#",
  },
  hero: {
    index: "01",
    role: "DevOps & Backend Engineer, AI Harness",
    roleEs: "Ingeniero DevOps & Backend, Harness de IA",
    namePrimary: "Edgar",
    nameAccent: "Alvarez",
    backdrop: "EDGAR",
    description:
      "Systems student. Backend, Kubernetes and cloud with Go, Python and TypeScript, plus AI harness.",
    descriptionEs:
      "Estudiante de Sistemas. Backend, Kubernetes y cloud con Go, Python y TypeScript, más harness de IA.",
    tagline: "APIs, K8s & AI Harness<br />shipped to production.",
    taglineEs: "APIs, K8s y Harness de IA<br />en producción.",
    years: "5+",
    focus: "DevOps & Systems Engineering",
    reqDay: "60ms",
    uptime: "99.9%",
  },
  bio: [
    {
        text: "I studied Computer Science and Systems Engineering at USAC and worked as a teaching assistant for the Operating Systems 1 lab for two semesters, teaching Linux, Docker, Kubernetes, kernel modules, VMs and Google Cloud Platform. I enjoy building backend APIs (Go, Python, TypeScript) and working with K8s and CI/CD. I use AI harnesses daily (Claude Code, OpenCode, Pi/Oh-my-pi) with my own configurations, plus open LLMs for automation. I'm looking for Junior Fullstack and DevOps roles.",
    },
  ],
  bioEs: [
    {
        text: "Estudié Ingeniería en Ciencias y Sistemas en la USAC y fui auxiliar docente del laboratorio de Sistemas Operativos 1 durante dos semestres, enseñando Linux, Docker, Kubernetes, módulos del kernel, VMs y Google Cloud Platform. Disfruto construir APIs backend (Go, Python, TypeScript) y trabajar con K8s y CI/CD. Uso a diario harness de IA (Claude Code, OpenCode, Pi/Oh-my-pi) con mis propias configuraciones, además de LLMs abiertos para automatización. Busco roles Junior Fullstack y DevOps.",
    },
  ],
  marquee: [
    "Python",
    "Go",
    "TypeScript",
    "PostgreSQL",
    "Docker",
    "Kubernetes",
    "Linux",
    "GCP",
    "CI/CD",
    "Open LLMs",
    "AI Harness",
    "Claude Code",
  ],
  githubStats: {
    yearsExp: 5,
    repos: 36,
    contributions: 1270,
    followers: 2,
  },
};

function getIconProps(category: string): IconProps {
  const sizeByCategory: Record<string, number> = {
    Language: 20,
    Frontend: 18,
    Backend: 18,
    Database: 16,
    DevOps: 18,
    Cloud: 20,
    AI: 18,
    Automation: 18,
  };
  return {
    size: sizeByCategory[category] ?? 18,
    class: "text-t2",
  };
}

export const skills: Skill[] = skillsData;

export const skillsWithIcons: SkillWithIcon[] = skillsData
  .filter((skill) => !excludedSkills.includes(skill.name))
  .map((skill) => ({
    ...skill,
    icon: techIcons[skill.name] ?? null,
    iconProps: getIconProps(skill.category),
  }));

export function getSkillIcon(name: string): TablerTechIcon | null {
  return techIcons[name] ?? null;
}

export { techIcons };

export function getSkillsByCategory(category: string): Skill[] {
  return skills.filter((s) => s.category === category);
}

export function getSkillsWithIconsByCategory(category: string): SkillWithIcon[] {
  return skillsWithIcons.filter((s) => s.category === category);
}

export const categories = [
  "Language",
  "Frontend",
  "Backend",
  "Database",
  "DevOps",
  "Cloud",
  "AI",
  "Automation",
] as const;

export type Category = (typeof categories)[number];

export const skillsByCategory: Record<Category, Skill[]> = {
  Language: getSkillsByCategory("Language"),
  Frontend: getSkillsByCategory("Frontend"),
  Backend: getSkillsByCategory("Backend"),
  Database: getSkillsByCategory("Database"),
  DevOps: getSkillsByCategory("DevOps"),
  Cloud: getSkillsByCategory("Cloud"),
  AI: getSkillsByCategory("AI"),
  Automation: getSkillsByCategory("Automation"),
};

export const skillsWithIconsByCategory: Record<Category, SkillWithIcon[]> = {
  Language: getSkillsWithIconsByCategory("Language"),
  Frontend: getSkillsWithIconsByCategory("Frontend"),
  Backend: getSkillsWithIconsByCategory("Backend"),
  Database: getSkillsWithIconsByCategory("Database"),
  DevOps: getSkillsWithIconsByCategory("DevOps"),
  Cloud: getSkillsWithIconsByCategory("Cloud"),
  AI: getSkillsWithIconsByCategory("AI"),
  Automation: getSkillsWithIconsByCategory("Automation"),
};
export default config;
