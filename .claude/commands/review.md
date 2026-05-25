---
description: Revisión crítica del diff actual contra los CLAUDE.md, NFRs y convenciones, vía el subagente code-reviewer.
allowed-tools: Bash(git diff:*), Bash(git status:*)
---

Invoca el subagente `code-reviewer` para revisar los cambios actuales antes de commit.

Diff staged/working actual:
!`git diff HEAD`

Revisa contra los `CLAUDE.md` aplicables, los NFRs de `PLAN.md` y las convenciones del proyecto.
Reporta por severidad (bloqueante / debería / nice-to-have) con `archivo:línea` y el porqué. Corre
`pnpm lint`, `pnpm typecheck` y `pnpm test` si el proyecto está bootstrapeado. Da un veredicto claro:
listo para commit o no. Sé crítico, no complaciente.
