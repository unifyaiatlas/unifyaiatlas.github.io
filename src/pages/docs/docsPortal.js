// Interactive Architecture & Documentation Portal Page Component
import { store } from '../../state/store.js';

export function renderDocsPortalPage(params = {}) {
  const urlParams = new URLSearchParams(window.location.hash.split('?')[1] || '');
  const activeTab = urlParams.get('tab') || 'overview';

  return `
    <div class="page-container" style="max-width: 1400px; margin: 0 auto; padding: 24px 32px 64px;">
      <!-- Page Header -->
      <div class="page-header" style="display: flex; align-items: flex-start; justify-content: space-between; margin-bottom: 24px; flex-wrap: wrap; gap: 16px;">
        <div>
          <div style="display: inline-flex; align-items: center; gap: 8px; padding: 4px 12px; border-radius: 20px; background: rgba(99, 102, 241, 0.15); border: 1px solid rgba(99, 102, 241, 0.3); color: var(--primary-light); font-size: 11px; font-weight: 600; margin-bottom: 8px;">
            <span>✦</span>
            <span>DATABRICKS ZERO-COPY ARCHITECTURE • TYPESCRIPT CORE • LAKEBASE METASTORE</span>
          </div>
          <h1 class="page-title" style="font-family: var(--font-display); font-size: 28px; font-weight: 800; color: #fff; margin-bottom: 4px;">
            Architecture & System Documentation
          </h1>
          <p class="page-description" style="color: var(--text-secondary); font-size: 14px; max-width: 900px;">
            End-to-end technical blueprints for Unify AI Fabric sitting on Databricks Lakehouse. Features TypeScript microservices, 
            Databricks Lakebase active metastore, dynamic layer spawner, automated DLT/DABs pipelines, and Databricks Genie Zero-Copy query integration.
          </p>
        </div>

        <div style="display: flex; align-items: center; gap: 10px;">
          <a href="./docs.html" target="_blank" class="btn btn-primary btn-sm" style="display: inline-flex; align-items: center; gap: 6px; text-decoration: none;">
            <span>📖 Open Fullscreen Docs Portal</span>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
              <polyline points="15 3 21 3 21 9"></polyline>
              <line x1="10" y1="14" x2="21" y2="3"></line>
            </svg>
          </a>
        </div>
      </div>

      <!-- Navigation Tabs -->
      <div class="tabs-nav" style="display: flex; gap: 6px; border-bottom: 1px solid var(--border-subtle); margin-bottom: 24px; overflow-x: auto; padding-bottom: 2px;">
        <button class="tab-btn ${activeTab === 'overview' ? 'active' : ''}" onclick="window.unifySwitchDocTab('overview')">
          🏛️ Executive Topology
        </button>
        <button class="tab-btn ${activeTab === 'microservices' ? 'active' : ''}" onclick="window.unifySwitchDocTab('microservices')">
          🧩 TypeScript Microservices (8)
        </button>
        <button class="tab-btn ${activeTab === 'lakebase' ? 'active' : ''}" onclick="window.unifySwitchDocTab('lakebase')">
          🗄️ Lakebase Metastore
        </button>
        <button class="tab-btn ${activeTab === 'layers' ? 'active' : ''}" onclick="window.unifySwitchDocTab('layers')">
          🏗️ Dynamic Layer Spawner
        </button>
        <button class="tab-btn ${activeTab === 'pipelines' ? 'active' : ''}" onclick="window.unifySwitchDocTab('pipelines')">
          🔄 Automated Pipelines (DABs/DLT)
        </button>
        <button class="tab-btn ${activeTab === 'genie' ? 'active' : ''}" onclick="window.unifySwitchDocTab('genie')">
          🔮 Databricks Genie & Zero-Copy
        </button>
        <button class="tab-btn ${activeTab === 'mastering' ? 'active' : ''}" onclick="window.unifySwitchDocTab('mastering')">
          👑 Entity Resolution & Graph
        </button>
        <button class="tab-btn ${activeTab === 'mvp_spec' ? 'active' : ''}" onclick="window.unifySwitchDocTab('mvp_spec')" style="color: var(--secondary);">
          📋 E2E MVP Task Spec
        </button>
      </div>

      <!-- Tab Content Area -->
      <div id="doc-tab-content">
        ${renderDocTabBody(activeTab)}
      </div>
    </div>
  `;
}

function renderDocTabBody(tab) {
  switch (tab) {
    case 'microservices':
      return renderMicroservicesTab();
    case 'lakebase':
      return renderLakebaseTab();
    case 'layers':
      return renderLayerSpawnerTab();
    case 'pipelines':
      return renderPipelinesTab();
    case 'genie':
      return renderGenieTab();
    case 'mastering':
      return renderMasteringTab();
    case 'mvp_spec':
      return renderMvpSpecTab();
    case 'overview':
    default:
      return renderOverviewTab();
  }
}

// Global Tab Switcher
window.unifySwitchDocTab = (tab) => {
  window.location.hash = `#/docs?tab=${tab}`;
  const content = document.getElementById('doc-tab-content');
  if (content) {
    content.innerHTML = renderDocTabBody(tab);
  }
  document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
  event.target.classList.add('active');
};

// Overview Tab
function renderOverviewTab() {
  return `
    <div class="grid-2" style="margin-bottom: 24px;">
      <div class="card" style="padding: 24px;">
        <h3 style="font-family: var(--font-display); font-size: 18px; color: #fff; margin-bottom: 12px; display: flex; align-items: center; gap: 8px;">
          <span>🏛️</span> Zero-Copy Architecture Principles
        </h3>
        <p style="color: var(--text-secondary); font-size: 13.5px; line-height: 1.6; margin-bottom: 16px;">
          Traditional MDM forces continuous physical replication of massive datasets into intermediate staging databases. 
          Unify AI fundamentally reverses this paradigm: <strong>Enterprise systems remain systems of record</strong>. 
          Databricks Unity Catalog federates external sources in-place, and physical bytes are materialized into Delta 
          only when there is a strict processing or performance justification.
        </p>

        <div style="background: rgba(0, 0, 0, 0.3); border-radius: 8px; padding: 14px; border-left: 3px solid var(--secondary); font-family: var(--font-mono); font-size: 12.5px; color: #cbd5e1;">
          Source System → Virtual Access (Zero-Copy) → Fellegi-Sunter Match → Golden Entity View
        </div>
      </div>

      <div class="card" style="padding: 24px;">
        <h3 style="font-family: var(--font-display); font-size: 18px; color: #fff; margin-bottom: 12px; display: flex; align-items: center; gap: 8px;">
          <span>⚡</span> Platform Tech Stack Summary
        </h3>
        <ul style="list-style: none; padding: 0; margin: 0; display: flex; flex-direction: column; gap: 10px; font-size: 13px;">
          <li style="display: flex; justify-content: space-between; border-bottom: 1px solid var(--border-subtle); padding-bottom: 6px;">
            <span style="color: var(--text-muted);">Microservices Language:</span>
            <strong style="color: var(--primary-light); font-family: var(--font-mono);">TypeScript (Node.js/Fastify/tRPC)</strong>
          </li>
          <li style="display: flex; justify-content: space-between; border-bottom: 1px solid var(--border-subtle); padding-bottom: 6px;">
            <span style="color: var(--text-muted);">Frontend Framework:</span>
            <strong style="color: #38bdf8; font-family: var(--font-mono);">React 19 + TypeScript + Custom Tokens</strong>
          </li>
          <li style="display: flex; justify-content: space-between; border-bottom: 1px solid var(--border-subtle); padding-bottom: 6px;">
            <span style="color: var(--text-muted);">Control Plane Metastore:</span>
            <strong style="color: var(--warning); font-family: var(--font-mono);">Databricks Lakebase (Unity Catalog)</strong>
          </li>
          <li style="display: flex; justify-content: space-between; border-bottom: 1px solid var(--border-subtle); padding-bottom: 6px;">
            <span style="color: var(--text-muted);">Compute & Execution:</span>
            <strong style="color: var(--success); font-family: var(--font-mono);">Databricks Serverless SQL & Spark</strong>
          </li>
          <li style="display: flex; justify-content: space-between; padding-bottom: 6px;">
            <span style="color: var(--text-muted);">Conversational Analytics:</span>
            <strong style="color: #ec4899; font-family: var(--font-mono);">Databricks Genie Spaces (Zero-Copy)</strong>
          </li>
        </ul>
      </div>
    </div>

    <!-- Component Topology Card -->
    <div class="card" style="padding: 24px;">
      <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 16px;">
        <h3 style="font-family: var(--font-display); font-size: 18px; color: #fff;">
          Component Interaction Diagram
        </h3>
        <span class="badge badge-info">Interactive Blueprint</span>
      </div>

      <div style="background: #090e17; border: 1px solid var(--border-subtle); border-radius: 12px; padding: 24px; overflow-x: auto; text-align: center;">
        <svg viewBox="0 0 1000 460" style="max-width: 100%; height: auto; font-family: var(--font-sans);">
          <defs>
            <linearGradient id="gradPrimary" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stop-color="#4f46e5"/>
              <stop offset="100%" stop-color="#06b6d4"/>
            </linearGradient>
            <linearGradient id="gradCard" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stop-color="#1e293b"/>
              <stop offset="100%" stop-color="#0f172a"/>
            </linearGradient>
          </defs>

          <!-- Row 1: Sources -->
          <rect x="30" y="20" width="130" height="50" rx="8" fill="#1e293b" stroke="#334155" stroke-width="1.5"/>
          <text x="95" y="45" fill="#f8fafc" font-size="12" font-weight="600" text-anchor="middle">Salesforce CRM</text>
          <text x="95" y="58" fill="#94a3b8" font-size="10" text-anchor="middle">Sales & Service</text>

          <rect x="180" y="20" width="130" height="50" rx="8" fill="#1e293b" stroke="#334155" stroke-width="1.5"/>
          <text x="245" y="45" fill="#f8fafc" font-size="12" font-weight="600" text-anchor="middle">SAP S/4HANA</text>
          <text x="245" y="58" fill="#94a3b8" font-size="10" text-anchor="middle">ERP & Master BP</text>

          <rect x="330" y="20" width="130" height="50" rx="8" fill="#1e293b" stroke="#334155" stroke-width="1.5"/>
          <text x="395" y="45" fill="#f8fafc" font-size="12" font-weight="600" text-anchor="middle">Postgres / Oracle</text>
          <text x="395" y="58" fill="#94a3b8" font-size="10" text-anchor="middle">Billing DBs</text>

          <rect x="480" y="20" width="130" height="50" rx="8" fill="#1e293b" stroke="#334155" stroke-width="1.5"/>
          <text x="545" y="45" fill="#f8fafc" font-size="12" font-weight="600" text-anchor="middle">Snowflake / Lakes</text>
          <text x="545" y="58" fill="#94a3b8" font-size="10" text-anchor="middle">Analytical Data</text>

          <rect x="630" y="20" width="150" height="50" rx="8" fill="#1e293b" stroke="#334155" stroke-width="1.5"/>
          <text x="705" y="45" fill="#f8fafc" font-size="12" font-weight="600" text-anchor="middle">Kafka / Event Streams</text>
          <text x="705" y="58" fill="#94a3b8" font-size="10" text-anchor="middle">CDC Real-Time</text>

          <!-- Middle Layer: Lakehouse Federation & Databricks Data Plane -->
          <rect x="30" y="110" width="750" height="110" rx="12" fill="url(#gradCard)" stroke="#6366f1" stroke-width="1.5" stroke-dasharray="6,4"/>
          <text x="50" y="135" fill="#818cf8" font-size="13" font-weight="700">DATABRICKS LAKEHOUSE DATA PLANE (Compute & Storage)</text>

          <!-- Sub boxes in Data plane -->
          <rect x="50" y="150" width="210" height="54" rx="6" fill="#0f172a" stroke="#06b6d4" stroke-width="1"/>
          <text x="155" y="172" fill="#06b6d4" font-size="11" font-weight="600" text-anchor="middle">Virtual Bronze (v_bronze_*)</text>
          <text x="155" y="188" fill="#94a3b8" font-size="9.5" text-anchor="middle">Zero-Copy UC Federated Views</text>

          <rect x="280" y="150" width="220" height="54" rx="6" fill="#0f172a" stroke="#3b82f6" stroke-width="1"/>
          <text x="390" y="172" fill="#60a5fa" font-size="11" font-weight="600" text-anchor="middle">Conformed Silver Layer</text>
          <text x="390" y="188" fill="#94a3b8" font-size="9.5" text-anchor="middle">Standardized Delta + Quality Flags</text>

          <rect x="520" y="150" width="240" height="54" rx="6" fill="#0f172a" stroke="#10b981" stroke-width="1"/>
          <text x="640" y="172" fill="#34d399" font-size="11" font-weight="600" text-anchor="middle">Gold Master Layer & Graph</text>
          <text x="640" y="188" fill="#94a3b8" font-size="9.5" text-anchor="middle">Single Truth + Survivorship + Graph</text>

          <!-- Middle-Right Box: Lakebase Metastore -->
          <rect x="800" y="20" width="170" height="200" rx="12" fill="#0f172a" stroke="#f59e0b" stroke-width="1.5"/>
          <text x="885" y="45" fill="#fbbf24" font-size="12" font-weight="700" text-anchor="middle">DATABRICKS</text>
          <text x="885" y="60" fill="#fbbf24" font-size="12" font-weight="700" text-anchor="middle">LAKEBASE</text>
          <text x="885" y="75" fill="#94a3b8" font-size="9.5" text-anchor="middle">(Unity Catalog Metastore)</text>
          <line x1="815" y1="85" x2="955" y2="85" stroke="#334155" stroke-width="1"/>
          <text x="885" y="105" fill="#cbd5e1" font-size="10" text-anchor="middle">• Entity Models</text>
          <text x="885" y="125" fill="#cbd5e1" font-size="10" text-anchor="middle">• Dynamic Layers Registry</text>
          <text x="885" y="145" fill="#cbd5e1" font-size="10" text-anchor="middle">• Match & Survivorship Rules</text>
          <text x="885" y="165" fill="#cbd5e1" font-size="10" text-anchor="middle">• DABs/DLT Pipelines</text>
          <text x="885" y="185" fill="#cbd5e1" font-size="10" text-anchor="middle">• Audit & Lineage Logs</text>

          <!-- Control Plane Microservices -->
          <rect x="30" y="250" width="750" height="90" rx="12" fill="#111827" stroke="#818cf8" stroke-width="1.5"/>
          <text x="50" y="272" fill="#a5b4fc" font-size="13" font-weight="700">CONTROL PLANE: 8 TYPESCRIPT MICROSERVICES</text>

          <rect x="45" y="285" width="82" height="42" rx="4" fill="#1f2937"/>
          <text x="86" y="302" fill="#e5e7eb" font-size="8.5" font-weight="600" text-anchor="middle">federation</text>
          <text x="86" y="316" fill="#9ca3af" font-size="8" text-anchor="middle">:4001</text>

          <rect x="135" y="285" width="82" height="42" rx="4" fill="#1f2937"/>
          <text x="176" y="302" fill="#e5e7eb" font-size="8.5" font-weight="600" text-anchor="middle">lakebase</text>
          <text x="176" y="316" fill="#9ca3af" font-size="8" text-anchor="middle">:4002</text>

          <rect x="225" y="285" width="82" height="42" rx="4" fill="#1f2937"/>
          <text x="266" y="302" fill="#e5e7eb" font-size="8.5" font-weight="600" text-anchor="middle">layer-spawn</text>
          <text x="266" y="316" fill="#9ca3af" font-size="8" text-anchor="middle">:4003</text>

          <rect x="315" y="285" width="82" height="42" rx="4" fill="#1f2937"/>
          <text x="356" y="302" fill="#e5e7eb" font-size="8.5" font-weight="600" text-anchor="middle">pipeline-orch</text>
          <text x="356" y="316" fill="#9ca3af" font-size="8" text-anchor="middle">:4004</text>

          <rect x="405" y="285" width="82" height="42" rx="4" fill="#1f2937"/>
          <text x="446" y="302" fill="#e5e7eb" font-size="8.5" font-weight="600" text-anchor="middle">dq-intel</text>
          <text x="446" y="316" fill="#9ca3af" font-size="8" text-anchor="middle">:4005</text>

          <rect x="495" y="285" width="82" height="42" rx="4" fill="#1f2937"/>
          <text x="536" y="302" fill="#e5e7eb" font-size="8.5" font-weight="600" text-anchor="middle">unification</text>
          <text x="536" y="316" fill="#9ca3af" font-size="8" text-anchor="middle">:4006</text>

          <rect x="585" y="285" width="90" height="42" rx="4" fill="#1f2937" stroke="#ec4899" stroke-width="1"/>
          <text x="630" y="302" fill="#f472b6" font-size="8.5" font-weight="600" text-anchor="middle">genie-zerocopy</text>
          <text x="630" y="316" fill="#9ca3af" font-size="8" text-anchor="middle">:4007</text>

          <rect x="683" y="285" width="85" height="42" rx="4" fill="#1f2937"/>
          <text x="725" y="302" fill="#e5e7eb" font-size="8.5" font-weight="600" text-anchor="middle">activation-360</text>
          <text x="725" y="316" fill="#9ca3af" font-size="8" text-anchor="middle">:4008</text>

          <!-- Bottom: Presentation Layer (React + TS) -->
          <rect x="30" y="370" width="940" height="65" rx="10" fill="url(#gradPrimary)"/>
          <text x="500" y="400" fill="#ffffff" font-size="15" font-weight="800" text-anchor="middle">REACT 19 + TYPESCRIPT ENTERPRISE FRONTEND</text>
          <text x="500" y="418" fill="#e0e7ff" font-size="11" text-anchor="middle">Layer Spawner UI • Dynamic DAG Pipeline Canvas • Data Steward Review Queue • Genie NL Copilot</text>

          <!-- Connecting Arrows -->
          <path d="M 95 70 L 95 150" stroke="#64748b" stroke-width="1.5" stroke-dasharray="3,3" marker-end="url(#arrow)"/>
          <path d="M 245 70 L 245 150" stroke="#64748b" stroke-width="1.5" stroke-dasharray="3,3"/>
          <path d="M 395 70 L 395 150" stroke="#64748b" stroke-width="1.5" stroke-dasharray="3,3"/>
          <path d="M 500 340 L 500 370" stroke="#818cf8" stroke-width="2"/>
        </svg>
      </div>
    </div>
  `;
}

// Microservices Tab
function renderMicroservicesTab() {
  const services = [
    {
      name: 'source-federation-service',
      port: 4001,
      icon: '🌐',
      desc: 'Controls Zero-Copy Lakehouse Federation adapters, external catalog views, and Delta Sharing protocol endpoints.',
      routes: ['POST /v1/federation/catalogs', 'GET /v1/federation/sources/:id/schema', 'POST /v1/federation/test-pushdown'],
      contract: 'SourceConnectionConfig, VirtualCatalogSpec, PushdownCapability'
    },
    {
      name: 'lakebase-metastore-service',
      port: 4002,
      icon: '🗄️',
      desc: 'Active system metastore residing directly inside Databricks Unity Catalog Delta tables (system.unify_lakebase).',
      routes: ['GET /v1/metastore/entities', 'POST /v1/metastore/entities/:id/version', 'PUT /v1/metastore/survivorship-matrix'],
      contract: 'CanonicalEntityModel, AttributeMappingRule, LakebaseMetadataSnapshot'
    },
    {
      name: 'layer-spawner-service',
      port: 4003,
      icon: '🏗️',
      desc: 'Provisions, drops, and clones physical or virtual database layers on Databricks Serverless compute on demand.',
      routes: ['POST /v1/layers/spawn', 'GET /v1/layers/active', 'POST /v1/layers/:id/clone-sandbox'],
      contract: 'SpawnLayerRequest, LayerProvisionResult, LayerLifecycleState'
    },
    {
      name: 'pipeline-orchestrator-service',
      port: 4004,
      icon: '🔄',
      desc: 'Compiles visual pipeline graphs into Databricks Asset Bundles (databricks.yml) and Delta Live Tables (DLT) python/sql specs.',
      routes: ['POST /v1/pipelines/compile-dabs', 'POST /v1/pipelines/deploy', 'GET /v1/pipelines/:id/runs'],
      contract: 'PipelineDagConfig, DltPipelineSpec, JobRunTelemetry'
    },
    {
      name: 'dq-intelligence-service',
      port: 4005,
      icon: '🛡️',
      desc: 'Runs schema profiling, Great Expectations assertions, and anomaly detection over live federated and Delta data.',
      routes: ['POST /v1/dq/profile-stream', 'GET /v1/dq/assertions/:entity', 'POST /v1/dq/quarantine-records'],
      contract: 'DqRuleSpec, ProfilingMetric, DqIssueAlert'
    },
    {
      name: 'unification-engine-service',
      port: 4006,
      icon: '⚡',
      desc: 'Executes Fellegi-Sunter probabilistic matching, fuzzy phonetic comparisons, and survivorship resolution algorithms.',
      routes: ['POST /v1/unification/match-batch', 'POST /v1/unification/simulate-weights', 'GET /v1/unification/clusters/:id'],
      contract: 'MatchStrategy, SurvivorshipMatrix, GoldenCluster'
    },
    {
      name: 'genie-zerocopy-query-service',
      port: 4007,
      icon: '🔮',
      desc: 'Configures Databricks Genie Spaces, injects semantic business context, and executes natural language zero-copy queries.',
      routes: ['POST /v1/genie/spaces/provision', 'POST /v1/genie/query-prompt', 'GET /v1/genie/explain-pushdown'],
      contract: 'GenieSpaceConfig, ZeroCopyQueryPlan, GeniePromptResponse'
    },
    {
      name: 'entity360-activation-service',
      port: 4008,
      icon: '🚀',
      desc: 'Exposes sub-millisecond GraphQL and REST Entity 360 endpoints, identity graph traversals, and reverse ETL writebacks.',
      routes: ['GET /v1/entities/:id/profile', 'GET /v1/entities/:id/graph', 'POST /v1/activation/sync-salesforce'],
      contract: 'Entity360Profile, IdentityGraphNode, ActivationJob'
    }
  ];

  return `
    <div style="margin-bottom: 20px;">
      <h3 style="font-family: var(--font-display); font-size: 18px; color: #fff; margin-bottom: 6px;">
        TypeScript Microservices Portfolio
      </h3>
      <p style="color: var(--text-secondary); font-size: 13px;">
        8 purpose-built microservices written in strict TypeScript. Packaged as lightweight containerized microservices running on 
        Databricks Apps or Kubernetes clusters.
      </p>
    </div>

    <div class="grid-2">
      ${services.map(s => `
        <div class="card" style="padding: 20px;">
          <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 12px;">
            <div style="display: flex; align-items: center; gap: 10px;">
              <span style="font-size: 20px;">${s.icon}</span>
              <div>
                <strong style="color: #fff; font-family: var(--font-mono); font-size: 14px;">${s.name}</strong>
                <div style="font-size: 11px; color: var(--text-muted);">Port :${s.port} • TypeScript / Fastify</div>
              </div>
            </div>
            <span class="badge badge-success">Healthy</span>
          </div>

          <p style="color: var(--text-secondary); font-size: 12.5px; line-height: 1.5; margin-bottom: 14px;">
            ${s.desc}
          </p>

          <div style="background: rgba(0, 0, 0, 0.25); border-radius: 6px; padding: 8px 12px; margin-bottom: 12px;">
            <div style="font-size: 10.5px; font-weight: 600; color: var(--text-muted); text-transform: uppercase; margin-bottom: 4px;">Primary API Endpoints:</div>
            ${s.routes.map(r => `<div style="font-family: var(--font-mono); font-size: 11.5px; color: #cbd5e1; margin-bottom: 2px;">• ${r}</div>`).join('')}
          </div>

          <div style="font-size: 11px; color: var(--text-muted);">
            TS Interfaces: <code style="color: var(--secondary);">${s.contract}</code>
          </div>
        </div>
      `).join('')}
    </div>
  `;
}

// Lakebase Metastore Tab
function renderLakebaseTab() {
  return `
    <div class="card" style="padding: 24px; margin-bottom: 24px;">
      <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 12px;">
        <h3 style="font-family: var(--font-display); font-size: 18px; color: #fff; margin: 0;">
          🗄️ Databricks Lakebase Active Metastore & Dual-Tier Architecture
        </h3>
        <span class="tag" style="background: rgba(99, 102, 241, 0.15); color: var(--primary-light); font-weight: 600;">EPIC 2 / TASK-2.4</span>
      </div>
      <p style="color: var(--text-secondary); font-size: 13.5px; line-height: 1.6; margin-bottom: 16px;">
        Databricks Lakebase serves as the unified metastore for Unify AI. Stored under the dedicated Unity Catalog schema 
        <code>system.unify_lakebase</code>, it manages the full catalog of business entities, dynamic layer states, 
        pipeline definitions, and survivorship matrices as governed Delta tables.
      </p>

      <div class="grid-3" style="margin-bottom: 24px;">
        <div style="background: rgba(0, 0, 0, 0.3); border: 1px solid var(--border-subtle); border-radius: 8px; padding: 14px;">
          <strong style="color: var(--primary-light); font-family: var(--font-mono); font-size: 13px;">system.unify_lakebase.entities</strong>
          <p style="color: var(--text-secondary); font-size: 12px; margin-top: 6px;">Canonical model definitions, domain associations, surrogate key strategies.</p>
        </div>
        <div style="background: rgba(0, 0, 0, 0.3); border: 1px solid var(--border-subtle); border-radius: 8px; padding: 14px;">
          <strong style="color: var(--secondary); font-family: var(--font-mono); font-size: 13px;">system.unify_lakebase.dynamic_layers</strong>
          <p style="color: var(--text-secondary); font-size: 12px; margin-top: 6px;">Catalog, schema, and view/table states for v_bronze, silver, gold, and sandboxes.</p>
        </div>
        <div style="background: rgba(0, 0, 0, 0.3); border: 1px solid var(--border-subtle); border-radius: 8px; padding: 14px;">
          <strong style="color: var(--warning); font-family: var(--font-mono); font-size: 13px;">system.unify_lakebase.match_rules</strong>
          <p style="color: var(--text-secondary); font-size: 12px; margin-top: 6px;">Fellegi-Sunter weights, fuzzy algorithms, blocking keys, survivorship priorities.</p>
        </div>
      </div>

      <!-- Architectural Inquiry: Why Lakebase Alone Cannot Serve Operational Hot Path -->
      <div style="background: rgba(245, 158, 11, 0.08); border-left: 4px solid #f59e0b; padding: 16px 20px; border-radius: 0 8px 8px 0; margin-bottom: 24px;">
        <div style="color: #fbbf24; font-weight: 700; font-size: 14px; margin-bottom: 6px; display: flex; align-items: center; gap: 8px;">
          <span>⚡</span> Architectural Rationale: Can Lakebase Alone Serve the Operational Hot Path?
        </div>
        <p style="color: #e2e8f0; font-size: 13px; line-height: 1.6; margin: 0 0 10px 0;">
          While Delta Lake is the optimal governed system of record (L2), using it directly for operational UI interactions and multi-steward edits creates fundamental mismatches:
        </p>
        <ul style="color: #cbd5e1; font-size: 12.5px; line-height: 1.6; margin: 0 0 0 18px; padding: 0;">
          <li><strong>OLAP Query Latency:</strong> Serverless SQL API queries take 200ms–2,000ms+ (statement dispatch & polling), whereas interactive UI requires sub-5ms responses.</li>
          <li><strong>Delta OCC Write Collisions:</strong> Delta Lake throws <code>ConcurrentModificationException</code> when multiple stewards or services merge changes into the same table simultaneously.</li>
          <li><strong>Absence of Distributed Mutexes:</strong> Delta Lake lacks sub-second leasing with monotonic fencing tokens needed to coordinate steward merge sessions (<code>golden_record:&lt;id&gt;</code>).</li>
          <li><strong>Compute DBU Churn:</strong> Continuous polling and micro-reads burn expensive Databricks Serverless compute.</li>
        </ul>
      </div>

      <!-- TASK-2.4 Dual-Tier Solution & Comparison -->
      <div style="background: rgba(15, 23, 42, 0.6); border: 1px solid rgba(99, 102, 241, 0.3); border-radius: 8px; padding: 18px; margin-bottom: 24px;">
        <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 12px;">
          <h4 style="color: #fff; font-size: 14px; margin: 0; font-family: var(--font-mono); display: flex; align-items: center; gap: 8px;">
            <span>🛡️</span> TASK-2.4: Low-Latency Operational Cache & Delta Write-Through Synchronizer
          </h4>
          <span style="font-family: var(--font-mono); font-size: 11px; color: var(--primary-light);">packages/@unify/operational-cache</span>
        </div>
        <p style="color: var(--text-secondary); font-size: 12.5px; line-height: 1.6; margin-bottom: 14px;">
          TASK-2.4 introduces a dual-tier metastore architecture: PostgreSQL/Redis acts as the <strong>L1 Operational Tier</strong> for sub-5ms UI reads and distributed steward locks, while Databricks Lakebase acts as the <strong>L2 Master System of Record</strong>.
        </p>

        <!-- Compact Comparison Table -->
        <table style="width: 100%; font-size: 12px; border-collapse: collapse; margin-bottom: 14px;">
          <thead>
            <tr style="background: rgba(30, 41, 59, 0.6);">
              <th style="padding: 8px 10px; color: var(--primary-light); text-align: left; border-bottom: 1px solid var(--border-subtle); width: 25%;">Feature</th>
              <th style="padding: 8px 10px; color: #f87171; text-align: left; border-bottom: 1px solid var(--border-subtle); width: 35%;">Lakebase Alone (Delta)</th>
              <th style="padding: 8px 10px; color: #34d399; text-align: left; border-bottom: 1px solid var(--border-subtle); width: 40%;">Dual-Tier Metastore (TASK-2.4)</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style="padding: 8px 10px; font-weight: 600; color: #e2e8f0; border-bottom: 1px solid rgba(255,255,255,0.05);">Point Read Latency</td>
              <td style="padding: 8px 10px; color: #94a3b8; border-bottom: 1px solid rgba(255,255,255,0.05);">200ms – 2,000ms+ (OLAP REST)</td>
              <td style="padding: 8px 10px; color: #6ee7b7; font-weight: 500; border-bottom: 1px solid rgba(255,255,255,0.05);">&lt; 5ms (cache_entries)</td>
            </tr>
            <tr>
              <td style="padding: 8px 10px; font-weight: 600; color: #e2e8f0; border-bottom: 1px solid rgba(255,255,255,0.05);">Concurrency Control</td>
              <td style="padding: 8px 10px; color: #94a3b8; border-bottom: 1px solid rgba(255,255,255,0.05);">Delta OCC collisions under multi-stewards</td>
              <td style="padding: 8px 10px; color: #6ee7b7; font-weight: 500; border-bottom: 1px solid rgba(255,255,255,0.05);">Single-writer Outbox worker (0 conflicts)</td>
            </tr>
            <tr>
              <td style="padding: 8px 10px; font-weight: 600; color: #e2e8f0; border-bottom: 1px solid rgba(255,255,255,0.05);">Distributed Locks</td>
              <td style="padding: 8px 10px; color: #94a3b8; border-bottom: 1px solid rgba(255,255,255,0.05);">None natively available</td>
              <td style="padding: 8px 10px; color: #6ee7b7; font-weight: 500; border-bottom: 1px solid rgba(255,255,255,0.05);">Lease manager with monotonic fencing tokens</td>
            </tr>
            <tr>
              <td style="padding: 8px 10px; font-weight: 600; color: #e2e8f0;">Audit Hash Chain</td>
              <td style="padding: 8px 10px; color: #94a3b8;">SHA-256 tamper-proof log in Delta</td>
              <td style="padding: 8px 10px; color: #6ee7b7; font-weight: 500;">Strict FIFO head-of-line sync preserves chain</td>
            </tr>
          </tbody>
        </table>
      </div>

      <h4 style="color: #fff; font-size: 14px; margin-bottom: 8px; font-family: var(--font-mono);">
        Active Metastore DDL in Databricks
      </h4>
      <pre style="background: #090e1a; padding: 16px; border-radius: 8px; overflow-x: auto; color: #e2e8f0; font-size: 12.5px; border: 1px solid var(--border-subtle);"><code>-- Active Metastore Registration for Dynamic Layers
CREATE TABLE IF NOT EXISTS system.unify_lakebase.dynamic_layers (
  layer_id STRING NOT NULL,
  entity_id STRING NOT NULL,
  layer_type STRING NOT NULL, -- 'v_bronze' | 'silver' | 'gold_master' | 'sandbox'
  catalog_name STRING NOT NULL,
  schema_name STRING NOT NULL,
  object_name STRING NOT NULL,
  is_zero_copy BOOLEAN NOT NULL,
  ddl_hash STRING,
  status STRING,              -- 'PROVISIONING' | 'ACTIVE' | 'FAILED'
  created_at TIMESTAMP,
  updated_at TIMESTAMP
)
USING DELTA
TBLPROPERTIES ('delta.enableChangeDataFeed' = 'true');</code></pre>
    </div>
  `;
}

function renderLayerSpawnerTab() {
  return `
    <div class="card" style="padding: 24px;">
      <h3 style="font-family: var(--font-display); font-size: 18px; color: #fff; margin-bottom: 10px;">
        🏗️ Dynamic Layer Spawning in Databricks
      </h3>
      <p style="color: var(--text-secondary); font-size: 13.5px; line-height: 1.6; margin-bottom: 20px;">
        Spawning layers on demand enables agile domain scaling. Instead of manual ticket creation for database tables, 
        architects and automated pipelines can provision zero-copy federated views or optimized Delta tables on Databricks Serverless compute.
      </p>

      <!-- Live Interactive Simulator inside the SPA -->
      <div style="background: #0f172a; border: 1px solid var(--border-accent); border-radius: 12px; padding: 20px; box-shadow: 0 8px 24px rgba(0, 0, 0, 0.4);">
        <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 16px;">
          <div>
            <strong style="color: #fff; font-size: 15px;">⚡ In-App Dynamic Layer Spawner Console</strong>
            <div style="color: var(--text-muted); font-size: 12px;">Configure parameters and trigger instant Databricks DDL synthesis.</div>
          </div>
          <span class="badge badge-success">Ready</span>
        </div>

        <div class="grid-3" style="margin-bottom: 16px;">
          <div>
            <label class="form-label" style="font-size: 11px;">Layer Tier</label>
            <select class="form-select" id="spaSimLayer" onchange="window.unifyUpdateSpaLayerDdl()">
              <option value="v_bronze">Virtual Bronze (Zero-Copy View)</option>
              <option value="silver">Silver Conformed (Delta Lake)</option>
              <option value="gold_master">Gold Master Entity (Delta + XREF)</option>
              <option value="sandbox">Simulation Sandbox (Shallow Clone)</option>
            </select>
          </div>

          <div>
            <label class="form-label" style="font-size: 11px;">Business Entity</label>
            <select class="form-select" id="spaSimEntity" onchange="window.unifyUpdateSpaLayerDdl()">
              <option value="Customer">Customer</option>
              <option value="Supplier">Supplier</option>
              <option value="Account">Commercial Account</option>
              <option value="Product">Product Catalog</option>
            </select>
          </div>

          <div>
            <label class="form-label" style="font-size: 11px;">Target Catalog</label>
            <input type="text" class="form-control" id="spaSimCatalog" value="unify_prod_lakehouse" oninput="window.unifyUpdateSpaLayerDdl()">
          </div>
        </div>

        <div>
          <label class="form-label" style="font-size: 11px;">Synthesized Databricks SQL DDL</label>
          <pre id="spaSimDdlPre" style="background: #090e1a; padding: 14px; border-radius: 8px; font-family: var(--font-mono); font-size: 12px; color: #a5f3fc; border: 1px solid var(--border-subtle); overflow-x: auto;"><code>CREATE OR REPLACE VIEW unify_prod_lakehouse.v_bronze.v_customer_federated AS
SELECT source_record_id, entity_payload, _source_timestamp, 'SFDC-001' AS source_origin_id
FROM foreign_salesforce_catalog.sales_cloud.customer
WITH SCHEMA EVOLUTION
COMMENT 'Zero-Copy Virtual Bronze view over Salesforce system of record';</code></pre>
        </div>

        <div style="display: flex; align-items: center; justify-content: space-between; margin-top: 14px;">
          <button class="btn btn-primary btn-sm" onclick="window.unifyExecuteSpaLayerSpawn()">
            <span>⚡ Spawn Layer in Databricks</span>
          </button>
          <span id="spaSpawnStatus" style="font-size: 12px; color: var(--text-muted); font-family: var(--font-mono);">
            Awaiting action
          </span>
        </div>
      </div>
    </div>
  `;
}

// Pipelines Tab
function renderPipelinesTab() {
  return `
    <div class="card" style="padding: 24px;">
      <h3 style="font-family: var(--font-display); font-size: 18px; color: #fff; margin-bottom: 10px;">
        🔄 Automated Pipeline Synthesis: Databricks Asset Bundles (DABs) & DLT
      </h3>
      <p style="color: var(--text-secondary); font-size: 13.5px; line-height: 1.6; margin-bottom: 20px;">
        The <code>pipeline-orchestrator-service</code> automatically translates UI pipeline configurations into production-grade 
        Databricks Asset Bundles (<code>databricks.yml</code>) and Delta Live Tables (DLT) streaming scripts.
      </p>

      <div class="grid-2">
        <div style="background: #090e1a; padding: 18px; border-radius: 10px; border: 1px solid var(--border-subtle);">
          <strong style="color: #fff; font-family: var(--font-mono); font-size: 13px;">Synthesized databricks.yml (DAB)</strong>
          <pre style="margin-top: 10px; font-size: 12px; color: #e2e8f0; font-family: var(--font-mono); line-height: 1.5;"><code>bundle:
  name: unify_e2e_mastering_pipeline

resources:
  pipelines:
    master_dlt:
      name: "Unify AI - Mastering DLT"
      target: "gold_customer"
      continuous: true
      channel: "preview"
      libraries:
        - notebook:
            path: "/Workspace/Unify/pipelines/customer_dlt.py"
      clusters:
        - label: "default"
          autoscale:
            min_workers: 2
            max_workers: 16</code></pre>
        </div>

        <div style="background: #090e1a; padding: 18px; border-radius: 10px; border: 1px solid var(--border-subtle);">
          <strong style="color: #fff; font-family: var(--font-mono); font-size: 13px;">Delta Live Tables (DLT) Expectation Rules</strong>
          <pre style="margin-top: 10px; font-size: 12px; color: #a7f3d0; font-family: var(--font-mono); line-height: 1.5;"><code>import dlt
from pyspark.sql.functions import col

@dlt.table(
  name="silver_customer_conformed",
  comment="Conformed layer with streaming data quality assertions"
)
@dlt.expect_or_drop("valid_cust_id", "customer_id IS NOT NULL")
@dlt.expect_or_quarantine("valid_email", "email LIKE '%_@__%.__%'")
def silver_customer():
    return (
        dlt.read_stream("v_bronze_salesforce_account")
           .select("id as customer_id", "name", "email", "phone")
    )</code></pre>
        </div>
      </div>
    </div>
  `;
}

// Genie & Zero-Copy Tab
function renderGenieTab() {
  return `
    <div class="card" style="padding: 24px;">
      <h3 style="font-family: var(--font-display); font-size: 18px; color: #fff; margin-bottom: 10px;">
        🔮 Databricks Genie & Zero-Copy Query Engine
      </h3>
      <p style="color: var(--text-secondary); font-size: 13.5px; line-height: 1.6; margin-bottom: 20px;">
        By configuring <strong>Databricks Genie Spaces</strong> over Unity Catalog foreign connections and Delta master tables, 
        business users can ask natural language questions. Databricks Genie translates the question into optimized SQL 
        pushdowns executed against live external source systems with <strong>0 bytes copied</strong>.
      </p>

      <!-- In-App Genie Query Simulator -->
      <div style="background: #0f172a; border: 1px solid var(--border-accent); border-radius: 12px; padding: 20px;">
        <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 14px;">
          <strong style="color: #fff; font-size: 15px;">🔮 Test Databricks Genie Natural Language Query</strong>
          <span class="badge badge-info">Genie Space: Customer 360</span>
        </div>

        <div style="display: flex; gap: 10px; margin-bottom: 12px;">
          <input type="text" class="form-control" id="spaGenieInput" value="Find all EMEA enterprise accounts with revenue > $10M and open support tickets">
          <button class="btn btn-primary btn-sm" onclick="window.unifyRunSpaGenie()" style="white-space: nowrap;">
            <span>Ask Genie ✦</span>
          </button>
        </div>

        <div style="margin-top: 10px;">
          <label class="form-label" style="font-size: 11px;">Genie Generated Zero-Copy SQL (Federated Pushdown)</label>
          <pre id="spaGenieSqlPre" style="background: #090e1a; padding: 14px; border-radius: 8px; font-family: var(--font-mono); font-size: 12px; color: #fbcfe8; border: 1px solid var(--border-subtle); overflow-x: auto;"><code>SELECT 
  g.golden_id,
  sfdc.Name AS enterprise_name,
  sfdc.AnnualRevenue,
  c.CaseNumber
FROM foreign_salesforce.account sfdc
JOIN foreign_salesforce.case c ON sfdc.Id = c.AccountId AND c.Status != 'Closed'
JOIN unify_prod_lakehouse.gold.gold_master_customer g ON g.salesforce_id = sfdc.Id
WHERE sfdc.AnnualRevenue > 10000000
LIMIT 50;</code></pre>
        </div>

        <div id="spaGenieStatus" style="margin-top: 10px; font-size: 12px; color: var(--success); font-family: var(--font-mono);">
          ✓ Pushdown verified: 0 bytes replicated to lakehouse storage. Sub-50ms execution.
        </div>
      </div>
    </div>
  `;
}

// Entity Resolution & Graph Tab
function renderMasteringTab() {
  return `
    <div class="card" style="padding: 24px;">
      <h3 style="font-family: var(--font-display); font-size: 18px; color: #fff; margin-bottom: 10px;">
        👑 Entity Resolution, Survivorship & Identity Graph Engine
      </h3>
      <p style="color: var(--text-secondary); font-size: 13.5px; line-height: 1.6; margin-bottom: 20px;">
        Unify AI applies deterministic, fuzzy (Jaro-Winkler, Levenshtein), and probabilistic (Fellegi-Sunter) 
        match algorithms alongside configurable attribute survivorship rules to create singular golden master records 
        connected by a rich identity graph.
      </p>

      <div class="grid-2">
        <div style="background: rgba(0, 0, 0, 0.25); padding: 18px; border-radius: 10px; border: 1px solid var(--border-subtle);">
          <strong style="color: var(--primary-light); font-size: 14px;">Attribute Survivorship Matrix (Customer)</strong>
          <table class="data-table" style="margin-top: 12px; font-size: 12px;">
            <thead>
              <tr>
                <th>Attribute</th>
                <th>Winning Strategy</th>
                <th>Rule Applied</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Legal Name</td>
                <td><span class="badge badge-success">CRM (Salesforce)</span></td>
                <td>Source Trust Priority</td>
              </tr>
              <tr>
                <td>Primary Phone</td>
                <td><span class="badge badge-info">ERP (SAP S/4)</span></td>
                <td>Most Recent Update (LUD)</td>
              </tr>
              <tr>
                <td>Billing Address</td>
                <td><span class="badge badge-warning">Billing DB</span></td>
                <td>Highest Completeness (100%)</td>
              </tr>
              <tr>
                <td>Tax ID / EIN</td>
                <td><span class="badge badge-primary">KYC Service</span></td>
                <td>Authoritative System</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div style="background: rgba(0, 0, 0, 0.25); padding: 18px; border-radius: 10px; border: 1px solid var(--border-subtle);">
          <strong style="color: var(--secondary); font-size: 14px;">Identity Graph Links</strong>
          <div style="font-family: var(--font-mono); font-size: 12px; color: #cbd5e1; margin-top: 12px; line-height: 1.8;">
            GOLDEN CUSTOMER: CUST-00192837<br/>
            ├── Source Link: Salesforce CRM-10231<br/>
            ├── Source Link: SAP BP-88391<br/>
            ├── Source Link: Web Portal USER-7712<br/>
            ├── Account Edge: ACC-2218 (Commercial)<br/>
            └── Parent Enterprise: ORG-812 (Holding Co.)
          </div>
        </div>
      </div>
    </div>
  `;
}

// E2E MVP Task Specification Tab
function renderMvpSpecTab() {
  const epics = [
    { id: 'EPIC-1', title: 'Workspace & Monorepo Foundation', desc: 'PNPM, Turborepo, @unify/types, @unify/databricks-client SDK wrapper, Docker containerization', tasks: 3, est: 'Week 1', status: 'Approved' },
    { id: 'EPIC-2', title: 'Databricks Lakebase Active Metastore', desc: 'system.unify_lakebase schema, Delta tables for entities, rules, dynamic layers & audit', tasks: 3, est: 'Week 1', status: 'Approved' },
    { id: 'EPIC-3', title: 'Ingestion & Federation Connectors', desc: 'SFDC (Bulk v2 + CDC), PostgreSQL (WAL), Kafka (Structured Stream + DLQ), and S3/ADLS Auto Loader', tasks: 6, est: 'Week 2', status: 'Approved' },
    { id: 'EPIC-4', title: 'Dynamic Layer Spawner Engine', desc: 'State machine & DDL generator for v_bronze, silver, gold_master, and sandbox layers on Serverless SQL', tasks: 3, est: 'Week 2', status: 'Approved' },
    { id: 'EPIC-5', title: 'Automated Pipeline Synthesis (DABs & DLT)', desc: 'AST compiler synthesizing databricks.yml bundles and Delta Live Tables streaming Python pipelines', tasks: 4, est: 'Week 3', status: 'Approved' },
    { id: 'EPIC-6', title: 'Data Quality & Profiling Engine', desc: 'Lakehouse Monitoring, Great Expectations assertion compiler, quarantine table stream routing', tasks: 3, est: 'Week 3', status: 'Approved' },
    { id: 'EPIC-7', title: 'Entity Resolution & Survivorship Engine', desc: 'Deterministic, fuzzy (Jaro-Winkler), and Fellegi-Sunter probabilistic matching with winning survivorship', tasks: 4, est: 'Week 4', status: 'Approved' },
    { id: 'EPIC-8', title: 'Zero-Copy Queries & Databricks Genie', desc: 'Genie Spaces provisioning, semantic context injection, conversational NL-to-SQL pushdown', tasks: 3, est: 'Week 5', status: 'Approved' },
    { id: 'EPIC-9', title: 'Entity 360 & Activation Services', desc: 'Sub-10ms GraphQL profile API, identity graph traversal, Kafka CDC events, reverse ETL writeback', tasks: 2, est: 'Week 5', status: 'Approved' },
    { id: 'EPIC-10', title: 'React 19 + TypeScript Enterprise UI', desc: 'Visual Layer Spawner, Pipeline DAG builder, Data Steward Review Queue, Genie drawer', tasks: 6, est: 'Week 6', status: 'Approved' },
    { id: 'EPIC-11', title: 'End-to-End Verification & Golden Path Testing', desc: 'Golden Customer journey test with 2M Salesforce + 8M SAP records, Vitest & Playwright suites', tasks: 2, est: 'Week 6', status: 'Approved' }
  ];

  return `
    <div class="card" style="padding: 24px;">
      <div style="display: flex; align-items: flex-start; justify-content: space-between; margin-bottom: 20px; flex-wrap: wrap; gap: 12px;">
        <div>
          <div style="display: inline-flex; align-items: center; gap: 6px; padding: 3px 10px; border-radius: 12px; background: rgba(16, 185, 129, 0.15); border: 1px solid rgba(16, 185, 129, 0.3); color: var(--success); font-size: 11px; font-weight: 600; margin-bottom: 6px;">
            <span>●</span>
            <span>ENGINEERING IMPLEMENTATION SPECIFICATION v1.0.0-MVP</span>
          </div>
          <h3 style="font-family: var(--font-display); font-size: 20px; color: #fff; margin-bottom: 4px;">
            📋 End-to-End MVP Task Specification & Work Breakdown
          </h3>
          <p style="color: var(--text-secondary); font-size: 13.5px; max-width: 850px;">
            Exhaustive work breakdown structure across 11 epics, covering the entire Customer Domain Unification MVP on Databricks Lakehouse.
          </p>
        </div>

        <div style="display: flex; gap: 10px;">
          <a href="./e2e_mvp_task_spec.md" target="_blank" class="btn btn-outline btn-sm" style="display: inline-flex; align-items: center; gap: 6px; text-decoration: none;">
            <span>📄 View Raw Markdown Spec</span>
          </a>
        </div>
      </div>

      <!-- 6-Week Sprint Timeline -->
      <div style="background: rgba(0, 0, 0, 0.3); border: 1px solid var(--border-subtle); border-radius: 12px; padding: 18px 20px; margin-bottom: 24px;">
        <strong style="color: var(--primary-light); font-size: 13px; text-transform: uppercase; letter-spacing: 0.05em; display: block; margin-bottom: 12px;">
          🚀 6-Week MVP Delivery Roadmap
        </strong>
        <div style="display: grid; grid-template-columns: repeat(6, 1fr); gap: 10px;">
          <div style="background: #0f172a; padding: 12px; border-radius: 8px; border-left: 3px solid var(--primary);">
            <div style="font-family: var(--font-mono); font-size: 10.5px; color: var(--primary-light); font-weight: bold;">WEEK 1</div>
            <div style="color: #fff; font-size: 12px; font-weight: 600; margin-top: 4px;">Monorepo & Lakebase</div>
            <div style="color: var(--text-muted); font-size: 10.5px; margin-top: 2px;">Epics 1 & 2</div>
          </div>
          <div style="background: #0f172a; padding: 12px; border-radius: 8px; border-left: 3px solid var(--secondary);">
            <div style="font-family: var(--font-mono); font-size: 10.5px; color: var(--secondary); font-weight: bold;">WEEK 2</div>
            <div style="color: #fff; font-size: 12px; font-weight: 600; margin-top: 4px;">Federation & Layer Spawner</div>
            <div style="color: var(--text-muted); font-size: 10.5px; margin-top: 2px;">Epics 3 & 4</div>
          </div>
          <div style="background: #0f172a; padding: 12px; border-radius: 8px; border-left: 3px solid #a855f7;">
            <div style="font-family: var(--font-mono); font-size: 10.5px; color: #a855f7; font-weight: bold;">WEEK 3</div>
            <div style="color: #fff; font-size: 12px; font-weight: 600; margin-top: 4px;">Automated Pipelines & DQ</div>
            <div style="color: var(--text-muted); font-size: 10.5px; margin-top: 2px;">Epics 5 & 6</div>
          </div>
          <div style="background: #0f172a; padding: 12px; border-radius: 8px; border-left: 3px solid var(--warning);">
            <div style="font-family: var(--font-mono); font-size: 10.5px; color: var(--warning); font-weight: bold;">WEEK 4</div>
            <div style="color: #fff; font-size: 12px; font-weight: 600; margin-top: 4px;">Entity Resolution & Surv.</div>
            <div style="color: var(--text-muted); font-size: 10.5px; margin-top: 2px;">Epic 7</div>
          </div>
          <div style="background: #0f172a; padding: 12px; border-radius: 8px; border-left: 3px solid #ec4899;">
            <div style="font-family: var(--font-mono); font-size: 10.5px; color: #ec4899; font-weight: bold;">WEEK 5</div>
            <div style="color: #fff; font-size: 12px; font-weight: 600; margin-top: 4px;">Genie Zero-Copy & 360</div>
            <div style="color: var(--text-muted); font-size: 10.5px; margin-top: 2px;">Epics 8 & 9</div>
          </div>
          <div style="background: #0f172a; padding: 12px; border-radius: 8px; border-left: 3px solid var(--success);">
            <div style="font-family: var(--font-mono); font-size: 10.5px; color: var(--success); font-weight: bold;">WEEK 6</div>
            <div style="color: #fff; font-size: 12px; font-weight: 600; margin-top: 4px;">React UI & Golden Path</div>
            <div style="color: var(--text-muted); font-size: 10.5px; margin-top: 2px;">Epics 10 & 11</div>
          </div>
        </div>
      </div>

      <!-- Epics Grid -->
      <h4 style="color: #fff; font-size: 16px; margin-bottom: 14px;">The 11 Core Engineering Epics</h4>
      <div class="grid-2">
        ${epics.map(e => `
          <div style="background: rgba(15, 23, 42, 0.6); border: 1px solid var(--border-subtle); border-radius: 10px; padding: 16px;">
            <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 8px;">
              <span style="font-family: var(--font-mono); font-size: 11.5px; font-weight: 700; color: var(--primary-light);">${e.id}</span>
              <span class="badge badge-neutral" style="font-size: 10px;">${e.est} • ${e.tasks} Tasks</span>
            </div>
            <strong style="color: #fff; font-size: 13.5px; display: block; margin-bottom: 4px;">${e.title}</strong>
            <p style="color: var(--text-secondary); font-size: 12px; line-height: 1.5;">${e.desc}</p>
          </div>
        `).join('')}
      </div>

      <!-- Definition of Done Checklist -->
      <div style="margin-top: 24px; padding: 18px 20px; background: rgba(99, 102, 241, 0.08); border-left: 4px solid var(--primary); border-radius: 0 10px 10px 0;">
        <strong style="color: #fff; font-size: 14px;">Definition of Done (DoD) for MVP:</strong>
        <ul style="margin: 8px 0 0 18px; font-size: 12.5px; color: #cbd5e1; line-height: 1.7;">
          <li>✓ <strong>Zero Data Replication</strong>: Raw data federated via Unity Catalog without bulk replication into Lakehouse Delta storage.</li>
          <li>✓ <strong>Lakebase as Metastore</strong>: All models, dynamic layers, and match rules read/written to <code>system.unify_lakebase</code>.</li>
          <li>✓ <strong>Automated Dynamic Layer Spawner</strong>: <code>v_bronze</code>, <code>silver</code>, <code>gold_master</code>, and <code>sandbox</code> layers spawned via Serverless SQL on demand.</li>
          <li>✓ <strong>Automated Pipeline Synthesis</strong>: Visual DAG compiled into Databricks Asset Bundle (DAB) and deployed to Delta Live Tables (DLT).</li>
          <li>✓ <strong>Zero-Copy Genie Queries</strong>: Databricks Genie executes pushdown queries against live sources with 0 bytes lakehouse storage.</li>
          <li>✓ <strong>Type Safety</strong>: 100% TypeScript coverage across all 8 microservices and React 19 frontend.</li>
        </ul>
      </div>
    </div>
  `;
}

// In-App Interactivity Handlers
window.unifyUpdateSpaLayerDdl = () => {
  const layer = document.getElementById('spaSimLayer')?.value || 'v_bronze';
  const entity = document.getElementById('spaSimEntity')?.value || 'Customer';
  const catalog = document.getElementById('spaSimCatalog')?.value || 'unify_prod_lakehouse';
  const pre = document.getElementById('spaSimDdlPre');
  if (!pre) return;

  if (layer === 'v_bronze') {
    pre.innerHTML = `<code>CREATE OR REPLACE VIEW ${catalog}.v_bronze.v_${entity.toLowerCase()}_federated AS
SELECT source_record_id, entity_payload, _source_timestamp, 'SFDC-001' AS source_origin_id
FROM foreign_salesforce_catalog.sales_cloud.${entity.toLowerCase()}
WITH SCHEMA EVOLUTION
COMMENT 'Zero-Copy Virtual Bronze view over Salesforce system of record';</code>`;
  } else if (layer === 'silver') {
    pre.innerHTML = `<code>CREATE OR REPLACE TABLE ${catalog}.silver.silver_${entity.toLowerCase()}_conformed (
  conformed_id STRING NOT NULL,
  primary_name STRING,
  standardized_email STRING,
  dq_score DOUBLE,
  source_system STRING,
  conformed_at TIMESTAMP
)
USING DELTA
PARTITIONED BY (source_system)
TBLPROPERTIES ('delta.enableChangeDataFeed' = 'true');</code>`;
  } else if (layer === 'gold_master') {
    pre.innerHTML = `<code>CREATE OR REPLACE TABLE ${catalog}.gold.gold_master_${entity.toLowerCase()} (
  golden_id STRING NOT NULL PRIMARY KEY,
  master_attributes MAP<STRING, STRING>,
  confidence_score DOUBLE,
  winning_sources MAP<STRING, STRING>,
  created_at TIMESTAMP
)
USING DELTA;</code>`;
  } else {
    pre.innerHTML = `<code>CREATE OR REPLACE TABLE ${catalog}.sandbox.sim_sandbox_${entity.toLowerCase()}
SHALLOW CLONE ${catalog}.silver.silver_${entity.toLowerCase()}_conformed
TBLPROPERTIES ('unify.sandbox_ttl_hours' = '48');</code>`;
  }
};

window.unifyExecuteSpaLayerSpawn = () => {
  const status = document.getElementById('spaSpawnStatus');
  if (!status) return;
  status.innerHTML = '<span style="color: var(--secondary);">⏳ Spawning layer in Databricks Serverless SQL...</span>';
  setTimeout(() => {
    status.innerHTML = '<span style="color: var(--success); font-weight: bold;">✓ Layer spawned in Databricks and registered in Lakebase metastore! (35ms)</span>';
  }, 650);
};

window.unifyRunSpaGenie = () => {
  const input = document.getElementById('spaGenieInput')?.value || '';
  const pre = document.getElementById('spaGenieSqlPre');
  const status = document.getElementById('spaGenieStatus');
  if (!pre) return;

  pre.innerHTML = `<code>-- Databricks Genie: Pushed down Zero-Copy query
SELECT 
  g.golden_id,
  sfdc.Name AS enterprise_name,
  sfdc.AnnualRevenue,
  c.CaseNumber,
  c.Subject
FROM foreign_salesforce.account sfdc
JOIN foreign_salesforce.case c ON sfdc.Id = c.AccountId AND c.Status != 'Closed'
JOIN unify_prod_lakehouse.gold.gold_master_customer g ON g.salesforce_id = sfdc.Id
WHERE sfdc.AnnualRevenue > 10000000
/* Predicates executed in Salesforce adapter without data movement */
LIMIT 50;</code>`;

  if (status) {
    status.innerHTML = '✓ Pushdown verified: 0 bytes replicated to lakehouse storage. Sub-50ms execution.';
  }
};
