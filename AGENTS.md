# Repository Guidelines (`santiago-jv-mcp`)

## UI Templates and Modern Web Guidance

When modifying the edge HTML interfaces (`src/ui/gateway-page.ts` and `src/ui/docs-page.ts`), follow this strict order of precedence:

1. **Prioritize internal Edge UI primitives and zero-bundle architecture**:
   - Keep `gateway-page.ts` (`/`) and `docs-page.ts` (`/docs`) as self-contained, zero-framework Cloudflare Workers HTML renderers using the Apple Daylight & Anodized Space Black design tokens (`--bg-white`, `--bg-stone`, `--accent`, `.endpoint-dock`, `.pro-card`).
   - Preserve bilingual parity (`en` / `es`) in `src/data/docs-content.ts` and `src/data/profile.ts`.

2. **Use Modern Web Guidance for native browser capabilities**:
   - **Reduced-motion safety**: Never set `scroll-behavior: smooth` unconditionally on `html`; always scope it inside `@media (prefers-reduced-motion: no-preference)`.
   - **Roving `tabindex` tablists**: Every `role="tablist"` (`#client-tabs`, `#prompt-tabs`) must maintain a single tab stop (`tabindex="0"` on active tab, `tabindex="-1"` on inactive tabs), ArrowLeft/ArrowRight/Home/End keyboard navigation, `aria-selected`, and `role="tabpanel"` associations.
   - **Offscreen rendering isolation**: Keep `content-visibility: auto` and `contain-intrinsic-size` on below-the-fold documentation sections (`#setup`, `#recruiter`, `#reference`).
   - **Accessible forms & live regions**: Ensure simulator inputs (`#sim-role`, `#sim-jd`) have associated `<label>` elements, `.sim-result-box` uses `aria-live="polite"`, and `:focus-visible` outlines maintain `>= 3:1` contrast on both light surfaces and dark `.pro-card` / `.endpoint-dock` containers.
   - **CSP readiness**: Avoid inline `onclick` HTML attributes; bind events cleanly in `<script>` blocks.

3. **Prioritize existing protocol & copy rules when guidance conflicts**:
   - Never introduce AI em-dashes (`—`) in `profile.ts` or `docs-content.ts` (enforced by unit tests).
   - Verify all changes with `npm run typecheck`, `npm test`, and `npm run build`.
