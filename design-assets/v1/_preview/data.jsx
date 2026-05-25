// _preview/data.jsx — seed data following the shapes from §3 of the brief.
// Real, derived from Francisco's CV + side projects. Bilingual ES/EN.
// kind: 'case-study' | 'side-project' — extends ProjectCard for visual differentiation.

(function() {
  const profile = {
    name: 'Francisco Barros Cruz',
    headline: {
      es: 'Pricing Strategy · Revenue Analytics · AI-Augmented Decision Making',
      en: 'Pricing Strategy · Revenue Analytics · AI-Augmented Decision Making',
    },
    role: {
      es: 'Pricing Strategy · Revenue Analytics · AI-Augmented Decision Making',
      en: 'Pricing Strategy · Revenue Analytics · AI-Augmented Decision Making',
    },
    tagline: {
      es: 'Profesional senior en Pricing y Revenue Analytics. Trabajo en la intersección de estrategia comercial, datos y IA aplicada — donde la decisión de precio, margen y crecimiento se vuelve modelable.',
      en: 'Senior professional in Pricing and Revenue Analytics. I work at the intersection of commercial strategy, data and applied AI — where pricing, margin and growth decisions become modelable.',
    },
    bio: {
      es: '4+ años impulsando decisiones comerciales mediante pricing, revenue management, análisis de demanda y rentabilidad en retail, turismo y telecomunicaciones. Desarrollo modelos de pricing, elasticidad, mix comercial y performance por canal, además de dashboards ejecutivos para apoyar la definición de precios, márgenes y crecimiento rentable. Adopción activa de IA Generativa (Claude, ChatGPT, Gemini, NotebookLM) para acelerar análisis documental, automatización de reportería, generación de insights y workflows estratégicos. Manejo avanzado de SQL, Power BI y Python para integración multifuente y data governance. Impacto medible: -60% tiempo de análisis, +25% ventas digitales, EUR 2M anuales recuperados. Foco en estrategia comercial, ejecución analítica, escalabilidad y uso de IA como multiplicador de productividad.',
      en: '4+ years driving commercial decisions through pricing, revenue management, demand and profitability analysis across retail, travel and telecommunications. I build pricing, elasticity, commercial mix and channel-performance models, plus executive dashboards to support price, margin and growth decisions. Active adoption of Generative AI (Claude, ChatGPT, Gemini, NotebookLM) to accelerate document analysis, reporting automation, insight generation and strategic workflows. Advanced command of SQL, Power BI and Python for multi-source integration and data governance. Measurable impact: -60% analysis time, +25% digital sales, EUR 2M recovered annually. Focus on commercial strategy, analytical execution, scalability and AI as a productivity multiplier.',
    },
    location: 'Santiago, Chile',
    avatar: { src: '', alt: { es: 'Francisco Barros Cruz', en: 'Francisco Barros Cruz' }, width: 320, height: 320 },
    email: 'fcobarros1995@gmail.com',
    cvUrl: { es: '/CV_Francisco_Barros_Cruz.pdf', en: '/CV_Francisco_Barros_Cruz_EN.pdf' },
    /** Concrete-stat line for hero (separate from the tagline). */
    stats: {
      es: '4+ años en retail, telecom y travel. €2M+ en revenue impactado, -60% en tiempo de análisis.',
      en: '4+ years across retail, telecom and travel. €2M+ in revenue impacted, -60% in analysis time.',
    },
    /** Companies to surface as trust signals (hero "experience at" row). */
    trustCompanies: ['movistar', 'cocha', 'skinautica'],
    socials: [
      { platform: 'linkedin', url: 'https://linkedin.com/in/fcobarroscruz' },
      { platform: 'github',   url: 'https://github.com/fcobarros' },
      { platform: 'email',    url: 'mailto:fcobarros1995@gmail.com' },
    ],
  };

  // Skill clusters — used in About §
  const skills = [
    {
      title: { es: 'Pricing & Revenue Analytics', en: 'Pricing & Revenue Analytics' },
      items: ['Pricing strategy', 'Revenue management', 'Elasticidad de demanda', 'Forecasting', 'Mix comercial', 'Rentabilidad por canal'],
    },
    {
      title: { es: 'AI for Business', en: 'AI for Business' },
      items: ['Claude (Pro/Max)', 'ChatGPT', 'Gemini', 'NotebookLM', 'Claude Code', 'Prompt engineering aplicado', 'Orquestación de agentes'],
    },
    {
      title: { es: 'Data & Business Intelligence', en: 'Data & Business Intelligence' },
      items: ['SQL avanzado (SQL Server, Oracle)', 'Power BI (DAX, modelamiento)', 'Python', 'Excel avanzado', 'ETL multifuente'],
    },
    {
      title: { es: 'Data Governance', en: 'Data Governance' },
      items: ['Reglas de negocio', 'Linaje de datos', 'Control de calidad', 'Modelos de datos', 'Bsale · Shopify · Walmart MP · AnyMarket'],
    },
  ];

  const projects = [
    // ─── Case studies (professional, anchored to CV) ───────────────────────
    {
      slug: 'trustonic-movistar',
      kind: 'case-study',
      company: 'movistar',
      primaryMetric: { value: '€2M', label: { es: 'Revenue protegido / año', en: 'Revenue protected / year' } },
      title: { es: 'Trustonic — Movistar', en: 'Trustonic — Movistar' },
      summary: {
        es: 'Implementación end-to-end del programa de protección de revenue en terminales financiados, en coordinación con TI y Legal.',
        en: 'End-to-end rollout of the revenue-protection program for financed handsets, coordinated with IT and Legal.',
      },
      heroImage: { src: '', alt: { es: 'Trustonic en terminales', en: 'Trustonic on handsets' }, width: 1600, height: 900 },
      tags: ['Revenue Protection', 'Telecom', 'Strategy'],
      year: 2023,
      featured: true,
      role: { es: 'Analista Senior de Operaciones', en: 'Senior Operations Analyst' },
      problem: {
        es: 'Terminales financiados generaban fuga de revenue creciente: clientes desactivaban la línea pero seguían usando el equipo, escalando el bad debt mes a mes.',
        en: 'Financed handsets leaked revenue: customers deactivated the line but kept using the device, escalating bad debt month over month.',
      },
      solution: {
        es: 'Co-lideré el rollout de Trustonic (bloqueo remoto bajo condiciones contractuales claras) coordinando TI, Legal y la red comercial. Definí la métrica de éxito, el path de excepciones, el playbook operativo y el comms al cliente.',
        en: 'Co-led the Trustonic rollout (remote lock under clear contractual conditions) coordinating IT, Legal and the commercial network. Defined success metric, exception path, operational playbook and customer comms.',
      },
      impact: {
        es: '~EUR 2M anuales en revenue protegido. -20% bad debt en terminales. Framework reutilizable para futuras categorías financiadas.',
        en: '~EUR 2M annually in protected revenue. -20% handset bad debt. Reusable framework for future financed categories.',
      },
      stack: ['Trustonic', 'Oracle', 'Power BI', 'Cross-functional PM'],
      gallery: [],
      metrics: [
        { label: { es: 'Revenue protegido', en: 'Protected revenue' }, value: '~€2M/año' },
        { label: { es: 'Bad debt', en: 'Bad debt' }, value: '-20%' },
        { label: { es: 'Áreas coordinadas', en: 'Teams coordinated' }, value: '3' },
      ],
      links: {},
    },
    {
      slug: 'ndc-cocha-travel',
      kind: 'case-study',
      company: 'cocha',
      primaryMetric: { value: '120+', label: { es: 'Rutas con pricing dinámico', en: 'Routes with dynamic pricing' } },
      title: { es: 'NDC Dynamic Pricing — Cocha Travel', en: 'NDC Dynamic Pricing — Cocha Travel' },
      summary: {
        es: 'Participación en la implementación del estándar NDC para pricing dinámico en travel distribution.',
        en: 'Key contributor to the NDC standard rollout for dynamic pricing in travel distribution.',
      },
      heroImage: { src: '', alt: { es: 'Pricing dinámico NDC', en: 'NDC dynamic pricing' }, width: 1600, height: 900 },
      tags: ['Pricing', 'Travel', 'NDC', 'Revenue Management'],
      year: 2024,
      featured: true,
      role: { es: 'Revenue Management Analyst', en: 'Revenue Management Analyst' },
      problem: {
        es: 'La operación dependía de fares estáticos provistos por GDS legacy. Sin capacidad de matizar oferta por canal, segmento o ventana de compra, se perdían oportunidades de revenue y la competitividad caía frente a OTAs.',
        en: 'The operation depended on static fares from a legacy GDS. Without the ability to differentiate offer by channel, segment or buying window, revenue opportunities were lost and competitiveness eroded versus OTAs.',
      },
      solution: {
        es: 'Co-diseñé el pipeline NDC con aerolíneas partner y el equipo TI: ingestión en tiempo real de ofertas, modelo de elasticidad por ruta y segmento, y motor de decisión que prioriza el mejor combo precio-margen-conversión en cada query.',
        en: 'Co-designed the NDC pipeline with partner airlines and IT: real-time offer ingestion, route-and-segment elasticity model, and a decision engine that picks the best price-margin-conversion combo per query.',
      },
      impact: {
        es: 'Reducción del gap competitivo vs OTAs en tarifas, mayor flexibilidad para campañas tácticas y trazabilidad completa del descuento aplicado por venta.',
        en: 'Closed the competitive gap vs OTAs on fares, enabled tactical campaigns, and gave full traceability of the discount applied per booking.',
      },
      stack: ['SQL Server', 'Power BI', 'Python', 'NDC XML', 'Azure Data Factory'],
      gallery: [],
      metrics: [
        { label: { es: 'Rutas con pricing dinámico', en: 'Routes with dynamic pricing' }, value: '120+' },
        { label: { es: 'Gap vs OTA reducido', en: 'OTA gap closed' }, value: '~40%' },
        { label: { es: 'Tiempo a nuevo fare', en: 'Time-to-new-fare' }, value: '<5min' },
      ],
      links: {},
    },
    {
      slug: 'marketplace-integration-skinautica',
      kind: 'case-study',
      company: 'skinautica',
      primaryMetric: { value: '+25%', label: { es: 'Ventas digitales', en: 'Digital sales' } },
      title: { es: 'Marketplace Integration — Skinautica', en: 'Marketplace Integration — Skinautica' },
      summary: {
        es: 'Integración Bsale ERP + Shopify + AnyMarket + Walmart Marketplace, con gobernanza de datos punto a punto.',
        en: 'Bsale ERP + Shopify + AnyMarket + Walmart Marketplace integration, with end-to-end data governance.',
      },
      heroImage: { src: '', alt: { es: 'Integración multicanal', en: 'Multi-channel integration' }, width: 1600, height: 900 },
      tags: ['E-commerce', 'Integration', 'Retail', 'Data Quality'],
      year: 2025,
      featured: false,
      role: { es: 'Consultor Comercial & Analista de Datos', en: 'Commercial Consultant & Data Analyst' },
      problem: {
        es: 'Inventario y precios divergían entre el ERP (Bsale), la tienda Shopify y los marketplaces (Walmart, AnyMarket). Resultado: oversell, pedidos cancelados y pérdida de ranking en Walmart.',
        en: 'Inventory and pricing diverged between the ERP (Bsale), the Shopify store and the marketplaces (Walmart, AnyMarket). Result: oversells, canceled orders and lost Walmart ranking.',
      },
      solution: {
        es: 'Mapeé el linaje de datos punto a punto, identifiqué los puntos de truncamiento y diseñé reglas de gobernanza para que Bsale sea fuente única de stock y pricing. Implementación con el partner tecnológico.',
        en: 'Mapped end-to-end data lineage, identified truncation points, and designed governance rules so Bsale is single source of truth for stock and pricing. Implementation with the tech partner.',
      },
      impact: {
        es: '+25% ventas digitales en el trimestre post-implementación. Oversells eliminados. Ranking recuperado en Walmart Marketplace.',
        en: '+25% digital sales in the quarter post-implementation. Oversells eliminated. Walmart Marketplace rank recovered.',
      },
      stack: ['Bsale', 'Shopify', 'AnyMarket', 'Walmart MP', 'Power Query', 'SQL'],
      gallery: [],
      metrics: [
        { label: { es: 'Ventas digitales', en: 'Digital sales' }, value: '+25%' },
        { label: { es: 'Oversells', en: 'Oversells' }, value: '0' },
        { label: { es: 'SKUs unificados', en: 'SKUs unified' }, value: '2,400' },
      ],
      links: {},
    },
    {
      slug: 'ai-reporting-skinautica',
      kind: 'case-study',
      company: 'skinautica',
      primaryMetric: { value: '-60%', label: { es: 'Tiempo de análisis', en: 'Analysis time' } },
      title: { es: 'AI-Augmented Reporting Pipeline — Skinautica', en: 'AI-Augmented Reporting Pipeline — Skinautica' },
      summary: {
        es: 'Automatización de reportería ejecutiva con SQL + Python + Power BI, complementada con IA Generativa para narrativa y QA.',
        en: 'Executive reporting automation with SQL + Python + Power BI, complemented with Generative AI for narrative and QA.',
      },
      heroImage: { src: '', alt: { es: 'Pipeline de reportería con IA', en: 'AI-augmented reporting pipeline' }, width: 1600, height: 900 },
      tags: ['AI', 'BI', 'Automation'],
      year: 2025,
      featured: false,
      role: { es: 'Consultor Comercial & Analista de Datos', en: 'Commercial Consultant & Data Analyst' },
      problem: {
        es: 'Reportería semanal y mensual consumía días-persona en pegar datos entre fuentes, ejecutar queries ad hoc y redactar conclusiones que la gerencia leía en 5 minutos.',
        en: 'Weekly and monthly reporting burned person-days on stitching data across sources, running ad-hoc queries and drafting conclusions leadership read in 5 minutes.',
      },
      solution: {
        es: 'Capa de orquestación con Claude que (1) consume queries SQL versionadas, (2) ejecuta el cálculo de KPIs y deltas, (3) redacta narrativa ejecutiva con citas a las celdas, y (4) entrega Power BI + memo en una sola pasada.',
        en: 'Claude orchestration layer that (1) consumes versioned SQL queries, (2) runs KPI and delta computation, (3) drafts executive narrative with citations to underlying cells, and (4) ships Power BI + memo in a single pass.',
      },
      impact: {
        es: '-60% tiempo de análisis en el ciclo de reportería. Mayor consistencia narrativa entre semanas. Tiempo liberado para análisis estratégico real.',
        en: '-60% analysis time in the reporting cycle. Better narrative consistency week over week. Time freed up for actual strategic analysis.',
      },
      stack: ['Claude API', 'Python', 'SQL Server', 'Power BI', 'Bsale', 'Shopify'],
      gallery: [],
      metrics: [
        { label: { es: 'Tiempo de análisis', en: 'Analysis time' }, value: '-60%' },
        { label: { es: 'Reportes automatizados', en: 'Reports automated' }, value: '14' },
        { label: { es: 'Fuentes integradas', en: 'Sources integrated' }, value: '4' },
      ],
      links: {},
    },

    // ─── Side projects (personal) ──────────────────────────────────────────
    {
      slug: 'finanzas-flow',
      kind: 'side-project',
      primaryMetric: { value: '3', label: { es: 'Bancos integrados', en: 'Banks integrated' } },
      title: { es: 'Finanzas Flow', en: 'Finanzas Flow' },
      summary: {
        es: 'App de gestión financiera que procesa emails bancarios chilenos (BICE, Santander, Falabella) y clasifica transacciones con IA.',
        en: 'Personal finance app that ingests Chilean bank emails (BICE, Santander, Falabella) and classifies transactions with AI.',
      },
      heroImage: { src: '', alt: { es: 'Finanzas Flow', en: 'Finanzas Flow' }, width: 1600, height: 900 },
      tags: ['AI', 'Personal Finance', 'Python'],
      year: 2026,
      featured: false,
      status: 'WIP',
      role: { es: 'Solo build', en: 'Solo build' },
      problem: {
        es: 'Los emails bancarios chilenos llegan en formatos variables por banco y son difíciles de consolidar en un único feed financiero útil para presupuestar.',
        en: 'Chilean bank emails arrive in bank-specific formats and are hard to consolidate into a single useful feed for budgeting.',
      },
      solution: {
        es: 'Backend Python/FastAPI con SQLAlchemy 2.x. Parser por banco con fallback a Claude API para casos ambiguos. Clasificación de transacciones por categoría aprendiendo del histórico del usuario.',
        en: 'Python/FastAPI backend with SQLAlchemy 2.x. Per-bank parser with Claude API fallback for ambiguous cases. Transaction classification by category, learning from the user history.',
      },
      impact: {
        es: 'Feed unificado de cashflow en tiempo real, sin depender de Open Banking (que en Chile aún es limitado).',
        en: 'Unified cashflow feed in real time, without depending on Open Banking (still limited in Chile).',
      },
      stack: ['Python 3.11', 'FastAPI', 'SQLAlchemy 2.x', 'Claude API'],
      gallery: [],
      metrics: [
        { label: { es: 'Bancos soportados', en: 'Banks supported' }, value: '3' },
        { label: { es: 'Status', en: 'Status' }, value: 'WIP' },
      ],
      links: {},
    },
    {
      slug: 'real-estate-chile',
      kind: 'side-project',
      primaryMetric: { value: '3,200+', label: { es: 'Listings analizados', en: 'Listings analyzed' } },
      title: { es: 'Real Estate Investment Analysis — Chile', en: 'Real Estate Investment Analysis — Chile' },
      summary: {
        es: 'Pipeline de scoring para departamentos en Santiago, con reporte HTML interactivo standalone.',
        en: 'Scoring pipeline for apartments in Santiago, with a standalone interactive HTML report.',
      },
      heroImage: { src: '', alt: { es: 'Análisis de inversión inmobiliaria', en: 'Real estate investment analysis' }, width: 1600, height: 900 },
      tags: ['BI', 'Real Estate', 'Investment'],
      year: 2025,
      featured: false,
      role: { es: 'Solo build', en: 'Solo build' },
      problem: {
        es: 'Las plataformas de propiedades en Chile no muestran rentabilidad esperada, cap rate ni comparables limpios para inversión.',
        en: 'Property platforms in Chile do not surface expected yield, cap rate or clean comparables for investment.',
      },
      solution: {
        es: 'Scraper de listings + normalización de UF/m², cálculo de cap rate ajustado por barrio, modelo de scoring por liquidez y appreciación esperada. Output: reporte HTML standalone con filtros.',
        en: 'Listings scraper + UF/m² normalization, neighborhood-adjusted cap rate, scoring model by liquidity and expected appreciation. Output: standalone HTML report with filters.',
      },
      impact: {
        es: 'Tomar decisiones de inversión en minutos en vez de horas; identificar oportunidades fuera del radar de los portales.',
        en: 'Investment decisions in minutes instead of hours; opportunities surfaced beyond the portals\u2019 radar.',
      },
      stack: ['Python', 'Pandas', 'HTML/JS'],
      gallery: [],
      metrics: [
        { label: { es: 'Listings analizados', en: 'Listings analyzed' }, value: '3,200+' },
        { label: { es: 'Comunas cubiertas', en: 'Districts covered' }, value: '12' },
      ],
      links: {},
    },
  ];

  const experience = [
    {
      company: 'Skinautica',
      logo: 'skinautica',
      role: { es: 'Consultor Comercial & Analista de Datos', en: 'Commercial Consultant & Data Analyst' },
      period: { start: '2025-01', end: '2026-02' },
      location: 'Las Condes, Chile',
      summary: {
        es: 'Lideré la capa analítica de la operación retail: integración multicanal, dashboards de margen y rotación, y adopción de IA en flujos de reportería.',
        en: 'Led the analytical layer of the retail operation: multi-channel integration, margin and turnover dashboards, and AI adoption in reporting flows.',
      },
      highlights: [
        { es: 'Automatización de reportería con SQL + Python + Power BI (-60% tiempo de análisis).', en: 'Reporting automation with SQL + Python + Power BI (-60% analysis time).' },
        { es: 'Integración Bsale × Shopify × AnyMarket × Walmart con gobernanza de datos.', en: 'Bsale × Shopify × AnyMarket × Walmart integration with data governance.' },
        { es: 'Workflows con Claude para research, queries y memos ejecutivos.', en: 'Claude workflows for research, queries and executive memos.' },
      ],
    },
    {
      company: 'Cocha Travel',
      logo: 'cocha',
      role: { es: 'Revenue Management Analyst', en: 'Revenue Management Analyst' },
      period: { start: '2024-02', end: '2024-12' },
      location: 'Las Condes, Chile',
      summary: {
        es: 'Modelamiento de pricing y demanda en industria turística. Participación clave en rollout NDC.',
        en: 'Pricing and demand modeling for the travel industry. Key contributor to the NDC rollout.',
      },
      highlights: [
        { es: 'Modelos de elasticidad y rentabilidad por producto.', en: 'Elasticity and per-product profitability models.' },
        { es: 'Dashboards Power BI de performance, demanda y forecast.', en: 'Power BI dashboards for performance, demand and forecast.' },
        { es: 'Implementación NDC para pricing dinámico.', en: 'NDC implementation for dynamic pricing.' },
      ],
    },
    {
      company: 'Telefónica / Movistar',
      logo: 'movistar',
      role: { es: 'Analista Senior de Operaciones', en: 'Senior Operations Analyst' },
      period: { start: '2022-06', end: '2024-01' },
      location: 'Providencia, Chile',
      summary: {
        es: 'Iniciativas transversales en operaciones B2C: protección de revenue, anti-fraude en terminales y analítica de retención.',
        en: 'Cross-functional B2C operations initiatives: revenue protection, handset anti-fraud and retention analytics.',
      },
      highlights: [
        { es: 'Programa Trustonic: -20% bad debt, ~EUR 2M anuales en revenue protegido.', en: 'Trustonic program: -20% bad debt, ~EUR 2M annually in protected revenue.' },
        { es: 'Analítica de churn y detección de fugas de revenue.', en: 'Churn analytics and revenue leakage detection.' },
        { es: 'Coordinación cross-funcional TI + Legal + Comercial.', en: 'Cross-functional coordination IT + Legal + Commercial.' },
      ],
    },
  ];

  const education = {
    degree: { es: 'Ingeniero Civil Industrial — Mención en Finanzas', en: 'Industrial Engineering — Major in Finance' },
    school: 'Universidad de los Andes',
    period: '2014 — 2021',
    location: 'Santiago, Chile',
    notes: [
      { es: 'Estudios aplicados en desarrollo web.', en: 'Applied studies in web development.' },
      { es: 'Minor en Liderazgo y Coaching.', en: 'Minor in Leadership and Coaching.' },
    ],
  };

  // i18n strings — only UI chrome, navigation, generic labels.
  const dict = {
    nav: {
      home: { es: 'Home', en: 'Home' },
      about: { es: 'Sobre mí', en: 'About' },
      projects: { es: 'Proyectos', en: 'Projects' },
      experience: { es: 'Experiencia', en: 'Experience' },
      contact: { es: 'Contacto', en: 'Contact' },
    },
    cta: {
      viewProjects: { es: 'Ver proyectos', en: 'View projects' },
      downloadCv: { es: 'Descargar CV', en: 'Download CV' },
      contact: { es: 'Contacto', en: 'Get in touch' },
      backToProjects: { es: 'Volver a proyectos', en: 'Back to projects' },
      viewRepo: { es: 'Ver repo', en: 'View repo' },
      viewDemo: { es: 'Ver demo', en: 'View demo' },
      sendMessage: { es: 'Enviar mensaje', en: 'Send message' },
      readMore: { es: 'Leer caso', en: 'Read case' },
      viewProject: { es: 'Ver proyecto', en: 'View project' },
    },
    section: {
      featured: { es: 'Trabajo destacado', en: 'Featured work' },
      allProjects: { es: 'Todos los proyectos', en: 'All projects' },
      caseStudies: { es: 'Case studies', en: 'Case studies' },
      sideProjects: { es: 'Side projects', en: 'Side projects' },
      about: { es: 'Sobre mí', en: 'About' },
      experience: { es: 'Experiencia profesional', en: 'Professional experience' },
      education: { es: 'Educación', en: 'Education' },
      contact: { es: 'Contacto', en: 'Contact' },
      skills: { es: 'Capacidades', en: 'Skills' },
      stack: { es: 'Stack', en: 'Stack' },
      role: { es: 'Rol', en: 'Role' },
      year: { es: 'Año', en: 'Year' },
      tags: { es: 'Tags', en: 'Tags' },
      problem: { es: 'Problema', en: 'Problem' },
      solution: { es: 'Solución', en: 'Solution' },
      impact: { es: 'Impacto', en: 'Impact' },
      metrics: { es: 'Métricas', en: 'Metrics' },
      filterBy: { es: 'Filtrar por', en: 'Filter by' },
      all: { es: 'Todos', en: 'All' },
      nothing: { es: 'No hay proyectos con ese filtro.', en: 'No projects match that filter.' },
      whatIDo: { es: 'Lo que hago', en: 'What I do' },
      pillars: { es: 'Pilares', en: 'Pillars' },
    },
    badge: {
      caseStudy: { es: 'Case study', en: 'Case study' },
      sideProject: { es: 'Side project', en: 'Side project' },
      featured: { es: 'Featured', en: 'Featured' },
      wip: { es: 'En desarrollo', en: 'Work in progress' },
    },
    hero: {
      kicker: { es: 'Portfolio · 2026', en: 'Portfolio · 2026' },
      pillar1: { es: 'Pricing Strategy', en: 'Pricing Strategy' },
      pillar2: { es: 'Revenue Analytics', en: 'Revenue Analytics' },
      pillar3: { es: 'AI-Augmented Decision Making', en: 'AI-Augmented Decision Making' },
      pillar1Short: { es: 'Pricing', en: 'Pricing' },
      pillar2Short: { es: 'Revenue', en: 'Revenue' },
      pillar3Short: { es: 'AI', en: 'AI' },
      scroll: { es: 'Desliza para explorar', en: 'Scroll to explore' },
    },
    about: {
      lead: {
        es: 'Pienso en negocios como sistemas que pueden modelarse, instrumentarse y aprender.',
        en: 'I think of businesses as systems that can be modeled, instrumented and made to learn.',
      },
    },
    contact: {
      lead: {
        es: 'Mejor por correo. Respondo en menos de 24 horas en días hábiles.',
        en: 'Best by email. I respond within 24 hours on business days.',
      },
      nameLabel: { es: 'Nombre', en: 'Name' },
      emailLabel: { es: 'Correo', en: 'Email' },
      messageLabel: { es: 'Mensaje', en: 'Message' },
      messagePlaceholder: { es: 'Cuéntame brevemente qué tienes en mente…', en: 'Briefly tell me what you have in mind…' },
      success: { es: 'Mensaje enviado. Te respondo pronto.', en: 'Message sent. I will get back to you soon.' },
    },
    footer: {
      built: { es: 'Diseñado y construido por Francisco Barros, con asistencia de Claude.', en: 'Designed and built by Francisco Barros, with help from Claude.' },
      privacy: { es: 'Privacidad', en: 'Privacy' },
    },
    notFound: {
      code: '404',
      title: { es: 'Esa ruta no existe', en: 'This route does not exist' },
      lead: { es: 'Tal vez el link cambió. Vuelve al inicio o explora los proyectos.', en: 'Maybe the link changed. Head back home or explore the projects.' },
      back: { es: 'Volver al inicio', en: 'Back home' },
    },
    cookies: {
      title: { es: 'Privacidad', en: 'Privacy' },
      body: {
        es: 'Uso analítica privada (PostHog) para entender qué secciones interesan. Sin cookies de tracking de terceros.',
        en: 'I use privacy-friendly analytics (PostHog) to understand which sections matter. No third-party tracking cookies.',
      },
      accept: { es: 'Aceptar', en: 'Accept' },
      necessary: { es: 'Solo necesario', en: 'Necessary only' },
      learnMore: { es: 'Leer más', en: 'Learn more' },
    },
  };

  Object.assign(window, {
    __PROFILE: profile,
    __SKILLS: skills,
    __PROJECTS: projects,
    __EXPERIENCE: experience,
    __EDUCATION: education,
    __DICT: dict,
  });
})();
