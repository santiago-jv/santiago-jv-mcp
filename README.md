# santiago-jv-mcp (`mcp.santiago-jv.tech`)

Public, stateless **Model Context Protocol (MCP)** server for **Santiago Olayo Villamil**, running at the edge on **Cloudflare Workers** over **Streamable HTTP** (`2025-03-26` specification) and powered by **Astro 5 SSR**.

- **Live MCP Endpoint:** `https://mcp.santiago-jv.tech/mcp` (also supports `POST /` as a zero-friction root alias)
- **Interactive Documentation & Recruiter Guide:** `https://mcp.santiago-jv.tech/docs`
- **Gateway Landing Page:** `https://mcp.santiago-jv.tech/`
- **Health & Discovery Endpoint:** `https://mcp.santiago-jv.tech/health` (`/status` alias)
- **Portfolio Website:** `https://www.santiago-jv.tech`

---

## Architecture (Hexagonal / Ports & Adapters)

This project follows **Hexagonal Architecture (Ports & Adapters)** and **Clean Code** principles to keep business rules and candidate scoring pure, deterministic, and independent from HTTP/MCP transport adapters:

```text
src/
├── domain/
│   └── vacancy-matcher.ts       # Pure deterministic domain engine (0-100 job fit scoring, stack overlap, seniority & modality rules)
├── data/
│   ├── profile.ts               # Canonical bilingual domain data (Identity, Work Experience, Skill Matrix, Architecture Blueprint)
│   └── docs-content.ts          # Bilingual documentation & client setup repository (EN / ES)
├── mcp/
│   ├── create-server.ts         # Application Factory: registers 6 read-only tools, 4 resources, and 3 natural-language prompts
│   └── handler.ts               # Transport Adapter: WebStandardStreamableHTTPServerTransport & health check controller
├── security/
│   └── guardrails.ts            # Infrastructure Guardrails: per-IP sliding-window rate limiter, 32 KB payload cap, CORS & security headers
├── pages/
│   ├── index.astro              # Astro SSR Gateway Landing Page (with WebAPI JSON-LD & OpenGraph metadata)
│   ├── docs.astro               # Astro SSR Interactive Documentation & Vacancy Simulator (with TechArticle JSON-LD & hreflang)
│   ├── mcp.ts                   # Astro SSR route adapter for /mcp
│   ├── health.ts                # Astro SSR route adapter for /health
│   └── status.ts                # Astro SSR route adapter for /status
├── ui/
│   ├── gateway-page.ts          # Lightweight HTML renderer for direct Worker test harness
│   └── docs-page.ts             # Lightweight Docs renderer for direct Worker test harness
├── middleware.ts                # Global CORS preflight & root POST / MCP alias middleware
└── index.ts                     # Standalone Cloudflare Worker entry point for fast integration testing
```

### Design Patterns Applied
- **Hexagonal / Ports & Adapters:** `src/domain/vacancy-matcher.ts` has zero dependency on Cloudflare Workers, Astro, or HTTP headers. It is invoked by the MCP tool adapter (`src/mcp/create-server.ts`) and tested directly.
- **Factory Pattern:** `createSantiagoMcpServer(version)` instantiates an isolated, stateless `McpServer` per request with `CfWorkerJsonSchemaValidator` to prevent cross-request state leakage on edge isolates.
- **Guard / Decorator Pattern:** `src/security/guardrails.ts` centralizes client IP extraction (`extractClientIp`), environment config resolution (`resolveEdgeConfig`), per-IP rate limiting (`checkEdgeRateLimit`), payload size enforcement (`MAX_REQUEST_BODY_BYTES = 32 KB`), and response header decoration (`withStandardHeaders`).

---

## Exposed MCP Capabilities

### Auto-Discovered Read-Only Tools (6)
1. **`evaluate_vacancy_match`** *(Recruiter Flagship)*: Scores a job description (`0–100`) against Santiago's production stack, seniority, architecture depth, and work modality, returning matched skills with evidence, key differentiators, and transparent stack or modality gaps.
2. **`get_profile_overview`**: Executive summary, headline, years of experience (`4+ years`), location/timezone (`America/Bogota UTC-5`), spoken languages, education, and resume PDF links (`en` / `es`).
3. **`get_work_experience`**: Production career history across **GoodRec**, **Bolsiyo**, and **Cooltivalo · +COTAS · SLS GROUPS**, filterable by company or engineering focus (`backend`, `ai-mcp`, `observability`, `product`).
4. **`get_tech_stack_and_architecture`**: Categorized skill matrix with years of production usage, concrete evidence, third-party integrations (Stripe, Nequi, Refácil, Tusdatos.co, Retool, Intercom, Twilio, SendGrid, Firebase FCM, AppsFlyer), and system architecture principles.
5. **`get_social_and_contact_links`**: Verified contact channels (`contact@santiago-jv.tech`, LinkedIn, GitHub, X, Medium, portfolio URL, and downloadable EN/ES PDF resumes).
6. **`prepare_outreach_context`**: Generates a structured ATS candidate summary card and a tailored interview invitation draft for a specific company and role.

### Context Resources (4)
- `santiago://profile/resume-en` (`text/markdown`)
- `santiago://profile/resume-es` (`text/markdown`)
- `santiago://profile/architecture-blueprint` (`application/json`)
- `santiago://profile/contact-card` (`application/json`)

### Server Prompts (3)
- `evaluate_candidate_fit` (`job_description`, `language?`)
- `technical_deep_dive` (`topic?`)
- `quick_intro` (`language?`)

---

## Security, SEO & Performance Guardrails

- **Zero Auth Friction + Read-Only Safety:** Exposes curated public professional data only, with `readOnlyHint: true` and `destructiveHint: false` on every tool.
- **$0 Token Abuse Exposure:** Job vacancy scoring executes deterministically at the Cloudflare edge (`<5ms`) without calling paid external LLM APIs on the server.
- **Edge Rate Limiting & Payload Caps:** Protected by an in-memory per-IP rate limiter (`45 req/min` default, configurable via `RATE_LIMIT_PER_MINUTE`) and a strict `32 KB` request body ceiling (`413 Payload Too Large`).
- **SEO & Structured Data:** Includes `<link rel="canonical">`, `hreflang` alternates (`en`, `es`, `x-default`), OpenGraph, Twitter Cards, `robots.txt`, `sitemap.xml`, and Schema.org `WebAPI` + `TechArticle` JSON-LD schemas.

---

## Local Development & Testing

```bash
# Install dependencies
npm install

# Run strict TypeScript typecheck
npm run typecheck

# Run the complete integration & domain test suite
npm test

# Build production Astro + Cloudflare Worker bundle
npm run build

# Start local development server
npm run dev
```

## Automated CI/CD

Pushes to `main` automatically run strict TypeScript typechecking, execute the full MCP protocol and domain test suite, build the Astro Cloudflare SSR bundle, and deploy to Cloudflare Workers (`mcp.santiago-jv.tech`) via `.github/workflows/deploy.yml`.
