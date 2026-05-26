# Commit 20260526-131814

**Type**: docs
**Scope**: PROGRESS.md
**Triviality**: trivial
**Validated by user**: no (auto-committed)

## Summary

docs: align stale F0 process note in PROGRESS.md with actual closed state

## What changed

- Reescrita la frase final de la "Nota de proceso" que aún afirmaba que la ceremonia formal de F0
  estaba pendiente, contradiciendo el encabezado "F0 ✅ cerrada".

## Files modified

- `PROGRESS.md`: la nota ahora indica que la ceremonia formal (git/hooks/CI/ruleset) se completó vía
  PR #1 (`7722e97`) con CI verde y `main` protegido (ref. decisión 13); se conserva la nota solo como
  aprendizaje de proceso.

## Implementation notes

Edición de una sola frase. Sin duplicar la decisión 13 (solo se referencia). Es la limpieza del nit
detectado en la auditoría; abre la rama `feat/f1-content-layer` donde luego se ejecuta F1.

## Tests

None (cambio solo de documentación).

## Risks / Notes

None.
