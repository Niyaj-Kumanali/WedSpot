import React, { type JSX } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const RoleRoute: React.FC<{children: JSX.Element, allowed: string[]}> = ({ children, allowed }) => {
  const auth = useAuth();
  if (!auth.isAuthenticated) return <Navigate to="/login" replace />;
  if (!auth.role || !allowed.includes(auth.role)) return <Navigate to="/unauthorized" replace />;
  return children;
};
export default RoleRoute;
