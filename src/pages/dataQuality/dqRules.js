// Page 13: DQ Rules Registry (Route: /data-quality/rules)
import { renderBreadcrumbs } from '../../components/breadcrumbs.js';
import { repository } from '../../services/repository.js';

export async function renderDqRulesPage() {
  const rules = await repository.getDQRules();

  return `
    <div class="page-container">
      <div style="margin-bottom: 12px;">
        ${renderBreadcrumbs([
          { label: 'Data Quality', route: '#/data-quality' },
          { label: 'Rules Registry', route: '#/data-quality/rules' }
        ])}
      </div>

      <div class="page-header">
        <div class="page-title-group">
          <h1 class="page-title">Data Quality Rules</h1>
          <p class="page-description">Declarative business validation, format integrity checks, and reference standards across canonical entities.</p>
        </div>
        <div class="page-actions">
          <a href="#/data-quality/rules/new" class="btn btn-primary">
            <span>+</span> Create New Rule
          </a>
        </div>
      </div>

      <div class="table-card">
        <div class="table-toolbar">
          <div style="display: flex; gap: 8px; align-items: center;">
            <input type="text" class="form-input" placeholder="Filter rules..." style="width: 220px; font-size: 12px; padding: 6px 10px;">
            <select class="form-select" style="font-size: 12px; padding: 6px 10px;">
              <option value="">All Entities</option>
              <option value="Customer">Customer</option>
            </select>
          </div>
          <span style="font-size: 12px; color: var(--text-muted);">${rules.length} Active Rules</span>
        </div>

        <div class="data-table-container">
          <table class="data-table">
            <thead>
              <tr>
                <th>Rule Name</th>
                <th>Entity Model</th>
                <th>Attribute Target</th>
                <th>Rule Type</th>
                <th>Severity</th>
                <th>Failure Rate</th>
                <th>Records Evaluated</th>
                <th>Status</th>
                <th style="text-align: right;">Action</th>
              </tr>
            </thead>
            <tbody>
              ${rules.map(r => `
                <tr>
                  <td class="cell-highlight"><strong>${r.name}</strong></td>
                  <td>${r.entity}</td>
                  <td class="cell-mono">${r.attribute}</td>
                  <td><span class="badge badge-neutral">${r.type}</span></td>
                  <td><span class="badge ${r.severity === 'Error' ? 'badge-danger' : 'badge-warning'}">${r.severity}</span></td>
                  <td class="cell-mono" style="color: ${r.failureRate === '0.6%' ? '#34d399' : '#fbbf24'};">${r.failureRate}</td>
                  <td class="cell-mono">${r.totalChecked}</td>
                  <td><span class="badge badge-success">${r.status}</span></td>
                  <td style="text-align: right;">
                    <a href="#/data-quality/rules/new" class="btn btn-ghost btn-sm">Edit</a>
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
