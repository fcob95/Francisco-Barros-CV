# CLAUDE.md — lib/analytics/

Integración con PostHog. Eventos tipados y consentimiento.

## Scope

`events.ts` (catálogo tipado de eventos + payloads), `posthog.ts` (init/provider gobernado por
consentimiento), helpers de captura.

## Reglas inviolables

- **Eventos tipados:** todo evento se declara en `events.ts` con su payload. Los componentes capturan
  vía estos helpers, **nunca** llaman a `posthog.capture` con strings sueltos.
- **Consentimiento gobierna el init:** PostHog no arranca sin consentimiento (banner bloqueante).
  Respetar opt-out.
- **Sin PII cruda:** no enviar email, nombre ni IP en claro en propiedades de eventos. PostHog deriva
  geo país/ciudad pero se configura para **descartar la IP cruda** (`$ip`); no se persiste (ADR-007).
- Catálogo de eventos refleja `DESIGN_BRIEF.md` §6: `document_download`, `project_view`,
  `project_link_click`, `locale_switch`, `contact_submit`, `scroll_depth`, `time_on_page`.

## Patrones canónicos

- `track.projectView({ slug })` en vez de `capture("project_view", ...)`.
- Nuevos eventos vía skill `add-analytics-event` (registro + wiring + doc en brief).

## Anti-patrones

Eventos no declarados · capturar antes del consentimiento · PII en propiedades · Google Analytics.
