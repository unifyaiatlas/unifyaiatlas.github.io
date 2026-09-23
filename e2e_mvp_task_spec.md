# Unify AI — End-to-End MVP Task & Technical Engineering Specification
**Target Platform:** Databricks Lakehouse (Unity Catalog + Lakebase Metastore)  
**Control-Plane Stack:** TypeScript (Node.js / Fastify / tRPC)  
**Data-Plane Compute:** Python & PySpark (Splink Fellegi-Sunter / DLT / Spark ML)  
**Frontend Stack:** React 19 + TypeScript  
**Version:** 1.1.0-MVP-REMEDIATED  
**Status:** Approved for Implementation  

---

## 1. Executive Summary & Architectural Scope

This specification provides the exhaustive, task-by-task engineering blueprint to build the **End-to-End MVP** of **Unify AI: Zero-Copy Data Unification Fabric**.

### Architectural Tenets & Remediations Applied:
1. **Bifurcated Runtime Strategy**:
   - **Control Plane (TypeScript / Node.js / Fastify)**: Powers the API Gateway, web UI backend, Lakebase metadata orchestration, DDL generation, and lifecycle management.
   - **Data Plane (Python / PySpark / Splink)**: Powers heavy compute tasks including pairwise Fellegi-Sunter probabilistic matching, DLT streaming pipelines, and ML-based anomaly profiling on Databricks clusters.
2. **Hybrid Metastore Pattern (Operational Cache + Lakebase Delta)**:
   - Eliminates OLAP point-lookup latency and concurrent write collisions (`ConcurrentModificationException`) during active steward review by placing an ultra-low latency operational cache (PostgreSQL / Redis) in front of `system.unify_lakebase`.
   - Continuous asynchronous write-through syncs consolidated decisions, models, and audit logs to `system.unify_lakebase` Delta tables in Unity Catalog as immutable enterprise ground truth.
3. **Dynamic Layer Governance & Automated TTL**:
   - Mandatory governance properties (`unify.sandbox_ttl_hours`, `unify.owner_service`, `unify.layer_tier`) and an automated reaper worker preventing Unity Catalog clutter.
4. **Federation Guardrails & Curated Semantic Genie Spaces**:
   - Selective micro-batch CDC ingestion into conformed `silver` Delta tables for rate-limited API sources (Salesforce, SAP OData).
   - Constraining Databricks Genie spaces to curated, certified semantic models to prevent hallucinated joins or cross-system full table scans.

---

## 2. Monorepo & System Architecture

```text
unify-ai/
├── apps/
│   ├── web/                         # React 19 + TypeScript Frontend SPA
│   │   ├── src/components/          # Shell, Navigation, Global Search, Genie Drawer
│   │   ├── src/pages/               # Foundation, Quality, Unification, Stewardship, Entity360, Ops, Docs
│   │   └── src/services/            # tRPC & REST API Client Layer
│   └── docs/                        # Standalone Docs & Interactive Architecture Portal (docs.html)
├── services/                        # TypeScript Control-Plane Microservices (Fastify / tRPC / Node.js)
│   ├── source-federation-service/   # :4001 - Lakehouse Federation & External Catalog Views
│   ├── lakebase-metastore-service/  # :4002 - Active Unity Catalog Delta Metastore + Operational Cache
│   ├── layer-spawner-service/       # :4003 - Dynamic DDL Synthesis, TTL Reaper & Layer Lifecycle
│   ├── pipeline-orchestrator-service/# :4004 - DABs (databricks.yml) & DLT Synthesis
│   ├── dq-intelligence-service/     # :4005 - Lakehouse Monitoring & Delta Expectations
│   ├── unification-engine-service/  # :4006 - Orchestration API for Fellegi-Sunter & Survivorship
│   ├── genie-zerocopy-query-service/# :4007 - Genie Space Semantic Modeling & Pushdown Query Engine
│   └── entity360-activation-service/# :4008 - Real-time 360 API, Graph Traversal & Reverse ETL
├── packages/                        # Shared Internal Libraries
│   ├── @unify/types/                # Shared TypeScript Interfaces, Enums, DTOs
│   ├── @unify/databricks-client/    # Databricks REST API, SQL Execution API & UC SDK Wrapper
│   ├── @unify/operational-cache/    # Low-latency PostgreSQL / Redis transactional cache client
│   └── @unify/logger/               # Structured JSON Logging & OpenTelemetry
├── compute/                         # Python / PySpark Data-Plane Compute Packages
│   ├── splink-matching-engine/      # Fellegi-Sunter probabilistic & Jaro-Winkler PySpark algorithms
│   ├── dlt-pipeline-templates/      # Reusable Python DLT streaming pipeline definitions
│   └── dq-profiler-spark/           # Distributed data profiling & anomaly detection jobs
├── databricks/                      # Databricks Assets
│   ├── bundles/                     # Databricks Asset Bundles (DABs) definitions
│   ├── dlt/                         # Delta Live Tables pipeline templates
│   ├── sql/                         # Lakebase DDL scripts & Seed Data
│   └── cron/                        # Sandbox TTL Reaper & Lakehouse maintenance scripts
└── docker-compose.yml               # Local orchestration for microservices + cache cluster
```

---

## 3. Epic Breakdown & Task Specifications

---

### EPIC 1: Workspace Setup, Monorepo & Shared Libraries
**Goal:** Establish monorepo infrastructure, strict TypeScript compiler configurations, and Databricks API clients.

#### Tasks:
- [ ] **TASK-1.1: Monorepo Foundation & Tooling**
  - Initialize PNPM workspaces and Turborepo pipeline configuration (`turbo.json`).
  - Configure root `tsconfig.base.json` with strict type checking, `NodeNext` module resolution, and ESM support.
  - Setup ESLint, Prettier, and Husky git hooks.
  - *Deliverable:* Working build/lint pipeline across all packages.

- [ ] **TASK-1.2: Shared Type Contracts (`packages/@unify/types`)**
  - Implement core domain interfaces:
    - `SourceConnectionConfig`, `VirtualCatalogSpec`, `AccessMode` ('ZERO_COPY' | 'SELECTIVE_MATERIALIZED').
    - `CanonicalEntityModel`, `AttributeModel`, `ValidationRule`.
    - `SpawnLayerRequest`, `LayerProvisionResult`, `LayerTier` ('v_bronze' | 'silver' | 'gold_master' | 'sandbox').
    - `PipelineDagConfig`, `DltPipelineSpec`, `DabsBundleConfig`.
    - `MatchStrategy`, `ScoringWeight`, `SurvivorshipMatrix`.
    - `GenieSpaceConfig`, `ZeroCopyQueryPlan`, `PushdownPredicate`.
    - `Entity360Profile`, `IdentityGraphNode`, `IdentityGraphEdge`.
  - *Deliverable:* `@unify/types` published and consumed by all services and frontend.

- [ ] **TASK-1.3: Databricks API Integration Library (`packages/@unify/databricks-client`)**
  - Build type-safe wrapper over official `@databricks/sdk`:
    - `DatabricksSqlExecutor`: Executes DDL/DQL queries via Databricks Serverless SQL Execution API with exponential backoff.
    - `UnityCatalogManager`: Automates foreign catalog, schema, view, and table permissions (GRANT/REVOKE).
    - `DatabricksJobsClient`: Programmatically manages Jobs, Pipelines (DLT), and Asset Bundles.
    - `DatabricksGenieClient`: Interacts with Databricks Genie Space REST endpoints.
  - *Deliverable:* Comprehensive unit tests verifying connection handling and statement execution.

---

### EPIC 2: Databricks Lakebase Active Metastore (`system.unify_lakebase`)
**Goal:** Establish Unity Catalog Delta tables as the active control-plane metastore, replacing external databases.

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

#### Tasks:
- [ ] **TASK-2.1: Lakebase DDL Initialization Script**
  - Write SQL migration script `databricks/sql/01_init_lakebase_schema.sql`:
    - `CREATE SCHEMA IF NOT EXISTS system.unify_lakebase;`
    - Create `entities`, `attributes`, `sources`, `dynamic_layers`, `match_strategies`, `survivorship_matrices`, `pipeline_definitions`, `audit_log`.
    - Enable Change Data Feed (`delta.enableChangeDataFeed = true`) and column mapping on all tables.
  - *Acceptance Criteria:* Executing script on Databricks Serverless SQL provisions all tables with correct schemas.

- [ ] **TASK-2.2: Lakebase Metastore Microservice (`lakebase-metastore-service`)**
  - Create Fastify + tRPC microservice listening on `:4002`.
  - Implement CRUD endpoints:
    - `GET /v1/metastore/entities`: Lists canonical models.
    - `POST /v1/metastore/entities`: Creates/updates versioned entity ontology.
    - `GET /v1/metastore/layers`: Returns active dynamic layers and their Unity Catalog securable references.
    - `POST /v1/metastore/audit`: Appends tamper-proof steward and pipeline decision logs.
  - Implement snapshot time-travel queries: `SELECT * FROM system.unify_lakebase.entities VERSION AS OF ?`.
  - *Deliverable:* 100% typed REST/tRPC service with integration tests against Lakebase.

- [ ] **TASK-2.3: Seed Data Fixtures (Customer Domain)**
  - Populate Lakebase with initial canonical Customer model:
    - Primary key: `golden_id` (UUIDv7).
    - Attributes: `legal_name`, `trade_name`, `tax_id`, `primary_email`, `primary_phone`, `billing_address`, `annual_revenue`, `duns_number`.
  - Register mock source metadata for Salesforce CRM, SAP S/4HANA, and Postgres Billing.
  - *Deliverable:* Seed runner script `pnpm run seed:lakebase`.

- [ ] **TASK-2.4: Low-Latency Operational Cache & Delta Write-Through Synchronizer**
  - Implement dual-tier metastore architecture (`packages/@unify/operational-cache`):
    - Sub-5ms in-memory/transactional cache (Redis / PostgreSQL) serving frequent UI read queries and dropdown configs.
    - Distributed lock manager preventing concurrent Data Steward merge collisions and eliminating Delta `ConcurrentModificationException`.
    - Asynchronous write-through worker that flushes audited changes, layer state transitions, and canonical schema updates to `system.unify_lakebase` Delta tables with exponential backoff.
  - *Deliverable:* Benchmarked < 5ms read latency and zero transaction conflict exceptions under simulated 50-steward concurrency.

---

### EPIC 3: Ingestion Layer & Federation Connectors (`source-federation-service`)
**Goal:** Build, configure, and validate production-ready ingestion connectors for Salesforce CRM, PostgreSQL, Apache Kafka, and Cloud Object File Stores (S3/ADLS) with dual-mode access (Zero-Copy Federation + Streaming CDC).

```text
┌─────────────────────────────────────────────────────────────────────────────────┐
│                      INGESTION CONNECTOR TAXONOMY MATRIX                        │
├──────────────┬──────────────────┬─────────────────────┬─────────────────────────┤
│ Connector    │ Access Pattern   │ Protocol / Driver   │ Databricks Mechanism    │
├──────────────┼──────────────────┼─────────────────────┼─────────────────────────┤
│ 1. SFDC      │ Zero-Copy + CDC  │ REST Bulk v2 + gRPC │ Lakehouse Federation +  │
│              │                  │ (Pub/Sub Event Bus) │ Spark Streaming         │
│ 2. Postgres  │ Zero-Copy + CDC  │ JDBC + WAL Logical  │ UC Foreign Catalog +    │
│              │                  │ (pgoutput/Debezium) │ Delta Live Tables CDC   │
│ 3. Kafka     │ Real-time Stream │ Kafka Consumer API  │ Spark Structured Stream │
│              │                  │ + Schema Registry   │ with Checkpointing/DLQ  │
│ 4. File Store│ Batch & Auto-CDC │ S3 / ADLS / GCS API │ Databricks Auto Loader  │
│    (S3/ADLS) │                  │ (Cloud Object API)  │ (cloudFiles) + UC Ext.  │
└──────────────┴──────────────────┴─────────────────────┴─────────────────────────┘
```

#### Tasks:
- [ ] **TASK-3.1: Salesforce (SFDC) Hybrid Connector Development**
  - **Zero-Copy Virtual Federation:**
    - Configure Unity Catalog Foreign Connection via Salesforce REST/SOQL adapter.
    - Map standard/custom objects (`Account`, `Contact`, `Opportunity`) directly to virtual bronze views:
      `CREATE FOREIGN CATALOG IF NOT EXISTS foreign_salesforce USING CONNECTION sfdc_conn;`
    - Token Manager: Handles automated OAuth 2.0 JWT Bearer flow with private key rotation stored in Databricks Secret Scope (`unify_sfdc_creds`).
  - **Incremental Streaming CDC Ingestion:**
    - Connect to Salesforce **Pub/Sub API (gRPC / CometD)** subscribing to `AccountChangeEvent` and `ContactChangeEvent`.
    - Micro-batch Spark Structured Streaming pipeline writing change events to `silver.silver_salesforce_account_cdc`.
  - **Governor Limit Guardrails:**
    - Redis-backed API usage tracker monitoring daily 24-hour Salesforce API consumption.
    - Automatically throttles or switches to overnight bulk batch mode if API consumption exceeds 80% of enterprise quota.
  - *Deliverable:* Verified SFDC connector supporting zero-copy `v_bronze` reads and continuous CDC stream ingestion.

- [ ] **TASK-3.2: PostgreSQL Ingestion & Federation Connector Development**
  - **Zero-Copy Virtual Federation:**
    - Provision Unity Catalog Connection using PostgreSQL JDBC driver with TLS 1.3:
      `CREATE CONNECTION postgres_billing_conn TYPE POSTGRESQL OPTIONS (host '...', port '5432', database 'billing');`
    - Verify pushdown execution for filters (`WHERE billing_status = 'PAID'`) and column projections directly to PostgreSQL.
  - **Real-Time Streaming CDC Ingestion (WAL):**
    - Configure logical replication using PostgreSQL `pgoutput` plugin and Debezium CDC streaming reader.
    - Pipeline updates into conformed Silver Delta tables using Delta Live Tables `APPLY CHANGES INTO` syntax (handling inserts, updates, deletes, and SCD Type 2 history).
  - *Deliverable:* Dual-mode PostgreSQL connector providing sub-second streaming CDC replication and zero-copy virtual queries.

- [ ] **TASK-3.3: Apache Kafka Real-Time Event Ingestion Connector Development**
  - **High-Throughput Streaming Engine:**
    - Implement Spark Structured Streaming reader subscribing to enterprise event topics:
      ```python
      df_stream = (spark.readStream.format("kafka")
                   .option("kafka.bootstrap.servers", kafka_brokers)
                   .option("subscribe", "enterprise.customer.events")
                   .option("startingOffsets", "latest")
                   .option("failOnDataLoss", "false")
                   .load())
      ```
  - **Schema Registry Integration:**
    - Integrate with Confluent / AWS Glue Schema Registry for Avro and JSON Schema deserialization.
    - Validate schema version compatibility; automatically handle backwards-compatible schema evolutions.
  - **Fault Tolerance & Dead-Letter Queue (DLQ):**
    - Checkpoint offsets written to cloud storage with exactly-once idempotency via Delta Lake sinks.
    - Route malformed, corrupted, or unparsable records to `system.unify_lakebase.quarantine_kafka_dlq` with raw payload, exception trace, and topic metadata.
  - *Deliverable:* Kafka streaming connector benchmarked at 5,000+ msgs/sec with zero data loss and automated DLQ routing.

- [ ] **TASK-3.4: Cloud Object File Store Connector Development (Databricks Auto Loader)**
  - **Storage Governance via Unity Catalog:**
    - Configure Unity Catalog **Storage Credentials** (IAM Roles / Azure Managed Identity) and **External Locations** (`s3://enterprise-data-drop/` / `abfss://...`). Zero hardcoded credentials.
  - **Databricks Auto Loader (`cloudFiles`) Ingestion:**
    - Implement declarative stream reader ingesting raw batch drops (CSV, JSON, Parquet, Avro):
      ```python
      df_files = (spark.readStream.format("cloudFiles")
                  .option("cloudFiles.format", "parquet")
                  .option("cloudFiles.schemaLocation", "/Volumes/unify/schemas/customer_files")
                  .option("cloudFiles.schemaEvolutionMode", "addNewColumns")
                  .option("cloudFiles.useNotifications", "true")
                  .load("s3://enterprise-data-drop/customer_feed/"))
      ```
  - **Event-Driven File Notification:**
    - Configure SQS / Azure Event Grid notification mode for sub-second file detection without expensive directory listings on millions of files.
  - **Corrupt Record Rescue:**
    - Automatically capture malformed rows in `_rescued_data` column, preventing pipeline aborts and triggering stewardship alerts.
  - *Deliverable:* Resilient Auto Loader connector handling continuous multi-format file ingestion with automated schema evolution.

- [ ] **TASK-3.5: Automated Virtual Schema Discovery & Drift Detection**
  - Implement schema introspector in `source-federation-service` (`:4001`):
    - Queries foreign catalogs via `information_schema.columns` and Schema Registries.
    - Computes cryptographic metadata hashes to immediately detect column additions, renames, and type widening.
  - Expose API: `GET /v1/federation/sources/:sourceId/introspect`.

- [ ] **TASK-3.6: Pushdown Capability Verification & Guardrail Engine**
  - Implement query plan validator testing pushdown predicates (`EXPLAIN EXTENDED`).
  - Asserts that zero bytes are materialized to Delta storage during zero-copy queries.
  - Intercepts and rejects unbounded cross-catalog cartesian join queries before execution.
  - Expose API: `POST /v1/federation/validate-pushdown`.

---

### EPIC 4: Dynamic Layer Spawner Engine (`layer-spawner-service`)
**Goal:** Enable programmatic, on-demand creation of database layers (`v_bronze`, `silver`, `gold_master`, `sandbox`) in Databricks.

```text
[UI / Pipeline Request]
          │
          ▼
┌───────────────────────────────┐
│     layer-spawner-service     │  (TypeScript :4003)
│                               │
│ 1. Validate Entity & Schema   │
│ 2. Synthesize Optimized DDL   │
│ 3. Execute on Databricks SQL  │
│ 4. Register in Lakebase & UC  │
└───────────────┬───────────────┘
                │
    ┌───────────┴───────────┐
    ▼                       ▼
Databricks SQL       Unity Catalog
(Serverless Wh.)     (Securables & Permissions)
```

#### Tasks:
- [ ] **TASK-4.1: Dynamic DDL Generator Engine**
  - Implement AST-based DDL generator supporting 4 layer tiers:
    1. **`v_bronze` (Zero-Copy Virtual View)**:
       ```sql
       CREATE OR REPLACE VIEW ${catalog}.v_bronze.v_${entity}_federated AS
       SELECT ${mappedColumns}, _source_timestamp, '${sourceId}' AS source_origin_id
       FROM ${foreignCatalog}.${foreignSchema}.${sourceTable}
       WITH SCHEMA EVOLUTION;
       ```
    2. **`silver` (Conformed Delta Table)**:
       ```sql
       CREATE OR REPLACE TABLE ${catalog}.silver.silver_${entity}_conformed (
         conformed_id STRING NOT NULL,
         ${standardizedColumns},
         dq_score DOUBLE,
         source_system STRING,
         conformed_at TIMESTAMP
       ) USING DELTA PARTITIONED BY (source_system)
       TBLPROPERTIES ('delta.enableChangeDataFeed' = 'true');
       ```
    3. **`gold_master` (Golden Master Entity + XREF)**:
       ```sql
       CREATE OR REPLACE TABLE ${catalog}.gold.gold_master_${entity} (
         golden_id STRING NOT NULL PRIMARY KEY,
         master_attributes MAP<STRING, STRING>,
         confidence_score DOUBLE,
         winning_sources MAP<STRING, STRING>,
         active_status STRING,
         created_at TIMESTAMP,
         updated_at TIMESTAMP
       ) USING DELTA;
       ```
    4. **`sandbox` (Transient Simulation Clone with Mandatory TTL)**:
       ```sql
       CREATE OR REPLACE TABLE ${catalog}.sandbox.sim_sandbox_${entity}_${timestamp}
       SHALLOW CLONE ${catalog}.silver.silver_${entity}_conformed
       TBLPROPERTIES (
         'unify.sandbox_ttl_hours' = '48',
         'unify.owner_service' = 'unification-simulation-engine',
         'unify.layer_tier' = 'sandbox',
         'unify.spawned_at' = '2026-09-23T22:50:00Z'
       );
       ```

- [ ] **TASK-4.2: Layer Provisioning & State Machine**
  - Implement layer lifecycle state machine:
    `REQUESTED` → `SYNTHESIZING_DDL` → `EXECUTING_DB_SQL` → `REGISTERING_UC` → `ACTIVE` | `FAILED`.
  - Handle idempotency: If layer exists, verify schema alignment or alter schema non-destructively.
  - Register newly created layer into `system.unify_lakebase.dynamic_layers`.

- [ ] **TASK-4.3: Automated Layer Governance & Lakehouse Reaper Job**
  - Build scheduled reaper worker (`databricks/cron/lakebase_reaper.py` and service cron):
    - Scans Unity Catalog `information_schema.tables` and `system.unify_lakebase.dynamic_layers` every hour.
    - Identifies all `sandbox` tables where `current_timestamp() > spawned_at + INTERVAL unify.sandbox_ttl_hours HOURS`.
    - Automatically executes `DROP TABLE IF EXISTS` on expired sandboxes, freeing catalog namespace and storage references.
    - Emits `LayerPurgedEvent` to audit log, ensuring zero orphaned "zombie" clone tables.
  - Expose API: `POST /v1/layers/spawn`, `DELETE /v1/layers/:id`, `GET /v1/layers/active`, `POST /v1/layers/reaper/trigger`.

---

### EPIC 5: Automated Pipeline Synthesis (DABs & DLT) (`pipeline-orchestrator-service`)
**Goal:** Eliminate manual pipeline authoring by compiling visual DAG configs into Databricks Asset Bundles (DABs) and Delta Live Tables (DLT) streaming jobs.

#### Tasks:
- [ ] **TASK-5.1: Pipeline AST & DAG Compiler**
  - Build compiler that ingests visual pipeline DAG JSON (Sources → Standardization → DQ → Matching → Golden Survivorship → Target Mart).
  - Validates DAG topological sorting, cycle detection, and schema compatibility between nodes.

- [ ] **TASK-5.2: Databricks Asset Bundle (DAB) Synthesizer**
  - Generates valid `databricks.yml` bundle manifests:
    ```yaml
    bundle:
      name: unify_pipeline_${pipelineId}
    resources:
      pipelines:
        dlt_pipeline:
          name: "Unify AI - ${pipelineName}"
          target: "${targetCatalog}_gold"
          continuous: true
          channel: "preview"
          libraries:
            - notebook:
                path: "/Workspace/Unify/pipelines/${pipelineId}_dlt.py"
          clusters:
            - label: "default"
              autoscale:
                min_workers: 1
                max_workers: 8
    ```

- [ ] **TASK-5.3: Delta Live Tables (DLT) Python Script Generator**
  - Emits declarative Python DLT scripts with:
    - `@dlt.table` definitions for Bronze ingestion views.
    - `@dlt.table` and `@dlt.expect_or_drop` / `@dlt.expect_or_quarantine` for Silver conformity.
    - Delta Streaming joins and `@dlt.view` for intermediate match feature generation.
    - Incremental Delta MERGE operations for Gold master entities.

- [ ] **TASK-5.4: Pipeline Deployment & Run Telemetry**
  - Uses Databricks CLI / REST API to deploy bundles: `databricks bundle deploy -t prod`.
  - Polls pipeline execution events from Databricks DLT event logs and registers real-time metrics in Lakebase.
  - Expose API: `POST /v1/pipelines/compile-dabs`, `POST /v1/pipelines/deploy`, `GET /v1/pipelines/:id/runs`.

---

### EPIC 6: Data Quality & Profiling Engine (`dq-intelligence-service`)
**Goal:** Automate schema profiling, anomaly detection, Great Expectations rules, and record quarantine.

#### Tasks:
- [ ] **TASK-6.1: Automated Dataset Profiling**
  - Executes serverless Spark SQL profiling queries over live data:
    - Null percentages, cardinality, distinct counts, min/max/mean.
    - Regex pattern matching (emails, phones, postal codes, Tax IDs).
    - PII detection (flags SSN, credit cards, passport numbers).
  - Saves profiling results into `system.unify_lakebase.data_profiles`.

- [ ] **TASK-6.2: Rule Designer & Delta Expectations Compiler**
  - Translates business DQ rules into Delta Expectations SQL clauses:
    - Completeness: `col IS NOT NULL AND length(trim(col)) > 0`
    - Validity: `email RLIKE '^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$'`
    - Range: `annual_revenue >= 0`
    - Reference Integrity: `EXISTS IN (SELECT code FROM ref_country_codes)`

- [ ] **TASK-6.3: Quarantine Stream Router**
  - Routes failing records to `quarantine_records` Delta table with failure reason and error severity.
  - Expose API: `POST /v1/dq/profile-stream`, `GET /v1/dq/issues`, `POST /v1/dq/quarantine-records`.

---

### EPIC 7: Entity Resolution, Survivorship & Identity Graph Engine (`unification-engine-service` + `compute/splink-matching-engine`)
**Goal:** Match records across disparate sources using deterministic, fuzzy, and probabilistic Fellegi-Sunter algorithms running on PySpark / Splink, orchestrated by TypeScript microservices, then apply survivorship to build golden records and identity graphs.

```text
Salesforce CRM-10231 ──┐
SAP BP-88391 ───────────┼──► [PySpark / Splink Engine] ──► [Survivorship] ──► Golden Customer CUST-00192837
Web Portal USER-7712 ──┘     (Fellegi-Sunter & DuckDB)      (Winning Rules)     (Identity Graph)
```

#### Tasks:
- [ ] **TASK-7.1: Blocking Key Generator & Feature Extraction**
  - Generates candidate pair blocking keys in PySpark/SQL to prevent Cartesian products across multi-million row datasets:
    - Soundex / Double Metaphone of Name + Postal Code.
    - Normalized Domain Name of Email (e.g. `acme.com`).
    - Standardized Phone Last 7 digits.

- [ ] **TASK-7.2: Distributed Fellegi-Sunter Probabilistic Engine (`compute/splink-matching-engine`)**
  - Implement Python / PySpark matching engine using **Splink** (Databricks Spark / DuckDB execution):
    - **Exact Match Rules**: Case-insensitive equality for verified Tax IDs, DUNS numbers.
    - **Fuzzy Match Rules**: Jaro-Winkler (weights = 0.92 cutoff) for enterprise names; Levenshtein distance for street addresses.
    - **Probabilistic Scoring**: EM algorithm estimating $m$ and $u$ probabilities, generating log-likelihood match scores.
  - TypeScript `unification-engine-service` submits execution jobs via Databricks Jobs API and monitors completion.
  - Decision cutoffs:
    - Score ≥ 95%: **Auto Match** (automatic merge).
    - 85% ≤ Score < 95%: **Steward Review Queue** (cached in operational DB).
    - Score < 85%: **No Match** (independent entity).

- [ ] **TASK-7.3: Attribute Survivorship Resolver**
  - Implements survivorship strategies:
    - **Source Priority**: e.g., CRM wins for Name, ERP wins for Credit Rating.
    - **Most Recent (LUD)**: Attribute with latest update timestamp wins.
    - **Completeness**: Non-null value with highest character length / completeness score wins.
    - **Authoritative System**: Specific system mandated by compliance (e.g. KYC service wins for Tax ID).
  - Records winning source provenance for every attribute in `gold_entity_xref`.

- [ ] **TASK-7.4: Identity Graph & Cross-Reference Builder**
  - Constructs bidirectional links between source records and golden entity:
    - Node types: Golden Entity, Source Record, Account, Household, Organization.
    - Edges: `MERGED_FROM`, `OWNS_ACCOUNT`, `MEMBER_OF_HOUSEHOLD`, `SUBSIDIARY_OF`.
  - Expose API: `POST /v1/unification/match-batch`, `POST /v1/unification/simulate-weights`, `GET /v1/unification/clusters/:id`.

---

### EPIC 8: Zero-Copy Queries & Databricks Genie Integration (`genie-zerocopy-query-service`)
**Goal:** Build configuration-driven zero-copy queries and integrate with Databricks Genie Spaces for conversational NL-to-SQL pushdowns.

```text
[Business User / Steward]
          │  Natural Language Prompt: "Show EMEA enterprise customers with open cases"
          ▼
┌────────────────────────────────┐
│   Databricks Genie Space       │  (Configured by Unify AI)
│   • Semantic Model Glossaries  │
│   • Certified Metrics          │
└─────────┬──────────────────────┘
          │  Synthesizes Pushdown SQL
          ▼
┌────────────────────────────────┐
│   Databricks Serverless SQL    │
│   (0 Bytes Lakehouse Storage)  │
└────┬──────────────────────┬────┘
     │                      │
     ▼                      ▼
Salesforce (Remote JDBC)   SAP (Remote OData)
```

#### Tasks:
- [ ] **TASK-8.1: Databricks Genie Space Provisioner**
  - Programmatically provisions dedicated Genie Spaces via Databricks REST API:
    - `POST /api/2.0/genie/spaces`: Creates "Unify AI - Customer 360 Space".
    - Binds target Unity Catalog schemas: `unify_prod.v_bronze`, `unify_prod.gold`.

- [ ] **TASK-8.2: Semantic Model & Metric Injection**
  - Injects business context into the Genie Space:
    - Table descriptions: Defines what `v_bronze_salesforce_account` and `gold_master_customer` represent.
    - Column glossaries: Clarifies business terms (`AnnualRevenue` = annual recurring client billings).
    - Certified SQL benchmarks: Injects curated example queries to guide Genie's code generation.

- [ ] **TASK-8.3: Zero-Copy Pushdown Query Executor & Explainer**
  - Implements query handler in `genie-zerocopy-query-service` (`:4007`):
    - Submits NL prompts to Genie API.
    - Retrieves synthesized SQL query.
    - Runs `EXPLAIN EXTENDED` on Databricks Serverless SQL Warehouse to verify predicate pushdowns to remote source connectors.
    - Asserts that zero bytes are materialized into lakehouse Delta storage.
  - Expose API: `POST /v1/genie/spaces/provision`, `POST /v1/genie/query-prompt`, `GET /v1/genie/explain-pushdown`.

- [ ] **TASK-8.4: Federation Guardrails & Certified Semantic Views**
  - Build guardrail engine protecting rate-limited API sources (Salesforce, SAP):
    - Automatically provisions curated semantic views (`v_semantic_customer_360`) that bind high-frequency join dimensions to conformed Silver keys, while pushing down non-key filters to live external systems.
    - Intercepts non-deterministic or unbounded cross-catalog cartesian plans before execution.
    - Guarantees zero-copy semantics while preventing remote API quota exhaustion.
  - *Deliverable:* Automated EXPLAIN validator verifying remote predicate pushdown with 0 API throttling errors.

---

### EPIC 9: Entity 360 & Activation (`entity360-activation-service`)
**Goal:** Expose sub-10ms GraphQL/REST APIs, real-time graph traversals, and reverse ETL writebacks.

#### Tasks:
- [ ] **TASK-9.1: Real-time Entity 360 API**
  - Build Fastify GraphQL & REST service (`:4008`):
    - `GET /v1/entities/:goldenId/profile`: Retrieves survived golden record, confidence vector, and winning sources.
    - `GET /v1/entities/:goldenId/history`: Time-travel view of attribute revisions and steward merges/unmerges.
    - `GET /v1/entities/:goldenId/graph`: Returns D3/Cytoscape formatted graph nodes and edges.

- [ ] **TASK-9.2: Reverse ETL Syndication Adapter**
  - Builds writeback connectors:
    - Salesforce Writeback: Enriches Salesforce Accounts with `Golden_ID__c` and master corporate hierarchy.
    - SAP S/4HANA Writeback: Updates business partner clean tax numbers.
  - Kafka Event Stream: Publishes `CustomerMasterUpdatedEvent` to Kafka topic for real-time downstream consumers.

---

### EPIC 10: React 19 + TypeScript Enterprise Frontend MVP
**Goal:** Deliver modern, responsive, and type-safe UI matching the visual blueprints and documentation portal.

#### Tasks:
- [ ] **TASK-10.1: Shell, Navigation & State Management**
  - Responsive layout: Persistent sidebar with badge counters, topbar with persona switchers and global search, and AI assistant drawer.
  - Event-driven reactive store with strict TypeScript types.
  - Client-side router supporting parameters and query strings.

- [ ] **TASK-10.2: Interactive Dynamic Layer Spawner UI**
  - Visual interface for architects to spawn layers in Databricks:
    - Tier selection dropdown (`v_bronze`, `silver`, `gold_master`, `sandbox`).
    - Real-time syntax-highlighted SQL DDL preview.
    - 1-click execution triggering `layer-spawner-service` with progress timeline.

- [ ] **TASK-10.3: Visual Pipeline DAG Builder**
  - Canvas interface connecting Source nodes to Transformation, DQ, Match, and Golden Layer nodes.
  - "Compile to DABs & Deploy DLT" action button triggering automated pipeline synthesis.

- [ ] **TASK-10.4: Data Steward Review Queue UI**
  - Side-by-side comparison of candidate duplicate records:
    - Highlights matching and conflicting attributes with confidence scores.
    - One-click decisions: "Confirm Merge", "Keep Separate", "Assign Winning Attribute".

- [ ] **TASK-10.5: Conversational Databricks Genie Drawer**
  - Interactive chat panel integrated into application header:
    - Natural language prompt input.
    - Real-time display of synthesized zero-copy pushdown SQL.
    - Execution metrics: Latency, pushdown status, zero-copy verification.

- [ ] **TASK-10.6: In-App Documentation Portal (`#/docs`)**
  - Tabbed architecture portal featuring Mermaid SVG blueprints, TypeScript contract explorer, Lakebase schema viewer, and interactive simulators.

---

### EPIC 11: End-to-End Verification & Golden Path Testing
**Goal:** Validate complete end-to-end flow with real test data and automated integration suites.

#### Tasks:
- [ ] **TASK-11.1: E2E Golden Customer Journey Test**
  - Simulate 2,000 Salesforce CRM accounts and 2,000 SAP customers:
    1. Connect sources in zero-copy mode.
    2. Dynamic Layer Spawner creates `v_bronze` views.
    3. Pipeline orchestrator deploys DLT pipeline to conformed `silver`.
    4. Unification engine executes Fellegi-Sunter matching (expected ~1,850 golden clusters).
    5. Data steward reviews 15 borderline matches in review queue.
    6. Surviving golden customer profiles generated in `gold_master_customer`.
    7. Databricks Genie executes zero-copy queries over the unified customer dataset.
    8. Entity 360 profile API returns golden profile in < 15ms.

- [ ] **TASK-11.2: Automated Integration & Performance Test Suite**
  - Vitest / Playwright integration suite testing all microservice APIs and UI user journeys.
  - CI/CD GitHub Actions workflow validating code compilation, formatting, and tests.

---

## 4. MVP Sprint Roadmap (6-Week Delivery)

```text
Sprint 1 (Week 1): Control Plane, Shared Types & Hybrid Lakebase Metastore
├── Monorepo setup, Turborepo, @unify/types, @unify/databricks-client (Epic 1)
├── system.unify_lakebase schema DDL & lakebase-metastore-service (Epic 2)
└── @unify/operational-cache: Redis/Postgres fast cache & steward lock manager (Epic 2)

Sprint 2 (Week 2): Zero-Copy Federation & Dynamic Layer Spawner with TTL Reaper
├── source-federation-service & foreign catalog introspection (Epic 3)
├── layer-spawner-service & dynamic DDL generation engine (Epic 4)
└── databricks/cron/lakebase_reaper.py: Automated sandbox TTL reaper job (Epic 4)

Sprint 3 (Week 3): Automated Pipelines & Data Quality
├── pipeline-orchestrator-service & DABs / DLT compiler (Epic 5)
└── dq-intelligence-service & Great Expectations streaming rules (Epic 6)

Sprint 4 (Week 4): Distributed Entity Resolution Engine (PySpark + Splink)
├── compute/splink-matching-engine: Fellegi-Sunter probabilistic & Jaro-Winkler (Epic 7)
├── TypeScript unification-engine-service orchestration & job dispatch (Epic 7)
└── Attribute survivorship matrix resolver & identity graph builder (Epic 7)

Sprint 5 (Week 5): Databricks Genie Semantic Spaces & Activation APIs
├── genie-zerocopy-query-service & certified semantic views (v_semantic_*) (Epic 8)
├── Federation guardrails asserting zero-copy pushdown & rate-limit safety (Epic 8)
└── entity360-activation-service GraphQL/REST endpoints & reverse ETL (Epic 9)

Sprint 6 (Week 6): React 19 UI Integration & Golden Path Verification
├── React + TypeScript UI components, visual spawner & Genie drawer (Epic 10)
└── End-to-end golden journey test execution & documentation polish (Epic 11)
```

---

## 5. Definition of Done (DoD) for MVP

1. **Zero Data Replication in Ingestion**: Raw source data is federated through Unity Catalog without mandatory byte copying into Delta Bronze.
2. **Hybrid Metastore with Sub-5ms Latency**: All models, layer states, and match rules reside in `system.unify_lakebase` Delta tables, backed by an operational cache achieving `< 5ms` UI point-read latencies and 0 `ConcurrentModificationException` steward lock collisions.
3. **Automated Dynamic Layer Spawner & Governance**: Application spawns `v_bronze`, `silver`, `gold_master`, and `sandbox` layers via Serverless SQL on demand, with mandatory TTL tags and automated reaper pruning to guarantee 0 catalog bloat.
4. **Automated Pipeline Deployment**: A visual pipeline DAG is compiled into a valid Databricks Asset Bundle (`databricks.yml`) and deployed to a running DLT pipeline.
5. **Bifurcated Entity Resolution**: Pairwise Fellegi-Sunter probabilistic matching executed using Python / PySpark Splink on Databricks clusters, orchestrated by TypeScript microservices, generating master records and identity graphs.
6. **Guardrailed Genie Zero-Copy Queries**: Conversational query in Databricks Genie executes pushdown SQL against certified semantic models with zero bytes replicated and zero API quota exhaustion on external CRM/ERP systems.
7. **Type-Safe Full-Stack**: 100% TypeScript coverage across all control-plane microservices and React 19 frontend with 0 `any` types.
8. **Comprehensive Documentation**: Complete interactive documentation portal (`#/docs` and `docs.html`) with architecture diagrams for each and every component.
