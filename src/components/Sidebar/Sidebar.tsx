<<<<<<< HEAD
import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { icons } from "../../config/iconMap";
import { type JSX } from "react";
import { useAuth } from "../../contexts/Auth/useAuth";
import { useDashboard } from "../../contexts/DashboardContext";
import {
  Box,
  Drawer,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Divider,
  useTheme,
  alpha
} from "@mui/material";
import { MENU_CONFIG, type MenuItem } from "../../config/menuConfig";
import SidebarSection from "./components/SidebarSection";

const Sidebar = (): JSX.Element => {
  const theme = useTheme();
  const { role, logout } = useAuth();
  const { sidebarOpen, closeSidebar } = useDashboard();
  const [isHovered, setIsHovered] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const currentRole = role?.toLowerCase() ||
    (window.location.pathname.includes('/admin') ? 'admin' :
      window.location.pathname.includes('/manager') ? 'manager' :
        window.location.pathname.includes('/vendor') ? 'vendor' :
          window.location.pathname.includes('/staff') ? 'staff' :
            'client');

  const sidebarWidth = 260;
  const collapsedWidth = 72;
  const isExpanded = sidebarOpen || isHovered;

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  const getMenuItems = () => {
    const rolePath = currentRole === 'client' ? 'client' : currentRole;

    // Base menu items that appear for all roles
    const items: MenuItem[] = [
      { text: "Dashboard", icon: icons.Dashboard, path: `/${rolePath}-dashboard` }
    ];

    // Role-specific menu items from config
    const roleItems = MENU_CONFIG[currentRole] || [];
    items.push(...roleItems);

    return items;
  };

  const getGlobalItems = () => {
    return [
      { text: "Chatbot", icon: icons.Chat, path: "/chatbot" },
      { text: "Profile", icon: icons.Profile, path: "/profile" },
    ];
  };

  const mainMenuItems = getMenuItems();
  const globalItems = getGlobalItems();

  const handleItemClick = () => {
    if (window.innerWidth < 1200) closeSidebar();
  };

  const drawerContent = (
    <Box
      onMouseEnter={() => !sidebarOpen && setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      sx={{
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        pt: '80px',
        overflowX: 'hidden',
        overflowY: 'auto',
        msOverflowStyle: 'none',
        scrollbarWidth: 'none',
        '&::-webkit-scrollbar': {
          display: 'none'
        }
      }}
    >
      <Box sx={{ flexGrow: 1 }}>
        <SidebarSection
          items={mainMenuItems}
          isExpanded={isExpanded}
          onItemClick={handleItemClick}
          currentPath={location.pathname}
        />

        <Divider sx={{ my: 2, mx: 1, opacity: 0.6 }} />

        <SidebarSection
          items={globalItems}
          isExpanded={isExpanded}
          onItemClick={handleItemClick}
          currentPath={location.pathname}
        />
      </Box>

      <Box sx={{ p: 2, borderTop: '1px solid', borderColor: 'divider', flexShrink: 0 }}>
        <ListItemButton
          onClick={handleLogout}
          sx={{
            borderRadius: 1,
            py: 1.25,
            minHeight: 48,
            justifyContent: isExpanded ? 'initial' : 'center',
            px: 2.5,
            color: 'error.main',
            '&:hover': { bgcolor: alpha(theme.palette.error.main, 0.08) }
          }}
        >
          <ListItemIcon sx={{ minWidth: 0, mr: isExpanded ? 2 : 'auto', justifyContent: 'center', color: 'inherit' }}>
            {icons.Logout}
          </ListItemIcon>
          <ListItemText
            primary="Logout"
            sx={{ opacity: isExpanded ? 1 : 0, transition: 'opacity 0.15s' }}
            primaryTypographyProps={{ fontSize: '0.9rem', fontWeight: 700, whiteSpace: 'nowrap' }}
          />
        </ListItemButton>
      </Box>
    </Box>
  );

  return (
    <Box
      component="nav"
      sx={{
        width: { lg: sidebarOpen ? sidebarWidth : collapsedWidth },
        flexShrink: { lg: 0 },
        transition: theme.transitions.create('width', {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.enteringScreen,
        }),
      }}
    >
      {/* Mobile Drawer */}
      <Drawer
        variant="temporary"
        open={sidebarOpen && window.innerWidth < 1200}
        onClose={closeSidebar}
        ModalProps={{ keepMounted: true }}
        sx={{
          display: { xs: 'block', lg: 'none' },
          '& .MuiDrawer-paper': {
            boxSizing: 'border-box',
            width: sidebarWidth,
            borderRight: 'none',
            boxShadow: '10px 0 25px rgba(0,0,0,0.05)',
            msOverflowStyle: 'none',
            scrollbarWidth: 'none',
            '&::-webkit-scrollbar': {
              display: 'none'
            }
          },
        }}
      >
        {drawerContent}
      </Drawer>

      {/* Desktop Drawer */}
      <Drawer
        variant="permanent"
        sx={{
          display: { xs: 'none', lg: 'block' },
          '& .MuiDrawer-paper': {
            boxSizing: 'border-box',
            width: isExpanded ? sidebarWidth : collapsedWidth,
            borderRight: '1px solid',
            borderColor: 'divider',
            bgcolor: 'background.paper',
            overflowX: 'hidden',
            transition: theme.dashboard.transition,
            msOverflowStyle: 'none',
            scrollbarWidth: 'none',
            '&::-webkit-scrollbar': {
              display: 'none'
            }
          },
        }}
        open
      >
        {drawerContent}
      </Drawer>
    </Box>
=======
import { NavLink, useNavigate, useLocation, Link } from "react-router-dom";
import { 
  LayoutDashboard, 
  Package, 
  Users, 
  ReceiptIndianRupee, 
  MessageSquare, 
  Home,
  LogOut
} from "lucide-react";
import { type JSX } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { useDashboard } from "../../contexts/DashboardContext";
import { getInitials } from "../../utils/userUtils";

const Sidebar = (): JSX.Element => {
  const { role, logout, userName } = useAuth();
  const { sidebarOpen, closeSidebar } = useDashboard();
  const nav = useNavigate();
  const location = useLocation();

  // Robust role detection fallback based on URL
  const getDetectedRole = () => {
    if (role) return role.toLowerCase();
    
    // Fallback based on pathname if role is null (e.g. during refresh)
    const path = location.pathname.toLowerCase();
    if (path.includes("/admin")) return "admin";
    if (path.includes("/manager")) return "manager";
    if (path.includes("/vendor")) return "vendor";
    if (path.includes("/staff")) return "staff";
    if (path.includes("/client") || path.includes("/customer") || path.includes("/products")) return "client";
    
    return null;
  };

  const currentRole = getDetectedRole();

  const handleLogout = async () => {
    await logout();
    nav("/login");
  };

  const getMenuItems = () => {
    const items = [];

    // Dashboard path mapping
    let dashboardPath = `/${currentRole}-dashboard`;
    if (currentRole === "customer" || currentRole === "client") {
      dashboardPath = "/client-dashboard";
    }

    if (currentRole) {
      items.push({ text: "Dashboard", icon: <LayoutDashboard size={22} />, path: dashboardPath });
    }

    switch (currentRole) {
      case "admin":
        items.push(
          { text: "Master", icon: <Package size={22} />, path: "/admin/master" },
          { text: "Inventory", icon: <Package size={22} />, path: "/admin/inventory" },
          { text: "Users", icon: <Users size={22} />, path: "/admin/users" },
          { text: "Bills", icon: <ReceiptIndianRupee size={22} />, path: "/admin/bills" }
        );
        break;
      case "manager":
        items.push(
          { text: "Inventory", icon: <Package size={22} />, path: "/manager/inventory" },
          { text: "Bills", icon: <ReceiptIndianRupee size={22} />, path: "/manager/bills" }
        );
        break;
      case "staff":
        items.push(
          { text: "Inventory", icon: <Package size={22} />, path: "/staff/inventory" }
        );
        break;
      case "vendor":
        items.push(
          { text: "Bills", icon: <ReceiptIndianRupee size={22} />, path: "/vendor/bills" }
        );
        break;
      case "customer":
      case "client":
        items.push(
          { text: "Products", icon: <Package size={22} />, path: "/products" },
          { text: "My Bills", icon: <ReceiptIndianRupee size={22} />, path: "/customer/bills" }
        );
        break;
    }
    return items;
  };

  const menuItems = getMenuItems();

  return (
    <aside className={`dash-sidebar ${sidebarOpen ? 'open' : ''}`}>

      <nav className="sidebar-nav">
        <div className="nav-group">
          {/* <div className="nav-label">Main Menu</div> */}
          {menuItems.map((item) => {
            const isDashboard = item.text === "Dashboard";
            
            if (isDashboard) {
              return (
                <Link
                  key={item.text}
                  to={item.path}
                  className="nav-item"
                  onClick={closeSidebar}
                >
                  <div className="nav-icon-container">{item.icon}</div>
                  <span className="nav-text">{item.text}</span>
                </Link>
              );
            }

            return (
              <NavLink
                key={item.text}
                to={item.path}
                className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}
                onClick={closeSidebar}
              >
                <div className="nav-icon-container">{item.icon}</div>
                <span className="nav-text">{item.text}</span>
              </NavLink>
            );
          })}
        </div>

        <div className="nav-group">
          {/* <div className="nav-label">Support</div> */}
          <NavLink
            to="/chatbot"
            className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}
            onClick={closeSidebar}
          >
            <div className="nav-icon-container">
              <MessageSquare size={22} />
            </div>
            <span className="nav-text">Chatbot</span>
          </NavLink>
          <NavLink
            to="/"
            className="nav-item"
            onClick={closeSidebar}
          >
            <div className="nav-icon-container">
              <Home size={22} />
            </div>
            <span className="nav-text">Home</span>
          </NavLink>
        </div>
      </nav>

      <div className="sidebar-footer">
        <div 
          className="sidebar-profile-section" 
          onClick={() => {
            nav("/profile");
            closeSidebar();
          }}
        >
          <div className="avatar-initials">{getInitials(userName || currentRole)}</div>
          <div className="footer-text-content">
            <div className="footer-profile-name">{userName || currentRole}</div>
          </div>
        </div>
        
        <button 
          onClick={handleLogout}
          className="sidebar-logout-btn"
        >
          <div className="nav-icon-container">
            <LogOut size={20} />
          </div>
          <span className="nav-text">Logout</span>
        </button>
      </div>
    </aside>
>>>>>>> d720bde (Pushing the project to the repo)
  );
};

export default Sidebar;
