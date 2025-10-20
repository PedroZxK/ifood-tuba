import React from 'react';
import styles from './HeroSection.module.css';
import { Link, useNavigate } from 'react-router-dom';

const HeroSection = () => {
  const navigate = useNavigate();

  return (
    <section className={styles.heroSection}>
      <div className={styles.overlay}>
        <h1 className={`${styles.welcomeText} bold-text`}>
          Bem-vindos ao Mora & Meal, o seu refúgio culinário
        </h1>
        <div className={styles.ctaContainer}>
          <img src="/guoba.png" alt="Guoba" className={styles.guobaImage} />
          <button className={styles.ctaButton} onClick={() => navigate('/menu')}>Peça Aqui!</button>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;