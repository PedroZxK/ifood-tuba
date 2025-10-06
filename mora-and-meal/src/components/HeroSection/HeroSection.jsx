import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './HeroSection.module.css';

export default function HeroSection() {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/menu");
  };

  return (
    <section className={styles.heroSection}>
      <div className={styles.overlay}>
        <h1 className={`${styles.welcomeText} bold-text`}>
          Bem-vindos ao Mora & Meals, o seu refúgio culinário
        </h1>
        <div className={styles.ctaContainer}>
          <img src="/guoba.png" alt="Guoba" className={styles.guobaImage} />
          <button className={styles.ctaButton} onClick={handleClick}>
            Peça Aqui!
          </button>
        </div>
      </div>
    </section>
  );
}
