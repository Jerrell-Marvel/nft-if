import { Link, useNavigate } from "react-router";
import "./topbar.scss";
import { useState } from "react";

export default function TopBar() {
  const navigate = useNavigate();

  const [navActive, setNavActive] = useState(false);

  return (
    <nav className="topbar">
      <div
        id="hamburger"
        className={`${navActive ? "hamburger-active" : ""}`}
        onClick={() => setNavActive((prev) => !prev)}
      >
        <span className="hamburger-line"></span>
        <span className="hamburger-line"></span>
        <span className="hamburger-line"></span>
      </div>
      <div className={`topbar-container ${navActive ? "nav-active" : ""}`}>
        <div className="topbar-left">
          <Link to={"/"}>
            <img
              src="/icon.png"
              alt=""
              className="logo"
            />
          </Link>
          <div className="search-container">
            <svg
              className="search-icon"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M10 18a8 8 0 1 1 5.657-2.343l3.386 3.387a1 1 0 0 1-1.414 1.414l-3.387-3.386A8 8 0 0 1 10 18zm0-14a6 6 0 1 0 0 12 6 6 0 0 0 0-12z"></path>
            </svg>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                navigate("/");
              }}
            >
              <input
                type="text"
                placeholder="Search NFT"
              />

              <button
                type="submit"
                className="btn"
              >
                Search
              </button>
            </form>
            {/* <button className="filter-button">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M3 4h18v2H3V4zm2 7h14v2H5v-2zm4 7h6v2H9v-2z"></path>
            </svg>
          </button> */}
          </div>
        </div>
        <div className="topbar-right">
          <select className="explore-button">
            <option value="">EXPLORE</option>
            <option value="1">Option 1</option>
            <option value="2">Option 2</option>
            <option value="3">Option 3</option>
          </select>
          <Link to={"/cart"}>
            <div className="cart-icon">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M7 18c-1.1 0-1.99.9-1.99 2S5.9 22 7 22s2-.9 2-2-.9-2-2-2zM1 2v2h2l3.6 7.59-1.35 2.45c-.16.28-.25.61-.25.96 0 1.1.9 2 2 2h12v-2H7.42c-.14 0-.25-.11-.25-.25l.03-.12.9-1.63h7.45c.75 0 1.41-.41 1.75-1.03l3.58-6.49c.08-.14.12-.31.12-.48 0-.55-.45-1-1-1H5.21l-.94-2H1zm16 16c-1.1 0-1.99.9-1.99 2s.89 2 1.99 2 2-.9 2-2-.9-2-2-2z"></path>
              </svg>
            </div>
          </Link>
          <div className="balance-container">
            <span className="balance-label">Balance</span>
            <span className="balance-amount">-</span>
          </div>
          <Link to={"/profile"}>
            <img
              // src="https://i.pravatar.cc/40?u=a042581f4e29026704d"
              src="/defaultProfile.jpg"
              alt="User Avatar"
              className="user-avatar"
            />
          </Link>
        </div>
      </div>

      {/* <button>Cart</button>
      <Link to="/profile">Avatar</Link> */}
    </nav>
  );
}
