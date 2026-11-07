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
  const aiChatUrl = 'https://ai.santiago-jv.tech';
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
  <title>Santiago Olayo | MCP Server</title>
  <meta name="description" content="Public Model Context Protocol (MCP) server for Santiago Olayo Villamil. Connect Claude, Codex, Antigravity, Cursor, or ChatGPT to explore career history or evaluate job vacancy fit." />
  <meta name="robots" content="index,follow,max-image-preview:large,max-snippet:-1" />
  <meta name="theme-color" content="#ffffff" />
  <link rel="canonical" href="https://mcp.santiago-jv.tech/" />
  <meta property="og:type" content="website" />
  <meta property="og:site_name" content="Santiago Olayo MCP Server" />
  <meta property="og:title" content="Santiago Olayo | MCP Server" />
  <meta property="og:description" content="Public Model Context Protocol (MCP) server for Santiago Olayo Villamil. Connect Claude, Codex, Antigravity, Cursor, or ChatGPT to explore career history or evaluate job vacancy fit." />
  <meta property="og:url" content="https://mcp.santiago-jv.tech/" />
  <meta property="og:image" content="https://www.santiago-jv.tech/og-image.png" />
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:site" content="@santiagojv_tech" />
  <meta name="twitter:title" content="Santiago Olayo | MCP Server" />
  <meta name="twitter:description" content="Public Model Context Protocol (MCP) server for Santiago Olayo Villamil. Connect Claude, Codex, Antigravity, Cursor, or ChatGPT to explore career history or evaluate job vacancy fit." />
  <meta name="twitter:image" content="https://www.santiago-jv.tech/og-image.png" />
  <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
  <script type="application/ld+json">
    {"@context":"https://schema.org","@type":"WebAPI","name":"Santiago Olayo MCP Edge Server","url":"https://mcp.santiago-jv.tech/mcp","documentation":"https://mcp.santiago-jv.tech/docs","description":"Public read-only Model Context Protocol (MCP) server over Streamable HTTP for exploring Santiago Olayo Villamil's engineering profile, system architecture, and job vacancy compatibility.","provider":{"@type":"Person","name":"Santiago Olayo Villamil","url":"https://www.santiago-jv.tech"}}
  </script>
  <style>
    :root {
      --bg-white: #ffffff;
      --bg-stone: #f5f5f7;
      --text-primary: #1d1d1f;
      --text-secondary: #6e6e73;
      --text-tertiary: #86868b;
      --accent: #1d1d1f;
      --accent-hover: #333336;
      --border: rgba(0, 0, 0, 0.08);
      --green: #1d8348;
      --font-sans: -apple-system, BlinkMacSystemFont, 'SF Pro Display', 'SF Pro Text', 'Helvetica Neue', Arial, sans-serif;
      --font-mono: 'SF Mono', ui-monospace, Menlo, Monaco, monospace;
    }
    * { box-sizing: border-box; margin: 0; padding: 0; }
    ::selection {
      background: rgba(29, 29, 31, 0.14);
      color: #1d1d1f;
    }
    .pro-card ::selection,
    .pro-card::selection {
      background: rgba(255, 255, 255, 0.24);
      color: #ffffff;
    }
    body {
      font-family: var(--font-sans);
      background: var(--bg-white);
      color: var(--text-primary);
      -webkit-font-smoothing: antialiased;
      line-height: 1.55;
      padding: 0 0 64px;
    }
    .glass-header {
      position: sticky;
      top: 0;
      z-index: 50;
      height: 52px;
      background: rgba(255, 255, 255, 0.78);
      backdrop-filter: saturate(180%) blur(20px);
      -webkit-backdrop-filter: saturate(180%) blur(20px);
      border-bottom: 1px solid rgba(0, 0, 0, 0.06);
      margin-bottom: 44px;
    }
    .header-inner {
      max-width: 1024px;
      height: 100%;
      margin: 0 auto;
      padding: 0 24px;
      display: flex;
      align-items: center;
      justify-content: space-between;
    }
    .brand-group {
      display: inline-flex;
      align-items: center;
      gap: 0.55rem;
      text-decoration: none;
      color: var(--text-primary);
      font-weight: 600;
      font-size: 1.02rem;
      letter-spacing: -0.024em;
    }
    .brand-mark {
      width: 26px;
      height: 26px;
      border-radius: 50%;
      display: block;
      box-shadow: 0 1px 4px rgba(0, 0, 0, 0.12);
    }
    .brand-tag {
      padding: 2px 8px;
      border-radius: 980px;
      background: var(--bg-stone);
      border: 1px solid var(--border);
      font-size: 11px;
      font-weight: 600;
      color: var(--text-secondary);
    }
    .header-nav {
      display: flex;
      align-items: center;
      gap: 20px;
    }
    .nav-link {
      font-size: 0.8rem;
      color: rgba(29, 29, 31, 0.8);
      text-decoration: none;
      transition: color 0.16s ease;
    }
    .nav-link:hover { color: var(--text-primary); }
    .nav-cta {
      padding: 0.4rem 0.95rem;
      border-radius: 980px;
      background: var(--accent);
      color: #ffffff;
      font-size: 0.78rem;
      font-weight: 500;
      text-decoration: none;
      transition: background 0.16s ease;
    }
    .nav-cta:hover { background: var(--accent-hover); }
    .shell {
      max-width: 820px;
      margin: 0 auto;
      padding: 0 24px;
    }
    .eyebrow {
      font-size: 0.82rem;
      font-weight: 600;
      text-transform: uppercase;
      letter-spacing: 0.055em;
      color: var(--text-secondary);
      margin-bottom: 8px;
    }
    h1 {
      font-size: clamp(2.1rem, 4.6vw, 3.1rem);
      letter-spacing: -0.038em;
      line-height: 1.08;
      font-weight: 700;
      margin-bottom: 12px;
    }
    .lead {
      font-size: 1.08rem;
      color: var(--text-secondary);
      max-width: 640px;
      margin-bottom: 28px;
      letter-spacing: -0.014em;
    }
    .pro-card {
      background: linear-gradient(155deg, #222226 0%, #141417 55%, #0c0c0e 100%);
      color: #f5f5f7;
      border-radius: 28px;
      padding: 28px 30px;
      border: 1px solid rgba(255, 255, 255, 0.13);
      box-shadow: 0 24px 52px rgba(0, 0, 0, 0.14);
      margin-bottom: 24px;
    }
    .console-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 12px;
      margin-bottom: 18px;
      flex-wrap: wrap;
    }
    .window-lights {
      display: inline-flex;
      gap: 7px;
    }
    .light-dot {
      width: 10px;
      height: 10px;
      border-radius: 50%;
      background: rgba(255, 255, 255, 0.2);
    }
    .live-pill {
      display: inline-flex;
      align-items: center;
      gap: 7px;
      padding: 4px 11px;
      border-radius: 980px;
      background: rgba(29, 131, 72, 0.16);
      border: 1px solid rgba(52, 199, 89, 0.28);
      color: #7ee29a;
      font-size: 11.5px;
      font-weight: 600;
    }
    .live-dot {
      width: 7px;
      height: 7px;
      border-radius: 50%;
      background: #34c759;
    }
    .endpoint-bar {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 12px;
      background: rgba(255, 255, 255, 0.06);
      border: 1px solid rgba(255, 255, 255, 0.12);
      border-radius: 16px;
      padding: 13px 16px;
      margin-bottom: 18px;
      flex-wrap: wrap;
    }
    .endpoint-url {
      font-family: var(--font-mono);
      font-size: 14px;
      color: #ffffff;
      word-break: break-all;
    }
    .copy-btn {
      font-family: inherit;
      background: #ffffff;
      color: #1d1d1f;
      border: none;
      border-radius: 980px;
      padding: 7px 16px;
      font-size: 12.5px;
      font-weight: 600;
      cursor: pointer;
    }
    .cta-row {
      display: flex;
      gap: 10px;
      flex-wrap: wrap;
    }
    .btn-primary {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      padding: 11px 20px;
      border-radius: 980px;
      background: #ffffff;
      color: #1d1d1f;
      font-weight: 600;
      font-size: 13.8px;
      text-decoration: none;
    }
    .btn-secondary {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      padding: 11px 18px;
      border-radius: 980px;
      background: rgba(255, 255, 255, 0.09);
      color: #f5f5f7;
      border: 1px solid rgba(255, 255, 255, 0.16);
      font-weight: 500;
      font-size: 13.8px;
      text-decoration: none;
    }
    .bento {
      background: var(--bg-stone);
      border: 1px solid var(--border);
      border-radius: 28px;
      padding: 28px 30px;
    }
    .bento h2 {
      font-size: 18px;
      letter-spacing: -0.022em;
      margin-bottom: 14px;
    }
    .tool-list {
      list-style: none;
      display: grid;
      grid-template-columns: repeat(2, minmax(0, 1fr));
      gap: 10px;
    }
    .tool-item {
      background: var(--bg-white);
      border: 1px solid var(--border);
      border-radius: 16px;
      padding: 13px 16px;
      display: flex;
      flex-direction: column;
      gap: 4px;
    }
    .tool-name {
      font-family: var(--font-mono);
      font-size: 13px;
      font-weight: 600;
      color: var(--text-primary);
    }
    .tool-desc {
      font-size: 13px;
      color: var(--text-secondary);
      line-height: 1.45;
    }
    .footer-meta {
      margin-top: 24px;
      font-size: 12.5px;
      color: var(--text-tertiary);
      display: flex;
      justify-content: space-between;
      flex-wrap: wrap;
      gap: 12px;
    }
    .footer-meta a {
      color: var(--text-secondary);
      font-weight: 500;
      text-decoration: none;
    }
    .footer-meta a:hover { color: var(--text-primary); }
    @media (max-width: 680px) {
      .tool-list { grid-template-columns: 1fr; }
    }
  </style>
</head>
<body>
  <header class="glass-header">
    <div class="header-inner">
      <a href="${portfolioUrl}" class="brand-group">
        <svg width="26" height="26" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" class="brand-mark" aria-hidden="true">
          <circle cx="32" cy="32" r="30" fill="#FFFFFF" stroke="#D2D2D7" stroke-width="2"/>
          <path d="M32.00 44.39Q29.16 44.39 27.04 43.56Q24.92 42.72 23.71 41.15Q22.50 39.58 22.36 37.38L22.34 37.10L27.07 37.10L27.11 37.30Q27.27 38.22 27.95 38.89Q28.62 39.57 29.69 39.94Q30.77 40.32 32.13 40.32Q33.52 40.32 34.53 39.94Q35.54 39.56 36.09 38.87Q36.64 38.18 36.64 37.27L36.64 37.25Q36.64 36.04 35.69 35.35Q34.74 34.66 32.50 34.21L29.97 33.70Q27.61 33.23 26.03 32.32Q24.44 31.41 23.65 30.05Q22.85 28.70 22.85 26.90L22.85 26.88Q22.86 24.69 24.03 23.06Q25.21 21.42 27.27 20.52Q29.33 19.61 31.98 19.61Q34.75 19.61 36.77 20.47Q38.79 21.34 39.92 22.91Q41.05 24.49 41.17 26.59L41.18 26.90L36.45 26.90L36.43 26.70Q36.30 25.75 35.72 25.08Q35.13 24.41 34.18 24.05Q33.22 23.68 31.98 23.68Q30.70 23.68 29.78 24.05Q28.85 24.42 28.36 25.07Q27.86 25.72 27.86 26.58L27.86 26.60Q27.86 27.35 28.29 27.91Q28.71 28.47 29.59 28.87Q30.48 29.26 31.85 29.54L34.39 30.05Q36.90 30.55 38.51 31.43Q40.11 32.31 40.89 33.64Q41.66 34.98 41.66 36.86L41.66 36.88Q41.66 39.18 40.50 40.87Q39.35 42.56 37.19 43.48Q35.03 44.39 32.00 44.39Z" fill="#1D1D1F"/>
        </svg>
        <span>Santiago Olayo</span>
        <span class="brand-tag">MCP</span>
      </a>
      <nav class="header-nav">
        <a class="nav-link" href="${docsUrl}">MCP Docs</a>
        <a class="nav-link" href="${aiChatUrl}">Live AI Chat</a>
        <a class="nav-cta" href="${portfolioUrl}">Portfolio</a>
      </nav>
    </div>
  </header>
  <main class="shell">
    <p class="eyebrow">Model Context Protocol</p>
    <h1>Santiago Olayo MCP Server</h1>
    <p class="lead">
      Connect Claude, Codex, Antigravity, Cursor, or ChatGPT to explore my career history, backend architecture, and job vacancy fit.
    </p>

    <section class="pro-card">
      <div class="console-header">
        <div class="window-lights" aria-hidden="true">
          <span class="light-dot"></span>
          <span class="light-dot"></span>
          <span class="light-dot"></span>
        </div>
        <span class="live-pill">
          <span class="live-dot"></span>
          <span>Live · Streamable HTTP · ${edgeColo} · v${version}</span>
        </span>
      </div>

      <div class="endpoint-bar">
        <code class="endpoint-url" id="mcp-url">${mcpEndpoint}</code>
        <button class="copy-btn" type="button" onclick="navigator.clipboard.writeText('${mcpEndpoint}').then(() => { this.textContent = 'Copied'; setTimeout(() => this.textContent = 'Copy URL', 1800); })">Copy URL</button>
      </div>

      <div class="cta-row">
        <a class="btn-primary" href="${docsUrl}">Setup Guide &amp; Docs ›</a>
        <a class="btn-secondary" href="${aiChatUrl}">Open Live Web AI Chat ↗</a>
      </div>
    </section>

    <section class="bento">
      <h2>Exposed MCP Tools (${PUBLIC_TOOL_CATALOG.length})</h2>
      <ul class="tool-list">${toolsHtml}</ul>
    </section>

    <footer class="footer-meta">
      <span>Streamable HTTP · Stateless Cloudflare Edge</span>
      <span><a href="/docs">Docs (/docs)</a> · <a href="/health">Health (/health)</a> · <a href="${portfolioUrl}">santiago-jv.tech</a></span>
    </footer>
  </main>
</body>
</html>`;
}
