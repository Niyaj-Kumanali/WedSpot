import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "./useAuth";
import { useUser } from "@/features/user";
import { UserRole } from "@/features/auth/types/auth.types";
import { getDashboardPath } from "@/constants/roles";
import { Box, CircularProgress } from "@mui/material";

interface ProtectedRouteProps {
    allowedRoles?: UserRole[];
    children?: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ allowedRoles, children }) => {
    const { isAuthenticated } = useAuth();
    const { user } = useUser();
    const role = user?.role;
    const [isChecking, setIsChecking] = React.useState(true);

    React.useEffect(() => {
        const timer = setTimeout(() => setIsChecking(false), 100);
        return () => clearTimeout(timer);
    }, []);

    if (isChecking) {
        return (
            <Box
                sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    minHeight: "100vh",
                    bgcolor: "#f8fafc",
                }}
            >
                <CircularProgress size={48} sx={{ color: "#7c3aed" }} />
            </Box>
        );
    }

    if (!isAuthenticated) {
        return <Navigate to="/login" replace />;
    }

    if (allowedRoles && allowedRoles.length > 0) {
        const userRole = (role || "").toLowerCase();
        const hasAccess = allowedRoles.some(
            allowedRole => allowedRole.toLowerCase() === userRole
        );

        if (!hasAccess) {
            const correctDashboard = getDashboardPath(role || null);
            return <Navigate to={correctDashboard} replace />;
        }
    }

    return children ? <>{children}</> : <Outlet />;
};

export default ProtectedRoute;
