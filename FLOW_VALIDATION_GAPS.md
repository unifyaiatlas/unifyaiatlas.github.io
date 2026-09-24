# Validation Report — Mockup User Flows vs. End-to-End Specifications

This report validates the user flows documented in `USER_FLOWS.md` (traced directly from the mockup source in `src/`) against:

- **`e2e_mvp_task_spec.md`** — the *End-to-End MVP Task & Technical Engineering Specification* (referred to below as "the E2E spec")
- **`requirements.md`** — the *UI Pages & Navigation Specification* the mockup itself claims to implement (cited as "§N" for its numbered sections)

Every finding below cites the exact file/section that creates the expectation and the exact file/line in the mockup where it is unmet. Findings are grouped by severity.

---

## A. Functional gaps — flows that look complete but don't persist their result

The mockup's data layer (`src/services/repository.js`) exposes real mutation methods, but three of the primary "create" wizards never call them. Each of these flows is the **finishing action of a Golden-Journey step**, so the primary end-to-end story silently breaks the moment a user reaches the "save" step.

1. **Add Source wizard never registers the source.**
   `src/pages/dataFoundation/addSource.js` Step 7 finish button and `src/main.js:234-244` (`unifySetWizardStep`) only run `alert('Salesforce CRM successfully connected...')` and redirect to `#/data-foundation/sources/src-salesforce` — a **hard-coded** source ID. `repository.addSource()` (`repository.js:42`) exists and is exported specifically for this, but is never imported or called from `addSource.js` or `main.js`. Connecting a *different* source type (e.g. SAP or PostgreSQL, both offered in Step 1) still redirects to the pre-baked Salesforce detail page.
   - *Spec basis:* E2E spec EPIC 3/TASK-3.1 and requirements.md §7 both describe this wizard as the mechanism that actually provisions a source.

2. **Match Strategy Designer never saves the strategy.**
   `src/pages/unification/strategyDesigner.js` — "Save as Draft" is `onclick="alert('Strategy draft saved.')"` (line 119); there is no call to `repository.saveMatchStrategy()` (`repository.js:130`), which already supports create/update. A newly designed strategy never appears on the Match Strategies list (`#/unification/match-strategies`).
   - *Spec basis:* requirements.md §18, E2E spec EPIC 7/TASK-7.2-7.3.

3. **DQ Rule Designer never publishes the rule.**
   `src/pages/dataQuality/dqDesigner.js` — "Validate & Publish" is `alert('Rule validated and published to active policy engine!')` only; `repository.addDQRule()` (`repository.js:96`) is never called, so the rule never appears on `#/data-quality/rules`.
   - *Spec basis:* requirements.md §14, E2E spec EPIC 6/TASK-6.2.

**Why this matters:** these are the three "write" moments in an otherwise read-heavy demo. A stakeholder clicking through the Golden Journey in order will never notice, because the *next* journey step is always pre-scripted with fixed mock IDs — but any deviation from the exact scripted path (try a second source, a second strategy) exposes that nothing was actually saved.

---

## B. Match Strategy Designer is not the wizard the spec defines

requirements.md §18 specifies **Match Strategy Designer** as a 6-step wizard:
```
Step 1 — Select entity
Step 2 — Select attributes
Step 3 — Configure matching method (Exact / Fuzzy / Phonetic / Probabilistic / AI-Assisted)
Step 4 — Configure weights
Step 5 — Configure thresholds (Auto Match / Review / No Match)
Step 6 — Test → [Run Simulation]
```
The sidebar (`sidebar.js`) and the Golden Journey (`state/store.js` step 10: *"6-step rule threshold tuning"*) both advertise this as a 6-step flow, matching the spec.

The actual implementation (`src/pages/unification/strategyDesigner.js`) is a **single static page**: one form with a hard-coded 4-row attribute/weight table and three fixed threshold bars. There is:
- no stepper component (contrast with `addSource.js`, which correctly implements its 7-step stepper),
- no "select entity" or "select attributes" step — the four attributes and their matching methods (Exact/Exact/AI+Fuzzy/Phonetic) are hard-coded, not user-configurable,
- no way to add/remove an attribute from the match key.

This is the clearest divergence between what the app's own navigation copy promises and what the page actually delivers.

---

## C. Entity 360 profile is missing half its specified tabs

requirements.md §25 defines **8 tabs** for the Entity 360 page: *Overview, Attributes, Sources, Relationships, Identity Graph, History, Lineage, Matches.*

`src/pages/entity360/entityProfile.js` line 54 even carries the comment `<!-- 8 Tabs (Section 25) -->`, but only **4** tab buttons are actually rendered (lines 56-59): *Attributes & Survivorship, Source Lineage, Identity Graph (a preview card, not the real canvas), Audit History.*

Missing, with no equivalent anywhere on the page:
- **Overview** tab (a dedicated summary view distinct from the header)
- **Relationships** tab (household/organization/account relationships — currently only reachable by leaving the page for the separate Identity Graph canvas)
- **Lineage** tab (the page only offers an outbound link to `#/governance/lineage`, not an inline tab)
- **Matches** tab (the pairwise match history that produced this golden record isn't shown on the entity page at all; a user must go back to the Stewardship module and know which match ID to look up)

---

## D. Golden UX Flow stops one stage short of its own definition

requirements.md §54 defines "The Golden UX Flow" as 10 stages:
```
CONNECT → DISCOVER → UNDERSTAND → STANDARDIZE → QUALITY → MATCH → RESOLVE → MASTER → GOVERN → ACTIVATE
```
and states: *"Each stage should be navigable independently, but the user should always be able to follow the complete journey."*

The mockup's only implementation of "the complete journey" is `goldenJourneySteps` in `src/state/store.js` (the sidebar "Demo Journey" widget + journey banner). Its 16 steps map cleanly onto CONNECT through GOVERN (ending at step 16, "Data Lineage") — **but never continues into ACTIVATE**, even though the Activation module (Activation Overview, APIs, Event Streams, Data Products, Destinations — 5 fully built pages) exists in the app and is reachable from the sidebar. A user who clicks "Next →" through the entire scripted journey is left at Data Lineage with the "Next" button disabled, never seeing the downstream activation/syndication half of the platform's own value proposition.

---

## E. Two E2E-spec UI deliverables exist only as documentation-portal toys, not as real workflows

The E2E spec's EPIC 10 (React Frontend) lists these as first-class UI deliverables:

- **TASK-10.2 — Interactive Dynamic Layer Spawner UI**: *"Visual interface for architects to spawn layers in Databricks: tier selection dropdown, real-time SQL DDL preview, 1-click execution... with progress timeline."*
- **TASK-10.3 — Visual Pipeline DAG Builder**: *"Canvas interface connecting Source nodes to Transformation, DQ, Match, and Golden Layer nodes... 'Compile to DABs & Deploy DLT' action button."*

Both exist in the mockup — but **only** inside the Documentation Portal (`src/pages/docs/docsPortal.js`, `renderLayerSpawnerTab()` and the `pipelines` tab), gated behind `#/docs?tab=layers` / `#/docs?tab=pipelines`. They are framed there as architecture *explainers* (a dropdown that swaps a code sample, not an action that provisions anything), not as operational tools reachable from Data Foundation, Unification, or Operations where an architect would actually use them mid-journey. There is no `#/data-foundation/layers` or `#/operations/pipelines` route, and no link from any operational page (e.g. Source Details, Unification Overview) into these capabilities.

---

## F. The "Conversational Databricks Genie Drawer" (TASK-10.5) is not what the global AI drawer implements

E2E spec **TASK-10.5** specifies: *"Interactive chat panel integrated into application header: natural language prompt input, real-time display of synthesized zero-copy pushdown SQL, execution metrics: latency, pushdown status, zero-copy verification."*

The only chat panel wired into the application header/shell is the "Ask Unify AI" drawer (`src/components/aiAssistant.js`, triggered from `topbar.js`). Per `repository.askAI()` (`repository.js:258`), it is a **keyword-matched canned Q&A bot** that returns Markdown text and page deep-links — it never shows generated SQL, pushdown status, or latency metrics for any query.

The feature that *does* match the TASK-10.5 description (NL input → generated pushdown SQL → "0 bytes materialized" status) is `renderGenieTab()` / `unifyRunSpaGenie()` inside the Docs Portal (`#/docs?tab=genie`) — a simulator embedded in documentation, not part of the always-available header drawer the spec calls for. A business user asking Genie-style questions from the main AI drawer (as `requirements.md` §4 explicitly invites: *"Ask anything about your data"*) will never see the zero-copy verification the platform's core value proposition depends on.

---

## G. Persona switching has no effect on navigation or access

requirements.md §53 defines four personas with **distinct navigation needs** (e.g., Business User → *Entity Search, Entity 360, Golden Records, Data Quality* only; Platform Administrator → *Sources, Users, Roles, AI Providers, Settings, System Health*).

The topbar persona switcher (`src/components/topbar.js:38`, calling `store.setPersona()`) is fully wired and does update `state.activePersona` — but `src/components/sidebar.js` never reads `state.activePersona` when building `navSections` (confirmed: no reference to it in the function). Switching from "Data Architect" to "Business User" leaves all 11 sidebar groups and all 45 routes visible and clickable, identically. The persona concept is cosmetic (it only changes a label in the topbar/avatar) rather than the navigation-scoping feature the spec describes.

---

## H. Persona-name inconsistency within the mockup itself

- `src/state/store.js:26` and `topbar.js:6` (matching requirements.md §53 verbatim) use: **Data Architect, Data Steward, Business User, Platform Administrator**.
- `src/pages/auth/login.js` quick-login presets (lines 81, 84) instead use **"Business Analyst"** and **"Administrator"**.

Logging in via one of those two quick-login buttons sets `state.activePersona` / `currentUser.role` to a string that doesn't match any option in the topbar's own persona `<select>`, so the dropdown falls back to no visible selection until the user manually picks a persona.

---

## I. Notification center is modeled in state but has no UI

`src/state/store.js:49-52` defines `state.notifications` (seeded with "Salesforce CDC Synchronized" and "1,284 matches pending review"). No component anywhere in `src/components/` or `src/pages/` reads `state.notifications` — there is no bell icon, badge, or dropdown in the topbar or shell. This is dead state: modeled but unreachable by any user flow.

---

## J. Displayed volumes don't match seeded mock data

Several pages/badges quote enterprise-scale figures that the underlying mock dataset can't back up, which matters because the E2E spec's own acceptance test (TASK-11.1) is stated in those terms:

- Sidebar badge "Review Queue: **1,284**" (`sidebar.js:68`) and the Golden Journey step 13 description, vs. `src/services/mockData.js`, which seeds exactly **2** match records (`match-101`, `match-102`).
- E2E spec TASK-11.1 step 5 expects *"Data steward reviews 15 borderline matches in review queue"* — the mockup's Review Queue can only ever show the 2 seeded pairs, so this acceptance scenario cannot actually be walked end-to-end in the current mock data.

This is a minor/expected limitation of a front-end-only mockup, but worth flagging since it directly affects whether the E2E spec's own golden-path test scenario is demonstrable in the UI as it stands.

---

## K. Activation "Destinations" page advertises configuration it doesn't offer

`src/pages/activation/destinations.js` page description reads: *"Configure reverse ETL channels, data shares, and cloud warehouse subscriptions."* The page renders a fully static, read-only table with no add/edit/configure control of any kind (confirmed: no `onclick` handlers exist anywhere in the file). This leaves E2E spec EPIC 9/TASK-9.2 (Reverse ETL Syndication Adapter — Salesforce/SAP writeback configuration) with no corresponding UI entry point at all, not even an illustrative one.

---

## L. Expected, non-defect gap: no backend-driven flows

Per requirements.md §55 ("UI Implementation Rule"), the mockup is explicitly meant to be **"backend-ready, not backend-dependent"** — mock data behind a repository abstraction, no invented backend contracts. Judged against that stated intent, the absence of any real Databricks/Unity Catalog/Spark execution behind EPICs 1–9 of the E2E spec (Lakebase metastore, federation connectors, layer spawner execution, DLT pipeline deploys, Splink matching jobs, Genie space provisioning, Entity 360 API, reverse-ETL writeback) is **by design**, not a flow gap. It's listed here only so this validation isn't mistaken for having overlooked it — every specific finding above (A–K) is about a UI-level flow that is either incomplete relative to `requirements.md`, or present in the E2E spec as a UI deliverable but not actually reachable as a real flow in the shipped mockup.

---

## Summary Table

| # | Finding | Severity | Primary spec violated |
|---|---|---|---|
| A | Add Source / Strategy Designer / DQ Rule Designer don't persist via `repository.js` | High | requirements.md §7/§14/§18; E2E EPICs 3/6/7 |
| B | Strategy Designer is a static form, not the specified 6-step wizard | High | requirements.md §18 |
| C | Entity 360 has 4 of 8 specified tabs (own code comment admits it) | High | requirements.md §25 |
| D | Golden Journey ends at GOVERN, omits ACTIVATE stage | Medium | requirements.md §54 |
| E | Layer Spawner UI / Pipeline DAG Builder only exist as Docs Portal simulators | Medium | E2E TASK-10.2, TASK-10.3 |
| F | Global AI drawer isn't the Genie pushdown-SQL drawer the E2E spec calls for | Medium | E2E TASK-10.5 |
| G | Persona switcher doesn't scope navigation | Medium | requirements.md §53 |
| H | Persona names inconsistent between login presets and canonical list | Low | requirements.md §53 (internal consistency) |
| I | Notification center in state but never rendered | Low | — (dead state) |
| J | Badge/KPI volumes exceed seeded mock data (2 vs. 1,284 / 15) | Low | E2E TASK-11.1 |
| K | Destinations page promises "configure," offers no action | Low | E2E EPIC 9/TASK-9.2 |
| L | No real backend execution behind EPICs 1–9 | Informational (by design) | requirements.md §55 |
