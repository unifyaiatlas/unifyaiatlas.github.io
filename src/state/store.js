// Reactive Global State Store & Event Bus for Unify AI Fabric

export const goldenJourneySteps = [
  { id: 1, title: 'Overview Dashboard', route: '#/', description: 'Platform health & KPI telemetry' },
  { id: 2, title: 'Enterprise Sources', route: '#/data-foundation/sources', description: 'Zero-copy and materialized connections' },
  { id: 3, title: 'Connect Salesforce', route: '#/data-foundation/sources/new', description: '7-step zero-copy source wizard' },
  { id: 4, title: 'Source Details', route: '#/data-foundation/sources/src-salesforce', description: 'Objects, latency, and schema' },
  { id: 5, title: 'Data Discovery', route: '#/data-foundation/discovery', description: 'Discovered entities & PII detection' },
  { id: 6, title: 'AI Schema Mapping', route: '#/data-foundation/mappings', description: 'Semantic alignment to canonical model' },
  { id: 7, title: 'Data Profiles', route: '#/data-foundation/profiles', description: 'Completeness, uniqueness, nulls' },
  { id: 8, title: 'Data Quality Rules', route: '#/data-quality', description: 'Quality score & rule validation' },
  { id: 9, title: 'Match Strategies', route: '#/unification/match-strategies', description: 'Multi-attribute scoring weights' },
  { id: 10, title: 'Strategy Designer', route: '#/unification/match-strategies/new', description: '6-step rule threshold tuning' },
  { id: 11, title: 'Match Simulation', route: '#/unification/simulations/sim-latest', description: 'Delta benchmark & accuracy test' },
  { id: 12, title: 'Match Results', route: '#/unification/matches', description: 'Auto-match & review threshold pairs' },
  { id: 13, title: 'Steward Review', route: '#/stewardship/reviews/match-101', description: 'Side-by-side comparison & decision' },
  { id: 14, title: 'Golden Records', route: '#/unification/golden-entities', description: 'Mastered customer entities' },
  { id: 15, title: 'Entity 360', route: '#/entity-360/CUST-00192837', description: 'Winning source survivorship profile' },
  { id: 16, title: 'Data Lineage', route: '#/governance/lineage', description: 'End-to-end provenance DAG' }
];

class AppStore {
  constructor() {
    this.state = {
      currentRoute: window.location.hash || '#/',
      activePersona: 'Data Architect', // Data Architect, Data Steward, Business User, Platform Administrator
      isAuthenticated: true,
      currentUser: {
        name: 'John Smith',
        email: 'John@unify.ai',
        role: 'Data Architect',
        tenant: 'Global Enterprise Ltd'
      },
      isSearchOpen: false,
      isAiDrawerOpen: false,
      aiMessages: [
        {
          sender: 'assistant',
          text: 'Welcome to **Unify AI Copilot**. I can explain entity merge decisions, verify DQ anomalies, or navigate you directly across the unification fabric.',
          links: [
            { label: 'Why did Robert Smith merge?', query: 'Why did these accounts merge?' },
            { label: 'Show duplicate candidates', query: 'Show duplicate accounts' },
            { label: 'Explain match strategy v4', query: 'Explain match strategy' }
          ]
        }
      ],
      currentJourneyStep: 1,
      isJourneyActive: false,
      notifications: [
        { id: 'notif-1', title: 'Salesforce CDC Synchronized', time: '2m ago', type: 'info' },
        { id: 'notif-2', title: '1,284 matches pending review', time: '14m ago', type: 'warning' }
      ]
    };

    this.listeners = new Set();
  }

  login(user) {
    this.state.isAuthenticated = true;
    this.state.currentUser = user;
    this.state.activePersona = user.role || 'Data Architect';
    this.notify();
  }

  logout() {
    this.state.isAuthenticated = false;
    this.state.currentUser = null;
    this.notify();
    window.location.hash = '#/login';
  }

  getState() {
    return this.state;
  }

  subscribe(listener) {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  }

  notify() {
    this.listeners.forEach(fn => fn(this.state));
  }

  setRoute(route) {
    this.state.currentRoute = route;
    if (window.location.hash !== route) {
      window.location.hash = route;
    }
    // Update journey step if route matches a journey step
    const matchedStep = goldenJourneySteps.find(s => s.route === route);
    if (matchedStep) {
      this.state.currentJourneyStep = matchedStep.id;
    }
    this.notify();
  }

  setPersona(persona) {
    this.state.activePersona = persona;
    this.notify();
  }

  toggleSearch(isOpen) {
    this.state.isSearchOpen = typeof isOpen === 'boolean' ? isOpen : !this.state.isSearchOpen;
    this.notify();
  }

  toggleAiDrawer(isOpen) {
    this.state.isAiDrawerOpen = typeof isOpen === 'boolean' ? isOpen : !this.state.isAiDrawerOpen;
    this.notify();
  }

  addAiMessage(msg) {
    this.state.aiMessages.push(msg);
    this.notify();
  }

  setJourneyStep(stepNum) {
    if (stepNum >= 1 && stepNum <= goldenJourneySteps.length) {
      this.state.currentJourneyStep = stepNum;
      this.state.isJourneyActive = true;
      const step = goldenJourneySteps[stepNum - 1];
      this.setRoute(step.route);
    }
  }

  nextJourneyStep() {
    if (this.state.currentJourneyStep < goldenJourneySteps.length) {
      this.setJourneyStep(this.state.currentJourneyStep + 1);
    }
  }

  prevJourneyStep() {
    if (this.state.currentJourneyStep > 1) {
      this.setJourneyStep(this.state.currentJourneyStep - 1);
    }
  }

  toggleJourney(active) {
    this.state.isJourneyActive = typeof active === 'boolean' ? active : !this.state.isJourneyActive;
    this.notify();
  }
}

export const store = new AppStore();
