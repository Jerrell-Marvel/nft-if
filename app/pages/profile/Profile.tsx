import "./profile.scss";

export default function Profile() {
  return (
    <main className="profile-page nav-padding">
      <p>Profile</p>

      <img src="/1.jpg" />

      <p>Wallet address : 0xe123123131</p>
      <button>copy</button>

      <button>Connect wallet</button>
      <button>Preferences</button>
      <button>My account</button>
      <button>Logout</button>
    </main>
  );
}
