// src/pages/OrderSuccessPage/OrderSuccessPage.jsx

import React from 'react';
import styles from './OrderSuccessPage.module.css';
import { Link } from 'react-router-dom';

// Componente Navbar do Menu (replicada aqui para consistência)
const MenuNavbar = () => (
    <nav className={styles.navbar}>
      <div className={styles.logoArea}>
        <Link to="/">
          <img src="/logo.png" alt="Mora & Meal Logo" className={styles.logoImage} />
          <span className={styles.logoText}>Mora & Meal</span>
        </Link>
      </div>
      
      <div className={styles.searchBar}>
        <img src="/lupa.png" alt="Buscar" className={styles.searchIcon} />
        <input type="text" placeholder="Buscar" className={styles.searchInput} />
      </div>
      
      <div className={styles.userIcons}>
        <img src="/carrinho.png" alt="Carrinho" className={styles.navIcon} />
        <img src="/perfil.png" alt="Perfil" className={styles.navIcon} />
        <img src="/notificacao.png" alt="Notificação" className={styles.navIcon} />
      </div>
    </nav>
);

// Componente Footer do Menu (replicada aqui para consistência)
const MenuFooter = () => (
    <footer className={styles.menuFooter}>
      {/* Footer simples e vazio */}
    </footer>
);

const OrderSuccessPage = () => {
  return (
    <div className={styles.successContainer}>
      <MenuNavbar />
      
      <main className={styles.mainContent}>
        <div className={styles.successBox}>
          <h2 className={`bold-text ${styles.successMessage}`}>Seu pedido foi feito com sucesso!</h2>
          <img src="/xianentrega.png" alt="Entrega de Pedido" className={styles.successImage} />
          {/* Opcional: Adicionar um botão para voltar ao menu ou à Home */}
          <Link to="/menu" className={styles.backToMenuButton}>
            Voltar ao Menu
          </Link>
        </div>
      </main>

      <MenuFooter />
    </div>
  );
};

export default OrderSuccessPage;