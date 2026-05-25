---
name: integrate-design-section
description: Proceso canónico para portar un asset de design-assets/vN/<section>/ a producción — wirea data, analytics PostHog, i18n y a11y con el patrón presentacional + contenedor. Se activa al integrar una sección de diseño (F4) o desde /integrate-design.
---

# integrate-design-section

Porta UNA sección de diseño a producción. Lo ejecuta `design-integrator`. Una sección a la vez;
checkpoint al final.

## Precondición

El asset existe en `design-assets/vN/<section>/` y cumple el contrato (`design-assets/CLAUDE.md`,
`DESIGN_BRIEF.md` §7). Si no cumple → **rechazar con explicación**, no integrar.

## Pasos

1. **Leer el asset** de `design-assets/vN/<section>/` (componente + README). Entender props y estados.
2. **Identificar la query de contenido**: cruzar las props con los schemas de `lib/content`. Si el
   asset asume un campo inexistente → **parar y escalar a Francisco** (no inventar el campo).
3. **Crear el presentacional** `components/sections/<Section>.tsx`: copia casi literal del asset, recibe
   todo por props, sin fetch. Marca desviaciones con `// DESIGN-DEVIATION: <razón>`.
4. **Crear el contenedor** `components/sections/<Section>.container.tsx` (Server Component): lee data de
   `lib/content`, resuelve locale, pasa props al presentacional.
5. **Identificar eventos analytics** a inyectar cruzando con `DESIGN_BRIEF.md` §6.
6. **Conectar tracking** en las interacciones vía `lib/analytics` (helpers tipados, no `capture` inline).
   Asegurar estados loading/post-click donde el evento es async.
7. **Mover strings a i18n**: cada `t("key")` del asset → claves reales en `messages/es.json` y
   `messages/en.json`. Delegar paridad/traducción (i18n).
8. **Verificar a11y**: roles/`aria-*`/focus de los primitives shadcn preservados; navegable por teclado.
9. **Test mínimo de wiring**: que el contenedor pasa la data correcta al presentacional (Vitest).
10. **Smoke visual**: render en ambos locales y temas, sin scroll horizontal.
11. **Documentar desviaciones** y reportar en el resumen de la sub-fase.

## Salida

`components/sections/<Section>.tsx` + `.container.tsx`, claves i18n, test de wiring, lista de
desviaciones. Integración en `app/[locale]/`.
