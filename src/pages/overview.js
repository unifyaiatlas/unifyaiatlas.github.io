// Page 5: Overview Dashboard (Route: /)
import { renderBreadcrumbs } from '../components/breadcrumbs.js';
import { repository } from '../services/repository.js';

export async function renderOverviewPage() {
  const sources = await repository.getSources();
  const jobs = await repository.getJobs();

  return `
    <div class="page-container">
      <div style="margin-bottom: 12px;">
        ${renderBreadcrumbs([{ label: 'Fabric Overview', route: '#/' }])}
      </div>

      <div class="page-header">
        <div class="page-title-group">
          <h1 class="page-title">
            <span>Zero-Copy Data Unification Fabric</span>
          </h1>
          <p class="page-description">Real-time enterprise identity resolution, data quality telemetry, and active stewardship operations.</p>
        </div>
        <div class="page-actions">
          <a href="#/data-foundation/sources/new" class="btn btn-secondary">
            <span>🔌</span> Connect Source
          </a>
          <a href="#/unification/match-strategies/new" class="btn btn-secondary">
            <span>⚡</span> Configure Strategy
          </a>
          <a href="#/stewardship" class="btn btn-primary">
            <span>⚖️</span> Review Queue (1,284)
          </a>
        </div>
      </div>

      <!-- KPI Cards (Section 5) -->
      <div class="kpi-grid">
        <div class="kpi-card">
          <span class="kpi-label">Connected Sources</span>
          <div class="kpi-value">${sources.length}</div>
          <div class="kpi-delta positive">
            <span>●</span> All connectors active & healthy
          </div>
        </div>

        <div class="kpi-card">
          <span class="kpi-label">Enterprise Records</span>
          <div class="kpi-value">42.8M</div>
          <div class="kpi-delta positive">
            <span>↑ +128K</span> synced today
          </div>
        </div>

        <div class="kpi-card">
          <span class="kpi-label">Golden Entities</span>
          <div class="kpi-value">18.2M</div>
          <div class="kpi-delta positive">
            <span>👑 42.5%</span> consolidation ratio
          </div>
        </div>

        <div class="kpi-card">
          <span class="kpi-label">Match Rate</span>
          <div class="kpi-value">91.7%</div>
          <div class="kpi-delta positive">
            <span>↑ +2.4%</span> vs baseline
          </div>
        </div>

        <div class="kpi-card">
          <span class="kpi-label">Data Quality Score</span>
          <div class="kpi-value" style="color: #38bdf8;">94.2%</div>
          <div class="kpi-delta positive">
            <span>● 4.8M</span> checked records
          </div>
        </div>

        <div class="kpi-card" style="border-color: rgba(245, 158, 11, 0.4);">
          <span class="kpi-label">Pending Reviews</span>
          <div class="kpi-value" style="color: #fbbf24;">1,284</div>
          <div class="kpi-delta" style="color: #fbbf24;">
            <span>⚠ Requires Steward</span>
          </div>
        </div>
      </div>

      <!-- Main Dash Content: Processing Health & Unification Pipeline -->
      <div class="grid-2" style="margin-bottom: 20px;">
        <!-- Processing Health -->
        <div class="card">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 14px;">
            <h3 style="font-size: 14px; font-weight: 600; color: #fff;">Processing Pipeline Health</h3>
            <span class="badge badge-success">8/8 Nodes Healthy</span>
          </div>

          <div style="display: flex; flex-direction: column; gap: 12px;">
            <div>
              <div style="display: flex; justify-content: space-between; font-size: 12px; margin-bottom: 4px;">
                <span style="color: var(--text-secondary);">Salesforce Zero-Copy CDC Engine</span>
                <span style="font-family: var(--font-mono); color: #34d399;">Active • 42ms</span>
              </div>
              <div class="bar-track"><div class="bar-fill bar-fill-success" style="width: 100%;"></div></div>
            </div>

            <div>
              <div style="display: flex; justify-content: space-between; font-size: 12px; margin-bottom: 4px;">
                <span style="color: var(--text-secondary);">Probabilistic Match Engine (Cluster 4)</span>
                <span style="font-family: var(--font-mono); color: #34d399;">Running • 14.2k rec/s</span>
              </div>
              <div class="bar-track"><div class="bar-fill bar-fill-primary" style="width: 78%;"></div></div>
            </div>

            <div>
              <div style="display: flex; justify-content: space-between; font-size: 12px; margin-bottom: 4px;">
                <span style="color: var(--text-secondary);">Vertex AI LLM Entity Disambiguation</span>
                <span style="font-family: var(--font-mono); color: #a855f7;">Active • 240ms</span>
              </div>
              <div class="bar-track"><div class="bar-fill bar-fill-ai" style="width: 92%;"></div></div>
            </div>
          </div>

          <div style="margin-top: 16px; padding-top: 12px; border-top: 1px solid var(--border-subtle); display: flex; justify-content: space-between; font-size: 11.5px; color: var(--text-muted);">
            <span>Active Jobs: <strong style="color: #fff;">1 Running</strong></span>
            <span>Completed Today: <strong style="color: #fff;">32 Jobs</strong></span>
            <span>Failed: <strong style="color: #34d399;">0</strong></span>
          </div>
        </div>

        <!-- Unification Pipeline Visual Funnel (Section 16) -->
        <div class="card">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 14px;">
            <h3 style="font-size: 14px; font-weight: 600; color: #fff;">Unification Funnel</h3>
            <a href="#/unification" class="btn btn-ghost btn-sm" style="font-size: 11px;">View Details →</a>
          </div>

          <div style="display: flex; align-items: center; justify-content: space-between; text-align: center; padding: 10px 0; font-family: var(--font-mono);">
            <div style="flex: 1;">
              <div style="font-size: 16px; font-weight: 700; color: #fff;">42.8M</div>
              <div style="font-size: 10px; color: var(--text-muted); text-transform: uppercase;">Raw Records</div>
            </div>
            <span style="color: var(--text-dim);">→</span>
            <div style="flex: 1;">
              <div style="font-size: 16px; font-weight: 700; color: #38bdf8;">94.2%</div>
              <div style="font-size: 10px; color: var(--text-muted); text-transform: uppercase;">DQ Validated</div>
            </div>
            <span style="color: var(--text-dim);">→</span>
            <div style="flex: 1;">
              <div style="font-size: 16px; font-weight: 700; color: #a855f7;">91.7%</div>
              <div style="font-size: 10px; color: var(--text-muted); text-transform: uppercase;">Matched</div>
            </div>
            <span style="color: var(--text-dim);">→</span>
            <div style="flex: 1;">
              <div style="font-size: 16px; font-weight: 700; color: #34d399;">18.2M</div>
              <div style="font-size: 10px; color: var(--text-muted); text-transform: uppercase;">Golden Entities</div>
            </div>
          </div>

          <div style="margin-top: 14px; background: rgba(99, 102, 241, 0.08); border: 1px dashed rgba(99, 102, 241, 0.3); border-radius: var(--radius-md); padding: 10px 14px; display: flex; align-items: center; justify-content: space-between;">
            <div>
              <div style="font-size: 12px; font-weight: 600; color: #fff;">Stewardship Review Alert</div>
              <div style="font-size: 11px; color: var(--text-secondary);">1,284 pairs in confidence bracket (85% – 94.9%) await human confirmation.</div>
            </div>
            <a href="#/stewardship/reviews/match-101" class="btn btn-ai btn-sm">Review Now</a>
          </div>
        </div>
      </div>

      <!-- Connected Sources Quick Table & Recent Activity -->
      <div class="grid-2">
        <!-- Sources Mini View -->
        <div class="table-card">
          <div class="table-toolbar">
            <span style="font-weight: 600; font-size: 13px; color: #fff;">Connected Sources</span>
            <a href="#/data-foundation/sources" class="btn btn-ghost btn-sm">Manage All →</a>
          </div>
          <table class="data-table">
            <thead>
              <tr>
                <th>Source</th>
                <th>Type</th>
                <th>Access</th>
                <th>Status</th>
                <th>Records</th>
              </tr>
            </thead>
            <tbody>
              ${sources.map(s => `
                <tr style="cursor: pointer;" onclick="window.location.hash='#/data-foundation/sources/${s.id}'">
                  <td class="cell-highlight">${s.name}</td>
                  <td>${s.type}</td>
                  <td><span class="badge ${s.access === 'Zero-Copy' ? 'badge-info' : 'badge-neutral'}">${s.access}</span></td>
                  <td><span class="badge badge-success">${s.status}</span></td>
                  <td class="cell-mono">${s.records}</td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>

        <!-- Recent Platform Activity Feed -->
        <div class="card">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px;">
            <h3 style="font-size: 14px; font-weight: 600; color: #fff;">Recent Activity Feed</h3>
            <span style="font-size: 11px; color: var(--text-dim);">Live audit stream</span>
          </div>

          <div style="display: flex; flex-direction: column; gap: 10px;">
            <div style="display: flex; gap: 10px; align-items: flex-start; padding-bottom: 10px; border-bottom: 1px solid var(--border-subtle);">
              <span style="background: rgba(6, 182, 212, 0.15); color: #38bdf8; padding: 4px 6px; border-radius: 4px; font-size: 11px;">SYNC</span>
              <div style="flex: 1;">
                <div style="font-size: 12.5px; color: #fff;">Salesforce Account source delta synchronized</div>
                <div style="font-size: 11px; color: var(--text-muted);">Real-time CDC processed 14,209 changes</div>
              </div>
              <span style="font-size: 11px; color: var(--text-dim);">2m ago</span>
            </div>

            <div style="display: flex; gap: 10px; align-items: flex-start; padding-bottom: 10px; border-bottom: 1px solid var(--border-subtle);">
              <span style="background: rgba(168, 85, 247, 0.15); color: #c084fc; padding: 4px 6px; border-radius: 4px; font-size: 11px;">MATCH</span>
              <div style="flex: 1;">
                <div style="font-size: 12.5px; color: #fff;">4,821 entities auto-unified into Golden Customer model</div>
                <div style="font-size: 11px; color: var(--text-muted);">Strategy: Customer Standard v4 (≥95% confidence)</div>
              </div>
              <span style="font-size: 11px; color: var(--text-dim);">14m ago</span>
            </div>

            <div style="display: flex; gap: 10px; align-items: flex-start; padding-bottom: 10px; border-bottom: 1px solid var(--border-subtle);">
              <span style="background: rgba(245, 158, 11, 0.15); color: #fbbf24; padding: 4px 6px; border-radius: 4px; font-size: 11px;">QUEUE</span>
              <div style="flex: 1;">
                <div style="font-size: 12.5px; color: #fff;">213 match pairs routed to Data Steward review queue</div>
                <div style="font-size: 11px; color: var(--text-muted);">High priority threshold tier (89% - 94.9%)</div>
              </div>
              <span style="font-size: 11px; color: var(--text-dim);">45m ago</span>
            </div>

            <div style="display: flex; gap: 10px; align-items: flex-start;">
              <span style="background: rgba(16, 185, 129, 0.15); color: #34d399; padding: 4px 6px; border-radius: 4px; font-size: 11px;">PUBLISH</span>
              <div style="flex: 1;">
                <div style="font-size: 12.5px; color: #fff;">Customer Golden Dataset published to Snowflake Data Share</div>
                <div style="font-size: 11px; color: var(--text-muted);">18.2M master entities verified & certified</div>
              </div>
              <span style="font-size: 11px; color: var(--text-dim);">1h ago</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;
}
