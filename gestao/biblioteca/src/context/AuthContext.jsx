import React, { createContext, useState, useContext, useEffect } from 'react';
import { logActivity, ActionTypes } from '../services/historyService';

const AuthContext = createContext(null);

// Carrega usuário do localStorage ao montar
const loadUserFromStorage = () => {
  try {
    const storedUser = localStorage.getItem('biblioteca_user');
    if (storedUser) {
      return JSON.parse(storedUser);
    }
  } catch (error) {
    console.error('Erro ao carregar usuário do armazenamento:', error);
  }
  return null;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(loadUserFromStorage);
  const [isAuthenticated, setIsAuthenticated] = useState(!!loadUserFromStorage());

  useEffect(() => {
    // Sincroniza estado de autenticação com estado do usuário
    setIsAuthenticated(!!user);
  }, [user]);

  const login = (userData) => {
    // Remove senha antes de armazenar
    const { password, ...userWithoutPassword } = userData;
    setUser(userWithoutPassword);
    setIsAuthenticated(true);
    // Persiste no localStorage
    localStorage.setItem('biblioteca_user', JSON.stringify(userWithoutPassword));
  };

  const logout = async () => {
    // Registra atividade de logout antes de limpar
    if (user) {
      try {
        await logActivity({
          usuarioId: user.id,
          usuarioNome: user.nome,
          tipoAcao: ActionTypes.LOGOUT,
          detalhes: `Logout realizado`
        });
      } catch (error) {
        console.error('Erro ao registrar logout:', error);
      }
    }
    
    setUser(null);
    setIsAuthenticated(false);
    // Limpa localStorage
    localStorage.removeItem('biblioteca_user');
  };

  return (
    <AuthContext.Provider 
      value={{ 
        user, 
        isAuthenticated, 
        login, 
        logout,
        isAdmin: user?.tipo === 'Admin' || user?.tipo === 'admin'
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth deve ser usado dentro de um AuthProvider');
  }
  return context;
};

