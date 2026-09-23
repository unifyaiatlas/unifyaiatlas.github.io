// Page 22: Stewardship Queue (Route: /stewardship)
import { renderBreadcrumbs } from '../../components/breadcrumbs.js';
import { repository } from '../../services/repository.js';

export async function renderReviewQueuePage() {
  const matches = await repository.getMatches();

  return `
    <div class="page-container">
      <div style="margin-bottom: 12px;">
        ${renderBreadcrumbs([
          { label: 'Stewardship', route: '#/stewardship' },
          { label: 'Review Queue', route: '#/stewardship' }
        ])}
      </div>

      <div class="page-header">
        <div class="page-title-group">
          <div style="display: flex; align-items: center; gap: 8px;">
            <h1 class="page-title">Data Steward Review Queue</h1>
            <span class="badge badge-warning">1,284 Pending Resolution</span>
          </div>
          <p class="page-description">Triage ambiguous match pairs, resolve conflicting survivorship claims, and certify enterprise identity merges.</p>
        </div>
        <div class="page-actions">
          <a href="#/stewardship/reviews/match-101" class="btn btn-primary">
            <span>⚖️</span> Open Match Review Studio (Robert Smith)
          </a>
        </div>
      </div>

      <!-- Queue Tabs (Section 22) -->
      <div class="tabs-nav">
        <button class="tab-btn active">High Priority (213)</button>
        <button class="tab-btn">My Assigned Queue (18)</button>
        <button class="tab-btn">Unassigned (1,053)</button>
        <button class="tab-btn">Recently Resolved (4,821)</button>
      </div>

      <!-- Bulk Actions Toolbar -->
      <div class="table-card">
        <div class="table-toolbar">
          <div style="display: flex; gap: 8px; align-items: center;">
            <input type="checkbox" id="select-all-queue">
            <button class="btn btn-secondary btn-sm" onclick="alert('Selected matches assigned to Elena Rostova')">Assign to Me</button>
            <button class="btn btn-success btn-sm" onclick="alert('Bulk approved!')">Bulk Approve</button>
            <button class="btn btn-danger btn-sm" onclick="alert('Bulk rejected!')">Bulk Reject</button>
          </div>
          <span style="font-size: 12px; color: var(--text-muted);">Threshold Range: <strong>85.0% – 94.9%</strong></span>
        </div>

        <div class="data-table-container">
          <table class="data-table">
            <thead>
              <tr>
                <th style="width: 30px;"></th>
                <th>Candidate Match Pair</th>
                <th>Contributing Sources</th>
                <th style="text-align: center;">Confidence</th>
                <th>Priority Reason</th>
                <th>Status</th>
                <th style="text-align: right;">Action</th>
              </tr>
            </thead>
            <tbody>
              ${matches.map(m => `
                <tr style="cursor: pointer;" onclick="window.location.hash='#/stewardship/reviews/${m.id}'">
                  <td onclick="event.stopPropagation()"><input type="checkbox"></td>
                  <td class="cell-highlight">
                    <strong>${m.sourceA.name}</strong> ↔ <strong>${m.sourceB.name}</strong>
                    <div style="font-size: 11px; color: var(--text-muted);">${m.sourceA.email} • ${m.sourceA.city}</div>
                  </td>
                  <td>
                    <span class="badge badge-info">${m.sourceA.source}</span>
                    <span style="font-size: 11px; color: var(--text-dim);">+</span>
                    <span class="badge badge-neutral">${m.sourceB.source}</span>
                  </td>
                  <td style="text-align: center;">
                    <span class="cell-mono" style="font-size: 13px; font-weight: 700; color: ${m.confidence >= 95 ? '#34d399' : '#fbbf24'};">
                      ${m.confidence}%
                    </span>
                  </td>
                  <td>
                    <div style="font-size: 11.5px; color: #fff;">Slight Legal Name Variation</div>
                    <div style="font-size: 10.5px; color: var(--text-muted);">Exact match on Phone & Email</div>
                  </td>
                  <td>
                    <span class="badge ${m.status.includes('Auto') ? 'badge-success' : 'badge-warning'}">
                      ${m.status}
                    </span>
                  </td>
                  <td style="text-align: right;" onclick="event.stopPropagation()">
                    <a href="#/stewardship/reviews/${m.id}" class="btn btn-secondary btn-sm">
                      Review Match →
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
