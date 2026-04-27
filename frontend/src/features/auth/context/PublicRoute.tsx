import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from './useAuth';
import { useUser } from '@/features/user';

const PublicRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const { isAuthenticated } = useAuth();
    const { user } = useUser();
    const role = user?.role;

    if (isAuthenticated) {
        const dashboardPath = role ? `/dashboard` : '/';
        return <Navigate to={dashboardPath} replace />;
    }

    return <>{children}</>;
};

export default PublicRoute;
