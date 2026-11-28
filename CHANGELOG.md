# Changelog

All notable changes to `santiago-jv-mcp` (`https://mcp.santiago-jv.tech`) are documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/), and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.0.3] - 2026-11-28

### Bug Fixes

- fix(security): add Content-Security-Policy header to Cloudflare Worker responses (`9e2decd`)
## [1.0.2] - 2026-11-27

### Documentation & Maintenance

- docs(profile): update experience to 5+ years and refine GoodRec role metadata (`2e53cad`)
## [1.0.1] - 2026-11-25

### Bug Fixes

- fix(ci): enable automated tag releases and changelog generation (`dcc4ff7`)
## [1.0.0] - 2026-11-24

### Features

- Launch public read-only Model Context Protocol (MCP) edge server on Cloudflare Workers with Streamable HTTP and deterministic recruiter vacancy matcher (`fc37344`).
- Serve interactive bilingual (EN/ES) MCP documentation and live vacancy simulator on `/docs` (`b850efa`, `d651bb9`).
- Migrate MCP gateway and docs to Astro + `@astrojs/cloudflare` with Hexagonal guardrails, SEO schemas, and expanded test suite (`28d560b`, `6a69570`).
- Consume centralized Neon Postgres `site_config` remote configuration in MCP tools and resources (`7932b19`, `31ae41b`).
- Adopt Chrome Modern Web Guidance standards (roving `tabindex` tablists, reduced-motion-safe smooth scrolling, `content-visibility: auto`, accessible simulator labels, CSP-safe listeners, and high-contrast `:focus-visible`) and add `AGENTS.md` UI precedence rules (`6cb1ee6`).

### Bug Fixes

- Adopt declarative `AbortSignal.timeout()` in remote-config fetcher per Modern Web Guidance `legacy-scan` (`57f659a`).
- Read Worker env from `cloudflare:workers` for Astro 7 compatibility and bind Cloudflare `ASSETS` (`bdea57a`, `b110719`).
- Clarify Stripe exclusively at GoodRec and Transfiya/Nequi APIs at Bolsiyo in `profile.ts` (`851293c`).

### Documentation & Maintenance

- Upgrade to Astro 7, `@astrojs/cloudflare` 14, and Zod 4 with zero `npm audit` vulnerabilities (`8675395`).
- Update X/Twitter handle and meta tags to `@santiagojvtech` and synchronize `README.md` (`f554213`, `2fd6127`).
