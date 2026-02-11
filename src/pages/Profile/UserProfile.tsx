import React, { useState } from "react";
<<<<<<< HEAD
<<<<<<< HEAD
import {
  Box,
  Typography,
  Grid,
=======
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
>>>>>>> 9cd112e (Implement core application architecture with routing, authentication, UI components, and SCSS styling.)
  Avatar,
  Button,
  TextField,
  Tabs,
  Tab,
  IconButton,
  InputAdornment,
  Divider,
<<<<<<< HEAD
  alpha,
  useTheme,
  Switch,
  List,
  ListItem,
  ListItemText,
  Fade
} from "@mui/material";
import {
  Person as PersonIcon,
  Notifications as BellIcon,
  Lock as LockIcon,
  Mail as MailIcon,
  Phone as PhoneIcon,
  Visibility as EyeIcon,
  VisibilityOff as EyeOffIcon,
  Language as GlobeIcon,
  LocationOn as PinIcon,
  CameraAlt as CameraIcon,
  VerifiedUser as ShieldCheckIcon,
  Email as EmailIcon,
  CalendarMonth as CalendarIcon
} from "@mui/icons-material";
import { useAuth } from "../../contexts/AuthContext";
import { getInitials } from "../../utils/userUtils";
import DashboardCard from "../../components/Dashboard/DashboardCard/DashboardCard";

const UserProfile: React.FC = () => {
  const theme = useTheme();
  const { role, userName } = useAuth();
  const [activeTab, setActiveTab] = useState(0);

  const handleTabChange = (_event: React.SyntheticEvent, newValue: number) => {
    setActiveTab(newValue);
  };

  return (
    <Box sx={{ p: { xs: 2, md: 2 }, maxWidth: 1400, margin: '0 auto', animation: 'fadeIn 0.6s ease-out' }}>
        <Typography 
          variant="h4" 
          sx={{ 
            mb: 2, 
            background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            display: 'inline-block'
          }}
        >
          My Profile
        </Typography>
      <Grid container spacing={3} sx={{ alignItems: 'stretch' }}>
        {/* Left Column: Full-Height Profile Overview */}
        <Grid item xs={12} md={4} lg={3.5}>
          <ProfileSidebarHeader userName={userName} role={role} />
        </Grid>

        {/* Right Column: Content Area with Unified Navigation */}
        <Grid item xs={12} md={8} lg={8.5}>
          <DashboardCard noPadding sx={{ height: '100%', display: 'flex', flexDirection: 'column', minHeight: 550 }}>
            {/* Integrated Top Navigation */}
            <Box sx={{ px: 1, pt: 1, borderBottom: 1, borderColor: 'divider' }}>
              <ProfileTopNav activeTab={activeTab} onTabChange={handleTabChange} />
            </Box>

            {/* Content Display Area */}
            <Box sx={{ p: 4, flexGrow: 1 }}>
              <Fade in={activeTab === 0} timeout={1000}>
                <Box hidden={activeTab !== 0}>
                  <GeneralSection userName={userName} />
                </Box>
              </Fade>
              <Fade in={activeTab === 1} timeout={1000}>
                <Box hidden={activeTab !== 1}>
                  <SecuritySection />
                </Box>
              </Fade>
              <Fade in={activeTab === 2} timeout={1000}>
                <Box hidden={activeTab !== 2}>
                  <NotificationsSection />
                </Box>
              </Fade>
            </Box>
          </DashboardCard>
        </Grid>
      </Grid>
    </Box>
  );
};

/* --- SUB-COMPONENTS --- */

const ProfileSidebarHeader = ({ userName, role }: any) => {
  const theme = useTheme();

  return (
    <DashboardCard noPadding sx={{ height: '100%', overflow: 'hidden' }}>
      <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
        {/* Profile Info Section */}
        <Box sx={{ px: 3, pb: 4, textAlign: 'center', mt: 2, position: 'relative', zIndex: 1, flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
          {/* Large Avatar */}
          <Box sx={{ position: 'relative', display: 'inline-block', mb: 3, alignSelf: 'center' }}>
            <Avatar
              sx={{
                width: 140,
                height: 140,
                fontSize: '3rem',
                fontWeight: 800,
                background: theme.palette.background.paper,
                color: theme.palette.primary.main,
                border: `8px solid ${theme.palette.background.paper}`,
                boxShadow: '0 10px 40px -10px rgba(0,0,0,0.3)',
                borderRadius: 6
              }}
            >
              {getInitials(userName || role || "")}
            </Avatar>
            <IconButton
              size="small"
              sx={{
                position: 'absolute',
                bottom: 8,
                right: 8,
                bgcolor: theme.palette.primary.main,
                color: 'white',
                boxShadow: theme.shadows[4],
                border: `2px solid ${theme.palette.background.paper}`,
                '&:hover': { bgcolor: theme.palette.primary.dark },
                transition: '0.2s'
              }}
            >
              <CameraIcon sx={{ fontSize: 15 }} />
            </IconButton>
          </Box>

          <Typography variant="h5" sx={{ fontWeight: 800, color: 'text.primary', mb: 3 }}>
            {userName}
          </Typography>

          <Divider sx={{ mb: 4, mx: -3 }} />


          {/* Detailed Info List */}
          <Box sx={{ textAlign: 'left', display: 'flex', flexDirection: 'column', gap: 2 }}>
            <InfoItem icon={<EmailIcon fontSize="small" />} label="Email" value="admin@wedspot.com" />
            <InfoItem icon={<PinIcon fontSize="small" />} label="Location" value="Mumbai, India" />
            <InfoItem icon={<ShieldCheckIcon fontSize="small" />} label="Status" value="Verified Account" colorType="success" />
            <InfoItem icon={<CalendarIcon fontSize="small" />} label="Joined" value="January 12, 2024" />
          </Box>
        </Box>
      </Box>
    </DashboardCard>
  );
};

const InfoItem = ({ icon, label, value, colorType = 'primary' }: any) => {
  const theme = useTheme();
  const mainColor = (theme.palette as any)[colorType]?.main || theme.palette.primary.main;

  return (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
      <Box sx={{
        p: 1,
        borderRadius: 2,
        bgcolor: alpha(mainColor, 0.1),
        color: mainColor,
        display: 'flex'
      }}>
        {icon}
      </Box>
      <Box>
        <Typography variant="caption" sx={{ display: 'block', color: 'text.secondary', fontWeight: 600, lineHeight: 1 }}>{label}</Typography>
        <Typography variant="body2" sx={{ fontWeight: 700, color: 'text.primary' }}>{value}</Typography>
      </Box>
    </Box>
  );
};

const ProfileTopNav = ({ activeTab, onTabChange }: any) => {

  const navItems = [
    { label: 'General Info', icon: <PersonIcon /> },
    { label: 'Security', icon: <LockIcon /> },
    { label: 'Notifications', icon: <BellIcon /> },
  ];

  return (
    <Tabs
      value={activeTab}
      onChange={onTabChange}
      sx={{
        '& .MuiTabs-indicator': {
          height: 3,
          borderRadius: '3px 3px 0 0',
          bgcolor: 'primary.main'
        },
        '& .MuiTab-root': {
          minHeight: 55,
          textTransform: 'none',
          transition: '0.2s',
          color: 'text.secondary',
          fontSize: '0.95rem',
          px: 4,
          '&.Mui-selected': {
            color: 'primary.main',
            fontWeight: 800
          }
        }
      }}
    >
      {navItems.map((item, i) => (
        <Tab
          disableRipple
          key={i}
          label={
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
              {item.icon}
              <Typography variant="body2" sx={{ fontWeight: 'inherit' }}>
                {item.label}
              </Typography>
            </Box>
          }
        />
      ))}
    </Tabs>
  );
};

const GeneralSection = ({ userName }: any) => (
  <Box >
    <Typography variant="h5" sx={{ fontWeight: 800, mb: 1 }}>Personal Information</Typography>
    <Typography variant="body2" sx={{ color: 'text.secondary', mb: 3 }}>Update your basic information and contact details.</Typography>

    <Grid container spacing={2}>
      <Grid item xs={12} sm={6}>
        <Typography variant="caption" sx={{ fontWeight: 700, color: 'text.secondary', ml: 0.5, mb: 1, display: 'block' }}>FULL NAME</Typography>
        <TextField
          fullWidth
          defaultValue={userName || ""}
          placeholder="Enter full name"
          InputProps={{
            startAdornment: <InputAdornment position="start"><PersonIcon fontSize="small" /></InputAdornment>,
            sx: { borderRadius: 3 }
          }}
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <Typography variant="caption" sx={{ fontWeight: 700, color: 'text.secondary', ml: 0.5, mb: 1, display: 'block' }}>EMAIL ADDRESS</Typography>
        <TextField
          fullWidth
          defaultValue="admin@wedspot.com"
          InputProps={{
            startAdornment: <InputAdornment position="start"><MailIcon fontSize="small" /></InputAdornment>,
            sx: { borderRadius: 3 }
          }}
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <Typography variant="caption" sx={{ fontWeight: 700, color: 'text.secondary', ml: 0.5, mb: 1, display: 'block' }}>PHONE NUMBER</Typography>
        <TextField
          fullWidth
          defaultValue="+91 98765 43210"
          InputProps={{
            startAdornment: <InputAdornment position="start"><PhoneIcon fontSize="small" /></InputAdornment>,
            sx: { borderRadius: 3 }
          }}
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <Typography variant="caption" sx={{ fontWeight: 700, color: 'text.secondary', ml: 0.5, mb: 1, display: 'block' }}>LOCATION</Typography>
        <TextField
          fullWidth
          defaultValue="Mumbai, Maharashtra"
          InputProps={{
            startAdornment: <InputAdornment position="start"><GlobeIcon fontSize="small" /></InputAdornment>,
            sx: { borderRadius: 3 }
          }}
        />
      </Grid>

    </Grid>
    <Box sx={{ mt: 5, display: 'flex', justifyContent: 'flex-end' }}>
      <Button variant="contained" size="large" sx={{ borderRadius: 3, px: 6, py: 1.5, fontWeight: 800 }}>Save Changes</Button>
    </Box>
  </Box>
);

const SecuritySection = () => {
  const [showPass, setShowPass] = useState(false);

  return (
    <Box >
      <Typography variant="h5" sx={{ fontWeight: 800, mb: 1 }}>Password & Security</Typography>
      <Typography variant="body2" sx={{ color: 'text.secondary', mb: 3 }}>Manage your security settings and password.</Typography>

      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Typography variant="caption" sx={{ fontWeight: 700, color: 'text.secondary', ml: 0.5, mb: 1, display: 'block' }}>CURRENT PASSWORD</Typography>
          <TextField
            fullWidth
            type={showPass ? 'text' : 'password'}
            defaultValue="********"
            InputProps={{
              startAdornment: <InputAdornment position="start"><LockIcon fontSize="small" /></InputAdornment>,
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={() => setShowPass(!showPass)} size="small">
                    {showPass ? <EyeOffIcon fontSize="small" /> : <EyeIcon fontSize="small" />}
                  </IconButton>
                </InputAdornment>
              ),
              sx: { borderRadius: 3 }
            }}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <Typography variant="caption" sx={{ fontWeight: 700, color: 'text.secondary', ml: 0.5, mb: 1, display: 'block' }}>NEW PASSWORD</Typography>
          <TextField
            fullWidth
            type="password"
            placeholder="Min 12 characters"
            InputProps={{ sx: { borderRadius: 3, px: 1 } }}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <Typography variant="caption" sx={{ fontWeight: 700, color: 'text.secondary', ml: 0.5, mb: 1, display: 'block' }}>CONFIRM NEW PASSWORD</Typography>
          <TextField
            fullWidth
            type="password"
            placeholder="Repeat new password"
            InputProps={{ sx: { borderRadius: 3, px: 1 } }}
          />
        </Grid>
      </Grid>
      <Box sx={{ mt: 5, display: 'flex', justifyContent: 'flex-end', mb: 5 }}>
        <Button variant="contained" color="secondary" size="large" sx={{ borderRadius: 3, px: 6, py: 1.5, fontWeight: 800 }}>Update Password</Button>
      </Box>
    </Box>
  );
};

const NotificationsSection = () => {
  return (
    <Box >
      <Typography variant="h5" sx={{ fontWeight: 800, mb: 1 }}>Notification Preferences</Typography>
      <Typography variant="body2" sx={{ color: 'text.secondary', mb: 1 }}>Choose how you want to be notified by the platform.</Typography>

      <List disablePadding>
        {[
          { title: 'Email Notifications', sub: 'Weekly digests and platform reports.', active: true },
          { title: 'Push Notifications', sub: 'Real-time booking and request updates.', active: true },
          { title: 'System Alerts', sub: 'Critical security and maintenance updates.', active: true },
        ].map((item, i) => (
          <React.Fragment key={i}>
            <ListItem sx={{ py: 1, px: 0 }}>
              <ListItemText
                primary={item.title}
                secondary={item.sub}
                primaryTypographyProps={{ fontWeight: 800, variant: 'body1' }}
                secondaryTypographyProps={{ variant: 'body2', sx: { mt: 0.5 } }}
              />
              <Switch defaultChecked={item.active} color="primary" sx={{ transform: 'scale(1.2)' }} />
            </ListItem>
            {i < 2 && <Divider />}
          </React.Fragment>
        ))}
      </List>
      <Box sx={{ mt: 5, display: 'flex', justifyContent: 'flex-end' }}>
        <Button variant="outlined" size="large" sx={{ borderRadius: 3, px: 4, py: 1.2, fontWeight: 800 }}>Reset Settings</Button>
      </Box>
    </Box>
  );
};



=======
import { 
  User, 
  Shield, 
  Settings, 
  Bell, 
  Lock, 
  ExternalLink,
  ChevronRight,
  Mail,
  Phone,
  ArrowRight,
  Eye,
  EyeOff,
  Trash2,
  AlertTriangle
} from "lucide-react";
=======
  Chip,
  Paper
} from "@mui/material";
import {
  Person as PersonIcon,
  Shield as ShieldIcon,
  Settings as SettingsIcon,
  Notifications as BellIcon,
  Lock as LockIcon,
  Launch as ExternalLinkIcon,
  ChevronRight as ChevronRightIcon,
  Mail as MailIcon,
  Phone as PhoneIcon,
  ArrowForward as ArrowRightIcon,
  Visibility as EyeIcon,
  VisibilityOff as EyeOffIcon,
  Delete as Trash2Icon,
  Warning as AlertTriangleIcon
} from "@mui/icons-material";
>>>>>>> 9cd112e (Implement core application architecture with routing, authentication, UI components, and SCSS styling.)
import { useAuth } from "../../contexts/AuthContext";
import { getInitials } from "../../utils/userUtils";

const UserProfile: React.FC = () => {
  const { role, userName } = useAuth();
  const [activeTab, setActiveTab] = useState(0);
  const [showPassword, setShowPassword] = useState(false);

  const handleTabChange = (_event: React.SyntheticEvent, newValue: number) => {
    setActiveTab(newValue);
  };

  const glassStyle = {
    background: 'var(--dash-glass)',
    backdropFilter: 'blur(16px) saturate(180%)',
    border: '1px solid var(--dash-glass-border)',
    boxShadow: 'var(--dash-shadow-md)',
    borderRadius: 'var(--border-radius-xl)',
    transition: 'var(--transition-ultra)',
    position: 'relative',
    overflow: 'hidden',
    '&:hover': {
      transform: 'translateY(-8px) scale(1.005)',
      boxShadow: 'var(--dash-shadow-lg)',
      borderColor: 'rgba(99, 102, 241, 0.3)',
    }
  };

  return (
    <Container maxWidth="xl" sx={{ py: 5, animation: 'fadeInUp 0.6s ease-out' }}>
      {/* Premium Header Card */}
      <Card sx={{ ...glassStyle, mb: 4, transform: 'none', '&:hover': { transform: 'translateY(-4px)' } }}>
        <Box
          sx={{
            height: 180,
            background: 'linear-gradient(135deg, #6366f1, #a855f7)',
            position: 'relative'
          }}
        >
          <Box className="banner-glass-overlay" sx={{ position: 'absolute', inset: 0, opacity: 0.1 }} />
        </Box>
        <CardContent sx={{ pt: 0, px: 4, pb: 4, position: 'relative' }}>
          <Box sx={{ display: 'flex', alignItems: 'flex-end', mt: -7, flexWrap: 'wrap', gap: 3 }}>
            <Box sx={{ position: 'relative' }}>
              <Avatar
                sx={{
                  width: 140,
                  height: 140,
                  fontSize: '3rem',
                  fontWeight: 800,
                  background: 'linear-gradient(135deg, #6366f1, #a855f7)',
                  border: '6px solid white',
                  boxShadow: '0 12px 40px rgba(99, 102, 241, 0.3)',
                  borderRadius: '24px'
                }}
              >
                {getInitials(userName || role || "")}
              </Avatar>
              <Box
                className="avatar-badge-online"
                sx={{
                  position: 'absolute',
                  bottom: 10,
                  right: 10,
                  width: 16,
                  height: 16,
                  bgcolor: '#10b981',
                  border: '3px solid white',
                  borderRadius: '50%'
                }}
              />
            </Box>
            <Box sx={{ flexGrow: 1, pb: 2 }}>
              <Typography variant="h3" sx={{ fontWeight: 800, color: 'var(--dash-text)', mb: 1 }}>
                {userName || role}
              </Typography>
              <Chip
                icon={<ShieldIcon sx={{ fontSize: '1rem !important' }} />}
                label={`${role} Level`}
                sx={{
                  bgcolor: 'var(--dash-accent-soft)',
                  color: 'var(--dash-accent)',
                  fontWeight: 600,
                  borderRadius: '8px',
                  px: 1
                }}
              />
            </Box>
            <Box sx={{ pb: 2 }}>
              <Button
                variant="contained"
                endIcon={<ArrowRightIcon />}
                sx={{
                  borderRadius: '12px',
                  px: 3,
                  py: 1.5,
                  textTransform: 'none',
                  fontWeight: 600,
                  background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
                  boxShadow: '0 4px 12px rgba(99, 102, 241, 0.25)',
                  '&:hover': {
                    background: 'linear-gradient(135deg, #4f46e5, #7c3aed)',
                    transform: 'translateY(-2px)'
                  }
                }}
              >
                View Analytics
              </Button>
            </Box>
          </Box>
        </CardContent>
      </Card>

      <Grid container spacing={4}>
        {/* Navigation - Left */}
        <Grid item xs={12} md={4}>
          <Card sx={{ ...glassStyle, height: '100%', p: 1 }}>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 3 }}>
                <SettingsIcon color="primary" sx={{ fontSize: 28 }} />
                <Typography variant="h6" sx={{ fontWeight: 700 }}>Control Center</Typography>
              </Box>

              <Tabs
                orientation="vertical"
                value={activeTab}
                onChange={handleTabChange}
                sx={{
                  '& .MuiTabs-indicator': { display: 'none' },
                  '& .MuiTab-root': {
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    minHeight: 56,
                    borderRadius: '12px',
                    mb: 1,
                    textTransform: 'none',
                    fontWeight: 600,
                    fontSize: '0.95rem',
                    color: 'var(--dash-text-muted)',
                    transition: 'all 0.3s ease',
                    px: 2,
                    '&.Mui-selected': {
                      bgcolor: 'var(--dash-accent-soft)',
                      color: 'var(--dash-accent)',
                    },
                    '&:hover': {
                      bgcolor: 'rgba(99, 102, 241, 0.04)',
                    }
                  }
                }}
              >
                <Tab
                  label={
                    <Box sx={{ display: 'flex', alignItems: 'center', width: '100%', justifyContent: 'space-between' }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                        <PersonIcon fontSize="small" />
                        <span>General Profile</span>
                      </Box>
                      <ChevronRightIcon fontSize="small" />
                    </Box>
                  }
                />
                <Tab
                  label={
                    <Box sx={{ display: 'flex', alignItems: 'center', width: '100%', justifyContent: 'space-between' }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                        <LockIcon fontSize="small" />
                        <span>Security Matrix</span>
                      </Box>
                      <ChevronRightIcon fontSize="small" />
                    </Box>
                  }
                />
                <Tab
                  disabled
                  label={
                    <Box sx={{ display: 'flex', alignItems: 'center', width: '100%', justifyContent: 'space-between' }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                        <BellIcon fontSize="small" />
                        <span>Alert Protocols</span>
                      </Box>
                      <ChevronRightIcon fontSize="small" />
                    </Box>
                  }
                />
                <Tab
                  disabled
                  label={
                    <Box sx={{ display: 'flex', alignItems: 'center', width: '100%', justifyContent: 'space-between' }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                        <ExternalLinkIcon fontSize="small" />
                        <span>API Connections</span>
                      </Box>
                      <ChevronRightIcon fontSize="small" />
                    </Box>
                  }
                />
              </Tabs>
            </CardContent>
          </Card>
        </Grid>

        {/* Content Area - Right */}
        <Grid item xs={12} md={8}>
          <Card sx={glassStyle}>
            <CardContent sx={{ p: 4 }}>
              {activeTab === 0 ? (
                <Box sx={{ animation: 'fadeInRight 0.4s ease-out' }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 4 }}>
                    <PersonIcon color="primary" sx={{ fontSize: 28 }} />
                    <Typography variant="h6" sx={{ fontWeight: 700 }}>Account Details</Typography>
                  </Box>

                  <Grid container spacing={3}>
                    <Grid item xs={12} sm={6}>
                      <Typography variant="body2" sx={{ fontWeight: 600, mb: 1, color: 'var(--dash-text-muted)' }}>Full Name</Typography>
                      <TextField
                        fullWidth
                        defaultValue={userName || ""}
                        placeholder="Your Name"
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              <PersonIcon fontSize="small" color="action" />
                            </InputAdornment>
                          ),
                        }}
                        sx={{ '& .MuiOutlinedInput-root': { borderRadius: '12px' } }}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <Typography variant="body2" sx={{ fontWeight: 600, mb: 1, color: 'var(--dash-text-muted)' }}>Email Node</Typography>
                      <TextField
                        fullWidth
                        defaultValue="admin@weddingcraft.com"
                        placeholder="Email Address"
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              <MailIcon fontSize="small" color="action" />
                            </InputAdornment>
                          ),
                        }}
                        sx={{ '& .MuiOutlinedInput-root': { borderRadius: '12px' } }}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <Typography variant="body2" sx={{ fontWeight: 600, mb: 1, color: 'var(--dash-text-muted)' }}>Contact Line</Typography>
                      <TextField
                        fullWidth
                        defaultValue="+91 98765 43210"
                        placeholder="Phone Number"
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              <PhoneIcon fontSize="small" color="action" />
                            </InputAdornment>
                          ),
                        }}
                        sx={{ '& .MuiOutlinedInput-root': { borderRadius: '12px' } }}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <Typography variant="body2" sx={{ fontWeight: 600, mb: 1, color: 'var(--dash-text-muted)' }}>Operation Base</Typography>
                      <TextField
                        fullWidth
                        defaultValue="Mumbai, India"
                        placeholder="Location"
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              <SettingsIcon fontSize="small" color="action" />
                            </InputAdornment>
                          ),
                        }}
                        sx={{ '& .MuiOutlinedInput-root': { borderRadius: '12px' } }}
                      />
                    </Grid>
                  </Grid>

                  <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 4 }}>
                    <Button
                      variant="contained"
                      sx={{
                        borderRadius: '12px',
                        px: 4,
                        py: 1,
                        textTransform: 'none',
                        fontWeight: 600,
                        background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
                      }}
                    >
                      Sync Updates
                    </Button>
                  </Box>
                </Box>
              ) : (
                <Box sx={{ animation: 'fadeInRight 0.4s ease-out' }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 4 }}>
                    <LockIcon color="primary" sx={{ fontSize: 28 }} />
                    <Typography variant="h6" sx={{ fontWeight: 700 }}>Credential Management</Typography>
                  </Box>

                  <Box sx={{ mb: 4 }}>
                    <Typography variant="body2" sx={{ fontWeight: 600, mb: 1, color: 'var(--dash-text-muted)' }}>Current Authentication Code</Typography>
                    <TextField
                      fullWidth
                      type={showPassword ? "text" : "password"}
                      placeholder="••••••••••••"
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <LockIcon fontSize="small" color="action" />
                          </InputAdornment>
                        ),
                        endAdornment: (
                          <InputAdornment position="end">
                            <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                              {showPassword ? <EyeOffIcon fontSize="small" /> : <EyeIcon fontSize="small" />}
                            </IconButton>
                          </InputAdornment>
                        )
                      }}
                      sx={{ '& .MuiOutlinedInput-root': { borderRadius: '12px' } }}
                    />
                  </Box>

                  <Grid container spacing={3}>
                    <Grid item xs={12} sm={6}>
                      <Typography variant="body2" sx={{ fontWeight: 600, mb: 1, color: 'var(--dash-text-muted)' }}>New Password Node</Typography>
                      <TextField
                        fullWidth
                        type="password"
                        placeholder="Min 12 characters"
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              <ShieldIcon fontSize="small" color="action" />
                            </InputAdornment>
                          ),
                        }}
                        sx={{ '& .MuiOutlinedInput-root': { borderRadius: '12px' } }}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <Typography variant="body2" sx={{ fontWeight: 600, mb: 1, color: 'var(--dash-text-muted)' }}>Confirm New Node</Typography>
                      <TextField
                        fullWidth
                        type="password"
                        placeholder="Repeat password"
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              <ShieldIcon fontSize="small" color="action" />
                            </InputAdornment>
                          ),
                        }}
                        sx={{ '& .MuiOutlinedInput-root': { borderRadius: '12px' } }}
                      />
                    </Grid>
                  </Grid>

                  <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 4 }}>
                    <Button
                      variant="contained"
                      sx={{
                        borderRadius: '12px',
                        px: 4,
                        py: 1,
                        textTransform: 'none',
                        fontWeight: 600,
                        background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
                      }}
                    >
                      Update Security Ledger
                    </Button>
                  </Box>
                </Box>
              )}

              {/* Industry Standard Danger Zone */}
              <Paper
                elevation={0}
                sx={{
                  mt: 6,
                  p: 3,
                  borderRadius: '16px',
                  bgcolor: 'rgba(239, 68, 68, 0.05)',
                  border: '1px solid rgba(239, 68, 68, 0.2)'
                }}
              >
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 2 }}>
                  <AlertTriangleIcon sx={{ color: '#ef4444' }} />
                  <Typography variant="subtitle1" sx={{ fontWeight: 700, color: '#ef4444' }}>Danger Protocol Area</Typography>
                </Box>
                <Typography variant="body2" sx={{ color: 'var(--dash-text-muted)', mb: 3 }}>
                  The following actions are destructive and cannot be reversed. Please proceed with absolute caution.
                </Typography>

                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 2 }}>
                    <Box>
                      <Typography variant="body2" sx={{ fontWeight: 700 }}>Wipe Local Instance</Typography>
                      <Typography variant="caption" sx={{ color: 'var(--dash-text-muted)' }}>Clear all cached operational data and history logs.</Typography>
                    </Box>
                    <Button variant="outlined" color="error" sx={{ borderRadius: '10px', textTransform: 'none' }}>Correct Cache</Button>
                  </Box>
                  <Divider sx={{ borderStyle: 'dashed' }} />
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 2 }}>
                    <Box>
                      <Typography variant="body2" sx={{ fontWeight: 700 }}>Terminate Account Ledger</Typography>
                      <Typography variant="caption" sx={{ color: 'var(--dash-text-muted)' }}>Permanently delete your profile and all associated event nodes.</Typography>
                    </Box>
                    <Button
                      variant="outlined"
                      color="error"
                      startIcon={<Trash2Icon />}
                      sx={{ borderRadius: '10px', textTransform: 'none' }}
                    >
                      Terminate Profile
                    </Button>
                  </Box>
                </Box>
              </Paper>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
};

>>>>>>> d720bde (Pushing the project to the repo)
export default UserProfile;
