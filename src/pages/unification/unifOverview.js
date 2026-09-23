// Page 16: Unification Overview & Funnel (Route: /unification)
import { renderBreadcrumbs } from '../../components/breadcrumbs.js';
import { repository } from '../../services/repository.js';

export async function renderUnifOverviewPage() {
  return `
    <div class="page-container">
      <div style="margin-bottom: 12px;">
        ${renderBreadcrumbs([
          { label: 'Unification', route: '#/unification' },
          { label: 'Overview', route: '#/unification' }
        ])}
      </div>

      <div class="page-header">
        <div class="page-title-group">
          <div style="display: flex; align-items: center; gap: 8px;">
            <h1 class="page-title">Entity Unification & Resolution Engine</h1>
            <span class="badge badge-success">Zero-Copy Active</span>
          </div>
          <p class="page-description">High-scale deterministic and probabilistic identity resolution, AI disambiguation, and automated survivorship rules.</p>
        </div>
        <div class="page-actions">
          <a href="#/unification/match-strategies/new" class="btn btn-secondary">
            <span>+</span> Create Strategy
          </a>
          <button class="btn btn-primary" onclick="alert('Full Unification job queued on Spark/Databricks cluster.')">
            <span>⚡</span> Run Unification
          </button>
          <a href="#/unification/matches" class="btn btn-secondary">
            <span>→</span> Review Results
          </a>
        </div>
      </div>

      <!-- Funnel Metrics (Section 16) -->
      <div class="kpi-grid">
        <div class="kpi-card">
          <span class="kpi-label">Entities Processed</span>
          <div class="kpi-value">42.8M</div>
          <div class="kpi-delta positive"><span>●</span> Across all connectors</div>
        </div>
        <div class="kpi-card">
          <span class="kpi-label">Total Matches</span>
          <div class="kpi-value">24.6M</div>
          <div class="kpi-delta positive"><span>↑ 91.7%</span> resolution rate</div>
        </div>
        <div class="kpi-card">
          <span class="kpi-label">Auto Matches (≥95%)</span>
          <div class="kpi-value" style="color: #34d399;">22.5M</div>
          <div class="kpi-delta positive"><span>✓</span> Zero human touch needed</div>
        </div>
        <div class="kpi-card" style="border-color: rgba(245, 158, 11, 0.4);">
          <span class="kpi-label">Steward Reviews</span>
          <div class="kpi-value" style="color: #fbbf24;">1,284</div>
          <div class="kpi-delta" style="color: #fbbf24;"><span>⚠️ In Queue</span></div>
        </div>
        <div class="kpi-card">
          <span class="kpi-label">Golden Entities</span>
          <div class="kpi-value" style="color: #38bdf8;">18.2M</div>
          <div class="kpi-delta positive"><span>👑 Mastered records</span></div>
        </div>
      </div>

      <!-- Pipeline Visualization Flow (Section 16) -->
      <div class="card" style="margin-bottom: 20px;">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px;">
          <h3 style="font-size: 14px; font-weight: 600; color: #fff;">End-to-End Resolution Pipeline Stage Graph</h3>
          <span class="badge badge-info">Zero-Copy Pushdown Pipeline</span>
        </div>

        <div style="display: grid; grid-template-columns: repeat(5, 1fr); gap: 12px; text-align: center;">
          
          <div style="background: var(--bg-card-subtle); border: 1px solid var(--border-default); border-radius: var(--radius-md); padding: 14px;">
            <div style="font-size: 20px; margin-bottom: 6px;">🔌</div>
            <div style="font-weight: 600; color: #fff; font-size: 13px;">1. Sources</div>
            <div style="font-size: 11px; color: var(--text-muted); margin-top: 4px;">Salesforce, SAP, PG</div>
            <div class="badge badge-success" style="margin-top: 8px; font-size: 10px;">42.8M Recs</div>
          </div>

          <div style="background: var(--bg-card-subtle); border: 1px solid var(--border-default); border-radius: var(--radius-md); padding: 14px;">
            <div style="font-size: 20px; margin-bottom: 6px;">📐</div>
            <div style="font-weight: 600; color: #fff; font-size: 13px;">2. Standardization</div>
            <div style="font-size: 11px; color: var(--text-muted); margin-top: 4px;">Phone E.164, Country ISO</div>
            <div class="badge badge-info" style="margin-top: 8px; font-size: 10px;">Rule #12</div>
          </div>

          <div style="background: var(--bg-card-subtle); border: 1px solid var(--primary); border-radius: var(--radius-md); padding: 14px; box-shadow: 0 0 10px rgba(99,102,241,0.2);">
            <div style="font-size: 20px; margin-bottom: 6px;">⚡</div>
            <div style="font-weight: 600; color: #fff; font-size: 13px;">3. Matching</div>
            <div style="font-size: 11px; color: var(--text-muted); margin-top: 4px;">Exact, Fuzzy, AI Embed</div>
            <div class="badge badge-triad badge-ai-rec" style="margin-top: 8px; font-size: 10px;">Strategy v4</div>
          </div>

          <div style="background: var(--bg-card-subtle); border: 1px solid var(--border-default); border-radius: var(--radius-md); padding: 14px;">
            <div style="font-size: 20px; margin-bottom: 6px;">🛡️</div>
            <div style="font-weight: 600; color: #fff; font-size: 13px;">4. Survivorship</div>
            <div style="font-size: 11px; color: var(--text-muted); margin-top: 4px;">Most Recent & Trust Rank</div>
            <div class="badge badge-info" style="margin-top: 8px; font-size: 10px;">Rule #4</div>
          </div>

          <div style="background: var(--bg-card-subtle); border: 1px solid var(--secondary); border-radius: var(--radius-md); padding: 14px; box-shadow: 0 0 10px rgba(6,182,212,0.2);">
            <div style="font-size: 20px; margin-bottom: 6px;">👑</div>
            <div style="font-weight: 600; color: #fff; font-size: 13px;">5. Golden Records</div>
            <div style="font-size: 11px; color: var(--text-muted); margin-top: 4px;">Mastered Customer 360</div>
            <div class="badge badge-success" style="margin-top: 8px; font-size: 10px;">18.2M Mastered</div>
          </div>

        </div>
      </div>

      <!-- Quick Actions Grid -->
      <div class="grid-3">
        <a href="#/unification/match-strategies" class="card" style="text-decoration: none; transition: transform 0.2s;">
          <h3 style="color: #fff; font-size: 14px; margin-bottom: 4px;">Match Strategy Catalog</h3>
          <p style="font-size: 12px; color: var(--text-secondary);">Manage active rules, weights, and auto-match threshold tiers.</p>
          <div style="margin-top: 10px; color: var(--primary); font-size: 12px; font-weight: 600;">Configure Strategies →</div>
        </a>

        <a href="#/unification/simulations/sim-latest" class="card" style="text-decoration: none; transition: transform 0.2s;">
          <h3 style="color: #fff; font-size: 14px; margin-bottom: 4px;">Simulation Studio</h3>
          <p style="font-size: 12px; color: var(--text-secondary);">Compare proposed matching rules against production baselines.</p>
          <div style="margin-top: 10px; color: var(--secondary); font-size: 12px; font-weight: 600;">Run Benchmark Test →</div>
        </a>

        <a href="#/stewardship" class="card" style="text-decoration: none; transition: transform 0.2s;">
          <h3 style="color: #fff; font-size: 14px; margin-bottom: 4px;">Stewardship Review Queue</h3>
          <p style="font-size: 12px; color: var(--text-secondary);">Resolve 1,284 ambiguous pairs in the review threshold tier.</p>
          <div style="margin-top: 10px; color: #fbbf24; font-size: 12px; font-weight: 600;">Enter Queue (1,284) →</div>
        </a>
      </div>
    </div>
  `;
}
