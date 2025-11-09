// Funções utilitárias de autenticação

export const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const validatePassword = (password) => {
  // Mínimo 6 caracteres
  return password && password.length >= 6;
};

export const hashPassword = async (password) => {
  // Implementação para hash de senha (ex: usando bcrypt)
  // Por enquanto, retorna como está (deve ser hasheada em produção)
  return password;
};

export const verifyPassword = async (password, hash) => {
  // Implementação para verificação de senha
  return password === hash;
};

export const generateToken = () => {
  // Implementação para geração de token de autenticação
  return Math.random().toString(36).substring(2, 15) + 
         Math.random().toString(36).substring(2, 15);
};

