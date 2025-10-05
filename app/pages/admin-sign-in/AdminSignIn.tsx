import { Link, useNavigate } from "react-router";
import "./AdminSignIn.scss";
import { useState, type ChangeEvent } from "react";
import { isValidEmail } from "utils/validator";
import EyeOpen from "~/components/icons/eyes/EyeOpen";
import EyeClose from "~/components/icons/eyes/EyeClose";
import PasswordInput from "~/components/password-input/PasswordInput";
import EmailInput from "~/components/email-input/EmailInput";
import UserSignInPage from "../user-sign-in/UserSignIn";

export default function AdminSignInPage() {
  let navigate = useNavigate();

  const [email, setEmail] = useState("");
  // const [emailErrorMsg, setEmailErrorMsg] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div className="admin-sign-in-page nav-padding">
      <div className="main-container">
        <h1 className="gradient-text">Sign In</h1>

        <div className="gradient-line"></div>

        <div className="input-item">
          <EmailInput
            value={email}
            onChange={setEmail}
            isEnterprise={true}
          />
        </div>

        <div className="input-item ">
          <PasswordInput
            onChange={setPassword}
            value={password}
          />
        </div>

        <div className="forget-password-wrapper">
          <Link
            to="/reset-password"
            className="reset-password gradient-text"
          >
            Forget password?
          </Link>
        </div>
        <button
          onClick={() => {
            navigate("/");
          }}
          className={`btn ${!password || !isValidEmail(email) ? "disabled-btn" : ""}`}
          disabled={!password || !isValidEmail(email) ? true : false}
        >
          Sign in
        </button>
        <span className="sign-up-wrapper">
          Don't have an account?{" "}
          <Link
            to="/sign-up"
            className="gradient-text sign-up"
          >
            Sign up
          </Link>
        </span>
      </div>
    </div>
  );
}
