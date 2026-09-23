// Page 45: Platform Settings & Retention (Route: /admin/settings)
import { renderBreadcrumbs } from '../../components/breadcrumbs.js';

export async function renderSettingsPage() {
  return `
    <div class="page-container" style="max-width: 850px; margin: 0 auto;">
      <div style="margin-bottom: 12px;">
        ${renderBreadcrumbs([
          { label: 'Administration', route: '#/admin/domains' },
          { label: 'Platform Settings', route: '#/admin/settings' }
        ])}
      </div>

      <div class="page-header">
        <div class="page-title-group">
          <h1 class="page-title">Platform & Governance Settings</h1>
          <p class="page-description">Configure default auto-match thresholds, audit retention windows, and AI reasoning quotas.</p>
        </div>
      </div>

      <div class="card" style="display: flex; flex-direction: column; gap: 20px;">
        <div>
          <h3 style="font-size: 14px; font-weight: 600; color: #fff; margin-bottom: 6px;">Default Unification Thresholds</h3>
          <p style="font-size: 12px; color: var(--text-secondary); margin-bottom: 12px;">Default boundary parameters applied to newly created entity match strategies.</p>
          <div class="grid-2">
            <div class="form-group">
              <label class="form-label">Auto-Match Cutoff Score (%)</label>
              <input type="number" class="form-input" value="95">
            </div>
            <div class="form-group">
              <label class="form-label">Steward Review Cutoff Score (%)</label>
              <input type="number" class="form-input" value="85">
            </div>
          </div>
        </div>

        <div style="padding-top: 14px; border-top: 1px solid var(--border-subtle);">
          <h3 style="font-size: 14px; font-weight: 600; color: #fff; margin-bottom: 6px;">Audit & Snapshot Data Retention</h3>
          <p style="font-size: 12px; color: var(--text-secondary); margin-bottom: 12px;">Compliance data retention policy for immutable steward decision history.</p>
          <div class="grid-2">
            <div class="form-group">
              <label class="form-label">Steward Audit History Retention</label>
              <select class="form-select">
                <option value="7y">7 Years (SOC2 & Basel III Financial Standard)</option>
                <option value="10y">10 Years</option>
                <option value="indefinite">Indefinite Immutable Archive</option>
              </select>
            </div>
            <div class="form-group">
              <label class="form-label">Lineage Graph Snapshot Frequency</label>
              <select class="form-select">
                <option value="daily">Daily Delta Snapshots</option>
                <option value="hourly">Hourly Snapshots</option>
              </select>
            </div>
          </div>
        </div>

        <div style="padding-top: 14px; border-top: 1px solid var(--border-subtle); display: flex; justify-content: flex-end;">
          <button class="btn btn-primary" onclick="alert('Settings successfully updated.')">Save Changes</button>
        </div>
      </div>
    </div>
  `;
}
