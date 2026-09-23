// Page 15: DQ Issues Triage (Route: /data-quality/issues)
import { renderBreadcrumbs } from '../../components/breadcrumbs.js';
import { repository } from '../../services/repository.js';

export async function renderDqIssuesPage() {
  const issues = await repository.getDQIssues();

  return `
    <div class="page-container">
      <div style="margin-bottom: 12px;">
        ${renderBreadcrumbs([
          { label: 'Data Quality', route: '#/data-quality' },
          { label: 'DQ Issues Triage', route: '#/data-quality/issues' }
        ])}
      </div>

      <div class="page-header">
        <div class="page-title-group">
          <h1 class="page-title">Data Quality Issues Remediation</h1>
          <p class="page-description">Triage non-compliant records flagged by active business rules. Accept AI corrections or execute steward overrides.</p>
        </div>
        <div class="page-actions">
          <a href="#/unification/match-strategies" class="btn btn-primary">
            <span>Next: Match Strategies →</span>
          </a>
        </div>
      </div>

      <div class="table-card">
        <div class="table-toolbar">
          <div style="display: flex; gap: 8px; align-items: center; flex-wrap: wrap;">
            <input type="text" class="form-input" placeholder="Search record ID..." style="width: 200px; padding: 6px 10px; font-size: 12px;">
            <select class="form-select" style="padding: 6px 10px; font-size: 12px;">
              <option value="">All Severities</option>
              <option value="Error">Error</option>
              <option value="Warning">Warning</option>
            </select>
            <select class="form-select" style="padding: 6px 10px; font-size: 12px;">
              <option value="">Status: Pending</option>
              <option value="Resolved">Resolved</option>
            </select>
          </div>
          <span style="font-size: 12px; color: var(--text-muted);">${issues.length} Issues Pending Triage</span>
        </div>

        <div class="data-table-container">
          <table class="data-table">
            <thead>
              <tr>
                <th>Record ID</th>
                <th>Entity Target</th>
                <th>Attribute & Violation</th>
                <th>Enforcing Rule</th>
                <th>Suggested Correction</th>
                <th>Status</th>
                <th style="text-align: right;">Steward Action</th>
              </tr>
            </thead>
            <tbody>
              ${issues.map(iss => `
                <tr id="issue-row-${iss.id}">
                  <td class="cell-mono cell-highlight">${iss.recordId}</td>
                  <td>${iss.entity}</td>
                  <td>
                    <div style="font-weight: 600; color: #fff; font-family: var(--font-mono);">${iss.attribute}</div>
                    <div style="font-size: 11px; color: #f87171; text-decoration: line-through;">"${iss.invalidValue}"</div>
                    <div style="font-size: 10.5px; color: var(--text-muted); margin-top: 2px;">${iss.reason}</div>
                  </td>
                  <td>
                    <span class="badge ${iss.severity === 'Error' ? 'badge-danger' : 'badge-warning'}">${iss.severity}</span>
                    <div style="font-size: 11.5px; color: #fff; margin-top: 3px;">${iss.rule}</div>
                  </td>
                  <td>
                    <div style="display: flex; align-items: center; gap: 6px;">
                      <span class="badge-triad ${iss.triadStatus === 'USER DECISION' ? 'badge-user-decision' : 'badge-ai-rec'}">${iss.triadStatus}</span>
                      <strong style="color: #34d399; font-family: var(--font-mono); font-size: 12px;">"${iss.suggestedCorrection}"</strong>
                    </div>
                  </td>
                  <td>
                    <span class="badge ${iss.status === 'Resolved' ? 'badge-success' : 'badge-warning'}">${iss.status}</span>
                  </td>
                  <td style="text-align: right;">
                    ${iss.status === 'Resolved' ? `
                      <span style="color: #34d399; font-size: 12px;">✓ Remediated</span>
                    ` : `
                      <div style="display: inline-flex; gap: 4px;">
                        <button class="btn btn-success btn-sm" onclick="window.unifyResolveIssue('${iss.id}', 'Resolved')">Accept AI</button>
                        <button class="btn btn-ghost btn-sm" onclick="alert('Manual override modal')">Override</button>
                      </div>
                    `}
                  </td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  `;
}
