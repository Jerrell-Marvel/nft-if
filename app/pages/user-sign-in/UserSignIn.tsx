import { Link, useNavigate } from "react-router";
import "./UserSignIn.scss";

export default function UserSignInPage() {
  let navigate = useNavigate();
  return (
    <div className="user-sign-in-page nav-padding">
      <div className="main-container">
        <h1 className="gradient-text">Login</h1>

        <div className="gradient-line"></div>

        <div className="input-item">
          <label htmlFor="email">Email</label>
          <input
            type="text"
            id="email"
          />
        </div>

        <div className="input-item">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
          />
        </div>

        <Link to="/" className="reset-password gradient-text">Forget password?</Link>
        <button
          onClick={() => {
            navigate("/");
          }}
          className="btn"
        >
          Sign in
        </button>
        <span className="sign-up-wrapper">Don't have an account? <Link to="/sign-up" className="gradient-text sign-up">Sign up</Link></span>
      </div>
    </div>
  );
}
