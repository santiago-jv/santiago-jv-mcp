import { PUBLIC_TOOL_CATALOG } from '../mcp/create-server.js';

export interface GatewayRenderProps {
  mcpEndpoint: string;
  docsUrl: string;
  portfolioUrl: string;
  version: string;
  edgeColo: string;
}

export function renderAppleGatewayHtml({
  mcpEndpoint,
  docsUrl,
  portfolioUrl,
  version,
  edgeColo,
}: GatewayRenderProps): string {
  const toolsHtml = PUBLIC_TOOL_CATALOG.map(
    (tool) => `
      <li class="tool-item">
        <code class="tool-name">${tool.name}</code>
        <span class="tool-desc">${tool.summary}</span>
      </li>`
  ).join('');

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>Santiago Olayo — MCP Edge Server (mcp.santiago-jv.tech)</title>
  <meta name="description" content="Public Model Context Protocol (MCP) server for Santiago Olayo Villamil. Connect Claude, Cursor, or ChatGPT to explore career history or evaluate job vacancy fit." />
  <style>
    :root {
      --bg-white: #ffffff;
      --bg-stone: #f5f5f7;
      --text-primary: #1d1d1f;
      --text-secondary: #6e6e73;
      --obsidian: #121214;
      --border: rgba(0, 0, 0, 0.08);
      --green: #1d8348;
      --font-sans: -apple-system, BlinkMacSystemFont, 'SF Pro Display', 'SF Pro Text', 'Helvetica Neue', Arial, sans-serif;
      --font-mono: 'SF Mono', ui-monospace, Menlo, Monaco, monospace;
    }
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body {
      font-family: var(--font-sans);
      background: var(--bg-white);
      color: var(--text-primary);
      -webkit-font-smoothing: antialiased;
      line-height: 1.55;
      padding: 48px 20px 72px;
    }
    .shell {
      max-width: 820px;
      margin: 0 auto;
    }
    .status-pill {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      padding: 6px 14px;
      border-radius: 980px;
      background: var(--bg-stone);
      border: 1px solid var(--border);
      font-size: 12.5px;
      font-weight: 600;
      color: var(--text-secondary);
      margin-bottom: 20px;
    }
    .dot {
      width: 8px;
      height: 8px;
      border-radius: 50%;
      background: var(--green);
      box-shadow: 0 0 0 4px rgba(29, 131, 72, 0.14);
    }
    h1 {
      font-size: clamp(2rem, 5vw, 3.1rem);
      letter-spacing: -0.038em;
      line-height: 1.08;
      font-weight: 700;
      margin-bottom: 14px;
    }
    .lead {
      font-size: 18px;
      color: var(--text-secondary);
      max-width: 650px;
      margin-bottom: 32px;
      letter-spacing: -0.014em;
    }
    .pro-card {
      background: linear-gradient(155deg, #222226 0%, #141417 55%, #0c0c0e 100%);
      color: #f5f5f7;
      border-radius: 28px;
      padding: 32px;
      border: 1px solid rgba(255, 255, 255, 0.12);
      box-shadow: 0 22px 48px rgba(0, 0, 0, 0.12);
      margin-bottom: 24px;
    }
    .endpoint-label {
      font-size: 12px;
      text-transform: uppercase;
      letter-spacing: 0.08em;
      color: #a1a1a6;
      font-weight: 600;
      margin-bottom: 10px;
    }
    .endpoint-bar {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 12px;
      background: rgba(255, 255, 255, 0.07);
      border: 1px solid rgba(255, 255, 255, 0.14);
      border-radius: 16px;
      padding: 14px 18px;
      margin-bottom: 22px;
      flex-wrap: wrap;
    }
    .endpoint-url {
      font-family: var(--font-mono);
      font-size: 14.5px;
      color: #ffffff;
      word-break: break-all;
    }
    .copy-btn {
      font-family: inherit;
      background: #ffffff;
      color: #1d1d1f;
      border: none;
      border-radius: 980px;
      padding: 8px 18px;
      font-size: 13px;
      font-weight: 600;
      cursor: pointer;
      transition: transform 0.18s ease, opacity 0.18s ease;
    }
    .copy-btn:hover { opacity: 0.92; transform: scale(1.02); }
    .cta-row {
      display: flex;
      gap: 12px;
      flex-wrap: wrap;
    }
    .btn-primary {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      padding: 12px 22px;
      border-radius: 980px;
      background: #f5f5f7;
      color: #1d1d1f;
      font-weight: 600;
      font-size: 14.5px;
      text-decoration: none;
    }
    .btn-secondary {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      padding: 12px 22px;
      border-radius: 980px;
      background: rgba(255, 255, 255, 0.1);
      color: #f5f5f7;
      border: 1px solid rgba(255, 255, 255, 0.16);
      font-weight: 500;
      font-size: 14.5px;
      text-decoration: none;
    }
    .bento {
      background: var(--bg-stone);
      border: 1px solid var(--border);
      border-radius: 28px;
      padding: 32px;
    }
    .bento h2 {
      font-size: 20px;
      letter-spacing: -0.024em;
      margin-bottom: 16px;
    }
    .tool-list {
      list-style: none;
      display: grid;
      gap: 12px;
    }
    .tool-item {
      background: var(--bg-white);
      border: 1px solid var(--border);
      border-radius: 16px;
      padding: 14px 18px;
      display: flex;
      flex-direction: column;
      gap: 4px;
    }
    .tool-name {
      font-family: var(--font-mono);
      font-size: 13.5px;
      font-weight: 600;
      color: var(--text-primary);
    }
    .tool-desc {
      font-size: 14px;
      color: var(--text-secondary);
    }
    .footer-meta {
      margin-top: 28px;
      font-size: 13px;
      color: var(--text-secondary);
      display: flex;
      justify-content: space-between;
      flex-wrap: wrap;
      gap: 8px;
    }
  </style>
</head>
<body>
  <main class="shell">
    <div class="status-pill">
      <span class="dot"></span>
      <span>Operational · Streamable HTTP · Cloudflare Edge (${edgeColo}) · v${version}</span>
    </div>
    <h1>Santiago Olayo MCP Server.</h1>
    <p class="lead">
      Connect Claude, Cursor, ChatGPT, or VS Code directly to my career history, backend architecture blueprints, and automated recruiter job-match engine.
    </p>

    <section class="pro-card">
      <p class="endpoint-label">Public Streamable HTTP Endpoint (No Auth Required)</p>
      <div class="endpoint-bar">
        <code class="endpoint-url" id="mcp-url">${mcpEndpoint}</code>
        <button class="copy-btn" type="button" onclick="navigator.clipboard.writeText('${mcpEndpoint}').then(() => { this.textContent = 'Copied'; setTimeout(() => this.textContent = 'Copy URL', 1800); })">Copy URL</button>
      </div>
      <div class="cta-row">
        <a class="btn-primary" href="${docsUrl}">Open Full Documentation &amp; Recruiter Guide ›</a>
        <a class="btn-secondary" href="${portfolioUrl}">Visit Portfolio (santiago-jv.tech)</a>
      </div>
    </section>

    <section class="bento">
      <h2>Exposed MCP Tools (${PUBLIC_TOOL_CATALOG.length})</h2>
      <ul class="tool-list">${toolsHtml}</ul>
    </section>

    <footer class="footer-meta">
      <span>Protocol: Model Context Protocol (Streamable HTTP · Stateless Edge)</span>
      <span>Health JSON: <a href="/health">/health</a></span>
    </footer>
  </main>
</body>
</html>`;
}
