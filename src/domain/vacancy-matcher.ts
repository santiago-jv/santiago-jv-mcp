import {
  Language,
  NON_PRIMARY_TECH_SIGNALS,
  SANTIAGO_IDENTITY,
  SKILL_MATRIX,
  SkillEntry,
} from '../data/profile.js';

export interface VacancyEvaluationInput {
  job_description: string;
  role_title?: string;
  company_name?: string;
  required_skills?: string[];
  nice_to_have_skills?: string[];
  modality?: 'remote' | 'hybrid' | 'onsite' | 'unspecified';
  location_requirement?: string;
  min_years_experience?: number;
  language?: Language;
}

export interface VacancyEvaluationResult {
  candidate: string;
  overallScore: number;
  verdictTier: 'STRONG_FIT' | 'GOOD_FIT' | 'PARTIAL_FIT' | 'LOW_OVERLAP';
  verdictHeadline: string;
  shouldInterview: boolean;
  breakdown: {
    stackScore: number;
    seniorityScore: number;
    roleAlignmentScore: number;
    modalityScore: number;
  };
  matchedCoreSkills: Array<{
    skill: string;
    years: number;
    tier: string;
    evidence: string;
  }>;
  bonusDifferentiators: string[];
  transparentGapsOrNotes: string[];
  modalityAssessment: string;
  executiveSummary: string;
  suggestedInterviewTopics: string[];
  nextSteps: {
    email: string;
    linkedin: string;
    resumePdf: string;
    portfolio: string;
  };
  markdownReport: string;
}

function escapeRegExp(value: string): string {
  return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function containsTerm(haystack: string, rawTerm: string): boolean {
  const term = rawTerm.trim().toLowerCase();
  if (!term) return false;

  // Special handling for symbols like c# or .net
  if (term === 'c#') {
    return /(?:^|[\s,;/()[\]])c#(?=$|[\s,;/()[\].])/i.test(haystack);
  }
  if (term === '.net') {
    return /(?:^|[\s,;/()[\]])\.net(?=$|[\s,;/()[\].])/i.test(haystack);
  }

  const pattern = new RegExp(`(?:^|[^a-z0-9+#])${escapeRegExp(term)}(?:$|[^a-z0-9+#])`, 'i');
  return pattern.test(haystack);
}

function detectLanguage(input: VacancyEvaluationInput): Language {
  if (input.language) return input.language;
  const sample = `${input.role_title ?? ''} ${input.job_description}`.toLowerCase();
  const spanishMarkers = ['experiencia', 'desarrollador', 'ingeniero', 'requisitos', 'vacante', 'años', 'remoto', 'habilidades'];
  const hits = spanishMarkers.filter((m) => containsTerm(sample, m)).length;
  return hits >= 2 ? 'es' : 'en';
}

function extractYearsRequirement(text: string, explicitYears?: number): number | undefined {
  if (typeof explicitYears === 'number' && explicitYears > 0) {
    return explicitYears;
  }
  const patterns = [
    /(\d{1,2})\s*\+?\s*(?:years?|yrs?)\s+(?:of\s+)?experience/i,
    /(\d{1,2})\s*\+?\s*(?:años?)\s+de\s+experiencia/i,
    /experiencia\s+(?:mínima\s+)?de\s+(\d{1,2})\s*\+?\s*años?/i,
  ];
  for (const regex of patterns) {
    const match = text.match(regex);
    if (match && match[1]) {
      const parsed = Number.parseInt(match[1], 10);
      if (parsed > 0 && parsed <= 20) return parsed;
    }
  }
  return undefined;
}

export function evaluateVacancyMatch(input: VacancyEvaluationInput): VacancyEvaluationResult {
  const lang = detectLanguage(input);
  const fullCorpus = [
    input.role_title ?? '',
    input.company_name ?? '',
    input.job_description,
    ...(input.required_skills ?? []),
    ...(input.nice_to_have_skills ?? []),
    input.location_requirement ?? '',
  ]
    .join(' \n ')
    .toLowerCase();

  // 1. Match Santiago's skills mentioned in the vacancy
  const matchedEntries: SkillEntry[] = [];
  for (const entry of SKILL_MATRIX) {
    const isMatched = entry.aliases.some((alias) => containsTerm(fullCorpus, alias));
    if (isMatched) {
      matchedEntries.push(entry);
    }
  }

  // Also inspect explicit required_skills list to detect unmatched explicit requirements
  const unmatchedExplicitRequired: string[] = [];
  for (const reqSkill of input.required_skills ?? []) {
    const cleaned = reqSkill.trim();
    if (!cleaned) continue;
    const coveredBySantiago = SKILL_MATRIX.some(
      (entry) =>
        entry.name.toLowerCase() === cleaned.toLowerCase() ||
        entry.aliases.some((a) => containsTerm(cleaned.toLowerCase(), a) || a === cleaned.toLowerCase())
    );
    if (!coveredBySantiago) {
      unmatchedExplicitRequired.push(cleaned);
    }
  }

  // 2. Detect non-primary stack signals for honest gap reporting
  const gapNotes: string[] = [];
  for (const signal of NON_PRIMARY_TECH_SIGNALS) {
    if (signal.patterns.some((p) => containsTerm(fullCorpus, p))) {
      gapNotes.push(`${signal.label}: ${signal.note[lang]}`);
    }
  }
  for (const missing of unmatchedExplicitRequired) {
    const alreadyNoted = gapNotes.some((note) => note.toLowerCase().includes(missing.toLowerCase()));
    if (!alreadyNoted) {
      gapNotes.push(
        lang === 'es'
          ? `"${missing}" aparece como requisito explícito y no figura como herramienta principal en su CV público; conviene validar profundidad requerida en entrevista.`
          : `"${missing}" was listed as an explicit requirement and is not a primary tool in his public CV; worth validating required depth during screening.`
      );
    }
  }

  // 3. Role & Domain Alignment Score (0 - 100)
  const backendRoleSignals = [
    'backend',
    'back-end',
    'fullstack',
    'full-stack',
    'full stack',
    'software engineer',
    'product engineer',
    'product owner engineer',
    'tech lead',
    'líder técnico',
    'ingeniero de software',
    'ai engineer',
    'internal tools',
    'platform',
  ];
  const pureMismatchRoles = ['ios developer', 'android developer', 'data scientist', 'graphic designer', 'qa manual', 'sap consultant'];

  const hasCoreRoleMatch = backendRoleSignals.some((r) => containsTerm(fullCorpus, r));
  const hasPureMismatchRole = pureMismatchRoles.some((r) => containsTerm(fullCorpus, r));

  let roleAlignmentScore = hasCoreRoleMatch ? 95 : 78;
  if (hasPureMismatchRole && !hasCoreRoleMatch) {
    roleAlignmentScore = 35;
  }

  // 4. Stack Overlap Score (0 - 100)
  const coreMatchesCount = matchedEntries.filter((m) => m.tier === 'core').length;
  const totalMatchesCount = matchedEntries.length;
  const penaltyCount = gapNotes.length;

  let stackScore = 65;
  if (totalMatchesCount >= 6) stackScore = 96;
  else if (totalMatchesCount >= 4) stackScore = 90;
  else if (totalMatchesCount >= 2) stackScore = 80;
  else if (totalMatchesCount === 1) stackScore = 68;
  else stackScore = 48;

  if (coreMatchesCount >= 3) {
    stackScore = Math.min(98, stackScore + 4);
  }
  if (penaltyCount > 0) {
    stackScore = Math.max(25, stackScore - penaltyCount * 12);
  }

  // 5. Seniority Score (0 - 100)
  const requiredYears = extractYearsRequirement(fullCorpus, input.min_years_experience);
  let seniorityScore = 92;
  if (requiredYears !== undefined) {
    if (requiredYears <= 5) {
      seniorityScore = 96;
    } else if (requiredYears === 6) {
      seniorityScore = 82;
      gapNotes.push(
        lang === 'es'
          ? `La vacante menciona ${requiredYears}+ años; Santiago cuenta con 4.5+ años de experiencia productiva intensiva asumiendo ownership Senior/Product Owner Engineer.`
          : `The role mentions ${requiredYears}+ years; Santiago brings 4.5+ years of high-ownership production experience operating at Senior / Product Owner Engineer scope.`
      );
    } else if (requiredYears >= 7) {
      seniorityScore = 66;
      gapNotes.push(
        lang === 'es'
          ? `La vacante pide ${requiredYears}+ años de experiencia; Santiago tiene 4+ años en producción, por lo que si el filtro de años es estricto debe considerarse.`
          : `The vacancy asks for ${requiredYears}+ years of experience; Santiago has 4+ years in production, which should be noted if tenure is a strict HR gate.`
      );
    }
  }

  // 6. Modality & Location Score (0 - 100)
  let modalityScore = 96;
  let modalityAssessment =
    lang === 'es'
      ? 'Compatible: disponible para trabajo 100% Remoto (Colombia, LatAm, EE. UU. / Global en zona UTC-5) o presencial/híbrido en Barranquilla / Santa Marta.'
      : 'Compatible: ready for 100% Remote work (US/EST overlap UTC-5, LatAm, Global) or Hybrid/On-site in Barranquilla / Santa Marta, Colombia.';

  const mentionsOnsite =
    input.modality === 'onsite' ||
    input.modality === 'hybrid' ||
    containsTerm(fullCorpus, 'on-site') ||
    containsTerm(fullCorpus, 'onsite') ||
    containsTerm(fullCorpus, 'presencial') ||
    containsTerm(fullCorpus, 'híbrido') ||
    containsTerm(fullCorpus, 'hybrid');

  const mentionsLocalCities =
    containsTerm(fullCorpus, 'barranquilla') ||
    containsTerm(fullCorpus, 'santa marta') ||
    containsTerm(fullCorpus, 'atlántico');

  const mentionsRemote =
    input.modality === 'remote' ||
    containsTerm(fullCorpus, 'remote') ||
    containsTerm(fullCorpus, 'remoto');

  if (mentionsOnsite && !mentionsRemote && !mentionsLocalCities) {
    modalityScore = 55;
    modalityAssessment =
      lang === 'es'
        ? 'Atención en modalidad: la vacante parece exigir presencialidad/hibridez fuera de Barranquilla o Santa Marta. Santiago prioriza roles Remotos o en la Región Caribe (Barranquilla/Santa Marta).'
        : 'Modality heads-up: the vacancy appears to require on-site/hybrid presence outside Barranquilla or Santa Marta, Colombia. Santiago prioritizes Remote roles or Barranquilla/Santa Marta.';
  }

  // Weighted overall score
  const rawOverall =
    stackScore * 0.45 +
    roleAlignmentScore * 0.25 +
    seniorityScore * 0.15 +
    modalityScore * 0.15;

  const overallScore = Math.max(18, Math.min(98, Math.round(rawOverall)));

  let verdictTier: VacancyEvaluationResult['verdictTier'] = 'GOOD_FIT';
  if (overallScore >= 85) verdictTier = 'STRONG_FIT';
  else if (overallScore >= 70) verdictTier = 'GOOD_FIT';
  else if (overallScore >= 52) verdictTier = 'PARTIAL_FIT';
  else verdictTier = 'LOW_OVERLAP';

  const shouldInterview = overallScore >= 68;

  const verdictLabels: Record<VacancyEvaluationResult['verdictTier'], { en: string; es: string }> = {
    STRONG_FIT: {
      en: 'Strong Match — Highly Recommended to Interview',
      es: 'Alto Nivel de Match — Muy Recomendado para Entrevista',
    },
    GOOD_FIT: {
      en: 'Solid Match — Good Alignment on Core Fundamentals',
      es: 'Buen Nivel de Match — Sólida Alineación en Fundamentos Clave',
    },
    PARTIAL_FIT: {
      en: 'Partial / Adjacent Match — Transferable Architecture, Some Stack Gaps',
      es: 'Match Parcial / Adyacente — Arquitectura Transferible con Brechas de Stack',
    },
    LOW_OVERLAP: {
      en: 'Low Overlap — Role Targets a Different Specialization',
      es: 'Baja Coincidencia — La Vacante Apunta a Otra Especialidad',
    },
  };

  const bonusDifferentiators =
    lang === 'es'
      ? [
          'Experiencia real en producción construyendo tooling con MCP (Model Context Protocol) y servicios serverless en el edge con Cloudflare Workers.',
          'Mentalidad de Product Owner Engineer: trabaja directo con Producto, Operaciones, Soporte y Finanzas de punta a punta.',
          'Dominio de observabilidad y datos de negocio: Datadog (APM, trazas, alertas), CleverTap (eventos) y Metabase (SQL/BI).',
          'Sólida base en sistemas de alta concurrencia: Arquitectura Hexagonal, DDD, locks atómicos en Redis y migraciones sin caída.',
        ]
      : [
          'Hands-on production experience building MCP (Model Context Protocol) tooling and stateless edge services on Cloudflare Workers.',
          'Product Owner Engineer mindset: partners directly with Product, Ops, Support, and Finance from discovery to post-release impact.',
          'Full-loop observability & product analytics: Datadog (APM, tracing, SLA alerts), CleverTap (funnels), and Metabase (SQL BI).',
          'Battle-tested concurrency & architecture: Hexagonal Architecture, DDD, atomic Redis distributed locks, and zero-downtime DB migrations.',
        ];

  const matchedCoreSkills = matchedEntries.map((entry) => ({
    skill: entry.name,
    years: entry.years,
    tier: entry.tier,
    evidence: entry.evidence[lang],
  }));

  const topMatchedNames = matchedEntries.slice(0, 6).map((m) => m.name);
  const roleLabel = input.role_title || (lang === 'es' ? 'la vacante evaluada' : 'the target role');

  const executiveSummary =
    lang === 'es'
      ? overallScore >= 70
        ? `Santiago presenta un ${overallScore}% de compatibilidad con ${roleLabel}. Coincide directamente en ${
            topMatchedNames.length > 0 ? topMatchedNames.join(', ') : 'ingeniería backend, cloud y entrega de producto end-to-end'
          }, aportando además diferenciadores poco comunes como experiencia real con MCP, Cloudflare Workers, Datadog y analítica en CleverTap/Metabase.`
        : `Santiago presenta un ${overallScore}% de compatibilidad con ${roleLabel}. Aunque cuenta con bases fuertes en arquitectura backend (Node.js/NestJS/TypeScript, AWS, PostgreSQL/MongoDB, Redis), existen diferencias frente al stack o modalidad principal solicitada que vale la pena revisar.`
      : overallScore >= 70
        ? `Santiago scores a ${overallScore}% match for ${roleLabel}. He aligns directly across ${
            topMatchedNames.length > 0 ? topMatchedNames.join(', ') : 'backend architecture, cloud delivery, and end-to-end product ownership'
          }, while bringing rare force-multipliers in production MCP tooling, Cloudflare Workers, Datadog APM, and CleverTap/Metabase analytics.`
        : `Santiago scores a ${overallScore}% match for ${roleLabel}. While he brings strong backend engineering fundamentals (Node.js/NestJS/TypeScript, AWS, PostgreSQL/MongoDB, Redis), there are stack or modality differences relative to the primary requirements.`;

  const suggestedInterviewTopics =
    lang === 'es'
      ? [
          'Cómo estructuró microservicios con Arquitectura Hexagonal, DDD y locks distribuidos en Redis en GoodRec.',
          'Cómo diseñó e implementó tooling con MCP y servicios serverless en Cloudflare Workers para acelerar equipos operativos.',
          'Su enfoque para ejecutar migraciones zero-downtime en PostgreSQL/MongoDB y monitorear SLAs con Datadog.',
        ]
      : [
          'How he structured NestJS/TypeScript services with Hexagonal Architecture, DDD, and atomic Redis distributed locks at GoodRec.',
          'How he built MCP servers and serverless edge workflows on Cloudflare Workers to automate cross-team processes.',
          'His approach to zero-downtime PostgreSQL/MongoDB migrations and production incident debugging in Datadog.',
        ];

  const nextSteps = {
    email: SANTIAGO_IDENTITY.links.email,
    linkedin: SANTIAGO_IDENTITY.links.linkedin,
    resumePdf: lang === 'es' ? SANTIAGO_IDENTITY.links.resumeEsPdf : SANTIAGO_IDENTITY.links.resumeEnPdf,
    portfolio: SANTIAGO_IDENTITY.links.portfolio,
  };

  const markdownReport =
    lang === 'es'
      ? `## Evaluación de Compatibilidad — ${SANTIAGO_IDENTITY.fullName}
- **Puntaje Global:** **${overallScore}/100** (${verdictLabels[verdictTier].es})
- **¿Recomendado para entrevista?:** ${shouldInterview ? 'Sí' : 'Revisar brechas primero'}
- **Desglose:** Stack ${stackScore}/100 · Rol/Arquitectura ${roleAlignmentScore}/100 · Seniority ${seniorityScore}/100 · Modalidad ${modalityScore}/100

### Resumen Ejecutivo
${executiveSummary}

### Habilidades Coincidentes Detectadas (${matchedCoreSkills.length})
${
  matchedCoreSkills.length > 0
    ? matchedCoreSkills.map((s) => `- **${s.skill}** (${s.years} años · *${s.tier}*): ${s.evidence}`).join('\n')
    : '- No se detectaron keywords específicas en el texto; revisa el perfil completo con `get_tech_stack_and_architecture`.'
}

### Diferenciadores de Valor Agregado
${bonusDifferentiators.map((d) => `- ${d}`).join('\n')}

### Transparencia: Brechas o Puntos a Validar
${
  gapNotes.length > 0
    ? gapNotes.map((g) => `- ${g}`).join('\n')
    : '- Sin brechas críticas detectadas frente a su stack principal (TypeScript/Node.js/NestJS, Java/Spring Boot, AWS, SQL/NoSQL, IA/MCP).'
}

### Modalidad y Ubicación
- ${modalityAssessment}

### Contacto Directo para Agendar Entrevista
- **Email:** ${nextSteps.email}
- **LinkedIn:** ${nextSteps.linkedin}
- **Descargar CV (PDF):** ${nextSteps.resumePdf}`
      : `## Candidate Fit Report — ${SANTIAGO_IDENTITY.fullName}
- **Overall Match Score:** **${overallScore}/100** (${verdictLabels[verdictTier].en})
- **Recommended to Interview:** ${shouldInterview ? 'Yes' : 'Validate stack gaps first'}
- **Dimension Breakdown:** Stack ${stackScore}/100 · Role/Architecture ${roleAlignmentScore}/100 · Seniority ${seniorityScore}/100 · Modality ${modalityScore}/100

### Executive Summary
${executiveSummary}

### Matched Skills & Production Evidence (${matchedCoreSkills.length})
${
  matchedCoreSkills.length > 0
    ? matchedCoreSkills.map((s) => `- **${s.skill}** (${s.years} yrs · *${s.tier}*): ${s.evidence}`).join('\n')
    : '- No specific tech keywords detected in prompt; call `get_tech_stack_and_architecture` for full skill inventory.'
}

### High-Leverage Differentiators
${bonusDifferentiators.map((d) => `- ${d}`).join('\n')}

### Transparent Gaps & Screening Notes
${
  gapNotes.length > 0
    ? gapNotes.map((g) => `- ${g}`).join('\n')
    : '- No critical stack gaps detected relative to his core domain (TypeScript/Node.js/NestJS, Java/Spring Boot, AWS, SQL/NoSQL, Applied AI/MCP).'
}

### Modality & Timezone Fit
- ${modalityAssessment}

### Direct Contact to Schedule an Interview
- **Email:** ${nextSteps.email}
- **LinkedIn:** ${nextSteps.linkedin}
- **Resume PDF:** ${nextSteps.resumePdf}`;

  return {
    candidate: SANTIAGO_IDENTITY.fullName,
    overallScore,
    verdictTier,
    verdictHeadline: verdictLabels[verdictTier][lang],
    shouldInterview,
    breakdown: {
      stackScore,
      seniorityScore,
      roleAlignmentScore,
      modalityScore,
    },
    matchedCoreSkills,
    bonusDifferentiators,
    transparentGapsOrNotes: gapNotes,
    modalityAssessment,
    executiveSummary,
    suggestedInterviewTopics,
    nextSteps,
    markdownReport,
  };
}
