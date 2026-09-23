// Page 19: Match Simulation & Benchmarking (Route: /unification/simulations/:simulationId)
import { renderBreadcrumbs } from '../../components/breadcrumbs.js';
import { repository } from '../../services/repository.js';

export async function renderSimulationPage() {
  return `
    <div class="page-container">
      <div style="margin-bottom: 12px;">
        ${renderBreadcrumbs([
          { label: 'Unification', route: '#/unification' },
          { label: 'Simulations', route: '#/unification/simulations/sim-latest' },
          { label: 'Simulation #SIM-9824', route: '#/unification/simulations/sim-latest' }
        ])}
      </div>

      <div class="page-header">
        <div class="page-title-group">
          <div style="display: flex; align-items: center; gap: 8px;">
            <h1 class="page-title">Match Simulation Benchmark</h1>
            <span class="badge badge-success">Completed (1M Records Evaluated)</span>
          </div>
          <p class="page-description">Comparative impact assessment of <strong>Customer Standard v4 (Proposed)</strong> vs <strong>v3 (Current Production)</strong>.</p>
        </div>
        <div class="page-actions">
          <button class="btn btn-secondary" onclick="alert('Draft saved.')">Save as Draft</button>
          <button class="btn btn-primary" onclick="alert('Strategy v4 published to active execution pipeline!')">Publish Strategy to Production</button>
          <a href="#/unification/matches" class="btn btn-secondary">Next: Match Results →</a>
        </div>
      </div>

      <!-- Comparative KPI Delta Grid (Section 19) -->
      <div class="kpi-grid">
        <div class="kpi-card">
          <span class="kpi-label">Sample Evaluated</span>
          <div class="kpi-value">1,000,000</div>
          <div class="kpi-delta positive"><span>●</span> Stratified enterprise slice</div>
        </div>

        <div class="kpi-card" style="border-color: rgba(16, 185, 129, 0.4);">
          <span class="kpi-label">Auto-Match Lift</span>
          <div class="kpi-value" style="color: #34d399;">+14.2%</div>
          <div class="kpi-delta positive"><span>↑ +142,000</span> additional auto merges</div>
        </div>

        <div class="kpi-card">
          <span class="kpi-label">Steward Review Load</span>
          <div class="kpi-value" style="color: #38bdf8;">-3.1%</div>
          <div class="kpi-delta positive"><span>↓ -31,000</span> fewer manual reviews</div>
        </div>

        <div class="kpi-card">
          <span class="kpi-label">False Positive Risk</span>
          <div class="kpi-value" style="color: #34d399;">< 0.04%</div>
          <div class="kpi-delta positive"><span>✓</span> Zero critical key conflicts</div>
        </div>
      </div>

      <!-- Side-by-Side Comparison Table -->
      <div class="grid-2" style="margin-bottom: 20px;">
        <div class="card">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px;">
            <h3 style="font-size: 14px; font-weight: 600; color: var(--text-muted);">Current Strategy (v3 Production)</h3>
            <span class="badge badge-neutral">Baseline</span>
          </div>
          <table style="width: 100%; border-collapse: collapse; font-size: 12.5px;">
            <tr style="border-bottom: 1px solid var(--border-subtle);"><td style="padding: 8px 0; color: var(--text-muted);">Auto Match Rate (≥95%)</td><td style="text-align: right; color: #fff;">77.5% (775,000)</td></tr>
            <tr style="border-bottom: 1px solid var(--border-subtle);"><td style="padding: 8px 0; color: var(--text-muted);">Steward Review Tier</td><td style="text-align: right; color: #fbbf24;">12.5% (125,000)</td></tr>
            <tr style="border-bottom: 1px solid var(--border-subtle);"><td style="padding: 8px 0; color: var(--text-muted);">Unmatched Remainder</td><td style="text-align: right; color: var(--text-dim);">10.0% (100,000)</td></tr>
            <tr><td style="padding: 8px 0; color: var(--text-muted);">Methodology</td><td style="text-align: right; color: var(--text-secondary);">Exact Email + Exact Phone only</td></tr>
          </table>
        </div>

        <div class="card" style="border-color: rgba(99, 102, 241, 0.4);">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px;">
            <h3 style="font-size: 14px; font-weight: 600; color: #fff;">Proposed Strategy (v4 with AI Disambiguation)</h3>
            <span class="badge badge-triad badge-ai-rec">SIMULATION RUN</span>
          </div>
          <table style="width: 100%; border-collapse: collapse; font-size: 12.5px;">
            <tr style="border-bottom: 1px solid var(--border-subtle);"><td style="padding: 8px 0; color: var(--text-muted);">Auto Match Rate (≥95%)</td><td style="text-align: right; color: #34d399; font-weight: 700;">91.7% (917,000)</td></tr>
            <tr style="border-bottom: 1px solid var(--border-subtle);"><td style="padding: 8px 0; color: var(--text-muted);">Steward Review Tier</td><td style="text-align: right; color: #38bdf8; font-weight: 600;">9.4% (94,000)</td></tr>
            <tr style="border-bottom: 1px solid var(--border-subtle);"><td style="padding: 8px 0; color: var(--text-muted);">Unmatched Remainder</td><td style="text-align: right; color: var(--text-dim);">8.9% (89,000)</td></tr>
            <tr><td style="padding: 8px 0; color: var(--text-muted);">Methodology</td><td style="text-align: right; color: #c084fc;">Weighted + Jaro-Winkler + Phone E.164</td></tr>
          </table>
        </div>
      </div>

      <!-- Sample Matches Evaluated in this Simulation -->
      <div class="table-card">
        <div class="table-toolbar">
          <span style="font-weight: 600; color: #fff;">Sample Match Pairs Resolved by Proposed Rules</span>
          <span class="badge badge-success">0 Conflicts Flagged</span>
        </div>
        <table class="data-table">
          <thead>
            <tr>
              <th>Source Record A</th>
              <th>Source Record B</th>
              <th>Calculated Confidence</th>
              <th>Old Decision (v3)</th>
              <th>New Decision (v4)</th>
              <th style="text-align: right;">Action</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <div style="font-weight: 600; color: #fff;">Robert Smith</div>
                <div style="font-size: 11px; color: var(--text-muted);">Salesforce CRM • CRM-10231</div>
              </td>
              <td>
                <div style="font-weight: 600; color: #fff;">Robert J Smith</div>
                <div style="font-size: 11px; color: var(--text-muted);">SAP ERP • ERP-88391</div>
              </td>
              <td class="cell-mono" style="color: #34d399; font-weight: 700;">96.7%</td>
              <td><span class="badge badge-warning">Review (Manual)</span></td>
              <td><span class="badge badge-success">Auto Match (≥95%)</span></td>
              <td style="text-align: right;">
                <a href="#/stewardship/reviews/match-101" class="btn btn-secondary btn-sm">Inspect Scoring →</a>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  `;
}
