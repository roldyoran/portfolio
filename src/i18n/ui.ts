import type { Lang } from "./config";

export const ui = {
  en: {
    nav: {
      home: "Home",
      work: "Experience",
      projects: "Projects",
      about: "About",
      contact: "Contact",
    },
    topbar: {
      availableForHire: "Available for hire",
    },
    hero: {
      viewProjects: "View Projects",
      contactMe: "Contact Me",
      downloadCV: "Download CV",
      linkedin: "LinkedIn",
      github: "GitHub",
      copyEmail: "Copy Email",
      copied: "Email Copied!",
      yearsExp: "Years Exp",
      productsShipped: "Repos",
      followers: "Followers",
      contributions: "Contributions",
    },
    experience: {
      title: "Experience",
      subtitle: "Work",
      desc: "",
      docs: "Official Documents",
    },
    projects: {
      title: "Selected",
      subtitle: "Projects",
      desc: "",
      projectImage: "Project Image",
      liveDemo: "Live Demo",
    },
    about: {
      title: "About",
      technology: "Technology",
      category: "Category",
      years: "Years",
      products: "Products",
      users: "Users",
      categories: {
        Language: "Language",
        Frontend: "Frontend",
        Backend: "Backend",
        Database: "Database",
        DevOps: "DevOps",
        Cloud: "Cloud",
      },
    },
    contact: {
      title: "Let's Work",
      subtitle: "",
      highlight: "Together",
      dropLine: "DROP A LINE",
      sendMessage: "Send Message",
    },
    footer: {
      builtWith: "Built with",
      and: "and",
      astro: "Astro",
      tailwind: "Tailwind",
    },
  },
  es: {
    nav: {
      home: "Inicio",
      work: "Experiencia",
      projects: "Proyectos",
      about: "Sobre mí",
      contact: "Contacto",
    },
    topbar: {
      availableForHire: "Disponible para trabajar",
    },
    hero: {
      viewProjects: "Ver Proyectos",
      contactMe: "Contáctame",
      downloadCV: "Descargar CV",
      linkedin: "LinkedIn",
      github: "GitHub",
      copyEmail: "Copiar Email",
      copied: "¡Email Copiado!",
      yearsExp: "Años Exp",
      productsShipped: "Repos",
      followers: "Seguidores",
      contributions: "Contribuciones",
    },
    experience: {
      title: "Experiencia",
      subtitle: "Laboral",
      desc: "",
      docs: "Documentos oficiales",
    },
    projects: {
      title: "Proyectos",
      subtitle: "Seleccionados",
      desc: "",
      projectImage: "Imagen del Proyecto",
      liveDemo: "Demo en Vivo",
    },
    about: {
      title: "Sobre mí",
      technology: "Tecnología",
      category: "Categoría",
      years: "Años",
      products: "Productos",
      users: "Usuarios",
      categories: {
        Language: "Lenguaje",
        Frontend: "Frontend",
        Backend: "Backend",
        Database: "Base de datos",
        DevOps: "DevOps",
        Cloud: "Cloud",
      },
    },
    contact: {
      title: "Trabajemos",
      subtitle: "",
      highlight: "Juntos",
      dropLine: "ENVÍA UN MENSAJE",
      sendMessage: "Enviar Mensaje",
    },
    footer: {
      builtWith: "Hecho con",
      and: "y",
      astro: "Astro",
      tailwind: "Tailwind",
    },
  },
} as const;

export function useTranslations(lang: Lang) {
  return ui[lang];
}

export type Ui = typeof ui.en;
