import React, { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../../hooks/useCart';
import { useAuth } from '../../contexts/AuthHook';
import styles from './PedidosPage.module.css';

const PedidosPage = () => {
  const { cartItems, clearCart } = useCart(); // Pega os itens reais do carrinho
  const [selectedPayment, setSelectedPayment] = useState('Cartão de Crédito');
  // const navigate = useNavigate();
  const { logout } = useAuth();

  const total = useMemo(() => {
    return cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  }, [cartItems]);

  // const handlePayment = () => {
  //   if (cartItems.length === 0) return alert('Seu carrinho está vazio 😢');

  //   alert(`Pagamento de R$ ${total.toFixed(2).replace('.', ',')} efetuado com sucesso usando: ${selectedPayment}!`);
  //   clearCart(); // Limpa o carrinho após finalizar
  //   navigate('/pedido-concluido');
  // };

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
        <Link to="/cart">
          <img src="/carrinho.png" alt="Carrinho" className={styles.navIcon} />
        </Link>
        <Link to="/profile">
          <img src="/perfil.png" alt="Perfil" className={styles.navIcon} />
        </Link>
        <img src="/notificacao.png" alt="Notificação" className={styles.navIcon} />
        <img src="/porta.png" alt="Sair" className={styles.navIcon} onClick={logout} />
      </div>
    </nav>
  );

  return (
    <div className={styles.pedidosContainer}>
      <MenuNavbar />
      <main className={styles.mainContent}>
        <h1 className={`${styles.pageTitle} bold-text`}>Seus Pedidos</h1>

        <div className={styles.gridContainer}>
          {/* Resumo do Pedido */}
          <div className={styles.orderDetailsBox}>
            <div className={styles.header}>
              <img src="/xianmascote.png" alt="Mascote Xiangling" className={styles.headerIcon} />
              <h2 className={`bold-text ${styles.headerTitle}`}>Resumo do Pedido</h2>
            </div>

            <div className={styles.orderList}>
              {cartItems.length === 0 ? (
                <p style={{ textAlign: 'center', color: '#555' }}>Seu carrinho está vazio 😢</p>
              ) : (
                cartItems.map(item => (
                  <div key={item.name} className={styles.orderItem}>
                    <p className={styles.itemName}>{item.name} (x{item.quantity})</p>
                    <p className={styles.itemPrice}>R$ {(item.price * item.quantity).toFixed(2).replace('.', ',')}</p>
                  </div>
                ))
              )}
            </div>

            <div className={styles.totalBox}>
              <span className={styles.totalText}>Total: R$ {total.toFixed(2).replace('.', ',')}</span>
            </div>
          </div>

          {/* Forma de Pagamento */}
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
              ].map(option => (
                <div
                  key={option.name}
                  className={`${styles.optionBox} ${selectedPayment === option.name ? styles.selectedOption : ''}`}
                  onClick={() => setSelectedPayment(option.name)}
                >
                  <div className={styles.checkbox}>
                    <div className={selectedPayment === option.name ? styles.checked : ''}></div>
                  </div>
                  <span className={styles.optionText}>{option.name}</span>
                  <img src={option.img} alt={option.name} className={styles.optionIcon} />
                </div>
              ))}
            </div>

            <div className={styles.payButtonBox}>
              <Link
                to="/pedido-concluido"
                className={`${styles.payButton} bold-text`}
                onClick={(e) => {
                  if (cartItems.length === 0) {
                    e.preventDefault(); // Impede o redirecionamento
                    alert('Seu carrinho está vazio 😢');
                    return;
                  }
                  alert(`Pagamento de R$ ${total.toFixed(2).replace('.', ',')} efetuado com sucesso usando: ${selectedPayment}!`);
                  clearCart(); // Limpa o carrinho após finalizar
                }}
              >
                Pagar Agora
              </Link>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default PedidosPage;
