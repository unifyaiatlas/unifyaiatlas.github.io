// Page 21: Match Review Studio (Route: /stewardship/reviews/:matchId)
import { renderBreadcrumbs } from '../../components/breadcrumbs.js';
import { repository } from '../../services/repository.js';

export async function renderMatchReviewPage(params) {
  const matchId = params.matchId || 'match-101';
  const match = (await repository.getMatch(matchId)) || (await repository.getMatches())[0];

  return `
    <div class="page-container">
      <div style="margin-bottom: 12px;">
        ${renderBreadcrumbs([
          { label: 'Stewardship', route: '#/stewardship' },
          { label: 'Review Queue', route: '#/stewardship' },
          { label: `Review #${match.id} (Robert Smith)`, route: `#/stewardship/reviews/${match.id}` }
        ])}
      </div>

      <div class="page-header">
        <div class="page-title-group">
          <div style="display: flex; align-items: center; gap: 10px;">
            <h1 class="page-title">Match Review & Identity Resolution</h1>
            <span class="badge ${match.status.includes('Auto') || match.status === 'Approved' ? 'badge-success' : 'badge-warning'}">
              ${match.status}
            </span>
            <span class="cell-mono" style="font-size: 15px; color: #34d399; font-weight: 700;">
              ${match.confidence}% Match
            </span>
          </div>
          <p class="page-description">Candidate merge under <strong>${match.strategy}</strong>. Review attribute-level score contributions and survivorship.</p>
        </div>
        <div class="page-actions" id="steward-action-buttons">
          <button class="btn btn-danger" onclick="window.unifyRecordMatchDecision('${match.id}', 'Rejected')">
            <span>✕</span> Reject Merge
          </button>
          <button class="btn btn-secondary" onclick="alert('Investigation ticket #INV-9281 opened with audit trail.')">
            <span>🔍</span> Investigate
          </button>
          <button class="btn btn-success" onclick="window.unifyRecordMatchDecision('${match.id}', 'Approved')">
            <span>✓</span> Approve Merge & Create Golden Entity
          </button>
          <a href="#/entity-360/CUST-00192837" class="btn btn-primary">
            <span>Next: Entity 360 →</span>
          </a>
        </div>
      </div>

      <!-- Decision Status Banner if already acted upon -->
      <div id="decision-banner" style="${match.stewardDecision ? 'display: flex;' : 'display: none;'} margin-bottom: 16px; padding: 12px 18px; background: rgba(16, 185, 129, 0.12); border: 1px solid rgba(16, 185, 129, 0.35); border-radius: var(--radius-md); align-items: center; justify-content: space-between;">
        <div style="display: flex; align-items: center; gap: 10px;">
          <span class="badge-triad badge-user-decision">USER DECISION CERTIFIED</span>
          <span style="font-size: 12.5px; color: #fff;">
            Merge approved by <strong>Elena Rostova (Data Steward)</strong> at <span id="decision-time">${match.stewardDecision?.timestamp || 'Today'}</span>. Golden Record created.
          </span>
        </div>
        <a href="#/entity-360/CUST-00192837" class="btn btn-primary btn-sm">Open Golden Entity 360 👑</a>
      </div>

      <!-- Side-by-Side Attribute Comparison (Section 21) -->
      <div class="grid-2" style="margin-bottom: 20px;">
        <!-- SOURCE A -->
        <div class="card" style="border-top: 4px solid #38bdf8;">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 14px;">
            <div>
              <span class="badge badge-info">${match.sourceA.source}</span>
              <h3 style="font-size: 16px; font-weight: 700; color: #fff; margin-top: 4px;">${match.sourceA.name}</h3>
              <div style="font-size: 11px; color: var(--text-muted);">Source Record ID: <code class="cell-mono">${match.sourceA.id}</code></div>
            </div>
            <span class="badge badge-neutral">Zero-Copy Source</span>
          </div>

          <table style="width: 100%; border-collapse: collapse; font-size: 12.5px;">
            <tr style="border-bottom: 1px solid var(--border-subtle);"><td style="padding: 9px 0; color: var(--text-muted); width: 30%;">Full Name</td><td style="color: #fff; font-weight: 600;">${match.sourceA.name}</td></tr>
            <tr style="border-bottom: 1px solid var(--border-subtle);"><td style="padding: 9px 0; color: var(--text-muted);">Email Address</td><td style="color: #fff; font-family: var(--font-mono);">${match.sourceA.email}</td></tr>
            <tr style="border-bottom: 1px solid var(--border-subtle);"><td style="padding: 9px 0; color: var(--text-muted);">Phone Number</td><td style="color: #fff; font-family: var(--font-mono);">${match.sourceA.phone}</td></tr>
            <tr style="border-bottom: 1px solid var(--border-subtle);"><td style="padding: 9px 0; color: var(--text-muted);">Billing City</td><td style="color: #fff;">${match.sourceA.city}</td></tr>
            <tr><td style="padding: 9px 0; color: var(--text-muted);">Annual Revenue</td><td style="color: #fff; font-family: var(--font-mono);">${match.sourceA.revenue}</td></tr>
          </table>
        </div>

        <!-- SOURCE B -->
        <div class="card" style="border-top: 4px solid #a855f7;">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 14px;">
            <div>
              <span class="badge badge-info">${match.sourceB.source}</span>
              <h3 style="font-size: 16px; font-weight: 700; color: #fff; margin-top: 4px;">${match.sourceB.name}</h3>
              <div style="font-size: 11px; color: var(--text-muted);">Source Record ID: <code class="cell-mono">${match.sourceB.id}</code></div>
            </div>
            <span class="badge badge-neutral">Materialized ERP</span>
          </div>

          <table style="width: 100%; border-collapse: collapse; font-size: 12.5px;">
            <tr style="border-bottom: 1px solid var(--border-subtle);"><td style="padding: 9px 0; color: var(--text-muted); width: 30%;">Full Name</td><td style="color: #fff; font-weight: 600;">${match.sourceB.name}</td></tr>
            <tr style="border-bottom: 1px solid var(--border-subtle);"><td style="padding: 9px 0; color: var(--text-muted);">Email Address</td><td style="color: #fff; font-family: var(--font-mono);">${match.sourceB.email}</td></tr>
            <tr style="border-bottom: 1px solid var(--border-subtle);"><td style="padding: 9px 0; color: var(--text-muted);">Phone Number</td><td style="color: #fff; font-family: var(--font-mono);">${match.sourceB.phone}</td></tr>
            <tr style="border-bottom: 1px solid var(--border-subtle);"><td style="padding: 9px 0; color: var(--text-muted);">Billing City</td><td style="color: #fff;">${match.sourceB.city}</td></tr>
            <tr><td style="padding: 9px 0; color: var(--text-muted);">Annual Revenue</td><td style="color: #fff; font-family: var(--font-mono);">${match.sourceB.revenue}</td></tr>
          </table>
        </div>
      </div>

      <!-- Match Explanation Matrix (Section 21) -->
      <div class="table-card">
        <div class="table-toolbar">
          <div style="display: flex; align-items: center; gap: 8px;">
            <span style="font-weight: 600; color: #fff;">Scoring Contribution Breakdown</span>
            <span class="badge-triad badge-system-fact">SYSTEM FACT</span>
          </div>
          <span style="font-size: 12px; color: #34d399; font-weight: 700; font-family: var(--font-mono);">
            Total Composite Match: 96.7%
          </span>
        </div>

        <table class="data-table">
          <thead>
            <tr>
              <th>Evaluated Field</th>
              <th>Applied Matching Method</th>
              <th>Raw Algorithmic Score</th>
              <th>Allocated Weight</th>
              <th style="text-align: right;">Points Contribution</th>
            </tr>
          </thead>
          <tbody>
            ${match.breakdown.map(b => `
              <tr>
                <td class="cell-mono cell-highlight">${b.attribute}</td>
                <td><span class="badge badge-info">${b.method}</span></td>
                <td class="cell-mono">${b.score}%</td>
                <td class="cell-mono">${b.weight}%</td>
                <td style="text-align: right; color: #34d399; font-weight: 700; font-family: var(--font-mono);">
                  ${b.contribution}
                </td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      </div>
    </div>
  `;
}
