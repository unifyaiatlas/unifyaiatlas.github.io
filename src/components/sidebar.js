// Sidebar Component implementing Section 2 Navigation Model
import { store, goldenJourneySteps } from '../state/store.js';

export function renderSidebar() {
  const currentRoute = window.location.hash || '#/';
  const state = store.getState();
  const currentStep = goldenJourneySteps.find(s => s.id === state.currentJourneyStep) || goldenJourneySteps[0];
  const progressPercent = Math.round((state.currentJourneyStep / goldenJourneySteps.length) * 100);

  const navSections = [
    {
      group: 'Overview',
      icon: '📊',
      items: [
        { label: 'Platform Overview', route: '#/' }
      ]
    },
    {
      group: 'Data Foundation',
      icon: '🏛️',
      items: [
        { label: 'Sources', route: '#/data-foundation/sources', badge: '4' },
        { label: 'Add Source', route: '#/data-foundation/sources/new' },
        { label: 'Source Details', route: '#/data-foundation/sources/src-salesforce' },
        { label: 'Data Discovery', route: '#/data-foundation/discovery', badge: '3' },
        { label: 'Schema Mapping', route: '#/data-foundation/mappings' },
        { label: 'Data Profiles', route: '#/data-foundation/profiles' }
      ]
    },
    {
      group: 'Data Quality',
      icon: '🛡️',
      items: [
        { label: 'DQ Overview', route: '#/data-quality' },
        { label: 'Rules', route: '#/data-quality/rules', badge: '4' },
        { label: 'Rule Designer', route: '#/data-quality/rules/new' },
        { label: 'DQ Issues', route: '#/data-quality/issues', badge: '2', badgeClass: 'badge-danger' }
      ]
    },
    {
      group: 'Unification',
      icon: '⚡',
      items: [
        { label: 'Unification Overview', route: '#/unification' },
        { label: 'Match Strategies', route: '#/unification/match-strategies', badge: '2' },
        { label: 'Strategy Designer', route: '#/unification/match-strategies/new' },
        { label: 'Simulations', route: '#/unification/simulations/sim-latest' },
        { label: 'Match Results', route: '#/unification/matches', badge: '96.7%' },
        { label: 'Golden Entities', route: '#/unification/golden-entities', badge: '18.2M' }
      ]
    },
    {
      group: 'Stewardship',
      icon: '⚖️',
      items: [
        { label: 'Review Queue', route: '#/stewardship', badge: '1,284', badgeClass: 'badge-warning' },
        { label: 'Match Review', route: '#/stewardship/reviews/match-101' },
        { label: 'Decisions Log', route: '#/stewardship/decisions' }
      ]
    },
    {
      group: 'Entity 360',
      icon: '👤',
      items: [
        { label: 'Entity Search', route: '#/entity-360/search' },
        { label: 'Entity Profile', route: '#/entity-360/CUST-00192837' },
        { label: 'Identity Graph', route: '#/entity-360/CUST-00192837/graph' },
        { label: 'Entity History', route: '#/entity-360/CUST-00192837/history' }
      ]
    },
    {
      group: 'Governance',
      icon: '📜',
      items: [
        { label: 'Data Lineage', route: '#/governance/lineage' },
        { label: 'Audit Trail', route: '#/governance/audit' },
        { label: 'Reference Data', route: '#/governance/reference-data' },
        { label: 'Policies', route: '#/governance/policies' }
      ]
    },
    {
      group: 'Activation',
      icon: '🚀',
      items: [
        { label: 'Activation Overview', route: '#/activation' },
        { label: 'APIs', route: '#/activation/apis', badge: '4' },
        { label: 'Event Streams', route: '#/activation/events', badge: 'CDC' },
        { label: 'Data Products', route: '#/activation/data-products', badge: 'Certified' },
        { label: 'Destinations', route: '#/activation/destinations' }
      ]
    },
    {
      group: 'Operations',
      icon: '⚙️',
      items: [
        { label: 'Jobs', route: '#/operations/jobs', badge: '1 Running', badgeClass: 'badge-info' },
        { label: 'Job Details', route: '#/operations/jobs/job-9820' },
        { label: 'System Health', route: '#/operations/health', badge: 'Healthy' }
      ]
    },
    {
      group: 'Administration',
      icon: '🔧',
      items: [
        { label: 'Domains', route: '#/admin/domains' },
        { label: 'Entity Models', route: '#/admin/entity-models' },
        { label: 'Users & Roles', route: '#/admin/users' },
        { label: 'AI Providers', route: '#/admin/ai-providers', badge: 'Gemini' },
        { label: 'Settings', route: '#/admin/settings' }
      ]
    }
  ];

  let groupsHtml = '';
  navSections.forEach((sec, idx) => {
    // Check if any item in this section is active
    const hasActiveChild = sec.items.some(it => currentRoute === it.route || (it.route !== '#/' && currentRoute.startsWith(it.route)));
    const isCollapsed = !hasActiveChild && idx > 4; // Keep first 5 open by default

    const itemsHtml = sec.items.map(it => {
      const isActive = currentRoute === it.route || (it.route !== '#/' && currentRoute.startsWith(it.route));
      const badgeHtml = it.badge ? `<span class="nav-link-badge ${it.badgeClass || ''}">${it.badge}</span>` : '';
      return `
        <a href="${it.route}" class="nav-link ${isActive ? 'active' : ''}">
          <span>${it.label}</span>
          ${badgeHtml}
        </a>
      `;
    }).join('');

    groupsHtml += `
      <div class="nav-group ${isCollapsed ? 'collapsed' : ''}" data-group="${sec.group}">
        <div class="nav-group-header" onclick="this.parentElement.classList.toggle('collapsed')">
          <span class="group-title">
            <span class="group-icon">${sec.icon}</span>
            <span>${sec.group}</span>
          </span>
          <svg class="group-chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <polyline points="6 9 12 15 18 9"></polyline>
          </svg>
        </div>
        <div class="nav-group-items">
          ${itemsHtml}
        </div>
      </div>
    `;
  });

  return `
    <aside class="app-sidebar">
      <div class="sidebar-header">
        <a href="#/" class="brand-logo">
          <div class="brand-icon">U</div>
          <div>
            <div class="brand-title">UNIFY AI</div>
            <div style="font-size: 10px; color: var(--text-muted); line-height: 1;">Zero-Copy MDM</div>
          </div>
        </a>
        <span class="brand-badge" style="margin-left: auto;">v3.0</span>
      </div>

      <nav class="sidebar-nav">
        ${groupsHtml}
      </nav>

      <div class="sidebar-footer">
        <div class="journey-trigger-card" id="journey-widget" onclick="window.unifyToggleJourney()">
          <div class="journey-header">
            <span>DEMO JOURNEY</span>
            <span style="font-family: var(--font-mono); font-size: 10px;">${state.currentJourneyStep}/${goldenJourneySteps.length}</span>
          </div>
          <div class="journey-title">${currentStep.title}</div>
          <div class="journey-progress">
            <div class="journey-progress-bar" style="width: ${progressPercent}%;"></div>
          </div>
          <div style="display: flex; justify-content: space-between; align-items: center; margin-top: 4px;">
            <button class="btn btn-ghost btn-sm" onclick="event.stopPropagation(); window.unifyPrevJourneyStep()" style="padding: 2px 6px;">← Prev</button>
            <span style="font-size: 10px; color: var(--text-muted);">${progressPercent}% Complete</span>
            <button class="btn btn-primary btn-sm" onclick="event.stopPropagation(); window.unifyNextJourneyStep()" style="padding: 2px 6px;">Next →</button>
          </div>
        </div>
      </div>
    </aside>
  `;
}
