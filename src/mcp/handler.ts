import { WebStandardStreamableHTTPServerTransport } from '@modelcontextprotocol/sdk/server/webStandardStreamableHttp.js';
import { createSantiagoMcpServer } from './create-server.js';
import {
  checkEdgeRateLimit,
  CORS_HEADERS,
  MAX_REQUEST_BODY_BYTES,
  SECURITY_HEADERS,
  withStandardHeaders,
} from '../security/guardrails.js';

export interface McpHandlerEnv {
  SERVER_VERSION?: string;
  RATE_LIMIT_PER_MINUTE?: string;
}

export async function handleMcpStreamableRequest(
  request: Request,
  env: McpHandlerEnv = {}
): Promise<Response> {
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
  const rateLimitMax = Number.parseInt(env.RATE_LIMIT_PER_MINUTE || '45', 10) || 45;

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

  // 3. Enforce strict body ceiling before parsing
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

  // 4. Stateless per-request MCP server & transport
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
}
