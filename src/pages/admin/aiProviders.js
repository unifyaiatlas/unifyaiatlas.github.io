// Page 44: AI Providers & Foundation Models (Route: /admin/ai-providers)
import { renderBreadcrumbs } from '../../components/breadcrumbs.js';
import { repository } from '../../services/repository.js';

export async function renderAiProvidersPage() {
  const providers = await repository.getAIProviders();

  return `
    <div class="page-container">
      <div style="margin-bottom: 12px;">
        ${renderBreadcrumbs([
          { label: 'Administration', route: '#/admin/domains' },
          { label: 'AI Providers & LLMs', route: '#/admin/ai-providers' }
        ])}
      </div>

      <div class="page-header">
        <div class="page-title-group">
          <div style="display: flex; align-items: center; gap: 8px;">
            <h1 class="page-title">Enterprise AI Providers & Foundation Models</h1>
            <span class="badge badge-success">3 Models Configured</span>
          </div>
          <p class="page-description">Manage LLMs powering semantic schema mapping, match explanations, and natural language copilot interactions. Secrets and keys are securely vaulted in KMS.</p>
        </div>
      </div>

      <div class="table-card">
        <table class="data-table">
          <thead>
            <tr>
              <th>AI Provider Gateway</th>
              <th>Configured Model</th>
              <th>Runtime Status</th>
              <th>Avg Latency</th>
              <th>Primary Platform Purpose</th>
              <th style="text-align: right;">Health Test</th>
            </tr>
          </thead>
          <tbody>
            ${providers.map(p => `
              <tr>
                <td class="cell-highlight"><strong>${p.provider}</strong></td>
                <td><span class="badge badge-info cell-mono">${p.model}</span></td>
                <td>
                  <span class="badge ${p.status === 'Active' ? 'badge-success' : 'badge-neutral'}">
                    <span style="width: 6px; height: 6px; border-radius: 50%; background: ${p.status === 'Active' ? '#10b981' : '#94a3b8'};"></span>
                    ${p.status}
                  </span>
                </td>
                <td class="cell-mono" style="color: #34d399;">${p.latency}</td>
                <td style="font-size: 12px; color: var(--text-secondary);">${p.purpose}</td>
                <td style="text-align: right;">
                  <button class="btn btn-secondary btn-sm" onclick="alert('Model ${p.model} health check passed! Latency: ${p.latency}')">Test Ping</button>
                </td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      </div>
    </div>
  `;
}
