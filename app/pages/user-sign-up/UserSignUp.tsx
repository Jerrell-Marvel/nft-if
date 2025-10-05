import { useNavigate } from "react-router";
import { useState } from "react";
import "./UserSignUp.scss";
import { Link } from "react-router";
import EmailInput from "~/components/email-input/EmailInput";
import PasswordInput from "~/components/password-input/PasswordInput";
import { isValidEmail } from "utils/validator";

export default function UserSignUpPage() {
  let navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [profilePicName, setProfilePicName] = useState<File | null>(null);
  const [bannerPicName, setBannerPicName] = useState<File | null>(null);

  const handleProfilePictureChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setProfilePicName(event.target.files[0]);
    }
  };

  const handleBannerPictureChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setBannerPicName(event.target.files[0]);
    }
  };

  const checkIsFormValid = () => {
    return password && confirmPassword && isValidEmail(email) && profilePicName && bannerPicName && password === confirmPassword;
  };

  return (
    <div className="user-sign-up-page">
      <div className="main-container">
        {/* <img className="img-item" src="1.jpg" alt="" /> */}
        <div className="img-item"></div>
        <div className="form-container">
          <h1 className="gradient-text">User Sign Up</h1>
          <div className="gradient-line"></div>
          <div className="input-item">
            <EmailInput
              value={email}
              onChange={setEmail}
            />
          </div>

          <div className="input-item">
            <PasswordInput
              value={password}
              onChange={setPassword}
            />
          </div>

          <div className="input-item">
            <PasswordInput
              value={confirmPassword}
              onChange={setConfirmPassword}
              label="Confirm Password"
            />

            <span className="error-text">{password !== confirmPassword && confirmPassword ? "Password doesn't match" : ""}</span>
          </div>

          <div className="input-item">
            <label
              htmlFor="profile-picture"
              className="secondary-btn"
            >
              Choose Profile Picture
            </label>
            <input
              type="file"
              accept="image/*"
              id="profile-picture"
              onChange={handleProfilePictureChange}
            />
            <span id="file-name">{profilePicName?.name ?? "No file chosen"}</span>
          </div>

          <div className="input-item">
            <label
              htmlFor="banner-picture"
              className="secondary-btn"
            >
              Choose Banner Picture
            </label>
            <input
              type="file"
              id="banner-picture"
              accept="image/*"
              onChange={handleBannerPictureChange}
            />
            <span id="file-name">{bannerPicName?.name ?? "No file chosen"}</span>
          </div>

          <button
            onClick={() => {
              navigate("/");
            }}
            className={`btn ${!checkIsFormValid() ? "disabled-btn" : ""}`}
            disabled={!checkIsFormValid()}
          >
            Create account
          </button>
          <span className="sign-up-wrapper">
            Already have an account?{" "}
            <Link
              to="/sign-in"
              className="gradient-text sign-up"
            >
              Sign in
            </Link>
          </span>
        </div>
      </div>
    </div>
  );
}
