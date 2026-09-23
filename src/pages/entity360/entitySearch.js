// Page 24: Entity Search (Route: /entity-360/search)
import { renderBreadcrumbs } from '../../components/breadcrumbs.js';
import { repository } from '../../services/repository.js';

export async function renderEntitySearchPage() {
  const goldenList = await repository.getGoldenEntities();

  return `
    <div class="page-container">
      <div style="margin-bottom: 12px;">
        ${renderBreadcrumbs([
          { label: 'Entity 360', route: '#/entity-360/search' },
          { label: 'Global Entity Search', route: '#/entity-360/search' }
        ])}
      </div>

      <div class="page-header">
        <div class="page-title-group">
          <h1 class="page-title">Enterprise Entity Search & Lookup</h1>
          <p class="page-description">Search across golden master records, source system physical IDs, cross-references, and contact identifiers.</p>
        </div>
      </div>

      <!-- Search Input Card -->
      <div class="card" style="margin-bottom: 20px;">
        <div style="display: flex; gap: 10px;">
          <input 
            type="text" 
            class="form-input" 
            id="entity-search-box" 
            placeholder="Search by Golden ID (CUST-00192837), Name (Robert Smith), Phone, or Source ID (CRM-10231)..." 
            style="flex: 1; padding: 10px 14px; font-size: 14px;"
            value="Robert Smith"
          >
          <button class="btn btn-primary" onclick="alert('Search executed!')">Search Entities</button>
        </div>
        <div style="display: flex; gap: 8px; margin-top: 10px; font-size: 11px; color: var(--text-muted);">
          <span>Quick queries:</span>
          <a href="#/entity-360/CUST-00192837" class="btn btn-ghost btn-sm" style="font-size: 11px; padding: 1px 6px;">👑 CUST-00192837 (Robert Smith)</a>
          <a href="#/entity-360/CUST-00284910" class="btn btn-ghost btn-sm" style="font-size: 11px; padding: 1px 6px;">👑 CUST-00284910 (Apex Global)</a>
        </div>
      </div>

      <!-- Results Grouped by Golden Entity (Section 24) -->
      <div style="display: flex; flex-direction: column; gap: 14px;">
        <div style="font-size: 12px; font-weight: 600; color: var(--text-muted); text-transform: uppercase;">
          Search Results for "Robert Smith"
        </div>

        ${goldenList.map(g => `
          <div class="card" style="border-left: 4px solid var(--primary); cursor: pointer;" onclick="window.location.hash='#/entity-360/${g.id}'">
            <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 8px;">
              <div>
                <div style="display: flex; align-items: center; gap: 8px;">
                  <span class="badge badge-success">Golden Record</span>
                  <h3 style="font-size: 16px; font-weight: 700; color: #fff;">${g.name}</h3>
                </div>
                <div style="font-size: 12px; color: var(--text-muted); margin-top: 3px;">
                  Golden ID: <code class="cell-mono" style="color: #38bdf8;">${g.id}</code> • Domain: ${g.domain}
                </div>
              </div>
              <div style="text-align: right;">
                <span class="cell-mono" style="color: #34d399; font-weight: 700; font-size: 14px;">${g.confidence} Confidence</span>
                <div style="font-size: 11px; color: var(--text-dim);">Updated ${g.lastUpdated}</div>
              </div>
            </div>

            <div style="background: var(--bg-card-subtle); padding: 10px 14px; border-radius: var(--radius-md); font-size: 12px; display: flex; gap: 20px; color: var(--text-secondary);">
              <div>Email: <strong style="color: #fff;">${g.attributes?.email?.value || 'robert@abc.com'}</strong></div>
              <div>Phone: <strong style="color: #fff;">${g.attributes?.phone?.value || '+91 98765 43210'}</strong></div>
              <div>Winning Sources: <strong style="color: #a855f7;">Salesforce CRM, SAP ERP</strong></div>
            </div>
          </div>
        `).join('')}
      </div>
    </div>
  `;
}
