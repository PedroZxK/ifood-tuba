import React, { useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import styles from './ProfilePage.module.css';
import { useAuth } from '../../contexts/AuthHook';
// 🔑 IMPORTAÇÕES ATUALIZADAS PARA REAUTENTICAÇÃO
import { updatePassword, updateEmail, reauthenticateWithCredential, EmailAuthProvider } from "firebase/auth"; 
import { auth } from '../../firebase/config'; 
import { doc, updateDoc } from 'firebase/firestore'; 
import { db } from '../../firebase/config'; 

// Componente Navbar (Inalterado)
const MenuNavbar = ({ logout, styles }) => (
    <nav className={styles.navbar}>
        <div className={styles.logoArea}>
            <Link to="/" className={styles.logo}>
                <img src="/logo.png" alt="Mora & Meal Logo" className={styles.logoImage} />
                <span className={styles.logoText}>Mora & Meal</span>
            </Link>
        </div>
        <div className={styles.searchBar}>
            <img src="/lupa.png" alt="Buscar" className={styles.searchIcon} />
            <input type="text" placeholder="Buscar pratos..." className={styles.searchInput} />
        </div>
        <div className={styles.userIcons}>
            <Link to="/cart">
                <img src="/carrinho.png" alt="Carrinho" className={styles.navIcon} />
            </Link>
            <Link to="/profile">
                <img src="/perfil.png" alt="Perfil" className={styles.navIcon} />
            </Link>
            <img src="/notificacao.png" alt="Notificação" className={styles.navIcon} />
            <img 
                src="/porta.png" 
                alt="Sair" 
                className={styles.navIcon} 
                onClick={logout} 
                style={{ cursor: 'pointer' }}
            />
        </div>
    </nav>
);

// Componente Footer (Inalterado)
const MenuFooter = ({ styles }) => (
    <footer className={styles.menuFooter}>
        {/* Conteúdo adicional do rodapé pode ser adicionado aqui */}
    </footer>
);

const ProfilePage = () => {
    const { user, updateUser, logout } = useAuth(); 

    const [name, setName] = useState(user?.name || '');
    const [email, setEmail] = useState(user?.email || ''); 
    const [password, setPassword] = useState(''); // Nova senha
    const [currentPassword, setCurrentPassword] = useState(''); // 🔑 NOVO: Senha atual
    const [avatar, setAvatar] = useState(user?.avatar || '/default-avatar.png');
    const [successMsg, setSuccessMsg] = useState('');
    const [errorMsg, setErrorMsg] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    const originalEmail = user?.email || ''; 
    
    const handleUpdate = useCallback(async (e) => {
        e.preventDefault();
        setSuccessMsg('');
        setErrorMsg('');

        if (!name) { 
            setErrorMsg('O Nome completo é obrigatório.');
            return;
        }
        
        setIsSubmitting(true);

        try {
            const currentUser = auth.currentUser;
            if (!currentUser) {
                setErrorMsg('Sessão de usuário não encontrada. Por favor, faça login novamente.');
                setIsSubmitting(false);
                return;
            }

            const changesDetectedSensitive = email !== originalEmail || password;
            const changesDetectedProfile = name !== user.name || avatar !== user.avatar;
            let changesDetected = changesDetectedSensitive || changesDetectedProfile;
            let feedback = '';

            if (!changesDetected) {
                setErrorMsg('Nenhuma alteração foi detectada para salvar.');
                setIsSubmitting(false);
                return;
            }

            // --- 0. REAUTENTICAÇÃO (Obrigatorio para email/senha) ---
            if (changesDetectedSensitive) {
                if (!currentPassword) {
                    setErrorMsg('🚨 **Senha Atual Requerida:** Para alterar o E-mail ou Senha, você deve digitar sua senha atual para confirmar sua identidade.');
                    setIsSubmitting(false);
                    return;
                }
                
                // Cria a credencial com o email ORIGINAL e a senha atual
                const credential = EmailAuthProvider.credential(originalEmail, currentPassword);
                
                // Reautentica o usuário ANTES de fazer a alteração sensível
                await reauthenticateWithCredential(currentUser, credential);
                // Se chegou aqui, a reautenticação foi um sucesso!
            }
            
            // --- 1. Atualizar Nome e Avatar (Firestore) ---
            const profileUpdate = {};
            if (name !== user.name) {
                profileUpdate.name = name;
                feedback += 'Nome, ';
            }
            if (avatar !== user.avatar) {
                profileUpdate.avatar = avatar;
                feedback += 'Foto, ';
            }

            if (Object.keys(profileUpdate).length > 0) {
                await updateUser(profileUpdate); 
            }

            // --- 2. Atualizar Email (Firebase Auth + Firestore) ---
            if (email !== originalEmail) {
                if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
                    setErrorMsg('Formato de e-mail inválido.');
                    setIsSubmitting(false);
                    return;
                }
                
                // TENTA ATUALIZAR O EMAIL NO FIREBASE AUTH
                await updateEmail(currentUser, email); 
                
                // Se o Auth deu certo, atualiza o Firestore 
                await updateDoc(doc(db, 'users', currentUser.uid), { email: email });
                
                feedback += 'Email, ';
            }

            // --- 3. Atualizar Senha (Firebase Auth) ---
            if (password) {
                if (password.length < 6) {
                    setErrorMsg('A nova senha deve ter pelo menos 6 caracteres.');
                    setIsSubmitting(false);
                    return;
                }
                await updatePassword(currentUser, password); 
                feedback += 'Senha, ';
                setPassword(''); // Limpa a nova senha
            }
            
            // --- Feedback Final ---
            const finalFeedback = feedback.replace(/,\s*$/, ''); 
            setSuccessMsg(`✅ Perfil atualizado com sucesso! Alterações salvas: ${finalFeedback}.`);
            
            setCurrentPassword(''); // Limpa a senha atual no sucesso
            setTimeout(() => {
                setSuccessMsg(''); 
            }, 7000); 

        } catch (err) { 
            console.error("Erro completo na atualização:", err);
            
            if (err.code === 'auth/wrong-password' || err.code === 'auth/invalid-credential') {
                setErrorMsg('❌ A senha atual fornecida está incorreta. Verifique e tente novamente.');
            } else if (err.code === 'auth/requires-recent-login') {
                setErrorMsg('🚨 **ERRO DE SEGURANÇA:** Sua sessão expirou. Por favor, **deslogue e logue novamente IMEDIATAMENTE antes de salvar**. Isso garante sua segurança.');
            } else if (err.code === 'auth/invalid-email') {
                setErrorMsg('O e-mail fornecido é inválido.');
            } else if (err.code === 'auth/email-already-in-use') {
                setErrorMsg('O novo e-mail já está em uso por outra conta.');
            } else {
                setErrorMsg('❌ Erro ao salvar perfil. Tente novamente ou verifique sua conexão. Detalhe: ' + err.message);
            }
            setPassword(''); 
            setCurrentPassword(''); // Sempre limpa a senha em caso de erro
        } finally {
            setIsSubmitting(false);
        }
    }, [name, email, originalEmail, password, currentPassword, avatar, user.name, user.avatar, updateUser]); 

    const handleAvatarChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setErrorMsg(''); 
            const reader = new FileReader();
            reader.onloadend = () => {
                setAvatar(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const triggerFileInput = () => {
        document.getElementById('avatar-file-input').click();
    };
    
    if (!user) {
        return <div className={styles.profileContainer}><h1 className={styles.pageTitle}>Carregando Perfil...</h1><MenuFooter styles={styles} /></div>;
    }

    return (
        <div className={styles.profileContainer}>
            <MenuNavbar logout={logout} styles={styles} />
            
            <main className={styles.mainContent}>
                <h1 className={styles.pageTitle}>Gerenciar Perfil</h1>

                <form className={styles.profileForm} onSubmit={handleUpdate}>
                    {/* Seção de Avatar */}
                    <section className={styles.avatarSection}>
                        <div className={styles.avatarWrapper} onClick={triggerFileInput}>
                            <img
                                src={avatar}
                                alt="Avatar do Usuário"
                                className={styles.avatarImage}
                            />
                            <div className={styles.avatarOverlay}>
                                <span className={styles.overlayText}>Mudar Foto</span>
                            </div>
                        </div>
                        {/* Input de arquivo escondido */}
                        <input
                            type="file"
                            id="avatar-file-input"
                            accept="image/*"
                            onChange={handleAvatarChange}
                            className={styles.avatarInput}
                        />
                    </section>

                    {/* Seção de Informações do Usuário */}
                    <section className={styles.infoSection}>
                        <div className={styles.inputGroup}>
                            <label htmlFor="name">Nome Completo</label>
                            <input 
                                id="name"
                                type="text" 
                                value={name} 
                                onChange={e => setName(e.target.value)} 
                                placeholder="Seu nome completo"
                                required
                            />
                        </div>

                        <div className={styles.inputGroup}>
                            <label htmlFor="email">Email</label>
                            <input 
                                id="email"
                                type="email" 
                                value={email} 
                                onChange={e => setEmail(e.target.value)} 
                                placeholder="seu.email@exemplo.com"
                                required
                            />
                        </div>

                        <div className={styles.inputGroup}>
                            <label htmlFor="password">Nova Senha</label>
                            <input 
                                id="password"
                                type="password" 
                                value={password} 
                                onChange={e => setPassword(e.target.value)} 
                                placeholder="Deixe em branco para não alterar (mínimo 6 caracteres)."
                            />
                        </div>
                        
                        {/* 🔑 NOVO CAMPO: Senha Atual para Reautenticação */}
                        {(email !== originalEmail || password) && (
                            <div className={styles.inputGroup}>
                                <label htmlFor="currentPassword">Sua Senha Atual *</label>
                                <input 
                                    id="currentPassword"
                                    type="password" 
                                    value={currentPassword} 
                                    onChange={e => setCurrentPassword(e.target.value)} 
                                    placeholder="Confirme sua senha atual para segurança"
                                    required={email !== originalEmail || password} // Torna obrigatório se houver alteração sensível
                                />
                                <p className={styles.helpText}>* Necessário para mudar e-mail ou senha por motivos de segurança.</p>
                            </div>
                        )}
                        
                        {/* Mensagens de Feedback */}
                        {errorMsg && <p className={styles.errorMsg}>{errorMsg}</p>}
                        {successMsg && <p className={styles.successMsg}>{successMsg}</p>}

                        <button 
                            type="submit" 
                            className={styles.updateButton} 
                            disabled={isSubmitting}
                        >
                            {isSubmitting ? 'Salvando...' : 'Salvar Alterações'}
                        </button>

                        <button 
                            type="button" 
                            className={styles.logoutButton} 
                            onClick={logout}
                        >
                            Sair da Conta
                        </button>
                    </section>
                </form>
            </main>
            
            <MenuFooter styles={styles} />
        </div>
    );
};

export default ProfilePage;