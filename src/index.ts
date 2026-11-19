import { handleEdgeMiddleware } from './mcp/edge-middleware.js';
import { handleHealthRequest, handleMcpStreamableRequest } from './mcp/handler.js';
import { type EdgeEnv, resolveEdgeConfig, withStandardHeaders } from './security/guardrails.js';
import { renderAppleDocsHtml } from './ui/docs-page.js';
import { renderAppleGatewayHtml } from './ui/gateway-page.js';

export type Env = EdgeEnv;

/**
 * In-process Worker dispatcher mirroring Astro's `src/middleware.ts` + `src/pages/*`
 * through the exact same `handleEdgeMiddleware` pipeline used in production.
 */
const worker = {
  async fetch(request: Request, env: Env = {}): Promise<Response> {
    return handleEdgeMiddleware(request, env, async (rate) => {
      const url = new URL(request.url);
      const method = request.method.toUpperCase();
      const config = resolveEdgeConfig(env, request);

      if (method === 'GET' && (url.pathname === '/health' || url.pathname === '/status')) {
        return handleHealthRequest(request, env, rate);
      }

      if (method === 'GET' && (url.pathname === '/docs' || url.pathname === '/docs/')) {
        const docsHtml = renderAppleDocsHtml({
          mcpEndpoint: config.publicMcpUrl,
          portfolioUrl: config.portfolioUrl,
          version: config.version,
          edgeColo: config.edgeColo,
        });
        return new Response(docsHtml, {
          status: 200,
          headers: {
            'Content-Type': 'text/html; charset=utf-8',
            'Cache-Control': 'public, max-age=300',
          },
        });
      }

      if (method === 'GET' && url.pathname === '/') {
        const html = renderAppleGatewayHtml({
          mcpEndpoint: config.publicMcpUrl,
          docsUrl: config.docsUrl,
          portfolioUrl: config.portfolioUrl,
          version: config.version,
          edgeColo: config.edgeColo,
        });
        return new Response(html, {
          status: 200,
          headers: {
            'Content-Type': 'text/html; charset=utf-8',
            'Cache-Control': 'public, max-age=300',
          },
        });
      }

      if (url.pathname === '/mcp' || url.pathname === '/mcp/') {
        return handleMcpStreamableRequest(request, env, rate);
      }

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
    });
  },
};

export default worker;
