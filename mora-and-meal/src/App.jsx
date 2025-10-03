import React from 'react';
// Importa os componentes de roteamento
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Componentes da Landing Page
import Navbar from './components/Navbar/Navbar';
import HeroSection from './components/HeroSection/HeroSection';
import FeaturedDishes from './components/FeaturedDishes/FeaturedDishes';
import AboutUs from './components/AboutUs/AboutUs';
import Footer from './components/Footer/Footer';

// Páginas de Autenticação
import LoginPage from './pages/LoginPage/LoginPage';
import RegisterPage from './pages/RegisterPage/RegisterPage'; 

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
    // Envolve toda a aplicação no Router
    <Router>
      <div className="app-container">
        <Routes>
          
          {/* Rota 1: Landing Page (Home) - Inclui Navbar e Footer */}
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
          
          {/* Rota 2: Login Page - Layout completo de autenticação */}
          <Route path="/login" element={<LoginPage />} />
          
          {/* Rota 3: Register Page (Cadastro) - Layout completo de autenticação */}
          <Route path="/cadastro" element={<RegisterPage />} />
          
          {/* Rotas de placeholders para Menu e Pedidos */}
          <Route path="/pedidos" element={<div style={{padding: '50px', fontSize: '2rem'}}>Página de Pedidos em construção!</div>} />
          <Route path="/menu" element={<div style={{padding: '50px', fontSize: '2rem'}}>Página de Menu em construção!</div>} />
          
        </Routes>
      </div>
    </Router>
  );
}

export default App;