1. Executive architecture
┌──────────────────────────────────────────────────────────────────────────────┐
│                    UNIFY AI — ZERO-COPY DATA UNIFICATION FABRIC             │
│                         Powered by Databricks                                │
└──────────────────────────────────────────────────────────────────────────────┘

       ENTERPRISE DATA SOURCES
 ┌────────┐ ┌────────┐ ┌────────┐ ┌────────┐ ┌────────┐ ┌─────────────┐
 │ CRM    │ │  ERP   │ │ Reltio │ │ DB/SQL │ │ SaaS   │ │ Files/APIs  │
 │Salesforce│ │ SAP   │ │  MDM   │ │ Oracle │ │ Apps   │ │ Kafka/CDC   │
 └────┬───┘ └───┬────┘ └───┬────┘ └───┬────┘ └───┬────┘ └──────┬──────┘
      │          │          │          │          │              │
      └──────────┴──────────┴──────────┴──────────┴──────────────┘
                               │
                     ┌─────────▼─────────┐
                     │   DATA ACCESS     │
                     │                   │
                     │ Zero-Copy /       │
                     │ Federation        │
                     │ CDC / Streaming   │
                     │ Batch / API       │
                     └─────────┬─────────┘
                               │
              ┌────────────────▼────────────────┐
              │       UNIFY CONTROL PLANE       │
              │                                 │
              │ Source Registry                 │
              │ Metadata & Configuration        │
              │ Canonical Models                │
              │ Mapping & Transformation Rules  │
              │ Match Rules                     │
              │ Survivorship Rules              │
              │ DQ Rules                        │
              │ Workflow / Approval             │
              └────────────────┬────────────────┘
                               │
                 ┌─────────────▼──────────────┐
                 │      DATA INTELLIGENCE     │
                 │                            │
                 │ Schema Discovery           │
                 │ AI Semantic Mapping        │
                 │ Profiling                  │
                 │ Data Quality               │
                 │ Standardization             │
                 │ Reference Data             │
                 └─────────────┬──────────────┘
                               │
                 ┌─────────────▼──────────────┐
                 │     ENTITY RESOLUTION      │
                 │                            │
                 │ Deterministic Matching     │
                 │ Fuzzy Matching             │
                 │ Probabilistic Matching     │
                 │ AI-Assisted Matching       │
                 │ Confidence Scoring         │
                 │ Match Explanation          │
                 └─────────────┬──────────────┘
                               │
                 ┌─────────────▼──────────────┐
                 │      MASTERING ENGINE      │
                 │                            │
                 │ Identity Resolution        │
                 │ Golden Record              │
                 │ Attribute Survivorship     │
                 │ Merge / Unmerge            │
                 │ Temporal History           │
                 │ Relationship Resolution    │
                 └─────────────┬──────────────┘
                               │
              ┌────────────────▼────────────────┐
              │       GOLDEN DATA LAYER         │
              │                                 │
              │ Customer • Product • Supplier   │
              │ Location • Account • Provider   │
              │ Organization • Employee         │
              │                                 │
              │ Identity Graph                  │
              │ Cross References                │
              │ Golden Attributes               │
              │ Provenance & Lineage            │
              └────────────────┬────────────────┘
                               │
       ┌───────────────────────┼────────────────────────┐
       │                       │                        │
 ┌─────▼──────┐         ┌──────▼──────┐         ┌──────▼──────┐
 │ REAL-TIME  │         │ DATA PRODUCTS│         │ ACTIVATION  │
 │ APIs       │         │ Analytics    │         │ CRM / ERP   │
 │ Resolution │         │ BI / ML      │         │ Events      │
 │ 360 APIs   │         │ GenAI / RAG  │         │ Reverse ETL │
 └────────────┘         └─────────────┘         └─────────────┘


═══════════════════════════════════════════════════════════════════════════════
                         CROSS-CUTTING SERVICES
═══════════════════════════════════════════════════════════════════════════════

 Governance │ Unity Catalog │ Security │ RBAC │ PII │ Audit │ Lineage
 Observability │ Monitoring │ Job Management │ Versioning │ Recovery
2. The Databricks data plane
I would make this visually distinct from the Unify control plane:
                 DATABRICKS DATA PLANE

 ┌─────────────────────────────────────────────────────────────┐
 │                     DATA ACCESS                             │
 │                                                             │
 │ Lakehouse Federation │ Delta Sharing │ JDBC │ APIs │ CDC   │
 └──────────────────────────────┬──────────────────────────────┘
                                │
 ┌─────────────────────────────────────────────────────────────┐
 │                       DELTA LAKE                            │
 │                                                             │
 │  Bronze              Silver                  Gold           │
 │  ──────              ──────                  ────           │
 │  Raw/Source          Standardized            Golden         │
 │  Snapshots           Conformed               Entities       │
 │  CDC                 DQ Cleansed             Relationships  │
 └──────────────────────────────┬──────────────────────────────┘
                                │
 ┌─────────────────────────────────────────────────────────────┐
 │                    SPARK PROCESSING                         │
 │                                                             │
 │ PySpark │ SQL │ Structured Streaming │ Delta MERGE          │
 │ Matching │ Standardization │ DQ │ Survivorship              │
 └──────────────────────────────┬──────────────────────────────┘
                                │
 ┌─────────────────────────────────────────────────────────────┐
 │                    UNITY CATALOG                            │
 │                                                             │
 │ Catalog │ Schema │ Permissions │ Lineage │ Classification   │
 └─────────────────────────────────────────────────────────────┘
The important message is that Bronze/Silver/Gold are not mandatory copies for every source. A source can remain federated/zero-copy, while selected data is materialized into Delta when there is a justified processing or performance requirement.
________________________________________
3. Unify AI control plane
This is where I'd differentiate your product from "Databricks + some pipelines."
                     UNIFY AI CONTROL PLANE

 ┌─────────────────────────────────────────────────────────────┐
 │                    ADMINISTRATION                           │
 │                                                             │
 │ Domains │ Sources │ Environments │ Users │ Roles            │
 └───────────────────────────┬─────────────────────────────────┘
                             │
 ┌───────────────────────────▼─────────────────────────────────┐
 │                    METADATA LAYER                           │
 │                                                             │
 │ Entity Model │ Attribute Model │ Source Mapping             │
 │ Relationships │ Reference Data │ Business Definitions       │
 └───────────────────────────┬─────────────────────────────────┘
                             │
 ┌───────────────────────────▼─────────────────────────────────┐
 │                     RULE ENGINE                             │
 │                                                             │
 │ DQ Rules │ Match Rules │ Survivorship │ Standardization     │
 │ Thresholds │ Source Trust │ Business Policies               │
 └───────────────────────────┬─────────────────────────────────┘
                             │
 ┌───────────────────────────▼─────────────────────────────────┐
 │                     AI LAYER                                │
 │                                                             │
 │ Schema Copilot │ Mapping Copilot │ Match Assistant          │
 │ Rule Generator │ Data Steward Copilot │ Explainability      │
 └───────────────────────────┬─────────────────────────────────┘
                             │
 ┌───────────────────────────▼─────────────────────────────────┐
 │                  EXECUTION ORCHESTRATOR                     │
 │                                                             │
 │ Discover → Profile → Map → DQ → Standardize → Match        │
 │ → Resolve → Survive → Master → Publish                     │
 └─────────────────────────────────────────────────────────────┘
________________________________________
4. Golden Entity architecture
This should be one of the strongest visuals in the presentation.
                       GOLDEN CUSTOMER
                       CUST-00192837
                              │
             ┌────────────────┼────────────────┐
             │                │                │
             ▼                ▼                ▼
          Salesforce         SAP            Web
          CRM-10231         BP-88391       USER-7712
             │                │                │
             └────────────────┼────────────────┘
                              │
                       IDENTITY GRAPH
                              │
       ┌──────────────────────┼──────────────────────┐
       │                      │                      │
       ▼                      ▼                      ▼
    Account                Household             Employer
    ACC-2218                HH-921               ORG-812
And underneath the Golden Customer:
┌─────────────────────────────────────────────────────┐
│                 ATTRIBUTE SURVIVORSHIP              │
├──────────────┬───────────────┬──────────────────────┤
│ Attribute    │ Winning Source│ Reason               │
├──────────────┼───────────────┼──────────────────────┤
│ Name         │ CRM           │ Source priority       │
│ Email        │ CRM           │ Trusted source        │
│ Phone        │ ERP           │ Most recent          │
│ Address      │ Billing       │ Highest completeness  │
│ DOB          │ KYC           │ Authoritative source  │
└──────────────┴───────────────┴──────────────────────┘
________________________________________
5. End-to-end processing flow
I'd put this on a separate slide:
DISCOVER
   │
   ▼
PROFILE
   │
   ▼
UNDERSTAND
   │
   ├── AI Schema Understanding
   ├── Semantic Mapping
   └── Domain Detection
   │
   ▼
STANDARDIZE
   │
   ├── Names
   ├── Address
   ├── Phone
   ├── Email
   └── Reference Data
   │
   ▼
QUALITY
   │
   ├── Completeness
   ├── Validity
   ├── Consistency
   └── Business Rules
   │
   ▼
RESOLVE
   │
   ├── Exact
   ├── Deterministic
   ├── Fuzzy
   ├── Probabilistic
   └── AI
   │
   ▼
MASTER
   │
   ├── Golden Record
   ├── Survivorship
   ├── Merge/Unmerge
   └── Identity Graph
   │
   ▼
GOVERN
   │
   ├── Lineage
   ├── Audit
   ├── Stewardship
   └── Explainability
   │
   ▼
ACTIVATE
   │
   ├── API
   ├── Events
   ├── Data Products
   ├── Analytics
   └── Operational Systems
________________________________________
6. Where AI sits
I would not put AI at the center of the entire architecture. That's architecturally misleading.
Instead:
                    ┌────────────────────┐
                    │      UNIFY AI      │
                    │                    │
                    │ Schema Intelligence│
                    │ Mapping            │
                    │ Rule Generation    │
                    │ Match Assistance   │
                    │ Steward Copilot    │
                    │ Explainability     │
                    └─────────┬──────────┘
                              │
                              ▼
┌───────────────┐       ┌───────────────┐       ┌───────────────┐
│ DATA ACCESS   │──────►│ UNIFICATION   │──────►│ GOLDEN DATA   │
│               │       │ ENGINE        │       │               │
│ Zero Copy     │       │               │       │ Golden        │
│ CDC           │       │ DQ            │       │ Identity      │
│ Batch         │       │ Match         │       │ Graph         │
│ Streaming     │       │ Survivorship  │       │ Lineage       │
└───────────────┘       └───────────────┘       └───────────────┘
This makes AI an intelligence layer augmenting deterministic enterprise processing, rather than an LLM being responsible for critical identity decisions.
________________________________________
7. The one-slide value proposition
I'd put this at the bottom of the architecture deck:
ZERO-COPY → INTELLIGENCE → TRUST → ACTIVATION
Access enterprise data where it lives → Understand and standardize it → Resolve identities → Create trusted golden entities → Govern every decision → Activate trusted data everywhere.
And underneath:
Databricks provides the scalable data/compute/governance foundation.
Unify AI provides the metadata, unification intelligence, MDM semantics, stewardship and orchestration.
Enterprise systems remain authoritative sources where appropriate.
________________________________________
Recommended presentation structure
For a polished client/leadership deck, I would use 6 slides:
1.	Unify AI — Zero-Copy Data Unification Fabric — executive architecture
2.	Zero-Copy Databricks Data Plane — federation + Delta + Spark + Unity Catalog
3.	Unify AI Control Plane — metadata + rules + AI + orchestration
4.	Entity Resolution → Golden Record → Identity Graph — core MDM engine
5.	End-to-End Processing Lifecycle — Discover → Unify → Master → Govern → Activate
6.	MVP Architecture & Evolution Path — what is live in week 1 vs enterprise scale

________________________________________
8. Bifurcated Runtime: TypeScript Control Plane + PySpark Data Plane

Unify AI employs a **Bifurcated Runtime Strategy** to optimize for both developer velocity and distributed data-plane performance:
- **Control Plane (TypeScript on Node.js / Fastify / tRPC)**: Powers the API Gateway, web UI backend, Lakebase metadata orchestration, DDL generation, and lifecycle management. All client/server contracts share strict types via `@unify/types`.
- **Data Plane (Python / PySpark / Splink)**: Executes heavy compute tasks including pairwise Fellegi-Sunter probabilistic matching (via Splink on Databricks clusters / DuckDB), Delta Live Tables streaming jobs, and distributed data quality profiling.

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                       CONTROL PLANE (TypeScript Microservices)               │
├──────────────────────────────┬──────────────────────────────┬───────────────┤
│ Microservice Name            │ Responsibilities             │ Port / Protocol│
├──────────────────────────────┼──────────────────────────────┼───────────────┤
│ source-federation-service    │ UC foreign catalogs, JDBC,   │ 4001 / REST   │
│                              │ Delta Sharing virtual views  │               │
│ lakebase-metastore-service   │ Active Delta metastore,      │ 4002 / tRPC   │
│                              │ models, rules, survivorship  │               │
│ layer-spawner-service        │ Dynamic DDL synthesis,       │ 4003 / REST   │
│                              │ provision/clone DB layers    │               │
│ pipeline-orchestrator-service│ DABs (databricks.yml), DLT,  │ 4004 / REST   │
│                              │ autoloader, Delta MERGE jobs │               │
│ dq-intelligence-service      │ Schema profiling, Great      │ 4005 / REST   │
│                              │ Expectations, anomaly triage │               │
│ unification-engine-service   │ Orchestrates Splink PySpark, │ 4006 / Jobs   │
│                              │ graph clustering, decisions  │               │
│ genie-zerocopy-query-service │ Genie Spaces, NL-to-SQL,     │ 4007 / REST   │
│                              │ pushdown predicate execution │               │
│ entity360-activation-service │ Sub-ms 360 profile GraphQL,  │ 4008 / GraphQL│
│                              │ reverse ETL, Kafka streams   │               │
├──────────────────────────────┴──────────────────────────────┴───────────────┤
│                       DATA PLANE (PySpark & Databricks Compute)             │
├──────────────────────────────┬──────────────────────────────┬───────────────┤
│ splink-matching-engine       │ Fellegi-Sunter EM probabilistic & fuzzy Jaro-│
│                              │ Winkler comparisons across millions of pairs  │
│ dlt-pipeline-templates       │ Declarative streaming Delta Live Tables jobs │
│ dq-profiler-spark            │ Distributed schema profiling & anomaly triage│
└──────────────────────────────┴──────────────────────────────┴───────────────┘
```

Core TypeScript interface contracts:
```typescript
// Layer Spawner Contract
export interface SpawnLayerRequest {
  layerType: 'v_bronze' | 'silver' | 'gold_master' | 'sandbox';
  catalogName: string;
  schemaName: string;
  sourceEntityId: string;
  accessMode: 'ZERO_COPY' | 'SELECTIVE_MATERIALIZED';
  ttlHours?: number; // Mandatory for sandbox layers
  ownerService: string;
}

// Databricks Genie Zero-Copy Query Plan
export interface ZeroCopyQueryPlan {
  planId: string;
  naturalLanguagePrompt: string;
  generatedPushdownSql: string;
  zeroCopyPushedPredicates: string[];
  bytesTransferredFromSource: 0;
  estimatedLatencyMs: number;
  guardrailValidated: boolean;
}
```

________________________________________
9. Databricks Lakebase Active Metastore + Dual-Tier Operational Architecture

### 9.1 The Architectural Dilemma: Can Lakebase (Delta Lake in Unity Catalog) Alone Be Used for the Operational Control Plane?

A critical architectural inquiry is whether **Lakebase** (`system.unify_lakebase` Delta tables within Databricks Unity Catalog) can be used directly as the sole operational storage layer for Unify AI's control plane and web application.

While Delta Lake provides enterprise ACID guarantees, immutable governance, time-travel history (`VERSION AS OF`), Change Data Feed (CDF), and native Spark/SQL engine integration, relying on Lakebase alone on the hot operational path creates fundamental operational mismatches:

| Architectural Dimension | Lakebase Alone (Databricks Serverless SQL Execution API) | Operational UI & Real-Time Control Path Requirements |
| :--- | :--- | :--- |
| **Query Latency Profile** | **200ms – 2,000ms+ (OLAP)**<br>Each query dispatched via the Databricks SQL Execution REST API requires network transit, statement lifecycle state polling (`PENDING` &rarr; `RUNNING` &rarr; `SUCCEEDED`), and analytical warehouse query processing. | **< 5ms (OLTP / In-Memory)**<br>Interactive web UI workflows (entity search auto-complete, dropdown filters, schema browsing, and rapid configuration updates) demand sub-5ms response times. |
| **Concurrency & Write Conflicts** | **Optimistic Concurrency Control (OCC) Collisions**<br>Delta Lake resolves concurrent commits optimistically at the table/file level. Concurrent writes (`MERGE` or `INSERT`) from parallel data stewards or multiple microservice instances trigger `ConcurrentModificationException`. | **High Concurrent Steward Write Throughput**<br>Dozens of data stewards reviewing match queues and modifying canonical attributes concurrently must not suffer transaction aborts, dropped reviews, or cascading rollbacks. |
| **Distributed Locking & Fencing** | **No Native Distributed Leases**<br>Delta tables do not provide lightweight, sub-second distributed mutexes, lease heartbeats, or monotonic fencing tokens required to coordinate active sessions. | **Distributed Leases with Fencing Tokens**<br>Essential for preventing dual-steward merge conflicts (`golden_record:<id>`), serializing metastore writes across instances, and electing single-writer background sync workers. |
| **Compute Cost & Warehouse Churn** | **Continuous Serverless DBU Consumption**<br>Firing Databricks SQL queries for repetitive UI dropdown lookups, metadata polling loops, and micro-transactions incurs significant Serverless DBU costs and risks hitting workspace rate limits. | **Zero DBU Cost for Operational Reads**<br>Sub-millisecond reads are served locally from indexed cache without consuming Databricks SQL warehouse compute. |

---

### 9.2 The Solution: Dual-Tier Metastore Architecture (TASK-2.4)

To resolve this bottleneck, Unify AI implements a **Dual-Tier Control-Plane Metastore** (`packages/@unify/operational-cache`). This pairs a high-performance in-memory/transactional operational store (PostgreSQL / Redis) with Databricks Lakebase through an asynchronous write-through synchronizer:

```text
┌──────────────────────────────────────────────────────────────────────────────────┐
│                   DUAL-TIER CONTROL-PLANE METASTORE ARCHITECTURE                 │
├──────────────────────────────────────────────────────────────────────────────────┤
│                                                                                  │
│   [ Data Stewards / Web UI ]          [ Microservices / API Gateway ]            │
│                 │                                   │                            │
│                 ▼                                   ▼                            │
│   ────────────────────────────────────────────────────────────────────────────   │
│   TIER 1: LOW-LATENCY OPERATIONAL STORE (@unify/operational-cache)               │
│   ────────────────────────────────────────────────────────────────────────────   │
│   • Sub-5ms Operational Reads:                                                   │
│     - cache_entries: Indexed JSON documents by (namespace, key)                  │
│     - High-speed point lookups for UI dropdowns, entity models, and layer states  │
│                                                                                  │
│   • Distributed Lease Manager (LockManager):                                     │
│     - DB-clock backed leases preventing cross-host clock skew                    │
│     - Monotonic fencing tokens (lock_fencing_seq) eliminating steward collisions │
│     - Mutex key: golden_record:<id> prevents dual-steward merge conflicts        │
│                                                                                  │
│   • Transactional Unit-of-Work Outbox:                                           │
│     - Atomic commit: cache update + outbox event in ONE ACID transaction         │
│     - Eliminates split-brain: cache and pending Delta writes cannot diverge      │
│                                                                                  │
│                                      │                                           │
│                                      │ Asynchronous Single-Writer Flush          │
│                                      │ (OutboxWorker with leader election &      │
│                                      │  exponential backoff)                     │
│                                      ▼                                           │
│   ────────────────────────────────────────────────────────────────────────────   │
│   TIER 2: AUTHORITATIVE MASTER STORE (Databricks Lakebase Delta Tables)          │
│   ────────────────────────────────────────────────────────────────────────────   │
│   • <catalog>.unify_lakebase schema:                                             │
│     - entities: Canonical business schemas and versioned ontology                │
│     - dynamic_layers: Catalog, schema, view/table states, and securables         │
│     - match_strategies & survivorship_matrices: Fellegi-Sunter weights & rules   │
│     - audit_log: Append-only, SHA-256 hash-chained immutable provenance          │
│                                                                                  │
│   • Enterprise Lakehouse Capabilities:                                           │
│     - Change Data Feed (delta.enableChangeDataFeed = true)                       │
│     - Full Delta Time Travel: VERSION AS OF / TIMESTAMP AS OF                    │
│     - Zero ConcurrentModificationException: Exactly one worker writes to Delta   │
│                                                                                  │
└──────────────────────────────────────────────────────────────────────────────────┘
```

---

### 9.3 Key Architectural Benefits & Mechanics

1. **Sub-5ms UI & API Latency**:
   - Web UI queries for canonical entity definitions, source registry metadata, and layer statuses read directly from PostgreSQL/Redis `cache_entries`.
   - Bypasses Databricks SQL Warehouse cold starts and HTTP REST poll loops, delivering a responsive sub-5ms operational experience.

2. **Complete Elimination of Delta `ConcurrentModificationException`**:
   - The `OutboxWorker` elects a single leader process across microservice replicas via `LockManager`.
   - The elected worker flushes outbox events to Databricks Delta Lake sequentially. Because there is strictly one writer per Delta table, write conflicts and OCC exceptions are completely eliminated.

3. **Distributed Fencing Tokens for Data Stewards**:
   - Data stewards reviewing potential duplicate merges acquire an exclusive lease (`golden_record:<id>`) with an auto-incrementing fencing token.
   - If a steward's session stalls or times out, subsequent writes with a stale fencing token are rejected (`STALE_FENCING_TOKEN`), preventing split-brain overwrites and race conditions.

4. **Strict FIFO Head-of-Line Ordering for Audit Hash Chains**:
   - Every mutation produces a hash-chained audit event (`audit_log` with SHA-256 `curr_hash = H(prev_hash + payload)`).
   - The write-through worker flushes outbox records in strict ID order. If an event transiently fails, subsequent events wait while retries execute with exponential backoff (`computeBackoffMs`), preserving cryptographic chain continuity.

5. **Cost Optimization & Fault Resilience**:
   - Repetitive operational reads do not consume Databricks Serverless DBUs.
   - During transient network partitions or Databricks SQL maintenance windows, the operational store continues accepting and serving reads and buffering writes in the durable outbox queue.

____
10. Dynamic Layer Spawning & Automated TTL Governance

Unify AI dynamically provisions database layers across Unity Catalog on demand with strict governance:

```
  ┌─────────────────────────────────────────────────────────────┐
  │                 DYNAMIC LAYER LIFECYCLE                     │
  └──────────────────────────────┬──────────────────────────────┘
                                 │
         ┌───────────────────────┼───────────────────────┐
         │                       │                       │
         ▼                       ▼                       ▼
  VIRTUAL BRONZE          CONFORMED SILVER        GOLDEN MASTER
  (Zero-Copy View)        (Delta Lake Table)      (Delta + Graph)
  • External View         • Schema Conformed      • Golden Record
  • No data copied        • DQ Assertions (DLT)   • Attribute Surv.
  • Direct pushdown       • Streaming CDC         • Identity Graph

  SIMULATION SANDBOX (SHALLOW CLONE)
  • Cloned from Silver/Gold for testing new match rules
  • Enforced TTL: 'unify.sandbox_ttl_hours' = '48'
  • Automated Reaper: Scheduled worker executing DROP TABLE on expired clones
```

Dynamic DDL Example with Governance Tags:
```sql
CREATE OR REPLACE TABLE unify_prod.sandbox.sim_sandbox_customer_1790
SHALLOW CLONE unify_prod.silver.silver_customer_conformed
TBLPROPERTIES (
  'unify.sandbox_ttl_hours' = '48',
  'unify.owner_service' = 'unification-simulation-engine',
  'unify.layer_tier' = 'sandbox',
  'unify.spawned_at' = '2026-09-23T22:50:00Z'
);
```

________________________________________
11. Automated End-to-End Pipeline Synthesis (DLT & DABs)

The `pipeline-orchestrator-service` compiles visual pipeline DAGs into:
1. **Databricks Asset Bundles (DABs)**: `databricks.yml` files declaring pipeline compute, target environments, and deployment schedules.
2. **Delta Live Tables (DLT)**: Declarative Spark pipelines using `@dlt.table` and `@dlt.expect` quality assertions.
3. **Delta MERGE Jobs**: Automated upsert and survivorship calculation without manual SQL script authoring.

________________________________________
12. Zero-Copy Queries, Federation Guardrails & Databricks Genie

Unify AI couples configuration-driven federated queries with **Databricks Genie** with built-in federation guardrails:
- **Dedicated Genie Spaces**: Configured for business domains (e.g. Customer 360, Supplier Network).
- **Federation Guardrails**: Queries are routed through Certified Semantic Views (`v_semantic_*`) that tie high-frequency join dimensions to conformed Silver keys, preventing API rate limits and execution timeouts on remote systems (like Salesforce or SAP OData).
- **Certified Semantic Context**: Table glossaries and benchmark queries guide Genie's code generation, guaranteeing deterministic pushdown SQL.
- **Zero Data Duplication**: External queries execute in-place on remote systems of record without byte copying into Delta Bronze.

________________________________________
13. Frontend Architecture (React 19 + TypeScript)

The UI layer is designed as an enterprise Single Page Application:
- **Framework**: React 19 with strict TypeScript typing.
- **Styling**: Modular Vanilla CSS design token system (`tokens.css`, `layout.css`, `components.css`) featuring sleek dark glassmorphism.
- **State Management**: Reactive event-driven store with zero-runtime dependencies.
- **Navigation**: Client-side hash router with parameter matching and deep linking.
- **Key Modules**: Visual Layer Spawner, Pipeline DAG Designer, Data Steward Review Queue, Conversational Genie Copilot, and Real-time Identity Graph.
 
