// Page 18: 6-Step Match Strategy Designer (Route: /unification/match-strategies/new)
import { renderBreadcrumbs } from '../../components/breadcrumbs.js';
import { repository } from '../../services/repository.js';

export async function renderStrategyDesignerPage() {
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
