// Page 39: Job Details & Pipeline Stage Monitor (Route: /operations/jobs/:jobId)
import { renderBreadcrumbs } from '../../components/breadcrumbs.js';
import { repository } from '../../services/repository.js';

export async function renderJobDetailsPage(params) {
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
