import React from 'react';
import styles from './LoginPage.module.css';
import { Link } from 'react-router-dom'; // Importa Link para redirecionamento

const LoginPage = () => {
  return (
    <div className={styles.container}>
      {/* Imagem no lado esquerdo com fade-out para a direita */}
      <div className={styles.imageContainer}>
        <div className={styles.imageOverlay}></div> {/* Para o efeito de gradiente */}
        <img src="/xianLogin.png" alt="Xiangling e Guoba" className={styles.xianImage} />
      </div>

      {/* Formulário de Login no lado direito */}
      <div className={styles.formContainer}>
        <div className={styles.loginBox}>
          <h2 className={`bold-text ${styles.title}`}>Bem-vindo!</h2>
          
          <div className={styles.inputGroup}>
            <input type="email" placeholder="Email" className={styles.inputField} />
          </div>
          <div className={styles.inputGroup}>
            <input type="password" placeholder="Senha" className={styles.inputField} />
          </div>

          <button className={styles.googleButton}>
            <img src="https://upload.wikimedia.org/wikipedia/commons/4/4a/Logo_Google_g_standard.png" alt="Google Logo" className={styles.googleIcon} />
            Sign in with Google
          </button>
          
          <button className={`${styles.submitButton} bold-text`}>
            Entrar
          </button>
          
          <p className={styles.registerLink}>
            Não tem uma conta? <Link to="/cadastro">Registre-se aqui!</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;