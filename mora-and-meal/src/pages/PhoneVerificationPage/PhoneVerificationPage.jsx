import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './PhoneVerificationPage.module.css'; // Adapte ou crie este arquivo de estilo
import { auth } from '../../firebase/config';
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";

const PhoneVerificationPage = () => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [otp, setOtp] = useState('');
  const [confirmationResult, setConfirmationResult] = useState(null);
  const [otpSent, setOtpSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  // Inicializa o reCAPTCHA Verifier
  useEffect(() => {
    // O objeto 'window' é usado para garantir que o verifier persista
    // entre as renderizações do componente.
    window.recaptchaVerifier = new RecaptchaVerifier(auth, 'recaptcha-container', {
      'size': 'invisible', // reCAPTCHA invisível, não exige ação do usuário
      'callback': (response) => {
        // reCAPTCHA resolvido, o envio do SMS pode prosseguir.
        console.log("reCAPTCHA resolvido");
      }
    });
  }, []);

  // Função para enviar o código SMS
  const handleSendOtp = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    if (!phoneNumber || phoneNumber.length < 10) {
        setError('Por favor, insira um número de telefone válido com DDD.');
        setLoading(false);
        return;
    }

    try {
      const appVerifier = window.recaptchaVerifier;
      // Formate o número para o padrão E.164 (ex: +5511999999999)
      const formattedPhoneNumber = `+55${phoneNumber}`;

      const result = await signInWithPhoneNumber(auth, formattedPhoneNumber, appVerifier);
      setConfirmationResult(result);
      setOtpSent(true);
      setSuccess('Código de verificação enviado por SMS!');
    } catch (error) {
      console.error(error);
      setError('Falha ao enviar o SMS. Verifique o número e tente novamente. Certifique-se de que o reCAPTCHA está configurado corretamente no Firebase.');
    } finally {
      setLoading(false);
    }
  };

  // Função para verificar o código OTP
  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    if (!otp || otp.length !== 6) {
        setError('Por favor, insira o código de 6 dígitos.');
        setLoading(false);
        return;
    }
    
    try {
      await confirmationResult.confirm(otp);
      setSuccess('Número de telefone verificado com sucesso! Redirecionando...');
      // O ideal aqui é também associar este número ao usuário no Firestore.
      setTimeout(() => {
        navigate('/'); // Redireciona para a home page ou dashboard
      }, 2000);
    } catch (error) {
      setError('Código inválido ou expirado. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.container}> {/* Use um estilo similar ao de Register/Login */}
      <div className={styles.formContainer}>
        <h2 className={styles.title}>Verificar Telefone</h2>

        {error && <p className={styles.errorMessage}>{error}</p>}
        {success && <p className={styles.successMessage}>{success}</p>}

        {!otpSent ? (
          // Formulário para inserir o número de telefone
          <form onSubmit={handleSendOtp}>
            <p>Adicione uma camada extra de segurança à sua conta.</p>
            <div className={styles.inputGroup}>
              <input
                type="tel"
                placeholder="Seu telefone com DDD (ex: 11999998888)"
                className={styles.inputField}
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                disabled={loading}
              />
            </div>
            <button type="submit" className={styles.submitButton} disabled={loading}>
              {loading ? 'Enviando...' : 'Enviar Código'}
            </button>
          </form>
        ) : (
          // Formulário para inserir o código OTP
          <form onSubmit={handleVerifyOtp}>
            <p>Digite o código de 6 dígitos que enviamos para o seu telefone.</p>
            <div className={styles.inputGroup}>
              <input
                type="number"
                placeholder="Código de Verificação"
                className={styles.inputField}
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                disabled={loading}
              />
            </div>
            <button type="submit" className={styles.submitButton} disabled={loading}>
              {loading ? 'Verificando...' : 'Verificar'}
            </button>
          </form>
        )}
        
        {/* Este container é essencial para o reCAPTCHA invisível funcionar */}
        <div id="recaptcha-container"></div>
      </div>
    </div>
  );
};

export default PhoneVerificationPage;