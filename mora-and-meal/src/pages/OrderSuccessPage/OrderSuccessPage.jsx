// src/pages/OrderSuccessPage/OrderSuccessPage.jsx

import React from 'react';
import styles from './OrderSuccessPage.module.css';
import { Link } from 'react-router-dom';

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
      <Link to="/">
        <img src="/porta.png" alt="Sair" className={styles.navIcon} />
      </Link>
    </div>
  </nav>
);

const MenuFooter = () => (
  <footer className={styles.menuFooter}>
    <p>© 2025 Mora & Meal. Todos os direitos reservados.</p>
  </footer>
);

const OrderSuccessPage = () => {
  return (
    <div className={styles.successContainer}>
      <MenuNavbar />

      <main className={styles.mainContent}>
        <div className={styles.successBox}>
          <div className={styles.iconCircle}>
            <img src="/xianentrega.png" alt="Entrega de Pedido" className={styles.successImage} />
          </div>

          <h2 className={`bold-text ${styles.successMessage}`}>
            Pedido Confirmado com Sucesso!
          </h2>

          <p className={styles.successDescription}>
            Parabéns! Seu pedido foi realizado e está a caminho. Você receberá notificações sobre a entrega em tempo real.
          </p>

          <div className={styles.buttonGroup}>
            <Link to="/menu" className={styles.backToMenuButton}>
              Voltar ao Menu
            </Link>
            <Link to="/pedidos" className={styles.viewOrdersButton}>
              Ver Meus Pedidos
            </Link>
          </div>
        </div>
      </main>

      <MenuFooter />
    </div>
  );
};

export default OrderSuccessPage;
