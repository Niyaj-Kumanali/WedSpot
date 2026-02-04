import React, { useState } from "react";
<<<<<<< HEAD
import {
  Notifications as BellIcon,
  AccessTime as ClockIcon,
  CalendarToday as CalendarIcon,
  VerifiedUser as SecurityIcon,
  Close as CloseIcon,
  Settings as SettingsIcon,
  ArrowForward as ArrowRightIcon,
  Delete as TrashIcon,
  CheckCircle as CheckCircleIcon
} from "@mui/icons-material";
import {
  Box,
  Typography,
  IconButton,
  Button,
  Chip,
  Stack,
  Paper,
  useTheme,
  alpha
} from "@mui/material";
=======
import { 
  Bell,  
  Clock, 
  Calendar, 
  Shield, 
  X,
  Settings,
  ArrowRight,
  Trash2,
  CheckCircle2
} from "lucide-react";
>>>>>>> d720bde (Pushing the project to the repo)

interface Notification {
  id: string;
  title: string;
  message: string;
  time: string;
  type: 'system' | 'event' | 'security';
  unread: boolean;
}

const initialNotifications: Notification[] = [
  {
    id: "1",
    title: "System Update",
    message: "New version 2.4.0 is now live with enhanced AI algorithms.",
    time: "2 mins ago",
    type: 'system',
    unread: true
  },
  {
    id: "2",
    title: "Event Confirmed",
    message: "The Grande Wedding for 'Arjun & Sneha' has been locked.",
    time: "45 mins ago",
    type: 'event',
    unread: true
  },
  {
    id: "3",
    title: "Security Alert",
    message: "New login detected from Mumbai, India.",
    time: "2 hours ago",
    type: 'security',
    unread: false
  }
];

interface NotificationCenterProps {
  onClose: () => void;
}

const NotificationCenter: React.FC<NotificationCenterProps> = ({ onClose }) => {
<<<<<<< HEAD
  const theme = useTheme();
=======
>>>>>>> d720bde (Pushing the project to the repo)
  const [notifs, setNotifs] = useState<Notification[]>(initialNotifications);
  const [activeFilter, setActiveFilter] = useState<'all' | 'unread'>('all');

  const handleDelete = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setNotifs(prev => prev.filter(n => n.id !== id));
  };

  const handleClearAll = () => {
    setNotifs([]);
  };

  const markAllAsRead = () => {
    setNotifs(prev => prev.map(n => ({ ...n, unread: false })));
  };

<<<<<<< HEAD
  const filteredNotifs = activeFilter === 'all'
    ? notifs
=======
  const filteredNotifs = activeFilter === 'all' 
    ? notifs 
>>>>>>> d720bde (Pushing the project to the repo)
    : notifs.filter(n => n.unread);

  const getIcon = (type: Notification['type']) => {
    switch (type) {
<<<<<<< HEAD
      case 'system': return <SettingsIcon sx={{ fontSize: 16 }} />;
      case 'event': return <CalendarIcon sx={{ fontSize: 16 }} />;
      case 'security': return <SecurityIcon sx={{ fontSize: 16 }} />;
      default: return <BellIcon sx={{ fontSize: 16 }} />;
    }
  };

  const getStatusColor = (type: Notification['type']) => {
    switch (type) {
      case 'system': return theme.palette.primary.main;
      case 'event': return theme.palette.success.main;
      case 'security': return theme.palette.warning.main;
      default: return theme.palette.info.main;
=======
      case 'system': return <Settings size={16} />;
      case 'event': return <Calendar size={16} />;
      case 'security': return <Shield size={16} />;
      default: return <Bell size={16} />;
    }
  };

  const getIconClass = (type: Notification['type']) => {
    switch (type) {
      case 'system': return 'icon-system';
      case 'event': return 'icon-event';
      case 'security': return 'icon-security';
      default: return '';
>>>>>>> d720bde (Pushing the project to the repo)
    }
  };

  return (
<<<<<<< HEAD
    <Box
      onClick={onClose}
      sx={{
        position: 'fixed',
        inset: 0,
        zIndex: 1200,
        bgcolor: 'rgba(0, 0, 0, 0.1)',
        backdropFilter: 'blur(2px)',
        display: 'flex',
        justifyContent: 'flex-end'
      }}
    >
      <Paper
        onClick={(e) => e.stopPropagation()}
        sx={{
          position: 'absolute',
          top: 80,
          right: 20,
          width: { xs: 'calc(100% - 40px)', sm: 420 },
          maxWidth: 420,
          display: 'flex',
          flexDirection: 'column',
          maxHeight: 'calc(100vh - 120px)',
          animation: 'slideInDown 0.4s ease',
          '@keyframes slideInDown': {
            from: { opacity: 0, transform: 'translateY(-15px)' },
            to: { opacity: 1, transform: 'translateY(0)' }
          }
        }}
      >
        {/* Header */}
        <Box sx={{ p: 2.5, display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid', borderColor: 'divider' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
            <Box sx={{ position: 'relative', color: 'secondary.main', display: 'flex' }}>
              <BellIcon />
              {notifs.some(n => n.unread) && (
                <Box
                  sx={{
                    position: 'absolute',
                    top: -2,
                    right: -2,
                    width: 8,
                    height: 8,
                    bgcolor: 'error.main',
                    borderRadius: '50%',
                    border: '2px solid white',
                  }}
                />
              )}
            </Box>
            <Box>
              <Typography variant="subtitle1" sx={{ fontWeight: 800, lineHeight: 1.2 }}>Intelligence Center</Typography>
              <Typography variant="caption" sx={{ color: 'text.secondary', fontWeight: 600 }}>
                {notifs.filter(n => n.unread).length} Pending Protocol{notifs.filter(n => n.unread).length !== 1 ? 's' : ''}
              </Typography>
            </Box>
          </Box>
          <IconButton onClick={onClose} size="small" sx={{ bgcolor: alpha(theme.palette.text.primary, 0.05) }}>
            <CloseIcon fontSize="small" />
          </IconButton>
        </Box>

        {/* Tabs */}
        <Box sx={{ px: 2, py: 1, display: 'flex', gap: 1, borderBottom: '1px solid', borderColor: 'divider', alignItems: 'center' }}>
          <Button
            size="small"
            onClick={() => setActiveFilter('all')}
            sx={{
              fontWeight: 700,
              color: activeFilter === 'all' ? 'primary.main' : 'text.secondary',
              bgcolor: activeFilter === 'all' ? alpha(theme.palette.primary.main, 0.1) : 'transparent',
              '&:hover': { bgcolor: alpha(theme.palette.primary.main, 0.15) }
            }}
          >
            All Logs
          </Button>
          <Button
            size="small"
            onClick={() => setActiveFilter('unread')}
            sx={{
              fontWeight: 700,
              color: activeFilter === 'unread' ? 'primary.main' : 'text.secondary',
              bgcolor: activeFilter === 'unread' ? alpha(theme.palette.primary.main, 0.1) : 'transparent',
              '&:hover': { bgcolor: alpha(theme.palette.primary.main, 0.15) }
            }}
          >
            Unread
          </Button>
          <Button
            size="small"
            onClick={handleClearAll}
            disabled={notifs.length === 0}
            sx={{ ml: 'auto', color: 'error.main', fontWeight: 700 }}
          >
            Clear Hub
          </Button>
        </Box>

        {/* List */}
        <Box sx={{ flex: 1, overflowY: 'auto', p: 1.5 }}>
          {filteredNotifs.length > 0 ? (
            <Stack spacing={1}>
              {filteredNotifs.map((notif) => (
                <Box
                  key={notif.id}
                  sx={{
                    display: 'flex',
                    gap: 1.5,
                    p: 1.5,
                    borderRadius: 3,
                    transition: 'all 0.2s',
                    bgcolor: notif.unread ? alpha(theme.palette.primary.main, 0.03) : 'transparent',
                    '&:hover': {
                      bgcolor: alpha(theme.palette.primary.main, 0.05),
                      '& .delete-btn': { opacity: 1 }
                    }
                  }}
                >
                  <Box
                    sx={{
                      width: 36,
                      height: 36,
                      borderRadius: 2,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0,
                      bgcolor: alpha(getStatusColor(notif.type), 0.1),
                      color: getStatusColor(notif.type)
                    }}
                  >
                    {getIcon(notif.type)}
                  </Box>
                  <Box sx={{ flex: 1 }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                      <Typography sx={{ fontWeight: 700, fontSize: '0.9rem', color: 'text.primary' }}>{notif.title}</Typography>
                      <IconButton
                        className="delete-btn"
                        size="small"
                        onClick={(e) => handleDelete(notif.id, e)}
                        sx={{ opacity: 0, transition: 'opacity 0.2s', p: 0.5 }}
                      >
                        <TrashIcon sx={{ fontSize: 16 }} />
                      </IconButton>
                    </Box>
                    <Typography sx={{ fontSize: '0.85rem', color: 'text.secondary', mb: 1, lineHeight: 1.4 }}>
                      {notif.message}
                    </Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, color: 'text.disabled', fontSize: '0.75rem' }}>
                        <ClockIcon sx={{ fontSize: 12 }} />
                        {notif.time}
                      </Box>
                      {notif.unread && (
                        <Chip
                          label="New"
                          size="small"
                          sx={{
                            height: 18,
                            fontSize: '0.65rem',
                            fontWeight: 800,
                            bgcolor: alpha(theme.palette.primary.main, 0.1),
                            color: 'primary.main',
                            borderRadius: 1
                          }}
                        />
                      )}
                    </Box>
                  </Box>
                </Box>
              ))}
            </Stack>
          ) : (
            <Box sx={{ py: 6, textAlign: 'center', color: 'text.disabled' }}>
              <CheckCircleIcon sx={{ fontSize: 48, mb: 1.5, opacity: 0.5 }} />
              <Typography variant="subtitle1" sx={{ fontWeight: 700, color: 'text.secondary' }}>Intelligence Hub Clear</Typography>
              <Typography variant="caption" sx={{ fontWeight: 600 }}>No active protocols found.</Typography>
            </Box>
          )}
        </Box>

        {/* Footer */}
        <Box sx={{ p: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid', borderColor: 'divider' }}>
          <Button
            size="small"
            onClick={markAllAsRead}
            disabled={!notifs.some(n => n.unread)}
            sx={{ fontWeight: 700, color: 'text.secondary' }}
          >
            Mark all read
          </Button>
          <Button
            size="small"
            endIcon={<ArrowRightIcon sx={{ fontSize: 14 }} />}
            sx={{ fontWeight: 700 }}
          >
            View Analytics
          </Button>
        </Box>
      </Paper>
    </Box>
=======
    <div className="notification-center-overlay animate-fadeIn" onClick={onClose}>
      <div className="notification-center glass-card" onClick={(e) => e.stopPropagation()}>
        <div className="notification-header">
          <div className="flex-center-gap-sm">
            <div className="notif-bell-icon">
              <Bell size={18} />
              {notifs.some(n => n.unread) && <span className="header-notif-pulse"></span>}
            </div>
            <div className="notif-header-text">
              <h3 className="notification-title">Intelligence Center</h3>
              <p className="notif-count-meta">{notifs.filter(n => n.unread).length} Pending Protocol{notifs.filter(n => n.unread).length !== 1 ? 's' : ''}</p>
            </div>
          </div>
          <button className="notification-close-btn" onClick={onClose}>
            <X size={18} />
          </button>
        </div>

        <div className="notification-tabs">
          <button 
            className={`notif-tab ${activeFilter === 'all' ? 'active' : ''}`}
            onClick={() => setActiveFilter('all')}
          >
            All Logs
          </button>
          <button 
            className={`notif-tab ${activeFilter === 'unread' ? 'active' : ''}`}
            onClick={() => setActiveFilter('unread')}
          >
            Unread
          </button>
          <button className="notif-clear-btn" onClick={handleClearAll} disabled={notifs.length === 0}>
            Clear Hub
          </button>
        </div>

        <div className="notification-list custom-scrollbar">
          {filteredNotifs.length > 0 ? (
            filteredNotifs.map((notif) => (
              <div key={notif.id} className={`notification-item ${notif.unread ? 'unread' : ''}`}>
                <div className={`notification-icon-wrapper ${getIconClass(notif.type)}`}>
                  {getIcon(notif.type)}
                </div>
                <div className="notification-content">
                  <div className="notification-item-header">
                    <span className="notif-item-title">{notif.title}</span>
                    <div className="notif-actions-hover">
                      <button className="notif-action-btn delete" onClick={(e) => handleDelete(notif.id, e)}>
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </div>
                  <p className="notif-item-message">{notif.message}</p>
                  <div className="notif-item-footer">
                    <span className="notif-item-time">
                      <Clock size={12} />
                      {notif.time}
                    </span>
                    {notif.unread && <span className="premium-unread-tag">New</span>}
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="notif-empty-state">
              <CheckCircle2 size={40} className="empty-icon" />
              <p>Intelligence Hub Clear</p>
              <span>No active protocols found.</span>
            </div>
          )}
        </div>

        <div className="notification-footer">
          <button className="btn-ghost-sm" onClick={markAllAsRead} disabled={!notifs.some(n => n.unread)}>
            Mark all read
          </button>
          <button className="btn-link-sm">
            View Analytics
            <ArrowRight size={14} />
          </button>
        </div>
      </div>
    </div>
>>>>>>> d720bde (Pushing the project to the repo)
  );
};

export default NotificationCenter;
