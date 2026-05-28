# TODO_MANUALES.md — tareas que solo Francisco puede hacer

> Lista de todo lo que **no puedo hacer yo** (Claude Code) y necesitas hacer tú para dejar el sitio
> andando como corresponde: API keys, secretos, datos personales y archivos. Cada bloque dice **qué**,
> **dónde va** y **paso a paso cómo obtenerlo**.
>
> **Regla de oro de dónde poner cada cosa:**
>
> - **Secretos y config de servidor → `.env.local`** (archivo NO versionado, nunca se sube a git).
> - **Datos públicos** (LinkedIn, GitHub, email visible, bio) **→ `content/profile.ts`** (son públicos,
>   no son secretos; van con el contenido, no en variables de entorno).
>
> Estado: ⬜ pendiente · ✅ hecho

---

## 1. Crear `.env.local` ⬜

Es el archivo donde viven las claves. No existe todavía y no se sube a git.

1. En la raíz del proyecto, copia la plantilla:
   - PowerShell: `Copy-Item .env.example .env.local`
2. Ábrelo y ve completando los valores de las secciones siguientes (2, 3).
3. Verifica que `.env.local` está en `.gitignore` (ya debería estarlo). Nunca lo subas.

Variables que contiene (las completas en los pasos siguientes):

```
NEXT_PUBLIC_SITE_URL=https://franciscobarros.cl     # dominio final (puedes dejarlo así por ahora)
NEXT_PUBLIC_POSTHOG_KEY=phc_xxx                      # paso 3
NEXT_PUBLIC_POSTHOG_HOST=https://us.i.posthog.com    # paso 3 (déjalo si tu proyecto es US)
RESEND_API_KEY=re_xxx                                # paso 2
CONTACT_TO_EMAIL=fcobarros95@gmail.com               # paso 2 (dónde te llegan los contactos)
CONTACT_FROM_EMAIL=contact@franciscobarros.cl        # paso 2 (remitente; dominio verificado)
GITHUB_PERSONAL_ACCESS_TOKEN=ghp_xxx                 # opcional, solo dev local
```

---

## 2. Resend — formulario de contacto ⬜ (necesario para el Bloque C de F4)

Resend es el servicio que envía el correo cuando alguien usa tu formulario de contacto. Sin esto, el
formulario se ve pero no envía.

**Cómo obtener la API key:**

1. Entra a https://resend.com y crea una cuenta (gratis hasta 3.000 emails/mes).
2. **Verifica un dominio remitente** (recomendado) o usa el dominio de pruebas de Resend:
   - **Opción A (producción, recomendada):** en _Domains → Add Domain_, agrega `franciscobarros.cl`.
     Resend te dará registros DNS (SPF, DKIM) que debes pegar donde administras tu dominio. Una vez
     verificado, tu remitente puede ser `contact@franciscobarros.cl`.
   - **Opción B (para probar ya, sin dominio):** usa el remitente de onboarding `onboarding@resend.dev`.
     Funciona para pruebas, pero los correos pueden caer en spam. En ese caso pon
     `CONTACT_FROM_EMAIL=onboarding@resend.dev`.
3. En _API Keys → Create API Key_, crea una con permiso _Sending access_. Copia el valor (empieza con `re_`).
4. En `.env.local`:
   - `RESEND_API_KEY=` la key que copiaste.
   - `CONTACT_TO_EMAIL=` el correo **donde quieres recibir** los mensajes (por defecto `fcobarros95@gmail.com`).
   - `CONTACT_FROM_EMAIL=` el remitente (`contact@franciscobarros.cl` si verificaste el dominio, o
     `onboarding@resend.dev` si usas la opción B).

> La key solo se muestra una vez al crearla. Si la pierdes, generas otra.

---

## 3. PostHog — analítica ⬜ (necesario para F6)

PostHog registra visitas y eventos (vistas de proyecto, clicks, descargas de CV, envíos de contacto),
con un banner de consentimiento bloqueante y sin guardar IP cruda.

**Cómo obtener la key:**

1. Entra a https://posthog.com y crea una cuenta (PostHog Cloud).
2. Al crear el proyecto, elige la región **US** o **EU**. Anota cuál, porque define el host.
3. Ve a _Settings → Project → Project API Key_. Copia el valor (empieza con `phc_`).
4. En `.env.local`:
   - `NEXT_PUBLIC_POSTHOG_KEY=` la key `phc_...`.
   - `NEXT_PUBLIC_POSTHOG_HOST=` según tu región:
     - US → `https://us.i.posthog.com`
     - EU → `https://eu.i.posthog.com`

> La key de PostHog es pública por diseño (va en el cliente con prefijo `NEXT_PUBLIC_`). No es un secreto
> como la de Resend, pero igual va en `.env.local` para no hardcodearla.

### 3.1 Descartar la IP cruda (ADR-007) ⬜ — ajuste manual obligatorio

`posthog-js` **no puede** descartar la IP (`$ip`) desde el cliente; es un ajuste del **proyecto** en
PostHog. El código ya hace lo posible del lado cliente (sin autocapture, sin session recording, DNT
respetado, persistencia cookieless en localStorage), pero el descarte de IP **lo tienes que activar tú**:

1. En PostHog, ve a _Settings → Project → General_ (o _Settings → Project settings_ según versión).
2. Busca la opción **"Discard client IP data"** y **actívala**.
3. Con eso PostHog deriva país/ciudad para el geo aproximado pero **no persiste la IP en claro**, que es
   exactamente lo que pide ADR-007. No hace falta tocar código tras activarlo.

> Mientras no actives esto, PostHog guardaría la IP cruda de las visitas. Es el único punto de privacidad
> que no puedo forzar desde el repo.

---

## 4. Datos públicos de perfil → editar `content/profile.ts` ⬜

Estos **no van al `.env`**: son públicos y forman parte del contenido. Dime los valores reales o edítalos tú
directamente. Hoy están con placeholders. Campos a confirmar/corregir en `content/profile.ts`:

- `email` — tu correo público de contacto. **⚠️ Hay 3 valores en juego que debes unificar:** el contenido
  reescrito usa `fcobarros1995@gmail.com` (venía del diseño), pero tu config de git y el `.env.example`
  usan `fcobarros95@gmail.com` (sin el `19`). Dime cuál es el correcto y lo dejo consistente en
  `profile.email`, en el `mailto:` de `socials`, y en `CONTACT_TO_EMAIL` del `.env.local`.
- `socials[].url`:
  - **LinkedIn:** ✅ ya real (`https://www.linkedin.com/in/francisco-jose-barros-cruz/`). Confirma que es la correcta.
  - **GitHub:** ✅ ya real (`https://github.com/fcob95`). Confirma.
  - **email (mailto):** debe calzar con tu `email` público (ver punto del email arriba).
- `location`, `role`, `tagline`, `bio` — revisa que el texto ES/EN te represente.

> Si me pasas los valores reales, los dejo escritos yo. Si prefieres, los editas tú; solo respeta que cada
> campo localizable lleva `{ es, en }`.

---

## 5. CV y avatar → archivos en `public/` ✅ (hecho)

- **CV (PDF):** ✅ ya están en `public/cv/CV_Francisco_Barros_Cruz.pdf` (ES) y `_EN.pdf` (EN); `cvUrl`
  apunta correcto. El botón "Descargar CV" funciona.
- **Avatar / foto:** ✅ tu foto real está en `public/images/avatar.jpeg` y `avatar.src` ya apunta ahí.
- **Imágenes de proyectos:** los visuales SVG por slug se generan solos (no necesitan foto). Si algún día
  quieres imágenes reales para algún proyecto, súbelas y me dices.

---

## 6. Revisar el contenido real de tus proyectos ⬜ (después del Paso 1 del plan)

Voy a reescribir `content/projects/` a tus proyectos reales (Trustonic-Movistar, NDC Cocha, Skinautica
marketplace, Skinautica AI reporting, finanzas, real estate Chile), tomando como borrador los datos del
diseño. **Ese borrador es aproximado.** Necesito que revises y corrijas, porque es tu CV real:

- Métricas (los números: €2M protegidos, -60%, etc. — ¿son correctos?).
- Fechas / períodos de cada proyecto y de la experiencia laboral (`content/experience.ts`).
- Descripciones de problema / solución / impacto.
- Nombres de empresas y si puedes/quieres nombrarlas públicamente.

Te marcaré en el checkpoint del Paso 1 exactamente qué campos quedaron como "borrador a validar".

---

## 7. (Fuera de alcance ahora — anotado para F8/deploy) Dominio y Vercel ⬜

Cuando decidas desplegar (no es parte de este desarrollo hasta F7):

- Cuenta en Vercel + conectar el repo.
- Cargar las mismas variables de `.env.local` en Vercel (Environment Variables).
- Apuntar el dominio `franciscobarros.cl` a Vercel (DNS).

---

## Resumen rápido (qué bloquea qué)

| Tarea                     | Bloquea                               | Urgencia           |
| ------------------------- | ------------------------------------- | ------------------ |
| `.env.local` + Resend (2) | Formulario de contacto (F4 Bloque C)  | Antes del Bloque C |
| PostHog (3)               | Analítica (F6)                        | Antes de F6        |
| Perfil real (4)           | Que el sitio muestre tus datos reales | Cuando puedas      |
| CV/avatar (5)             | Botón "Descargar CV" y foto           | Antes de cerrar F4 |
| Revisar proyectos (6)     | Que el contenido sea verídico         | Tras el Paso 1     |
