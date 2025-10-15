import React, { useState, useMemo } from 'react';
import styles from './MenuPage.module.css';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthHook'; // 1. Importe o useAuth

const DISHES = [
  { name: "Swirling Steps", price: 75.00, image: "/prato1.png" },
  { name: "Pour la Justice", price: 200.00, image: "/prato2.png" },
  { name: "Fukuuchi Udon", price: 80.00, image: "/prato3.png" },
  { name: "Stunning Stratagem", price: 55.00, image: "/prato4.png" },
  { name: "Ethernal Dango", price: 95.00, image: "/prato5.png" },
  { name: "Fish-Flavored Toast", price: 25.00, image: "/prato6.png" },
  { name: "Fashion Show", price: 130.00, image: "/prato7.png" },
  { name: "Hearthfire's Trail", price: 95.00, image: "/prato8.png" },
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

const FILTERS = ["Mais Procurados", "Rotas de Entrega", "Faixa de Preço", "Preço Crescente", "Preço Decrescente"];

const MenuPage = () => {
  const [activeFilter, setActiveFilter] = useState("Mais Procurados");
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();
  const { logout } = useAuth();

  const filteredDishes = useMemo(() => {
    let list = [...DISHES];

    if (activeFilter === "Faixa de Preço") list = list.filter(d => d.price <= 100);
    else if (activeFilter === "Rotas de Entrega") list = list.slice(0, 6);
    else if (activeFilter === "Preço Crescente") list.sort((a, b) => a.price - b.price);
    else if (activeFilter === "Preço Decrescente") list.sort((a, b) => b.price - a.price);

    if (searchTerm.trim() !== "") {
      const term = searchTerm.toLowerCase();
      list = list.filter(d => d.name.toLowerCase().includes(term));
    }

    return list;
  }, [activeFilter, searchTerm]);

  return (
    <div className={styles.menuContainer}>
      { }
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

        <div className={styles.userIcons}>
          <img src="/carrinho.png" alt="Carrinho" className={styles.navIcon} />
          <img src="/perfil.png" alt="Perfil" className={styles.navIcon} />
          <img src="/notificacao.png" alt="Notificação" className={styles.navIcon} />

          {/* CORREÇÃO APLICADA AQUI */}
          <img
            src="/porta.png"
            alt="Sair"
            className={styles.navIcon}
            onClick={logout} // Adicionado o onClick para chamar a função
            style={{ cursor: 'pointer' }}
          />
        </div>
      </nav>

      { }
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

      { }
      <section className={styles.promotionSection}>
        <div className={styles.promoContent}>
          <h2 className={`${styles.promoTitle} bold-text`}>Promoções do Dia</h2>
          <div className={styles.promoTextContainer}>
            <img src="/promocao.png" alt="Promo" className={styles.promoImageText} />
            <p className={styles.promoDishText}>Faith Eternal</p>
          </div>
        </div>
        <div className={styles.promoImageContainer}>
          <img src="/faitheternal.png" alt="Prato Promoção" className={styles.promoDishImage} />
        </div>
      </section>
      <div className={styles.peçaJaContainer}>
        <button
          className={`${styles.promoButton} bold-text`}
          onClick={() => navigate('/pedidos')}
        >
          Peça Já!
        </button>
      </div>

      { }
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
              <button className={styles.addToCartButton}>Adicionar</button>
            </div>
          ))}
          {filteredDishes.length === 0 && (
            <p className={styles.noResults}>Nenhum prato encontrado 😢</p>
          )}
        </div>
      </section>

      { }
      <footer className={styles.menuFooter}></footer>
    </div>
  );
};

export default MenuPage;
