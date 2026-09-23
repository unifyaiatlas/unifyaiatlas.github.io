// Page 9: Data Discovery (Route: /data-foundation/discovery)
import { renderBreadcrumbs } from '../../components/breadcrumbs.js';
import { repository } from '../../services/repository.js';

export async function renderDiscoveryPage() {
  const datasets = await repository.getDiscoveredDatasets();

  return `
    <div class="page-container">
      <div style="margin-bottom: 12px;">
        ${renderBreadcrumbs([
          { label: 'Data Foundation', route: '#/data-foundation/sources' },
          { label: 'Data Discovery', route: '#/data-foundation/discovery' }
        ])}
      </div>

      <div class="page-header">
        <div class="page-title-group">
          <h1 class="page-title">Automated Semantic Data Discovery</h1>
          <p class="page-description">AI continuously analyzes source schemas, identifies potential canonical entities, detects PII, and quantifies duplicate clusters.</p>
        </div>
        <div class="page-actions">
          <button class="btn btn-secondary" onclick="alert('Discovery scan started on all connected sources.')">
            <span>⚡</span> Trigger Discovery Scan
          </button>
          <a href="#/data-foundation/mappings" class="btn btn-primary">
            <span>→</span> Advance to Schema Mapping
          </a>
        </div>
      </div>

      <!-- Discovered Entities Grid (Section 9) -->
      <div style="display: flex; flex-direction: column; gap: 16px;">
        ${datasets.map(d => `
          <div class="card" style="border-left: 4px solid ${d.suggestedDomain === 'Customer' ? 'var(--primary)' : 'var(--secondary)'};">
            <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 14px; flex-wrap: wrap; gap: 10px;">
              <div>
                <div style="display: flex; align-items: center; gap: 8px;">
                  <h3 style="font-size: 16px; font-weight: 700; color: #fff;">${d.title}</h3>
                  <span class="badge-triad badge-ai-rec">AI IDENTIFIED</span>
                  <span class="badge badge-info">${d.suggestedDomain} Domain</span>
                </div>
                <div style="font-size: 12px; color: var(--text-muted); margin-top: 3px;">
                  Identified across: <strong>${d.source}</strong> • Confidence: <span style="color: #a855f7; font-weight: 600;">${d.confidence}</span>
                </div>
              </div>

              <div style="display: flex; gap: 8px;">
                <a href="#/data-foundation/mappings" class="btn btn-primary btn-sm">
                  Review & Map Schema →
                </a>
              </div>
            </div>

            <div class="grid-3" style="margin-bottom: 14px; background: var(--bg-card-subtle); padding: 12px; border-radius: var(--radius-md);">
              <div>
                <div style="font-size: 11px; color: var(--text-muted); text-transform: uppercase;">Volume</div>
                <div style="font-size: 16px; font-weight: 700; color: #fff; font-family: var(--font-mono);">${d.records} records</div>
                <div style="font-size: 11px; color: var(--text-dim);">${d.columns} detected columns</div>
              </div>

              <div>
                <div style="font-size: 11px; color: var(--text-muted); text-transform: uppercase;">Candidate Identifiers</div>
                <div style="display: flex; flex-wrap: wrap; gap: 4px; margin-top: 4px;">
                  ${d.identifiers.map(id => `<span class="badge badge-neutral cell-mono" style="font-size: 10.5px;">${id}</span>`).join('')}
                </div>
              </div>

              <div>
                <div style="font-size: 11px; color: var(--text-muted); text-transform: uppercase;">PII & Duplicate Risk</div>
                <div style="font-size: 12.5px; font-weight: 600; color: #fbbf24;">${d.duplicatesEstimate}</div>
                <div style="font-size: 11px; color: var(--text-secondary); margin-top: 2px;">
                  PII: ${d.piiFields.join(', ')}
                </div>
              </div>
            </div>

            <div style="display: flex; justify-content: space-between; align-items: center; font-size: 12px; color: var(--text-secondary);">
              <span>AI Recommendation: Map to canonical <code>Customer</code> entity model and apply E.164 phone standardizer.</span>
              <span class="badge badge-success">${d.status}</span>
            </div>
          </div>
        `).join('')}
      </div>
    </div>
  `;
}
