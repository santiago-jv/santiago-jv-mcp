import type { APIRoute } from 'astro';
import { handleHealthRequest } from '../mcp/handler.js';

export const prerender = false;

export const GET: APIRoute = async ({ request, locals }) => {
  const env = ((locals as { runtime?: { env?: Record<string, string> } })?.runtime?.env ||
    {}) as Record<string, string>;

  return handleHealthRequest(request, env);
};
