// _preview/ProjectsList.jsx — filterable grid, case-study vs side-project differentiation.

(function() {
  const { useState, useMemo } = React;
  const { useLocale, t, L, motion, ArrowUpRight, Filter, Sparkles } = window;

  function ProjectCard({ p, onOpen, index }) {
    const { locale } = useLocale();
    const isCase = p.kind === 'case-study';
    const isFeatured = p.featured;
    const accent = isCase ? 'var(--c-terracotta)' : 'var(--c-ocean)';

    return React.createElement('article', {
      tabIndex: 0,
      onClick: () => onOpen(p.slug),
      onKeyDown: (e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); onOpen(p.slug); } },
      'data-event': 'project_view',
      className: [
        'group relative bg-[var(--c-paper-raised)] border border-[var(--c-ink)]',
        'cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-[var(--c-focus)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--c-paper)]',
        'transition-all duration-300',
        'hover:translate-x-[-3px] hover:translate-y-[-3px]',
      ].join(' '),
      style: {
        boxShadow: '4px 4px 0 0 var(--c-ink)',
        gridColumn: isFeatured ? 'span 2' : 'span 1',
      },
      onMouseEnter: (e) => { e.currentTarget.style.boxShadow = `7px 7px 0 0 ${accent}`; },
      onMouseLeave: (e) => { e.currentTarget.style.boxShadow = '4px 4px 0 0 var(--c-ink)'; },
    },
      // Top header strip with kind badge + company + year
      React.createElement('div', {
        className: 'flex items-center justify-between px-4 py-2 border-b border-[var(--c-ink)] bg-[var(--c-paper-sunken)]',
      },
        React.createElement('div', { className: 'flex items-center gap-2 min-w-0' },
          React.createElement('span', {
            className: 'inline-flex items-center gap-1 font-mono text-[10px] uppercase tracking-[0.1em] flex-shrink-0',
            style: { color: accent },
          },
            React.createElement('span', {
              className: 'inline-block w-1.5 h-1.5',
              style: { background: accent, transform: isCase ? 'none' : 'rotate(45deg)' },
            }),
            isCase ? t('badge.caseStudy') : t('badge.sideProject'),
          ),
          isFeatured && React.createElement('span', {
            className: 'inline-flex items-center gap-1 font-mono text-[10px] uppercase tracking-[0.1em] text-[var(--c-terracotta-ink)] border-l border-[var(--c-rule-strong)] pl-2 flex-shrink-0',
          },
            React.createElement(Sparkles, { size: 10 }),
            t('badge.featured'),
          ),
        ),
        React.createElement('div', { className: 'flex items-center gap-2.5 text-[var(--c-ink-muted)] flex-shrink-0' },
          p.company && window.CompanyLogo && React.createElement(window.CompanyLogo, { company: p.company, size: 14 }),
          p.company && React.createElement('span', { 'aria-hidden': true, className: 'inline-block w-px h-3 bg-[var(--c-rule-strong)]' }),
          React.createElement('span', { className: 'font-mono text-[11px] text-[var(--c-ink-soft)]' }, p.year),
        ),
      ),
      // Body
      React.createElement('div', { className: 'p-5 md:p-6' },
        // Visual block — abstract editorial composition per project
        React.createElement(ProjectVisual, { p, isFeatured }),
        // Metric sticker — prominent headline number for every card
        p.primaryMetric && React.createElement(MetricSticker, { metric: p.primaryMetric, accent }),
        // Title + summary
        React.createElement('h3', {
          className: 'font-display text-[22px] md:text-[26px] leading-[1.1] tracking-[-0.01em] text-[var(--c-ink)] mt-5 mb-2 text-balance',
        }, L(p.title)),
        React.createElement('p', {
          className: 'text-[14px] text-[var(--c-ink-muted)] leading-[1.55] text-pretty',
        }, L(p.summary)),
        // Tags
        React.createElement('div', { className: 'mt-4 flex flex-wrap gap-1' },
          ...p.tags.map((tag, i) => React.createElement('span', {
            key: i,
            className: 'inline-flex px-1.5 py-0.5 text-[11px] font-mono uppercase tracking-[0.06em] text-[var(--c-ink-soft)] border border-[var(--c-rule-strong)] rounded-sm',
          }, tag)),
          p.status && React.createElement('span', {
            key: 'status',
            className: 'inline-flex px-1.5 py-0.5 text-[11px] font-mono uppercase tracking-[0.06em] text-[var(--c-ochre)] border border-[var(--c-ochre)] rounded-sm',
          }, t('badge.wip')),
        ),
      ),
      // Bottom CTA strip
      React.createElement('div', {
        className: 'flex items-center justify-between px-4 py-2 border-t border-[var(--c-rule)] bg-[var(--c-paper)] font-mono text-[11px] uppercase tracking-[0.08em] text-[var(--c-ink)]',
      },
        React.createElement('span', null, t('cta.readMore')),
        React.createElement(ArrowUpRight, { size: 14, className: 'transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5' }),
      ),
    );
  }

  // Abstract visual composition per project — geometric, no stock imagery.
  function ProjectVisual({ p, isFeatured }) {
    const isCase = p.kind === 'case-study';
    const compositions = {
      'trustonic-movistar':         { type: 'shield', accent: 'var(--c-terracotta)' },
      'ndc-cocha-travel':           { type: 'flight', accent: 'var(--c-terracotta)' },
      'marketplace-integration-skinautica': { type: 'nodes', accent: 'var(--c-terracotta)' },
      'ai-reporting-skinautica':    { type: 'stack', accent: 'var(--c-terracotta)' },
      'finanzas-flow':              { type: 'bars', accent: 'var(--c-ocean)' },
      'real-estate-chile':          { type: 'map', accent: 'var(--c-ocean)' },
    };
    const c = compositions[p.slug] || { type: 'stack', accent: isCase ? 'var(--c-terracotta)' : 'var(--c-ocean)' };
    const h = isFeatured ? 200 : 140;

    return React.createElement('div', {
      className: 'relative w-full bg-[var(--c-paper-sunken)] border border-[var(--c-rule)] overflow-hidden',
      style: { height: h },
    },
      React.createElement('svg', {
        viewBox: '0 0 400 200', width: '100%', height: '100%', preserveAspectRatio: 'xMidYMid slice',
      },
        c.type === 'shield' && [
          React.createElement('rect', { key: 'g1', x: 0, y: 0, width: 400, height: 200, fill: 'var(--c-paper-sunken)' }),
          React.createElement('path', { key: 'sh', d: 'M200 30 L300 70 L300 120 Q300 160 200 180 Q100 160 100 120 L100 70 Z',
            fill: 'var(--c-paper-raised)', stroke: 'var(--c-ink)', strokeWidth: 1.5 }),
          React.createElement('path', { key: 'sh2', d: 'M200 40 L290 75 L290 120 Q290 152 200 170 Q110 152 110 120 L110 75 Z',
            fill: c.accent, opacity: 0.15 }),
          React.createElement('text', { key: 't', x: 200, y: 118, textAnchor: 'middle', fontFamily: 'JetBrains Mono, monospace', fontSize: 22, fill: 'var(--c-ink)', fontWeight: 600 }, '€2M'),
          React.createElement('text', { key: 't2', x: 200, y: 138, textAnchor: 'middle', fontFamily: 'JetBrains Mono, monospace', fontSize: 9, fill: 'var(--c-ink-muted)', letterSpacing: 1.2 }, 'PROTECTED'),
        ],
        c.type === 'flight' && [
          React.createElement('rect', { key: 'g', x: 0, y: 0, width: 400, height: 200, fill: 'var(--c-paper-sunken)' }),
          React.createElement('path', { key: 'curve', d: 'M30 160 Q 200 30, 370 110', fill: 'none', stroke: 'var(--c-ink)', strokeWidth: 1, strokeDasharray: '3 3' }),
          React.createElement('circle', { key: 'a', cx: 30, cy: 160, r: 4, fill: 'var(--c-ink)' }),
          React.createElement('circle', { key: 'b', cx: 370, cy: 110, r: 4, fill: c.accent }),
          React.createElement('g', { key: 'plane', transform: 'translate(200 75) rotate(-12)' },
            React.createElement('path', { d: 'M-14 0 L14 0 L8 -4 L-8 -4 Z M-14 0 L14 0 L8 4 L-8 4 Z', fill: 'var(--c-ink)' }),
            React.createElement('rect', { x: -16, y: -1, width: 32, height: 2, fill: 'var(--c-ink)' }),
          ),
          React.createElement('text', { key: 't', x: 200, y: 185, textAnchor: 'middle', fontFamily: 'JetBrains Mono, monospace', fontSize: 10, fill: 'var(--c-ink-muted)', letterSpacing: 1.4 }, 'NDC · DYN. PRICING'),
        ],
        c.type === 'nodes' && [
          React.createElement('rect', { key: 'g', x: 0, y: 0, width: 400, height: 200, fill: 'var(--c-paper-sunken)' }),
          ...[ [80,60,'BSALE'], [200,40,'SHOPIFY'], [320,80,'ANYMKT'], [120,150,'WALMART'], [280,150,'BI'] ].map(([x,y,lbl], i) => [
            React.createElement('circle', { key: 'c'+i, cx: x, cy: y, r: 22, fill: 'var(--c-paper-raised)', stroke: i === 0 ? c.accent : 'var(--c-ink)', strokeWidth: i === 0 ? 2 : 1 }),
            React.createElement('text', { key: 't'+i, x, y: y+2, textAnchor: 'middle', fontFamily: 'JetBrains Mono, monospace', fontSize: 8, fill: 'var(--c-ink)', fontWeight: 600 }, lbl),
          ]).flat(),
          ...[ [80,60,200,40], [200,40,320,80], [80,60,120,150], [320,80,280,150], [200,40,280,150], [120,150,280,150] ].map(([x1,y1,x2,y2], i) =>
            React.createElement('line', { key: 'l'+i, x1, y1, x2, y2, stroke: 'var(--c-ink)', strokeWidth: 0.6, opacity: 0.5 })),
        ],
        c.type === 'stack' && [
          React.createElement('rect', { key: 'g', x: 0, y: 0, width: 400, height: 200, fill: 'var(--c-paper-sunken)' }),
          // stacked "data → insight" frames with offset
          ...[0,1,2,3].map(i => React.createElement('rect', {
            key: 'f'+i, x: 60 + i*22, y: 30 + i*16, width: 220, height: 100, fill: 'var(--c-paper-raised)', stroke: i === 3 ? c.accent : 'var(--c-ink)', strokeWidth: i === 3 ? 1.5 : 0.8, opacity: i === 3 ? 1 : 0.6,
          })),
          React.createElement('text', { key: 't', x: 282, y: 153, textAnchor: 'start', fontFamily: 'JetBrains Mono, monospace', fontSize: 9, fill: 'var(--c-ink-muted)', letterSpacing: 1.2 }, '◐ Claude'),
          React.createElement('text', { key: 't2', x: 282, y: 168, textAnchor: 'start', fontFamily: 'JetBrains Mono, monospace', fontSize: 22, fill: 'var(--c-ink)', fontWeight: 600 }, '-60%'),
        ],
        c.type === 'bars' && [
          React.createElement('rect', { key: 'g', x: 0, y: 0, width: 400, height: 200, fill: 'var(--c-paper-sunken)' }),
          // bank icons + bar series
          ...[40,90,140].map((x, i) => React.createElement('g', { key: 'b'+i, transform: `translate(${x} 50)` },
            React.createElement('rect', { width: 32, height: 24, fill: 'var(--c-paper-raised)', stroke: 'var(--c-ink)', strokeWidth: 1 }),
            React.createElement('text', { x: 16, y: 16, textAnchor: 'middle', fontFamily: 'JetBrains Mono, monospace', fontSize: 8, fill: 'var(--c-ink)' }, ['BICE','SAN','FAL'][i]),
          )),
          // bars
          ...[100,140,80,160,120,180,90,140,110].map((bh, i) => React.createElement('rect', {
            key: 'bar'+i, x: 30 + i*38, y: 200 - bh*0.35, width: 24, height: bh*0.35,
            fill: i % 3 === 0 ? c.accent : 'var(--c-ink)', opacity: i % 3 === 0 ? 0.95 : 0.7,
          })),
        ],
        c.type === 'map' && [
          React.createElement('rect', { key: 'g', x: 0, y: 0, width: 400, height: 200, fill: 'var(--c-paper-sunken)' }),
          // grid
          ...[0,1,2,3,4,5].map(i => React.createElement('line', { key: 'gx'+i, x1: i*70, y1: 0, x2: i*70, y2: 200, stroke: 'var(--c-rule)', strokeWidth: 0.5 })),
          ...[0,1,2,3].map(i => React.createElement('line', { key: 'gy'+i, x1: 0, y1: i*50, x2: 400, y2: i*50, stroke: 'var(--c-rule)', strokeWidth: 0.5 })),
          // pins
          ...[[80,60,9],[150,90,7],[220,50,8],[280,130,10],[330,80,6],[120,150,5],[200,170,9],[290,40,8]].map(([x,y,r], i) =>
            React.createElement('circle', { key: 'p'+i, cx: x, cy: y, r, fill: r >= 9 ? c.accent : 'var(--c-ink)', opacity: r >= 9 ? 0.85 : 0.55 })),
          React.createElement('text', { key: 't', x: 380, y: 192, textAnchor: 'end', fontFamily: 'JetBrains Mono, monospace', fontSize: 9, fill: 'var(--c-ink-muted)', letterSpacing: 1 }, 'SCL · CAP RATE'),
        ],
      ),
    );
  }

  function ProjectsList({ navigate, allKindFilter = true }) {
    const { locale } = useLocale();
    const projects = window.__PROJECTS;
    const [filter, setFilter] = useState('all'); // 'all' | 'case-study' | 'side-project' | tag

    // Filter chip set: kinds + featured tags
    const tags = useMemo(() => {
      const s = new Set();
      projects.forEach(p => p.tags.forEach(t => s.add(t)));
      return Array.from(s).sort();
    }, [projects]);

    const filtered = useMemo(() => {
      if (filter === 'all') return projects;
      if (filter === 'case-study' || filter === 'side-project') return projects.filter(p => p.kind === filter);
      return projects.filter(p => p.tags.includes(filter));
    }, [filter, projects]);

    const featured = projects.filter(p => p.featured);

    return React.createElement('section', {
      id: 'projects', 'data-screen-label': '/projects',
      className: 'relative max-w-[1240px] mx-auto px-5 md:px-8 lg:px-12 pt-12 md:pt-20 pb-16',
    },
      // Numbered header
      React.createElement('div', { className: 'flex items-baseline gap-3 mb-10 md:mb-12' },
        React.createElement('span', { className: 'font-mono text-xs uppercase tracking-[0.12em] text-[var(--c-ink-soft)]' }, '03 / Projects'),
        React.createElement('span', { className: 'h-px flex-1 bg-[var(--c-rule)]' }),
        React.createElement('span', { className: 'font-mono text-xs uppercase tracking-[0.12em] text-[var(--c-ink-soft)]' }, projects.length + ' · ' + (locale === 'es' ? 'total' : 'total')),
      ),

      React.createElement('div', { className: 'mb-10' },
        React.createElement('h2', { className: 'font-display text-4xl md:text-5xl lg:text-6xl tracking-[-0.01em] text-[var(--c-ink)] leading-[1.02] text-balance' },
          locale === 'es' ? 'Trabajo seleccionado.' : 'Selected work.'
        ),
        React.createElement('p', { className: 'mt-3 text-[15px] md:text-[17px] text-[var(--c-ink-muted)] max-w-[680px] text-pretty' },
          locale === 'es'
            ? 'Cuatro case studies de implementaciones con impacto medible, y dos side projects donde experimento con stack propio.'
            : 'Four case studies of implementations with measurable impact, plus two side projects where I experiment with my own stack.'
        ),
      ),

      // Filter strip
      React.createElement('div', { className: 'flex flex-wrap items-center gap-2 mb-8 pb-6 border-b border-[var(--c-rule)]' },
        React.createElement('span', { className: 'inline-flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-[0.1em] text-[var(--c-ink-soft)] mr-2' },
          React.createElement(Filter, { size: 11 }),
          t('section.filterBy'),
        ),
        ...[
          ['all', t('section.all'), null],
          ['case-study', t('badge.caseStudy'), 'var(--c-terracotta)'],
          ['side-project', t('badge.sideProject'), 'var(--c-ocean)'],
        ].map(([key, label, dot]) => React.createElement(FilterChip, {
          key, label, active: filter === key, onClick: () => setFilter(key), dot,
        })),
        React.createElement('span', { className: 'inline-block w-px h-4 bg-[var(--c-rule)] mx-1' }),
        ...tags.slice(0, 6).map(tag => React.createElement(FilterChip, {
          key: tag, label: tag, active: filter === tag, onClick: () => setFilter(tag), mono: true,
        })),
      ),

      // Grid
      filtered.length === 0
        ? React.createElement('div', { className: 'py-16 text-center text-[var(--c-ink-muted)]' }, t('section.nothing'))
        : React.createElement('div', {
            className: 'grid sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 auto-rows-auto',
          },
            ...filtered.map((p, i) => React.createElement(ProjectCard, {
              key: p.slug, p, index: i, onOpen: (slug) => navigate('/projects/' + slug),
            })),
          ),
    );
  }

  function FilterChip({ label, active, onClick, dot, mono }) {
    return React.createElement('button', {
      onClick,
      className: [
        'inline-flex items-center gap-1.5 px-2.5 h-7 border text-[12px] rounded-sm transition-colors',
        mono ? 'font-mono uppercase tracking-[0.06em] text-[11px]' : '',
        active
          ? 'bg-[var(--c-ink)] text-[var(--c-paper)] border-[var(--c-ink)]'
          : 'bg-transparent text-[var(--c-ink-muted)] border-[var(--c-rule-strong)] hover:text-[var(--c-ink)] hover:border-[var(--c-ink)]',
      ].join(' '),
    },
      dot && React.createElement('span', { className: 'inline-block w-1.5 h-1.5', style: { background: dot, transform: label === 'Side project' || label === 'Side projects' ? 'rotate(45deg)' : 'none' } }),
      label,
    );
  }

  // Skeleton for projects list (loading state)
  function ProjectsListSkeleton() {
    return React.createElement('section', { className: 'max-w-[1240px] mx-auto px-5 md:px-8 lg:px-12 py-12' },
      React.createElement('div', { className: 'grid sm:grid-cols-2 lg:grid-cols-3 gap-6' },
        ...Array.from({ length: 6 }).map((_, i) => React.createElement('div', {
          key: i, className: 'border border-[var(--c-rule)] bg-[var(--c-paper-raised)] h-[380px] animate-pulse',
        })),
      ),
    );
  }

  // Metric sticker — prominent headline number rendered between visual and title.
  // Same pattern across all cards: vertical accent strip · big serif value · mono caps label.
  function MetricSticker({ metric, accent }) {
    return React.createElement('div', {
      className: 'mt-4 flex items-stretch border-t border-b border-[var(--c-rule-strong)] bg-[var(--c-paper-sunken)]',
    },
      React.createElement('span', {
        'aria-hidden': true,
        className: 'block w-[3px] flex-shrink-0',
        style: { background: accent },
      }),
      React.createElement('div', {
        className: 'flex items-baseline justify-between gap-4 px-4 py-2.5 flex-1 min-w-0',
      },
        React.createElement('span', {
          className: 'font-display text-[26px] md:text-[30px] leading-[1] tracking-[-0.02em] text-[var(--c-ink)]',
        }, metric.value),
        React.createElement('span', {
          className: 'font-mono text-[10px] uppercase tracking-[0.12em] text-[var(--c-ink-muted)] text-right truncate',
        }, window.L(metric.label)),
      ),
    );
  }

  Object.assign(window, { ProjectsList, ProjectsListSkeleton, ProjectCard });
})();
