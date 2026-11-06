export interface DocParam {
  name: string;
  type: string;
  required: boolean;
  description: string;
}

export interface DocTool {
  name: string;
  badge: string;
  summary: string;
  params: DocParam[];
}

export interface DocPrompt {
  name: string;
  args: string;
  description: string;
}

export interface DocResource {
  uri: string;
  mimeType: string;
  description: string;
}

export interface PresetRole {
  label: string;
  role: string;
  jd: string;
}

export interface ClientConfig {
  id: string;
  label: string;
  badge: string;
  filename: string;
  steps: string[];
  snippet: string;
}

export interface PromptTab {
  id: string;
  label: string;
  prompt: string;
}

export interface ArchCard {
  tag: string;
  title: string;
  body: string;
}

export interface DocsCopyLocale {
  nav: {
    recruiter: string;
    setup: string;
    reference: string;
    architecture: string;
    backPortfolio: string;
  };
  hero: {
    statusPrefix: string;
    title: string;
    subtitle: string;
    endpointCaption: string;
    copyEndpoint: string;
    copied: string;
    specBadges: string[];
  };
  recruiter: {
    eyebrow: string;
    headline: string;
    description: string;
    steps: Array<{ step: string; title: string; detail: string }>;
    promptCardTitle: string;
    promptCardSubtitle: string;
    copyPromptBtn: string;
    promptTabs: PromptTab[];
    simulator: {
      title: string;
      subtitle: string;
      presetsLabel: string;
      presets: PresetRole[];
      rolePlaceholder: string;
      jdPlaceholder: string;
      scoreLabel: string;
      matchedLabel: string;
      gapsLabel: string;
      noGapsText: string;
    };
  };
  setup: {
    eyebrow: string;
    headline: string;
    description: string;
    copySnippet: string;
    clients: ClientConfig[];
  };
  reference: {
    eyebrow: string;
    headline: string;
    description: string;
    toolsTitle: string;
    promptsTitle: string;
    resourcesTitle: string;
    requiredBadge: string;
    optionalBadge: string;
    tools: DocTool[];
    prompts: DocPrompt[];
    resources: DocResource[];
  };
  architecture: {
    eyebrow: string;
    headline: string;
    description: string;
    cards: ArchCard[];
  };
  footer: {
    gateway: string;
    health: string;
    portfolio: string;
    source: string;
  };
}

export const DOCS_COPY: Record<'en' | 'es', DocsCopyLocale> = {
  en: {
    nav: {
      recruiter: 'Recruiter Fit',
      setup: 'Quick Start',
      reference: 'API Reference',
      architecture: 'Architecture',
      backPortfolio: 'santiago-jv.tech',
    },
    hero: {
      statusPrefix: 'Operational on Cloudflare Edge',
      title: 'Santiago Olayo MCP.',
      subtitle:
        'Official documentation for mcp.santiago-jv.tech — connect Claude, Codex, Antigravity, Cursor, or ChatGPT to explore my engineering career, audit backend architecture, or evaluate open job vacancies in plain language.',
      endpointCaption: 'Streamable HTTP Endpoint · Public Read-Only · Zero Auth Required',
      copyEndpoint: 'Copy Endpoint',
      copied: 'Copied',
      specBadges: [
        'Protocol: MCP 2025-03-26',
        'Transport: Streamable HTTP',
        'Runtime: Cloudflare Workers',
        'Auth: Public + Edge Rate Limit',
        'CI/CD: GitHub Actions',
      ],
    },
    recruiter: {
      eyebrow: 'For Recruiters, CTOs & Hiring Teams',
      headline: 'Ask Naturally. Let Your AI Pick the Tool.',
      description:
        'Because every capability on this MCP server is documented with rich semantic descriptions and strict Zod schemas, you never have to type function names—just ask in plain language or paste your job description.',
      steps: [
        {
          step: '01',
          title: 'Connect mcp.santiago-jv.tech/mcp',
          detail:
            'Add the public URL to Claude, Codex, Antigravity, Cursor, or ChatGPT. Zero API tokens, logins, or approvals required.',
        },
        {
          step: '02',
          title: 'Ask in Plain Natural Language',
          detail:
            'Paste your open role or ask an engineering question. Your AI automatically discovers and chains the right MCP tools.',
        },
        {
          step: '03',
          title: 'Get an Honest Executive Brief',
          detail:
            'Receive a 0–100 fit score, production evidence from GoodRec & Bolsiyo, transparent stack gaps, and direct outreach links.',
        },
      ],
      promptCardTitle: 'Ready-to-Use Natural Prompts',
      promptCardSubtitle:
        'Zero explicit tool names required—choose an audience and paste directly into your connected AI:',
      copyPromptBtn: 'Copy Prompt',
      promptTabs: [
        {
          id: 'recruiter',
          label: 'Recruiter Vacancy Fit',
          prompt: `Evaluate how well Santiago Olayo fits our open role below.

Give me a concise hiring brief covering:
1. Overall fit score and clear recommendation (Should we interview him, and why?).
2. Top matching backend, cloud, product, or AI strengths backed by his real production work.
3. Any honest stack or work-modality gaps we should validate in a screening call.
4. His direct email, LinkedIn, and downloadable PDF resume link.

Open Role / Job Description:
[PASTE YOUR JOB DESCRIPTION HERE]`,
        },
        {
          id: 'engineering',
          label: 'Architecture & Stack Audit',
          prompt: `Give me a concrete technical deep dive into Santiago Olayo's production engineering background.

Cover:
1. How he structures backend services (Hexagonal Architecture, DDD, TypeScript/NestJS, Java/Spring Boot).
2. How he handles high concurrency, distributed Redis locks, async queues, and zero-downtime migrations.
3. How he uses Datadog, CleverTap, Metabase, MCP servers, and Cloudflare Workers in production.`,
        },
        {
          id: 'intro',
          label: '30s Intro & Outreach Draft',
          prompt: `Give me a 30-second executive snapshot of who Santiago Olayo is, his timezone and work modalities, and draft a short personalized interview invitation email from [COMPANY NAME] for our [ROLE TITLE] opening.`,
        },
      ],
      simulator: {
        title: 'Instant Vacancy Match Simulator',
        subtitle:
          'No MCP client open right now? Test a preset role or paste your job description below for an instant edge compatibility preview:',
        presetsLabel: 'Load sample role:',
        presets: [
          {
            label: 'Senior Backend (NestJS / AWS)',
            role: 'Senior Backend Engineer',
            jd: 'Looking for a Senior Backend Engineer with 4+ years of experience in TypeScript, Node.js, and NestJS. Must understand Hexagonal Architecture, DDD, PostgreSQL, MongoDB, Redis concurrency locks, AWS ECS, CI/CD with GitHub Actions, and Datadog observability. Remote LatAm/US.',
          },
          {
            label: 'AI & Internal Tools Engineer',
            role: 'Applied AI & Platform Engineer',
            jd: 'Seeking a Fullstack / Backend Software Engineer to build internal AI workflows, custom Model Context Protocol (MCP) servers, serverless edge services on Cloudflare Workers, and product analytics dashboards in Metabase & CleverTap. 4+ years experience, Remote.',
          },
          {
            label: 'Different Stack (Rust / K8s SRE)',
            role: 'Staff Rust & Kubernetes SRE',
            jd: 'We need 8+ years of experience writing low-level Rust systems and administering bare-metal Kubernetes + Istio clusters on-site in Berlin.',
          },
        ],
        rolePlaceholder: 'Role title (e.g., Senior Backend Engineer)',
        jdPlaceholder: 'Paste your job description, required tech stack, seniority, and modality...',
        scoreLabel: 'Compatibility Score',
        matchedLabel: 'Matched Production Skills',
        gapsLabel: 'Transparent Screening Notes',
        noGapsText: 'No critical stack or modality gaps detected against primary profile.',
      },
    },
    setup: {
      eyebrow: 'Quick Start',
      headline: 'Connect in 10 Seconds.',
      description:
        'Select your AI client below and copy the configuration snippet. Supports Web Standard Streamable HTTP out of the box.',
      copySnippet: 'Copy Snippet',
      clients: [
        {
          id: 'claude',
          label: 'Claude',
          badge: 'Claude Code, Web & Desktop',
          filename: 'Claude CLI / Connectors',
          steps: [
            'In Claude Code CLI, run the one-line command below to connect over native Streamable HTTP.',
            'In Claude.ai Web or Desktop, open Settings → Connectors → Add Custom Connector and paste https://mcp.santiago-jv.tech/mcp.',
          ],
          snippet: `# Option A — Claude Code CLI (1 command)
claude mcp add --transport http santiago-jv https://mcp.santiago-jv.tech/mcp

# Option B — claude_desktop_config.json
{
  "mcpServers": {
    "santiago-jv": {
      "command": "npx",
      "args": ["-y", "mcp-remote", "https://mcp.santiago-jv.tech/mcp"]
    }
  }
}`,
        },
        {
          id: 'codex',
          label: 'Codex',
          badge: 'OpenAI Codex CLI & App',
          filename: '~/.codex/config.toml',
          steps: [
            'Run codex mcp add in your terminal, or add the Streamable HTTP block directly to ~/.codex/config.toml.',
            'Ask naturally: "How well does Santiago Olayo fit our Senior Backend Engineer opening? Here is the job description..."',
          ],
          snippet: `# Option A — Codex CLI
codex mcp add santiago-jv --url https://mcp.santiago-jv.tech/mcp

# Option B — ~/.codex/config.toml
[mcp_servers.santiago-jv]
url = "https://mcp.santiago-jv.tech/mcp"`,
        },
        {
          id: 'antigravity',
          label: 'Antigravity',
          badge: 'Google Antigravity',
          filename: '~/.gemini/config/mcp_config.json',
          steps: [
            'Open ~/.gemini/config/mcp_config.json (or go to Left Sidebar → Skills & Customizations → MCP Servers).',
            'Add the native Streamable HTTP entry under mcpServers, save, and ask about Santiago in plain language.',
          ],
          snippet: `{
  "mcpServers": {
    "santiago-jv": {
      "url": "https://mcp.santiago-jv.tech/mcp"
    }
  }
}`,
        },
        {
          id: 'cursor',
          label: 'Cursor',
          badge: 'Cursor Agent IDE',
          filename: '~/.cursor/mcp.json',
          steps: [
            'Open Cursor Settings → Tools & MCP → Add New MCP Server (or edit ~/.cursor/mcp.json).',
            'Paste the Streamable HTTP configuration below and save.',
          ],
          snippet: `{
  "mcpServers": {
    "santiago-jv": {
      "url": "https://mcp.santiago-jv.tech/mcp"
    }
  }
}`,
        },
        {
          id: 'chatgpt',
          label: 'ChatGPT / OpenAI',
          badge: 'Responses API & Connectors',
          filename: 'OpenAI MCP Tool Config',
          steps: [
            'In ChatGPT Connectors / Developer Mode or the OpenAI Responses API, register the remote Streamable HTTP MCP URL.',
            'No authentication header is required.',
          ],
          snippet: `{
  "type": "mcp",
  "server_label": "santiago_jv",
  "server_url": "https://mcp.santiago-jv.tech/mcp",
  "require_approval": "never"
}`,
        },
        {
          id: 'vscode',
          label: 'VS Code / Windsurf',
          badge: 'Copilot Agent Mode',
          filename: '.vscode/mcp.json',
          steps: [
            'Create .vscode/mcp.json in your workspace (or user settings) with type "http".',
            'Open GitHub Copilot Chat in Agent mode and ask about Santiago’s experience, stack, or role fit in natural language.',
          ],
          snippet: `{
  "servers": {
    "santiago-jv": {
      "type": "http",
      "url": "https://mcp.santiago-jv.tech/mcp"
    }
  }
}`,
        },
        {
          id: 'curl',
          label: 'cURL / Inspector',
          badge: 'Raw JSON-RPC',
          filename: 'Terminal',
          steps: [
            'Verify the stateless Streamable HTTP endpoint directly from your terminal or launch the official MCP Inspector.',
          ],
          snippet: `curl -X POST https://mcp.santiago-jv.tech/mcp \\
  -H "Content-Type: application/json" \\
  -H "Accept: application/json, text/event-stream" \\
  -d '{
    "jsonrpc": "2.0",
    "id": 1,
    "method": "tools/list",
    "params": {}
  }'`,
        },
      ],
    },
    reference: {
      eyebrow: 'API Reference',
      headline: 'Tools, Prompts & Resources.',
      description:
        'Under the hood, every capability exposed by mcp.santiago-jv.tech is strictly typed with Zod schemas and read-only MCP annotations so LLMs select the right tool autonomously.',
      toolsTitle: 'Auto-Discovered Tools (6)',
      promptsTitle: 'Server Prompts (3)',
      resourcesTitle: 'Context Resources (4)',
      requiredBadge: 'required',
      optionalBadge: 'optional',
      tools: [
        {
          name: 'evaluate_vacancy_match',
          badge: 'Recruiter Flagship',
          summary:
            'Scores a job description (0–100) against Santiago’s stack, seniority, architecture depth, and modality—returning matched production evidence and transparent stack gaps.',
          params: [
            { name: 'job_description', type: 'string', required: true, description: 'Full job description text or role requirements (up to 10,000 chars).' },
            { name: 'role_title', type: 'string', required: false, description: 'Title of the open position (e.g. "Senior Backend Engineer").' },
            { name: 'required_skills', type: 'string[]', required: false, description: 'Optional explicit list of must-have skills to verify.' },
            { name: 'modality', type: '"remote" | "hybrid" | "onsite"', required: false, description: 'Work modality to validate location compatibility.' },
            { name: 'language', type: '"en" | "es"', required: false, description: 'Report language (auto-detected from vacancy text if omitted).' },
          ],
        },
        {
          name: 'get_profile_overview',
          badge: 'Identity & Bio',
          summary:
            'Returns executive summary, headline, 4+ years experience overview, location/timezone (UTC-5), spoken languages, education, and resume PDF URLs.',
          params: [
            { name: 'language', type: '"en" | "es"', required: false, description: 'Response language ("en" default or "es").' },
          ],
        },
        {
          name: 'get_work_experience',
          badge: 'Career History',
          summary:
            'Detailed career timeline across GoodRec, Bolsiyo, and Cooltivalo · +COTAS · SLS GROUPS with filterable engineering domains.',
          params: [
            { name: 'company', type: 'string', required: false, description: 'Filter by company name (e.g. "GoodRec", "Bolsiyo").' },
            { name: 'focus', type: '"all" | "backend" | "ai-mcp" | "observability" | "product"', required: false, description: 'Filter roles by engineering focus.' },
            { name: 'language', type: '"en" | "es"', required: false, description: 'Response language ("en" or "es").' },
          ],
        },
        {
          name: 'get_tech_stack_and_architecture',
          badge: 'Stack & Blueprint',
          summary:
            'Categorized skill matrix with years of production experience, concrete evidence, and system architecture principles (Hexagonal, DDD, Redis Locks, Datadog, MCP).',
          params: [
            { name: 'domain', type: '"all" | "backend" | "architecture" | "ai" | "cloud-observability" | "databases" | "product-analytics"', required: false, description: 'Technical category filter.' },
            { name: 'language', type: '"en" | "es"', required: false, description: 'Response language ("en" or "es").' },
          ],
        },
        {
          name: 'get_social_and_contact_links',
          badge: 'Verified Channels',
          summary:
            'Returns email (contact@santiago-jv.tech), LinkedIn, GitHub, X, Medium, portfolio URL, and downloadable EN/ES PDF resumes.',
          params: [
            { name: 'include_resume_urls', type: 'boolean', required: false, description: 'Include direct PDF download links (default: true).' },
          ],
        },
        {
          name: 'prepare_outreach_context',
          badge: 'ATS & Outreach',
          summary:
            'Generates a structured ATS candidate note and a personalized interview invitation email draft for recruiters.',
          params: [
            { name: 'company_name', type: 'string', required: true, description: 'Hiring company name.' },
            { name: 'role_title', type: 'string', required: true, description: 'Title of the open role.' },
            { name: 'recruiter_name', type: 'string', required: false, description: 'Recruiter or hiring manager name.' },
          ],
        },
      ],
      prompts: [
        {
          name: 'evaluate_candidate_fit',
          args: 'job_description, language?',
          description: 'Natural-language Staff Technical Recruiter assessment prompt for evaluating your open role.',
        },
        {
          name: 'technical_deep_dive',
          args: 'topic?',
          description: 'Guides CTOs and Tech Leads through production architecture decisions in backend concurrency, observability, or MCP.',
        },
        {
          name: 'quick_intro',
          args: 'language?',
          description: 'Generates a 30-second executive summary with verified contact and resume links.',
        },
      ],
      resources: [
        { uri: 'santiago://profile/resume-en', mimeType: 'text/markdown', description: 'Complete structured English CV in Markdown.' },
        { uri: 'santiago://profile/resume-es', mimeType: 'text/markdown', description: 'Complete structured Spanish CV in Markdown.' },
        { uri: 'santiago://profile/architecture-blueprint', mimeType: 'application/json', description: 'Production architecture pillars across Cloud, Data, Observability, and AI/MCP.' },
        { uri: 'santiago://profile/contact-card', mimeType: 'application/json', description: 'Canonical JSON contact card, social links, and PDF URLs.' },
      ],
    },
    architecture: {
      eyebrow: 'Under the Hood',
      headline: 'Engineered for the Public Edge.',
      description: 'How mcp.santiago-jv.tech stays fast, free to operate, abuse-resistant, and zero-friction.',
      cards: [
        {
          tag: 'Access Model',
          title: 'Why Public Read-Only Instead of Zero Trust Login?',
          body: 'Gating public career data behind Cloudflare Access or API tokens adds friction that stops recruiters from testing. Instead, only curated public professional data is exposed, with zero write operations.',
        },
        {
          tag: 'Transport',
          title: 'Stateless Streamable HTTP on Cloudflare Workers',
          body: 'Uses WebStandardStreamableHTTPServerTransport in stateless JSON mode—avoiding brittle long-lived SSE connections, proxy timeouts, and idle compute charges.',
        },
        {
          tag: 'Cost & Abuse Safety',
          title: '$0 LLM Token Exposure + Edge Rate Limiting',
          body: 'Vacancy scoring executes deterministically at the Cloudflare edge (<5ms) while your own connected AI synthesizes the narrative—protected by 45 req/min IP rate limits and strict 32 KB body caps.',
        },
        {
          tag: 'Delivery',
          title: 'Automated GitHub Actions CI/CD',
          body: 'Every push to main runs strict TypeScript typechecking, MCP protocol integration tests, and automated Wrangler deployment to mcp.santiago-jv.tech.',
        },
      ],
    },
    footer: {
      gateway: 'Gateway (/)',
      health: 'Health JSON (/health)',
      portfolio: 'Portfolio (santiago-jv.tech)',
      source: 'Source on GitHub',
    },
  },
  es: {
    nav: {
      recruiter: 'Match Vacantes',
      setup: 'Conexión Rápida',
      reference: 'Referencia API',
      architecture: 'Arquitectura',
      backPortfolio: 'santiago-jv.tech',
    },
    hero: {
      statusPrefix: 'Operativo en Cloudflare Edge',
      title: 'Santiago Olayo MCP.',
      subtitle:
        'Documentación oficial de mcp.santiago-jv.tech — conecta Claude, Codex, Antigravity, Cursor o ChatGPT para explorar mi trayectoria, auditar mi arquitectura backend o evaluar vacantes abiertas en lenguaje natural.',
      endpointCaption: 'Endpoint Streamable HTTP · Público de Solo Lectura · Sin Autenticación',
      copyEndpoint: 'Copiar Endpoint',
      copied: 'Copiado',
      specBadges: [
        'Protocolo: MCP 2025-03-26',
        'Transporte: Streamable HTTP',
        'Runtime: Cloudflare Workers',
        'Auth: Público + Rate Limit Edge',
        'CI/CD: GitHub Actions',
      ],
    },
    recruiter: {
      eyebrow: 'Para Reclutadores, CTOs y Equipos de Talento',
      headline: 'Pregunta Natural. Tu IA Elige la Herramienta.',
      description:
        'Como cada capacidad de este servidor MCP está documentada semánticamente con esquemas Zod estrictos, nunca necesitas escribir nombres de funciones: solo pregunta en lenguaje natural o pega tu vacante.',
      steps: [
        {
          step: '01',
          title: 'Conecta mcp.santiago-jv.tech/mcp',
          detail:
            'Agrega la URL pública en Claude, Codex, Antigravity, Cursor o ChatGPT. Sin API keys, cuentas ni permisos previos.',
        },
        {
          step: '02',
          title: 'Pregunta en Lenguaje Natural',
          detail:
            'Pega la descripción de tu vacante o haz una pregunta técnica. Tu IA detecta e invoca automáticamente las herramientas adecuadas.',
        },
        {
          step: '03',
          title: 'Recibe un Diagnóstico Honesto',
          detail:
            'Obtén un puntaje de 0 a 100, evidencia real en GoodRec y Bolsiyo, brechas honestas de stack y mis enlaces directos de contacto.',
        },
      ],
      promptCardTitle: 'Prompts Naturales Listos para Copiar',
      promptCardSubtitle:
        'Sin mencionar nombres internos de herramientas — elige tu enfoque y pégalo en tu IA conectada:',
      copyPromptBtn: 'Copiar Prompt',
      promptTabs: [
        {
          id: 'recruiter',
          label: 'Evaluar Vacante',
          prompt: `Evalúa qué tanto encaja Santiago Olayo con nuestra vacante de abajo.

Dame un resumen ejecutivo de selección con:
1. Puntaje general de compatibilidad y recomendación clara (¿Deberíamos entrevistarlo y por qué?).
2. Principales fortalezas en backend, cloud, producto o IA respaldadas por su experiencia real en producción.
3. Cualquier brecha honesta de stack o modalidad que convenga validar en una primera llamada.
4. Su correo directo, LinkedIn y enlace para descargar su CV en PDF.

Descripción de la vacante:
[PEGA AQUÍ TU VACANTE]`,
        },
        {
          id: 'engineering',
          label: 'Auditoría Técnica',
          prompt: `Dame un análisis técnico concreto de la experiencia en ingeniería de producción de Santiago Olayo.

Incluye:
1. Cómo estructura servicios backend (Arquitectura Hexagonal, DDD, TypeScript/NestJS, Java/Spring Boot).
2. Cómo resuelve alta concurrencia, locks distribuidos en Redis, colas asíncronas y migraciones sin caída.
3. Cómo aplica Datadog, CleverTap, Metabase, servidores MCP y Cloudflare Workers en producción.`,
        },
        {
          id: 'intro',
          label: 'Resumen 30s + Invitación',
          prompt: `Dame un resumen ejecutivo de 30 segundos sobre quién es Santiago Olayo, su zona horaria y modalidad de trabajo, y redacta un correo breve para invitarlo a entrevista desde [NOMBRE DE EMPRESA] para el rol de [TÍTULO DEL CARGO].`,
        },
      ],
      simulator: {
        title: 'Simulador Interactivo de Vacantes',
        subtitle:
          '¿No tienes un cliente MCP abierto ahora mismo? Prueba un ejemplo o pega tu vacante abajo para ver la compatibilidad al instante:',
        presetsLabel: 'Cargar ejemplo:',
        presets: [
          {
            label: 'Senior Backend (NestJS / AWS)',
            role: 'Senior Backend Engineer',
            jd: 'Buscamos Senior Backend Engineer con 4+ años de experiencia en TypeScript, Node.js y NestJS. Dominio de Arquitectura Hexagonal, DDD, PostgreSQL, MongoDB, locks en Redis, AWS ECS, CI/CD con GitHub Actions y monitoreo en Datadog. Modalidad 100% Remoto.',
          },
          {
            label: 'Ingeniero IA & Internal Tools',
            role: 'Product Owner / AI Tooling Engineer',
            jd: 'Buscamos Ingeniero de Software Fullstack/Backend para liderar automatización de procesos internos con IA, servidores Model Context Protocol (MCP), servicios serverless en Cloudflare Workers y analítica de producto con CleverTap y Metabase. 4+ años, Remoto.',
          },
          {
            label: 'Otro Stack (Rust / K8s Presencial)',
            role: 'SRE Rust & Kubernetes',
            jd: 'Requerimos 8 años de experiencia programando en Rust y administrando clústeres Kubernetes e Istio de forma presencial en Madrid.',
          },
        ],
        rolePlaceholder: 'Título del cargo (ej. Senior Backend Engineer)',
        jdPlaceholder: 'Pega aquí los requisitos de la vacante, tecnologías, años de experiencia y modalidad...',
        scoreLabel: 'Nivel de Match',
        matchedLabel: 'Habilidades Coincidentes en Producción',
        gapsLabel: 'Notas de Transparencia / Brechas',
        noGapsText: 'Sin brechas críticas de stack o modalidad frente a su perfil principal.',
      },
    },
    setup: {
      eyebrow: 'Conexión Rápida',
      headline: 'Conéctalo en 10 Segundos.',
      description:
        'Selecciona tu herramienta de IA y copia el bloque de configuración. Funciona sobre Streamable HTTP estándar.',
      copySnippet: 'Copiar Configuración',
      clients: [
        {
          id: 'claude',
          label: 'Claude',
          badge: 'Claude Code, Web y Desktop',
          filename: 'Claude CLI / Conectores',
          steps: [
            'En Claude Code CLI, ejecuta el comando de una línea de abajo para conectar por Streamable HTTP nativo.',
            'En Claude.ai Web o Desktop, abre Configuración → Conectores → Agregar conector personalizado y pega https://mcp.santiago-jv.tech/mcp.',
          ],
          snippet: `# Opción A — Claude Code CLI (1 comando)
claude mcp add --transport http santiago-jv https://mcp.santiago-jv.tech/mcp

# Opción B — claude_desktop_config.json
{
  "mcpServers": {
    "santiago-jv": {
      "command": "npx",
      "args": ["-y", "mcp-remote", "https://mcp.santiago-jv.tech/mcp"]
    }
  }
}`,
        },
        {
          id: 'codex',
          label: 'Codex',
          badge: 'OpenAI Codex CLI & App',
          filename: '~/.codex/config.toml',
          steps: [
            'Ejecuta codex mcp add en tu terminal, o agrega el bloque Streamable HTTP directamente en ~/.codex/config.toml.',
            'Pregunta en lenguaje natural: "¿Qué tanto encaja Santiago Olayo con nuestra vacante Senior Backend? Aquí está la descripción..."',
          ],
          snippet: `# Opción A — Codex CLI
codex mcp add santiago-jv --url https://mcp.santiago-jv.tech/mcp

# Opción B — ~/.codex/config.toml
[mcp_servers.santiago-jv]
url = "https://mcp.santiago-jv.tech/mcp"`,
        },
        {
          id: 'antigravity',
          label: 'Antigravity',
          badge: 'Google Antigravity',
          filename: '~/.gemini/config/mcp_config.json',
          steps: [
            'Abre ~/.gemini/config/mcp_config.json (o ve a la barra lateral izquierda → Skills & Customizations → MCP Servers).',
            'Agrega el bloque Streamable HTTP dentro de mcpServers, guarda y consulta sobre Santiago en lenguaje natural.',
          ],
          snippet: `{
  "mcpServers": {
    "santiago-jv": {
      "url": "https://mcp.santiago-jv.tech/mcp"
    }
  }
}`,
        },
        {
          id: 'cursor',
          label: 'Cursor',
          badge: 'Cursor Agent IDE',
          filename: '~/.cursor/mcp.json',
          steps: [
            'Abre Cursor Settings → Tools & MCP → Add New MCP Server (o edita ~/.cursor/mcp.json).',
            'Pega la configuración de abajo y guarda.',
          ],
          snippet: `{
  "mcpServers": {
    "santiago-jv": {
      "url": "https://mcp.santiago-jv.tech/mcp"
    }
  }
}`,
        },
        {
          id: 'chatgpt',
          label: 'ChatGPT / OpenAI',
          badge: 'Responses API y Conectores',
          filename: 'OpenAI MCP Tool Config',
          steps: [
            'En Conectores MCP de ChatGPT o en la Responses API de OpenAI, registra el endpoint remoto Streamable HTTP.',
            'No requiere encabezados de autenticación.',
          ],
          snippet: `{
  "type": "mcp",
  "server_label": "santiago_jv",
  "server_url": "https://mcp.santiago-jv.tech/mcp",
  "require_approval": "never"
}`,
        },
        {
          id: 'vscode',
          label: 'VS Code / Windsurf',
          badge: 'Copilot Agent Mode',
          filename: '.vscode/mcp.json',
          steps: [
            'Crea .vscode/mcp.json en tu proyecto con tipo "http".',
            'Abre GitHub Copilot Chat en modo Agente y pregunta en lenguaje natural sobre la experiencia, arquitectura o compatibilidad de Santiago.',
          ],
          snippet: `{
  "servers": {
    "santiago-jv": {
      "type": "http",
      "url": "https://mcp.santiago-jv.tech/mcp"
    }
  }
}`,
        },
        {
          id: 'curl',
          label: 'cURL / Inspector',
          badge: 'JSON-RPC Directo',
          filename: 'Terminal',
          steps: [
            'Verifica el servidor directamente desde tu terminal con cURL o con el MCP Inspector oficial.',
          ],
          snippet: `curl -X POST https://mcp.santiago-jv.tech/mcp \\
  -H "Content-Type: application/json" \\
  -H "Accept: application/json, text/event-stream" \\
  -d '{
    "jsonrpc": "2.0",
    "id": 1,
    "method": "tools/list",
    "params": {}
  }'`,
        },
      ],
    },
    reference: {
      eyebrow: 'Referencia Técnica',
      headline: 'Tools, Prompts y Resources.',
      description:
        'Internamente, cada capacidad expuesta en mcp.santiago-jv.tech tiene validación estricta en Zod y anotaciones de solo lectura para que cualquier LLM elija la herramienta correcta de forma autónoma.',
      toolsTitle: 'Herramientas Autodescubiertas (6)',
      promptsTitle: 'Prompts del Servidor (3)',
      resourcesTitle: 'Recursos de Contexto (4)',
      requiredBadge: 'requerido',
      optionalBadge: 'opcional',
      tools: [
        {
          name: 'evaluate_vacancy_match',
          badge: 'Estrella para Reclutadores',
          summary:
            'Evalúa una vacante (0–100) contra la experiencia real, stack técnico, seniority y modalidad de Santiago, entregando fortalezas probadas y brechas honestas.',
          params: [
            { name: 'job_description', type: 'string', required: true, description: 'Texto completo de la vacante o requisitos del rol (máx. 10,000 caracteres).' },
            { name: 'role_title', type: 'string', required: false, description: 'Nombre de la vacante (ej. "Senior Backend Engineer").' },
            { name: 'required_skills', type: 'string[]', required: false, description: 'Lista opcional de habilidades obligatorias a verificar.' },
            { name: 'modality', type: '"remote" | "hybrid" | "onsite"', required: false, description: 'Modalidad de trabajo de la vacante.' },
            { name: 'language', type: '"en" | "es"', required: false, description: 'Idioma del reporte (autodetectado si se omite).' },
          ],
        },
        {
          name: 'get_profile_overview',
          badge: 'Perfil y Resumen',
          summary:
            'Devuelve resumen profesional, titular, 4+ años de experiencia, ubicación/zona horaria (UTC-5), idiomas, educación y enlaces al CV en PDF.',
          params: [
            { name: 'language', type: '"en" | "es"', required: false, description: 'Idioma de respuesta ("en" o "es").' },
          ],
        },
        {
          name: 'get_work_experience',
          badge: 'Trayectoria Laboral',
          summary:
            'Historial detallado en GoodRec, Bolsiyo y Cooltivalo · +COTAS · SLS GROUPS con filtro opcional por empresa o dominio.',
          params: [
            { name: 'company', type: 'string', required: false, description: 'Filtro por empresa (ej. "GoodRec", "Bolsiyo").' },
            { name: 'focus', type: '"all" | "backend" | "ai-mcp" | "observability" | "product"', required: false, description: 'Filtro por área de ingeniería.' },
            { name: 'language', type: '"en" | "es"', required: false, description: 'Idioma ("en" o "es").' },
          ],
        },
        {
          name: 'get_tech_stack_and_architecture',
          badge: 'Stack y Arquitectura',
          summary:
            'Matriz de habilidades con años de uso en producción, evidencia concreta y principios de arquitectura (Hexagonal, DDD, Redis Locks, Datadog, MCP).',
          params: [
            { name: 'domain', type: '"all" | "backend" | "architecture" | "ai" | "cloud-observability" | "databases" | "product-analytics"', required: false, description: 'Categoría técnica a consultar.' },
            { name: 'language', type: '"en" | "es"', required: false, description: 'Idioma ("en" o "es").' },
          ],
        },
        {
          name: 'get_social_and_contact_links',
          badge: 'Redes y Contacto',
          summary:
            'Entrega correo oficial (contact@santiago-jv.tech), LinkedIn, GitHub, X, Medium, portafolio y CVs descargables en PDF (ES/EN).',
          params: [
            { name: 'include_resume_urls', type: 'boolean', required: false, description: 'Incluir enlaces directos a los PDF de Hoja de Vida.' },
          ],
        },
        {
          name: 'prepare_outreach_context',
          badge: 'Ficha ATS y Contacto',
          summary:
            'Genera una ficha resumen lista para ATS y un borrador de mensaje para invitar a Santiago a un proceso de selección.',
          params: [
            { name: 'company_name', type: 'string', required: true, description: 'Nombre de la empresa.' },
            { name: 'role_title', type: 'string', required: true, description: 'Título de la vacante.' },
            { name: 'recruiter_name', type: 'string', required: false, description: 'Nombre del reclutador o líder.' },
          ],
        },
      ],
      prompts: [
        {
          name: 'evaluate_candidate_fit',
          args: 'job_description, language?',
          description: 'Prompt en lenguaje natural para obtener un dictamen ejecutivo completo sobre una vacante abierta.',
        },
        {
          name: 'technical_deep_dive',
          args: 'topic?',
          description: 'Permite a CTOs y Tech Leads profundizar en arquitectura backend, concurrencia, observabilidad o MCP.',
        },
        {
          name: 'quick_intro',
          args: 'language?',
          description: 'Resumen ejecutivo de 30 segundos con canales verificados de contacto y CV.',
        },
      ],
      resources: [
        { uri: 'santiago://profile/resume-en', mimeType: 'text/markdown', description: 'Hoja de Vida completa en inglés en formato Markdown.' },
        { uri: 'santiago://profile/resume-es', mimeType: 'text/markdown', description: 'Hoja de Vida completa en español en formato Markdown.' },
        { uri: 'santiago://profile/architecture-blueprint', mimeType: 'application/json', description: 'Blueprint de arquitectura productiva en Cloud, Datos, Observabilidad e IA/MCP.' },
        { uri: 'santiago://profile/contact-card', mimeType: 'application/json', description: 'Tarjeta JSON verificada de contacto, redes y enlaces PDF.' },
      ],
    },
    architecture: {
      eyebrow: 'Arquitectura del Servidor',
      headline: 'Diseñado para el Edge Público.',
      description: 'Decisiones técnicas detrás de mcp.santiago-jv.tech para mantenerlo rápido, seguro, sin costos variables y sin fricción.',
      cards: [
        {
          tag: 'Modelo de Acceso',
          title: '¿Por qué Público de Solo Lectura y no Zero Trust?',
          body: 'Exigir login o tokens para consultar información profesional pública frena al 99% de los reclutadores. En su lugar, solo se exponen datos públicos curados de CV sin operaciones de escritura.',
        },
        {
          tag: 'Transporte',
          title: 'Streamable HTTP Stateless en Cloudflare Workers',
          body: 'Implementa WebStandardStreamableHTTPServerTransport sin sesiones colgadas, evitando caídas de SSE en firewalls corporativos y manteniendo latencias de milisegundos.',
        },
        {
          tag: 'Seguridad y Costo $0',
          title: 'Cero Exposición de Llaves LLM + Rate Limit por IP',
          body: 'La evaluación de vacantes se calcula determinísticamente en el edge (<5ms) mientras la IA propia del reclutador redacta el informe, protegido con límite de 45 req/min por IP y tope de 32 KB.',
        },
        {
          tag: 'Despliegue Continuo',
          title: 'CI/CD Automatizado con GitHub Actions',
          body: 'Cada push a main ejecuta validación estricta de TypeScript, pruebas de protocolo MCP y despliegue automático con Wrangler hacia mcp.santiago-jv.tech.',
        },
      ],
    },
    footer: {
      gateway: 'Gateway (/)',
      health: 'Health JSON (/health)',
      portfolio: 'Portafolio (santiago-jv.tech)',
      source: 'Código en GitHub',
    },
  },
};
