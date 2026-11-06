export interface DocsRenderProps {
  mcpEndpoint: string;
  portfolioUrl: string;
  version: string;
  edgeColo: string;
}

const DOCS_COPY = {
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

export function renderAppleDocsHtml({
  mcpEndpoint,
  portfolioUrl,
  version,
  edgeColo,
}: DocsRenderProps): string {
  const serializedCopy = JSON.stringify(DOCS_COPY).replace(/</g, '\\u003c');
  const currentYear = new Date().getFullYear();

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>Santiago Olayo MCP Server — Documentation &amp; Recruiter Guide (mcp.santiago-jv.tech/docs)</title>
  <meta name="description" content="Official documentation for mcp.santiago-jv.tech. Connect Claude, Codex, Antigravity, Cursor, or ChatGPT to explore Santiago Olayo’s career or evaluate job vacancy fit in plain language." />
  <link rel="canonical" href="https://mcp.santiago-jv.tech/docs" />
  <link rel="icon" href="https://www.santiago-jv.tech/favicon.svg" type="image/svg+xml" />
  <style>
    :root {
      --bg-white: #ffffff;
      --bg-stone: #f5f5f7;
      --text-primary: #1d1d1f;
      --text-secondary: #6e6e73;
      --text-tertiary: #86868b;
      --accent: #1d1d1f;
      --accent-hover: #333336;
      --border: rgba(0, 0, 0, 0.08);
      --green: #1d8348;
      --green-tint: rgba(29, 131, 72, 0.1);
      --red: #c0392b;
      --red-tint: rgba(192, 57, 43, 0.1);
      --radius-bento: 28px;
      --radius-card: 22px;
      --radius-pill: 980px;
      --shadow-subtle: 0 4px 20px rgba(0, 0, 0, 0.03);
      --shadow-bento: 0 12px 34px rgba(0, 0, 0, 0.05);
      --font-sans: -apple-system, BlinkMacSystemFont, 'SF Pro Display', 'SF Pro Text', 'Inter', 'Helvetica Neue', Arial, sans-serif;
      --font-mono: 'SF Mono', ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
    }

    * { box-sizing: border-box; margin: 0; padding: 0; }
    html { scroll-behavior: smooth; }
    body {
      font-family: var(--font-sans);
      background: var(--bg-white);
      color: var(--text-primary);
      -webkit-font-smoothing: antialiased;
      line-height: 1.55;
    }

    ::selection {
      background: rgba(29, 29, 31, 0.14);
      color: #1d1d1f;
    }

    .endpoint-dock ::selection,
    .endpoint-dock::selection,
    .prompt-pre ::selection,
    .prompt-pre::selection,
    .code-block ::selection,
    .code-block::selection {
      background: rgba(255, 255, 255, 0.24);
      color: #ffffff;
    }

    a { color: inherit; text-decoration: none; }
    button { font-family: inherit; cursor: pointer; border: none; background: none; }

    /* Sticky Apple Glass Header */
    .glass-header {
      position: sticky;
      top: 0;
      z-index: 50;
      height: 54px;
      background: rgba(255, 255, 255, 0.8);
      backdrop-filter: saturate(180%) blur(20px);
      -webkit-backdrop-filter: saturate(180%) blur(20px);
      border-bottom: 1px solid var(--border);
    }
    .header-inner {
      max-width: 1080px;
      height: 100%;
      margin: 0 auto;
      padding: 0 24px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 16px;
    }
    .brand-group {
      display: inline-flex;
      align-items: center;
      gap: 9px;
      font-weight: 700;
      font-size: 15px;
      letter-spacing: -0.02em;
    }
    .brand-mark {
      width: 22px;
      height: 22px;
      border-radius: 6px;
      background: #1d1d1f;
      color: #ffffff;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      font-size: 12.5px;
      font-weight: 700;
    }
    .brand-tag {
      padding: 2px 8px;
      border-radius: var(--radius-pill);
      background: var(--bg-stone);
      border: 1px solid var(--border);
      font-size: 11px;
      font-weight: 600;
      color: var(--text-secondary);
    }
    .header-nav {
      display: flex;
      align-items: center;
      gap: 22px;
      font-size: 13px;
      font-weight: 500;
      color: var(--text-secondary);
    }
    .header-nav a:hover { color: var(--text-primary); }
    .header-actions {
      display: flex;
      align-items: center;
      gap: 10px;
    }
    .lang-switch {
      display: inline-flex;
      padding: 2px;
      border-radius: var(--radius-pill);
      background: var(--bg-stone);
      border: 1px solid var(--border);
    }
    .lang-btn {
      padding: 4px 10px;
      border-radius: var(--radius-pill);
      font-size: 11.5px;
      font-weight: 700;
      color: var(--text-secondary);
      transition: background 0.16s ease, color 0.16s ease;
    }
    .lang-btn.active {
      background: var(--accent);
      color: #ffffff;
    }
    .portfolio-pill {
      display: inline-flex;
      align-items: center;
      gap: 5px;
      padding: 6px 13px;
      border-radius: var(--radius-pill);
      background: var(--bg-stone);
      border: 1px solid var(--border);
      font-size: 12.5px;
      font-weight: 600;
      color: var(--text-primary);
      transition: background 0.16s ease, transform 0.16s ease;
    }
    .portfolio-pill:hover {
      background: #ececf0;
      transform: translateX(-1px);
    }

    .container {
      max-width: 1080px;
      margin: 0 auto;
      padding: 0 24px;
    }

    /* Hero */
    .hero-section {
      padding: 58px 0 88px;
      background: radial-gradient(900px 420px at 50% -10%, rgba(29, 29, 31, 0.05), transparent 70%);
    }
    .status-pill {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      padding: 7px 14px;
      border-radius: var(--radius-pill);
      background: var(--green-tint);
      border: 1px solid rgba(29, 131, 72, 0.2);
      color: var(--green);
      font-size: 12.5px;
      font-weight: 600;
      margin-bottom: 24px;
    }
    .status-dot {
      width: 7.5px;
      height: 7.5px;
      border-radius: 50%;
      background: var(--green);
    }
    .hero-title {
      font-size: clamp(2.5rem, 6vw, 4.3rem);
      font-weight: 700;
      line-height: 1.04;
      letter-spacing: -0.042em;
      margin-bottom: 18px;
    }
    .hero-subtitle {
      font-size: clamp(1.08rem, 1.9vw, 1.3rem);
      line-height: 1.5;
      letter-spacing: -0.016em;
      color: var(--text-secondary);
      max-width: 780px;
      margin-bottom: 36px;
    }

    .endpoint-dock {
      border-radius: var(--radius-bento);
      background: linear-gradient(155deg, #222226 0%, #141417 55%, #0c0c0e 100%);
      border: 1px solid rgba(255, 255, 255, 0.14);
      padding: 30px 32px;
      color: #f5f5f7;
      box-shadow: 0 24px 52px rgba(0, 0, 0, 0.14);
    }
    .dock-caption {
      display: block;
      font-size: 11.5px;
      font-weight: 600;
      text-transform: uppercase;
      letter-spacing: 0.07em;
      color: #a1a1a6;
      margin-bottom: 12px;
    }
    .dock-url-row {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 14px;
      padding: 15px 18px;
      border-radius: 16px;
      background: rgba(255, 255, 255, 0.07);
      border: 1px solid rgba(255, 255, 255, 0.14);
      margin-bottom: 18px;
      flex-wrap: wrap;
    }
    .dock-url {
      font-family: var(--font-mono);
      font-size: clamp(0.92rem, 1.8vw, 1.08rem);
      color: #ffffff;
      word-break: break-all;
    }
    .dock-copy-btn {
      display: inline-flex;
      align-items: center;
      gap: 7px;
      padding: 9px 18px;
      border-radius: var(--radius-pill);
      background: #ffffff;
      color: #1d1d1f;
      font-size: 13.5px;
      font-weight: 600;
      transition: transform 0.16s ease, opacity 0.16s ease;
    }
    .dock-copy-btn:hover { opacity: 0.92; transform: translateY(-1px); }
    .spec-badges {
      list-style: none;
      display: flex;
      flex-wrap: wrap;
      gap: 8px;
    }
    .spec-badge {
      padding: 5px 12px;
      border-radius: var(--radius-pill);
      background: rgba(255, 255, 255, 0.08);
      border: 1px solid rgba(255, 255, 255, 0.12);
      color: #d1d1d6;
      font-size: 12px;
      font-weight: 500;
    }

    /* Sections */
    .section-stone {
      padding: 92px 0 100px;
      background: var(--bg-stone);
      border-top: 1px solid var(--border);
    }
    .section-white {
      padding: 92px 0 100px;
      background: var(--bg-white);
      border-top: 1px solid var(--border);
    }
    .section-header {
      max-width: 740px;
      margin-bottom: 42px;
    }
    .eyebrow {
      margin-bottom: 8px;
      color: var(--text-secondary);
      font-size: 12.5px;
      font-weight: 600;
      text-transform: uppercase;
      letter-spacing: 0.06em;
    }
    .headline {
      font-size: clamp(2rem, 4.4vw, 3rem);
      font-weight: 700;
      line-height: 1.08;
      letter-spacing: -0.036em;
      margin-bottom: 12px;
    }
    .description {
      font-size: 17px;
      line-height: 1.54;
      color: var(--text-secondary);
      letter-spacing: -0.014em;
    }

    /* Steps & Split */
    .steps-grid {
      display: grid;
      grid-template-columns: repeat(3, minmax(0, 1fr));
      gap: 18px;
      margin-bottom: 22px;
    }
    .step-card {
      background: var(--bg-white);
      border: 1px solid var(--border);
      border-radius: var(--radius-card);
      padding: 26px 26px 24px;
      box-shadow: var(--shadow-subtle);
    }
    .step-num {
      display: inline-block;
      font-family: var(--font-mono);
      font-size: 12px;
      font-weight: 600;
      color: var(--text-tertiary);
      margin-bottom: 10px;
    }
    .step-title {
      font-size: 18.5px;
      font-weight: 700;
      letter-spacing: -0.022em;
      margin-bottom: 8px;
    }
    .step-detail {
      font-size: 14.3px;
      line-height: 1.55;
      color: var(--text-secondary);
    }

    .recruiter-split {
      display: grid;
      grid-template-columns: minmax(0, 5fr) minmax(0, 7fr);
      gap: 20px;
      align-items: stretch;
    }
    .prompt-card,
    .simulator-card {
      background: var(--bg-white);
      border: 1px solid var(--border);
      border-radius: var(--radius-bento);
      padding: 30px;
      box-shadow: var(--shadow-bento);
      display: flex;
      flex-direction: column;
      gap: 16px;
    }
    .card-header-row {
      display: flex;
      align-items: flex-start;
      justify-content: space-between;
      gap: 14px;
      flex-wrap: wrap;
    }
    .card-title {
      font-size: 20px;
      font-weight: 700;
      letter-spacing: -0.025em;
      margin-bottom: 4px;
    }
    .card-subtext {
      font-size: 14px;
      line-height: 1.5;
      color: var(--text-secondary);
    }
    .dark-pill-btn {
      display: inline-flex;
      align-items: center;
      gap: 7px;
      padding: 8.5px 16px;
      border-radius: var(--radius-pill);
      background: var(--accent);
      color: #ffffff;
      font-size: 13px;
      font-weight: 600;
      flex-shrink: 0;
      transition: background 0.16s ease, transform 0.16s ease;
    }
    .dark-pill-btn:hover { background: var(--accent-hover); transform: translateY(-1px); }

    .prompt-tabs {
      display: flex;
      flex-wrap: wrap;
      gap: 6px;
    }
    .prompt-tab-btn {
      padding: 6px 12px;
      border-radius: var(--radius-pill);
      background: var(--bg-stone);
      border: 1px solid var(--border);
      font-size: 12px;
      font-weight: 600;
      color: var(--text-secondary);
      transition: background 0.16s ease, color 0.16s ease;
    }
    .prompt-tab-btn.active {
      background: var(--accent);
      border-color: var(--accent);
      color: #ffffff;
    }

    .prompt-pre {
      flex: 1;
      background: #141417;
      color: #e5e5ea;
      border-radius: 18px;
      padding: 20px;
      font-family: var(--font-mono);
      font-size: 12.4px;
      line-height: 1.62;
      white-space: pre-wrap;
      word-break: break-word;
      overflow-x: auto;
    }

    /* Simulator */
    .preset-label {
      display: block;
      font-size: 12px;
      font-weight: 600;
      color: var(--text-tertiary);
      margin-bottom: 7px;
    }
    .preset-buttons {
      display: flex;
      flex-wrap: wrap;
      gap: 7px;
    }
    .preset-chip {
      padding: 6px 12px;
      border-radius: var(--radius-pill);
      background: var(--bg-stone);
      border: 1px solid var(--border);
      font-size: 12.2px;
      font-weight: 600;
      color: var(--text-secondary);
    }
    .preset-chip.active {
      background: var(--accent);
      border-color: var(--accent);
      color: #ffffff;
    }
    .sim-inputs {
      display: flex;
      flex-direction: column;
      gap: 10px;
    }
    .sim-input,
    .sim-textarea {
      width: 100%;
      font-family: var(--font-sans);
      font-size: 14px;
      line-height: 1.5;
      color: var(--text-primary);
      background: var(--bg-stone);
      border: 1px solid var(--border);
      border-radius: 14px;
      padding: 11px 14px;
      resize: vertical;
    }
    .sim-result-box {
      background: var(--bg-stone);
      border: 1px solid var(--border);
      border-radius: 20px;
      padding: 20px;
      display: flex;
      flex-direction: column;
      gap: 14px;
    }
    .sim-score-row {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 12px;
    }
    .sim-score-caption {
      font-size: 11.5px;
      font-weight: 600;
      text-transform: uppercase;
      letter-spacing: 0.05em;
      color: var(--text-tertiary);
    }
    .sim-verdict {
      font-size: 15.5px;
      font-weight: 700;
    }
    .sim-score-badge {
      font-family: var(--font-mono);
      font-size: 15px;
      font-weight: 700;
      padding: 6px 14px;
      border-radius: var(--radius-pill);
      flex-shrink: 0;
    }
    .score-high {
      background: var(--green-tint);
      color: var(--green);
      border: 1px solid rgba(29, 131, 72, 0.22);
    }
    .score-mid {
      background: rgba(29, 29, 31, 0.08);
      color: var(--text-primary);
    }
    .score-low {
      background: var(--red-tint);
      color: var(--red);
    }
    .sim-summary {
      font-size: 13.8px;
      line-height: 1.55;
      color: var(--text-secondary);
    }
    .sim-group-title {
      display: block;
      font-size: 12px;
      font-weight: 600;
      margin-bottom: 7px;
    }
    .sim-skill-list {
      list-style: none;
      display: flex;
      flex-wrap: wrap;
      gap: 6px;
    }
    .sim-skill-pill {
      padding: 4.5px 10px;
      border-radius: var(--radius-pill);
      background: var(--bg-white);
      border: 1px solid var(--border);
      font-size: 12px;
      font-weight: 500;
    }
    .sim-gaps-list {
      display: flex;
      flex-direction: column;
      gap: 5px;
      font-size: 13px;
      color: var(--text-secondary);
      padding-left: 16px;
    }
    .sim-no-gaps {
      font-size: 13px;
      color: var(--green);
      font-weight: 500;
    }

    /* Quick Start Client Setup */
    .client-setup-card {
      border-radius: var(--radius-bento);
      background: var(--bg-stone);
      border: 1px solid var(--border);
      padding: 24px;
    }
    .client-tabs {
      display: flex;
      flex-wrap: wrap;
      gap: 8px;
      margin-bottom: 20px;
    }
    .client-tab-btn {
      padding: 9px 18px;
      border-radius: var(--radius-pill);
      background: var(--bg-white);
      border: 1px solid var(--border);
      font-size: 13.5px;
      font-weight: 600;
      color: var(--text-secondary);
    }
    .client-tab-btn.active {
      background: var(--accent);
      border-color: var(--accent);
      color: #ffffff;
    }
    .client-panel {
      background: var(--bg-white);
      border: 1px solid var(--border);
      border-radius: 20px;
      padding: 24px;
      display: flex;
      flex-direction: column;
      gap: 16px;
    }
    .client-meta-bar {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 12px;
      flex-wrap: wrap;
    }
    .client-meta-left {
      display: flex;
      align-items: center;
      gap: 10px;
      flex-wrap: wrap;
    }
    .client-filename {
      font-family: var(--font-mono);
      font-size: 13px;
      font-weight: 600;
    }
    .client-badge {
      padding: 4px 10px;
      border-radius: var(--radius-pill);
      background: var(--bg-stone);
      font-size: 11.8px;
      font-weight: 600;
      color: var(--text-secondary);
    }
    .client-steps {
      list-style: none;
      display: flex;
      flex-direction: column;
      gap: 6px;
      font-size: 14.3px;
      color: var(--text-secondary);
    }
    .client-steps li { display: flex; gap: 8px; }
    .client-step-idx { font-weight: 600; color: var(--text-primary); }
    .code-block {
      background: #141417;
      color: #f5f5f7;
      border-radius: 16px;
      padding: 20px;
      font-family: var(--font-mono);
      font-size: 13px;
      line-height: 1.6;
      overflow-x: auto;
      white-space: pre;
    }

    /* API Reference */
    .sub-section-title {
      font-size: 21px;
      font-weight: 700;
      letter-spacing: -0.025em;
      margin-bottom: 18px;
    }
    .tools-grid {
      display: grid;
      grid-template-columns: repeat(2, minmax(0, 1fr));
      gap: 18px;
      margin-bottom: 40px;
    }
    .tool-doc-card {
      background: var(--bg-white);
      border: 1px solid var(--border);
      border-radius: var(--radius-card);
      padding: 26px;
      display: flex;
      flex-direction: column;
      gap: 14px;
      box-shadow: var(--shadow-subtle);
    }
    .tool-doc-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 10px;
      flex-wrap: wrap;
    }
    .tool-doc-name {
      font-family: var(--font-mono);
      font-size: 14px;
      font-weight: 600;
    }
    .tool-doc-badge {
      padding: 4px 10px;
      border-radius: var(--radius-pill);
      background: var(--bg-stone);
      border: 1px solid var(--border);
      font-size: 11.5px;
      font-weight: 600;
      color: var(--text-secondary);
    }
    .tool-doc-summary {
      font-size: 14px;
      line-height: 1.55;
      color: var(--text-secondary);
    }
    .param-list {
      list-style: none;
      display: flex;
      flex-direction: column;
      gap: 10px;
      padding-top: 10px;
      border-top: 1px solid var(--border);
    }
    .param-top {
      display: flex;
      align-items: center;
      gap: 8px;
      flex-wrap: wrap;
      margin-bottom: 2px;
    }
    .param-name {
      font-family: var(--font-mono);
      font-size: 12.5px;
      font-weight: 600;
    }
    .param-type {
      font-family: var(--font-mono);
      font-size: 11.5px;
      color: var(--text-tertiary);
    }
    .param-req {
      font-size: 11px;
      font-weight: 600;
      background: rgba(29, 29, 31, 0.08);
      padding: 2px 7px;
      border-radius: var(--radius-pill);
    }
    .param-opt {
      font-size: 11px;
      color: var(--text-tertiary);
    }
    .param-desc {
      font-size: 13px;
      line-height: 1.5;
      color: var(--text-secondary);
    }

    .dual-ref-grid {
      display: grid;
      grid-template-columns: repeat(2, minmax(0, 1fr));
      gap: 20px;
    }
    .compact-stack {
      display: flex;
      flex-direction: column;
      gap: 12px;
    }
    .compact-ref-card {
      background: var(--bg-white);
      border: 1px solid var(--border);
      border-radius: 18px;
      padding: 20px 22px;
      display: flex;
      flex-direction: column;
      gap: 6px;
    }
    .compact-ref-top {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 10px;
      flex-wrap: wrap;
    }
    .resource-uri {
      font-family: var(--font-mono);
      font-size: 13px;
      font-weight: 600;
      word-break: break-all;
    }

    /* Architecture */
    .arch-grid {
      display: grid;
      grid-template-columns: repeat(2, minmax(0, 1fr));
      gap: 18px;
    }
    .arch-card {
      background: var(--bg-stone);
      border: 1px solid var(--border);
      border-radius: var(--radius-card);
      padding: 28px;
      display: flex;
      flex-direction: column;
      gap: 10px;
    }
    .arch-tag {
      align-self: flex-start;
      padding: 4px 10px;
      border-radius: var(--radius-pill);
      background: var(--bg-white);
      border: 1px solid var(--border);
      font-size: 11.5px;
      font-weight: 600;
      color: var(--text-secondary);
    }
    .arch-title {
      font-size: 19px;
      font-weight: 700;
      letter-spacing: -0.022em;
    }
    .arch-body {
      font-size: 14.5px;
      line-height: 1.56;
      color: var(--text-secondary);
    }

    /* Footer */
    .docs-footer {
      border-top: 1px solid var(--border);
      background: var(--bg-stone);
      padding: 36px 0;
      font-size: 13.5px;
      color: var(--text-secondary);
    }
    .footer-row {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 16px;
      flex-wrap: wrap;
    }
    .footer-links {
      display: flex;
      align-items: center;
      gap: 18px;
      flex-wrap: wrap;
    }
    .footer-links a {
      font-weight: 600;
      color: var(--text-primary);
    }
    .footer-links a:hover { text-decoration: underline; }

    @media (max-width: 920px) {
      .header-nav { display: none; }
      .steps-grid,
      .recruiter-split,
      .tools-grid,
      .dual-ref-grid,
      .arch-grid {
        grid-template-columns: 1fr;
      }
    }
    @media (max-width: 600px) {
      .endpoint-dock,
      .prompt-card,
      .simulator-card,
      .client-setup-card {
        padding: 20px;
      }
    }
  </style>
</head>
<body>
  <header class="glass-header">
    <div class="header-inner">
      <a href="/" class="brand-group">
        <span class="brand-mark">S</span>
        <span>Santiago Olayo</span>
        <span class="brand-tag">MCP Docs</span>
      </a>

      <nav class="header-nav" aria-label="Documentation sections">
        <a href="#recruiter" id="nav-recruiter">Recruiter Fit</a>
        <a href="#setup" id="nav-setup">Quick Start</a>
        <a href="#reference" id="nav-reference">API Reference</a>
        <a href="#architecture" id="nav-architecture">Architecture</a>
      </nav>

      <div class="header-actions">
        <div class="lang-switch" role="group" aria-label="Language">
          <button type="button" class="lang-btn active" id="btn-lang-en" data-lang="en">EN</button>
          <button type="button" class="lang-btn" id="btn-lang-es" data-lang="es">ES</button>
        </div>
        <a href="${portfolioUrl}" class="portfolio-pill">
          <span aria-hidden="true">‹</span>
          <span id="nav-back">santiago-jv.tech</span>
        </a>
      </div>
    </div>
  </header>

  <main>
    <!-- 1. Hero & Endpoint Dock -->
    <section class="hero-section">
      <div class="container">
        <div class="status-pill">
          <span class="status-dot" aria-hidden="true"></span>
          <span id="hero-status">Operational on Cloudflare Edge (${edgeColo}) · v${version}</span>
        </div>

        <h1 class="hero-title" id="hero-title">Santiago Olayo MCP.</h1>
        <p class="hero-subtitle" id="hero-subtitle"></p>

        <div class="endpoint-dock">
          <span class="dock-caption" id="dock-caption"></span>
          <div class="dock-url-row">
            <code class="dock-url" id="mcp-endpoint-code">${mcpEndpoint}</code>
            <button type="button" class="dock-copy-btn" id="btn-copy-endpoint">
              <span id="btn-copy-endpoint-label">Copy Endpoint</span>
            </button>
          </div>
          <ul class="spec-badges" id="spec-badges"></ul>
        </div>
      </div>
    </section>

    <!-- 2. Recruiter Natural Prompts + Live Simulator -->
    <section class="section-stone" id="recruiter">
      <div class="container">
        <div class="section-header">
          <p class="eyebrow" id="rec-eyebrow"></p>
          <h2 class="headline" id="rec-headline"></h2>
          <p class="description" id="rec-description"></p>
        </div>

        <div class="steps-grid" id="steps-grid"></div>

        <div class="recruiter-split">
          <article class="prompt-card">
            <div class="card-header-row">
              <div>
                <h3 class="card-title" id="prompt-card-title"></h3>
                <p class="card-subtext" id="prompt-card-subtitle"></p>
              </div>
              <button type="button" class="dark-pill-btn" id="btn-copy-prompt">
                <span id="btn-copy-prompt-label">Copy Prompt</span>
              </button>
            </div>

            <div class="prompt-tabs" id="prompt-tabs" role="tablist"></div>
            <pre class="prompt-pre"><code id="prompt-code"></code></pre>
          </article>

          <article class="simulator-card">
            <div>
              <h3 class="card-title" id="sim-title"></h3>
              <p class="card-subtext" id="sim-subtitle"></p>
            </div>

            <div>
              <span class="preset-label" id="sim-presets-label"></span>
              <div class="preset-buttons" id="sim-presets"></div>
            </div>

            <div class="sim-inputs">
              <input type="text" class="sim-input" id="sim-role" />
              <textarea rows="4" class="sim-textarea" id="sim-jd"></textarea>
            </div>

            <div class="sim-result-box">
              <div class="sim-score-row">
                <div>
                  <span class="sim-score-caption" id="sim-score-label"></span>
                  <p class="sim-verdict" id="sim-verdict"></p>
                </div>
                <span class="sim-score-badge score-high" id="sim-score-badge">95/100</span>
              </div>
              <p class="sim-summary" id="sim-summary"></p>
              <div id="sim-matched-wrap">
                <span class="sim-group-title" id="sim-matched-title"></span>
                <ul class="sim-skill-list" id="sim-skills"></ul>
              </div>
              <div>
                <span class="sim-group-title" id="sim-gaps-title"></span>
                <div id="sim-gaps-body"></div>
              </div>
            </div>
          </article>
        </div>
      </div>
    </section>

    <!-- 3. Quick Start Client Setup -->
    <section class="section-white" id="setup">
      <div class="container">
        <div class="section-header">
          <p class="eyebrow" id="setup-eyebrow"></p>
          <h2 class="headline" id="setup-headline"></h2>
          <p class="description" id="setup-description"></p>
        </div>

        <div class="client-setup-card">
          <div class="client-tabs" id="client-tabs" role="tablist"></div>

          <div class="client-panel">
            <div class="client-meta-bar">
              <div class="client-meta-left">
                <code class="client-filename" id="client-filename"></code>
                <span class="client-badge" id="client-badge"></span>
              </div>
              <button type="button" class="dark-pill-btn" id="btn-copy-snippet">
                <span id="btn-copy-snippet-label">Copy Snippet</span>
              </button>
            </div>

            <ol class="client-steps" id="client-steps"></ol>
            <pre class="code-block"><code id="client-snippet"></code></pre>
          </div>
        </div>
      </div>
    </section>

    <!-- 4. API Reference -->
    <section class="section-stone" id="reference">
      <div class="container">
        <div class="section-header">
          <p class="eyebrow" id="ref-eyebrow"></p>
          <h2 class="headline" id="ref-headline"></h2>
          <p class="description" id="ref-description"></p>
        </div>

        <h3 class="sub-section-title" id="ref-tools-title"></h3>
        <div class="tools-grid" id="tools-grid"></div>

        <div class="dual-ref-grid">
          <div>
            <h3 class="sub-section-title" id="ref-prompts-title"></h3>
            <div class="compact-stack" id="prompts-stack"></div>
          </div>
          <div>
            <h3 class="sub-section-title" id="ref-resources-title"></h3>
            <div class="compact-stack" id="resources-stack"></div>
          </div>
        </div>
      </div>
    </section>

    <!-- 5. Architecture -->
    <section class="section-white" id="architecture">
      <div class="container">
        <div class="section-header">
          <p class="eyebrow" id="arch-eyebrow"></p>
          <h2 class="headline" id="arch-headline"></h2>
          <p class="description" id="arch-description"></p>
        </div>

        <div class="arch-grid" id="arch-grid"></div>
      </div>
    </section>
  </main>

  <footer class="docs-footer">
    <div class="container footer-row">
      <span>© ${currentYear} Santiago Olayo Villamil · mcp.santiago-jv.tech</span>
      <div class="footer-links">
        <a href="/" id="ft-gateway">Gateway (/)</a>
        <a href="/health" id="ft-health">Health JSON (/health)</a>
        <a href="${portfolioUrl}" id="ft-portfolio">Portfolio</a>
        <a href="https://github.com/santiago-jv/santiago-jv-mcp" target="_blank" rel="noopener noreferrer" id="ft-source">Source on GitHub</a>
      </div>
    </div>
  </footer>

  <script>
    (function () {
      const COPY = ${serializedCopy};
      const ENDPOINT = ${JSON.stringify(mcpEndpoint)};
      const EDGE_COLO = ${JSON.stringify(edgeColo)};
      const VERSION = ${JSON.stringify(version)};

      const PREVIEW_SKILLS = [
        { label: 'TypeScript (4.5y)', aliases: ['typescript', 'ts'] },
        { label: 'Node.js (4.5y)', aliases: ['node.js', 'nodejs', 'node'] },
        { label: 'NestJS (3y)', aliases: ['nestjs', 'nest.js'] },
        { label: 'Java & Spring Boot', aliases: ['java', 'spring boot', 'springboot'] },
        { label: 'Hexagonal Architecture & DDD', aliases: ['hexagonal', 'ddd', 'domain-driven', 'clean architecture', 'arquitectura hexagonal'] },
        { label: 'PostgreSQL & SQL', aliases: ['postgresql', 'postgres', 'sql', 'mysql'] },
        { label: 'MongoDB', aliases: ['mongodb', 'mongo', 'nosql'] },
        { label: 'Redis Distributed Locks', aliases: ['redis', 'locks', 'concurrency', 'concurrencia'] },
        { label: 'AWS & Serverless', aliases: ['aws', 'ecs', 'lambda', 's3', 'sqs', 'cloud functions', 'serverless'] },
        { label: 'Model Context Protocol (MCP)', aliases: ['mcp', 'model context protocol', 'ai tooling', 'llm', 'llms'] },
        { label: 'Cloudflare Workers & Edge', aliases: ['cloudflare', 'cloudflare workers', 'workers', 'edge'] },
        { label: 'Datadog Observability', aliases: ['datadog', 'apm', 'observability', 'observabilidad', 'monitoreo'] },
        { label: 'CleverTap & Metabase Analytics', aliases: ['clevertap', 'metabase', 'analytics', 'analítica', 'kpis'] },
        { label: 'Docker & GitHub Actions CI/CD', aliases: ['docker', 'github actions', 'ci/cd', 'cicd'] },
        { label: 'End-to-End Product Ownership', aliases: ['product owner', 'stakeholders', 'scrum', 'agile', 'tech lead'] }
      ];

      const PREVIEW_GAPS = [
        {
          patterns: ['rust', 'golang'],
          en: 'Go / Rust: Core production depth is in TypeScript/Node.js/NestJS & Java/Spring Boot (language ramp-up needed).',
          es: 'Go / Rust: La experiencia principal en producción es en TypeScript/Node.js/NestJS y Java/Spring Boot.'
        },
        {
          patterns: ['kubernetes', 'k8s', 'istio'],
          en: 'Kubernetes SRE: Experienced with AWS ECS, Docker & Serverless rather than bare-metal K8s cluster administration.',
          es: 'Kubernetes SRE: Experiencia fuerte en AWS ECS, Docker y Serverless más que administración dedicada de clústeres K8s.'
        },
        {
          patterns: ['django', 'fastapi', 'pytorch'],
          en: 'Python / ML Training: Specializes in applied LLM/MCP integration & TypeScript/Java backends rather than Python frameworks.',
          es: 'Python / ML: Especializado en integración aplicada de LLMs/MCP y backends TypeScript/Java más que frameworks Python.'
        },
        {
          patterns: ['c#', '.net', 'dotnet'],
          en: '.NET / C#: Enterprise DDD experience is in NestJS and Spring Boot rather than .NET.',
          es: '.NET / C#: La experiencia empresarial con DDD está en NestJS y Spring Boot, no en .NET.'
        }
      ];

      function escapeHtml(str) {
        return String(str)
          .replace(/&/g, '&amp;')
          .replace(/</g, '&lt;')
          .replace(/>/g, '&gt;')
          .replace(/"/g, '&quot;');
      }

      function escapeRx(v) {
        return v.replace(/[.*+?^\${}()|[\\]\\\\]/g, '\\\\$&');
      }

      function hasWord(corpus, raw) {
        if (raw === 'c#') return /(?:^|[\\s,;/()])c#(?=$|[\\s,;/().])/i.test(corpus);
        if (raw === '.net') return /(?:^|[\\s,;/()])\\.net(?=$|[\\s,;/().])/i.test(corpus);
        return new RegExp('(?:^|[^a-z0-9+#])' + escapeRx(raw) + '(?:$|[^a-z0-9+#])', 'i').test(corpus);
      }

      const params = new URLSearchParams(window.location.search);
      let locale = params.get('lang') === 'es' ? 'es' : (localStorage.getItem('santiago-mcp-lang') === 'es' ? 'es' : 'en');
      let activePromptTab = 'recruiter';
      let activeClientTab = 'claude';
      let activePresetIdx = 0;

      const elRole = document.getElementById('sim-role');
      const elJd = document.getElementById('sim-jd');

      function evaluateSim() {
        const role = elRole.value || '';
        const jd = elJd.value || '';
        const corpus = (role + '\\n' + jd).toLowerCase();

        const matched = PREVIEW_SKILLS.filter((s) => s.aliases.some((a) => hasWord(corpus, a))).map((s) => s.label);
        const gaps = PREVIEW_GAPS.filter((g) => g.patterns.some((p) => hasWord(corpus, p))).map((g) => g[locale]);

        const ym = corpus.match(/(\\d{1,2})\\s*\\+?\\s*(?:years?|yrs?|años?)/i);
        if (ym && parseInt(ym[1], 10) >= 7) {
          gaps.push(
            locale === 'es'
              ? 'La vacante menciona ' + ym[1] + '+ años; Santiago cuenta con 4.5+ años en producción con alcance Senior / Product Owner Engineer.'
              : 'Role mentions ' + ym[1] + '+ years; Santiago brings 4.5+ years of high-ownership Senior / Product Owner Engineer production experience.'
          );
        }

        const onsiteElsewhere =
          (hasWord(corpus, 'on-site') || hasWord(corpus, 'onsite') || hasWord(corpus, 'presencial')) &&
          !hasWord(corpus, 'remote') &&
          !hasWord(corpus, 'remoto') &&
          !hasWord(corpus, 'barranquilla') &&
          !hasWord(corpus, 'santa marta');

        if (onsiteElsewhere) {
          gaps.push(
            locale === 'es'
              ? 'Modalidad presencial fuera de Barranquilla/Santa Marta: Santiago prioriza roles Remotos o en la Región Caribe.'
              : 'On-site location outside Barranquilla/Santa Marta: Santiago prioritizes Remote roles or Caribbean Colombia.'
          );
        }

        let base = 52;
        if (matched.length >= 6) base = 95;
        else if (matched.length >= 4) base = 89;
        else if (matched.length >= 2) base = 80;
        else if (matched.length === 1) base = 70;

        const score = Math.max(22, Math.min(98, base - gaps.length * 14));
        const verdict =
          locale === 'es'
            ? score >= 85
              ? 'Alto Match · Muy Recomendado para Entrevista'
              : score >= 70
                ? 'Buen Match · Sólida Base Compatible'
                : 'Match Parcial · Revisar Brechas de Stack o Modalidad'
            : score >= 85
              ? 'Strong Fit · Highly Recommended to Interview'
              : score >= 70
                ? 'Good Fit · Solid Core Alignment'
                : 'Partial Fit · Review Stack or Modality Differences';

        const summary =
          locale === 'es'
            ? score >= 70
              ? 'Compatibilidad estimada del ' + score + '% para ' + (role || 'esta vacante') + '. Coincidencia directa en ' + matched.length + ' áreas clave de producción (GoodRec / Bolsiyo), sumando diferenciadores en MCP, Cloudflare Workers, Datadog y ownership de producto.'
              : 'Compatibilidad estimada del ' + score + '% para ' + (role || 'esta vacante') + '. Cuenta con bases sólidas de ingeniería backend y cloud, pero existen requisitos específicos fuera de su stack o modalidad principal.'
            : score >= 70
              ? 'Estimated ' + score + '% match for ' + (role || 'this role') + '. Direct overlap across ' + matched.length + ' production areas (GoodRec / Bolsiyo), amplified by hands-on MCP tooling, Cloudflare Workers, Datadog APM, and end-to-end ownership.'
              : 'Estimated ' + score + '% match for ' + (role || 'this role') + '. Brings strong backend & cloud engineering fundamentals, though key primary requirements differ from his core stack or modality.';

        const copy = COPY[locale].recruiter.simulator;
        document.getElementById('sim-verdict').textContent = verdict;
        const badge = document.getElementById('sim-score-badge');
        badge.textContent = score + '/100';
        badge.className = 'sim-score-badge ' + (score >= 80 ? 'score-high' : score >= 65 ? 'score-mid' : 'score-low');
        document.getElementById('sim-summary').textContent = summary;

        const matchedWrap = document.getElementById('sim-matched-wrap');
        if (matched.length > 0) {
          matchedWrap.style.display = 'block';
          document.getElementById('sim-matched-title').textContent = copy.matchedLabel + ' (' + matched.length + ')';
          document.getElementById('sim-skills').innerHTML = matched
            .map((m) => '<li class="sim-skill-pill">' + escapeHtml(m) + '</li>')
            .join('');
        } else {
          matchedWrap.style.display = 'none';
        }

        document.getElementById('sim-gaps-title').textContent = copy.gapsLabel;
        const gapsBody = document.getElementById('sim-gaps-body');
        if (gaps.length > 0) {
          gapsBody.innerHTML = '<ul class="sim-gaps-list">' + gaps.map((g) => '<li>' + escapeHtml(g) + '</li>').join('') + '</ul>';
        } else {
          gapsBody.innerHTML = '<p class="sim-no-gaps">' + escapeHtml(copy.noGapsText) + '</p>';
        }
      }

      function renderPromptArea() {
        const rec = COPY[locale].recruiter;
        const tabsEl = document.getElementById('prompt-tabs');
        tabsEl.innerHTML = rec.promptTabs
          .map(
            (t) =>
              '<button type="button" role="tab" class="prompt-tab-btn ' +
              (t.id === activePromptTab ? 'active' : '') +
              '" data-prompt-id="' +
              t.id +
              '">' +
              escapeHtml(t.label) +
              '</button>'
          )
          .join('');

        const activeObj = rec.promptTabs.find((t) => t.id === activePromptTab) || rec.promptTabs[0];
        document.getElementById('prompt-code').textContent = activeObj.prompt;
      }

      function renderClientArea() {
        const setup = COPY[locale].setup;
        const tabsEl = document.getElementById('client-tabs');
        tabsEl.innerHTML = setup.clients
          .map(
            (c) =>
              '<button type="button" role="tab" class="client-tab-btn ' +
              (c.id === activeClientTab ? 'active' : '') +
              '" data-client-id="' +
              c.id +
              '">' +
              escapeHtml(c.label) +
              '</button>'
          )
          .join('');

        const active = setup.clients.find((c) => c.id === activeClientTab) || setup.clients[0];
        document.getElementById('client-filename').textContent = active.filename;
        document.getElementById('client-badge').textContent = active.badge;
        document.getElementById('client-steps').innerHTML = active.steps
          .map((s, idx) => '<li><span class="client-step-idx">' + (idx + 1) + '.</span><span>' + escapeHtml(s) + '</span></li>')
          .join('');
        document.getElementById('client-snippet').textContent = active.snippet;
      }

      function renderAll(resetPresetText) {
        const c = COPY[locale];
        document.documentElement.lang = locale;
        document.getElementById('btn-lang-en').classList.toggle('active', locale === 'en');
        document.getElementById('btn-lang-es').classList.toggle('active', locale === 'es');

        document.getElementById('nav-recruiter').textContent = c.nav.recruiter;
        document.getElementById('nav-setup').textContent = c.nav.setup;
        document.getElementById('nav-reference').textContent = c.nav.reference;
        document.getElementById('nav-architecture').textContent = c.nav.architecture;
        document.getElementById('nav-back').textContent = c.nav.backPortfolio;

        document.getElementById('hero-status').textContent = c.hero.statusPrefix + ' (' + EDGE_COLO + ') · v' + VERSION;
        document.getElementById('hero-title').textContent = c.hero.title;
        document.getElementById('hero-subtitle').textContent = c.hero.subtitle;
        document.getElementById('dock-caption').textContent = c.hero.endpointCaption;
        document.getElementById('btn-copy-endpoint-label').textContent = c.hero.copyEndpoint;
        document.getElementById('spec-badges').innerHTML = c.hero.specBadges
          .map((b) => '<li class="spec-badge">' + escapeHtml(b) + '</li>')
          .join('');

        document.getElementById('rec-eyebrow').textContent = c.recruiter.eyebrow;
        document.getElementById('rec-headline').textContent = c.recruiter.headline;
        document.getElementById('rec-description').textContent = c.recruiter.description;
        document.getElementById('steps-grid').innerHTML = c.recruiter.steps
          .map(
            (s) =>
              '<article class="step-card"><span class="step-num">' +
              escapeHtml(s.step) +
              '</span><h3 class="step-title">' +
              escapeHtml(s.title) +
              '</h3><p class="step-detail">' +
              escapeHtml(s.detail) +
              '</p></article>'
          )
          .join('');

        document.getElementById('prompt-card-title').textContent = c.recruiter.promptCardTitle;
        document.getElementById('prompt-card-subtitle').textContent = c.recruiter.promptCardSubtitle;
        document.getElementById('btn-copy-prompt-label').textContent = c.recruiter.copyPromptBtn;
        renderPromptArea();

        const sim = c.recruiter.simulator;
        document.getElementById('sim-title').textContent = sim.title;
        document.getElementById('sim-subtitle').textContent = sim.subtitle;
        document.getElementById('sim-presets-label').textContent = sim.presetsLabel;
        document.getElementById('sim-score-label').textContent = sim.scoreLabel;
        elRole.placeholder = sim.rolePlaceholder;
        elJd.placeholder = sim.jdPlaceholder;

        document.getElementById('sim-presets').innerHTML = sim.presets
          .map(
            (p, idx) =>
              '<button type="button" class="preset-chip ' +
              (idx === activePresetIdx ? 'active' : '') +
              '" data-preset-idx="' +
              idx +
              '">' +
              escapeHtml(p.label) +
              '</button>'
          )
          .join('');

        if (resetPresetText) {
          const preset = sim.presets[activePresetIdx] || sim.presets[0];
          elRole.value = preset.role;
          elJd.value = preset.jd;
        }
        evaluateSim();

        document.getElementById('setup-eyebrow').textContent = c.setup.eyebrow;
        document.getElementById('setup-headline').textContent = c.setup.headline;
        document.getElementById('setup-description').textContent = c.setup.description;
        document.getElementById('btn-copy-snippet-label').textContent = c.setup.copySnippet;
        renderClientArea();

        const ref = c.reference;
        document.getElementById('ref-eyebrow').textContent = ref.eyebrow;
        document.getElementById('ref-headline').textContent = ref.headline;
        document.getElementById('ref-description').textContent = ref.description;
        document.getElementById('ref-tools-title').textContent = ref.toolsTitle;
        document.getElementById('ref-prompts-title').textContent = ref.promptsTitle;
        document.getElementById('ref-resources-title').textContent = ref.resourcesTitle;

        document.getElementById('tools-grid').innerHTML = ref.tools
          .map(
            (t) =>
              '<article class="tool-doc-card"><div class="tool-doc-header"><code class="tool-doc-name">' +
              escapeHtml(t.name) +
              '</code><span class="tool-doc-badge">' +
              escapeHtml(t.badge) +
              '</span></div><p class="tool-doc-summary">' +
              escapeHtml(t.summary) +
              '</p><ul class="param-list">' +
              t.params
                .map(
                  (p) =>
                    '<li><div class="param-top"><code class="param-name">' +
                    escapeHtml(p.name) +
                    '</code><span class="param-type">' +
                    escapeHtml(p.type) +
                    '</span><span class="' +
                    (p.required ? 'param-req' : 'param-opt') +
                    '">' +
                    escapeHtml(p.required ? ref.requiredBadge : ref.optionalBadge) +
                    '</span></div><p class="param-desc">' +
                    escapeHtml(p.description) +
                    '</p></li>'
                )
                .join('') +
              '</ul></article>'
          )
          .join('');

        document.getElementById('prompts-stack').innerHTML = ref.prompts
          .map(
            (pr) =>
              '<article class="compact-ref-card"><div class="compact-ref-top"><code class="tool-doc-name">' +
              escapeHtml(pr.name) +
              '</code><span class="param-type">(' +
              escapeHtml(pr.args) +
              ')</span></div><p class="param-desc">' +
              escapeHtml(pr.description) +
              '</p></article>'
          )
          .join('');

        document.getElementById('resources-stack').innerHTML = ref.resources
          .map(
            (r) =>
              '<article class="compact-ref-card"><div class="compact-ref-top"><code class="resource-uri">' +
              escapeHtml(r.uri) +
              '</code><span class="param-type">' +
              escapeHtml(r.mimeType) +
              '</span></div><p class="param-desc">' +
              escapeHtml(r.description) +
              '</p></article>'
          )
          .join('');

        const arch = c.architecture;
        document.getElementById('arch-eyebrow').textContent = arch.eyebrow;
        document.getElementById('arch-headline').textContent = arch.headline;
        document.getElementById('arch-description').textContent = arch.description;
        document.getElementById('arch-grid').innerHTML = arch.cards
          .map(
            (card) =>
              '<article class="arch-card"><span class="arch-tag">' +
              escapeHtml(card.tag) +
              '</span><h3 class="arch-title">' +
              escapeHtml(card.title) +
              '</h3><p class="arch-body">' +
              escapeHtml(card.body) +
              '</p></article>'
          )
          .join('');

        document.getElementById('ft-gateway').textContent = c.footer.gateway;
        document.getElementById('ft-health').textContent = c.footer.health;
        document.getElementById('ft-portfolio').textContent = c.footer.portfolio;
        document.getElementById('ft-source').textContent = c.footer.source;
      }

      function flashCopied(labelEl, normalText) {
        labelEl.textContent = COPY[locale].hero.copied;
        setTimeout(function () {
          labelEl.textContent = normalText();
        }, 1800);
      }

      document.getElementById('btn-copy-endpoint').addEventListener('click', function () {
        navigator.clipboard.writeText(ENDPOINT).then(function () {
          flashCopied(document.getElementById('btn-copy-endpoint-label'), function () {
            return COPY[locale].hero.copyEndpoint;
          });
        });
      });

      document.getElementById('btn-copy-prompt').addEventListener('click', function () {
        const rec = COPY[locale].recruiter;
        const activeObj = rec.promptTabs.find((t) => t.id === activePromptTab) || rec.promptTabs[0];
        navigator.clipboard.writeText(activeObj.prompt).then(function () {
          flashCopied(document.getElementById('btn-copy-prompt-label'), function () {
            return COPY[locale].recruiter.copyPromptBtn;
          });
        });
      });

      document.getElementById('btn-copy-snippet').addEventListener('click', function () {
        const setup = COPY[locale].setup;
        const active = setup.clients.find((c) => c.id === activeClientTab) || setup.clients[0];
        navigator.clipboard.writeText(active.snippet).then(function () {
          flashCopied(document.getElementById('btn-copy-snippet-label'), function () {
            return COPY[locale].setup.copySnippet;
          });
        });
      });

      document.getElementById('prompt-tabs').addEventListener('click', function (e) {
        const btn = e.target.closest('[data-prompt-id]');
        if (!btn) return;
        activePromptTab = btn.getAttribute('data-prompt-id');
        renderPromptArea();
      });

      document.getElementById('client-tabs').addEventListener('click', function (e) {
        const btn = e.target.closest('[data-client-id]');
        if (!btn) return;
        activeClientTab = btn.getAttribute('data-client-id');
        renderClientArea();
      });

      document.getElementById('sim-presets').addEventListener('click', function (e) {
        const btn = e.target.closest('[data-preset-idx]');
        if (!btn) return;
        activePresetIdx = parseInt(btn.getAttribute('data-preset-idx'), 10) || 0;
        const preset = COPY[locale].recruiter.simulator.presets[activePresetIdx];
        if (preset) {
          elRole.value = preset.role;
          elJd.value = preset.jd;
        }
        Array.from(document.querySelectorAll('.preset-chip')).forEach((chip, i) => {
          chip.classList.toggle('active', i === activePresetIdx);
        });
        evaluateSim();
      });

      elRole.addEventListener('input', evaluateSim);
      elJd.addEventListener('input', evaluateSim);

      document.querySelectorAll('[data-lang]').forEach(function (btn) {
        btn.addEventListener('click', function () {
          const next = btn.getAttribute('data-lang');
          if (next === locale) return;
          locale = next;
          try {
            localStorage.setItem('santiago-mcp-lang', locale);
          } catch (err) {}
          renderAll(true);
        });
      });

      renderAll(true);
    })();
  </script>
</body>
</html>`;
}
