# Commit 20260528-135847

**Type**: chore
**Scope**: repo root (license, readme, gitignore)
**Triviality**: non-trivial
**Validated by user**: yes

## Summary

chore: prep repo for public — MIT LICENSE, README showcase, untrack internal docs

## What changed

- Added `LICENSE` (MIT, © 2026 Francisco Barros Cruz) with a scope note: MIT covers
  source code only; personal content (CV/bio/projects/photo/branding in content/,
  messages/, public/) is all-rights-reserved.
- README: stronger showcase intro (production-ready stack + the custom Claude Code
  orchestrator framed as a deliberate feature) + a Licencia section.
- Untracked the internal/personal working docs so they stay local but out of the
  public repo: `TODO_MANUALES.md` (git rm --cached) and `SECURITY_AUDIT.md` (was
  untracked); both added to `.gitignore`.

## Files modified

- `LICENSE`: new (MIT + content note).
- `README.md`: showcase intro + Licencia section.
- `.gitignore`: ignore TODO_MANUALES.md + SECURITY_AUDIT.md.
- `TODO_MANUALES.md`: untracked (kept on disk for Francisco's reference).

## Implementation notes

TODO_MANUALES/SECURITY_AUDIT carry no secrets (keys live only in .env.local, which
is gitignored). They're removed for professionalism/curation, not security. The
`.claude/` orchestrator and process docs (PLAN/PROGRESS/STATUS/DESIGN_BRIEF/.commits)
are deliberately KEPT — they are the on-brand differentiator for an AI-tooling
builder and demonstrate engineering rigor.

## Tests

N/A (docs/config only). App build unaffected.

## Risks / Notes

- TODO_MANUALES.md remains in earlier branch history (this branch is unpushed; the
  file has no secrets, so its presence in local history is low-risk).
- Deploy still requires manual steps (push to GitHub, Vercel env vars, Resend sender
  verification) — see the deploy checklist; not code-blocking.
