# CLAUDE.md — design-assets/

**Input READ-ONLY.** Assets de diseño generados en Claude.ai (frontend-design), versionados por carpeta
(`v1/`, `v2/`, ...).

## Reglas inviolables

- **NUNCA se edita** ningún archivo dentro de `design-assets/`. Si un asset tiene un problema, se
  documenta y se corrige en la sesión de Claude.ai (nueva versión), no aquí.
- **NUNCA se importa** desde `app/` o `components/`. Los assets **se portan** (copian y adaptan a
  `components/sections/`), **no se referencian**.
- Solo `design-integrator` lo lee, vía las skills `integrate-design-section` / `bump-design-version`.
- Si un asset **viola el contrato** (formato de §7 del DESIGN_BRIEF, inventa campos fuera de §3, usa
  libs fuera del inventario §4, anima sin `prefers-reduced-motion`): `design-integrator` lo **rechaza
  con explicación**. No lo arregla en silencio ni edita la carpeta.

## Formato esperado

Ver `design-assets/README.md` y `DESIGN_BRIEF.md` §7. Cada versión: una carpeta por sección con el
`.tsx` presentacional + `README.md`, más `design-tokens.ts` en la raíz de la versión.

## Por qué read-only

Separa la fuente del diseño (Claude.ai) de su integración (Claude Code). Permite versionar, diffear
(`bump-design`) y conservar historia (`v1/` se preserva al pasar a `v2/`) sin acoplar producción a la
forma cruda del asset.
