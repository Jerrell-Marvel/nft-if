import { toast } from "react-toastify";
import "./resetPassword.scss";

export default function ResetPasswordForm() {
  return (
    <div className="reset-password-form-page">
      <div className="form-card">
        <h2>Reset Your Password</h2>
        <p>Please enter a new password below</p>

        <div className="form-group">
          <label htmlFor="new-password">New Password</label>
          <input type="password" id="new-password" />
        </div>

        <div className="form-group">
          <label htmlFor="confirm-new-password">Confirm New Password</label>
          <input type="password" id="confirm-new-password" />
        </div>

        <button
          onClick={() => {
            toast.success("Your password has been reset");
          }}
        >
          Reset
        </button>
      </div>
    </div>
  );
}
