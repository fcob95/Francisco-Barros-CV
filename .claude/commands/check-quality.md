---
description: Corre lint + typecheck + tests y reporta el resultado sin maquillar.
allowed-tools: Bash(pnpm lint:*), Bash(pnpm typecheck:*), Bash(pnpm test:*)
---

Corre la suite de calidad y reporta honestamente:

1. `pnpm lint`
2. `pnpm typecheck`
3. `pnpm test`

Si algo falla, muestra la salida relevante y NO declares "todo OK". Si el proyecto aún no está
bootstrapeado (sin `package.json`), dilo y detente.
