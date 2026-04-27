import React from 'react';
import { UserRole } from '../../../auth/types/auth.types';
import AdminDashboard from '../Admin/AdminDashboard';
import ClientDashboard from '../Client/ClientDashboard';
import ManagerDashboard from '../Manager/ManagerDashboard';
import StaffDashboard from '../Staff/StaffDashboard';
import VendorDashboard from '../Vendor/VendorDashboard';
import { useUser } from '../../../user/context/useUser';
import { useNavigate } from 'react-router-dom';

const DashboardPage: React.FC = () => {
  const { user } = useUser();

  const navigate = useNavigate();

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
    default: navigate("/login");
  }
};

export default DashboardPage;
