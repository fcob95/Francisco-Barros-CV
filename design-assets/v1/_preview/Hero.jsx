// _preview/Hero.jsx — the section that defines the editorial-3D voice.
// Isometric stack of 3 pillars: Pricing Strategy / Revenue Analytics / AI-Augmented Decision Making.
// Massive display name + numbered editorial header.

(function() {
  const { useState, useEffect, useRef } = React;
  const { useLocale, t, L, motion, useReducedMotion,
          ArrowDown, ArrowUpRight, Download, MapPin, Sparkles, TrendingUp, Database } = window;

  // Card data — kept inline since it's intimate to this section.
  function pillars() {
    return [
      {
        key: 'pricing',
        n: '01',
        icon: TrendingUp,
        title: t('hero.pillar1'),
        short: t('hero.pillar1Short'),
        kicker: { es: 'Estrategia', en: 'Strategy' },
        bullets: [
          { es: 'Modelos de elasticidad', en: 'Elasticity models' },
          { es: 'Mix comercial', en: 'Commercial mix' },
          { es: 'Pricing dinámico (NDC)', en: 'Dynamic pricing (NDC)' },
        ],
        accent: 'var(--c-terracotta)',
      },
      {
        key: 'revenue',
        n: '02',
        icon: Database,
        title: t('hero.pillar2'),
        short: t('hero.pillar2Short'),
        kicker: { es: 'Datos', en: 'Data' },
        bullets: [
          { es: 'Dashboards ejecutivos', en: 'Executive dashboards' },
          { es: 'Forecasting & demanda', en: 'Forecasting & demand' },
          { es: 'Rentabilidad por canal', en: 'Channel profitability' },
        ],
        accent: 'var(--c-ocean)',
      },
      {
        key: 'ai',
        n: '03',
        icon: Sparkles,
        title: t('hero.pillar3'),
        short: t('hero.pillar3Short'),
        kicker: { es: 'IA aplicada', en: 'Applied AI' },
        bullets: [
          { es: 'Claude · ChatGPT · Gemini', en: 'Claude · ChatGPT · Gemini' },
          { es: 'Agentes y orquestación', en: 'Agents & orchestration' },
          { es: 'Workflows analíticos', en: 'Analytical workflows' },
        ],
        accent: 'var(--c-ochre)',
      },
    ];
  }

  function PillarCard({ p, index, hovered, setHovered }) {
    const { locale } = useLocale();
    const isHover = hovered === p.key;
    const isOther = hovered != null && !isHover;
    // Isometric layout — each card offset diagonally
    const baseX = index * 38;
    const baseY = index * -28;
    const baseRotate = -6 + index * 1.2;
    const Ic = p.icon;

    return React.createElement('div', {
      onMouseEnter: () => setHovered(p.key),
      onMouseLeave: () => setHovered(null),
      onFocus: () => setHovered(p.key),
      onBlur: () => setHovered(null),
      tabIndex: 0,
      style: {
        transform: `translate(${baseX}px, ${baseY}px) rotate(${baseRotate}deg) ${isHover ? 'translateY(-12px) scale(1.04)' : ''} ${isOther ? 'scale(0.96)' : ''}`,
        transition: 'transform 380ms cubic-bezier(.32,.72,0,1), box-shadow 280ms ease, opacity 280ms ease',
        zIndex: 10 + index + (isHover ? 20 : 0),
        opacity: isOther ? 0.55 : 1,
        boxShadow: isHover
          ? `10px 10px 0 0 ${p.accent}, 0 18px 40px -12px rgba(28,25,23,.22)`
          : `5px 5px 0 0 var(--c-ink), 0 4px 12px -6px rgba(28,25,23,.16)`,
      },
      className: 'absolute top-0 left-0 w-[260px] md:w-[300px] bg-[var(--c-paper-raised)] border border-[var(--c-ink)] outline-none focus-visible:ring-2 focus-visible:ring-[var(--c-focus)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--c-paper)] cursor-pointer',
    },
      // Card header strip
      React.createElement('div', { className: 'flex items-center justify-between px-4 py-2 border-b border-[var(--c-ink)] bg-[var(--c-paper-sunken)]' },
        React.createElement('span', { className: 'font-mono text-[10px] uppercase tracking-[0.12em] text-[var(--c-ink)]' }, p.n + ' · ' + L(p.kicker)),
        React.createElement('span', {
          className: 'inline-flex items-center justify-center w-6 h-6 rounded-full',
          style: { background: p.accent, color: '#fff' },
        }, React.createElement(Ic, { size: 13, strokeWidth: 2 })),
      ),
      // Card body
      React.createElement('div', { className: 'p-5' },
        React.createElement('h3', {
          className: 'font-display text-[26px] leading-[1.05] tracking-[-0.01em] text-[var(--c-ink)] mb-3 text-balance',
        }, p.title),
        React.createElement('ul', { className: 'space-y-1.5' },
          ...p.bullets.map((b, i) => React.createElement('li', {
            key: i, className: 'flex items-start gap-2 text-[13px] text-[var(--c-ink-muted)]',
          },
            React.createElement('span', { className: 'inline-block w-3 h-px bg-[var(--c-ink-muted)] mt-2.5 flex-shrink-0' }),
            React.createElement('span', null, L(b)),
          )),
        ),
      ),
      // Footer hint
      React.createElement('div', { className: 'flex items-center justify-between px-4 py-2 border-t border-[var(--c-rule)] font-mono text-[10px] uppercase tracking-[0.1em] text-[var(--c-ink-soft)]' },
        React.createElement('span', null, p.short),
        React.createElement('span', null, '↗'),
      ),
    );
  }

  function Hero({ navigate }) {
    const { locale } = useLocale();
    const profile = window.__PROFILE;
    const [hovered, setHovered] = useState(null);
    const reduce = useReducedMotion();
    const cvHref = profile.cvUrl[locale] ?? profile.cvUrl.es;

    const ps = pillars();

    return React.createElement('section', {
      id: 'home', 'data-screen-label': '/', className: 'relative overflow-hidden',
    },
      // Decorative grid lines
      React.createElement('div', {
        'aria-hidden': true,
        className: 'pointer-events-none absolute inset-0 opacity-[0.45]',
        style: {
          backgroundImage: 'linear-gradient(to right, var(--c-rule) 1px, transparent 1px)',
          backgroundSize: '120px 100%',
          maskImage: 'linear-gradient(to bottom, transparent, black 20%, black 70%, transparent)',
        },
      }),

      React.createElement('div', { className: 'relative max-w-[1240px] mx-auto px-5 md:px-8 lg:px-12 pt-12 md:pt-16 pb-20 md:pb-32' },
        // Numbered editorial header
        React.createElement('div', { className: 'flex items-baseline gap-3 mb-10 md:mb-16' },
          React.createElement('span', { className: 'font-mono text-xs uppercase tracking-[0.12em] text-[var(--c-ink-soft)]' }, '01 / Home'),
          React.createElement('span', { className: 'h-px flex-1 bg-[var(--c-rule)]' }),
          React.createElement('span', { className: 'font-mono text-xs uppercase tracking-[0.12em] text-[var(--c-ink-soft)]' }, t('hero.kicker')),
        ),

        // Name + tagline column + isometric stack column
        React.createElement('div', { className: 'grid lg:grid-cols-12 gap-8 lg:gap-12 items-start' },
          // Left: name & tagline (7 cols on lg)
          React.createElement('div', { className: 'lg:col-span-7' },
            // Location strip
            React.createElement('div', { className: 'inline-flex items-center gap-2 mb-5 font-mono text-[11px] uppercase tracking-[0.1em] text-[var(--c-ink-soft)]' },
              React.createElement(MapPin, { size: 12 }),
              React.createElement('span', null, profile.location),
              React.createElement('span', { className: 'inline-block w-1.5 h-1.5 rounded-full bg-[var(--c-success)] animate-pulse', style: { animationDuration: '2.4s' } }),
              React.createElement('span', null, locale === 'es' ? 'Disponible para proyectos' : 'Open for projects'),
            ),

            // Massive display name with editorial layered effect
            React.createElement('h1', {
              className: 'font-display tracking-[-0.025em] text-[var(--c-ink)] leading-[0.92] text-balance',
              style: { fontSize: 'clamp(48px, 7.6vw, 102px)' },
            },
              React.createElement('span', { className: 'block' }, 'Francisco'),
              React.createElement('span', { className: 'block relative' },
                React.createElement('span', null, 'Barros'),
                // Layered 3D shadow word (subtle, behind)
                React.createElement('span', {
                  'aria-hidden': true,
                  className: 'absolute left-0 top-0 text-[var(--c-ink)] -z-10',
                  style: { transform: 'translate(7px, 7px)', opacity: 0.08 },
                }, 'Barros'),
              ),
              React.createElement('span', { className: 'block' },
                'Cruz',
                React.createElement('span', { className: 'text-[var(--c-terracotta)] ml-1' }, '.'),
              ),
            ),

            // Tagline (voz humana)
            React.createElement('p', {
              className: 'mt-6 md:mt-8 text-[15px] md:text-[17px] text-[var(--c-ink-muted)] max-w-[560px] text-pretty leading-relaxed',
            }, L(profile.tagline)),

            // Stats line (data concreta)
            React.createElement('p', {
              className: 'mt-3 text-[13px] md:text-[14px] text-[var(--c-ink)] max-w-[560px] text-pretty leading-relaxed font-medium',
            }, L(profile.stats)),

            // CTAs
            React.createElement('div', { className: 'mt-8 flex flex-wrap items-center gap-3' },
              React.createElement('button', {
                onClick: () => navigate('/projects'),
                className: 'group inline-flex items-center gap-2 h-12 px-5 bg-[var(--c-ink)] text-[var(--c-paper)] font-medium hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[6px_6px_0_0_var(--c-terracotta)] transition-all rounded-sm',
              },
                t('cta.viewProjects'),
                React.createElement(ArrowUpRight, { size: 16 }),
              ),
              React.createElement('a', {
                href: cvHref, download: true,
                'data-event': 'document_download', 'data-id': 'cv',
                className: 'inline-flex items-center gap-2 h-12 px-5 border border-[var(--c-ink)] text-[var(--c-ink)] hover:bg-[var(--c-ink)] hover:text-[var(--c-paper)] transition-colors rounded-sm',
              },
                React.createElement(Download, { size: 15 }),
                t('cta.downloadCv'),
                React.createElement('span', { className: 'font-mono text-[10px] opacity-60' }, locale === 'es' ? '/ ES' : '/ EN'),
              ),
              React.createElement('button', {
                onClick: () => navigate('/contact'),
                className: 'inline-flex items-center gap-2 h-12 px-3 text-[var(--c-ink-muted)] hover:text-[var(--c-ink)] underline-offset-4 hover:underline',
              }, t('cta.contact')),
            ),

            // Trust signals — companies (monocromo)
            React.createElement('div', {
              className: 'mt-10 flex items-center gap-5 flex-wrap',
            },
              React.createElement('span', { className: 'font-mono text-[10px] uppercase tracking-[0.14em] text-[var(--c-ink-soft)]' },
                locale === 'es' ? 'Experiencia en' : 'Experience at'),
              React.createElement('div', { className: 'flex items-center gap-6 text-[var(--c-ink-muted)]' },
                ...profile.trustCompanies.map(c => React.createElement(window.CompanyLogo, { key: c, company: c, size: 16 })),
              ),
            ),
          ),

          // Right: isometric pillar stack (5 cols on lg)
          React.createElement('div', { className: 'lg:col-span-5' },
            React.createElement('div', {
              className: 'relative mx-auto lg:mx-0',
              style: { width: 380, height: 320, perspective: '1200px' },
            },
              // Backdrop hairline frame
              React.createElement('div', {
                'aria-hidden': true,
                className: 'absolute inset-0 border border-[var(--c-rule)]',
                style: { transform: 'translate(-12px, 12px)' },
              }),
              React.createElement('div', {
                'aria-hidden': true,
                className: 'absolute -top-3 -left-3 font-mono text-[10px] uppercase tracking-[0.12em] text-[var(--c-ink-soft)]',
              }, locale === 'es' ? 'Pilares ↘' : 'Pillars ↘'),

              ...ps.map((p, i) => React.createElement(PillarCard, {
                key: p.key, p, index: i, hovered, setHovered,
              })),
            ),
          ),
        ),

        // Scroll indicator
        React.createElement('div', {
          className: 'mt-16 md:mt-24 flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.1em] text-[var(--c-ink-soft)]',
        },
          React.createElement(ArrowDown, { size: 12, className: reduce ? '' : 'animate-bounce', style: { animationDuration: '1.6s' } }),
          React.createElement('span', null, t('hero.scroll')),
        ),
      ),
    );
  }

  Object.assign(window, { Hero });
})();
