---
name: bump-design-version
description: Actualiza la integración de diseño de vN a v(N+1) — diffea las dos versiones, re-porta solo el presentacional de las secciones que cambiaron y preserva los wirings (data/analytics/i18n). Se activa desde /bump-design.
---

# bump-design-version

Migra la integración de una versión de diseño a la siguiente sin regenerar wirings desde cero. Lo
ejecuta `design-integrator`. Checkpoint antes de commit.

## Precondición

Existen `design-assets/vN/` y `design-assets/v(N+1)/`. La nueva versión cumple el contrato.

## Pasos

1. **Diff** entre `design-assets/vN/` y `design-assets/v(N+1)/` por sección y en `design-tokens.ts`.
2. **Identificar secciones afectadas** (cambiadas, nuevas, eliminadas).
3. Para cada sección **cambiada**: re-portar **solo el presentacional** (`components/sections/
   <Section>.tsx`), respetando el patrón. **No tocar el contenedor** (`.container.tsx`) salvo que el
   shape de props cambie — en ese caso, ajustar el mínimo y documentarlo.
4. Para cada sección **nueva**: ejecutar `integrate-design-section` completa.
5. **Preservar** wirings de data y analytics existentes (no regenerar contenedores).
6. Si `design-tokens.ts` cambió: re-portar los tokens al bloque `@theme` de `app/globals.css` y
   verificar regresiones de estilo.
7. **Reportar** cambios aplicados, secciones tocadas y posibles regresiones (visual, a11y, presupuesto JS).

## Regla clave

El valor del patrón presentacional + contenedor es que este proceso toca casi solo presentacionales.
Si un bump exige reescribir contenedores masivamente, es señal de que el shape de datos cambió → escalar.

## Salida

Presentacionales actualizados, tokens sincronizados, reporte de cambios y regresiones.
