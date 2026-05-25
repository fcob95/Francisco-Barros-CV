---
name: add-portfolio-project
description: Agrega un proyecto al portafolio — crea la entrada tipada bilingüe en content/projects, validada por Zod, que aparece en la lista y el detalle con el evento project_view ya conectado. Se activa desde /new-project.
---

# add-portfolio-project

Agrega un proyecto nuevo al portafolio. Lo ejecuta `data-layer` (contenido) con apoyo de
`design-integrator` si hay que verificar el wiring de sección. Una entrada validada, bilingüe.

## Pasos

1. **Crear** `content/projects/<slug>.ts` siguiendo el schema `ProjectDetail` de
   `lib/content/schemas.ts`.
2. **Completar campos bilingües** (`{ es, en }`) no vacíos: `title`, `summary`, `role`, `problem`,
   `solution`, `impact`, `metrics[].label`. Numéricos/listas: `year`, `tags`, `stack`, `links`.
3. **Imágenes**: `heroImage` y `gallery` en `/public`; campo `Image` con `alt:{es,en}`, `width`,
   `height`.
4. **Validar** con Zod (el hook `check-content-localized` verifica paridad; `pnpm typecheck`).
5. **Verificar** que aparece en `/projects` (card) y `/projects/<slug>` (detalle) y que el evento
   `project_view` se dispara (ya wirado en la sección Projects).
6. Si el proyecto necesita un campo que no existe en el schema → escalar (toca `DESIGN_BRIEF.md` §3).

## Salida

`content/projects/<slug>.ts` válido, visible en lista y detalle, con tracking conectado.
