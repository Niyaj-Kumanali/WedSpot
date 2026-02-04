import { Routes, Route } from "react-router-dom";
import ProductList from "./pages/Services/ProductList";
import ProductDetail from "./pages/Services/ProductDetail";
import LoginPage from "./pages/Login/LoginPage";
import ForgotPassword from "./pages/Login/ForgotPassword";
import RegisterPage from "./pages/SignUp/RegisterPage";
import ChatbotPage from "./pages/Chatbot/ChatbotPage";
import type { JSX } from "react";
import HomePage from "./pages/Home/HomePage";
import AdminDashboard from "./pages/Dashboards/AdminDashboard";
import ManagerDashboard from "./pages/Dashboards/ManagerDashboard";
import StaffDashboard from "./pages/Dashboards/StaffDashboard";
import ClientDashboard from "./pages/Dashboards/ClientDashboard";
import VendorDashboard from "./pages/Dashboards/VendorDashboard";
import UserProfile from "./pages/Profile/UserProfile";
import MainLayout from "./layouts/MainLayout";
import AuthLayout from "./layouts/AuthLayout";
import DashboardLayout from "./layouts/DashboardLayout";
import { DashboardProvider } from "./contexts/DashboardContext";

const App = (): JSX.Element => {
  console.log("App rendered");
  return (
    <Routes>
      {/* Public Pages with NavBar and Footer */}
      <Route element={<MainLayout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/products" element={<ProductList />} />
        <Route path="/product/:id" element={<ProductDetail />} />
      </Route>

      {/* Authenticated Dashboard Pages with Sidebar */}
      <Route
        element={
          <DashboardProvider>
            <DashboardLayout />
          </DashboardProvider>
        }
      >
        <Route path="/chatbot" element={<ChatbotPage />} />
        <Route path="/admin-dashboard" element={<AdminDashboard />} />
        <Route path="/manager-dashboard" element={<ManagerDashboard />} />
        <Route path="/staff-dashboard" element={<StaffDashboard />} />
        <Route path="/client-dashboard" element={<ClientDashboard />} />
        <Route path="/vendor-dashboard" element={<VendorDashboard />} />
        <Route path="/profile" element={<UserProfile />} />
      </Route>

      {/* Authentication pages without NavBar/Footer/Sidebar */}
      <Route element={<AuthLayout />}>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/register" element={<RegisterPage />} />
      </Route>
    </Routes>
  );
};

export default App;
