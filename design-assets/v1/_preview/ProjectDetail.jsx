// _preview/ProjectDetail.jsx

(function() {
  const { useLocale, t, L, ArrowLeft, ArrowUpRight, Github, Code, Sparkles } = window;

  function ProjectDetail({ slug, navigate }) {
    const projects = window.__PROJECTS;
    const p = projects.find(x => x.slug === slug) || projects[0];
    const { locale } = useLocale();
    const isCase = p.kind === 'case-study';
    const accent = isCase ? 'var(--c-terracotta)' : 'var(--c-ocean)';

    return React.createElement('article', {
      id: 'project-detail', 'data-screen-label': '/projects/[slug]',
      className: 'relative max-w-[1240px] mx-auto px-5 md:px-8 lg:px-12 pt-8 md:pt-12 pb-16',
    },
      // Back link
      React.createElement('button', {
        onClick: () => navigate('/projects'),
        className: 'inline-flex items-center gap-1.5 text-sm text-[var(--c-ink-muted)] hover:text-[var(--c-ink)] mb-10',
      },
        React.createElement(ArrowLeft, { size: 14 }),
        t('cta.backToProjects'),
      ),

      // Numbered header
      React.createElement('div', { className: 'flex items-baseline gap-3 mb-6' },
        React.createElement('span', { className: 'font-mono text-xs uppercase tracking-[0.12em]', style: { color: accent } },
          (isCase ? t('badge.caseStudy') : t('badge.sideProject')),
        ),
        React.createElement('span', { className: 'h-px flex-1 bg-[var(--c-rule)]' }),
        React.createElement('span', { className: 'font-mono text-xs uppercase tracking-[0.12em] text-[var(--c-ink-soft)]' }, p.year + ' · ' + L(p.role)),
      ),

      // Title
      React.createElement('header', { className: 'mb-12 md:mb-16' },
        React.createElement('h1', {
          className: 'font-display text-4xl md:text-6xl lg:text-7xl tracking-[-0.02em] text-[var(--c-ink)] leading-[1.02] text-balance',
        }, L(p.title)),
        React.createElement('p', {
          className: 'mt-4 text-[17px] md:text-[19px] text-[var(--c-ink-muted)] max-w-[760px] text-pretty leading-relaxed',
        }, L(p.summary)),
        // Tags + status
        React.createElement('div', { className: 'mt-6 flex flex-wrap gap-1.5' },
          ...p.tags.map((tag, i) => React.createElement('span', {
            key: i, className: 'inline-flex px-2 py-0.5 text-[12px] font-mono uppercase tracking-[0.06em] text-[var(--c-ink-soft)] border border-[var(--c-rule-strong)] rounded-sm',
          }, tag)),
          p.status && React.createElement('span', {
            className: 'inline-flex px-2 py-0.5 text-[12px] font-mono uppercase tracking-[0.06em] text-[var(--c-ochre)] border border-[var(--c-ochre)] rounded-sm',
          }, t('badge.wip')),
        ),
      ),

      // Hero image (placeholder — abstract editorial composition)
      React.createElement('div', {
        className: 'relative w-full mb-12 md:mb-16 border border-[var(--c-ink)] bg-[var(--c-paper-raised)] overflow-hidden',
        style: { aspectRatio: '16 / 7' },
      },
        React.createElement('svg', { viewBox: '0 0 1600 700', className: 'w-full h-full', 'aria-hidden': true },
          React.createElement('rect', { width: 1600, height: 700, fill: 'var(--c-paper-sunken)' }),
          // editorial composition
          React.createElement('g', { transform: 'translate(200 100)' },
            React.createElement('rect', { width: 600, height: 400, fill: 'var(--c-paper-raised)', stroke: 'var(--c-ink)', strokeWidth: 2 }),
            React.createElement('rect', { x: 30, y: 30, width: 600, height: 400, fill: 'none', stroke: accent, strokeWidth: 2, opacity: 0.6 }),
          ),
          React.createElement('g', { transform: 'translate(900 80)' },
            React.createElement('circle', { cx: 250, cy: 250, r: 220, fill: 'none', stroke: 'var(--c-ink)', strokeWidth: 1 }),
            React.createElement('circle', { cx: 250, cy: 250, r: 160, fill: 'none', stroke: 'var(--c-ink)', strokeWidth: 1 }),
            React.createElement('circle', { cx: 250, cy: 250, r: 100, fill: accent, opacity: 0.85 }),
            React.createElement('text', { x: 250, y: 258, textAnchor: 'middle', fontFamily: 'Instrument Serif, serif', fontSize: 64, fill: 'var(--c-paper)' }, p.year),
          ),
          React.createElement('text', { x: 60, y: 660, fontFamily: 'JetBrains Mono, monospace', fontSize: 18, fill: 'var(--c-ink-muted)', letterSpacing: 2 }, 'CASE STUDY · ' + p.slug.toUpperCase()),
        ),
      ),

      // Two-column meta + content
      React.createElement('div', { className: 'grid lg:grid-cols-12 gap-8 lg:gap-12 mb-16' },
        // Sticky meta
        React.createElement('aside', { className: 'lg:col-span-3' },
          React.createElement('div', { className: 'lg:sticky lg:top-24 space-y-6' },
            React.createElement(MetaBlock, { label: t('section.role'), value: L(p.role) }),
            React.createElement(MetaBlock, { label: t('section.year'), value: p.year + '' }),
            React.createElement(MetaBlock, { label: t('section.stack'), value: p.stack.join(' · ') }),
            (p.links?.repo || p.links?.demo) && React.createElement('div', { className: 'pt-4 border-t border-[var(--c-rule)] space-y-2' },
              p.links?.repo && React.createElement('a', {
                href: p.links.repo, target: '_blank', rel: 'noopener noreferrer',
                'data-event': 'project_link_click', 'data-target': 'repo',
                className: 'flex items-center justify-between text-[13px] text-[var(--c-ink)] hover:text-[var(--c-terracotta-ink)]',
              },
                React.createElement('span', { className: 'inline-flex items-center gap-2' },
                  React.createElement(Github, { size: 14 }), t('cta.viewRepo')),
                React.createElement(ArrowUpRight, { size: 14 }),
              ),
              p.links?.demo && React.createElement('a', {
                href: p.links.demo, target: '_blank', rel: 'noopener noreferrer',
                'data-event': 'project_link_click', 'data-target': 'demo',
                className: 'flex items-center justify-between text-[13px] text-[var(--c-ink)] hover:text-[var(--c-terracotta-ink)]',
              },
                React.createElement('span', { className: 'inline-flex items-center gap-2' },
                  React.createElement(Code, { size: 14 }), t('cta.viewDemo')),
                React.createElement(ArrowUpRight, { size: 14 }),
              ),
            ),
          ),
        ),
        // Main content
        React.createElement('div', { className: 'lg:col-span-9 space-y-12' },
          React.createElement(Block, { num: '01', label: t('section.problem'), body: L(p.problem) }),
          React.createElement(Block, { num: '02', label: t('section.solution'), body: L(p.solution) }),
          React.createElement(Block, { num: '03', label: t('section.impact'), body: L(p.impact), accent }),
          // Metrics
          p.metrics?.length > 0 && React.createElement('div', null,
            React.createElement('div', { className: 'flex items-baseline gap-3 mb-5' },
              React.createElement('span', { className: 'font-mono text-[11px] uppercase tracking-[0.12em] text-[var(--c-ink-soft)]' }, '04'),
              React.createElement('h2', { className: 'font-display text-2xl md:text-3xl tracking-[-0.01em]' }, t('section.metrics')),
            ),
            React.createElement('div', { className: 'grid sm:grid-cols-3 gap-px bg-[var(--c-rule)] border border-[var(--c-rule)]' },
              ...p.metrics.map((m, i) => React.createElement('div', {
                key: i, className: 'bg-[var(--c-paper-raised)] p-6',
              },
                React.createElement('div', {
                  className: 'font-display text-[40px] md:text-[48px] leading-none tracking-[-0.02em] text-[var(--c-ink)]',
                  style: i === 0 ? { color: accent } : null,
                }, m.value),
                React.createElement('div', { className: 'mt-2 font-mono text-[11px] uppercase tracking-[0.08em] text-[var(--c-ink-soft)]' }, L(m.label)),
              )),
            ),
          ),
        ),
      ),

      // Footer nav between projects
      React.createElement('nav', { className: 'flex items-center justify-between pt-8 border-t border-[var(--c-rule)]' },
        React.createElement('button', {
          onClick: () => navigate('/projects'),
          className: 'inline-flex items-center gap-2 text-[var(--c-ink-muted)] hover:text-[var(--c-ink)]',
        },
          React.createElement(ArrowLeft, { size: 14 }),
          React.createElement('span', null, t('cta.backToProjects')),
        ),
        React.createElement('button', {
          onClick: () => navigate('/contact'),
          className: 'inline-flex items-center gap-2 h-11 px-5 bg-[var(--c-ink)] text-[var(--c-paper)] hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[6px_6px_0_0_var(--c-terracotta)] transition-all rounded-sm',
        },
          t('cta.contact'),
          React.createElement(ArrowUpRight, { size: 14 }),
        ),
      ),
    );
  }

  function MetaBlock({ label, value }) {
    return React.createElement('div', null,
      React.createElement('div', { className: 'font-mono text-[10px] uppercase tracking-[0.12em] text-[var(--c-ink-soft)] mb-1' }, label),
      React.createElement('div', { className: 'text-[14px] text-[var(--c-ink)]' }, value),
    );
  }

  function Block({ num, label, body, accent }) {
    return React.createElement('div', null,
      React.createElement('div', { className: 'flex items-baseline gap-3 mb-4' },
        React.createElement('span', { className: 'font-mono text-[11px] uppercase tracking-[0.12em] text-[var(--c-ink-soft)]' }, num),
        React.createElement('h2', { className: 'font-display text-2xl md:text-3xl tracking-[-0.01em]', style: accent ? { color: accent } : null }, label),
      ),
      React.createElement('p', { className: 'text-[16px] md:text-[17px] leading-[1.65] text-[var(--c-ink-muted)] text-pretty max-w-[680px]' }, body),
    );
  }

  Object.assign(window, { ProjectDetail });
})();
