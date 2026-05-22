# Portfolio

Sitio web personal construido con Astro, Tailwind CSS v4 y Motion. Soporta inglés (`/`) y español (`/es/`).

Rápido inicio

- Requisitos: Node ≥ 22.12.0
- Instalar dependencias: bun install (o npm install / pnpm install)
- Desarrollo: bun dev (http://localhost:4321)
- Build: bun build
- Previsualizar: bun preview

Estructura clave

- src/data/content.ts — contenido principal (perfil, proyectos, experiencia, skills)
- src/components/* — componentes UI (kebab-case)
- src/scripts/* — lógica cliente (Motion, descargas)
- src/styles/global.css — tokens y estilos globales

Notas rápidas

- Mantén todo el contenido en src/data/content.ts para editar el sitio.
- Usa la convención de nombres y utilidades Tailwind según AGENTS.md.

Más detalles y convenciones: AGENTS.md
