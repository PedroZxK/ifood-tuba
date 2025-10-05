// src/pages/PedidosPage/PedidosPage.jsx (AJUSTADO)

import React, { useState, useMemo } from 'react';
import styles from './PedidosPage.module.css';
import { Link, useNavigate } from 'react-router-dom';

// Dados simulados do carrinho
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
      // NOVO: Redireciona para a página de sucesso após o pagamento
      navigate('/pedido-concluido'); 
    };

  // Componente Navbar do Menu (replicada)
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

  return (
    <div className={styles.pedidosContainer}>
      <MenuNavbar />
      
      <main className={styles.mainContent}>
        <h1 className={`${styles.pageTitle} bold-text`}>Seus pedidos</h1>
        
        <div className={styles.gridContainer}>
          
          {/* Coluna Esquerda: Detalhes do Pedido / Total (inalterada) */}
          <div className={styles.orderDetailsBox}>
            <div className={`${styles.header} ${styles.orderHeader}`}>
              <img src="/xianmascote.png" alt="Mascote Xiangling" className={styles.headerIcon} />
              <h2 className={`bold-text ${styles.headerTitle}`}>Total</h2>
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
              <span className={styles.totalText}>R$ {total.toFixed(2).replace('.', ',')}</span>
            </div>
          </div>
          
          {/* Coluna Direita: Formas de Pagamento (Imagem ajustada) */}
          <div className={styles.paymentBox}>
            <div className={`${styles.header} ${styles.paymentHeader}`}>
              {/* CORREÇÃO: Usando a nova imagem escoffiermascote.png */}
              <img src="/escoffiermascote.png" alt="Escoffier Mascote" className={styles.headerIcon} />
              <h2 className={`bold-text ${styles.headerTitle}`}>Forma de Pagamento</h2>
            </div>
            
            {/* Opções de Pagamento (inalteradas) */}
            <div className={styles.paymentOptions}>
              
              <div 
                className={`${styles.optionBox} ${selectedPayment === 'Cartão de Crédito' ? styles.selectedOption : ''}`} 
                onClick={() => setSelectedPayment('Cartão de Crédito')}
              >
                <div className={styles.checkbox}>
                  <div className={selectedPayment === 'Cartão de Crédito' ? styles.checked : ''}></div>
                </div>
                <span className={styles.optionText}>Cartão de Crédito</span>
                <img src="/cartao.png" alt="Cartão" className={styles.optionIcon} />
              </div>
              
              <div 
                className={`${styles.optionBox} ${selectedPayment === 'Pix' ? styles.selectedOption : ''}`} 
                onClick={() => setSelectedPayment('Pix')}
              >
                <div className={styles.checkbox}>
                  <div className={selectedPayment === 'Pix' ? styles.checked : ''}></div>
                </div>
                <span className={styles.optionText}>Pagar com Pix</span>
                <img src="/pix.png" alt="Pix" className={styles.optionIcon} />
              </div>

              <div 
                className={`${styles.optionBox} ${selectedPayment === 'Dinheiro' ? styles.selectedOption : ''}`} 
                onClick={() => setSelectedPayment('Dinheiro')}
              >
                <div className={styles.checkbox}>
                  <div className={selectedPayment === 'Dinheiro' ? styles.checked : ''}></div>
                </div>
                <span className={styles.optionText}>Pagar com Dinheiro</span>
                <img src="/dinheiro.png" alt="Dinheiro" className={styles.optionIcon} />
              </div>
            </div>

            {/* Botão Pagar (inalterado) */}
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