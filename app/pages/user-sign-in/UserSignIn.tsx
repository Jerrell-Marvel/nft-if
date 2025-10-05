import { Link, useNavigate } from "react-router";
import "./UserSignIn.scss";
import { useState, type ChangeEvent } from "react";
import { isValidEmail } from "utils/validator";
import EyeOpen from "~/components/icons/eyes/EyeOpen";
import EyeClose from "~/components/icons/eyes/EyeClose";
import PasswordInput from "~/components/password-input/PasswordInput";
import EmailInput from "~/components/email-input/EmailInput";

export default function UserSignInPage() {
  let navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [emailErrorMsg, setEmailErrorMsg] = useState("");
  const [password, setPassword] = useState("");

  const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
    console.log("here");
    if (isValidEmail(e.target.value)) {
      setEmailErrorMsg("");
    } else {
      setEmailErrorMsg("Please enter a valid email address");
    }

    setEmail(e.target.value);
  };

  return (
    <div className="user-sign-in-page nav-padding">
      <div className="main-container">
        <h1 className="gradient-text">Sign In</h1>

        <div className="gradient-line"></div>

        <div className="input-item">
          <EmailInput
            value={email}
            onChange={setEmail}
          />
        </div>

        <div className="input-item ">
          <label htmlFor="password">Password</label>

          <PasswordInput onChange={setPassword} />
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
          className={`btn ${!password || emailErrorMsg ? "disabled-btn" : ""}`}
          disabled={!password || emailErrorMsg ? true : false}
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
