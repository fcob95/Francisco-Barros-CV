---
description: Agrega un proyecto al portafolio (entrada tipada bilingüe) usando la skill add-portfolio-project.
argument-hint: <nombre del proyecto>
---

Agrega un proyecto nuevo al portafolio: $ARGUMENTS

Usa el subagente `data-layer` siguiendo la skill `add-portfolio-project`. Crea
`content/projects/<slug>.ts` conforme al schema `ProjectDetail`, con todos los campos bilingües
`{ es, en }` no vacíos, imágenes en `/public` con `alt:{es,en}`, y valida con Zod + typecheck.
Si me faltan datos del proyecto (título, resumen, problema/solución/impacto, métricas, links, stack,
año, tags, imágenes), pídemelos antes de crear la entrada — no inventes contenido.
