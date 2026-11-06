import { WebStandardStreamableHTTPServerTransport } from '@modelcontextprotocol/sdk/server/webStandardStreamableHttp.js';
import { createSantiagoMcpServer, PUBLIC_TOOL_CATALOG } from './mcp/create-server.js';
import {
  checkEdgeRateLimit,
  CORS_HEADERS,
  MAX_REQUEST_BODY_BYTES,
  SECURITY_HEADERS,
  withStandardHeaders,
} from './security/guardrails.js';
import { renderAppleGatewayHtml } from './ui/gateway-page.js';

export interface Env {
  SERVER_NAME?: string;
  SERVER_VERSION?: string;
  PUBLIC_MCP_URL?: string;
  PORTFOLIO_URL?: string;
  DOCS_URL?: string;
  RATE_LIMIT_PER_MINUTE?: string;
}

const worker = {
  async fetch(request: Request, env: Env = {}): Promise<Response> {
    const url = new URL(request.url);
    const method = request.method.toUpperCase();

    // 1. CORS Preflight
    if (method === 'OPTIONS') {
      return new Response(null, {
        status: 204,
        headers: {
          ...CORS_HEADERS,
          ...SECURITY_HEADERS,
        },
      });
    }

    const version = env.SERVER_VERSION || '1.0.0';
    const publicMcpUrl = env.PUBLIC_MCP_URL || 'https://mcp.santiago-jv.tech/mcp';
    const portfolioUrl = env.PORTFOLIO_URL || 'https://www.santiago-jv.tech';
    const docsUrl = env.DOCS_URL || 'https://www.santiago-jv.tech/mcp';
    const rateLimitMax = Number.parseInt(env.RATE_LIMIT_PER_MINUTE || '45', 10) || 45;
    const edgeColo =
      (request as Request & { cf?: { colo?: string } }).cf?.colo || 'EDGE';

    // 2. Per-IP Edge Rate Limit Protection
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

    // 3. Health & Service Discovery Endpoint
    if (method === 'GET' && (url.pathname === '/health' || url.pathname === '/status')) {
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
    }

    // 4. Redirect /docs to full Next.js Apple documentation page
    if (method === 'GET' && url.pathname === '/docs') {
      return Response.redirect(docsUrl, 302);
    }

    // 5. Browser Landing Page on GET / (unless MCP client explicitly asks for SSE stream)
    const acceptHeader = request.headers.get('Accept') || '';
    if (
      method === 'GET' &&
      url.pathname === '/' &&
      !acceptHeader.includes('text/event-stream')
    ) {
      const html = renderAppleGatewayHtml({
        mcpEndpoint: publicMcpUrl,
        docsUrl,
        portfolioUrl,
        version,
        edgeColo,
      });

      return withStandardHeaders(
        new Response(html, {
          status: 200,
          headers: {
            'Content-Type': 'text/html; charset=utf-8',
            'Cache-Control': 'public, max-age=300',
          },
        }),
        rate
      );
    }

    // 6. MCP Streamable HTTP Transport on /mcp (and POST/DELETE / as zero-friction alias)
    const isMcpRoute =
      url.pathname === '/mcp' ||
      url.pathname === '/mcp/' ||
      (url.pathname === '/' && (method === 'POST' || method === 'DELETE' || acceptHeader.includes('text/event-stream')));

    if (!isMcpRoute) {
      return withStandardHeaders(
        new Response(
          JSON.stringify({
            error: 'Not Found',
            mcpEndpoint: publicMcpUrl,
            documentation: docsUrl,
          }),
          {
            status: 404,
            headers: { 'Content-Type': 'application/json; charset=utf-8' },
          }
        ),
        rate
      );
    }

    // Enforce strict body ceiling before parsing
    const contentLengthHeader = request.headers.get('Content-Length');
    if (contentLengthHeader) {
      const declaredBytes = Number.parseInt(contentLengthHeader, 10);
      if (Number.isFinite(declaredBytes) && declaredBytes > MAX_REQUEST_BODY_BYTES) {
        return withStandardHeaders(
          new Response(
            JSON.stringify({
              jsonrpc: '2.0',
              error: {
                code: -32600,
                message: `Payload too large. Max allowed size is ${MAX_REQUEST_BODY_BYTES} bytes.`,
              },
              id: null,
            }),
            {
              status: 413,
              headers: { 'Content-Type': 'application/json; charset=utf-8' },
            }
          ),
          rate
        );
      }
    }

    // Stateless per-request MCP server & transport (Cloudflare Workers best practice)
    const server = createSantiagoMcpServer(version);
    const transport = new WebStandardStreamableHTTPServerTransport({
      sessionIdGenerator: undefined,
      enableJsonResponse: true,
      maxRequestBodySize: MAX_REQUEST_BODY_BYTES,
    });

    try {
      await server.connect(transport);
      const mcpResponse = await transport.handleRequest(request);
      return withStandardHeaders(mcpResponse, rate);
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Internal MCP error';
      return withStandardHeaders(
        new Response(
          JSON.stringify({
            jsonrpc: '2.0',
            error: {
              code: -32603,
              message,
            },
            id: null,
          }),
          {
            status: 500,
            headers: { 'Content-Type': 'application/json; charset=utf-8' },
          }
        ),
        rate
      );
    }
  },
};

export default worker;
