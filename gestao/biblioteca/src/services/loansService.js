// Serviço de empréstimos para gerenciar os dados de empréstimos
// Pode ser adaptado para uso com JSON, SQLite ou API
import emprestimosData from '../data/emprestimos.json';
import { getBookById, updateBook } from './booksService';
import { getUserById } from './usersService';
import { logActivity, ActionTypes } from './historyService';

/**
 * Busca todos os empréstimos (combina dados do JSON com o localStorage)
 */
export const getAllLoans = async () => {
  try {
    // Busca empréstimos do localStorage
    const storedLoans = localStorage.getItem('biblioteca_emprestimos');
    const localLoans = storedLoans ? JSON.parse(storedLoans) : [];
    
    // Combina com dados iniciais do JSON, removendo duplicados por ID
    // Empréstimos do localStorage têm precedência sobre os do JSON
    const jsonLoanIds = new Set(emprestimosData.map(l => l.id));
    const uniqueLocalLoans = localLoans.filter(l => !jsonLoanIds.has(l.id));
    const allLoans = [...emprestimosData, ...uniqueLocalLoans];
    
    // Remove possíveis duplicados restantes por ID (mantém a primeira ocorrência)
    const seenIds = new Set();
    const uniqueLoans = allLoans.filter(loan => {
      if (seenIds.has(loan.id)) {
        return false;
      }
      seenIds.add(loan.id);
      return true;
    });
    
    // Ordena por data (mais recentes primeiro)
    return uniqueLoans.sort((a, b) => {
      const dateA = new Date(a.dataEmprestimo || 0);
      const dateB = new Date(b.dataEmprestimo || 0);
      return dateB - dateA;
    });
  } catch (error) {
    console.error('Erro ao buscar empréstimos:', error);
    return emprestimosData;
  }
};

/**
 * Busca um empréstimo pelo ID
 */
export const getLoanById = async (id) => {
  const loans = await getAllLoans();
  // Convert both to numbers for comparison
  const loanId = typeof id === 'string' ? parseInt(id, 10) : id;
  return loans.find(l => l.id === loanId || l.id === id) || null;
};

/**
 * Busca todos os empréstimos ativos (ainda não devolvidos)
 */
export const getActiveLoans = async () => {
  const loans = await getAllLoans();
  return loans.filter(l => !l.dataDevolucao);
};

/**
 * Busca todos os empréstimos já devolvidos
 */
export const getReturnedLoans = async () => {
  const loans = await getAllLoans();
  return loans.filter(l => l.dataDevolucao);
};

/**
 * Cria um novo empréstimo
 * @param {Object} loanData - Dados do empréstimo { livroId, usuarioId, dataEmprestimo, dataPrevistaDevolucao }
 * @param {Object} currentUser - Usuário atual que está realizando a ação (opcional)
 * @returns {Object} { success: boolean, message?: string, loan?: Object }
 */
export const createLoan = async (loanData, currentUser = null) => {
  try {
    const { livroId, usuarioId, dataEmprestimo, dataPrevistaDevolucao } = loanData;

    // Validação
    if (!livroId || !usuarioId || !dataEmprestimo) {
      return { success: false, message: 'Campos obrigatórios: livro, usuário e data de empréstimo' };
    }

    // Verifica se o livro existe e está disponível
    // Converte livroId para número se necessário
    const bookId = typeof livroId === 'string' ? parseInt(livroId, 10) : livroId;
    const book = await getBookById(bookId);
    if (!book) {
      return { success: false, message: 'Livro não encontrado' };
    }
    if (book.status !== 'Disponível') {
      return { success: false, message: `Livro não está disponível. Status atual: ${book.status}` };
    }

    // Busca todos os empréstimos para determinar o próximo ID
    const allLoans = await getAllLoans();
    const maxId = allLoans.length > 0 
      ? Math.max(...allLoans.map(l => l.id || 0))
      : 0;

    // Cria novo empréstimo
    const newLoan = {
      id: maxId + 1,
      livroId: parseInt(livroId),
      usuarioId: parseInt(usuarioId),
      dataEmprestimo: dataEmprestimo,
      dataPrevistaDevolucao: dataPrevistaDevolucao || null,
      dataDevolucao: null,
      status: 'Ativo'
    };

    // Busca empréstimos já existentes no localStorage
    const storedLoans = localStorage.getItem('biblioteca_emprestimos');
    const localLoans = storedLoans ? JSON.parse(storedLoans) : [];

    // Adiciona o novo empréstimo ao localStorage
    localLoans.push(newLoan);
    localStorage.setItem('biblioteca_emprestimos', JSON.stringify(localLoans));

    // Atualiza status do livro para "Emprestado"
    await updateBook(bookId, {
      ...book,
      status: 'Emprestado'
    }, currentUser);

    // Registra atividade
    if (currentUser) {
      const borrowerUser = await getUserById(usuarioId);
      await logActivity({
        usuarioId: currentUser.id,
        usuarioNome: currentUser.nome,
        tipoAcao: ActionTypes.LOAN_CREATE,
        detalhes: `Registrou empréstimo do livro "${book.titulo}" para ${borrowerUser?.nome || 'Usuário Desconhecido'}`
      });
    }

    return {
      success: true,
      message: 'Empréstimo registrado com sucesso!',
      loan: newLoan
    };
  } catch (error) {
    console.error('Erro ao registrar empréstimo:', error);
    return { success: false, message: 'Erro ao registrar empréstimo' };
  }
};

/**
 * Realiza a devolução de um empréstimo (registra devolução)
 * @param {number} id - ID do empréstimo
 * @param {Object} currentUser - Usuário atual que está realizando a ação (opcional)
 * @returns {Object} { success: boolean, message?: string, loan?: Object }
 */
export const returnLoan = async (id, currentUser = null) => {
  try {
    const loan = await getLoanById(id);
    if (!loan) {
      return { success: false, message: 'Empréstimo não encontrado' };
    }

    if (loan.dataDevolucao) {
      return { success: false, message: 'Este empréstimo já foi devolvido' };
    }

    // Busca todos os empréstimos do localStorage
    const storedLoans = localStorage.getItem('biblioteca_emprestimos');
    const localLoans = storedLoans ? JSON.parse(storedLoans) : [];
    
    const loanIndex = localLoans.findIndex(l => l.id === id);
    if (loanIndex === -1) {
      return { success: false, message: 'Empréstimo não encontrado no armazenamento local' };
    }

    // Atualiza o empréstimo com a data de devolução
    const today = new Date().toISOString().split('T')[0];
    localLoans[loanIndex] = {
      ...localLoans[loanIndex],
      dataDevolucao: today,
      status: 'Devolvido'
    };
    localStorage.setItem('biblioteca_emprestimos', JSON.stringify(localLoans));

    // Atualiza o status do livro para "Disponível"
    const bookId = typeof loan.livroId === 'string' ? parseInt(loan.livroId, 10) : loan.livroId;
    const book = await getBookById(bookId);
    if (book) {
      await updateBook(bookId, {
        ...book,
        status: 'Disponível'
      }, currentUser);
    }

    // Registra atividade
    if (currentUser) {
      const borrowerUser = await getUserById(loan.usuarioId);
      await logActivity({
        usuarioId: currentUser.id,
        usuarioNome: currentUser.nome,
        tipoAcao: ActionTypes.LOAN_RETURN,
        detalhes: `Registrou devolução do livro "${book?.titulo || 'Desconhecido'}" de ${borrowerUser?.nome || 'Usuário Desconhecido'}`
      });
    }

    return {
      success: true,
      message: 'Devolução registrada com sucesso!',
      loan: localLoans[loanIndex]
    };
  } catch (error) {
    console.error('Erro ao registrar devolução:', error);
    return { success: false, message: 'Erro ao registrar devolução' };
  }
};

/**
 * Atualiza um empréstimo
 */
export const updateLoan = async (id, loanData) => {
  try {
    const storedLoans = localStorage.getItem('biblioteca_emprestimos');
    const localLoans = storedLoans ? JSON.parse(storedLoans) : [];
    
    const loanIndex = localLoans.findIndex(l => l.id === id);
    if (loanIndex === -1) {
      return { success: false, message: 'Empréstimo não encontrado' };
    }

    localLoans[loanIndex] = { ...localLoans[loanIndex], ...loanData };
    localStorage.setItem('biblioteca_emprestimos', JSON.stringify(localLoans));
    
    return { success: true, loan: localLoans[loanIndex] };
  } catch (error) {
    console.error('Erro ao atualizar empréstimo:', error);
    return { success: false, message: 'Erro ao atualizar empréstimo' };
  }
};

/**
 * Exclui um empréstimo
 * @param {number} id - ID do empréstimo
 * @param {Object} currentUser - Usuário atual que está realizando a ação (opcional)
 * @returns {Object} { success: boolean, message?: string }
 */
export const deleteLoan = async (id, currentUser = null) => {
  try {
    const loan = await getLoanById(id);
    if (!loan) {
      return { success: false, message: 'Empréstimo não encontrado' };
    }

    // Se o empréstimo estiver ativo, devolve o livro primeiro
    const bookId = typeof loan.livroId === 'string' ? parseInt(loan.livroId, 10) : loan.livroId;
    const book = await getBookById(bookId);
    
    if (!loan.dataDevolucao && book) {
      await updateBook(bookId, {
        ...book,
        status: 'Disponível'
      }, currentUser);
    }

    const storedLoans = localStorage.getItem('biblioteca_emprestimos');
    const localLoans = storedLoans ? JSON.parse(storedLoans) : [];
    
    const filteredLoans = localLoans.filter(l => l.id !== id);
    localStorage.setItem('biblioteca_emprestimos', JSON.stringify(filteredLoans));
    
    // Registra atividade
    if (currentUser) {
      const borrowerUser = await getUserById(loan.usuarioId);
      await logActivity({
        usuarioId: currentUser.id,
        usuarioNome: currentUser.nome,
        tipoAcao: ActionTypes.LOAN_DELETE,
        detalhes: `Excluiu empréstimo do livro "${book?.titulo || 'Desconhecido'}" de ${borrowerUser?.nome || 'Usuário Desconhecido'} (ID: ${id})`
      });
    }
    
    return { success: true, message: 'Empréstimo excluído com sucesso!' };
  } catch (error) {
    console.error('Erro ao excluir empréstimo:', error);
    return { success: false, message: 'Erro ao excluir empréstimo' };
  }
};
