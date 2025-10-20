import React from 'react';
import styles from './OrderSuccessPage.module.css';
import { Link } from 'react-router-dom';

import Navbar from '../../components/Navbar/Navbar';
import Footer from '../../components/Footer/Footer';

const OrderSuccessPage = () => {
  return (
    <div className={styles.successContainer}>
      <Navbar />

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

      <Footer />
    </div>
  );
};

export default OrderSuccessPage;
