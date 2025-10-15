import React, { useState } from 'react';
import styles from './ForgotPasswordPage.module.css'; // Vamos criar este arquivo a seguir
import { Link, useNavigate } from 'react-router-dom';
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from '../../firebase/config';

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handlePasswordReset = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);

    if (!email) {
      setError('Por favor, insira seu e-mail.');
      setLoading(false);
      return;
    }

    try {
      await sendPasswordResetEmail(auth, email);
      setSuccess('Link de redefinição de senha enviado! Por favor, verifique sua caixa de entrada.');
    } catch (error) {
      if (error.code === 'auth/user-not-found' || error.code === 'auth/invalid-email') {
        setError('Nenhum usuário encontrado com este e-mail.');
      } else {
        setError('Ocorreu um erro. Tente novamente.');
        console.error("Erro na redefinição de senha:", error);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={`${styles.container} ${styles.pageRoot}`}>
      <div className={styles.backButtonContainer}>
        <img
          src="/seta.png"
          alt="Voltar"
          className={styles.backButton}
          onClick={() => navigate('/login')}
        />
      </div>
      <div className={styles.formContainer}>
        <form className={styles.resetBox} onSubmit={handlePasswordReset}>
          <h2 className={`bold-text ${styles.title}`}>Redefinir Senha</h2>
          
          {error && <p className={styles.errorMessage}>{error}</p>}
          {success && <p className={styles.successMessage}>{success}</p>}

          <p className={styles.instructions}>
            Digite o e-mail associado à sua conta e enviaremos um link para redefinir sua senha.
          </p>

          <div className={styles.inputGroup}>
            <input 
              type="email" 
              placeholder="Email" 
              className={styles.inputField} 
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
              disabled={loading} 
            />
          </div>

          <button type="submit" className={`${styles.submitButton} bold-text`} disabled={loading}>
            {loading ? 'Enviando...' : 'Enviar Link de Redefinição'}
          </button>

          <p className={styles.loginLink}>
            Lembrou a senha?{" "}
            <Link to="/login" className={styles.loginAnchor}>
              Fazer Login
            </Link>
          </p>
        </form>
      </div>
      <div className={styles.imageContainer}>
        <img src="/xianLogin.png" alt="Mascote" className={styles.xianImage} />
        <div className={styles.imageOverlay}></div>
      </div>
    </div>
  );
};

export default ForgotPasswordPage;