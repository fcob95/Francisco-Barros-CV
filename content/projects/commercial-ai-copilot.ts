import type { ProjectDetail } from "@/lib/content/schemas";

export const commercialAiCopilot: ProjectDetail = {
  slug: "commercial-ai-copilot",
  title: {
    es: "Copiloto de IA Comercial",
    en: "Commercial AI Copilot",
  },
  summary: {
    es: "Agente de IA que responde preguntas comerciales en lenguaje natural sobre datos de ventas.",
    en: "AI agent that answers commercial questions in natural language over sales data.",
  },
  heroImage: {
    src: "/images/projects/commercial-ai-copilot.svg",
    alt: {
      es: "Interfaz de chat del copiloto comercial con un gráfico generado",
      en: "Commercial copilot chat interface with a generated chart",
    },
    width: 1200,
    height: 630,
  },
  tags: ["AI", "BI"],
  year: 2024,
  featured: false,
  role: {
    es: "Diseñador y constructor del agente de IA.",
    en: "Designer and builder of the AI agent.",
  },
  problem: {
    es: "El equipo comercial dependía del área de datos para cada consulta ad-hoc, generando una cola de pedidos que retrasaba decisiones de días.",
    en: "The commercial team depended on the data team for every ad-hoc query, creating a backlog that delayed decisions by days.",
  },
  solution: {
    es: "Implementé un agente con generación de SQL controlada sobre un esquema curado, validación de consultas y respuestas con visualizaciones, todo con trazabilidad de las consultas ejecutadas.",
    en: "I implemented an agent with guarded SQL generation over a curated schema, query validation and answers with visualizations, all with traceability of executed queries.",
  },
  impact: {
    es: "Autoservicio de analítica para roles no técnicos y liberación del equipo de datos para trabajo de mayor valor, sin perder control sobre las consultas.",
    en: "Self-service analytics for non-technical roles and freeing the data team for higher-value work, without losing control over queries.",
  },
  stack: ["Python", "LangChain", "OpenAI API", "DuckDB", "Streamlit"],
  gallery: [
    {
      src: "/images/projects/commercial-ai-copilot.svg",
      alt: {
        es: "Ejemplo de respuesta del copiloto con SQL trazable",
        en: "Example copilot answer with traceable SQL",
      },
      width: 1200,
      height: 630,
    },
  ],
  metrics: [
    {
      label: { es: "Consultas autoservicio", en: "Self-service queries" },
      value: "+70%",
    },
    {
      label: { es: "Tiempo de respuesta", en: "Response time" },
      value: "<30s",
    },
  ],
  links: {
    demo: "https://copilot-demo.franciscobarros.cl",
  },
};
