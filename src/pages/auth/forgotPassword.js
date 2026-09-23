// Authentication Page: Password Recovery (Route: /forgot-password)
export async function renderForgotPasswordPage() {
  return `
    <div style="min-height: 100vh; width: 100vw; display: flex; align-items: center; justify-content: center; background: radial-gradient(circle at 50% 20%, #171b34 0%, #080b12 70%); padding: 20px; box-sizing: border-box;">
      <div style="width: 100%; max-width: 440px; background: rgba(15, 23, 42, 0.85); backdrop-filter: blur(12px); border: 1px solid var(--border-default); border-radius: var(--radius-xl); padding: 32px; box-shadow: var(--shadow-lg);">
        
        <div style="text-align: center; margin-bottom: 22px;">
          <div style="display: inline-flex; align-items: center; justify-content: center; width: 44px; height: 44px; border-radius: 12px; background: linear-gradient(135deg, #6366f1, #06b6d4); font-weight: 800; font-size: 20px; color: #fff; margin-bottom: 12px; box-shadow: 0 0 16px rgba(99, 102, 241, 0.4);">
            U
          </div>
          <h1 style="font-family: var(--font-display); font-size: 22px; font-weight: 700; color: #fff; letter-spacing: -0.3px;">
            Reset Enterprise Password
          </h1>
          <p style="font-size: 12.5px; color: var(--text-secondary); margin-top: 4px;">
            Enter your corporate email to receive a secure recovery magic link
          </p>
        </div>

        <form onsubmit="window.unifyHandleForgot(event)" style="display: flex; flex-direction: column; gap: 14px;">
          <div class="form-group" style="margin-bottom: 0;">
            <label class="form-label" style="font-size: 12px;">Corporate Work Email</label>
            <input type="email" id="forgot-email" class="form-input" placeholder="name@enterprise.com" required style="padding: 10px 12px; font-size: 13px;">
          </div>

          <div id="forgot-success-banner" style="display: none; padding: 10px 14px; background: rgba(16, 185, 129, 0.12); border: 1px solid rgba(16, 185, 129, 0.35); border-radius: var(--radius-md); font-size: 12px; color: #34d399;">
            ✓ If this email matches an authorized enterprise user, a secure cryptographic reset link has been dispatched.
          </div>

          <button type="submit" class="btn btn-primary" style="padding: 10px; font-size: 13px; font-weight: 600; width: 100%;">
            Send Recovery Magic Link →
          </button>
        </form>

        <div style="text-align: center; margin-top: 20px; font-size: 12px; color: var(--text-secondary);">
          Remembered your password?
          <a href="#/login" style="color: #38bdf8; text-decoration: none; font-weight: 500; margin-left: 4px;">Return to Sign In →</a>
        </div>

      </div>
    </div>
  `;
}
