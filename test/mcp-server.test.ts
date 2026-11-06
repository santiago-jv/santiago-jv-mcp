import assert from 'node:assert/strict';
import { beforeEach, describe, it } from 'node:test';
import worker from '../src/index.js';
import { resetRateLimiterForTests } from '../src/security/guardrails.js';

function createJsonRpcRequest(body: unknown, path = '/mcp', extraHeaders: Record<string, string> = {}): Request {
  const payload = JSON.stringify(body);
  return new Request(`https://mcp.santiago-jv.tech${path}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json, text/event-stream',
      'Content-Length': String(Buffer.byteLength(payload)),
      ...extraHeaders,
    },
    body: payload,
  });
}

describe('santiago-jv-mcp Cloudflare Worker', () => {
  beforeEach(() => {
    resetRateLimiterForTests();
  });

  it('serves operational JSON on GET /health', async () => {
    const res = await worker.fetch(new Request('https://mcp.santiago-jv.tech/health'));
    assert.equal(res.status, 200);
    const json = (await res.json()) as { status: string; tools: string[]; transport: string };
    assert.equal(json.status, 'operational');
    assert.equal(json.transport, 'streamable-http');
    assert.equal(json.tools.includes('evaluate_vacancy_match'), true);
    assert.equal(json.tools.length, 6);
  });

  it('serves Apple Space Black gateway HTML on browser GET /', async () => {
    const res = await worker.fetch(
      new Request('https://mcp.santiago-jv.tech/', {
        headers: { Accept: 'text/html' },
      })
    );
    assert.equal(res.status, 200);
    assert.match(res.headers.get('Content-Type') || '', /text\/html/);
    const html = await res.text();
    assert.match(html, /Santiago Olayo MCP Server/);
    assert.match(html, /https:\/\/mcp\.santiago-jv\.tech\/docs/);
  });

  it('serves full interactive MCP documentation HTML on GET /docs', async () => {
    const res = await worker.fetch(
      new Request('https://mcp.santiago-jv.tech/docs', {
        headers: { Accept: 'text/html' },
      })
    );
    assert.equal(res.status, 200);
    assert.match(res.headers.get('Content-Type') || '', /text\/html/);
    const html = await res.text();
    assert.match(html, /Santiago Olayo MCP/);
    assert.match(html, /Claude/);
    assert.match(html, /Codex/);
    assert.match(html, /Antigravity/);
  });

  it('returns natural-language prompts without hardcoded tool function calls', async () => {
    const req = createJsonRpcRequest({
      jsonrpc: '2.0',
      id: 99,
      method: 'prompts/get',
      params: {
        name: 'evaluate_candidate_fit',
        arguments: {
          job_description: 'Senior Backend Engineer with TypeScript, NestJS, and AWS.',
        },
      },
    });

    const res = await worker.fetch(req);
    assert.equal(res.status, 200);
    const data = (await res.json()) as {
      result: { messages: Array<{ content: { text: string } }> };
    };
    const promptText = data.result.messages[0].content.text;
    assert.equal(promptText.includes('evaluate_vacancy_match'), false);
    assert.equal(promptText.includes('get_work_experience'), false);
    assert.match(promptText, /Santiago Olayo Villamil/);
  });

  it('handles MCP initialize handshake over Streamable HTTP', async () => {
    const req = createJsonRpcRequest({
      jsonrpc: '2.0',
      id: 1,
      method: 'initialize',
      params: {
        protocolVersion: '2025-03-26',
        capabilities: {},
        clientInfo: { name: 'test-client', version: '1.0.0' },
      },
    });

    const res = await worker.fetch(req);
    assert.equal(res.status, 200);
    const data = (await res.json()) as {
      result: { serverInfo: { name: string }; capabilities: Record<string, unknown> };
    };
    assert.equal(data.result.serverInfo.name, 'santiago-jv-mcp');
    assert.ok(data.result.capabilities.tools);
    assert.ok(data.result.capabilities.resources);
    assert.ok(data.result.capabilities.prompts);
  });

  it('lists all 6 tools via tools/list and supports root POST / alias', async () => {
    const req = createJsonRpcRequest(
      {
        jsonrpc: '2.0',
        id: 2,
        method: 'tools/list',
        params: {},
      },
      '/'
    );

    const res = await worker.fetch(req);
    assert.equal(res.status, 200);
    const data = (await res.json()) as { result: { tools: Array<{ name: string }> } };
    const names = data.result.tools.map((t) => t.name);
    assert.deepEqual(names, [
      'get_profile_overview',
      'get_work_experience',
      'get_tech_stack_and_architecture',
      'get_social_and_contact_links',
      'evaluate_vacancy_match',
      'prepare_outreach_context',
    ]);
  });

  it('scores a Senior Backend TypeScript/NestJS vacancy as STRONG_FIT in evaluate_vacancy_match', async () => {
    const req = createJsonRpcRequest({
      jsonrpc: '2.0',
      id: 3,
      method: 'tools/call',
      params: {
        name: 'evaluate_vacancy_match',
        arguments: {
          role_title: 'Senior Backend Engineer (AI & Platform)',
          company_name: 'Acme Cloud',
          modality: 'remote',
          min_years_experience: 4,
          job_description:
            'We are looking for a Senior Backend Engineer with 4+ years of experience building scalable services with TypeScript, Node.js, and NestJS. Strong knowledge of Hexagonal Architecture, DDD, PostgreSQL, MongoDB, Redis distributed locks, AWS ECS, Datadog observability, and building internal LLM / MCP tooling.',
        },
      },
    });

    const res = await worker.fetch(req);
    assert.equal(res.status, 200);
    const data = (await res.json()) as {
      result: { content: Array<{ type: string; text: string }> };
    };
    const reportText = data.result.content.map((c) => c.text).join('\n');
    assert.match(reportText, /STRONG_FIT/);
    assert.match(reportText, /NestJS/);
    assert.match(reportText, /Model Context Protocol/);
  });

  it('transparently flags non-primary stack gaps (e.g. Rust + Kubernetes SRE) in Spanish', async () => {
    const req = createJsonRpcRequest({
      jsonrpc: '2.0',
      id: 4,
      method: 'tools/call',
      params: {
        name: 'evaluate_vacancy_match',
        arguments: {
          role_title: 'Ingeniero SRE Rust & Kubernetes',
          language: 'es',
          job_description:
            'Buscamos desarrollador con 8 años de experiencia principal en Rust, administración dedicada de Kubernetes e Istio en modalidad presencial en Madrid.',
        },
      },
    });

    const res = await worker.fetch(req);
    assert.equal(res.status, 200);
    const data = (await res.json()) as {
      result: { content: Array<{ type: string; text: string }> };
    };
    const reportText = data.result.content.map((c) => c.text).join('\n');
    assert.match(reportText, /Go \(Golang\) \/ Rust/);
    assert.match(reportText, /Kubernetes/);
  });

  it('enforces per-IP rate limiting with 429 Too Many Requests', async () => {
    const env = { RATE_LIMIT_PER_MINUTE: '2' };
    const headers = { 'CF-Connecting-IP': '203.0.113.99' };

    const r1 = await worker.fetch(new Request('https://mcp.santiago-jv.tech/health', { headers }), env);
    const r2 = await worker.fetch(new Request('https://mcp.santiago-jv.tech/health', { headers }), env);
    const r3 = await worker.fetch(new Request('https://mcp.santiago-jv.tech/health', { headers }), env);

    assert.equal(r1.status, 200);
    assert.equal(r2.status, 200);
    assert.equal(r3.status, 429);
  });
});
