// Page 38: Operations Jobs Registry (Route: /operations/jobs)
import { renderBreadcrumbs } from '../../components/breadcrumbs.js';
import { repository } from '../../services/repository.js';

export async function renderJobsPage() {
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
