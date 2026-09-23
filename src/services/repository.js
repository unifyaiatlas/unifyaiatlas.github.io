// Service & Repository Layer — Abstraction over Enterprise Unify AI APIs
import {
  initialSources,
  initialDiscoveredDatasets,
  initialSchemaMappings,
  initialProfiles,
  initialDQRules,
  initialDQIssues,
  initialMatchStrategies,
  initialMatches,
  initialGoldenEntities,
  initialJobs,
  initialAIProviders,
  initialUsers
} from './mockData.js';

class DataRepository {
  constructor() {
    this.sources = [...initialSources];
    this.discovered = [...initialDiscoveredDatasets];
    this.mappings = [...initialSchemaMappings];
    this.profiles = [...initialProfiles];
    this.rules = [...initialDQRules];
    this.issues = [...initialDQIssues];
    this.strategies = [...initialMatchStrategies];
    this.matches = [...initialMatches];
    this.golden = [...initialGoldenEntities];
    this.jobs = [...initialJobs];
    this.aiProviders = [...initialAIProviders];
    this.users = [...initialUsers];
  }

  // Sources
  async getSources() {
    return [...this.sources];
  }

  async getSource(id) {
    return this.sources.find(s => s.id === id) || null;
  }

  async addSource(sourceData) {
    const newSource = {
      id: `src-${Date.now()}`,
      status: 'Connected',
      records: '0',
      recordsRaw: 0,
      lastSync: 'Just now',
      health: '100%',
      objectsCount: (sourceData.selectedObjects || []).length,
      ...sourceData
    };
    this.sources.unshift(newSource);
    return newSource;
  }

  // Discovery
  async getDiscoveredDatasets() {
    return [...this.discovered];
  }

  // Schema Mappings
  async getSchemaMappings() {
    return [...this.mappings];
  }

  async updateMappingDecision(mappingId, status, user = 'Current User') {
    const map = this.mappings.find(m => m.id === mappingId);
    if (map) {
      map.triadStatus = status; // 'USER DECISION' or 'AI RECOMMENDATION'
      map.decidedBy = status === 'USER DECISION' ? `${user} (Approved)` : null;
    }
    return map;
  }

  async acceptAllHighConfidence(user = 'Manjit (Data Architect)') {
    this.mappings.forEach(m => {
      if (m.confidence >= 95) {
        m.triadStatus = 'USER DECISION';
        m.decidedBy = user;
      }
    });
    return [...this.mappings];
  }

  // Data Profiles
  async getDataProfiles() {
    return [...this.profiles];
  }

  // DQ Rules & Issues
  async getDQRules() {
    return [...this.rules];
  }

  async addDQRule(rule) {
    const newRule = {
      id: `dq-${Date.now()}`,
      status: 'Active',
      failureRate: '0.0%',
      totalChecked: '0',
      ...rule
    };
    this.rules.unshift(newRule);
    return newRule;
  }

  async getDQIssues() {
    return [...this.issues];
  }

  async resolveDQIssue(issueId, userDecision) {
    const issue = this.issues.find(i => i.id === issueId);
    if (issue) {
      issue.status = userDecision;
      issue.triadStatus = 'USER DECISION';
    }
    return issue;
  }

  // Match Strategies
  async getMatchStrategies() {
    return [...this.strategies];
  }

  async getMatchStrategy(id) {
    return this.strategies.find(s => s.id === id) || null;
  }

  async saveMatchStrategy(strategy) {
    const existingIdx = this.strategies.findIndex(s => s.id === strategy.id);
    if (existingIdx >= 0) {
      this.strategies[existingIdx] = { ...this.strategies[existingIdx], ...strategy };
      return this.strategies[existingIdx];
    } else {
      const newStrat = {
        id: `strat-${Date.now()}`,
        status: 'Draft',
        version: 'v1',
        ...strategy
      };
      this.strategies.unshift(newStrat);
      return newStrat;
    }
  }

  // Matches & Stewardship Review
  async getMatches() {
    return [...this.matches];
  }

  async getMatch(id) {
    return this.matches.find(m => m.id === id) || null;
  }

  async updateMatchDecision(matchId, decision, steward = 'Elena Rostova') {
    const match = this.matches.find(m => m.id === matchId);
    if (match) {
      match.status = decision; // 'Approved', 'Rejected', 'Investigating'
      match.stewardDecision = {
        decision,
        steward,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
    }
    return match;
  }

  // Golden Entities
  async getGoldenEntities() {
    return [...this.golden];
  }

  async getGoldenEntity(id) {
    return this.golden.find(g => g.id === id) || null;
  }

  // Operations Jobs
  async getJobs() {
    return [...this.jobs];
  }

  async getJob(id) {
    return this.jobs.find(j => j.id === id) || null;
  }

  // Admin Telemetry
  async getAIProviders() {
    return [...this.aiProviders];
  }

  async getUsers() {
    return [...this.users];
  }

  // Global Search across entities, sources, rules, matches
  async searchGlobal(query) {
    if (!query || query.trim() === '') return [];
    const q = query.toLowerCase().trim();
    const results = [];

    // Search Golden Entities
    this.golden.forEach(g => {
      if (g.name.toLowerCase().includes(q) || g.id.toLowerCase().includes(q)) {
        results.push({
          type: 'Golden Entity',
          title: g.name,
          subtitle: `ID: ${g.id} • ${g.domain} • ${g.confidence} Confidence`,
          route: `#/entity-360/${g.id}`,
          icon: '👑'
        });
      }
    });

    // Search Sources
    this.sources.forEach(s => {
      if (s.name.toLowerCase().includes(q) || s.type.toLowerCase().includes(q)) {
        results.push({
          type: 'Data Source',
          title: s.name,
          subtitle: `${s.type} • ${s.access} • ${s.records} records`,
          route: `#/data-foundation/sources/${s.id}`,
          icon: '🔌'
        });
      }
    });

    // Search Matches
    this.matches.forEach(m => {
      if (m.sourceA.name.toLowerCase().includes(q) || m.sourceB.name.toLowerCase().includes(q) || m.id.toLowerCase().includes(q)) {
        results.push({
          type: 'Match Review',
          title: `${m.sourceA.name} ↔ ${m.sourceB.name}`,
          subtitle: `Match ID: ${m.id} • Confidence: ${m.confidence}% • ${m.status}`,
          route: `#/stewardship/reviews/${m.id}`,
          icon: '⚖️'
        });
      }
    });

    // Search DQ Rules
    this.rules.forEach(r => {
      if (r.name.toLowerCase().includes(q) || r.attribute.toLowerCase().includes(q)) {
        results.push({
          type: 'DQ Rule',
          title: r.name,
          subtitle: `Attribute: ${r.attribute} • Severity: ${r.severity}`,
          route: `#/data-quality/rules`,
          icon: '🛡️'
        });
      }
    });

    return results;
  }

  // AI Copilot simulation with semantic responses and deep links
  async askAI(question) {
    const q = question.toLowerCase();

    if (q.includes('merge') || q.includes('why did') || q.includes('account')) {
      return {
        answer: `**Entity Merge Analysis (Robert Smith):**\nRecords **CRM-10231** (Salesforce) and **ERP-88391** (SAP ERP) were resolved into Golden Record **CUST-00192837** with **96.7% match confidence** under strategy *Customer Standard v4*.\n\n* **Email Exact Match (+40)**: \`robert@abc.com\`\n* **Phone Exact Match (+25)**: \`+919876543210\`\n* **Name Jaro-Winkler (+19)**: "Robert Smith" vs "Robert J Smith" (97% similarity)\n* **Address Consensus (+13)**: City matched Kolkata (100% agreement)`,
        links: [
          { label: 'View Golden Entity 360', route: '#/entity-360/CUST-00192837' },
          { label: 'Inspect Match Review & Scoring', route: '#/stewardship/reviews/match-101' },
          { label: 'View Pipeline Lineage', route: '#/governance/lineage' }
        ],
        triadStatus: 'SYSTEM FACT'
      };
    } else if (q.includes('duplicate') || q.includes('potential')) {
      return {
        answer: `Found **14.2% candidate duplicate pairs (~1.43M records)** across joint Salesforce CRM & SAP ERP customer pools. Top cluster includes high-frequency enterprise corporate accounts with minor legal suffixes (e.g. 'LLC' vs 'Technologies Ltd').`,
        links: [
          { label: 'Open Stewardship Queue', route: '#/stewardship' },
          { label: 'View Match Results Table', route: '#/unification/matches' }
        ],
        triadStatus: 'AI RECOMMENDATION'
      };
    } else if (q.includes('strategy') || q.includes('threshold')) {
      return {
        answer: `Active strategy **Customer Standard v4** utilizes a dual-tier decision boundary: **≥95% Auto Match**, **85% - 94.9% Steward Review**, and **<85% No Match**. Simulations show 91.7% auto-resolution with 0.04% false positive rate.`,
        links: [
          { label: 'Match Strategy Designer', route: '#/unification/match-strategies/strat-customer-v4' },
          { label: 'View Simulation Benchmark', route: '#/unification/simulations/sim-latest' }
        ],
        triadStatus: 'SYSTEM FACT'
      };
    } else if (q.includes('quality') || q.includes('dq') || q.includes('issue')) {
      return {
        answer: `Current overall data quality score is **94.2%**. Most critical issue: **3.8% invalid email formats** in CRM ingestion, currently caught and flagged by rule \`Email Required & Valid Format\`.`,
        links: [
          { label: 'Open Data Quality Dashboard', route: '#/data-quality' },
          { label: 'Triage Pending Issues', route: '#/data-quality/issues' }
        ],
        triadStatus: 'AI RECOMMENDATION'
      };
    }

    return {
      answer: `I analyzed your enterprise metadata fabric. You have 4 connected sources, 42.8M raw records, and 18.2M Golden Entities in the Customer domain running with 94.2% overall data quality.`,
      links: [
        { label: 'Explore Data Foundation', route: '#/data-foundation/sources' },
        { label: 'View Overview Dashboard', route: '#/' }
      ],
      triadStatus: 'AI RECOMMENDATION'
    };
  }
}

export const repository = new DataRepository();
