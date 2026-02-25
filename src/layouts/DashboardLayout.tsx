<<<<<<< HEAD
<<<<<<< HEAD
import { Outlet, useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar/Sidebar";
import { useAuth } from "../contexts/Auth/useAuth";
<<<<<<< HEAD
import { useDashboard } from "../contexts/DashboardContext";
import { type JSX, useState } from "react";
import { getInitials } from "../utils/userUtils";
import {
  Box,
  AppBar,
  Toolbar,
  IconButton,
  Badge,
  Avatar,
  Tooltip,
  alpha,
  useTheme
} from "@mui/material";
import {
  Menu as MenuIcon,
  Notifications as BellIcon,
  ShoppingCart as CartIcon
} from "@mui/icons-material";
import Logo from "../components/Logo/Logo";
import NotificationCenter from "../components/Notifications/NotificationCenter";
import { useCart } from "../contexts/CartContext";
import { UserRole } from "../Types/auth.types";

const DashboardLayout = (): JSX.Element => {
  const theme = useTheme();
  const { role, userName } = useAuth();
  const { sidebarOpen, toggleSidebar } = useDashboard();
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const navigate = useNavigate();
  const { items } = useCart();
  const cartCount = items.length;


  const handleProfileClick = () => {
    navigate("/profile");
  };

  const getDetectedRole = () => {
    if (role) return role;
    const path = window.location.pathname.toLowerCase();
=======
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import {
  Menu,
  Search,
  Bell,
  ChevronDown,
  X
} from "lucide-react";
=======
import { Outlet, useNavigate } from "react-router-dom";
>>>>>>> 6c56909 (dashboard converted to MUI and corrected sidebar and navbar)
import Sidebar from "../components/Sidebar/Sidebar";
import { useAuth } from "../contexts/AuthContext";
=======
>>>>>>> f39772a (centralizing the auth logic and moving the api call to api folder)
import { useDashboard } from "../contexts/DashboardContext";
import { type JSX, useState } from "react";
import { getInitials } from "../utils/userUtils";
import {
  Box,
  AppBar,
  Toolbar,
  IconButton,
  Badge,
  Avatar,
  Tooltip,
  alpha,
  useTheme
} from "@mui/material";
import {
  Menu as MenuIcon,
  Notifications as BellIcon,
  ShoppingCart as CartIcon
} from "@mui/icons-material";
import { useSelector } from "react-redux";
import { type RootState } from "../store";
import { UserRole } from "../Types/auth.types";
import Logo from "../components/Logo/Logo";
import NotificationCenter from "../components/Notifications/NotificationCenter";

const DashboardLayout = (): JSX.Element => {
  const theme = useTheme();
  const { role, userName } = useAuth();
  const { sidebarOpen, toggleSidebar } = useDashboard();
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const navigate = useNavigate();
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const cartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);


  const handleProfileClick = () => {
    navigate("/profile");
  };

  const getDetectedRole = () => {
    if (role) return role;
<<<<<<< HEAD

    const path = location.pathname.toLowerCase();
>>>>>>> d720bde (Pushing the project to the repo)
=======
    const path = window.location.pathname.toLowerCase();
>>>>>>> 6c56909 (dashboard converted to MUI and corrected sidebar and navbar)
    if (path.includes("/admin")) return "Admin";
    if (path.includes("/manager")) return "Manager";
    if (path.includes("/vendor")) return "Vendor";
    if (path.includes("/staff")) return "Staff";
<<<<<<< HEAD
<<<<<<< HEAD
    if (path.includes("/client")) return "Client";
    return "User";
  };

  const currentRole = getDetectedRole();
  const sidebarWidthFull = 260;
  const sidebarWidthCollapsed = 72;
  const currentSidebarWidth = sidebarOpen ? sidebarWidthFull : sidebarWidthCollapsed;

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh', bgcolor: theme.palette.background.default }}>
<<<<<<< HEAD
=======
    if (path.includes("/client") || path.includes("/customer") || path.includes("/products")) return "Client";

    return null;
=======
    if (path.includes("/client")) return "Client";
    return "User";
>>>>>>> 6c56909 (dashboard converted to MUI and corrected sidebar and navbar)
  };

  const currentRole = getDetectedRole();
  const sidebarWidthFull = 260;
  const sidebarWidthCollapsed = 72;
  const currentSidebarWidth = sidebarOpen ? sidebarWidthFull : sidebarWidthCollapsed;

  return (
<<<<<<< HEAD
    <div className={`dashboard-container ${sidebarOpen ? 'sidebar-is-open' : ''} ${isSidebarHovered ? 'sidebar-is-hovered' : ''}`}>
>>>>>>> d720bde (Pushing the project to the repo)
=======
    <Box sx={{ display: 'flex', minHeight: '100vh', bgcolor: '#f8fafc' }}>
>>>>>>> 6c56909 (dashboard converted to MUI and corrected sidebar and navbar)
=======
>>>>>>> b8445b0 (Final MUI Transition)
      {/* Notifications Layer */}
      {isNotificationsOpen && (
        <NotificationCenter onClose={() => setIsNotificationsOpen(false)} />
      )}
<<<<<<< HEAD
<<<<<<< HEAD

      {/* Top Navigation Bar */}
      <AppBar
        position="fixed"
        sx={{
          zIndex: theme.zIndex.drawer + 1,
          bgcolor: 'background.paper',
          color: 'text.primary',
          boxShadow: '0 2px 10px rgba(0, 0, 0, 0.05)',
          borderBottom: '1px solid',
          borderColor: 'divider',
        }}
      >
        <Toolbar sx={{ justifyContent: 'space-between', minHeight: 70 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={toggleSidebar}
              sx={{ mr: 1, display: { lg: 'none' } }}
            >
              <MenuIcon />
            </IconButton>
            <Box sx={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }} >
              <Logo />
            </Box>
          </Box>

          <Box sx={{ display: 'flex', alignItems: 'center', gap: { xs: 1, sm: 2 } }}>
            <Tooltip title="Notifications">
              <IconButton
                size="large"
                onClick={() => setIsNotificationsOpen(!isNotificationsOpen)}
                sx={{
                  bgcolor: isNotificationsOpen ? alpha(theme.palette.primary.main, 0.1) : 'transparent',
                  color: isNotificationsOpen ? 'primary.main' : 'inherit'
                }}
              >
                <Badge badgeContent={4} color="error">
                  <BellIcon fontSize="small" />
                </Badge>
              </IconButton>
            </Tooltip>

            {currentRole === UserRole.CLIENT && (
              <Tooltip title="View Cart">
                <IconButton
                  size="large"
                  sx={{ color: 'inherit' }}
                  onClick={() => navigate('/cart')}
                >
                  <Badge badgeContent={cartCount} color="primary">
                    <CartIcon fontSize="small" />
                  </Badge>
                </IconButton>
              </Tooltip>
            )}

            <Box
              onClick={handleProfileClick}
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 1.5,
                cursor: 'pointer',
                p: 0.5,
                borderRadius: '50px',
                transition: theme.dashboard.transition,
                '&:hover': {
                  bgcolor: alpha(theme.palette.text.primary, 0.04)
                }
              }}
            >
              <Avatar
                sx={{
                  width: 40,
                  height: 40,
                  bgcolor: 'primary.main',
                  fontSize: '0.9rem',
                  fontWeight: 700,
                  boxShadow: `0 4px 12px ${alpha(theme.palette.primary.main, 0.25)}`
                }}
              >
                {getInitials(userName || currentRole)}
              </Avatar>
            </Box>
          </Box>
        </Toolbar>
      </AppBar>

      {/* Sidebar Navigation */}
      <Sidebar />

      {/* Main Content Area */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: { xs: 2.5, md: 3 },
          width: { lg: `calc(100% - ${currentSidebarWidth}px)` },
          mt: '70px', // Header height
          transition: theme.dashboard.transition,
          overflowX: 'hidden', // Prevent horizontal overflow from children
        }}
      >
        <Outlet />
      </Box>
    </Box>
=======
      {/* Full-width Top Header */}
      <header className="dash-header">
        <div className="header-left">
          <div className="header-logo-container">
            <Logo />
          </div>
        </div>
=======
>>>>>>> 6c56909 (dashboard converted to MUI and corrected sidebar and navbar)

      {/* Top Navigation Bar */}
      <AppBar
        position="fixed"
        sx={{
          zIndex: theme.zIndex.drawer + 1,
          bgcolor: 'background.paper',
          color: 'text.primary',
          boxShadow: '0 2px 10px rgba(0, 0, 0, 0.05)',
          borderBottom: '1px solid',
          borderColor: 'divider',
        }}
      >
        <Toolbar sx={{ justifyContent: 'space-between', minHeight: 70 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={toggleSidebar}
              sx={{ mr: 1, display: { lg: 'none' } }}
            >
              <MenuIcon />
            </IconButton>
            <Box sx={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }} >
              <Logo />
            </Box>
          </Box>

          <Box sx={{ display: 'flex', alignItems: 'center', gap: { xs: 1, sm: 2 } }}>
            <Tooltip title="Notifications">
              <IconButton
                size="large"
                onClick={() => setIsNotificationsOpen(!isNotificationsOpen)}
                sx={{
                  bgcolor: isNotificationsOpen ? alpha(theme.palette.primary.main, 0.1) : 'transparent',
                  color: isNotificationsOpen ? 'primary.main' : 'inherit'
                }}
              >
                <Badge badgeContent={4} color="error">
                  <BellIcon fontSize="small" />
                </Badge>
              </IconButton>
            </Tooltip>

            {currentRole === UserRole.CLIENT && (
              <Tooltip title="View Cart">
                <IconButton
                  size="large"
                  sx={{ color: 'inherit' }}
                  onClick={() => navigate('/cart')}
                >
                  <Badge badgeContent={cartCount} color="primary">
                    <CartIcon fontSize="small" />
                  </Badge>
                </IconButton>
              </Tooltip>
            )}

            <Box
              onClick={handleProfileClick}
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 1.5,
                cursor: 'pointer',
                p: 0.5,
                borderRadius: '50px',
                transition: theme.dashboard.transition,
                '&:hover': {
                  bgcolor: alpha(theme.palette.text.primary, 0.04)
                }
              }}
            >
              <Avatar
                sx={{
                  width: 40,
                  height: 40,
                  bgcolor: 'primary.main',
                  fontSize: '0.9rem',
                  fontWeight: 700,
                  boxShadow: `0 4px 12px ${alpha(theme.palette.primary.main, 0.25)}`
                }}
              >
                {getInitials(userName || currentRole)}
              </Avatar>
            </Box>
          </Box>
        </Toolbar>
      </AppBar>

      {/* Sidebar Navigation */}
      <Sidebar />

<<<<<<< HEAD
      {/* Main Content Area below Header */}
      <div className="dashboard-content-wrapper">
        <div
          className="sidebar-hover-listener"
          onMouseEnter={() => setIsSidebarHovered(true)}
          onMouseLeave={() => setIsSidebarHovered(false)}
        >
          <Sidebar />
        </div>

        {/* Overlay for mobile */}
        <div
          className={`sidebar-overlay ${sidebarOpen ? 'show' : ''}`}
          onClick={closeSidebar}
        />

        <main className="dashboard-main">
          <div className="dash-content">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
>>>>>>> d720bde (Pushing the project to the repo)
=======
      {/* Main Content Area */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: { xs: 2, md: 3 },
          width: { lg: `calc(100% - ${currentSidebarWidth}px)` },
          mt: '70px', // Header height
          transition: theme.dashboard.transition,
        }}
      >
        <Outlet />
      </Box>
    </Box>
>>>>>>> 6c56909 (dashboard converted to MUI and corrected sidebar and navbar)
  );
};

export default DashboardLayout;
