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
8. TypeScript Microservices Architecture & Contracts

All Unify AI Control Plane microservices are built with **TypeScript** on Node.js/Fastify/tRPC. They run as containerized microservices on Databricks Apps or Kubernetes clusters, communicating via type-safe RPC and OpenAPI specifications.

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                       TYPESCRIPT MICROSERVICES CLUSTER                      │
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
│ unification-engine-service   │ Fellegi-Sunter, fuzzy, graph │ 4006 / Spark  │
│                              │ clustering, survivorship     │               │
│ genie-zerocopy-query-service │ Genie Spaces, NL-to-SQL,     │ 4007 / REST   │
│                              │ pushdown predicate execution │               │
│ entity360-activation-service │ Sub-ms 360 profile GraphQL,  │ 4008 / GraphQL│
│                              │ reverse ETL, Kafka streams   │               │
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
}

// Databricks Genie Zero-Copy Query Plan
export interface ZeroCopyQueryPlan {
  planId: string;
  naturalLanguagePrompt: string;
  generatedPushdownSql: string;
  zeroCopyPushedPredicates: string[];
  bytesTransferredFromSource: 0;
  estimatedLatencyMs: number;
}
```

________________________________________
9. Databricks Lakebase Active Metastore

Rather than relying on an external relational database (e.g. Postgres or RDS), Unify AI uses **Databricks Lakebase** as its active metastore directly inside Unity Catalog (`system.unify_lakebase`).

```
                    DATABRICKS LAKEBASE METASTORE
                      (system.unify_lakebase)
  ┌─────────────────────────────────────────────────────────────────┐
  │  entities           • Canonical entity schemas & domain models  │
  │  dynamic_layers     • Catalog, schema, and view/table states   │
  │  source_registry    • Foreign catalog credentials & configs     │
  │  match_rules        • Fellegi-Sunter weights & blocking keys    │
  │  survivorship_rules • Winning attribute strategy priority       │
  │  pipeline_runs      • DLT execution states & run telemetry      │
  │  audit_lineage      • Immutable column-level provenance history │
  └─────────────────────────────────────────────────────────────────┘
```

Benefits:
- Native ACID guarantees with Delta Lake transactions.
- Zero impedance mismatch between metadata and Spark/SQL compute.
- Immutable time-travel audit (`VERSION AS OF`) for regulatory compliance.
- Inherits Unity Catalog fine-grained RBAC and encryption.

________________________________________
10. Dynamic Layer Spawning in Databricks

Unify AI dynamically provisions database layers across Unity Catalog on demand:

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
```

Dynamic DDL Example:
```sql
CREATE OR REPLACE VIEW unify_prod.v_bronze.v_customer_federated AS
SELECT source_record_id, entity_payload, _source_timestamp, 'SFDC-001' AS source_origin_id
FROM foreign_salesforce_catalog.sales_cloud.customer
WITH SCHEMA EVOLUTION;
```

________________________________________
11. Automated End-to-End Pipeline Synthesis (DLT & DABs)

The `pipeline-orchestrator-service` compiles visual pipeline DAGs into:
1. **Databricks Asset Bundles (DABs)**: `databricks.yml` files declaring pipeline compute, target environments, and deployment schedules.
2. **Delta Live Tables (DLT)**: Declarative Spark pipelines using `@dlt.table` and `@dlt.expect` quality assertions.
3. **Delta MERGE Jobs**: Automated upsert and survivorship calculation without manual SQL script authoring.

________________________________________
12. Zero-Copy Queries & Databricks Genie Integration

Unify AI couples configuration-driven federated queries with **Databricks Genie**:
- Dedicated **Genie Spaces** configured for business domains (e.g. Customer 360, Supplier Network).
- Certified semantic metrics and table descriptions provided to Genie's NLU model.
- Natural Language questions translated to optimized SQL pushdowns against live source catalogs.
- Zero physical bytes copied to lakehouse storage during querying.

________________________________________
13. Frontend Architecture (React 19 + TypeScript)

The UI layer is designed as an enterprise Single Page Application:
- **Framework**: React 19 with strict TypeScript typing.
- **Styling**: Modular Vanilla CSS design token system (`tokens.css`, `layout.css`, `components.css`) featuring sleek dark glassmorphism.
- **State Management**: Reactive event-driven store with zero-runtime dependencies.
- **Navigation**: Client-side hash router with parameter matching and deep linking.
- **Key Modules**: Visual Layer Spawner, Pipeline DAG Designer, Data Steward Review Queue, Conversational Genie Copilot, and Real-time Identity Graph.
 
