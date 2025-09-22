import { useNavigate } from "react-router";
import { useState } from "react";
import "./UserSignUp.scss";
import { Link } from "react-router";

export default function UserSignUpPage() {
  let navigate = useNavigate();

  const [profilePicName, setProfilePicName] = useState("No file chosen");

  const [bannerPicName, setBannerPicName] = useState("No file chosen");

  const handleProfilePictureChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (event.target.files && event.target.files[0]) {
      setProfilePicName(event.target.files[0].name);
    } else {
      setProfilePicName("No file chosen");
    }
  };

  const handleBannerPictureChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (event.target.files && event.target.files[0]) {
      setBannerPicName(event.target.files[0].name);
    } else {
      setBannerPicName("No file chosen");
    }
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
            <label htmlFor="email">Email</label>
            <input type="email" id="email" />
          </div>

          <div className="input-item">
            <label htmlFor="password">Password</label>
            <input type="password" id="password" />
          </div>

          <div className="input-item">
            <label htmlFor="confirm-password">Confirm Password</label>
            <input type="password" id="confirm-password" />
          </div>

          <div className="input-item">
            <label htmlFor="profile-picture" className="secondary-btn">
              Choose Profile Picture
            </label>
            <input
              type="file"
              id="profile-picture"
              onChange={handleProfilePictureChange}
            />
            <span id="file-name">{profilePicName}</span>
          </div>

          <div className="input-item">
            <label htmlFor="banner-picture" className="secondary-btn">
              Choose Banner Picture
            </label>
            <input
              type="file"
              id="banner-picture"
              onChange={handleBannerPictureChange}
            />
            <span id="file-name">{bannerPicName}</span>
          </div>

          <button
            onClick={() => {
              navigate("/");
            }}
            className="btn"
          >
            Create account
          </button>
          <span className="sign-up-wrapper">
            Already have an account?{" "}
            <Link to="/sign-in" className="gradient-text sign-up">
              Sign in
            </Link>
          </span>
        </div>
      </div>
    </div>
  );
}
