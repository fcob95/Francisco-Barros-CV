# Commit 20260529-102214

**Type**: chore
**Scope**: i18n (hero)
**Triviality**: trivial (copy change, user-requested)
**Validated by user**: yes

## Summary

chore(i18n): hero pillar bullet "Pricing dinámico (NDC)" → "Gobernanza de precios"

## What changed

- `messages/es.json` / `messages/en.json`: `hero.pillar1Bullet3`
  "Pricing dinámico (NDC)" / "Dynamic pricing (NDC)" →
  "Gobernanza de precios" / "Price governance".

## Files modified

- `messages/es.json`, `messages/en.json` (ES/EN parity kept).

## Implementation notes

Chose "Gobernanza de precios" over "Estrategia de precios" (Francisco's other
option) because the pillar is already titled "Pricing Strategy" — "Estrategia de
precios" would duplicate the title; "price governance" adds a distinct capability.

## Tests

test (57) green; i18n parity hook green.

## Risks / Notes

None — copy-only change.
