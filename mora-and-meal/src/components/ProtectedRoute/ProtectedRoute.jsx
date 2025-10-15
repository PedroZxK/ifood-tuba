import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthHook'; // Ajuste o caminho se necessário

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();

  // Se ainda estiver verificando a autenticação, pode-se mostrar um loader
  if (loading) {
    return <div>Carregando...</div>; 
  }

  // Se não estiver autenticado, redireciona para a página de login
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // Se estiver autenticado, renderiza o componente filho (a página protegida)
  return children;
};

export default ProtectedRoute;