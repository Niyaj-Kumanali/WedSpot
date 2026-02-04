import React, { useState } from "react";
<<<<<<< HEAD
import {
  Box,
  Typography,
  Grid,
  Avatar,
  Button,
  TextField,
  Tabs,
  Tab,
  IconButton,
  InputAdornment,
  Divider,
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
import { useAuth } from "../../contexts/AuthContext";
import { getInitials } from "../../utils/userUtils";
import "../../styles/DashboardStyles.css";

const UserProfile: React.FC = () => {
  const { role, userName } = useAuth();
  const [activeTab, setActiveTab] = useState<'general' | 'security'>('general');
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="profile-page">
      {/* Premium Header Card - Stats Removed for Industry Standard Cleanliness */}
      <div className="profile-header-card-premium animate-fadeInUp">
        <div className="profile-banner-premium">
          <div className="banner-glass-overlay"></div>
        </div>
        <div className="profile-header-content-premium">
          <div className="profile-avatar-premium-wrapper">
            <div className="profile-avatar-premium">
              {getInitials(userName || role)}
            </div>
            <div className="avatar-badge-online"></div>
          </div>
          <div className="profile-main-info-premium">
            <h1 className="profile-name-xl">{userName || role}</h1>
            <div className="profile-status-wrapper">
              <div className="role-badge-premium">
                <Shield size={16} />
                {role} Level
              </div>
            </div>
          </div>
          <div>
            <button className="btn-primary flex-center-gap-sm">
              View Analytics
              <ArrowRight size={18} />
            </button>
          </div>
        </div>
      </div>

      <div className="premium-bento-grid">
        {/* Navigation - Left */}
        <div className="glass-card bento-card span-small stagger-1">
          <h3 className="premium-section-title">
            <Settings size={24} className="premium-title-icon" />
            Control Center
          </h3>
          <div className="premium-nav-container">
            <div 
              className={`premium-nav-item ${activeTab === 'general' ? 'active' : ''}`}
              onClick={() => setActiveTab('general')}
            >
              <div className="flex-center-gap-sm">
                <User size={18} />
                <span>General Profile</span>
              </div>
              <ChevronRight size={16} />
            </div>
            <div 
              className={`premium-nav-item ${activeTab === 'security' ? 'active' : ''}`}
              onClick={() => setActiveTab('security')}
            >
              <div className="flex-center-gap-sm">
                <Lock size={18} />
                <span>Security Matrix</span>
              </div>
              <ChevronRight size={16} />
            </div>
            <div className="premium-nav-item">
              <div className="flex-center-gap-sm">
                <Bell size={18} />
                <span>Alert Protocols</span>
              </div>
              <ChevronRight size={16} />
            </div>
            <div className="premium-nav-item">
              <div className="flex-center-gap-sm">
                <ExternalLink size={18} />
                <span>API Connections</span>
              </div>
              <ChevronRight size={16} />
            </div>
          </div>
        </div>

        {/* Content Area - Right */}
        <div className="glass-card bento-card span-large stagger-2">
          {activeTab === 'general' ? (
            <div className="animate-fadeInRight">
              <h3 className="premium-section-title">
                <User size={24} className="premium-title-icon" />
                Account Details
              </h3>
              <div className="premium-form-group">
                <div className="premium-info-grid">
                  <div className="premium-input-container">
                    <label className="premium-input-label">Full Name</label>
                    <div className="premium-input-wrapper">
                      <User className="premium-input-icon" size={18} />
                      <input type="text" className="premium-input" defaultValue={userName || ""} placeholder="Your Name" />
                    </div>
                  </div>
                  <div className="premium-input-container">
                    <label className="premium-input-label">Email Node</label>
                    <div className="premium-input-wrapper">
                      <Mail className="premium-input-icon" size={18} />
                      <input type="email" className="premium-input" defaultValue="admin@weddingcraft.com" placeholder="Email Address" />
                    </div>
                  </div>
                  <div className="premium-input-container">
                    <label className="premium-input-label">Contact Line</label>
                    <div className="premium-input-wrapper">
                      <Phone className="premium-input-icon" size={18} />
                      <input type="tel" className="premium-input" defaultValue="+91 98765 43210" placeholder="Phone Number" />
                    </div>
                  </div>
                  <div className="premium-input-container">
                    <label className="premium-input-label">Operation Base</label>
                    <div className="premium-input-wrapper">
                      <Settings className="premium-input-icon" size={18} />
                      <input type="text" className="premium-input" defaultValue="Mumbai, India" placeholder="Location" />
                    </div>
                  </div>
                </div>
                <div className="flex-end-center mt-1">
                  <button className="btn-primary">Sync Updates</button>
                </div>
              </div>
            </div>
          ) : (
            <div className="animate-fadeInRight">
              <h3 className="premium-section-title">
                <Lock size={24} className="premium-title-icon" />
                Credential Management
              </h3>
              <div className="premium-form-group">
                <div className="premium-input-container">
                  <label className="premium-input-label">Current Authentication Code</label>
                  <div className="premium-input-wrapper">
                    <Lock className="premium-input-icon" size={18} />
                    <input 
                      type={showPassword ? "text" : "password"} 
                      className="premium-input" 
                      placeholder="••••••••••••" 
                    />
                    <div className="password-toggle-icon" onClick={() => setShowPassword(!showPassword)}>
                      {showPassword ? <EyeOff size={18} color="var(--dash-text-muted)" /> : <Eye size={18} color="var(--dash-text-muted)" />}
                    </div>
                  </div>
                </div>
                <div className="premium-info-grid">
                  <div className="premium-input-container">
                    <label className="premium-input-label">New Password Node</label>
                    <div className="premium-input-wrapper">
                      <Shield className="premium-input-icon" size={18} />
                      <input type="password" className="premium-input" placeholder="Min 12 characters" />
                    </div>
                  </div>
                  <div className="premium-input-container">
                    <label className="premium-input-label">Confirm New Node</label>
                    <div className="premium-input-wrapper">
                      <Shield className="premium-input-icon" size={18} />
                      <input type="password" className="premium-input" placeholder="Repeat password" />
                    </div>
                  </div>
                </div>
                <div className="flex-end-center mt-1">
                  <button className="btn-primary">Update Security Ledger</button>
                </div>
              </div>
            </div>
          )}

          {/* Industry Standard Danger Zone */}
          <div className="danger-zone-card stagger-3 mt-3">
            <div className="danger-zone-header">
              <h4 className="danger-zone-title">
                <AlertTriangle size={20} />
                Danger Protocol Area
              </h4>
              <p className="danger-zone-text">The following actions are destructive and cannot be reversed. Please proceed with absolute caution.</p>
            </div>
            <div className="danger-action-list">
              <div className="danger-action-item">
                <div className="danger-item-info">
                  <span className="danger-item-title">Wipe Local Instance</span>
                  <span className="danger-item-desc">Clear all cached operational data and history logs.</span>
                </div>
                <button className="btn-danger-outline">Clear Cache</button>
              </div>
              <div className="danger-action-item">
                <div className="danger-item-info">
                  <span className="danger-item-title">Terminate Account Ledger</span>
                  <span className="danger-item-desc">Permanently delete your profile and all associated event nodes.</span>
                </div>
                <button className="btn-danger-outline flex-center-gap-sm">
                  <Trash2 size={16} />
                  Terminate Profile
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

>>>>>>> d720bde (Pushing the project to the repo)
export default UserProfile;
