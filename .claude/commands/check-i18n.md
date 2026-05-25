---
description: Verifica paridad de claves ES/EN en messages/ y ausencia de strings hardcodeados en secciones.
---

Verifica la integridad de i18n:

1. Compara las claves de `messages/es.json` y `messages/en.json`: reporta claves faltantes o sobrantes
   en cualquiera de los dos (deben tener exactamente el mismo árbol de claves).
2. Detecta valores vacíos en cualquiera de los dos idiomas.
3. Busca literales de texto ES/EN hardcodeados en `components/sections/**` y `app/[locale]/**` que
   deberían estar en `messages/*.json`.

Reporta hallazgos como lista accionable con `archivo:línea`. Si todo está parejo, dilo en una línea.
