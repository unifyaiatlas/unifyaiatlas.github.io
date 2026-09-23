// Main Application Bootstrap for Unify AI Fabric
import { router } from './router.js';
import { store, goldenJourneySteps } from './state/store.js';
import { repository } from './services/repository.js';
import { renderAppShell } from './components/shell.js';
import { renderSidebar } from './components/sidebar.js';
import { renderTopbar } from './components/topbar.js';
import { renderAiAssistant } from './components/aiAssistant.js';
import { renderGlobalSearch } from './components/globalSearch.js';

// Import All Page Renderers
import { renderOverviewPage } from './pages/overview.js';
import { renderSourcesPage } from './pages/dataFoundation/sources.js';
import { renderAddSourcePage } from './pages/dataFoundation/addSource.js';
import { renderSourceDetailsPage } from './pages/dataFoundation/sourceDetails.js';
import { renderDiscoveryPage } from './pages/dataFoundation/discovery.js';
import { renderMappingPage } from './pages/dataFoundation/mapping.js';
import { renderProfilesPage } from './pages/dataFoundation/profiles.js';

import { renderDqOverviewPage } from './pages/dataQuality/dqOverview.js';
import { renderDqRulesPage } from './pages/dataQuality/dqRules.js';
import { renderDqDesignerPage } from './pages/dataQuality/dqDesigner.js';
import { renderDqIssuesPage } from './pages/dataQuality/dqIssues.js';

import { renderUnifOverviewPage } from './pages/unification/unifOverview.js';
import { renderMatchStrategiesPage } from './pages/unification/matchStrategies.js';
import { renderStrategyDesignerPage } from './pages/unification/strategyDesigner.js';
import { renderSimulationPage } from './pages/unification/simulation.js';
import { renderMatchResultsPage } from './pages/unification/matchResults.js';
import { renderGoldenEntitiesPage } from './pages/unification/goldenEntities.js';

import { renderReviewQueuePage } from './pages/stewardship/reviewQueue.js';
import { renderMatchReviewPage } from './pages/stewardship/matchReview.js';

import { renderEntitySearchPage } from './pages/entity360/entitySearch.js';
import { renderEntityProfilePage } from './pages/entity360/entityProfile.js';
import { renderIdentityGraphPage } from './pages/entity360/identityGraph.js';
import { renderEntityHistoryPage } from './pages/entity360/entityHistory.js';

import { renderLineagePage } from './pages/governance/lineage.js';
import { renderAuditPage } from './pages/governance/audit.js';
import { renderReferenceDataPage } from './pages/governance/referenceData.js';

import { renderActivationPage } from './pages/activation/activationOverview.js';
import { renderEventsPage } from './pages/activation/events.js';
import { renderDataProductsPage } from './pages/activation/dataProducts.js';
import { renderDestinationsPage } from './pages/activation/destinations.js';

import { renderJobsPage } from './pages/operations/jobs.js';
import { renderJobDetailsPage } from './pages/operations/jobDetails.js';
import { renderHealthPage } from './pages/operations/health.js';

import { renderDomainsPage } from './pages/admin/domains.js';
import { renderEntityModelsPage } from './pages/admin/entityModels.js';
import { renderUsersPage } from './pages/admin/users.js';
import { renderAiProvidersPage } from './pages/admin/aiProviders.js';
import { renderSettingsPage } from './pages/admin/settings.js';

// Authentication Pages (Section 2.1)
import { renderLoginPage } from './pages/auth/login.js';
import { renderRegisterPage } from './pages/auth/register.js';
import { renderForgotPasswordPage } from './pages/auth/forgotPassword.js';

// Setup Global Route Map (Section 50)
router
  .addRoute('/login', renderLoginPage)
  .addRoute('/register', renderRegisterPage)
  .addRoute('/forgot-password', renderForgotPasswordPage)
  .addRoute('/', renderOverviewPage)
  // Data Foundation
  .addRoute('/data-foundation/sources', renderSourcesPage)
  .addRoute('/data-foundation/sources/new', renderAddSourcePage)
  .addRoute('/data-foundation/sources/:sourceId', renderSourceDetailsPage)
  .addRoute('/data-foundation/discovery', renderDiscoveryPage)
  .addRoute('/data-foundation/mappings', renderMappingPage)
  .addRoute('/data-foundation/profiles', renderProfilesPage)
  // Data Quality
  .addRoute('/data-quality', renderDqOverviewPage)
  .addRoute('/data-quality/rules', renderDqRulesPage)
  .addRoute('/data-quality/rules/new', renderDqDesignerPage)
  .addRoute('/data-quality/issues', renderDqIssuesPage)
  // Unification
  .addRoute('/unification', renderUnifOverviewPage)
  .addRoute('/unification/match-strategies', renderMatchStrategiesPage)
  .addRoute('/unification/match-strategies/new', renderStrategyDesignerPage)
  .addRoute('/unification/simulations/:simulationId', renderSimulationPage)
  .addRoute('/unification/matches', renderMatchResultsPage)
  .addRoute('/unification/golden-entities', renderGoldenEntitiesPage)
  // Stewardship
  .addRoute('/stewardship', renderReviewQueuePage)
  .addRoute('/stewardship/reviews/:matchId', renderMatchReviewPage)
  .addRoute('/stewardship/decisions', renderAuditPage)
  // Entity 360
  .addRoute('/entity-360/search', renderEntitySearchPage)
  .addRoute('/entity-360/:entityId', renderEntityProfilePage)
  .addRoute('/entity-360/:entityId/graph', renderIdentityGraphPage)
  .addRoute('/entity-360/:entityId/history', renderEntityHistoryPage)
  // Governance
  .addRoute('/governance/lineage', renderLineagePage)
  .addRoute('/governance/lineage/:entityId/:attribute', renderLineagePage)
  .addRoute('/governance/audit', renderAuditPage)
  .addRoute('/governance/reference-data', renderReferenceDataPage)
  .addRoute('/governance/policies', renderDqRulesPage)
  // Activation
  .addRoute('/activation', renderActivationPage)
  .addRoute('/activation/apis', renderActivationPage)
  .addRoute('/activation/events', renderEventsPage)
  .addRoute('/activation/data-products', renderDataProductsPage)
  .addRoute('/activation/destinations', renderDestinationsPage)
  // Operations
  .addRoute('/operations/jobs', renderJobsPage)
  .addRoute('/operations/jobs/:jobId', renderJobDetailsPage)
  .addRoute('/operations/health', renderHealthPage)
  // Administration
  .addRoute('/admin/domains', renderDomainsPage)
  .addRoute('/admin/entity-models', renderEntityModelsPage)
  .addRoute('/admin/users', renderUsersPage)
  .addRoute('/admin/ai-providers', renderAiProvidersPage)
  .addRoute('/admin/settings', renderSettingsPage);

// Global Interactivity Bindings
window.unifyToggleAiDrawer = (open) => {
  store.toggleAiDrawer(open);
};

window.unifyOpenSearch = () => {
  store.toggleSearch(true);
  setTimeout(() => {
    const input = document.getElementById('global-search-input');
    if (input) {
      input.focus();
      input.select();
    }
  }, 50);
};

window.unifyCloseSearch = () => {
  store.toggleSearch(false);
};

window.unifyExecuteSearch = async (val) => {
  const container = document.getElementById('search-results-container');
  if (!container) return;

  if (!val || val.trim() === '') {
    container.innerHTML = `
      <div style="padding: 24px; text-align: center; color: var(--text-muted); font-size: 12.5px;">
        Search for <strong>Robert Smith</strong>, <strong>Salesforce</strong>, <strong>Email Rule</strong>, or <strong>Customer Standard</strong>.
      </div>
    `;
    return;
  }

  const results = await repository.searchGlobal(val);
  if (results.length === 0) {
    container.innerHTML = `
      <div style="padding: 24px; text-align: center; color: var(--text-muted); font-size: 12.5px;">
        No results found across sources, entities, or rules matching "${val}".
      </div>
    `;
    return;
  }

  container.innerHTML = results.map(r => `
    <a href="${r.route}" onclick="window.unifyCloseSearch()" style="display: flex; align-items: center; gap: 10px; padding: 10px 14px; border-radius: 6px; text-decoration: none; color: inherit; transition: background 0.15s; border-bottom: 1px solid var(--border-subtle);" onmouseover="this.style.background='var(--bg-card-hover)'" onmouseout="this.style.background='transparent'">
      <span style="font-size: 18px;">${r.icon}</span>
      <div style="flex: 1;">
        <div style="display: flex; align-items: center; gap: 6px;">
          <span style="font-weight: 600; color: #fff; font-size: 13px;">${r.title}</span>
          <span class="badge badge-neutral" style="font-size: 10px;">${r.type}</span>
        </div>
        <div style="font-size: 11px; color: var(--text-muted); margin-top: 2px;">${r.subtitle}</div>
      </div>
      <span style="color: var(--primary); font-size: 11px;">Jump ➔</span>
    </a>
  `).join('');
};

window.unifySetPersona = (persona) => {
  store.setPersona(persona);
};

window.unifyNextJourneyStep = () => {
  store.nextJourneyStep();
};

window.unifyPrevJourneyStep = () => {
  store.prevJourneyStep();
};

window.unifyToggleJourney = (active) => {
  store.toggleJourney(active);
};

// Wizard helper
let currentWizardStep = 1;
window.unifySetWizardStep = (step) => {
  currentWizardStep = step;
  for (let i = 1; i <= 7; i++) {
    const pane = document.getElementById(`step-pane-${i}`);
    if (pane) pane.style.display = i === step ? 'block' : 'none';
  }

  document.querySelectorAll('#source-stepper .wizard-step').forEach(el => {
    const s = parseInt(el.getAttribute('data-step'), 10);
    el.classList.toggle('active', s === step);
    el.classList.toggle('completed', s < step);
  });

  const prevBtn = document.getElementById('wiz-prev-btn');
  const nextBtn = document.getElementById('wiz-next-btn');
  if (prevBtn) prevBtn.style.visibility = step === 1 ? 'hidden' : 'visible';
  if (nextBtn) {
    if (step === 7) {
      nextBtn.innerText = 'Activate Connection ✓';
      nextBtn.onclick = () => {
        alert('Salesforce CRM successfully connected into zero-copy fabric!');
        window.location.hash = '#/data-foundation/sources/src-salesforce';
      };
    } else {
      nextBtn.innerText = 'Next Step →';
      nextBtn.onclick = window.unifyWizNext;
    }
  }
};

window.unifyWizNext = () => {
  if (currentWizardStep < 7) {
    window.unifySetWizardStep(currentWizardStep + 1);
  }
};

window.unifyWizPrev = () => {
  if (currentWizardStep > 1) {
    window.unifySetWizardStep(currentWizardStep - 1);
  }
};

window.unifySelectSourceType = (type, el) => {
  document.querySelectorAll('#source-type-selector .source-type-card').forEach(c => {
    c.style.borderColor = 'var(--border-default)';
    c.style.background = 'var(--bg-input)';
  });
  if (el) {
    el.style.borderColor = 'var(--primary)';
    el.style.background = 'rgba(99, 102, 241, 0.1)';
  }
};

// Tabs helper
window.unifySwitchTab = (btn, tabId) => {
  if (btn && btn.parentElement) {
    btn.parentElement.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
  }
  document.querySelectorAll('.tab-content-pane').forEach(p => p.style.display = 'none');
  const target = document.getElementById(tabId);
  if (target) target.style.display = 'block';
};

// Schema Mapping Actions
window.unifyAcceptMapping = async (mapId) => {
  await repository.updateMappingDecision(mapId, 'USER DECISION');
  router.handleRouting();
};

window.unifyResetMapping = async (mapId) => {
  await repository.updateMappingDecision(mapId, 'AI RECOMMENDATION');
  router.handleRouting();
};

window.unifyAcceptAllMappings = async () => {
  await repository.acceptAllHighConfidence();
  router.handleRouting();
};

window.unifyExplainMappingAI = async () => {
  store.toggleAiDrawer(true);
  window.unifyAskAiFromPrompt('Explain schema mapping reasoning for Salesforce Account');
};

window.unifyGenerateRuleAI = () => {
  const nameInput = document.getElementById('rule-name');
  const condInput = document.getElementById('rule-condition');
  if (nameInput) nameInput.value = 'AI Generated: Corporate Tax ID & DUNS Integrity';
  if (condInput) condInput.value = 'valid_duns(identifiers.duns_number) && length(identifiers.tax_number) >= 9';
  alert('AI synthesized validation condition from canonical ontology standards.');
};

window.unifyResolveIssue = async (id, status) => {
  await repository.resolveDQIssue(id, status);
  router.handleRouting();
};

window.unifyRecordMatchDecision = async (matchId, decision) => {
  await repository.updateMatchDecision(matchId, decision);
  router.handleRouting();
};

window.unifyAskAiFromPrompt = async (promptText) => {
  const input = document.getElementById('ai-input-box');
  if (input) input.value = promptText;
  await executeAiQuery(promptText);
};

window.unifyHandleAiSubmit = async (e) => {
  e.preventDefault();
  const input = document.getElementById('ai-input-box');
  if (!input || !input.value.trim()) return;
  const q = input.value.trim();
  input.value = '';
  await executeAiQuery(q);
};

async function executeAiQuery(q) {
  store.addAiMessage({ sender: 'user', text: q });

  const aiResp = await repository.askAI(q);
  store.addAiMessage({
    sender: 'assistant',
    text: aiResp.answer,
    links: aiResp.links,
    triadStatus: aiResp.triadStatus
  });

  const chatBody = document.getElementById('ai-chat-body');
  if (chatBody) {
    chatBody.scrollTop = chatBody.scrollHeight;
  }
}

// Global Keyboard Shortcut: Ctrl+K / Cmd+K for search, ESC to close
window.addEventListener('keydown', (e) => {
  if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
    e.preventDefault();
    const state = store.getState();
    if (state.isSearchOpen) {
      window.unifyCloseSearch();
    } else {
      window.unifyOpenSearch();
    }
  } else if (e.key === 'Escape') {
    window.unifyCloseSearch();
    window.unifyToggleAiDrawer(false);
  }
});

// Authentication Handlers (Section 2.1)
window.unifyHandleLogin = (e) => {
  e.preventDefault();
  const email = document.getElementById('login-email')?.value || 'manjit@unify.ai';
  store.login({
    name: email.split('@')[0].replace('.', ' '),
    email: email,
    role: 'Data Architect',
    tenant: 'Global Enterprise Ltd'
  });
  window.location.hash = '#/';
};

window.unifyQuickLogin = (name, role, email) => {
  store.login({ name, role, email, tenant: 'Global Enterprise Ltd' });
  window.location.hash = '#/';
};

window.unifyLoginSSO = (provider) => {
  store.login({
    name: 'Manjit Singh',
    role: 'Data Architect',
    email: 'manjit@unify.ai',
    tenant: `${provider} SSO Verified`
  });
  window.location.hash = '#/';
};

window.unifyLogout = () => {
  store.logout();
};

window.unifyHandleRegister = (e) => {
  e.preventDefault();
  const name = document.getElementById('reg-name')?.value || 'New User';
  const email = document.getElementById('reg-email')?.value || 'user@enterprise.com';
  const role = document.getElementById('reg-role')?.value || 'Data Architect';
  const org = document.getElementById('reg-org')?.value || 'Enterprise Tenant';

  store.login({ name, email, role, tenant: org });
  alert(`Enterprise tenant for ${org} provisioned successfully. Welcome, ${name}!`);
  window.location.hash = '#/';
};

window.unifyHandleForgot = (e) => {
  e.preventDefault();
  const banner = document.getElementById('forgot-success-banner');
  if (banner) banner.style.display = 'block';
};

window.unifyUpdatePasswordStrength = (val) => {
  const bar = document.getElementById('pwd-strength-bar');
  const text = document.getElementById('pwd-strength-text');
  if (!bar || !text) return;
  if (val.length < 6) {
    bar.style.width = '25%';
    bar.style.background = '#ef4444';
    text.style.color = '#ef4444';
    text.innerText = 'Weak';
  } else if (val.length < 10) {
    bar.style.width = '60%';
    bar.style.background = '#fbbf24';
    text.style.color = '#fbbf24';
    text.innerText = 'Medium';
  } else {
    bar.style.width = '100%';
    bar.style.background = '#34d399';
    text.style.color = '#34d399';
    text.innerText = 'Strong';
  }
};

window.unifyMountShell = () => {
  const appRoot = document.getElementById('app-root');
  if (appRoot && !document.getElementById('main-content-viewport')) {
    appRoot.innerHTML = renderAppShell();
    const viewport = document.getElementById('main-content-viewport');
    router.setContainer(viewport);
  }
};

// App Initialization
function initApp() {
  const appRoot = document.getElementById('app-root');
  if (!appRoot) return;

  const hash = window.location.hash || '#/';
  const isAuthRoute = hash === '#/login' || hash === '#/register' || hash === '#/forgot-password';

  if (!isAuthRoute) {
    window.unifyMountShell();
  }

  // Subscribe to store updates to keep sidebar, topbar, journey banner in sync
  store.subscribe((state) => {
    const sidebarEl = document.getElementById('sidebar-container');
    if (sidebarEl) sidebarEl.innerHTML = renderSidebar();

    const topbarEl = document.getElementById('topbar-container');
    if (topbarEl) topbarEl.innerHTML = renderTopbar();

    const searchEl = document.getElementById('search-modal-container');
    if (searchEl) searchEl.innerHTML = renderGlobalSearch();

    const aiEl = document.getElementById('ai-drawer-container');
    if (aiEl) aiEl.innerHTML = renderAiAssistant();

    const banner = document.getElementById('journey-banner');
    const bannerText = document.getElementById('journey-banner-text');
    if (banner && bannerText) {
      if (state.isJourneyActive) {
        banner.style.display = 'flex';
        const curStep = goldenJourneySteps.find(s => s.id === state.currentJourneyStep) || goldenJourneySteps[0];
        bannerText.innerHTML = `<strong>Golden Flow Step ${state.currentJourneyStep} of 16:</strong> ${curStep.title} — <em>${curStep.description}</em>`;
      } else {
        banner.style.display = 'none';
      }
    }
  });

  // Run initial route handler
  router.handleRouting();
}

// Start when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initApp);
} else {
  initApp();
}
