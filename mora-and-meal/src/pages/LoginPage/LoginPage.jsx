import React, { useState } from 'react';
import styles from './LoginPage.module.css';
import { Link, useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword } from "firebase/auth";
import { doc, updateDoc, getDoc } from "firebase/firestore";
import { auth, db } from '../../firebase/config';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      if (!user.emailVerified) {
        setError('Seu e-mail ainda não foi verificado. Por favor, cheque sua caixa de entrada.');
        setLoading(false);
        return;
      }

      const userDocRef = doc(db, 'users', user.uid);
      const userDoc = await getDoc(userDocRef);

      // Atualiza o Firestore apenas se o status lá for 'false'
      if (userDoc.exists() && !userDoc.data().emailVerified) {
        await updateDoc(userDocRef, {
          emailVerified: true
        });
      }

      navigate('/');

    } catch (error) {
      if (error.code === 'auth/user-not-found' || error.code === 'auth/wrong-password' || error.code === 'auth/invalid-credential') {
        setError('E-mail ou senha inválidos.');
      } else {
        setError('Ocorreu um erro ao fazer login.');
        console.error("Erro no login:", error);
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
            onClick={() => navigate('/')}
            />
        </div>
        <div className={styles.formContainer}>
            <form className={styles.loginBox} onSubmit={handleLogin}>
                <h2 className={`bold-text ${styles.title}`}>Entre</h2>
                
                {error && <p className={styles.errorMessage}>{error}</p>}

                <div className={styles.inputGroup}>
                    <input type="email" placeholder="Email" className={styles.inputField} value={email} onChange={(e) => setEmail(e.target.value)} disabled={loading} />
                </div>
                <div className={styles.inputGroup}>
                    <input type="password" placeholder="Senha" className={styles.inputField} value={password} onChange={(e) => setPassword(e.target.value)} disabled={loading} />
                </div>
                <div className={styles.options}>
                    <Link to="/forgot-password" className={styles.forgotPassword}>Esqueceu sua senha?</Link>
                </div>
                <button type="submit" className={`${styles.submitButton} bold-text`} disabled={loading}>
                    {loading ? 'Entrando...' : 'Entrar'}
                </button>
                <p className={styles.registerLink}>
                    Não tem uma conta?{" "}
                    <Link to="/register" className={styles.registerAnchor}>
                        Registre-se agora!
                    </Link>
                </p>
            </form>
        </div>
        <div className={styles.imageContainer}>
            <img src="/xianLogin.png" alt="Xiangling Entregando Comida" className={styles.xianImage} />
            <div className={styles.imageOverlay}></div>
        </div>
    </div>
  );
};

export default LoginPage;