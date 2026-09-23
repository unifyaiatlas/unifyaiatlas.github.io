// Client-side Router for Unify AI Fabric SPA
import { store } from './state/store.js';

export class Router {
  constructor() {
    this.routes = [];
    this.currentHandler = null;
    this.container = null;

    window.addEventListener('hashchange', () => this.handleRouting());
  }

  setContainer(element) {
    this.container = element;
  }

  addRoute(pattern, handler) {
    // Convert express-style route pattern (e.g., /entity-360/:entityId) to regex
    const paramNames = [];
    const regexPattern = pattern.replace(/:([a-zA-Z0-9_]+)/g, (_, name) => {
      paramNames.push(name);
      return '([^\\/]+)';
    });

    const regex = new RegExp(`^#?${regexPattern}$`);
    this.routes.push({ pattern, regex, paramNames, handler });
    return this;
  }

  async handleRouting() {
    let hash = window.location.hash || '#/';
    if (!hash.startsWith('#/')) {
      hash = '#/';
      window.location.hash = hash;
    }

    store.setRoute(hash);

    const [pathPart, queryPart] = hash.split('?');
    const cleanHash = pathPart || '#/';

    let matchResult = null;
    let matchedRoute = null;

    for (const r of this.routes) {
      const match = cleanHash.match(r.regex);
      if (match) {
        matchedRoute = r;
        const params = {};
        r.paramNames.forEach((name, index) => {
          params[name] = match[index + 1];
        });
        if (queryPart) {
          params.queryParams = Object.fromEntries(new URLSearchParams(queryPart));
        }
        matchResult = params;
        break;
      }
    }

    const isAuthRoute = hash === '#/login' || hash === '#/register' || hash === '#/forgot-password';
    const appRoot = document.getElementById('app-root');

    if (isAuthRoute) {
      if (matchedRoute && appRoot) {
        try {
          const pageHtml = await matchedRoute.handler(matchResult || {});
          if (typeof pageHtml === 'string') {
            appRoot.innerHTML = pageHtml;
          } else if (pageHtml instanceof HTMLElement) {
            appRoot.innerHTML = '';
            appRoot.appendChild(pageHtml);
          }
          window.dispatchEvent(new CustomEvent('unify:page-mounted', { detail: { hash, params: matchResult } }));
        } catch (err) {
          console.error('Error rendering auth route:', hash, err);
        }
      }
      return;
    }

    // Authenticated / App Route: Ensure shell is mounted
    let viewport = document.getElementById('main-content-viewport');
    if (!viewport && window.unifyMountShell) {
      window.unifyMountShell();
      viewport = document.getElementById('main-content-viewport');
      this.container = viewport;
    }

    if (matchedRoute && this.container) {
      try {
        this.container.innerHTML = '<div style="padding: 40px; text-align: center; color: var(--text-muted);"><span style="display:inline-block; animation: spin 1s linear infinite;">⏳</span> Loading fabric telemetry...</div>';
        const pageHtml = await matchedRoute.handler(matchResult || {});
        if (typeof pageHtml === 'string') {
          this.container.innerHTML = pageHtml;
        } else if (pageHtml instanceof HTMLElement) {
          this.container.innerHTML = '';
          this.container.appendChild(pageHtml);
        }
        // Dispatch page mounted event
        window.dispatchEvent(new CustomEvent('unify:page-mounted', { detail: { hash, params: matchResult } }));
      } catch (err) {
        console.error('Error rendering route:', hash, err);
        this.container.innerHTML = `
          <div style="padding: 32px; background: var(--danger-bg); border: 1px solid var(--danger); border-radius: 8px; margin: 20px;">
            <h3 style="color: #fca5a5; margin-bottom: 8px;">Error Loading Route</h3>
            <p style="color: var(--text-secondary);">${err.message}</p>
            <button class="btn btn-secondary" onclick="window.location.hash='#/'" style="margin-top: 14px;">Return to Overview</button>
          </div>
        `;
      }
    } else if (this.container) {
      // 404 Route Fallback
      this.container.innerHTML = `
        <div style="padding: 48px; text-align: center;">
          <h2 style="font-family: var(--font-display); font-size: 24px; margin-bottom: 8px; color: #fff;">Route Not Found</h2>
          <p style="color: var(--text-muted); margin-bottom: 20px;">The requested path <code>${hash}</code> does not exist in the fabric navigation registry.</p>
          <a href="#/" class="btn btn-primary">Return to Overview</a>
        </div>
      `;
    }
  }

  navigate(hash) {
    window.location.hash = hash;
  }
}

export const router = new Router();
