import { Routes, Route, useLocation } from "react-router-dom";
import NavBar from "./components/Navbar/NavBar";
import ProductList from "./pages/Services/ProductList";
import ProductDetail from "./pages/Services/ProductDetail";
import LoginPage from "./pages/Login/LoginPage";
import RegisterPage from "./pages/SignUp/RegisterPage";
import ChatbotPage from "./pages/Chatbot/ChatbotPage";
import type { JSX } from "react";
import HomePage from "./pages/Home/HomePage";
import Footer from "./components/Footer/Footer";

const App = (): JSX.Element => {
  const location = useLocation();

  // Define auth pages where we want minimal layout
  const authPages = ["/login", "/register"];
  const isAuthPage = authPages.includes(location.pathname);

  return (
    <div>
      {/* Show full navbar only on non-auth pages */}
      {!isAuthPage && <NavBar />}

      {/* Minimal header for auth pages */}
      {/* {isAuthPage && (
        <header style={{
          padding: '10px',
          textAlign: 'start',
          background: '#fff',
          boxShadow: '0 2px 8px rgba(0,0,0,0.05)'
        }}>
          <Logo />
        </header>
      )} */}

      <main style={{ padding: isAuthPage ? "0" : "0px 20px 20px 20px" }}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/products" element={<ProductList />} />
          <Route path="/product/:id" element={<ProductDetail />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/chatbot" element={<ChatbotPage />} />
        </Routes>
      </main>

      {/* Show footer only on non-auth pages */}
      {!isAuthPage && <Footer />}
    </div>
  );
};

export default App;
