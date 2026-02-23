import { Outlet, useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar/Sidebar";
import { useAuth } from "../contexts/AuthContext";
import { useDashboard } from "../contexts/DashboardContext";
import { type JSX, useState } from "react";
import { getInitials } from "../utils/userUtils";
import {
  Box,
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  InputBase,
  Badge,
  Avatar,
  Menu as MuiMenu,
  MenuItem,
  Tooltip,
  alpha,
  useTheme
} from "@mui/material";
import {
  Menu as MenuIcon,
  Search as SearchIcon,
  Notifications as BellIcon,
  KeyboardArrowDown as ChevronDownIcon,
  Logout as LogoutIcon,
  Person as ProfileIcon
} from "@mui/icons-material";
import Logo from "../components/Logo/Logo";
import NotificationCenter from "../components/Notifications/NotificationCenter";

const DashboardLayout = (): JSX.Element => {
  const theme = useTheme();
  const { role, userName, logout } = useAuth();
  const { sidebarOpen, toggleSidebar } = useDashboard();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const navigate = useNavigate();

  const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = async () => {
    handleMenuClose();
    await logout();
    navigate("/login");
  };

  const handleProfileClick = () => {
    handleMenuClose();
    navigate("/profile");
  };

  const getDetectedRole = () => {
    if (role) return role;
    const path = window.location.pathname.toLowerCase();
    if (path.includes("/admin")) return "Admin";
    if (path.includes("/manager")) return "Manager";
    if (path.includes("/vendor")) return "Vendor";
    if (path.includes("/staff")) return "Staff";
    if (path.includes("/client")) return "Client";
    return "User";
  };

  const currentRole = getDetectedRole();
  const sidebarWidthFull = 260;
  const sidebarWidthCollapsed = 72;
  const currentSidebarWidth = sidebarOpen ? sidebarWidthFull : sidebarWidthCollapsed;

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh', bgcolor: theme.palette.background.default }}>
      {/* Notifications Layer */}
      {isNotificationsOpen && (
        <NotificationCenter onClose={() => setIsNotificationsOpen(false)} />
      )}

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

          <Box sx={{
            display: { xs: 'none', md: 'flex' },
            alignItems: 'center',
            bgcolor: alpha(theme.palette.text.primary, 0.03),
            borderRadius: 2,
            px: 2,
            py: 0.5,
            width: '100%',
            maxWidth: 400
          }}>
            <SearchIcon sx={{ color: 'text.secondary', mr: 1, fontSize: 20 }} />
            <InputBase
              placeholder="Search anything..."
              sx={{ width: '100%', fontSize: '0.9rem' }}
            />
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

            <Box
              onClick={handleProfileMenuOpen}
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 1.5,
                cursor: 'pointer',
                p: 0.5,
                pr: 1.5,
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
              <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
                <Typography sx={{ fontWeight: 700, fontSize: '0.85rem', lineHeight: 1.2 }}>
                  {userName || currentRole}
                </Typography>
                <Typography variant="caption" sx={{ color: 'text.secondary', fontWeight: 600, display: 'block' }}>
                  {currentRole}
                </Typography>
              </Box>
              <ChevronDownIcon sx={{ fontSize: 18, color: 'text.secondary', display: { xs: 'none', sm: 'block' } }} />
            </Box>

            <MuiMenu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleMenuClose}
              transformOrigin={{ horizontal: 'right', vertical: 'top' }}
              anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
              PaperProps={{
                elevation: 0,
                sx: {
                  overflow: 'visible',
                  filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.1))',
                  mt: 1.5,
                  p: 1,
                  minWidth: 180,
                  borderRadius: 3,
                  '& .MuiAvatar-root': {
                    width: 32,
                    height: 32,
                    ml: -0.5,
                    mr: 1,
                  },
                },
              }}
            >
              <MenuItem onClick={handleProfileClick} sx={{ borderRadius: 1.5, py: 1, mb: 0.5 }}>
                <ProfileIcon sx={{ mr: 1.5, fontSize: 18, color: 'text.secondary' }} /> Profile
              </MenuItem>
              <MenuItem onClick={handleLogout} sx={{ borderRadius: 1.5, py: 1, color: 'error.main' }}>
                <LogoutIcon sx={{ mr: 1.5, fontSize: 18 }} /> Logout
              </MenuItem>
            </MuiMenu>
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
          p: { xs: 2, md: 3 },
          width: { lg: `calc(100% - ${currentSidebarWidth}px)` },
          mt: '70px', // Header height
          transition: theme.dashboard.transition,
        }}
      >
        <Outlet />
      </Box>
    </Box>
  );
};

export default DashboardLayout;
