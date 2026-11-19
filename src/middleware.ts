import { env } from 'cloudflare:workers';
import { defineMiddleware } from 'astro:middleware';
import { handleEdgeMiddleware } from './mcp/edge-middleware.js';
import type { EdgeEnv, RateLimitDecision } from './security/guardrails.js';

export const onRequest = defineMiddleware(async (context, next) => {
  const localsRecord = context.locals as unknown as Record<string, unknown>;
  const edgeEnv = (env || {}) as unknown as EdgeEnv;

  return handleEdgeMiddleware(context.request, edgeEnv, async (rate: RateLimitDecision) => {
    localsRecord.__edgeRate = rate;
    return next();
  });
});
