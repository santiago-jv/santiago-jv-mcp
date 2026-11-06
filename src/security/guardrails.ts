export const MAX_REQUEST_BODY_BYTES = 32 * 1024; // 32 KB hard ceiling for public safety

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

export function checkEdgeRateLimit(ip: string, limitPerMinute = 45, now = Date.now()): RateLimitDecision {
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
  'Access-Control-Expose-Headers': 'mcp-session-id, MCP-Protocol-Version, X-RateLimit-Limit, X-RateLimit-Remaining',
  'Access-Control-Max-Age': '86400',
};

export const SECURITY_HEADERS: Record<string, string> = {
  'X-Content-Type-Options': 'nosniff',
  'X-Frame-Options': 'DENY',
  'Referrer-Policy': 'strict-origin-when-cross-origin',
};

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
