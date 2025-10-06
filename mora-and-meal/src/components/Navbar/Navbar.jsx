import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Navbar.module.css';

const Navbar = () => {
  return (
    <nav className={styles.navbar}>
      <Link to="/" className={styles.logo}>
        <img src="/logo.png" alt="Mora & Meal Logo" className={styles.logoImage} />
        <span className={styles.logoText}>Mora & Meal</span>
      </Link>

      <ul className={styles.navLinks}>
        <li><Link to="/menu" className={styles.navItem}>Home</Link></li>
        <li><Link to="/cadastro" className={styles.navItem}>Cadastro</Link></li>
        <li><Link to="/login" className={styles.navItem}>Login</Link></li>
      </ul>
    </nav>
  );
};

export default Navbar;
