# Portfolio

Sitio estático personal hecho con [Astro](https://astro.build), Tailwind CSS v4 y animaciones con [Motion](https://motion.dev). Contenido en inglés (`/`) y español (`/es/`).

## Estructura

```text
src/
├── components/     # UI en kebab-case; home.astro agrupa la landing
├── data/           # content.ts (todo el portfolio) + types.ts
├── i18n/           # idiomas y textos de interfaz
├── layouts/        # layout.astro (HTML, meta, hreflang)
├── lib/            # get-github-stats (fetch en build)
├── pages/          # index.astro y es/index.astro (solo Layout + Home)
├── scripts/        # home-motion.ts (Motion en cliente)
├── styles/         # global.css (@theme Tailwind)
└── assets/
```

## Requisitos

- Node.js **>= 22.12.0** (ver `package.json` → `engines`)

## Comandos

| Comando        | Acción                          |
| -------------- | ------------------------------- |
| `pnpm install` | Instala dependencias            |
| `pnpm dev`     | Servidor de desarrollo (4321)  |
| `pnpm build`   | Genera el sitio en `./dist/`    |
| `pnpm preview` | Previsualiza el build local     |

## Personalización

- **Todo en un solo archivo:** [`src/data/content.ts`](src/data/content.ts) — perfil, hero, bio, marquee, experiencia, proyectos, lista de skills, exclusiones, mapa de iconos técnicos y derivados (`skillsWithIcons`, `marqueeTechIcons`, etc.).
- Tipos compartidos: [`src/data/types.ts`](src/data/types.ts)
- Cadenas de UI (nav, botones, secciones): [`src/i18n/ui.ts`](src/i18n/ui.ts)

## Documentación para asistentes

Convenciones y detalle de arquitectura: [`AGENTS.md`](AGENTS.md).
