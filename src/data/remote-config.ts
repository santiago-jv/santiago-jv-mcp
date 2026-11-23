import { SANTIAGO_IDENTITY } from './profile.js';

export interface RemotePublicSiteConfig {
  version: string;
  updatedAt: string;
  source: 'neon-postgres' | 'default-fallback';
  domains: {
    primaryDomain: string;
    portfolioUrl: string;
    aiConsoleUrl: string;
    apiUrl: string;
    mcpUrl: string;
    mcpDocsUrl: string;
    allowedOrigins: string[];
  };
  social: {
    contactEmail: string;
    xHandle: string;
    xUrl: string;
    linkedinHandle: string;
    linkedinUrl: string;
    githubHandle: string;
    githubUrl: string;
    mediumHandle: string;
    mediumUrl: string;
  };
  career: {
    resumeEnUrl: string;
    resumeEsUrl: string;
    availabilityStatus: string;
    workModalitiesEn: string;
    workModalitiesEs: string;
    locationEn: string;
    locationEs: string;
  };
}

export type LiveSantiagoIdentity = {
  fullName: string;
  displayName: string;
  handle: string;
  yearsOfExperience: number;
  experienceLabel: string;
  headline: { en: string; es: string };
  location: {
    city: string;
    country: string;
    timezone: string;
    workModalities: { en: string; es: string };
  };
  spokenLanguages: typeof SANTIAGO_IDENTITY.spokenLanguages;
  summary: { en: string; es: string };
  education: typeof SANTIAGO_IDENTITY.education;
  links: {
    portfolio: string;
    mcpEndpoint: string;
    mcpDocs: string;
    email: string;
    linkedin: string;
    github: string;
    x: string;
    medium: string;
    resumeEnPdf: string;
    resumeEsPdf: string;
    llmsTxt: string;
  };
};

let cachedIdentity: LiveSantiagoIdentity | null = null;
let cachedAtMs = 0;
const CACHE_TTL_MS = 60_000;

function isTestRunner(): boolean {
  try {
    if (typeof process !== 'undefined') {
      if (process.env?.NODE_ENV === 'test' || process.env?.NODE_TEST_CONTEXT) {
        return true;
      }
      if (Array.isArray(process.execArgv) && process.execArgv.includes('--test')) {
        return true;
      }
    }
  } catch {
    // ignore in Workers isolate without process
  }
  return false;
}

export async function getLiveIdentity(
  endpoint = 'https://api.santiago-jv.tech/v1/config/public'
): Promise<LiveSantiagoIdentity> {
  if (isTestRunner()) {
    return SANTIAGO_IDENTITY as unknown as LiveSantiagoIdentity;
  }

  const now = Date.now();
  if (cachedIdentity && now - cachedAtMs < CACHE_TTL_MS) {
    return cachedIdentity;
  }

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 1500);

  try {
    const response = await fetch(endpoint, {
      method: 'GET',
      headers: { Accept: 'application/json' },
      signal: controller.signal,
    });
    if (!response.ok) {
      return cachedIdentity || (SANTIAGO_IDENTITY as unknown as LiveSantiagoIdentity);
    }

    const raw = (await response.json()) as RemotePublicSiteConfig & {
      config?: RemotePublicSiteConfig;
    };
    const cfg = raw?.config ?? raw;
    if (!cfg || !cfg.social?.contactEmail || !cfg.domains?.portfolioUrl) {
      return cachedIdentity || (SANTIAGO_IDENTITY as unknown as LiveSantiagoIdentity);
    }

    const portfolioBase = cfg.domains.portfolioUrl.replace(/\/+$/, '');
    const merged: LiveSantiagoIdentity = {
      ...SANTIAGO_IDENTITY,
      location: {
        ...SANTIAGO_IDENTITY.location,
        workModalities: {
          en: cfg.career?.workModalitiesEn || SANTIAGO_IDENTITY.location.workModalities.en,
          es: cfg.career?.workModalitiesEs || SANTIAGO_IDENTITY.location.workModalities.es,
        },
      },
      links: {
        portfolio: portfolioBase,
        mcpEndpoint: cfg.domains.mcpUrl || SANTIAGO_IDENTITY.links.mcpEndpoint,
        mcpDocs: cfg.domains.mcpDocsUrl || SANTIAGO_IDENTITY.links.mcpDocs,
        email: cfg.social.contactEmail || SANTIAGO_IDENTITY.links.email,
        linkedin: cfg.social.linkedinUrl || SANTIAGO_IDENTITY.links.linkedin,
        github: cfg.social.githubUrl || SANTIAGO_IDENTITY.links.github,
        x: cfg.social.xUrl || SANTIAGO_IDENTITY.links.x,
        medium: cfg.social.mediumUrl || SANTIAGO_IDENTITY.links.medium,
        resumeEnPdf: cfg.career?.resumeEnUrl || SANTIAGO_IDENTITY.links.resumeEnPdf,
        resumeEsPdf: cfg.career?.resumeEsUrl || SANTIAGO_IDENTITY.links.resumeEsPdf,
        llmsTxt: `${portfolioBase}/llms-full.txt`,
      },
    };

    cachedIdentity = merged;
    cachedAtMs = now;
    return merged;
  } catch {
    return cachedIdentity || (SANTIAGO_IDENTITY as unknown as LiveSantiagoIdentity);
  } finally {
    clearTimeout(timeout);
  }
}
