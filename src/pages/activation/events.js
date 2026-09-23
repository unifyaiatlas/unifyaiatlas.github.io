// Page 35: Event Streams & Webhooks (Route: /activation/events)
import { renderBreadcrumbs } from '../../components/breadcrumbs.js';

export async function renderEventsPage() {
  const eventTypes = [
    { type: 'ENTITY_CREATED', topic: 'unify.entities.created', volume: '12.4K / hr', desc: 'Triggered when a new golden identity anchor is established.' },
    { type: 'ENTITY_UPDATED', topic: 'unify.entities.updated', volume: '184.2K / hr', desc: 'Triggered upon survivorship change or attribute enrichment.' },
    { type: 'ENTITY_MERGED', topic: 'unify.entities.merged', volume: '4.8K / hr', desc: 'Emitted when two distinct records are combined into one Golden ID.' },
    { type: 'ENTITY_UNMERGED', topic: 'unify.entities.unmerged', volume: '12 / hr', desc: 'Emitted when a steward separates an erroneously linked pair.' },
    { type: 'ATTRIBUTE_CHANGED', topic: 'unify.attributes.changed', volume: '210.0K / hr', desc: 'Granular delta event for single field provenance changes.' },
    { type: 'MATCH_REVIEW_REQUIRED', topic: 'unify.reviews.pending', volume: '213 / hr', desc: 'Alerts steward subscribers when an ambiguous pair enters the queue.' }
  ];

  return `
    <div class="page-container">
      <div style="margin-bottom: 12px;">
        ${renderBreadcrumbs([
          { label: 'Activation', route: '#/activation' },
          { label: 'Event Streams', route: '#/activation/events' }
        ])}
      </div>

      <div class="page-header">
        <div class="page-title-group">
          <h1 class="page-title">Real-Time Event Streams</h1>
          <p class="page-description">Subscribe to asynchronous lifecycle events via Apache Kafka, AWS EventBridge, or Google Cloud Pub/Sub.</p>
        </div>
      </div>

      <div class="table-card">
        <table class="data-table">
          <thead>
            <tr>
              <th>Event Type</th>
              <th>Pub/Sub Topic Name</th>
              <th>Velocity Throughput</th>
              <th>Description</th>
              <th style="text-align: right;">Action</th>
            </tr>
          </thead>
          <tbody>
            ${eventTypes.map(ev => `
              <tr>
                <td class="cell-highlight cell-mono" style="color: #38bdf8;">
                  <strong>${ev.type}</strong>
                </td>
                <td><code class="cell-mono">${ev.topic}</code></td>
                <td class="cell-mono" style="color: #34d399;">${ev.volume}</td>
                <td style="color: var(--text-secondary); font-size: 12px;">${ev.desc}</td>
                <td style="text-align: right;">
                  <button class="btn btn-secondary btn-sm" onclick="alert('Viewing sample payload schema for ${ev.type}')">Payload Schema</button>
                </td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      </div>
    </div>
  `;
}
