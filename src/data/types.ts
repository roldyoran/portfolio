export interface SocialLinks {
  linkedin: string;
  github: string;
  twitter: string;
}

export interface Hero {
  index: string;
  role: string;
  roleEs: string;
  namePrimary: string;
  nameAccent: string;
  backdrop: string;
  description: string;
  descriptionEs: string;
  tagline: string;
  taglineEs: string;
  years: string;
  focus: string;
  /** Legacy placeholder for tagline templates; prefer `focus` */
  products?: string;
  reqDay: string;
  uptime: string;
}

export interface Bio {
  text: string;
  textEs?: string;
}

export interface GithubStats {
  yearsExp: number;
  repos: number;
  contributions: number;
  followers: number;
}

export interface Config {
  name: string;
  title: string;
  /** Spanish page title segment; falls back to `title` when omitted */
  titleEs?: string;
  githubUsername: string;
  location: string;
  locationEs: string;
  available: boolean;
  email: string;
  social: SocialLinks;
  hero: Hero;
  bio: Bio[];
  bioEs: Bio[];
  marquee: string[];
  githubStats: GithubStats;
}

export interface Period {
  start: string;
  startEs: string;
  end: string;
  endEs: string;
}

export interface Experience {
  id: number;
  company: string;
  location: string;
  role: string;
  roleEs: string;
  period: Period;
  description: string;
  descriptionEs: string;
  tech: string[];
  link?: string;
}

export interface Project {
  id: number;
  name: string;
  nameEs: string;
  tagline: string;
  taglineEs: string;
  tech: string[];
  demo: string | null;
  github: string;
}

export type SkillCategory =
  | "Language"
  | "Frontend"
  | "Backend"
  | "Database"
  | "DevOps"
  | "Cloud";

export interface Skill {
  name: string;
  category: SkillCategory;
}

export interface SkillWithIcon extends Skill {
  icon: any;
  iconProps: {
    size: number;
    class: string;
  };
}

export type IconMap = Record<string, any>;

export type IconProps = {
  size: number;
  class: string;
};