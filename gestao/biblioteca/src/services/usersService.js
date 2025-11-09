// Serviço de usuários para gerenciar dados de usuários
// Pode ser adaptado para uso com JSON, SQLite ou API
import usuariosData from '../data/usuarios.json';
import { logActivity, ActionTypes } from './historyService';

/**
 * Busca todos os usuários (combina dados do JSON com o localStorage)
 */
export const getAllUsers = async () => {
  try {
    // Busca usuários do localStorage (usuários cadastrados recentemente)
    const storedUsers = localStorage.getItem('biblioteca_users');
    const localUsers = storedUsers ? JSON.parse(storedUsers) : [];
    
    // Combina com dados iniciais do JSON, removendo duplicados por ID
    // Usuários do localStorage têm precedência sobre os do JSON
    const jsonUserIds = new Set(usuariosData.map(u => u.id));
    const uniqueLocalUsers = localUsers.filter(u => !jsonUserIds.has(u.id));
    const allUsers = [...usuariosData, ...uniqueLocalUsers];
    
    // Remove possíveis duplicados restantes por ID (mantém a primeira ocorrência)
    const seenIds = new Set();
    const uniqueUsers = allUsers.filter(user => {
      if (seenIds.has(user.id)) {
        return false;
      }
      seenIds.add(user.id);
      return true;
    });
    
    return uniqueUsers;
  } catch (error) {
    console.error('Erro ao buscar usuários:', error);
    return usuariosData;
  }
};

/**
 * Busca um usuário pelo ID
 */
export const getUserById = async (id) => {
  const users = await getAllUsers();
  // Converte ambos para números para comparação
  const userId = typeof id === 'string' ? parseInt(id, 10) : id;
  return users.find(u => u.id === userId || u.id === id) || null;
};

/**
 * Busca um usuário pelo email
 */
export const getUserByEmail = async (email) => {
  const users = await getAllUsers();
  return users.find(
    u => u.email && u.email.toLowerCase() === email.toLowerCase()
  ) || null;
};

/**
 * Cria um novo usuário
 * @param {Object} userData - Dados do usuário { nome, email, senha, tipo }
 * @param {Object} currentUser - Usuário atual que está realizando a ação (opcional)
 * @returns {Object} { success: boolean, message?: string, user?: Object }
 */
export const createUser = async (userData, currentUser = null) => {
  try {
    const { nome, email, senha, tipo = 'Comum' } = userData;

    // Validação
    if (!nome || !email || !senha) {
      return { success: false, message: 'Todos os campos são obrigatórios' };
    }

    // Verifica se o email já existe
    const existingUser = await getUserByEmail(email);
    if (existingUser) {
      return { success: false, message: 'Este email já está cadastrado' };
    }

    // Valida formato de email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return { success: false, message: 'Email inválido' };
    }

    // Valida tamanho da senha
    if (senha.length < 6) {
      return { success: false, message: 'A senha deve ter pelo menos 6 caracteres' };
    }

    // Busca todos os usuários para determinar o próximo ID
    const allUsers = await getAllUsers();
    const maxId = allUsers.length > 0 
      ? Math.max(...allUsers.map(u => u.id || 0))
      : 0;

    // Cria novo usuário
    const newUser = {
      id: maxId + 1,
      nome,
      email: email.toLowerCase(),
      senha,
      tipo: tipo || 'Comum'
    };

    // Busca usuários já existentes no localStorage
    const storedUsers = localStorage.getItem('biblioteca_users');
    const localUsers = storedUsers ? JSON.parse(storedUsers) : [];

    // Adiciona o novo usuário ao localStorage
    localUsers.push(newUser);
    localStorage.setItem('biblioteca_users', JSON.stringify(localUsers));

    // Registra atividade
    const actorUser = currentUser || newUser;
    await logActivity({
      usuarioId: actorUser.id,
      usuarioNome: actorUser.nome,
      tipoAcao: ActionTypes.REGISTER,
      detalhes: `Cadastrou o usuário: ${nome} (${email})`
    });

    // Retorna usuário sem senha
    const { senha: _, ...userWithoutPassword } = newUser;
    return {
      success: true,
      message: 'Usuário cadastrado com sucesso!',
      user: userWithoutPassword
    };
  } catch (error) {
    console.error('Erro ao cadastrar usuário:', error);
    return { success: false, message: 'Erro ao cadastrar usuário' };
  }
};

/**
 * Atualiza um usuário
 * @param {number} id - ID do usuário
 * @param {Object} userData - Dados atualizados do usuário { nome, email, senha?, tipo }
 * @param {Object} currentUser - Usuário atual que está realizando a ação (opcional)
 * @returns {Object} { success: boolean, message?: string, user?: Object }
 */
export const updateUser = async (id, userData, currentUser = null) => {
  try {
    const { nome, email, senha, tipo } = userData;

    // Validação
    if (!nome || !email) {
      return { success: false, message: 'Nome e email são obrigatórios' };
    }

    // Valida formato de email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return { success: false, message: 'Email inválido' };
    }

    // Valida senha se fornecida
    if (senha && senha.length < 6) {
      return { success: false, message: 'A senha deve ter pelo menos 6 caracteres' };
    }

    // Converte id para número se necessário
    const userId = typeof id === 'string' ? parseInt(id, 10) : id;

    // Busca todos os usuários
    const allUsers = await getAllUsers();
    const userIndex = allUsers.findIndex(u => u.id === userId || u.id === id);
    
    if (userIndex === -1) {
      return { success: false, message: 'Usuário não encontrado' };
    }

    // Verifica se o email já está sendo usado por outro usuário
    const existingUser = await getUserByEmail(email);
    if (existingUser && existingUser.id !== userId) {
      return { success: false, message: 'Este email já está cadastrado para outro usuário' };
    }

    // Busca usuários do localStorage
    const storedUsers = localStorage.getItem('biblioteca_users');
    const localUsers = storedUsers ? JSON.parse(storedUsers) : [];
    const localUserIndex = localUsers.findIndex(u => u.id === userId || u.id === id);

    const oldUser = allUsers[userIndex];
    
    if (localUserIndex !== -1) {
      // Atualiza no localStorage
      localUsers[localUserIndex] = {
        ...localUsers[localUserIndex],
        nome: nome.trim(),
        email: email.toLowerCase().trim(),
        tipo: tipo || localUsers[localUserIndex].tipo,
        ...(senha && { senha }) // Atualiza senha apenas se fornecida
      };
      localStorage.setItem('biblioteca_users', JSON.stringify(localUsers));
      
      // Registra atividade
      if (currentUser) {
        await logActivity({
          usuarioId: currentUser.id,
          usuarioNome: currentUser.nome,
          tipoAcao: ActionTypes.USER_UPDATE,
          detalhes: `Atualizou o usuário: ${oldUser.nome} (ID: ${userId})`
        });
      }
      
      // Retorna usuário sem senha
      const { senha: _, ...userWithoutPassword } = localUsers[localUserIndex];
      return { success: true, user: userWithoutPassword };
    } else {
      // Usuário está no JSON, adiciona ao localStorage como nova entrada
      const updatedUser = {
        ...allUsers[userIndex],
        nome: nome.trim(),
        email: email.toLowerCase().trim(),
        tipo: tipo || allUsers[userIndex].tipo,
        ...(senha && { senha }) // Atualiza senha apenas se fornecida
      };
      localUsers.push(updatedUser);
      localStorage.setItem('biblioteca_users', JSON.stringify(localUsers));
      
      // Registra atividade
      if (currentUser) {
        await logActivity({
          usuarioId: currentUser.id,
          usuarioNome: currentUser.nome,
          tipoAcao: ActionTypes.USER_UPDATE,
          detalhes: `Atualizou o usuário: ${oldUser.nome} (ID: ${userId})`
        });
      }
      
      // Retorna usuário sem senha
      const { senha: __, ...userWithoutPassword } = updatedUser;
      return { success: true, user: userWithoutPassword };
    }
  } catch (error) {
    console.error('Erro ao atualizar usuário:', error);
    return { success: false, message: 'Erro ao atualizar usuário' };
  }
};

/**
 * Exclui um usuário
 * @param {number} id - ID do usuário
 * @param {Object} currentUser - Usuário atual que está realizando a ação (opcional)
 * @returns {Object} { success: boolean, message?: string }
 */
export const deleteUser = async (id, currentUser = null) => {
  try {
    // Converte id para número se necessário
    const userId = typeof id === 'string' ? parseInt(id, 10) : id;

    // Busca o usuário antes de excluir para registrar a atividade
    const userToDelete = await getUserById(userId);

    const storedUsers = localStorage.getItem('biblioteca_users');
    const localUsers = storedUsers ? JSON.parse(storedUsers) : [];
    
    const filteredUsers = localUsers.filter(u => u.id !== userId && u.id !== id);
    localStorage.setItem('biblioteca_users', JSON.stringify(filteredUsers));
    
    // Registra atividade
    if (currentUser && userToDelete) {
      await logActivity({
        usuarioId: currentUser.id,
        usuarioNome: currentUser.nome,
        tipoAcao: ActionTypes.USER_DELETE,
        detalhes: `Excluiu o usuário: ${userToDelete.nome} (ID: ${userId})`
      });
    }
    
    return { success: true, message: 'Usuário excluído com sucesso!' };
  } catch (error) {
    console.error('Erro ao excluir usuário:', error);
    return { success: false, message: 'Erro ao deletar usuário' };
  }
};

