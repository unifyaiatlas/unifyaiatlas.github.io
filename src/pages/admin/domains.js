// Page 41: Multi-Domain Management (Route: /admin/domains)
import { renderBreadcrumbs } from '../../components/breadcrumbs.js';

export async function renderDomainsPage() {
  const domains = [
    { name: 'Customer', status: 'Configured & Active', entities: 'Customer, Contact, Account', goldenCount: '18.2M', desc: 'Enterprise primary master customer domain. Zero-copy resolution active.' },
    { name: 'Product', status: 'Planned (Q4)', entities: 'Product, SKU, CatalogItem', goldenCount: '—', desc: 'Global SKU unification and hierarchy aggregation.' },
    { name: 'Supplier', status: 'Planned', entities: 'Vendor, SupplierSite, Contract', goldenCount: '—', desc: 'Procurement vendor consolidation and sanctions screening.' },
    { name: 'Location', status: 'Planned', entities: 'Facility, Warehouse, Store', goldenCount: '—', desc: 'Geospatial facility master coordinates.' },
    { name: 'Organization', status: 'Active (B2B)', entities: 'LegalEntity, UltimateParent', goldenCount: '4.2M', desc: 'Corporate hierarchy mapping and D-U-N-S linkage.' }
  ];

  return `
    <div class="page-container">
      <div style="margin-bottom: 12px;">
        ${renderBreadcrumbs([
          { label: 'Administration', route: '#/admin/domains' },
          { label: 'Master Domains', route: '#/admin/domains' }
        ])}
      </div>

      <div class="page-header">
        <div class="page-title-group">
          <h1 class="page-title">Enterprise Master Domains</h1>
          <p class="page-description">Manage entity domain definitions, partition policies, and canonical schema scopes.</p>
        </div>
      </div>

      <div class="table-card">
        <table class="data-table">
          <thead>
            <tr>
              <th>Domain Name</th>
              <th>Status</th>
              <th>Canonical Entities</th>
              <th>Master Records</th>
              <th>Description</th>
              <th style="text-align: right;">Action</th>
            </tr>
          </thead>
          <tbody>
            ${domains.map(d => `
              <tr>
                <td class="cell-highlight"><strong>${d.name}</strong></td>
                <td>
                  <span class="badge ${d.status.includes('Active') ? 'badge-success' : 'badge-neutral'}">
                    ${d.status}
                  </span>
                </td>
                <td class="cell-mono" style="font-size: 11.5px;">${d.entities}</td>
                <td class="cell-mono" style="color: #38bdf8;">${d.goldenCount}</td>
                <td style="font-size: 12px; color: var(--text-secondary);">${d.desc}</td>
                <td style="text-align: right;">
                  <a href="#/admin/entity-models" class="btn btn-secondary btn-sm">Model Schema →</a>
                </td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      </div>
    </div>
  `;
}
