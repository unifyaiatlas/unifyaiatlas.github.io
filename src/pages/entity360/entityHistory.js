// Page 28: Entity History & Audit Timeline (Route: /entity-360/:entityId/history)
import { renderBreadcrumbs } from '../../components/breadcrumbs.js';
import { repository } from '../../services/repository.js';

export async function renderEntityHistoryPage(params) {
  const entityId = params.entityId || 'CUST-00192837';
  const entity = (await repository.getGoldenEntity(entityId)) || (await repository.getGoldenEntities())[0];

  return `
    <div class="page-container" style="max-width: 850px; margin: 0 auto;">
      <div style="margin-bottom: 12px;">
        ${renderBreadcrumbs([
          { label: 'Entity 360', route: '#/entity-360/search' },
          { label: `${entity.name} (${entity.id})`, route: `#/entity-360/${entity.id}` },
          { label: 'Audit History', route: `#/entity-360/${entity.id}/history` }
        ])}
      </div>

      <div class="page-header">
        <div class="page-title-group">
          <h1 class="page-title">Entity Lifecycle Audit Trail</h1>
          <p class="page-description">Complete chronological provenance of merge operations, rule adjustments, and survivorship transitions.</p>
        </div>
        <div class="page-actions">
          <a href="#/governance/lineage" class="btn btn-primary">Next: Lineage Flow →</a>
        </div>
      </div>

      <div class="card">
        <div style="display: flex; flex-direction: column; gap: 20px; position: relative; padding-left: 20px;">
          <!-- Left line -->
          <div style="position: absolute; left: 6px; top: 10px; bottom: 10px; width: 2px; background: var(--border-default);"></div>

          <div style="position: relative;">
            <div style="position: absolute; left: -20px; top: 4px; width: 12px; height: 12px; border-radius: 50%; background: #34d399; border: 2px solid #0f172a;"></div>
            <div style="font-size: 11px; color: var(--text-dim);">Sep 23, 2026 • 10:14 AM</div>
            <div style="font-weight: 600; color: #fff; font-size: 13.5px; margin-top: 2px;">Survivorship Rule Recalculation</div>
            <div style="font-size: 12px; color: var(--text-secondary); margin-top: 4px;">
              Revenue attribute winning value changed to <code>$1,450,000</code> based on SAP ERP latest transactional billing update.
            </div>
            <div style="font-size: 11px; color: var(--text-muted); margin-top: 4px;">Actor: <span class="badge badge-neutral">Survivorship Rule #4</span></div>
          </div>

          <div style="position: relative;">
            <div style="position: absolute; left: -20px; top: 4px; width: 12px; height: 12px; border-radius: 50%; background: #6366f1; border: 2px solid #0f172a;"></div>
            <div style="font-size: 11px; color: var(--text-dim);">Sep 22, 2026 • 02:30 PM</div>
            <div style="font-weight: 600; color: #fff; font-size: 13.5px; margin-top: 2px;">Steward Approval & Physical Merge</div>
            <div style="font-size: 12px; color: var(--text-secondary); margin-top: 4px;">
              Salesforce Account <code>CRM-10231</code> merged into SAP ERP <code>ERP-88391</code> with <strong>96.7% match confidence</strong>.
            </div>
            <div style="font-size: 11px; color: var(--text-muted); margin-top: 4px;">Actor: <span class="badge badge-triad badge-user-decision">Elena Rostova (Data Steward)</span></div>
          </div>

          <div style="position: relative;">
            <div style="position: absolute; left: -20px; top: 4px; width: 12px; height: 12px; border-radius: 50%; background: #06b6d4; border: 2px solid #0f172a;"></div>
            <div style="font-size: 11px; color: var(--text-dim);">Sep 20, 2026 • 09:12 AM</div>
            <div style="font-weight: 600; color: #fff; font-size: 13.5px; margin-top: 2px;">Initial Golden Entity Created</div>
            <div style="font-size: 12px; color: var(--text-secondary); margin-top: 4px;">
              New identity anchor established upon initial Salesforce Account ingest.
            </div>
            <div style="font-size: 11px; color: var(--text-muted); margin-top: 4px;">Actor: <span class="badge badge-neutral">Pipeline Ingestion Job #2049</span></div>
          </div>
        </div>
      </div>
    </div>
  `;
}
