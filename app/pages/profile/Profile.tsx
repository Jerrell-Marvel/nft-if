import { useNavigate } from "react-router";
import "./profile.scss";
import { toast } from "react-toastify";

export default function Profile() {
  let navigate = useNavigate();
  let walletAddress = "0xe123123131";

  return (
    <main className="profile-page nav-padding">
      <div className="main-container">
        <h1 className="gradient-text">Profile</h1>

        <img
          className="profile-avatar"
          src="/1.jpg"
          alt="Profile Avatar"
        />

        <h1>Username</h1>

        <div className="wallet-info">
          <p className="wallet-address">Wallet address: {walletAddress}</p>
          <button
            className="copy-icon"
            onClick={() => {
              navigator.clipboard.writeText(walletAddress);
              toast.success("Copied!");
            }}
          >
            <img
              src="/copy-icon.png"
              alt="Copy Icon"
            />
          </button>
        </div>

        <div className="profile-actions">
          <button className="btn">Connect Wallet</button>
          <button className="btn">Preferences</button>
          <button className="btn">My account</button>
          <button
            onClick={() => {
              localStorage.removeItem("profile");
              window.location.reload();
              window.location.href = "/sign-in";
              navigate("/sign-in");
            }}
            className="btn"
          >
            Logout
          </button>
        </div>
      </div>
    </main>
  );
}
