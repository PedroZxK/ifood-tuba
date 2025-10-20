import React, { useState, useCallback } from 'react';
import styles from './ProfilePage.module.css';
import { useAuth } from '../../contexts/AuthHook';
import { updatePassword, updateEmail, reauthenticateWithCredential, EmailAuthProvider } from "firebase/auth";
import { auth } from '../../firebase/config';
import { doc, updateDoc } from 'firebase/firestore';
import { db } from '../../firebase/config';

import Navbar from '../../components/Navbar/Navbar';
import Footer from '../../components/Footer/Footer';

const ProfilePage = () => {
    const { user, updateUser, logout } = useAuth();

    const [name, setName] = useState(user?.name || '');
    const [email, setEmail] = useState(user?.email || '');
    const [password, setPassword] = useState('');
    const [currentPassword, setCurrentPassword] = useState('');
    
    const [avatar, setAvatar] = useState(user?.avatar || '/default-avatar.png');
    const [avatarPreview, setAvatarPreview] = useState(user?.avatar || '/default-avatar.png');

    const [successMsg, setSuccessMsg] = useState('');
    const [errorMsg, setErrorMsg] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    const originalEmail = user?.email || '';

    const uploadToCloudinary = async (file) => {
        const formData = new FormData();
        formData.append('file', file);
        formData.append('upload_preset', 'MoraMeal'); // Lembre-se de usar seu upload preset

        const response = await fetch('https://api.cloudinary.com/v1_1/dupafxdos/image/upload', { // Lembre-se de usar seu cloud name
            method: 'POST',
            body: formData,
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(`Falha no upload para o Cloudinary: ${errorData.error.message}`);
        }

        const data = await response.json();
        return data.secure_url;
    };

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
            
            let finalAvatarUrl = user.avatar; 

            if (avatar instanceof File) {
                finalAvatarUrl = await uploadToCloudinary(avatar);
            }
            
            const changesDetectedSensitive = email !== originalEmail || password;
            const changesDetectedProfile = name !== user.name || finalAvatarUrl !== user.avatar;
            let changesDetected = changesDetectedSensitive || changesDetectedProfile;
            let feedback = '';

            if (!changesDetected) {
                setErrorMsg('Nenhuma alteração foi detectada para salvar.');
                setIsSubmitting(false);
                return;
            }

            if (changesDetectedSensitive) {
                if (!currentPassword) {
                    setErrorMsg('🚨 Senha Atual Requerida: Para alterar o E-mail ou Senha, confirme sua identidade.');
                    setIsSubmitting(false);
                    return;
                }
                const credential = EmailAuthProvider.credential(originalEmail, currentPassword);
                await reauthenticateWithCredential(currentUser, credential);
            }

            const profileUpdate = {};
            if (name !== user.name) {
                profileUpdate.name = name;
                feedback += 'Nome, ';
            }
            if (finalAvatarUrl !== user.avatar) {
                profileUpdate.avatar = finalAvatarUrl;
                feedback += 'Foto, ';
            }

            if (Object.keys(profileUpdate).length > 0) {
                await updateUser(profileUpdate);
            }

            if (email !== originalEmail) {
                await updateEmail(currentUser, email);
                await updateDoc(doc(db, 'users', currentUser.uid), { email: email });
                feedback += 'Email, ';
            }

            if (password) {
                if (password.length < 6) {
                    setErrorMsg('A nova senha deve ter pelo menos 6 caracteres.');
                    setIsSubmitting(false);
                    return;
                }
                await updatePassword(currentUser, password);
                feedback += 'Senha, ';
                setPassword('');
            }

            const finalFeedback = feedback.replace(/,\s*$/, '');
            setSuccessMsg(`✅ Perfil atualizado com sucesso! Alterações salvas: ${finalFeedback}.`);

            setCurrentPassword('');
            setAvatar(finalAvatarUrl);
            setAvatarPreview(finalAvatarUrl);

        } catch (err) {
            console.error("Erro completo na atualização:", err);
            if (err.code === 'auth/wrong-password' || err.code === 'auth/invalid-credential') {
                setErrorMsg('❌ A senha atual fornecida está incorreta.');
            } else if (err.code === 'auth/requires-recent-login') {
                setErrorMsg('🚨 Sua sessão expirou. Por favor, deslogue e logue novamente antes de salvar.');
            } else if (err.code === 'auth/email-already-in-use') {
                setErrorMsg('O novo e-mail já está em uso por outra conta.');
            } else {
                setErrorMsg('❌ Erro ao salvar perfil. Tente novamente. Detalhe: ' + err.message);
            }
            setPassword('');
            setCurrentPassword('');
        } finally {
            setIsSubmitting(false);
        }
    }, [name, email, originalEmail, password, currentPassword, avatar, user?.name, user?.avatar, updateUser]);

    const handleAvatarChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setErrorMsg('');
            setAvatar(file);
            setAvatarPreview(URL.createObjectURL(file));
        }
    };

    const triggerFileInput = () => {
        document.getElementById('avatar-file-input').click();
    };

    const handleLogoutConfirmation = () => {
        const isConfirmed = window.confirm("Você tem certeza que deseja sair da sua conta?");
        if (isConfirmed) {
            logout();
        }
    };

    if (!user) {
        return <div className={styles.profileContainer}><h1 className={styles.pageTitle}>Carregando Perfil...</h1></div>;
    }

    return (
        <div className={styles.profileContainer}>
            <Navbar />
            
            <main className={styles.mainContent}>
                <h1 className={styles.pageTitle}>Gerenciar Perfil</h1>

                <form className={styles.profileForm} onSubmit={handleUpdate}>
                    <section className={styles.avatarSection}>
                        <div className={styles.avatarWrapper} onClick={triggerFileInput}>
                            <img
                                src={avatarPreview}
                                alt="Avatar do Usuário"
                                className={styles.avatarImage}
                            />
                            <div className={styles.avatarOverlay}>
                                <span className={styles.overlayText}>Mudar Foto</span>
                            </div>
                        </div>
                        <input
                            type="file"
                            id="avatar-file-input"
                            accept="image/*"
                            onChange={handleAvatarChange}
                            className={styles.avatarInput}
                        />
                    </section>

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
                                placeholder="Deixe em branco para não alterar."
                            />
                        </div>
                        
                        {(email !== originalEmail || password) && (
                            <div className={styles.inputGroup}>
                                <label htmlFor="currentPassword">Sua Senha Atual *</label>
                                <input
                                    id="currentPassword"
                                    type="password"
                                    value={currentPassword}
                                    onChange={e => setCurrentPassword(e.target.value)}
                                    placeholder="Confirme sua senha atual"
                                    required={email !== originalEmail || password}
                                />
                                <p className={styles.helpText}>* Necessário para mudar e-mail ou senha.</p>
                            </div>
                        )}
                        
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
                            onClick={handleLogoutConfirmation}
                        >
                            Sair da Conta
                        </button>
                    </section>
                </form>
            </main>
            
            <Footer />
        </div>
    );
};

export default ProfilePage;