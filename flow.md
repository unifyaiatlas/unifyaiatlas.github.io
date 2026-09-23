Yes — and this is exactly where we should be precise, because “zero-copy Salesforce” does not mean Unify somehow reads Salesforce objects magically without any connector or network access.

Let's take a concrete Salesforce Sales Cloud Account example.

First: an important distinction

As of September 2026, Databricks documents two zero-copy connectors specifically for Salesforce Data 360: query federation and file sharing. The standard Salesforce ingestion connector is different: it copies Salesforce data into Delta.

So if by SFDC Account you mean the normal Salesforce Sales Cloud Account object, we should not claim that Databricks' native Salesforce Data 360 zero-copy connector automatically gives us zero-copy access to that Sales Cloud object. Databricks' documented Salesforce ingestion connector supports Salesforce Platform data, but it is an ingestion/copy pattern.

That distinction actually leads to a better Unify architecture.

What Unify should do

Suppose the customer has:

Salesforce
    |
    +── Account
    |     ├── Id
    |     ├── Name
    |     ├── BillingStreet
    |     ├── BillingCity
    |     ├── BillingCountry
    |     ├── Phone
    |     ├── Website
    |     ├── Industry
    |     └── ...
    |
    +── Contact
    +── Opportunity
    +── ...

We want Unify to access:

Salesforce.Account

without first doing:

Salesforce.Account
       ↓
S3/ADLS
       ↓
Delta Bronze
       ↓
Delta Silver

for every record.

Instead:

                 SALESFORCE
                     │
                Account Object
                     │
                     │ API / federation adapter
                     ▼
             ┌───────────────┐
             │ UNIFY SOURCE  │
             │    ADAPTER    │
             └───────┬───────┘
                     │
                     ▼
             UNIFY DATA ACCESS
                     │
          ┌──────────┴──────────┐
          │                     │
      Zero-Copy            Materialize
      Execution             Selectively
          │                     │
          ▼                     ▼
     Unification             Delta
       Engine                Tables

The crucial thing is that Unify doesn't own the physical copy of the Account data merely to perform unification.

Let's walk through an actual request

Suppose your Unify UI says:

Add Source
Source Type
[ Salesforce ]

Object
[ Account ]

Access Mode
● Zero-Copy
○ Materialized

User clicks:

Connect

Unify stores metadata and credentials/configuration, not Account records:

Source
------
source_id       SFDC-001
type             SALESFORCE
system           Salesforce
object           Account
access_mode      ZERO_COPY
connection_ref   UC-CONNECTION-123

The actual credentials should be securely managed through the relevant connection mechanism rather than stored as plain application configuration.

Then Unify discovers the Account schema

The discovery service asks the Salesforce adapter:

getSchema("Account")

The adapter obtains metadata from Salesforce and returns something normalized to Unify:

{
  "entity": "Account",
  "attributes": [
    {
      "name": "Id",
      "type": "string"
    },
    {
      "name": "Name",
      "type": "string"
    },
    {
      "name": "BillingCity",
      "type": "string"
    },
    {
      "name": "BillingCountry",
      "type": "string"
    },
    {
      "name": "Phone",
      "type": "string"
    },
    {
      "name": "Website",
      "type": "string"
    }
  ]
}

Notice:

No Account rows have been copied yet.

Then comes the interesting part

Suppose Unify wants to profile:

How many Salesforce Accounts have an email domain associated with them?

Or more realistically, for Account:

Show me Accounts from India with missing phone numbers.

Unify generates a logical query:

SELECT
    Id,
    Name,
    BillingCity,
    BillingCountry,
    Phone
FROM Account
WHERE BillingCountry = 'India'

The Salesforce adapter translates that logical request into whatever source access mechanism is appropriate.

Conceptually:

Unify Query
     │
     ▼
Canonical Query Model
     │
     ▼
Salesforce Adapter
     │
     ▼
Salesforce
     │
     ▼
Filtered Account records

With Databricks Lakehouse Federation, the general pattern is that the external source is represented through a foreign catalog, and federated queries can be pushed toward the source. Databricks describes Lakehouse Federation as governed, read-only access to external data, with query pushdown for supported sources.

Now imagine we have three sources

This is where your Data Unification Framework becomes interesting.

                 CUSTOMER / ACCOUNT
                       │
       ┌───────────────┼────────────────┐
       │               │                │
       ▼               ▼                ▼
   Salesforce          SAP           PostgreSQL
    Account          Customer         Customer
       │               │                │
       │               │                │
       └───────────────┼────────────────┘
                       ▼
                CANONICAL ENTITY
                    Account
                       │
                       ▼
                MATCHING ENGINE

The Salesforce record might be:

SFDC-001

Name:          Acme Corporation
City:          Mumbai
Country:       India
Phone:         +91 22 12345678
Website:       acme.com

SAP:

SAP-8921

Name:          ACME CORP.
City:          Mumbai
Country:       IN
Phone:         02212345678
Website:       www.acme.com

Postgres:

PG-5512

Name:          Acme Corporation India
City:          Mumbai
Country:       India
Phone:         +912212345678
Website:       acme.com

Unify doesn't need to first create three giant physical copies just to determine that:

SFDC-001
SAP-8921
PG-5512
       │
       ▼
ACCOUNT-000192
But here's the critical architecture question
Where does the actual matching happen?

This is where zero-copy has a limit.

Suppose you have:

Salesforce        10M Accounts
SAP                8M Customers
Postgres            5M Customers

You probably do not want Databricks doing billions of remote API calls and trying to perform sophisticated fuzzy matching directly against Salesforce.

That would be a terrible architecture.

Instead, Unify should use adaptive materialization.

The intelligent architecture
Salesforce Account
       │
       │ zero-copy
       ▼
   DISCOVERY
       │
       ▼
   PROFILING
       │
       ▼
  MATCH PLANNING
       │
       │
       ├── Small/selective operation
       │
       │       ↓
       │   ZERO-COPY QUERY
       │
       │
       └── Large/expensive operation
               │
               ▼
        SELECTIVE MATERIALIZATION
               │
               ▼
          Delta Silver
               │
               ▼
        Distributed Matching
               │
               ▼
          Golden Entity

That is the architecture I'd actually build.

Example: User clicks "Unify Accounts"

Suppose there are 2 million Salesforce Accounts.

Unify first runs:

Step 1 — Metadata

No data movement.

Account
2M records
42 attributes
Step 2 — Profile

Potentially selective federated queries.

Records:              2,041,821
Missing Name:               0.1%
Missing Phone:             21.2%
Missing Website:           32.4%
Potential duplicates:      14.8%
Step 3 — Match planning

AI/rules determine:

Matching requires Name + Website + Phone + Address across Salesforce, SAP and PostgreSQL.

At this point Unify says:

This workload is too expensive to perform as repeated remote queries. Materialize the required attributes into Delta.

That's the key intelligence.

Selective materialization

Instead of:

Salesforce Account
      ↓
COPY EVERYTHING
      ↓
500 GB Delta

do:

Salesforce Account
      │
      ├── Id
      ├── Name
      ├── BillingCity
      ├── BillingCountry
      ├── Phone
      ├── Website
      └── LastModifiedDate
             │
             ▼
       Delta Silver

Perhaps only the fields necessary for the unification workload.

And you maintain:

source_record_id
source_system
source_last_modified
materialized_at
Then matching happens locally

Now:

Salesforce Silver
       │
       ├──────────────┐
       │              │
SAP Silver            │
       │              │
       ├──────────────┤
       │              │
Postgres Silver       │
       │              │
       └──────┬───────┘
              ▼
       MATCH ENGINE
              │
       ▼
       GOLDEN ENTITY

Spark can now perform:

blocking
exact matching
fuzzy matching
probabilistic matching
candidate generation
scoring

at scale.

What makes it "zero-copy" then?

This is an important terminology issue.

I would not market the entire MDM process as literally zero-copy.

I'd call it:

Zero-Copy-First Data Unification

or:

Intelligent Zero-Copy + Selective Materialization

Because the architecture has two modes:

Mode A — Zero-copy

Use when:

discovering schema
profiling
ad-hoc access
selective queries
low-volume entities
real-time lookups
source remains authoritative
Mode B — Selective materialization

Use when:

large-scale entity resolution
complex transformations
repeated processing
historical snapshots
streaming
ML
performance requires local distributed computation

That's much more credible.

And there is another important SFDC issue

For Salesforce Data 360, Databricks now explicitly supports two zero-copy approaches:

Salesforce Data 360
        │
        ├── Query Federation
        │       ↓
        │    JDBC
        │
        └── File Sharing
                ↓
          Salesforce DaaS
                ↓
       underlying cloud storage

Databricks says the file-sharing connector is particularly suited to larger volumes, while query federation uses JDBC and pushes queries toward Salesforce.

But for ordinary Sales Cloud Account, we need to treat the connector availability separately rather than pretending Data 360 federation equals Salesforce CRM federation. The Salesforce ingestion connector is the alternative when you actually need to copy Salesforce Platform data into Delta.

What I would implement in your MVP

I'd actually create this abstraction:

interface SourceDataAccess {

    Schema discoverSchema(SourceEntity entity);

    ProfileResult profile(ProfileRequest request);

    DataSet query(QueryRequest request);

    MaterializationPlan recommendMaterialization(
        Workload workload
    );
}

Then:

                  SourceDataAccess
                         │
        ┌────────────────┼────────────────┐
        │                │                │
        ▼                ▼                ▼
 Salesforce         PostgreSQL        Databricks
 Adapter             Adapter           Adapter
        │
        ├── FederatedAccess
        │
        └── SelectiveMaterialization

And the unification engine knows nothing about Salesforce.

That's important.

The killer UX

In your UI, the user should actually see this.

Source

Salesforce — Account

Access Mode
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

● Zero-Copy
○ Materialized

✓ Source connected
✓ Schema discovered
✓ Unity Catalog registered

Records              2,041,821
Attributes                   42

Then when they launch unification:

UNIFICATION PLAN

Salesforce Account
        │
        ▼
   Zero-Copy Access
        │
        ▼
Required attributes identified
        │
        ▼
Estimated workload: HIGH
        │
        ▼
Recommended:
Selective Materialization
        │
        ▼
7 attributes
2.04M records
        │
        ▼
Delta Silver
        │
        ▼
Distributed Entity Resolution

And importantly:

"Why are you materializing this data?"

The system answers:

Entity resolution requires repeated distributed comparison across Salesforce, SAP and PostgreSQL. Materializing the seven required attributes avoids repeated remote queries while preserving Salesforce as the authoritative source.

That is the intelligence that makes your zero-copy claim credible.