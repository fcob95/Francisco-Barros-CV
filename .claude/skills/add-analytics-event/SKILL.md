---
name: add-analytics-event
description: Declara un evento de analytics nuevo de forma tipada — registro en lib/analytics/events.ts, helper de captura, wiring en el componente y documentación en DESIGN_BRIEF §6. Se activa al instrumentar una interacción nueva.
---

# add-analytics-event

Agrega un evento de PostHog tipado y lo conecta. Lo ejecuta `design-integrator` (o `frontend-builder`
si es de layout). Mantiene el catálogo de eventos como única fuente.

## Pasos

1. **Declarar** el evento en `lib/analytics/events.ts`: nombre (snake_case) + tipo del payload. Sin PII.
2. **Exponer** un helper tipado (`track.<evento>(payload)`), no `posthog.capture` con strings sueltos.
3. **Wirear** en la interacción correspondiente (componente de `components/sections/` o `layout/`).
   Si el evento es async, asegurar estado visual (loading/post-click).
4. **Respetar consentimiento**: el evento no se captura si el visitante no consintió / hizo opt-out.
5. **Documentar** el evento en `DESIGN_BRIEF.md` §6 (tabla de injection points) para mantener el brief
   alineado con la implementación.
6. **Verificar** que el evento aparece en PostHog en dev.

## Salida

Evento tipado en el catálogo, helper, wiring conectado, brief actualizado.
