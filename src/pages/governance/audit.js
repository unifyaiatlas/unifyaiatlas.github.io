// Page 31: Compliance & Governance Audit Trail (Route: /governance/audit)
import { renderBreadcrumbs } from '../../components/breadcrumbs.js';

export async function renderAuditPage() {
  const events = [
    { time: 'Today 14:30', user: 'Elena Rostova (Steward)', action: 'Match Approved & Merged', target: 'CRM-10231 ➔ CUST-00192837', ip: '10.240.12.84' },
    { time: 'Today 10:14', user: 'System (Rule #4)', action: 'Survivorship Recalculated', target: 'CUST-00192837.revenue', ip: 'internal-daemon' },
    { time: 'Yesterday 18:20', user: 'John Smith (Architect)', action: 'Strategy Published (v4)', target: 'Customer Standard', ip: '10.240.10.12' },
    { time: 'Yesterday 14:10', user: 'John Smith (Architect)', action: 'Schema Mapping Certified', target: 'Salesforce.Account ➔ Customer', ip: '10.240.10.12' },
    { time: 'Sep 21 09:30', user: 'Sarah Chen (Admin)', action: 'AI Provider Configured', target: 'Google Cloud Vertex AI (Gemini)', ip: '10.240.0.4' }
  ];

  return `
    <div class="page-container">
      <div style="margin-bottom: 12px;">
        ${renderBreadcrumbs([
    { label: 'Governance', route: '#/governance/lineage' },
    { label: 'Audit Trail', route: '#/governance/audit' }
  ])}
      </div>

      <div class="page-header">
        <div class="page-title-group">
          <h1 class="page-title">Compliance Audit Trail</h1>
          <p class="page-description">Immutable log of steward decisions, automated merges, survivorship recalculations, and strategy promotions.</p>
        </div>
      </div>

      <div class="table-card">
        <div class="table-toolbar">
          <input type="text" class="form-input" placeholder="Filter audit events..." style="width: 240px; padding: 6px 10px; font-size: 12px;">
          <span style="font-size: 12px; color: var(--text-muted);">${events.length} Recent Logged Events</span>
        </div>
        <table class="data-table">
          <thead>
            <tr>
              <th>Timestamp</th>
              <th>Authorized Actor</th>
              <th>Action Category</th>
              <th>Target Record / Artifact</th>
              <th>Network Source</th>
            </tr>
          </thead>
          <tbody>
            ${events.map(e => `
              <tr>
                <td style="font-size: 12px; color: var(--text-muted);">${e.time}</td>
                <td class="cell-highlight">${e.user}</td>
                <td><span class="badge badge-info">${e.action}</span></td>
                <td class="cell-mono">${e.target}</td>
                <td class="cell-mono" style="font-size: 11px; color: var(--text-dim);">${e.ip}</td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      </div>
    </div>
  `;
}
