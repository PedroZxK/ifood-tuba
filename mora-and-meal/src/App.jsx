import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { CartProvider } from './contexts/CartContext';

// --- Páginas ---
import LoginPage from './pages/LoginPage/LoginPage';
import RegisterPage from './pages/RegisterPage/RegisterPage';
import MenuPage from './pages/MenuPage/MenuPage';
import ProfilePage from './pages/ProfilePage/ProfilePage';
import CartPage from './pages/CartPage/CartPage';
import PedidosPage from './pages/PedidosPage/PedidosPage';
import OrderSuccessPage from './pages/OrderSuccessPage/OrderSuccessPage';
import ForgotPasswordPage from './pages/ForgotPasswordPage/ForgotPasswordPage';

// --- Componentes da Landing Page ---
import HeroSection from './components/HeroSection/HeroSection';
import FeaturedDishes from './components/FeaturedDishes/FeaturedDishes';
import AboutUs from './components/AboutUs/AboutUs';

// --- Componentes de Layout ---
import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer';
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute';

// Componente para agrupar o conteúdo da Landing Page
const LandingPageLayout = () => (
  <>
    <Navbar />
    <main>
      <HeroSection />
      <FeaturedDishes />
      <AboutUs />
    </main>
    <Footer />
  </>
);

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <Routes>
          {/* Rota Principal (Landing Page) */}
          <Route path="/" element={<LandingPageLayout />} />

          {/* Rotas Públicas */}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/forgot-password" element={<ForgotPasswordPage />} />

          {/* Rotas Protegidas */}
          <Route
            path="/menu"
            element={
              <ProtectedRoute>
                <MenuPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <ProfilePage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/cart"
            element={
              <ProtectedRoute>
                <CartPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/pedidos"
            element={
              <ProtectedRoute>
                <PedidosPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/order-success"
            element={
              <ProtectedRoute>
                <OrderSuccessPage />
              </ProtectedRoute>
            }
          />
        </Routes>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;