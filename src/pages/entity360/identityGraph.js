// Page 27: Interactive Identity Graph (Route: /entity-360/:entityId/graph)
import { renderBreadcrumbs } from '../../components/breadcrumbs.js';
import { repository } from '../../services/repository.js';

export async function renderIdentityGraphPage(params) {
  const entityId = params.entityId || 'CUST-00192837';
  const entity = (await repository.getGoldenEntity(entityId)) || (await repository.getGoldenEntities())[0];

  return `
    <div class="page-container">
      <div style="margin-bottom: 12px;">
        ${renderBreadcrumbs([
          { label: 'Entity 360', route: '#/entity-360/search' },
          { label: `${entity.name} (${entity.id})`, route: `#/entity-360/${entity.id}` },
          { label: 'Identity Graph', route: `#/entity-360/${entity.id}/graph` }
        ])}
      </div>

      <div class="page-header">
        <div class="page-title-group">
          <div style="display: flex; align-items: center; gap: 8px;">
            <h1 class="page-title">Interactive Identity Graph Explorer</h1>
            <span class="badge badge-info">Multi-Hop Resolution</span>
          </div>
          <p class="page-description">Graph topology linking Master Golden Entity <code>${entity.id}</code> with physical source IDs, corporate hierarchies, and contact points.</p>
        </div>
        <div class="page-actions">
          <button class="btn btn-secondary" onclick="alert('Graph re-centered.')">Center Graph</button>
          <a href="#/governance/lineage" class="btn btn-primary">
            <span>Next: Lineage Flow →</span>
          </a>
        </div>
      </div>

      <!-- Graph Canvas Container (Section 27) -->
      <div class="card" style="position: relative; height: 520px; overflow: hidden; background: #060911; border: 1px solid var(--border-default); border-radius: var(--radius-lg); display: flex; align-items: center; justify-content: center;">
        
        <!-- Controls Overlay -->
        <div style="position: absolute; top: 16px; left: 16px; z-index: 10; display: flex; gap: 8px;">
          <button class="btn btn-secondary btn-sm" onclick="alert('Graph zoom in')">+</button>
          <button class="btn btn-secondary btn-sm" onclick="alert('Graph zoom out')">-</button>
          <button class="btn btn-secondary btn-sm" onclick="alert('Filter applied: Show only CRM/ERP links')">Filter Edges</button>
        </div>

        <div style="position: absolute; bottom: 16px; left: 16px; z-index: 10; background: rgba(15, 23, 42, 0.85); backdrop-filter: blur(4px); padding: 8px 12px; border-radius: 6px; border: 1px solid var(--border-subtle); font-size: 11px; display: flex; gap: 14px;">
          <span style="display: flex; align-items: center; gap: 6px;"><span style="width: 10px; height: 10px; border-radius: 50%; background: #6366f1;"></span> Master Entity</span>
          <span style="display: flex; align-items: center; gap: 6px;"><span style="width: 10px; height: 10px; border-radius: 50%; background: #06b6d4;"></span> Source Identity</span>
          <span style="display: flex; align-items: center; gap: 6px;"><span style="width: 10px; height: 10px; border-radius: 50%; background: #a855f7;"></span> Organization</span>
          <span style="display: flex; align-items: center; gap: 6px;"><span style="width: 10px; height: 10px; border-radius: 50%; background: #10b981;"></span> Household / Account</span>
        </div>

        <!-- Interactive SVG Canvas -->
        <svg width="100%" height="100%" viewBox="0 0 800 480" style="cursor: grab;">
          <defs>
            <!-- Glow Filters -->
            <filter id="glow-gold" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="6" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
            <marker id="arrow" viewBox="0 0 10 10" refX="22" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
              <path d="M 0 0 L 10 5 L 0 10 z" fill="rgba(255,255,255,0.2)" />
            </marker>
          </defs>

          <!-- Edges -->
          <line x1="400" y1="240" x2="220" y2="140" stroke="rgba(99, 102, 241, 0.5)" stroke-width="2" stroke-dasharray="4,4" />
          <line x1="400" y1="240" x2="580" y2="140" stroke="rgba(99, 102, 241, 0.5)" stroke-width="2" stroke-dasharray="4,4" />
          <line x1="400" y1="240" x2="240" y2="340" stroke="rgba(6, 182, 212, 0.4)" stroke-width="1.5" />
          <line x1="400" y1="240" x2="560" y2="340" stroke="rgba(168, 85, 247, 0.4)" stroke-width="1.5" />
          <line x1="400" y1="240" x2="400" y2="390" stroke="rgba(16, 185, 129, 0.4)" stroke-width="1.5" />

          <!-- Center Node: Golden Record -->
          <g transform="translate(400, 240)" style="cursor: pointer;" onclick="alert('Golden Entity: CUST-00192837 (Robert Smith)')">
            <circle r="44" fill="#1e1b4b" stroke="#6366f1" stroke-width="3" filter="url(#glow-gold)" />
            <text text-anchor="middle" y="-6" fill="#fff" font-size="12" font-weight="700" font-family="var(--font-sans)">👑 ${entity.name}</text>
            <text text-anchor="middle" y="12" fill="#38bdf8" font-size="10" font-family="var(--font-mono)">${entity.id}</text>
            <text text-anchor="middle" y="24" fill="#34d399" font-size="9">97.4% Match</text>
          </g>

          <!-- Node: Salesforce Source Identity -->
          <g transform="translate(220, 140)" style="cursor: pointer;" onclick="alert('Salesforce Source Record: CRM-10231 (Robert Smith)')">
            <circle r="34" fill="#0f172a" stroke="#06b6d4" stroke-width="2" />
            <text text-anchor="middle" y="-2" fill="#fff" font-size="10" font-weight="600">Salesforce CRM</text>
            <text text-anchor="middle" y="12" fill="#94a3b8" font-size="9" font-family="var(--font-mono)">CRM-10231</text>
          </g>

          <!-- Node: SAP ERP Source Identity -->
          <g transform="translate(580, 140)" style="cursor: pointer;" onclick="alert('SAP ERP Source Record: ERP-88391 (Robert J Smith)')">
            <circle r="34" fill="#0f172a" stroke="#06b6d4" stroke-width="2" />
            <text text-anchor="middle" y="-2" fill="#fff" font-size="10" font-weight="600">SAP S/4HANA</text>
            <text text-anchor="middle" y="12" fill="#94a3b8" font-size="9" font-family="var(--font-mono)">ERP-88391</text>
          </g>

          <!-- Node: Associated Organization -->
          <g transform="translate(240, 340)" style="cursor: pointer;" onclick="alert('Organization: Apex Global Technologies Ltd')">
            <circle r="32" fill="#0f172a" stroke="#a855f7" stroke-width="2" />
            <text text-anchor="middle" y="-2" fill="#fff" font-size="10" font-weight="600">Apex Global</text>
            <text text-anchor="middle" y="12" fill="#c084fc" font-size="8">Legal Org</text>
          </g>

          <!-- Node: Associated Household -->
          <g transform="translate(560, 340)" style="cursor: pointer;" onclick="alert('Household: Kolkata Resident Cluster')">
            <circle r="32" fill="#0f172a" stroke="#10b981" stroke-width="2" />
            <text text-anchor="middle" y="-2" fill="#fff" font-size="10" font-weight="600">Smith Household</text>
            <text text-anchor="middle" y="12" fill="#34d399" font-size="8">Kolkata Cluster</text>
          </g>

          <!-- Node: Contact Point -->
          <g transform="translate(400, 390)" style="cursor: pointer;" onclick="alert('Contact Point: robert@abc.com • +919876543210')">
            <circle r="26" fill="#0f172a" stroke="#3b82f6" stroke-width="1.5" />
            <text text-anchor="middle" y="4" fill="#60a5fa" font-size="9">E.164 Phone</text>
          </g>
        </svg>
      </div>
    </div>
  `;
}
