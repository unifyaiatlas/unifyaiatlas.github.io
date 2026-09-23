Unify customer, product, supplier, location and other business entities across heterogeneous sources without requiring wholesale physical replication of source data. Databricks becomes the intelligent unification and processing layer, while source systems remain authoritative.
Given the architecture we've developed around CDUF / Unify AI, the salient features can be organized as follows.
1. Zero-Copy Data Access
•	No mandatory bulk replication of source data into the lakehouse.
•	Access data in-place through:
o	Lakehouse Federation
o	Delta Sharing
o	External tables
o	JDBC/ODBC federation
o	Cloud-native data sharing mechanisms
o	APIs/connectors where required
•	Virtualized source access for supported source platforms.
•	Preserve the source system as the system of record.
•	Copy data only when there is a specific performance, latency, regulatory, or processing reason.
•	Support hybrid zero-copy + selective materialization.
•	Avoid creation of multiple uncontrolled copies of the same customer/product/entity data.
Key architectural principle
Source → Virtual Access → Unification → Golden View
rather than:
Source → ETL Copy → Staging DB → MDM DB → Data Warehouse → Consumer
________________________________________
2. Universal Source Connectivity
Support heterogeneous enterprise sources such as:
•	Salesforce
•	SAP
•	Oracle
•	SQL Server
•	PostgreSQL
•	MongoDB
•	Reltio
•	Snowflake
•	Databricks
•	REST APIs
•	Files
•	SFTP
•	Kafka
•	Azure Event Hubs
•	AWS SQS
•	CDC streams
•	SaaS applications
•	Data warehouses
•	Data lakes
The framework should provide a common connectivity abstraction, so the unification engine does not need to understand the peculiarities of every source.
________________________________________
3. Source-Agnostic Data Ingestion
Even though the architecture is zero-copy, ingestion should support multiple modes:
Zero-copy
Data remains at source and is queried/federated.
Incremental ingestion
Only changed records are brought into Delta.
CDC
Capture:
•	Inserts
•	Updates
•	Deletes
•	Before/after images where available
Streaming
Support near-real-time:
Kafka / Event Hub
       ↓
Structured Streaming
       ↓
Delta
       ↓
Unification
       ↓
Golden Entity
Batch
For sources where streaming or federation isn't appropriate.
________________________________________
4. Intelligent Data Discovery & Profiling
Automatically profile incoming domains.
Examples:
•	Null percentage
•	Cardinality
•	Distinct values
•	Pattern detection
•	Data types
•	Frequency distributions
•	Duplicate candidates
•	Referential integrity
•	Outliers
•	PII detection
•	Sensitive data classification
•	Source completeness
•	Attribute reliability
The framework should automatically answer:
"What does this dataset actually contain?"
before attempting unification.
________________________________________
5. AI-Assisted Schema Understanding
A particularly strong feature for Unify AI.
The framework can infer:
cust_no
customer_id
party_id
client_number
account_number
as potential representations of:
Customer Identifier
Likewise:
fname
first_nm
given_name
forename
→ First Name
And:
addr1
address_line_1
street_address
line1
→ Address Line 1
Capabilities:
•	Semantic column matching
•	Data type inference
•	Business meaning inference
•	Domain detection
•	Canonical attribute recommendation
•	Source-to-canonical mapping suggestions
•	Confidence scoring
•	Human approval
________________________________________
6. Canonical Data Model
Provide a Global Common Core Model for each mastered domain.
For example:
Customer
 ├── identifiers
 ├── name
 ├── contact
 ├── address
 ├── demographics
 ├── preferences
 ├── affiliations
 └── relationships
The model becomes the semantic contract between:
•	Source systems
•	Unification engine
•	Golden records
•	Consumers
•	APIs
•	AI/ML applications
The important distinction is:
Canonicalization does not require physically copying every source attribute.
The framework can maintain mappings back to the original source.
________________________________________
7. Intelligent Data Standardization
Normalize data before matching.
Examples:
Names
Robert J Smith
ROBERT J. SMITH
Bob Smith
Phone
+91 98765 43210
09876543210
9876543210
Address
Normalize:
•	abbreviations
•	postal codes
•	country
•	state
•	city
•	street
•	apartment/unit
Other standardization
•	Email
•	Dates
•	Currency
•	Units
•	Country codes
•	State codes
•	Industry codes
•	Product codes
•	Reference data
________________________________________
8. Reference Data Management
Centralized management of:
•	Country
•	State
•	City
•	Currency
•	Language
•	Industry
•	Product hierarchy
•	Customer type
•	Status codes
•	Business classifications
Support:
•	Effective dating
•	Versioning
•	Mapping
•	Crosswalks
•	Hierarchies
•	Source-specific codes
________________________________________
9. Data Quality Engine
Configurable DQ framework covering:
Completeness
Email must not be null
Validity
Email must conform to pattern
Uniqueness
Customer ID should be unique within source
Consistency
Country = IN
State must belong to India
Referential integrity
Customer → Address
Customer → Account
Business rules
Customer status = ACTIVE
→ activation date required
Each record can receive a:
Data Quality Score
________________________________________
10. Advanced Entity Resolution
This is one of the core differentiators.
Support multiple matching techniques:
Deterministic
Email = Email
Rule-based
Name + DOB + Address
Fuzzy
•	Levenshtein
•	Jaro-Winkler
•	phonetic matching
•	address similarity
Probabilistic
Calculate match probability using multiple attributes.
ML/AI-assisted
Use learned patterns and embeddings where appropriate.
________________________________________
11. Multi-Level Match Strategy
Instead of one enormous matching rule:
Level 1 → Exact identifiers
Level 2 → Strong deterministic
Level 3 → Fuzzy rules
Level 4 → Probabilistic
Level 5 → AI-assisted
Level 6 → Steward review
This provides both:
high precision + scalable recall
________________________________________
12. Match Explainability
Every match should be explainable.
Example:
Customer A and Customer B were unified because:
•	Email: exact match — 40%
•	Phone: exact match — 25%
•	Name: 96% similarity — 20%
•	Address: 91% similarity — 15%
Overall confidence: 94%
This is especially important for enterprise MDM.
________________________________________
13. Match Confidence & Threshold Management
Support configurable thresholds:
≥ 95%       → Auto merge
80–95%      → Steward review
< 80%       → Do not merge
Thresholds can vary by:
•	Domain
•	Source
•	Attribute
•	Geography
•	Entity type
•	Business unit
________________________________________
14. Golden Record Creation
The framework creates a canonical Golden Entity.
Example:
Golden Customer
       │
       ├── Source A
       ├── Source B
       ├── Source C
       └── Source D
The Golden Entity maintains:
•	Golden ID
•	Source IDs
•	Attribute values
•	Winning values
•	Confidence
•	Source provenance
•	Match relationships
•	Survivorship decisions
•	Effective dates
________________________________________
15. Attribute-Level Survivorship
Not merely:
"Source A wins."
Instead:
Customer
 ├── Name        → CRM
 ├── Email       → ERP
 ├── Phone       → CRM
 ├── Address     → Billing
 └── DOB         → KYC
Support strategies such as:
•	Source priority
•	Most recent
•	Most complete
•	Most frequent
•	Highest confidence
•	Business rule
•	Trusted source
•	Manual override
•	AI-assisted recommendation
________________________________________
16. Temporal / SCD-Aware Unification
Maintain history rather than overwriting everything.
For example:
Address
2024 → Mumbai
2025 → Pune
2026 → Dubai
Support:
•	Effective-from
•	Effective-to
•	Current flag
•	Historical values
•	Change detection
•	Retroactive corrections
________________________________________
17. Relationship Resolution
Move beyond simple entity matching.
Support:
Customer
   ↓
Account
   ↓
Household
   ↓
Organization
   ↓
Location
Examples:
•	Customer → Account
•	Customer → Household
•	Customer → Employer
•	Product → Category
•	Supplier → Organization
•	Employee → Organization
•	Contact → Account
This enables a true entity graph.
________________________________________
18. Identity Graph
Maintain:
Golden Entity
      │
 ┌────┼────┐
 ↓    ↓    ↓
CRM  ERP  Web
ID   ID   ID
The identity graph allows consumers to resolve:
"Which records across the enterprise represent this same real-world entity?"
________________________________________
19. Full Data Lineage
Every golden attribute should be traceable.
Example:
Golden.Customer.Email
        ↓
CRM.Customer.Email
        ↓
CRM Record 78432
        ↓
Loaded 2026-09-22 14:32
Track:
•	Source
•	Source record
•	Source attribute
•	Transformation
•	Match decision
•	Survivorship rule
•	Timestamp
•	Pipeline/job
•	Version
________________________________________
20. Complete Auditability
Maintain immutable history of:
•	Match decisions
•	Merge decisions
•	Unmerge decisions
•	Survivorship decisions
•	Steward changes
•	Rule changes
•	Model changes
•	Data changes
This becomes particularly valuable for regulated environments.
________________________________________
21. Merge & Unmerge
Support:
Merge
A + B + C
    ↓
Golden G
Unmerge
Golden G
 ↓
A + B + C
with complete lineage so that merges aren't irreversible black-box operations.
________________________________________
22. Human-in-the-Loop Stewardship
AI should recommend; humans can govern.
Examples:
Potential duplicate detected
        ↓
AI recommendation
        ↓
Confidence = 87%
        ↓
Steward review
        ↓
Approve / Reject
Steward capabilities:
•	Review matches
•	Approve merges
•	Reject matches
•	Override survivorship
•	Correct data
•	Resolve conflicts
•	Investigate lineage
________________________________________
23. AI Data Steward / Copilot
Natural-language interaction:
"Why were these two customers merged?"
"Show me conflicting addresses."
"Which source is most trusted for phone number?"
"Why did CRM win this attribute?"
"Find customers with suspicious duplicate identities."
This fits directly into the Unify AI vision.
________________________________________
24. Delta Lake Data Plane
Databricks/Delta becomes the scalable processing layer.
Typical logical architecture:
                 SOURCES
                    │
        ┌───────────┴───────────┐
        │                       │
   Zero-Copy Access          CDC/Stream
        │                       │
        └───────────┬───────────┘
                    ↓
              DATA ACCESS
                    ↓
              PROFILING/DQ
                    ↓
             STANDARDIZATION
                    ↓
              MATCH ENGINE
                    ↓
             ENTITY RESOLUTION
                    ↓
             SURVIVORSHIP
                    ↓
              GOLDEN ENTITY
                    ↓
              ENTITY GRAPH
                    ↓
          ┌─────────┼─────────┐
          ↓         ↓         ↓
        APIs      Events    Analytics
________________________________________
25. Bronze / Silver / Gold Architecture
Where physical materialization is required:
Bronze
Raw source representation.
Silver
Standardized, cleansed, conformed representation.
Gold
Mastered/golden entities.
But the framework can selectively bypass these physical layers for sources where zero-copy access is appropriate.
________________________________________
26. Incremental Unification
Do not rematch the entire enterprise dataset every time.
Use:
•	CDC
•	Change Data Feed
•	Delta MERGE
•	Incremental entity resolution
•	Impact analysis
•	Dependency-aware processing
For example:
10M customers

Only 12,000 changed

→ process affected entities
→ update impacted golden records
________________________________________
27. Scalable Spark-Based Processing
Designed for enterprise-scale datasets using:
•	Spark
•	PySpark
•	SQL
•	Delta
•	Structured Streaming
•	Distributed matching
•	Parallel processing
Support millions/billions of records without relying on an operational database as the primary processing engine.
________________________________________
28. Batch + Real-Time Unification
Same framework supports:
Batch
  ↓
Unification

Streaming
  ↓
Unification

API request
  ↓
Real-time resolution
This creates a common identity resolution platform rather than separate batch and real-time MDM implementations.
________________________________________
29. Real-Time Entity Resolution API
Expose capabilities such as:
POST /entity/resolve
Input:
{
  "name": "Robert Smith",
  "email": "robert@example.com",
  "phone": "9876543210"
}
Response:
{
  "goldenId": "CUST-102938",
  "confidence": 0.97
}
Useful for:
•	CRM
•	Customer service
•	Digital channels
•	Fraud
•	Personalization
•	Call centers
•	Applications
________________________________________
30. Event-Driven Architecture
Publish events such as:
ENTITY_CREATED
ENTITY_UPDATED
ENTITY_MERGED
ENTITY_UNMERGED
ATTRIBUTE_CHANGED
MATCH_REVIEW_REQUIRED
Consumers can subscribe without tightly coupling to the MDM engine.
________________________________________
31. Activation / Reverse ETL
The golden entity shouldn't remain trapped inside Databricks.
Publish mastered information to:
•	Salesforce
•	CRM
•	Marketing platforms
•	ERP
•	Customer service
•	Operational applications
•	APIs
•	Event streams
•	Data products
________________________________________
32. Source-System Writeback
Where required, support controlled synchronization back to operational systems.
Important distinction:
Unification does not necessarily make Databricks the transactional system of record.
Source ownership can remain intact.
________________________________________
33. Source Ownership & Governance
Maintain metadata such as:
Attribute: Email
Owner: CRM
Priority: 1
Update policy: Source-controlled
This prevents uncontrolled golden-record overwrites.
________________________________________
34. Unity Catalog Governance
Use Databricks governance capabilities for:
•	Catalogs
•	Schemas
•	Tables
•	Columns
•	Permissions
•	Row-level access
•	Column-level controls
•	Data discovery
•	Lineage
•	Auditing
________________________________________
35. PII & Sensitive Data Controls
Identify and govern:
•	Email
•	Phone
•	Address
•	DOB
•	Government identifiers
•	Financial identifiers
Support:
•	Masking
•	Tokenization
•	Restricted access
•	Encryption
•	Auditing
________________________________________
36. Multi-Domain MDM
Not restricted to Customer.
The same framework can unify:
Customer
Product
Supplier
Location
Employee
Organization
Asset
Provider
Account
with domain-specific:
•	Models
•	Matching
•	Survivorship
•	DQ
•	Relationships
________________________________________
37. Metadata-Driven Architecture
One of the strongest enterprise features.
Instead of hardcoding pipelines, maintain metadata for:
Domain
Entity
Attribute
Source
Mapping
Transformation
DQ Rule
Match Rule
Survivorship Rule
Relationship
Security Policy
Then the platform dynamically generates/execut es the appropriate processing.
________________________________________
38. Configuration-Driven Matching
Business users can configure:
Match Rule
   ↓
Conditions
   ↓
Weights
   ↓
Threshold
   ↓
Action
without modifying application code.
________________________________________
39. AI-Assisted Rule Generation
A user can say:
"Create a customer matching strategy using email, phone, name and address, with email receiving the highest confidence."
The AI proposes:
•	Match rules
•	Weights
•	Thresholds
•	DQ rules
•	Survivorship strategy
The steward reviews and publishes them.
________________________________________
40. Simulation / What-If Analysis
Before deploying a new rule:
Current rule
      ↓
1.2M matches

Proposed rule
      ↓
1.37M matches

Potential false positives
      ↓
review
Allow users to compare:
•	Match volumes
•	New matches
•	Lost matches
•	Potential false positives
•	Golden-record changes
This is extremely useful for enterprise MDM governance.
________________________________________
41. Data Quality & Match Scorecards
Dashboard across:
•	Source quality
•	Duplicate rate
•	Match rate
•	Auto-match rate
•	Steward-review rate
•	False-positive rate
•	Golden-record completeness
•	Survivorship conflicts
•	Unresolved entities
________________________________________
42. Operational Observability
Track:
•	Pipeline health
•	Job duration
•	Records processed
•	Records failed
•	Match throughput
•	DQ failures
•	Streaming lag
•	API latency
•	Source availability
•	Data freshness
________________________________________
43. Failure Recovery & Replay
Because the architecture is Delta-based, support:
•	Checkpointing
•	Retry
•	Replay
•	Idempotent processing
•	Versioning
•	Time travel
•	Pipeline recovery
A failed job should not require starting the entire unification process again.
________________________________________
44. Versioned Rules & Models
Version:
Canonical model v1.2
Match rules v4.1
Survivorship rules v3.7
DQ rules v2.5
This allows:
•	Reproducibility
•	Auditability
•	Controlled deployment
•	Rollback
•	Historical explanation
________________________________________
45. Environment Promotion
Support:
DEV
 ↓
TEST
 ↓
UAT
 ↓
PROD
with controlled promotion of:
•	Metadata
•	Rules
•	Models
•	Pipelines
•	Configuration
________________________________________
46. API + Data Product Architecture
Consumers can access unified data through:
APIs
GET /customer/{id}
SQL
SELECT * FROM customer_golden
Delta Sharing
For governed data sharing.
Events
CustomerUpdated
Data products
Domain-specific curated datasets.
________________________________________
47. AI/ML Ready Golden Data
The framework can expose trusted, mastered datasets to:
•	ML
•	GenAI
•	RAG
•	Customer 360
•	Recommendations
•	Fraud detection
•	Analytics
This solves a major enterprise problem:
AI is only as reliable as the identity and data foundation underneath it.
________________________________________
48. Vector / Semantic Intelligence
For appropriate domains, support:
•	Embeddings
•	Semantic similarity
•	Vector search
•	Entity descriptions
•	Semantic entity retrieval
This can augment—not blindly replace—deterministic and probabilistic matching.
________________________________________
49. Security by Design
Support:
•	RBAC
•	ABAC where applicable
•	Data masking
•	Encryption
•	Secret management
•	Network isolation
•	Audit logs
•	Fine-grained access
•	Environment segregation
________________________________________
50. Cost-Aware Processing
Zero-copy architecture can significantly reduce unnecessary:
•	Data movement
•	Storage
•	ETL
•	Duplicate datasets
•	Processing
•	Operational databases
The framework should also make processing decisions based on:
Query frequency
Data volume
Latency requirement
Compute cost
Freshness requirement
Governance requirement
rather than physically copying everything by default.
________________________________________
51. Hybrid Zero-Copy / Materialized Architecture
This is arguably the most important architectural differentiator.
Not everything should be zero-copy.
The framework intelligently determines:
                    Source
                      │
          ┌───────────┴───────────┐
          ↓                       ↓
      Zero-Copy               Materialize
          │                       │
          │                  Delta Silver
          │                       │
          └───────────┬───────────┘
                      ↓
                 Unification
                      ↓
                Golden Entity
Materialize only when justified by:
•	Performance
•	Real-time requirements
•	Complex transformations
•	Repeated access
•	Historical retention
•	ML processing
•	Regulatory requirements
________________________________________
52. Source-to-Golden Traceability
A particularly compelling capability for your framework:
Source Record
      ↓
Source Attribute
      ↓
Standardization
      ↓
Candidate Match
      ↓
Match Decision
      ↓
Survivorship
      ↓
Golden Attribute
      ↓
Consumer
Every step remains explainable.
________________________________________
53. "Why?" Intelligence
The platform should be able to answer:
Why are these records considered the same entity?
Why did this source win?
Why wasn't this record merged?
Why did the golden record change?
Which source caused this change?
What would happen if this match rule changed?
This transforms MDM from a black-box engine into an explainable data intelligence platform.
________________________________________
54. Composable Architecture
The framework can be decomposed into reusable services:
                    Unify AI
                       │
       ┌───────────────┼────────────────┐
       │               │                │
   Data Access       Control Plane    AI Layer
       │               │                │
       ↓               ↓                ↓
   Profiling        Metadata          Agents
   DQ               Rules             Copilot
   Mapping          Workflow          Explainability
       │               │
       └───────┬───────┘
               ↓
        Unification Engine
               │
       ┌───────┼────────┐
       ↓       ↓        ↓
     Match  Survivorship Graph
               │
               ↓
          Golden Entity
               │
       ┌───────┼────────┐
       ↓       ↓        ↓
      API    Events   Data Products
________________________________________
55. Self-Service MDM
Ultimately, the framework should allow a business user to go from:
"I need a Customer 360."
to:
Select Sources
      ↓
Discover Schema
      ↓
AI Suggests Mapping
      ↓
AI Suggests DQ
      ↓
AI Suggests Match Rules
      ↓
AI Suggests Survivorship
      ↓
Human Review
      ↓
Run Unification
      ↓
Golden Customer
      ↓
Publish
without requiring a large implementation team for every new domain.
________________________________________
The 10 features I would put on the front page
If this is going into a CDUF / Unify AI proposal or architecture deck, I would condense the entire capability set into these ten headline differentiators:
#	Capability	Core proposition
1	Zero-Copy Data Unification	Unify data without unnecessary physical replication
2	AI-Powered Entity Resolution	Deterministic + fuzzy + probabilistic + AI matching
3	Golden Entity & 360° View	Create trusted, mastered business entities
4	Attribute-Level Survivorship	Determine the best value for every attribute
5	Explainable MDM	Explain every match, merge and survivorship decision
6	Real-Time + Batch	One architecture for streaming and batch unification
7	Metadata-Driven MDM	Configure domains, mappings, rules and policies without code
8	Human-in-the-Loop AI	AI recommends; stewards govern and approve
9	End-to-End Lineage	Source → transformation → match → golden → consumer
10	Composable Databricks Data Plane	Delta + Spark + Unity Catalog + AI/ML + APIs + events
And the overarching positioning could be:
A zero-copy, AI-native, metadata-driven Data Unification Fabric on Databricks that discovers, standardizes, resolves, masters, governs and activates enterprise data—while preserving source ownership and providing complete lineage from source record to golden entity.

Area	1-week MVP
Zero-copy access	✅ Demonstrable
Source registration	✅
Schema discovery	✅
AI schema mapping	✅
Canonical model	✅
Data profiling	✅
Data quality rules	✅
Standardization	✅
Deterministic matching	✅
Fuzzy matching	✅
Match confidence	✅
Golden records	✅
Attribute survivorship	✅
Source lineage	✅
Match explanation	✅
Merge/unmerge	✅ Basic
Stewardship UI	✅
Rule configuration	✅
AI rule recommendation	✅
Entity graph	✅ Basic
Batch processing	✅
Incremental processing	✅ Basic
Streaming	⚠️ Thin demo
Real-time API	✅
Events	✅ Basic
Reverse ETL	⚠️ Demo
Unity Catalog governance	⚠️ Integration/demo
PII controls	⚠️ Basic
AI Copilot	✅
Observability	✅ Basic
Versioning	✅ Basic
Recovery/replay	⚠️ Basic
Enterprise security	❌ Production hardening
The trick is not implementing each capability as a separate product.
Instead, build one coherent pipeline:
             SOURCE SYSTEMS
                   │
        ┌──────────┴──────────┐
        │                     │
   Zero-Copy              File/CDC
        │                     │
        └──────────┬──────────┘
                   ↓
            SOURCE REGISTER
                   ↓
          SCHEMA DISCOVERY
                   ↓
          AI MAPPING ENGINE
                   ↓
          CANONICAL MODEL
                   ↓
        PROFILING + DATA QUALITY
                   ↓
          STANDARDIZATION
                   ↓
          MATCH / RESOLUTION
                   ↓
           SURVIVORSHIP
                   ↓
           GOLDEN RECORD
                   ↓
        ┌──────────┼──────────┐
        ↓          ↓          ↓
     GRAPH       API       EVENTS
        │
        ↓
  STEWARD / COPILOT
That gives you one working spine and then exposes capabilities around it.
________________________________________
The key is to define "MVP" correctly
I would not attempt to build:
production-grade zero-copy MDM + enterprise governance + distributed streaming + ML matching + full security + operational writeback
in seven days.
That would be unrealistic.
Instead, build:
a thin but genuine implementation of every architectural capability, with production-quality UI and a real end-to-end execution path.
That's achievable.
________________________________________
A very aggressive 7-day plan
Day 1 — Data Foundation + Zero Copy
Build:
Source Manager
Sources

Salesforce
PostgreSQL
Snowflake
Databricks
CSV
REST API
Each source has:
Name
Type
Connection
Domain
Access mode
Status
Last accessed
Zero-copy abstraction
Create something like:
DataSourceAdapter
       │
       ├── DatabricksAdapter
       ├── JDBCAdapter
       ├── RESTAdapter
       └── FileAdapter
The rest of the system doesn't care where the data lives.
This is extremely important architecturally.
________________________________________
Day 2 — Discovery + AI Mapping
Upload/connect a dataset.
Automatically show:
Customer.csv

42 columns
2.4M records

Potential PII: 7 columns
Potential identifiers: 5
Potential duplicates: 18.4%
Then:
AI Mapping
Source                  Canonical

cust_id       ───────→ customer.identifier
fname         ───────→ person.firstName
lname         ───────→ person.lastName
email_addr    ───────→ contact.email
mobile        ───────→ contact.phone
addr          ───────→ address.line1
with:
Confidence
98%
This alone will make the demo feel very intelligent.
________________________________________
Day 3 — Data Quality + Standardization
Build a configurable rule engine.
Example:
Email
 ├── Required
 ├── Valid format
 └── Lowercase

Phone
 ├── Required
 ├── Valid format
 └── Normalize country code

Name
 └── Trim + casing

Address
 └── Standardize
Dashboard:
Records              2,400,000
Valid                 2,087,421
DQ Issues               312,579

Completeness             91.8%
Validity                 94.3%
Don't build 100 rules.
Build 5–10 generic rule types that are metadata-driven.
That gives you the architecture.
________________________________________
Day 4 — The Heart: Entity Resolution
This should receive the largest amount of effort.
Build:
Deterministic
email exact
phone exact
customer ID exact
Fuzzy
name similarity
address similarity
phone similarity
Weighted score
For example:
Email       40%
Phone       25%
Name        20%
Address     15%
Result:
Source A Customer 1234
        ↕
Source B Customer 8821

Match confidence: 96.7%

MATCH
Then show why.
________________________________________
Day 5 — Golden Record + Survivorship + Graph
Now turn matches into mastered entities.
Example:
                    GOLDEN
                 CUST-0001928
                       │
        ┌──────────────┼──────────────┐
        ↓              ↓              ↓
      CRM             ERP           Web
     C1234            P8932         U9211
Golden record:
Name      Robert Smith
Email     robert@abc.com
Phone     +91 9876543210
Address   Kolkata
Then expose:
Survivorship
Email
CRM              ✓
ERP
Web

Winning source: CRM
Reason: Source Priority
This is where your existing MDM knowledge can make the MVP unusually strong.
________________________________________
Day 6 — Stewardship + AI Copilot
Build the visible "wow" layer.
Potential Matches
┌─────────────────────────────────────────┐
│ Robert Smith                            │
│                                         │
│ CRM-1234 ↔ ERP-8821                     │
│                                         │
│ Match Confidence             96.7%      │
│                                         │
│ Email                     Exact         │
│ Phone                     Exact         │
│ Name                      97%           │
│ Address                   91%           │
│                                         │
│ [Approve] [Reject] [Investigate]        │
└─────────────────────────────────────────┘
Then:
AI Copilot
User:
Why were these records merged?
AI:
They were merged because email and phone matched exactly. Name similarity was 97% and address similarity was 91%. The resulting email was selected from CRM because CRM has the highest survivorship priority for this attribute.
That is an excellent demonstration of explainable AI-powered MDM.
________________________________________
Day 7 — API + Events + Architecture Polish
Expose:
POST /entity/resolve
GET  /entity/{goldenId}
GET  /entity/{goldenId}/lineage
GET  /entity/{goldenId}/relationships
GET  /entity/{goldenId}/explain
And events:
ENTITY_CREATED
ENTITY_UPDATED
ENTITY_MERGED
ENTITY_UNMERGED
MATCH_REVIEW_REQUIRED
Then add:
•	Job execution screen
•	Pipeline status
•	Processing metrics
•	Data lineage
•	Rule version
•	Audit trail
•	Architecture view
At this point you have something that can be demonstrated end-to-end.
________________________________________
What I would deliberately fake/thin out
This is important.
Don't spend your week implementing enterprise infrastructure that doesn't improve the demonstration.
Thin implementations
Streaming
Have a real Structured Streaming path, but demonstrate it with a controlled stream.
Unity Catalog
Demonstrate integration and metadata rather than building elaborate governance.
Security
Implement RBAC conceptually and use Databricks permissions where available.
Reverse ETL
One target connector is enough.
AI matching
Don't train an ML model.
Use:
deterministic
+
fuzzy
+
weighted scoring
+
LLM assistance where useful
Entity graph
Don't build Neo4j.
A Delta-backed relationship model is enough:
entity_id
related_entity_id
relationship_type
confidence
source
Versioning
Metadata version numbers are sufficient for MVP.
________________________________________
One thing I would NOT compromise on
Lineage.
Even in the MVP, every golden attribute should be traceable.
For example:
Golden Customer
      ↓
Email
      ↓
CRM
      ↓
Customer #98273
      ↓
email_address
      ↓
standardized
      ↓
survivorship rule #12
      ↓
Golden Email
This will make the platform feel enterprise-grade, even if the underlying implementation is still an MVP.
________________________________________
Your existing architecture gives you a huge advantage
You already have several foundations that map directly onto this.
Your existing ingestion → cleansing → standardization → match/merge → publish architecture, canonical model, match rules, trust/survivorship concepts, Databricks/Delta architecture, Spring Boot services and AI-provider foundation mean you aren't starting from zero.
So I wouldn't build a new framework.
I would create:
CDUF Zero-Copy Edition
and reuse the existing machinery.
Something like:
                    UNIFY AI
                       │
             ZERO-COPY DATA FABRIC
                       │
      ┌────────────────┼────────────────┐
      │                │                │
   Discover          Unify           Govern
      │                │                │
      ↓                ↓                ↓
   Profile          Match          Lineage
   Map              Merge          Audit
   DQ               Survive        Security
      │                │                │
      └────────────────┼────────────────┘
                       ↓
                GOLDEN ENTITIES
                       │
         ┌─────────────┼─────────────┐
         ↓             ↓             ↓
        API          Events       Analytics
The realistic outcome after one week
You could have a demo where someone says:
"Connect these two customer sources."
Then your platform:
1. Discovers their schemas
2. Profiles the data
3. Detects PII
4. Suggests canonical mappings
5. Standardizes the data
6. Runs DQ
7. Identifies duplicates
8. Explains the matches
9. Creates golden customers
10. Applies survivorship
11. Shows the identity graph
12. Shows complete lineage
13. Lets a steward approve/reject matches
14. Exposes the golden entity through an API
15. Publishes an entity-change event
That is absolutely achievable as a one-week MVP if the scope is ruthlessly controlled.
The important distinction is that you would have breadth across virtually every capability and depth in the core unification path, rather than production depth everywhere. That is exactly the right trade-off for a one-week prototype.
