// Serviço de histórico de atividades para registrar todas as ações do sistema
// Pode ser adaptado para uso com JSON, SQLite ou API

/**
 * Tipos de ação disponíveis
 */
export const ActionTypes = {
  LOGIN: 'Login',
  REGISTER: 'Cadastro de Usuário',
  USER_UPDATE: 'Atualização de Usuário',
  USER_DELETE: 'Exclusão de Usuário',
  BOOK_CREATE: 'Cadastro de Livro',
  BOOK_UPDATE: 'Atualização de Livro',
  BOOK_DELETE: 'Exclusão de Livro',
  LOAN_CREATE: 'Empréstimo',
  LOAN_RETURN: 'Devolução',
  LOAN_DELETE: 'Exclusão de Empréstimo',
  LOGOUT: 'Logout'
};

/**
 * Busca todos os registros de histórico (combina dados do JSON com o localStorage)
 */
export const getAllHistory = async () => {
  try {
    // Busca histórico do localStorage
    const storedHistory = localStorage.getItem('biblioteca_historico');
    const localHistory = storedHistory ? JSON.parse(storedHistory) : [];

    // Ordena por data (mais recentes primeiro)
    return localHistory.sort((a, b) => {
      const dateA = new Date(a.dataHora || 0);
      const dateB = new Date(b.dataHora || 0);
      return dateB - dateA;
    });
  } catch (error) {
    console.error('Erro ao buscar histórico:', error);
    return [];
  }
};

/**
 * Registra uma nova atividade no histórico
 * @param {Object} activityData - Dados da atividade { usuarioId, usuarioNome, tipoAcao, detalhes? }
 * @returns {Object} { success: boolean, message?: string, activity?: Object }
 */
export const logActivity = async (activityData) => {
  try {
    const { usuarioId, usuarioNome, tipoAcao, detalhes } = activityData;

    // Validação
    if (!usuarioId || !usuarioNome || !tipoAcao) {
      return { success: false, message: 'Dados incompletos para registrar atividade' };
    }

    // Busca histórico existente
    const storedHistory = localStorage.getItem('biblioteca_historico');
    const history = storedHistory ? JSON.parse(storedHistory) : [];

    // Determina o próximo ID
    const maxId = history.length > 0
      ? Math.max(...history.map(a => a.id || 0))
      : 0;

    // Cria nova atividade
    const newActivity = {
      id: maxId + 1,
      usuarioId: parseInt(usuarioId),
      usuarioNome: usuarioNome,
      tipoAcao: tipoAcao,
      detalhes: detalhes || null,
      dataHora: new Date().toISOString()
    };

    // Adiciona ao histórico
    history.push(newActivity);
    localStorage.setItem('biblioteca_historico', JSON.stringify(history));

    return {
      success: true,
      message: 'Atividade registrada com sucesso!',
      activity: newActivity
    };
  } catch (error) {
    console.error('Erro ao registrar atividade:', error);
    return { success: false, message: 'Erro ao registrar atividade' };
  }
};

/**
 * Filtra histórico por tipo de ação
 * @param {string} tipoAcao - Tipo de ação para filtrar
 * @returns {Promise<Array>}
 */
export const filterHistoryByAction = async (tipoAcao) => {
  const history = await getAllHistory();
  if (!tipoAcao || tipoAcao === 'Todos') return history;
  return history.filter(activity => activity.tipoAcao === tipoAcao);
};

/**
 * Filtra histórico por usuário
 * @param {number} usuarioId - ID do usuário
 * @returns {Promise<Array>}
 */
export const filterHistoryByUser = async (usuarioId) => {
  const history = await getAllHistory();
  const userId = typeof usuarioId === 'string' ? parseInt(usuarioId, 10) : usuarioId;
  return history.filter(activity => activity.usuarioId === userId || activity.usuarioId === usuarioId);
};

/**
 * Limpa todo o histórico (apenas para administradores)
 * @returns {Object} { success: boolean, message?: string }
 */
export const clearHistory = async () => {
  try {
    localStorage.removeItem('biblioteca_historico');
    return { success: true, message: 'Histórico limpo com sucesso!' };
  } catch (error) {
    console.error('Erro ao limpar histórico:', error);
    return { success: false, message: 'Erro ao limpar histórico' };
  }
};

