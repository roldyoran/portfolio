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

/** Union of keys used by skills, marquee labels, and About */
const techIcons: Record<string, any> = {
  Go: GoIcon,
  Rust: null,
  TypeScript: TypescriptIcon,
  JavaScript: null,
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
};

export const experience: Experience[] = [
  {
    id: 1,
    company: "Universidad de San Carlos de Guatemala (USAC)",
    location: "Guatemala",
    role: "Academic Tutor - Operating Systems I",
    roleEs: "Tutor Académico - Sistemas Operativos I",
    period: {
      start: "July 2025",
      startEs: "Julio 2025",
      end: "May 2026",
      endEs: "Mayo 2026",
    },
    description:
      "I taught students the use of Linux, kernel module development, and virtual machine administration in the Operating Systems I lab. I designed and delivered supplementary material on Kubernetes and microservices deployment. I supported students in troubleshooting technical issues and evaluating hands-on lab exercises.",
    descriptionEs:
      "Enseñé a estudiantes el uso de Linux, desarrollo de módulos del kernel y administración de máquinas virtuales en el laboratorio de Sistemas Operativos I. Diseñé e impartí material complementario sobre Kubernetes y despliegue de microservicios. Apoyé en la resolución de problemas técnicos y evaluación de ejercicios prácticos del laboratorio.",
    tech: ["Linux", "Kubernetes", "Microservicios", "Kernel", "Virtualización"],
    link: "https://shorturl.roldyoran.workers.dev/dttaux",
  },
];

export const projects: Project[] = [
  {
    id: 1,
    name: "URL Shortener",
    nameEs: "URL Shortener",
    tagline:
      "Full-stack URL shortener with custom codes, real-time visit counter, and REST API with API Key authentication deployed on Cloudflare Workers for sub-60ms global latency.",
    taglineEs:
      "Acortador de URLs full-stack con códigos personalizados, contador de visitas en tiempo real y API REST con autenticación por API Key desplegado en Cloudflare Workers para latencia global menor a 60ms.",
    tech: ["TypeScript", "Hono", "Drizzle ORM", "Cloudflare Workers", "Cloudflare D1", "Vue.js"],
    demo: "https://shorturl-roldyoran.vercel.app/",
    github: "https://github.com/roldyoran/shorturl",
    // Image shown in the Projects section. Expected public path includes the 'porfolio' prefix per deployment.
    image: "/portfolio/imgs/url-shortener-roldyoran.webp",
  },
  {
    id: 2,
    name: "Olympic Monitoring Platform",
    nameEs: "Plataforma de Monitoreo Olímpico",
    tagline:
      "Distributed real-time monitoring platform built on GCP with microservices in Go and Rust, gRPC communication, Kafka messaging, Redis caching, and Prometheus/Grafana observability deployed on GKE with auto-scaling.",
    taglineEs:
      "Plataforma distribuida de monitoreo en tiempo real construida en GCP con microservicios en Go y Rust, comunicación gRPC, mensajería Kafka, caché Redis y observabilidad Prometheus/Grafana desplegada en GKE con auto-escalado.",
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
    github: "https://github.com/rodlyoran/gke-k8s-olympic-microservices",
    // Image shown in the Projects section. Expected public path includes the 'porfolio' prefix per deployment.
    image: "/portfolio/imgs/gke-olimpic-platform-roldyoran.webp",
  },
  {
    id: 3,
    name: "Votaciones Antagonista",
    nameEs: "Votaciones Antagonista",
    tagline:
      "Public voting platform for the 50th chapter of Saikomic’s Antagonista with Google OAuth authentication, ranked-vote registration, per-user vote autosave, secure database connectivity, and a polished, user-friendly UI/UX.",
    taglineEs:
      "Plataforma pública de votación para el capítulo 50 de Antagonista de Saikomic con autenticación Google OAuth, registro de votos por ranking, autoguardado por usuario, conexión segura a base de datos y una UI/UX profesional y agradable.",
    tech: ["Astro", "React", "Tailwind CSS", "TypeScript", "Turso"],
    demo: "https://votaciones-antagonista.vercel.app/",
    github: "https://github.com/roldyoran/antagonista-site",
    // Image shown in the Projects section. Expected public path includes the 'porfolio' prefix per deployment.
    image: "/portfolio/imgs/antagonita-site-votations-roldyoran.webp",
  },
];

export const skillsData: Skill[] = [
  { name: "Go", category: "Language" },
  { name: "Rust", category: "Language" },
  { name: "TypeScript", category: "Language" },
  { name: "JavaScript", category: "Language" },
  { name: "Python", category: "Language" },
  { name: "React", category: "Frontend" },
  { name: "Astro", category: "Frontend" },
  { name: "Vue.js", category: "Frontend" },
  { name: "Tailwind CSS", category: "Frontend" },
  { name: "FastAPI", category: "Backend" },
  { name: "Hono", category: "Backend" },
  { name: "gRPC", category: "Backend" },
  { name: "PostgreSQL", category: "Database" },
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
];

export const excludedSkills = ["Rust", "Terraform", "JavaScript"];

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
    linkedin: "https://www.linkedin.com/in/edgar-rolando-alvarez-rodriguez-88695839a/",
    github: "https://github.com/roldyoran",
    twitter: "#",
  },
  hero: {
    index: "01",
    role: "DevOps & Systems Engineer",
    roleEs: "Ingeniero de Sistemas y DevOps",
    namePrimary: "Edgar",
    nameAccent: "Alvarez",
    backdrop: "EDGAR",
    description:
      "Final-year Systems Engineering student with experience in backend development and microservices architecture. I work with technologies like Go, Python, TypeScript, Kubernetes, and messaging systems. Focused on distributed systems, cloud computing, and building scalable APIs.",
    descriptionEs:
      "Estudiante de último semestre de Ingeniería en Ciencias y Sistemas con experiencia en desarrollo backend y arquitecturas de microservicios. Trabajo con tecnologías como Go, Python, TypeScript, Kubernetes y sistemas de mensajería. Enfocado en sistemas distribuidos, cloud computing y construcción de APIs escalables.",
    tagline: "Building robust APIs<br />and distributed systems.",
    taglineEs: "Construyendo APIs robustas<br />y sistemas distribuidos.",
    years: "5+",
    focus: "DevOps & Systems Engineering",
    reqDay: "60ms",
    uptime: "99.9%",
  },
  bio: [
    {
      text: "I studied Computer Science and Systems Engineering at USAC. Additionally, I served as a lab teaching assistant for the Operating Systems 1 course for 2 semesters, where I taught students about Linux, Docker, Kubernetes, kernel modules, and virtual machines. My technical focus is on distributed systems, cloud architecture, and building scalable APIs using Go, Python, TypeScript, and Kubernetes.",
    },
  ],
  bioEs: [
    {
      text: "Estudié Ingeniería en Ciencias y Sistemas en la USAC ademas de ello fui auxiliar del laboratorio del curso Sistemas Operativos 1 durante 2 semestres, donde enseñé a los estudiantes sobre Linux, Docker, Kubernetes, módulos del kernel y máquinas virtuales. Mi enfoque técnico está en sistemas distribuidos, arquitectura cloud y construcción de APIs escalables usando Go, Python, TypeScript y Kubernetes.",
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
  };
  return {
    size: sizeByCategory[category] ?? 18,
    class: "text-o",
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
