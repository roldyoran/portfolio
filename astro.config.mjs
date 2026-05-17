// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  site: 'https://roldyoran.github.io',
  base: '/portfolio',
  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'es'],
    routing: {
      strategy: 'pathname-prefix-other-locale',
      prefixDefaultLocale: false,
    },
  },
  integrations: [sitemap()],
  vite: {
    plugins: [tailwindcss()],
    resolve: {
      alias: {
        '@': new URL('./src', import.meta.url).pathname,
      },
    },
  },
});
