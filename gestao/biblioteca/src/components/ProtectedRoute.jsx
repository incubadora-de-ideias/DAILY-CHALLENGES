import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

/**
 * Componente ProtectedRoute
 * Bloqueia o acesso a rotas se o usuário não estiver autenticado
 * Redireciona para /login se o usuário não estiver logado
 */
const ProtectedRoute = ({ children, requireAdmin = false }) => {
  const { isAuthenticated, isAdmin } = useAuth();

  if (!isAuthenticated) {
    // Redireciona para a página de login
    return <Navigate to="/login" replace />;
  }

  if (requireAdmin && !isAdmin) {
    // Redireciona para a página de dashboard
    return <Navigate to="/dashboard" replace />;
  }

  // O usuário está autenticado (e admin se requerido)
  return children;
};

export default ProtectedRoute;

