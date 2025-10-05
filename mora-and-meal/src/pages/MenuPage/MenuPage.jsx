// src/pages/MenuPage/MenuPage.jsx (ATUALIZADO)

import React, { useState, useMemo } from 'react';
import styles from './MenuPage.module.css';
// Importa Link e useNavigate
import { Link, useNavigate } from 'react-router-dom'; 

// Dados estáticos dos pratos
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

const FILTERS = ["Mais Procurados", "Rotas de Entrega", "Faixa de Preço"];

const MenuPage = () => {
    const [activeFilter, setActiveFilter] = useState("Mais Procurados");
    const [searchTerm, setSearchTerm] = useState("");
    const navigate = useNavigate(); // Inicializa o hook de navegação
  
    const getFilteredDishes = useMemo(() => {
      // ... (lógica de filtro permanece igual) ...
      let list = DISHES;
      
      // 1. Aplicar filtro de Categoria/Preço/Outros
      if (activeFilter === "Faixa de Preço") {
        list = list.filter(dish => dish.price <= 100);
      } else if (activeFilter === "Rotas de Entrega") {
        list = list.slice(0, 6);
      } 
      
      // 2. Aplicar filtro de Pesquisa (sempre aplicado)
      if (searchTerm.trim() !== "") {
        const lowerCaseSearch = searchTerm.toLowerCase();
        list = list.filter(dish => 
          dish.name.toLowerCase().includes(lowerCaseSearch)
        );
      }
      
      return list;
    }, [activeFilter, searchTerm]); 
    
    // Função para redirecionar
    const handleOrderClick = () => {
      navigate('/pedidos');
    };
  
    const filteredDishes = getFilteredDishes;
  
    return (
      <div className={styles.menuContainer}>
        
        {/* 1. Navbar do Menu (Top Bar) - Permanece igual */}
        <nav className={styles.navbar}>
          <div className={styles.logoArea}>
            <Link to="/">
              <img src="/logo.png" alt="Mora & Meal Logo" className={styles.logoImage} />
              <span className={styles.logoText}>Mora & Meal</span>
            </Link>
          </div>
          
          <div className={styles.searchBar}>
            <img src="/lupa.png" alt="Buscar" className={styles.searchIcon} />
            <input 
              type="text" 
              placeholder="Buscar" 
              className={styles.searchInput} 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <div className={styles.userIcons}>
            <img src="/carrinho.png" alt="Carrinho" className={styles.navIcon} />
            <img src="/perfil.png" alt="Perfil" className={styles.navIcon} />
            <img src="/notificacao.png" alt="Notificação" className={styles.navIcon} />
          </div>
        </nav>
  
        <main className={styles.mainContent}>
          
          {/* 2. Seção de Categorias - Permanece igual */}
          <section className={styles.categoriesSection}>
            {CATEGORIES.map(category => (
              <div key={category.name} className={styles.categoryItem}>
                <div className={styles.categoryCircle}>
                  <img src={category.image} alt={category.name} className={styles.categoryIcon} />
                </div>
                <p>{category.name}</p>
              </div>
            ))}
          </section>
  
          {/* 3. Seção de Promoção do Dia */}
          <section className={styles.promotionSection}>
            <div className={styles.promoContent}>
              <h2 className={`${styles.promoTitle} bold-text`}>Promoções do dia</h2>
              <div className={styles.promoTextContainer}>
                <img src="/promocao.png" alt="Bandeira Faith Eternal" className={styles.promoImageText} />
                <p className={styles.promoDishText}>Faith Eternal</p> 
              </div>
              {/* O BOTÃO AGORA REDIRECIONA PARA /pedidos */}
              <button 
                  className={`${styles.promoButton} bold-text`}
                  onClick={handleOrderClick} // <-- NOVO: Redireciona para /pedidos
              >
                  Peça Já!
              </button>
            </div>
            <div className={styles.promoImageContainer}>
              <img src="/faitheternal.png" alt="Prato Faith Eternal" className={styles.promoDishImage} />
            </div>
          </section>
  
          {/* 4. Seção de Filtros e Pratos - Permanece igual */}
          <section className={styles.dishesSection}>
            <h3 className={`${styles.filtersTitle} bold-text`}>Filtros</h3>
            
            <div className={styles.filterBar}>
              {FILTERS.map(filter => (
                <button 
                  key={filter}
                  className={`${styles.filterButton} ${activeFilter === filter ? styles.activeFilter : ''}`}
                  onClick={() => setActiveFilter(filter)} 
                >
                  {filter}
                </button>
              ))}
            </div>
  
            <div className={styles.dishGrid}>
              {filteredDishes.map((dish, index) => (
                <div key={index} className={styles.dishCard}>
                  <img src={dish.image} alt={dish.name} className={styles.dishImage} />
                  <p className={`${styles.dishName} bold-text`}>{dish.name}</p>
                  <p className={styles.dishPrice}>R$ {dish.price.toFixed(2).replace('.', ',')}</p>
                  <button className={`${styles.addToCartButton} bold-text`}>Adicionar ao Carrinho</button>
                </div>
              ))}
              {filteredDishes.length === 0 && (
                <p className={styles.noResults}>Nenhum prato encontrado com base na sua busca ou filtro.</p>
              )}
            </div>
          </section>
        </main>
  
        {/* 5. Footer da Página - Permanece igual */}
        <footer className={styles.menuFooter}>
          {/* Footer simples e vazio conforme descrito */}
        </footer>
      </div>
    );
  };
  
  export default MenuPage;