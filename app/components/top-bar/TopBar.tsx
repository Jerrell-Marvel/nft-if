import { Link, useNavigate } from "react-router";
import "./topbar.scss";

export default function TopBar() {
  const navigate = useNavigate();
  return (
    <nav className="top-bar">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          navigate("/");
        }}
      >
        <input
          type="text"
          placeholder="search"
        />

        <button type="submit">Search</button>
      </form>

      <button>Cart</button>
      <Link to="/profile">Avatar</Link>
    </nav>
  );
}
