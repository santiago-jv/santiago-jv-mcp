import { handleMcpStreamableRequest } from './handler.js';
import {
  buildCorsPreflightResponse,
  buildRateLimitResponse,
  checkEdgeRateLimit,
  type EdgeEnv,
  extractClientIp,
  type RateLimitDecision,
  resolveEdgeConfig,
  SECURITY_HEADERS,
} from '../security/guardrails.js';

export async function handleEdgeMiddleware(
  request: Request,
  env: EdgeEnv,
  next: (rate: RateLimitDecision) => Promise<Response>
): Promise<Response> {
  const method = request.method.toUpperCase();
  const url = new URL(request.url);

  // 1. Global CORS Preflight
  if (method === 'OPTIONS') {
    return buildCorsPreflightResponse();
  }

  // 2. Per-IP Edge Rate Limit across ALL Worker routes (HTML, Docs, Health, MCP)
  const config = resolveEdgeConfig(env, request);
  const rate = checkEdgeRateLimit(extractClientIp(request), config.rateLimitMax);
  if (!rate.allowed) {
    return buildRateLimitResponse(rate);
  }

  // 3. Zero-friction root MCP client alias: POST / or DELETE / or Accept: text/event-stream on /
  const accept = request.headers.get('Accept') || '';
  if (
    url.pathname === '/' &&
    (method === 'POST' || method === 'DELETE' || accept.includes('text/event-stream'))
  ) {
    return handleMcpStreamableRequest(request, env, rate);
  }

  // 4. Execute downstream Astro page or API route and guarantee security + rate-limit headers
  const response = await next(rate);
  const headers = new Headers(response.headers);
  for (const [key, value] of Object.entries(SECURITY_HEADERS)) {
    if (!headers.has(key)) {
      headers.set(key, value);
    }
  }
  if (!headers.has('X-RateLimit-Limit')) {
    headers.set('X-RateLimit-Limit', String(rate.limit));
  }
  if (!headers.has('X-RateLimit-Remaining')) {
    headers.set('X-RateLimit-Remaining', String(rate.remaining));
  }

  return new Response(response.body, {
    status: response.status,
    statusText: response.statusText,
    headers,
  });
}
