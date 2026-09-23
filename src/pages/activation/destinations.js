// Page 37: Activation Destinations (Route: /activation/destinations)
import { renderBreadcrumbs } from '../../components/breadcrumbs.js';

export async function renderDestinationsPage() {
  const destinations = [
    { name: 'Snowflake Enterprise Warehouse', type: 'Data Warehouse', protocol: 'Zero-Copy Data Share', sync: 'Continuous', status: 'Healthy', records: '18.2M' },
    { name: 'Salesforce Reverse ETL Sync', type: 'CRM', protocol: 'Salesforce Bulk API 2.0', sync: 'Hourly Delta', status: 'Healthy', records: '2.0M' },
    { name: 'Braze Customer Engagement', type: 'Marketing Automation', protocol: 'REST Webhook', sync: 'Real-time Event', status: 'Healthy', records: '4.8M' },
    { name: 'Apache Kafka Event Hub', type: 'Event Bus', protocol: 'TLS SASL Kafka Producer', sync: 'Streaming CDC', status: 'Healthy', records: '24.6M' }
  ];

  return `
    <div class="page-container">
      <div style="margin-bottom: 12px;">
        ${renderBreadcrumbs([
          { label: 'Activation', route: '#/activation' },
          { label: 'Destinations', route: '#/activation/destinations' }
        ])}
      </div>

      <div class="page-header">
        <div class="page-title-group">
          <h1 class="page-title">Downstream Activation Destinations</h1>
          <p class="page-description">Configure reverse ETL channels, data shares, and cloud warehouse subscriptions.</p>
        </div>
      </div>

      <div class="table-card">
        <table class="data-table">
          <thead>
            <tr>
              <th>Destination System</th>
              <th>Destination Type</th>
              <th>Transfer Protocol</th>
              <th>Sync Frequency</th>
              <th>Status</th>
              <th style="text-align: right;">Records Synced</th>
            </tr>
          </thead>
          <tbody>
            ${destinations.map(d => `
              <tr>
                <td class="cell-highlight"><strong>${d.name}</strong></td>
                <td><span class="badge badge-info">${d.type}</span></td>
                <td>${d.protocol}</td>
                <td>${d.sync}</td>
                <td><span class="badge badge-success">${d.status}</span></td>
                <td class="cell-mono" style="text-align: right; color: #fff;">${d.records}</td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      </div>
    </div>
  `;
}
