import { createBrowserRouter } from "react-router-dom";
import LoginPage from "./pages/Login/LoginPage";
import ForgotPassword from "./pages/ForgotPassword/ForgotPassword";
import RegisterPage from "./pages/SignUp/RegisterPage";
import ChatbotPage from "./pages/Chatbot/ChatbotPage";
import Home from "./pages/Home/Home";
import AdminDashboard from "./pages/Dashboard/Admin/AdminDashboard";
import ManagerDashboard from "./pages/Dashboard/Manager/ManagerDashboard";
import StaffDashboard from "./pages/Dashboard/Staff/StaffDashboard";
import ClientDashboard from "./pages/Dashboard/Client/ClientDashboard";
import VendorDashboard from "./pages/Dashboard/Vendor/VendorDashboard";
import UserProfile from "./pages/Profile/UserProfile";
import MainLayout from "./layouts/MainLayout";
import AuthLayout from "./layouts/AuthLayout";
import DashboardLayout from "./layouts/DashboardLayout";
import { DashboardProvider } from "./contexts/DashboardContext";
// import ProtectedRoute from "./components/Routes/ProtectedRoute";
import PublicRoute from "./components/Routes/PublicRoute";

export const router = createBrowserRouter([
    {
        children: [
            { path: "/", element: <MainLayout><Home /></MainLayout> },
        ],
    },
    {
        element: (
            // <ProtectedRoute>
            <DashboardProvider>
                <DashboardLayout />
            </DashboardProvider>
            // </ProtectedRoute>
        ),
        children: [
            { path: "/chatbot", element: <ChatbotPage /> },
            { path: "/admin-dashboard", element: <AdminDashboard /> },
            { path: "/manager-dashboard", element: <ManagerDashboard /> },
            { path: "/staff-dashboard", element: <StaffDashboard /> },
            { path: "/client-dashboard", element: <ClientDashboard /> },
            { path: "/vendor-dashboard", element: <VendorDashboard /> },
            { path: "/profile", element: <UserProfile /> },
        ],
    },
    {
        element: (
            <PublicRoute>
                <AuthLayout />
            </PublicRoute>
        ),
        children: [
            { path: "/login", element: <LoginPage /> },
            { path: "/forgot-password", element: <ForgotPassword /> },
            { path: "/register", element: <RegisterPage /> },
        ],
    },
]);