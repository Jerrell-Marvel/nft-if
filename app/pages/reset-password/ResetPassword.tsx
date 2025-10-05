import { useState } from "react";
import { useNavigate } from "react-router";
import "./ResetPassword.scss";

export default function ResetPasswordPage() {
  const [isShowNotif, setIsShowNotif] = useState(false);

  const navigate = useNavigate();
  return (
    <div className="reset-password-page">

      <div className="container">
        <h2 className="gradient-text">Reset Password</h2>
        <p>Please enter your email to reset password</p>

        <div className="form-group">
        {/* <label htmlFor="email">Enter your email :</label> */}
          <input
          type="text"
          id="email"
          />
        </div>

        <button
          onClick={() => {
        setIsShowNotif(true);
        navigate("/reset-password/form");
          }}
          className="btn"
          >
          Reset
        </button>
      </div>
      
    </div>
  );
}
