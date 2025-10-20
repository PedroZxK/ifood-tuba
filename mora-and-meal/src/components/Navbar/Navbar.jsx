import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styles from './Navbar.module.css';
import { useAuth } from '../../contexts/AuthHook';
import { useCart } from '../../hooks/useCart'; // Importe o useCart
import { useMemo } from 'react'; // Importe o useMemo

const Navbar = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    
    // Pega os itens do carrinho para exibir o contador
    const { cartItems } = useCart();

    const totalItemsInCart = useMemo(() => {
        return cartItems.reduce((total, item) => total + item.quantity, 0);
    }, [cartItems]);

    // Função que lida com a confirmação antes de deslogar
    const handleLogoutConfirmation = () => {
        const isConfirmed = window.confirm("Você tem certeza que deseja sair?");
        if (isConfirmed) {
            logout();
            navigate('/login');
        }
    };

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <nav className={styles.navbar}>
            <div className={styles.logoArea}>
                <Link to="/" className={styles.logo}>
                    <img src="/logo.png" alt="Mora & Meal Logo" className={styles.logoImage} />
                    <span className={styles.logoText}>Mora & Meal</span>
                </Link>
            </div>

            <button className={styles.hamburger} onClick={toggleMenu}>
                &#9776;
            </button>

            <div className={`${styles.userIcons} ${isMenuOpen ? styles.active : ''}`}>
                {user ? (
                    <>
                        <Link to="/cart" className={`${styles.navLink} ${styles.cartIconContainer}`}>
                            <img src="/carrinho.png" alt="Carrinho" className={styles.navIcon} />
                            {totalItemsInCart > 0 && (
                                <span className={styles.cartBadge}>{totalItemsInCart}</span>
                            )}
                            <span className={styles.mobileOnly}>Carrinho</span>
                        </Link>
                        <Link to="/profile" className={styles.navLink}>
                            <img src="/perfil.png" alt="Perfil" className={styles.navIcon} />
                            <span className={styles.mobileOnly}>Perfil</span>
                        </Link>
                        {/* Atualiza o onClick para chamar a função de confirmação */}
                        <button onClick={handleLogoutConfirmation} className={`${styles.navLink} ${styles.logoutButton}`}>
                            <img src="/porta.png" alt="Sair" className={styles.navIcon} />
                            <span className={styles.mobileOnly}>Sair</span>
                        </button>
                    </>
                ) : (
                    <>
                        <Link to="/login" className={styles.authLink}>Entrar</Link>
                        <Link to="/register" className={`${styles.authLink} ${styles.registerButton}`}>Cadastrar</Link>
                    </>
                )}
            </div>
        </nav>
    );
};

export default Navbar;