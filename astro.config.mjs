// @ts-check
import { defineConfig, fontProviders } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  site: 'https://roldyoran.github.io',
  base: '/portfolio',
  i18n: {
    defaultLocale: 'es',
    locales: ['en', 'es'],
    routing: {
      strategy: 'pathname-prefix-other-locale',
      prefixDefaultLocale: false,
    },
  },
  fonts: [
    {
      name: 'Bebas Neue',
      cssVariable: '--font-big',
      provider: fontProviders.local(),
      options: {
        variants: [
          {
            weight: 400,
            style: 'normal',
            src: ['./src/assets/fonts/BebasNeue-Regular.woff2'],
          },
        ],
      },
    },
    {
      name: 'Space Grotesk',
      cssVariable: '--font-sans',
      provider: fontProviders.local(),
      options: {
        variants: [
          {
            weight: 300,
            style: 'normal',
            src: ['./src/assets/fonts/SpaceGrotesk-Light.woff2'],
          },
          {
            weight: 400,
            style: 'normal',
            src: ['./src/assets/fonts/SpaceGrotesk-Regular.woff2'],
          },
          {
            weight: 500,
            style: 'normal',
            src: ['./src/assets/fonts/SpaceGrotesk-Medium.woff2'],
          },
          {
            weight: 600,
            style: 'normal',
            src: ['./src/assets/fonts/SpaceGrotesk-SemiBold.woff2'],
          },
          {
            weight: 700,
            style: 'normal',
            src: ['./src/assets/fonts/SpaceGrotesk-Bold.woff2'],
          },
        ],
      },
    },
    {
      name: 'Geist Mono',
      cssVariable: '--font-mono',
      provider: fontProviders.local(),
      options: {
        variants: [
          {
            weight: 400,
            style: 'normal',
            src: ['./src/assets/fonts/GeistMono-Regular.woff2'],
          },
          {
            weight: 500,
            style: 'normal',
            src: ['./src/assets/fonts/GeistMono-Medium.woff2'],
          },
          {
            weight: 700,
            style: 'normal',
            src: ['./src/assets/fonts/GeistMono-Bold.woff2'],
          },
          {
            weight: 900,
            style: 'normal',
            src: ['./src/assets/fonts/GeistMono-Black.woff2'],
          },
        ],
      },
    },
  ],
  integrations: [
    sitemap({
      i18n: {
        defaultLocale: 'es',
        locales: {
          es: 'es',
          en: 'en',
        },
      },
    }),
  ],
  vite: {
    plugins: [tailwindcss()],
    resolve: {
      alias: {
        '@': new URL('./src', import.meta.url).pathname,
      },
    },
  },
});
