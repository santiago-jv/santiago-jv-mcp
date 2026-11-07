import { DOCS_COPY } from '../data/docs-content.js';

export interface DocsRenderProps {
  mcpEndpoint: string;
  portfolioUrl: string;
  version: string;
  edgeColo: string;
}

export function renderAppleDocsHtml({
  mcpEndpoint,
  portfolioUrl,
  version,
  edgeColo,
}: DocsRenderProps): string {
  const aiChatUrl = 'https://ai.santiago-jv.tech';
  const serializedCopy = JSON.stringify(DOCS_COPY).replace(/</g, '\\u003c');
  const currentYear = new Date().getFullYear();

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>Santiago Olayo | MCP Server Docs</title>
  <meta name="description" content="Official documentation for mcp.santiago-jv.tech. Connect Claude, Codex, Antigravity, Cursor, or ChatGPT to explore Santiago Olayo’s career or evaluate job vacancy fit in plain language." />
  <meta name="robots" content="index,follow,max-image-preview:large,max-snippet:-1" />
  <meta name="theme-color" content="#ffffff" />
  <link rel="canonical" href="https://mcp.santiago-jv.tech/docs" />
  <link rel="alternate" hreflang="en" href="https://mcp.santiago-jv.tech/docs" />
  <link rel="alternate" hreflang="es" href="https://mcp.santiago-jv.tech/docs?lang=es" />
  <link rel="alternate" hreflang="x-default" href="https://mcp.santiago-jv.tech/docs" />
  <meta property="og:type" content="article" />
  <meta property="og:site_name" content="Santiago Olayo MCP Server" />
  <meta property="og:title" content="Santiago Olayo | MCP Server Docs" />
  <meta property="og:description" content="Connect Claude, Codex, Antigravity, Cursor, or ChatGPT to explore Santiago Olayo’s career or evaluate job vacancy fit in plain language." />
  <meta property="og:url" content="https://mcp.santiago-jv.tech/docs" />
  <meta property="og:image" content="https://www.santiago-jv.tech/og-image.png" />
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:site" content="@santiagojv_tech" />
  <meta name="twitter:title" content="Santiago Olayo | MCP Server Docs" />
  <meta name="twitter:description" content="Connect Claude, Codex, Antigravity, Cursor, or ChatGPT to explore Santiago Olayo’s career or evaluate job vacancy fit in plain language." />
  <meta name="twitter:image" content="https://www.santiago-jv.tech/og-image.png" />
  <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
  <script type="application/ld+json">
    {"@context":"https://schema.org","@type":"TechArticle","headline":"Santiago Olayo MCP Server Documentation & Recruiter Guide","description":"Interactive documentation, client setup snippets, and deterministic job vacancy simulator for mcp.santiago-jv.tech.","url":"https://mcp.santiago-jv.tech/docs","author":{"@type":"Person","name":"Santiago Olayo Villamil","url":"https://www.santiago-jv.tech"}}
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
      --border: rgba(0, 0, 0, 0.075);
      --hairline: #d2d2d7;
      --green: #1d8348;
      --green-tint: rgba(29, 131, 72, 0.09);
      --red: #d70015;
      --red-tint: rgba(215, 0, 21, 0.08);
      --radius-bento: 28px;
      --radius-card: 22px;
      --radius-pill: 980px;
      --shadow-subtle: 0 2px 10px rgba(0, 0, 0, 0.035);
      --shadow-bento: 0 4px 24px rgba(0, 0, 0, 0.04), 0 1px 2px rgba(0, 0, 0, 0.02);
      --font-sans: -apple-system, BlinkMacSystemFont, 'SF Pro Display', 'SF Pro Text', 'Helvetica Neue', Arial, sans-serif;
      --font-mono: 'SF Mono', ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
    }

    * { box-sizing: border-box; margin: 0; padding: 0; }
    html { scroll-behavior: smooth; }
    body {
      font-family: var(--font-sans);
      background: var(--bg-white);
      color: var(--text-primary);
      -webkit-font-smoothing: antialiased;
      line-height: 1.55;
    }

    ::selection {
      background: rgba(29, 29, 31, 0.14);
      color: #1d1d1f;
    }

    .endpoint-dock ::selection,
    .endpoint-dock::selection,
    .prompt-pre ::selection,
    .prompt-pre::selection,
    .code-block ::selection,
    .code-block::selection {
      background: rgba(255, 255, 255, 0.24);
      color: #ffffff;
    }

    a { color: inherit; text-decoration: none; }
    button { font-family: inherit; cursor: pointer; border: none; background: none; }

    /* Sticky Apple Glass Header matching santiago-jv.tech */
    .glass-header {
      position: sticky;
      top: 0;
      z-index: 50;
      height: 52px;
      background: rgba(255, 255, 255, 0.78);
      backdrop-filter: saturate(180%) blur(20px);
      -webkit-backdrop-filter: saturate(180%) blur(20px);
      border-bottom: 1px solid rgba(0, 0, 0, 0.06);
    }
    .header-inner {
      max-width: 1024px;
      height: 100%;
      margin: 0 auto;
      padding: 0 24px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 16px;
    }
    .brand-group {
      display: inline-flex;
      align-items: center;
      gap: 0.55rem;
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
      border-radius: var(--radius-pill);
      background: var(--bg-stone);
      border: 1px solid var(--border);
      font-size: 11px;
      font-weight: 600;
      color: var(--text-secondary);
    }
    .header-nav {
      display: flex;
      align-items: center;
      gap: 1.6rem;
      font-size: 0.8rem;
      font-weight: 400;
      color: rgba(29, 29, 31, 0.8);
    }
    .header-nav a:hover { color: var(--text-primary); }
    .header-actions {
      display: flex;
      align-items: center;
      gap: 10px;
    }
    .lang-switch {
      display: inline-flex;
      padding: 2px;
      border-radius: var(--radius-pill);
      background: var(--bg-stone);
      border: 1px solid var(--border);
    }
    .lang-btn {
      padding: 3px 9px;
      border-radius: var(--radius-pill);
      font-size: 11px;
      font-weight: 600;
      color: var(--text-secondary);
      transition: background 0.16s ease, color 0.16s ease;
    }
    .lang-btn.active {
      background: var(--accent);
      color: #ffffff;
    }
    .portfolio-cta {
      display: inline-flex;
      align-items: center;
      padding: 0.4rem 0.95rem;
      border-radius: var(--radius-pill);
      background: var(--accent);
      color: #ffffff;
      font-size: 0.78rem;
      font-weight: 500;
      transition: background 0.16s ease;
    }
    .portfolio-cta:hover {
      background: var(--accent-hover);
    }

    .container {
      max-width: 1024px;
      margin: 0 auto;
      padding: 0 24px;
    }

    /* Hero */
    .hero-section {
      padding: 48px 0 64px;
    }
    .hero-title {
      font-size: clamp(2.15rem, 4.8vw, 3.35rem);
      font-weight: 700;
      line-height: 1.08;
      letter-spacing: -0.038em;
      margin-bottom: 12px;
    }
    .hero-subtitle {
      font-size: clamp(1.02rem, 1.5vw, 1.15rem);
      line-height: 1.52;
      letter-spacing: -0.014em;
      color: var(--text-secondary);
      max-width: 680px;
      margin-bottom: 28px;
    }

    /* Signature Anodized Space Black Pro Console matching santiago-jv.tech */
    .endpoint-dock {
      border-radius: var(--radius-bento);
      background: linear-gradient(155deg, #222226 0%, #141417 55%, #0c0c0e 100%);
      border: 1px solid rgba(255, 255, 255, 0.13);
      padding: 28px 30px;
      color: #f5f5f7;
      box-shadow: 0 24px 52px rgba(0, 0, 0, 0.14);
    }
    .dock-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 12px;
      margin-bottom: 18px;
      flex-wrap: wrap;
    }
    .window-lights {
      display: inline-flex;
      align-items: center;
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
      border-radius: var(--radius-pill);
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
    .dock-caption {
      display: block;
      font-size: 11px;
      font-weight: 600;
      text-transform: uppercase;
      letter-spacing: 0.06em;
      color: #8e8e93;
      margin-bottom: 8px;
    }
    .dock-url-row {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 14px;
      padding: 13px 16px;
      border-radius: 16px;
      background: rgba(255, 255, 255, 0.06);
      border: 1px solid rgba(255, 255, 255, 0.12);
      margin-bottom: 16px;
      flex-wrap: wrap;
    }
    .dock-url {
      font-family: var(--font-mono);
      font-size: 14px;
      color: #ffffff;
      word-break: break-all;
    }
    .dock-copy-btn {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      padding: 7.5px 16px;
      border-radius: var(--radius-pill);
      background: #ffffff;
      color: #1d1d1f;
      font-size: 12.5px;
      font-weight: 600;
      transition: transform 0.16s ease, opacity 0.16s ease;
    }
    .dock-copy-btn:hover { opacity: 0.92; transform: translateY(-1px); }
    .spec-badges {
      list-style: none;
      display: flex;
      flex-wrap: wrap;
      gap: 7px;
    }
    .spec-badge {
      padding: 4.5px 11px;
      border-radius: var(--radius-pill);
      background: rgba(255, 255, 255, 0.08);
      border: 1px solid rgba(255, 255, 255, 0.12);
      color: #d1d1d6;
      font-size: 11.8px;
      font-weight: 500;
    }

    /* Sections */
    .section-stone {
      padding: 72px 0 80px;
      background: var(--bg-stone);
      border-top: 1px solid var(--border);
    }
    .section-white {
      padding: 72px 0 80px;
      background: var(--bg-white);
      border-top: 1px solid var(--border);
    }
    .section-header {
      max-width: 44rem;
      margin-bottom: 34px;
    }
    .eyebrow {
      margin-bottom: 0.5rem;
      color: var(--text-secondary);
      font-size: 0.82rem;
      font-weight: 600;
      text-transform: uppercase;
      letter-spacing: 0.055em;
    }
    .headline {
      font-size: clamp(1.9rem, 4vw, 2.75rem);
      font-weight: 700;
      line-height: 1.08;
      letter-spacing: -0.036em;
      margin-bottom: 10px;
    }
    .description {
      font-size: 1rem;
      line-height: 1.52;
      color: var(--text-secondary);
      letter-spacing: -0.012em;
    }

    /* Quick Start Client Setup */
    .client-setup-card {
      border-radius: var(--radius-bento);
      background: var(--bg-white);
      border: 1px solid var(--border);
      padding: 24px;
      box-shadow: var(--shadow-bento);
    }
    .client-tabs {
      display: flex;
      flex-wrap: wrap;
      gap: 7px;
      margin-bottom: 18px;
    }
    .client-tab-btn {
      padding: 7.5px 15px;
      border-radius: var(--radius-pill);
      background: var(--bg-stone);
      border: 1px solid var(--border);
      font-size: 13px;
      font-weight: 600;
      color: var(--text-secondary);
    }
    .client-tab-btn.active {
      background: var(--accent);
      border-color: var(--accent);
      color: #ffffff;
    }
    .client-panel {
      background: var(--bg-stone);
      border: 1px solid var(--border);
      border-radius: 20px;
      padding: 20px 22px;
      display: flex;
      flex-direction: column;
      gap: 14px;
    }
    .client-meta-bar {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 12px;
      flex-wrap: wrap;
    }
    .client-meta-left {
      display: flex;
      align-items: center;
      gap: 10px;
      flex-wrap: wrap;
    }
    .client-filename {
      font-family: var(--font-mono);
      font-size: 12.8px;
      font-weight: 600;
    }
    .client-badge {
      padding: 3px 9px;
      border-radius: var(--radius-pill);
      background: var(--bg-white);
      border: 1px solid var(--border);
      font-size: 11.5px;
      font-weight: 600;
      color: var(--text-secondary);
    }
    .client-steps {
      list-style: none;
      display: flex;
      flex-direction: column;
      gap: 5px;
      font-size: 13.8px;
      color: var(--text-secondary);
    }
    .client-steps li { display: flex; gap: 8px; }
    .client-step-idx { font-weight: 600; color: var(--text-primary); }
    .code-block {
      background: #141417;
      color: #f5f5f7;
      border-radius: 16px;
      padding: 18px;
      font-family: var(--font-mono);
      font-size: 12.5px;
      line-height: 1.58;
      overflow-x: auto;
      white-space: pre;
    }

    /* Recruiter Split */
    .recruiter-split {
      display: grid;
      grid-template-columns: minmax(0, 5fr) minmax(0, 7fr);
      gap: 20px;
      align-items: stretch;
    }
    .prompt-card,
    .simulator-card {
      background: var(--bg-stone);
      border: 1px solid var(--border);
      border-radius: var(--radius-bento);
      padding: 26px;
      display: flex;
      flex-direction: column;
      gap: 14px;
    }
    .card-header-row {
      display: flex;
      align-items: flex-start;
      justify-content: space-between;
      gap: 12px;
      flex-wrap: wrap;
    }
    .card-title {
      font-size: 19px;
      font-weight: 700;
      letter-spacing: -0.024em;
      margin-bottom: 2px;
    }
    .card-subtext {
      font-size: 13.5px;
      line-height: 1.48;
      color: var(--text-secondary);
    }
    .dark-pill-btn {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      padding: 7.5px 15px;
      border-radius: var(--radius-pill);
      background: var(--accent);
      color: #ffffff;
      font-size: 12.5px;
      font-weight: 600;
      flex-shrink: 0;
      transition: background 0.16s ease;
    }
    .dark-pill-btn:hover { background: var(--accent-hover); }

    .prompt-tabs {
      display: flex;
      flex-wrap: wrap;
      gap: 6px;
    }
    .prompt-tab-btn {
      padding: 5.5px 12px;
      border-radius: var(--radius-pill);
      background: var(--bg-white);
      border: 1px solid var(--border);
      font-size: 12px;
      font-weight: 600;
      color: var(--text-secondary);
    }
    .prompt-tab-btn.active {
      background: var(--accent);
      border-color: var(--accent);
      color: #ffffff;
    }

    .prompt-pre {
      flex: 1;
      background: #141417;
      color: #e5e5ea;
      border-radius: 16px;
      padding: 18px;
      font-family: var(--font-mono);
      font-size: 12.2px;
      line-height: 1.58;
      white-space: pre-wrap;
      word-break: break-word;
      overflow-x: auto;
    }

    /* Simulator */
    .preset-label {
      display: block;
      font-size: 11.8px;
      font-weight: 600;
      color: var(--text-tertiary);
      margin-bottom: 6px;
    }
    .preset-buttons {
      display: flex;
      flex-wrap: wrap;
      gap: 6px;
    }
    .preset-chip {
      padding: 5.5px 11px;
      border-radius: var(--radius-pill);
      background: var(--bg-white);
      border: 1px solid var(--border);
      font-size: 12px;
      font-weight: 600;
      color: var(--text-secondary);
    }
    .preset-chip.active {
      background: var(--accent);
      border-color: var(--accent);
      color: #ffffff;
    }
    .sim-inputs {
      display: flex;
      flex-direction: column;
      gap: 8px;
    }
    .sim-input,
    .sim-textarea {
      width: 100%;
      font-family: var(--font-sans);
      font-size: 13.5px;
      line-height: 1.48;
      color: var(--text-primary);
      background: var(--bg-white);
      border: 1px solid var(--border);
      border-radius: 14px;
      padding: 10px 13px;
      resize: vertical;
    }
    .sim-result-box {
      background: var(--bg-white);
      border: 1px solid var(--border);
      border-radius: 18px;
      padding: 18px;
      display: flex;
      flex-direction: column;
      gap: 12px;
    }
    .sim-score-row {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 12px;
    }
    .sim-score-caption {
      font-size: 11px;
      font-weight: 600;
      text-transform: uppercase;
      letter-spacing: 0.05em;
      color: var(--text-tertiary);
    }
    .sim-verdict {
      font-size: 14.5px;
      font-weight: 700;
    }
    .sim-score-badge {
      font-family: var(--font-mono);
      font-size: 14px;
      font-weight: 700;
      padding: 5px 12px;
      border-radius: var(--radius-pill);
      flex-shrink: 0;
    }
    .score-high {
      background: var(--green-tint);
      color: var(--green);
      border: 1px solid rgba(29, 131, 72, 0.22);
    }
    .score-mid {
      background: rgba(29, 29, 31, 0.08);
      color: var(--text-primary);
    }
    .score-low {
      background: var(--red-tint);
      color: var(--red);
    }
    .sim-summary {
      font-size: 13.3px;
      line-height: 1.52;
      color: var(--text-secondary);
    }
    .sim-group-title {
      display: block;
      font-size: 11.8px;
      font-weight: 600;
      margin-bottom: 6px;
    }
    .sim-skill-list {
      list-style: none;
      display: flex;
      flex-wrap: wrap;
      gap: 5.5px;
    }
    .sim-skill-pill {
      padding: 4px 9.5px;
      border-radius: var(--radius-pill);
      background: var(--bg-stone);
      border: 1px solid var(--border);
      font-size: 11.6px;
      font-weight: 500;
    }
    .sim-gaps-list {
      display: flex;
      flex-direction: column;
      gap: 4px;
      font-size: 12.6px;
      color: var(--text-secondary);
      padding-left: 16px;
      list-style: disc;
    }
    .sim-no-gaps {
      font-size: 12.6px;
      color: var(--green);
      font-weight: 500;
    }

    /* API Reference */
    .sub-section-title {
      font-size: 18px;
      font-weight: 700;
      letter-spacing: -0.022em;
      margin-bottom: 14px;
    }
    .tools-grid {
      display: grid;
      grid-template-columns: repeat(2, minmax(0, 1fr));
      gap: 14px;
      margin-bottom: 32px;
    }
    .tool-doc-card {
      background: var(--bg-white);
      border: 1px solid var(--border);
      border-radius: var(--radius-card);
      padding: 22px;
      display: flex;
      flex-direction: column;
      gap: 10px;
      box-shadow: var(--shadow-subtle);
    }
    .tool-doc-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 10px;
      flex-wrap: wrap;
    }
    .tool-doc-name {
      font-family: var(--font-mono);
      font-size: 13.5px;
      font-weight: 600;
    }
    .tool-doc-badge {
      padding: 3px 9px;
      border-radius: var(--radius-pill);
      background: var(--bg-stone);
      border: 1px solid var(--border);
      font-size: 11px;
      font-weight: 600;
      color: var(--text-secondary);
    }
    .tool-doc-summary {
      font-size: 13.5px;
      line-height: 1.5;
      color: var(--text-secondary);
    }
    .param-list {
      list-style: none;
      display: flex;
      flex-direction: column;
      gap: 7px;
      padding-top: 8px;
      border-top: 1px solid var(--border);
    }
    .param-top {
      display: flex;
      align-items: center;
      gap: 7px;
      flex-wrap: wrap;
    }
    .param-name {
      font-family: var(--font-mono);
      font-size: 12px;
      font-weight: 600;
    }
    .param-type {
      font-family: var(--font-mono);
      font-size: 11px;
      color: var(--text-tertiary);
    }
    .param-req {
      font-size: 10.5px;
      font-weight: 600;
      background: rgba(29, 29, 31, 0.08);
      padding: 1.5px 6.5px;
      border-radius: var(--radius-pill);
    }
    .param-opt {
      font-size: 10.5px;
      color: var(--text-tertiary);
    }
    .param-desc {
      font-size: 12.5px;
      line-height: 1.45;
      color: var(--text-secondary);
    }

    .dual-ref-grid {
      display: grid;
      grid-template-columns: repeat(2, minmax(0, 1fr));
      gap: 16px;
    }
    .compact-stack {
      display: flex;
      flex-direction: column;
      gap: 10px;
    }
    .compact-ref-card {
      background: var(--bg-white);
      border: 1px solid var(--border);
      border-radius: 16px;
      padding: 16px 18px;
      display: flex;
      flex-direction: column;
      gap: 4px;
    }
    .compact-ref-top {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 8px;
      flex-wrap: wrap;
    }
    .resource-uri {
      font-family: var(--font-mono);
      font-size: 12.5px;
      font-weight: 600;
      word-break: break-all;
    }

    /* Footer matching santiago-jv.tech legal bar */
    .docs-footer {
      border-top: 1px solid var(--hairline);
      background: var(--bg-stone);
      padding: 28px 0;
      font-size: 12.5px;
      color: var(--text-tertiary);
    }
    .footer-row {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 16px;
      flex-wrap: wrap;
    }
    .footer-links {
      display: flex;
      align-items: center;
      gap: 18px;
      flex-wrap: wrap;
    }
    .footer-links a {
      font-weight: 500;
      color: var(--text-secondary);
    }
    .footer-links a:hover {
      color: var(--text-primary);
      text-decoration: underline;
    }

    @media (max-width: 900px) {
      .header-nav { display: none; }
      .recruiter-split,
      .tools-grid,
      .dual-ref-grid {
        grid-template-columns: 1fr;
      }
    }
    @media (max-width: 600px) {
      .endpoint-dock,
      .prompt-card,
      .simulator-card,
      .client-setup-card {
        padding: 20px;
      }
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

      <nav class="header-nav" aria-label="Documentation sections">
        <a href="#setup" id="nav-setup">Quick Start</a>
        <a href="#recruiter" id="nav-recruiter">Vacancy Match</a>
        <a href="#reference" id="nav-reference">Tools &amp; Resources</a>
        <a href="${aiChatUrl}" id="nav-ai-chat">Live AI Chat</a>
      </nav>

      <div class="header-actions">
        <div class="lang-switch" role="group" aria-label="Language">
          <button type="button" class="lang-btn active" id="btn-lang-en" data-lang="en">EN</button>
          <button type="button" class="lang-btn" id="btn-lang-es" data-lang="es">ES</button>
        </div>
        <a href="${portfolioUrl}" class="portfolio-cta" id="nav-back">Portfolio</a>
      </div>
    </div>
  </header>

  <main>
    <!-- Hero & Signature Space Black Endpoint Console -->
    <section class="hero-section">
      <div class="container">
        <h1 class="hero-title" id="hero-title">Santiago Olayo MCP</h1>
        <p class="hero-subtitle" id="hero-subtitle"></p>

        <div class="endpoint-dock">
          <div class="dock-header">
            <div class="window-lights" aria-hidden="true">
              <span class="light-dot"></span>
              <span class="light-dot"></span>
              <span class="light-dot"></span>
            </div>
            <span class="live-pill">
              <span class="live-dot" aria-hidden="true"></span>
              <span id="hero-status">Operational · Streamable HTTP (${edgeColo}) · v${version}</span>
            </span>
          </div>

          <span class="dock-caption" id="dock-caption"></span>
          <div class="dock-url-row">
            <code class="dock-url" id="mcp-endpoint-code">${mcpEndpoint}</code>
            <button type="button" class="dock-copy-btn" id="btn-copy-endpoint">
              <span id="btn-copy-endpoint-label">Copy URL</span>
            </button>
          </div>
          <ul class="spec-badges" id="spec-badges"></ul>
        </div>
      </div>
    </section>

    <!-- 01. Quick Start Client Setup -->
    <section class="section-stone" id="setup">
      <div class="container">
        <div class="section-header">
          <p class="eyebrow" id="setup-eyebrow"></p>
          <h2 class="headline" id="setup-headline"></h2>
          <p class="description" id="setup-description"></p>
        </div>

        <div class="client-setup-card">
          <div class="client-tabs" id="client-tabs" role="tablist"></div>

          <div class="client-panel">
            <div class="client-meta-bar">
              <div class="client-meta-left">
                <code class="client-filename" id="client-filename"></code>
                <span class="client-badge" id="client-badge"></span>
              </div>
              <button type="button" class="dark-pill-btn" id="btn-copy-snippet">
                <span id="btn-copy-snippet-label">Copy Snippet</span>
              </button>
            </div>

            <ol class="client-steps" id="client-steps"></ol>
            <pre class="code-block"><code id="client-snippet"></code></pre>
          </div>
        </div>
      </div>
    </section>

    <!-- 02. Recruiter Natural Prompts + Live Simulator -->
    <section class="section-white" id="recruiter">
      <div class="container">
        <div class="section-header">
          <p class="eyebrow" id="rec-eyebrow"></p>
          <h2 class="headline" id="rec-headline"></h2>
          <p class="description" id="rec-description"></p>
        </div>

        <div class="recruiter-split">
          <article class="prompt-card">
            <div class="card-header-row">
              <div>
                <h3 class="card-title" id="prompt-card-title"></h3>
                <p class="card-subtext" id="prompt-card-subtitle"></p>
              </div>
              <button type="button" class="dark-pill-btn" id="btn-copy-prompt">
                <span id="btn-copy-prompt-label">Copy Prompt</span>
              </button>
            </div>

            <div class="prompt-tabs" id="prompt-tabs" role="tablist"></div>
            <pre class="prompt-pre"><code id="prompt-code"></code></pre>
          </article>

          <article class="simulator-card">
            <div>
              <h3 class="card-title" id="sim-title"></h3>
              <p class="card-subtext" id="sim-subtitle"></p>
            </div>

            <div>
              <span class="preset-label" id="sim-presets-label"></span>
              <div class="preset-buttons" id="sim-presets"></div>
            </div>

            <div class="sim-inputs">
              <input type="text" class="sim-input" id="sim-role" />
              <textarea rows="3" class="sim-textarea" id="sim-jd"></textarea>
            </div>

            <div class="sim-result-box">
              <div class="sim-score-row">
                <div>
                  <span class="sim-score-caption" id="sim-score-label"></span>
                  <p class="sim-verdict" id="sim-verdict"></p>
                </div>
                <span class="sim-score-badge score-high" id="sim-score-badge">95/100</span>
              </div>
              <p class="sim-summary" id="sim-summary"></p>
              <div id="sim-matched-wrap">
                <span class="sim-group-title" id="sim-matched-title"></span>
                <ul class="sim-skill-list" id="sim-skills"></ul>
              </div>
              <div>
                <span class="sim-group-title" id="sim-gaps-title"></span>
                <div id="sim-gaps-body"></div>
              </div>
            </div>
          </article>
        </div>
      </div>
    </section>

    <!-- 03. API Reference -->
    <section class="section-stone" id="reference">
      <div class="container">
        <div class="section-header">
          <p class="eyebrow" id="ref-eyebrow"></p>
          <h2 class="headline" id="ref-headline"></h2>
          <p class="description" id="ref-description"></p>
        </div>

        <h3 class="sub-section-title" id="ref-tools-title"></h3>
        <div class="tools-grid" id="tools-grid"></div>

        <div class="dual-ref-grid">
          <div>
            <h3 class="sub-section-title" id="ref-prompts-title"></h3>
            <div class="compact-stack" id="prompts-stack"></div>
          </div>
          <div>
            <h3 class="sub-section-title" id="ref-resources-title"></h3>
            <div class="compact-stack" id="resources-stack"></div>
          </div>
        </div>
      </div>
    </section>
  </main>

  <footer class="docs-footer">
    <div class="container footer-row">
      <span>Copyright © ${currentYear} Santiago Olayo · mcp.santiago-jv.tech</span>
      <div class="footer-links">
        <a href="/" id="ft-gateway">Gateway (/)</a>
        <a href="/health" id="ft-health">Health (/health)</a>
        <a href="${aiChatUrl}">Live AI Chat</a>
        <a href="${portfolioUrl}" id="ft-portfolio">Portfolio</a>
        <a href="https://github.com/santiago-jv/santiago-jv-mcp" target="_blank" rel="noopener noreferrer" id="ft-source">GitHub</a>
      </div>
    </div>
  </footer>

  <script>
    (function () {
      const COPY = ${serializedCopy};
      const ENDPOINT = ${JSON.stringify(mcpEndpoint)};
      const EDGE_COLO = ${JSON.stringify(edgeColo)};
      const VERSION = ${JSON.stringify(version)};

      const PREVIEW_SKILLS = [
        { label: 'TypeScript (4.5y)', aliases: ['typescript', 'ts'] },
        { label: 'Node.js (4.5y)', aliases: ['node.js', 'nodejs', 'node'] },
        { label: 'NestJS (3y)', aliases: ['nestjs', 'nest.js'] },
        { label: 'Java & Spring Boot', aliases: ['java', 'spring boot', 'springboot'] },
        { label: 'Hexagonal Architecture & DDD', aliases: ['hexagonal', 'ddd', 'domain-driven', 'clean architecture', 'arquitectura hexagonal'] },
        { label: 'PostgreSQL & SQL', aliases: ['postgresql', 'postgres', 'sql', 'mysql'] },
        { label: 'MongoDB', aliases: ['mongodb', 'mongo', 'nosql'] },
        { label: 'Redis Distributed Locks', aliases: ['redis', 'locks', 'concurrency', 'concurrencia'] },
        { label: 'AWS & Serverless', aliases: ['aws', 'ecs', 'lambda', 's3', 'sqs', 'cloud functions', 'serverless'] },
        { label: 'Model Context Protocol (MCP)', aliases: ['mcp', 'model context protocol', 'ai tooling', 'llm', 'llms'] },
        { label: 'Cloudflare Workers & Edge', aliases: ['cloudflare', 'cloudflare workers', 'workers', 'edge'] },
        { label: 'Datadog Observability', aliases: ['datadog', 'apm', 'observability', 'observabilidad', 'monitoreo'] },
        { label: 'CleverTap & Metabase Analytics', aliases: ['clevertap', 'metabase', 'analytics', 'analítica', 'kpis'] },
        { label: 'Stripe, Nequi, Refácil, Retool & FCM', aliases: ['stripe', 'nequi', 'refacil', 'refácil', 'retool', 'firebase', 'fcm', 'push notifications', 'twilio', 'sendgrid', 'intercom', 'appsflyer', 'tusdatos', 'kyc', 'webhooks'] },
        { label: 'Docker & GitHub Actions CI/CD', aliases: ['docker', 'github actions', 'ci/cd', 'cicd'] },
        { label: 'End-to-End Product Ownership', aliases: ['product owner', 'stakeholders', 'scrum', 'agile', 'tech lead'] }
      ];

      const PREVIEW_GAPS = [
        {
          patterns: ['rust', 'golang'],
          en: 'Go / Rust: Core production depth is in TypeScript/Node.js/NestJS & Java/Spring Boot.',
          es: 'Go / Rust: La experiencia principal en producción es en TypeScript/Node.js/NestJS y Java/Spring Boot.'
        },
        {
          patterns: ['kubernetes', 'k8s', 'istio'],
          en: 'Kubernetes SRE: Experienced with AWS ECS, Docker & Serverless rather than bare-metal K8s administration.',
          es: 'Kubernetes SRE: Experiencia en AWS ECS, Docker y Serverless más que administración dedicada de clústeres K8s.'
        },
        {
          patterns: ['django', 'fastapi', 'pytorch'],
          en: 'Python / ML: Specializes in applied LLM/MCP integration & TypeScript/Java backends.',
          es: 'Python / ML: Especializado en integración aplicada de LLMs/MCP y backends TypeScript/Java.'
        },
        {
          patterns: ['c#', '.net', 'dotnet'],
          en: '.NET / C#: Enterprise DDD experience is in NestJS and Spring Boot.',
          es: '.NET / C#: La experiencia con DDD está en NestJS y Spring Boot.'
        }
      ];

      function escapeHtml(str) {
        return String(str)
          .replace(/&/g, '&amp;')
          .replace(/</g, '&lt;')
          .replace(/>/g, '&gt;')
          .replace(/"/g, '&quot;');
      }

      function escapeRx(v) {
        return v.replace(/[.*+?^\${}()|[\\]\\\\]/g, '\\\\$&');
      }

      function hasWord(corpus, raw) {
        if (raw === 'c#') return /(?:^|[\\s,;/()])c#(?=$|[\\s,;/().])/i.test(corpus);
        if (raw === '.net') return /(?:^|[\\s,;/()])\\.net(?=$|[\\s,;/().])/i.test(corpus);
        return new RegExp('(?:^|[^a-z0-9+#])' + escapeRx(raw) + '(?:$|[^a-z0-9+#])', 'i').test(corpus);
      }

      const params = new URLSearchParams(window.location.search);
      let locale = params.get('lang') === 'es' ? 'es' : (localStorage.getItem('santiago-mcp-lang') === 'es' ? 'es' : 'en');
      let activePromptTab = 'recruiter';
      let activeClientTab = 'claude';
      let activePresetIdx = 0;

      const elRole = document.getElementById('sim-role');
      const elJd = document.getElementById('sim-jd');

      function evaluateSim() {
        if (!elRole || !elJd) return;
        const role = elRole.value || '';
        const jd = elJd.value || '';
        const corpus = (role + '\\n' + jd).toLowerCase();

        const matched = PREVIEW_SKILLS.filter((s) => s.aliases.some((a) => hasWord(corpus, a))).map((s) => s.label);
        const gaps = PREVIEW_GAPS.filter((g) => g.patterns.some((p) => hasWord(corpus, p))).map((g) => g[locale]);

        const ym = corpus.match(/(\\d{1,2})\\s*\\+?\\s*(?:years?|yrs?|años?)/i);
        if (ym && parseInt(ym[1], 10) >= 7) {
          gaps.push(
            locale === 'es'
              ? 'La vacante menciona ' + ym[1] + '+ años; Santiago cuenta con 4.5+ años en producción.'
              : 'Role mentions ' + ym[1] + '+ years; Santiago brings 4.5+ years in production.'
          );
        }

        const onsiteElsewhere =
          (hasWord(corpus, 'on-site') || hasWord(corpus, 'onsite') || hasWord(corpus, 'presencial')) &&
          !hasWord(corpus, 'remote') &&
          !hasWord(corpus, 'remoto') &&
          !hasWord(corpus, 'barranquilla') &&
          !hasWord(corpus, 'santa marta');

        if (onsiteElsewhere) {
          gaps.push(
            locale === 'es'
              ? 'Modalidad presencial fuera de Barranquilla/Santa Marta: prioriza Remoto o Región Caribe.'
              : 'On-site outside Barranquilla/Santa Marta: prioritizes Remote or Caribbean Colombia.'
          );
        }

        let base = 52;
        if (matched.length >= 6) base = 95;
        else if (matched.length >= 4) base = 89;
        else if (matched.length >= 2) base = 80;
        else if (matched.length === 1) base = 70;

        const score = Math.max(22, Math.min(98, base - gaps.length * 14));
        const verdict =
          locale === 'es'
            ? score >= 85
              ? 'Alto Match · Recomendado para Entrevista'
              : score >= 70
                ? 'Buen Match · Base Compatible'
                : 'Match Parcial · Revisar Brechas'
            : score >= 85
              ? 'Strong Fit · Recommended to Interview'
              : score >= 70
                ? 'Good Fit · Solid Alignment'
                : 'Partial Fit · Review Stack Differences';

        const summary =
          locale === 'es'
            ? score >= 70
              ? 'Compatibilidad del ' + score + '% para ' + (role || 'esta vacante') + '. Coincidencia directa en ' + matched.length + ' áreas de producción (GoodRec / Bolsiyo).'
              : 'Compatibilidad del ' + score + '% para ' + (role || 'esta vacante') + '. Existen requisitos fuera de su stack o modalidad principal.'
            : score >= 70
              ? 'Estimated ' + score + '% match for ' + (role || 'this role') + '. Direct overlap across ' + matched.length + ' production areas (GoodRec / Bolsiyo).'
              : 'Estimated ' + score + '% match for ' + (role || 'this role') + '. Primary requirements differ from core stack or modality.';

        const copy = COPY[locale].recruiter.simulator;
        const verdEl = document.getElementById('sim-verdict');
        if (verdEl) verdEl.textContent = verdict;
        const badge = document.getElementById('sim-score-badge');
        if (badge) {
          badge.textContent = score + '/100';
          badge.className = 'sim-score-badge ' + (score >= 80 ? 'score-high' : score >= 65 ? 'score-mid' : 'score-low');
        }
        const sumEl = document.getElementById('sim-summary');
        if (sumEl) sumEl.textContent = summary;

        const matchedWrap = document.getElementById('sim-matched-wrap');
        if (matchedWrap) {
          if (matched.length > 0) {
            matchedWrap.style.display = 'block';
            const mTitle = document.getElementById('sim-matched-title');
            if (mTitle) mTitle.textContent = copy.matchedLabel + ' (' + matched.length + ')';
            const sList = document.getElementById('sim-skills');
            if (sList) {
              sList.innerHTML = matched
                .map((m) => '<li class="sim-skill-pill">' + escapeHtml(m) + '</li>')
                .join('');
            }
          } else {
            matchedWrap.style.display = 'none';
          }
        }

        const gapsTitle = document.getElementById('sim-gaps-title');
        if (gapsTitle) gapsTitle.textContent = copy.gapsLabel;
        const gapsBody = document.getElementById('sim-gaps-body');
        if (gapsBody) {
          if (gaps.length > 0) {
            gapsBody.innerHTML = '<ul class="sim-gaps-list">' + gaps.map((g) => '<li>' + escapeHtml(g) + '</li>').join('') + '</ul>';
          } else {
            gapsBody.innerHTML = '<p class="sim-no-gaps">' + escapeHtml(copy.noGapsText) + '</p>';
          }
        }
      }

      function renderPromptArea() {
        const rec = COPY[locale].recruiter;
        const tabsEl = document.getElementById('prompt-tabs');
        if (tabsEl) {
          tabsEl.innerHTML = rec.promptTabs
            .map(
              (t) =>
                '<button type="button" role="tab" class="prompt-tab-btn ' +
                (t.id === activePromptTab ? 'active' : '') +
                '" data-prompt-id="' +
                t.id +
                '">' +
                escapeHtml(t.label) +
                '</button>'
            )
            .join('');
        }

        const activeObj = rec.promptTabs.find((t) => t.id === activePromptTab) || rec.promptTabs[0];
        const pCode = document.getElementById('prompt-code');
        if (pCode) pCode.textContent = activeObj.prompt;
      }

      function renderClientArea() {
        const setup = COPY[locale].setup;
        const tabsEl = document.getElementById('client-tabs');
        if (tabsEl) {
          tabsEl.innerHTML = setup.clients
            .map(
              (c) =>
                '<button type="button" role="tab" class="client-tab-btn ' +
                (c.id === activeClientTab ? 'active' : '') +
                '" data-client-id="' +
                c.id +
                '">' +
                escapeHtml(c.label) +
                '</button>'
            )
            .join('');
        }

        const active = setup.clients.find((c) => c.id === activeClientTab) || setup.clients[0];
        const fEl = document.getElementById('client-filename');
        if (fEl) fEl.textContent = active.filename;
        const bEl = document.getElementById('client-badge');
        if (bEl) bEl.textContent = active.badge;
        const sEl = document.getElementById('client-steps');
        if (sEl) {
          sEl.innerHTML = active.steps
            .map((s, idx) => '<li><span class="client-step-idx">' + (idx + 1) + '.</span><span>' + escapeHtml(s) + '</span></li>')
            .join('');
        }
        const snipEl = document.getElementById('client-snippet');
        if (snipEl) snipEl.textContent = active.snippet;
      }

      function renderAll(resetPresetText) {
        const c = COPY[locale];
        document.documentElement.lang = locale;
        const bEn = document.getElementById('btn-lang-en');
        if (bEn) bEn.classList.toggle('active', locale === 'en');
        const bEs = document.getElementById('btn-lang-es');
        if (bEs) bEs.classList.toggle('active', locale === 'es');

        const navS = document.getElementById('nav-setup');
        if (navS) navS.textContent = c.nav.setup;
        const navR = document.getElementById('nav-recruiter');
        if (navR) navR.textContent = c.nav.recruiter;
        const navRef = document.getElementById('nav-reference');
        if (navRef) navRef.textContent = c.nav.reference;
        const navAi = document.getElementById('nav-ai-chat');
        if (navAi) navAi.textContent = c.nav.aiChat;
        const navB = document.getElementById('nav-back');
        if (navB) navB.textContent = c.nav.backPortfolio;

        const hStat = document.getElementById('hero-status');
        if (hStat) hStat.textContent = c.hero.statusPrefix + ' (' + EDGE_COLO + ') · v' + VERSION;
        const hTitle = document.getElementById('hero-title');
        if (hTitle) hTitle.textContent = c.hero.title;
        const hSub = document.getElementById('hero-subtitle');
        if (hSub) hSub.textContent = c.hero.subtitle;
        const dCap = document.getElementById('dock-caption');
        if (dCap) dCap.textContent = c.hero.endpointCaption;
        const bCopyEnd = document.getElementById('btn-copy-endpoint-label');
        if (bCopyEnd) bCopyEnd.textContent = c.hero.copyEndpoint;
        const sBadges = document.getElementById('spec-badges');
        if (sBadges) {
          sBadges.innerHTML = c.hero.specBadges
            .map((b) => '<li class="spec-badge">' + escapeHtml(b) + '</li>')
            .join('');
        }

        const sEye = document.getElementById('setup-eyebrow');
        if (sEye) sEye.textContent = c.setup.eyebrow;
        const sHead = document.getElementById('setup-headline');
        if (sHead) sHead.textContent = c.setup.headline;
        const sDesc = document.getElementById('setup-description');
        if (sDesc) sDesc.textContent = c.setup.description;
        const bSnip = document.getElementById('btn-copy-snippet-label');
        if (bSnip) bSnip.textContent = c.setup.copySnippet;
        renderClientArea();

        const rEye = document.getElementById('rec-eyebrow');
        if (rEye) rEye.textContent = c.recruiter.eyebrow;
        const rHead = document.getElementById('rec-headline');
        if (rHead) rHead.textContent = c.recruiter.headline;
        const rDesc = document.getElementById('rec-description');
        if (rDesc) rDesc.textContent = c.recruiter.description;

        const pTitle = document.getElementById('prompt-card-title');
        if (pTitle) pTitle.textContent = c.recruiter.promptCardTitle;
        const pSub = document.getElementById('prompt-card-subtitle');
        if (pSub) pSub.textContent = c.recruiter.promptCardSubtitle;
        const bPrompt = document.getElementById('btn-copy-prompt-label');
        if (bPrompt) bPrompt.textContent = c.recruiter.copyPromptBtn;
        renderPromptArea();

        const sim = c.recruiter.simulator;
        const simT = document.getElementById('sim-title');
        if (simT) simT.textContent = sim.title;
        const simSub = document.getElementById('sim-subtitle');
        if (simSub) simSub.textContent = sim.subtitle;
        const simPresLabel = document.getElementById('sim-presets-label');
        if (simPresLabel) simPresLabel.textContent = sim.presetsLabel;
        const simScLabel = document.getElementById('sim-score-label');
        if (simScLabel) simScLabel.textContent = sim.scoreLabel;
        if (elRole) elRole.placeholder = sim.rolePlaceholder;
        if (elJd) elJd.placeholder = sim.jdPlaceholder;

        const simPres = document.getElementById('sim-presets');
        if (simPres) {
          simPres.innerHTML = sim.presets
            .map(
              (p, idx) =>
                '<button type="button" class="preset-chip ' +
                (idx === activePresetIdx ? 'active' : '') +
                '" data-preset-idx="' +
                idx +
                '">' +
                escapeHtml(p.label) +
                '</button>'
            )
            .join('');
        }

        if (resetPresetText && elRole && elJd) {
          const preset = sim.presets[activePresetIdx] || sim.presets[0];
          elRole.value = preset.role;
          elJd.value = preset.jd;
        }
        evaluateSim();

        const ref = c.reference;
        const rToolT = document.getElementById('ref-tools-title');
        if (rToolT) rToolT.textContent = ref.toolsTitle;
        const rPrompT = document.getElementById('ref-prompts-title');
        if (rPrompT) rPrompT.textContent = ref.promptsTitle;
        const rResT = document.getElementById('ref-resources-title');
        if (rResT) rResT.textContent = ref.resourcesTitle;
        const refEye = document.getElementById('ref-eyebrow');
        if (refEye) refEye.textContent = ref.eyebrow;
        const refHead = document.getElementById('ref-headline');
        if (refHead) refHead.textContent = ref.headline;
        const refDesc = document.getElementById('ref-description');
        if (refDesc) refDesc.textContent = ref.description;

        const tGrid = document.getElementById('tools-grid');
        if (tGrid) {
          tGrid.innerHTML = ref.tools
            .map(
              (t) =>
                '<article class="tool-doc-card"><div class="tool-doc-header"><code class="tool-doc-name">' +
                escapeHtml(t.name) +
                '</code><span class="tool-doc-badge">' +
                escapeHtml(t.badge) +
                '</span></div><p class="tool-doc-summary">' +
                escapeHtml(t.summary) +
                '</p><ul class="param-list">' +
                t.params
                  .map(
                    (p) =>
                      '<li><div class="param-top"><code class="param-name">' +
                      escapeHtml(p.name) +
                      '</code><span class="param-type">' +
                      escapeHtml(p.type) +
                      '</span><span class="' +
                      (p.required ? 'param-req' : 'param-opt') +
                      '">' +
                      escapeHtml(p.required ? ref.requiredBadge : ref.optionalBadge) +
                      '</span></div><p class="param-desc">' +
                      escapeHtml(p.description) +
                      '</p></li>'
                  )
                  .join('') +
                '</ul></article>'
            )
            .join('');
        }

        const pStack = document.getElementById('prompts-stack');
        if (pStack) {
          pStack.innerHTML = ref.prompts
            .map(
              (pr) =>
                '<article class="compact-ref-card"><div class="compact-ref-top"><code class="tool-doc-name">' +
                escapeHtml(pr.name) +
                '</code><span class="param-type">(' +
                escapeHtml(pr.args) +
                ')</span></div><p class="param-desc">' +
                escapeHtml(pr.description) +
                '</p></article>'
            )
            .join('');
        }

        const resStack = document.getElementById('resources-stack');
        if (resStack) {
          resStack.innerHTML = ref.resources
            .map(
              (r) =>
                '<article class="compact-ref-card"><div class="compact-ref-top"><code class="resource-uri">' +
                escapeHtml(r.uri) +
                '</code><span class="param-type">' +
                escapeHtml(r.mimeType) +
                '</span></div><p class="param-desc">' +
                escapeHtml(r.description) +
                '</p></article>'
            )
            .join('');
        }

        const ftG = document.getElementById('ft-gateway');
        if (ftG) ftG.textContent = c.footer.gateway;
        const ftH = document.getElementById('ft-health');
        if (ftH) ftH.textContent = c.footer.health;
        const ftP = document.getElementById('ft-portfolio');
        if (ftP) ftP.textContent = c.footer.portfolio;
        const ftS = document.getElementById('ft-source');
        if (ftS) ftS.textContent = c.footer.source;
      }

      function flashCopied(labelEl, normalText) {
        if (!labelEl) return;
        labelEl.textContent = COPY[locale].hero.copied;
        setTimeout(function () {
          labelEl.textContent = normalText();
        }, 1800);
      }

      const bCopyEnd = document.getElementById('btn-copy-endpoint');
      if (bCopyEnd) {
        bCopyEnd.addEventListener('click', function () {
          navigator.clipboard.writeText(ENDPOINT).then(function () {
            flashCopied(document.getElementById('btn-copy-endpoint-label'), function () {
              return COPY[locale].hero.copyEndpoint;
            });
          });
        });
      }

      const bCopyPrompt = document.getElementById('btn-copy-prompt');
      if (bCopyPrompt) {
        bCopyPrompt.addEventListener('click', function () {
          const rec = COPY[locale].recruiter;
          const activeObj = rec.promptTabs.find((t) => t.id === activePromptTab) || rec.promptTabs[0];
          navigator.clipboard.writeText(activeObj.prompt).then(function () {
            flashCopied(document.getElementById('btn-copy-prompt-label'), function () {
              return COPY[locale].recruiter.copyPromptBtn;
            });
          });
        });
      }

      const bCopySnip = document.getElementById('btn-copy-snippet');
      if (bCopySnip) {
        bCopySnip.addEventListener('click', function () {
          const setup = COPY[locale].setup;
          const active = setup.clients.find((c) => c.id === activeClientTab) || setup.clients[0];
          navigator.clipboard.writeText(active.snippet).then(function () {
            flashCopied(document.getElementById('btn-copy-snippet-label'), function () {
              return COPY[locale].setup.copySnippet;
            });
          });
        });
      }

      const pTabs = document.getElementById('prompt-tabs');
      if (pTabs) {
        pTabs.addEventListener('click', function (e) {
          const btn = e.target.closest('[data-prompt-id]');
          if (!btn) return;
          activePromptTab = btn.getAttribute('data-prompt-id');
          renderPromptArea();
        });
      }

      const cTabs = document.getElementById('client-tabs');
      if (cTabs) {
        cTabs.addEventListener('click', function (e) {
          const btn = e.target.closest('[data-client-id]');
          if (!btn) return;
          activeClientTab = btn.getAttribute('data-client-id');
          renderClientArea();
        });
      }

      const sPres = document.getElementById('sim-presets');
      if (sPres) {
        sPres.addEventListener('click', function (e) {
          const btn = e.target.closest('[data-preset-idx]');
          if (!btn) return;
          activePresetIdx = parseInt(btn.getAttribute('data-preset-idx'), 10) || 0;
          const preset = COPY[locale].recruiter.simulator.presets[activePresetIdx];
          if (preset && elRole && elJd) {
            elRole.value = preset.role;
            elJd.value = preset.jd;
          }
          renderAll(false);
        });
      }

      if (elRole) elRole.addEventListener('input', evaluateSim);
      if (elJd) elJd.addEventListener('input', evaluateSim);

      document.querySelectorAll('[data-lang]').forEach(function (btn) {
        btn.addEventListener('click', function () {
          const next = btn.getAttribute('data-lang');
          if (next === 'en' || next === 'es') {
            locale = next;
            localStorage.setItem('santiago-mcp-lang', next);
            renderAll(true);
          }
        });
      });

      renderAll(true);
    })();
  </script>
</body>
</html>`;
}
