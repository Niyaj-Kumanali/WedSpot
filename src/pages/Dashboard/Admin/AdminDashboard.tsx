import React from "react";
import {
  People as UsersIcon,
  Business as BuildingIcon,
  AttachMoney as DollarIcon,
  BarChart as ChartIcon,
  CalendarMonth as CalendarIcon,
  Security as ShieldIcon,
<<<<<<< HEAD
  CheckCircle as SuccessIcon,
  HourglassEmpty as PendingIcon,
  CloudUpload as UploadIcon,
} from "@mui/icons-material";
import { Box, Grid, Typography, Button, Avatar, useTheme, alpha, keyframes } from "@mui/material";
import DashboardStats from "../../../components/Dashboard/DashboardStats/DashboardStats";
import DashboardCard from "../../../components/Dashboard/DashboardCard/DashboardCard";
import Chart from "react-apexcharts";

const slideIn = keyframes`
  from { opacity: 0; transform: translateX(-10px); }
  to { opacity: 1; transform: translateX(0); }
`;


const AdminDashboard: React.FC = () => {
  const theme = useTheme();
=======
  ArrowUpward as ArrowUpIcon,
} from "@mui/icons-material";
import { Box, Grid, Typography, Button, Avatar, Chip } from "@mui/material";
import DashboardHeader from "../../../components/Dashboard/DashboardHeader/DashboardHeader";
import DashboardStats from "../../../components/Dashboard/DashboardStats/DashboardStats";
import DashboardCard from "../../../components/Dashboard/DashboardCard/DashboardCard";

const AdminDashboard: React.FC = () => {
>>>>>>> 9cd112e (Implement core application architecture with routing, authentication, UI components, and SCSS styling.)
  const stats = [
    {
      label: "Total Vendors",
      value: "1,234",
      change: "+12%",
      icon: BuildingIcon,
<<<<<<< HEAD
      color: theme.palette.primary.main,
=======
      color: "#6366f1",
>>>>>>> 9cd112e (Implement core application architecture with routing, authentication, UI components, and SCSS styling.)
      progress: 75,
      trend: "up" as const
    },
    {
      label: "Total Revenue",
      value: "₹45.2L",
      change: "+18%",
      icon: DollarIcon,
<<<<<<< HEAD
      color: theme.palette.success.main,
=======
      color: "#10b981",
>>>>>>> 9cd112e (Implement core application architecture with routing, authentication, UI components, and SCSS styling.)
      progress: 62,
      trend: "up" as const
    },
    {
      label: "Active Clients",
      value: "8,567",
      change: "+23%",
      icon: UsersIcon,
<<<<<<< HEAD
      color: theme.palette.warning.main,
=======
      color: "#f59e0b",
>>>>>>> 9cd112e (Implement core application architecture with routing, authentication, UI components, and SCSS styling.)
      progress: 88,
      trend: "up" as const
    },
    {
      label: "Bookings",
      value: "456",
      change: "+15%",
      icon: CalendarIcon,
<<<<<<< HEAD
      color: theme.palette.info.main,
=======
      color: "#3b82f6",
>>>>>>> 9cd112e (Implement core application architecture with routing, authentication, UI components, and SCSS styling.)
      progress: 94,
      trend: "up" as const
    },
  ];

  const recentActivities = [
    {
      name: "Royal Banquet Hall",
      action: "Vendor Verification",
      time: "2 mins ago",
      status: "pending",
<<<<<<< HEAD
      icon: PendingIcon,
=======
>>>>>>> 9cd112e (Implement core application architecture with routing, authentication, UI components, and SCSS styling.)
      desc: "Updated venue capacity and license documents."
    },
    {
      name: "Priya & Rahul",
      action: "Booking Confirmed",
      time: "15 mins ago",
      status: "success",
<<<<<<< HEAD
      icon: SuccessIcon,
=======
>>>>>>> 9cd112e (Implement core application architecture with routing, authentication, UI components, and SCSS styling.)
      desc: "Full payment received for Wedding Reception."
    },
    {
      name: "Mahesh Photo",
      action: "Portfolio Update",
      time: "1 hour ago",
<<<<<<< HEAD
      status: "info",
      icon: UploadIcon,
=======
      status: "success",
>>>>>>> 9cd112e (Implement core application architecture with routing, authentication, UI components, and SCSS styling.)
      desc: "Added 24 new high-resolution wedding shots."
    },
  ];

  const topVendors = [
    {
      name: "Royal Banquet Hall",
      category: "Venue",
      bookings: 45,
      revenue: "₹12.5L",
      rating: 4.9,
    },
    {
      name: "Spice Caterers",
      category: "Catering",
      bookings: 52,
      revenue: "₹15.3L",
      rating: 4.7,
    },
  ];

  const actionCards = [
    {
      title: "Verify Assets",
      desc: "Review pending vendor documents and insurance.",
      icon: ShieldIcon,
<<<<<<< HEAD
      color: theme.palette.primary.main,
=======
      color: "#6366f1",
>>>>>>> 9cd112e (Implement core application architecture with routing, authentication, UI components, and SCSS styling.)
      count: 12
    },
    {
      title: "Revenue Report",
      desc: "Export monthly financial growth analysis.",
      icon: ChartIcon,
<<<<<<< HEAD
      color: theme.palette.success.main,
=======
      color: "#10b981",
>>>>>>> 9cd112e (Implement core application architecture with routing, authentication, UI components, and SCSS styling.)
      count: null
    },
    {
      title: "User Audit",
      desc: "System-wide user activity and security log.",
      icon: UsersIcon,
<<<<<<< HEAD
      color: theme.palette.warning.main,
=======
      color: "#f59e0b",
>>>>>>> 9cd112e (Implement core application architecture with routing, authentication, UI components, and SCSS styling.)
      count: 5
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
          Admin Dashboard
        </Typography>
=======
    <Box sx={{ p: { xs: 2, md: 5 }, maxWidth: 1600, margin: '0 auto' }}>
      <DashboardHeader
        title="Admin Command"
        subtitle="Orchestrating system growth and operational excellence."
        tag="Strategic Overview"
        live
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
        <Grid item xs={12} md={8}>
          <DashboardCard noPadding>
            <Box sx={{ p: 3, borderBottom: `1px solid ${theme.dashboard.glassBorder}`, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Typography variant="h5" sx={{ fontWeight: 900, color: 'text.primary' }}>Revenue Growth</Typography>
              <Typography 
                variant="overline" 
                sx={{ 
                  color: theme.palette.primary.main, 
                }}
              >
                Monthly
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
                  colors: [theme.palette.primary.main],
                  fill: {
                    type: 'gradient',
                    gradient: {
                      shadeIntensity: 1,
                      opacityFrom: 0.7,
                      opacityTo: 0.1,
                      stops: [0, 90, 100]
                    }
                  },
                  stroke: { curve: 'smooth', width: 3 },
                  grid: { borderColor: alpha(theme.palette.divider, 0.5), strokeDashArray: 5 },
                  xaxis: {
                    categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug'],
                    axisBorder: { show: false },
                    axisTicks: { show: false },
                  },
                  yaxis: {
                    labels: {
                      style: {
                        colors: theme.palette.text.secondary,
                        fontWeight: 600,
                        fontSize: '10px'
                      },
                      formatter: (val: number) => `₹${val}L`
                    }
                  },
                  tooltip: { 
                    theme: 'light',
                    y: {
                      formatter: (val: number) => `₹${val.toLocaleString()}L`
                    }
                  }
                }}
                series={[{
                  name: "Revenue",
                  data: [3.1, 4.0, 3.5, 5.0, 4.9, 6.2, 6.9, 8.1]
                }]}
                type="area"
                height={350}
              />
            </Box>
          </DashboardCard>
        </Grid>
        <Grid item xs={12} md={4}>
          <DashboardCard noPadding sx={{ minHeight: 520 }}>
            <Box sx={{ p: 3, borderBottom: `1px solid ${theme.dashboard.glassBorder}` }}>
              <Typography variant="h5" sx={{ fontWeight: 900, color: 'text.primary' }}>Vendor Matrix</Typography>
            </Box>
            <Box 
              sx={{ 
                p: 2, 
                display: 'flex', 
                flexDirection: 'column',
                alignItems: 'center', 
                justifyContent: 'center',
                animation: `${slideIn} 0.8s cubic-bezier(0.4, 0, 0.2, 1) both`,
                '&:hover': {
                  transform: 'scale(1.02)',
                  transition: 'transform 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                }
              }}
            >
              <Chart
                options={{
                  chart: { 
                    type: 'pie',
                    fontFamily: theme.typography.fontFamily,
                    animations: {
                      enabled: true,
                      speed: 800,
                      animateGradually: { enabled: true, delay: 150 },
                      dynamicAnimation: { enabled: true, speed: 350 }
                    },
                    dropShadow: {
                      enabled: true,
                      blur: 15,
                      left: 0,
                      top: 10,
                      opacity: 0.1
                    }
                  },
                  labels: ['Venues', 'Catering', 'Photography', 'Decor', 'Makeup', 'Planners'],
                  colors: [
                    theme.palette.primary.main,    // Violet
                    theme.palette.success.main,    // Emerald
                    theme.palette.warning.main,    // Amber
                    theme.palette.info.main,       // Cyan
                    '#f472b6',                     // Pink (Wedding Accent)
                    theme.palette.secondary.main   // Indigo
                  ],
                  fill: {
                    type: 'gradient',
                    gradient: {
                      shade: 'light',
                      type: 'vertical',
                      shadeIntensity: 0.1,
                      gradientToColors: [
                        alpha(theme.palette.primary.main, 0.7),
                        alpha(theme.palette.success.main, 0.7),
                        alpha(theme.palette.warning.main, 0.7),
                        alpha(theme.palette.info.main, 0.7),
                        alpha('#f472b6', 0.7),
                        alpha(theme.palette.secondary.main, 0.7)
                      ],
                      inverseColors: false,
                      opacityFrom: 1,
                      opacityTo: 0.85,
                      stops: [0, 100]
                    }
                  },
                  dataLabels: {
                    enabled: true,
                    formatter: (_, opts) => opts.w.config.labels[opts.seriesIndex],
                    style: {
                      fontSize: '13px',
                      fontWeight: 800,
                      fontFamily: theme.typography.fontFamily,
                      colors: [theme.palette.text.secondary]
                    },
                    dropShadow: { enabled: false }
                  },
                  plotOptions: {
                    pie: {
                      customScale: 0.8,
                      expandOnClick: true,
                      dataLabels: {
                        offset: 45,
                        minAngleToShowLabel: 5
                      }
                    }
                  },
                  legend: { 
                    show: true,
                    position: 'bottom', 
                    offsetY: -25,
                    fontWeight: 700,
                    fontSize: '13px',
                    fontFamily: theme.typography.fontFamily,
                    itemMargin: { horizontal: 8, vertical: 4 },
                    markers: { size: 8 }
                  },
                  stroke: { 
                    show: true, 
                    width: 2, 
                    colors: [theme.palette.background.paper] 
                  },
                  tooltip: { theme: 'light' }
                }}
                series={[44, 55, 13, 33, 22, 18]}
                type="pie"
                height={410}
              />
            </Box>
          </DashboardCard>
        </Grid>

=======
      <Grid container spacing={3}>
>>>>>>> 9cd112e (Implement core application architecture with routing, authentication, UI components, and SCSS styling.)
        {/* Main Activity Column */}
        <Grid item xs={12} md={8}>
          <DashboardCard sx={{ height: '100%' }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
<<<<<<< HEAD
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                <Typography variant="h5" sx={{ fontWeight: 900, color: 'text.primary' }}>Real-time Operations</Typography>
              </Box>
              <Button 
                variant="outlined" 
                size="small"
                sx={{ 
                  color: theme.palette.primary.main, 
                  borderColor: alpha(theme.palette.primary.main, 0.3),
                  fontWeight: 700,
                  borderRadius: '8px',
                  textTransform: 'none',
                  '&:hover': {
                    borderColor: theme.palette.primary.main,
                    bgcolor: alpha(theme.palette.primary.main, 0.05),
                  }
                }}
              >
                Stream Logs
              </Button>
            </Box>

            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              {recentActivities.map((activity, index) => {
                const IconComponent = activity.icon;
                const paletteColor = activity.status === 'success' 
                  ? theme.palette.success 
                  : activity.status === 'pending' 
                    ? theme.palette.warning 
                    : theme.palette.info;
                    
                return (
                  <Box 
                    key={index} 
                    sx={{ 
                      display: 'flex', 
                      gap: 2,
                      p: 1.5,
                      borderRadius: '16px',
                      transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                      border: '1px solid transparent',
                      animation: `${slideIn} 0.5s cubic-bezier(0.4, 0, 0.2, 1) ${index * 0.1}s backwards`,
                      '&:hover': {
                        bgcolor: alpha(theme.palette.background.paper, 0.4),
                        border: `1px solid ${theme.dashboard.glassBorder}`,
                        boxShadow: `0 4px 20px ${alpha(theme.palette.common.black, 0.05)}`,
                        transform: 'translateY(-2px)'
                      }
                    }}
                  >
                    <Box sx={{ position: 'relative' }}>
                      <Avatar sx={{
                        bgcolor: alpha(paletteColor.main, 0.1),
                        color: paletteColor.main,
                        borderRadius: '12px',
                        width: 44,
                        height: 44,
                        boxShadow: `inset 0 0 0 1px ${alpha(paletteColor.main, 0.2)}`
                      }}>
                        <IconComponent sx={{ fontSize: '1.25rem' }} />
                      </Avatar>
                    </Box>
                    <Box sx={{ flexGrow: 1 }}>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5, alignItems: 'center' }}>
                        <Typography variant="subtitle2" sx={{ fontWeight: 700, color: 'text.primary' }}>
                          {activity.name}
                        </Typography>
                        <Typography 
                          variant="caption" 
                          sx={{ 
                            color: 'text.secondary', 
                            fontSize: '0.7rem',
                            fontWeight: 600,
                            textTransform: 'uppercase',
                            letterSpacing: '0.02em'
                          }}
                        >
                          {activity.time}
                        </Typography>
                      </Box>
                      <Typography 
                        variant="overline" 
                        sx={{ 
                          color: paletteColor.main, 
                          mb: 0.5, 
                          display: 'inline-block',
                          letterSpacing: '0.05em'
                        }}
                      >
                        {activity.action}
                      </Typography>
                      <Typography 
                        variant="body2" 
                        sx={{
                          color: 'text.secondary',
                          bgcolor: alpha(theme.palette.background.default, 0.2),
                          p: 1.25,
                          px: 1.5,
                          borderRadius: '10px',
                          border: `1px solid ${theme.dashboard.glassBorder}`,
                          borderLeft: `3px solid ${paletteColor.main}`,
                          lineHeight: 1.6
                        }}
                      >
                        {activity.desc}
                      </Typography>
                    </Box>
                  </Box>
                );
              })}
=======
              <Typography variant="h6" sx={{ fontWeight: 800 }}>Real-time Operations</Typography>
              <Button variant="text" sx={{ color: 'var(--dash-accent)', fontWeight: 700 }}>Stream Logs</Button>
            </Box>

            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
              {recentActivities.map((activity, index) => (
                <Box key={index} sx={{ display: 'flex', gap: 2 }}>
                  <Avatar sx={{
                    bgcolor: activity.status === 'success' ? alpha(theme.palette.success.main, 0.1) : alpha(theme.palette.warning.main, 0.1),
                    color: activity.status === 'success' ? 'success.main' : 'warning.main',
                    borderRadius: '12px',
                    width: 48,
                    height: 48
                  }}>
                    <ArrowUpIcon />
                  </Avatar>
                  <Box sx={{ flexGrow: 1 }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
                      <Typography sx={{ fontWeight: 700 }}>{activity.name}</Typography>
<<<<<<< HEAD
                      <Typography variant="caption" sx={{ color: 'var(--dash-text-muted)' }}>{activity.time}</Typography>
                    </Box>
                    <Typography variant="body2" sx={{ color: 'var(--dash-accent)', fontWeight: 600, mb: 0.5 }}>{activity.action}</Typography>
                    <Typography variant="body2" sx={{
                      color: 'var(--dash-text-muted)',
                      bgcolor: 'rgba(0,0,0,0.03)',
                      p: 1,
                      borderRadius: '8px',
                      fontSize: '0.8rem'
=======
                      <Typography variant="caption" sx={{ color: 'text.secondary' }}>{activity.time}</Typography>
                    </Box>
                    <Typography variant="body2" sx={{ color: 'primary.main', fontWeight: 600, mb: 0.5 }}>{activity.action}</Typography>
                    <Typography variant="body2" sx={{
                      color: 'text.secondary',
                      bgcolor: alpha(theme.palette.action.hover, 0.5),
                      p: 1.5,
                      borderRadius: '12px',
                      fontSize: '0.875rem',
                      border: `1px solid ${theme.dashboard.glassBorder}`
>>>>>>> b8445b0 (Final MUI Transition)
                    }}>
                      {activity.desc}
                    </Typography>
                  </Box>
                </Box>
              ))}
>>>>>>> 9cd112e (Implement core application architecture with routing, authentication, UI components, and SCSS styling.)
            </Box>
          </DashboardCard>
        </Grid>

        {/* Sidebar Insights */}
        <Grid item xs={12} md={4}>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
            {/* Top Vendors */}
            <DashboardCard>
<<<<<<< HEAD
              <Typography variant="h5" sx={{ fontWeight: 900, mb: 3, color: 'text.primary' }}>Revenue Leaders</Typography>
=======
              <Typography variant="h6" sx={{ fontWeight: 800, mb: 3 }}>Revenue Leaders</Typography>
>>>>>>> 9cd112e (Implement core application architecture with routing, authentication, UI components, and SCSS styling.)
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                {topVendors.map((vendor, index) => (
                  <Box key={index} sx={{
                    p: 2,
                    borderRadius: '16px',
                    background: 'rgba(255,255,255,0.4)',
<<<<<<< HEAD
<<<<<<< HEAD
                    border: `1px solid ${theme.dashboard.glassBorder}`
                  }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1, alignItems: 'center' }}>
                      <Typography variant="subtitle2" sx={{ fontWeight: 700, color: 'text.primary' }}>{vendor.name}</Typography>
                      <Typography variant="subtitle1" sx={{ fontWeight: 900, color: 'primary.main' }}>{vendor.revenue}</Typography>
                    </Box>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <Typography variant="caption" sx={{ fontWeight: 700, color: 'text.secondary' }}>
                        {vendor.bookings} Bookings
                      </Typography>
                      <Typography 
                        variant="overline" 
                        sx={{ 
                          color: 'warning.main', 
                          display: 'flex',
                          alignItems: 'center',
                          gap: 0.2
                        }}
                      >
                        ★ {vendor.rating}
                      </Typography>
=======
                    border: '1px solid rgba(255,255,255,0.1)'
                  }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                      <Typography sx={{ fontWeight: 800 }}>{vendor.name}</Typography>
                      <Typography sx={{ fontWeight: 900, color: '#10b981' }}>{vendor.revenue}</Typography>
                    </Box>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <Typography variant="caption" sx={{ fontWeight: 700, color: 'var(--dash-text-muted)' }}>
=======
                    border: `1px solid ${theme.dashboard.glassBorder}`
                  }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                      <Typography sx={{ fontWeight: 800 }}>{vendor.name}</Typography>
                      <Typography sx={{ fontWeight: 900, color: 'success.main' }}>{vendor.revenue}</Typography>
                    </Box>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <Typography variant="caption" sx={{ fontWeight: 700, color: 'text.secondary' }}>
>>>>>>> b8445b0 (Final MUI Transition)
                        {vendor.bookings} Bookings
                      </Typography>
                      <Chip label={`★ ${vendor.rating}`} size="small" sx={{
                        height: 24,
                        fontWeight: 700,
                        bgcolor: 'rgba(245, 158, 11, 0.1)',
                        color: '#f59e0b'
                      }} />
>>>>>>> 9cd112e (Implement core application architecture with routing, authentication, UI components, and SCSS styling.)
                    </Box>
                  </Box>
                ))}
              </Box>
            </DashboardCard>

            {/* Operations Hub */}
<<<<<<< HEAD
            <DashboardCard variant="glass" sx={{ 
              position: 'relative',
              overflow: 'hidden',
              minHeight: '100%',
              transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
              '&:hover': {
                boxShadow: `0 15px 35px ${alpha(theme.palette.primary.main, 0.1)}`,
              }
            }}>
              {/* Subtle Ambient Glow */}
              <Box sx={{
                position: 'absolute',
                top: -50,
                right: -50,
                width: 200,
                height: 200,
                borderRadius: '50%',
                background: `radial-gradient(circle, ${alpha(theme.palette.primary.main, 0.1)} 0%, transparent 70%)`,
                filter: 'blur(30px)',
                pointerEvents: 'none'
              }} />

              <Typography variant="h5" sx={{ fontWeight: 900, mb: 3, color: 'text.primary' }}>
                Operations Hub
              </Typography>
              
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                {actionCards.map((card, index) => (
                  <Button 
                    key={index} 
                    fullWidth 
                    sx={{
                      justifyContent: 'flex-start',
                      textTransform: 'none',
                      p: 1.75,
                      borderRadius: '16px',
                      background: alpha(theme.palette.background.paper, 0.4),
                      border: `1px solid ${alpha(theme.palette.divider, 0.3)}`,
                      transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                      color: 'text.primary',
                      display: 'flex',
                      alignItems: 'center',
                      backdropFilter: 'blur(8px)',
                      '&:hover': { 
                        background: alpha(theme.palette.background.paper, 0.8),
                        border: `1px solid ${alpha(card.color, 0.4)}`,
                        transform: 'translateY(-2px) scale(1.02)',
                        boxShadow: `0 10px 30px ${alpha(theme.palette.common.black, 0.05)}`,
                        '& .card-icon-container': {
                          background: alpha(card.color, 0.2),
                          boxShadow: `0 0 15px ${alpha(card.color, 0.25)}`,
                        }
                      }
                    }}
                  >
                    <Box 
                      className="card-icon-container"
                      sx={{
                        width: 44,
                        height: 44,
                        borderRadius: '12px',
                        bgcolor: alpha(card.color, 0.1),
                        color: card.color,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        mr: 2,
                        transition: 'all 0.4s ease'
                      }}
                    >
                      <card.icon sx={{ fontSize: 22 }} />
                    </Box>
                    <Box sx={{ flexGrow: 1, textAlign: 'left' }}>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>{card.title}</Typography>
                        {card.count && (
                          <Box sx={{ 
                            px: 1, 
                            py: 0.25, 
                            borderRadius: '6px', 
                            background: alpha(theme.palette.primary.main, 0.1),
                            border: `1px solid ${alpha(theme.palette.primary.main, 0.2)}`
                          }}>
                            <Typography 
                              variant="caption" 
                              sx={{ 
                                fontWeight: 900, 
                                color: 'primary.main', 
                                fontSize: '0.7rem' 
                              }}
                            >
                              {card.count}
                            </Typography>
                          </Box>
=======
            <DashboardCard sx={{ bgcolor: '#0f172a', color: 'white' }}>
              <Typography variant="h6" sx={{ fontWeight: 800, mb: 3 }}>Operations Hub</Typography>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
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
                      bgcolor: `${card.color}30`,
=======
                      bgcolor: alpha(card.color, 0.2),
>>>>>>> b8445b0 (Final MUI Transition)
                      color: card.color,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      mr: 2
                    }}>
                      <card.icon sx={{ fontSize: 20 }} />
                    </Box>
                    <Box sx={{ flexGrow: 1, textAlign: 'left' }}>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Typography sx={{ fontWeight: 700, fontSize: '0.9rem' }}>{card.title}</Typography>
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
                      </Box>
                    </Box>
                  </Button>
                ))}
              </Box>
            </DashboardCard>
          </Box>
<<<<<<< HEAD
        </Grid >
      </Grid >
    </Box >
=======
        </Grid>
      </Grid>
    </Box>
>>>>>>> 9cd112e (Implement core application architecture with routing, authentication, UI components, and SCSS styling.)
  );
};

export default AdminDashboard;
