import React, { createContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth, db } from '../firebase/config'; // Assumindo que este caminho está correto
import { doc, updateDoc, getDoc, onSnapshot } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); // Contém os dados de perfil do Firestore
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  // Estado para armazenar o UID do Firebase Auth
  const [firebaseUser, setFirebaseUser] = useState(null);

  useEffect(() => {
    // Listener do Firebase Auth: Rastreia o estado de autenticação
    const unsubscribeAuth = onAuthStateChanged(auth, async (userAuth) => {
      setFirebaseUser(userAuth);

      if (userAuth) {
        // Se autenticado, carrega ou escuta o perfil do Firestore
        const userDocRef = doc(db, 'users', userAuth.uid);

        // Listener do Firestore: Garante que o estado 'user' reflita o banco de dados em tempo real
        const unsubscribeFirestore = onSnapshot(userDocRef, (docSnapshot) => {
          if (docSnapshot.exists()) {
            // Os dados de perfil (name, avatar, etc.) vêm do Firestore
            const profileData = docSnapshot.data();
            setUser({
              uid: userAuth.uid,
              email: userAuth.email,
              ...profileData,
              // Não inclua a senha!
            });
          } else {
            // Usuário logado no Auth, mas sem perfil (erro no registro)
            setUser(null);
            auth.signOut();
          }
          setLoading(false);
        }, (error) => {
          console.error("Erro ao carregar dados do Firestore:", error);
          setLoading(false);
        });

        // Cleanup para o listener do Firestore quando o componente desmonta ou o userAuth muda
        return () => unsubscribeFirestore();
      } else {
        // Não autenticado
        setUser(null);
        setLoading(false);
      }
    });

    // Cleanup para o listener do Auth
    return () => unsubscribeAuth();
  }, []);

  // Login: Apenas um wrapper para forçar a navegação após o login ser bem-sucedido
  // O carregamento real dos dados é feito pelo useEffect/onAuthStateChanged
  const login = (email, password) => {
    // Não precisa de lógica de localStorage aqui, o LoginPage já lida com a autenticação
    // e o useEffect acima lida com o estado.
  };

  const logout = async () => {
    await auth.signOut();
    setUser(null);
    setFirebaseUser(null);
    navigate('/login');
  };

  // 💡 FUNÇÃO DE ATUALIZAÇÃO QUE SALVA NO FIRESTORE (Passo Crítico)
  const updateUser = async (updatedData) => {
    if (!firebaseUser) {
      console.error("Usuário não logado para atualização.");
      return;
    }

    // 1. Prepara os dados para o Firestore
    const dataToUpdate = { ...updatedData };

    // 2. Lógica para a senha (deve ser tratada separadamente pelo Firebase Auth)
    if (dataToUpdate.password) {
      // OBS: A alteração de senha deve usar updatePassword(user, novaSenha) do Firebase Auth
      // Vamos ignorar a senha aqui, pois ela não fica no Firestore.
      delete dataToUpdate.password;
    }

    try {
      const userDocRef = doc(db, 'users', firebaseUser.uid);

      // 3. Salva os novos dados no Firestore (nome e avatar)
      await updateDoc(userDocRef, dataToUpdate);

      // O onSnapshot no useEffect irá automaticamente atualizar o estado 'user' na aplicação.

    } catch (error) {
      console.error("Erro ao atualizar perfil no Firestore:", error);
      throw new Error('Falha ao salvar o perfil.');
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, updateUser, isAuthenticated: !!user, loading }}>
      {children}
    </AuthContext.Provider>
  );
};