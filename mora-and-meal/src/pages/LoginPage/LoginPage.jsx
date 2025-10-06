import React from 'react';
import styles from './LoginPage.module.css';
import { Link, useNavigate } from 'react-router-dom';

const LoginPage = () => {
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    navigate('/menu');
  };

  return (
    <div className={`${styles.container} ${styles.pageRoot}`}>
      <div className={styles.backButtonContainer}>
        <img
          src="/seta.png"
          alt="Voltar"
          className={styles.backButton}
          onClick={() => window.location.href = '/'}
        />
      </div>
      <div className={styles.imageContainer}>
        <div className={styles.imageOverlay}></div>
        <img src="/xianLogin.png" alt="Xiangling e Guoba" className={styles.xianImage} />
      </div>

      <div className={styles.formContainer}>
        <div className={styles.loginBox}>
          <h2 className={`bold-text ${styles.title}`}>Bem-vindo!</h2>

          <div className={styles.inputGroup}>
            <input type="email" placeholder="Email" className={styles.inputField} />
          </div>
          <div className={styles.inputGroup}>
            <input type="password" placeholder="Senha" className={styles.inputField} />
          </div>

          <button className={styles.googleButton} onClick={handleLogin}>
            <img src="/google.png" alt="Google Logo" className={styles.googleIcon} />
            Sign in with Google
          </button>


          <button
            className={`${styles.submitButton} bold-text`}
            onClick={handleLogin}
          >
            Entrar
          </button>

          <p className={styles.registerLink}>
            Não tem uma conta? <Link to="/cadastro" className={styles.registerAnchor}>Registre-se aqui!</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
