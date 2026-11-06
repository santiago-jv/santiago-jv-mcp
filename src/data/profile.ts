export type Language = 'en' | 'es';

export type SkillCategory =
  | 'backend'
  | 'architecture'
  | 'ai'
  | 'cloud-observability'
  | 'databases'
  | 'product-analytics'
  | 'frontend-mobile';

export type ProficiencyTier = 'core' | 'strong' | 'working';

export interface SkillEntry {
  id: string;
  name: string;
  category: SkillCategory;
  tier: ProficiencyTier;
  years: number;
  aliases: string[];
  evidence: {
    en: string;
    es: string;
  };
}

export interface WorkExperienceEntry {
  id: string;
  company: string;
  role: { en: string; es: string };
  period: { en: string; es: string };
  modality: { en: string; es: string };
  domains: Array<'backend' | 'ai-mcp' | 'observability' | 'product'>;
  tech: string[];
  highlights: {
    en: string[];
    es: string[];
  };
}

export const SANTIAGO_IDENTITY = {
  fullName: 'Santiago Olayo Villamil',
  displayName: 'Santiago Olayo',
  handle: 'santiago-jv',
  yearsOfExperience: 4.5,
  experienceLabel: '4+ years',
  headline: {
    en: 'Senior Software Engineer · Backend, Cloud, Product Analytics & AI Internal Tooling (Product Owner Engineer)',
    es: 'Senior Software Engineer · Backend, Cloud, Analítica de Producto y Tooling Interno con IA (Product Owner Engineer)',
  },
  location: {
    city: 'Barranquilla / Santa Marta',
    country: 'Colombia',
    timezone: 'America/Bogota (UTC-5, EST/EDT overlap)',
    workModalities: {
      en: 'Remote (Global, US, LatAm, Colombia) or Hybrid/On-site in Barranquilla & Santa Marta, Colombia',
      es: 'Remoto (Global, EE. UU., LatAm, Colombia) o Híbrido/Presencial en Barranquilla y Santa Marta, Colombia',
    },
  },
  spokenLanguages: [
    {
      language: 'Spanish',
      level: { en: 'Native', es: 'Nativo' },
    },
    {
      language: 'English',
      level: {
        en: 'Professional Working (Collaborating daily with international stakeholders at GoodRec)',
        es: 'Profesional de trabajo (Colaboración diaria con equipos internacionales en GoodRec)',
      },
    },
  ],
  summary: {
    en: 'Systems Engineer and Senior Software Engineer with 4+ years of experience building and scaling products for startups and international companies. Specializes in backend engineering (Node.js, NestJS, TypeScript, Java, Spring Boot), Hexagonal Architecture & DDD, cloud infrastructure (AWS, Google Cloud Functions), concurrency control with Redis locks, observability (Datadog), product analytics (CleverTap, Metabase), and applied AI internal tooling (Model Context Protocol servers, team skills/plugins, and Cloudflare AI Gateway). Known for owning features end-to-end alongside product, operations, support, and finance.',
    es: 'Ingeniero de Sistemas y Senior Software Engineer con más de 4 años de experiencia construyendo y escalando productos para startups y empresas internacionales. Especializado en desarrollo backend (Node.js, NestJS, TypeScript, Java, Spring Boot), Arquitectura Hexagonal y DDD, infraestructura cloud (AWS, Google Cloud Functions), control de concurrencia con locks en Redis, observabilidad (Datadog), analítica de producto (CleverTap, Metabase) y tooling interno con IA (servidores MCP, plugins/skills por equipo y Cloudflare AI Gateway). Reconocido por liderar funcionalidades de punta a punta junto a producto, operaciones, soporte y finanzas.',
  },
  education: [
    {
      degree: {
        en: 'B.S. in Systems Engineering (Ingeniero de Sistemas)',
        es: 'Ingeniero de Sistemas',
      },
      institution: 'Universidad del Magdalena',
      period: '2019 – 2025',
      location: 'Santa Marta, Colombia',
    },
    {
      degree: {
        en: 'Professional Scrum & Software Engineering Coursework',
        es: 'Curso Profesional de Scrum e Ingeniería de Software',
      },
      institution: 'Platzi',
      period: '2022',
      location: 'Online',
    },
  ],
  links: {
    portfolio: 'https://www.santiago-jv.tech',
    mcpEndpoint: 'https://mcp.santiago-jv.tech/mcp',
    mcpDocs: 'https://www.santiago-jv.tech/mcp',
    email: 'contact@santiago-jv.tech',
    linkedin: 'https://www.linkedin.com/in/santiago-jv',
    github: 'https://github.com/santiago-jv',
    x: 'https://x.com/santiagojv_tech',
    medium: 'https://medium.com/@santiago-jv/',
    resumeEnPdf: 'https://www.santiago-jv.tech/Santiago_Olayo_Villamil_CV_EN.pdf',
    resumeEsPdf: 'https://www.santiago-jv.tech/Santiago_Olayo_Villamil_CV_ES.pdf',
    llmsTxt: 'https://www.santiago-jv.tech/llms-full.txt',
  },
} as const;

export const WORK_EXPERIENCE: WorkExperienceEntry[] = [
  {
    id: 'goodrec',
    company: 'GoodRec',
    role: {
      en: 'Product Owner Engineer / Senior Backend & Fullstack Engineer',
      es: 'Product Owner Engineer / Senior Backend & Fullstack Engineer',
    },
    period: {
      en: 'Jan 2025 – Present',
      es: 'Ene 2025 – Actualidad',
    },
    modality: {
      en: 'Remote (International Team)',
      es: 'Remoto (Equipo Internacional)',
    },
    domains: ['backend', 'ai-mcp', 'observability', 'product'],
    tech: [
      'NestJS',
      'Node.js',
      'TypeScript',
      'Hexagonal Architecture',
      'DDD',
      'AWS',
      'Google Cloud Functions',
      'PostgreSQL',
      'MongoDB',
      'Redis Locks',
      'MCP',
      'Cloudflare AI Gateway',
      'Datadog',
      'CleverTap',
      'Metabase',
    ],
    highlights: {
      en: [
        'Own feature delivery end to end alongside product, operations, support, and finance: from stakeholder discovery and technical design to cloud deployment (AWS / Cloud Functions) and post-release monitoring.',
        'Design and maintain backend microservices (Node.js, NestJS, TypeScript) using Hexagonal Architecture and Domain-Driven Design (DDD), mobile features, internal tools, zero-downtime database migrations (PostgreSQL, MongoDB), and concurrency control with atomic Redis distributed locks.',
        'Drive the migration of repetitive manual workflows toward AI-assisted processes: building and maintaining internal MCP (Model Context Protocol) tooling for LLM connectivity, specialized plugins & skills per internal team area, and prompting rules governance via Cloudflare AI Gateway.',
        'Guarantee production reliability with Datadog APM, distributed tracing, proactive alerting, and live incident investigation.',
        'Instrument product funnels in CleverTap and build SQL analytics in Metabase to measure business impact and guide product decisions.',
      ],
      es: [
        'Lidero el ciclo completo de funcionalidades junto a producto, operaciones, soporte y finanzas: desde descubrimiento con stakeholders y diseño técnico hasta despliegue cloud (AWS / Cloud Functions) y monitoreo post-lanzamiento.',
        'Construyo y evoluciono servicios backend (Node.js, NestJS, TypeScript) bajo Arquitectura Hexagonal y DDD, funcionalidades móviles, herramientas internas, migraciones seguras de bases de datos (PostgreSQL, MongoDB) y control de concurrencia mediante locks distribuidos atómicos en Redis.',
        'Impulsé la migración de flujos manuales hacia procesos asistidos por IA: tooling interno con MCP (Model Context Protocol) para conectar LLMs, plugins y skills especializados por área de equipo, y reglas de prompting con Cloudflare AI Gateway.',
        'Monitoreo continuo de servicios distribuidos en producción, trazabilidad APM, alertas proactivas e investigación de incidentes con Datadog.',
        'Medición de eventos de producto y métricas de negocio con CleverTap y análisis de datos en Metabase para respaldar decisiones del roadmap.',
      ],
    },
  },
  {
    id: 'bolsiyo',
    company: 'Bolsiyo',
    role: {
      en: 'Backend Developer',
      es: 'Backend Developer',
    },
    period: {
      en: 'Aug 2022 – Jan 2025 (2.5 years)',
      es: 'Ago 2022 – Ene 2025 (2.5 años)',
    },
    modality: {
      en: 'Remote (Colombia)',
      es: 'Remoto (Colombia)',
    },
    domains: ['backend', 'product'],
    tech: ['Node.js', 'TypeScript', 'LoopBack 4', 'PostgreSQL', 'MongoDB', 'REST APIs', 'Payment Gateways', 'Scrum'],
    highlights: {
      en: [
        'Built and maintained high-concurrency backend services with Node.js, TypeScript, and LoopBack 4 for a fintech/commerce mobile app used by independent merchants.',
        'Designed schemas and executed safe migrations in PostgreSQL and MongoDB, optimizing critical wallet, ledger, and payment queries.',
        'Developed secure REST APIs, payment gateway integrations, automated tests, and peer code reviews in an Agile Scrum team.',
      ],
      es: [
        'Desarrollé y mantuve servicios backend de alta concurrencia con Node.js, TypeScript y LoopBack 4 para una plataforma móvil financiera/comercial usada por comercios independientes.',
        'Diseñé esquemas y ejecuté migraciones en PostgreSQL y MongoDB, optimizando consultas críticas de billetera y pagos.',
        'Construí APIs REST seguras, integraciones con pasarelas de pago, pruebas automatizadas y revisiones de código bajo Scrum.',
      ],
    },
  },
  {
    id: 'cooltivalo-cotas-sls',
    company: 'Cooltivalo · +COTAS · SLS GROUPS',
    role: {
      en: 'Full Stack Developer',
      es: 'Full Stack Developer',
    },
    period: {
      en: 'Jan 2021 – May 2023',
      es: 'Ene 2021 – May 2023',
    },
    modality: {
      en: 'Colombia (Hybrid / Remote)',
      es: 'Colombia (Híbrido / Remoto)',
    },
    domains: ['backend', 'product'],
    tech: ['TypeScript', 'JavaScript', 'Node.js', 'GraphQL', 'REST APIs', 'MySQL', 'MongoDB'],
    highlights: {
      en: [
        'Developed full-stack web applications and backend APIs using TypeScript, JavaScript, Node.js, GraphQL, MySQL, and MongoDB.',
        'Handled relational data modeling, responsive front-end integrations, and cloud deployments.',
      ],
      es: [
        'Desarrollé aplicaciones web full-stack y APIs backend utilizando TypeScript, JavaScript, Node.js, GraphQL, MySQL y MongoDB.',
        'Realicé modelado relacional de datos, integraciones frontend y despliegues en la nube.',
      ],
    },
  },
];

export const SKILL_MATRIX: SkillEntry[] = [
  {
    id: 'typescript',
    name: 'TypeScript',
    category: 'backend',
    tier: 'core',
    years: 4.5,
    aliases: ['typescript', 'ts'],
    evidence: {
      en: 'Primary production language across GoodRec, Bolsiyo, and custom MCP servers.',
      es: 'Lenguaje principal en producción en GoodRec, Bolsiyo y servidores MCP personalizados.',
    },
  },
  {
    id: 'nodejs',
    name: 'Node.js',
    category: 'backend',
    tier: 'core',
    years: 4.5,
    aliases: ['node.js', 'nodejs', 'node js', 'node'],
    evidence: {
      en: '4+ years building high-concurrency APIs, fintech wallets, background workers, and microservices.',
      es: '4+ años construyendo APIs de alta concurrencia, billeteras digitales, workers asíncronos y microservicios.',
    },
  },
  {
    id: 'nestjs',
    name: 'NestJS',
    category: 'backend',
    tier: 'core',
    years: 3,
    aliases: ['nestjs', 'nest.js', 'nest js'],
    evidence: {
      en: 'Core backend framework at GoodRec structured with Hexagonal Architecture and DDD.',
      es: 'Framework backend principal en GoodRec estructurado bajo Arquitectura Hexagonal y DDD.',
    },
  },
  {
    id: 'java-spring',
    name: 'Java & Spring Boot',
    category: 'backend',
    tier: 'strong',
    years: 2,
    aliases: ['java', 'spring boot', 'springboot', 'spring'],
    evidence: {
      en: 'Enterprise backend services and microservices architecture alongside TypeScript/NestJS ecosystems.',
      es: 'Servicios backend empresariales y arquitectura de microservicios junto con ecosistemas TypeScript/NestJS.',
    },
  },
  {
    id: 'loopback',
    name: 'LoopBack 4',
    category: 'backend',
    tier: 'strong',
    years: 2.5,
    aliases: ['loopback', 'loopback 4', 'loopback4'],
    evidence: {
      en: '2.5 years building merchant & payment backend services at Bolsiyo.',
      es: '2.5 años construyendo servicios backend de pagos y comercios en Bolsiyo.',
    },
  },
  {
    id: 'rest-graphql',
    name: 'REST & GraphQL APIs',
    category: 'backend',
    tier: 'core',
    years: 4.5,
    aliases: ['rest', 'rest api', 'restful', 'graphql', 'api design', 'apis'],
    evidence: {
      en: 'API contract design, payment gateway integrations, versioning, and auth across all roles.',
      es: 'Diseño de contratos API, pasarelas de pago, versionado y autenticación en todos los roles.',
    },
  },
  {
    id: 'hexagonal-ddd',
    name: 'Hexagonal Architecture & DDD',
    category: 'architecture',
    tier: 'core',
    years: 3,
    aliases: [
      'hexagonal',
      'hexagonal architecture',
      'ports and adapters',
      'ddd',
      'domain-driven design',
      'domain driven design',
      'clean architecture',
      'arquitectura hexagonal',
      'arquitectura limpia',
    ],
    evidence: {
      en: 'Applied daily in production backend services at GoodRec to isolate domain logic from infrastructure.',
      es: 'Aplicado a diario en servicios en producción en GoodRec para desacoplar el dominio de la infraestructura.',
    },
  },
  {
    id: 'microservices-async',
    name: 'Microservices, Queues & Event-Driven Systems',
    category: 'architecture',
    tier: 'core',
    years: 3.5,
    aliases: [
      'microservices',
      'microservicios',
      'event-driven',
      'event driven',
      'sqs',
      'sns',
      'eventbridge',
      'bullmq',
      'rabbitmq',
      'queues',
      'colas',
      'async',
      'distributed systems',
      'sistemas distribuidos',
    ],
    evidence: {
      en: 'Async decoupling with AWS SQS/SNS, EventBridge, BullMQ, DLQ retry policies, and idempotent consumers.',
      es: 'Desacoplamiento asíncrono con AWS SQS/SNS, EventBridge, BullMQ, políticas DLQ y consumidores idempotentes.',
    },
  },
  {
    id: 'redis-locks',
    name: 'Redis & Distributed Concurrency Locks',
    category: 'databases',
    tier: 'core',
    years: 3,
    aliases: ['redis', 'distributed locks', 'concurrency', 'race conditions', 'caching', 'cache'],
    evidence: {
      en: 'Preventing race conditions in high-concurrency booking/payment flows using atomic Redis locks.',
      es: 'Prevención de race conditions en flujos críticos de pagos y reservas con locks atómicos en Redis.',
    },
  },
  {
    id: 'postgresql',
    name: 'PostgreSQL & SQL',
    category: 'databases',
    tier: 'core',
    years: 4.5,
    aliases: ['postgresql', 'postgres', 'psql', 'sql', 'mysql', 'relational database', 'rds'],
    evidence: {
      en: 'Schema design, zero-downtime migrations, indexing, and complex analytical/wallet query tuning.',
      es: 'Diseño de esquemas, migraciones zero-downtime, indexación y optimización de consultas críticas y analíticas.',
    },
  },
  {
    id: 'mongodb',
    name: 'MongoDB & NoSQL',
    category: 'databases',
    tier: 'core',
    years: 4.5,
    aliases: ['mongodb', 'mongo', 'nosql', 'mongoose'],
    evidence: {
      en: 'Production document modeling, aggregations, and schema evolution at GoodRec and Bolsiyo.',
      es: 'Modelado documental en producción, agregaciones y migraciones en GoodRec y Bolsiyo.',
    },
  },
  {
    id: 'mcp',
    name: 'Model Context Protocol (MCP)',
    category: 'ai',
    tier: 'core',
    years: 1.5,
    aliases: ['mcp', 'model context protocol', 'ai tooling', 'tool calling', 'ai agents', 'agentes ia'],
    evidence: {
      en: 'Built internal MCP servers at GoodRec and deployed this public Cloudflare Streamable HTTP MCP server.',
      es: 'Construcción de tooling MCP interno en GoodRec y despliegue de este servidor MCP público en Cloudflare.',
    },
  },
  {
    id: 'cloudflare-ai',
    name: 'Cloudflare Workers & Cloudflare AI Gateway',
    category: 'ai',
    tier: 'core',
    years: 1.5,
    aliases: [
      'cloudflare',
      'cloudflare workers',
      'cloudflare ai gateway',
      'ai gateway',
      'llm',
      'llms',
      'openai',
      'claude',
      'anthropic',
      'prompt engineering',
      'prompting',
    ],
    evidence: {
      en: 'Centralized prompting rules, multi-LLM routing, custom team plugins/skills, and edge serverless MCPs.',
      es: 'Reglas centralizadas de prompting, enrutamiento multi-LLM, plugins/skills por área y MCPs serverless en el edge.',
    },
  },
  {
    id: 'aws-cloud',
    name: 'AWS & Serverless Cloud',
    category: 'cloud-observability',
    tier: 'core',
    years: 3.5,
    aliases: [
      'aws',
      'amazon web services',
      'ecs',
      'lambda',
      's3',
      'ec2',
      'api gateway',
      'cloudwatch',
      'ecr',
      'gcp',
      'google cloud',
      'cloud functions',
      'serverless',
    ],
    evidence: {
      en: 'Production deployments across AWS ECS, Lambda, API Gateway, S3, RDS, SQS, and Google Cloud Functions.',
      es: 'Despliegues productivos en AWS ECS, Lambda, API Gateway, S3, RDS, SQS y Google Cloud Functions.',
    },
  },
  {
    id: 'docker-cicd',
    name: 'Docker & GitHub Actions CI/CD',
    category: 'cloud-observability',
    tier: 'core',
    years: 3.5,
    aliases: ['docker', 'github actions', 'ci/cd', 'cicd', 'containers', 'devops'],
    evidence: {
      en: 'Automated quality gates, multi-stage Docker builds, ECR publishing, and zero-downtime rollouts.',
      es: 'Pipelines automatizados, imágenes Docker multi-etapa, publicación en ECR y despliegues sin caída.',
    },
  },
  {
    id: 'datadog',
    name: 'Datadog Observability & APM',
    category: 'cloud-observability',
    tier: 'core',
    years: 2,
    aliases: ['datadog', 'observability', 'observabilidad', 'apm', 'distributed tracing', 'monitoring', 'telemetry', 'logging'],
    evidence: {
      en: 'Configuring monitors, SLA alerts, distributed traces, and leading live production incident debugging.',
      es: 'Configuración de monitores, alertas SLA, trazabilidad distribuida e investigación de incidentes en vivo.',
    },
  },
  {
    id: 'product-analytics',
    name: 'Product Analytics (CleverTap & Metabase)',
    category: 'product-analytics',
    tier: 'core',
    years: 2,
    aliases: [
      'clevertap',
      'metabase',
      'product analytics',
      'business intelligence',
      'bi',
      'kpis',
      'funnels',
      'product metrics',
    ],
    evidence: {
      en: 'Instrumenting user funnels in CleverTap and building SQL dashboards in Metabase for Product, Ops, and Finance.',
      es: 'Instrumentación de embudos en CleverTap y tableros SQL en Metabase para Producto, Operaciones y Finanzas.',
    },
  },
  {
    id: 'product-ownership',
    name: 'End-to-End Product Ownership & Stakeholder Alignment',
    category: 'product-analytics',
    tier: 'core',
    years: 3,
    aliases: [
      'product owner',
      'product engineer',
      'stakeholders',
      'end-to-end',
      'end to end',
      'scrum',
      'agile',
      'tech lead',
      'technical design',
      'feature ownership',
    ],
    evidence: {
      en: 'Partnering directly with Product, Ops, Support, and Finance from problem scoping to post-release metrics.',
      es: 'Trabajo directo con Producto, Operaciones, Soporte y Finanzas desde el diseño hasta la medición de impacto.',
    },
  },
  {
    id: 'react-nextjs',
    name: 'React, Next.js & Fullstack UI/Mobile Features',
    category: 'frontend-mobile',
    tier: 'working',
    years: 3.5,
    aliases: ['react', 'next.js', 'nextjs', 'frontend', 'fullstack', 'full stack', 'full-stack', 'javascript', 'mobile'],
    evidence: {
      en: 'Shipping fullstack web & mobile features end-to-end when owning vertical product slices (backend-first profile).',
      es: 'Entrega de funcionalidades web y móviles de punta a punta en flujos verticales (perfil con foco principal en backend).',
    },
  },
];

/**
 * Technologies outside Santiago's primary day-to-day production stack,
 * used by the Recruiter Match tool to provide transparent, trustworthy assessments.
 */
export const NON_PRIMARY_TECH_SIGNALS: Array<{
  label: string;
  patterns: string[];
  note: { en: string; es: string };
}> = [
  {
    label: 'Python / Django / FastAPI (Primary Backend)',
    patterns: ['django', 'fastapi', 'flask', 'pytorch', 'tensorflow'],
    note: {
      en: 'Primary backend depth is in TypeScript/Node.js/NestJS and Java/Spring Boot rather than Python web frameworks or ML model training.',
      es: 'La profundidad principal en backend está en TypeScript/Node.js/NestJS y Java/Spring Boot, no en frameworks Python o entrenamiento de modelos ML.',
    },
  },
  {
    label: 'Go (Golang) / Rust',
    patterns: ['golang', 'rust'],
    note: {
      en: 'Production microservices experience is in Node.js/NestJS and Spring Boot; Go/Rust would require language ramp-up.',
      es: 'La experiencia productiva en microservicios es en Node.js/NestJS y Spring Boot; Go/Rust requeriría curva de adaptación al lenguaje.',
    },
  },
  {
    label: '.NET / C#',
    patterns: ['c#', '.net', 'dotnet', 'asp.net'],
    note: {
      en: 'Enterprise OOP & DDD experience comes from TypeScript/NestJS and Java/Spring Boot rather than .NET/C#.',
      es: 'La experiencia en POO empresarial y DDD proviene de TypeScript/NestJS y Java/Spring Boot, no de .NET/C#.',
    },
  },
  {
    label: 'PHP / Laravel / Ruby on Rails',
    patterns: ['laravel', 'symfony', 'ruby on rails'],
    note: {
      en: 'Core stack is modern Node.js/TypeScript and Java/Spring Boot rather than PHP or Rails.',
      es: 'El stack principal es Node.js/TypeScript moderno y Java/Spring Boot, no PHP o Ruby on Rails.',
    },
  },
  {
    label: 'Dedicated Platform Kubernetes / Terraform SRE',
    patterns: ['kubernetes', 'k8s', 'helm', 'istio'],
    note: {
      en: 'Strong production cloud experience with AWS ECS, Serverless, Docker, and CI/CD, though not a dedicated K8s cluster administrator.',
      es: 'Sólida experiencia cloud en producción con AWS ECS, Serverless, Docker y CI/CD, aunque no como administrador dedicado de clústeres Kubernetes.',
    },
  },
];

export const ARCHITECTURE_BLUEPRINT = {
  principles: [
    'Hexagonal Architecture (Ports & Adapters) and Domain-Driven Design (DDD) to keep business rules pure and testable.',
    'Concurrency safety first: atomic distributed locks in Redis and idempotent queue consumers for financial/booking critical paths.',
    'Zero-downtime schema evolution across PostgreSQL and MongoDB.',
    'Observable by default: correlated logs, Datadog APM traces, CleverTap product funnels, and Metabase SQL KPIs.',
    'Pragmatic AI acceleration: internal MCP servers, Cloudflare AI Gateway prompting governance, and area-specific LLM skills.',
  ],
  pillars: {
    cloudAndCompute: ['Cloudflare DNS & Edge', 'AWS API Gateway', 'AWS ECS Microservices', 'Google Cloud Functions', 'AWS SQS / SNS / EventBridge', 'BullMQ'],
    dataAndState: ['PostgreSQL', 'MongoDB', 'Redis Distributed Locks', 'Zero-Downtime Migrations'],
    observabilityAndProduct: ['Datadog APM & Alerting', 'CleverTap Event Funnels', 'Metabase BI & SQL'],
    aiAndTooling: ['Model Context Protocol (MCP)', 'Cloudflare AI Gateway', 'Cloudflare Workers', 'Custom Team Skills & Plugins'],
  },
};

export function buildMarkdownResume(lang: Language): string {
  if (lang === 'es') {
    return `# ${SANTIAGO_IDENTITY.fullName}
**${SANTIAGO_IDENTITY.headline.es}**
- Ubicación: ${SANTIAGO_IDENTITY.location.city}, ${SANTIAGO_IDENTITY.location.country} (${SANTIAGO_IDENTITY.location.workModalities.es})
- Web: ${SANTIAGO_IDENTITY.links.portfolio}
- Email: ${SANTIAGO_IDENTITY.links.email}
- LinkedIn: ${SANTIAGO_IDENTITY.links.linkedin}
- GitHub: ${SANTIAGO_IDENTITY.links.github}
- CV en PDF: ${SANTIAGO_IDENTITY.links.resumeEsPdf}

## Resumen Profesional
${SANTIAGO_IDENTITY.summary.es}

## Experiencia Laboral
${WORK_EXPERIENCE.map(
  (exp) => `### ${exp.role.es} — ${exp.company} (${exp.period.es} · ${exp.modality.es})
${exp.highlights.es.map((h) => `- ${h}`).join('\n')}
- **Tecnologías:** ${exp.tech.join(', ')}`
).join('\n\n')}

## Educación
${SANTIAGO_IDENTITY.education.map((ed) => `- **${ed.degree.es}** — ${ed.institution} (${ed.period})`).join('\n')}
`;
  }

  return `# ${SANTIAGO_IDENTITY.fullName}
**${SANTIAGO_IDENTITY.headline.en}**
- Location: ${SANTIAGO_IDENTITY.location.city}, ${SANTIAGO_IDENTITY.location.country} (${SANTIAGO_IDENTITY.location.workModalities.en})
- Website: ${SANTIAGO_IDENTITY.links.portfolio}
- Email: ${SANTIAGO_IDENTITY.links.email}
- LinkedIn: ${SANTIAGO_IDENTITY.links.linkedin}
- GitHub: ${SANTIAGO_IDENTITY.links.github}
- Resume PDF: ${SANTIAGO_IDENTITY.links.resumeEnPdf}

## Professional Summary
${SANTIAGO_IDENTITY.summary.en}

## Work Experience
${WORK_EXPERIENCE.map(
  (exp) => `### ${exp.role.en} — ${exp.company} (${exp.period.en} · ${exp.modality.en})
${exp.highlights.en.map((h) => `- ${h}`).join('\n')}
- **Tech Stack:** ${exp.tech.join(', ')}`
).join('\n\n')}

## Education
${SANTIAGO_IDENTITY.education.map((ed) => `- **${ed.degree.en}** — ${ed.institution} (${ed.period})`).join('\n')}
`;
}
