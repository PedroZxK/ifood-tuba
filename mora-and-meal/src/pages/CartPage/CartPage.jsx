import React from 'react';
import { useCart } from '../../hooks/useCart';
import styles from './CartPage.module.css';
import { Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthHook';

// 1. Importe os componentes Navbar e Footer
import Navbar from '../../components/Navbar/Navbar';
import Footer from '../../components/Footer/Footer';

const CartPage = () => {
    const { logout } = useAuth();
    const { cartItems, addToCart, decreaseQuantity, removeItem } = useCart();

    const getTotalPrice = () => {
        return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
    };

    return (
        <>
            <nav className={styles.navbar}>
                <Link to="/" className={styles.logo}>
                    <img src="/logo.png" alt="Mora & Meal Logo" className={styles.logoImage} />
                    <span className={styles.logoText}>Mora & Meal</span>
                </Link>
                <div className={styles.userIcons}>
                    <Link to="/cart">
                        <img src="/carrinho.png" alt="Carrinho" className={styles.navIcon} />
                    </Link>
                    <Link to="/profile">
                        <img src="/perfil.png" alt="Perfil" className={styles.navIcon} />
                    </Link>
                    <img src="/notificacao.png" alt="Notificação" className={styles.navIcon} />

                    <img
                        src="/porta.png"
                        alt="Sair"
                        className={styles.navIcon}
                        onClick={logout}
                        style={{ cursor: 'pointer' }}
                    />
                </div>
            </nav>

            <div className={styles.cartContainer}>
                <h2 className={styles.title}>Seu Carrinho</h2>

                {cartItems.length === 0 ? (
                    <p className={styles.emptyCart}>Seu carrinho está vazio. 😢</p>
                ) : (
                    <>
                        <div className={styles.cartItemsList}>
                            {cartItems.map((item) => (
                                <div key={item.name} className={styles.cartItem}>
                                    <img src={item.image} alt={item.name} className={styles.itemImage} />
                                    <div className={styles.itemDetails}>
                                        <p className={`${styles.itemName} bold-text`}>{item.name}</p>
                                        <p className={styles.itemPrice}>
                                            R$ {item.price.toFixed(2).replace('.', ',')}
                                        </p>
                                        <div className={styles.quantityControl}>
                                            <button onClick={() => decreaseQuantity(item.name)}>-</button>
                                            <span>{item.quantity}</span>
                                            <button onClick={() => addToCart(item)}>+</button>
                                        </div>
                                    </div>
                                    <button onClick={() => removeItem(item.name)} className={styles.removeButton}>
                                        Remover
                                    </button>
                                </div>
                            ))}
                        </div>
                        <div className={styles.totalContainer}>
                            <h3 className={`${styles.totalText} bold-text`}>Total: R$ {getTotalPrice().toFixed(2).replace('.', ',')}</h3>
                            <Link to="/pedidos" className={styles.checkoutButton}>
                                Finalizar Pedido
                            </Link>
                        </div>
                    </>
                )}
            </div>

            {/* 3. Adicione o componente Footer na base da página */}
            <Footer />
        </>
    );
};

export default CartPage;