import type { APIRoute } from 'astro';
import { handleMcpStreamableRequest } from '../mcp/handler.js';

export const prerender = false;

export const ALL: APIRoute = async ({ request, locals }) => {
  const env = ((locals as { runtime?: { env?: Record<string, string> } })?.runtime?.env ||
    {}) as Record<string, string>;

  return handleMcpStreamableRequest(request, env);
};
