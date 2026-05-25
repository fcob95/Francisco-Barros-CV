// _preview/NotFound.jsx + CookieBanner.jsx + Privacy.jsx + OGImage.jsx

(function() {
  const { useState } = React;
  const { useLocale, t, L, ArrowLeft, Check, X, MapPin } = window;

  // ─── 404 ──────────────────────────────────────────────────────────────────
  function NotFound({ navigate }) {
    const { locale } = useLocale();
    return React.createElement('section', {
      'data-screen-label': '/404',
      className: 'relative max-w-[1240px] mx-auto px-5 md:px-8 lg:px-12 py-24 md:py-40 min-h-[60vh] flex items-center',
    },
      React.createElement('div', { className: 'grid lg:grid-cols-12 gap-8 items-center w-full' },
        React.createElement('div', { className: 'lg:col-span-7' },
          React.createElement('div', { className: 'font-mono text-xs uppercase tracking-[0.12em] text-[var(--c-terracotta-ink)] mb-3' },
            'Error · 404'),
          React.createElement('h1', {
            className: 'font-display tracking-[-0.025em] text-[var(--c-ink)] leading-[0.92]',
            style: { fontSize: 'clamp(64px, 12vw, 160px)' },
          }, t('notFound.title') + '.'),
          React.createElement('p', { className: 'mt-4 text-[16px] md:text-[18px] text-[var(--c-ink-muted)] max-w-[520px] text-pretty leading-relaxed' },
            t('notFound.lead')),
          React.createElement('div', { className: 'mt-8 flex flex-wrap items-center gap-3' },
            React.createElement('button', {
              onClick: () => navigate('/'),
              className: 'inline-flex items-center gap-2 h-11 px-5 bg-[var(--c-ink)] text-[var(--c-paper)] hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[6px_6px_0_0_var(--c-terracotta)] transition-all rounded-sm',
            },
              React.createElement(ArrowLeft, { size: 14 }), t('notFound.back')),
            React.createElement('button', {
              onClick: () => navigate('/projects'),
              className: 'inline-flex items-center gap-2 h-11 px-5 border border-[var(--c-ink)] text-[var(--c-ink)] hover:bg-[var(--c-ink)] hover:text-[var(--c-paper)] transition-colors rounded-sm',
            }, locale === 'es' ? 'Ver proyectos' : 'View projects'),
          ),
        ),
        // Big "404" decorative
        React.createElement('div', { className: 'lg:col-span-5 hidden lg:flex justify-end' },
          React.createElement('div', { className: 'relative', style: { fontFamily: 'Instrument Serif, serif', fontSize: 280, lineHeight: 0.85, color: 'var(--c-rule-strong)' } },
            React.createElement('span', { style: { transform: 'translate(0,0)', display: 'block' } }, '404'),
            React.createElement('span', { 'aria-hidden': true, className: 'absolute left-0 top-0 text-[var(--c-terracotta)]', style: { transform: 'translate(8px, 8px)', opacity: 0.10 } }, '404'),
          ),
        ),
      ),
    );
  }

  // ─── Privacy stub page ────────────────────────────────────────────────────
  function Privacy({ navigate }) {
    const { locale } = useLocale();
    return React.createElement('section', {
      'data-screen-label': '/privacy',
      className: 'relative max-w-[720px] mx-auto px-5 md:px-8 lg:px-12 py-16 md:py-24',
    },
      React.createElement('div', { className: 'font-mono text-xs uppercase tracking-[0.12em] text-[var(--c-ink-soft)] mb-3' }, 'Privacy'),
      React.createElement('h1', { className: 'font-display text-4xl md:text-5xl tracking-[-0.02em] mb-6' },
        locale === 'es' ? 'Cómo trato tus datos.' : 'How I handle your data.'),
      React.createElement('div', { className: 'space-y-5 text-[16px] leading-[1.7] text-[var(--c-ink-muted)]' },
        React.createElement('p', null,
          locale === 'es'
            ? 'Uso PostHog para analítica privada de navegación: scroll depth, tiempo en página y eventos básicos (descargas, clics en proyecto, envíos de formulario). No comparto esos datos con terceros, no uso cookies de tracking publicitario y no construyo perfiles personales.'
            : 'I use PostHog for privacy-friendly navigation analytics: scroll depth, time on page and basic events (downloads, project clicks, form submits). I do not share data with third parties, I do not use advertising tracking cookies, and I do not build personal profiles.'
        ),
        React.createElement('p', null,
          locale === 'es'
            ? 'Si rechazas las cookies, solo se guardan las estrictamente necesarias (idioma, tema). Puedes cambiar tu preferencia desde el botón "Cookies" en el footer.'
            : 'If you decline cookies, only strictly necessary ones (language, theme) are stored. You can change your preference from the "Cookies" button in the footer.'
        ),
        React.createElement('p', null,
          locale === 'es'
            ? 'Si me escribes desde el formulario de contacto, tu nombre, correo y mensaje llegan directo a mi inbox y no se almacenan en otro lugar.'
            : 'If you write through the contact form, your name, email and message arrive directly to my inbox and are not stored anywhere else.'
        ),
      ),
      React.createElement('button', {
        onClick: () => navigate('/'),
        className: 'mt-10 inline-flex items-center gap-2 text-[14px] text-[var(--c-ink-muted)] hover:text-[var(--c-ink)]',
      }, React.createElement(ArrowLeft, { size: 14 }), locale === 'es' ? 'Volver' : 'Back'),
    );
  }

  // ─── Cookie banner ────────────────────────────────────────────────────────
  function CookieBanner({ open, onDecide, navigate }) {
    const { locale } = useLocale();
    if (!open) return null;
    return React.createElement('div', {
      role: 'dialog', 'aria-label': 'Cookie consent',
      className: 'fixed bottom-4 right-4 left-4 sm:left-auto sm:max-w-[380px] z-40',
    },
      React.createElement('div', {
        className: 'relative bg-[var(--c-paper-raised)] border border-[var(--c-ink)] p-5',
        style: { boxShadow: '6px 6px 0 0 var(--c-ink)' },
      },
        React.createElement('div', { className: 'flex items-baseline justify-between mb-2' },
          React.createElement('div', { className: 'font-mono text-[10px] uppercase tracking-[0.12em] text-[var(--c-ink-soft)] flex items-center gap-1.5' },
            React.createElement('span', { className: 'inline-block w-1.5 h-1.5 bg-[var(--c-terracotta)]' }),
            t('cookies.title'),
          ),
          React.createElement('button', {
            onClick: () => onDecide('necessary'),
            className: 'text-[var(--c-ink-soft)] hover:text-[var(--c-ink)] -mt-1 -mr-1 p-1',
            'aria-label': 'Close',
          }, React.createElement(X, { size: 14 })),
        ),
        React.createElement('p', { className: 'text-[13px] leading-[1.55] text-[var(--c-ink-muted)] mb-4 text-pretty' },
          t('cookies.body'),
          ' ',
          React.createElement('button', {
            onClick: () => navigate('/privacy'),
            className: 'text-[var(--c-terracotta-ink)] underline-offset-2 hover:underline',
          }, t('cookies.learnMore')),
        ),
        React.createElement('div', { className: 'flex flex-col sm:flex-row gap-2' },
          React.createElement('button', {
            onClick: () => onDecide('accept'),
            className: 'inline-flex items-center justify-center gap-1.5 flex-1 h-10 px-3 bg-[var(--c-ink)] text-[var(--c-paper)] text-[13px] font-medium rounded-sm hover:translate-x-[-1px] hover:translate-y-[-1px] hover:shadow-[3px_3px_0_0_var(--c-terracotta)] transition-all',
          }, React.createElement(Check, { size: 13 }), t('cookies.accept')),
          React.createElement('button', {
            onClick: () => onDecide('necessary'),
            className: 'inline-flex items-center justify-center flex-1 h-10 px-3 border border-[var(--c-rule-strong)] text-[var(--c-ink)] text-[13px] hover:border-[var(--c-ink)] transition-colors rounded-sm',
          }, t('cookies.necessary')),
        ),
      ),
    );
  }

  // ─── OG image template (1200×630) ─────────────────────────────────────────
  function OGImage({ locale = 'es' }) {
    const profile = window.__PROFILE;
    const headline = profile.headline[locale];
    return React.createElement('div', {
      className: 'relative bg-[#f5f1eb] overflow-hidden',
      style: { width: 1200, height: 630, color: '#1c1917', fontFamily: 'Inter, sans-serif' },
    },
      // grid backdrop
      React.createElement('div', {
        'aria-hidden': true,
        className: 'absolute inset-0 opacity-50',
        style: {
          backgroundImage: 'linear-gradient(to right, #e0d8c8 1px, transparent 1px)',
          backgroundSize: '100px 100%',
        },
      }),
      // top kicker bar
      React.createElement('div', { className: 'absolute top-12 left-14 right-14 flex items-center justify-between' },
        React.createElement('div', { className: 'flex items-center gap-3' },
          React.createElement('span', { className: 'inline-block w-3 h-3 bg-[#d4621a]' }),
          React.createElement('span', {
            style: { fontFamily: 'Instrument Serif, serif', fontSize: 30, color: '#1c1917' },
          }, 'Francisco Barros'),
        ),
        React.createElement('span', {
          style: { fontFamily: 'JetBrains Mono, monospace', fontSize: 14, letterSpacing: 2, color: '#78716c', textTransform: 'uppercase' },
        }, 'Portfolio · 2026'),
      ),
      // Massive name
      React.createElement('div', { className: 'absolute', style: { left: 56, top: 140 } },
        React.createElement('div', {
          style: { fontFamily: 'Instrument Serif, serif', fontSize: 130, lineHeight: 0.96, letterSpacing: '-0.025em', color: '#1c1917' },
        },
          React.createElement('div', null, 'Pricing.'),
          React.createElement('div', null, 'Revenue.'),
          React.createElement('div', null, React.createElement('span', null, 'AI'), React.createElement('span', { style: { color: '#d4621a' } }, '.')),
        ),
      ),
      // Right-side pillar stack (mini-isometric)
      React.createElement('div', {
        className: 'absolute',
        style: { right: 56, top: 200, width: 360, height: 280, perspective: '1200px' },
      },
        ...[0,1,2].map(i => React.createElement('div', {
          key: i,
          style: {
            position: 'absolute', top: 0, left: 0, width: 280, height: 90,
            transform: `translate(${i*30}px, ${i*60}px) rotate(${-6 + i*1.2}deg)`,
            background: '#fbf8f3', border: '1.5px solid #1c1917',
            boxShadow: '5px 5px 0 0 ' + ['#d4621a','#0c4a6e','#c89d2c'][i],
            padding: '12px 16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          },
        },
          React.createElement('div', null,
            React.createElement('div', { style: { fontFamily: 'JetBrains Mono, monospace', fontSize: 11, letterSpacing: 1.4, textTransform: 'uppercase', color: '#78716c' } },
              '0' + (i+1)),
            React.createElement('div', { style: { fontFamily: 'Instrument Serif, serif', fontSize: 22, color: '#1c1917' } },
              ['Pricing Strategy','Revenue Analytics','AI-Augmented'][i]),
          ),
          React.createElement('div', {
            style: { width: 28, height: 28, borderRadius: 14, background: ['#d4621a','#0c4a6e','#c89d2c'][i] },
          }),
        )),
      ),
      // Bottom strip
      React.createElement('div', {
        className: 'absolute left-14 right-14',
        style: { bottom: 50, borderTop: '1px solid #1c1917', paddingTop: 16, display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' },
      },
        React.createElement('span', { style: { fontFamily: 'Inter, sans-serif', fontSize: 18, color: '#57534e' } }, headline),
        React.createElement('span', { style: { fontFamily: 'JetBrains Mono, monospace', fontSize: 12, letterSpacing: 1.4, color: '#78716c', textTransform: 'uppercase' } }, 'fcobarroscruz.cl'),
      ),
    );
  }

  Object.assign(window, { NotFound, Privacy, CookieBanner, OGImage });
})();
