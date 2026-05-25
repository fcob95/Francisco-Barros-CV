---
description: Migra la integración de diseño de una versión a la siguiente, preservando wirings, vía bump-design-version.
argument-hint: <fromVersion> <toVersion> (ej. v1 v2)
---

Migra la integración de diseño de $1 a $2.

Usa el subagente `design-integrator` aplicando la skill `bump-design-version`. Diffea
`design-assets/$1/` vs `design-assets/$2/`, identifica secciones afectadas, re-porta **solo el
presentacional** de las que cambiaron y **preserva los contenedores** (data/analytics/i18n). Si los
tokens cambiaron, re-portalos al bloque `@theme` de `app/globals.css`. Reporta cambios aplicados y posibles regresiones
(visual, a11y, presupuesto JS) y haz checkpoint conmigo antes de commit. `design-assets/$1/` se conserva.
