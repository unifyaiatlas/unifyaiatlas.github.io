// Page 25 & 26: Entity 360 Profile Studio (Route: /entity-360/:entityId)
import { renderBreadcrumbs } from '../../components/breadcrumbs.js';
import { repository } from '../../services/repository.js';

export async function renderEntityProfilePage(params) {
  const entityId = params.entityId || 'CUST-00192837';
  const entity = (await repository.getGoldenEntity(entityId)) || (await repository.getGoldenEntities())[0];

  return `
    <div class="page-container">
      <div style="margin-bottom: 12px;">
        ${renderBreadcrumbs([
          { label: 'Entity 360', route: '#/entity-360/search' },
          { label: 'Golden Master Profiles', route: '#/unification/golden-entities' },
          { label: `${entity.name} (${entity.id})`, route: `#/entity-360/${entity.id}` }
        ])}
      </div>

      <!-- Entity 360 Header (Section 25) -->
      <div class="page-header" style="background: var(--bg-card); border: 1px solid var(--border-default); border-radius: var(--radius-lg); padding: 18px 24px; margin-bottom: 20px;">
        <div class="page-title-group">
          <div style="display: flex; align-items: center; gap: 12px;">
            <div style="width: 44px; height: 44px; border-radius: 50%; background: linear-gradient(135deg, #6366f1, #06b6d4); display: flex; align-items: center; justify-content: center; font-size: 20px; font-weight: 800; color: #fff;">
              RS
            </div>
            <div>
              <div style="display: flex; align-items: center; gap: 8px;">
                <h1 class="page-title" style="font-size: 24px;">${entity.name}</h1>
                <span class="badge badge-success">${entity.status}</span>
                <span class="badge badge-info">${entity.domain} Domain</span>
              </div>
              <div style="font-size: 12px; color: var(--text-muted); margin-top: 2px;">
                Golden Master ID: <code class="cell-mono" style="color: #38bdf8; font-weight: 600;">${entity.id}</code> • 
                Resolution Confidence: <span class="cell-mono" style="color: #34d399; font-weight: 700;">${entity.confidence}</span> • 
                Contributing Sources: <strong style="color: #fff;">${entity.sourceCount} Merged Records</strong>
              </div>
            </div>
          </div>
        </div>

        <div class="page-actions">
          <a href="#/entity-360/${entity.id}/graph" class="btn btn-ai">
            <span>🕸️</span> Interactive Identity Graph
          </a>
          <a href="#/governance/lineage" class="btn btn-secondary">
            <span>📜</span> Lineage
          </a>
          <a href="#/entity-360/${entity.id}/history" class="btn btn-secondary">
            <span>⏱️</span> History
          </a>
        </div>
      </div>

      <!-- 8 Tabs (Section 25) -->
      <div class="tabs-nav" id="entity-tabs">
        <button class="tab-btn active" onclick="window.unifySwitchTab(this, 'tab-ent-attrs')">Attributes & Survivorship</button>
        <button class="tab-btn" onclick="window.unifySwitchTab(this, 'tab-ent-sources')">Source Lineage (${entity.sourceCount})</button>
        <button class="tab-btn" onclick="window.unifySwitchTab(this, 'tab-ent-graph-preview')">Identity Graph</button>
        <button class="tab-btn" onclick="window.unifySwitchTab(this, 'tab-ent-history')">Audit History</button>
      </div>

      <!-- TAB 1: Attributes & Survivorship (Section 26) -->
      <div class="tab-content-pane" id="tab-ent-attrs">
        <div class="table-card">
          <div class="table-toolbar">
            <div style="display: flex; align-items: center; gap: 8px;">
              <span style="font-weight: 600; color: #fff;">Canonical Attributes & Winning Source Rules</span>
              <span class="badge-triad badge-system-fact">SURVIVORSHIP CERTIFIED</span>
            </div>
            <span style="font-size: 11.5px; color: var(--text-muted);">Clicking an attribute reveals provenance flow</span>
          </div>

          <div class="data-table-container">
            <table class="data-table">
              <thead>
                <tr>
                  <th>Canonical Attribute</th>
                  <th>Master Golden Value</th>
                  <th>Winning Source</th>
                  <th style="text-align: center;">Confidence</th>
                  <th>Last Updated</th>
                  <th style="text-align: right;">Attribute Lineage</th>
                </tr>
              </thead>
              <tbody>
                ${Object.entries(entity.attributes || {}).map(([attrKey, attr]) => `
                  <tr style="cursor: pointer;" onclick="window.location.hash='#/governance/lineage'">
                    <td class="cell-mono cell-highlight">${attrKey}</td>
                    <td style="font-weight: 600; color: #fff; font-size: 13px;">${attr.value}</td>
                    <td>
                      <span class="badge ${attr.source.includes('SAP') ? 'badge-neutral' : (attr.source.includes('Salesforce') ? 'badge-info' : 'badge-success')}">
                        ${attr.source}
                      </span>
                    </td>
                    <td style="text-align: center;">
                      <span class="cell-mono" style="color: #34d399; font-weight: 600;">${attr.confidence}</span>
                    </td>
                    <td style="font-size: 12px; color: var(--text-muted);">${attr.updated}</td>
                    <td style="text-align: right;" onclick="event.stopPropagation()">
                      <a href="#/governance/lineage" class="btn btn-ghost btn-sm" title="Trace Provenance">
                        Lineage ➔
                      </a>
                    </td>
                  </tr>
                `).join('')}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <!-- TAB 2: Contributing Sources -->
      <div class="tab-content-pane" id="tab-ent-sources" style="display: none;">
        <div class="grid-2">
          ${(entity.sources || [
            { source: 'Salesforce CRM', id: 'CRM-10231', status: 'Active Contributor', mergedAt: '2026-09-22 14:30' },
            { source: 'SAP ERP', id: 'ERP-88391', status: 'Active Contributor', mergedAt: '2026-09-22 14:30' }
          ]).map(s => `
            <div class="card">
              <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 10px;">
                <span class="badge badge-info">${s.source}</span>
                <span class="badge badge-success">${s.status}</span>
              </div>
              <div style="font-weight: 700; color: #fff; font-size: 15px;">Source Record ID: ${s.id}</div>
              <div style="font-size: 12px; color: var(--text-muted); margin-top: 4px;">Merged into Golden Record on: ${s.mergedAt}</div>
              <div style="margin-top: 14px; padding-top: 10px; border-top: 1px solid var(--border-subtle); display: flex; justify-content: space-between;">
                <a href="#/stewardship/reviews/match-101" class="btn btn-ghost btn-sm">Inspect Match Score</a>
                <button class="btn btn-danger btn-sm" onclick="alert('Unmerge requested for steward approval.')">Request Unmerge</button>
              </div>
            </div>
          `).join('')}
        </div>
      </div>

      <!-- TAB 3: Graph Preview -->
      <div class="tab-content-pane" id="tab-ent-graph-preview" style="display: none;">
        <div class="card" style="text-align: center; padding: 32px;">
          <h3 style="color: #fff; font-size: 15px; margin-bottom: 8px;">Explore Unified Identity Graph</h3>
          <p style="color: var(--text-secondary); max-width: 500px; margin: 0 auto 16px;">
            Inspect multi-hop relationships between Robert Smith, enterprise organizations, contact points, and billing households.
          </p>
          <a href="#/entity-360/${entity.id}/graph" class="btn btn-primary">
            Open Full Interactive Identity Graph Canvas 🕸️
          </a>
        </div>
      </div>

      <!-- TAB 4: Audit History -->
      <div class="tab-content-pane" id="tab-ent-history" style="display: none;">
        <div class="card">
          <h3 style="font-size: 14px; font-weight: 600; color: #fff; margin-bottom: 14px;">Entity Lifecycle & Survivorship Timeline</h3>
          <div style="display: flex; flex-direction: column; gap: 12px;">
            ${(entity.history || [
              { date: 'Today, 10:14 AM', event: 'Survivorship Re-calculation', details: 'Revenue updated from SAP ERP winning rule.', actor: 'System Rule #4' },
              { date: 'Sep 22, 14:30', event: 'Match Approved & Merged', details: 'CRM-10231 merged with ERP-88391 with 96.7% match confidence.', actor: 'Elena Rostova (Steward)' },
              { date: 'Sep 20, 09:12', event: 'Golden Entity Created', details: 'Initial record established from Salesforce Account import.', actor: 'Pipeline Job #2049' }
            ]).map(h => `
              <div style="display: flex; gap: 12px; padding-bottom: 12px; border-bottom: 1px solid var(--border-subtle);">
                <div style="width: 120px; font-size: 11px; color: var(--text-dim);">${h.date}</div>
                <div style="flex: 1;">
                  <div style="font-weight: 600; color: #fff; font-size: 13px;">${h.event}</div>
                  <div style="font-size: 12px; color: var(--text-secondary); margin-top: 2px;">${h.details}</div>
                  <div style="font-size: 11px; color: var(--text-muted); margin-top: 2px;">Actor: <span style="color: #38bdf8;">${h.actor}</span></div>
                </div>
              </div>
            `).join('')}
          </div>
        </div>
      </div>
    </div>
  `;
}
