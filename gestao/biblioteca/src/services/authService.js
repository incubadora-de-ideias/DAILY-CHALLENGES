// Serviço de autenticação para login/logout
import { getAllUsers } from './usersService';
import { logActivity, ActionTypes } from './historyService';

/**
 * Autentica um usuário com email e senha
 * @param {string} email - Email do usuário
 * @param {string} password - Senha do usuário
 * @returns {Object} { success: boolean, user?: Object, message?: string }
 */
export const authenticateUser = async (email, password) => {
  try {
    // Busca todos os usuários (do JSON + localStorage)
    const usuariosData = await getAllUsers();

    // Busca usuário por email
    const user = usuariosData.find(
      (u) => u.email && u.email.toLowerCase() === email.toLowerCase()
    );

    if (!user) {
      return { success: false, message: 'Email não encontrado' };
    }

    // Verifica senha (em produção, senhas devem ser hasheadas)
    if (user.senha !== password) {
      return { success: false, message: 'Senha incorreta' };
    }

    // Retorna dados do usuário sem senha
    const { senha, ...userWithoutPassword } = user;
    
    // Registra atividade de login
    await logActivity({
      usuarioId: userWithoutPassword.id,
      usuarioNome: userWithoutPassword.nome,
      tipoAcao: ActionTypes.LOGIN,
      detalhes: `Login realizado com sucesso`
    });
    
    return {
      success: true,
      user: userWithoutPassword,
    };
  } catch (error) {
    console.error('Erro ao autenticar usuário:', error);
    return { success: false, message: 'Erro ao autenticar usuário' };
  }
};

/**
 * Verifica se um usuário existe pelo email
 * @param {string} email - Email do usuário
 * @returns {Promise<boolean>}
 */
export const userExists = async (email) => {
  try {
    const usuariosData = await getAllUsers();
    return usuariosData.some(
      (u) => u.email && u.email.toLowerCase() === email.toLowerCase()
    );
  } catch (error) {
    console.error('Erro ao verificar existência do usuário:', error);
    return false;
  }
};

