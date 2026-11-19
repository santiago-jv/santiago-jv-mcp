import type { APIRoute } from 'astro';
import { handleMcpStreamableRequest } from '../mcp/handler.js';
import type { EdgeEnv, RateLimitDecision } from '../security/guardrails.js';

export const prerender = false;

export const ALL: APIRoute = async ({ request, locals }) => {
  const localsRecord = locals as unknown as Record<string, unknown>;
  const env = ((localsRecord?.runtime as { env?: EdgeEnv } | undefined)?.env || {}) as EdgeEnv;
  const precomputedRate = localsRecord.__edgeRate as RateLimitDecision | undefined;

  return handleMcpStreamableRequest(request, env, precomputedRate);
};
