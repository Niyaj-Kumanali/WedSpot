import React from 'react';
import { UserRole } from '../features/auth/types/auth.types';
import AdminDashboard from '../features/dashboard/pages/Admin/AdminDashboard';
import ClientDashboard from '../features/dashboard/pages/Client/ClientDashboard';
import ManagerDashboard from '../features/dashboard/pages/Manager/ManagerDashboard';
import StaffDashboard from '../features/dashboard/pages/Staff/StaffDashboard';
import VendorDashboard from '../features/dashboard/pages/Vendor/VendorDashboard';
import { useUser } from '../contexts/User/useUser';

const DashboardPage: React.FC = () => {
  const { user } = useUser();

  switch (user?.role) {
    case UserRole.ADMIN:
      return <AdminDashboard />;
    case UserRole.MANAGER:
      return <ManagerDashboard />;
    case UserRole.STAFF:
      return <StaffDashboard />;
    case UserRole.VENDOR:
      return <VendorDashboard />;
    case UserRole.CLIENT:
      return <ClientDashboard />;
    default:
      return <div>Please login to view your dashboard.</div>;
  }
};

export default DashboardPage;
