<<<<<<< HEAD
=======
import React from 'react';
>>>>>>> 9cd112e (Implement core application architecture with routing, authentication, UI components, and SCSS styling.)
import {
  CalendarMonth as CalendarIcon,
  AttachMoney as DollarIcon,
  Grade as StarIcon,
  TrendingUp as TrendingUpIcon,
  Inventory as PackageIcon,
<<<<<<< HEAD
  Image as ImageIcon,
  Mail as EmailIcon,
} from '@mui/icons-material';
import { Box, Grid, Typography, Button, Avatar, Stack, useTheme, alpha, useMediaQuery } from '@mui/material';
import DashboardStats from "../../../components/Dashboard/DashboardStats/DashboardStats";
import DashboardCard from "../../../components/Dashboard/DashboardCard/DashboardCard";
import Chart from "react-apexcharts";

const VendorDashboard: React.FC = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
=======
  Chat as MessageIcon,
  Image as ImageIcon,
} from '@mui/icons-material';
import { Box, Grid, Typography, Button, Avatar, Chip, Stack } from '@mui/material';
import DashboardHeader from "../../../components/Dashboard/DashboardHeader/DashboardHeader";
import DashboardStats from "../../../components/Dashboard/DashboardStats/DashboardStats";
import DashboardCard from "../../../components/Dashboard/DashboardCard/DashboardCard";
import './VendorDashboard.scss';

const VendorDashboard: React.FC = () => {
>>>>>>> 9cd112e (Implement core application architecture with routing, authentication, UI components, and SCSS styling.)
  const stats = [
    {
      label: 'Bookings Reach',
      value: '45',
      change: '+8%',
      icon: CalendarIcon,
<<<<<<< HEAD
      color: theme.palette.secondary.main,
=======
      color: '#6366f1',
>>>>>>> 9cd112e (Implement core application architecture with routing, authentication, UI components, and SCSS styling.)
      progress: 72
    },
    {
      label: 'Annual Revenue',
      value: '₹8.2L',
      change: '+15%',
      icon: DollarIcon,
<<<<<<< HEAD
      color: theme.palette.success.main,
=======
      color: '#10b981',
>>>>>>> 9cd112e (Implement core application architecture with routing, authentication, UI components, and SCSS styling.)
      progress: 65
    },
    {
      label: 'Client Rating',
      value: '4.8',
      change: '+0.2',
      icon: StarIcon,
<<<<<<< HEAD
      color: theme.palette.warning.main,
=======
      color: '#f59e0b',
>>>>>>> 9cd112e (Implement core application architecture with routing, authentication, UI components, and SCSS styling.)
      progress: 96
    },
    {
      label: 'Reach Status',
      value: '1.2K',
      change: '+23%',
      icon: TrendingUpIcon,
<<<<<<< HEAD
      color: theme.palette.info.main,
=======
      color: '#3b82f6',
>>>>>>> 9cd112e (Implement core application architecture with routing, authentication, UI components, and SCSS styling.)
      progress: 88
    },
  ];

  const upcomingBookings = [
    {
      client: 'Priya & Rahul',
      event: 'Wedding Reception',
      date: 'Dec 28, 2024',
      status: 'confirmed',
      amount: '₹85,000',
      type: 'Premium'
    },
    {
      client: 'Anita Sharma',
      event: 'Engagement Ceremony',
      date: 'Jan 05, 2025',
      status: 'pending',
      amount: '₹45,000',
      type: 'Standard'
    },
  ];

  const actionCards = [
    {
      title: 'Gallery Hub',
      desc: 'Update your portfolio with latest event shots.',
      icon: ImageIcon,
<<<<<<< HEAD
      color: theme.palette.secondary.main,
=======
      color: '#6366f1',
>>>>>>> 9cd112e (Implement core application architecture with routing, authentication, UI components, and SCSS styling.)
      count: 24
    },
    {
      title: 'Services',
      desc: 'Manage pricing and event package details.',
      icon: PackageIcon,
      color: '#10b981',
      count: null
    },
    {
      title: 'Client Inbox',
      desc: 'Respond to new booking inquiries.',
<<<<<<< HEAD
      icon: EmailIcon,
=======
      icon: MessageIcon,
>>>>>>> 9cd112e (Implement core application architecture with routing, authentication, UI components, and SCSS styling.)
      color: '#3b82f6',
      count: 4
    },
  ];

  return (
<<<<<<< HEAD
    <Box sx={{ p: 0, maxWidth: 1600, margin: '0 auto' }}>
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
          Vendor Dashboard
        </Typography>
=======
    <Box sx={{ p: { xs: 2, md: 5 }, maxWidth: 1600, margin: '0 auto' }}>
      <DashboardHeader
        title="Vendor Portal"
        subtitle="Global reach and transaction management dashboard."
        tag="Business Overview"
        actions={<Button variant="contained" sx={{ bgcolor: 'var(--dash-accent)', borderRadius: '12px', fontWeight: 700, p: '10px 24px' }}>Post Update</Button>}
      />

>>>>>>> 9cd112e (Implement core application architecture with routing, authentication, UI components, and SCSS styling.)
      <Grid container spacing={3} sx={{ mb: 4 }}>
        {stats.map((stat, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <DashboardStats {...stat} />
          </Grid>
        ))}
      </Grid>

<<<<<<< HEAD
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12}>
          <DashboardCard noPadding>
            <Box sx={{ p: 3, borderBottom: `1px solid ${theme.dashboard.glassBorder}`, display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 1 }}>
              <Typography variant="h5" sx={{ fontWeight: 800, color: 'text.primary', fontSize: { xs: '1.2rem', md: '1.5rem' } }}>Monthly Success</Typography>
              <Typography variant="overline" 
                  sx={{ 
                    fontWeight: 700, 
                    color: theme.palette.secondary.main, 
                    fontSize: '0.75rem' 
                  }}
              >
                Real-time Performance
              </Typography>
            </Box>
            <Box sx={{ p: 2 }}>
              <Chart
                options={{
                  chart: {
                    type: 'area',
                    toolbar: { show: false },
                    fontFamily: theme.typography.fontFamily,
                  },
                  colors: [theme.palette.secondary.main],
                  fill: {
                    type: 'gradient',
                    gradient: {
                      shadeIntensity: 1,
                      opacityFrom: 0.6,
                      opacityTo: 0.1,
                      stops: [0, 90, 100]
                    }
                  },
                  stroke: { curve: 'smooth', width: 3 },
                  grid: { borderColor: alpha(theme.palette.divider, 0.5), strokeDashArray: 5 },
                  xaxis: {
                    categories: ['Sep', 'Oct', 'Nov', 'Dec', 'Jan', 'Feb'],
                    axisBorder: { show: false },
                    axisTicks: { show: false },
                  },
                  tooltip: { theme: 'light' }
                }}
                series={[{
                  name: "Bookings",
                  data: [12, 18, 15, 25, 32, 45]
                }]}
                type="area"
                height={isMobile ? 250 : 300}
              />
            </Box>
          </DashboardCard>
        </Grid>
      </Grid>

=======
>>>>>>> 9cd112e (Implement core application architecture with routing, authentication, UI components, and SCSS styling.)
      <Grid container spacing={3}>
        {/* Booking Pipeline */}
        <Grid item xs={12} md={8}>
          <DashboardCard sx={{ height: '100%' }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
              <Typography variant="h6" sx={{ fontWeight: 800 }}>Booking Pipeline</Typography>
<<<<<<< HEAD
              <Button variant="text" sx={{ color: theme.palette.secondary.main, fontWeight: 700 }}>Calendar View</Button>
=======
              <Button variant="text" sx={{ color: 'var(--dash-accent)', fontWeight: 700 }}>Calendar View</Button>
>>>>>>> 9cd112e (Implement core application architecture with routing, authentication, UI components, and SCSS styling.)
            </Box>
            <Stack spacing={3}>
              {upcomingBookings.map((booking, index) => (
                <Box key={index} sx={{
                  display: 'flex',
<<<<<<< HEAD
                  alignItems: { xs: 'flex-start', sm: 'center' },
                  flexDirection: { xs: 'column', sm: 'row' },
                  p: 2,
                  borderRadius: '16px',
                  border: `1px solid ${theme.dashboard.glassBorder}`,
                  background: 'rgba(255,255,255,0.4)',
                  gap: { xs: 2, sm: 0 }
                }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', width: '100%' }}>
                    <Avatar sx={{ bgcolor: alpha(theme.palette.secondary.main, 0.1), color: theme.palette.secondary.main, mr: 2 }}>
                      <PackageIcon />
                    </Avatar>
                    <Box sx={{ flexGrow: 1 }}>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                        <Typography sx={{ fontWeight: 700 }}>{booking.client}</Typography>
                        <Typography sx={{ fontWeight: 800, color: theme.palette.success.main }}>{booking.amount}</Typography>
                      </Box>
                      <Typography variant="caption" sx={{ color: 'text.secondary', fontWeight: 600 }}>
                        {booking.event} • {booking.type}
                      </Typography>
                    </Box>
                  </Box>
                  <Box sx={{ ml: { xs: 0, sm: 2 }, textAlign: { xs: 'left', sm: 'right' }, width: { xs: '100%', sm: 'auto' }, pl: { xs: 7, sm: 0 } }}>
                    <Typography 
                      variant="caption" 
                      sx={{ 
                        fontWeight: 700, 
                        color: booking.status === 'confirmed' ? 'success.main' : 'warning.main', 
                        textTransform: 'uppercase', 
                        fontSize: '0.65rem' 
                      }}
                    >
                      {booking.status}
                    </Typography>
                    <Typography variant="caption" sx={{ display: 'block', color: 'text.secondary', fontWeight: 700 }}>
=======
                  alignItems: 'center',
                  p: 2,
                  borderRadius: '16px',
                  border: '1px solid var(--dash-glass-border)',
                  background: 'rgba(255,255,255,0.4)'
                }}>
                  <Avatar sx={{ bgcolor: 'rgba(99, 102, 241, 0.1)', color: 'var(--dash-accent)', mr: 2 }}>
                    <PackageIcon />
                  </Avatar>
                  <Box sx={{ flexGrow: 1 }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                      <Typography sx={{ fontWeight: 700 }}>{booking.client}</Typography>
                      <Typography sx={{ fontWeight: 800, color: '#10b981' }}>{booking.amount}</Typography>
                    </Box>
                    <Typography variant="caption" sx={{ color: 'var(--dash-text-muted)', fontWeight: 600 }}>
                      {booking.event} • {booking.type}
                    </Typography>
                  </Box>
                  <Box sx={{ ml: 2, textAlign: 'right' }}>
                    <Chip
                      label={booking.status}
                      size="small"
                      sx={{
                        mb: 0.5,
                        bgcolor: booking.status === 'confirmed' ? 'rgba(16, 185, 129, 0.1)' : 'rgba(245, 158, 11, 0.1)',
                        color: booking.status === 'confirmed' ? '#10b981' : '#f59e0b',
                        fontWeight: 800,
                        textTransform: 'uppercase',
                        fontSize: '0.65rem'
                      }}
                    />
                    <Typography variant="caption" sx={{ display: 'block', color: 'var(--dash-text-muted)', fontWeight: 700 }}>
>>>>>>> 9cd112e (Implement core application architecture with routing, authentication, UI components, and SCSS styling.)
                      {booking.date}
                    </Typography>
                  </Box>
                </Box>
              ))}
            </Stack>
          </DashboardCard>
        </Grid>

        {/* Tools & Performance */}
        <Grid item xs={12} md={4}>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
<<<<<<< HEAD
            <DashboardCard variant="dark">
              <Typography variant="h5" sx={{ fontWeight: 900, mb: 3, color: 'text.primary' }}>Upcoming Schedule</Typography>
=======
            <DashboardCard sx={{ bgcolor: '#0f172a', color: 'white' }}>
              <Typography variant="h6" sx={{ fontWeight: 800, mb: 3 }}>Business Tools</Typography>
>>>>>>> 9cd112e (Implement core application architecture with routing, authentication, UI components, and SCSS styling.)
              <Stack spacing={2}>
                {actionCards.map((card, index) => (
                  <Button key={index} fullWidth sx={{
                    justifyContent: 'flex-start',
                    textTransform: 'none',
                    p: 1.5,
                    borderRadius: '12px',
                    bgcolor: 'rgba(255,255,255,0.05)',
                    '&:hover': { bgcolor: 'rgba(255,255,255,0.1)' },
                    color: 'inherit'
                  }}>
                    <Box sx={{
                      width: 40,
                      height: 40,
                      borderRadius: '10px',
<<<<<<< HEAD
                      bgcolor: alpha(card.color, 0.2),
=======
                      bgcolor: `${card.color}25`,
>>>>>>> 9cd112e (Implement core application architecture with routing, authentication, UI components, and SCSS styling.)
                      color: card.color,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      mr: 2
                    }}>
                      <card.icon sx={{ fontSize: 20 }} />
                    </Box>
                    <Box sx={{ flexGrow: 1, textAlign: 'left' }}>
<<<<<<< HEAD
                        <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>{card.title}</Typography>
                      <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.5)' }}>{card.desc}</Typography>
                    </Box>
                    {card.count && (
                      <Typography 
                        variant="caption" 
                        sx={{ 
                          fontWeight: 700, 
                          color: 'primary.main', 
                          textTransform: 'uppercase', 
                          fontSize: '0.65rem' 
                        }}
                      >
                        {card.count}
                      </Typography>
=======
                      <Typography sx={{ fontWeight: 700, fontSize: '0.9rem' }}>{card.title}</Typography>
                      <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.5)' }}>{card.desc}</Typography>
                    </Box>
                    {card.count && (
                      <Chip label={card.count} size="small" sx={{
                        height: 20,
                        fontSize: '0.7rem',
                        fontWeight: 800,
                        bgcolor: card.color,
                        color: 'white'
                      }} />
>>>>>>> 9cd112e (Implement core application architecture with routing, authentication, UI components, and SCSS styling.)
                    )}
                  </Button>
                ))}
              </Stack>
            </DashboardCard>

            <DashboardCard sx={{ textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>
<<<<<<< HEAD
              <Avatar sx={{ bgcolor: alpha(theme.palette.warning.main, 0.1), color: 'warning.main', width: 60, height: 60 }}>
                <StarIcon sx={{ fontSize: 32 }} />
              </Avatar>
              <Typography variant="h6" sx={{ fontWeight: 800 }}>Performance Elite</Typography>
              <Typography variant="body2" sx={{ color: 'text.secondary', fontWeight: 500 }}>
=======
              <Avatar sx={{ bgcolor: 'rgba(245, 158, 11, 0.1)', color: '#f59e0b', width: 60, height: 60 }}>
                <StarIcon sx={{ fontSize: 32 }} />
              </Avatar>
              <Typography variant="h6" sx={{ fontWeight: 800 }}>Performance Elite</Typography>
              <Typography variant="body2" sx={{ color: 'var(--dash-text-muted)', fontWeight: 500 }}>
>>>>>>> 9cd112e (Implement core application architecture with routing, authentication, UI components, and SCSS styling.)
                You are in the top 5% of vendors this month. Keep it up!
              </Typography>
            </DashboardCard>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

<<<<<<< HEAD
export default VendorDashboard;
=======
export default VendorDashboard;
>>>>>>> 9cd112e (Implement core application architecture with routing, authentication, UI components, and SCSS styling.)
