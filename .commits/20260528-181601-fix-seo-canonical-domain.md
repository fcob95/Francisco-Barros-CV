# Commit 20260528-181601

**Type**: fix
**Scope**: lib/seo
**Triviality**: non-trivial
**Validated by user**: yes

## Summary

fix(seo): default SITE_URL to the real production domain (canonical/sitemap)

## What changed

- `lib/seo/site.ts`: the `SITE_URL` fallback (used when `NEXT_PUBLIC_SITE_URL` is
  unset) changed from the obsolete placeholder `https://franciscobarros.cl` to the
  real production origin `https://www.franciscobarroscruz.com`. The env var still
  overrides it when present.

## Files modified

- `lib/seo/site.ts`: fallback origin + comment.
- `PROGRESS.md`: decision 6 updated (domain).

## Implementation notes

The live prod deploy had `NEXT_PUBLIC_SITE_URL` unset in Vercel, so the sitemap,
canonical, hreflang and OG URLs were emitting `franciscobarros.cl` — a domain the
site doesn't serve. That points Google's canonical at the wrong origin and blocks
proper indexing of franciscobarroscruz.com. Hardcoding the real domain as the
fallback fixes SEO by default, independent of the Vercel env. Used the `www` host
(the Production domain shown in Vercel); a one-token change if the primary turns
out to be the apex. site.test.ts stubs the env, so the fallback change doesn't
affect tests (57 pass).

## Tests

typecheck + test (57) green; e2e via CI.

## Risks / Notes

- Canonical host (www vs apex) must match Vercel's primary domain. Set to www per
  the Vercel Production domain; confirm in Settings → Domains.
- PostHog/Resend env vars in Vercel are still required for contact + analytics
  (separate from this SEO fix).
