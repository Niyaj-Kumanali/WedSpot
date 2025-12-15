
import { Routes, Route } from 'react-router-dom';
import NavBar from './components/NavBar';
import ProductList from './pages/ProductList';
import ProductDetail from './pages/ProductDetail';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ChatbotPage from './pages/ChatbotPage';
import type { JSX } from 'react';
import HomePage from './pages/Home/HomePage';
import Footer from './components/Footer';

const App = (): JSX.Element => {
  return (
    <div>
      <NavBar />
      <main style={{ padding: "0px 20px 20px 20px" }}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/products" element={<ProductList />} />
          <Route path="/product/:id" element={<ProductDetail />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          {/* <Route path="/ai" element={<AiChat />} /> */}
          <Route path="/chatbot" element={<ChatbotPage />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
};

export default App;
