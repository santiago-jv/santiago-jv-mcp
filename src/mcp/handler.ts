import { WebStandardStreamableHTTPServerTransport } from '@modelcontextprotocol/sdk/server/webStandardStreamableHttp.js';
import { createSantiagoMcpServer, PUBLIC_TOOL_CATALOG } from './create-server.js';
import {
  buildCorsPreflightResponse,
  buildJsonRpcErrorResponse,
  buildRateLimitResponse,
  checkEdgeRateLimit,
  type EdgeEnv,
  extractClientIp,
  MAX_REQUEST_BODY_BYTES,
  type RateLimitDecision,
  resolveEdgeConfig,
  withStandardHeaders,
} from '../security/guardrails.js';

export type McpHandlerEnv = EdgeEnv;

export function handleHealthRequest(
  request: Request,
  env: EdgeEnv = {},
  precomputedRate?: RateLimitDecision
): Response {
  const config = resolveEdgeConfig(env, request);
  const rate =
    precomputedRate ?? checkEdgeRateLimit(extractClientIp(request), config.rateLimitMax);

  if (!rate.allowed) {
    return buildRateLimitResponse(rate);
  }

  return withStandardHeaders(
    new Response(
      JSON.stringify(
        {
          status: 'operational',
          server: config.serverName,
          version: config.version,
          transport: 'streamable-http',
          auth: 'public-read-only',
          endpoint: config.publicMcpUrl,
          documentation: config.docsUrl,
          portfolio: config.portfolioUrl,
          edgeColo: config.edgeColo,
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

export async function handleMcpStreamableRequest(
  request: Request,
  env: McpHandlerEnv = {},
  precomputedRate?: RateLimitDecision
): Promise<Response> {
  const method = request.method.toUpperCase();

  // 1. CORS Preflight
  if (method === 'OPTIONS') {
    return buildCorsPreflightResponse();
  }

  const config = resolveEdgeConfig(env, request);

  // 2. Per-IP Edge Rate Limit Protection
  const rate =
    precomputedRate ?? checkEdgeRateLimit(extractClientIp(request), config.rateLimitMax);
  if (!rate.allowed) {
    return buildRateLimitResponse(rate);
  }

  // 3. Enforce strict body ceiling before parsing
  const contentLengthHeader = request.headers.get('Content-Length');
  if (contentLengthHeader) {
    const declaredBytes = Number.parseInt(contentLengthHeader, 10);
    if (Number.isFinite(declaredBytes) && declaredBytes > MAX_REQUEST_BODY_BYTES) {
      return buildJsonRpcErrorResponse(
        -32600,
        `Payload too large. Max allowed size is ${MAX_REQUEST_BODY_BYTES} bytes.`,
        413,
        rate
      );
    }
  }

  // 4. Stateless per-request MCP server & transport
  const server = createSantiagoMcpServer(config.version);
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
    return buildJsonRpcErrorResponse(-32603, message, 500, rate);
  }
}
