// src/App.jsx

import React from 'react';
// Importa os componentes de roteamento
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Componentes da Landing Page
import Navbar from './components/Navbar/Navbar';
import HeroSection from './components/HeroSection/HeroSection';
import FeaturedDishes from './components/FeaturedDishes/FeaturedDishes';
import AboutUs from './components/AboutUs/AboutUs';
import Footer from './components/Footer/Footer';

// Páginas de Autenticação e Menu (NOVA IMPORTAÇÃO)
import LoginPage from './pages/LoginPage/LoginPage';
import RegisterPage from './pages/RegisterPage/RegisterPage'; 
import MenuPage from './pages/MenuPage/MenuPage'; // <-- NOVO
import PedidosPage from './pages/PedidosPage/PedidosPage'; // <-- NOVA IMPORTAÇÃO
import OrderSuccessPage from './pages/OrderSuccessPage/OrderSuccessPage'; // <-- NOVA IMPORTAÇÃO

import './App.css';

// Componente de layout para a Landing Page (conteúdo principal)
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
          
          {/* Rota 1: Landing Page (Home) */}
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
          
          {/* Rota 2 e 3: Autenticação */}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/cadastro" element={<RegisterPage />} />
          
          {/* Rota 4: Menu Page */}
          <Route path="/menu" element={<MenuPage />} /> 

          {/* Rota 5: Pedidos / Pagamento */}
          <Route path="/pedidos" element={<PedidosPage />} />
          
          {/* Rota 6: Pedido Concluído (NOVA ROTA) */}
          <Route path="/pedido-concluido" element={<OrderSuccessPage />} />
          
        </Routes>
      </div>
    </Router>
  );
}

export default App;