// Page 29 & 30: Data Lineage & Attribute Provenance Flow (Route: /governance/lineage)
import { renderBreadcrumbs } from '../../components/breadcrumbs.js';

export async function renderLineagePage() {
  return `
    <div class="page-container">
      <div style="margin-bottom: 12px;">
        ${renderBreadcrumbs([
          { label: 'Governance', route: '#/governance/lineage' },
          { label: 'Data Lineage & Provenance', route: '#/governance/lineage' }
        ])}
      </div>

      <div class="page-header">
        <div class="page-title-group">
          <div style="display: flex; align-items: center; gap: 8px;">
            <h1 class="page-title">End-to-End Enterprise Data Lineage</h1>
            <span class="badge badge-success">Live Pipeline DAG</span>
          </div>
          <p class="page-description">Visual traceability from raw source systems through standardization, matching, survivorship rules, to golden entities and downstream consumer APIs.</p>
        </div>
        <div class="page-actions">
          <a href="#/activation/apis" class="btn btn-primary">
            <span>Next: Activation APIs →</span>
          </a>
        </div>
      </div>

      <!-- Filters Toolbar (Section 29) -->
      <div class="card" style="margin-bottom: 20px; padding: 14px 18px;">
        <div style="display: flex; gap: 12px; align-items: center; flex-wrap: wrap;">
          <span style="font-size: 12px; font-weight: 600; color: #fff;">Lineage Scope:</span>
          <select class="form-select" style="font-size: 12px; padding: 6px 10px;">
            <option value="Customer">Entity: Customer (Robert Smith • CUST-00192837)</option>
            <option value="Account">Entity: Corporate Account</option>
          </select>
          <select class="form-select" style="font-size: 12px; padding: 6px 10px;">
            <option value="All">All Attributes (Full Record DAG)</option>
            <option value="email">Attribute: contact.email</option>
            <option value="phone">Attribute: contact.phone</option>
            <option value="revenue">Attribute: metrics.revenue</option>
          </select>
          <button class="btn btn-secondary btn-sm" onclick="alert('Lineage recalculated for target attribute.')">Filter Trace</button>
        </div>
      </div>

      <!-- Visual End-to-End Flow DAG (Section 29) -->
      <div class="card" style="margin-bottom: 20px; background: #070a13;">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 18px;">
          <h3 style="font-size: 14px; font-weight: 600; color: #fff;">Pipeline Execution Lineage Graph</h3>
          <span class="badge badge-info">Zero-Copy Ingestion</span>
        </div>

        <div style="display: grid; grid-template-columns: repeat(6, 1fr); gap: 12px; align-items: center;">
          
          <!-- STAGE 1: Source -->
          <div style="background: var(--bg-card); border: 1px solid var(--border-default); border-radius: var(--radius-md); padding: 14px; text-align: center;">
            <div style="font-size: 18px; margin-bottom: 4px;">🔌</div>
            <div style="font-weight: 600; color: #fff; font-size: 12.5px;">1. Operational Source</div>
            <div style="font-size: 11px; color: #38bdf8; margin-top: 3px;">Salesforce CRM</div>
            <div style="font-size: 10px; color: var(--text-dim); margin-top: 2px;">Account (CRM-10231)</div>
          </div>

          <!-- Arrow -->
          <div style="text-align: center; color: var(--primary); font-size: 20px;">➔</div>

          <!-- STAGE 2: Transformation -->
          <div style="background: var(--bg-card); border: 1px solid var(--border-default); border-radius: var(--radius-md); padding: 14px; text-align: center;">
            <div style="font-size: 18px; margin-bottom: 4px;">⚙️</div>
            <div style="font-weight: 600; color: #fff; font-size: 12.5px;">2. Standardization</div>
            <div style="font-size: 11px; color: #a855f7; margin-top: 3px;">Rule #12 (E.164)</div>
            <div style="font-size: 10px; color: var(--text-dim); margin-top: 2px;">Format Normalizer</div>
          </div>

          <!-- Arrow -->
          <div style="text-align: center; color: var(--primary); font-size: 20px;">➔</div>

          <!-- STAGE 3: Survivorship & Master -->
          <div style="background: var(--bg-card); border: 1px solid var(--secondary); border-radius: var(--radius-md); padding: 14px; text-align: center; box-shadow: 0 0 12px rgba(6,182,212,0.2);">
            <div style="font-size: 18px; margin-bottom: 4px;">👑</div>
            <div style="font-weight: 600; color: #fff; font-size: 12.5px;">3. Golden Entity</div>
            <div style="font-size: 11px; color: #34d399; margin-top: 3px;">CUST-00192837</div>
            <div style="font-size: 10px; color: var(--text-dim); margin-top: 2px;">Survivorship Rule #4</div>
          </div>

          <!-- STAGE 4: Consumer -->
          <div style="background: var(--bg-card); border: 1px solid var(--border-default); border-radius: var(--radius-md); padding: 14px; text-align: center;">
            <div style="font-size: 18px; margin-bottom: 4px;">🚀</div>
            <div style="font-weight: 600; color: #fff; font-size: 12.5px;">4. Data Product API</div>
            <div style="font-size: 11px; color: #38bdf8; margin-top: 3px;">Customer 360 API</div>
            <div style="font-size: 10px; color: var(--text-dim); margin-top: 2px;">Snowflake Data Share</div>
          </div>

        </div>
      </div>

      <!-- Attribute-Level Lineage Trace (Section 30) -->
      <div class="table-card">
        <div class="table-toolbar">
          <div style="display: flex; align-items: center; gap: 8px;">
            <span style="font-weight: 600; color: #fff;">Attribute-Level Trace (Golden Email & Phone)</span>
            <span class="badge-triad badge-system-fact">PROVENANCE CERTIFIED</span>
          </div>
          <span style="font-size: 12px; color: var(--text-muted);">Section 30 Compliant</span>
        </div>

        <div style="padding: 18px;">
          <div style="display: flex; flex-direction: column; gap: 10px; font-family: var(--font-mono); font-size: 12.5px;">
            <div style="padding: 8px 12px; background: var(--bg-card-subtle); border-left: 3px solid #38bdf8; border-radius: 4px;">
              <strong>Step 1</strong>: Salesforce CRM record <code>CRM-10231</code> emits raw email <code>robert@abc.com</code>
            </div>
            <div style="color: var(--text-dim); padding-left: 14px;">↓</div>
            <div style="padding: 8px 12px; background: var(--bg-card-subtle); border-left: 3px solid #a855f7; border-radius: 4px;">
              <strong>Step 2</strong>: Standardization Rule #12 verifies RFC 5322 syntax and lowercases domain
            </div>
            <div style="color: var(--text-dim); padding-left: 14px;">↓</div>
            <div style="padding: 8px 12px; background: var(--bg-card-subtle); border-left: 3px solid #fbbf24; border-radius: 4px;">
              <strong>Step 3</strong>: Survivorship Rule #4 evaluates CRM vs SAP source trust ranking (CRM wins for Email with 99% confidence)
            </div>
            <div style="color: var(--text-dim); padding-left: 14px;">↓</div>
            <div style="padding: 8px 12px; background: rgba(16, 185, 129, 0.1); border-left: 3px solid #34d399; border-radius: 4px; color: #34d399;">
              <strong>Step 4</strong>: Master Attribute published to Golden Entity <code>CUST-00192837.contact.email</code>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;
}
