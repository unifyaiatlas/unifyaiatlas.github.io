// Page 32: Enterprise Reference Data (Route: /governance/reference-data)
import { renderBreadcrumbs } from '../../components/breadcrumbs.js';

export async function renderReferenceDataPage() {
  const refTables = [
    { code: 'REF-ISO-3166', name: 'ISO Country Codes (Alpha-2/3)', version: '2026.1', records: '249', status: 'Active', source: 'ISO Standard' },
    { code: 'REF-CURRENCY', name: 'ISO 4217 Currency Standards', version: '2026.2', records: '178', status: 'Active', source: 'Financial Consortium' },
    { code: 'REF-NAICS', name: 'NAICS Industry Classifications', version: '2022.v4', records: '1,057', status: 'Active', source: 'US Census Bureau' },
    { code: 'REF-LEI', name: 'Legal Entity Identifier (GLEIF)', version: 'Daily Delta', records: '2.4M', status: 'Active', source: 'GLEIF Global Feed' }
  ];

  return `
    <div class="page-container">
      <div style="margin-bottom: 12px;">
        ${renderBreadcrumbs([
          { label: 'Governance', route: '#/governance/lineage' },
          { label: 'Reference Data', route: '#/governance/reference-data' }
        ])}
      </div>

      <div class="page-header">
        <div class="page-title-group">
          <h1 class="page-title">Enterprise Reference Data Catalog</h1>
          <p class="page-description">Standardized code lists, country ontologies, and industry taxonomies powering validation and normalization rules.</p>
        </div>
      </div>

      <div class="table-card">
        <table class="data-table">
          <thead>
            <tr>
              <th>Reference Set Code</th>
              <th>Standard Name</th>
              <th>Version</th>
              <th>Record Count</th>
              <th>Authority Source</th>
              <th>Status</th>
              <th style="text-align: right;">Action</th>
            </tr>
          </thead>
          <tbody>
            ${refTables.map(r => `
              <tr>
                <td class="cell-mono cell-highlight">${r.code}</td>
                <td><strong>${r.name}</strong></td>
                <td><span class="badge badge-neutral">${r.version}</span></td>
                <td class="cell-mono">${r.records}</td>
                <td style="color: var(--text-secondary);">${r.source}</td>
                <td><span class="badge badge-success">${r.status}</span></td>
                <td style="text-align: right;">
                  <button class="btn btn-secondary btn-sm" onclick="alert('Viewing code values for ${r.name}')">View Codes</button>
                </td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      </div>
    </div>
  `;
}
