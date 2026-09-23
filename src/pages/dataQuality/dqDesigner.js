// Page 14: DQ Rule Designer (Route: /data-quality/rules/new)
import { renderBreadcrumbs } from '../../components/breadcrumbs.js';
import { repository } from '../../services/repository.js';

export async function renderDqDesignerPage() {
  return `
    <div class="page-container" style="max-width: 900px; margin: 0 auto;">
      <div style="margin-bottom: 12px;">
        ${renderBreadcrumbs([
          { label: 'Data Quality', route: '#/data-quality' },
          { label: 'Rules Registry', route: '#/data-quality/rules' },
          { label: 'New Rule Designer', route: '#/data-quality/rules/new' }
        ])}
      </div>

      <div class="page-header">
        <div class="page-title-group">
          <h1 class="page-title">DQ Rule Designer</h1>
          <p class="page-description">Design declarative validation constraints or use AI to synthesize rules from natural language specifications.</p>
        </div>
        <div class="page-actions">
          <button class="btn btn-ai" onclick="window.unifyGenerateRuleAI()">
            <span>✦</span> Generate Rule with AI
          </button>
        </div>
      </div>

      <div class="grid-2" style="align-items: flex-start;">
        <!-- Rule Configuration Form -->
        <div class="card">
          <h3 style="font-size: 14px; font-weight: 600; color: #fff; margin-bottom: 16px;">Rule Parameters</h3>

          <div class="form-group">
            <label class="form-label">Rule Title</label>
            <input type="text" class="form-input" id="rule-name" value="Corporate Tax ID Validation (GSTIN/EIN)">
          </div>

          <div class="grid-2">
            <div class="form-group">
              <label class="form-label">Canonical Entity</label>
              <select class="form-select" id="rule-entity">
                <option value="Customer">Customer</option>
                <option value="Product">Product</option>
                <option value="Supplier">Supplier</option>
              </select>
            </div>
            <div class="form-group">
              <label class="form-label">Attribute Target</label>
              <input type="text" class="form-input cell-mono" id="rule-attr" value="identifiers.tax_number">
            </div>
          </div>

          <div class="grid-2">
            <div class="form-group">
              <label class="form-label">Rule Type</label>
              <select class="form-select" id="rule-type">
                <option value="Format Regex">Format (Regex Pattern)</option>
                <option value="Required">Mandatory Field</option>
                <option value="Reference">Reference Lookup</option>
                <option value="Cross-Field">Cross-Field Logic</option>
              </select>
            </div>
            <div class="form-group">
              <label class="form-label">Severity Level</label>
              <select class="form-select" id="rule-severity">
                <option value="Error">Error (Block Golden Merge)</option>
                <option value="Warning">Warning (Route to Review)</option>
                <option value="Info">Info (Audit Log Only)</option>
              </select>
            </div>
          </div>

          <div class="form-group">
            <label class="form-label">Validation Condition Expression</label>
            <textarea class="form-textarea cell-mono" rows="3" id="rule-condition">matches(identifiers.tax_number, '^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$')</textarea>
          </div>

          <div style="display: flex; justify-content: flex-end; gap: 8px; margin-top: 14px;">
            <a href="#/data-quality/rules" class="btn btn-ghost">Cancel</a>
            <button class="btn btn-primary" onclick="alert('Rule validated and published to active policy engine!')">Save & Publish Rule</button>
          </div>
        </div>

        <!-- Live Impact Preview (Section 14) -->
        <div class="card" style="background: var(--bg-card-subtle);">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px;">
            <h3 style="font-size: 14px; font-weight: 600; color: #fff;">Live Execution Impact Preview</h3>
            <span class="badge badge-info">Zero-Copy Pushdown</span>
          </div>

          <div class="kpi-card" style="margin-bottom: 12px;">
            <span class="kpi-label">Records Affected in Candidate Pool</span>
            <div class="kpi-value">4,210,000</div>
            <div class="kpi-delta positive"><span>●</span> Tested across active sources</div>
          </div>

          <div class="kpi-card" style="margin-bottom: 12px;">
            <span class="kpi-label">Current Failure Rate</span>
            <div class="kpi-value" style="color: #fbbf24;">2.1%</div>
            <div class="kpi-delta" style="color: #fbbf24;"><span>⚠️ 88,410 invalid values</span></div>
          </div>

          <div style="background: var(--bg-input); padding: 12px; border-radius: var(--radius-md); border: 1px solid var(--border-default); font-size: 12px; color: var(--text-secondary);">
            <div style="font-weight: 600; color: #fff; margin-bottom: 4px;">Expected Impact:</div>
            Enforcing this rule will route <strong>88,410 invalid tax numbers</strong> to the Data Steward triage queue while preserving 4.12M compliant corporate entities for auto-matching.
          </div>
        </div>
      </div>
    </div>
  `;
}
