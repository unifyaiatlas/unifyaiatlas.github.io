// Page 43: Users & Role-Based Access Control (Route: /admin/users)
import { renderBreadcrumbs } from '../../components/breadcrumbs.js';
import { repository } from '../../services/repository.js';

export async function renderUsersPage() {
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
