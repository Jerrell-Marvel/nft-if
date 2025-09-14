import "./topbar.scss";

export default function TopBar() {
  return (
    <nav className="top-bar">
      <input
        type="text"
        placeholder="search"
      />

      <button>Cart</button>
      <button>Avatar</button>
    </nav>
  );
}
