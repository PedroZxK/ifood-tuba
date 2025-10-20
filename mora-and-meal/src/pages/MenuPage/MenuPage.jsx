import React, { useState, useMemo } from 'react';
import styles from './MenuPage.module.css';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthHook';
import { useCart } from '../../hooks/useCart';
import Footer from '../../components/Footer/Footer';

const DISHES = [
    { name: "Dança Espiral", price: 75.00, image: "/prato1.png" },
    { name: "Proustis", price: 200.00, image: "/prato2.png" },
    { name: "Fukuuchi Udon", price: 80.00, image: "/prato3.png" },
    { name: "Estratagema Impressionante", price: 55.00, image: "/prato4.png" },
    { name: "Dango de Três Cores", price: 95.00, image: "/prato5.png" },
    { name: "Torrada de Peixe", price: 25.00, image: "/prato6.png" },
    { name: "Show de Moda", price: 130.00, image: "/prato7.png" },
    { name: "Trilha do Fogo do Lar", price: 95.00, image: "/prato8.png" },
    { name: "Halvamazd", price: 65.00, image: "/prato9.png" },
];

const CATEGORIES = [
    { name: "Hambúrguer", image: "/hamburguer.png" },
    { name: "Sushi", image: "/sushi.png" },
    { name: "Salada", image: "/salada.png" },
    { name: "Pizza", image: "/pizza.png" },
    { name: "Sobremesas", image: "/sobremesas.png" },
    { name: "Bônus", image: "/bonus.png" },
];

const FILTERS = ["Mais Procurados", "Preço Crescente", "Preço Decrescente"];

const MenuPage = () => {
    const [activeFilter, setActiveFilter] = useState("Mais Procurados");
    const [searchTerm, setSearchTerm] = useState("");
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const navigate = useNavigate();
    const { logout } = useAuth();
    const { cartItems, addToCart } = useCart();

    const totalItemsInCart = useMemo(() => {
        return cartItems.reduce((total, item) => total + item.quantity, 0);
    }, [cartItems]);

    const filteredDishes = useMemo(() => {
        let list = [...DISHES];
        if (activeFilter === "Preço Crescente") list.sort((a, b) => a.price - b.price);
        else if (activeFilter === "Preço Decrescente") list.sort((a, b) => b.price - a.price);
        if (searchTerm.trim() !== "") {
            const term = searchTerm.toLowerCase();
            list = list.filter(d => d.name.toLowerCase().includes(term));
        }
        return list;
    }, [activeFilter, searchTerm]);

    return (
        <div className={styles.menuContainer}>
            <nav className={styles.navbar}>
                <Link to="/" className={styles.logo}>
                    <img src="/logo.png" alt="Mora & Meal Logo" className={styles.logoImage} />
                    <span className={styles.logoText}>Mora & Meal</span>
                </Link>
                <div className={styles.searchBar}>
                    <img src="/lupa.png" alt="Buscar" className={styles.searchIcon} />
                    <input
                        type="text"
                        placeholder="Buscar pratos..."
                        className={styles.searchInput}
                        value={searchTerm}
                        onChange={e => setSearchTerm(e.target.value)}
                    />
                </div>

                <button className={styles.hamburgerButton} onClick={() => setIsMenuOpen(!isMenuOpen)}>
                    &#9776;
                </button>

                <div className={`${styles.userIcons} ${isMenuOpen ? styles.active : ''}`}>
                    <Link to="/cart" className={`${styles.navLink} ${styles.cartIconContainer}`}>
                        <img src="/carrinho.png" alt="Carrinho" className={styles.navIcon} />
                        {totalItemsInCart > 0 && (
                            <span className={styles.cartBadge}>{totalItemsInCart}</span>
                        )}
                        <span className={styles.navLinkText}>Carrinho</span>
                    </Link>
                    <Link to="/profile" className={styles.navLink}>
                        <img src="/perfil.png" alt="Perfil" className={styles.navIcon} />
                        <span className={styles.navLinkText}>Perfil</span>
                    </Link>
                    <div onClick={logout} className={styles.navLink} style={{ cursor: 'pointer' }}>
                        <img src="/porta.png" alt="Sair" className={styles.navIcon} />
                        <span className={styles.navLinkText}>Sair</span>
                    </div>
                </div>
            </nav>

            <section className={styles.categoriesSection}>
                {CATEGORIES.map(cat => (
                    <div key={cat.name} className={styles.categoryItem}>
                        <div className={styles.categoryCircle}>
                            <img src={cat.image} alt={cat.name} className={styles.categoryIcon} />
                        </div>
                        <p>{cat.name}</p>
                    </div>
                ))}
            </section>

            <section className={styles.promotionSection}>
                <div className={styles.promoContent}>
                    <h2 className={`${styles.promoTitle} bold-text`}>Promoções do Dia</h2>
                </div>
                <div className={styles.promoImageContainer}>
                    <img src="/faitheternal.png" alt="Prato Promoção" className={styles.promoDishImage} />
                </div>
                <div className={styles.peçaJaContainer}>
                    <button
                        className={`${styles.promoButton} bold-text`}
                        onClick={() => navigate('/pedidos')}
                    >
                        Peça Já!
                    </button>
                </div>
            </section>

            <section className={styles.dishesSection}>
                <h3 className={`${styles.filtersTitle} bold-text`}>Filtros</h3>
                <div className={styles.filterBar}>
                    {FILTERS.map(f => (
                        <button
                            key={f}
                            className={`${styles.filterButton} ${activeFilter === f ? styles.activeFilter : ''}`}
                            onClick={() => setActiveFilter(f)}
                        >
                            {f}
                        </button>
                    ))}
                </div>
                <div className={styles.dishGrid}>
                    {filteredDishes.map((dish, idx) => (
                        <div key={idx} className={styles.dishCard}>
                            <img src={dish.image} alt={dish.name} className={styles.dishImage} />
                            <p className={`${styles.dishName} bold-text`}>{dish.name}</p>
                            <p className={styles.dishPrice}>R$ {dish.price.toFixed(2).replace('.', ',')}</p>
                            <button onClick={() => addToCart(dish)} className={styles.addToCartButton}>Adicionar</button>
                        </div>
                    ))}
                    {filteredDishes.length === 0 && (
                        <p className={styles.noResults}>Nenhum prato encontrado 😢</p>
                    )}
                </div>
            </section>

            <Footer />
        </div>
    );
};

export default MenuPage;