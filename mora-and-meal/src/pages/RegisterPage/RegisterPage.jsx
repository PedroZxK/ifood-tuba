import React, { useState } from 'react';
import styles from './RegisterPage.module.css';
import { Link, useNavigate } from 'react-router-dom';
import { createUserWithEmailAndPassword, sendEmailVerification } from "firebase/auth";
import { auth, db } from '../../firebase/config';
import { doc, setDoc, serverTimestamp } from "firebase/firestore";

const RegisterPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [userType, setUserType] = useState('cliente');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (password !== confirmPassword) {
      setError('As senhas não coincidem.');
      return;
    }
    if (!name || !email || !password) {
      setError('Todos os campos são obrigatórios.');
      return;
    }

    setLoading(true);

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      await setDoc(doc(db, "users", user.uid), {
        uid: user.uid,
        name,
        email,
        role: userType, 
        createdAt: serverTimestamp(),
        emailVerified: user.emailVerified,
      });

      await sendEmailVerification(user);

      setSuccess('Cadastro realizado com sucesso! Um e-mail de verificação foi enviado. Redirecionando...');
      setTimeout(() => {
        navigate('/login');
      }, 3000);

    } catch (error) {
      if (error.code === 'auth/email-already-in-use') {
        setError('Este e-mail já está em uso.');
      } else if (error.code === 'auth/invalid-email') {
        setError('O formato do e-mail é inválido.');
      } else if (error.code === 'auth/weak-password') {
        setError('A senha deve ter no mínimo 6 caracteres.');
      } else {
        setError('Ocorreu um erro ao realizar o cadastro. Tente novamente.');
        console.error("Erro no cadastro:", error);
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
        <form className={styles.registerBox} onSubmit={handleRegister}>
          <h2 className={`bold-text ${styles.title}`}>Registre-se</h2>

          {error && <p className={styles.errorMessage}>{error}</p>}
          {success && <p className={styles.successMessage}>{success}</p>}

          <div className={styles.inputGroup}>
            <input type="text" placeholder="Nome Completo" className={styles.inputField} value={name} onChange={(e) => setName(e.target.value)} disabled={loading} />
          </div>
          <div className={styles.inputGroup}>
            <input type="email" placeholder="Email" className={styles.inputField} value={email} onChange={(e) => setEmail(e.target.value)} disabled={loading} />
          </div>
          <div className={styles.inputGroup}>
            <input type="password" placeholder="Senha" className={styles.inputField} value={password} onChange={(e) => setPassword(e.target.value)} disabled={loading} />
          </div>
          <div className={styles.inputGroup}>
            <input type="password" placeholder="Confirmar Senha" className={styles.inputField} value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} disabled={loading} />
          </div>
          <div className={styles.inputGroup}>
            <select className={styles.inputField} value={userType} onChange={(e) => setUserType(e.target.value)} disabled={loading}>
              <option value="cliente">Sou um Cliente</option>
              <option value="restaurante">Sou um Restaurante</option>
              <option value="entregador">Sou um Entregador</option>
            </select>
          </div>

          <button type="submit" className={`${styles.submitButton} bold-text`} disabled={loading}>
            {loading ? 'Registrando...' : 'Registrar'}
          </button>

          <p className={styles.loginLink}>
            Já tem uma conta?{" "}
            <Link to="/login" className={styles.loginAnchor}>
              Entre agora!
            </Link>
          </p>
        </form>
      </div>

      <div className={styles.imageContainer}>
        <img src="/xianCadastro.png" alt="Xiangling com Prato" className={styles.xianImage} />
        <div className={styles.imageOverlay}></div>
      </div>
    </div>
  );
};

export default RegisterPage;