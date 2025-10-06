import React from 'react';
import styles from './FeaturedDishes.module.css';

const FeaturedDishes = () => {
  return (
    <section className={styles.featuredDishes}>
      <div className={styles.leftContent}>
        <div className={styles.header}>
          <img src="/klee.png" alt="Klee" className={styles.kleeImage} />
          <h2 className={`${styles.title} bold-text`}>Apresentamos nossas melhores sugestões!!</h2>
        </div>
        <div className={styles.dishList}>
          <div className={styles.dishItem}>
            <img src="/tofuFrito.png" alt="Tofu Frito" className={styles.dishImage} />
            <p>O Tofu Frito daqui é feito especialmente pela solene Senhora Kitsune</p>
          </div>
          <div className={styles.dishItem}>
            <img src="/proustis.png" alt="Proustis" className={styles.dishImage} />
            <p>"Proustis" seu sabor em camadas parece oscilar como as ondas do mar</p>
          </div>
          <div className={styles.dishItem}>
            <img src="/dancaEspiral.png" alt="Dança Espiral" className={styles.dishImage} />
            <p>"Dança Espiral" É um pudim macio com uma cor avermelhada que remete à dança de Nilou.</p>
          </div>
        </div>
      </div>
      <div className={styles.rightImage}>
        <div className={styles.imageOverlay}></div>
        <img src="/xianglingPresentation2.png" alt="Xiangling" className={styles.xiangImage} />
      </div>
    </section>
  );
};

export default FeaturedDishes;
