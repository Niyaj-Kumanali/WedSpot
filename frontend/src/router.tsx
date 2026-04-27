import { createBrowserRouter } from "react-router-dom";
import Login from "@/features/auth/pages/Login/Login";
import ForgotPassword from "@/features/auth/pages/ForgotPassword/ForgotPassword";
import RegisterPage from "@/features/auth/pages/SignUp/RegisterPage";
import ChatbotPage from "@/pages/Chatbot/ChatbotPage";
import Home from "@/pages/Home/Home";
import PrivacyPolicy from "@/pages/PrivacyPolicy/PrivacyPolicy";
import TermsOfService from "@/pages/TermsOfService/TermsOfService";
import NotFound from "@/pages/NotFound/NotFound";
import Users from "@/features/user/pages/Users/Users";
import Vendors from "@/features/vendors/pages/Vendors";
import Requests from "@/pages/Requests/Requests";
import Bookings from "@/features/bookings/pages/Bookings";
import Analytics from "@/features/business/pages/Analytics/Analytics";
import Earnings from "@/features/business/pages/Earnings/Earnings";
import SavedVendors from "@/features/vendors/pages/SavedVendors";
import Revenue from "@/features/business/pages/Revenue/Revenue";
import Staff from "@/features/user/pages/Staff/Staff";
import Reports from "@/features/business/pages/Reports/Reports";
import Tasks from "@/pages/Tasks/Tasks";
import AddUser from "@/features/user/pages/Users/AddUser";
import Products from "@/features/commerce/pages/Products/Products";
import AddVendor from "@/features/vendors/pages/AddVendor";
import AddStaff from "@/features/user/pages/Staff/AddStaff";
import AddRequest from "@/pages/Requests/AddRequest";
import Profile from "@/features/user/pages/Profile/Profile";
import CartPage from "@/features/commerce/pages/Cart/CartPage";
import MainLayout from "@/layouts/MainLayout";
import AuthLayout from "@/layouts/AuthLayout";
import DashboardLayout from "@/layouts/DashboardLayout";
import { DashboardProvider } from "@/features/dashboard/context/DashboardContext";
import ProtectedRoute from "@/features/auth/context/ProtectedRoute";
import PublicRoute from "@/features/auth/context/PublicRoute";
import { UserRole } from "@/features/auth/types/auth.types";
import BillsPage from "@/pages/Bills/Bills";
import PremiumVendors from "@/features/vendors/pages/PremiumVendors";
import VendorDetails from "@/features/vendors/pages/VendorDetails";
import DashboardPage from "@/pages/DashboardPage";
import UpdateUser from "./features/user/pages/Users/UpdateUser";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <MainLayout><Home /></MainLayout>,
    },
    {
                path: "bills",
                element: <BillsPage />,
    },
    { path: "/privacy", element: <MainLayout><PrivacyPolicy /></MainLayout> },
    { path: "/terms", element: <MainLayout><TermsOfService /></MainLayout> },
    { path: "*", element: <NotFound /> },
    {
        element: (
            <PublicRoute>
                <AuthLayout />
            </PublicRoute>
        ),
        children: [
            { path: "/login", element: <Login /> },
            { path: "/forgot-password", element: <ForgotPassword /> },
            { path: "/register", element: <RegisterPage /> },
        ],
    },
    {
        path: "/",
        element: (
            <ProtectedRoute>
                <DashboardProvider>
                    <DashboardLayout />
                </DashboardProvider>
            </ProtectedRoute>
        ),
        children: [
            {
                path: "dashboard",
                element: <DashboardPage />
            },
            {
                path: "admin",
                element: <ProtectedRoute allowedRoles={[UserRole.ADMIN]} />,
                children: [
                    { path: "users", element: <Users /> },
                    { path: "users/add", element: <AddUser /> },
                    { path: "users/:id", element: <UpdateUser /> },
                    { path: "requests", element: <Requests /> },
                    { path: "bookings", element: <Bookings /> },
                    { path: "revenue", element: <Revenue /> },
                    { path: "analytics", element: <Analytics /> },
                ]
            },
            {
                path: "manager",
                element: <ProtectedRoute allowedRoles={[UserRole.MANAGER]} />,
                children: [
                    { path: "vendors", element: <Vendors /> },
                    { path: "vendors/add", element: <AddVendor /> },
                    { path: "requests", element: <Requests /> },
                    { path: "bookings", element: <Bookings /> },
                    { path: "staff", element: <Staff /> },
                    { path: "staff/add", element: <AddStaff /> },
                    { path: "reports", element: <Reports /> },
                ]
            },
            {
                path: "staff",
                element: <ProtectedRoute allowedRoles={[UserRole.STAFF]} />,
                children: [
                    { path: "bookings", element: <Bookings /> },
                    { path: "tasks", element: <Tasks /> },
                    { path: "reports", element: <Reports /> },
                ]
            },
            {
                path: "vendor",
                element: <ProtectedRoute allowedRoles={[UserRole.VENDOR]} />,
                children: [
                    { path: "requests", element: <Requests /> },
                    { path: "bookings", element: <Bookings /> },
                    { path: "earnings", element: <Earnings /> },
                ]
            },
            {
                path: "client",
                element: <ProtectedRoute allowedRoles={[UserRole.CLIENT]} />,
                children: [
                    { path: "vendors", element: <PremiumVendors /> },
                    { path: "vendors/:id", element: <VendorDetails /> },
                    { path: "requests", element: <Requests /> },
                    { path: "requests/add", element: <AddRequest /> },
                    { path: "bookings", element: <Bookings /> },
                    { path: "saved", element: <SavedVendors /> },
                    { path: "profile", element: <Profile /> },
                ]
            },
            {
                path: "products",
                element: <Products />,
            },
            {
                path: "products/:id",
                element: <VendorDetails />,
            },
            {
                path: "profile",
                element: <Profile />,
            },
            {
                path: "chatbot",
                element: <ChatbotPage />,
            },
            {
                path: "cart",
                element: <CartPage />,
            },
        ],
    },
]);
