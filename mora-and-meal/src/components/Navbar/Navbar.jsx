import React from 'react';
// Importa o Link para navegação interna
import { Link } from 'react-router-dom'; 
import styles from './Navbar.module.css';

const Navbar = () => {
  return (
    <nav className={styles.navbar}>
      <div className={styles.logo}>
        {/* Usamos <Link> no logo para voltar para a Home */}
        <Link to="/" className={styles.logoLink}>
          <img src="/logo.png" alt="Mora & Meal Logo" className={styles.logoImage} />
          <span className={styles.logoText}>Mora & Meal</span>
        </Link>
      </div>
      <ul className={styles.navLinks}>
        {/* Agora todos os itens de navegação usam <Link> e apontam para as rotas corretas */}
        <li><Link to="/">Home</Link></li>
        <li><Link to="/pedidos">Pedidos</Link></li>
        <li><Link to="/menu">Menu</Link></li>
        {/* Links de Autenticação */}
        <li><Link to="/cadastro">Cadastro</Link></li>
        <li><Link to="/login">Login</Link></li>
      </ul>
    </nav>
  );
};

export default Navbar;