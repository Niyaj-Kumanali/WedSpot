import { createBrowserRouter } from "react-router-dom";
import Login from "@/features/auth/pages/Login/Login";
import ForgotPassword from "@/features/auth/pages/ForgotPassword/ForgotPassword";
import RegisterPage from "@/features/auth/pages/SignUp/RegisterPage";
import ChatbotPage from "@/features/chat/pages/ChatbotPage";
import Home from "@/features/home/pages/Home";
import PrivacyPolicy from "@/pages/PrivacyPolicy/PrivacyPolicy";
import TermsOfService from "@/pages/TermsOfService/TermsOfService";
import NotFound from "@/pages/NotFound/NotFound";
import Users from "@/features/Users/pages/Users";
import Vendors from "@/features/Manager/pages/Vendors/Vendors";
import Requests from "@/features/Request/pages/Requests";
import Bookings from "@/features/Booking/pages/BookingsPage";
import Analytics from "@/features/Analytics/pages/Analytics";
import Earnings from "@/features/Earnings/pages/Earnings";
import SavedVendors from "@/features/vendors/pages/SavedVendors";
import Revenue from "@/features/Revenue/pages/Revenue";
import Staff from "@/features/Manager/pages/Staff/Staff";
import Reports from "@/features/Reports/pages/Reports";
import Tasks from "@/features/Tasks/pages/Tasks";
import AddUser from "@/features/Users/pages/AddUser";
import Products from "@/features/commerce/pages/Products/Products";
import AddVendor from "@/features/Manager/pages/Vendors/AddVendor";
import AddStaff from "@/features/Manager/pages/Staff/AddStaff";
import AddRequest from "@/features/Request/pages/AddRequest";
import Profile from "@/features/Profile/pages/Profile";
import CartPage from "@/features/commerce/pages/Cart/CartPage";
import MainLayout from "@/layouts/MainLayout";
import AuthLayout from "@/layouts/AuthLayout";
import DashboardLayout from "@/layouts/DashboardLayout";
import { DashboardProvider } from "@/features/dashboard/context/DashboardContext";
import ProtectedRoute from "@/features/auth/context/ProtectedRoute";
import PublicRoute from "@/features/auth/context/PublicRoute";
import { UserRole } from "@/features/auth/types/auth.types";
import BillsPage from "@/features/Bills/pages/Bills";
import PremiumVendors from "@/features/vendors/pages/PremiumVendors";
import VendorDetails from "@/features/vendors/pages/VendorDetails";
import DashboardPage from "@/features/dashboard/pages/Dashboard/DashboardPage";
import UpdateUser from "./features/Users/pages/UpdateUser";

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
