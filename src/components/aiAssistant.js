// AI Assistant Component implementing Section 4 Global AI Assistant
import { store } from '../state/store.js';
import { repository } from '../services/repository.js';

export function renderAiAssistant() {
  const state = store.getState();
  const isOpen = state.isAiDrawerOpen;

  const messagesHtml = state.aiMessages.map(msg => {
    const isBot = msg.sender === 'assistant';
    const triadBadge = msg.triadStatus ? `
      <div style="margin-bottom: 6px;">
        <span class="badge-triad ${msg.triadStatus === 'SYSTEM FACT' ? 'badge-system-fact' : (msg.triadStatus === 'USER DECISION' ? 'badge-user-decision' : 'badge-ai-rec')}">${msg.triadStatus}</span>
      </div>
    ` : '';

    const linksHtml = msg.links && msg.links.length > 0 ? `
      <div style="margin-top: 10px; display: flex; flex-direction: column; gap: 4px;">
        <div style="font-size: 11px; font-weight: 600; color: #a5b4fc; text-transform: uppercase;">Direct Application Links</div>
        ${msg.links.map(l => {
          if (l.route) {
            return `<a href="${l.route}" onclick="window.unifyToggleAiDrawer(false)" class="btn btn-secondary btn-sm" style="text-align: left; justify-content: flex-start;">🔗 ${l.label}</a>`;
          } else {
            return `<button class="btn btn-secondary btn-sm" onclick="window.unifyAskAiFromPrompt('${l.query.replace(/'/g, "\\'")}')" style="text-align: left; justify-content: flex-start;">💬 ${l.label}</button>`;
          }
        }).join('')}
      </div>
    ` : '';

    return `
      <div style="display: flex; flex-direction: column; gap: 4px; align-self: ${isBot ? 'flex-start' : 'flex-end'}; max-width: 90%;">
        <div style="font-size: 11px; color: var(--text-dim); display: flex; align-items: center; gap: 4px;">
          ${isBot ? '✦ Unify AI Copilot' : 'You'}
        </div>
        <div style="background: ${isBot ? 'var(--bg-card-subtle)' : 'var(--primary)'}; color: #fff; padding: 10px 14px; border-radius: var(--radius-lg); border: 1px solid ${isBot ? 'var(--border-default)' : 'transparent'}; font-size: 12.5px; line-height: 1.5; white-space: pre-wrap;">
          ${triadBadge}
          ${msg.text}
          ${linksHtml}
        </div>
      </div>
    `;
  }).join('');

  return `
    <div class="ai-drawer-overlay ${isOpen ? 'open' : ''}" onclick="window.unifyToggleAiDrawer(false)"></div>
    <aside class="ai-drawer ${isOpen ? 'open' : ''}">
      <div class="ai-drawer-header">
        <div class="ai-drawer-title">
          <span style="color: var(--accent-purple);">✦</span>
          <span>Unify AI Copilot</span>
        </div>
        <button class="btn btn-ghost btn-sm" onclick="window.unifyToggleAiDrawer(false)" style="padding: 4px;">
          ✕
        </button>
      </div>

      <div class="ai-drawer-body" id="ai-chat-body">
        ${messagesHtml}
      </div>

      <div class="ai-drawer-footer">
        <div style="display: flex; gap: 6px; margin-bottom: 8px; flex-wrap: wrap;">
          <button class="btn btn-ghost btn-sm" style="font-size: 11px; padding: 2px 6px;" onclick="window.unifyAskAiFromPrompt('Why did these accounts merge?')">Why did accounts merge?</button>
          <button class="btn btn-ghost btn-sm" style="font-size: 11px; padding: 2px 6px;" onclick="window.unifyAskAiFromPrompt('Show duplicate accounts')">Find duplicate accounts</button>
          <button class="btn btn-ghost btn-sm" style="font-size: 11px; padding: 2px 6px;" onclick="window.unifyAskAiFromPrompt('Find DQ issues')">Find DQ issues</button>
        </div>
        <form onsubmit="window.unifyHandleAiSubmit(event)" style="display: flex; gap: 8px;">
          <input type="text" id="ai-input-box" class="form-input" style="flex: 1; font-size: 12px; padding: 7px 10px;" placeholder="Ask anything about your data..." autocomplete="off">
          <button type="submit" class="btn btn-primary btn-sm">Send</button>
        </form>
      </div>
    </aside>
  `;
}
