// Global Application Shell Component (Section 3)
import { renderSidebar } from './sidebar.js';
import { renderTopbar } from './topbar.js';
import { renderAiAssistant } from './aiAssistant.js';
import { renderGlobalSearch } from './globalSearch.js';
import { store, goldenJourneySteps } from '../state/store.js';

export function renderAppShell() {
  return `
    <div id="app">
      <div id="sidebar-container">${renderSidebar()}</div>
      
      <main class="app-main">
        <div id="topbar-container">${renderTopbar()}</div>
        
        <!-- Golden Journey Banner -->
        <div id="journey-banner" style="display: none; background: linear-gradient(90deg, #1e1b4b, #0f172a); border-bottom: 1px solid rgba(99, 102, 241, 0.3); padding: 8px 20px; align-items: center; justify-content: space-between;">
          <div style="display: flex; align-items: center; gap: 12px;">
            <span style="font-size: 14px;">✨</span>
            <span id="journey-banner-text" style="font-size: 12.5px; color: #e0e7ff; font-weight: 500;">
              Golden Flow: Step 1 of 16
            </span>
          </div>
          <div style="display: flex; align-items: center; gap: 8px;">
            <button class="btn btn-secondary btn-sm" onclick="window.unifyPrevJourneyStep()">Previous</button>
            <button class="btn btn-primary btn-sm" onclick="window.unifyNextJourneyStep()">Next Step →</button>
            <button class="btn btn-ghost btn-sm" onclick="window.unifyToggleJourney(false)">Dismiss Tour</button>
          </div>
        </div>

        <section class="app-content" id="main-content-viewport"></section>
      </main>

      <div id="ai-drawer-container">${renderAiAssistant()}</div>
      <div id="search-modal-container">${renderGlobalSearch()}</div>
    </div>
  `;
}
