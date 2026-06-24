// _preview/Services.jsx — /servicios section (preview build).
// Mirrors services/Services.tsx + services/services.data.ts.

(function() {
  const { useLocale, t, L, ArrowUpRight, Workflow, Plug, Database, FileBarChart, Sparkles } = window;

  // Inline icon fallbacks for ones not in stubs
  const Ico = (path) => function I({ size = 18 }) {
    return React.createElement('svg', { width: size, height: size, viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: 1.75, strokeLinecap: 'round', strokeLinejoin: 'round' },
      React.createElement('path', { d: path }));
  };
  const WorkflowI = window.Workflow || Ico('M3 3h6v6H3zM15 15h6v6h-6zM9 6h6a3 3 0 013 3v6');
  const PlugI = window.Plug || Ico('M12 2v6M8 6V2M16 6V2M6 10h12v3a6 6 0 01-12 0zM12 19v3');
  const DatabaseI = window.Database;
  const FileBarI = Ico('M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8zM14 2v6h6M8 18v-3M12 18v-6M16 18v-2');
  const SparkI = window.Sparkles;

  const ICONS = { Workflow: WorkflowI, Plug: PlugI, Database: DatabaseI, FileBarChart: FileBarI, Sparkles: SparkI };

  const SERVICES = [
    { slug: 'automatizacion-ia', icon: 'Workflow',
      title: { es: 'Automatización con IA', en: 'AI Automation' },
      description: { es: 'Diseño e implemento automatización con IA para tareas que hoy consumen días-persona: extracción y limpieza de datos, generación de queries, redacción de reportes y orquestación de flujos. Combino Python, SQL y agentes (Claude Code) para que los procesos corran solos y de forma trazable.',
        en: 'I design and implement AI automation for tasks that today burn person-days: data extraction and cleaning, query generation, report drafting and workflow orchestration. I combine Python, SQL and agents (Claude Code) so processes run on their own — and stay traceable.' },
      includes: [
        { es: 'Mapeo de procesos y puntos de automatización', en: 'Process mapping and automation points' },
        { es: 'Pipelines en Python + SQL', en: 'Python + SQL pipelines' },
        { es: 'Orquestación con agentes de IA', en: 'AI agent orchestration' },
        { es: 'Documentación y handoff', en: 'Documentation and handoff' },
      ] },
    { slug: 'integracion-ia', icon: 'Plug',
      title: { es: 'Integración de IA', en: 'AI Integration' },
      description: { es: 'Integro IA generativa (Claude, OpenAI, Gemini) con tus fuentes de datos, ERP, e-commerce y marketplaces. Resuelvo el plumbing — APIs, autenticación, manejo de contexto y costos — para que la IA opere dentro de tu stack y no como una herramienta aislada.',
        en: 'I integrate generative AI (Claude, OpenAI, Gemini) with your data sources, ERP, e-commerce and marketplaces. I solve the plumbing — APIs, auth, context handling and cost — so AI operates inside your stack, not as an isolated tool.' },
      includes: [
        { es: 'Integración con APIs y fuentes multifuente', en: 'API and multi-source integration' },
        { es: 'Manejo de contexto, costos y límites', en: 'Context, cost and rate handling' },
        { es: 'Conexión con ERP / Shopify / marketplaces', en: 'ERP / Shopify / marketplace wiring' },
        { es: 'Gobernanza y calidad de datos', en: 'Data governance and quality' },
      ] },
    { slug: 'sistemas-rag', icon: 'Database',
      title: { es: 'Sistemas RAG', en: 'RAG Systems' },
      description: { es: 'Implemento sistemas RAG (Retrieval-Augmented Generation) que dejan a tu equipo preguntar en lenguaje natural sobre documentos, contratos, reportes y bases de conocimiento internas, con respuestas citadas y verificables. Cubro ingestión, embeddings, recuperación y evaluación.',
        en: 'I implement RAG (Retrieval-Augmented Generation) systems that let your team ask natural-language questions over internal documents, contracts, reports and knowledge bases, with cited and verifiable answers. I cover ingestion, embeddings, retrieval and evaluation.' },
      includes: [
        { es: 'Ingestión y chunking de documentos', en: 'Document ingestion and chunking' },
        { es: 'Embeddings y base vectorial', en: 'Embeddings and vector store' },
        { es: 'Recuperación con citas verificables', en: 'Retrieval with verifiable citations' },
        { es: 'Evaluación de calidad de respuestas', en: 'Answer-quality evaluation' },
      ] },
    { slug: 'reporteria-automatizada', icon: 'FileBarChart',
      title: { es: 'Reportería automatizada', en: 'Automated Reporting' },
      description: { es: 'Construyo reportería automatizada que une SQL, Power BI e IA: ejecuta el cálculo de KPIs y deltas, redacta la narrativa ejecutiva con citas a las celdas y entrega el dashboard y el memo en una sola pasada. En proyectos reales reduje el tiempo de análisis en 60%.',
        en: 'I build automated reporting that joins SQL, Power BI and AI: it runs KPI and delta computation, drafts the executive narrative with citations to the underlying cells, and ships the dashboard and memo in a single pass. In real projects I cut analysis time by 60%.' },
      includes: [
        { es: 'Modelo de KPIs y deltas en SQL', en: 'SQL KPI and delta model' },
        { es: 'Dashboards en Power BI (DAX)', en: 'Power BI dashboards (DAX)' },
        { es: 'Narrativa ejecutiva con IA, citada', en: 'AI executive narrative, cited' },
        { es: 'Programación y entrega recurrente', en: 'Scheduling and recurring delivery' },
      ] },
    { slug: 'consultoria-ia-revenue', icon: 'Sparkles',
      title: { es: 'Consultoría en IA + Revenue', en: 'AI + Revenue Consulting' },
      description: { es: 'Consultoría en inteligencia artificial enfocada en negocio: dónde aplica IA, qué automatizar primero y cómo medir el retorno. Mi diferenciador es el criterio de pricing y revenue analytics — conecto la adopción de IA con decisiones de precio, margen y crecimiento rentable.',
        en: 'Business-focused AI consulting: where AI applies, what to automate first and how to measure return. My differentiator is a pricing and revenue-analytics lens — I connect AI adoption to price, margin and profitable-growth decisions.' },
      includes: [
        { es: 'Diagnóstico de oportunidades de IA', en: 'AI opportunity assessment' },
        { es: 'Roadmap priorizado por impacto', en: 'Impact-prioritized roadmap' },
        { es: 'Modelos de pricing y elasticidad', en: 'Pricing and elasticity models' },
        { es: 'Medición de ROI y revenue', en: 'ROI and revenue measurement' },
      ] },
  ];

  function Services({ navigate }) {
    const { locale } = useLocale();
    return React.createElement('section', {
      id: 'services', 'data-screen-label': '/servicios',
      className: 'relative max-w-[1240px] mx-auto px-5 md:px-8 lg:px-12 pt-12 md:pt-20 pb-16',
    },
      React.createElement('div', { className: 'flex items-baseline gap-3 mb-10 md:mb-12' },
        React.createElement('span', { className: 'font-mono text-xs uppercase tracking-[0.12em] text-[var(--c-ink-soft)]' }, '06 / Servicios'),
        React.createElement('span', { className: 'h-px flex-1 bg-[var(--c-rule)]' }),
        React.createElement('span', { className: 'font-mono text-xs uppercase tracking-[0.12em] text-[var(--c-ink-soft)]' }, SERVICES.length + ' · ' + (locale === 'es' ? 'servicios' : 'services')),
      ),
      React.createElement('header', { className: 'mb-12 md:mb-16 max-w-[820px]' },
        React.createElement('h1', { className: 'font-display text-4xl md:text-5xl lg:text-6xl tracking-[-0.01em] text-[var(--c-ink)] leading-[1.02] text-balance' },
          locale === 'es' ? 'IA aplicada a tu negocio.' : 'Applied AI for your business.'),
        React.createElement('p', { className: 'mt-4 text-[16px] md:text-[18px] text-[var(--c-ink-muted)] text-pretty leading-relaxed' },
          locale === 'es'
            ? 'Automatización con IA, integración de IA, sistemas RAG y reportería automatizada — con el criterio de pricing y revenue analytics como diferenciador.'
            : 'AI automation, AI integration, RAG systems and automated reporting — with a pricing and revenue-analytics lens as the differentiator.'),
      ),
      React.createElement('div', { className: 'space-y-px bg-[var(--c-rule)] border border-[var(--c-rule)]' },
        ...SERVICES.map((s, i) => {
          const Icon = ICONS[s.icon];
          return React.createElement('article', { key: s.slug, id: s.slug, className: 'bg-[var(--c-paper)] p-6 md:p-10 scroll-mt-24' },
            React.createElement('div', { className: 'grid md:grid-cols-12 gap-6 md:gap-10' },
              React.createElement('div', { className: 'md:col-span-4' },
                React.createElement('div', { className: 'flex items-center gap-3 mb-3' },
                  React.createElement('span', { className: 'inline-flex items-center justify-center w-10 h-10 border border-[var(--c-ink)] rounded-sm text-[var(--c-ink)]' },
                    Icon ? React.createElement(Icon, { size: 18 }) : null),
                  React.createElement('span', { className: 'font-mono text-[11px] uppercase tracking-[0.12em] text-[var(--c-ink-soft)]' }, String(i + 1).padStart(2, '0')),
                ),
                React.createElement('h3', { className: 'font-display text-[26px] md:text-[30px] leading-[1.08] tracking-[-0.01em] text-[var(--c-ink)]' }, L(s.title)),
              ),
              React.createElement('div', { className: 'md:col-span-8' },
                React.createElement('p', { className: 'text-[16px] md:text-[17px] leading-[1.65] text-[var(--c-ink-muted)] text-pretty mb-5' }, L(s.description)),
                React.createElement('ul', { className: 'grid sm:grid-cols-2 gap-x-6 gap-y-2' },
                  ...s.includes.map((it, j) => React.createElement('li', { key: j, className: 'flex items-start gap-2.5 text-[14px] text-[var(--c-ink)]' },
                    React.createElement('span', { 'aria-hidden': true, className: 'inline-block w-3 h-px bg-[var(--c-terracotta)] mt-2.5 flex-shrink-0' }),
                    React.createElement('span', { className: 'text-pretty' }, L(it)),
                  )),
                ),
              ),
            ),
          );
        }),
      ),
      React.createElement('div', {
        className: 'mt-12 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-6 md:p-8 border border-[var(--c-ink)] bg-[var(--c-paper-raised)]',
        style: { boxShadow: '6px 6px 0 0 var(--c-ink)' },
      },
        React.createElement('p', { className: 'font-display text-2xl md:text-3xl tracking-[-0.01em] text-[var(--c-ink)] text-balance max-w-[560px]' },
          locale === 'es' ? '¿Cuál de estos resolvería tu próximo cuello de botella?' : 'Which of these would unblock your next bottleneck?'),
        React.createElement('button', {
          onClick: () => navigate('/contact'),
          className: 'inline-flex items-center gap-2 h-12 px-6 bg-[var(--c-ink)] text-[var(--c-paper)] hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[6px_6px_0_0_var(--c-terracotta)] transition-all rounded-sm flex-shrink-0',
        }, t('cta.contact'), React.createElement(ArrowUpRight, { size: 15 })),
      ),
    );
  }

  Object.assign(window, { Services, __SERVICES_PREVIEW: SERVICES });
})();
