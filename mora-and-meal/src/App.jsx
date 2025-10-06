import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

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
    <Router>
      <div className="app-container">
        <Routes>
          
          {}
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
          
          {}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/cadastro" element={<RegisterPage />} />
          
          {}
          <Route path="/menu" element={<MenuPage />} /> 

          {}
          <Route path="/pedidos" element={<PedidosPage />} />
          
          {}
          <Route path="/pedido-concluido" element={<OrderSuccessPage />} />
          
        </Routes>
      </div>
    </Router>
  );
}

export default App;