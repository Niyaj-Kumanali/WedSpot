import { useState, type JSX } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import "./NavBar.scss";
import Logo from "../Logo/Logo";
import NavLinks from "./NavLinks";
import AuthActions from "./AuthActions";

const NavBar = (): JSX.Element => {
  const { role, isAuthenticated, logout } = useAuth();
  const nav = useNavigate();
  const [open, setOpen] = useState(false);

  const toggleMenu = () => setOpen((v) => !v);
  const closeMenu = () => setOpen(false);

  const handleLogout = async () => {
    try {
      await logout();
    } catch (e) {
      // ignore
    } finally {
      closeMenu();
      nav("/login");
    }
  };

  return (
    <header className="navbar">
      <div className="navbar-container">
        <div className="navbar-content">
          <div className="navbar-left">
            <p className="brand-name">
              <Logo />
            </p>

            {/* Mobile menu button */}
            <button
              className={`menu-btn ${open ? "open" : ""}`}
              aria-label="Toggle navigation"
              aria-expanded={open}
              onClick={toggleMenu}
            >
              <span className="hamburger-line"></span>
              <span className="hamburger-line"></span>
              <span className="hamburger-line"></span>
            </button>

            {/* Links */}
            <ul className={`navbar-links ${open ? "open" : ""}`}>
              <NavLinks
                onClose={closeMenu}
                isAuthenticated={isAuthenticated}
                role={role}
                onLogout={handleLogout}
                isMobileMenuOpen={open}
              />
            </ul>
          </div>

          {/* Right actions */}
          <AuthActions
            isAuthenticated={isAuthenticated}
            role={role}
            onLogout={handleLogout}
          />
        </div>
      </div>
    </header>
  );
};

export default NavBar;
