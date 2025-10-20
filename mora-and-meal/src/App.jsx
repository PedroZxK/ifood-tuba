import React from 'react';
import { Routes, Route } from 'react-router-dom';

import Navbar from './components/Navbar/Navbar';
import HeroSection from './components/HeroSection/HeroSection';
import FeaturedDishes from './components/FeaturedDishes/FeaturedDishes';
import AboutUs from './components/AboutUs/AboutUs';
import Footer from './components/Footer/Footer';

import LoginPage from './pages/LoginPage/LoginPage';
import RegisterPage from './pages/RegisterPage/RegisterPage';
import MenuPage from './pages/MenuPage/MenuPage';
import PedidosPage from './pages/PedidosPage/PedidosPage';
import OrderSuccessPage from './pages/OrderSuccessPage/OrderSuccessPage';
import PhoneVerificationPage from './pages/PhoneVerificationPage/PhoneVerificationPage';
import ForgotPasswordPage from './pages/ForgotPasswordPage/ForgotPasswordPage';
import CartPage from './pages/CartPage/CartPage';
import ProfilePage from './pages/ProfilePage/ProfilePage';

import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute';

import './App.css';

const LandingPageContent = () => (
  <>
    <HeroSection />
    <FeaturedDishes />
    <AboutUs />
  </>
);

function App() {
  return (
    <div className="app-container">
      <Routes>
        <Route
          path="/"
          element={
            <>
              <Navbar />
              <LandingPageContent />
              <Footer />
            </>
          }
        />

        <Route path="/login" element={<LoginPage />} />
        <Route path="/cadastro" element={<RegisterPage />} />
        <Route path="/verify-phone" element={<PhoneVerificationPage />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />

        <Route
          path="/pedidos"
          element={
            <ProtectedRoute>
              <PedidosPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/menu"
          element={
            <ProtectedRoute>
              <MenuPage />
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
          path="/pedido-concluido"
          element={
            <ProtectedRoute>
              <OrderSuccessPage />
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

      </Routes>
    </div>
  );
}

export default App;