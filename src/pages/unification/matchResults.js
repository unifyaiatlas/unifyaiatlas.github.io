// Page 20: Match Results (Route: /unification/matches)
import { renderBreadcrumbs } from '../../components/breadcrumbs.js';
import { repository } from '../../services/repository.js';

export async function renderMatchResultsPage() {
  const matches = await repository.getMatches();

  return `
    <div class="page-container">
      <div style="margin-bottom: 12px;">
        ${renderBreadcrumbs([
          { label: 'Unification', route: '#/unification' },
          { label: 'Match Results', route: '#/unification/matches' }
        ])}
      </div>

      <div class="page-header">
        <div class="page-title-group">
          <h1 class="page-title">Candidate Match Pairs & Resolution Results</h1>
          <p class="page-description">Inspect pairs evaluated across enterprise zero-copy sources. Click any row to review score breakdown and attribute survivorship.</p>
        </div>
        <div class="page-actions">
          <a href="#/stewardship" class="btn btn-primary">
            <span>⚖️</span> Open Stewardship Queue
          </a>
        </div>
      </div>

      <div class="table-card">
        <div class="table-toolbar">
          <div style="display: flex; gap: 8px; align-items: center; flex-wrap: wrap;">
            <input type="text" class="form-input" placeholder="Search record name, ID, or email..." style="width: 240px; padding: 6px 10px; font-size: 12px;">
            <select class="form-select" style="padding: 6px 10px; font-size: 12px;">
              <option value="">All Tiers</option>
              <option value="Auto Match">Auto Match (≥95%)</option>
              <option value="Review">Requires Review</option>
            </select>
            <select class="form-select" style="padding: 6px 10px; font-size: 12px;">
              <option value="">Strategy: Customer Standard v4</option>
            </select>
          </div>
          <span style="font-size: 12px; color: var(--text-muted);">${matches.length} Candidate Match Pairs</span>
        </div>

        <div class="data-table-container">
          <table class="data-table">
            <thead>
              <tr>
                <th>Source Record A</th>
                <th>Source Record B</th>
                <th style="text-align: center;">Confidence Score</th>
                <th>Resolution Status</th>
                <th>Applied Strategy</th>
                <th style="text-align: right;">Steward Action</th>
              </tr>
            </thead>
            <tbody>
              ${matches.map(m => `
                <tr style="cursor: pointer;" onclick="window.location.hash='#/stewardship/reviews/${m.id}'">
                  <td>
                    <div style="font-weight: 600; color: #fff;">${m.sourceA.name}</div>
                    <div style="font-size: 11px; color: var(--text-muted);">${m.sourceA.source} • <code class="cell-mono">${m.sourceA.id}</code></div>
                    <div style="font-size: 10.5px; color: var(--text-dim);">${m.sourceA.email} • ${m.sourceA.city}</div>
                  </td>

                  <td>
                    <div style="font-weight: 600; color: #fff;">${m.sourceB.name}</div>
                    <div style="font-size: 11px; color: var(--text-muted);">${m.sourceB.source} • <code class="cell-mono">${m.sourceB.id}</code></div>
                    <div style="font-size: 10.5px; color: var(--text-dim);">${m.sourceB.email} • ${m.sourceB.city}</div>
                  </td>

                  <td style="text-align: center;">
                    <span style="font-family: var(--font-mono); font-size: 15px; font-weight: 700; color: ${m.confidence >= 95 ? '#34d399' : '#fbbf24'};">
                      ${m.confidence}%
                    </span>
                    <div class="bar-track" style="width: 80px; margin: 4px auto 0;">
                      <div class="bar-fill ${m.confidence >= 95 ? 'bar-fill-success' : 'bar-fill-warning'}" style="width: ${m.confidence}%;"></div>
                    </div>
                  </td>

                  <td>
                    <span class="badge ${m.status.includes('Auto') ? 'badge-success' : 'badge-warning'}">
                      ${m.status}
                    </span>
                  </td>

                  <td style="font-size: 12px; color: var(--text-secondary);">${m.strategy}</td>

                  <td style="text-align: right;" onclick="event.stopPropagation()">
                    <a href="#/stewardship/reviews/${m.id}" class="btn btn-secondary btn-sm">
                      Inspect & Review →
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
