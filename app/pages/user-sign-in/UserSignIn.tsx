import { Link, useNavigate } from "react-router";
import "./UserSignIn.scss";

export default function UserSignInPage() {
  let navigate = useNavigate();
  return (
    <div className="user-sign-in-page nav-padding">
      <div className="main-container">
        <h1>User login</h1>

        <div className="input-item">
          <label htmlFor="email">email</label>
          <input
            type="text"
            id="email"
          />
        </div>

        <div className="input-item">
          <label htmlFor="password">password</label>
          <input
            type="password"
            id="password"
          />
        </div>

        <Link to="/">Reset password</Link>
        <Link to="/sign-up">Sign up</Link>
        <button
          onClick={() => {
            navigate("/");
          }}
        >
          Sign in
        </button>
      </div>
    </div>
  );
}
