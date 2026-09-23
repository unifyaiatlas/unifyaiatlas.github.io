// Global Search Modal Component (Section 46)
import { store } from '../state/store.js';
import { repository } from '../services/repository.js';

export function renderGlobalSearch() {
  const state = store.getState();
  const isOpen = state.isSearchOpen;

  return `
    <div class="modal-overlay ${isOpen ? 'open' : ''}" id="search-modal-overlay" onclick="if(event.target === this) window.unifyCloseSearch()">
      <div class="modal-content" style="max-width: 600px; margin-top: -10vh;">
        <div style="padding: 14px 18px; border-bottom: 1px solid var(--border-subtle); display: flex; align-items: center; gap: 10px;">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="color: var(--text-muted);">
            <circle cx="11" cy="11" r="8"></circle>
            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
          </svg>
          <input 
            type="text" 
            id="global-search-input" 
            placeholder="Type to search entities (Robert Smith), sources, match reviews, rules..." 
            style="flex: 1; background: transparent; border: none; outline: none; font-size: 14px; color: #fff; font-family: inherit;"
            oninput="window.unifyExecuteSearch(this.value)"
          >
          <kbd class="search-kbd">ESC</kbd>
        </div>

        <div id="search-results-container" style="max-height: 380px; overflow-y: auto; padding: 8px;">
          <div style="padding: 24px; text-align: center; color: var(--text-muted); font-size: 12.5px;">
            Search for <strong>Robert Smith</strong>, <strong>Salesforce</strong>, <strong>Email Rule</strong>, or <strong>Customer Standard</strong>.
          </div>
        </div>

        <div style="padding: 8px 16px; background: var(--bg-card-subtle); border-top: 1px solid var(--border-subtle); display: flex; align-items: center; justify-content: space-between; font-size: 11px; color: var(--text-muted);">
          <span>Use <strong>↑</strong> <strong>↓</strong> to navigate</span>
          <span><strong>ESC</strong> to close</span>
        </div>
      </div>
    </div>
  `;
}
