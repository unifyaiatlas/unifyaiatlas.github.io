// Page 11: Data Profiles (Route: /data-foundation/profiles)
import { renderBreadcrumbs } from '../../components/breadcrumbs.js';
import { repository } from '../../services/repository.js';

export async function renderProfilesPage() {
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
