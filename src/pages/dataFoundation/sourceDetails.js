// Page 8: Source Details with 8 Tabs (Route: /data-foundation/sources/:sourceId)
import { renderBreadcrumbs } from '../../components/breadcrumbs.js';
import { repository } from '../../services/repository.js';

export async function renderSourceDetailsPage(params) {
  const sourceId = params.sourceId || 'src-salesforce';
  const source = (await repository.getSource(sourceId)) || (await repository.getSources())[0];

  return `
    <div class="page-container">
      <div style="margin-bottom: 12px;">
        ${renderBreadcrumbs([
          { label: 'Data Foundation', route: '#/data-foundation/sources' },
          { label: 'Sources', route: '#/data-foundation/sources' },
          { label: source.name, route: `#/data-foundation/sources/${source.id}` }
        ])}
      </div>

      <!-- Header with Status and Primary Actions -->
      <div class="page-header">
        <div class="page-title-group">
          <div style="display: flex; align-items: center; gap: 10px;">
            <h1 class="page-title">${source.name}</h1>
            <span class="badge badge-success">${source.status}</span>
            <span class="badge badge-info">${source.access}</span>
          </div>
          <p class="page-description">Source ID: <code>${source.id}</code> • Entity: <strong>${source.entity}</strong> • Synced: ${source.lastSync}</p>
        </div>
        <div class="page-actions">
          <a href="#/data-foundation/discovery" class="btn btn-secondary">
            <span>🔍</span> Run Discovery
          </a>
          <a href="#/data-foundation/profiles" class="btn btn-secondary">
            <span>📊</span> Profile Data
          </a>
          <a href="#/data-foundation/mappings" class="btn btn-primary">
            <span>⚡</span> Open Schema Mapping →
          </a>
        </div>
      </div>

      <!-- 8-Tab Navigation (Section 8) -->
      <div class="tabs-nav" id="source-details-tabs">
        <button class="tab-btn active" onclick="window.unifySwitchTab(this, 'tab-overview')">Overview</button>
        <button class="tab-btn" onclick="window.unifySwitchTab(this, 'tab-schema')">Schema</button>
        <button class="tab-btn" onclick="window.unifySwitchTab(this, 'tab-objects')">Objects (${source.objectsCount})</button>
        <button class="tab-btn" onclick="window.unifySwitchTab(this, 'tab-access')">Access & Zero-Copy</button>
        <button class="tab-btn" onclick="window.unifySwitchTab(this, 'tab-profile')">Profile Stats</button>
        <button class="tab-btn" onclick="window.unifySwitchTab(this, 'tab-jobs')">Sync Jobs</button>
        <button class="tab-btn" onclick="window.unifySwitchTab(this, 'tab-lineage')">Source Lineage</button>
        <button class="tab-btn" onclick="window.unifySwitchTab(this, 'tab-settings')">Settings</button>
      </div>

      <!-- TAB 1: Overview -->
      <div class="tab-content-pane" id="tab-overview">
        <div class="grid-3" style="margin-bottom: 20px;">
          <div class="kpi-card">
            <span class="kpi-label">Virtual Records</span>
            <div class="kpi-value">${source.records}</div>
            <div class="kpi-delta positive"><span>●</span> Zero-copy query pushdown</div>
          </div>
          <div class="kpi-card">
            <span class="kpi-label">API Latency</span>
            <div class="kpi-value">${source.latency}</div>
            <div class="kpi-delta positive"><span>⚡</span> High throughput tier</div>
          </div>
          <div class="kpi-card">
            <span class="kpi-label">Connection Health</span>
            <div class="kpi-value" style="color: #34d399;">${source.health}</div>
            <div class="kpi-delta positive"><span>✓</span> 0 connection dropouts</div>
          </div>
        </div>

        <div class="grid-2">
          <div class="card">
            <h3 style="font-size: 14px; font-weight: 600; color: #fff; margin-bottom: 12px;">Connection Metadata</h3>
            <table style="width: 100%; border-collapse: collapse; font-size: 12.5px;">
              <tr style="border-bottom: 1px solid var(--border-subtle);"><td style="padding: 8px 0; color: var(--text-muted);">Connector Provider</td><td style="color: #fff;">Enterprise Zero-Copy Adapter</td></tr>
              <tr style="border-bottom: 1px solid var(--border-subtle);"><td style="padding: 8px 0; color: var(--text-muted);">Endpoint Host</td><td style="font-family: var(--font-mono); color: #fff;">salesforce.us-east.enterprise</td></tr>
              <tr style="border-bottom: 1px solid var(--border-subtle);"><td style="padding: 8px 0; color: var(--text-muted);">Authorization Mode</td><td style="color: #38bdf8;">OAuth 2.0 JWT Bearer</td></tr>
              <tr style="border-bottom: 1px solid var(--border-subtle);"><td style="padding: 8px 0; color: var(--text-muted);">Assigned Domain</td><td style="color: #c084fc;">Customer (MDM Canonical)</td></tr>
              <tr><td style="padding: 8px 0; color: var(--text-muted);">Change Data Capture</td><td style="color: #34d399;">Active • Real-time Pub/Sub</td></tr>
            </table>
          </div>

          <div class="card">
            <h3 style="font-size: 14px; font-weight: 600; color: #fff; margin-bottom: 12px;">Next Actions</h3>
            <p style="font-size: 12px; color: var(--text-secondary); margin-bottom: 14px;">
              This source is actively participating in entity resolution for <strong>Customer Standard v4</strong>.
            </p>
            <div style="display: flex; flex-direction: column; gap: 8px;">
              <a href="#/data-foundation/discovery" class="btn btn-secondary" style="justify-content: flex-start;">
                <span>🔍</span> Review Discovered Semantic Fields
              </a>
              <a href="#/data-foundation/mappings" class="btn btn-secondary" style="justify-content: flex-start;">
                <span>⚡</span> Verify AI Field Mappings (7 Active)
              </a>
              <a href="#/data-foundation/profiles" class="btn btn-secondary" style="justify-content: flex-start;">
                <span>📊</span> View Null Rates & Completeness Profiles
              </a>
            </div>
          </div>
        </div>
      </div>

      <!-- TAB 2: Schema -->
      <div class="tab-content-pane" id="tab-schema" style="display: none;">
        <div class="table-card">
          <div class="table-toolbar">
            <span style="font-weight: 600; color: #fff;">Salesforce Account Discovered Schema</span>
            <span class="badge badge-info">46 Columns</span>
          </div>
          <table class="data-table">
            <thead>
              <tr>
                <th>Column Name</th>
                <th>Physical Type</th>
                <th>Nullable</th>
                <th>Semantic Role</th>
                <th>Canonical Mapping</th>
              </tr>
            </thead>
            <tbody>
              <tr><td class="cell-mono cell-highlight">Id</td><td>string(18)</td><td>No</td><td>Primary Key</td><td><span class="badge badge-success">account.identifier</span></td></tr>
              <tr><td class="cell-mono cell-highlight">Name</td><td>string(255)</td><td>No</td><td>Organization Name</td><td><span class="badge badge-success">organization.name</span></td></tr>
              <tr><td class="cell-mono cell-highlight">BillingStreet</td><td>string(255)</td><td>Yes</td><td>Address Line</td><td><span class="badge badge-success">address.line1</span></td></tr>
              <tr><td class="cell-mono cell-highlight">BillingCity</td><td>string(40)</td><td>Yes</td><td>City Name</td><td><span class="badge badge-success">address.city</span></td></tr>
              <tr><td class="cell-mono cell-highlight">Phone</td><td>phone</td><td>Yes</td><td>Primary Phone</td><td><span class="badge badge-success">contact.phone</span></td></tr>
              <tr><td class="cell-mono cell-highlight">Website</td><td>url</td><td>Yes</td><td>Web URL</td><td><span class="badge badge-success">organization.website</span></td></tr>
            </tbody>
          </table>
        </div>
      </div>

      <!-- Other tabs placeholder panes with clean structure -->
      <div class="tab-content-pane" id="tab-objects" style="display: none;">
        <div class="card">
          <h3 style="font-size: 14px; font-weight: 600; color: #fff; margin-bottom: 8px;">Active Integrated Objects</h3>
          <p style="font-size: 12px; color: var(--text-secondary); margin-bottom: 14px;">Virtual query pushdown enabled for the following tables:</p>
          <div class="grid-2">
            <div style="padding: 12px; border: 1px solid var(--border-default); border-radius: 6px;">
              <strong>Account</strong>: 2,048,190 records (Customer Domain)
            </div>
            <div style="padding: 12px; border: 1px solid var(--border-default); border-radius: 6px;">
              <strong>Contact</strong>: 4,192,000 records (Individual Stakeholders)
            </div>
          </div>
        </div>
      </div>

      <div class="tab-content-pane" id="tab-access" style="display: none;">
        <div class="card">
          <h3 style="font-size: 14px; font-weight: 600; color: #fff; margin-bottom: 8px;">Zero-Copy Virtualization Architecture</h3>
          <p style="font-size: 12px; color: var(--text-secondary);">
            Queries executed against this source are federated directly using zero-copy predicates. No operational data is stored on disk outside of volatile join caches.
          </p>
        </div>
      </div>

      <div class="tab-content-pane" id="tab-profile" style="display: none;">
        <div class="card">
          <h3 style="font-size: 14px; font-weight: 600; color: #fff; margin-bottom: 8px;">Source Data Profile</h3>
          <p style="font-size: 12px; color: var(--text-secondary); margin-bottom: 12px;">Completeness: 97.4% • Uniqueness: 88.2% • Validity: 98.7%</p>
          <a href="#/data-foundation/profiles" class="btn btn-secondary btn-sm">Open Deep Profiler →</a>
        </div>
      </div>

      <div class="tab-content-pane" id="tab-jobs" style="display: none;">
        <div class="card">
          <h3 style="font-size: 14px; font-weight: 600; color: #fff; margin-bottom: 8px;">Active CDC Execution Jobs</h3>
          <p style="font-size: 12px; color: var(--text-secondary); margin-bottom: 12px;">Job <code>job-9821</code> is streaming live updates (14,209 changes in last 10m).</p>
          <a href="#/operations/jobs" class="btn btn-secondary btn-sm">View Jobs Registry →</a>
        </div>
      </div>

      <div class="tab-content-pane" id="tab-lineage" style="display: none;">
        <div class="card">
          <h3 style="font-size: 14px; font-weight: 600; color: #fff; margin-bottom: 8px;">Source-to-Consumer Lineage Flow</h3>
          <p style="font-size: 12px; color: var(--text-secondary); margin-bottom: 12px;">Salesforce CRM → Field Standardization #12 → Entity Matcher → Golden Customer CUST-00192837</p>
          <a href="#/governance/lineage" class="btn btn-secondary btn-sm">Inspect Interactive Lineage Graph →</a>
        </div>
      </div>

      <div class="tab-content-pane" id="tab-settings" style="display: none;">
        <div class="card">
          <h3 style="font-size: 14px; font-weight: 600; color: #fff; margin-bottom: 8px;">Connector Settings & Security</h3>
          <div class="form-group" style="max-width: 400px; margin-top: 14px;">
            <label class="form-label">Query Timeout (Seconds)</label>
            <input type="number" class="form-input" value="30">
          </div>
          <button class="btn btn-danger btn-sm" onclick="alert('Disabled for demo safety.')">Disconnect Source</button>
        </div>
      </div>
    </div>
  `;
}
