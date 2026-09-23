// Page 33 & 34: Activation APIs & Data Products Hub (Route: /activation & /activation/apis)
import { renderBreadcrumbs } from '../../components/breadcrumbs.js';

export async function renderActivationPage() {
  const apis = [
    { name: 'Entity Resolution API', endpoint: 'POST /v1/resolve', status: 'Healthy', requests: '1.4M / day', latency: '38ms', auth: 'mTLS + OAuth 2.0' },
    { name: 'Golden Entity Lookup API', endpoint: 'GET /v1/entities/:goldenId', status: 'Healthy', requests: '4.8M / day', latency: '12ms', auth: 'Bearer API Key' },
    { name: 'Identity Graph Traversal API', endpoint: 'POST /v1/graph/traverse', status: 'Healthy', requests: '820K / day', latency: '45ms', auth: 'OAuth 2.0' },
    { name: 'Governance Lineage API', endpoint: 'GET /v1/lineage/:entityId', status: 'Healthy', requests: '120K / day', latency: '60ms', auth: 'Role: Auditor' }
  ];

  return `
    <div class="page-container">
      <div style="margin-bottom: 12px;">
        ${renderBreadcrumbs([
          { label: 'Activation', route: '#/activation' },
          { label: 'APIs & Data Services', route: '#/activation/apis' }
        ])}
      </div>

      <div class="page-header">
        <div class="page-title-group">
          <div style="display: flex; align-items: center; gap: 8px;">
            <h1 class="page-title">Activation & Downstream Data Products</h1>
            <span class="badge badge-success">4/4 APIs Online</span>
          </div>
          <p class="page-description">Syndicate golden records, real-time resolution endpoints, and event streams to enterprise operational consumers.</p>
        </div>
        <div class="page-actions">
          <a href="#/activation/data-products" class="btn btn-secondary">
            <span>📦</span> Certified Data Products
          </a>
          <a href="#/activation/events" class="btn btn-primary">
            <span>⚡</span> Real-time Event Streams
          </a>
        </div>
      </div>

      <!-- High Level Activation KPIs (Section 33) -->
      <div class="kpi-grid">
        <div class="kpi-card">
          <span class="kpi-label">Active APIs</span>
          <div class="kpi-value">4 Endpoints</div>
          <div class="kpi-delta positive"><span>●</span> 99.99% uptime</div>
        </div>
        <div class="kpi-card">
          <span class="kpi-label">Published Data Products</span>
          <div class="kpi-value">6 Products</div>
          <div class="kpi-delta positive"><span>✓</span> Golden Customer Certified</div>
        </div>
        <div class="kpi-card">
          <span class="kpi-label">Event Stream Velocity</span>
          <div class="kpi-value" style="color: #38bdf8;">14.2k evt/s</div>
          <div class="kpi-delta positive"><span>⚡</span> Kafka / PubSub CDC</div>
        </div>
        <div class="kpi-card">
          <span class="kpi-label">Connected Destinations</span>
          <div class="kpi-value">8 Consumers</div>
          <div class="kpi-delta positive"><span>🏢</span> Salesforce, Snowflake, Hubspot</div>
        </div>
      </div>

      <!-- APIs Table (Section 34) -->
      <div class="table-card">
        <div class="table-toolbar">
          <span style="font-weight: 600; color: #fff;">Registered Real-Time Endpoints</span>
          <span class="badge badge-info">Zero-Copy Direct Access</span>
        </div>
        <table class="data-table">
          <thead>
            <tr>
              <th>API Service</th>
              <th>REST / GraphQL Endpoint</th>
              <th>Status</th>
              <th>Throughput</th>
              <th>P99 Latency</th>
              <th>Authentication</th>
              <th style="text-align: right;">Action</th>
            </tr>
          </thead>
          <tbody>
            ${apis.map(a => `
              <tr>
                <td class="cell-highlight"><strong>${a.name}</strong></td>
                <td><code class="cell-mono" style="color: #38bdf8;">${a.endpoint}</code></td>
                <td><span class="badge badge-success">${a.status}</span></td>
                <td class="cell-mono">${a.requests}</td>
                <td class="cell-mono" style="color: #34d399;">${a.latency}</td>
                <td><span class="badge badge-neutral">${a.auth}</span></td>
                <td style="text-align: right;">
                  <button class="btn btn-secondary btn-sm" onclick="alert('Viewing Swagger / OpenAPI docs for ${a.name}')">Swagger</button>
                </td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      </div>
    </div>
  `;
}
