import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { CfWorkerJsonSchemaValidator } from '@modelcontextprotocol/sdk/validation/cfworker';
import { z } from 'zod';
import {
  ARCHITECTURE_BLUEPRINT,
  buildMarkdownResume,
  SANTIAGO_IDENTITY,
  SKILL_MATRIX,
  WORK_EXPERIENCE,
} from '../data/profile.js';
import { evaluateVacancyMatch } from '../domain/vacancy-matcher.js';

export const PUBLIC_TOOL_CATALOG = [
  {
    name: 'get_profile_overview',
    summary: 'Executive bio, years of experience, spoken languages, education, location, and resume PDFs.',
  },
  {
    name: 'get_work_experience',
    summary: 'Detailed career history at GoodRec, Bolsiyo, and previous teams filtered by domain or company.',
  },
  {
    name: 'get_tech_stack_and_architecture',
    summary: 'Categorized skill matrix with production evidence and system architecture blueprints.',
  },
  {
    name: 'get_social_and_contact_links',
    summary: 'Verified links: portfolio, email, LinkedIn, GitHub, X, Medium, and downloadable CV PDFs.',
  },
  {
    name: 'evaluate_vacancy_match',
    summary: 'Recruiter & Hiring Manager tool: paste a job description to score fit, strengths, and honest gaps.',
  },
  {
    name: 'prepare_outreach_context',
    summary: 'Generates an ATS-ready candidate summary card and direct contact instructions for a specific role.',
  },
] as const;

export function createSantiagoMcpServer(version = '1.0.0'): McpServer {
  const server = new McpServer(
    {
      name: 'santiago-jv-mcp',
      version,
    },
    {
      jsonSchemaValidator: new CfWorkerJsonSchemaValidator(),
      instructions:
        'Official Model Context Protocol (MCP) server for Santiago Olayo Villamil (Senior Software Engineer · Backend, Cloud, Product Analytics & AI Internal Tooling). Use `evaluate_vacancy_match` when a recruiter or hiring manager shares a job description to assess candidate fit honestly and quantitatively.',
    }
  );

  // 1. Profile Overview Tool
  server.registerTool(
    'get_profile_overview',
    {
      title: 'Get Santiago Olayo Profile Overview',
      description:
        'Returns executive summary, current role, years of experience, spoken languages, location/timezone, work modalities, education, and direct resume links for Santiago Olayo Villamil.',
      inputSchema: {
        language: z
          .enum(['en', 'es'])
          .optional()
          .describe('Preferred response language ("en" or "es"). Defaults to "en".'),
      },
      annotations: {
        readOnlyHint: true,
        destructiveHint: false,
        idempotentHint: true,
        openWorldHint: false,
      },
    },
    async ({ language = 'en' }) => {
      const payload = {
        fullName: SANTIAGO_IDENTITY.fullName,
        handle: SANTIAGO_IDENTITY.handle,
        headline: SANTIAGO_IDENTITY.headline[language],
        yearsOfExperience: SANTIAGO_IDENTITY.experienceLabel,
        summary: SANTIAGO_IDENTITY.summary[language],
        location: {
          city: SANTIAGO_IDENTITY.location.city,
          country: SANTIAGO_IDENTITY.location.country,
          timezone: SANTIAGO_IDENTITY.location.timezone,
          workModalities: SANTIAGO_IDENTITY.location.workModalities[language],
        },
        spokenLanguages: SANTIAGO_IDENTITY.spokenLanguages.map((item) => ({
          language: item.language,
          level: item.level[language],
        })),
        education: SANTIAGO_IDENTITY.education.map((ed) => ({
          degree: ed.degree[language],
          institution: ed.institution,
          period: ed.period,
          location: ed.location,
        })),
        links: SANTIAGO_IDENTITY.links,
      };

      return {
        content: [
          {
            type: 'text',
            text: JSON.stringify(payload, null, 2),
          },
        ],
      };
    }
  );

  // 2. Work Experience Tool
  server.registerTool(
    'get_work_experience',
    {
      title: 'Get Work Experience & Production Impact',
      description:
        'Retrieves Santiago Olayo’s professional work experience (GoodRec, Bolsiyo, Cooltivalo · +COTAS · SLS GROUPS) with architectural decisions, responsibilities, and tech stacks.',
      inputSchema: {
        company: z
          .string()
          .max(120)
          .optional()
          .describe('Optional company filter (e.g. "GoodRec" or "Bolsiyo").'),
        focus: z
          .enum(['all', 'backend', 'ai-mcp', 'observability', 'product'])
          .optional()
          .describe('Optional engineering domain filter.'),
        language: z
          .enum(['en', 'es'])
          .optional()
          .describe('Preferred language ("en" or "es"). Defaults to "en".'),
      },
      annotations: {
        readOnlyHint: true,
        destructiveHint: false,
        idempotentHint: true,
        openWorldHint: false,
      },
    },
    async ({ company, focus = 'all', language = 'en' }) => {
      const normalizedCompany = company?.trim().toLowerCase();
      const filtered = WORK_EXPERIENCE.filter((item) => {
        const matchesCompany = normalizedCompany
          ? item.company.toLowerCase().includes(normalizedCompany)
          : true;
        const matchesFocus =
          focus === 'all' ? true : item.domains.includes(focus);
        return matchesCompany && matchesFocus;
      }).map((exp) => ({
        company: exp.company,
        role: exp.role[language],
        period: exp.period[language],
        modality: exp.modality[language],
        domains: exp.domains,
        tech: exp.tech,
        highlights: exp.highlights[language],
      }));

      return {
        content: [
          {
            type: 'text',
            text: JSON.stringify(
              {
                candidate: SANTIAGO_IDENTITY.fullName,
                totalYearsExperience: SANTIAGO_IDENTITY.experienceLabel,
                count: filtered.length,
                experiences: filtered,
              },
              null,
              2
            ),
          },
        ],
      };
    }
  );

  // 3. Tech Stack & Architecture Tool
  server.registerTool(
    'get_tech_stack_and_architecture',
    {
      title: 'Get Tech Stack & System Architecture Blueprint',
      description:
        'Returns Santiago’s categorized technical skills, years of hands-on production use, evidence per skill, and architectural principles (Hexagonal, DDD, Redis Locks, AWS ECS, Datadog, MCP, Cloudflare AI Gateway).',
      inputSchema: {
        domain: z
          .enum([
            'all',
            'backend',
            'architecture',
            'ai',
            'cloud-observability',
            'databases',
            'product-analytics',
            'frontend-mobile',
          ])
          .optional()
          .describe('Filter by technical category. Defaults to "all".'),
        language: z
          .enum(['en', 'es'])
          .optional()
          .describe('Preferred language ("en" or "es"). Defaults to "en".'),
      },
      annotations: {
        readOnlyHint: true,
        destructiveHint: false,
        idempotentHint: true,
        openWorldHint: false,
      },
    },
    async ({ domain = 'all', language = 'en' }) => {
      const skills = SKILL_MATRIX.filter((s) =>
        domain === 'all' ? true : s.category === domain
      ).map((s) => ({
        skill: s.name,
        category: s.category,
        tier: s.tier,
        years: s.years,
        productionEvidence: s.evidence[language],
      }));

      return {
        content: [
          {
            type: 'text',
            text: JSON.stringify(
              {
                candidate: SANTIAGO_IDENTITY.fullName,
                domainFilter: domain,
                skills,
                architectureBlueprint: ARCHITECTURE_BLUEPRINT,
              },
              null,
              2
            ),
          },
        ],
      };
    }
  );

  // 4. Social & Contact Links Tool
  server.registerTool(
    'get_social_and_contact_links',
    {
      title: 'Get Social Networks, Contact & Resume PDFs',
      description:
        'Returns verified contact details, social links (LinkedIn, GitHub, X, Medium), portfolio URL, and downloadable English/Spanish PDF resumes.',
      inputSchema: {
        include_resume_urls: z
          .boolean()
          .optional()
          .describe('Include direct downloadable PDF links for English and Spanish resumes (default: true).'),
      },
      annotations: {
        readOnlyHint: true,
        destructiveHint: false,
        idempotentHint: true,
        openWorldHint: false,
      },
    },
    async ({ include_resume_urls = true }) => {
      const { links } = SANTIAGO_IDENTITY;
      const result = {
        name: SANTIAGO_IDENTITY.fullName,
        preferredContactMethod: 'Email (contact@santiago-jv.tech) or LinkedIn DM (/in/santiago-jv)',
        email: links.email,
        portfolio: links.portfolio,
        mcpDocumentation: links.mcpDocs,
        socials: {
          linkedin: links.linkedin,
          github: links.github,
          x: links.x,
          medium: links.medium,
        },
        ...(include_resume_urls
          ? {
              resumes: {
                englishPdf: links.resumeEnPdf,
                spanishPdf: links.resumeEsPdf,
                llmsFullContext: links.llmsTxt,
              },
            }
          : {}),
      };

      return {
        content: [
          {
            type: 'text',
            text: JSON.stringify(result, null, 2),
          },
        ],
      };
    }
  );

  // 5. Star Recruiter Tool: Evaluate Vacancy Match
  server.registerTool(
    'evaluate_vacancy_match',
    {
      title: 'Evaluate Job Vacancy Match (For Recruiters & Hiring Managers)',
      description:
        'Analyzes a job description or list of role requirements against Santiago Olayo’s real production experience, technical stack, seniority, and work modality. Returns a quantitative fit score (0-100), matched skills with evidence, key differentiators, transparent stack gaps, and an executive hiring recommendation.',
      inputSchema: {
        job_description: z
          .string()
          .min(10)
          .max(10000)
          .describe('Full job description text, summary of the open role, or key requirements.'),
        role_title: z
          .string()
          .max(160)
          .optional()
          .describe('Job title (e.g., "Senior Backend Engineer", "Fullstack TypeScript Engineer").'),
        company_name: z
          .string()
          .max(120)
          .optional()
          .describe('Hiring company name (optional).'),
        required_skills: z
          .array(z.string().max(80))
          .max(30)
          .optional()
          .describe('Optional explicit list of must-have skills to check strictly.'),
        nice_to_have_skills: z
          .array(z.string().max(80))
          .max(25)
          .optional()
          .describe('Optional list of bonus / nice-to-have skills.'),
        modality: z
          .enum(['remote', 'hybrid', 'onsite', 'unspecified'])
          .optional()
          .describe('Work modality of the role.'),
        location_requirement: z
          .string()
          .max(140)
          .optional()
          .describe('Location or timezone requirement (e.g., "US/LatAm Remote", "Bogotá Onsite", "Barranquilla").'),
        min_years_experience: z
          .number()
          .min(0)
          .max(25)
          .optional()
          .describe('Minimum years of experience requested by the role.'),
        language: z
          .enum(['en', 'es'])
          .optional()
          .describe('Output language ("en" or "es"). Auto-detected from job_description if omitted.'),
      },
      annotations: {
        readOnlyHint: true,
        destructiveHint: false,
        idempotentHint: true,
        openWorldHint: false,
      },
    },
    async (args) => {
      const evaluation = evaluateVacancyMatch(args);
      return {
        content: [
          {
            type: 'text',
            text: evaluation.markdownReport,
          },
          {
            type: 'text',
            text: `\n---\n### Structured Telemetry (JSON)\n\`\`\`json\n${JSON.stringify(
              {
                overallScore: evaluation.overallScore,
                verdictTier: evaluation.verdictTier,
                shouldInterview: evaluation.shouldInterview,
                breakdown: evaluation.breakdown,
                matchedCoreSkills: evaluation.matchedCoreSkills,
                transparentGapsOrNotes: evaluation.transparentGapsOrNotes,
                suggestedInterviewTopics: evaluation.suggestedInterviewTopics,
                nextSteps: evaluation.nextSteps,
              },
              null,
              2
            )}\n\`\`\``,
          },
        ],
      };
    }
  );

  // 6. Outreach & ATS Card Generator Tool
  server.registerTool(
    'prepare_outreach_context',
    {
      title: 'Prepare Recruiter Outreach & ATS Summary Card',
      description:
        'Generates a concise ATS candidate note and ready-to-send outreach template to contact Santiago Olayo for an interview.',
      inputSchema: {
        company_name: z.string().min(1).max(120).describe('Name of your company or client.'),
        role_title: z.string().min(2).max(160).describe('Title of the open position.'),
        recruiter_name: z.string().max(120).optional().describe('Your name (optional).'),
        key_reason: z
          .string()
          .max(400)
          .optional()
          .describe('Top skill or project aspect that caught your eye (optional).'),
        language: z.enum(['en', 'es']).optional().describe('Preferred language ("en" or "es"). Defaults to "en".'),
      },
      annotations: {
        readOnlyHint: true,
        destructiveHint: false,
        idempotentHint: true,
        openWorldHint: false,
      },
    },
    async ({ company_name, role_title, recruiter_name, key_reason, language = 'en' }) => {
      const sender = recruiter_name ? `${recruiter_name} (${company_name})` : company_name;
      const reasonLineEn = key_reason
        ? `Specifically, your work around ${key_reason} stood out for what we are building.`
        : 'Your background in NestJS/TypeScript backend architecture, cloud reliability, and internal MCP tooling aligns closely with what our team is building.';
      const reasonLineEs = key_reason
        ? `En especial nos llamó la atención tu experiencia en ${key_reason}.`
        : 'Tu perfil en arquitectura backend con NestJS/TypeScript, cloud y tooling interno con MCP encaja muy bien con lo que estamos construyendo.';

      const payload =
        language === 'es'
          ? {
              atsSummaryCard: {
                candidate: SANTIAGO_IDENTITY.fullName,
                targetRole: `${role_title} @ ${company_name}`,
                currentRole: 'Product Owner Engineer / Senior Backend Engineer @ GoodRec',
                experience: '4+ años (Node.js, NestJS, TypeScript, Spring Boot, AWS, PostgreSQL, MongoDB, Redis, Datadog, MCP)',
                location: 'Colombia (UTC-5) · Remoto / Barranquilla / Santa Marta',
                email: SANTIAGO_IDENTITY.links.email,
                linkedin: SANTIAGO_IDENTITY.links.linkedin,
                resumePdf: SANTIAGO_IDENTITY.links.resumeEsPdf,
              },
              suggestedEmailDraft: {
                to: SANTIAGO_IDENTITY.links.email,
                subject: `Oportunidad: ${role_title} en ${company_name}`,
                body: `Hola Santiago,\n\nSoy ${sender}. Estuve revisando tu portafolio y evaluando tu perfil a través de tu servidor MCP para el rol de ${role_title} en ${company_name}.\n\n${reasonLineEs}\n\n¿Tendrías 20 minutos esta semana para conversar sobre el rol y el equipo?\n\nSaludos,`,
              },
            }
          : {
              atsSummaryCard: {
                candidate: SANTIAGO_IDENTITY.fullName,
                targetRole: `${role_title} @ ${company_name}`,
                currentRole: 'Product Owner Engineer / Senior Backend Engineer @ GoodRec',
                experience: '4+ years (Node.js, NestJS, TypeScript, Spring Boot, AWS, PostgreSQL, MongoDB, Redis, Datadog, MCP)',
                location: 'Colombia (UTC-5, EST overlap) · Remote',
                email: SANTIAGO_IDENTITY.links.email,
                linkedin: SANTIAGO_IDENTITY.links.linkedin,
                resumePdf: SANTIAGO_IDENTITY.links.resumeEnPdf,
              },
              suggestedEmailDraft: {
                to: SANTIAGO_IDENTITY.links.email,
                subject: `${role_title} opportunity at ${company_name}`,
                body: `Hi Santiago,\n\nI'm reaching out from ${sender}. I explored your portfolio and ran our ${role_title} role through your MCP server.\n\n${reasonLineEn}\n\nWould you be open to a quick 20-minute intro chat this week?\n\nBest,`,
              },
            };

      return {
        content: [
          {
            type: 'text',
            text: JSON.stringify(payload, null, 2),
          },
        ],
      };
    }
  );

  // Resources
  server.registerResource(
    'resume-en',
    'santiago://profile/resume-en',
    {
      title: 'Santiago Olayo Villamil — Full Resume (English)',
      description: 'Complete structured English CV in Markdown format.',
      mimeType: 'text/markdown',
    },
    async (uri) => ({
      contents: [
        {
          uri: uri.href,
          mimeType: 'text/markdown',
          text: buildMarkdownResume('en'),
        },
      ],
    })
  );

  server.registerResource(
    'resume-es',
    'santiago://profile/resume-es',
    {
      title: 'Santiago Olayo Villamil — Full Resume (Spanish)',
      description: 'Complete structured Spanish CV in Markdown format.',
      mimeType: 'text/markdown',
    },
    async (uri) => ({
      contents: [
        {
          uri: uri.href,
          mimeType: 'text/markdown',
          text: buildMarkdownResume('es'),
        },
      ],
    })
  );

  server.registerResource(
    'architecture-blueprint',
    'santiago://profile/architecture-blueprint',
    {
      title: 'System Architecture & AI Tooling Blueprint',
      description: 'Principles and production architecture patterns used by Santiago across Cloud, Backend, Data, Observability, and MCP.',
      mimeType: 'application/json',
    },
    async (uri) => ({
      contents: [
        {
          uri: uri.href,
          mimeType: 'application/json',
          text: JSON.stringify(ARCHITECTURE_BLUEPRINT, null, 2),
        },
      ],
    })
  );

  server.registerResource(
    'contact-card',
    'santiago://profile/contact-card',
    {
      title: 'Verified Contact & Social Links',
      description: 'Direct contact channels, social handles, and official resume PDF URLs.',
      mimeType: 'application/json',
    },
    async (uri) => ({
      contents: [
        {
          uri: uri.href,
          mimeType: 'application/json',
          text: JSON.stringify(SANTIAGO_IDENTITY.links, null, 2),
        },
      ],
    })
  );

  // Prompts
  server.registerPrompt(
    'evaluate_candidate_fit',
    {
      title: 'Evaluate Candidate Fit for My Open Role (Recruiter Brief)',
      description:
        'Paste your job description to generate an honest, executive hiring fit assessment of Santiago Olayo Villamil.',
      argsSchema: {
        job_description: z.string().describe('Paste the full job description or requirements for your open role.'),
        language: z.enum(['en', 'es']).optional().describe('Language for the hiring brief ("en" or "es").'),
      },
    },
    ({ job_description, language = 'en' }) => ({
      messages: [
        {
          role: 'user',
          content: {
            type: 'text',
            text:
              language === 'es'
                ? `Actúa como un Staff Technical Recruiter y Engineering Manager riguroso. Usa la herramienta \`evaluate_vacancy_match\` (y complementa con \`get_work_experience\` si necesitas detalles) para evaluar qué tanto match hace Santiago Olayo Villamil con la siguiente vacante.\n\nEntrégame:\n1. Veredicto directo (¿Vale la pena entrevistarlo para este rol? Sí/No y por qué en 3 líneas).\n2. Top 4 fortalezas probadas en producción que coinciden con lo que buscamos.\n3. Brechas reales o preguntas clave para validar en una primera llamada.\n4. Enlaces directos a su correo, LinkedIn y CV en PDF.\n\nVacante a evaluar:\n${job_description}`
                : `Act as a rigorous Staff Technical Recruiter and Hiring Manager. Call \`evaluate_vacancy_match\` (and \`get_work_experience\` if helpful) to evaluate how well Santiago Olayo Villamil fits the open role below.\n\nProvide:\n1. Clear Bottom-Line Verdict (Should we interview him for this role? Yes/No + 3-sentence rationale).\n2. Top 4 production-proven strengths matching our stack and responsibilities.\n3. Honest gaps or screening questions to validate on an intro call.\n4. Direct links to his email, LinkedIn, and PDF resume.\n\nJob Description:\n${job_description}`,
          },
        },
      ],
    })
  );

  server.registerPrompt(
    'technical_deep_dive',
    {
      title: 'Technical Deep Dive on Santiago’s Engineering Experience',
      description: 'Inspect Santiago’s production work on Backend Architecture, Concurrency, Observability, or AI/MCP.',
      argsSchema: {
        topic: z
          .enum(['backend-architecture', 'ai-and-mcp', 'observability-and-data', 'full-overview'])
          .optional()
          .describe('Engineering area to explore.'),
      },
    },
    ({ topic = 'full-overview' }) => ({
      messages: [
        {
          role: 'user',
          content: {
            type: 'text',
            text: `Use \`get_work_experience\` and \`get_tech_stack_and_architecture\` on santiago-jv-mcp to give me a concise, concrete engineering breakdown of Santiago Olayo's hands-on work focusing on: ${topic}. Highlight real architectural trade-offs and production systems rather than generic buzzwords.`,
          },
        },
      ],
    })
  );

  server.registerPrompt(
    'quick_intro',
    {
      title: '30-Second Executive Snapshot',
      description: 'Get a quick executive summary of who Santiago Olayo is, what he builds, and how to reach him.',
      argsSchema: {
        language: z.enum(['en', 'es']).optional().describe('Preferred language ("en" or "es").'),
      },
    },
    ({ language = 'en' }) => ({
      messages: [
        {
          role: 'user',
          content: {
            type: 'text',
            text:
              language === 'es'
                ? 'Usa `get_profile_overview` y `get_social_and_contact_links` para darme un resumen ejecutivo de 30 segundos sobre quién es Santiago Olayo, su especialidad principal y cómo contactarlo.'
                : 'Call `get_profile_overview` and `get_social_and_contact_links` to give me a crisp 30-second executive snapshot of who Santiago Olayo is, what he specializes in, and how to reach him.',
          },
        },
      ],
    })
  );

  return server;
}
