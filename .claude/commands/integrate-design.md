---
description: Porta todas las secciones de una versión de diseño a producción vía design-integrator + integrate-design-section.
argument-hint: <version> (ej. v1)
---

Integra el diseño de la versión: $ARGUMENTS

Usa el subagente `design-integrator` aplicando la skill `integrate-design-section` sobre cada sección
de `design-assets/$ARGUMENTS/`. Procesa una sección a la vez (Hero → Projects list → Project detalle →
About → Experience → Contact) y haz checkpoint conmigo tras cada una.

Antes de integrar, valida que la versión cumple el contrato (`design-assets/CLAUDE.md`,
`DESIGN_BRIEF.md` §7). Si un asset viola el contrato o asume un campo inexistente en `lib/content`,
**rechaza con explicación y escala** — no lo arregles en silencio ni edites `design-assets/`.
Documenta toda desviación con `// DESIGN-DEVIATION: <razón>`.
