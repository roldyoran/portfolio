/**
 * Single editable module: site copy, experience, projects, skills, and tech icon maps.
 * Types live in ./types.ts
 */
import type {
  Config,
  Experience,
  IconMap,
  IconProps,
  Project,
  Skill,
  SkillWithIcon,
} from "./types";

import ReactIcon from "@/components/icons/tech/react.astro";
import NodejsIcon from "@/components/icons/tech/nodejs.astro";
import TypescriptIcon from "@/components/icons/tech/typescript.astro";
import AwsIcon from "@/components/icons/tech/aws.astro";
import KubernetesIcon from "@/components/icons/tech/kubernetes.astro";
import DockerIcon from "@/components/icons/tech/docker.astro";
import PostgresqlIcon from "@/components/icons/tech/postgresql.astro";
import GoIcon from "@/components/icons/tech/go.astro";
import RedisIcon from "@/components/icons/tech/redis.astro";
import GraphqlIcon from "@/components/icons/tech/graphql.astro";
import CicdIcon from "@/components/icons/tech/cicd.astro";
import PythonIcon from "@/components/icons/tech/python.astro";
import LinuxIcon from "@/components/icons/tech/linux.astro";
import GcpIcon from "@/components/icons/tech/gcp.astro";
import AstroIcon from "@/components/icons/tech/astro.astro";
import TailwindIcon from "@/components/icons/tech/tailwind.astro";
import VueIcon from "@/components/icons/tech/vue.astro";
import FastApiIcon from "@/components/icons/tech/fast-api.astro";
import HonoIcon from "@/components/icons/tech/hono.astro";
import GitIcon from "@/components/icons/tech/git.astro";
import GrafanaIcon from "@/components/icons/tech/grafana.astro";
import TursoIcon from "@/components/icons/tech/turso.astro";
import RabbitmqIcon from "@/components/icons/tech/rabbitmq.astro";
import GrpcIcon from "@/components/icons/tech/grpc.astro";
import CloudflareWorkersIcon from "@/components/icons/tech/cloudflare-workers.astro";
import SqliteIcon from "@/components/icons/tech/sqlite.astro";
import KafkaIcon from "@/components/icons/tech/apache-kafka.astro";
import DrizzleIcon from "@/components/icons/tech/drizzle-orm.astro";
import ClaudeIcon from "@/components/icons/tech/claude-ai.astro";
import JavascriptIcon from "@/components/icons/tech/javascript.astro";
import RustIcon from "@/components/icons/tech/rust.astro";
import OpenaiIcon from "@/components/icons/tech/openai.astro";

/** Union of keys used by skills, marquee labels, and About */
const techIcons: Record<string, any> = {
  Go: GoIcon,
  Rust: RustIcon,
  TypeScript: TypescriptIcon,
  JavaScript: JavascriptIcon,
  Python: PythonIcon,
  SQL: PostgresqlIcon,
  PostgreSQL: PostgresqlIcon,
  React: ReactIcon,
  "Node.js": NodejsIcon,
  Astro: AstroIcon,
  "Vue.js": VueIcon,
  "Tailwind CSS": TailwindIcon,
  FastAPI: FastApiIcon,
  Hono: HonoIcon,
  "Drizzle ORM": DrizzleIcon,
  "Apache Kafka": KafkaIcon,
  Kafka: KafkaIcon,
  gRPC: GrpcIcon,
  GraphQL: GraphqlIcon,
  "CI/CD": CicdIcon,
  Redis: RedisIcon,
  Turso: TursoIcon,
  SQLite: SqliteIcon,
  Docker: DockerIcon,
  Kubernetes: KubernetesIcon,
  Linux: LinuxIcon,
  Git: GitIcon,
  Grafana: GrafanaIcon,
  RabbitMQ: RabbitmqIcon,
  AWS: AwsIcon,
  GCP: GcpIcon,
  "Google Cloud": GcpIcon,
  "Cloudflare Workers": CloudflareWorkersIcon,
  "Claude Code": ClaudeIcon,
  GPT: OpenaiIcon,
};

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
    image: "/portfolio/imgs/url-shortener-roldyoran.webp",
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
    name: "Votaciones Antagonista",
    nameEs: "Votaciones Antagonista",
    tagline:
      "Real public fan vote with Google OAuth, ranked ballots and per-user autosave, running in production.",
    taglineEs:
      "Votación pública real con OAuth de Google, voto por ranking y autoguardado por usuario, corriendo en producción.",
    tech: ["Astro", "React", "Tailwind CSS", "TypeScript", "Turso"],
    demo: "https://votaciones-antagonista.vercel.app/",
    github: "https://github.com/roldyoran/antagonista-site",
    // Image shown in the Projects section. Expected public path includes the 'porfolio' prefix per deployment.
    image: "/portfolio/imgs/antagonita-site-votations-roldyoran.webp",
    metrics: ["Real users in prod", "OAuth + ranked vote", "Autosave per user"],
    metricsEs: ["Usuarios reales en prod", "OAuth + voto rankeado", "Autoguardado por usuario"],
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
      "Systems Engineering student focused on backend APIs, Kubernetes and cloud. I ship with Go, Python and TypeScript, and I accelerate delivery with AI Harness: Claude Code, OpenCode and Pi, plus open LLMs (GPT, Opus class) for automation and process tooling.",
    descriptionEs:
      "Estudiante de Ingeniería en Sistemas enfocado en APIs backend, Kubernetes y cloud. Entrego con Go, Python y TypeScript, y acelero con Harness de IA: Claude Code, OpenCode y Pi, además de LLMs abiertos (GPT, clase Opus) para automatización de procesos.",
    tagline: "APIs, K8s & AI Harness<br />shipped to production.",
    taglineEs: "APIs, K8s y Harness de IA<br />en producción.",
    years: "5+",
    focus: "DevOps & Systems Engineering",
    reqDay: "60ms",
    uptime: "99.9%",
  },
  bio: [
    {
        text: "I studied Computer Science and Systems Engineering at USAC and served as a lab teaching assistant for Operating Systems 1 for 2 semesters: Linux, Docker, Kubernetes, kernel modules, VMs. I build backend APIs (Go, Python, TypeScript) and cloud delivery (K8s, CI/CD), and I use AI Harness daily: Claude Code, OpenCode, Pi/Oh-my-pi, plus open LLMs for automation and process tooling. Open to Junior Backend / DevOps roles with an AI focus.",
    },
  ],
  bioEs: [
    {
        text: "Estudié Ingeniería en Ciencias y Sistemas en la USAC y fui auxiliar del laboratorio de Sistemas Operativos 1 durante 2 semestres: Linux, Docker, Kubernetes, módulos del kernel y VMs. Construyo APIs backend (Go, Python, TypeScript) y entrega cloud (K8s, CI/CD), y uso Harness de IA a diario: Claude Code, OpenCode, Pi/Oh-my-pi, además de LLMs abiertos para automatización. Busco roles Junior Backend / DevOps con foco en IA.",
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
    yearsExp: 1,
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

export function getSkillIcon(name: string): any {
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

export const skillsByCategory = categories.reduce(
  (acc, category) => {
    acc[category] = getSkillsByCategory(category);
    return acc;
  },
  {} as Record<string, Skill[]>,
);

export const skillsWithIconsByCategory = categories.reduce(
  (acc, category) => {
    acc[category] = getSkillsWithIconsByCategory(category);
    return acc;
  },
  {} as Record<string, SkillWithIcon[]>,
);

/** Marquee strip: one icon component per label in config.marquee */
export const marqueeTechIcons: IconMap = Object.fromEntries(
  config.marquee.map((label) => [label, techIcons[label] ?? null]),
) as IconMap;

export default config;
