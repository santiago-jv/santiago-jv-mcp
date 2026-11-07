export const MAX_REQUEST_BODY_BYTES = 32 * 1024; // 32 KB hard ceiling for public safety
export const DEFAULT_RATE_LIMIT_PER_MINUTE = 45;

export interface EdgeEnv {
  SERVER_NAME?: string;
  SERVER_VERSION?: string;
  PUBLIC_MCP_URL?: string;
  PORTFOLIO_URL?: string;
  DOCS_URL?: string;
  RATE_LIMIT_PER_MINUTE?: string;
}

export interface ResolvedEdgeConfig {
  serverName: string;
  version: string;
  publicMcpUrl: string;
  portfolioUrl: string;
  docsUrl: string;
  rateLimitMax: number;
  edgeColo: string;
}

export function resolveEdgeConfig(env: EdgeEnv = {}, request?: Request): ResolvedEdgeConfig {
  const parsedRateLimit = Number.parseInt(env.RATE_LIMIT_PER_MINUTE || '', 10);
  const rateLimitMax =
    Number.isFinite(parsedRateLimit) && parsedRateLimit > 0
      ? parsedRateLimit
      : DEFAULT_RATE_LIMIT_PER_MINUTE;

  const edgeColo =
    (request as (Request & { cf?: { colo?: string } }) | undefined)?.cf?.colo || 'EDGE';

  return {
    serverName: env.SERVER_NAME || 'santiago-jv-mcp',
    version: env.SERVER_VERSION || '1.0.0',
    publicMcpUrl: env.PUBLIC_MCP_URL || 'https://mcp.santiago-jv.tech/mcp',
    portfolioUrl: env.PORTFOLIO_URL || 'https://www.santiago-jv.tech',
    docsUrl: env.DOCS_URL || 'https://mcp.santiago-jv.tech/docs',
    rateLimitMax,
    edgeColo,
  };
}

export function extractClientIp(request: Request): string {
  return (
    request.headers.get('CF-Connecting-IP') ||
    request.headers.get('X-Forwarded-For')?.split(',')[0]?.trim() ||
    'local-client'
  );
}

interface RateBucket {
  count: number;
  resetAt: number;
}

const ipBuckets = new Map<string, RateBucket>();
const WINDOW_MS = 60_000;
const MAX_TRACKED_IPS = 5_000;

export interface RateLimitDecision {
  allowed: boolean;
  limit: number;
  remaining: number;
  resetSeconds: number;
}

export function checkEdgeRateLimit(
  ip: string,
  limitPerMinute = DEFAULT_RATE_LIMIT_PER_MINUTE,
  now = Date.now()
): RateLimitDecision {
  if (ipBuckets.size > MAX_TRACKED_IPS) {
    for (const [key, bucket] of ipBuckets.entries()) {
      if (bucket.resetAt <= now) {
        ipBuckets.delete(key);
      }
    }
    if (ipBuckets.size > MAX_TRACKED_IPS) {
      ipBuckets.clear();
    }
  }

  const existing = ipBuckets.get(ip);
  if (!existing || existing.resetAt <= now) {
    const resetAt = now + WINDOW_MS;
    ipBuckets.set(ip, { count: 1, resetAt });
    return {
      allowed: true,
      limit: limitPerMinute,
      remaining: Math.max(0, limitPerMinute - 1),
      resetSeconds: Math.ceil(WINDOW_MS / 1000),
    };
  }

  existing.count += 1;
  const resetSeconds = Math.max(1, Math.ceil((existing.resetAt - now) / 1000));

  if (existing.count > limitPerMinute) {
    return {
      allowed: false,
      limit: limitPerMinute,
      remaining: 0,
      resetSeconds,
    };
  }

  return {
    allowed: true,
    limit: limitPerMinute,
    remaining: Math.max(0, limitPerMinute - existing.count),
    resetSeconds,
  };
}

export function resetRateLimiterForTests(): void {
  ipBuckets.clear();
}

export const CORS_HEADERS: Record<string, string> = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, DELETE, OPTIONS',
  'Access-Control-Allow-Headers':
    'Content-Type, Accept, Authorization, mcp-session-id, MCP-Protocol-Version, Last-Event-ID',
  'Access-Control-Expose-Headers':
    'mcp-session-id, MCP-Protocol-Version, X-RateLimit-Limit, X-RateLimit-Remaining',
  'Access-Control-Max-Age': '86400',
};

export const SECURITY_HEADERS: Record<string, string> = {
  'X-Content-Type-Options': 'nosniff',
  'X-Frame-Options': 'DENY',
  'Referrer-Policy': 'strict-origin-when-cross-origin',
};

export function buildCorsPreflightResponse(): Response {
  return new Response(null, {
    status: 204,
    headers: {
      ...CORS_HEADERS,
      ...SECURITY_HEADERS,
    },
  });
}

export function withStandardHeaders(
  response: Response,
  rate?: RateLimitDecision
): Response {
  const headers = new Headers(response.headers);
  for (const [key, value] of Object.entries(CORS_HEADERS)) {
    headers.set(key, value);
  }
  for (const [key, value] of Object.entries(SECURITY_HEADERS)) {
    if (!headers.has(key)) {
      headers.set(key, value);
    }
  }
  if (rate) {
    headers.set('X-RateLimit-Limit', String(rate.limit));
    headers.set('X-RateLimit-Remaining', String(rate.remaining));
  }
  return new Response(response.body, {
    status: response.status,
    statusText: response.statusText,
    headers,
  });
}

export function buildRateLimitResponse(rate: RateLimitDecision): Response {
  return withStandardHeaders(
    new Response(
      JSON.stringify({
        jsonrpc: '2.0',
        error: {
          code: -32000,
          message: `Rate limit exceeded (${rate.limit} req/min). Please retry in ${rate.resetSeconds}s.`,
        },
        id: null,
      }),
      {
        status: 429,
        headers: {
          'Content-Type': 'application/json; charset=utf-8',
          'Retry-After': String(rate.resetSeconds),
        },
      }
    ),
    rate
  );
}

export function buildJsonRpcErrorResponse(
  code: number,
  message: string,
  status: number,
  rate?: RateLimitDecision
): Response {
  return withStandardHeaders(
    new Response(
      JSON.stringify({
        jsonrpc: '2.0',
        error: {
          code,
          message,
        },
        id: null,
      }),
      {
        status,
        headers: { 'Content-Type': 'application/json; charset=utf-8' },
      }
    ),
    rate
  );
}
