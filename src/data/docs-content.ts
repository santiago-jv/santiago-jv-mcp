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

export interface DocsCopyLocale {
  nav: {
    setup: string;
    recruiter: string;
    reference: string;
    aiChat: string;
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
      setup: 'Quick Start',
      recruiter: 'Vacancy Match',
      reference: 'Tools & Resources',
      aiChat: 'Live AI Chat',
      backPortfolio: 'Portfolio',
    },
    hero: {
      statusPrefix: 'Operational · Streamable HTTP',
      title: 'Santiago Olayo MCP',
      subtitle:
        'Connect Claude, Codex, Antigravity, Cursor, or ChatGPT to explore my career history, backend architecture, and job vacancy compatibility.',
      endpointCaption: 'Public Streamable HTTP Endpoint · No Auth Required',
      copyEndpoint: 'Copy URL',
      copied: 'Copied',
      specBadges: [
        'MCP 2025-03-26',
        'Streamable HTTP',
        'Cloudflare Edge',
        'Read-Only Public',
      ],
    },
    setup: {
      eyebrow: 'Quick Start',
      headline: 'Connect in 10 Seconds',
      description:
        'Select your AI client and copy the Streamable HTTP configuration.',
      copySnippet: 'Copy Snippet',
      clients: [
        {
          id: 'claude',
          label: 'Claude',
          badge: 'CLI, Web & Desktop',
          filename: 'Claude CLI / Connectors',
          steps: [
            'Run the CLI command below, or paste https://mcp.santiago-jv.tech/mcp in Claude Settings → Connectors.',
          ],
          snippet: `# Option A: Claude Code CLI
claude mcp add --transport http santiago-jv https://mcp.santiago-jv.tech/mcp

# Option B: claude_desktop_config.json
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
          badge: 'OpenAI Codex CLI',
          filename: '~/.codex/config.toml',
          steps: [
            'Run codex mcp add in your terminal or add the block to ~/.codex/config.toml.',
          ],
          snippet: `# Option A: Codex CLI
codex mcp add santiago-jv --url https://mcp.santiago-jv.tech/mcp

# Option B: ~/.codex/config.toml
[mcp_servers.santiago-jv]
url = "https://mcp.santiago-jv.tech/mcp"`,
        },
        {
          id: 'antigravity',
          label: 'Antigravity',
          badge: 'Google Antigravity',
          filename: '~/.gemini/config/mcp_config.json',
          steps: [
            'Add the Streamable HTTP entry to ~/.gemini/config/mcp_config.json.',
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
          badge: 'Cursor IDE',
          filename: '~/.cursor/mcp.json',
          steps: [
            'Add the server in Cursor Settings → Tools & MCP or ~/.cursor/mcp.json.',
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
          label: 'ChatGPT',
          badge: 'OpenAI MCP',
          filename: 'OpenAI MCP Config',
          steps: [
            'Register the remote Streamable HTTP URL in ChatGPT Connectors or OpenAI Responses API.',
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
          label: 'VS Code',
          badge: 'Copilot Agent',
          filename: '.vscode/mcp.json',
          steps: [
            'Add the HTTP server entry to .vscode/mcp.json in your workspace.',
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
          label: 'cURL',
          badge: 'JSON-RPC',
          filename: 'Terminal',
          steps: [
            'Verify the stateless endpoint directly from your terminal.',
          ],
          snippet: `curl -X POST https://mcp.santiago-jv.tech/mcp \\
  -H "Content-Type: application/json" \\
  -H "Accept: application/json, text/event-stream" \\
  -d '{"jsonrpc":"2.0","id":1,"method":"tools/list","params":{}}'`,
        },
      ],
    },
    recruiter: {
      eyebrow: 'Vacancy Match & Prompts',
      headline: 'Ask in Plain Language',
      description:
        'Your AI assistant automatically selects the right tool. Copy a prompt or test a role in the edge simulator below.',
      promptCardTitle: 'Natural Prompts',
      promptCardSubtitle: 'Paste into your connected AI assistant:',
      copyPromptBtn: 'Copy Prompt',
      promptTabs: [
        {
          id: 'recruiter',
          label: 'Vacancy Fit',
          prompt: `Evaluate how well Santiago Olayo fits our open role below:
1. Fit score (0-100) and hiring recommendation.
2. Matching backend, cloud, and product strengths from GoodRec & Bolsiyo.
3. Any stack or modality gaps to validate.
4. Direct email, LinkedIn, and PDF resume link.

Job Description:
[PASTE JOB DESCRIPTION]`,
        },
        {
          id: 'engineering',
          label: 'Architecture Audit',
          prompt: `Give me a technical overview of Santiago Olayo's production engineering:
1. Hexagonal Architecture, DDD, TypeScript/NestJS, and Java/Spring Boot.
2. High concurrency, Redis distributed locks, Stripe/Nequi payments, and migrations.
3. Datadog APM, CleverTap, Metabase, MCP servers, and Cloudflare Workers.`,
        },
        {
          id: 'intro',
          label: '30s Intro & Outreach',
          prompt: `Give me a 30-second summary of Santiago Olayo's profile, timezone, and work modality, and draft a short interview invitation from [COMPANY] for our [ROLE] opening.`,
        },
      ],
      simulator: {
        title: 'Vacancy Match Simulator',
        subtitle: 'Preview compatibility at the edge:',
        presetsLabel: 'Presets:',
        presets: [
          {
            label: 'Senior Backend (NestJS / AWS)',
            role: 'Senior Backend Engineer',
            jd: 'Senior Backend Engineer with 4+ years in TypeScript, Node.js, NestJS, Hexagonal Architecture, DDD, PostgreSQL, MongoDB, Redis locks, Stripe, AWS ECS, GitHub Actions, and Datadog. Remote.',
          },
          {
            label: 'AI & Internal Tools',
            role: 'Applied AI & Platform Engineer',
            jd: 'Fullstack / Backend Engineer building internal AI workflows, Model Context Protocol (MCP) servers, Cloudflare Workers, and analytics in Metabase & CleverTap. 4+ years, Remote.',
          },
          {
            label: 'Different Stack (Rust / K8s)',
            role: 'Staff Rust & Kubernetes SRE',
            jd: '8+ years writing low-level Rust and administering bare-metal Kubernetes + Istio clusters on-site in Berlin.',
          },
        ],
        rolePlaceholder: 'Role title (e.g., Senior Backend Engineer)',
        jdPlaceholder: 'Paste job description, stack, and modality...',
        scoreLabel: 'Match Score',
        matchedLabel: 'Matched Production Skills',
        gapsLabel: 'Screening Notes',
        noGapsText: 'No critical stack or modality gaps detected.',
      },
    },
    reference: {
      eyebrow: 'Reference',
      headline: 'Tools & Resources',
      description:
        'Read-only MCP capabilities exposed with strict Zod schemas.',
      toolsTitle: 'Tools (6)',
      promptsTitle: 'Prompts (3)',
      resourcesTitle: 'Resources (4)',
      requiredBadge: 'required',
      optionalBadge: 'optional',
      tools: [
        {
          name: 'evaluate_vacancy_match',
          badge: 'Recruiter Fit',
          summary:
            'Scores a job description (0–100) against production stack, seniority, and modality with transparent gap notes.',
          params: [
            { name: 'job_description', type: 'string', required: true, description: 'Full job description text.' },
            { name: 'role_title', type: 'string', required: false, description: 'Open position title.' },
            { name: 'modality', type: '"remote" | "hybrid" | "onsite"', required: false, description: 'Work modality.' },
          ],
        },
        {
          name: 'get_profile_overview',
          badge: 'Overview',
          summary:
            'Executive summary, 4.5+ years experience overview, location (UTC-5), languages, and resume PDF URLs.',
          params: [
            { name: 'language', type: '"en" | "es"', required: false, description: 'Response language.' },
          ],
        },
        {
          name: 'get_work_experience',
          badge: 'Experience',
          summary:
            'Career history across GoodRec, Bolsiyo, and Cooltivalo · +COTAS · SLS GROUPS.',
          params: [
            { name: 'company', type: 'string', required: false, description: 'Filter by company (e.g. "GoodRec", "Bolsiyo").' },
            { name: 'focus', type: '"all" | "backend" | "ai-mcp" | "observability" | "product"', required: false, description: 'Domain filter.' },
          ],
        },
        {
          name: 'get_tech_stack_and_architecture',
          badge: 'Stack',
          summary:
            'Categorized skill matrix and architecture principles (Hexagonal, DDD, Redis Locks, Stripe/Nequi, Datadog, MCP).',
          params: [
            { name: 'domain', type: '"all" | "backend" | "architecture" | "ai" | "cloud-observability" | "databases" | "product-analytics"', required: false, description: 'Category filter.' },
          ],
        },
        {
          name: 'get_social_and_contact_links',
          badge: 'Contact',
          summary:
            'Verified email (contact@santiago-jv.tech), LinkedIn, GitHub, X, portfolio URL, and EN/ES PDF resumes.',
          params: [
            { name: 'include_resume_urls', type: 'boolean', required: false, description: 'Include PDF links.' },
          ],
        },
        {
          name: 'prepare_outreach_context',
          badge: 'Outreach',
          summary:
            'Generates an ATS summary card and a personalized interview invitation draft.',
          params: [
            { name: 'company_name', type: 'string', required: true, description: 'Company name.' },
            { name: 'role_title', type: 'string', required: true, description: 'Role title.' },
          ],
        },
      ],
      prompts: [
        {
          name: 'evaluate_candidate_fit',
          args: 'job_description, language?',
          description: 'Recruiter fit assessment for an open role.',
        },
        {
          name: 'technical_deep_dive',
          args: 'topic?',
          description: 'Deep dive into backend architecture, concurrency, observability, or MCP.',
        },
        {
          name: 'quick_intro',
          args: 'language?',
          description: '30-second executive summary with contact and CV links.',
        },
      ],
      resources: [
        { uri: 'santiago://profile/resume-en', mimeType: 'text/markdown', description: 'English CV in Markdown.' },
        { uri: 'santiago://profile/resume-es', mimeType: 'text/markdown', description: 'Spanish CV in Markdown.' },
        { uri: 'santiago://profile/architecture-blueprint', mimeType: 'application/json', description: 'Architecture pillars across Cloud, Data, Observability, and AI/MCP.' },
        { uri: 'santiago://profile/contact-card', mimeType: 'application/json', description: 'Verified contact card and PDF resume links.' },
      ],
    },
    footer: {
      gateway: 'Gateway (/)',
      health: 'Health (/health)',
      portfolio: 'Portfolio (santiago-jv.tech)',
      source: 'GitHub',
    },
  },
  es: {
    nav: {
      setup: 'Conexión Rápida',
      recruiter: 'Match Vacantes',
      reference: 'Tools y Recursos',
      aiChat: 'Chat IA en Vivo',
      backPortfolio: 'Portafolio',
    },
    hero: {
      statusPrefix: 'Operativo · Streamable HTTP',
      title: 'Santiago Olayo MCP',
      subtitle:
        'Conecta Claude, Codex, Antigravity, Cursor o ChatGPT para consultar mi trayectoria, arquitectura backend y compatibilidad con vacantes.',
      endpointCaption: 'Endpoint Streamable HTTP Público · Sin Autenticación',
      copyEndpoint: 'Copiar URL',
      copied: 'Copiado',
      specBadges: [
        'MCP 2025-03-26',
        'Streamable HTTP',
        'Cloudflare Edge',
        'Público Solo Lectura',
      ],
    },
    setup: {
      eyebrow: 'Conexión Rápida',
      headline: 'Conéctalo en 10 Segundos',
      description:
        'Selecciona tu cliente de IA y copia la configuración Streamable HTTP.',
      copySnippet: 'Copiar Configuración',
      clients: [
        {
          id: 'claude',
          label: 'Claude',
          badge: 'CLI, Web y Desktop',
          filename: 'Claude CLI / Conectores',
          steps: [
            'Ejecuta el comando en consola o agrega https://mcp.santiago-jv.tech/mcp en Claude → Configuración → Conectores.',
          ],
          snippet: `# Opción A: Claude Code CLI
claude mcp add --transport http santiago-jv https://mcp.santiago-jv.tech/mcp

# Opción B: claude_desktop_config.json
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
          badge: 'OpenAI Codex CLI',
          filename: '~/.codex/config.toml',
          steps: [
            'Ejecuta codex mcp add en tu terminal o agrégalo en ~/.codex/config.toml.',
          ],
          snippet: `# Opción A: Codex CLI
codex mcp add santiago-jv --url https://mcp.santiago-jv.tech/mcp

# Opción B: ~/.codex/config.toml
[mcp_servers.santiago-jv]
url = "https://mcp.santiago-jv.tech/mcp"`,
        },
        {
          id: 'antigravity',
          label: 'Antigravity',
          badge: 'Google Antigravity',
          filename: '~/.gemini/config/mcp_config.json',
          steps: [
            'Agrega el bloque Streamable HTTP en ~/.gemini/config/mcp_config.json.',
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
          badge: 'Cursor IDE',
          filename: '~/.cursor/mcp.json',
          steps: [
            'Agrégalo en Cursor Settings → Tools & MCP o en ~/.cursor/mcp.json.',
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
          label: 'ChatGPT',
          badge: 'OpenAI MCP',
          filename: 'OpenAI MCP Config',
          steps: [
            'Registra el endpoint Streamable HTTP en Conectores de ChatGPT o Responses API.',
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
          label: 'VS Code',
          badge: 'Copilot Agent',
          filename: '.vscode/mcp.json',
          steps: [
            'Agrega el servidor HTTP en .vscode/mcp.json dentro de tu proyecto.',
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
          label: 'cURL',
          badge: 'JSON-RPC',
          filename: 'Terminal',
          steps: [
            'Verifica el servidor directamente desde tu terminal.',
          ],
          snippet: `curl -X POST https://mcp.santiago-jv.tech/mcp \\
  -H "Content-Type: application/json" \\
  -H "Accept: application/json, text/event-stream" \\
  -d '{"jsonrpc":"2.0","id":1,"method":"tools/list","params":{}}'`,
        },
      ],
    },
    recruiter: {
      eyebrow: 'Match de Vacantes y Prompts',
      headline: 'Pregunta en Lenguaje Natural',
      description:
        'Tu asistente de IA invoca la herramienta adecuada automáticamente. Copia un prompt o prueba el simulador abajo.',
      promptCardTitle: 'Prompts Sugeridos',
      promptCardSubtitle: 'Pega directamente en tu asistente de IA:',
      copyPromptBtn: 'Copiar Prompt',
      promptTabs: [
        {
          id: 'recruiter',
          label: 'Evaluar Vacante',
          prompt: `Evalúa qué tanto encaja Santiago Olayo con nuestra vacante:
1. Puntaje de compatibilidad (0-100) y recomendación.
2. Fortalezas en backend, cloud y producto demostradas en GoodRec y Bolsiyo.
3. Brechas honestas de stack o modalidad a validar.
4. Correo directo, LinkedIn y enlace a su CV en PDF.

Vacante:
[PEGA AQUÍ LA VACANTE]`,
        },
        {
          id: 'engineering',
          label: 'Auditoría Técnica',
          prompt: `Dame un resumen técnico de la experiencia en producción de Santiago Olayo:
1. Arquitectura Hexagonal, DDD, TypeScript/NestJS y Java/Spring Boot.
2. Alta concurrencia, locks en Redis, pagos con Stripe/Nequi y migraciones.
3. Datadog APM, CleverTap, Metabase, servidores MCP y Cloudflare Workers.`,
        },
        {
          id: 'intro',
          label: 'Resumen 30s',
          prompt: `Dame un resumen de 30 segundos sobre Santiago Olayo, su zona horaria y modalidad, y redacta una invitación a entrevista desde [EMPRESA] para el rol de [CARGO].`,
        },
      ],
      simulator: {
        title: 'Simulador de Vacantes',
        subtitle: 'Calcula compatibilidad al instante:',
        presetsLabel: 'Ejemplos:',
        presets: [
          {
            label: 'Senior Backend (NestJS / AWS)',
            role: 'Senior Backend Engineer',
            jd: 'Senior Backend Engineer con 4+ años en TypeScript, Node.js, NestJS, Arquitectura Hexagonal, DDD, PostgreSQL, MongoDB, locks en Redis, Stripe, AWS ECS, GitHub Actions y Datadog. Remoto.',
          },
          {
            label: 'IA & Internal Tools',
            role: 'Product Owner / AI Tooling Engineer',
            jd: 'Ingeniero Fullstack/Backend para automatización con IA, servidores Model Context Protocol (MCP), Cloudflare Workers y analítica con CleverTap y Metabase. 4+ años, Remoto.',
          },
          {
            label: 'Otro Stack (Rust / K8s)',
            role: 'SRE Rust & Kubernetes',
            jd: '8 años programando en Rust y administrando clústeres Kubernetes e Istio presencial en Madrid.',
          },
        ],
        rolePlaceholder: 'Título del cargo (ej. Senior Backend Engineer)',
        jdPlaceholder: 'Pega los requisitos de la vacante, tecnologías y modalidad...',
        scoreLabel: 'Nivel de Match',
        matchedLabel: 'Habilidades Coincidentes',
        gapsLabel: 'Notas de Transparencia',
        noGapsText: 'Sin brechas críticas frente a su perfil principal.',
      },
    },
    reference: {
      eyebrow: 'Referencia',
      headline: 'Tools y Recursos',
      description:
        'Capacidades MCP de solo lectura tipadas con esquemas Zod.',
      toolsTitle: 'Tools (6)',
      promptsTitle: 'Prompts (3)',
      resourcesTitle: 'Resources (4)',
      requiredBadge: 'requerido',
      optionalBadge: 'opcional',
      tools: [
        {
          name: 'evaluate_vacancy_match',
          badge: 'Match Vacantes',
          summary:
            'Evalúa una vacante (0–100) contra la experiencia real, stack técnico y modalidad de Santiago.',
          params: [
            { name: 'job_description', type: 'string', required: true, description: 'Texto completo de la vacante.' },
            { name: 'role_title', type: 'string', required: false, description: 'Nombre del cargo.' },
            { name: 'modality', type: '"remote" | "hybrid" | "onsite"', required: false, description: 'Modalidad de trabajo.' },
          ],
        },
        {
          name: 'get_profile_overview',
          badge: 'Perfil',
          summary:
            'Resumen profesional, 4.5+ años de experiencia, ubicación (UTC-5), idiomas y enlaces al CV en PDF.',
          params: [
            { name: 'language', type: '"en" | "es"', required: false, description: 'Idioma de respuesta.' },
          ],
        },
        {
          name: 'get_work_experience',
          badge: 'Experiencia',
          summary:
            'Trayectoria en GoodRec, Bolsiyo y Cooltivalo · +COTAS · SLS GROUPS.',
          params: [
            { name: 'company', type: 'string', required: false, description: 'Filtro por empresa.' },
            { name: 'focus', type: '"all" | "backend" | "ai-mcp" | "observability" | "product"', required: false, description: 'Filtro por área.' },
          ],
        },
        {
          name: 'get_tech_stack_and_architecture',
          badge: 'Stack',
          summary:
            'Matriz de habilidades y arquitectura (Hexagonal, DDD, Redis Locks, Stripe/Nequi, Datadog, MCP).',
          params: [
            { name: 'domain', type: '"all" | "backend" | "architecture" | "ai" | "cloud-observability" | "databases" | "product-analytics"', required: false, description: 'Categoría técnica.' },
          ],
        },
        {
          name: 'get_social_and_contact_links',
          badge: 'Contacto',
          summary:
            'Correo oficial (contact@santiago-jv.tech), LinkedIn, GitHub, X, portafolio y CVs en PDF.',
          params: [
            { name: 'include_resume_urls', type: 'boolean', required: false, description: 'Incluir enlaces PDF.' },
          ],
        },
        {
          name: 'prepare_outreach_context',
          badge: 'Outreach',
          summary:
            'Genera ficha resumen ATS y borrador de invitación a entrevista.',
          params: [
            { name: 'company_name', type: 'string', required: true, description: 'Nombre de la empresa.' },
            { name: 'role_title', type: 'string', required: true, description: 'Título de la vacante.' },
          ],
        },
      ],
      prompts: [
        {
          name: 'evaluate_candidate_fit',
          args: 'job_description, language?',
          description: 'Evaluación ejecutiva de compatibilidad con una vacante.',
        },
        {
          name: 'technical_deep_dive',
          args: 'topic?',
          description: 'Profundización en arquitectura backend, concurrencia, observabilidad o MCP.',
        },
        {
          name: 'quick_intro',
          args: 'language?',
          description: 'Resumen de 30 segundos con enlaces de contacto y CV.',
        },
      ],
      resources: [
        { uri: 'santiago://profile/resume-en', mimeType: 'text/markdown', description: 'CV en inglés (Markdown).' },
        { uri: 'santiago://profile/resume-es', mimeType: 'text/markdown', description: 'CV en español (Markdown).' },
        { uri: 'santiago://profile/architecture-blueprint', mimeType: 'application/json', description: 'Pilares de arquitectura en Cloud, Datos, Observabilidad e IA/MCP.' },
        { uri: 'santiago://profile/contact-card', mimeType: 'application/json', description: 'Tarjeta JSON verificada de contacto y enlaces PDF.' },
      ],
    },
    footer: {
      gateway: 'Gateway (/)',
      health: 'Health (/health)',
      portfolio: 'Portafolio (santiago-jv.tech)',
      source: 'GitHub',
    },
  },
};
