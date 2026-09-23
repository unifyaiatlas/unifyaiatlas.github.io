// Page 42: Canonical Entity Models (Route: /admin/entity-models)
import { renderBreadcrumbs } from '../../components/breadcrumbs.js';

export async function renderEntityModelsPage() {
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
