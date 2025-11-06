
import { Routes, Route } from 'react-router-dom';
import NavBar from './components/NavBar';
import ProductList from './pages/ProductList';
import ProductDetail from './pages/ProductDetail';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import AiChat from './pages/AiChat';
import type { JSX } from 'react';

const App = (): JSX.Element => {
  return (
    <div>
      <NavBar />
      <main style={{ padding: 20 }}>
        <Routes>
          <Route path="/" element={<ProductList />} />
          <Route path="/product/:id" element={<ProductDetail />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/ai" element={<AiChat />} />
        </Routes>
      </main>
    </div>
  );
};

export default App;
