import type { APIRoute } from 'astro';
import { PUBLIC_TOOL_CATALOG } from '../mcp/create-server.js';
import {
  checkEdgeRateLimit,
  withStandardHeaders,
} from '../security/guardrails.js';

export const prerender = false;

export const GET: APIRoute = async ({ request, locals }) => {
  const env = ((locals as { runtime?: { env?: Record<string, string> } })?.runtime?.env ||
    {}) as Record<string, string>;

  const version = env.SERVER_VERSION || '1.0.0';
  const publicMcpUrl = env.PUBLIC_MCP_URL || 'https://mcp.santiago-jv.tech/mcp';
  const portfolioUrl = env.PORTFOLIO_URL || 'https://www.santiago-jv.tech';
  const docsUrl = env.DOCS_URL || 'https://mcp.santiago-jv.tech/docs';
  const rateLimitMax = Number.parseInt(env.RATE_LIMIT_PER_MINUTE || '45', 10) || 45;
  const edgeColo =
    (request as Request & { cf?: { colo?: string } }).cf?.colo || 'EDGE';

  const clientIp =
    request.headers.get('CF-Connecting-IP') ||
    request.headers.get('X-Forwarded-For')?.split(',')[0]?.trim() ||
    'local-client';

  const rate = checkEdgeRateLimit(clientIp, rateLimitMax);
  if (!rate.allowed) {
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

  return withStandardHeaders(
    new Response(
      JSON.stringify(
        {
          status: 'operational',
          server: env.SERVER_NAME || 'santiago-jv-mcp',
          version,
          transport: 'streamable-http',
          auth: 'public-read-only',
          endpoint: publicMcpUrl,
          documentation: docsUrl,
          portfolio: portfolioUrl,
          edgeColo,
          tools: PUBLIC_TOOL_CATALOG.map((t) => t.name),
        },
        null,
        2
      ),
      {
        status: 200,
        headers: {
          'Content-Type': 'application/json; charset=utf-8',
          'Cache-Control': 'public, max-age=30',
        },
      }
    ),
    rate
  );
};
