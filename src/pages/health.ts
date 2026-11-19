import { env } from 'cloudflare:workers';
import type { APIRoute } from 'astro';
import { handleHealthRequest } from '../mcp/handler.js';
import type { EdgeEnv, RateLimitDecision } from '../security/guardrails.js';

export const prerender = false;

export const GET: APIRoute = async ({ request, locals }) => {
  const localsRecord = locals as unknown as Record<string, unknown>;
  const edgeEnv = (env || {}) as unknown as EdgeEnv;
  const precomputedRate = localsRecord.__edgeRate as RateLimitDecision | undefined;

  return handleHealthRequest(request, edgeEnv, precomputedRate);
};
