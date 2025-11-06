import { useContext, useState, type JSX } from 'react';
import { NavLink, Link, useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import { AuthContext } from '../contexts/AuthContext';
import '../css/NavBar.css';

const NavBar = (): JSX.Element => {
  const auth = useContext(AuthContext);
  const nav = useNavigate();
  const [open, setOpen] = useState(false);

  const toggleMenu = () => setOpen(v => !v);
  const closeMenu = () => setOpen(false);

  return (
    <header className="navbar">
      <div className="navbar-container">
        <div className="navbar-content">
          {/* Left (brand + links) */}
          <div className="navbar-left">
            <p className="brand-name">
              <Link to="/" onClick={closeMenu}>WeddsPot</Link>
            </p>

            {/* Mobile menu button */}
            <button
              className="menu-btn"
              aria-label="Toggle navigation"
              aria-expanded={open}
              onClick={toggleMenu}
            >
              {/* simple hamburger */}
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                <path d="M4 6h16M4 12h16M4 18h16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              </svg>
            </button>

            {/* Links */}
            <ul className={`navbar-links ${open ? 'open' : ''}`}>
              <li>
                <NavLink to="/" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`} onClick={closeMenu}>
                  Home
                </NavLink>
              </li>
              <li>
                <NavLink to="/products" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`} onClick={closeMenu}>
                  Products
                </NavLink>
              </li>
              <li>
                <NavLink to="/about" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`} onClick={closeMenu}>
                  About Us
                </NavLink>
              </li>
              <li>
                <NavLink to="/contact" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`} onClick={closeMenu}>
                  Contact
                </NavLink>
              </li>
              <li>
                <NavLink to="/services" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`} onClick={closeMenu}>
                  Services
                </NavLink>
              </li>
              {/* Optional: move auth actions here for mobile */}
              <li className="hide-desktop">
                <NavLink to="/ai" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`} onClick={closeMenu}>
                  AI Assistant
                </NavLink>
              </li>
            </ul>
          </div>

          {/* Right actions (visible on desktop) */}
          <div className="navbar-right">
            {auth?.token ? (
              <Button
                color="inherit"
                onClick={() => {
                  auth.logout();
                  nav('/login');
                }}
              >
                Logout
              </Button>
            ) : (
              <>
                <Button variant='text' sx={{ fontWeight: 600 }} component={Link} to="/login">Login</Button>
                <Button variant='contained' className="nav-action-btn" component={Link} to="/register">Register</Button>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default NavBar;
