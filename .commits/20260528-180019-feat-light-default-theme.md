# Commit 20260528-180019

**Type**: feat
**Scope**: theming
**Triviality**: non-trivial
**Validated by user**: yes

## Summary

feat(theme): default to light (toggle preserved), drop OS-based theme

## What changed

- `components/theme-provider.tsx`: `defaultTheme` "system" → "light" and
  `enableSystem` → false. Light is now the firm default for first-time visitors,
  independent of the OS color scheme. The header toggle still flips to dark and the
  choice persists in localStorage.

## Files modified

- `components/theme-provider.tsx`: defaults + doc comment.

## Implementation notes

The ported header ThemeToggle only switches light↔dark (never "system"), so dropping
enableSystem removes a now-unused code path and avoids a dark-OS flash on first load.
e2e "header controls" test still passes (light default → toggle exposes "switch to
dark"); Playwright already pins colorScheme light.

## Tests

typecheck / lint / test (57) green locally; e2e via CI.

## Risks / Notes

None. Purely a default-preference change; fully reversible.
