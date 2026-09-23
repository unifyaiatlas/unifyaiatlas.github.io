// Unify AI Enterprise Application Bundle
(function () {

  // ==================== src/services/mockData.js ====================
  // Comprehensive Enterprise Mock Data Store for Unify AI Fabric
  const initialSources = [
    {
      id: 'src-salesforce',
      name: 'Salesforce CRM',
      type: 'CRM',
      entity: 'Account',
      access: 'Zero-Copy',
      status: 'Connected',
      records: '2,048,190',
      recordsRaw: 2048190,
      lastSync: 'Real-time (CDC)',
      latency: '42ms',
      objectsCount: 14,
      health: '100%'
    },
    {
      id: 'src-sap',
      name: 'SAP ERP S/4HANA',
      type: 'ERP',
      entity: 'Customer',
      access: 'Materialized',
      status: 'Healthy',
      records: '8,124,500',
      recordsRaw: 8124500,
      lastSync: '10 min ago',
      latency: '180ms',
      objectsCount: 22,
      health: '99.4%'
    },
    {
      id: 'src-postgres',
      name: 'PostgreSQL Billing DB',
      type: 'Database',
      entity: 'Customer',
      access: 'Zero-Copy',
      status: 'Connected',
      records: '4,210,000',
      recordsRaw: 4210000,
      lastSync: 'Real-time',
      latency: '18ms',
      objectsCount: 8,
      health: '100%'
    },
    {
      id: 'src-databricks',
      name: 'Databricks Unity Catalog',
      type: 'Lakehouse',
      entity: 'Customer_Golden_Inbound',
      access: 'Zero-Copy',
      status: 'Connected',
      records: '28,450,000',
      recordsRaw: 28450000,
      lastSync: '3 min ago',
      latency: '65ms',
      objectsCount: 35,
      health: '99.9%'
    }
  ];
  const initialDiscoveredDatasets = [
    {
      id: 'disc-customer',
      title: 'Potential Customer Entity',
      source: 'Salesforce & SAP Joint Pool',
      columns: 46,
      records: '10.1M',
      identifiers: ['email', 'tax_id', 'sfdc_id', 'sap_kunnr'],
      piiFields: ['email', 'phone', 'first_name', 'billing_address'],
      duplicatesEstimate: '14.2% (~1.43M pairs)',
      suggestedDomain: 'Customer',
      confidence: '98.4%',
      status: 'Ready for Mapping'
    },
    {
      id: 'disc-product',
      title: 'Potential Product Entity',
      source: 'SAP ERP & PIM Catalog',
      columns: 28,
      records: '482,000',
      identifiers: ['sku', 'upc', 'matnr'],
      piiFields: ['None'],
      duplicatesEstimate: '3.8% (~18K pairs)',
      suggestedDomain: 'Product',
      confidence: '94.1%',
      status: 'Discovered'
    },
    {
      id: 'disc-location',
      title: 'Potential Location Entity',
      source: 'Logistics Facility Registry',
      columns: 18,
      records: '14,200',
      identifiers: ['facility_code', 'geo_hash'],
      piiFields: ['None'],
      duplicatesEstimate: '1.2%',
      suggestedDomain: 'Location',
      confidence: '91.8%',
      status: 'Discovered'
    }
  ];
  const initialSchemaMappings = [
    {
      id: 'map-1',
      sourceField: 'Id',
      sourceType: 'string(18)',
      sourceSample: '0015g00000Uf93rAAB',
      canonicalField: 'account.identifier',
      canonicalType: 'string',
      confidence: 99,
      triadStatus: 'USER DECISION',
      decidedBy: 'John (Data Architect)',
      reasoning: 'Primary key matches canonical record identification standard.'
    },
    {
      id: 'map-2',
      sourceField: 'Name',
      sourceType: 'string(255)',
      sourceSample: 'Apex Global Technologies Ltd',
      canonicalField: 'organization.name',
      canonicalType: 'string',
      confidence: 98,
      triadStatus: 'USER DECISION',
      decidedBy: 'John (Data Architect)',
      reasoning: 'AI matched organization legal name with semantic embedding score 0.984.'
    },
    {
      id: 'map-3',
      sourceField: 'BillingStreet',
      sourceType: 'string(255)',
      sourceSample: '104 Park Street, Suite 400',
      canonicalField: 'address.line1',
      canonicalType: 'string',
      confidence: 96,
      triadStatus: 'AI RECOMMENDATION',
      decidedBy: null,
      reasoning: 'Street level address detected via regex and NER address parsing.'
    },
    {
      id: 'map-4',
      sourceField: 'BillingCity',
      sourceType: 'string(40)',
      sourceSample: 'Kolkata',
      canonicalField: 'address.city',
      canonicalType: 'string',
      confidence: 97,
      triadStatus: 'AI RECOMMENDATION',
      decidedBy: null,
      reasoning: 'ISO-matched city ontology entity.'
    },
    {
      id: 'map-5',
      sourceField: 'BillingCountry',
      sourceType: 'string(80)',
      sourceSample: 'India',
      canonicalField: 'address.country',
      canonicalType: 'string',
      confidence: 99,
      triadStatus: 'AI RECOMMENDATION',
      decidedBy: null,
      reasoning: 'Standard ISO 3166-1 alpha-2 / full country normalization candidate.'
    },
    {
      id: 'map-6',
      sourceField: 'Phone',
      sourceType: 'phone',
      sourceSample: '+91 98765 43210',
      canonicalField: 'contact.phone',
      canonicalType: 'phone_e164',
      confidence: 95,
      triadStatus: 'AI RECOMMENDATION',
      decidedBy: null,
      reasoning: 'E.164 phone standardizer recommended.'
    },
    {
      id: 'map-7',
      sourceField: 'Website',
      sourceType: 'url',
      sourceSample: 'https://apexglobal.io',
      canonicalField: 'organization.website',
      canonicalType: 'url',
      confidence: 93,
      triadStatus: 'AI RECOMMENDATION',
      decidedBy: null,
      reasoning: 'Domain normalization to FQDN host.'
    }
  ];
  const initialProfiles = [
    { attribute: 'organization.name', completeness: 99.4, uniqueness: 88.2, validity: 98.7, nullRate: '0.6%', samples: ['Apex Global', 'Acme Corp', 'Tata Consultancy'] },
    { attribute: 'contact.email', completeness: 94.8, uniqueness: 91.5, validity: 96.2, nullRate: '5.2%', samples: ['robert@abc.com', 'contact@apex.io'] },
    { attribute: 'contact.phone', completeness: 89.1, uniqueness: 86.4, validity: 92.0, nullRate: '10.9%', samples: ['+919876543210', '+14155552671'] },
    { attribute: 'address.country', completeness: 98.9, uniqueness: 12.1, validity: 99.8, nullRate: '1.1%', samples: ['India', 'United States', 'Germany'] },
    { attribute: 'account.identifier', completeness: 100.0, uniqueness: 100.0, validity: 100.0, nullRate: '0.0%', samples: ['CUST-00192837', 'CRM-10231'] }
  ];
  const initialDQRules = [
    { id: 'dq-1', name: 'Email Required & Valid Format', entity: 'Customer', attribute: 'contact.email', type: 'Format', severity: 'Error', status: 'Active', failureRate: '3.8%', totalChecked: '4.8M' },
    { id: 'dq-2', name: 'Valid E.164 Phone Number', entity: 'Customer', attribute: 'contact.phone', type: 'Format', severity: 'Warning', status: 'Active', failureRate: '7.9%', totalChecked: '4.8M' },
    { id: 'dq-3', name: 'Mandatory Legal Entity Name', entity: 'Customer', attribute: 'organization.name', type: 'Required', severity: 'Error', status: 'Active', failureRate: '0.6%', totalChecked: '4.8M' },
    { id: 'dq-4', name: 'ISO-3166 Standard Country Code', entity: 'Customer', attribute: 'address.country', type: 'Reference', severity: 'Warning', status: 'Active', failureRate: '1.2%', totalChecked: '4.8M' }
  ];
  const initialDQIssues = [
    {
      id: 'dqi-101',
      recordId: 'CRM-102938',
      entity: 'Customer',
      attribute: 'contact.email',
      invalidValue: 'robert.smith@@gmail..com',
      rule: 'Email Required & Valid Format',
      severity: 'Error',
      reason: 'Consecutive special characters violate RFC 5322 syntax.',
      suggestedCorrection: 'robert.smith@gmail.com',
      triadStatus: 'AI RECOMMENDATION',
      status: 'Pending'
    },
    {
      id: 'dqi-102',
      recordId: 'ERP-88391',
      entity: 'Customer',
      attribute: 'address.country',
      invalidValue: 'Ind.',
      rule: 'ISO-3166 Standard Country Code',
      severity: 'Warning',
      reason: 'Abbreviated country name not in ISO reference table.',
      suggestedCorrection: 'India (IN)',
      triadStatus: 'AI RECOMMENDATION',
      status: 'Pending'
    }
  ];
  const initialMatchStrategies = [
    {
      id: 'strat-customer-v4',
      name: 'Customer Standard',
      domain: 'Customer',
      version: 'v4',
      autoThreshold: 95,
      reviewThreshold: 85,
      status: 'Active',
      rulesCount: 5,
      description: 'High-precision resolution combining exact email/phone with phonetic & Levenshtein organization matching.'
    },
    {
      id: 'strat-account-v2',
      name: 'Account Corporate',
      domain: 'Account',
      version: 'v2',
      autoThreshold: 92,
      reviewThreshold: 80,
      status: 'Draft',
      rulesCount: 4,
      description: 'B2B corporate matching incorporating Dun & Bradstreet D-U-N-S hierarchy and domain clustering.'
    }
  ];
  const initialMatches = [
    {
      id: 'match-101',
      sourceA: { id: 'CRM-10231', source: 'Salesforce CRM', name: 'Robert Smith', email: 'robert@abc.com', phone: '+919876543210', city: 'Kolkata', revenue: '$1,200,000' },
      sourceB: { id: 'ERP-88391', source: 'SAP ERP', name: 'Robert J Smith', email: 'robert@abc.com', phone: '+919876543210', city: 'Kolkata', revenue: '$1,450,000' },
      confidence: 96.7,
      status: 'Auto Match',
      strategy: 'Customer Standard v4',
      breakdown: [
        { attribute: 'Email', method: 'Exact', score: 100, weight: 40, contribution: '+40' },
        { attribute: 'Phone', method: 'Exact', score: 100, weight: 25, contribution: '+25' },
        { attribute: 'Name', method: 'Fuzzy (Jaro-Winkler)', score: 97, weight: 20, contribution: '+19' },
        { attribute: 'Address', method: 'City Match', score: 91, weight: 15, contribution: '+13' }
      ]
    },
    {
      id: 'match-102',
      sourceA: { id: 'CRM-12221', source: 'Salesforce CRM', name: 'Apex Tech Solutions', email: 'billing@apexsolutions.com', phone: '+14155552671', city: 'San Francisco', revenue: '$4,500,000' },
      sourceB: { id: 'ERP-71231', source: 'SAP ERP', name: 'Apex Technologies LLC', email: 'accounts@apexsolutions.com', phone: '+14155552671', city: 'San Francisco', revenue: '$4,800,000' },
      confidence: 89.2,
      status: 'Requires Review',
      strategy: 'Customer Standard v4',
      breakdown: [
        { attribute: 'Email', method: 'Domain Match', score: 85, weight: 40, contribution: '+34' },
        { attribute: 'Phone', method: 'Exact', score: 100, weight: 25, contribution: '+25' },
        { attribute: 'Name', method: 'AI-Assisted Legal Strip', score: 92, weight: 20, contribution: '+18' },
        { attribute: 'Address', method: 'Exact', score: 100, weight: 15, contribution: '+12' }
      ]
    }
  ];
  const initialGoldenEntities = [
    {
      id: 'CUST-00192837',
      name: 'Robert Smith',
      domain: 'Customer',
      sourceCount: 2,
      confidence: '97.4%',
      status: 'Active',
      lastUpdated: '12 min ago',
      attributes: {
        name: { value: 'Robert J Smith', source: 'SAP ERP', confidence: '99%', updated: '2026-09-23 10:14' },
        email: { value: 'robert@abc.com', source: 'Salesforce CRM', confidence: '99%', updated: '2026-09-23 10:14' },
        phone: { value: '+91 98765 43210', source: 'Salesforce CRM', confidence: '98%', updated: '2026-09-23 10:14' },
        city: { value: 'Kolkata', source: 'Consensus (2/2)', confidence: '100%', updated: '2026-09-23 10:14' },
        country: { value: 'India', source: 'Consensus (2/2)', confidence: '100%', updated: '2026-09-23 10:14' },
        revenue: { value: '$1,450,000', source: 'SAP ERP (Materialized Winner)', confidence: '95%', updated: '2026-09-23 10:14' }
      },
      sources: [
        { source: 'Salesforce CRM', id: 'CRM-10231', status: 'Active Contributor', mergedAt: '2026-09-22 14:30' },
        { source: 'SAP ERP', id: 'ERP-88391', status: 'Active Contributor', mergedAt: '2026-09-22 14:30' }
      ],
      history: [
        { date: 'Today, 10:14 AM', event: 'Survivorship Re-calculation', details: 'Revenue updated from SAP ERP winning rule.', actor: 'System Rule #4' },
        { date: 'Sep 22, 14:30', event: 'Match Approved & Merged', details: 'CRM-10231 merged with ERP-88391 with 96.7% match confidence.', actor: 'Elena Rostova (Steward)' },
        { date: 'Sep 20, 09:12', event: 'Golden Entity Created', details: 'Initial record established from Salesforce Account import.', actor: 'Pipeline Job #2049' }
      ]
    },
    {
      id: 'CUST-00284910',
      name: 'Apex Global Technologies',
      domain: 'Customer',
      sourceCount: 3,
      confidence: '98.9%',
      status: 'Active',
      lastUpdated: '1 hour ago',
      attributes: {
        name: { value: 'Apex Global Technologies Ltd', source: 'Salesforce CRM', confidence: '98%', updated: '2026-09-23 09:00' },
        email: { value: 'contact@apexglobal.io', source: 'PostgreSQL Billing', confidence: '97%', updated: '2026-09-23 09:00' }
      }
    }
  ];
  const initialJobs = [
    { id: 'job-9821', name: 'Continuous CDC Ingestion - Salesforce', type: 'Zero-Copy Sync', source: 'Salesforce CRM', entity: 'Account', status: 'Running', records: '14,209', duration: 'Ongoing', started: '10 min ago' },
    { id: 'job-9820', name: 'Customer Reconciliation & Matching', type: 'Unification Funnel', source: 'Multi-Source', entity: 'Customer', status: 'Completed', records: '2,481,200', duration: '4m 12s', started: '1 hour ago' },
    { id: 'job-9819', name: 'SAP S/4HANA Materialization Delta', type: 'Batch Extract', source: 'SAP ERP', entity: 'Customer', status: 'Completed', records: '128,400', duration: '1m 45s', started: '2 hours ago' },
    { id: 'job-9818', name: 'DQ Profiling & Anomaly Scan', type: 'Data Quality', source: 'Databricks', entity: 'All Entities', status: 'Completed', records: '18.2M', duration: '12m 30s', started: '5 hours ago' }
  ];
  const initialAIProviders = [
    { id: 'ai-google', provider: 'Google Cloud Vertex AI', model: 'Gemini 1.5 Pro', status: 'Active', latency: '240ms', purpose: 'Semantic Schema Mapping, LLM Entity Resolution, Match Explanation' },
    { id: 'ai-openrouter', provider: 'OpenRouter Enterprise', model: 'Meta Llama 3.1 70B', status: 'Active', latency: '310ms', purpose: 'DQ Rule Generation, Natural Language Copilot' },
    { id: 'ai-anthropic', provider: 'Anthropic Bedrock', model: 'Claude 3.5 Sonnet', status: 'Available', latency: '290ms', purpose: 'Complex Multi-Table Survivorship Reasoning' }
  ];
  const initialUsers = [
    { id: 'usr-1', name: 'John Smith', email: 'John@unify.ai', role: 'Data Architect', department: 'Enterprise Data Office', status: 'Active' },
    { id: 'usr-2', name: 'Elena Rostova', email: 'elena@unify.ai', role: 'Data Steward', department: 'MDM Governance Group', status: 'Active' },
    { id: 'usr-3', name: 'Marcus Vance', email: 'marcus@unify.ai', role: 'Analyst', department: 'Commercial Operations', status: 'Active' },
    { id: 'usr-4', name: 'Sarah Chen', email: 'sarah@unify.ai', role: 'Administrator', department: 'Cloud Infrastructure', status: 'Active' }
  ];


  // ==================== src/services/repository.js ====================
  // Service & Repository Layer — Abstraction over Enterprise Unify AI APIs


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

    async acceptAllHighConfidence(user = 'John (Data Architect)') {
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
  const repository = new DataRepository();


  // ==================== src/state/store.js ====================
  // Reactive Global State Store & Event Bus for Unify AI Fabric
  const goldenJourneySteps = [
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
  const store = new AppStore();


  // ==================== src/router.js ====================
  // Client-side Router for Unify AI Fabric SPA
  class Router {
    constructor() {
      this.routes = [];
      this.currentHandler = null;
      this.container = null;

      window.addEventListener('hashchange', () => this.handleRouting());
    }

    setContainer(element) {
      this.container = element;
    }

    addRoute(pattern, handler) {
      // Convert express-style route pattern (e.g., /entity-360/:entityId) to regex
      const paramNames = [];
      const regexPattern = pattern.replace(/:([a-zA-Z0-9_]+)/g, (_, name) => {
        paramNames.push(name);
        return '([^\\/]+)';
      });

      const regex = new RegExp(`^#?${regexPattern}$`);
      this.routes.push({ pattern, regex, paramNames, handler });
      return this;
    }

    async handleRouting() {
      let hash = window.location.hash || '#/';
      if (!hash.startsWith('#/')) {
        hash = '#/';
        window.location.hash = hash;
      }

      store.setRoute(hash);

      let matchResult = null;
      let matchedRoute = null;

      for (const r of this.routes) {
        const match = hash.match(r.regex);
        if (match) {
          matchedRoute = r;
          const params = {};
          r.paramNames.forEach((name, index) => {
            params[name] = match[index + 1];
          });
          matchResult = params;
          break;
        }
      }

      const isAuthRoute = hash === '#/login' || hash === '#/register' || hash === '#/forgot-password';
      const appRoot = document.getElementById('app-root');

      if (isAuthRoute) {
        if (matchedRoute && appRoot) {
          try {
            const pageHtml = await matchedRoute.handler(matchResult || {});
            if (typeof pageHtml === 'string') {
              appRoot.innerHTML = pageHtml;
            } else if (pageHtml instanceof HTMLElement) {
              appRoot.innerHTML = '';
              appRoot.appendChild(pageHtml);
            }
            window.dispatchEvent(new CustomEvent('unify:page-mounted', { detail: { hash, params: matchResult } }));
          } catch (err) {
            console.error('Error rendering auth route:', hash, err);
          }
        }
        return;
      }

      // Authenticated / App Route: Ensure shell is mounted
      let viewport = document.getElementById('main-content-viewport');
      if (!viewport && window.unifyMountShell) {
        window.unifyMountShell();
        viewport = document.getElementById('main-content-viewport');
        this.container = viewport;
      }

      if (matchedRoute && this.container) {
        try {
          this.container.innerHTML = '<div style="padding: 40px; text-align: center; color: var(--text-muted);"><span style="display:inline-block; animation: spin 1s linear infinite;">⏳</span> Loading fabric telemetry...</div>';
          const pageHtml = await matchedRoute.handler(matchResult || {});
          if (typeof pageHtml === 'string') {
            this.container.innerHTML = pageHtml;
          } else if (pageHtml instanceof HTMLElement) {
            this.container.innerHTML = '';
            this.container.appendChild(pageHtml);
          }
          // Dispatch page mounted event
          window.dispatchEvent(new CustomEvent('unify:page-mounted', { detail: { hash, params: matchResult } }));
        } catch (err) {
          console.error('Error rendering route:', hash, err);
          this.container.innerHTML = `
          <div style="padding: 32px; background: var(--danger-bg); border: 1px solid var(--danger); border-radius: 8px; margin: 20px;">
            <h3 style="color: #fca5a5; margin-bottom: 8px;">Error Loading Route</h3>
            <p style="color: var(--text-secondary);">${err.message}</p>
            <button class="btn btn-secondary" onclick="window.location.hash='#/'" style="margin-top: 14px;">Return to Overview</button>
          </div>
        `;
        }
      } else if (this.container) {
        // 404 Route Fallback
        this.container.innerHTML = `
        <div style="padding: 48px; text-align: center;">
          <h2 style="font-family: var(--font-display); font-size: 24px; margin-bottom: 8px; color: #fff;">Route Not Found</h2>
          <p style="color: var(--text-muted); margin-bottom: 20px;">The requested path <code>${hash}</code> does not exist in the fabric navigation registry.</p>
          <a href="#/" class="btn btn-primary">Return to Overview</a>
        </div>
      `;
      }
    }

    navigate(hash) {
      window.location.hash = hash;
    }
  }
  const router = new Router();


  // ==================== src/components/breadcrumbs.js ====================
  // Breadcrumb Component (Section 47)
  function renderBreadcrumbs(crumbs = []) {
    if (!crumbs || crumbs.length === 0) {
      crumbs = [{ label: 'Overview', route: '#/' }];
    }

    const crumbsHtml = crumbs.map((c, idx) => {
      const isLast = idx === crumbs.length - 1;
      if (isLast) {
        return `<span class="breadcrumb-item current">${c.label}</span>`;
      }
      return `
      <a href="${c.route}" class="breadcrumb-item">${c.label}</a>
      <span class="breadcrumb-separator">/</span>
    `;
    }).join('');

    return `<nav class="breadcrumbs-bar" aria-label="Breadcrumb">${crumbsHtml}</nav>`;
  }


  // ==================== src/components/sidebar.js ====================
  // Sidebar Component implementing Section 2 Navigation Model
  function renderSidebar() {
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
        <a href="${it.route}" class="nav-link ${isActive ? 'active' : ''}" onclick="window.unifyToggleMobileSidebar(false)">
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
    <aside class="app-sidebar" id="app-sidebar">
      <div class="sidebar-header">
        <a href="#/" class="brand-logo" onclick="window.unifyToggleMobileSidebar(false)">
          <div class="brand-icon">U</div>
          <div>
            <div class="brand-title">UNIFY AI</div>
            <div style="font-size: 10px; color: var(--text-muted); line-height: 1;">Zero-Copy MDM</div>
          </div>
        </a>
        <span class="brand-badge" style="margin-left: auto;">v3.0</span>
        <button class="btn btn-ghost btn-sm mobile-close-btn" onclick="window.unifyToggleMobileSidebar(false)" style="margin-left: 4px; padding: 2px 6px; font-size: 14px;" aria-label="Close Navigation">✕</button>
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


  // ==================== src/components/topbar.js ====================
  // Topbar Component for Global Application Shell
  function renderTopbar() {
    const state = store.getState();
    const personas = ['Data Architect', 'Data Steward', 'Business User', 'Platform Administrator'];

    return `
    <header class="app-topbar">
      <div class="topbar-left">
        <button class="mobile-nav-toggle" onclick="window.unifyToggleMobileSidebar()" aria-label="Open Navigation Menu">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <line x1="3" y1="12" x2="21" y2="12"></line>
            <line x1="3" y1="6" x2="21" y2="6"></line>
            <line x1="3" y1="18" x2="21" y2="18"></line>
          </svg>
        </button>

        <div class="env-pill" title="Connected to Zero-Copy Fabric">
          <span class="env-dot"></span>
          <span>PROD / AWS us-east-1</span>
        </div>

        <button class="search-button" onclick="window.unifyOpenSearch()">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <circle cx="11" cy="11" r="8"></circle>
            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
          </svg>
          <span>Search entities, sources, rules...</span>
          <kbd class="search-kbd">Ctrl+K</kbd>
        </button>
      </div>

      <div class="topbar-right">
        <!-- Persona Switcher (Section 53) -->
        <div style="display: flex; align-items: center; gap: 6px;">
          <span style="font-size: 11px; color: var(--text-muted);">Persona:</span>
          <select class="form-select" style="padding: 4px 8px; font-size: 12px; height: 30px; border-radius: 4px;" onchange="window.unifySetPersona(this.value)">
            ${personas.map(p => `<option value="${p}" ${p === state.activePersona ? 'selected' : ''}>${p}</option>`).join('')}
          </select>
        </div>

        <!-- Global AI Assistant Trigger (Section 4) -->
        <button class="btn btn-ai btn-sm" onclick="window.unifyToggleAiDrawer()" title="Open Unify AI Assistant">
          <span>✦</span>
          <span>Ask Unify AI</span>
        </button>

        <!-- Quick Demo Journey Button -->
        <button class="btn btn-secondary btn-sm" onclick="window.unifyNextJourneyStep()" title="Advance to Next Step of Demo Journey">
          <span style="color: var(--secondary);">✦</span>
          <span>Journey Step ${state.currentJourneyStep} →</span>
        </button>

        <!-- User Profile & Sign Out (Section 2.1) -->
        <div style="display: flex; align-items: center; gap: 8px; padding-left: 8px; border-left: 1px solid var(--border-subtle);">
          <div style="width: 28px; height: 28px; border-radius: 50%; background: linear-gradient(135deg, #4f46e5, #06b6d4); display: flex; align-items: center; justify-content: center; font-weight: 700; color: #fff; font-size: 11px;">
            ${(state.currentUser?.name || 'MS').split(' ').map(n => n[0]).join('').slice(0, 2)}
          </div>
          <div style="display: flex; flex-direction: column;">
            <span style="font-size: 12px; font-weight: 600; color: #fff;">${state.currentUser?.name || 'John Smith'}</span>
            <span style="font-size: 10px; color: var(--text-muted);">${state.activePersona}</span>
          </div>
          <button class="btn btn-ghost btn-sm" onclick="window.unifyLogout()" title="Sign Out of Enterprise Fabric" style="padding: 4px 6px; font-size: 11px; margin-left: 4px; color: var(--text-muted);">
            Sign Out ➔
          </button>
        </div>
      </div>
    </header>
  `;
  }


  // ==================== src/components/aiAssistant.js ====================
  // AI Assistant Component implementing Section 4 Global AI Assistant
  function renderAiAssistant() {
    const state = store.getState();
    const isOpen = state.isAiDrawerOpen;

    const messagesHtml = state.aiMessages.map(msg => {
      const isBot = msg.sender === 'assistant';
      const triadBadge = msg.triadStatus ? `
      <div style="margin-bottom: 6px;">
        <span class="badge-triad ${msg.triadStatus === 'SYSTEM FACT' ? 'badge-system-fact' : (msg.triadStatus === 'USER DECISION' ? 'badge-user-decision' : 'badge-ai-rec')}">${msg.triadStatus}</span>
      </div>
    ` : '';

      const linksHtml = msg.links && msg.links.length > 0 ? `
      <div style="margin-top: 10px; display: flex; flex-direction: column; gap: 4px;">
        <div style="font-size: 11px; font-weight: 600; color: #a5b4fc; text-transform: uppercase;">Direct Application Links</div>
        ${msg.links.map(l => {
        if (l.route) {
          return `<a href="${l.route}" onclick="window.unifyToggleAiDrawer(false)" class="btn btn-secondary btn-sm" style="text-align: left; justify-content: flex-start;">🔗 ${l.label}</a>`;
        } else {
          return `<button class="btn btn-secondary btn-sm" onclick="window.unifyAskAiFromPrompt('${l.query.replace(/'/g, "\\'")}')" style="text-align: left; justify-content: flex-start;">💬 ${l.label}</button>`;
        }
      }).join('')}
      </div>
    ` : '';

      return `
      <div style="display: flex; flex-direction: column; gap: 4px; align-self: ${isBot ? 'flex-start' : 'flex-end'}; max-width: 90%;">
        <div style="font-size: 11px; color: var(--text-dim); display: flex; align-items: center; gap: 4px;">
          ${isBot ? '✦ Unify AI Copilot' : 'You'}
        </div>
        <div style="background: ${isBot ? 'var(--bg-card-subtle)' : 'var(--primary)'}; color: #fff; padding: 10px 14px; border-radius: var(--radius-lg); border: 1px solid ${isBot ? 'var(--border-default)' : 'transparent'}; font-size: 12.5px; line-height: 1.5; white-space: pre-wrap;">
          ${triadBadge}
          ${msg.text}
          ${linksHtml}
        </div>
      </div>
    `;
    }).join('');

    return `
    <div class="ai-drawer-overlay ${isOpen ? 'open' : ''}" onclick="window.unifyToggleAiDrawer(false)"></div>
    <aside class="ai-drawer ${isOpen ? 'open' : ''}">
      <div class="ai-drawer-header">
        <div class="ai-drawer-title">
          <span style="color: var(--accent-purple);">✦</span>
          <span>Unify AI Copilot</span>
        </div>
        <button class="btn btn-ghost btn-sm" onclick="window.unifyToggleAiDrawer(false)" style="padding: 4px;">
          ✕
        </button>
      </div>

      <div class="ai-drawer-body" id="ai-chat-body">
        ${messagesHtml}
      </div>

      <div class="ai-drawer-footer">
        <div style="display: flex; gap: 6px; margin-bottom: 8px; flex-wrap: wrap;">
          <button class="btn btn-ghost btn-sm" style="font-size: 11px; padding: 2px 6px;" onclick="window.unifyAskAiFromPrompt('Why did these accounts merge?')">Why did accounts merge?</button>
          <button class="btn btn-ghost btn-sm" style="font-size: 11px; padding: 2px 6px;" onclick="window.unifyAskAiFromPrompt('Show duplicate accounts')">Find duplicate accounts</button>
          <button class="btn btn-ghost btn-sm" style="font-size: 11px; padding: 2px 6px;" onclick="window.unifyAskAiFromPrompt('Find DQ issues')">Find DQ issues</button>
        </div>
        <form onsubmit="window.unifyHandleAiSubmit(event)" style="display: flex; gap: 8px;">
          <input type="text" id="ai-input-box" class="form-input" style="flex: 1; font-size: 12px; padding: 7px 10px;" placeholder="Ask anything about your data..." autocomplete="off">
          <button type="submit" class="btn btn-primary btn-sm">Send</button>
        </form>
      </div>
    </aside>
  `;
  }


  // ==================== src/components/globalSearch.js ====================
  // Global Search Modal Component (Section 46)
  function renderGlobalSearch() {
    const state = store.getState();
    const isOpen = state.isSearchOpen;

    return `
    <div class="modal-overlay ${isOpen ? 'open' : ''}" id="search-modal-overlay" onclick="if(event.target === this) window.unifyCloseSearch()">
      <div class="modal-content" style="max-width: 600px; margin-top: -10vh;">
        <div style="padding: 14px 18px; border-bottom: 1px solid var(--border-subtle); display: flex; align-items: center; gap: 10px;">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="color: var(--text-muted);">
            <circle cx="11" cy="11" r="8"></circle>
            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
          </svg>
          <input 
            type="text" 
            id="global-search-input" 
            placeholder="Type to search entities (Robert Smith), sources, match reviews, rules..." 
            style="flex: 1; background: transparent; border: none; outline: none; font-size: 14px; color: #fff; font-family: inherit;"
            oninput="window.unifyExecuteSearch(this.value)"
          >
          <kbd class="search-kbd">ESC</kbd>
        </div>

        <div id="search-results-container" style="max-height: 380px; overflow-y: auto; padding: 8px;">
          <div style="padding: 24px; text-align: center; color: var(--text-muted); font-size: 12.5px;">
            Search for <strong>Robert Smith</strong>, <strong>Salesforce</strong>, <strong>Email Rule</strong>, or <strong>Customer Standard</strong>.
          </div>
        </div>

        <div style="padding: 8px 16px; background: var(--bg-card-subtle); border-top: 1px solid var(--border-subtle); display: flex; align-items: center; justify-content: space-between; font-size: 11px; color: var(--text-muted);">
          <span>Use <strong>↑</strong> <strong>↓</strong> to navigate</span>
          <span><strong>ESC</strong> to close</span>
        </div>
      </div>
    </div>
  `;
  }


  // ==================== src/components/shell.js ====================
  // Global Application Shell Component (Section 3)
  function renderAppShell() {
    return `
    <div id="app">
      <div class="sidebar-backdrop" id="sidebar-backdrop" onclick="window.unifyToggleMobileSidebar(false)"></div>
      <div id="sidebar-container">${renderSidebar()}</div>
      
      <main class="app-main">
        <div id="topbar-container">${renderTopbar()}</div>
        
        <!-- Golden Journey Banner -->
        <div id="journey-banner" style="display: none; background: linear-gradient(90deg, #1e1b4b, #0f172a); border-bottom: 1px solid rgba(99, 102, 241, 0.3); padding: 8px 20px; align-items: center; justify-content: space-between;">
          <div style="display: flex; align-items: center; gap: 12px;">
            <span style="font-size: 14px;">✨</span>
            <span id="journey-banner-text" style="font-size: 12.5px; color: #e0e7ff; font-weight: 500;">
              Golden Flow: Step 1 of 16
            </span>
          </div>
          <div style="display: flex; align-items: center; gap: 8px;">
            <button class="btn btn-secondary btn-sm" onclick="window.unifyPrevJourneyStep()">Previous</button>
            <button class="btn btn-primary btn-sm" onclick="window.unifyNextJourneyStep()">Next Step →</button>
            <button class="btn btn-ghost btn-sm" onclick="window.unifyToggleJourney(false)">Dismiss Tour</button>
          </div>
        </div>

        <section class="app-content" id="main-content-viewport"></section>
      </main>

      <div id="ai-drawer-container">${renderAiAssistant()}</div>
      <div id="search-modal-container">${renderGlobalSearch()}</div>
    </div>
  `;
  }


  // ==================== src/pages/auth/login.js ====================
  // Authentication Page: Enterprise Login (Route: /login)
  async function renderLoginPage() {
    return `
    <div style="min-height: 100vh; width: 100vw; display: flex; align-items: center; justify-content: center; background: radial-gradient(circle at 50% 20%, #171b34 0%, #080b12 70%); padding: 20px; box-sizing: border-box;">
      <div style="width: 100%; max-width: 440px; background: rgba(15, 23, 42, 0.85); backdrop-filter: blur(12px); border: 1px solid var(--border-default); border-radius: var(--radius-xl); padding: 32px; box-shadow: var(--shadow-lg);">
        
        <!-- Brand Header -->
        <div style="text-align: center; margin-bottom: 24px;">
          <div style="display: inline-flex; align-items: center; justify-content: center; width: 44px; height: 44px; border-radius: 12px; background: linear-gradient(135deg, #6366f1, #06b6d4); font-weight: 800; font-size: 20px; color: #fff; margin-bottom: 12px; box-shadow: 0 0 16px rgba(99, 102, 241, 0.4);">
            U
          </div>
          <h1 style="font-family: var(--font-display); font-size: 22px; font-weight: 700; color: #fff; letter-spacing: -0.3px;">
            Unify AI Fabric
          </h1>
          <p style="font-size: 12.5px; color: var(--text-secondary); margin-top: 4px;">
            Enterprise Zero-Copy Data Unification & MDM
          </p>
        </div>

        <!-- Login Form -->
        <form onsubmit="window.unifyHandleLogin(event)" style="display: flex; flex-direction: column; gap: 14px;">
          <div class="form-group" style="margin-bottom: 0;">
            <label class="form-label" style="font-size: 12px;">Corporate Work Email</label>
            <input type="email" id="login-email" class="form-input" placeholder="name@enterprise.com" value="John@unify.ai" required style="padding: 10px 12px; font-size: 13px;">
          </div>

          <div class="form-group" style="margin-bottom: 0;">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 4px;">
              <label class="form-label" style="font-size: 12px; margin-bottom: 0;">Password</label>
              <a href="#/forgot-password" style="font-size: 11px; color: #818cf8; text-decoration: none;">Forgot password?</a>
            </div>
            <input type="password" id="login-password" class="form-input" placeholder="••••••••••••" value="EnterpriseMasterKey2026!" required style="padding: 10px 12px; font-size: 13px;">
          </div>

          <div style="display: flex; align-items: center; justify-content: space-between; font-size: 12px; color: var(--text-secondary); margin-top: 2px;">
            <label style="display: flex; align-items: center; gap: 6px; cursor: pointer;">
              <input type="checkbox" checked id="remember-me">
              <span>Remember session (30 days)</span>
            </label>
          </div>

          <button type="submit" class="btn btn-primary" style="padding: 10px; font-size: 13px; font-weight: 600; width: 100%; margin-top: 6px;">
            Sign In to Fabric →
          </button>
        </form>

        <!-- Federated SSO Options (Section 2.1) -->
        <div style="margin: 20px 0 16px; position: relative; text-align: center;">
          <div style="position: absolute; left: 0; right: 0; top: 50%; height: 1px; background: var(--border-subtle);"></div>
          <span style="position: relative; background: #0f172a; padding: 0 10px; font-size: 11px; color: var(--text-muted); text-transform: uppercase; letter-spacing: 0.5px;">
            Or authenticate with SSO
          </span>
        </div>

        <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 8px;">
          <button class="btn btn-secondary btn-sm" onclick="window.unifyLoginSSO('Okta')" style="padding: 7px; font-size: 11px;">
            Okta
          </button>
          <button class="btn btn-secondary btn-sm" onclick="window.unifyLoginSSO('Microsoft Entra')" style="padding: 7px; font-size: 11px;">
            Azure AD
          </button>
          <button class="btn btn-secondary btn-sm" onclick="window.unifyLoginSSO('Google')" style="padding: 7px; font-size: 11px;">
            Google
          </button>
        </div>

        <!-- Demo Persona Quick Select (Section 2.1 & 53) -->
        <div style="margin-top: 20px; padding: 12px; background: rgba(99, 102, 241, 0.08); border: 1px dashed rgba(99, 102, 241, 0.3); border-radius: var(--radius-md);">
          <div style="font-size: 11px; font-weight: 600; color: #a5b4fc; margin-bottom: 6px; text-transform: uppercase;">
            ✦ Demo Fast-Sign-In Presets
          </div>
          <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 6px;">
            <button class="btn btn-ghost btn-sm" onclick="window.unifyQuickLogin('John Smith', 'Data Architect', 'John@unify.ai')" style="font-size: 11px; padding: 4px; justify-content: flex-start; text-align: left;">
              👤 Data Architect
            </button>
            <button class="btn btn-ghost btn-sm" onclick="window.unifyQuickLogin('Elena Rostova', 'Data Steward', 'elena@unify.ai')" style="font-size: 11px; padding: 4px; justify-content: flex-start; text-align: left;">
              ⚖️ Data Steward
            </button>
            <button class="btn btn-ghost btn-sm" onclick="window.unifyQuickLogin('Marcus Vance', 'Business Analyst', 'marcus@unify.ai')" style="font-size: 11px; padding: 4px; justify-content: flex-start; text-align: left;">
              📊 Business Analyst
            </button>
            <button class="btn btn-ghost btn-sm" onclick="window.unifyQuickLogin('Sarah Chen', 'Administrator', 'sarah@unify.ai')" style="font-size: 11px; padding: 4px; justify-content: flex-start; text-align: left;">
              🔧 Administrator
            </button>
          </div>
        </div>

        <!-- Registration Link -->
        <div style="text-align: center; margin-top: 18px; font-size: 12px; color: var(--text-secondary);">
          Need an enterprise tenant?
          <a href="#/register" style="color: #38bdf8; text-decoration: none; font-weight: 500; margin-left: 4px;">Register Workspace →</a>
        </div>

      </div>
    </div>
  `;
  }


  // ==================== src/pages/auth/register.js ====================
  // Authentication Page: Enterprise User Registration & Tenant Provisioning (Route: /register)
  async function renderRegisterPage() {
    return `
    <div style="min-height: 100vh; width: 100vw; display: flex; align-items: center; justify-content: center; background: radial-gradient(circle at 50% 20%, #171b34 0%, #080b12 70%); padding: 20px; box-sizing: border-box;">
      <div style="width: 100%; max-width: 520px; background: rgba(15, 23, 42, 0.85); backdrop-filter: blur(12px); border: 1px solid var(--border-default); border-radius: var(--radius-xl); padding: 32px; box-shadow: var(--shadow-lg);">
        
        <!-- Header -->
        <div style="text-align: center; margin-bottom: 22px;">
          <div style="display: inline-flex; align-items: center; justify-content: center; width: 44px; height: 44px; border-radius: 12px; background: linear-gradient(135deg, #6366f1, #06b6d4); font-weight: 800; font-size: 20px; color: #fff; margin-bottom: 12px; box-shadow: 0 0 16px rgba(99, 102, 241, 0.4);">
            U
          </div>
          <h1 style="font-family: var(--font-display); font-size: 22px; font-weight: 700; color: #fff; letter-spacing: -0.3px;">
            Provision Unify AI Workspace
          </h1>
          <p style="font-size: 12.5px; color: var(--text-secondary); margin-top: 4px;">
            Register enterprise identity and initialize zero-copy MDM tenant
          </p>
        </div>

        <!-- Registration Form (Section 2.1) -->
        <form onsubmit="window.unifyHandleRegister(event)" style="display: flex; flex-direction: column; gap: 12px;">
          <div class="grid-2">
            <div class="form-group" style="margin-bottom: 0;">
              <label class="form-label" style="font-size: 12px;">Full Legal Name</label>
              <input type="text" id="reg-name" class="form-input" placeholder="John Smith" required style="padding: 9px 12px; font-size: 12.5px;">
            </div>
            <div class="form-group" style="margin-bottom: 0;">
              <label class="form-label" style="font-size: 12px;">Corporate Work Email</label>
              <input type="email" id="reg-email" class="form-input" placeholder="name@enterprise.com" required style="padding: 9px 12px; font-size: 12.5px;">
            </div>
          </div>

          <div class="grid-2">
            <div class="form-group" style="margin-bottom: 0;">
              <label class="form-label" style="font-size: 12px;">Organization / Tenant Name</label>
              <input type="text" id="reg-org" class="form-input" placeholder="Global Enterprise Ltd" required style="padding: 9px 12px; font-size: 12.5px;">
            </div>
            <div class="form-group" style="margin-bottom: 0;">
              <label class="form-label" style="font-size: 12px;">Primary Platform Role</label>
              <select id="reg-role" class="form-select" style="padding: 9px 12px; font-size: 12.5px;">
                <option value="Data Architect">Data Architect</option>
                <option value="Data Steward">Data Steward</option>
                <option value="Business Analyst">Business Analyst</option>
                <option value="Platform Administrator">Platform Administrator</option>
              </select>
            </div>
          </div>

          <div class="form-group" style="margin-bottom: 0;">
            <label class="form-label" style="font-size: 12px;">Enterprise Password</label>
            <input 
              type="password" 
              id="reg-password" 
              class="form-input" 
              placeholder="Min. 12 characters, numbers & symbols" 
              required 
              style="padding: 9px 12px; font-size: 12.5px;"
              oninput="window.unifyUpdatePasswordStrength(this.value)"
            >
            <div style="display: flex; align-items: center; gap: 8px; margin-top: 6px;">
              <div class="bar-track" style="flex: 1; height: 4px;">
                <div class="bar-fill" id="pwd-strength-bar" style="width: 25%; background: #ef4444;"></div>
              </div>
              <span id="pwd-strength-text" style="font-size: 10.5px; color: #ef4444; width: 60px; text-align: right;">Weak</span>
            </div>
          </div>

          <div style="margin-top: 4px; padding: 10px; background: var(--bg-input); border: 1px solid var(--border-default); border-radius: var(--radius-md); font-size: 11.5px; color: var(--text-secondary);">
            <label style="display: flex; gap: 8px; align-items: flex-start; cursor: pointer;">
              <input type="checkbox" id="reg-terms" required style="margin-top: 2px;">
              <span>I acknowledge that this workspace operates in SOC2 Type II compliance and agree to corporate MDM stewardship governance terms.</span>
            </label>
          </div>

          <button type="submit" class="btn btn-primary" style="padding: 10px; font-size: 13px; font-weight: 600; width: 100%; margin-top: 6px;">
            Provision Workspace & Sign In →
          </button>
        </form>

        <!-- Back to login -->
        <div style="text-align: center; margin-top: 18px; font-size: 12px; color: var(--text-secondary);">
          Already have an authorized account?
          <a href="#/login" style="color: #38bdf8; text-decoration: none; font-weight: 500; margin-left: 4px;">Sign In →</a>
        </div>

      </div>
    </div>
  `;
  }


  // ==================== src/pages/auth/forgotPassword.js ====================
  // Authentication Page: Password Recovery (Route: /forgot-password)
  async function renderForgotPasswordPage() {
    return `
    <div style="min-height: 100vh; width: 100vw; display: flex; align-items: center; justify-content: center; background: radial-gradient(circle at 50% 20%, #171b34 0%, #080b12 70%); padding: 20px; box-sizing: border-box;">
      <div style="width: 100%; max-width: 440px; background: rgba(15, 23, 42, 0.85); backdrop-filter: blur(12px); border: 1px solid var(--border-default); border-radius: var(--radius-xl); padding: 32px; box-shadow: var(--shadow-lg);">
        
        <div style="text-align: center; margin-bottom: 22px;">
          <div style="display: inline-flex; align-items: center; justify-content: center; width: 44px; height: 44px; border-radius: 12px; background: linear-gradient(135deg, #6366f1, #06b6d4); font-weight: 800; font-size: 20px; color: #fff; margin-bottom: 12px; box-shadow: 0 0 16px rgba(99, 102, 241, 0.4);">
            U
          </div>
          <h1 style="font-family: var(--font-display); font-size: 22px; font-weight: 700; color: #fff; letter-spacing: -0.3px;">
            Reset Enterprise Password
          </h1>
          <p style="font-size: 12.5px; color: var(--text-secondary); margin-top: 4px;">
            Enter your corporate email to receive a secure recovery magic link
          </p>
        </div>

        <form onsubmit="window.unifyHandleForgot(event)" style="display: flex; flex-direction: column; gap: 14px;">
          <div class="form-group" style="margin-bottom: 0;">
            <label class="form-label" style="font-size: 12px;">Corporate Work Email</label>
            <input type="email" id="forgot-email" class="form-input" placeholder="name@enterprise.com" required style="padding: 10px 12px; font-size: 13px;">
          </div>

          <div id="forgot-success-banner" style="display: none; padding: 10px 14px; background: rgba(16, 185, 129, 0.12); border: 1px solid rgba(16, 185, 129, 0.35); border-radius: var(--radius-md); font-size: 12px; color: #34d399;">
            ✓ If this email matches an authorized enterprise user, a secure cryptographic reset link has been dispatched.
          </div>

          <button type="submit" class="btn btn-primary" style="padding: 10px; font-size: 13px; font-weight: 600; width: 100%;">
            Send Recovery Magic Link →
          </button>
        </form>

        <div style="text-align: center; margin-top: 20px; font-size: 12px; color: var(--text-secondary);">
          Remembered your password?
          <a href="#/login" style="color: #38bdf8; text-decoration: none; font-weight: 500; margin-left: 4px;">Return to Sign In →</a>
        </div>

      </div>
    </div>
  `;
  }


  // ==================== src/pages/overview.js ====================
  // Page 5: Overview Dashboard (Route: /)
  async function renderOverviewPage() {
    const sources = await repository.getSources();
    const jobs = await repository.getJobs();

    return `
    <div class="page-container">
      <div style="margin-bottom: 12px;">
        ${renderBreadcrumbs([{ label: 'Fabric Overview', route: '#/' }])}
      </div>

      <div class="page-header">
        <div class="page-title-group">
          <h1 class="page-title">
            <span>Zero-Copy Data Unification Fabric</span>
          </h1>
          <p class="page-description">Real-time enterprise identity resolution, data quality telemetry, and active stewardship operations.</p>
        </div>
        <div class="page-actions">
          <a href="#/data-foundation/sources/new" class="btn btn-secondary">
            <span>🔌</span> Connect Source
          </a>
          <a href="#/unification/match-strategies/new" class="btn btn-secondary">
            <span>⚡</span> Configure Strategy
          </a>
          <a href="#/stewardship" class="btn btn-primary">
            <span>⚖️</span> Review Queue (1,284)
          </a>
        </div>
      </div>

      <!-- KPI Cards (Section 5) -->
      <div class="kpi-grid">
        <div class="kpi-card">
          <span class="kpi-label">Connected Sources</span>
          <div class="kpi-value">${sources.length}</div>
          <div class="kpi-delta positive">
            <span>●</span> All connectors active & healthy
          </div>
        </div>

        <div class="kpi-card">
          <span class="kpi-label">Enterprise Records</span>
          <div class="kpi-value">42.8M</div>
          <div class="kpi-delta positive">
            <span>↑ +128K</span> synced today
          </div>
        </div>

        <div class="kpi-card">
          <span class="kpi-label">Golden Entities</span>
          <div class="kpi-value">18.2M</div>
          <div class="kpi-delta positive">
            <span>👑 42.5%</span> consolidation ratio
          </div>
        </div>

        <div class="kpi-card">
          <span class="kpi-label">Match Rate</span>
          <div class="kpi-value">91.7%</div>
          <div class="kpi-delta positive">
            <span>↑ +2.4%</span> vs baseline
          </div>
        </div>

        <div class="kpi-card">
          <span class="kpi-label">Data Quality Score</span>
          <div class="kpi-value" style="color: #38bdf8;">94.2%</div>
          <div class="kpi-delta positive">
            <span>● 4.8M</span> checked records
          </div>
        </div>

        <div class="kpi-card" style="border-color: rgba(245, 158, 11, 0.4);">
          <span class="kpi-label">Pending Reviews</span>
          <div class="kpi-value" style="color: #fbbf24;">1,284</div>
          <div class="kpi-delta" style="color: #fbbf24;">
            <span>⚠ Requires Steward</span>
          </div>
        </div>
      </div>

      <!-- Main Dash Content: Processing Health & Unification Pipeline -->
      <div class="grid-2" style="margin-bottom: 20px;">
        <!-- Processing Health -->
        <div class="card">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 14px;">
            <h3 style="font-size: 14px; font-weight: 600; color: #fff;">Processing Pipeline Health</h3>
            <span class="badge badge-success">8/8 Nodes Healthy</span>
          </div>

          <div style="display: flex; flex-direction: column; gap: 12px;">
            <div>
              <div style="display: flex; justify-content: space-between; font-size: 12px; margin-bottom: 4px;">
                <span style="color: var(--text-secondary);">Salesforce Zero-Copy CDC Engine</span>
                <span style="font-family: var(--font-mono); color: #34d399;">Active • 42ms</span>
              </div>
              <div class="bar-track"><div class="bar-fill bar-fill-success" style="width: 100%;"></div></div>
            </div>

            <div>
              <div style="display: flex; justify-content: space-between; font-size: 12px; margin-bottom: 4px;">
                <span style="color: var(--text-secondary);">Probabilistic Match Engine (Cluster 4)</span>
                <span style="font-family: var(--font-mono); color: #34d399;">Running • 14.2k rec/s</span>
              </div>
              <div class="bar-track"><div class="bar-fill bar-fill-primary" style="width: 78%;"></div></div>
            </div>

            <div>
              <div style="display: flex; justify-content: space-between; font-size: 12px; margin-bottom: 4px;">
                <span style="color: var(--text-secondary);">Vertex AI LLM Entity Disambiguation</span>
                <span style="font-family: var(--font-mono); color: #a855f7;">Active • 240ms</span>
              </div>
              <div class="bar-track"><div class="bar-fill bar-fill-ai" style="width: 92%;"></div></div>
            </div>
          </div>

          <div style="margin-top: 16px; padding-top: 12px; border-top: 1px solid var(--border-subtle); display: flex; justify-content: space-between; font-size: 11.5px; color: var(--text-muted);">
            <span>Active Jobs: <strong style="color: #fff;">1 Running</strong></span>
            <span>Completed Today: <strong style="color: #fff;">32 Jobs</strong></span>
            <span>Failed: <strong style="color: #34d399;">0</strong></span>
          </div>
        </div>

        <!-- Unification Pipeline Visual Funnel (Section 16) -->
        <div class="card">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 14px;">
            <h3 style="font-size: 14px; font-weight: 600; color: #fff;">Unification Funnel</h3>
            <a href="#/unification" class="btn btn-ghost btn-sm" style="font-size: 11px;">View Details →</a>
          </div>

          <div style="display: flex; align-items: center; justify-content: space-between; text-align: center; padding: 10px 0; font-family: var(--font-mono);">
            <div style="flex: 1;">
              <div style="font-size: 16px; font-weight: 700; color: #fff;">42.8M</div>
              <div style="font-size: 10px; color: var(--text-muted); text-transform: uppercase;">Raw Records</div>
            </div>
            <span style="color: var(--text-dim);">→</span>
            <div style="flex: 1;">
              <div style="font-size: 16px; font-weight: 700; color: #38bdf8;">94.2%</div>
              <div style="font-size: 10px; color: var(--text-muted); text-transform: uppercase;">DQ Validated</div>
            </div>
            <span style="color: var(--text-dim);">→</span>
            <div style="flex: 1;">
              <div style="font-size: 16px; font-weight: 700; color: #a855f7;">91.7%</div>
              <div style="font-size: 10px; color: var(--text-muted); text-transform: uppercase;">Matched</div>
            </div>
            <span style="color: var(--text-dim);">→</span>
            <div style="flex: 1;">
              <div style="font-size: 16px; font-weight: 700; color: #34d399;">18.2M</div>
              <div style="font-size: 10px; color: var(--text-muted); text-transform: uppercase;">Golden Entities</div>
            </div>
          </div>

          <div style="margin-top: 14px; background: rgba(99, 102, 241, 0.08); border: 1px dashed rgba(99, 102, 241, 0.3); border-radius: var(--radius-md); padding: 10px 14px; display: flex; align-items: center; justify-content: space-between;">
            <div>
              <div style="font-size: 12px; font-weight: 600; color: #fff;">Stewardship Review Alert</div>
              <div style="font-size: 11px; color: var(--text-secondary);">1,284 pairs in confidence bracket (85% – 94.9%) await human confirmation.</div>
            </div>
            <a href="#/stewardship/reviews/match-101" class="btn btn-ai btn-sm">Review Now</a>
          </div>
        </div>
      </div>

      <!-- Connected Sources Quick Table & Recent Activity -->
      <div class="grid-2">
        <!-- Sources Mini View -->
        <div class="table-card">
          <div class="table-toolbar">
            <span style="font-weight: 600; font-size: 13px; color: #fff;">Connected Sources</span>
            <a href="#/data-foundation/sources" class="btn btn-ghost btn-sm">Manage All →</a>
          </div>
          <table class="data-table">
            <thead>
              <tr>
                <th>Source</th>
                <th>Type</th>
                <th>Access</th>
                <th>Status</th>
                <th>Records</th>
              </tr>
            </thead>
            <tbody>
              ${sources.map(s => `
                <tr style="cursor: pointer;" onclick="window.location.hash='#/data-foundation/sources/${s.id}'">
                  <td class="cell-highlight">${s.name}</td>
                  <td>${s.type}</td>
                  <td><span class="badge ${s.access === 'Zero-Copy' ? 'badge-info' : 'badge-neutral'}">${s.access}</span></td>
                  <td><span class="badge badge-success">${s.status}</span></td>
                  <td class="cell-mono">${s.records}</td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>

        <!-- Recent Platform Activity Feed -->
        <div class="card">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px;">
            <h3 style="font-size: 14px; font-weight: 600; color: #fff;">Recent Activity Feed</h3>
            <span style="font-size: 11px; color: var(--text-dim);">Live audit stream</span>
          </div>

          <div style="display: flex; flex-direction: column; gap: 10px;">
            <div style="display: flex; gap: 10px; align-items: flex-start; padding-bottom: 10px; border-bottom: 1px solid var(--border-subtle);">
              <span style="background: rgba(6, 182, 212, 0.15); color: #38bdf8; padding: 4px 6px; border-radius: 4px; font-size: 11px;">SYNC</span>
              <div style="flex: 1;">
                <div style="font-size: 12.5px; color: #fff;">Salesforce Account source delta synchronized</div>
                <div style="font-size: 11px; color: var(--text-muted);">Real-time CDC processed 14,209 changes</div>
              </div>
              <span style="font-size: 11px; color: var(--text-dim);">2m ago</span>
            </div>

            <div style="display: flex; gap: 10px; align-items: flex-start; padding-bottom: 10px; border-bottom: 1px solid var(--border-subtle);">
              <span style="background: rgba(168, 85, 247, 0.15); color: #c084fc; padding: 4px 6px; border-radius: 4px; font-size: 11px;">MATCH</span>
              <div style="flex: 1;">
                <div style="font-size: 12.5px; color: #fff;">4,821 entities auto-unified into Golden Customer model</div>
                <div style="font-size: 11px; color: var(--text-muted);">Strategy: Customer Standard v4 (≥95% confidence)</div>
              </div>
              <span style="font-size: 11px; color: var(--text-dim);">14m ago</span>
            </div>

            <div style="display: flex; gap: 10px; align-items: flex-start; padding-bottom: 10px; border-bottom: 1px solid var(--border-subtle);">
              <span style="background: rgba(245, 158, 11, 0.15); color: #fbbf24; padding: 4px 6px; border-radius: 4px; font-size: 11px;">QUEUE</span>
              <div style="flex: 1;">
                <div style="font-size: 12.5px; color: #fff;">213 match pairs routed to Data Steward review queue</div>
                <div style="font-size: 11px; color: var(--text-muted);">High priority threshold tier (89% - 94.9%)</div>
              </div>
              <span style="font-size: 11px; color: var(--text-dim);">45m ago</span>
            </div>

            <div style="display: flex; gap: 10px; align-items: flex-start;">
              <span style="background: rgba(16, 185, 129, 0.15); color: #34d399; padding: 4px 6px; border-radius: 4px; font-size: 11px;">PUBLISH</span>
              <div style="flex: 1;">
                <div style="font-size: 12.5px; color: #fff;">Customer Golden Dataset published to Snowflake Data Share</div>
                <div style="font-size: 11px; color: var(--text-muted);">18.2M master entities verified & certified</div>
              </div>
              <span style="font-size: 11px; color: var(--text-dim);">1h ago</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;
  }


  // ==================== src/pages/dataFoundation/sources.js ====================
  // Page 6: Sources Catalog (Route: /data-foundation/sources)
  async function renderSourcesPage() {
    const sources = await repository.getSources();

    return `
    <div class="page-container">
      <div style="margin-bottom: 12px;">
        ${renderBreadcrumbs([
      { label: 'Data Foundation', route: '#/data-foundation/sources' },
      { label: 'Sources', route: '#/data-foundation/sources' }
    ])}
      </div>

      <div class="page-header">
        <div class="page-title-group">
          <h1 class="page-title">Enterprise Data Sources</h1>
          <p class="page-description">Manage zero-copy endpoints, lakehouses, materialized caches, and real-time CDC connectors.</p>
        </div>
        <div class="page-actions">
          <a href="#/data-foundation/sources/new" class="btn btn-primary">
            <span>+</span> Connect New Source
          </a>
        </div>
      </div>

      <!-- Filters & Toolbar -->
      <div class="table-card">
        <div class="table-toolbar">
          <div style="display: flex; gap: 8px; align-items: center; flex-wrap: wrap;">
            <input type="text" class="form-input" placeholder="Filter sources by name or type..." style="width: 240px; padding: 6px 10px; font-size: 12px;">
            <select class="form-select" style="padding: 6px 10px; font-size: 12px;">
              <option value="">All Access Modes</option>
              <option value="Zero-Copy">Zero-Copy</option>
              <option value="Materialized">Materialized</option>
            </select>
            <select class="form-select" style="padding: 6px 10px; font-size: 12px;">
              <option value="">All Domains</option>
              <option value="Customer">Customer</option>
              <option value="Product">Product</option>
            </select>
            <select class="form-select" style="padding: 6px 10px; font-size: 12px;">
              <option value="">Status: All</option>
              <option value="Connected">Connected</option>
              <option value="Healthy">Healthy</option>
            </select>
          </div>
          <div style="font-size: 12px; color: var(--text-muted);">
            Showing <strong>${sources.length}</strong> active connections
          </div>
        </div>

        <div class="data-table-container">
          <table class="data-table">
            <thead>
              <tr>
                <th>Source Name</th>
                <th>System Type</th>
                <th>Target Entity</th>
                <th>Access Mode</th>
                <th>Connection Status</th>
                <th style="text-align: right;">Records</th>
                <th>Last Synchronized</th>
                <th>Objects</th>
                <th style="text-align: right;">Row Actions</th>
              </tr>
            </thead>
            <tbody>
              ${sources.map(s => `
                <tr style="cursor: pointer;" onclick="window.location.hash='#/data-foundation/sources/${s.id}'">
                  <td class="cell-highlight">
                    <div style="display: flex; align-items: center; gap: 8px;">
                      <span style="font-size: 16px;">${s.type === 'CRM' ? '☁️' : (s.type === 'ERP' ? '🏢' : '🗄️')}</span>
                      <div>
                        <strong>${s.name}</strong>
                        <div style="font-size: 10.5px; color: var(--text-dim);">${s.id}</div>
                      </div>
                    </div>
                  </td>
                  <td>${s.type}</td>
                  <td><span class="badge badge-neutral">${s.entity}</span></td>
                  <td>
                    <span class="badge ${s.access === 'Zero-Copy' ? 'badge-info' : 'badge-neutral'}">
                      ${s.access}
                    </span>
                  </td>
                  <td>
                    <span class="badge badge-success">
                      <span style="width: 6px; height: 6px; border-radius: 50%; background: #10b981;"></span>
                      ${s.status}
                    </span>
                  </td>
                  <td class="cell-mono" style="text-align: right; font-weight: 600;">${s.records}</td>
                  <td style="font-size: 12px; color: var(--text-muted);">${s.lastSync}</td>
                  <td style="font-size: 12px;">${s.objectsCount} tables</td>
                  <td style="text-align: right;" onclick="event.stopPropagation()">
                    <div style="display: inline-flex; gap: 4px;">
                      <a href="#/data-foundation/sources/${s.id}" class="btn btn-secondary btn-sm" title="Open Source Details">Open</a>
                      <button class="btn btn-ghost btn-sm" onclick="alert('Connection test for ${s.name}: 100% OK (Latency: ${s.latency})')" title="Test Ping">Test</button>
                      <a href="#/data-foundation/profiles" class="btn btn-ghost btn-sm" title="Profile Data">Profile</a>
                    </div>
                  </td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  `;
  }


  // ==================== src/pages/dataFoundation/addSource.js ====================
  // Page 7: Add Source 7-Step Wizard (Route: /data-foundation/sources/new)
  async function renderAddSourcePage() {
    return `
    <div class="page-container" style="max-width: 900px; margin: 0 auto;">
      <div style="margin-bottom: 12px;">
        ${renderBreadcrumbs([
      { label: 'Data Foundation', route: '#/data-foundation/sources' },
      { label: 'Sources', route: '#/data-foundation/sources' },
      { label: 'New Source Connection', route: '#/data-foundation/sources/new' }
    ])}
      </div>

      <div class="page-header">
        <div class="page-title-group">
          <h1 class="page-title">Connect New Enterprise Data Source</h1>
          <p class="page-description">Configure zero-copy virtual access or materialized ingestion pipeline.</p>
        </div>
      </div>

      <!-- 7-Step Stepper Header (Section 7) -->
      <div class="wizard-stepper" id="source-stepper">
        <div class="wizard-step active" data-step="1" onclick="window.unifySetWizardStep(1)">
          <span class="step-num">1</span>
          <span>Source Type</span>
        </div>
        <div class="step-divider"></div>

        <div class="wizard-step" data-step="2" onclick="window.unifySetWizardStep(2)">
          <span class="step-num">2</span>
          <span>Connection</span>
        </div>
        <div class="step-divider"></div>

        <div class="wizard-step" data-step="3" onclick="window.unifySetWizardStep(3)">
          <span class="step-num">3</span>
          <span>Access Mode</span>
        </div>
        <div class="step-divider"></div>

        <div class="wizard-step" data-step="4" onclick="window.unifySetWizardStep(4)">
          <span class="step-num">4</span>
          <span>Objects</span>
        </div>
        <div class="step-divider"></div>

        <div class="wizard-step" data-step="5" onclick="window.unifySetWizardStep(5)">
          <span class="step-num">5</span>
          <span>Test</span>
        </div>
        <div class="step-divider"></div>

        <div class="wizard-step" data-step="6" onclick="window.unifySetWizardStep(6)">
          <span class="step-num">6</span>
          <span>Discovery</span>
        </div>
        <div class="step-divider"></div>

        <div class="wizard-step" data-step="7" onclick="window.unifySetWizardStep(7)">
          <span class="step-num">7</span>
          <span>Finish</span>
        </div>
      </div>

      <!-- Step Containers -->
      <div class="card" style="padding: 24px; min-height: 420px; display: flex; flex-direction: column; justify-content: space-between;">
        
        <!-- STEP 1: Source Type -->
        <div class="wizard-step-pane" id="step-pane-1">
          <h3 style="font-size: 15px; font-weight: 600; color: #fff; margin-bottom: 6px;">Step 1: Choose Enterprise Connector</h3>
          <p style="font-size: 12.5px; color: var(--text-secondary); margin-bottom: 18px;">Select the operational database, SaaS cloud, or lakehouse system to integrate.</p>

          <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(180px, 1fr)); gap: 12px;" id="source-type-selector">
            ${[
        { id: 'Salesforce', icon: '☁️', label: 'Salesforce', desc: 'CRM, Accounts & Contacts', recommended: true },
        { id: 'Databricks', icon: '🧱', label: 'Databricks', desc: 'Delta Lake & Unity Catalog' },
        { id: 'Snowflake', icon: '❄️', label: 'Snowflake', desc: 'Enterprise Data Warehouse' },
        { id: 'PostgreSQL', icon: '🐘', label: 'PostgreSQL', desc: 'Transactional SQL Database' },
        { id: 'SAP', icon: '🏢', label: 'SAP S/4HANA', desc: 'ERP Business Partners' },
        { id: 'Oracle', icon: '🔴', label: 'Oracle EBS', desc: 'Core Financials & Supply' },
        { id: 'Reltio', icon: '🔄', label: 'Reltio MDM', desc: 'Legacy Master Hub' },
        { id: 'REST', icon: '⚡', label: 'REST API', desc: 'Zero-copy webhook & pull' }
      ].map((t, idx) => `
              <div 
                style="padding: 14px; border: 1px solid ${t.recommended ? 'var(--primary)' : 'var(--border-default)'}; background: ${t.recommended ? 'rgba(99, 102, 241, 0.1)' : 'var(--bg-input)'}; border-radius: var(--radius-md); cursor: pointer; transition: all 0.15s;"
                onclick="window.unifySelectSourceType('${t.id}', this)"
                class="source-type-card ${t.recommended ? 'selected' : ''}"
              >
                <div style="font-size: 24px; margin-bottom: 6px;">${t.icon}</div>
                <div style="font-weight: 600; color: #fff; font-size: 13px;">${t.label}</div>
                <div style="font-size: 11px; color: var(--text-muted); margin-top: 2px;">${t.desc}</div>
                ${t.recommended ? '<span class="badge badge-info" style="margin-top: 8px; font-size: 9px;">Demo Target</span>' : ''}
              </div>
            `).join('')}
          </div>
        </div>

        <!-- STEP 2: Connection Settings -->
        <div class="wizard-step-pane" id="step-pane-2" style="display: none;">
          <h3 style="font-size: 15px; font-weight: 600; color: #fff; margin-bottom: 6px;">Step 2: Salesforce Connection Credentials</h3>
          <p style="font-size: 12.5px; color: var(--text-secondary); margin-bottom: 18px;">Authenticate through OAuth 2.0 or dedicated enterprise connected app.</p>

          <div class="grid-2">
            <div class="form-group">
              <label class="form-label">Instance URL / Custom Domain</label>
              <input type="text" class="form-input" id="cfg-url" value="https://enterprise-us-east.my.salesforce.com">
            </div>
            <div class="form-group">
              <label class="form-label">Authentication Method</label>
              <select class="form-select" id="cfg-auth">
                <option value="oauth">OAuth 2.0 JWT Bearer Token (Recommended)</option>
                <option value="userpass">Connected App Key + Secret</option>
              </select>
            </div>
            <div class="form-group">
              <label class="form-label">Client ID (Consumer Key)</label>
              <input type="text" class="form-input" value="3MVG9l4NxpHBOD.0qwe71928_sfdc_prod_token">
            </div>
            <div class="form-group">
              <label class="form-label">API Version</label>
              <input type="text" class="form-input" value="v59.0 (REST / GraphQL Bulk API 2.0)">
            </div>
          </div>
        </div>

        <!-- STEP 3: Access Mode -->
        <div class="wizard-step-pane" id="step-pane-3" style="display: none;">
          <h3 style="font-size: 15px; font-weight: 600; color: #fff; margin-bottom: 6px;">Step 3: Ingestion & Access Architecture</h3>
          <p style="font-size: 12.5px; color: var(--text-secondary); margin-bottom: 18px;">Configure how Unify AI accesses and unifies records from this source.</p>

          <div style="display: flex; flex-direction: column; gap: 12px;">
            <label style="display: flex; gap: 14px; padding: 14px; border: 1px solid var(--primary); background: rgba(99, 102, 241, 0.08); border-radius: var(--radius-md); cursor: pointer;">
              <input type="radio" name="accessMode" value="Zero-Copy" checked style="margin-top: 3px;">
              <div>
                <div style="font-weight: 600; color: #fff; font-size: 13px; display: flex; align-items: center; gap: 6px;">
                  <span>Zero-Copy Virtualization</span>
                  <span class="badge badge-info">Recommended</span>
                </div>
                <div style="font-size: 12px; color: var(--text-secondary); margin-top: 4px;">
                  Data remains in Salesforce. Unify AI pushes down queries and resolves entities in real-time without duplicating operational storage.
                </div>
              </div>
            </label>

            <label style="display: flex; gap: 14px; padding: 14px; border: 1px solid var(--border-default); background: var(--bg-input); border-radius: var(--radius-md); cursor: pointer;">
              <input type="radio" name="accessMode" value="Selective Materialization" style="margin-top: 3px;">
              <div>
                <div style="font-weight: 600; color: #fff; font-size: 13px;">Selective Materialization</div>
                <div style="font-size: 12px; color: var(--text-secondary); margin-top: 4px;">
                  Cache high-velocity attributes locally in memory while leaving large payloads virtualized.
                </div>
              </div>
            </label>

            <label style="display: flex; gap: 14px; padding: 14px; border: 1px solid var(--border-default); background: var(--bg-input); border-radius: var(--radius-md); cursor: pointer;">
              <input type="radio" name="accessMode" value="Streaming CDC" style="margin-top: 3px;">
              <div>
                <div style="font-weight: 600; color: #fff; font-size: 13px;">Streaming / Change Data Capture (CDC)</div>
                <div style="font-size: 12px; color: var(--text-secondary); margin-top: 4px;">
                  Subscribe to Salesforce Pub/Sub event streams for millisecond-level identity resolution triggers.
                </div>
              </div>
            </label>
          </div>
        </div>

        <!-- STEP 4: Select Objects -->
        <div class="wizard-step-pane" id="step-pane-4" style="display: none;">
          <h3 style="font-size: 15px; font-weight: 600; color: #fff; margin-bottom: 6px;">Step 4: Select Standard & Custom Objects</h3>
          <p style="font-size: 12.5px; color: var(--text-secondary); margin-bottom: 18px;">Pick Salesforce entities for semantic profiling and canonical customer mapping.</p>

          <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 10px;">
            ${[
        { name: 'Account', records: '2,048,190', checked: true, desc: 'Corporate & Individual Accounts' },
        { name: 'Contact', records: '4,192,000', checked: true, desc: 'Associated individual stakeholders' },
        { name: 'Opportunity', records: '810,400', checked: false, desc: 'Pipeline revenue & deals' },
        { name: 'Lead', records: '1,500,000', checked: false, desc: 'Unqualified inbound prospects' },
        { name: 'Case', records: '920,000', checked: false, desc: 'Customer support tickets' },
        { name: 'Custom: Billing_Profile__c', records: '1,940,000', checked: false, desc: 'Custom invoice linkage' }
      ].map(o => `
              <label style="display: flex; align-items: center; justify-content: space-between; padding: 12px; background: var(--bg-input); border: 1px solid var(--border-default); border-radius: var(--radius-md); cursor: pointer;">
                <div style="display: flex; align-items: center; gap: 10px;">
                  <input type="checkbox" ${o.checked ? 'checked' : ''} class="obj-check" value="${o.name}">
                  <div>
                    <div style="font-weight: 600; color: #fff; font-size: 13px;">${o.name}</div>
                    <div style="font-size: 11px; color: var(--text-muted);">${o.desc}</div>
                  </div>
                </div>
                <span class="cell-mono" style="font-size: 11px; color: var(--text-secondary);">${o.records}</span>
              </label>
            `).join('')}
          </div>
        </div>

        <!-- STEP 5: Test Connection -->
        <div class="wizard-step-pane" id="step-pane-5" style="display: none;">
          <h3 style="font-size: 15px; font-weight: 600; color: #fff; margin-bottom: 6px;">Step 5: Verify Connection Health</h3>
          <p style="font-size: 12.5px; color: var(--text-secondary); margin-bottom: 18px;">Testing handshake, zero-copy query pushdown, and rate limit telemetry.</p>

          <div style="background: var(--bg-input); border: 1px solid var(--border-default); border-radius: var(--radius-md); padding: 18px;">
            <div style="display: flex; flex-direction: column; gap: 12px; font-family: var(--font-mono); font-size: 12px;">
              <div style="display: flex; align-items: center; gap: 10px; color: #34d399;">
                <span>✓</span>
                <span>DNS & TLS 1.3 Handshake: Resolved in 12ms</span>
              </div>
              <div style="display: flex; align-items: center; gap: 10px; color: #34d399;">
                <span>✓</span>
                <span>OAuth Token Exchange: Authorized (Scope: api, refresh_token)</span>
              </div>
              <div style="display: flex; align-items: center; gap: 10px; color: #34d399;">
                <span>✓</span>
                <span>Zero-Copy Predicate Pushdown: SOQL count verification succeeded</span>
              </div>
              <div style="display: flex; align-items: center; gap: 10px; color: #34d399;">
                <span>✓</span>
                <span>Active API Quota: 98,200 / 100,000 calls remaining (Healthy)</span>
              </div>
            </div>

            <div style="margin-top: 16px; padding: 10px; background: rgba(16, 185, 129, 0.1); border: 1px solid rgba(16, 185, 129, 0.3); border-radius: var(--radius-sm); color: #34d399; font-size: 12px;">
              Connection check completed successfully. Ready for automated semantic discovery.
            </div>
          </div>
        </div>

        <!-- STEP 6: Schema Discovery -->
        <div class="wizard-step-pane" id="step-pane-6" style="display: none;">
          <h3 style="font-size: 15px; font-weight: 600; color: #fff; margin-bottom: 6px;">Step 6: Automated Schema & Entity Discovery</h3>
          <p style="font-size: 12.5px; color: var(--text-secondary); margin-bottom: 18px;">AI has inspected the selected objects and detected candidate canonical domains.</p>

          <div class="card" style="background: var(--bg-input); margin-bottom: 14px;">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px;">
              <span class="badge-triad badge-ai-rec">AI RECOMMENDATION</span>
              <span style="font-size: 12px; color: var(--secondary);">Semantic Match: 98.4%</span>
            </div>
            <div style="font-size: 13.5px; font-weight: 600; color: #fff;">Identified Domain: Canonical Customer Entity</div>
            <div style="font-size: 12px; color: var(--text-secondary); margin-top: 4px;">
              Detected 46 schema columns, 2 unique candidate keys (\`Id\`, \`BillingTaxNumber__c\`), and 4 PII attributes.
            </div>
          </div>

          <div style="font-size: 12px; color: var(--text-muted);">
            Discovered fields will be automatically staged into the <strong>Schema Mapping</strong> studio upon activation.
          </div>
        </div>

        <!-- STEP 7: Finish & Activate -->
        <div class="wizard-step-pane" id="step-pane-7" style="display: none;">
          <h3 style="font-size: 15px; font-weight: 600; color: #fff; margin-bottom: 6px;">Step 7: Activation Summary</h3>
          <p style="font-size: 12.5px; color: var(--text-secondary); margin-bottom: 18px;">Confirm configuration parameters to link Salesforce CRM into the zero-copy fabric.</p>

          <table style="width: 100%; border-collapse: collapse; font-size: 12.5px; margin-bottom: 20px;">
            <tr style="border-bottom: 1px solid var(--border-subtle);"><td style="padding: 8px 0; color: var(--text-muted);">Source Type</td><td style="font-weight: 600; color: #fff;">Salesforce CRM</td></tr>
            <tr style="border-bottom: 1px solid var(--border-subtle);"><td style="padding: 8px 0; color: var(--text-muted);">Access Mode</td><td style="font-weight: 600; color: #38bdf8;">Zero-Copy Virtualization</td></tr>
            <tr style="border-bottom: 1px solid var(--border-subtle);"><td style="padding: 8px 0; color: var(--text-muted);">Selected Objects</td><td style="font-weight: 600; color: #fff;">Account (2,048,190 records), Contact</td></tr>
            <tr style="border-bottom: 1px solid var(--border-subtle);"><td style="padding: 8px 0; color: var(--text-muted);">Target Domain</td><td style="font-weight: 600; color: #a855f7;">Canonical Customer</td></tr>
            <tr><td style="padding: 8px 0; color: var(--text-muted);">Status Upon Activation</td><td style="font-weight: 600; color: #34d399;">Active • Ready for Mapping</td></tr>
          </table>

          <div class="badge-triad badge-user-decision" style="margin-bottom: 10px;">USER DECISION REQUIRED</div>
          <div style="font-size: 12px; color: var(--text-secondary);">
            Clicking <strong>Activate Connection</strong> will register this source into the catalog and route you directly to <strong>Source Details</strong>.
          </div>
        </div>

        <!-- Wizard Navigation Buttons -->
        <div style="display: flex; justify-content: space-between; align-items: center; border-top: 1px solid var(--border-subtle); padding-top: 18px; margin-top: 20px;">
          <button class="btn btn-secondary" id="wiz-prev-btn" onclick="window.unifyWizPrev()" style="visibility: hidden;">
            ← Previous
          </button>
          
          <div style="display: flex; gap: 10px;">
            <a href="#/data-foundation/sources" class="btn btn-ghost">Cancel</a>
            <button class="btn btn-primary" id="wiz-next-btn" onclick="window.unifyWizNext()">
              Next Step →
            </button>
          </div>
        </div>

      </div>
    </div>
  `;
  }


  // ==================== src/pages/dataFoundation/sourceDetails.js ====================
  // Page 8: Source Details with 8 Tabs (Route: /data-foundation/sources/:sourceId)
  async function renderSourceDetailsPage(params) {
    const sourceId = params.sourceId || 'src-salesforce';
    const source = (await repository.getSource(sourceId)) || (await repository.getSources())[0];

    return `
    <div class="page-container">
      <div style="margin-bottom: 12px;">
        ${renderBreadcrumbs([
      { label: 'Data Foundation', route: '#/data-foundation/sources' },
      { label: 'Sources', route: '#/data-foundation/sources' },
      { label: source.name, route: `#/data-foundation/sources/${source.id}` }
    ])}
      </div>

      <!-- Header with Status and Primary Actions -->
      <div class="page-header">
        <div class="page-title-group">
          <div style="display: flex; align-items: center; gap: 10px;">
            <h1 class="page-title">${source.name}</h1>
            <span class="badge badge-success">${source.status}</span>
            <span class="badge badge-info">${source.access}</span>
          </div>
          <p class="page-description">Source ID: <code>${source.id}</code> • Entity: <strong>${source.entity}</strong> • Synced: ${source.lastSync}</p>
        </div>
        <div class="page-actions">
          <a href="#/data-foundation/discovery" class="btn btn-secondary">
            <span>🔍</span> Run Discovery
          </a>
          <a href="#/data-foundation/profiles" class="btn btn-secondary">
            <span>📊</span> Profile Data
          </a>
          <a href="#/data-foundation/mappings" class="btn btn-primary">
            <span>⚡</span> Open Schema Mapping →
          </a>
        </div>
      </div>

      <!-- 8-Tab Navigation (Section 8) -->
      <div class="tabs-nav" id="source-details-tabs">
        <button class="tab-btn active" onclick="window.unifySwitchTab(this, 'tab-overview')">Overview</button>
        <button class="tab-btn" onclick="window.unifySwitchTab(this, 'tab-schema')">Schema</button>
        <button class="tab-btn" onclick="window.unifySwitchTab(this, 'tab-objects')">Objects (${source.objectsCount})</button>
        <button class="tab-btn" onclick="window.unifySwitchTab(this, 'tab-access')">Access & Zero-Copy</button>
        <button class="tab-btn" onclick="window.unifySwitchTab(this, 'tab-profile')">Profile Stats</button>
        <button class="tab-btn" onclick="window.unifySwitchTab(this, 'tab-jobs')">Sync Jobs</button>
        <button class="tab-btn" onclick="window.unifySwitchTab(this, 'tab-lineage')">Source Lineage</button>
        <button class="tab-btn" onclick="window.unifySwitchTab(this, 'tab-settings')">Settings</button>
      </div>

      <!-- TAB 1: Overview -->
      <div class="tab-content-pane" id="tab-overview">
        <div class="grid-3" style="margin-bottom: 20px;">
          <div class="kpi-card">
            <span class="kpi-label">Virtual Records</span>
            <div class="kpi-value">${source.records}</div>
            <div class="kpi-delta positive"><span>●</span> Zero-copy query pushdown</div>
          </div>
          <div class="kpi-card">
            <span class="kpi-label">API Latency</span>
            <div class="kpi-value">${source.latency}</div>
            <div class="kpi-delta positive"><span>⚡</span> High throughput tier</div>
          </div>
          <div class="kpi-card">
            <span class="kpi-label">Connection Health</span>
            <div class="kpi-value" style="color: #34d399;">${source.health}</div>
            <div class="kpi-delta positive"><span>✓</span> 0 connection dropouts</div>
          </div>
        </div>

        <div class="grid-2">
          <div class="card">
            <h3 style="font-size: 14px; font-weight: 600; color: #fff; margin-bottom: 12px;">Connection Metadata</h3>
            <table style="width: 100%; border-collapse: collapse; font-size: 12.5px;">
              <tr style="border-bottom: 1px solid var(--border-subtle);"><td style="padding: 8px 0; color: var(--text-muted);">Connector Provider</td><td style="color: #fff;">Enterprise Zero-Copy Adapter</td></tr>
              <tr style="border-bottom: 1px solid var(--border-subtle);"><td style="padding: 8px 0; color: var(--text-muted);">Endpoint Host</td><td style="font-family: var(--font-mono); color: #fff;">salesforce.us-east.enterprise</td></tr>
              <tr style="border-bottom: 1px solid var(--border-subtle);"><td style="padding: 8px 0; color: var(--text-muted);">Authorization Mode</td><td style="color: #38bdf8;">OAuth 2.0 JWT Bearer</td></tr>
              <tr style="border-bottom: 1px solid var(--border-subtle);"><td style="padding: 8px 0; color: var(--text-muted);">Assigned Domain</td><td style="color: #c084fc;">Customer (MDM Canonical)</td></tr>
              <tr><td style="padding: 8px 0; color: var(--text-muted);">Change Data Capture</td><td style="color: #34d399;">Active • Real-time Pub/Sub</td></tr>
            </table>
          </div>

          <div class="card">
            <h3 style="font-size: 14px; font-weight: 600; color: #fff; margin-bottom: 12px;">Next Actions</h3>
            <p style="font-size: 12px; color: var(--text-secondary); margin-bottom: 14px;">
              This source is actively participating in entity resolution for <strong>Customer Standard v4</strong>.
            </p>
            <div style="display: flex; flex-direction: column; gap: 8px;">
              <a href="#/data-foundation/discovery" class="btn btn-secondary" style="justify-content: flex-start;">
                <span>🔍</span> Review Discovered Semantic Fields
              </a>
              <a href="#/data-foundation/mappings" class="btn btn-secondary" style="justify-content: flex-start;">
                <span>⚡</span> Verify AI Field Mappings (7 Active)
              </a>
              <a href="#/data-foundation/profiles" class="btn btn-secondary" style="justify-content: flex-start;">
                <span>📊</span> View Null Rates & Completeness Profiles
              </a>
            </div>
          </div>
        </div>
      </div>

      <!-- TAB 2: Schema -->
      <div class="tab-content-pane" id="tab-schema" style="display: none;">
        <div class="table-card">
          <div class="table-toolbar">
            <span style="font-weight: 600; color: #fff;">Salesforce Account Discovered Schema</span>
            <span class="badge badge-info">46 Columns</span>
          </div>
          <table class="data-table">
            <thead>
              <tr>
                <th>Column Name</th>
                <th>Physical Type</th>
                <th>Nullable</th>
                <th>Semantic Role</th>
                <th>Canonical Mapping</th>
              </tr>
            </thead>
            <tbody>
              <tr><td class="cell-mono cell-highlight">Id</td><td>string(18)</td><td>No</td><td>Primary Key</td><td><span class="badge badge-success">account.identifier</span></td></tr>
              <tr><td class="cell-mono cell-highlight">Name</td><td>string(255)</td><td>No</td><td>Organization Name</td><td><span class="badge badge-success">organization.name</span></td></tr>
              <tr><td class="cell-mono cell-highlight">BillingStreet</td><td>string(255)</td><td>Yes</td><td>Address Line</td><td><span class="badge badge-success">address.line1</span></td></tr>
              <tr><td class="cell-mono cell-highlight">BillingCity</td><td>string(40)</td><td>Yes</td><td>City Name</td><td><span class="badge badge-success">address.city</span></td></tr>
              <tr><td class="cell-mono cell-highlight">Phone</td><td>phone</td><td>Yes</td><td>Primary Phone</td><td><span class="badge badge-success">contact.phone</span></td></tr>
              <tr><td class="cell-mono cell-highlight">Website</td><td>url</td><td>Yes</td><td>Web URL</td><td><span class="badge badge-success">organization.website</span></td></tr>
            </tbody>
          </table>
        </div>
      </div>

      <!-- Other tabs placeholder panes with clean structure -->
      <div class="tab-content-pane" id="tab-objects" style="display: none;">
        <div class="card">
          <h3 style="font-size: 14px; font-weight: 600; color: #fff; margin-bottom: 8px;">Active Integrated Objects</h3>
          <p style="font-size: 12px; color: var(--text-secondary); margin-bottom: 14px;">Virtual query pushdown enabled for the following tables:</p>
          <div class="grid-2">
            <div style="padding: 12px; border: 1px solid var(--border-default); border-radius: 6px;">
              <strong>Account</strong>: 2,048,190 records (Customer Domain)
            </div>
            <div style="padding: 12px; border: 1px solid var(--border-default); border-radius: 6px;">
              <strong>Contact</strong>: 4,192,000 records (Individual Stakeholders)
            </div>
          </div>
        </div>
      </div>

      <div class="tab-content-pane" id="tab-access" style="display: none;">
        <div class="card">
          <h3 style="font-size: 14px; font-weight: 600; color: #fff; margin-bottom: 8px;">Zero-Copy Virtualization Architecture</h3>
          <p style="font-size: 12px; color: var(--text-secondary);">
            Queries executed against this source are federated directly using zero-copy predicates. No operational data is stored on disk outside of volatile join caches.
          </p>
        </div>
      </div>

      <div class="tab-content-pane" id="tab-profile" style="display: none;">
        <div class="card">
          <h3 style="font-size: 14px; font-weight: 600; color: #fff; margin-bottom: 8px;">Source Data Profile</h3>
          <p style="font-size: 12px; color: var(--text-secondary); margin-bottom: 12px;">Completeness: 97.4% • Uniqueness: 88.2% • Validity: 98.7%</p>
          <a href="#/data-foundation/profiles" class="btn btn-secondary btn-sm">Open Deep Profiler →</a>
        </div>
      </div>

      <div class="tab-content-pane" id="tab-jobs" style="display: none;">
        <div class="card">
          <h3 style="font-size: 14px; font-weight: 600; color: #fff; margin-bottom: 8px;">Active CDC Execution Jobs</h3>
          <p style="font-size: 12px; color: var(--text-secondary); margin-bottom: 12px;">Job <code>job-9821</code> is streaming live updates (14,209 changes in last 10m).</p>
          <a href="#/operations/jobs" class="btn btn-secondary btn-sm">View Jobs Registry →</a>
        </div>
      </div>

      <div class="tab-content-pane" id="tab-lineage" style="display: none;">
        <div class="card">
          <h3 style="font-size: 14px; font-weight: 600; color: #fff; margin-bottom: 8px;">Source-to-Consumer Lineage Flow</h3>
          <p style="font-size: 12px; color: var(--text-secondary); margin-bottom: 12px;">Salesforce CRM → Field Standardization #12 → Entity Matcher → Golden Customer CUST-00192837</p>
          <a href="#/governance/lineage" class="btn btn-secondary btn-sm">Inspect Interactive Lineage Graph →</a>
        </div>
      </div>

      <div class="tab-content-pane" id="tab-settings" style="display: none;">
        <div class="card">
          <h3 style="font-size: 14px; font-weight: 600; color: #fff; margin-bottom: 8px;">Connector Settings & Security</h3>
          <div class="form-group" style="max-width: 400px; margin-top: 14px;">
            <label class="form-label">Query Timeout (Seconds)</label>
            <input type="number" class="form-input" value="30">
          </div>
          <button class="btn btn-danger btn-sm" onclick="alert('Disabled for demo safety.')">Disconnect Source</button>
        </div>
      </div>
    </div>
  `;
  }


  // ==================== src/pages/dataFoundation/discovery.js ====================
  // Page 9: Data Discovery (Route: /data-foundation/discovery)
  async function renderDiscoveryPage() {
    const datasets = await repository.getDiscoveredDatasets();

    return `
    <div class="page-container">
      <div style="margin-bottom: 12px;">
        ${renderBreadcrumbs([
      { label: 'Data Foundation', route: '#/data-foundation/sources' },
      { label: 'Data Discovery', route: '#/data-foundation/discovery' }
    ])}
      </div>

      <div class="page-header">
        <div class="page-title-group">
          <h1 class="page-title">Automated Semantic Data Discovery</h1>
          <p class="page-description">AI continuously analyzes source schemas, identifies potential canonical entities, detects PII, and quantifies duplicate clusters.</p>
        </div>
        <div class="page-actions">
          <button class="btn btn-secondary" onclick="alert('Discovery scan started on all connected sources.')">
            <span>⚡</span> Trigger Discovery Scan
          </button>
          <a href="#/data-foundation/mappings" class="btn btn-primary">
            <span>→</span> Advance to Schema Mapping
          </a>
        </div>
      </div>

      <!-- Discovered Entities Grid (Section 9) -->
      <div style="display: flex; flex-direction: column; gap: 16px;">
        ${datasets.map(d => `
          <div class="card" style="border-left: 4px solid ${d.suggestedDomain === 'Customer' ? 'var(--primary)' : 'var(--secondary)'};">
            <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 14px; flex-wrap: wrap; gap: 10px;">
              <div>
                <div style="display: flex; align-items: center; gap: 8px;">
                  <h3 style="font-size: 16px; font-weight: 700; color: #fff;">${d.title}</h3>
                  <span class="badge-triad badge-ai-rec">AI IDENTIFIED</span>
                  <span class="badge badge-info">${d.suggestedDomain} Domain</span>
                </div>
                <div style="font-size: 12px; color: var(--text-muted); margin-top: 3px;">
                  Identified across: <strong>${d.source}</strong> • Confidence: <span style="color: #a855f7; font-weight: 600;">${d.confidence}</span>
                </div>
              </div>

              <div style="display: flex; gap: 8px;">
                <a href="#/data-foundation/mappings" class="btn btn-primary btn-sm">
                  Review & Map Schema →
                </a>
              </div>
            </div>

            <div class="grid-3" style="margin-bottom: 14px; background: var(--bg-card-subtle); padding: 12px; border-radius: var(--radius-md);">
              <div>
                <div style="font-size: 11px; color: var(--text-muted); text-transform: uppercase;">Volume</div>
                <div style="font-size: 16px; font-weight: 700; color: #fff; font-family: var(--font-mono);">${d.records} records</div>
                <div style="font-size: 11px; color: var(--text-dim);">${d.columns} detected columns</div>
              </div>

              <div>
                <div style="font-size: 11px; color: var(--text-muted); text-transform: uppercase;">Candidate Identifiers</div>
                <div style="display: flex; flex-wrap: wrap; gap: 4px; margin-top: 4px;">
                  ${d.identifiers.map(id => `<span class="badge badge-neutral cell-mono" style="font-size: 10.5px;">${id}</span>`).join('')}
                </div>
              </div>

              <div>
                <div style="font-size: 11px; color: var(--text-muted); text-transform: uppercase;">PII & Duplicate Risk</div>
                <div style="font-size: 12.5px; font-weight: 600; color: #fbbf24;">${d.duplicatesEstimate}</div>
                <div style="font-size: 11px; color: var(--text-secondary); margin-top: 2px;">
                  PII: ${d.piiFields.join(', ')}
                </div>
              </div>
            </div>

            <div style="display: flex; justify-content: space-between; align-items: center; font-size: 12px; color: var(--text-secondary);">
              <span>AI Recommendation: Map to canonical <code>Customer</code> entity model and apply E.164 phone standardizer.</span>
              <span class="badge badge-success">${d.status}</span>
            </div>
          </div>
        `).join('')}
      </div>
    </div>
  `;
  }


  // ==================== src/pages/dataFoundation/mapping.js ====================
  // Page 10: AI Schema Mapping Studio (Route: /data-foundation/mappings)
  async function renderMappingPage() {
    const mappings = await repository.getSchemaMappings();
    const highConfidenceCount = mappings.filter(m => m.confidence >= 95 && m.triadStatus !== 'USER DECISION').length;

    return `
    <div class="page-container">
      <div style="margin-bottom: 12px;">
        ${renderBreadcrumbs([
      { label: 'Data Foundation', route: '#/data-foundation/sources' },
      { label: 'Schema Mapping Studio', route: '#/data-foundation/mappings' }
    ])}
      </div>

      <div class="page-header">
        <div class="page-title-group">
          <div style="display: flex; align-items: center; gap: 8px;">
            <h1 class="page-title">AI Schema Mapping Workspace</h1>
            <span class="badge badge-info">Zero-Copy Virtual Schema</span>
          </div>
          <p class="page-description">Align source fields into the enterprise canonical customer model. Review AI confidence explanations and record governance decisions.</p>
        </div>
        <div class="page-actions">
          <button class="btn btn-secondary" onclick="window.unifyExplainMappingAI()">
            <span>✦</span> Ask AI Why?
          </button>
          <button class="btn btn-primary" onclick="window.unifyAcceptAllMappings()" ${highConfidenceCount === 0 ? 'disabled' : ''}>
            <span>✓</span> Accept All High Confidence (${highConfidenceCount})
          </button>
          <a href="#/data-foundation/profiles" class="btn btn-secondary">
            <span>Next: Profiles →</span>
          </a>
        </div>
      </div>

      <!-- UX Triad Legend (Section 51) -->
      <div style="margin-bottom: 16px; padding: 10px 16px; background: var(--bg-card-subtle); border: 1px solid var(--border-subtle); border-radius: var(--radius-md); display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 10px;">
        <div style="display: flex; align-items: center; gap: 16px; font-size: 11.5px;">
          <span style="font-weight: 600; color: #fff;">Governance Status:</span>
          <span class="badge-triad badge-ai-rec">AI RECOMMENDATION (Pending Review)</span>
          <span class="badge-triad badge-user-decision">USER DECISION (Certified by Steward)</span>
          <span class="badge-triad badge-system-fact">SYSTEM FACT (Physical Constraint)</span>
        </div>
        <span style="font-size: 11px; color: var(--text-muted);">Source: <strong>Salesforce CRM (Account)</strong> ➔ Target: <strong>Canonical Customer</strong></span>
      </div>

      <!-- Mapping 3-Column Studio Layout (Section 10) -->
      <div class="table-card">
        <div class="table-toolbar">
          <div style="display: flex; gap: 8px; align-items: center;">
            <span style="font-weight: 600; color: #fff; font-size: 13px;">Field Alignments</span>
            <span class="badge badge-neutral">${mappings.length} Fields Mapped</span>
          </div>
          <span style="font-size: 12px; color: var(--text-muted);">Average Match Confidence: <strong style="color: #38bdf8;">96.6%</strong></span>
        </div>

        <div class="data-table-container">
          <table class="data-table">
            <thead>
              <tr>
                <th style="width: 25%;">Source Field (Salesforce Account)</th>
                <th style="width: 20%; text-align: center;">AI Confidence & Reasoning</th>
                <th style="width: 25%;">Target Canonical Field</th>
                <th style="width: 15%;">Governance State</th>
                <th style="width: 15%; text-align: right;">Steward Action</th>
              </tr>
            </thead>
            <tbody id="mappings-table-body">
              ${mappings.map(m => `
                <tr id="row-${m.id}">
                  <td>
                    <div style="font-weight: 600; color: #fff; font-family: var(--font-mono);">${m.sourceField}</div>
                    <div style="font-size: 11px; color: var(--text-muted);">Type: ${m.sourceType} • Sample: <span style="color: #cbd5e1;">"${m.sourceSample}"</span></div>
                  </td>

                  <td style="text-align: center;">
                    <div style="display: flex; flex-direction: column; align-items: center; gap: 4px;">
                      <span style="font-size: 13px; font-weight: 700; color: ${m.confidence >= 95 ? '#34d399' : '#fbbf24'}; font-family: var(--font-mono);">
                        ${m.confidence}%
                      </span>
                      <div class="bar-track" style="width: 90px; height: 4px;">
                        <div class="bar-fill ${m.confidence >= 95 ? 'bar-fill-success' : 'bar-fill-warning'}" style="width: ${m.confidence}%;"></div>
                      </div>
                      <button class="btn btn-ghost btn-sm" onclick="alert('${m.reasoning.replace(/'/g, "\\'")}')" style="font-size: 10px; padding: 1px 4px; color: #a5b4fc;">
                        Why? ✦
                      </button>
                    </div>
                  </td>

                  <td>
                    <div style="font-weight: 600; color: #38bdf8; font-family: var(--font-mono);">${m.canonicalField}</div>
                    <div style="font-size: 11px; color: var(--text-muted);">Target Type: ${m.canonicalType}</div>
                  </td>

                  <td>
                    <span class="badge-triad ${m.triadStatus === 'USER DECISION' ? 'badge-user-decision' : 'badge-ai-rec'}">
                      ${m.triadStatus}
                    </span>
                    ${m.decidedBy ? `<div style="font-size: 10.5px; color: var(--text-muted); margin-top: 3px;">By: ${m.decidedBy}</div>` : ''}
                  </td>

                  <td style="text-align: right;">
                    ${m.triadStatus === 'USER DECISION' ? `
                      <span style="color: #34d399; font-size: 12px; font-weight: 600;">✓ Accepted</span>
                      <button class="btn btn-ghost btn-sm" onclick="window.unifyResetMapping('${m.id}')" style="font-size: 10.5px; margin-left: 4px;">Reset</button>
                    ` : `
                      <div style="display: inline-flex; gap: 4px;">
                        <button class="btn btn-success btn-sm" onclick="window.unifyAcceptMapping('${m.id}')">Accept</button>
                        <button class="btn btn-ghost btn-sm" onclick="alert('Mapping edit interface opened for ${m.sourceField}.')">Edit</button>
                      </div>
                    `}
                  </td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  `;
  }


  // ==================== src/pages/dataFoundation/profiles.js ====================
  // Page 11: Data Profiles (Route: /data-foundation/profiles)
  async function renderProfilesPage() {
    const profiles = await repository.getDataProfiles();

    return `
    <div class="page-container">
      <div style="margin-bottom: 12px;">
        ${renderBreadcrumbs([
      { label: 'Data Foundation', route: '#/data-foundation/sources' },
      { label: 'Data Profiles', route: '#/data-foundation/profiles' }
    ])}
      </div>

      <div class="page-header">
        <div class="page-title-group">
          <h1 class="page-title">Semantic Attribute Profiling</h1>
          <p class="page-description">Statistical distribution analysis, null rates, uniqueness cardinality, and candidate duplicate clusters across unified sources.</p>
        </div>
        <div class="page-actions">
          <button class="btn btn-secondary" onclick="alert('Profile refresh job queued.')">
            <span>🔄</span> Refresh Profiles
          </button>
          <a href="#/data-quality" class="btn btn-primary">
            <span>Next: Data Quality →</span>
          </a>
        </div>
      </div>

      <!-- High Level Profiling KPIs -->
      <div class="kpi-grid">
        <div class="kpi-card">
          <span class="kpi-label">Evaluated Records</span>
          <div class="kpi-value">42.8M</div>
          <div class="kpi-delta positive"><span>●</span> Across 4 sources</div>
        </div>
        <div class="kpi-card">
          <span class="kpi-label">Average Completeness</span>
          <div class="kpi-value" style="color: #34d399;">96.8%</div>
          <div class="kpi-delta positive"><span>↑ +1.1%</span> vs last month</div>
        </div>
        <div class="kpi-card">
          <span class="kpi-label">Average Validity</span>
          <div class="kpi-value" style="color: #38bdf8;">97.2%</div>
          <div class="kpi-delta positive"><span>✓</span> ISO & RFC format compliant</div>
        </div>
        <div class="kpi-card">
          <span class="kpi-label">Candidate Duplicates</span>
          <div class="kpi-value" style="color: #fbbf24;">14.2%</div>
          <div class="kpi-delta" style="color: #fbbf24;"><span>⚡</span> ~1.43M cluster pairs</div>
        </div>
      </div>

      <!-- Attribute Profiling Table (Section 11) -->
      <div class="table-card">
        <div class="table-toolbar">
          <span style="font-weight: 600; color: #fff; font-size: 13px;">Canonical Attribute Statistical Profiles</span>
          <span class="badge badge-info">Zero-Copy Pushdown Compute</span>
        </div>

        <div class="data-table-container">
          <table class="data-table">
            <thead>
              <tr>
                <th>Attribute Name</th>
                <th style="width: 180px;">Completeness</th>
                <th style="width: 180px;">Uniqueness</th>
                <th style="width: 180px;">Validity</th>
                <th style="text-align: right;">Null Rate</th>
                <th>Sample Cardinality Values</th>
                <th style="text-align: right;">Action</th>
              </tr>
            </thead>
            <tbody>
              ${profiles.map(p => `
                <tr>
                  <td class="cell-highlight cell-mono">${p.attribute}</td>
                  
                  <td>
                    <div style="display: flex; justify-content: space-between; font-size: 11px; margin-bottom: 2px;">
                      <span>${p.completeness}%</span>
                    </div>
                    <div class="bar-track">
                      <div class="bar-fill bar-fill-success" style="width: ${p.completeness}%;"></div>
                    </div>
                  </td>

                  <td>
                    <div style="display: flex; justify-content: space-between; font-size: 11px; margin-bottom: 2px;">
                      <span>${p.uniqueness}%</span>
                    </div>
                    <div class="bar-track">
                      <div class="bar-fill bar-fill-primary" style="width: ${p.uniqueness}%;"></div>
                    </div>
                  </td>

                  <td>
                    <div style="display: flex; justify-content: space-between; font-size: 11px; margin-bottom: 2px;">
                      <span>${p.validity}%</span>
                    </div>
                    <div class="bar-track">
                      <div class="bar-fill bar-fill-success" style="width: ${p.validity}%;"></div>
                    </div>
                  </td>

                  <td style="text-align: right; font-family: var(--font-mono); color: ${p.nullRate === '0.0%' ? '#34d399' : '#fbbf24'};">
                    ${p.nullRate}
                  </td>

                  <td style="font-size: 11px; color: var(--text-muted);">
                    ${p.samples.join(', ')}
                  </td>

                  <td style="text-align: right;">
                    <button class="btn btn-ghost btn-sm" onclick="alert('Viewing distribution histogram for ${p.attribute}')">
                      Histogram 📊
                    </button>
                  </td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  `;
  }


  // ==================== src/pages/dataQuality/dqOverview.js ====================
  // Page 12: Data Quality Overview (Route: /data-quality)
  async function renderDqOverviewPage() {
    const rules = await repository.getDQRules();
    const issues = await repository.getDQIssues();

    return `
    <div class="page-container">
      <div style="margin-bottom: 12px;">
        ${renderBreadcrumbs([
      { label: 'Data Quality', route: '#/data-quality' },
      { label: 'Overview', route: '#/data-quality' }
    ])}
      </div>

      <div class="page-header">
        <div class="page-title-group">
          <div style="display: flex; align-items: center; gap: 8px;">
            <h1 class="page-title">Enterprise Data Quality Hub</h1>
            <span class="badge badge-success">Automated Enforcement</span>
          </div>
          <p class="page-description">Continuous rule execution, anomaly detection, completeness scoring, and steward remediation queues.</p>
        </div>
        <div class="page-actions">
          <a href="#/data-quality/rules/new" class="btn btn-secondary">
            <span>+</span> Create Rule
          </a>
          <a href="#/data-quality/issues" class="btn btn-primary">
            <span>⚠️</span> View Issues (${issues.length})
          </a>
          <a href="#/unification/match-strategies" class="btn btn-secondary">
            <span>Next: Matching →</span>
          </a>
        </div>
      </div>

      <!-- KPI Cards (Section 12) -->
      <div class="kpi-grid">
        <div class="kpi-card">
          <span class="kpi-label">Overall Quality</span>
          <div class="kpi-value" style="color: #38bdf8;">94.2%</div>
          <div class="kpi-delta positive"><span>↑ +0.8%</span> this sprint</div>
        </div>
        <div class="kpi-card">
          <span class="kpi-label">Completeness</span>
          <div class="kpi-value">96.8%</div>
          <div class="kpi-delta positive"><span>●</span> Critical identifiers present</div>
        </div>
        <div class="kpi-card">
          <span class="kpi-label">Validity</span>
          <div class="kpi-value">97.2%</div>
          <div class="kpi-delta positive"><span>✓</span> RFC/ISO compliant</div>
        </div>
        <div class="kpi-card">
          <span class="kpi-label">Consistency</span>
          <div class="kpi-value">91.5%</div>
          <div class="kpi-delta positive"><span>↑ +3.2%</span> cross-source alignment</div>
        </div>
        <div class="kpi-card" style="border-color: rgba(239, 68, 68, 0.4);">
          <span class="kpi-label">DQ Issues Flagged</span>
          <div class="kpi-value" style="color: #f87171;">${issues.length} Critical</div>
          <div class="kpi-delta" style="color: #f87171;"><span>⚠ Requires Triage</span></div>
        </div>
      </div>

      <div class="grid-2" style="margin-bottom: 20px;">
        <!-- Quality by Source Breakdown -->
        <div class="card">
          <h3 style="font-size: 14px; font-weight: 600; color: #fff; margin-bottom: 14px;">Quality Score by Source</h3>
          <div style="display: flex; flex-direction: column; gap: 12px;">
            <div>
              <div style="display: flex; justify-content: space-between; font-size: 12px; margin-bottom: 4px;">
                <span>Salesforce CRM (Account & Contact)</span>
                <span class="cell-mono" style="color: #38bdf8;">96.4%</span>
              </div>
              <div class="bar-track"><div class="bar-fill bar-fill-primary" style="width: 96.4%;"></div></div>
            </div>

            <div>
              <div style="display: flex; justify-content: space-between; font-size: 12px; margin-bottom: 4px;">
                <span>SAP ERP S/4HANA (Customer)</span>
                <span class="cell-mono" style="color: #34d399;">98.2%</span>
              </div>
              <div class="bar-track"><div class="bar-fill bar-fill-success" style="width: 98.2%;"></div></div>
            </div>

            <div>
              <div style="display: flex; justify-content: space-between; font-size: 12px; margin-bottom: 4px;">
                <span>PostgreSQL Billing Database</span>
                <span class="cell-mono" style="color: #fbbf24;">91.0%</span>
              </div>
              <div class="bar-track"><div class="bar-fill bar-fill-warning" style="width: 91%;"></div></div>
            </div>
          </div>
        </div>

        <!-- Recent Critical Issues Mini List -->
        <div class="card">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px;">
            <h3 style="font-size: 14px; font-weight: 600; color: #fff;">Active DQ Issues</h3>
            <a href="#/data-quality/issues" class="btn btn-ghost btn-sm" style="font-size: 11px;">View All →</a>
          </div>

          <div style="display: flex; flex-direction: column; gap: 10px;">
            ${issues.map(iss => `
              <div style="padding: 10px; background: var(--bg-card-subtle); border: 1px solid var(--border-subtle); border-radius: 6px; display: flex; justify-content: space-between; align-items: center;">
                <div>
                  <div style="display: flex; align-items: center; gap: 6px;">
                    <span class="badge ${iss.severity === 'Error' ? 'badge-danger' : 'badge-warning'}">${iss.severity}</span>
                    <strong style="color: #fff; font-size: 12.5px;">${iss.rule}</strong>
                  </div>
                  <div style="font-size: 11px; color: var(--text-muted); margin-top: 3px;">
                    Record: <code>${iss.recordId}</code> • Invalid: <span style="color: #fca5a5;">"${iss.invalidValue}"</span>
                  </div>
                </div>
                <a href="#/data-quality/issues" class="btn btn-secondary btn-sm">Fix</a>
              </div>
            `).join('')}
          </div>
        </div>
      </div>

      <!-- Quick Rule Table -->
      <div class="table-card">
        <div class="table-toolbar">
          <span style="font-weight: 600; color: #fff; font-size: 13px;">Active DQ Rules</span>
          <a href="#/data-quality/rules" class="btn btn-ghost btn-sm">Manage Rules (${rules.length}) →</a>
        </div>
        <table class="data-table">
          <thead>
            <tr>
              <th>Rule Name</th>
              <th>Entity Model</th>
              <th>Attribute Target</th>
              <th>Rule Type</th>
              <th>Severity</th>
              <th>Failure Rate</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            ${rules.map(r => `
              <tr>
                <td class="cell-highlight">${r.name}</td>
                <td>${r.entity}</td>
                <td class="cell-mono">${r.attribute}</td>
                <td><span class="badge badge-neutral">${r.type}</span></td>
                <td><span class="badge ${r.severity === 'Error' ? 'badge-danger' : 'badge-warning'}">${r.severity}</span></td>
                <td class="cell-mono" style="color: ${r.failureRate === '0.6%' ? '#34d399' : '#fbbf24'};">${r.failureRate}</td>
                <td><span class="badge badge-success">${r.status}</span></td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      </div>
    </div>
  `;
  }


  // ==================== src/pages/dataQuality/dqRules.js ====================
  // Page 13: DQ Rules Registry (Route: /data-quality/rules)
  async function renderDqRulesPage() {
    const rules = await repository.getDQRules();

    return `
    <div class="page-container">
      <div style="margin-bottom: 12px;">
        ${renderBreadcrumbs([
      { label: 'Data Quality', route: '#/data-quality' },
      { label: 'Rules Registry', route: '#/data-quality/rules' }
    ])}
      </div>

      <div class="page-header">
        <div class="page-title-group">
          <h1 class="page-title">Data Quality Rules</h1>
          <p class="page-description">Declarative business validation, format integrity checks, and reference standards across canonical entities.</p>
        </div>
        <div class="page-actions">
          <a href="#/data-quality/rules/new" class="btn btn-primary">
            <span>+</span> Create New Rule
          </a>
        </div>
      </div>

      <div class="table-card">
        <div class="table-toolbar">
          <div style="display: flex; gap: 8px; align-items: center;">
            <input type="text" class="form-input" placeholder="Filter rules..." style="width: 220px; font-size: 12px; padding: 6px 10px;">
            <select class="form-select" style="font-size: 12px; padding: 6px 10px;">
              <option value="">All Entities</option>
              <option value="Customer">Customer</option>
            </select>
          </div>
          <span style="font-size: 12px; color: var(--text-muted);">${rules.length} Active Rules</span>
        </div>

        <div class="data-table-container">
          <table class="data-table">
            <thead>
              <tr>
                <th>Rule Name</th>
                <th>Entity Model</th>
                <th>Attribute Target</th>
                <th>Rule Type</th>
                <th>Severity</th>
                <th>Failure Rate</th>
                <th>Records Evaluated</th>
                <th>Status</th>
                <th style="text-align: right;">Action</th>
              </tr>
            </thead>
            <tbody>
              ${rules.map(r => `
                <tr>
                  <td class="cell-highlight"><strong>${r.name}</strong></td>
                  <td>${r.entity}</td>
                  <td class="cell-mono">${r.attribute}</td>
                  <td><span class="badge badge-neutral">${r.type}</span></td>
                  <td><span class="badge ${r.severity === 'Error' ? 'badge-danger' : 'badge-warning'}">${r.severity}</span></td>
                  <td class="cell-mono" style="color: ${r.failureRate === '0.6%' ? '#34d399' : '#fbbf24'};">${r.failureRate}</td>
                  <td class="cell-mono">${r.totalChecked}</td>
                  <td><span class="badge badge-success">${r.status}</span></td>
                  <td style="text-align: right;">
                    <a href="#/data-quality/rules/new" class="btn btn-ghost btn-sm">Edit</a>
                  </td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  `;
  }


  // ==================== src/pages/dataQuality/dqDesigner.js ====================
  // Page 14: DQ Rule Designer (Route: /data-quality/rules/new)
  async function renderDqDesignerPage() {
    return `
    <div class="page-container" style="max-width: 900px; margin: 0 auto;">
      <div style="margin-bottom: 12px;">
        ${renderBreadcrumbs([
      { label: 'Data Quality', route: '#/data-quality' },
      { label: 'Rules Registry', route: '#/data-quality/rules' },
      { label: 'New Rule Designer', route: '#/data-quality/rules/new' }
    ])}
      </div>

      <div class="page-header">
        <div class="page-title-group">
          <h1 class="page-title">DQ Rule Designer</h1>
          <p class="page-description">Design declarative validation constraints or use AI to synthesize rules from natural language specifications.</p>
        </div>
        <div class="page-actions">
          <button class="btn btn-ai" onclick="window.unifyGenerateRuleAI()">
            <span>✦</span> Generate Rule with AI
          </button>
        </div>
      </div>

      <div class="grid-2" style="align-items: flex-start;">
        <!-- Rule Configuration Form -->
        <div class="card">
          <h3 style="font-size: 14px; font-weight: 600; color: #fff; margin-bottom: 16px;">Rule Parameters</h3>

          <div class="form-group">
            <label class="form-label">Rule Title</label>
            <input type="text" class="form-input" id="rule-name" value="Corporate Tax ID Validation (GSTIN/EIN)">
          </div>

          <div class="grid-2">
            <div class="form-group">
              <label class="form-label">Canonical Entity</label>
              <select class="form-select" id="rule-entity">
                <option value="Customer">Customer</option>
                <option value="Product">Product</option>
                <option value="Supplier">Supplier</option>
              </select>
            </div>
            <div class="form-group">
              <label class="form-label">Attribute Target</label>
              <input type="text" class="form-input cell-mono" id="rule-attr" value="identifiers.tax_number">
            </div>
          </div>

          <div class="grid-2">
            <div class="form-group">
              <label class="form-label">Rule Type</label>
              <select class="form-select" id="rule-type">
                <option value="Format Regex">Format (Regex Pattern)</option>
                <option value="Required">Mandatory Field</option>
                <option value="Reference">Reference Lookup</option>
                <option value="Cross-Field">Cross-Field Logic</option>
              </select>
            </div>
            <div class="form-group">
              <label class="form-label">Severity Level</label>
              <select class="form-select" id="rule-severity">
                <option value="Error">Error (Block Golden Merge)</option>
                <option value="Warning">Warning (Route to Review)</option>
                <option value="Info">Info (Audit Log Only)</option>
              </select>
            </div>
          </div>

          <div class="form-group">
            <label class="form-label">Validation Condition Expression</label>
            <textarea class="form-textarea cell-mono" rows="3" id="rule-condition">matches(identifiers.tax_number, '^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$')</textarea>
          </div>

          <div style="display: flex; justify-content: flex-end; gap: 8px; margin-top: 14px;">
            <a href="#/data-quality/rules" class="btn btn-ghost">Cancel</a>
            <button class="btn btn-primary" onclick="alert('Rule validated and published to active policy engine!')">Save & Publish Rule</button>
          </div>
        </div>

        <!-- Live Impact Preview (Section 14) -->
        <div class="card" style="background: var(--bg-card-subtle);">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px;">
            <h3 style="font-size: 14px; font-weight: 600; color: #fff;">Live Execution Impact Preview</h3>
            <span class="badge badge-info">Zero-Copy Pushdown</span>
          </div>

          <div class="kpi-card" style="margin-bottom: 12px;">
            <span class="kpi-label">Records Affected in Candidate Pool</span>
            <div class="kpi-value">4,210,000</div>
            <div class="kpi-delta positive"><span>●</span> Tested across active sources</div>
          </div>

          <div class="kpi-card" style="margin-bottom: 12px;">
            <span class="kpi-label">Current Failure Rate</span>
            <div class="kpi-value" style="color: #fbbf24;">2.1%</div>
            <div class="kpi-delta" style="color: #fbbf24;"><span>⚠️ 88,410 invalid values</span></div>
          </div>

          <div style="background: var(--bg-input); padding: 12px; border-radius: var(--radius-md); border: 1px solid var(--border-default); font-size: 12px; color: var(--text-secondary);">
            <div style="font-weight: 600; color: #fff; margin-bottom: 4px;">Expected Impact:</div>
            Enforcing this rule will route <strong>88,410 invalid tax numbers</strong> to the Data Steward triage queue while preserving 4.12M compliant corporate entities for auto-matching.
          </div>
        </div>
      </div>
    </div>
  `;
  }


  // ==================== src/pages/dataQuality/dqIssues.js ====================
  // Page 15: DQ Issues Triage (Route: /data-quality/issues)
  async function renderDqIssuesPage() {
    const issues = await repository.getDQIssues();

    return `
    <div class="page-container">
      <div style="margin-bottom: 12px;">
        ${renderBreadcrumbs([
      { label: 'Data Quality', route: '#/data-quality' },
      { label: 'DQ Issues Triage', route: '#/data-quality/issues' }
    ])}
      </div>

      <div class="page-header">
        <div class="page-title-group">
          <h1 class="page-title">Data Quality Issues Remediation</h1>
          <p class="page-description">Triage non-compliant records flagged by active business rules. Accept AI corrections or execute steward overrides.</p>
        </div>
        <div class="page-actions">
          <a href="#/unification/match-strategies" class="btn btn-primary">
            <span>Next: Match Strategies →</span>
          </a>
        </div>
      </div>

      <div class="table-card">
        <div class="table-toolbar">
          <div style="display: flex; gap: 8px; align-items: center; flex-wrap: wrap;">
            <input type="text" class="form-input" placeholder="Search record ID..." style="width: 200px; padding: 6px 10px; font-size: 12px;">
            <select class="form-select" style="padding: 6px 10px; font-size: 12px;">
              <option value="">All Severities</option>
              <option value="Error">Error</option>
              <option value="Warning">Warning</option>
            </select>
            <select class="form-select" style="padding: 6px 10px; font-size: 12px;">
              <option value="">Status: Pending</option>
              <option value="Resolved">Resolved</option>
            </select>
          </div>
          <span style="font-size: 12px; color: var(--text-muted);">${issues.length} Issues Pending Triage</span>
        </div>

        <div class="data-table-container">
          <table class="data-table">
            <thead>
              <tr>
                <th>Record ID</th>
                <th>Entity Target</th>
                <th>Attribute & Violation</th>
                <th>Enforcing Rule</th>
                <th>Suggested Correction</th>
                <th>Status</th>
                <th style="text-align: right;">Steward Action</th>
              </tr>
            </thead>
            <tbody>
              ${issues.map(iss => `
                <tr id="issue-row-${iss.id}">
                  <td class="cell-mono cell-highlight">${iss.recordId}</td>
                  <td>${iss.entity}</td>
                  <td>
                    <div style="font-weight: 600; color: #fff; font-family: var(--font-mono);">${iss.attribute}</div>
                    <div style="font-size: 11px; color: #f87171; text-decoration: line-through;">"${iss.invalidValue}"</div>
                    <div style="font-size: 10.5px; color: var(--text-muted); margin-top: 2px;">${iss.reason}</div>
                  </td>
                  <td>
                    <span class="badge ${iss.severity === 'Error' ? 'badge-danger' : 'badge-warning'}">${iss.severity}</span>
                    <div style="font-size: 11.5px; color: #fff; margin-top: 3px;">${iss.rule}</div>
                  </td>
                  <td>
                    <div style="display: flex; align-items: center; gap: 6px;">
                      <span class="badge-triad ${iss.triadStatus === 'USER DECISION' ? 'badge-user-decision' : 'badge-ai-rec'}">${iss.triadStatus}</span>
                      <strong style="color: #34d399; font-family: var(--font-mono); font-size: 12px;">"${iss.suggestedCorrection}"</strong>
                    </div>
                  </td>
                  <td>
                    <span class="badge ${iss.status === 'Resolved' ? 'badge-success' : 'badge-warning'}">${iss.status}</span>
                  </td>
                  <td style="text-align: right;">
                    ${iss.status === 'Resolved' ? `
                      <span style="color: #34d399; font-size: 12px;">✓ Remediated</span>
                    ` : `
                      <div style="display: inline-flex; gap: 4px;">
                        <button class="btn btn-success btn-sm" onclick="window.unifyResolveIssue('${iss.id}', 'Resolved')">Accept AI</button>
                        <button class="btn btn-ghost btn-sm" onclick="alert('Manual override modal')">Override</button>
                      </div>
                    `}
                  </td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  `;
  }


  // ==================== src/pages/unification/unifOverview.js ====================
  // Page 16: Unification Overview & Funnel (Route: /unification)
  async function renderUnifOverviewPage() {
    return `
    <div class="page-container">
      <div style="margin-bottom: 12px;">
        ${renderBreadcrumbs([
      { label: 'Unification', route: '#/unification' },
      { label: 'Overview', route: '#/unification' }
    ])}
      </div>

      <div class="page-header">
        <div class="page-title-group">
          <div style="display: flex; align-items: center; gap: 8px;">
            <h1 class="page-title">Entity Unification & Resolution Engine</h1>
            <span class="badge badge-success">Zero-Copy Active</span>
          </div>
          <p class="page-description">High-scale deterministic and probabilistic identity resolution, AI disambiguation, and automated survivorship rules.</p>
        </div>
        <div class="page-actions">
          <a href="#/unification/match-strategies/new" class="btn btn-secondary">
            <span>+</span> Create Strategy
          </a>
          <button class="btn btn-primary" onclick="alert('Full Unification job queued on Spark/Databricks cluster.')">
            <span>⚡</span> Run Unification
          </button>
          <a href="#/unification/matches" class="btn btn-secondary">
            <span>→</span> Review Results
          </a>
        </div>
      </div>

      <!-- Funnel Metrics (Section 16) -->
      <div class="kpi-grid">
        <div class="kpi-card">
          <span class="kpi-label">Entities Processed</span>
          <div class="kpi-value">42.8M</div>
          <div class="kpi-delta positive"><span>●</span> Across all connectors</div>
        </div>
        <div class="kpi-card">
          <span class="kpi-label">Total Matches</span>
          <div class="kpi-value">24.6M</div>
          <div class="kpi-delta positive"><span>↑ 91.7%</span> resolution rate</div>
        </div>
        <div class="kpi-card">
          <span class="kpi-label">Auto Matches (≥95%)</span>
          <div class="kpi-value" style="color: #34d399;">22.5M</div>
          <div class="kpi-delta positive"><span>✓</span> Zero human touch needed</div>
        </div>
        <div class="kpi-card" style="border-color: rgba(245, 158, 11, 0.4);">
          <span class="kpi-label">Steward Reviews</span>
          <div class="kpi-value" style="color: #fbbf24;">1,284</div>
          <div class="kpi-delta" style="color: #fbbf24;"><span>⚠️ In Queue</span></div>
        </div>
        <div class="kpi-card">
          <span class="kpi-label">Golden Entities</span>
          <div class="kpi-value" style="color: #38bdf8;">18.2M</div>
          <div class="kpi-delta positive"><span>👑 Mastered records</span></div>
        </div>
      </div>

      <!-- Pipeline Visualization Flow (Section 16) -->
      <div class="card" style="margin-bottom: 20px;">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px;">
          <h3 style="font-size: 14px; font-weight: 600; color: #fff;">End-to-End Resolution Pipeline Stage Graph</h3>
          <span class="badge badge-info">Zero-Copy Pushdown Pipeline</span>
        </div>

        <div style="display: grid; grid-template-columns: repeat(5, 1fr); gap: 12px; text-align: center;">
          
          <div style="background: var(--bg-card-subtle); border: 1px solid var(--border-default); border-radius: var(--radius-md); padding: 14px;">
            <div style="font-size: 20px; margin-bottom: 6px;">🔌</div>
            <div style="font-weight: 600; color: #fff; font-size: 13px;">1. Sources</div>
            <div style="font-size: 11px; color: var(--text-muted); margin-top: 4px;">Salesforce, SAP, PG</div>
            <div class="badge badge-success" style="margin-top: 8px; font-size: 10px;">42.8M Recs</div>
          </div>

          <div style="background: var(--bg-card-subtle); border: 1px solid var(--border-default); border-radius: var(--radius-md); padding: 14px;">
            <div style="font-size: 20px; margin-bottom: 6px;">📐</div>
            <div style="font-weight: 600; color: #fff; font-size: 13px;">2. Standardization</div>
            <div style="font-size: 11px; color: var(--text-muted); margin-top: 4px;">Phone E.164, Country ISO</div>
            <div class="badge badge-info" style="margin-top: 8px; font-size: 10px;">Rule #12</div>
          </div>

          <div style="background: var(--bg-card-subtle); border: 1px solid var(--primary); border-radius: var(--radius-md); padding: 14px; box-shadow: 0 0 10px rgba(99,102,241,0.2);">
            <div style="font-size: 20px; margin-bottom: 6px;">⚡</div>
            <div style="font-weight: 600; color: #fff; font-size: 13px;">3. Matching</div>
            <div style="font-size: 11px; color: var(--text-muted); margin-top: 4px;">Exact, Fuzzy, AI Embed</div>
            <div class="badge badge-triad badge-ai-rec" style="margin-top: 8px; font-size: 10px;">Strategy v4</div>
          </div>

          <div style="background: var(--bg-card-subtle); border: 1px solid var(--border-default); border-radius: var(--radius-md); padding: 14px;">
            <div style="font-size: 20px; margin-bottom: 6px;">🛡️</div>
            <div style="font-weight: 600; color: #fff; font-size: 13px;">4. Survivorship</div>
            <div style="font-size: 11px; color: var(--text-muted); margin-top: 4px;">Most Recent & Trust Rank</div>
            <div class="badge badge-info" style="margin-top: 8px; font-size: 10px;">Rule #4</div>
          </div>

          <div style="background: var(--bg-card-subtle); border: 1px solid var(--secondary); border-radius: var(--radius-md); padding: 14px; box-shadow: 0 0 10px rgba(6,182,212,0.2);">
            <div style="font-size: 20px; margin-bottom: 6px;">👑</div>
            <div style="font-weight: 600; color: #fff; font-size: 13px;">5. Golden Records</div>
            <div style="font-size: 11px; color: var(--text-muted); margin-top: 4px;">Mastered Customer 360</div>
            <div class="badge badge-success" style="margin-top: 8px; font-size: 10px;">18.2M Mastered</div>
          </div>

        </div>
      </div>

      <!-- Quick Actions Grid -->
      <div class="grid-3">
        <a href="#/unification/match-strategies" class="card" style="text-decoration: none; transition: transform 0.2s;">
          <h3 style="color: #fff; font-size: 14px; margin-bottom: 4px;">Match Strategy Catalog</h3>
          <p style="font-size: 12px; color: var(--text-secondary);">Manage active rules, weights, and auto-match threshold tiers.</p>
          <div style="margin-top: 10px; color: var(--primary); font-size: 12px; font-weight: 600;">Configure Strategies →</div>
        </a>

        <a href="#/unification/simulations/sim-latest" class="card" style="text-decoration: none; transition: transform 0.2s;">
          <h3 style="color: #fff; font-size: 14px; margin-bottom: 4px;">Simulation Studio</h3>
          <p style="font-size: 12px; color: var(--text-secondary);">Compare proposed matching rules against production baselines.</p>
          <div style="margin-top: 10px; color: var(--secondary); font-size: 12px; font-weight: 600;">Run Benchmark Test →</div>
        </a>

        <a href="#/stewardship" class="card" style="text-decoration: none; transition: transform 0.2s;">
          <h3 style="color: #fff; font-size: 14px; margin-bottom: 4px;">Stewardship Review Queue</h3>
          <p style="font-size: 12px; color: var(--text-secondary);">Resolve 1,284 ambiguous pairs in the review threshold tier.</p>
          <div style="margin-top: 10px; color: #fbbf24; font-size: 12px; font-weight: 600;">Enter Queue (1,284) →</div>
        </a>
      </div>
    </div>
  `;
  }


  // ==================== src/pages/unification/matchStrategies.js ====================
  // Page 17: Match Strategies Catalog (Route: /unification/match-strategies)
  async function renderMatchStrategiesPage() {
    const strategies = await repository.getMatchStrategies();

    return `
    <div class="page-container">
      <div style="margin-bottom: 12px;">
        ${renderBreadcrumbs([
      { label: 'Unification', route: '#/unification' },
      { label: 'Match Strategies', route: '#/unification/match-strategies' }
    ])}
      </div>

      <div class="page-header">
        <div class="page-title-group">
          <h1 class="page-title">Entity Match Strategies</h1>
          <p class="page-description">Configure composite deterministic, fuzzy phonetic, and AI-assisted scoring strategies per canonical domain.</p>
        </div>
        <div class="page-actions">
          <a href="#/unification/match-strategies/new" class="btn btn-primary">
            <span>+</span> New Match Strategy
          </a>
        </div>
      </div>

      <div class="table-card">
        <div class="table-toolbar">
          <div style="display: flex; gap: 8px; align-items: center;">
            <input type="text" class="form-input" placeholder="Filter strategies..." style="width: 200px; padding: 6px 10px; font-size: 12px;">
            <select class="form-select" style="padding: 6px 10px; font-size: 12px;">
              <option value="">All Domains</option>
              <option value="Customer">Customer</option>
              <option value="Account">Account</option>
            </select>
          </div>
          <span style="font-size: 12px; color: var(--text-muted);">${strategies.length} Configured Strategies</span>
        </div>

        <div class="data-table-container">
          <table class="data-table">
            <thead>
              <tr>
                <th>Strategy Name</th>
                <th>Domain</th>
                <th>Version</th>
                <th style="text-align: right;">Auto Threshold</th>
                <th style="text-align: right;">Review Threshold</th>
                <th>Status</th>
                <th style="text-align: right;">Actions</th>
              </tr>
            </thead>
            <tbody>
              ${strategies.map(s => `
                <tr style="cursor: pointer;" onclick="window.location.hash='#/unification/match-strategies/new'">
                  <td class="cell-highlight">
                    <strong>${s.name}</strong>
                    <div style="font-size: 11px; color: var(--text-muted);">${s.description}</div>
                  </td>
                  <td><span class="badge badge-info">${s.domain}</span></td>
                  <td><span class="badge badge-neutral cell-mono">${s.version}</span></td>
                  <td class="cell-mono" style="text-align: right; color: #34d399; font-weight: 600;">≥ ${s.autoThreshold}%</td>
                  <td class="cell-mono" style="text-align: right; color: #fbbf24;">${s.reviewThreshold}% – ${s.autoThreshold - 0.1}%</td>
                  <td>
                    <span class="badge ${s.status === 'Active' ? 'badge-success' : 'badge-warning'}">${s.status}</span>
                  </td>
                  <td style="text-align: right;" onclick="event.stopPropagation()">
                    <div style="display: inline-flex; gap: 4px;">
                      <a href="#/unification/match-strategies/new" class="btn btn-secondary btn-sm">Edit</a>
                      <a href="#/unification/simulations/sim-latest" class="btn btn-ai btn-sm">Simulate</a>
                    </div>
                  </td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  `;
  }


  // ==================== src/pages/unification/strategyDesigner.js ====================
  // Page 18: 6-Step Match Strategy Designer (Route: /unification/match-strategies/new)
  async function renderStrategyDesignerPage() {
    return `
    <div class="page-container" style="max-width: 900px; margin: 0 auto;">
      <div style="margin-bottom: 12px;">
        ${renderBreadcrumbs([
      { label: 'Unification', route: '#/unification' },
      { label: 'Match Strategies', route: '#/unification/match-strategies' },
      { label: 'Strategy Designer', route: '#/unification/match-strategies/new' }
    ])}
      </div>

      <div class="page-header">
        <div class="page-title-group">
          <h1 class="page-title">Match Strategy Designer</h1>
          <p class="page-description">Configure multi-attribute weighted resolution logic combining exact, fuzzy phonetic, and AI embedding similarities.</p>
        </div>
        <div class="page-actions">
          <a href="#/unification/simulations/sim-latest" class="btn btn-ai">
            <span>⚡</span> Run Simulation Test
          </a>
        </div>
      </div>

      <!-- Strategy Parameters Card -->
      <div class="card" style="margin-bottom: 20px;">
        <div class="grid-2">
          <div class="form-group">
            <label class="form-label">Strategy Title</label>
            <input type="text" class="form-input" value="Customer Standard (Enterprise High-Precision)">
          </div>
          <div class="form-group">
            <label class="form-label">Target Canonical Entity</label>
            <select class="form-select">
              <option value="Customer">Customer (Canonical Master)</option>
              <option value="Account">Account (B2B)</option>
            </select>
          </div>
        </div>

        <div style="margin-top: 14px; padding-top: 14px; border-top: 1px solid var(--border-subtle);">
          <h4 style="font-size: 13px; font-weight: 600; color: #fff; margin-bottom: 12px;">Attribute Matching Matrix & Weight Allocations (Total: 100%)</h4>
          
          <table class="data-table" style="margin-bottom: 16px;">
            <thead>
              <tr>
                <th>Attribute</th>
                <th>Matching Method</th>
                <th>Comparison Algorithm</th>
                <th style="width: 140px; text-align: right;">Weight (%)</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td class="cell-mono cell-highlight">contact.email</td>
                <td><span class="badge badge-info">Exact</span></td>
                <td style="font-size: 12px; color: var(--text-secondary);">Case-insensitive domain-normalized match</td>
                <td style="text-align: right;" class="cell-mono"><strong>40%</strong></td>
              </tr>
              <tr>
                <td class="cell-mono cell-highlight">contact.phone</td>
                <td><span class="badge badge-info">Exact</span></td>
                <td style="font-size: 12px; color: var(--text-secondary);">Normalized E.164 country dial-code prefix match</td>
                <td style="text-align: right;" class="cell-mono"><strong>25%</strong></td>
              </tr>
              <tr>
                <td class="cell-mono cell-highlight">organization.name</td>
                <td><span class="badge badge-triad badge-ai-rec">AI + Fuzzy</span></td>
                <td style="font-size: 12px; color: var(--text-secondary);">Jaro-Winkler (0.92) + Legal Suffix Stripper (LLM)</td>
                <td style="text-align: right;" class="cell-mono"><strong>20%</strong></td>
              </tr>
              <tr>
                <td class="cell-mono cell-highlight">address.city</td>
                <td><span class="badge badge-neutral">Phonetic</span></td>
                <td style="font-size: 12px; color: var(--text-secondary);">Double Metaphone + ISO City Geographic Dictionary</td>
                <td style="text-align: right;" class="cell-mono"><strong>15%</strong></td>
              </tr>
            </tbody>
          </table>
        </div>

        <!-- Decision Threshold Sliders (Section 18 Step 5) -->
        <div style="background: var(--bg-card-subtle); padding: 16px; border-radius: var(--radius-md); border: 1px solid var(--border-default);">
          <h4 style="font-size: 13px; font-weight: 600; color: #fff; margin-bottom: 10px;">Decision Boundaries & Action Tiers</h4>
          
          <div style="display: flex; flex-direction: column; gap: 14px;">
            <div>
              <div style="display: flex; justify-content: space-between; font-size: 12px; margin-bottom: 4px;">
                <span style="color: #34d399; font-weight: 600;">Tier 1: Auto Match Threshold (≥95%)</span>
                <span class="cell-mono" style="color: #34d399;">Automatic Golden Record Resolution</span>
              </div>
              <div class="bar-track" style="height: 8px;"><div class="bar-fill bar-fill-success" style="width: 95%;"></div></div>
            </div>

            <div>
              <div style="display: flex; justify-content: space-between; font-size: 12px; margin-bottom: 4px;">
                <span style="color: #fbbf24; font-weight: 600;">Tier 2: Steward Review Bracket (85% – 94.9%)</span>
                <span class="cell-mono" style="color: #fbbf24;">Routes to Human Queue (1,284 pairs)</span>
              </div>
              <div class="bar-track" style="height: 8px;"><div class="bar-fill bar-fill-warning" style="width: 85%;"></div></div>
            </div>

            <div>
              <div style="display: flex; justify-content: space-between; font-size: 12px; margin-bottom: 4px;">
                <span style="color: var(--text-muted); font-weight: 600;">Tier 3: Non-Match (<85%)</span>
                <span class="cell-mono" style="color: var(--text-muted);">Maintained as Separate Distinct Entities</span>
              </div>
              <div class="bar-track" style="height: 8px;"><div class="bar-fill" style="width: 50%; background: var(--text-dim);"></div></div>
            </div>
          </div>
        </div>

        <div style="display: flex; justify-content: space-between; align-items: center; margin-top: 20px;">
          <a href="#/unification/match-strategies" class="btn btn-ghost">Cancel</a>
          <div style="display: flex; gap: 8px;">
            <button class="btn btn-secondary" onclick="alert('Strategy draft saved.')">Save as Draft</button>
            <a href="#/unification/simulations/sim-latest" class="btn btn-primary">
              Run Simulation Benchmark →
            </a>
          </div>
        </div>
      </div>
    </div>
  `;
  }


  // ==================== src/pages/unification/simulation.js ====================
  // Page 19: Match Simulation & Benchmarking (Route: /unification/simulations/:simulationId)
  async function renderSimulationPage() {
    return `
    <div class="page-container">
      <div style="margin-bottom: 12px;">
        ${renderBreadcrumbs([
      { label: 'Unification', route: '#/unification' },
      { label: 'Simulations', route: '#/unification/simulations/sim-latest' },
      { label: 'Simulation #SIM-9824', route: '#/unification/simulations/sim-latest' }
    ])}
      </div>

      <div class="page-header">
        <div class="page-title-group">
          <div style="display: flex; align-items: center; gap: 8px;">
            <h1 class="page-title">Match Simulation Benchmark</h1>
            <span class="badge badge-success">Completed (1M Records Evaluated)</span>
          </div>
          <p class="page-description">Comparative impact assessment of <strong>Customer Standard v4 (Proposed)</strong> vs <strong>v3 (Current Production)</strong>.</p>
        </div>
        <div class="page-actions">
          <button class="btn btn-secondary" onclick="alert('Draft saved.')">Save as Draft</button>
          <button class="btn btn-primary" onclick="alert('Strategy v4 published to active execution pipeline!')">Publish Strategy to Production</button>
          <a href="#/unification/matches" class="btn btn-secondary">Next: Match Results →</a>
        </div>
      </div>

      <!-- Comparative KPI Delta Grid (Section 19) -->
      <div class="kpi-grid">
        <div class="kpi-card">
          <span class="kpi-label">Sample Evaluated</span>
          <div class="kpi-value">1,000,000</div>
          <div class="kpi-delta positive"><span>●</span> Stratified enterprise slice</div>
        </div>

        <div class="kpi-card" style="border-color: rgba(16, 185, 129, 0.4);">
          <span class="kpi-label">Auto-Match Lift</span>
          <div class="kpi-value" style="color: #34d399;">+14.2%</div>
          <div class="kpi-delta positive"><span>↑ +142,000</span> additional auto merges</div>
        </div>

        <div class="kpi-card">
          <span class="kpi-label">Steward Review Load</span>
          <div class="kpi-value" style="color: #38bdf8;">-3.1%</div>
          <div class="kpi-delta positive"><span>↓ -31,000</span> fewer manual reviews</div>
        </div>

        <div class="kpi-card">
          <span class="kpi-label">False Positive Risk</span>
          <div class="kpi-value" style="color: #34d399;">< 0.04%</div>
          <div class="kpi-delta positive"><span>✓</span> Zero critical key conflicts</div>
        </div>
      </div>

      <!-- Side-by-Side Comparison Table -->
      <div class="grid-2" style="margin-bottom: 20px;">
        <div class="card">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px;">
            <h3 style="font-size: 14px; font-weight: 600; color: var(--text-muted);">Current Strategy (v3 Production)</h3>
            <span class="badge badge-neutral">Baseline</span>
          </div>
          <table style="width: 100%; border-collapse: collapse; font-size: 12.5px;">
            <tr style="border-bottom: 1px solid var(--border-subtle);"><td style="padding: 8px 0; color: var(--text-muted);">Auto Match Rate (≥95%)</td><td style="text-align: right; color: #fff;">77.5% (775,000)</td></tr>
            <tr style="border-bottom: 1px solid var(--border-subtle);"><td style="padding: 8px 0; color: var(--text-muted);">Steward Review Tier</td><td style="text-align: right; color: #fbbf24;">12.5% (125,000)</td></tr>
            <tr style="border-bottom: 1px solid var(--border-subtle);"><td style="padding: 8px 0; color: var(--text-muted);">Unmatched Remainder</td><td style="text-align: right; color: var(--text-dim);">10.0% (100,000)</td></tr>
            <tr><td style="padding: 8px 0; color: var(--text-muted);">Methodology</td><td style="text-align: right; color: var(--text-secondary);">Exact Email + Exact Phone only</td></tr>
          </table>
        </div>

        <div class="card" style="border-color: rgba(99, 102, 241, 0.4);">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px;">
            <h3 style="font-size: 14px; font-weight: 600; color: #fff;">Proposed Strategy (v4 with AI Disambiguation)</h3>
            <span class="badge badge-triad badge-ai-rec">SIMULATION RUN</span>
          </div>
          <table style="width: 100%; border-collapse: collapse; font-size: 12.5px;">
            <tr style="border-bottom: 1px solid var(--border-subtle);"><td style="padding: 8px 0; color: var(--text-muted);">Auto Match Rate (≥95%)</td><td style="text-align: right; color: #34d399; font-weight: 700;">91.7% (917,000)</td></tr>
            <tr style="border-bottom: 1px solid var(--border-subtle);"><td style="padding: 8px 0; color: var(--text-muted);">Steward Review Tier</td><td style="text-align: right; color: #38bdf8; font-weight: 600;">9.4% (94,000)</td></tr>
            <tr style="border-bottom: 1px solid var(--border-subtle);"><td style="padding: 8px 0; color: var(--text-muted);">Unmatched Remainder</td><td style="text-align: right; color: var(--text-dim);">8.9% (89,000)</td></tr>
            <tr><td style="padding: 8px 0; color: var(--text-muted);">Methodology</td><td style="text-align: right; color: #c084fc;">Weighted + Jaro-Winkler + Phone E.164</td></tr>
          </table>
        </div>
      </div>

      <!-- Sample Matches Evaluated in this Simulation -->
      <div class="table-card">
        <div class="table-toolbar">
          <span style="font-weight: 600; color: #fff;">Sample Match Pairs Resolved by Proposed Rules</span>
          <span class="badge badge-success">0 Conflicts Flagged</span>
        </div>
        <table class="data-table">
          <thead>
            <tr>
              <th>Source Record A</th>
              <th>Source Record B</th>
              <th>Calculated Confidence</th>
              <th>Old Decision (v3)</th>
              <th>New Decision (v4)</th>
              <th style="text-align: right;">Action</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <div style="font-weight: 600; color: #fff;">Robert Smith</div>
                <div style="font-size: 11px; color: var(--text-muted);">Salesforce CRM • CRM-10231</div>
              </td>
              <td>
                <div style="font-weight: 600; color: #fff;">Robert J Smith</div>
                <div style="font-size: 11px; color: var(--text-muted);">SAP ERP • ERP-88391</div>
              </td>
              <td class="cell-mono" style="color: #34d399; font-weight: 700;">96.7%</td>
              <td><span class="badge badge-warning">Review (Manual)</span></td>
              <td><span class="badge badge-success">Auto Match (≥95%)</span></td>
              <td style="text-align: right;">
                <a href="#/stewardship/reviews/match-101" class="btn btn-secondary btn-sm">Inspect Scoring →</a>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  `;
  }


  // ==================== src/pages/unification/matchResults.js ====================
  // Page 20: Match Results (Route: /unification/matches)
  async function renderMatchResultsPage() {
    const matches = await repository.getMatches();

    return `
    <div class="page-container">
      <div style="margin-bottom: 12px;">
        ${renderBreadcrumbs([
      { label: 'Unification', route: '#/unification' },
      { label: 'Match Results', route: '#/unification/matches' }
    ])}
      </div>

      <div class="page-header">
        <div class="page-title-group">
          <h1 class="page-title">Candidate Match Pairs & Resolution Results</h1>
          <p class="page-description">Inspect pairs evaluated across enterprise zero-copy sources. Click any row to review score breakdown and attribute survivorship.</p>
        </div>
        <div class="page-actions">
          <a href="#/stewardship" class="btn btn-primary">
            <span>⚖️</span> Open Stewardship Queue
          </a>
        </div>
      </div>

      <div class="table-card">
        <div class="table-toolbar">
          <div style="display: flex; gap: 8px; align-items: center; flex-wrap: wrap;">
            <input type="text" class="form-input" placeholder="Search record name, ID, or email..." style="width: 240px; padding: 6px 10px; font-size: 12px;">
            <select class="form-select" style="padding: 6px 10px; font-size: 12px;">
              <option value="">All Tiers</option>
              <option value="Auto Match">Auto Match (≥95%)</option>
              <option value="Review">Requires Review</option>
            </select>
            <select class="form-select" style="padding: 6px 10px; font-size: 12px;">
              <option value="">Strategy: Customer Standard v4</option>
            </select>
          </div>
          <span style="font-size: 12px; color: var(--text-muted);">${matches.length} Candidate Match Pairs</span>
        </div>

        <div class="data-table-container">
          <table class="data-table">
            <thead>
              <tr>
                <th>Source Record A</th>
                <th>Source Record B</th>
                <th style="text-align: center;">Confidence Score</th>
                <th>Resolution Status</th>
                <th>Applied Strategy</th>
                <th style="text-align: right;">Steward Action</th>
              </tr>
            </thead>
            <tbody>
              ${matches.map(m => `
                <tr style="cursor: pointer;" onclick="window.location.hash='#/stewardship/reviews/${m.id}'">
                  <td>
                    <div style="font-weight: 600; color: #fff;">${m.sourceA.name}</div>
                    <div style="font-size: 11px; color: var(--text-muted);">${m.sourceA.source} • <code class="cell-mono">${m.sourceA.id}</code></div>
                    <div style="font-size: 10.5px; color: var(--text-dim);">${m.sourceA.email} • ${m.sourceA.city}</div>
                  </td>

                  <td>
                    <div style="font-weight: 600; color: #fff;">${m.sourceB.name}</div>
                    <div style="font-size: 11px; color: var(--text-muted);">${m.sourceB.source} • <code class="cell-mono">${m.sourceB.id}</code></div>
                    <div style="font-size: 10.5px; color: var(--text-dim);">${m.sourceB.email} • ${m.sourceB.city}</div>
                  </td>

                  <td style="text-align: center;">
                    <span style="font-family: var(--font-mono); font-size: 15px; font-weight: 700; color: ${m.confidence >= 95 ? '#34d399' : '#fbbf24'};">
                      ${m.confidence}%
                    </span>
                    <div class="bar-track" style="width: 80px; margin: 4px auto 0;">
                      <div class="bar-fill ${m.confidence >= 95 ? 'bar-fill-success' : 'bar-fill-warning'}" style="width: ${m.confidence}%;"></div>
                    </div>
                  </td>

                  <td>
                    <span class="badge ${m.status.includes('Auto') ? 'badge-success' : 'badge-warning'}">
                      ${m.status}
                    </span>
                  </td>

                  <td style="font-size: 12px; color: var(--text-secondary);">${m.strategy}</td>

                  <td style="text-align: right;" onclick="event.stopPropagation()">
                    <a href="#/stewardship/reviews/${m.id}" class="btn btn-secondary btn-sm">
                      Inspect & Review →
                    </a>
                  </td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  `;
  }


  // ==================== src/pages/unification/goldenEntities.js ====================
  // Page 23: Golden Entities Catalog (Route: /unification/golden-entities)
  async function renderGoldenEntitiesPage() {
    const goldenList = await repository.getGoldenEntities();

    return `
    <div class="page-container">
      <div style="margin-bottom: 12px;">
        ${renderBreadcrumbs([
      { label: 'Unification', route: '#/unification' },
      { label: 'Golden Entities Master Catalog', route: '#/unification/golden-entities' }
    ])}
      </div>

      <div class="page-header">
        <div class="page-title-group">
          <div style="display: flex; align-items: center; gap: 8px;">
            <h1 class="page-title">Golden Records & Master Catalog</h1>
            <span class="badge badge-success">18.2M Mastered</span>
          </div>
          <p class="page-description">Single source of truth records produced from cross-system entity resolution, automated survivorship, and steward certification.</p>
        </div>
        <div class="page-actions">
          <a href="#/entity-360/search" class="btn btn-secondary">
            <span>🔍</span> Deep Entity Search
          </a>
          <a href="#/activation/data-products" class="btn btn-primary">
            <span>🚀</span> Export as Data Product
          </a>
        </div>
      </div>

      <div class="table-card">
        <div class="table-toolbar">
          <div style="display: flex; gap: 8px; align-items: center; flex-wrap: wrap;">
            <input type="text" class="form-input" placeholder="Search by name, email, phone, or Golden ID..." style="width: 280px; padding: 6px 10px; font-size: 12px;">
            <select class="form-select" style="padding: 6px 10px; font-size: 12px;">
              <option value="">All Domains</option>
              <option value="Customer">Customer</option>
            </select>
          </div>
          <span style="font-size: 12px; color: var(--text-muted);">18.2M Mastered Entities</span>
        </div>

        <div class="data-table-container">
          <table class="data-table">
            <thead>
              <tr>
                <th>Golden Entity ID</th>
                <th>Master Legal Name</th>
                <th>Domain</th>
                <th style="text-align: center;">Contributing Sources</th>
                <th style="text-align: center;">Resolution Confidence</th>
                <th>Last Survivorship Update</th>
                <th style="text-align: right;">360 Profile</th>
              </tr>
            </thead>
            <tbody>
              ${goldenList.map(g => `
                <tr style="cursor: pointer;" onclick="window.location.hash='#/entity-360/${g.id}'">
                  <td class="cell-mono cell-highlight" style="color: #38bdf8;">
                    <strong>👑 ${g.id}</strong>
                  </td>

                  <td>
                    <div style="font-weight: 600; color: #fff;">${g.name}</div>
                    <div style="font-size: 11px; color: var(--text-muted);">${g.attributes?.email?.value || ''}</div>
                  </td>

                  <td><span class="badge badge-info">${g.domain}</span></td>

                  <td style="text-align: center;">
                    <span class="badge badge-neutral" style="font-weight: 600;">
                      ${g.sourceCount} Sources Merged
                    </span>
                  </td>

                  <td style="text-align: center;">
                    <span class="cell-mono" style="color: #34d399; font-weight: 700;">${g.confidence}</span>
                  </td>

                  <td style="font-size: 12px; color: var(--text-muted);">${g.lastUpdated}</td>

                  <td style="text-align: right;" onclick="event.stopPropagation()">
                    <a href="#/entity-360/${g.id}" class="btn btn-secondary btn-sm">
                      View 360 Profile →
                    </a>
                  </td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  `;
  }


  // ==================== src/pages/stewardship/reviewQueue.js ====================
  // Page 22: Stewardship Queue (Route: /stewardship)
  async function renderReviewQueuePage() {
    const matches = await repository.getMatches();

    return `
    <div class="page-container">
      <div style="margin-bottom: 12px;">
        ${renderBreadcrumbs([
      { label: 'Stewardship', route: '#/stewardship' },
      { label: 'Review Queue', route: '#/stewardship' }
    ])}
      </div>

      <div class="page-header">
        <div class="page-title-group">
          <div style="display: flex; align-items: center; gap: 8px;">
            <h1 class="page-title">Data Steward Review Queue</h1>
            <span class="badge badge-warning">1,284 Pending Resolution</span>
          </div>
          <p class="page-description">Triage ambiguous match pairs, resolve conflicting survivorship claims, and certify enterprise identity merges.</p>
        </div>
        <div class="page-actions">
          <a href="#/stewardship/reviews/match-101" class="btn btn-primary">
            <span>⚖️</span> Open Match Review Studio (Robert Smith)
          </a>
        </div>
      </div>

      <!-- Queue Tabs (Section 22) -->
      <div class="tabs-nav">
        <button class="tab-btn active">High Priority (213)</button>
        <button class="tab-btn">My Assigned Queue (18)</button>
        <button class="tab-btn">Unassigned (1,053)</button>
        <button class="tab-btn">Recently Resolved (4,821)</button>
      </div>

      <!-- Bulk Actions Toolbar -->
      <div class="table-card">
        <div class="table-toolbar">
          <div style="display: flex; gap: 8px; align-items: center;">
            <input type="checkbox" id="select-all-queue">
            <button class="btn btn-secondary btn-sm" onclick="alert('Selected matches assigned to Elena Rostova')">Assign to Me</button>
            <button class="btn btn-success btn-sm" onclick="alert('Bulk approved!')">Bulk Approve</button>
            <button class="btn btn-danger btn-sm" onclick="alert('Bulk rejected!')">Bulk Reject</button>
          </div>
          <span style="font-size: 12px; color: var(--text-muted);">Threshold Range: <strong>85.0% – 94.9%</strong></span>
        </div>

        <div class="data-table-container">
          <table class="data-table">
            <thead>
              <tr>
                <th style="width: 30px;"></th>
                <th>Candidate Match Pair</th>
                <th>Contributing Sources</th>
                <th style="text-align: center;">Confidence</th>
                <th>Priority Reason</th>
                <th>Status</th>
                <th style="text-align: right;">Action</th>
              </tr>
            </thead>
            <tbody>
              ${matches.map(m => `
                <tr style="cursor: pointer;" onclick="window.location.hash='#/stewardship/reviews/${m.id}'">
                  <td onclick="event.stopPropagation()"><input type="checkbox"></td>
                  <td class="cell-highlight">
                    <strong>${m.sourceA.name}</strong> ↔ <strong>${m.sourceB.name}</strong>
                    <div style="font-size: 11px; color: var(--text-muted);">${m.sourceA.email} • ${m.sourceA.city}</div>
                  </td>
                  <td>
                    <span class="badge badge-info">${m.sourceA.source}</span>
                    <span style="font-size: 11px; color: var(--text-dim);">+</span>
                    <span class="badge badge-neutral">${m.sourceB.source}</span>
                  </td>
                  <td style="text-align: center;">
                    <span class="cell-mono" style="font-size: 13px; font-weight: 700; color: ${m.confidence >= 95 ? '#34d399' : '#fbbf24'};">
                      ${m.confidence}%
                    </span>
                  </td>
                  <td>
                    <div style="font-size: 11.5px; color: #fff;">Slight Legal Name Variation</div>
                    <div style="font-size: 10.5px; color: var(--text-muted);">Exact match on Phone & Email</div>
                  </td>
                  <td>
                    <span class="badge ${m.status.includes('Auto') ? 'badge-success' : 'badge-warning'}">
                      ${m.status}
                    </span>
                  </td>
                  <td style="text-align: right;" onclick="event.stopPropagation()">
                    <a href="#/stewardship/reviews/${m.id}" class="btn btn-secondary btn-sm">
                      Review Match →
                    </a>
                  </td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  `;
  }


  // ==================== src/pages/stewardship/matchReview.js ====================
  // Page 21: Match Review Studio (Route: /stewardship/reviews/:matchId)
  async function renderMatchReviewPage(params) {
    const matchId = params.matchId || 'match-101';
    const match = (await repository.getMatch(matchId)) || (await repository.getMatches())[0];

    return `
    <div class="page-container">
      <div style="margin-bottom: 12px;">
        ${renderBreadcrumbs([
      { label: 'Stewardship', route: '#/stewardship' },
      { label: 'Review Queue', route: '#/stewardship' },
      { label: `Review #${match.id} (Robert Smith)`, route: `#/stewardship/reviews/${match.id}` }
    ])}
      </div>

      <div class="page-header">
        <div class="page-title-group">
          <div style="display: flex; align-items: center; gap: 10px;">
            <h1 class="page-title">Match Review & Identity Resolution</h1>
            <span class="badge ${match.status.includes('Auto') || match.status === 'Approved' ? 'badge-success' : 'badge-warning'}">
              ${match.status}
            </span>
            <span class="cell-mono" style="font-size: 15px; color: #34d399; font-weight: 700;">
              ${match.confidence}% Match
            </span>
          </div>
          <p class="page-description">Candidate merge under <strong>${match.strategy}</strong>. Review attribute-level score contributions and survivorship.</p>
        </div>
        <div class="page-actions" id="steward-action-buttons">
          <button class="btn btn-danger" onclick="window.unifyRecordMatchDecision('${match.id}', 'Rejected')">
            <span>✕</span> Reject Merge
          </button>
          <button class="btn btn-secondary" onclick="alert('Investigation ticket #INV-9281 opened with audit trail.')">
            <span>🔍</span> Investigate
          </button>
          <button class="btn btn-success" onclick="window.unifyRecordMatchDecision('${match.id}', 'Approved')">
            <span>✓</span> Approve Merge & Create Golden Entity
          </button>
          <a href="#/entity-360/CUST-00192837" class="btn btn-primary">
            <span>Next: Entity 360 →</span>
          </a>
        </div>
      </div>

      <!-- Decision Status Banner if already acted upon -->
      <div id="decision-banner" style="${match.stewardDecision ? 'display: flex;' : 'display: none;'} margin-bottom: 16px; padding: 12px 18px; background: rgba(16, 185, 129, 0.12); border: 1px solid rgba(16, 185, 129, 0.35); border-radius: var(--radius-md); align-items: center; justify-content: space-between;">
        <div style="display: flex; align-items: center; gap: 10px;">
          <span class="badge-triad badge-user-decision">USER DECISION CERTIFIED</span>
          <span style="font-size: 12.5px; color: #fff;">
            Merge approved by <strong>Elena Rostova (Data Steward)</strong> at <span id="decision-time">${match.stewardDecision?.timestamp || 'Today'}</span>. Golden Record created.
          </span>
        </div>
        <a href="#/entity-360/CUST-00192837" class="btn btn-primary btn-sm">Open Golden Entity 360 👑</a>
      </div>

      <!-- Side-by-Side Attribute Comparison (Section 21) -->
      <div class="grid-2" style="margin-bottom: 20px;">
        <!-- SOURCE A -->
        <div class="card" style="border-top: 4px solid #38bdf8;">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 14px;">
            <div>
              <span class="badge badge-info">${match.sourceA.source}</span>
              <h3 style="font-size: 16px; font-weight: 700; color: #fff; margin-top: 4px;">${match.sourceA.name}</h3>
              <div style="font-size: 11px; color: var(--text-muted);">Source Record ID: <code class="cell-mono">${match.sourceA.id}</code></div>
            </div>
            <span class="badge badge-neutral">Zero-Copy Source</span>
          </div>

          <table style="width: 100%; border-collapse: collapse; font-size: 12.5px;">
            <tr style="border-bottom: 1px solid var(--border-subtle);"><td style="padding: 9px 0; color: var(--text-muted); width: 30%;">Full Name</td><td style="color: #fff; font-weight: 600;">${match.sourceA.name}</td></tr>
            <tr style="border-bottom: 1px solid var(--border-subtle);"><td style="padding: 9px 0; color: var(--text-muted);">Email Address</td><td style="color: #fff; font-family: var(--font-mono);">${match.sourceA.email}</td></tr>
            <tr style="border-bottom: 1px solid var(--border-subtle);"><td style="padding: 9px 0; color: var(--text-muted);">Phone Number</td><td style="color: #fff; font-family: var(--font-mono);">${match.sourceA.phone}</td></tr>
            <tr style="border-bottom: 1px solid var(--border-subtle);"><td style="padding: 9px 0; color: var(--text-muted);">Billing City</td><td style="color: #fff;">${match.sourceA.city}</td></tr>
            <tr><td style="padding: 9px 0; color: var(--text-muted);">Annual Revenue</td><td style="color: #fff; font-family: var(--font-mono);">${match.sourceA.revenue}</td></tr>
          </table>
        </div>

        <!-- SOURCE B -->
        <div class="card" style="border-top: 4px solid #a855f7;">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 14px;">
            <div>
              <span class="badge badge-info">${match.sourceB.source}</span>
              <h3 style="font-size: 16px; font-weight: 700; color: #fff; margin-top: 4px;">${match.sourceB.name}</h3>
              <div style="font-size: 11px; color: var(--text-muted);">Source Record ID: <code class="cell-mono">${match.sourceB.id}</code></div>
            </div>
            <span class="badge badge-neutral">Materialized ERP</span>
          </div>

          <table style="width: 100%; border-collapse: collapse; font-size: 12.5px;">
            <tr style="border-bottom: 1px solid var(--border-subtle);"><td style="padding: 9px 0; color: var(--text-muted); width: 30%;">Full Name</td><td style="color: #fff; font-weight: 600;">${match.sourceB.name}</td></tr>
            <tr style="border-bottom: 1px solid var(--border-subtle);"><td style="padding: 9px 0; color: var(--text-muted);">Email Address</td><td style="color: #fff; font-family: var(--font-mono);">${match.sourceB.email}</td></tr>
            <tr style="border-bottom: 1px solid var(--border-subtle);"><td style="padding: 9px 0; color: var(--text-muted);">Phone Number</td><td style="color: #fff; font-family: var(--font-mono);">${match.sourceB.phone}</td></tr>
            <tr style="border-bottom: 1px solid var(--border-subtle);"><td style="padding: 9px 0; color: var(--text-muted);">Billing City</td><td style="color: #fff;">${match.sourceB.city}</td></tr>
            <tr><td style="padding: 9px 0; color: var(--text-muted);">Annual Revenue</td><td style="color: #fff; font-family: var(--font-mono);">${match.sourceB.revenue}</td></tr>
          </table>
        </div>
      </div>

      <!-- Match Explanation Matrix (Section 21) -->
      <div class="table-card">
        <div class="table-toolbar">
          <div style="display: flex; align-items: center; gap: 8px;">
            <span style="font-weight: 600; color: #fff;">Scoring Contribution Breakdown</span>
            <span class="badge-triad badge-system-fact">SYSTEM FACT</span>
          </div>
          <span style="font-size: 12px; color: #34d399; font-weight: 700; font-family: var(--font-mono);">
            Total Composite Match: 96.7%
          </span>
        </div>

        <table class="data-table">
          <thead>
            <tr>
              <th>Evaluated Field</th>
              <th>Applied Matching Method</th>
              <th>Raw Algorithmic Score</th>
              <th>Allocated Weight</th>
              <th style="text-align: right;">Points Contribution</th>
            </tr>
          </thead>
          <tbody>
            ${match.breakdown.map(b => `
              <tr>
                <td class="cell-mono cell-highlight">${b.attribute}</td>
                <td><span class="badge badge-info">${b.method}</span></td>
                <td class="cell-mono">${b.score}%</td>
                <td class="cell-mono">${b.weight}%</td>
                <td style="text-align: right; color: #34d399; font-weight: 700; font-family: var(--font-mono);">
                  ${b.contribution}
                </td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      </div>
    </div>
  `;
  }


  // ==================== src/pages/entity360/entitySearch.js ====================
  // Page 24: Entity Search (Route: /entity-360/search)
  async function renderEntitySearchPage() {
    const goldenList = await repository.getGoldenEntities();

    return `
    <div class="page-container">
      <div style="margin-bottom: 12px;">
        ${renderBreadcrumbs([
      { label: 'Entity 360', route: '#/entity-360/search' },
      { label: 'Global Entity Search', route: '#/entity-360/search' }
    ])}
      </div>

      <div class="page-header">
        <div class="page-title-group">
          <h1 class="page-title">Enterprise Entity Search & Lookup</h1>
          <p class="page-description">Search across golden master records, source system physical IDs, cross-references, and contact identifiers.</p>
        </div>
      </div>

      <!-- Search Input Card -->
      <div class="card" style="margin-bottom: 20px;">
        <div style="display: flex; gap: 10px;">
          <input 
            type="text" 
            class="form-input" 
            id="entity-search-box" 
            placeholder="Search by Golden ID (CUST-00192837), Name (Robert Smith), Phone, or Source ID (CRM-10231)..." 
            style="flex: 1; padding: 10px 14px; font-size: 14px;"
            value="Robert Smith"
          >
          <button class="btn btn-primary" onclick="alert('Search executed!')">Search Entities</button>
        </div>
        <div style="display: flex; gap: 8px; margin-top: 10px; font-size: 11px; color: var(--text-muted);">
          <span>Quick queries:</span>
          <a href="#/entity-360/CUST-00192837" class="btn btn-ghost btn-sm" style="font-size: 11px; padding: 1px 6px;">👑 CUST-00192837 (Robert Smith)</a>
          <a href="#/entity-360/CUST-00284910" class="btn btn-ghost btn-sm" style="font-size: 11px; padding: 1px 6px;">👑 CUST-00284910 (Apex Global)</a>
        </div>
      </div>

      <!-- Results Grouped by Golden Entity (Section 24) -->
      <div style="display: flex; flex-direction: column; gap: 14px;">
        <div style="font-size: 12px; font-weight: 600; color: var(--text-muted); text-transform: uppercase;">
          Search Results for "Robert Smith"
        </div>

        ${goldenList.map(g => `
          <div class="card" style="border-left: 4px solid var(--primary); cursor: pointer;" onclick="window.location.hash='#/entity-360/${g.id}'">
            <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 8px;">
              <div>
                <div style="display: flex; align-items: center; gap: 8px;">
                  <span class="badge badge-success">Golden Record</span>
                  <h3 style="font-size: 16px; font-weight: 700; color: #fff;">${g.name}</h3>
                </div>
                <div style="font-size: 12px; color: var(--text-muted); margin-top: 3px;">
                  Golden ID: <code class="cell-mono" style="color: #38bdf8;">${g.id}</code> • Domain: ${g.domain}
                </div>
              </div>
              <div style="text-align: right;">
                <span class="cell-mono" style="color: #34d399; font-weight: 700; font-size: 14px;">${g.confidence} Confidence</span>
                <div style="font-size: 11px; color: var(--text-dim);">Updated ${g.lastUpdated}</div>
              </div>
            </div>

            <div style="background: var(--bg-card-subtle); padding: 10px 14px; border-radius: var(--radius-md); font-size: 12px; display: flex; gap: 20px; color: var(--text-secondary);">
              <div>Email: <strong style="color: #fff;">${g.attributes?.email?.value || 'robert@abc.com'}</strong></div>
              <div>Phone: <strong style="color: #fff;">${g.attributes?.phone?.value || '+91 98765 43210'}</strong></div>
              <div>Winning Sources: <strong style="color: #a855f7;">Salesforce CRM, SAP ERP</strong></div>
            </div>
          </div>
        `).join('')}
      </div>
    </div>
  `;
  }


  // ==================== src/pages/entity360/entityProfile.js ====================
  // Page 25 & 26: Entity 360 Profile Studio (Route: /entity-360/:entityId)
  async function renderEntityProfilePage(params) {
    const entityId = params.entityId || 'CUST-00192837';
    const entity = (await repository.getGoldenEntity(entityId)) || (await repository.getGoldenEntities())[0];

    return `
    <div class="page-container">
      <div style="margin-bottom: 12px;">
        ${renderBreadcrumbs([
      { label: 'Entity 360', route: '#/entity-360/search' },
      { label: 'Golden Master Profiles', route: '#/unification/golden-entities' },
      { label: `${entity.name} (${entity.id})`, route: `#/entity-360/${entity.id}` }
    ])}
      </div>

      <!-- Entity 360 Header (Section 25) -->
      <div class="page-header" style="background: var(--bg-card); border: 1px solid var(--border-default); border-radius: var(--radius-lg); padding: 18px 24px; margin-bottom: 20px;">
        <div class="page-title-group">
          <div style="display: flex; align-items: center; gap: 12px;">
            <div style="width: 44px; height: 44px; border-radius: 50%; background: linear-gradient(135deg, #6366f1, #06b6d4); display: flex; align-items: center; justify-content: center; font-size: 20px; font-weight: 800; color: #fff;">
              RS
            </div>
            <div>
              <div style="display: flex; align-items: center; gap: 8px;">
                <h1 class="page-title" style="font-size: 24px;">${entity.name}</h1>
                <span class="badge badge-success">${entity.status}</span>
                <span class="badge badge-info">${entity.domain} Domain</span>
              </div>
              <div style="font-size: 12px; color: var(--text-muted); margin-top: 2px;">
                Golden Master ID: <code class="cell-mono" style="color: #38bdf8; font-weight: 600;">${entity.id}</code> • 
                Resolution Confidence: <span class="cell-mono" style="color: #34d399; font-weight: 700;">${entity.confidence}</span> • 
                Contributing Sources: <strong style="color: #fff;">${entity.sourceCount} Merged Records</strong>
              </div>
            </div>
          </div>
        </div>

        <div class="page-actions">
          <a href="#/entity-360/${entity.id}/graph" class="btn btn-ai">
            <span>🕸️</span> Interactive Identity Graph
          </a>
          <a href="#/governance/lineage" class="btn btn-secondary">
            <span>📜</span> Lineage
          </a>
          <a href="#/entity-360/${entity.id}/history" class="btn btn-secondary">
            <span>⏱️</span> History
          </a>
        </div>
      </div>

      <!-- 8 Tabs (Section 25) -->
      <div class="tabs-nav" id="entity-tabs">
        <button class="tab-btn active" onclick="window.unifySwitchTab(this, 'tab-ent-attrs')">Attributes & Survivorship</button>
        <button class="tab-btn" onclick="window.unifySwitchTab(this, 'tab-ent-sources')">Source Lineage (${entity.sourceCount})</button>
        <button class="tab-btn" onclick="window.unifySwitchTab(this, 'tab-ent-graph-preview')">Identity Graph</button>
        <button class="tab-btn" onclick="window.unifySwitchTab(this, 'tab-ent-history')">Audit History</button>
      </div>

      <!-- TAB 1: Attributes & Survivorship (Section 26) -->
      <div class="tab-content-pane" id="tab-ent-attrs">
        <div class="table-card">
          <div class="table-toolbar">
            <div style="display: flex; align-items: center; gap: 8px;">
              <span style="font-weight: 600; color: #fff;">Canonical Attributes & Winning Source Rules</span>
              <span class="badge-triad badge-system-fact">SURVIVORSHIP CERTIFIED</span>
            </div>
            <span style="font-size: 11.5px; color: var(--text-muted);">Clicking an attribute reveals provenance flow</span>
          </div>

          <div class="data-table-container">
            <table class="data-table">
              <thead>
                <tr>
                  <th>Canonical Attribute</th>
                  <th>Master Golden Value</th>
                  <th>Winning Source</th>
                  <th style="text-align: center;">Confidence</th>
                  <th>Last Updated</th>
                  <th style="text-align: right;">Attribute Lineage</th>
                </tr>
              </thead>
              <tbody>
                ${Object.entries(entity.attributes || {}).map(([attrKey, attr]) => `
                  <tr style="cursor: pointer;" onclick="window.location.hash='#/governance/lineage'">
                    <td class="cell-mono cell-highlight">${attrKey}</td>
                    <td style="font-weight: 600; color: #fff; font-size: 13px;">${attr.value}</td>
                    <td>
                      <span class="badge ${attr.source.includes('SAP') ? 'badge-neutral' : (attr.source.includes('Salesforce') ? 'badge-info' : 'badge-success')}">
                        ${attr.source}
                      </span>
                    </td>
                    <td style="text-align: center;">
                      <span class="cell-mono" style="color: #34d399; font-weight: 600;">${attr.confidence}</span>
                    </td>
                    <td style="font-size: 12px; color: var(--text-muted);">${attr.updated}</td>
                    <td style="text-align: right;" onclick="event.stopPropagation()">
                      <a href="#/governance/lineage" class="btn btn-ghost btn-sm" title="Trace Provenance">
                        Lineage ➔
                      </a>
                    </td>
                  </tr>
                `).join('')}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <!-- TAB 2: Contributing Sources -->
      <div class="tab-content-pane" id="tab-ent-sources" style="display: none;">
        <div class="grid-2">
          ${(entity.sources || [
        { source: 'Salesforce CRM', id: 'CRM-10231', status: 'Active Contributor', mergedAt: '2026-09-22 14:30' },
        { source: 'SAP ERP', id: 'ERP-88391', status: 'Active Contributor', mergedAt: '2026-09-22 14:30' }
      ]).map(s => `
            <div class="card">
              <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 10px;">
                <span class="badge badge-info">${s.source}</span>
                <span class="badge badge-success">${s.status}</span>
              </div>
              <div style="font-weight: 700; color: #fff; font-size: 15px;">Source Record ID: ${s.id}</div>
              <div style="font-size: 12px; color: var(--text-muted); margin-top: 4px;">Merged into Golden Record on: ${s.mergedAt}</div>
              <div style="margin-top: 14px; padding-top: 10px; border-top: 1px solid var(--border-subtle); display: flex; justify-content: space-between;">
                <a href="#/stewardship/reviews/match-101" class="btn btn-ghost btn-sm">Inspect Match Score</a>
                <button class="btn btn-danger btn-sm" onclick="alert('Unmerge requested for steward approval.')">Request Unmerge</button>
              </div>
            </div>
          `).join('')}
        </div>
      </div>

      <!-- TAB 3: Graph Preview -->
      <div class="tab-content-pane" id="tab-ent-graph-preview" style="display: none;">
        <div class="card" style="text-align: center; padding: 32px;">
          <h3 style="color: #fff; font-size: 15px; margin-bottom: 8px;">Explore Unified Identity Graph</h3>
          <p style="color: var(--text-secondary); max-width: 500px; margin: 0 auto 16px;">
            Inspect multi-hop relationships between Robert Smith, enterprise organizations, contact points, and billing households.
          </p>
          <a href="#/entity-360/${entity.id}/graph" class="btn btn-primary">
            Open Full Interactive Identity Graph Canvas 🕸️
          </a>
        </div>
      </div>

      <!-- TAB 4: Audit History -->
      <div class="tab-content-pane" id="tab-ent-history" style="display: none;">
        <div class="card">
          <h3 style="font-size: 14px; font-weight: 600; color: #fff; margin-bottom: 14px;">Entity Lifecycle & Survivorship Timeline</h3>
          <div style="display: flex; flex-direction: column; gap: 12px;">
            ${(entity.history || [
        { date: 'Today, 10:14 AM', event: 'Survivorship Re-calculation', details: 'Revenue updated from SAP ERP winning rule.', actor: 'System Rule #4' },
        { date: 'Sep 22, 14:30', event: 'Match Approved & Merged', details: 'CRM-10231 merged with ERP-88391 with 96.7% match confidence.', actor: 'Elena Rostova (Steward)' },
        { date: 'Sep 20, 09:12', event: 'Golden Entity Created', details: 'Initial record established from Salesforce Account import.', actor: 'Pipeline Job #2049' }
      ]).map(h => `
              <div style="display: flex; gap: 12px; padding-bottom: 12px; border-bottom: 1px solid var(--border-subtle);">
                <div style="width: 120px; font-size: 11px; color: var(--text-dim);">${h.date}</div>
                <div style="flex: 1;">
                  <div style="font-weight: 600; color: #fff; font-size: 13px;">${h.event}</div>
                  <div style="font-size: 12px; color: var(--text-secondary); margin-top: 2px;">${h.details}</div>
                  <div style="font-size: 11px; color: var(--text-muted); margin-top: 2px;">Actor: <span style="color: #38bdf8;">${h.actor}</span></div>
                </div>
              </div>
            `).join('')}
          </div>
        </div>
      </div>
    </div>
  `;
  }


  // ==================== src/pages/entity360/identityGraph.js ====================
  // Page 27: Interactive Identity Graph (Route: /entity-360/:entityId/graph)
  async function renderIdentityGraphPage(params) {
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


  // ==================== src/pages/entity360/entityHistory.js ====================
  // Page 28: Entity History & Audit Timeline (Route: /entity-360/:entityId/history)
  async function renderEntityHistoryPage(params) {
    const entityId = params.entityId || 'CUST-00192837';
    const entity = (await repository.getGoldenEntity(entityId)) || (await repository.getGoldenEntities())[0];

    return `
    <div class="page-container" style="max-width: 850px; margin: 0 auto;">
      <div style="margin-bottom: 12px;">
        ${renderBreadcrumbs([
      { label: 'Entity 360', route: '#/entity-360/search' },
      { label: `${entity.name} (${entity.id})`, route: `#/entity-360/${entity.id}` },
      { label: 'Audit History', route: `#/entity-360/${entity.id}/history` }
    ])}
      </div>

      <div class="page-header">
        <div class="page-title-group">
          <h1 class="page-title">Entity Lifecycle Audit Trail</h1>
          <p class="page-description">Complete chronological provenance of merge operations, rule adjustments, and survivorship transitions.</p>
        </div>
        <div class="page-actions">
          <a href="#/governance/lineage" class="btn btn-primary">Next: Lineage Flow →</a>
        </div>
      </div>

      <div class="card">
        <div style="display: flex; flex-direction: column; gap: 20px; position: relative; padding-left: 20px;">
          <!-- Left line -->
          <div style="position: absolute; left: 6px; top: 10px; bottom: 10px; width: 2px; background: var(--border-default);"></div>

          <div style="position: relative;">
            <div style="position: absolute; left: -20px; top: 4px; width: 12px; height: 12px; border-radius: 50%; background: #34d399; border: 2px solid #0f172a;"></div>
            <div style="font-size: 11px; color: var(--text-dim);">Sep 23, 2026 • 10:14 AM</div>
            <div style="font-weight: 600; color: #fff; font-size: 13.5px; margin-top: 2px;">Survivorship Rule Recalculation</div>
            <div style="font-size: 12px; color: var(--text-secondary); margin-top: 4px;">
              Revenue attribute winning value changed to <code>$1,450,000</code> based on SAP ERP latest transactional billing update.
            </div>
            <div style="font-size: 11px; color: var(--text-muted); margin-top: 4px;">Actor: <span class="badge badge-neutral">Survivorship Rule #4</span></div>
          </div>

          <div style="position: relative;">
            <div style="position: absolute; left: -20px; top: 4px; width: 12px; height: 12px; border-radius: 50%; background: #6366f1; border: 2px solid #0f172a;"></div>
            <div style="font-size: 11px; color: var(--text-dim);">Sep 22, 2026 • 02:30 PM</div>
            <div style="font-weight: 600; color: #fff; font-size: 13.5px; margin-top: 2px;">Steward Approval & Physical Merge</div>
            <div style="font-size: 12px; color: var(--text-secondary); margin-top: 4px;">
              Salesforce Account <code>CRM-10231</code> merged into SAP ERP <code>ERP-88391</code> with <strong>96.7% match confidence</strong>.
            </div>
            <div style="font-size: 11px; color: var(--text-muted); margin-top: 4px;">Actor: <span class="badge badge-triad badge-user-decision">Elena Rostova (Data Steward)</span></div>
          </div>

          <div style="position: relative;">
            <div style="position: absolute; left: -20px; top: 4px; width: 12px; height: 12px; border-radius: 50%; background: #06b6d4; border: 2px solid #0f172a;"></div>
            <div style="font-size: 11px; color: var(--text-dim);">Sep 20, 2026 • 09:12 AM</div>
            <div style="font-weight: 600; color: #fff; font-size: 13.5px; margin-top: 2px;">Initial Golden Entity Created</div>
            <div style="font-size: 12px; color: var(--text-secondary); margin-top: 4px;">
              New identity anchor established upon initial Salesforce Account ingest.
            </div>
            <div style="font-size: 11px; color: var(--text-muted); margin-top: 4px;">Actor: <span class="badge badge-neutral">Pipeline Ingestion Job #2049</span></div>
          </div>
        </div>
      </div>
    </div>
  `;
  }


  // ==================== src/pages/governance/lineage.js ====================
  // Page 29 & 30: Data Lineage & Attribute Provenance Flow (Route: /governance/lineage)
  async function renderLineagePage() {
    return `
    <div class="page-container">
      <div style="margin-bottom: 12px;">
        ${renderBreadcrumbs([
      { label: 'Governance', route: '#/governance/lineage' },
      { label: 'Data Lineage & Provenance', route: '#/governance/lineage' }
    ])}
      </div>

      <div class="page-header">
        <div class="page-title-group">
          <div style="display: flex; align-items: center; gap: 8px;">
            <h1 class="page-title">End-to-End Enterprise Data Lineage</h1>
            <span class="badge badge-success">Live Pipeline DAG</span>
          </div>
          <p class="page-description">Visual traceability from raw source systems through standardization, matching, survivorship rules, to golden entities and downstream consumer APIs.</p>
        </div>
        <div class="page-actions">
          <a href="#/activation/apis" class="btn btn-primary">
            <span>Next: Activation APIs →</span>
          </a>
        </div>
      </div>

      <!-- Filters Toolbar (Section 29) -->
      <div class="card" style="margin-bottom: 20px; padding: 14px 18px;">
        <div style="display: flex; gap: 12px; align-items: center; flex-wrap: wrap;">
          <span style="font-size: 12px; font-weight: 600; color: #fff;">Lineage Scope:</span>
          <select class="form-select" style="font-size: 12px; padding: 6px 10px;">
            <option value="Customer">Entity: Customer (Robert Smith • CUST-00192837)</option>
            <option value="Account">Entity: Corporate Account</option>
          </select>
          <select class="form-select" style="font-size: 12px; padding: 6px 10px;">
            <option value="All">All Attributes (Full Record DAG)</option>
            <option value="email">Attribute: contact.email</option>
            <option value="phone">Attribute: contact.phone</option>
            <option value="revenue">Attribute: metrics.revenue</option>
          </select>
          <button class="btn btn-secondary btn-sm" onclick="alert('Lineage recalculated for target attribute.')">Filter Trace</button>
        </div>
      </div>

      <!-- Visual End-to-End Flow DAG (Section 29) -->
      <div class="card" style="margin-bottom: 20px; background: #070a13;">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 18px;">
          <h3 style="font-size: 14px; font-weight: 600; color: #fff;">Pipeline Execution Lineage Graph</h3>
          <span class="badge badge-info">Zero-Copy Ingestion</span>
        </div>

        <div style="display: grid; grid-template-columns: repeat(6, 1fr); gap: 12px; align-items: center;">
          
          <!-- STAGE 1: Source -->
          <div style="background: var(--bg-card); border: 1px solid var(--border-default); border-radius: var(--radius-md); padding: 14px; text-align: center;">
            <div style="font-size: 18px; margin-bottom: 4px;">🔌</div>
            <div style="font-weight: 600; color: #fff; font-size: 12.5px;">1. Operational Source</div>
            <div style="font-size: 11px; color: #38bdf8; margin-top: 3px;">Salesforce CRM</div>
            <div style="font-size: 10px; color: var(--text-dim); margin-top: 2px;">Account (CRM-10231)</div>
          </div>

          <!-- Arrow -->
          <div style="text-align: center; color: var(--primary); font-size: 20px;">➔</div>

          <!-- STAGE 2: Transformation -->
          <div style="background: var(--bg-card); border: 1px solid var(--border-default); border-radius: var(--radius-md); padding: 14px; text-align: center;">
            <div style="font-size: 18px; margin-bottom: 4px;">⚙️</div>
            <div style="font-weight: 600; color: #fff; font-size: 12.5px;">2. Standardization</div>
            <div style="font-size: 11px; color: #a855f7; margin-top: 3px;">Rule #12 (E.164)</div>
            <div style="font-size: 10px; color: var(--text-dim); margin-top: 2px;">Format Normalizer</div>
          </div>

          <!-- Arrow -->
          <div style="text-align: center; color: var(--primary); font-size: 20px;">➔</div>

          <!-- STAGE 3: Survivorship & Master -->
          <div style="background: var(--bg-card); border: 1px solid var(--secondary); border-radius: var(--radius-md); padding: 14px; text-align: center; box-shadow: 0 0 12px rgba(6,182,212,0.2);">
            <div style="font-size: 18px; margin-bottom: 4px;">👑</div>
            <div style="font-weight: 600; color: #fff; font-size: 12.5px;">3. Golden Entity</div>
            <div style="font-size: 11px; color: #34d399; margin-top: 3px;">CUST-00192837</div>
            <div style="font-size: 10px; color: var(--text-dim); margin-top: 2px;">Survivorship Rule #4</div>
          </div>

          <!-- STAGE 4: Consumer -->
          <div style="background: var(--bg-card); border: 1px solid var(--border-default); border-radius: var(--radius-md); padding: 14px; text-align: center;">
            <div style="font-size: 18px; margin-bottom: 4px;">🚀</div>
            <div style="font-weight: 600; color: #fff; font-size: 12.5px;">4. Data Product API</div>
            <div style="font-size: 11px; color: #38bdf8; margin-top: 3px;">Customer 360 API</div>
            <div style="font-size: 10px; color: var(--text-dim); margin-top: 2px;">Snowflake Data Share</div>
          </div>

        </div>
      </div>

      <!-- Attribute-Level Lineage Trace (Section 30) -->
      <div class="table-card">
        <div class="table-toolbar">
          <div style="display: flex; align-items: center; gap: 8px;">
            <span style="font-weight: 600; color: #fff;">Attribute-Level Trace (Golden Email & Phone)</span>
            <span class="badge-triad badge-system-fact">PROVENANCE CERTIFIED</span>
          </div>
          <span style="font-size: 12px; color: var(--text-muted);">Section 30 Compliant</span>
        </div>

        <div style="padding: 18px;">
          <div style="display: flex; flex-direction: column; gap: 10px; font-family: var(--font-mono); font-size: 12.5px;">
            <div style="padding: 8px 12px; background: var(--bg-card-subtle); border-left: 3px solid #38bdf8; border-radius: 4px;">
              <strong>Step 1</strong>: Salesforce CRM record <code>CRM-10231</code> emits raw email <code>robert@abc.com</code>
            </div>
            <div style="color: var(--text-dim); padding-left: 14px;">↓</div>
            <div style="padding: 8px 12px; background: var(--bg-card-subtle); border-left: 3px solid #a855f7; border-radius: 4px;">
              <strong>Step 2</strong>: Standardization Rule #12 verifies RFC 5322 syntax and lowercases domain
            </div>
            <div style="color: var(--text-dim); padding-left: 14px;">↓</div>
            <div style="padding: 8px 12px; background: var(--bg-card-subtle); border-left: 3px solid #fbbf24; border-radius: 4px;">
              <strong>Step 3</strong>: Survivorship Rule #4 evaluates CRM vs SAP source trust ranking (CRM wins for Email with 99% confidence)
            </div>
            <div style="color: var(--text-dim); padding-left: 14px;">↓</div>
            <div style="padding: 8px 12px; background: rgba(16, 185, 129, 0.1); border-left: 3px solid #34d399; border-radius: 4px; color: #34d399;">
              <strong>Step 4</strong>: Master Attribute published to Golden Entity <code>CUST-00192837.contact.email</code>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;
  }


  // ==================== src/pages/governance/audit.js ====================
  // Page 31: Compliance & Governance Audit Trail (Route: /governance/audit)
  async function renderAuditPage() {
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


  // ==================== src/pages/governance/referenceData.js ====================
  // Page 32: Enterprise Reference Data (Route: /governance/reference-data)
  async function renderReferenceDataPage() {
    const refTables = [
      { code: 'REF-ISO-3166', name: 'ISO Country Codes (Alpha-2/3)', version: '2026.1', records: '249', status: 'Active', source: 'ISO Standard' },
      { code: 'REF-CURRENCY', name: 'ISO 4217 Currency Standards', version: '2026.2', records: '178', status: 'Active', source: 'Financial Consortium' },
      { code: 'REF-NAICS', name: 'NAICS Industry Classifications', version: '2022.v4', records: '1,057', status: 'Active', source: 'US Census Bureau' },
      { code: 'REF-LEI', name: 'Legal Entity Identifier (GLEIF)', version: 'Daily Delta', records: '2.4M', status: 'Active', source: 'GLEIF Global Feed' }
    ];

    return `
    <div class="page-container">
      <div style="margin-bottom: 12px;">
        ${renderBreadcrumbs([
      { label: 'Governance', route: '#/governance/lineage' },
      { label: 'Reference Data', route: '#/governance/reference-data' }
    ])}
      </div>

      <div class="page-header">
        <div class="page-title-group">
          <h1 class="page-title">Enterprise Reference Data Catalog</h1>
          <p class="page-description">Standardized code lists, country ontologies, and industry taxonomies powering validation and normalization rules.</p>
        </div>
      </div>

      <div class="table-card">
        <table class="data-table">
          <thead>
            <tr>
              <th>Reference Set Code</th>
              <th>Standard Name</th>
              <th>Version</th>
              <th>Record Count</th>
              <th>Authority Source</th>
              <th>Status</th>
              <th style="text-align: right;">Action</th>
            </tr>
          </thead>
          <tbody>
            ${refTables.map(r => `
              <tr>
                <td class="cell-mono cell-highlight">${r.code}</td>
                <td><strong>${r.name}</strong></td>
                <td><span class="badge badge-neutral">${r.version}</span></td>
                <td class="cell-mono">${r.records}</td>
                <td style="color: var(--text-secondary);">${r.source}</td>
                <td><span class="badge badge-success">${r.status}</span></td>
                <td style="text-align: right;">
                  <button class="btn btn-secondary btn-sm" onclick="alert('Viewing code values for ${r.name}')">View Codes</button>
                </td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      </div>
    </div>
  `;
  }


  // ==================== src/pages/activation/activationOverview.js ====================
  // Page 33 & 34: Activation APIs & Data Products Hub (Route: /activation & /activation/apis)
  async function renderActivationPage() {
    const apis = [
      { name: 'Entity Resolution API', endpoint: 'POST /v1/resolve', status: 'Healthy', requests: '1.4M / day', latency: '38ms', auth: 'mTLS + OAuth 2.0' },
      { name: 'Golden Entity Lookup API', endpoint: 'GET /v1/entities/:goldenId', status: 'Healthy', requests: '4.8M / day', latency: '12ms', auth: 'Bearer API Key' },
      { name: 'Identity Graph Traversal API', endpoint: 'POST /v1/graph/traverse', status: 'Healthy', requests: '820K / day', latency: '45ms', auth: 'OAuth 2.0' },
      { name: 'Governance Lineage API', endpoint: 'GET /v1/lineage/:entityId', status: 'Healthy', requests: '120K / day', latency: '60ms', auth: 'Role: Auditor' }
    ];

    return `
    <div class="page-container">
      <div style="margin-bottom: 12px;">
        ${renderBreadcrumbs([
      { label: 'Activation', route: '#/activation' },
      { label: 'APIs & Data Services', route: '#/activation/apis' }
    ])}
      </div>

      <div class="page-header">
        <div class="page-title-group">
          <div style="display: flex; align-items: center; gap: 8px;">
            <h1 class="page-title">Activation & Downstream Data Products</h1>
            <span class="badge badge-success">4/4 APIs Online</span>
          </div>
          <p class="page-description">Syndicate golden records, real-time resolution endpoints, and event streams to enterprise operational consumers.</p>
        </div>
        <div class="page-actions">
          <a href="#/activation/data-products" class="btn btn-secondary">
            <span>📦</span> Certified Data Products
          </a>
          <a href="#/activation/events" class="btn btn-primary">
            <span>⚡</span> Real-time Event Streams
          </a>
        </div>
      </div>

      <!-- High Level Activation KPIs (Section 33) -->
      <div class="kpi-grid">
        <div class="kpi-card">
          <span class="kpi-label">Active APIs</span>
          <div class="kpi-value">4 Endpoints</div>
          <div class="kpi-delta positive"><span>●</span> 99.99% uptime</div>
        </div>
        <div class="kpi-card">
          <span class="kpi-label">Published Data Products</span>
          <div class="kpi-value">6 Products</div>
          <div class="kpi-delta positive"><span>✓</span> Golden Customer Certified</div>
        </div>
        <div class="kpi-card">
          <span class="kpi-label">Event Stream Velocity</span>
          <div class="kpi-value" style="color: #38bdf8;">14.2k evt/s</div>
          <div class="kpi-delta positive"><span>⚡</span> Kafka / PubSub CDC</div>
        </div>
        <div class="kpi-card">
          <span class="kpi-label">Connected Destinations</span>
          <div class="kpi-value">8 Consumers</div>
          <div class="kpi-delta positive"><span>🏢</span> Salesforce, Snowflake, Hubspot</div>
        </div>
      </div>

      <!-- APIs Table (Section 34) -->
      <div class="table-card">
        <div class="table-toolbar">
          <span style="font-weight: 600; color: #fff;">Registered Real-Time Endpoints</span>
          <span class="badge badge-info">Zero-Copy Direct Access</span>
        </div>
        <table class="data-table">
          <thead>
            <tr>
              <th>API Service</th>
              <th>REST / GraphQL Endpoint</th>
              <th>Status</th>
              <th>Throughput</th>
              <th>P99 Latency</th>
              <th>Authentication</th>
              <th style="text-align: right;">Action</th>
            </tr>
          </thead>
          <tbody>
            ${apis.map(a => `
              <tr>
                <td class="cell-highlight"><strong>${a.name}</strong></td>
                <td><code class="cell-mono" style="color: #38bdf8;">${a.endpoint}</code></td>
                <td><span class="badge badge-success">${a.status}</span></td>
                <td class="cell-mono">${a.requests}</td>
                <td class="cell-mono" style="color: #34d399;">${a.latency}</td>
                <td><span class="badge badge-neutral">${a.auth}</span></td>
                <td style="text-align: right;">
                  <button class="btn btn-secondary btn-sm" onclick="alert('Viewing Swagger / OpenAPI docs for ${a.name}')">Swagger</button>
                </td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      </div>
    </div>
  `;
  }


  // ==================== src/pages/activation/events.js ====================
  // Page 35: Event Streams & Webhooks (Route: /activation/events)
  async function renderEventsPage() {
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


  // ==================== src/pages/activation/dataProducts.js ====================
  // Page 36: Certified Golden Data Products (Route: /activation/data-products)
  async function renderDataProductsPage() {
    const products = [
      { title: 'Golden Customer 360', domain: 'Customer', owner: 'MDM Governance Team', consumers: '24 Applications', freshness: 'Real-time (CDC)', quality: '97.4%', records: '18.2M', cert: 'Certified Gold' },
      { title: 'Enterprise Corporate Hierarchy', domain: 'Account', owner: 'Enterprise Architecture', consumers: '12 Applications', freshness: '15 min SLA', quality: '98.1%', records: '4.2M', cert: 'Certified Gold' },
      { title: 'Unified Product Master', domain: 'Product', owner: 'Commercial Catalog Ops', consumers: '8 Applications', freshness: 'Hourly Batch', quality: '94.0%', records: '482K', cert: 'Silver' },
      { title: 'Supplier Risk & Sanctions View', domain: 'Supplier', owner: 'Procurement Compliance', consumers: '6 Applications', freshness: 'Daily Delta', quality: '99.0%', records: '64K', cert: 'Certified Gold' }
    ];

    return `
    <div class="page-container">
      <div style="margin-bottom: 12px;">
        ${renderBreadcrumbs([
      { label: 'Activation', route: '#/activation' },
      { label: 'Data Products', route: '#/activation/data-products' }
    ])}
      </div>

      <div class="page-header">
        <div class="page-title-group">
          <div style="display: flex; align-items: center; gap: 8px;">
            <h1 class="page-title">Certified Golden Data Products</h1>
            <span class="badge badge-success">Enterprise Mesh Ready</span>
          </div>
          <p class="page-description">Curated, contract-tested, and SLA-guaranteed data products syndicated to cloud data warehouses and analytics teams.</p>
        </div>
        <div class="page-actions">
          <a href="#/activation/destinations" class="btn btn-secondary">
            <span>🔌</span> View Destinations →
          </a>
        </div>
      </div>

      <div class="table-card">
        <table class="data-table">
          <thead>
            <tr>
              <th>Data Product Name</th>
              <th>Domain</th>
              <th>Business Owner</th>
              <th>Active Consumers</th>
              <th>Data Freshness</th>
              <th>Quality Score</th>
              <th style="text-align: right;">Master Volume</th>
              <th>Certification</th>
            </tr>
          </thead>
          <tbody>
            ${products.map(p => `
              <tr>
                <td class="cell-highlight"><strong>${p.title}</strong></td>
                <td><span class="badge badge-info">${p.domain}</span></td>
                <td>${p.owner}</td>
                <td class="cell-mono">${p.consumers}</td>
                <td style="color: #38bdf8;">${p.freshness}</td>
                <td class="cell-mono" style="color: #34d399; font-weight: 600;">${p.quality}</td>
                <td class="cell-mono" style="text-align: right; font-weight: 700; color: #fff;">${p.records}</td>
                <td><span class="badge badge-success">✓ ${p.cert}</span></td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      </div>
    </div>
  `;
  }


  // ==================== src/pages/activation/destinations.js ====================
  // Page 37: Activation Destinations (Route: /activation/destinations)
  async function renderDestinationsPage() {
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


  // ==================== src/pages/operations/jobs.js ====================
  // Page 38: Operations Jobs Registry (Route: /operations/jobs)
  async function renderJobsPage() {
    const jobs = await repository.getJobs();

    return `
    <div class="page-container">
      <div style="margin-bottom: 12px;">
        ${renderBreadcrumbs([
      { label: 'Operations', route: '#/operations/jobs' },
      { label: 'Jobs Engine', route: '#/operations/jobs' }
    ])}
      </div>

      <div class="page-header">
        <div class="page-title-group">
          <div style="display: flex; align-items: center; gap: 8px;">
            <h1 class="page-title">Operations Pipeline Jobs</h1>
            <span class="badge badge-info">1 Running</span>
          </div>
          <p class="page-description">Monitor execution pipelines, continuous CDC ingestion tasks, and batch unification runs.</p>
        </div>
        <div class="page-actions">
          <a href="#/operations/jobs/job-9820" class="btn btn-secondary">
            <span>🔬</span> View Pipeline Stage Monitor (Job #9820)
          </a>
          <a href="#/operations/health" class="btn btn-primary">
            <span>❤️</span> System Health
          </a>
        </div>
      </div>

      <div class="table-card">
        <div class="table-toolbar">
          <div style="display: flex; gap: 8px; align-items: center;">
            <input type="text" class="form-input" placeholder="Search jobs by ID or name..." style="width: 240px; padding: 6px 10px; font-size: 12px;">
            <select class="form-select" style="padding: 6px 10px; font-size: 12px;">
              <option value="">Status: All</option>
              <option value="Running">Running</option>
              <option value="Completed">Completed</option>
            </select>
          </div>
          <span style="font-size: 12px; color: var(--text-muted);">${jobs.length} Tracked Runs</span>
        </div>

        <div class="data-table-container">
          <table class="data-table">
            <thead>
              <tr>
                <th>Job Identifier</th>
                <th>Execution Pipeline</th>
                <th>Source Target</th>
                <th>Domain Entity</th>
                <th>Status</th>
                <th style="text-align: right;">Records</th>
                <th>Duration</th>
                <th>Started</th>
                <th style="text-align: right;">Inspect</th>
              </tr>
            </thead>
            <tbody>
              ${jobs.map(j => `
                <tr style="cursor: pointer;" onclick="window.location.hash='#/operations/jobs/${j.id}'">
                  <td class="cell-mono cell-highlight">${j.id}</td>
                  <td><strong>${j.name}</strong></td>
                  <td>${j.source}</td>
                  <td><span class="badge badge-neutral">${j.entity}</span></td>
                  <td>
                    <span class="badge ${j.status === 'Running' ? 'badge-info' : 'badge-success'}">
                      ${j.status === 'Running' ? '<span style="display:inline-block; animation:spin 1s linear infinite;">⏳</span>' : '✓'} ${j.status}
                    </span>
                  </td>
                  <td class="cell-mono" style="text-align: right; color: #fff;">${j.records}</td>
                  <td class="cell-mono">${j.duration}</td>
                  <td style="font-size: 12px; color: var(--text-muted);">${j.started}</td>
                  <td style="text-align: right;" onclick="event.stopPropagation()">
                    <a href="#/operations/jobs/${j.id}" class="btn btn-secondary btn-sm">Inspect Stages →</a>
                  </td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  `;
  }


  // ==================== src/pages/operations/jobDetails.js ====================
  // Page 39: Job Details & Pipeline Stage Monitor (Route: /operations/jobs/:jobId)
  async function renderJobDetailsPage(params) {
    const jobId = params.jobId || 'job-9820';
    const job = (await repository.getJob(jobId)) || (await repository.getJobs())[1];

    const stages = [
      { name: 'Discovery', status: 'Completed', icon: '✓', color: '#34d399', desc: 'Discovered schemas & foreign keys' },
      { name: 'Profiling', status: 'Completed', icon: '✓', color: '#34d399', desc: 'Calculated completeness & null distributions' },
      { name: 'Standardization', status: 'Completed', icon: '✓', color: '#34d399', desc: 'Normalized phone numbers to E.164 and ISO country codes' },
      { name: 'DQ Validation', status: 'Completed', icon: '✓', color: '#34d399', desc: 'Executed 4 active data quality rules' },
      { name: 'Matching Engine', status: 'Completed', icon: '✓', color: '#34d399', desc: 'Calculated composite similarity scores via Customer Standard v4' },
      { name: 'Survivorship', status: 'Running', icon: '●', color: '#6366f1', desc: 'Resolving winning attribute source hierarchy', active: true },
      { name: 'Publish & Index', status: 'Queued', icon: '○', color: '#64748b', desc: 'Publishing golden records to downstream data product API' }
    ];

    return `
    <div class="page-container">
      <div style="margin-bottom: 12px;">
        ${renderBreadcrumbs([
      { label: 'Operations', route: '#/operations/jobs' },
      { label: 'Pipeline Jobs', route: '#/operations/jobs' },
      { label: `${job.name} (${job.id})`, route: `#/operations/jobs/${job.id}` }
    ])}
      </div>

      <div class="page-header">
        <div class="page-title-group">
          <div style="display: flex; align-items: center; gap: 8px;">
            <h1 class="page-title">${job.name}</h1>
            <span class="badge ${job.status === 'Running' ? 'badge-info' : 'badge-success'}">${job.status}</span>
          </div>
          <p class="page-description">Job ID: <code>${job.id}</code> • Type: ${job.type} • Started: ${job.started}</p>
        </div>
      </div>

      <!-- Metrics Grid (Section 39) -->
      <div class="kpi-grid">
        <div class="kpi-card">
          <span class="kpi-label">Records Processed</span>
          <div class="kpi-value">${job.records}</div>
          <div class="kpi-delta positive"><span>●</span> Zero-copy batch slice</div>
        </div>
        <div class="kpi-card">
          <span class="kpi-label">Records Failed</span>
          <div class="kpi-value" style="color: #34d399;">0</div>
          <div class="kpi-delta positive"><span>✓</span> 100% throughput</div>
        </div>
        <div class="kpi-card">
          <span class="kpi-label">Total Matches</span>
          <div class="kpi-value" style="color: #38bdf8;">1,842,100</div>
          <div class="kpi-delta positive"><span>⚡</span> 91.7% match rate</div>
        </div>
        <div class="kpi-card">
          <span class="kpi-label">Duration</span>
          <div class="kpi-value cell-mono">${job.duration}</div>
          <div class="kpi-delta positive"><span>⚡</span> Distributed Spark cluster</div>
        </div>
      </div>

      <!-- Execution Pipeline Stages (Section 39) -->
      <div class="card">
        <h3 style="font-size: 14px; font-weight: 600; color: #fff; margin-bottom: 16px;">Pipeline Execution Stages</h3>
        
        <div style="display: flex; flex-direction: column; gap: 12px;">
          ${stages.map((st, idx) => `
            <div style="display: flex; align-items: center; gap: 14px; padding: 12px 16px; background: ${st.active ? 'rgba(99, 102, 241, 0.1)' : 'var(--bg-card-subtle)'}; border: 1px solid ${st.active ? 'var(--primary)' : 'var(--border-subtle)'}; border-radius: var(--radius-md);">
              <div style="width: 28px; height: 28px; border-radius: 50%; background: ${st.color}22; color: ${st.color}; display: flex; align-items: center; justify-content: center; font-weight: 700; font-size: 13px;">
                ${st.icon}
              </div>
              <div style="flex: 1;">
                <div style="display: flex; align-items: center; gap: 8px;">
                  <strong style="color: #fff; font-size: 13px;">${idx + 1}. ${st.name}</strong>
                  <span class="badge ${st.status === 'Completed' ? 'badge-success' : (st.status === 'Running' ? 'badge-info' : 'badge-neutral')}">${st.status}</span>
                </div>
                <div style="font-size: 11.5px; color: var(--text-secondary); margin-top: 2px;">${st.desc}</div>
              </div>
              <div class="cell-mono" style="font-size: 11px; color: var(--text-dim);">
                ${st.status === 'Completed' ? '28s' : (st.status === 'Running' ? 'In Progress' : 'Pending')}
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    </div>
  `;
  }


  // ==================== src/pages/operations/health.js ====================
  // Page 40: System Infrastructure & Telemetry Health (Route: /operations/health)
  async function renderHealthPage() {
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


  // ==================== src/pages/admin/domains.js ====================
  // Page 41: Multi-Domain Management (Route: /admin/domains)
  async function renderDomainsPage() {
    const domains = [
      { name: 'Customer', status: 'Configured & Active', entities: 'Customer, Contact, Account', goldenCount: '18.2M', desc: 'Enterprise primary master customer domain. Zero-copy resolution active.' },
      { name: 'Product', status: 'Planned (Q4)', entities: 'Product, SKU, CatalogItem', goldenCount: '—', desc: 'Global SKU unification and hierarchy aggregation.' },
      { name: 'Supplier', status: 'Planned', entities: 'Vendor, SupplierSite, Contract', goldenCount: '—', desc: 'Procurement vendor consolidation and sanctions screening.' },
      { name: 'Location', status: 'Planned', entities: 'Facility, Warehouse, Store', goldenCount: '—', desc: 'Geospatial facility master coordinates.' },
      { name: 'Organization', status: 'Active (B2B)', entities: 'LegalEntity, UltimateParent', goldenCount: '4.2M', desc: 'Corporate hierarchy mapping and D-U-N-S linkage.' }
    ];

    return `
    <div class="page-container">
      <div style="margin-bottom: 12px;">
        ${renderBreadcrumbs([
      { label: 'Administration', route: '#/admin/domains' },
      { label: 'Master Domains', route: '#/admin/domains' }
    ])}
      </div>

      <div class="page-header">
        <div class="page-title-group">
          <h1 class="page-title">Enterprise Master Domains</h1>
          <p class="page-description">Manage entity domain definitions, partition policies, and canonical schema scopes.</p>
        </div>
      </div>

      <div class="table-card">
        <table class="data-table">
          <thead>
            <tr>
              <th>Domain Name</th>
              <th>Status</th>
              <th>Canonical Entities</th>
              <th>Master Records</th>
              <th>Description</th>
              <th style="text-align: right;">Action</th>
            </tr>
          </thead>
          <tbody>
            ${domains.map(d => `
              <tr>
                <td class="cell-highlight"><strong>${d.name}</strong></td>
                <td>
                  <span class="badge ${d.status.includes('Active') ? 'badge-success' : 'badge-neutral'}">
                    ${d.status}
                  </span>
                </td>
                <td class="cell-mono" style="font-size: 11.5px;">${d.entities}</td>
                <td class="cell-mono" style="color: #38bdf8;">${d.goldenCount}</td>
                <td style="font-size: 12px; color: var(--text-secondary);">${d.desc}</td>
                <td style="text-align: right;">
                  <a href="#/admin/entity-models" class="btn btn-secondary btn-sm">Model Schema →</a>
                </td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      </div>
    </div>
  `;
  }


  // ==================== src/pages/admin/entityModels.js ====================
  // Page 42: Canonical Entity Models (Route: /admin/entity-models)
  async function renderEntityModelsPage() {
    return `
    <div class="page-container">
      <div style="margin-bottom: 12px;">
        ${renderBreadcrumbs([
      { label: 'Administration', route: '#/admin/domains' },
      { label: 'Canonical Entity Models', route: '#/admin/entity-models' }
    ])}
      </div>

      <div class="page-header">
        <div class="page-title-group">
          <h1 class="page-title">Canonical Customer Entity Model</h1>
          <p class="page-description">Standardized data ontology tree establishing the enterprise single customer definition.</p>
        </div>
      </div>

      <div class="card" style="font-family: var(--font-mono); font-size: 13px; line-height: 1.8; background: var(--bg-card-subtle);">
        <div style="color: #38bdf8; font-weight: 700; font-size: 15px; margin-bottom: 8px;">Customer (Master Entity)</div>
        <div style="padding-left: 20px; color: var(--text-secondary);">
          ├── <strong style="color: #fff;">Identity</strong>: canonical_id, tax_number, legal_name, duns_number<br>
          ├── <strong style="color: #fff;">Name</strong>: first_name, middle_name, last_name, prefix, suffix<br>
          ├── <strong style="color: #fff;">Contact</strong>: primary_email (RFC 5322), secondary_email, phone_e164, mobile_phone<br>
          ├── <strong style="color: #fff;">Address</strong>: street_address, suite_line, city, state_province, postal_code, country_iso2<br>
          ├── <strong style="color: #fff;">Demographics</strong>: birth_date, gender, preferred_language, segment_code<br>
          ├── <strong style="color: #fff;">Relationships</strong>: household_id, employer_org_id, parent_account_id<br>
          └── <strong style="color: #fff;">Identifiers</strong>: sfdc_account_id, sap_kunnr, postgres_uuid, billing_account_num
        </div>
      </div>
    </div>
  `;
  }


  // ==================== src/pages/admin/users.js ====================
  // Page 43: Users & Role-Based Access Control (Route: /admin/users)
  async function renderUsersPage() {
    const users = await repository.getUsers();

    return `
    <div class="page-container">
      <div style="margin-bottom: 12px;">
        ${renderBreadcrumbs([
      { label: 'Administration', route: '#/admin/domains' },
      { label: 'Users & Roles', route: '#/admin/users' }
    ])}
      </div>

      <div class="page-header">
        <div class="page-title-group">
          <h1 class="page-title">Users & Role-Based Governance</h1>
          <p class="page-description">Manage enterprise identity permissions across Data Architects, Data Stewards, Business Analysts, and Administrators.</p>
        </div>
      </div>

      <div class="table-card">
        <table class="data-table">
          <thead>
            <tr>
              <th>User Name</th>
              <th>Email Address</th>
              <th>Assigned Platform Role</th>
              <th>Organizational Unit</th>
              <th>Status</th>
              <th style="text-align: right;">Action</th>
            </tr>
          </thead>
          <tbody>
            ${users.map(u => `
              <tr>
                <td class="cell-highlight"><strong>${u.name}</strong></td>
                <td class="cell-mono">${u.email}</td>
                <td>
                  <span class="badge ${u.role === 'Data Architect' ? 'badge-primary' : (u.role === 'Data Steward' ? 'badge-warning' : 'badge-neutral')}">
                    ${u.role}
                  </span>
                </td>
                <td style="color: var(--text-secondary);">${u.department}</td>
                <td><span class="badge badge-success">${u.status}</span></td>
                <td style="text-align: right;">
                  <button class="btn btn-ghost btn-sm" onclick="alert('Editing permissions for ${u.name}')">Edit Permissions</button>
                </td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      </div>
    </div>
  `;
  }


  // ==================== src/pages/admin/aiProviders.js ====================
  // Page 44: AI Providers & Foundation Models (Route: /admin/ai-providers)
  async function renderAiProvidersPage() {
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


  // ==================== src/pages/admin/settings.js ====================
  // Page 45: Platform Settings & Retention (Route: /admin/settings)
  async function renderSettingsPage() {
    return `
    <div class="page-container" style="max-width: 850px; margin: 0 auto;">
      <div style="margin-bottom: 12px;">
        ${renderBreadcrumbs([
      { label: 'Administration', route: '#/admin/domains' },
      { label: 'Platform Settings', route: '#/admin/settings' }
    ])}
      </div>

      <div class="page-header">
        <div class="page-title-group">
          <h1 class="page-title">Platform & Governance Settings</h1>
          <p class="page-description">Configure default auto-match thresholds, audit retention windows, and AI reasoning quotas.</p>
        </div>
      </div>

      <div class="card" style="display: flex; flex-direction: column; gap: 20px;">
        <div>
          <h3 style="font-size: 14px; font-weight: 600; color: #fff; margin-bottom: 6px;">Default Unification Thresholds</h3>
          <p style="font-size: 12px; color: var(--text-secondary); margin-bottom: 12px;">Default boundary parameters applied to newly created entity match strategies.</p>
          <div class="grid-2">
            <div class="form-group">
              <label class="form-label">Auto-Match Cutoff Score (%)</label>
              <input type="number" class="form-input" value="95">
            </div>
            <div class="form-group">
              <label class="form-label">Steward Review Cutoff Score (%)</label>
              <input type="number" class="form-input" value="85">
            </div>
          </div>
        </div>

        <div style="padding-top: 14px; border-top: 1px solid var(--border-subtle);">
          <h3 style="font-size: 14px; font-weight: 600; color: #fff; margin-bottom: 6px;">Audit & Snapshot Data Retention</h3>
          <p style="font-size: 12px; color: var(--text-secondary); margin-bottom: 12px;">Compliance data retention policy for immutable steward decision history.</p>
          <div class="grid-2">
            <div class="form-group">
              <label class="form-label">Steward Audit History Retention</label>
              <select class="form-select">
                <option value="7y">7 Years (SOC2 & Basel III Financial Standard)</option>
                <option value="10y">10 Years</option>
                <option value="indefinite">Indefinite Immutable Archive</option>
              </select>
            </div>
            <div class="form-group">
              <label class="form-label">Lineage Graph Snapshot Frequency</label>
              <select class="form-select">
                <option value="daily">Daily Delta Snapshots</option>
                <option value="hourly">Hourly Snapshots</option>
              </select>
            </div>
          </div>
        </div>

        <div style="padding-top: 14px; border-top: 1px solid var(--border-subtle); display: flex; justify-content: flex-end;">
          <button class="btn btn-primary" onclick="alert('Settings successfully updated.')">Save Changes</button>
        </div>
      </div>
    </div>
  `;
  }


  // ==================== src/main.js ====================
  // Main Application Bootstrap for Unify AI Fabric









  // Import All Page Renderers















































  // Authentication Pages (Section 2.1)




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
  window.unifyToggleMobileSidebar = (forceState) => {
    const sidebar = document.querySelector('.app-sidebar');
    const backdrop = document.getElementById('sidebar-backdrop');
    if (!sidebar) return;

    const isOpen = typeof forceState === 'boolean' ? forceState : !sidebar.classList.contains('mobile-open');
    if (isOpen) {
      sidebar.classList.add('mobile-open');
      if (backdrop) backdrop.classList.add('open');
    } else {
      sidebar.classList.remove('mobile-open');
      if (backdrop) backdrop.classList.remove('open');
    }
  };

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
    const email = document.getElementById('login-email')?.value || 'John@unify.ai';
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
      name: 'John Smith',
      role: 'Data Architect',
      email: 'John@unify.ai',
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


})();

