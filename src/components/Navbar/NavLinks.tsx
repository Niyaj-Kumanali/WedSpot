import { Link } from "react-router-dom";
import { type JSX } from "react";

interface NavLinksProps {
  onClose: () => void;
  isAuthenticated: boolean;
  role: string | null;
  onLogout: () => void;
  isMobileMenuOpen: boolean;
}

const NavLinks = ({ onClose, isAuthenticated, role, onLogout, isMobileMenuOpen }: NavLinksProps): JSX.Element => {
  return (
    <>
      <li>
        <Link
          to="/"
          className="nav-link"
          onClick={() => {
            window.scrollTo({ top: 0, behavior: "smooth" });
            onClose();
          }}
        >
          Home
        </Link>
      </li>

      <li><a href="#about" className="nav-link" onClick={onClose}>About Us</a></li>
      <li><a href="#contact" className="nav-link" onClick={onClose}>Contact</a></li>
      <li><a href="#services" className="nav-link" onClick={onClose}>Services</a></li>
      <li><a href="#reviews" className="nav-link" onClick={onClose}>Reviews</a></li>

      {/* Auth buttons - only visible on mobile */}
      {isMobileMenuOpen && (
        <li className="mobile-auth-section">
          {isAuthenticated ? (
            <div className="mobile-auth-buttons">
              {role && <span className="mobile-role">Role: {role}</span>}
              <button className="mobile-logout-btn" onClick={() => { onLogout(); onClose(); }}>
                Logout
              </button>
            </div>
          ) : (
            <div className="mobile-auth-buttons">
              <Link to="/login" className="mobile-login-btn" onClick={onClose}>
                Login
              </Link>
              <Link to="/register" className="mobile-register-btn" onClick={onClose}>
                Get Started
              </Link>
            </div>
          )}
        </li>
      )}
    </>
  );
};

export default NavLinks;
