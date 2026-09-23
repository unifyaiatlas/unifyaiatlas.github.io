// Page 7: Add Source 7-Step Wizard (Route: /data-foundation/sources/new)
import { renderBreadcrumbs } from '../../components/breadcrumbs.js';
import { repository } from '../../services/repository.js';

export async function renderAddSourcePage() {
  return `
    <div class="page-container" style="max-width: 900px; margin: 0 auto;">
      <div style="margin-bottom: 12px;">
        ${renderBreadcrumbs([
          { label: 'Data Foundation', route: '#/data-foundation/sources' },
          { label: 'Sources', route: '#/data-foundation/sources' },
          { label: 'New Source Connection', route: '#/data-foundation/sources/new' }
        ])}
      </div>

      <div class="page-header">
        <div class="page-title-group">
          <h1 class="page-title">Connect New Enterprise Data Source</h1>
          <p class="page-description">Configure zero-copy virtual access or materialized ingestion pipeline.</p>
        </div>
      </div>

      <!-- 7-Step Stepper Header (Section 7) -->
      <div class="wizard-stepper" id="source-stepper">
        <div class="wizard-step active" data-step="1" onclick="window.unifySetWizardStep(1)">
          <span class="step-num">1</span>
          <span>Source Type</span>
        </div>
        <div class="step-divider"></div>

        <div class="wizard-step" data-step="2" onclick="window.unifySetWizardStep(2)">
          <span class="step-num">2</span>
          <span>Connection</span>
        </div>
        <div class="step-divider"></div>

        <div class="wizard-step" data-step="3" onclick="window.unifySetWizardStep(3)">
          <span class="step-num">3</span>
          <span>Access Mode</span>
        </div>
        <div class="step-divider"></div>

        <div class="wizard-step" data-step="4" onclick="window.unifySetWizardStep(4)">
          <span class="step-num">4</span>
          <span>Objects</span>
        </div>
        <div class="step-divider"></div>

        <div class="wizard-step" data-step="5" onclick="window.unifySetWizardStep(5)">
          <span class="step-num">5</span>
          <span>Test</span>
        </div>
        <div class="step-divider"></div>

        <div class="wizard-step" data-step="6" onclick="window.unifySetWizardStep(6)">
          <span class="step-num">6</span>
          <span>Discovery</span>
        </div>
        <div class="step-divider"></div>

        <div class="wizard-step" data-step="7" onclick="window.unifySetWizardStep(7)">
          <span class="step-num">7</span>
          <span>Finish</span>
        </div>
      </div>

      <!-- Step Containers -->
      <div class="card" style="padding: 24px; min-height: 420px; display: flex; flex-direction: column; justify-content: space-between;">
        
        <!-- STEP 1: Source Type -->
        <div class="wizard-step-pane" id="step-pane-1">
          <h3 style="font-size: 15px; font-weight: 600; color: #fff; margin-bottom: 6px;">Step 1: Choose Enterprise Connector</h3>
          <p style="font-size: 12.5px; color: var(--text-secondary); margin-bottom: 18px;">Select the operational database, SaaS cloud, or lakehouse system to integrate.</p>

          <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(180px, 1fr)); gap: 12px;" id="source-type-selector">
            ${[
              { id: 'Salesforce', icon: '☁️', label: 'Salesforce', desc: 'CRM, Accounts & Contacts', recommended: true },
              { id: 'Databricks', icon: '🧱', label: 'Databricks', desc: 'Delta Lake & Unity Catalog' },
              { id: 'Snowflake', icon: '❄️', label: 'Snowflake', desc: 'Enterprise Data Warehouse' },
              { id: 'PostgreSQL', icon: '🐘', label: 'PostgreSQL', desc: 'Transactional SQL Database' },
              { id: 'SAP', icon: '🏢', label: 'SAP S/4HANA', desc: 'ERP Business Partners' },
              { id: 'Oracle', icon: '🔴', label: 'Oracle EBS', desc: 'Core Financials & Supply' },
              { id: 'Reltio', icon: '🔄', label: 'Reltio MDM', desc: 'Legacy Master Hub' },
              { id: 'REST', icon: '⚡', label: 'REST API', desc: 'Zero-copy webhook & pull' }
            ].map((t, idx) => `
              <div 
                style="padding: 14px; border: 1px solid ${t.recommended ? 'var(--primary)' : 'var(--border-default)'}; background: ${t.recommended ? 'rgba(99, 102, 241, 0.1)' : 'var(--bg-input)'}; border-radius: var(--radius-md); cursor: pointer; transition: all 0.15s;"
                onclick="window.unifySelectSourceType('${t.id}', this)"
                class="source-type-card ${t.recommended ? 'selected' : ''}"
              >
                <div style="font-size: 24px; margin-bottom: 6px;">${t.icon}</div>
                <div style="font-weight: 600; color: #fff; font-size: 13px;">${t.label}</div>
                <div style="font-size: 11px; color: var(--text-muted); margin-top: 2px;">${t.desc}</div>
                ${t.recommended ? '<span class="badge badge-info" style="margin-top: 8px; font-size: 9px;">Demo Target</span>' : ''}
              </div>
            `).join('')}
          </div>
        </div>

        <!-- STEP 2: Connection Settings -->
        <div class="wizard-step-pane" id="step-pane-2" style="display: none;">
          <h3 style="font-size: 15px; font-weight: 600; color: #fff; margin-bottom: 6px;">Step 2: Salesforce Connection Credentials</h3>
          <p style="font-size: 12.5px; color: var(--text-secondary); margin-bottom: 18px;">Authenticate through OAuth 2.0 or dedicated enterprise connected app.</p>

          <div class="grid-2">
            <div class="form-group">
              <label class="form-label">Instance URL / Custom Domain</label>
              <input type="text" class="form-input" id="cfg-url" value="https://enterprise-us-east.my.salesforce.com">
            </div>
            <div class="form-group">
              <label class="form-label">Authentication Method</label>
              <select class="form-select" id="cfg-auth">
                <option value="oauth">OAuth 2.0 JWT Bearer Token (Recommended)</option>
                <option value="userpass">Connected App Key + Secret</option>
              </select>
            </div>
            <div class="form-group">
              <label class="form-label">Client ID (Consumer Key)</label>
              <input type="text" class="form-input" value="3MVG9l4NxpHBOD.0qwe71928_sfdc_prod_token">
            </div>
            <div class="form-group">
              <label class="form-label">API Version</label>
              <input type="text" class="form-input" value="v59.0 (REST / GraphQL Bulk API 2.0)">
            </div>
          </div>
        </div>

        <!-- STEP 3: Access Mode -->
        <div class="wizard-step-pane" id="step-pane-3" style="display: none;">
          <h3 style="font-size: 15px; font-weight: 600; color: #fff; margin-bottom: 6px;">Step 3: Ingestion & Access Architecture</h3>
          <p style="font-size: 12.5px; color: var(--text-secondary); margin-bottom: 18px;">Configure how Unify AI accesses and unifies records from this source.</p>

          <div style="display: flex; flex-direction: column; gap: 12px;">
            <label style="display: flex; gap: 14px; padding: 14px; border: 1px solid var(--primary); background: rgba(99, 102, 241, 0.08); border-radius: var(--radius-md); cursor: pointer;">
              <input type="radio" name="accessMode" value="Zero-Copy" checked style="margin-top: 3px;">
              <div>
                <div style="font-weight: 600; color: #fff; font-size: 13px; display: flex; align-items: center; gap: 6px;">
                  <span>Zero-Copy Virtualization</span>
                  <span class="badge badge-info">Recommended</span>
                </div>
                <div style="font-size: 12px; color: var(--text-secondary); margin-top: 4px;">
                  Data remains in Salesforce. Unify AI pushes down queries and resolves entities in real-time without duplicating operational storage.
                </div>
              </div>
            </label>

            <label style="display: flex; gap: 14px; padding: 14px; border: 1px solid var(--border-default); background: var(--bg-input); border-radius: var(--radius-md); cursor: pointer;">
              <input type="radio" name="accessMode" value="Selective Materialization" style="margin-top: 3px;">
              <div>
                <div style="font-weight: 600; color: #fff; font-size: 13px;">Selective Materialization</div>
                <div style="font-size: 12px; color: var(--text-secondary); margin-top: 4px;">
                  Cache high-velocity attributes locally in memory while leaving large payloads virtualized.
                </div>
              </div>
            </label>

            <label style="display: flex; gap: 14px; padding: 14px; border: 1px solid var(--border-default); background: var(--bg-input); border-radius: var(--radius-md); cursor: pointer;">
              <input type="radio" name="accessMode" value="Streaming CDC" style="margin-top: 3px;">
              <div>
                <div style="font-weight: 600; color: #fff; font-size: 13px;">Streaming / Change Data Capture (CDC)</div>
                <div style="font-size: 12px; color: var(--text-secondary); margin-top: 4px;">
                  Subscribe to Salesforce Pub/Sub event streams for millisecond-level identity resolution triggers.
                </div>
              </div>
            </label>
          </div>
        </div>

        <!-- STEP 4: Select Objects -->
        <div class="wizard-step-pane" id="step-pane-4" style="display: none;">
          <h3 style="font-size: 15px; font-weight: 600; color: #fff; margin-bottom: 6px;">Step 4: Select Standard & Custom Objects</h3>
          <p style="font-size: 12.5px; color: var(--text-secondary); margin-bottom: 18px;">Pick Salesforce entities for semantic profiling and canonical customer mapping.</p>

          <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 10px;">
            ${[
              { name: 'Account', records: '2,048,190', checked: true, desc: 'Corporate & Individual Accounts' },
              { name: 'Contact', records: '4,192,000', checked: true, desc: 'Associated individual stakeholders' },
              { name: 'Opportunity', records: '810,400', checked: false, desc: 'Pipeline revenue & deals' },
              { name: 'Lead', records: '1,500,000', checked: false, desc: 'Unqualified inbound prospects' },
              { name: 'Case', records: '920,000', checked: false, desc: 'Customer support tickets' },
              { name: 'Custom: Billing_Profile__c', records: '1,940,000', checked: false, desc: 'Custom invoice linkage' }
            ].map(o => `
              <label style="display: flex; align-items: center; justify-content: space-between; padding: 12px; background: var(--bg-input); border: 1px solid var(--border-default); border-radius: var(--radius-md); cursor: pointer;">
                <div style="display: flex; align-items: center; gap: 10px;">
                  <input type="checkbox" ${o.checked ? 'checked' : ''} class="obj-check" value="${o.name}">
                  <div>
                    <div style="font-weight: 600; color: #fff; font-size: 13px;">${o.name}</div>
                    <div style="font-size: 11px; color: var(--text-muted);">${o.desc}</div>
                  </div>
                </div>
                <span class="cell-mono" style="font-size: 11px; color: var(--text-secondary);">${o.records}</span>
              </label>
            `).join('')}
          </div>
        </div>

        <!-- STEP 5: Test Connection -->
        <div class="wizard-step-pane" id="step-pane-5" style="display: none;">
          <h3 style="font-size: 15px; font-weight: 600; color: #fff; margin-bottom: 6px;">Step 5: Verify Connection Health</h3>
          <p style="font-size: 12.5px; color: var(--text-secondary); margin-bottom: 18px;">Testing handshake, zero-copy query pushdown, and rate limit telemetry.</p>

          <div style="background: var(--bg-input); border: 1px solid var(--border-default); border-radius: var(--radius-md); padding: 18px;">
            <div style="display: flex; flex-direction: column; gap: 12px; font-family: var(--font-mono); font-size: 12px;">
              <div style="display: flex; align-items: center; gap: 10px; color: #34d399;">
                <span>✓</span>
                <span>DNS & TLS 1.3 Handshake: Resolved in 12ms</span>
              </div>
              <div style="display: flex; align-items: center; gap: 10px; color: #34d399;">
                <span>✓</span>
                <span>OAuth Token Exchange: Authorized (Scope: api, refresh_token)</span>
              </div>
              <div style="display: flex; align-items: center; gap: 10px; color: #34d399;">
                <span>✓</span>
                <span>Zero-Copy Predicate Pushdown: SOQL count verification succeeded</span>
              </div>
              <div style="display: flex; align-items: center; gap: 10px; color: #34d399;">
                <span>✓</span>
                <span>Active API Quota: 98,200 / 100,000 calls remaining (Healthy)</span>
              </div>
            </div>

            <div style="margin-top: 16px; padding: 10px; background: rgba(16, 185, 129, 0.1); border: 1px solid rgba(16, 185, 129, 0.3); border-radius: var(--radius-sm); color: #34d399; font-size: 12px;">
              Connection check completed successfully. Ready for automated semantic discovery.
            </div>
          </div>
        </div>

        <!-- STEP 6: Schema Discovery -->
        <div class="wizard-step-pane" id="step-pane-6" style="display: none;">
          <h3 style="font-size: 15px; font-weight: 600; color: #fff; margin-bottom: 6px;">Step 6: Automated Schema & Entity Discovery</h3>
          <p style="font-size: 12.5px; color: var(--text-secondary); margin-bottom: 18px;">AI has inspected the selected objects and detected candidate canonical domains.</p>

          <div class="card" style="background: var(--bg-input); margin-bottom: 14px;">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px;">
              <span class="badge-triad badge-ai-rec">AI RECOMMENDATION</span>
              <span style="font-size: 12px; color: var(--secondary);">Semantic Match: 98.4%</span>
            </div>
            <div style="font-size: 13.5px; font-weight: 600; color: #fff;">Identified Domain: Canonical Customer Entity</div>
            <div style="font-size: 12px; color: var(--text-secondary); margin-top: 4px;">
              Detected 46 schema columns, 2 unique candidate keys (\`Id\`, \`BillingTaxNumber__c\`), and 4 PII attributes.
            </div>
          </div>

          <div style="font-size: 12px; color: var(--text-muted);">
            Discovered fields will be automatically staged into the <strong>Schema Mapping</strong> studio upon activation.
          </div>
        </div>

        <!-- STEP 7: Finish & Activate -->
        <div class="wizard-step-pane" id="step-pane-7" style="display: none;">
          <h3 style="font-size: 15px; font-weight: 600; color: #fff; margin-bottom: 6px;">Step 7: Activation Summary</h3>
          <p style="font-size: 12.5px; color: var(--text-secondary); margin-bottom: 18px;">Confirm configuration parameters to link Salesforce CRM into the zero-copy fabric.</p>

          <table style="width: 100%; border-collapse: collapse; font-size: 12.5px; margin-bottom: 20px;">
            <tr style="border-bottom: 1px solid var(--border-subtle);"><td style="padding: 8px 0; color: var(--text-muted);">Source Type</td><td style="font-weight: 600; color: #fff;">Salesforce CRM</td></tr>
            <tr style="border-bottom: 1px solid var(--border-subtle);"><td style="padding: 8px 0; color: var(--text-muted);">Access Mode</td><td style="font-weight: 600; color: #38bdf8;">Zero-Copy Virtualization</td></tr>
            <tr style="border-bottom: 1px solid var(--border-subtle);"><td style="padding: 8px 0; color: var(--text-muted);">Selected Objects</td><td style="font-weight: 600; color: #fff;">Account (2,048,190 records), Contact</td></tr>
            <tr style="border-bottom: 1px solid var(--border-subtle);"><td style="padding: 8px 0; color: var(--text-muted);">Target Domain</td><td style="font-weight: 600; color: #a855f7;">Canonical Customer</td></tr>
            <tr><td style="padding: 8px 0; color: var(--text-muted);">Status Upon Activation</td><td style="font-weight: 600; color: #34d399;">Active • Ready for Mapping</td></tr>
          </table>

          <div class="badge-triad badge-user-decision" style="margin-bottom: 10px;">USER DECISION REQUIRED</div>
          <div style="font-size: 12px; color: var(--text-secondary);">
            Clicking <strong>Activate Connection</strong> will register this source into the catalog and route you directly to <strong>Source Details</strong>.
          </div>
        </div>

        <!-- Wizard Navigation Buttons -->
        <div style="display: flex; justify-content: space-between; align-items: center; border-top: 1px solid var(--border-subtle); padding-top: 18px; margin-top: 20px;">
          <button class="btn btn-secondary" id="wiz-prev-btn" onclick="window.unifyWizPrev()" style="visibility: hidden;">
            ← Previous
          </button>
          
          <div style="display: flex; gap: 10px;">
            <a href="#/data-foundation/sources" class="btn btn-ghost">Cancel</a>
            <button class="btn btn-primary" id="wiz-next-btn" onclick="window.unifyWizNext()">
              Next Step →
            </button>
          </div>
        </div>

      </div>
    </div>
  `;
}
