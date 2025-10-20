import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthHook';

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();

  // Se ainda estiver verificando a autenticação, exibe uma mensagem de carregamento.
  // Isso evita redirecionamentos incorretos em recarregamentos de página.
  if (loading) {
    return <div>Carregando...</div>;
  }

  // Se não estiver autenticado após a verificação, redireciona para a página de login.
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // Se estiver autenticado, renderiza a página solicitada.
  return children;
};

export default ProtectedRoute;