import { handleHealthRequest, handleMcpStreamableRequest } from './mcp/handler.js';
import {
  buildCorsPreflightResponse,
  buildRateLimitResponse,
  checkEdgeRateLimit,
  type EdgeEnv,
  extractClientIp,
  resolveEdgeConfig,
  withStandardHeaders,
} from './security/guardrails.js';
import { renderAppleGatewayHtml } from './ui/gateway-page.js';
import { renderAppleDocsHtml } from './ui/docs-page.js';

export type Env = EdgeEnv;

const worker = {
  async fetch(request: Request, env: Env = {}): Promise<Response> {
    const url = new URL(request.url);
    const method = request.method.toUpperCase();

    // 1. CORS Preflight
    if (method === 'OPTIONS') {
      return buildCorsPreflightResponse();
    }

    const config = resolveEdgeConfig(env, request);

    // 2. Per-IP Edge Rate Limit Protection
    const rate = checkEdgeRateLimit(extractClientIp(request), config.rateLimitMax);
    if (!rate.allowed) {
      return buildRateLimitResponse(rate);
    }

    // 3. Health & Service Discovery Endpoint
    if (method === 'GET' && (url.pathname === '/health' || url.pathname === '/status')) {
      return handleHealthRequest(request, env, rate);
    }

    // 4. Full Apple Cupertino MCP Documentation & Recruiter Guide on GET /docs
    if (method === 'GET' && (url.pathname === '/docs' || url.pathname === '/docs/')) {
      const docsHtml = renderAppleDocsHtml({
        mcpEndpoint: config.publicMcpUrl,
        portfolioUrl: config.portfolioUrl,
        version: config.version,
        edgeColo: config.edgeColo,
      });

      return withStandardHeaders(
        new Response(docsHtml, {
          status: 200,
          headers: {
            'Content-Type': 'text/html; charset=utf-8',
            'Cache-Control': 'public, max-age=300',
          },
        }),
        rate
      );
    }

    // 5. Browser Landing Page on GET / (unless MCP client explicitly asks for SSE stream)
    const acceptHeader = request.headers.get('Accept') || '';
    if (
      method === 'GET' &&
      url.pathname === '/' &&
      !acceptHeader.includes('text/event-stream')
    ) {
      const html = renderAppleGatewayHtml({
        mcpEndpoint: config.publicMcpUrl,
        docsUrl: config.docsUrl,
        portfolioUrl: config.portfolioUrl,
        version: config.version,
        edgeColo: config.edgeColo,
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
      (url.pathname === '/' &&
        (method === 'POST' || method === 'DELETE' || acceptHeader.includes('text/event-stream')));

    if (!isMcpRoute) {
      return withStandardHeaders(
        new Response(
          JSON.stringify({
            error: 'Not Found',
            mcpEndpoint: config.publicMcpUrl,
            documentation: config.docsUrl,
          }),
          {
            status: 404,
            headers: { 'Content-Type': 'application/json; charset=utf-8' },
          }
        ),
        rate
      );
    }

    return handleMcpStreamableRequest(request, env, rate);
  },
};

export default worker;
