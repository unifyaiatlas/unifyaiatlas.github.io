// Comprehensive Enterprise Mock Data Store for Unify AI Fabric

export const initialSources = [
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

export const initialDiscoveredDatasets = [
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

export const initialSchemaMappings = [
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

export const initialProfiles = [
  { attribute: 'organization.name', completeness: 99.4, uniqueness: 88.2, validity: 98.7, nullRate: '0.6%', samples: ['Apex Global', 'Acme Corp', 'Tata Consultancy'] },
  { attribute: 'contact.email', completeness: 94.8, uniqueness: 91.5, validity: 96.2, nullRate: '5.2%', samples: ['robert@abc.com', 'contact@apex.io'] },
  { attribute: 'contact.phone', completeness: 89.1, uniqueness: 86.4, validity: 92.0, nullRate: '10.9%', samples: ['+919876543210', '+14155552671'] },
  { attribute: 'address.country', completeness: 98.9, uniqueness: 12.1, validity: 99.8, nullRate: '1.1%', samples: ['India', 'United States', 'Germany'] },
  { attribute: 'account.identifier', completeness: 100.0, uniqueness: 100.0, validity: 100.0, nullRate: '0.0%', samples: ['CUST-00192837', 'CRM-10231'] }
];

export const initialDQRules = [
  { id: 'dq-1', name: 'Email Required & Valid Format', entity: 'Customer', attribute: 'contact.email', type: 'Format', severity: 'Error', status: 'Active', failureRate: '3.8%', totalChecked: '4.8M' },
  { id: 'dq-2', name: 'Valid E.164 Phone Number', entity: 'Customer', attribute: 'contact.phone', type: 'Format', severity: 'Warning', status: 'Active', failureRate: '7.9%', totalChecked: '4.8M' },
  { id: 'dq-3', name: 'Mandatory Legal Entity Name', entity: 'Customer', attribute: 'organization.name', type: 'Required', severity: 'Error', status: 'Active', failureRate: '0.6%', totalChecked: '4.8M' },
  { id: 'dq-4', name: 'ISO-3166 Standard Country Code', entity: 'Customer', attribute: 'address.country', type: 'Reference', severity: 'Warning', status: 'Active', failureRate: '1.2%', totalChecked: '4.8M' }
];

export const initialDQIssues = [
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

export const initialMatchStrategies = [
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

export const initialMatches = [
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

export const initialGoldenEntities = [
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

export const initialJobs = [
  { id: 'job-9821', name: 'Continuous CDC Ingestion - Salesforce', type: 'Zero-Copy Sync', source: 'Salesforce CRM', entity: 'Account', status: 'Running', records: '14,209', duration: 'Ongoing', started: '10 min ago' },
  { id: 'job-9820', name: 'Customer Reconciliation & Matching', type: 'Unification Funnel', source: 'Multi-Source', entity: 'Customer', status: 'Completed', records: '2,481,200', duration: '4m 12s', started: '1 hour ago' },
  { id: 'job-9819', name: 'SAP S/4HANA Materialization Delta', type: 'Batch Extract', source: 'SAP ERP', entity: 'Customer', status: 'Completed', records: '128,400', duration: '1m 45s', started: '2 hours ago' },
  { id: 'job-9818', name: 'DQ Profiling & Anomaly Scan', type: 'Data Quality', source: 'Databricks', entity: 'All Entities', status: 'Completed', records: '18.2M', duration: '12m 30s', started: '5 hours ago' }
];

export const initialAIProviders = [
  { id: 'ai-google', provider: 'Google Cloud Vertex AI', model: 'Gemini 1.5 Pro', status: 'Active', latency: '240ms', purpose: 'Semantic Schema Mapping, LLM Entity Resolution, Match Explanation' },
  { id: 'ai-openrouter', provider: 'OpenRouter Enterprise', model: 'Meta Llama 3.1 70B', status: 'Active', latency: '310ms', purpose: 'DQ Rule Generation, Natural Language Copilot' },
  { id: 'ai-anthropic', provider: 'Anthropic Bedrock', model: 'Claude 3.5 Sonnet', status: 'Available', latency: '290ms', purpose: 'Complex Multi-Table Survivorship Reasoning' }
];

export const initialUsers = [
  { id: 'usr-1', name: 'John Smith', email: 'John@unify.ai', role: 'Data Architect', department: 'Enterprise Data Office', status: 'Active' },
  { id: 'usr-2', name: 'Elena Rostova', email: 'elena@unify.ai', role: 'Data Steward', department: 'MDM Governance Group', status: 'Active' },
  { id: 'usr-3', name: 'Marcus Vance', email: 'marcus@unify.ai', role: 'Analyst', department: 'Commercial Operations', status: 'Active' },
  { id: 'usr-4', name: 'Sarah Chen', email: 'sarah@unify.ai', role: 'Administrator', department: 'Cloud Infrastructure', status: 'Active' }
];
