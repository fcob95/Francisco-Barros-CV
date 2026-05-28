import type { ProjectDetail } from "@/lib/content/schemas";

export const trustonicMovistar: ProjectDetail = {
  slug: "trustonic-movistar",
  kind: "case-study",
  company: "movistar",
  primaryMetric: {
    value: "€2M",
    label: { es: "Revenue protegido / año", en: "Revenue protected / year" },
  },
  title: {
    es: "Trustonic — Movistar",
    en: "Trustonic — Movistar",
  },
  summary: {
    es: "Implementación end-to-end del programa de protección de revenue en terminales financiados, en coordinación con TI y Legal.",
    en: "End-to-end rollout of the revenue-protection program for financed handsets, coordinated with IT and Legal.",
  },
  heroImage: {
    src: "/images/projects/trustonic-movistar.svg",
    alt: { es: "Trustonic en terminales", en: "Trustonic on handsets" },
    width: 1600,
    height: 900,
  },
  tags: ["Revenue Protection", "Telecom", "Strategy"],
  year: 2023,
  featured: true,
  role: {
    es: "Analista Senior de Operaciones",
    en: "Senior Operations Analyst",
  },
  problem: {
    es: "Terminales financiados generaban fuga de revenue creciente: clientes desactivaban la línea pero seguían usando el equipo, escalando el bad debt mes a mes.",
    en: "Financed handsets leaked revenue: customers deactivated the line but kept using the device, escalating bad debt month over month.",
  },
  solution: {
    es: "Co-lideré el rollout de Trustonic (bloqueo remoto bajo condiciones contractuales claras) coordinando TI, Legal y la red comercial. Definí la métrica de éxito, el path de excepciones, el playbook operativo y el comms al cliente.",
    en: "Co-led the Trustonic rollout (remote lock under clear contractual conditions) coordinating IT, Legal and the commercial network. Defined success metric, exception path, operational playbook and customer comms.",
  },
  impact: {
    es: "~EUR 2M anuales en revenue protegido. -20% bad debt en terminales. Framework reutilizable para futuras categorías financiadas.",
    en: "~EUR 2M annually in protected revenue. -20% handset bad debt. Reusable framework for future financed categories.",
  },
  stack: ["Trustonic", "Oracle", "Power BI", "Cross-functional PM"],
  gallery: [],
  metrics: [
    {
      label: { es: "Revenue protegido", en: "Protected revenue" },
      value: "~€2M/año",
    },
    {
      label: { es: "Bad debt", en: "Bad debt" },
      value: "-20%",
    },
    {
      label: { es: "Áreas coordinadas", en: "Teams coordinated" },
      value: "3",
    },
  ],
  links: {},
};
