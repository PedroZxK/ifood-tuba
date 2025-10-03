import React from 'react';
import styles from './RegisterPage.module.css';
import { Link } from 'react-router-dom';

const RegisterPage = () => {
  return (
    <div className={styles.container}>
      {/* Formulário de Cadastro no lado esquerdo */}
      <div className={styles.formContainer}>
        <div className={styles.registerBox}>
          <h2 className={`bold-text ${styles.title}`}>Registre-se</h2>
          
          <div className={styles.inputGroup}>
            <input type="email" placeholder="Email" className={styles.inputField} />
          </div>
          <div className={styles.inputGroup}>
            <input type="password" placeholder="Senha" className={styles.inputField} />
          </div>
          <div className={styles.inputGroup}>
            <input type="password" placeholder="Confirmar Senha" className={styles.inputField} />
          </div>
          <div className={styles.inputGroup}>
            <input type="text" placeholder="Nome" className={styles.inputField} />
          </div>
          
          <button className={`${styles.submitButton} bold-text`}>
            Registrar
          </button>

          <p className={styles.loginLink}>
            Já tem uma conta? <Link to="/login">Entre agora!</Link>
          </p>
        </div>
      </div>

      {/* Imagem no lado direito com fade-out para a esquerda */}
      <div className={styles.imageContainer}>
        <img src="/xianCadastro.png" alt="Xiangling com Prato" className={styles.xianImage} />
        {/* Adiciona o overlay de gradiente POR CIMA da imagem */}
        <div className={styles.imageOverlay}></div> 
      </div>
    </div>
  );
};

export default RegisterPage;