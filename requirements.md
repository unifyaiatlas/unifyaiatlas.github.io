# Unify AI — UI Pages & Navigation Specification

## 1. Purpose

This document defines the complete UI information architecture for:

**Unify AI — Zero-Copy Data Unification Fabric**

The first implementation phase is **UI-first**.

The UI must establish:

* navigation
* page hierarchy
* routes
* page responsibilities
* primary user actions
* major components
* user journeys
* state handling
* cross-page navigation

The UI should be implemented so that backend APIs can be connected later without restructuring the application.

---

# 2. Product Navigation Model

The application uses a persistent left navigation.

```text
UNIFY AI
│
├── Overview
│
├── Data Foundation
│   ├── Sources
│   ├── Source Details
│   ├── Data Discovery
│   ├── Schema Mapping
│   └── Data Profiles
│
├── Data Quality
│   ├── Overview
│   ├── Rules
│   ├── Rule Details
│   └── Issues
│
├── Unification
│   ├── Overview
│   ├── Match Strategies
│   ├── Match Strategy Designer
│   ├── Simulations
│   ├── Match Results
│   └── Golden Entities
│
├── Stewardship
│   ├── Review Queue
│   ├── Match Review
│   └── Decisions
│
├── Entity 360
│   ├── Search
│   ├── Entity Profile
│   ├── Relationships
│   ├── Identity Graph
│   └── History
│
├── Governance
│   ├── Lineage
│   ├── Audit
│   ├── Reference Data
│   └── Policies
│
├── Activation
│   ├── APIs
│   ├── Events
│   ├── Data Products
│   └── Destinations
│
├── Operations
│   ├── Jobs
│   ├── Job Details
│   ├── Pipeline Runs
│   └── System Health
│
└── Administration
    ├── Domains
    ├── Entity Models
    ├── Users & Roles
    ├── AI Providers
    └── Settings
```

---

# 3. Global Application Shell

Every authenticated page uses:

```text
┌────────────────────────────────────────────────────────────────────────────┐
│ UNIFY AI                                      Search       Help   User       │
├───────────────┬────────────────────────────────────────────────────────────┤
│               │                                                            │
│ Overview      │                                                            │
│               │                     PAGE CONTENT                           │
│ Data          │                                                            │
│ Foundation    │                                                            │
│               │                                                            │
│ Data Quality  │                                                            │
│               │                                                            │
│ Unification   │                                                            │
│               │                                                            │
│ Stewardship   │                                                            │
│               │                                                            │
│ Entity 360    │                                                            │
│               │                                                            │
│ Governance    │                                                            │
│               │                                                            │
│ Activation    │                                                            │
│               │                                                            │
│ Operations    │                                                            │
│               │                                                            │
│ Administration│                                                            │
│               │                                                            │
└───────────────┴────────────────────────────────────────────────────────────┘
```

Global elements:

* Logo
* Environment indicator
* Global search
* Notifications
* Help
* User menu
* Breadcrumbs
* Page title
* Page description
* Primary page action
* Contextual actions
* AI assistant

---

# 4. Global AI Assistant

A persistent AI assistant should be available from the application shell.

Icon:

```text
✦ Ask Unify AI
```

Opening it creates a right-side panel.

Example:

```text
┌─────────────────────────────────────┐
│ ✦ Unify AI                         │
├─────────────────────────────────────┤
│                                     │
│ Ask anything about your data        │
│                                     │
│ > Why did these accounts merge?     │
│                                     │
│ Suggested questions                 │
│                                     │
│ • Show duplicate accounts           │
│ • Explain match strategy            │
│ • Find DQ issues                    │
│ • Show source conflicts             │
│                                     │
└─────────────────────────────────────┘
```

The AI assistant must link users to relevant application pages rather than only returning text.

---

# 5. Overview

## Route

```text
/
```

## Purpose

Executive landing page showing the health of the unification platform.

## Components

### KPI cards

```text
Connected Sources
42.8M Records
18.2M Golden Entities
91.7% Match Rate
94.2% Data Quality
1,284 Pending Reviews
```

### Processing health

Show:

* active jobs
* completed jobs
* failed jobs
* processing volume

### Data quality

Show:

* overall score
* source quality
* critical issues

### Unification

Show:

* matched entities
* unmatched entities
* review queue
* recent merges

### Recent activity

Examples:

```text
Salesforce Account source connected
4,821 entities unified
213 matches require review
Customer golden dataset published
```

### Primary actions

```text
[Add Source]
[Run Unification]
[Review Matches]
```

---

# 6. Sources

## Route

```text
/data-foundation/sources
```

## Purpose

Manage all enterprise data sources.

## Page

Table:

| Source     | Type     | Entity   | Access       | Status    | Records | Last Sync  |
| ---------- | -------- | -------- | ------------ | --------- | ------: | ---------- |
| Salesforce | CRM      | Account  | Zero-Copy    | Connected |    2.0M | —          |
| SAP        | ERP      | Customer | Materialized | Healthy   |    8.1M | 10 min ago |
| PostgreSQL | Database | Customer | Zero-Copy    | Connected |    4.2M | —          |

Filters:

* source type
* domain
* access mode
* status

Actions:

```text
[Add Source]
```

Row actions:

```text
Open
Test Connection
Profile
Configure
Disable
```

---

# 7. Add Source

## Route

```text
/data-foundation/sources/new
```

## Wizard

### Step 1 — Source Type

Options:

```text
Salesforce
Databricks
Snowflake
PostgreSQL
Oracle
Reltio
REST API
File
Streaming
Other
```

### Step 2 — Connection

Fields depend on source.

### Step 3 — Access Mode

```text
Zero-Copy
Selective Materialization
Batch
Streaming / CDC
```

### Step 4 — Select Objects

For Salesforce:

```text
Account
Contact
Opportunity
Lead
Case
...
```

### Step 5 — Test

Show connection result.

### Step 6 — Discovery

Automatically discover schema.

### Step 7 — Finish

Show summary.

---

# 8. Source Details

## Route

```text
/data-foundation/sources/:sourceId
```

Tabs:

```text
Overview
Schema
Objects
Access
Profile
Jobs
Lineage
Settings
```

Overview:

```text
Salesforce
Connected

Type: Salesforce
Access: Zero-Copy
Objects: 12
Last checked: ...
```

Primary actions:

```text
[Run Discovery]
[Profile Data]
[Configure]
```

---

# 9. Data Discovery

## Route

```text
/data-foundation/discovery
```

Purpose:

Show discovered datasets and automatically identified semantic information.

Cards:

```text
Potential Customer Entity
Potential Product Entity
Potential Location Entity
```

For each dataset:

```text
Columns
Records
Potential identifiers
Potential PII
Potential duplicates
Suggested domain
```

Primary action:

```text
[Review Discovery]
```

---

# 10. Schema Mapping

## Route

```text
/data-foundation/mappings
```

## Mapping workspace

Left:

```text
SOURCE

Salesforce Account

Id
Name
BillingStreet
BillingCity
BillingCountry
Phone
Website
```

Center:

```text
AI Mapping
```

Right:

```text
CANONICAL CUSTOMER / ACCOUNT

account.identifier
organization.name
address.line1
address.city
address.country
contact.phone
organization.website
```

Each mapping displays confidence.

Actions:

```text
Accept
Reject
Edit
Ask AI Why?
```

Bulk action:

```text
[Accept All High Confidence]
```

---

# 11. Data Profiles

## Route

```text
/data-foundation/profiles
```

Show:

* record count
* completeness
* uniqueness
* validity
* distributions
* null rates
* candidate duplicates

Selecting an attribute opens detailed profiling.

---

# 12. Data Quality Overview

## Route

```text
/data-quality
```

KPI cards:

```text
Overall Quality
Completeness
Validity
Consistency
DQ Issues
```

Sections:

* Quality by source
* Quality by entity
* Quality trends
* Critical issues
* Recent rule failures

Primary actions:

```text
[Create Rule]
[View Issues]
```

---

# 13. DQ Rules

## Route

```text
/data-quality/rules
```

Table:

| Rule           | Entity   | Attribute | Type     | Severity | Status |
| -------------- | -------- | --------- | -------- | -------- | ------ |
| Email Required | Customer | Email     | Required | Error    | Active |
| Valid Phone    | Customer | Phone     | Format   | Warning  | Active |

Actions:

```text
[Create Rule]
```

---

# 14. DQ Rule Designer

## Route

```text
/data-quality/rules/new
```

Fields:

```text
Entity
Attribute
Rule Type
Condition
Severity
Action
```

AI action:

```text
[Generate Rule with AI]
```

Preview:

```text
Records affected
Current failure rate
Expected impact
```

---

# 15. DQ Issues

## Route

```text
/data-quality/issues
```

Filters:

* source
* entity
* severity
* rule
* status

Issue detail:

```text
Record
Attribute
Invalid Value
Rule
Reason
Suggested Correction
```

---

# 16. Unification Overview

## Route

```text
/unification
```

Show:

```text
Entities Processed
Matches
Auto Matches
Steward Reviews
Golden Entities
Unmatched
```

Pipeline visualization:

```text
Sources
  ↓
Standardization
  ↓
Matching
  ↓
Survivorship
  ↓
Golden Records
```

Primary actions:

```text
[Create Match Strategy]
[Run Unification]
[Review Results]
```

---

# 17. Match Strategies

## Route

```text
/unification/match-strategies
```

Table:

| Strategy          | Domain   | Version | Threshold | Status |
| ----------------- | -------- | ------- | --------: | ------ |
| Customer Standard | Customer | v4      |       95% | Active |
| Account Corporate | Account  | v2      |       92% | Draft  |

Actions:

```text
[New Strategy]
[Duplicate]
[Edit]
[Simulate]
[Publish]
```

---

# 18. Match Strategy Designer

## Route

```text
/unification/match-strategies/new
```

### Step 1

Select entity.

### Step 2

Select attributes.

### Step 3

Configure matching method.

```text
Exact
Fuzzy
Phonetic
Probabilistic
AI-Assisted
```

### Step 4

Configure weights.

### Step 5

Configure thresholds.

```text
Auto Match
Review
No Match
```

### Step 6

Test.

```text
[Run Simulation]
```

---

# 19. Match Simulation

## Route

```text
/unification/simulations/:simulationId
```

Show:

```text
Records Evaluated
Potential Matches
Auto Matches
Review
No Match
```

Comparison:

```text
Current Strategy
vs
Proposed Strategy
```

Show:

* match increase
* review increase
* potential conflicts
* sample matches

Actions:

```text
[Save as Draft]
[Publish Strategy]
```

---

# 20. Match Results

## Route

```text
/unification/matches
```

Filters:

* confidence
* source
* entity
* strategy
* status

Table:

```text
Source A       Source B       Confidence       Status
CRM-10231      ERP-88391      96.7%             Auto Match
CRM-12221      ERP-71231      89.2%             Review
```

Clicking a row opens Match Review.

---

# 21. Match Review

## Route

```text
/stewardship/reviews/:matchId
```

Side-by-side comparison:

```text
SOURCE A                    SOURCE B

Robert Smith                Robert J Smith
robert@abc.com              robert@abc.com
+919876543210               +919876543210
Kolkata                     Kolkata
```

Match explanation:

```text
Email       Exact       +40
Phone       Exact       +25
Name        97%         +19
Address     91%         +13
```

Actions:

```text
[Approve Match]
[Reject Match]
[Investigate]
```

---

# 22. Stewardship Queue

## Route

```text
/stewardship
```

Tabs:

```text
My Queue
Unassigned
High Priority
Recently Resolved
```

Bulk actions:

```text
Assign
Approve
Reject
```

---

# 23. Golden Entities

## Route

```text
/unification/golden-entities
```

Search:

```text
Search by name
Email
Phone
Golden ID
Source ID
```

Table:

```text
Golden ID
Name
Domain
Source Count
Confidence
Last Updated
```

---

# 24. Entity Search

## Route

```text
/entity-360/search
```

Global entity search.

Search examples:

```text
Robert Smith
robert@abc.com
CUST-102938
CRM-10231
```

Results grouped by:

```text
Golden Entity
Source Record
Potential Match
```

---

# 25. Entity 360

## Route

```text
/entity-360/:entityId
```

Header:

```text
ROBERT SMITH

Golden ID: CUST-00192837
Status: Active
Confidence: 97.4%
```

Tabs:

```text
Overview
Attributes
Sources
Relationships
Identity Graph
History
Lineage
Matches
```

---

# 26. Entity Attributes

Show every attribute with:

```text
Value
Winning Source
Confidence
Last Updated
```

Clicking a value opens attribute lineage.

---

# 27. Identity Graph

## Route

```text
/entity-360/:entityId/graph
```

Interactive graph showing:

```text
Golden Entity
├── Source identities
├── Accounts
├── Contacts
├── Organizations
├── Households
└── Relationships
```

Actions:

```text
Expand
Collapse
Focus
Open Entity
```

---

# 28. Entity History

## Route

```text
/entity-360/:entityId/history
```

Timeline:

```text
Sep 23
Phone changed
Source: ERP

Sep 22
CRM matched to ERP

Sep 20
Golden entity created
```

---

# 29. Lineage

## Route

```text
/governance/lineage
```

Search:

```text
Entity
Attribute
Source
Job
```

Visual flow:

```text
Source
 ↓
Transformation
 ↓
Match
 ↓
Survivorship
 ↓
Golden
 ↓
Consumer
```

---

# 30. Attribute Lineage

## Route

```text
/governance/lineage/:entityId/:attribute
```

Example:

```text
Golden Email
      ↓
CRM.email
      ↓
Standardization Rule #12
      ↓
Survivorship Rule #4
      ↓
Golden Attribute
```

---

# 31. Audit

## Route

```text
/governance/audit
```

Events:

```text
Rule Created
Rule Published
Match Approved
Match Rejected
Entity Merged
Entity Unmerged
Mapping Changed
Golden Attribute Changed
```

Filters:

* user
* date
* entity
* action
* source

---

# 32. Reference Data

## Route

```text
/governance/reference-data
```

Examples:

```text
Countries
States
Currencies
Industry Codes
Customer Types
```

Support:

```text
Version
Effective Date
Source
Status
```

---

# 33. Activation Overview

## Route

```text
/activation
```

Show:

```text
Active APIs
Published Data Products
Event Streams
Connected Destinations
```

---

# 34. APIs

## Route

```text
/activation/apis
```

Show:

```text
Entity Resolution API
Golden Entity API
Lineage API
Relationship API
```

Each API has:

```text
Endpoint
Status
Requests
Latency
Authentication
```

---

# 35. Events

## Route

```text
/activation/events
```

Show event types:

```text
ENTITY_CREATED
ENTITY_UPDATED
ENTITY_MERGED
ENTITY_UNMERGED
ATTRIBUTE_CHANGED
MATCH_REVIEW_REQUIRED
```

---

# 36. Data Products

## Route

```text
/activation/data-products
```

Examples:

```text
Golden Customer
Customer 360
Golden Product
Supplier 360
```

Show:

* owner
* consumers
* freshness
* quality
* record count

---

# 37. Destinations

## Route

```text
/activation/destinations
```

Examples:

```text
Salesforce
CRM
Marketing Platform
Data Warehouse
Event Bus
API
```

---

# 38. Jobs

## Route

```text
/operations/jobs
```

Table:

```text
Job
Type
Source
Entity
Status
Records
Duration
Started
```

Statuses:

```text
Running
Completed
Failed
Queued
Cancelled
```

---

# 39. Job Details

## Route

```text
/operations/jobs/:jobId
```

Show execution pipeline:

```text
✓ Discovery
✓ Profiling
✓ Standardization
✓ DQ
✓ Matching
● Survivorship
○ Publish
```

Metrics:

```text
Records processed
Records failed
Matches
Golden entities
Duration
```

---

# 40. System Health

## Route

```text
/operations/health
```

Show:

```text
Databricks             Healthy
Source Connections     8/8 Healthy
AI Provider             Healthy
Event Processing        Healthy
API                     Healthy
```

---

# 41. Domains

## Route

```text
/admin/domains
```

Examples:

```text
Customer
Product
Supplier
Location
Organization
```

For MVP:

**Customer should be fully configured.**

Others can initially appear as:

```text
Planned
```

---

# 42. Entity Models

## Route

```text
/admin/entity-models
```

Show canonical models.

Customer:

```text
Customer
├── Identity
├── Name
├── Contact
├── Address
├── Demographics
├── Relationships
└── Identifiers
```

---

# 43. Users & Roles

## Route

```text
/admin/users
```

Roles:

```text
Administrator
Data Architect
Data Steward
Analyst
Viewer
```

---

# 44. AI Providers

## Route

```text
/admin/ai-providers
```

Show:

```text
Provider
Model
Status
Purpose
```

Example:

```text
OpenRouter
Llama
Active

Google
Gemini
Available
```

Do not expose API keys in the UI.

---

# 45. Settings

## Route

```text
/admin/settings
```

Sections:

```text
General
Notifications
Default Thresholds
Data Retention
AI
Execution
Security
```

---

# 46. Global Search

Global search should search:

```text
Sources
Entities
Golden Records
Jobs
Rules
Match Strategies
Data Products
```

Example:

```text
Search: "Robert Smith"

Results

Golden Entity
CUST-00192837

CRM Record
CRM-10231

ERP Record
ERP-88391

Match Review
MR-92831
```

---

# 47. Breadcrumb Strategy

Every deep page should provide:

```text
Unification
  / Match Strategies
  / Customer Standard
  / Simulation
```

Breadcrumbs should be clickable.

---

# 48. Standard Page States

Every data-driven page must support:

## Loading

Skeleton UI.

## Empty

Explain what the user should do.

Example:

```text
No sources connected yet.

Connect your first source to begin
discovering and unifying data.

[Add Source]
```

## Error

Show actionable error.

```text
Unable to connect to Salesforce.

Check connection configuration and try again.

[Retry] [Configure Source]
```

## Success

Use non-blocking confirmation.

---

# 49. MVP Navigation Priority

Do not implement every page equally.

The first UI release should prioritize this path:

```text
Dashboard
    ↓
Sources
    ↓
Add Salesforce Account
    ↓
Source Details
    ↓
Schema Discovery
    ↓
Schema Mapping
    ↓
Data Profile
    ↓
DQ
    ↓
Match Strategy
    ↓
Simulation
    ↓
Run Unification
    ↓
Match Results
    ↓
Steward Review
    ↓
Golden Entity
    ↓
Entity 360
    ↓
Lineage
```

This is the **primary demonstrable journey**.

---

# 50. MVP Route Map

The minimum route implementation should be:

```text
/
├── /data-foundation
│   ├── /sources
│   ├── /sources/new
│   ├── /sources/:sourceId
│   ├── /discovery
│   ├── /mappings
│   └── /profiles
│
├── /data-quality
│   ├── /
│   ├── /rules
│   └── /issues
│
├── /unification
│   ├── /
│   ├── /match-strategies
│   ├── /match-strategies/new
│   ├── /simulations/:simulationId
│   ├── /matches
│   └── /golden-entities
│
├── /stewardship
│   ├── /
│   └── /reviews/:matchId
│
├── /entity-360
│   ├── /search
│   ├── /:entityId
│   └── /:entityId/graph
│
├── /governance
│   ├── /lineage
│   ├── /audit
│   └── /reference-data
│
├── /activation
│   ├── /apis
│   ├── /events
│   └── /data-products
│
├── /operations
│   ├── /jobs
│   ├── /jobs/:jobId
│   └── /health
│
└── /admin
    ├── /domains
    ├── /entity-models
    ├── /users
    ├── /ai-providers
    └── /settings
```

---

# 51. UX Principle

The UI must always distinguish between:

```text
SYSTEM FACT
AI RECOMMENDATION
USER DECISION
```

For example:

```text
AI RECOMMENDATION
Email → Customer.Email
Confidence: 98%

[Accept] [Change]
```

After acceptance:

```text
USER DECISION
Mapping approved by Manjit
```

For matching:

```text
SYSTEM
Match confidence: 96.7%

WHY
Email exact
Phone exact
Name 97%
Address 91%

RECOMMENDATION
Auto Match

USER
[Approve] [Reject]
```

This distinction is essential for enterprise trust.

---

# 52. Design Philosophy

The UI should feel like:

**Enterprise Data Platform + MDM + AI Copilot**

and not:

**Generic CRUD application.**

Use:

* dense but readable data tables
* strong hierarchy
* contextual side panels
* drill-down workflows
* confidence indicators
* lineage visualizations
* entity relationship visualization
* progressive disclosure
* meaningful empty states
* clear primary actions

Avoid:

* excessive cards
* decorative dashboards
* fake AI content
* meaningless animations
* excessive gradients
* generic SaaS landing-page styling

---

# 53. Primary User Personas

The navigation should serve four primary personas.

### Data Architect

Needs:

* Sources
* Canonical Models
* Mappings
* Match Strategies
* Jobs
* Governance

### Data Steward

Needs:

* Review Queue
* Match Review
* Golden Entities
* Lineage
* DQ Issues

### Business User

Needs:

* Entity Search
* Entity 360
* Golden Records
* Data Quality

### Platform Administrator

Needs:

* Sources
* Users
* Roles
* AI Providers
* Settings
* System Health

---

# 54. The Golden UX Flow

The entire product should ultimately communicate this journey:

```text
                    UNIFY AI

       CONNECT
          ↓
       DISCOVER
          ↓
       UNDERSTAND
          ↓
       STANDARDIZE
          ↓
       QUALITY
          ↓
       MATCH
          ↓
       RESOLVE
          ↓
       MASTER
          ↓
       GOVERN
          ↓
       ACTIVATE
```

Each stage should be navigable independently, but the user should always be able to follow the complete journey.

---

# 55. UI Implementation Rule

For the first UI implementation:

1. Build the global shell.
2. Build the navigation.
3. Build all route/page shells.
4. Implement the primary Customer unification journey with realistic sample data.
5. Use explicit mock/demo data only where backend APIs do not yet exist.
6. Keep mock data behind a service/repository abstraction.
7. Do not hard-code business decisions into React components.
8. Do not invent backend contracts.
9. Every page should have a clean integration boundary for the eventual backend.

The UI should therefore be **backend-ready**, not backend-dependent.

The primary objective of the first phase is:

> **A user can visually and interactively walk through the complete Salesforce Account → Discovery → Mapping → Quality → Matching → Golden Entity → Lineage journey before the backend is fully implemented.**
