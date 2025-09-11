import { Link, useNavigate } from "react-router";

export default function UserSignInPage() {
  let navigate = useNavigate();
  return (
    <div>
      <h1>User login</h1>

      <label htmlFor="email">email</label>
      <input
        type="text"
        id="email"
      />
      <label htmlFor="password">password</label>
      <input
        type="password"
        id="password"
      />

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
  );
}
