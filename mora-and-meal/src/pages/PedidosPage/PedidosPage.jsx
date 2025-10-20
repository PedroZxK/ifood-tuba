import React, { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../../hooks/useCart';
import styles from './PedidosPage.module.css';

// ▼▼▼ Importe o componente Navbar reutilizável ▼▼▼
import Navbar from '../../components/Navbar/Navbar';

const PedidosPage = () => {
    const { cartItems, clearCart } = useCart();
    const [selectedPayment, setSelectedPayment] = useState('Cartão de Crédito');

    const total = useMemo(() => {
        return cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
    }, [cartItems]);

    // O 'MenuNavbar' local, o 'isMenuOpen' e o 'totalItemsInCart' foram removidos daqui,
    // pois o componente <Navbar /> já cuida de tudo isso.

    return (
        <div className={styles.pedidosContainer}>
            {/* ▼▼▼ Use o componente Navbar centralizado aqui ▼▼▼ */}
            <Navbar />

            <main className={styles.mainContent}>
                <h1 className={`${styles.pageTitle} bold-text`}>Carrinho</h1>
                <div className={styles.gridContainer}>
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
                                to="/order-success" // Ajuste o link para a página de sucesso correta
                                className={`${styles.payButton} bold-text`}
                                onClick={(e) => {
                                    if (cartItems.length === 0) {
                                        e.preventDefault();
                                        alert('Seu carrinho está vazio 😢');
                                        return;
                                    }
                                    alert(`Pagamento de R$ ${total.toFixed(2).replace('.', ',')} efetuado com sucesso usando: ${selectedPayment}!`);
                                    clearCart();
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