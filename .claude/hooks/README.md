# .claude/hooks/

Hooks del orquestador, implementados como scripts Node `.mjs` cross-platform. Declarados en
`.claude/settings.json`. Reglas de diseño:

- **Auto-desactivación pre-bootstrap:** cada script hace `exit 0` si falta `package.json` (o el
  artefacto que necesita), para no reventar antes de F0.
- **`exit 2` = feedback a Claude.** En PostToolUse no deshace el edit, pero devuelve el `stderr` para
  que Claude corrija. Se usa para fallas reales (typecheck roto, paridad i18n rota).
- **`shell: true`** en `spawnSync` para resolver `pnpm`/`node` en Windows.

## Scripts

| Script                           | Evento                  | Qué hace                                                                                |
| -------------------------------- | ----------------------- | --------------------------------------------------------------------------------------- |
| `prettier-write.mjs`             | PostToolUse Edit\|Write | Formatea el archivo editado (best-effort, exit 0).                                      |
| `typecheck-file.mjs`             | PostToolUse Edit\|Write | `tsc --noEmit` tras editar `.ts/.tsx`; `exit 2` si falla.                               |
| `check-i18n-parity.mjs`          | PostToolUse Edit\|Write | Si tocaste `messages/(es\|en).json`: paridad de claves + no vacías; `exit 2` si rota.   |
| `check-content-localized.mjs`    | PostToolUse Edit\|Write | Si tocaste `content/**`: heurística de balance `{es,en}`; `exit 2` si desbalance claro. |
| `check-no-hardcoded-strings.mjs` | PostToolUse Edit\|Write | Si tocaste `components/sections/**`: detecta texto JSX hardcodeado; `exit 2` advisory.  |
| `stop-quality.mjs`               | Stop                    | `pnpm lint && pnpm typecheck` (si existen los scripts); `exit 2` si falla.              |
| `log-subagent.mjs`               | SubagentStop            | Loguea término de subagente en `.claude/logs/subagents.log`.                            |

## Decisiones que se desvían del plan original (intencional)

- **Typecheck movido de PreToolUse a PostToolUse.** PreToolUse corre antes de que el edit aterrice:
  validaría contenido viejo y bloquearía escribir el fix de un archivo ya roto. PostToolUse + `exit 2`
  logra el objetivo correctamente.
- **Logging de subagentes en `SubagentStop`** (evento correcto para término de subagente), no en
  `Notification`.
- **Hooks como scripts Node**, no comandos shell inline: cross-platform (Windows) y auto-desactivables.

## Costo conocido

`typecheck-file.mjs` corre `tsc --noEmit` sobre el proyecto en cada edición de `.ts/.tsx`. Es correcto
pero puede ser lento en fases con muchas ediciones. Si molesta, relájalo a correr solo en `Stop`.
