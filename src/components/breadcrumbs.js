// Breadcrumb Component (Section 47)
export function renderBreadcrumbs(crumbs = []) {
  if (!crumbs || crumbs.length === 0) {
    crumbs = [{ label: 'Overview', route: '#/' }];
  }

  const crumbsHtml = crumbs.map((c, idx) => {
    const isLast = idx === crumbs.length - 1;
    if (isLast) {
      return `<span class="breadcrumb-item current">${c.label}</span>`;
    }
    return `
      <a href="${c.route}" class="breadcrumb-item">${c.label}</a>
      <span class="breadcrumb-separator">/</span>
    `;
  }).join('');

  return `<nav class="breadcrumbs-bar" aria-label="Breadcrumb">${crumbsHtml}</nav>`;
}
