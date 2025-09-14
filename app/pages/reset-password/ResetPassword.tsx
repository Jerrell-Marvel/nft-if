import { useState } from "react";
import { useNavigate } from "react-router";
import "./ResetPassword.scss";

export default function ResetPasswordPage() {
  const [isShowNotif, setIsShowNotif] = useState(false);

  const navigate = useNavigate();
  return (
    <div className="reset-password-page">
      <label htmlFor="email">email</label>
      <input
        type="text"
        id="email"
      />

      {isShowNotif ? <p>Verification has been sent to your email</p> : null}

      <button
        onClick={() => {
          setIsShowNotif(true);

          setTimeout(() => {
            navigate("/reset-password/form");
          }, 3000);
        }}
      >
        Reset
      </button>
    </div>
  );
}
