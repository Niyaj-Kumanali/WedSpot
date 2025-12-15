import { useContext, useState, type JSX } from 'react';
import { NavLink, Link, useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import AuthContext from '../contexts/AuthContext';
import '../css/NavBar.css';

const NavBar = (): JSX.Element => {
  // Your AuthContext shape may use `token` or `accessToken` and `role` or `userRole`.
  // This component tries common names so it works with either variant.
  const auth = useContext(AuthContext) as any;
  const nav = useNavigate();
  const [open, setOpen] = useState(false);

  const toggleMenu = () => setOpen(v => !v);
  const closeMenu = () => setOpen(false);

  // normalize token and role
  const token = auth?.token ?? auth?.accessToken ?? null;
  const role = auth?.role ?? auth?.userRole ?? null;
  const isAuthenticated = !!token;

  // Role helpers
  const isAdmin = role === 'Admin';
  const isManager = role === 'Manager';
  const isVendor = role === 'Vendor';
  const isStaff = role === 'Staff';
  const isCustomer = role === 'Customer';

  const handleLogout = async () => {
    try {
      // If your auth.logout returns a promise, await it
      await auth?.logout?.();
    } catch (e) {
      // ignore
    } finally {
      closeMenu();
      nav('/login');
    }
  };

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

              {/* Products visible to everyone (customers and guests) */}
              <li>
                <NavLink to="/products" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`} onClick={closeMenu}>
                  Products
                </NavLink>
              </li>

              {/* Role specific links */}
              {/* Admin */}
              {isAdmin && (
                <>
                  <li>
                    <NavLink to="/admin/master" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`} onClick={closeMenu}>
                      Master
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to="/admin/inventory" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`} onClick={closeMenu}>
                      Inventory
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to="/admin/users" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`} onClick={closeMenu}>
                      Users
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to="/admin/bills" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`} onClick={closeMenu}>
                      Bills
                    </NavLink>
                  </li>
                </>
              )}

              {/* Manager */}
              {isManager && (
                <>
                  <li>
                    <NavLink to="/manager/inventory" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`} onClick={closeMenu}>
                      Inventory
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to="/manager/bills" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`} onClick={closeMenu}>
                      Bills
                    </NavLink>
                  </li>
                </>
              )}

              {/* Staff */}
              {isStaff && (
                <li>
                  <NavLink to="/staff/inventory" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`} onClick={closeMenu}>
                    Inventory
                  </NavLink>
                </li>
              )}

              {/* Vendor */}
              {isVendor && (
                <li>
                  <NavLink to="/vendor/bills" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`} onClick={closeMenu}>
                    Bills
                  </NavLink>
                </li>
              )}

              {/* Customer specific (and authenticated users) */}
              {isCustomer && (
                <>
                  <li>
                    <NavLink to="/customer/bills" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`} onClick={closeMenu}>
                      My Bills
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to="/customer/dashboard" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`} onClick={closeMenu}>
                      Dashboard
                    </NavLink>
                  </li>
                </>
              )}

              {/* About / Contact / Services (common) */}
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

              {/* Chatbot (shown only to authenticated users) */}
              {isAuthenticated && (
                <li className="hide-desktop">
                  <NavLink to="/chatbot" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`} onClick={closeMenu}>
                    Chatbot
                  </NavLink>
                </li>
              )}
            </ul>
          </div>

          {/* Right actions (visible on desktop) */}
          <div className="navbar-right">
            {isAuthenticated ? (
              <>
                <span style={{ marginRight: 12, fontWeight: 600 }}>
                  {role ? `Role: ${role}` : null}
                </span>
                <Button
                  variant="text"
                  sx={{ fontWeight: 600 }}
                  onClick={handleLogout}
                >
                  Logout
                </Button>
              </>
            ) : (
              <>
                <Button variant="text" sx={{ fontWeight: 600 }} component={Link} to="/login">Login</Button>
                <Button variant="contained" className="nav-action-btn" component={Link} to="/register">Register</Button>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default NavBar;
