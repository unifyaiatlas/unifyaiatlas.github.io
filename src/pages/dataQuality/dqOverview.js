// Page 12: Data Quality Overview (Route: /data-quality)
import { renderBreadcrumbs } from '../../components/breadcrumbs.js';
import { repository } from '../../services/repository.js';

export async function renderDqOverviewPage() {
  const rules = await repository.getDQRules();
  const issues = await repository.getDQIssues();

  return `
    <div class="page-container">
      <div style="margin-bottom: 12px;">
        ${renderBreadcrumbs([
          { label: 'Data Quality', route: '#/data-quality' },
          { label: 'Overview', route: '#/data-quality' }
        ])}
      </div>

      <div class="page-header">
        <div class="page-title-group">
          <div style="display: flex; align-items: center; gap: 8px;">
            <h1 class="page-title">Enterprise Data Quality Hub</h1>
            <span class="badge badge-success">Automated Enforcement</span>
          </div>
          <p class="page-description">Continuous rule execution, anomaly detection, completeness scoring, and steward remediation queues.</p>
        </div>
        <div class="page-actions">
          <a href="#/data-quality/rules/new" class="btn btn-secondary">
            <span>+</span> Create Rule
          </a>
          <a href="#/data-quality/issues" class="btn btn-primary">
            <span>⚠️</span> View Issues (${issues.length})
          </a>
          <a href="#/unification/match-strategies" class="btn btn-secondary">
            <span>Next: Matching →</span>
          </a>
        </div>
      </div>

      <!-- KPI Cards (Section 12) -->
      <div class="kpi-grid">
        <div class="kpi-card">
          <span class="kpi-label">Overall Quality</span>
          <div class="kpi-value" style="color: #38bdf8;">94.2%</div>
          <div class="kpi-delta positive"><span>↑ +0.8%</span> this sprint</div>
        </div>
        <div class="kpi-card">
          <span class="kpi-label">Completeness</span>
          <div class="kpi-value">96.8%</div>
          <div class="kpi-delta positive"><span>●</span> Critical identifiers present</div>
        </div>
        <div class="kpi-card">
          <span class="kpi-label">Validity</span>
          <div class="kpi-value">97.2%</div>
          <div class="kpi-delta positive"><span>✓</span> RFC/ISO compliant</div>
        </div>
        <div class="kpi-card">
          <span class="kpi-label">Consistency</span>
          <div class="kpi-value">91.5%</div>
          <div class="kpi-delta positive"><span>↑ +3.2%</span> cross-source alignment</div>
        </div>
        <div class="kpi-card" style="border-color: rgba(239, 68, 68, 0.4);">
          <span class="kpi-label">DQ Issues Flagged</span>
          <div class="kpi-value" style="color: #f87171;">${issues.length} Critical</div>
          <div class="kpi-delta" style="color: #f87171;"><span>⚠ Requires Triage</span></div>
        </div>
      </div>

      <div class="grid-2" style="margin-bottom: 20px;">
        <!-- Quality by Source Breakdown -->
        <div class="card">
          <h3 style="font-size: 14px; font-weight: 600; color: #fff; margin-bottom: 14px;">Quality Score by Source</h3>
          <div style="display: flex; flex-direction: column; gap: 12px;">
            <div>
              <div style="display: flex; justify-content: space-between; font-size: 12px; margin-bottom: 4px;">
                <span>Salesforce CRM (Account & Contact)</span>
                <span class="cell-mono" style="color: #38bdf8;">96.4%</span>
              </div>
              <div class="bar-track"><div class="bar-fill bar-fill-primary" style="width: 96.4%;"></div></div>
            </div>

            <div>
              <div style="display: flex; justify-content: space-between; font-size: 12px; margin-bottom: 4px;">
                <span>SAP ERP S/4HANA (Customer)</span>
                <span class="cell-mono" style="color: #34d399;">98.2%</span>
              </div>
              <div class="bar-track"><div class="bar-fill bar-fill-success" style="width: 98.2%;"></div></div>
            </div>

            <div>
              <div style="display: flex; justify-content: space-between; font-size: 12px; margin-bottom: 4px;">
                <span>PostgreSQL Billing Database</span>
                <span class="cell-mono" style="color: #fbbf24;">91.0%</span>
              </div>
              <div class="bar-track"><div class="bar-fill bar-fill-warning" style="width: 91%;"></div></div>
            </div>
          </div>
        </div>

        <!-- Recent Critical Issues Mini List -->
        <div class="card">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px;">
            <h3 style="font-size: 14px; font-weight: 600; color: #fff;">Active DQ Issues</h3>
            <a href="#/data-quality/issues" class="btn btn-ghost btn-sm" style="font-size: 11px;">View All →</a>
          </div>

          <div style="display: flex; flex-direction: column; gap: 10px;">
            ${issues.map(iss => `
              <div style="padding: 10px; background: var(--bg-card-subtle); border: 1px solid var(--border-subtle); border-radius: 6px; display: flex; justify-content: space-between; align-items: center;">
                <div>
                  <div style="display: flex; align-items: center; gap: 6px;">
                    <span class="badge ${iss.severity === 'Error' ? 'badge-danger' : 'badge-warning'}">${iss.severity}</span>
                    <strong style="color: #fff; font-size: 12.5px;">${iss.rule}</strong>
                  </div>
                  <div style="font-size: 11px; color: var(--text-muted); margin-top: 3px;">
                    Record: <code>${iss.recordId}</code> • Invalid: <span style="color: #fca5a5;">"${iss.invalidValue}"</span>
                  </div>
                </div>
                <a href="#/data-quality/issues" class="btn btn-secondary btn-sm">Fix</a>
              </div>
            `).join('')}
          </div>
        </div>
      </div>

      <!-- Quick Rule Table -->
      <div class="table-card">
        <div class="table-toolbar">
          <span style="font-weight: 600; color: #fff; font-size: 13px;">Active DQ Rules</span>
          <a href="#/data-quality/rules" class="btn btn-ghost btn-sm">Manage Rules (${rules.length}) →</a>
        </div>
        <table class="data-table">
          <thead>
            <tr>
              <th>Rule Name</th>
              <th>Entity Model</th>
              <th>Attribute Target</th>
              <th>Rule Type</th>
              <th>Severity</th>
              <th>Failure Rate</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            ${rules.map(r => `
              <tr>
                <td class="cell-highlight">${r.name}</td>
                <td>${r.entity}</td>
                <td class="cell-mono">${r.attribute}</td>
                <td><span class="badge badge-neutral">${r.type}</span></td>
                <td><span class="badge ${r.severity === 'Error' ? 'badge-danger' : 'badge-warning'}">${r.severity}</span></td>
                <td class="cell-mono" style="color: ${r.failureRate === '0.6%' ? '#34d399' : '#fbbf24'};">${r.failureRate}</td>
                <td><span class="badge badge-success">${r.status}</span></td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      </div>
    </div>
  `;
}
