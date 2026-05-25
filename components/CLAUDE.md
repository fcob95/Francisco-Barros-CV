# CLAUDE.md — components/

UI. Tres familias: `ui/` (primitives shadcn), `layout/` (header, footer, nav, theme/locale toggles),
`sections/` (secciones portadas del diseño).

## Scope

Componentes reutilizables. `sections/` es el destino de los assets portados desde `design-assets/`.

## Reglas inviolables — patrón presentacional + contenedor

- Cada sección portada se parte en:
  - **Presentacional** (`<Section>.tsx`, `"use client"` si necesita interacción): copia casi literal
    del asset; recibe TODO por props; **sin fetch, sin acceso a datos**.
  - **Contenedor** (`<Section>.container.tsx`, Server Component): lee data de `lib/content`, resuelve
    i18n, inyecta handlers de analytics, pasa props al presentacional.
- `bump-design` re-porta **solo el presentacional**; el contenedor se preserva.
- Strings visibles → `messages/*.json`. Nunca literales ES/EN en JSX.
- Preservar atributos a11y de los primitives shadcn subyacentes (roles, `aria-*`, focus).
- Eventos de analytics: importados de `lib/analytics`, no llamadas inline a PostHog.

## Anti-patrones

Fetch en presentacionales · importar desde `design-assets/` · duplicar primitives que ya existen en
`ui/` · animación sin `prefers-reduced-motion`.
