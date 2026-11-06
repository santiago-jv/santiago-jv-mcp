import { defineMiddleware } from 'astro:middleware';
import { handleMcpStreamableRequest } from './mcp/handler.js';
import { CORS_HEADERS, SECURITY_HEADERS } from './security/guardrails.js';

export const onRequest = defineMiddleware(async (context, next) => {
  const { request, url, locals } = context;
  const method = request.method.toUpperCase();

  // 1. Global CORS Preflight
  if (method === 'OPTIONS') {
    return new Response(null, {
      status: 204,
      headers: {
        ...CORS_HEADERS,
        ...SECURITY_HEADERS,
      },
    });
  }

  // 2. Zero-friction root MCP client alias: POST / or Accept: text/event-stream on /
  const accept = request.headers.get('Accept') || '';
  if (
    url.pathname === '/' &&
    (method === 'POST' || method === 'DELETE' || accept.includes('text/event-stream'))
  ) {
    const env = ((locals as { runtime?: { env?: Record<string, string> } })?.runtime?.env ||
      {}) as Record<string, string>;
    return handleMcpStreamableRequest(request, env);
  }

  return next();
});
