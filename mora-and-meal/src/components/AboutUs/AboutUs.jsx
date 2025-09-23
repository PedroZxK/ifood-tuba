import React from 'react';
import styles from './AboutUs.module.css';

const AboutUs = () => {
  return (
    <section className={styles.aboutUs}>
      <div className={styles.leftImage}>
        <img src="/xianglingPresentation3.png" alt="Xiangling" />
      </div>
      <div className={styles.rightContent}>
        <div className={styles.header}>
          <h2 className={`${styles.title} bold-text`}>A perfeição tem um sabor. Descubra-o em <span className={styles.underline}>Mora & Meals</span></h2>
          <img src="/escoffier.png" alt="Escoffier" className={styles.escoffierImage} />
        </div>
        <p className={styles.description}>
          Em cada prato, recriamos a paixão de um Viajante, a sabedoria de um Arconte e a coragem dos aventureiros que exploram um mundo de sabores. Nossa cozinha é uma ode às nações de Genshin Impact, transformando ingredientes simples em experiências gastronômicas que inspiram novas jornadas.
        </p>
        <p className={`${styles.finalText} bold-text`}>
          No Mora & Meals, a receita perfeita não é um segredo é uma experiência
        </p>
      </div>
    </section>
  );
};

export default AboutUs;