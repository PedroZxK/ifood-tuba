import React, { useState, useMemo } from 'react';
import styles from './PedidosPage.module.css';
import { Link, useNavigate } from 'react-router-dom';

const DUMMY_CART = [
  { id: 1, name: "Swirling Steps", price: 75.00, qty: 1 },
  { id: 2, name: "Fukuuchi Udon", price: 80.00, qty: 2 },
  { id: 3, name: "Fish-Flavored Toast", price: 25.00, qty: 3 },
];

const PedidosPage = () => {
  const [selectedPayment, setSelectedPayment] = useState('Cartão de Crédito');
  const navigate = useNavigate();

  const total = useMemo(() => {
    return DUMMY_CART.reduce((sum, item) => sum + item.price * item.qty, 0);
  }, []);

  const handlePayment = () => {
    alert(`Pagamento de R$ ${total.toFixed(2).replace('.', ',')} efetuado com sucesso usando: ${selectedPayment}!`);
    navigate('/pedido-concluido');
  };

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

  return (
    <div className={styles.pedidosContainer}>
      <MenuNavbar />
      <main className={styles.mainContent}>
        <h1 className={`${styles.pageTitle} bold-text`}>Seus Pedidos</h1>

        <div className={styles.gridContainer}>
          { }
          <div className={styles.orderDetailsBox}>
            <div className={styles.header}>
              <img src="/xianmascote.png" alt="Mascote Xiangling" className={styles.headerIcon} />
              <h2 className={`bold-text ${styles.headerTitle}`}>Resumo do Pedido</h2>
            </div>
            <div className={styles.orderList}>
              {DUMMY_CART.map(item => (
                <div key={item.id} className={styles.orderItem}>
                  <p className={styles.itemName}>{item.name} (x{item.qty})</p>
                  <p className={styles.itemPrice}>R$ {(item.price * item.qty).toFixed(2).replace('.', ',')}</p>
                </div>
              ))}
            </div>
            <div className={styles.totalBox}>
              <span className={styles.totalText}>Total: R$ {total.toFixed(2).replace('.', ',')}</span>
            </div>
          </div>

          { }
          <div className={styles.paymentBox}>
            <div className={styles.header}>
              <img src="/escoffiermascote.png" alt="Escoffier Mascote" className={styles.headerIcon} />
              <h2 className={`bold-text ${styles.headerTitle}`}>Forma de Pagamento</h2>
            </div>

            <div className={styles.paymentOptions}>
              {[
                { name: 'Cartão de Crédito', img: '/cartao.png' },
                { name: 'Pix', img: '/pix.png' },
                { name: 'Dinheiro', img: '/dinheiro.png' }
              ].map((option) => (
                <div
                  key={option.name}
                  className={`${styles.optionBox} ${selectedPayment === option.name ? styles.selectedOption : ''}`}
                  onClick={() => setSelectedPayment(option.name)}
                >
                  <div className={styles.checkbox}>
                    <div className={selectedPayment === option.name ? styles.checked : ''}></div>
                  </div>
                  <span className={styles.optionText}>{option.name}</span>
                  <img
                    src={option.img}
                    alt={option.name}
                    className={styles.optionIcon}
                  />
                </div>
              ))}
            </div>


            <div className={styles.payButtonBox}>
              <button onClick={handlePayment} className={`${styles.payButton} bold-text`}>
                Pagar Agora
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default PedidosPage;
