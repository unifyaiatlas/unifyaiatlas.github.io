// Authentication Page: Enterprise User Registration & Tenant Provisioning (Route: /register)
import { store } from '../../state/store.js';

export async function renderRegisterPage() {
  return `
    <div style="min-height: 100vh; width: 100vw; display: flex; align-items: center; justify-content: center; background: radial-gradient(circle at 50% 20%, #171b34 0%, #080b12 70%); padding: 20px; box-sizing: border-box;">
      <div style="width: 100%; max-width: 520px; background: rgba(15, 23, 42, 0.85); backdrop-filter: blur(12px); border: 1px solid var(--border-default); border-radius: var(--radius-xl); padding: 32px; box-shadow: var(--shadow-lg);">
        
        <!-- Header -->
        <div style="text-align: center; margin-bottom: 22px;">
          <div style="display: inline-flex; align-items: center; justify-content: center; width: 44px; height: 44px; border-radius: 12px; background: linear-gradient(135deg, #6366f1, #06b6d4); font-weight: 800; font-size: 20px; color: #fff; margin-bottom: 12px; box-shadow: 0 0 16px rgba(99, 102, 241, 0.4);">
            U
          </div>
          <h1 style="font-family: var(--font-display); font-size: 22px; font-weight: 700; color: #fff; letter-spacing: -0.3px;">
            Provision Unify AI Workspace
          </h1>
          <p style="font-size: 12.5px; color: var(--text-secondary); margin-top: 4px;">
            Register enterprise identity and initialize zero-copy MDM tenant
          </p>
        </div>

        <!-- Registration Form (Section 2.1) -->
        <form onsubmit="window.unifyHandleRegister(event)" style="display: flex; flex-direction: column; gap: 12px;">
          <div class="grid-2">
            <div class="form-group" style="margin-bottom: 0;">
              <label class="form-label" style="font-size: 12px;">Full Legal Name</label>
              <input type="text" id="reg-name" class="form-input" placeholder="Manjit Singh" required style="padding: 9px 12px; font-size: 12.5px;">
            </div>
            <div class="form-group" style="margin-bottom: 0;">
              <label class="form-label" style="font-size: 12px;">Corporate Work Email</label>
              <input type="email" id="reg-email" class="form-input" placeholder="name@enterprise.com" required style="padding: 9px 12px; font-size: 12.5px;">
            </div>
          </div>

          <div class="grid-2">
            <div class="form-group" style="margin-bottom: 0;">
              <label class="form-label" style="font-size: 12px;">Organization / Tenant Name</label>
              <input type="text" id="reg-org" class="form-input" placeholder="Global Enterprise Ltd" required style="padding: 9px 12px; font-size: 12.5px;">
            </div>
            <div class="form-group" style="margin-bottom: 0;">
              <label class="form-label" style="font-size: 12px;">Primary Platform Role</label>
              <select id="reg-role" class="form-select" style="padding: 9px 12px; font-size: 12.5px;">
                <option value="Data Architect">Data Architect</option>
                <option value="Data Steward">Data Steward</option>
                <option value="Business Analyst">Business Analyst</option>
                <option value="Platform Administrator">Platform Administrator</option>
              </select>
            </div>
          </div>

          <div class="form-group" style="margin-bottom: 0;">
            <label class="form-label" style="font-size: 12px;">Enterprise Password</label>
            <input 
              type="password" 
              id="reg-password" 
              class="form-input" 
              placeholder="Min. 12 characters, numbers & symbols" 
              required 
              style="padding: 9px 12px; font-size: 12.5px;"
              oninput="window.unifyUpdatePasswordStrength(this.value)"
            >
            <div style="display: flex; align-items: center; gap: 8px; margin-top: 6px;">
              <div class="bar-track" style="flex: 1; height: 4px;">
                <div class="bar-fill" id="pwd-strength-bar" style="width: 25%; background: #ef4444;"></div>
              </div>
              <span id="pwd-strength-text" style="font-size: 10.5px; color: #ef4444; width: 60px; text-align: right;">Weak</span>
            </div>
          </div>

          <div style="margin-top: 4px; padding: 10px; background: var(--bg-input); border: 1px solid var(--border-default); border-radius: var(--radius-md); font-size: 11.5px; color: var(--text-secondary);">
            <label style="display: flex; gap: 8px; align-items: flex-start; cursor: pointer;">
              <input type="checkbox" id="reg-terms" required style="margin-top: 2px;">
              <span>I acknowledge that this workspace operates in SOC2 Type II compliance and agree to corporate MDM stewardship governance terms.</span>
            </label>
          </div>

          <button type="submit" class="btn btn-primary" style="padding: 10px; font-size: 13px; font-weight: 600; width: 100%; margin-top: 6px;">
            Provision Workspace & Sign In →
          </button>
        </form>

        <!-- Back to login -->
        <div style="text-align: center; margin-top: 18px; font-size: 12px; color: var(--text-secondary);">
          Already have an authorized account?
          <a href="#/login" style="color: #38bdf8; text-decoration: none; font-weight: 500; margin-left: 4px;">Sign In →</a>
        </div>

      </div>
    </div>
  `;
}
