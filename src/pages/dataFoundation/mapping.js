// Page 10: AI Schema Mapping Studio (Route: /data-foundation/mappings)
import { renderBreadcrumbs } from '../../components/breadcrumbs.js';
import { repository } from '../../services/repository.js';

export async function renderMappingPage() {
  const mappings = await repository.getSchemaMappings();
  const highConfidenceCount = mappings.filter(m => m.confidence >= 95 && m.triadStatus !== 'USER DECISION').length;

  return `
    <div class="page-container">
      <div style="margin-bottom: 12px;">
        ${renderBreadcrumbs([
          { label: 'Data Foundation', route: '#/data-foundation/sources' },
          { label: 'Schema Mapping Studio', route: '#/data-foundation/mappings' }
        ])}
      </div>

      <div class="page-header">
        <div class="page-title-group">
          <div style="display: flex; align-items: center; gap: 8px;">
            <h1 class="page-title">AI Schema Mapping Workspace</h1>
            <span class="badge badge-info">Zero-Copy Virtual Schema</span>
          </div>
          <p class="page-description">Align source fields into the enterprise canonical customer model. Review AI confidence explanations and record governance decisions.</p>
        </div>
        <div class="page-actions">
          <button class="btn btn-secondary" onclick="window.unifyExplainMappingAI()">
            <span>✦</span> Ask AI Why?
          </button>
          <button class="btn btn-primary" onclick="window.unifyAcceptAllMappings()" ${highConfidenceCount === 0 ? 'disabled' : ''}>
            <span>✓</span> Accept All High Confidence (${highConfidenceCount})
          </button>
          <a href="#/data-foundation/profiles" class="btn btn-secondary">
            <span>Next: Profiles →</span>
          </a>
        </div>
      </div>

      <!-- UX Triad Legend (Section 51) -->
      <div style="margin-bottom: 16px; padding: 10px 16px; background: var(--bg-card-subtle); border: 1px solid var(--border-subtle); border-radius: var(--radius-md); display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 10px;">
        <div style="display: flex; align-items: center; gap: 16px; font-size: 11.5px;">
          <span style="font-weight: 600; color: #fff;">Governance Status:</span>
          <span class="badge-triad badge-ai-rec">AI RECOMMENDATION (Pending Review)</span>
          <span class="badge-triad badge-user-decision">USER DECISION (Certified by Steward)</span>
          <span class="badge-triad badge-system-fact">SYSTEM FACT (Physical Constraint)</span>
        </div>
        <span style="font-size: 11px; color: var(--text-muted);">Source: <strong>Salesforce CRM (Account)</strong> ➔ Target: <strong>Canonical Customer</strong></span>
      </div>

      <!-- Mapping 3-Column Studio Layout (Section 10) -->
      <div class="table-card">
        <div class="table-toolbar">
          <div style="display: flex; gap: 8px; align-items: center;">
            <span style="font-weight: 600; color: #fff; font-size: 13px;">Field Alignments</span>
            <span class="badge badge-neutral">${mappings.length} Fields Mapped</span>
          </div>
          <span style="font-size: 12px; color: var(--text-muted);">Average Match Confidence: <strong style="color: #38bdf8;">96.6%</strong></span>
        </div>

        <div class="data-table-container">
          <table class="data-table">
            <thead>
              <tr>
                <th style="width: 25%;">Source Field (Salesforce Account)</th>
                <th style="width: 20%; text-align: center;">AI Confidence & Reasoning</th>
                <th style="width: 25%;">Target Canonical Field</th>
                <th style="width: 15%;">Governance State</th>
                <th style="width: 15%; text-align: right;">Steward Action</th>
              </tr>
            </thead>
            <tbody id="mappings-table-body">
              ${mappings.map(m => `
                <tr id="row-${m.id}">
                  <td>
                    <div style="font-weight: 600; color: #fff; font-family: var(--font-mono);">${m.sourceField}</div>
                    <div style="font-size: 11px; color: var(--text-muted);">Type: ${m.sourceType} • Sample: <span style="color: #cbd5e1;">"${m.sourceSample}"</span></div>
                  </td>

                  <td style="text-align: center;">
                    <div style="display: flex; flex-direction: column; align-items: center; gap: 4px;">
                      <span style="font-size: 13px; font-weight: 700; color: ${m.confidence >= 95 ? '#34d399' : '#fbbf24'}; font-family: var(--font-mono);">
                        ${m.confidence}%
                      </span>
                      <div class="bar-track" style="width: 90px; height: 4px;">
                        <div class="bar-fill ${m.confidence >= 95 ? 'bar-fill-success' : 'bar-fill-warning'}" style="width: ${m.confidence}%;"></div>
                      </div>
                      <button class="btn btn-ghost btn-sm" onclick="alert('${m.reasoning.replace(/'/g, "\\'")}')" style="font-size: 10px; padding: 1px 4px; color: #a5b4fc;">
                        Why? ✦
                      </button>
                    </div>
                  </td>

                  <td>
                    <div style="font-weight: 600; color: #38bdf8; font-family: var(--font-mono);">${m.canonicalField}</div>
                    <div style="font-size: 11px; color: var(--text-muted);">Target Type: ${m.canonicalType}</div>
                  </td>

                  <td>
                    <span class="badge-triad ${m.triadStatus === 'USER DECISION' ? 'badge-user-decision' : 'badge-ai-rec'}">
                      ${m.triadStatus}
                    </span>
                    ${m.decidedBy ? `<div style="font-size: 10.5px; color: var(--text-muted); margin-top: 3px;">By: ${m.decidedBy}</div>` : ''}
                  </td>

                  <td style="text-align: right;">
                    ${m.triadStatus === 'USER DECISION' ? `
                      <span style="color: #34d399; font-size: 12px; font-weight: 600;">✓ Accepted</span>
                      <button class="btn btn-ghost btn-sm" onclick="window.unifyResetMapping('${m.id}')" style="font-size: 10.5px; margin-left: 4px;">Reset</button>
                    ` : `
                      <div style="display: inline-flex; gap: 4px;">
                        <button class="btn btn-success btn-sm" onclick="window.unifyAcceptMapping('${m.id}')">Accept</button>
                        <button class="btn btn-ghost btn-sm" onclick="alert('Mapping edit interface opened for ${m.sourceField}.')">Edit</button>
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
