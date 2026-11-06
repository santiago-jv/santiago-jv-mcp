# santiago-jv-mcp (`mcp.santiago-jv.tech`)

Public, stateless **Model Context Protocol (MCP)** server for **Santiago Olayo Villamil**, running at the edge on **Cloudflare Workers** over **Streamable HTTP**.

- **Live MCP Endpoint:** `https://mcp.santiago-jv.tech/mcp`
- **Documentation & Recruiter Guide:** `https://www.santiago-jv.tech/mcp`
- **Health Check:** `https://mcp.santiago-jv.tech/health`

## Exposed Capabilities

### Tools
1. `get_profile_overview` — Bio, headline, location, languages, education, and resume PDFs (`en` / `es`).
2. `get_work_experience` — Production experience at GoodRec, Bolsiyo, and previous teams.
3. `get_tech_stack_and_architecture` — Categorized skill matrix + Hexagonal/DDD/Cloud/AI architecture blueprint.
4. `get_social_and_contact_links` — Verified links (LinkedIn, GitHub, X, Medium, email, PDF resumes).
5. `evaluate_vacancy_match` — **Recruiter & Hiring Manager tool**: scores job descriptions (0–100) with matched production evidence, differentiators, and transparent stack gaps.
6. `prepare_outreach_context` — Generates an ATS candidate card and tailored interview invite template.

### Resources
- `santiago://profile/resume-en`
- `santiago://profile/resume-es`
- `santiago://profile/architecture-blueprint`
- `santiago://profile/contact-card`

### Prompts
- `evaluate_candidate_fit`
- `technical_deep_dive`
- `quick_intro`

## Local Development

```bash
npm install
npm run typecheck
npm test
npm run dev
```

## Automated CI/CD

Pushes to `main` automatically run strict TypeScript typechecking, execute the MCP protocol test suite, and deploy to Cloudflare Workers (`mcp.santiago-jv.tech`) via `.github/workflows/deploy.yml`.
