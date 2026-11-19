import { defineMiddleware } from 'astro:middleware';
import { handleEdgeMiddleware } from './mcp/edge-middleware.js';
import type { EdgeEnv, RateLimitDecision } from './security/guardrails.js';

export const onRequest = defineMiddleware(async (context, next) => {
  const localsRecord = context.locals as unknown as Record<string, unknown>;
  const env = ((localsRecord?.runtime as { env?: EdgeEnv } | undefined)?.env || {}) as EdgeEnv;

  return handleEdgeMiddleware(context.request, env, async (rate: RateLimitDecision) => {
    localsRecord.__edgeRate = rate;
    return next();
  });
});
