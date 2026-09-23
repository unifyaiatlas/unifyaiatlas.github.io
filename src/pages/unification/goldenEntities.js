// Page 23: Golden Entities Catalog (Route: /unification/golden-entities)
import { renderBreadcrumbs } from '../../components/breadcrumbs.js';
import { repository } from '../../services/repository.js';

export async function renderGoldenEntitiesPage() {
  const goldenList = await repository.getGoldenEntities();

  return `
    <div class="page-container">
      <div style="margin-bottom: 12px;">
        ${renderBreadcrumbs([
          { label: 'Unification', route: '#/unification' },
          { label: 'Golden Entities Master Catalog', route: '#/unification/golden-entities' }
        ])}
      </div>

      <div class="page-header">
        <div class="page-title-group">
          <div style="display: flex; align-items: center; gap: 8px;">
            <h1 class="page-title">Golden Records & Master Catalog</h1>
            <span class="badge badge-success">18.2M Mastered</span>
          </div>
          <p class="page-description">Single source of truth records produced from cross-system entity resolution, automated survivorship, and steward certification.</p>
        </div>
        <div class="page-actions">
          <a href="#/entity-360/search" class="btn btn-secondary">
            <span>🔍</span> Deep Entity Search
          </a>
          <a href="#/activation/data-products" class="btn btn-primary">
            <span>🚀</span> Export as Data Product
          </a>
        </div>
      </div>

      <div class="table-card">
        <div class="table-toolbar">
          <div style="display: flex; gap: 8px; align-items: center; flex-wrap: wrap;">
            <input type="text" class="form-input" placeholder="Search by name, email, phone, or Golden ID..." style="width: 280px; padding: 6px 10px; font-size: 12px;">
            <select class="form-select" style="padding: 6px 10px; font-size: 12px;">
              <option value="">All Domains</option>
              <option value="Customer">Customer</option>
            </select>
          </div>
          <span style="font-size: 12px; color: var(--text-muted);">18.2M Mastered Entities</span>
        </div>

        <div class="data-table-container">
          <table class="data-table">
            <thead>
              <tr>
                <th>Golden Entity ID</th>
                <th>Master Legal Name</th>
                <th>Domain</th>
                <th style="text-align: center;">Contributing Sources</th>
                <th style="text-align: center;">Resolution Confidence</th>
                <th>Last Survivorship Update</th>
                <th style="text-align: right;">360 Profile</th>
              </tr>
            </thead>
            <tbody>
              ${goldenList.map(g => `
                <tr style="cursor: pointer;" onclick="window.location.hash='#/entity-360/${g.id}'">
                  <td class="cell-mono cell-highlight" style="color: #38bdf8;">
                    <strong>👑 ${g.id}</strong>
                  </td>

                  <td>
                    <div style="font-weight: 600; color: #fff;">${g.name}</div>
                    <div style="font-size: 11px; color: var(--text-muted);">${g.attributes?.email?.value || ''}</div>
                  </td>

                  <td><span class="badge badge-info">${g.domain}</span></td>

                  <td style="text-align: center;">
                    <span class="badge badge-neutral" style="font-weight: 600;">
                      ${g.sourceCount} Sources Merged
                    </span>
                  </td>

                  <td style="text-align: center;">
                    <span class="cell-mono" style="color: #34d399; font-weight: 700;">${g.confidence}</span>
                  </td>

                  <td style="font-size: 12px; color: var(--text-muted);">${g.lastUpdated}</td>

                  <td style="text-align: right;" onclick="event.stopPropagation()">
                    <a href="#/entity-360/${g.id}" class="btn btn-secondary btn-sm">
                      View 360 Profile →
                    </a>
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
