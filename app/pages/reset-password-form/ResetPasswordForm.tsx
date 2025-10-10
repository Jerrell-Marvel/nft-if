import { toast } from "react-toastify";
import "./resetPassword.scss";
import PasswordInput from "~/components/password-input/PasswordInput";
import { useState } from "react";
import { useNavigate } from "react-router";

export default function ResetPasswordForm() {
  // const [emailErrorMsg, setEmailErrorMsg] = useState("");
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const canSubmit = password === confirmPassword && password !== "";
  return (
    <div className="reset-password-form-page">
      <div className="form-card">
        <h2 className="gradient-text">Reset Password</h2>
        <span>Please enter a new password below</span>

        <div className="form-group">
          {/* <label htmlFor="new-password">New Password</label> */}
          {/* <input type="password" id="new-password" /> */}
          <PasswordInput
            onChange={setPassword}
            value={password}
            label="New Password"
          />
        </div>

        <div className="form-group">
          {/* <label htmlFor="confirm-new-password">Confirm New Password</label>
          <input type="password" id="confirm-new-password" /> */}

          <PasswordInput
            onChange={setConfirmPassword}
            value={confirmPassword}
            label="Confirm New Password"
          />
          <span className="error-text">
            {password !== confirmPassword && confirmPassword
              ? "Password doesn't match"
              : ""}
          </span>
        </div>

        <button
          onClick={() => {
            toast.success("Your password has been reset");

            setTimeout(() => {
              navigate("/sign-in"); // This runs after 1 second
            }, 1000);
          }}
          className={`btn ${!canSubmit ? "disabled-btn" : ""}`}
          disabled={!canSubmit}
        >
          Reset
        </button>
      </div>
    </div>
  );
}
