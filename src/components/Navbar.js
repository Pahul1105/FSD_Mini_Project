// Navbar.js
// ---------
// This component shows the top navigation for the job portal.
// It also changes based on login status.

import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();
  const { currentUser, logout } = useAuth();

  function linkClass(path) {
    if (location.pathname === path) {
      return "navbar__link navbar__link--active";
    }
    return "navbar__link";
  }

  function handleLogout() {
    logout();
    navigate("/login");
  }

  return (
    <nav className="navbar">
      <div className="navbar__brand">
        <Link to="/" className="navbar__brand-link">
          <h1 className="navbar__title">Job Portal</h1>
        </Link>
        <p className="navbar__text">Simple hiring portal with login system</p>
      </div>

      <div className="navbar__links">
        <Link to="/" className={linkClass("/")}>
          Home
        </Link>
        <Link to="/jobs" className={linkClass("/jobs")}>
          Jobs
        </Link>

        {currentUser ? (
          <Link to="/applications" className={linkClass("/applications")}>
            My Applications
          </Link>
        ) : null}

        {currentUser?.role === "admin" ? (
          <Link to="/admin" className={linkClass("/admin")}>
            Admin
          </Link>
        ) : null}

        {!currentUser ? (
          <>
            <Link to="/login" className={linkClass("/login")}>
              Login
            </Link>
            <Link to="/register" className={linkClass("/register")}>
              Register
            </Link>
          </>
        ) : (
          <div className="navbar__user">
            <span className="navbar__badge">
              {currentUser.name} ({currentUser.role})
            </span>
            <button className="secondary-button" onClick={handleLogout}>
              Logout
            </button>
          </div>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
