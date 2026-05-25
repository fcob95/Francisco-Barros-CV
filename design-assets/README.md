# design-assets/ — contrato de uso

Carpeta **read-only** con los assets de diseño generados en Claude.ai. Gobernada por
`design-assets/CLAUDE.md`. Esto define el formato y el flujo; las reglas duras están en el CLAUDE.md.

## Versionado

- Una carpeta por versión: `v1/`, `v2/`, ... **Nunca se sobrescribe** una versión existente.
- `v1/` se conserva como referencia histórica al pasar a `v2/`.
- Iterar = nueva carpeta + `/bump-design vN v(N+1)`.

## Estructura de una versión

```
design-assets/v1/
├─ design-tokens.ts          # colores, tipografías, spacing, radios → se portan a @theme (app/globals.css)
├─ hero/
│  ├─ Hero.tsx               # presentacional, props tipados según DESIGN_BRIEF §3, strings t("key")
│  ├─ README.md              # qué hace, props, notas
│  └─ preview.png            # opcional
├─ projects-list/  ...
├─ project-detail/ ...
├─ about/          ...
├─ experience/     ...
└─ contact/        ...
```

## Qué se permite

- Componentes TSX presentacionales, Tailwind core utilities, Framer Motion, lucide-react.
- Props tipados según los shapes del DESIGN_BRIEF §3.
- Strings provisionales como `t("key")` (marcadores de i18n, sin traducir).

## Qué NO se permite (motivo de rechazo en integración)

- Lógica de fetch o acceso a datos dentro del asset.
- Campos inventados fuera de §3 del DESIGN_BRIEF.
- Librerías UI fuera del inventario (§4) o WebGL/R3F en v1.
- Strings hardcodeados en un solo idioma.
- Animaciones sin `prefers-reduced-motion`.

## Flujo de integración

`/integrate-design v1` → `design-integrator` aplica `integrate-design-section` por sección: porta a
`components/sections/` (presentacional + contenedor), wirea data/analytics/i18n/a11y. Las desviaciones
se marcan con `// DESIGN-DEVIATION: <razón>`.
