// Topbar Component for Global Application Shell
import { store } from '../state/store.js';

export function renderTopbar() {
  const state = store.getState();
  const personas = ['Data Architect', 'Data Steward', 'Business User', 'Platform Administrator'];

  return `
    <header class="app-topbar">
      <div class="topbar-left">
        <div class="env-pill" title="Connected to Zero-Copy Fabric">
          <span class="env-dot"></span>
          <span>PROD / AWS us-east-1</span>
        </div>

        <button class="search-button" onclick="window.unifyOpenSearch()">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <circle cx="11" cy="11" r="8"></circle>
            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
          </svg>
          <span>Search entities, sources, rules...</span>
          <kbd class="search-kbd">Ctrl+K</kbd>
        </button>
      </div>

      <div class="topbar-right">
        <!-- Persona Switcher (Section 53) -->
        <div style="display: flex; align-items: center; gap: 6px;">
          <span style="font-size: 11px; color: var(--text-muted);">Persona:</span>
          <select class="form-select" style="padding: 4px 8px; font-size: 12px; height: 30px; border-radius: 4px;" onchange="window.unifySetPersona(this.value)">
            ${personas.map(p => `<option value="${p}" ${p === state.activePersona ? 'selected' : ''}>${p}</option>`).join('')}
          </select>
        </div>

        <!-- Global AI Assistant Trigger (Section 4) -->
        <button class="btn btn-ai btn-sm" onclick="window.unifyToggleAiDrawer()" title="Open Unify AI Assistant">
          <span>✦</span>
          <span>Ask Unify AI</span>
        </button>

        <!-- Quick Demo Journey Button -->
        <button class="btn btn-secondary btn-sm" onclick="window.unifyNextJourneyStep()" title="Advance to Next Step of Demo Journey">
          <span style="color: var(--secondary);">✦</span>
          <span>Journey Step ${state.currentJourneyStep} →</span>
        </button>

        <!-- User Profile Pill -->
        <div style="display: flex; align-items: center; gap: 8px; padding-left: 8px; border-left: 1px solid var(--border-subtle);">
          <div style="width: 28px; height: 28px; border-radius: 50%; background: linear-gradient(135deg, #4f46e5, #06b6d4); display: flex; align-items: center; justify-content: center; font-weight: 700; color: #fff; font-size: 12px;">
            MS
          </div>
          <div style="display: flex; flex-direction: column;">
            <span style="font-size: 12px; font-weight: 600; color: #fff;">Manjit Singh</span>
            <span style="font-size: 10px; color: var(--text-muted);">${state.activePersona}</span>
          </div>
        </div>
      </div>
    </header>
  `;
}
