# CLAUDE.md — content/

Contenido del sitio, tipado en TS. Fuente de datos en v1 (no hay CMS externo).

## Scope

`profile.ts`, `projects/*.ts`, `experience.ts`. Editado por Francisco (o vía skill
`add-portfolio-project`). Consumido SOLO a través de `lib/content` (con validación Zod).

## Reglas inviolables

- **`{ es, en }` obligatorio y no vacío** en todo campo localizable. El hook `check-content-localized`
  lo verifica.
- La forma debe calzar con los schemas Zod de `lib/content/schemas.ts`. Si necesitas un campo nuevo,
  primero se agrega al schema (escalar si toca el DESIGN_BRIEF §3).
- **Shape isomorfo a Sanity** (ver `lib/content/CLAUDE.md`): no introducir formatos que dificulten la
  migración mecánica futura.
- Imágenes referenciadas viven en `/public`; el campo `Image` lleva `src, alt:{es,en}, width, height`.

## Anti-patrones

Strings en un solo idioma · contenido fuera de schema · markdown/MDX para proyectos (usar campos
estructurados) · importar este contenido directo desde `app/` o `components/` (va por `lib/content`).
