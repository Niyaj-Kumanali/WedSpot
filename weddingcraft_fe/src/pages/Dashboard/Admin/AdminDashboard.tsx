import React from "react";
import {
  People as UsersIcon,
  Business as BuildingIcon,
  AttachMoney as DollarIcon,
  BarChart as ChartIcon,
  CalendarMonth as CalendarIcon,
  Security as ShieldIcon,
  ArrowUpward as ArrowUpIcon,
} from "@mui/icons-material";
import { Grid, Avatar, Chip } from "@mui/material";
import { 
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, 
  PieChart, Pie, Cell, ResponsiveContainer 
} from 'recharts';
import DashboardHeader from "../../../components/Dashboard/DashboardHeader/DashboardHeader";
import DashboardStats from "../../../components/Dashboard/DashboardStats/DashboardStats";
import DashboardCard from "../../../components/Dashboard/DashboardCard/DashboardCard";
import ChartCard from "../../../components/Dashboard/ChartCard/ChartCard";
import "./AdminDashboard.scss";

const AdminDashboard: React.FC = () => {

  const stats = [
    {
      label: "Total Vendors",
      value: "1,234",
      change: "+12%",
      icon: BuildingIcon,
      color: "#6366f1",
      progress: 75,
      trend: "up" as const
    },
    {
      label: "Total Revenue",
      value: "₹45.2L",
      change: "+18%",
      icon: DollarIcon,
      color: "#10b981",
      progress: 62,
      trend: "up" as const
    },
    {
      label: "Active Clients",
      value: "8,567",
      change: "+23%",
      icon: UsersIcon,
      color: "#f59e0b",
      progress: 88,
      trend: "up" as const
    },
    {
      label: "Bookings",
      value: "456",
      change: "+15%",
      icon: CalendarIcon,
      color: "#3b82f6",
      progress: 94,
      trend: "up" as const
    },
  ];

  const revenueData = [
    { month: 'Jan', revenue: 4000, bookings: 240 },
    { month: 'Feb', revenue: 3000, bookings: 139 },
    { month: 'Mar', revenue: 2000, bookings: 980 },
    { month: 'Apr', revenue: 2780, bookings: 390 },
    { month: 'May', revenue: 1890, bookings: 480 },
    { month: 'Jun', revenue: 2390, bookings: 380 },
    { month: 'Jul', revenue: 3490, bookings: 430 },
  ];

  const vendorDistribution = [
    { name: 'Venues', value: 400, color: '#6366f1' },
    { name: 'Catering', value: 300, color: '#10b981' },
    { name: 'Photography', value: 300, color: '#f59e0b' },
    { name: 'Decor', value: 200, color: '#3b82f6' },
  ];

  const recentActivities = [
    {
      name: "Royal Banquet Hall",
      action: "Vendor Verification",
      time: "2 mins ago",
      status: "pending",
      desc: "Updated venue capacity and license documents."
    },
    {
      name: "Priya & Rahul",
      action: "Booking Confirmed",
      time: "15 mins ago",
      status: "success",
      desc: "Full payment received for Wedding Reception."
    },
    {
      name: "Mahesh Photo",
      action: "Portfolio Update",
      time: "1 hour ago",
      status: "success",
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
      color: "#6366f1",
      count: 12
    },
    {
      title: "Revenue Report",
      desc: "Export monthly financial growth analysis.",
      icon: ChartIcon,
      color: "#10b981",
      count: null
    },
    {
      title: "User Audit",
      desc: "System-wide user activity and security log.",
      icon: UsersIcon,
      color: "#f59e0b",
      count: 5
    },
  ];

  return (
    <div className="admin-dashboard-container">
      <DashboardHeader
        title="Admin Command"
        subtitle="Orchestrating system growth and operational excellence."
        tag="Strategic Overview"
        live
      />

      <Grid container spacing={3} sx={{ mb: 4 }}>
        {stats.map((stat, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <DashboardStats {...stat} />
          </Grid>
        ))}
      </Grid>

      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} md={8}>
          <ChartCard 
            title="Revenue Performance" 
            subtitle="Monthly revenue growth and booking volume"
          >
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={revenueData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(0,0,0,0.05)" />
                <XAxis 
                  dataKey="month" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fill: 'var(--dash-text-muted)', fontSize: 12 }} 
                />
                <YAxis 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fill: 'var(--dash-text-muted)', fontSize: 12 }} 
                />
                <Tooltip 
                  contentStyle={{ 
                    borderRadius: '12px', 
                    border: 'none', 
                    boxShadow: 'var(--dash-shadow-lg)',
                    background: 'rgba(255,255,255,0.9)',
                    backdropFilter: 'blur(10px)'
                  }} 
                />
                <Legend verticalAlign="top" height={36}/>
                <Line 
                  type="monotone" 
                  dataKey="revenue" 
                  stroke="#6366f1" 
                  strokeWidth={3} 
                  dot={{ r: 4, fill: '#6366f1', strokeWidth: 2, stroke: '#fff' }}
                  activeDot={{ r: 6, strokeWidth: 0 }}
                />
                <Line 
                  type="monotone" 
                  dataKey="bookings" 
                  stroke="#10b981" 
                  strokeWidth={3} 
                  dot={{ r: 4, fill: '#10b981', strokeWidth: 2, stroke: '#fff' }}
                  activeDot={{ r: 6, strokeWidth: 0 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </ChartCard>
        </Grid>
        <Grid item xs={12} md={4}>
          <ChartCard 
            title="Vendor Distribution" 
            subtitle="Breakdown by service category"
          >
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={vendorDistribution}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {vendorDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ 
                    borderRadius: '12px', 
                    border: 'none', 
                    boxShadow: 'var(--dash-shadow-lg)',
                    background: 'rgba(255,255,255,0.9)',
                    backdropFilter: 'blur(10px)'
                  }} 
                />
                <Legend verticalAlign="bottom" height={36}/>
              </PieChart>
            </ResponsiveContainer>
          </ChartCard>
        </Grid>
      </Grid>

      <Grid container spacing={3}>
        {/* Main Activity Column */}
        <Grid item xs={12} md={8}>
          <DashboardCard sx={{ height: '100%' }}>
            <div className="ops-header">
              <h3 className="ops-title">Real-time Operations</h3>
              <button className="ops-btn">
                Stream Logs
              </button>
            </div>

            <div className="activities-list">
              {recentActivities.map((activity, index) => (
                <div key={index} className="activity-item">
                  <Avatar sx={{
                    bgcolor: activity.status === 'success' ? 'rgba(16, 185, 129, 0.1)' : 'rgba(245, 158, 11, 0.1)',
                    color: activity.status === 'success' ? '#10b981' : '#f59e0b',
                    borderRadius: '12px',
                    width: 48,
                    height: 48
                  }}>
                    <ArrowUpIcon />
                  </Avatar>
                  <div className="activity-content">
                    <div className="activity-header">
                      <span className="activity-name">{activity.name}</span>
                      <span className="activity-time">{activity.time}</span>
                    </div>
                    <p className="activity-action">{activity.action}</p>
                    <p className="activity-desc">
                      {activity.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </DashboardCard>
        </Grid>

        {/* Sidebar Insights */}
        <Grid item xs={12} md={4}>
          <div className="insights-column">
            {/* Top Vendors */}
            <DashboardCard>
              <h3 className="insight-title">Revenue Leaders</h3>
              <div className="vendor-list">
                {topVendors.map((vendor, index) => (
                  <div key={index} className="vendor-item">
                    <div className="vendor-header">
                      <span className="vendor-name">{vendor.name}</span>
                      <span className="vendor-revenue">{vendor.revenue}</span>
                    </div>
                    <div className="vendor-stats">
                      <span className="vendor-bookings">
                        {vendor.bookings} Bookings
                      </span>
                      <Chip label={`★ ${vendor.rating}`} size="small" sx={{
                        height: 24,
                        fontWeight: 700,
                        bgcolor: 'rgba(245, 158, 11, 0.1)',
                        color: '#f59e0b'
                      }} />
                    </div>
                  </div>
                ))}
              </div>
            </DashboardCard>

            {/* Operations Hub */}
            <DashboardCard sx={{ bgcolor: '#0f172a', color: 'white' }}>
              <h3 className="insight-title insight-title-light">Operations Hub</h3>
              <div className="ops-hub-list">
                {actionCards.map((card, index) => (
                  <button key={index} className="ops-card-btn">
                    <div 
                      className="ops-card-icon-container" 
                      style={{ backgroundColor: `${card.color}30`, color: card.color }}
                    >
                      <card.icon sx={{ fontSize: 20 }} />
                    </div>
                    <div className="ops-card-content">
                      <div className="ops-card-header">
                        <span className="ops-card-title">{card.title}</span>
                        {card.count && (
                          <Chip label={card.count} size="small" sx={{
                            height: 20,
                            fontSize: '0.7rem',
                            fontWeight: 800,
                            bgcolor: card.color,
                            color: 'white'
                          }} />
                        )}
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </DashboardCard>
          </div>
        </Grid>
      </Grid>
    </div>
  );
};

export default AdminDashboard;
