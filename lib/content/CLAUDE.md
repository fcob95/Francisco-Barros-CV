# CLAUDE.md — lib/content/

Capa de acceso al contenido tipado. Aísla al resto de la app del origen del dato.

## Scope

`schemas.ts` (Zod), `index.ts` (funciones de acceso: `getProfile`, `getProjects`, `getProject(slug)`,
`getExperience`). Lee de `content/`.

## Reglas inviolables

- **Validación Zod en el borde:** todo dato que sale de `content/` se valida al leerse. Fail fast con
  error descriptivo si un campo falta o el shape no calza.
- **Shape isomorfo a Sanity:** nombres de campo y forma replican lo que serían documentos Sanity.
  Campo localizable = `{ es: string, en: string }`. Imagen = `{ src, alt: {es,en}, width, height }`.
  Esto hace que la migración futura (ADR-002) sea mapeo mecánico, no refactor.
- Las funciones devuelven tipos derivados de los schemas Zod (`z.infer`), no `any`.
- Helper de localización (`pick(locale, field)`) centralizado aquí; no resolver `{es,en}` ad-hoc.

## Patrones canónicos

- Un schema Zod por entidad; tipo exportado vía `z.infer`.
- Funciones de acceso async-ready (firma `Promise`) aunque hoy lean de TS, para que el swap a Sanity no
  cambie el contrato de los consumidores.

## Anti-patrones

Devolver data sin validar · resolver locale fuera de esta capa · acoplar consumidores al formato de
archivo de `content/`.
