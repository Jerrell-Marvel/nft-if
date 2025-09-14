import { useNavigate } from "react-router";

export default function UserSignUpPage() {
  let navigate = useNavigate();
  return (
    <div className="user-sign-up-page">
      <h1>User sign up</h1>

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
      <label htmlFor="confirm-password">confirm password</label>
      <input
        type="password"
        id="confirm-password"
      />

      <label htmlFor="profile-picture">profile picture</label>
      <input
        type="file"
        id="profile-picture"
      />
      <label htmlFor="banner-picture">banner</label>
      <input
        type="file"
        id="banner-picture"
      />

      <button
        onClick={() => {
          navigate("/");
        }}
      >
        Create account
      </button>
    </div>
  );
}
