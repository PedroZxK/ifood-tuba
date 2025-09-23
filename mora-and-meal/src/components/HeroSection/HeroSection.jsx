import React from 'react';
import styles from './HeroSection.module.css';

const HeroSection = () => {
  return (
    <section className={styles.heroSection}>
      <img src="/xianglingPresentation.png" alt="Xiangling" className={styles.heroImage} />
      <div className={styles.overlay}>
        <h1 className={`${styles.welcomeText} bold-text`}>
          Bem-vindos ao Mora & Meals, o seu refúgio culinário
        </h1>
        <div className={styles.ctaContainer}>
          <img src="/guoba.png" alt="Guoba" className={styles.guobaImage} />
          <button className={styles.ctaButton}>Peça Aqui!</button>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;