// Page 40: System Infrastructure & Telemetry Health (Route: /operations/health)
import { renderBreadcrumbs } from '../../components/breadcrumbs.js';

export async function renderHealthPage() {
  const subsystems = [
    { name: 'Databricks Compute Cluster', type: 'Compute Engine', status: 'Healthy', latency: '48ms', uptime: '99.99%', details: '16 Worker Nodes Active (Zero-Copy Federated Engine)' },
    { name: 'Enterprise Source Adapters', type: 'Zero-Copy Fabric', status: 'Healthy', latency: '22ms', uptime: '100.0%', details: '4/4 Connectors Live (Salesforce, SAP, Postgres, Databricks)' },
    { name: 'AI Disambiguation Gateway', type: 'Vertex AI & LLMs', status: 'Healthy', latency: '240ms', uptime: '99.95%', details: 'Google Gemini 1.5 Pro & OpenRouter Active' },
    { name: 'Event Streaming Fabric', type: 'Kafka EventHub', status: 'Healthy', latency: '8ms', uptime: '100.0%', details: 'Zero lag on CDC topics (14.2k evt/s)' },
    { name: 'Activation REST / GraphQL API', type: 'Edge Gateway', status: 'Healthy', latency: '14ms', uptime: '99.99%', details: 'P99 Latency 38ms across global POPs' }
  ];

  return `
    <div class="page-container">
      <div style="margin-bottom: 12px;">
        ${renderBreadcrumbs([
          { label: 'Operations', route: '#/operations/jobs' },
          { label: 'System Health', route: '#/operations/health' }
        ])}
      </div>

      <div class="page-header">
        <div class="page-title-group">
          <div style="display: flex; align-items: center; gap: 8px;">
            <h1 class="page-title">Platform Infrastructure & Service Telemetry</h1>
            <span class="badge badge-success">All Systems Operational</span>
          </div>
          <p class="page-description">Real-time health telemetry across zero-copy federation workers, AI providers, and streaming brokers.</p>
        </div>
      </div>

      <div class="table-card">
        <table class="data-table">
          <thead>
            <tr>
              <th>Subsystem Component</th>
              <th>Infrastructure Role</th>
              <th>Health Status</th>
              <th>P95 Latency</th>
              <th>30-Day SLA Uptime</th>
              <th>Diagnostic Telemetry</th>
            </tr>
          </thead>
          <tbody>
            ${subsystems.map(s => `
              <tr>
                <td class="cell-highlight"><strong>${s.name}</strong></td>
                <td><span class="badge badge-neutral">${s.type}</span></td>
                <td>
                  <span class="badge badge-success">
                    <span style="width: 6px; height: 6px; border-radius: 50%; background: #10b981;"></span>
                    ${s.status}
                  </span>
                </td>
                <td class="cell-mono" style="color: #34d399;">${s.latency}</td>
                <td class="cell-mono">${s.uptime}</td>
                <td style="font-size: 12px; color: var(--text-secondary);">${s.details}</td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      </div>
    </div>
  `;
}
