// src/pages/LoginPage/LoginPage.jsx

import React from 'react';
import styles from './LoginPage.module.css';
// Importa Link para redirecionamento e useNavigate
import { Link, useNavigate } from 'react-router-dom'; 

const LoginPage = () => {
  const navigate = useNavigate(); // Inicializa o hook de navegação

  // Função que simula o login e redireciona para a página de Menu
  const handleLogin = (e) => {
    e.preventDefault(); // Impede o comportamento padrão de formulário (recarregar)
    // Lógica de login simulada: Apenas redireciona
    navigate('/menu'); 
  };

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
            <img src="/google.png" alt="Google Logo" className={styles.googleIcon} />
            Sign in with Google
          </button>
          
          {/* Adicionamos o evento onClick para a função handleLogin */}
          <button 
            className={`${styles.submitButton} bold-text`}
            onClick={handleLogin} // <-- AQUI FAZ O REDIRECIONAMENTO
          >
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