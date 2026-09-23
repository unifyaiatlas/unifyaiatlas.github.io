// Page 17: Match Strategies Catalog (Route: /unification/match-strategies)
import { renderBreadcrumbs } from '../../components/breadcrumbs.js';
import { repository } from '../../services/repository.js';

export async function renderMatchStrategiesPage() {
  const strategies = await repository.getMatchStrategies();

  return `
    <div class="page-container">
      <div style="margin-bottom: 12px;">
        ${renderBreadcrumbs([
          { label: 'Unification', route: '#/unification' },
          { label: 'Match Strategies', route: '#/unification/match-strategies' }
        ])}
      </div>

      <div class="page-header">
        <div class="page-title-group">
          <h1 class="page-title">Entity Match Strategies</h1>
          <p class="page-description">Configure composite deterministic, fuzzy phonetic, and AI-assisted scoring strategies per canonical domain.</p>
        </div>
        <div class="page-actions">
          <a href="#/unification/match-strategies/new" class="btn btn-primary">
            <span>+</span> New Match Strategy
          </a>
        </div>
      </div>

      <div class="table-card">
        <div class="table-toolbar">
          <div style="display: flex; gap: 8px; align-items: center;">
            <input type="text" class="form-input" placeholder="Filter strategies..." style="width: 200px; padding: 6px 10px; font-size: 12px;">
            <select class="form-select" style="padding: 6px 10px; font-size: 12px;">
              <option value="">All Domains</option>
              <option value="Customer">Customer</option>
              <option value="Account">Account</option>
            </select>
          </div>
          <span style="font-size: 12px; color: var(--text-muted);">${strategies.length} Configured Strategies</span>
        </div>

        <div class="data-table-container">
          <table class="data-table">
            <thead>
              <tr>
                <th>Strategy Name</th>
                <th>Domain</th>
                <th>Version</th>
                <th style="text-align: right;">Auto Threshold</th>
                <th style="text-align: right;">Review Threshold</th>
                <th>Status</th>
                <th style="text-align: right;">Actions</th>
              </tr>
            </thead>
            <tbody>
              ${strategies.map(s => `
                <tr style="cursor: pointer;" onclick="window.location.hash='#/unification/match-strategies/new'">
                  <td class="cell-highlight">
                    <strong>${s.name}</strong>
                    <div style="font-size: 11px; color: var(--text-muted);">${s.description}</div>
                  </td>
                  <td><span class="badge badge-info">${s.domain}</span></td>
                  <td><span class="badge badge-neutral cell-mono">${s.version}</span></td>
                  <td class="cell-mono" style="text-align: right; color: #34d399; font-weight: 600;">≥ ${s.autoThreshold}%</td>
                  <td class="cell-mono" style="text-align: right; color: #fbbf24;">${s.reviewThreshold}% – ${s.autoThreshold - 0.1}%</td>
                  <td>
                    <span class="badge ${s.status === 'Active' ? 'badge-success' : 'badge-warning'}">${s.status}</span>
                  </td>
                  <td style="text-align: right;" onclick="event.stopPropagation()">
                    <div style="display: inline-flex; gap: 4px;">
                      <a href="#/unification/match-strategies/new" class="btn btn-secondary btn-sm">Edit</a>
                      <a href="#/unification/simulations/sim-latest" class="btn btn-ai btn-sm">Simulate</a>
                    </div>
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
