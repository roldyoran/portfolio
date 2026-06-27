export const languages = {
  en: 'English',
  es: 'Español',
} as const;

export type Lang = keyof typeof languages;

export const defaultLang: Lang = 'es';

export function getLangFromUrl(url: URL): Lang {
  const [, lang] = url.pathname.split('/');
  if (lang in languages) return lang as Lang;
  return defaultLang;
}

export function getPathForLang(path: string, lang: Lang): string {
  const cleanPath = path.replace(/^\//, '').replace(/^es\//, '');
  if (lang === defaultLang) return cleanPath ? `/${cleanPath}` : '/';
  return `/es/${cleanPath}`;
}