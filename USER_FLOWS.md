# Unify AI — User Flow Documentation (Derived from the Application Mockup)

**Source of truth for this document:** the interactive mockup shipped in this repo (`index.html` + `app.bundle.js`, built from the readable source in `src/`). Every flow below was traced through `src/router.js`, `src/main.js`, `src/state/store.js`, `src/components/*`, and `src/pages/**/*.js` — not inferred from the written specs. It is cross-referenced against:

- `e2e_mvp_task_spec.md` — *End-to-End MVP Task & Technical Engineering Specification* ("the end-to-end specifications")
- `requirements.md` — *UI Pages & Navigation Specification* (the page-by-page UX spec the mockup was built against)
- `business_requirements.md` / `architecture.md` — supporting context

Gaps found during validation are **not** listed here — see the companion file **`FLOW_VALIDATION_GAPS.md`**.

---

## 1. Application Shell & Cross-Cutting Flows

These flows are available from (almost) every screen, via `src/components/shell.js`, `topbar.js`, `sidebar.js`, `aiAssistant.js`, `globalSearch.js`.

### 1.1 Authentication Flow
| Step | Route | Behavior |
|---|---|---|
| Sign in | `#/login` | Email/password form, "Remember session" checkbox, 3 SSO buttons (Okta / Azure AD / Google), 4 **quick persona login** presets (Data Architect, Data Steward, Business Analyst, Administrator) |
| Register | `#/register` | Name, email, role, organization → creates a session and provisions a "tenant" (mock) |
| Forgot password | `#/forgot-password` | Email submission reveals a success banner (no real reset) |
| Sign out | topbar → "Sign Out" | Clears `store.state.isAuthenticated`, redirects to `#/login` |

All auth actions are client-only (`store.login()` / `store.logout()`); any submitted credentials are accepted.

### 1.2 Global Navigation Shell
- **Sidebar** (`sidebar.js`): 11 collapsible groups (Overview, Architecture & Docs, Data Foundation, Data Quality, Unification, Stewardship, Entity 360, Governance, Activation, Operations, Administration) covering **45 routes**. Active route is highlighted; first 5 groups stay expanded by default.
- **Topbar** (`topbar.js`): environment pill (read-only), global search trigger, **persona switcher** dropdown, link to the Docs Portal, "Ask Unify AI" trigger, "Journey Step N →" quick-advance button, user avatar + sign-out.

### 1.3 Global Search Flow
- Trigger: `Ctrl/Cmd+K` or the search button → opens a modal (`globalSearch.js`).
- Typing calls `repository.searchGlobal()` (client-side mock lookup across sources, entities, rules) and renders clickable results that route directly to the matching page.
- `Esc` closes it.

### 1.4 Global AI Copilot Flow
- Trigger: "Ask Unify AI" button → slides in the AI drawer (`aiAssistant.js`).
- Canned quick-prompts ("Why did accounts merge?", "Show duplicate accounts", "Find DQ issues") plus a free-text box.
- `repository.askAI()` pattern-matches the question (keywords: merge/account, duplicate, strategy/threshold, DQ/quality) and returns a canned Markdown answer tagged with a governance badge (`SYSTEM FACT` / `AI RECOMMENDATION`) plus **deep links** into the relevant pages (Entity 360, Match Review, Lineage, Stewardship Queue, etc.).

### 1.5 Guided "Golden Journey" Flow
- A persistent widget in the sidebar footer and a banner (`#journey-banner`) drive a **16-step scripted walkthrough** (`goldenJourneySteps` in `state/store.js`):
  1. Overview Dashboard → 2. Enterprise Sources → 3. Connect Salesforce (wizard) → 4. Source Details → 5. Data Discovery → 6. AI Schema Mapping → 7. Data Profiles → 8. Data Quality Rules → 9. Match Strategies → 10. Strategy Designer → 11. Match Simulation → 12. Match Results → 13. Steward Review → 14. Golden Records → 15. Entity 360 → 16. Data Lineage.
- "Next →" / "← Prev" buttons (sidebar widget or topbar button) call `store.nextJourneyStep()`/`prevJourneyStep()`, which navigate the router and update a progress bar. Navigating manually to a journey route also auto-syncs the step counter.

---

## 2. Primary Flow: Connect → Discover → Map → Quality → Match → Resolve → Master → Govern

This is the flow the mockup is built to demonstrate end-to-end (it corresponds to the 16-step Golden Journey above). Two steps are themselves multi-step wizards, detailed below.

### 2.1 Source Onboarding
1. **Sources** (`#/data-foundation/sources`) — list of connected sources (badge count "4"), zero-copy vs. materialized indicators, "Add Source" CTA.
2. **Add Source — 7-Step Wizard** (`#/data-foundation/sources/new`):
   | Step | Content |
   |---|---|
   | 1. Source Type | Card grid of 8 connectors (Salesforce, Databricks, Snowflake, PostgreSQL, SAP, Oracle, Reltio, REST); Salesforce pre-selected as "Demo Target" |
   | 2. Connection | OAuth/JWT credential form (instance URL, auth method, client ID, API version) |
   | 3. Access Mode | Radio choice: Zero-Copy Virtualization (recommended) / Selective Materialization / Streaming CDC |
   | 4. Objects | Checklist of Salesforce objects with record counts (Account, Contact, Opportunity, Lead, Case, custom object) |
   | 5. Test | Static "connection health" checklist (DNS/TLS, OAuth exchange, pushdown check, API quota) — always green |
   | 6. Discovery | AI-detected canonical domain summary ("Canonical Customer Entity", 98.4% semantic match) |
   | 7. Finish | Activation summary table + "Activate Connection ✓" button |
   Navigation: stepper is clickable directly, plus Prev/Next buttons (`unifyWizPrev/Next`, `unifySetWizardStep`). Finishing shows an `alert()` and redirects to Source Details.
3. **Source Details** (`#/data-foundation/sources/:sourceId`) — per-source object list, schema, latency/throughput stats.

### 2.2 Discovery & Mapping
4. **Data Discovery** (`#/data-foundation/discovery`) — AI-surfaced candidate entities, PII flags, duplicate-cluster estimates; "Run Discovery Scan" action (illustrative).
5. **Schema Mapping Studio** (`#/data-foundation/mappings`) — 3-column mapping table (source field → AI confidence & reasoning → canonical field) with a governance-state badge per row (`AI RECOMMENDATION` vs `USER DECISION`). Real, stateful actions:
   - **Accept** a single mapping (`unifyAcceptMapping`) or **Reset** it back to the AI recommendation (`unifyResetMapping`).
   - **Accept All High Confidence** (`unifyAcceptAllMappings`) — bulk-accepts every mapping ≥95% confidence.
   - **Ask AI Why?** opens the AI drawer with a canned explanation.
   These calls persist through `repository.updateMappingDecision()` / `acceptAllHighConfidence()` against in-memory mock data and re-render the table.
6. **Data Profiles** (`#/data-foundation/profiles`) — completeness/uniqueness/null-rate statistics per attribute, link onward to Data Quality.

### 2.3 Data Quality
7. **DQ Overview** (`#/data-quality`) — quality score, rule execution summary, links to Rules/Issues.
8. **DQ Rules** (`#/data-quality/rules`) — list of active rules; **Rule Designer** (`#/data-quality/rules/new`) lets a user write a name/condition or click **"Generate with AI"** (`unifyGenerateRuleAI`, which fills the form with a canned rule) then "Validate & Publish" (`alert()` only).
9. **DQ Issues** (`#/data-quality/issues`) — quarantined-record triage list; **Resolve** action (`unifyResolveIssue` → `repository.resolveDQIssue`) is a real, stateful decision that updates issue status and re-renders.

### 2.4 Entity Resolution (Unification)
10. **Unification Overview** (`#/unification`) — KPI summary, "Run Full Unification" CTA (illustrative), links to Strategies/Results/Stewardship.
11. **Match Strategies** (`#/unification/match-strategies`) — list of saved strategies; **Strategy Designer** (`#/unification/match-strategies/new`) — single-page form (weighted attribute matrix + 3-tier decision-threshold bars: Auto Match ≥95%, Steward Review 85–94.9%, No Match <85%) with "Save as Draft" (`alert()`) and "Run Simulation Benchmark →".
12. **Match Simulation** (`#/unification/simulations/:simulationId`) — benchmark comparison (accuracy, false-positive rate) between strategy versions, with a "Publish to active execution pipeline" action (`alert()` only).
13. **Match Results** (`#/unification/matches`) — table of every evaluated candidate pair; clicking a row routes to Match Review.

### 2.5 Stewardship (Human-in-the-loop Review)
14. **Review Queue** (`#/stewardship`) — prioritized list of ambiguous match pairs (badge "1,284"), each row deep-links to Match Review.
15. **Match Review** (`#/stewardship/reviews/:matchId`) — side-by-side attribute comparison of the two source records plus a scoring-contribution breakdown table. Real, stateful decisions:
    - **Approve Merge & Create Golden Entity** / **Reject Merge** (`unifyRecordMatchDecision` → `repository.updateMatchDecision`), which flips the match status and shows a "USER DECISION CERTIFIED" banner attributed to the acting steward.
    - **Investigate** opens a canned ticket-created alert.
16. **Decisions Log** (`#/stewardship/decisions`) — reuses the Audit Trail page as an immutable record of steward actions.

### 2.6 Mastering & Entity 360
17. **Golden Entities** (`#/unification/golden-entities`) — master catalog of resolved records (badge "18.2M").
18. **Entity Search** (`#/entity-360/search`) — lookup across golden IDs, source-system IDs, and contact identifiers.
19. **Entity 360 Profile** (`#/entity-360/:entityId`) — header (name, golden ID, confidence, contributing-source count) + 4 tabs:
    - *Attributes & Survivorship* — canonical value, winning source, confidence, last-updated, click-through to Lineage.
    - *Source Lineage* — per-contributing-source card with "Inspect Match Score" and "Request Unmerge" (canned alert) actions.
    - *Identity Graph* — preview card linking out to the full graph canvas.
    - *Audit History* — chronological survivorship/merge timeline.
20. **Identity Graph** (`#/entity-360/:entityId/graph`) — interactive node/edge canvas (Golden Entity ↔ source records ↔ organizations/households); zoom/center/filter controls are canned alerts that describe what a real graph interaction would show.
21. **Entity History** (`#/entity-360/:entityId/history`) — dedicated timeline page (attribute changes, merges).

### 2.7 Governance
22. **Data Lineage** (`#/governance/lineage`) — end-to-end DAG from raw source → standardization → matching → survivorship → golden entity → downstream APIs; "Recalculate lineage" is a canned alert.
23. **Audit Trail** (`#/governance/audit`) — immutable log of steward decisions and automated merges.
24. **Reference Data** (`#/governance/reference-data`) — code lists / taxonomies browser.
25. **Policies** (`#/governance/policies`) — currently reuses the DQ Rules page component.

---

## 3. Activation Flows (Downstream Consumption)

| Page | Route | Purpose |
|---|---|---|
| Activation Overview | `#/activation` | Summary of APIs, event streams, and data products exposed downstream |
| APIs | `#/activation/apis` | List of golden-record REST/GraphQL endpoints; "View Swagger docs" (canned alert) |
| Event Streams | `#/activation/events` | Kafka/EventBridge/Pub-Sub topic catalog; "View sample payload" (canned alert) |
| Data Products | `#/activation/data-products` | Certified, contract-tested data product catalog |
| Destinations | `#/activation/destinations` | Read-only table of reverse-ETL/data-share destinations (Snowflake, Salesforce, Braze, Kafka) and sync health |

## 4. Operations Flows

| Page | Route | Purpose |
|---|---|---|
| Jobs | `#/operations/jobs` | Pipeline/CDC/batch job list, status badges; row click → Job Details |
| Job Details | `#/operations/jobs/:jobId` | Run history, logs summary for a single job |
| System Health | `#/operations/health` | Service-level telemetry across federation workers, AI providers, streaming brokers |

## 5. Administration Flows

| Page | Route | Purpose |
|---|---|---|
| Domains | `#/admin/domains` | Enterprise master-domain definitions and partition policy |
| Entity Models | `#/admin/entity-models` | Canonical customer ontology tree |
| Users & Roles | `#/admin/users` | RBAC user list; "Edit permissions" (canned alert) |
| AI Providers | `#/admin/ai-providers` | LLM/foundation-model configuration; "Health check" (canned alert with fake latency) |
| Settings | `#/admin/settings` | Auto-match thresholds, audit retention, AI quota configuration; "Save" (canned alert) |

## 6. Documentation Portal Flow

`#/docs` (and `#/docs?tab=...`) is a **separate, tabbed micro-app** (`docsPortal.js`) aimed at technical/architect users, reachable from the topbar "Docs" link and several sidebar deep links:

- **Overview** — architecture blueprint (Mermaid-style SVG diagram of the whole system).
- **TypeScript Services** (`microservices`) — the 8 backend microservices, their ports, and REST contracts from `e2e_mvp_task_spec.md`.
- **Lakebase Metastore** (`lakebase`) — `system.unify_lakebase` schema viewer.
- **Layer Spawner** (`layers`) — an **embedded interactive simulator**: pick a layer tier (`v_bronze`/`silver`/`gold_master`/`sandbox`) and see the generated DDL preview update live.
- **Automated Pipelines** (`pipelines`) — shows a synthesized `databricks.yml` (DAB) and DLT Python script.
- **Databricks Genie** (`genie`) — an **embedded interactive simulator**: type a natural-language question, click "Ask Genie ✦", and see a canned pushdown SQL query + a "0 bytes materialized" status line appear.
- **Mastering** (`mastering`) — Fellegi-Sunter/Splink matching explainer.
- **MVP Spec** (`mvp_spec`) — renders the Epic/Sprint roadmap from `e2e_mvp_task_spec.md` directly in-app.

---

## 7. Flow Interactivity Classification

To set expectations correctly when validating against the specs, every flow above falls into one of two buckets:

| Type | Meaning | Examples |
|---|---|---|
| **Stateful** (updates in-memory mock data via `repository.js` and re-renders) | Genuinely mutates the mock model | Schema Mapping accept/reset/accept-all, DQ Issue resolve, Match Review approve/reject, persona switch, journey step navigation, AI chat, global search, wizard step navigation |
| **Illustrative** (`alert()` popup only, no state change) | Demonstrates *what would happen* without persisting it | Add Source "Activate Connection", Strategy Designer "Save as Draft"/"Publish", DQ Rule Designer "Validate & Publish", "Run Discovery Scan", "Run Full Unification", Identity Graph zoom/filter/focus, Users "Edit permissions", AI Provider health check, Settings save, Lineage recalculate |

This distinction matters for the gap analysis in `FLOW_VALIDATION_GAPS.md`: several "Illustrative" flows sit exactly where the end-to-end spec expects a real, wired operation.
