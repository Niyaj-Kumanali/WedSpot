import { useState } from "react";
import { NavLink, useNavigate, useLocation } from "react-router-dom";
import {
  LayoutDashboard as DashboardIcon,
  MessageSquare as ChatIcon,
  Home as HomeIcon,
  LogOut as LogoutIcon,
  Pin,
  PinOff,
  User
} from "lucide-react";
import { type JSX } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { useDashboard } from "../../contexts/DashboardContext";
import { MENU_CONFIG } from "./SidebarConfig";
import {
  Box,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
  Divider,
  IconButton,
  useTheme,
  alpha
} from "@mui/material";

const Sidebar = (): JSX.Element => {
  const theme = useTheme();
  const { role, logout } = useAuth();
  const { sidebarOpen, closeSidebar, toggleSidebar } = useDashboard();
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
    const baseItems = [
      { text: "Dashboard", icon: <DashboardIcon size={20} />, path: `/${rolePath}-dashboard` }
    ];

    // Role-specific menu items from config
    const roleItems = MENU_CONFIG[currentRole] || [];

    return [...baseItems, ...roleItems];
  };

  const menuItems = getMenuItems();

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
      }}
    >
      <Box sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: isExpanded ? 'space-between' : 'center',
        px: isExpanded ? 2.5 : 0,
        mb: 1.5,
        height: 40,
        flexShrink: 0
      }}>
        {isExpanded && (
          <Typography
            variant="overline"
            sx={{
              fontWeight: 800,
              color: 'text.secondary',
              letterSpacing: 1,
              whiteSpace: 'nowrap',
              lineHeight: 1,
              mt: 0.5
            }}
          >
            Main Menu
          </Typography>
        )}
        <IconButton
          onClick={toggleSidebar}
          size="small"
          sx={{
            display: { xs: 'none', lg: 'inline-flex' },
            color: sidebarOpen ? 'primary.main' : 'text.disabled',
            opacity: isExpanded ? 1 : 0,
            visibility: isExpanded ? 'visible' : 'hidden',
            transition: 'opacity 0.2s, color 0.2s',
            bgcolor: sidebarOpen ? alpha(theme.palette.primary.main, 0.1) : 'transparent',
            '&:hover': { bgcolor: alpha(theme.palette.primary.main, 0.2) }
          }}
        >
          {sidebarOpen ? <PinOff size={18} /> : <Pin size={18} />}
        </IconButton>
      </Box>

      <List sx={{ px: 1.5, flexGrow: 1, py: 0 }}>
        {menuItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <ListItem key={item.text} disablePadding sx={{ mb: 0.5 }}>
              <ListItemButton
                component={NavLink}
                to={item.path}
                onClick={() => {
                  if (window.innerWidth < 1200) closeSidebar();
                }}
                sx={{
                  borderRadius: 1, // Sharper corners for a "square" feel
                  py: 1,
                  minHeight: 48,
                  justifyContent: isExpanded ? 'initial' : 'center',
                  px: 2.5,
                  color: isActive ? 'primary.main' : 'text.secondary',
                  bgcolor: isActive ? alpha(theme.palette.primary.main, 0.08) : 'transparent',
                  '&:hover': {
                    bgcolor: isActive ? alpha(theme.palette.primary.main, 0.12) : alpha(theme.palette.primary.main, 0.04),
                    color: 'primary.main',
                    '& .MuiListItemIcon-root': { color: 'primary.main' }
                  },
                  '&.active': {
                    bgcolor: alpha(theme.palette.primary.main, 0.08),
                    color: 'primary.main',
                    '& .MuiListItemIcon-root': { color: 'primary.main' }
                  }
                }}
              >
                <ListItemIcon sx={{
                  minWidth: 0,
                  mr: isExpanded ? 2 : 'auto',
                  justifyContent: 'center',
                  color: isActive ? 'primary.main' : 'inherit',
                  transition: 'color 0.2s'
                }}>
                  {item.icon}
                </ListItemIcon>
                <ListItemText
                  primary={item.text}
                  sx={{ opacity: isExpanded ? 1 : 0, transition: 'opacity 0.15s' }}
                  primaryTypographyProps={{
                    fontSize: '0.9rem',
                    fontWeight: isActive ? 700 : 600,
                    letterSpacing: '0.01em',
                    whiteSpace: 'nowrap'
                  }}
                />
              </ListItemButton>

            </ListItem>
          );
        })}

        <Divider sx={{ my: 2, mx: 1, opacity: 0.6 }} />

        <ListItem disablePadding sx={{ mb: 0.5 }}>
          <ListItemButton
            component={NavLink}
            to="/chatbot"
            sx={{
              borderRadius: 1,
              py: 1.25,
              minHeight: 48,
              justifyContent: isExpanded ? 'initial' : 'center',
              px: 2.5,
              color: 'text.secondary',
              '&:hover': { bgcolor: alpha(theme.palette.primary.main, 0.04), color: 'primary.main' }
            }}
          >
            <ListItemIcon sx={{ minWidth: 0, mr: isExpanded ? 2 : 'auto', justifyContent: 'center', color: 'inherit' }}>
              <ChatIcon size={20} />
            </ListItemIcon>
            <ListItemText
              primary="Chatbot"
              sx={{ opacity: isExpanded ? 1 : 0, transition: 'opacity 0.15s' }}
              primaryTypographyProps={{ fontSize: '0.9rem', fontWeight: 600, whiteSpace: 'nowrap' }}
            />
          </ListItemButton>
        </ListItem>

        <ListItem disablePadding sx={{ mb: 0.5 }}>
          <ListItemButton
            component={NavLink}
            to="/"
            sx={{
              borderRadius: 1,
              py: 1.25,
              minHeight: 48,
              justifyContent: isExpanded ? 'initial' : 'center',
              px: 2.5,
              color: 'text.secondary',
              '&:hover': { bgcolor: alpha(theme.palette.primary.main, 0.04), color: 'primary.main' }
            }}
          >
            <ListItemIcon sx={{ minWidth: 0, mr: isExpanded ? 2 : 'auto', justifyContent: 'center', color: 'inherit' }}>
              <HomeIcon size={20} />
            </ListItemIcon>
            <ListItemText
              primary="Home"
              sx={{ opacity: isExpanded ? 1 : 0, transition: 'opacity 0.15s' }}
              primaryTypographyProps={{ fontSize: '0.9rem', fontWeight: 600, whiteSpace: 'nowrap' }}
            />
          </ListItemButton>
        </ListItem>

        <ListItem disablePadding sx={{ mb: 0.5 }}>
          <ListItemButton
            component={NavLink}
            to="/profile"
            sx={{
              borderRadius: 1,
              py: 1.25,
              minHeight: 48,
              justifyContent: isExpanded ? 'initial' : 'center',
              px: 2.5,
              color: 'text.secondary',
              '&:hover': { bgcolor: alpha(theme.palette.primary.main, 0.04), color: 'primary.main' }
            }}
          >
            <ListItemIcon sx={{ minWidth: 0, mr: isExpanded ? 2 : 'auto', justifyContent: 'center', color: 'inherit' }}>
              <User size={20} />
            </ListItemIcon>
            <ListItemText
              primary="Profile"
              sx={{ opacity: isExpanded ? 1 : 0, transition: 'opacity 0.15s' }}
              primaryTypographyProps={{ fontSize: '0.9rem', fontWeight: 600, whiteSpace: 'nowrap' }}
            />
          </ListItemButton>
        </ListItem>
      </List>

      <Box sx={{ p: 2, borderTop: '1px solid', borderColor: 'divider' }}>
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
            <LogoutIcon size={20} />
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
            boxShadow: '10px 0 25px rgba(0,0,0,0.05)'
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
          },
        }}
        open
      >
        {drawerContent}
      </Drawer>
    </Box>
  );
};

export default Sidebar;
