// Page 36: Certified Golden Data Products (Route: /activation/data-products)
import { renderBreadcrumbs } from '../../components/breadcrumbs.js';

export async function renderDataProductsPage() {
  const products = [
    { title: 'Golden Customer 360', domain: 'Customer', owner: 'MDM Governance Team', consumers: '24 Applications', freshness: 'Real-time (CDC)', quality: '97.4%', records: '18.2M', cert: 'Certified Gold' },
    { title: 'Enterprise Corporate Hierarchy', domain: 'Account', owner: 'Enterprise Architecture', consumers: '12 Applications', freshness: '15 min SLA', quality: '98.1%', records: '4.2M', cert: 'Certified Gold' },
    { title: 'Unified Product Master', domain: 'Product', owner: 'Commercial Catalog Ops', consumers: '8 Applications', freshness: 'Hourly Batch', quality: '94.0%', records: '482K', cert: 'Silver' },
    { title: 'Supplier Risk & Sanctions View', domain: 'Supplier', owner: 'Procurement Compliance', consumers: '6 Applications', freshness: 'Daily Delta', quality: '99.0%', records: '64K', cert: 'Certified Gold' }
  ];

  return `
    <div class="page-container">
      <div style="margin-bottom: 12px;">
        ${renderBreadcrumbs([
          { label: 'Activation', route: '#/activation' },
          { label: 'Data Products', route: '#/activation/data-products' }
        ])}
      </div>

      <div class="page-header">
        <div class="page-title-group">
          <div style="display: flex; align-items: center; gap: 8px;">
            <h1 class="page-title">Certified Golden Data Products</h1>
            <span class="badge badge-success">Enterprise Mesh Ready</span>
          </div>
          <p class="page-description">Curated, contract-tested, and SLA-guaranteed data products syndicated to cloud data warehouses and analytics teams.</p>
        </div>
        <div class="page-actions">
          <a href="#/activation/destinations" class="btn btn-secondary">
            <span>🔌</span> View Destinations →
          </a>
        </div>
      </div>

      <div class="table-card">
        <table class="data-table">
          <thead>
            <tr>
              <th>Data Product Name</th>
              <th>Domain</th>
              <th>Business Owner</th>
              <th>Active Consumers</th>
              <th>Data Freshness</th>
              <th>Quality Score</th>
              <th style="text-align: right;">Master Volume</th>
              <th>Certification</th>
            </tr>
          </thead>
          <tbody>
            ${products.map(p => `
              <tr>
                <td class="cell-highlight"><strong>${p.title}</strong></td>
                <td><span class="badge badge-info">${p.domain}</span></td>
                <td>${p.owner}</td>
                <td class="cell-mono">${p.consumers}</td>
                <td style="color: #38bdf8;">${p.freshness}</td>
                <td class="cell-mono" style="color: #34d399; font-weight: 600;">${p.quality}</td>
                <td class="cell-mono" style="text-align: right; font-weight: 700; color: #fff;">${p.records}</td>
                <td><span class="badge badge-success">✓ ${p.cert}</span></td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      </div>
    </div>
  `;
}
