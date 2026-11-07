import assert from 'node:assert/strict';
import { beforeEach, describe, it } from 'node:test';
import worker from '../src/index.js';
import { DOCS_COPY } from '../src/data/docs-content.js';
import { SANTIAGO_IDENTITY, SKILL_MATRIX, WORK_EXPERIENCE } from '../src/data/profile.js';
import { MAX_REQUEST_BODY_BYTES, resetRateLimiterForTests } from '../src/security/guardrails.js';

function createJsonRpcRequest(
  body: unknown,
  path = '/mcp',
  extraHeaders: Record<string, string> = {}
): Request {
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

describe('santiago-jv-mcp Cloudflare Worker & Hexagonal Domain Suite', () => {
  beforeEach(() => {
    resetRateLimiterForTests();
  });

  it('serves operational JSON on GET /health and GET /status with security & rate-limit headers', async () => {
    const res = await worker.fetch(new Request('https://mcp.santiago-jv.tech/health'));
    assert.equal(res.status, 200);
    assert.equal(res.headers.get('X-Content-Type-Options'), 'nosniff');
    assert.equal(res.headers.get('X-Frame-Options'), 'DENY');
    assert.ok(res.headers.get('X-RateLimit-Limit'));

    const json = (await res.json()) as { status: string; tools: string[]; transport: string };
    assert.equal(json.status, 'operational');
    assert.equal(json.transport, 'streamable-http');
    assert.equal(json.tools.includes('evaluate_vacancy_match'), true);
    assert.equal(json.tools.length, 6);

    const statusRes = await worker.fetch(new Request('https://mcp.santiago-jv.tech/status'));
    assert.equal(statusRes.status, 200);
  });

  it('handles CORS OPTIONS preflight requests with 204 No Content', async () => {
    const res = await worker.fetch(
      new Request('https://mcp.santiago-jv.tech/mcp', {
        method: 'OPTIONS',
      })
    );
    assert.equal(res.status, 204);
    assert.equal(res.headers.get('Access-Control-Allow-Origin'), '*');
    assert.match(res.headers.get('Access-Control-Allow-Methods') || '', /POST/);
  });

  it('serves Apple Space Black gateway HTML on browser GET / with full SEO & JSON-LD WebAPI schema', async () => {
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
    assert.match(html, /rel="canonical" href="https:\/\/mcp\.santiago-jv\.tech\/"/);
    assert.match(html, /property="og:title"/);
    assert.match(html, /name="twitter:card"/);
    assert.match(html, /"@type":"WebAPI"/);
  });

  it('serves full interactive MCP documentation HTML on GET /docs with SEO, hreflang & TechArticle schema', async () => {
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
    assert.match(html, /rel="canonical" href="https:\/\/mcp\.santiago-jv\.tech\/docs"/);
    assert.match(html, /hreflang="es"/);
    assert.match(html, /"@type":"TechArticle"/);
    assert.match(html, /Nequi/);
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

  it('executes get_profile_overview, get_work_experience, get_tech_stack_and_architecture, and get_social_and_contact_links', async () => {
    // 1. get_profile_overview (Spanish)
    const overviewRes = await worker.fetch(
      createJsonRpcRequest({
        jsonrpc: '2.0',
        id: 10,
        method: 'tools/call',
        params: { name: 'get_profile_overview', arguments: { language: 'es' } },
      })
    );
    assert.equal(overviewRes.status, 200);
    const overviewJson = JSON.parse(
      ((await overviewRes.json()) as { result: { content: Array<{ text: string }> } }).result
        .content[0].text
    );
    assert.equal(overviewJson.fullName, 'Santiago Olayo Villamil');
    assert.match(overviewJson.headline, /Product Owner Engineer/);

    // 2. get_work_experience filtered by GoodRec and ai-mcp
    const expRes = await worker.fetch(
      createJsonRpcRequest({
        jsonrpc: '2.0',
        id: 11,
        method: 'tools/call',
        params: {
          name: 'get_work_experience',
          arguments: { company: 'GoodRec', focus: 'ai-mcp', language: 'en' },
        },
      })
    );
    assert.equal(expRes.status, 200);
    const expJson = JSON.parse(
      ((await expRes.json()) as { result: { content: Array<{ text: string }> } }).result
        .content[0].text
    );
    assert.equal(expJson.count, 1);
    assert.equal(expJson.experiences[0].company, 'GoodRec');

    // 3. get_tech_stack_and_architecture filtered by backend (includes Nequi)
    const stackRes = await worker.fetch(
      createJsonRpcRequest({
        jsonrpc: '2.0',
        id: 12,
        method: 'tools/call',
        params: {
          name: 'get_tech_stack_and_architecture',
          arguments: { domain: 'backend', language: 'en' },
        },
      })
    );
    assert.equal(stackRes.status, 200);
    const stackText = ((await stackRes.json()) as { result: { content: Array<{ text: string }> } })
      .result.content[0].text;
    assert.match(stackText, /Nequi/);
    assert.match(stackText, /Hexagonal Architecture/);

    // 4. get_social_and_contact_links without resume URLs
    const linksRes = await worker.fetch(
      createJsonRpcRequest({
        jsonrpc: '2.0',
        id: 13,
        method: 'tools/call',
        params: {
          name: 'get_social_and_contact_links',
          arguments: { include_resume_urls: false },
        },
      })
    );
    assert.equal(linksRes.status, 200);
    const linksJson = JSON.parse(
      ((await linksRes.json()) as { result: { content: Array<{ text: string }> } }).result
        .content[0].text
    );
    assert.equal(linksJson.email, 'contact@santiago-jv.tech');
    assert.equal(linksJson.resumes, undefined);
  });

  it('executes prepare_outreach_context in English and Spanish', async () => {
    const res = await worker.fetch(
      createJsonRpcRequest({
        jsonrpc: '2.0',
        id: 14,
        method: 'tools/call',
        params: {
          name: 'prepare_outreach_context',
          arguments: {
            company_name: 'Vercel',
            role_title: 'Senior Backend Engineer',
            recruiter_name: 'Alex',
            key_reason: 'your public Cloudflare MCP server',
            language: 'en',
          },
        },
      })
    );
    assert.equal(res.status, 200);
    const payload = JSON.parse(
      ((await res.json()) as { result: { content: Array<{ text: string }> } }).result.content[0]
        .text
    );
    assert.equal(payload.atsSummaryCard.targetRole, 'Senior Backend Engineer @ Vercel');
    assert.match(payload.suggestedEmailDraft.body, /Alex \(Vercel\)/);
  });

  it('lists and reads all 4 MCP resources (EN/ES resumes, architecture blueprint, contact card)', async () => {
    const listRes = await worker.fetch(
      createJsonRpcRequest({
        jsonrpc: '2.0',
        id: 20,
        method: 'resources/list',
        params: {},
      })
    );
    assert.equal(listRes.status, 200);
    const listData = (await listRes.json()) as {
      result: { resources: Array<{ uri: string }> };
    };
    assert.equal(listData.result.resources.length, 4);

    const readRes = await worker.fetch(
      createJsonRpcRequest({
        jsonrpc: '2.0',
        id: 21,
        method: 'resources/read',
        params: { uri: 'santiago://profile/resume-en' },
      })
    );
    assert.equal(readRes.status, 200);
    const readData = (await readRes.json()) as {
      result: { contents: Array<{ text: string }> };
    };
    assert.match(readData.result.contents[0].text, /# Santiago Olayo Villamil/);
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
            'We are looking for a Senior Backend Engineer with 4+ years of experience building scalable services with TypeScript, Node.js, and NestJS. Strong knowledge of Hexagonal Architecture, DDD, PostgreSQL, MongoDB, Redis distributed locks, Nequi & Stripe integrations, AWS ECS, Datadog observability, and building internal LLM / MCP tooling.',
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
    assert.match(reportText, /Nequi/);
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

  it('rejects oversized payloads (>32 KB) with 413 Payload Too Large', async () => {
    const req = new Request('https://mcp.santiago-jv.tech/mcp', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': String(MAX_REQUEST_BODY_BYTES + 1024),
      },
      body: JSON.stringify({ jsonrpc: '2.0', id: 1, method: 'tools/list' }),
    });

    const res = await worker.fetch(req);
    assert.equal(res.status, 413);
  });

  it('returns 404 Not Found with discovery metadata on unknown routes', async () => {
    const res = await worker.fetch(new Request('https://mcp.santiago-jv.tech/unknown-route'));
    assert.equal(res.status, 404);
    const body = (await res.json()) as { error: string; mcpEndpoint: string };
    assert.equal(body.error, 'Not Found');
    assert.equal(body.mcpEndpoint, 'https://mcp.santiago-jv.tech/mcp');
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
    assert.ok(r3.headers.get('Retry-After'));
  });

  it('maintains natural copywriting without AI em-dash artifacts in profile and docs content', () => {
    const serializedProfile = JSON.stringify({
      SANTIAGO_IDENTITY,
      WORK_EXPERIENCE,
      SKILL_MATRIX,
    });
    const serializedDocs = JSON.stringify(DOCS_COPY);

    assert.equal(serializedProfile.includes('—'), false, 'Profile data should not contain AI em-dashes (—)');
    assert.equal(serializedDocs.includes('—'), false, 'Docs content should not contain AI em-dashes (—)');
  });
});
