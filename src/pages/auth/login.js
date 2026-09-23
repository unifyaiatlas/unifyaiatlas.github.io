// Authentication Page: Enterprise Login (Route: /login)
import { store } from '../../state/store.js';

export async function renderLoginPage() {
  return `
    <div style="min-height: 100vh; width: 100vw; display: flex; align-items: center; justify-content: center; background: radial-gradient(circle at 50% 20%, #171b34 0%, #080b12 70%); padding: 20px; box-sizing: border-box;">
      <div style="width: 100%; max-width: 440px; background: rgba(15, 23, 42, 0.85); backdrop-filter: blur(12px); border: 1px solid var(--border-default); border-radius: var(--radius-xl); padding: 32px; box-shadow: var(--shadow-lg);">
        
        <!-- Brand Header -->
        <div style="text-align: center; margin-bottom: 24px;">
          <div style="display: inline-flex; align-items: center; justify-content: center; width: 44px; height: 44px; border-radius: 12px; background: linear-gradient(135deg, #6366f1, #06b6d4); font-weight: 800; font-size: 20px; color: #fff; margin-bottom: 12px; box-shadow: 0 0 16px rgba(99, 102, 241, 0.4);">
            U
          </div>
          <h1 style="font-family: var(--font-display); font-size: 22px; font-weight: 700; color: #fff; letter-spacing: -0.3px;">
            Unify AI Fabric
          </h1>
          <p style="font-size: 12.5px; color: var(--text-secondary); margin-top: 4px;">
            Enterprise Zero-Copy Data Unification & MDM
          </p>
        </div>

        <!-- Login Form -->
        <form onsubmit="window.unifyHandleLogin(event)" style="display: flex; flex-direction: column; gap: 14px;">
          <div class="form-group" style="margin-bottom: 0;">
            <label class="form-label" style="font-size: 12px;">Corporate Work Email</label>
            <input type="email" id="login-email" class="form-input" placeholder="name@enterprise.com" value="manjit@unify.ai" required style="padding: 10px 12px; font-size: 13px;">
          </div>

          <div class="form-group" style="margin-bottom: 0;">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 4px;">
              <label class="form-label" style="font-size: 12px; margin-bottom: 0;">Password</label>
              <a href="#/forgot-password" style="font-size: 11px; color: #818cf8; text-decoration: none;">Forgot password?</a>
            </div>
            <input type="password" id="login-password" class="form-input" placeholder="••••••••••••" value="EnterpriseMasterKey2026!" required style="padding: 10px 12px; font-size: 13px;">
          </div>

          <div style="display: flex; align-items: center; justify-content: space-between; font-size: 12px; color: var(--text-secondary); margin-top: 2px;">
            <label style="display: flex; align-items: center; gap: 6px; cursor: pointer;">
              <input type="checkbox" checked id="remember-me">
              <span>Remember session (30 days)</span>
            </label>
          </div>

          <button type="submit" class="btn btn-primary" style="padding: 10px; font-size: 13px; font-weight: 600; width: 100%; margin-top: 6px;">
            Sign In to Fabric →
          </button>
        </form>

        <!-- Federated SSO Options (Section 2.1) -->
        <div style="margin: 20px 0 16px; position: relative; text-align: center;">
          <div style="position: absolute; left: 0; right: 0; top: 50%; height: 1px; background: var(--border-subtle);"></div>
          <span style="position: relative; background: #0f172a; padding: 0 10px; font-size: 11px; color: var(--text-muted); text-transform: uppercase; letter-spacing: 0.5px;">
            Or authenticate with SSO
          </span>
        </div>

        <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 8px;">
          <button class="btn btn-secondary btn-sm" onclick="window.unifyLoginSSO('Okta')" style="padding: 7px; font-size: 11px;">
            Okta
          </button>
          <button class="btn btn-secondary btn-sm" onclick="window.unifyLoginSSO('Microsoft Entra')" style="padding: 7px; font-size: 11px;">
            Azure AD
          </button>
          <button class="btn btn-secondary btn-sm" onclick="window.unifyLoginSSO('Google')" style="padding: 7px; font-size: 11px;">
            Google
          </button>
        </div>

        <!-- Demo Persona Quick Select (Section 2.1 & 53) -->
        <div style="margin-top: 20px; padding: 12px; background: rgba(99, 102, 241, 0.08); border: 1px dashed rgba(99, 102, 241, 0.3); border-radius: var(--radius-md);">
          <div style="font-size: 11px; font-weight: 600; color: #a5b4fc; margin-bottom: 6px; text-transform: uppercase;">
            ✦ Demo Fast-Sign-In Presets
          </div>
          <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 6px;">
            <button class="btn btn-ghost btn-sm" onclick="window.unifyQuickLogin('Manjit Singh', 'Data Architect', 'manjit@unify.ai')" style="font-size: 11px; padding: 4px; justify-content: flex-start; text-align: left;">
              👤 Data Architect
            </button>
            <button class="btn btn-ghost btn-sm" onclick="window.unifyQuickLogin('Elena Rostova', 'Data Steward', 'elena@unify.ai')" style="font-size: 11px; padding: 4px; justify-content: flex-start; text-align: left;">
              ⚖️ Data Steward
            </button>
            <button class="btn btn-ghost btn-sm" onclick="window.unifyQuickLogin('Marcus Vance', 'Business Analyst', 'marcus@unify.ai')" style="font-size: 11px; padding: 4px; justify-content: flex-start; text-align: left;">
              📊 Business Analyst
            </button>
            <button class="btn btn-ghost btn-sm" onclick="window.unifyQuickLogin('Sarah Chen', 'Administrator', 'sarah@unify.ai')" style="font-size: 11px; padding: 4px; justify-content: flex-start; text-align: left;">
              🔧 Administrator
            </button>
          </div>
        </div>

        <!-- Registration Link -->
        <div style="text-align: center; margin-top: 18px; font-size: 12px; color: var(--text-secondary);">
          Need an enterprise tenant?
          <a href="#/register" style="color: #38bdf8; text-decoration: none; font-weight: 500; margin-left: 4px;">Register Workspace →</a>
        </div>

      </div>
    </div>
  `;
}
