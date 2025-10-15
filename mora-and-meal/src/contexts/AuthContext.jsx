import React, { createContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

// Cria o contexto
export const AuthContext = createContext();

// Cria o provedor do contexto
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Efeito para carregar o usuário do localStorage ao iniciar a aplicação
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  // Função de Registro
  const register = (name, email, password) => {
    // 1. Pega os usuários existentes do localStorage ou cria um array vazio
    const users = JSON.parse(localStorage.getItem('users')) || [];

    // 2. Verifica se o email já está em uso
    const userExists = users.find(u => u.email === email);
    if (userExists) {
      return { success: false, message: 'Este email já está cadastrado.' };
    }

    // 3. Cria o novo usuário
    const newUser = { name, email, password }; // Em um app real, a senha deveria ser "hasheada"
    users.push(newUser);

    // 4. Salva o array atualizado de usuários no localStorage
    localStorage.setItem('users', JSON.stringify(users));

    return { success: true };
  };

  // Função de Login
const login = (email, password) => {
    // 1. Pega os usuários cadastrados do localStorage
    const users = JSON.parse(localStorage.getItem('users')) || [];
    
    // 2. Procura pelo usuário com o email fornecido (ESTA LINHA ESTAVA FALTANDO)
    const foundUser = users.find(u => u.email === email);

    // 3. Valida o usuário e a senha
    if (!foundUser) {
      return { success: false, message: 'Email não encontrado.' };
    }

    if (foundUser.password !== password) { 
      return { success: false, message: 'Senha incorreta.' };
    }
    
    // 4. Se tudo estiver correto, salva o usuário no estado e no localStorage
    const userData = { name: foundUser.name, email: foundUser.email };
    localStorage.setItem('user', JSON.stringify(userData));
    setUser(userData);
    
    // 5. Redireciona para a página de menu
    navigate('/menu');

    return { success: true };
  };

  // Função de Logout
  const logout = () => {
    localStorage.removeItem('user');
    setUser(null);
    navigate('/login');
  };

  // O valor fornecido pelo contexto
  const value = {
    isAuthenticated: !!user,
    user,
    login,
    register,
    logout,
    loading
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};