// Page 6: Sources Catalog (Route: /data-foundation/sources)
import { renderBreadcrumbs } from '../../components/breadcrumbs.js';
import { repository } from '../../services/repository.js';

export async function renderSourcesPage() {
  const sources = await repository.getSources();

  return `
    <div class="page-container">
      <div style="margin-bottom: 12px;">
        ${renderBreadcrumbs([
          { label: 'Data Foundation', route: '#/data-foundation/sources' },
          { label: 'Sources', route: '#/data-foundation/sources' }
        ])}
      </div>

      <div class="page-header">
        <div class="page-title-group">
          <h1 class="page-title">Enterprise Data Sources</h1>
          <p class="page-description">Manage zero-copy endpoints, lakehouses, materialized caches, and real-time CDC connectors.</p>
        </div>
        <div class="page-actions">
          <a href="#/data-foundation/sources/new" class="btn btn-primary">
            <span>+</span> Connect New Source
          </a>
        </div>
      </div>

      <!-- Filters & Toolbar -->
      <div class="table-card">
        <div class="table-toolbar">
          <div style="display: flex; gap: 8px; align-items: center; flex-wrap: wrap;">
            <input type="text" class="form-input" placeholder="Filter sources by name or type..." style="width: 240px; padding: 6px 10px; font-size: 12px;">
            <select class="form-select" style="padding: 6px 10px; font-size: 12px;">
              <option value="">All Access Modes</option>
              <option value="Zero-Copy">Zero-Copy</option>
              <option value="Materialized">Materialized</option>
            </select>
            <select class="form-select" style="padding: 6px 10px; font-size: 12px;">
              <option value="">All Domains</option>
              <option value="Customer">Customer</option>
              <option value="Product">Product</option>
            </select>
            <select class="form-select" style="padding: 6px 10px; font-size: 12px;">
              <option value="">Status: All</option>
              <option value="Connected">Connected</option>
              <option value="Healthy">Healthy</option>
            </select>
          </div>
          <div style="font-size: 12px; color: var(--text-muted);">
            Showing <strong>${sources.length}</strong> active connections
          </div>
        </div>

        <div class="data-table-container">
          <table class="data-table">
            <thead>
              <tr>
                <th>Source Name</th>
                <th>System Type</th>
                <th>Target Entity</th>
                <th>Access Mode</th>
                <th>Connection Status</th>
                <th style="text-align: right;">Records</th>
                <th>Last Synchronized</th>
                <th>Objects</th>
                <th style="text-align: right;">Row Actions</th>
              </tr>
            </thead>
            <tbody>
              ${sources.map(s => `
                <tr style="cursor: pointer;" onclick="window.location.hash='#/data-foundation/sources/${s.id}'">
                  <td class="cell-highlight">
                    <div style="display: flex; align-items: center; gap: 8px;">
                      <span style="font-size: 16px;">${s.type === 'CRM' ? '☁️' : (s.type === 'ERP' ? '🏢' : '🗄️')}</span>
                      <div>
                        <strong>${s.name}</strong>
                        <div style="font-size: 10.5px; color: var(--text-dim);">${s.id}</div>
                      </div>
                    </div>
                  </td>
                  <td>${s.type}</td>
                  <td><span class="badge badge-neutral">${s.entity}</span></td>
                  <td>
                    <span class="badge ${s.access === 'Zero-Copy' ? 'badge-info' : 'badge-neutral'}">
                      ${s.access}
                    </span>
                  </td>
                  <td>
                    <span class="badge badge-success">
                      <span style="width: 6px; height: 6px; border-radius: 50%; background: #10b981;"></span>
                      ${s.status}
                    </span>
                  </td>
                  <td class="cell-mono" style="text-align: right; font-weight: 600;">${s.records}</td>
                  <td style="font-size: 12px; color: var(--text-muted);">${s.lastSync}</td>
                  <td style="font-size: 12px;">${s.objectsCount} tables</td>
                  <td style="text-align: right;" onclick="event.stopPropagation()">
                    <div style="display: inline-flex; gap: 4px;">
                      <a href="#/data-foundation/sources/${s.id}" class="btn btn-secondary btn-sm" title="Open Source Details">Open</a>
                      <button class="btn btn-ghost btn-sm" onclick="alert('Connection test for ${s.name}: 100% OK (Latency: ${s.latency})')" title="Test Ping">Test</button>
                      <a href="#/data-foundation/profiles" class="btn btn-ghost btn-sm" title="Profile Data">Profile</a>
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
