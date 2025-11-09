// Serviço de livros para gerenciar dados de livros
// Pode ser adaptado para uso com JSON, SQLite ou API
import livrosData from '../data/livros.json';
import { logActivity, ActionTypes } from './historyService';

/**
 * Busca todos os livros (combina dados do JSON com o localStorage)
 */
export const getAllBooks = async () => {
  try {
    // Busca livros do localStorage (livros adicionados recentemente)
    const storedBooks = localStorage.getItem('biblioteca_livros');
    const localBooks = storedBooks ? JSON.parse(storedBooks) : [];
    
    // Combina com dados iniciais do JSON, removendo duplicados por ID
    // Livros do localStorage têm precedência sobre os do JSON
    const jsonBookIds = new Set(livrosData.map(b => b.id));
    const uniqueLocalBooks = localBooks.filter(b => !jsonBookIds.has(b.id));
    const allBooks = [...livrosData, ...uniqueLocalBooks];
    
    // Remove possíveis duplicados restantes por ID (mantém a primeira ocorrência)
    const seenIds = new Set();
    const uniqueBooks = allBooks.filter(book => {
      if (seenIds.has(book.id)) {
        return false;
      }
      seenIds.add(book.id);
      return true;
    });
    
    return uniqueBooks;
  } catch (error) {
    console.error('Erro ao buscar livros:', error);
    return livrosData;
  }
};

/**
 * Busca um livro pelo ID
 */
export const getBookById = async (id) => {
  const books = await getAllBooks();
  // Converte ambos para números para comparação
  const bookId = typeof id === 'string' ? parseInt(id, 10) : id;
  return books.find(b => b.id === bookId || b.id === id) || null;
};

/**
 * Cria um novo livro
 * @param {Object} bookData - Dados do livro { titulo, autor, ano, genero, status }
 * @param {Object} currentUser - Usuário atual que está realizando a ação (opcional)
 * @returns {Object} { success: boolean, message?: string, book?: Object }
 */
export const createBook = async (bookData, currentUser = null) => {
  try {
    const { titulo, autor, ano, genero, status = 'Disponível' } = bookData;

    // Validação
    if (!titulo || !autor || !ano || !genero) {
      return { success: false, message: 'Todos os campos são obrigatórios' };
    }

    // Valida ano
    const year = parseInt(ano);
    if (isNaN(year) || year < 0 || year > new Date().getFullYear() + 1) {
      return { success: false, message: 'Ano inválido' };
    }

    // Busca todos os livros para determinar o próximo ID
    const allBooks = await getAllBooks();
    const maxId = allBooks.length > 0 
      ? Math.max(...allBooks.map(b => b.id || 0))
      : 0;

    // Cria novo livro
    const newBook = {
      id: maxId + 1,
      titulo: titulo.trim(),
      autor: autor.trim(),
      ano: year,
      genero: genero.trim(),
      status: status || 'Disponível'
    };

    // Busca livros já existentes no localStorage
    const storedBooks = localStorage.getItem('biblioteca_livros');
    const localBooks = storedBooks ? JSON.parse(storedBooks) : [];

    // Adiciona o novo livro ao localStorage
    localBooks.push(newBook);
    localStorage.setItem('biblioteca_livros', JSON.stringify(localBooks));

    // Registra atividade
    if (currentUser) {
      await logActivity({
        usuarioId: currentUser.id,
        usuarioNome: currentUser.nome,
        tipoAcao: ActionTypes.BOOK_CREATE,
        detalhes: `Cadastrou o livro: ${titulo} - ${autor}`
      });
    }

    return {
      success: true,
      message: 'Livro cadastrado com sucesso!',
      book: newBook
    };
  } catch (error) {
    console.error('Erro ao cadastrar livro:', error);
    return { success: false, message: 'Erro ao cadastrar livro' };
  }
};

/**
 * Atualiza um livro
 * @param {number} id - ID do livro
 * @param {Object} bookData - Dados atualizados do livro
 * @param {Object} currentUser - Usuário atual que está realizando a ação (opcional)
 * @returns {Object} { success: boolean, message?: string, book?: Object }
 */
export const updateBook = async (id, bookData, currentUser = null) => {
  try {
    const { titulo, autor, ano, genero, status } = bookData;

    // Validação
    if (!titulo || !autor || !ano || !genero) {
      return { success: false, message: 'Todos os campos são obrigatórios' };
    }

    // Valida ano
    const year = parseInt(ano);
    if (isNaN(year) || year < 0 || year > new Date().getFullYear() + 1) {
      return { success: false, message: 'Ano inválido' };
    }

    // Converte id para número se necessário
    const bookId = typeof id === 'string' ? parseInt(id, 10) : id;

    // Busca todos os livros
    const allBooks = await getAllBooks();
    const bookIndex = allBooks.findIndex(b => b.id === bookId || b.id === id);
    
    if (bookIndex === -1) {
      return { success: false, message: 'Livro não encontrado' };
    }

    const oldBook = allBooks[bookIndex];

    // Verifica se o livro está no localStorage ou no JSON
    const storedBooks = localStorage.getItem('biblioteca_livros');
    const localBooks = storedBooks ? JSON.parse(storedBooks) : [];
    const localBookIndex = localBooks.findIndex(b => b.id === bookId || b.id === id);

    if (localBookIndex !== -1) {
      // Atualiza no localStorage
      localBooks[localBookIndex] = {
        ...localBooks[localBookIndex],
        titulo: titulo.trim(),
        autor: autor.trim(),
        ano: year,
        genero: genero.trim(),
        status: status || localBooks[localBookIndex].status
      };
      localStorage.setItem('biblioteca_livros', JSON.stringify(localBooks));
      
      // Registra atividade
      if (currentUser) {
        await logActivity({
          usuarioId: currentUser.id,
          usuarioNome: currentUser.nome,
          tipoAcao: ActionTypes.BOOK_UPDATE,
          detalhes: `Atualizou o livro: ${oldBook.titulo} - ${oldBook.autor} (ID: ${bookId})`
        });
      }
      
      return { success: true, book: localBooks[localBookIndex] };
    } else {
      // Livro está no JSON, adiciona ao localStorage como nova entrada
      const updatedBook = {
        ...allBooks[bookIndex],
        titulo: titulo.trim(),
        autor: autor.trim(),
        ano: year,
        genero: genero.trim(),
        status: status || allBooks[bookIndex].status
      };
      localBooks.push(updatedBook);
      localStorage.setItem('biblioteca_livros', JSON.stringify(localBooks));
      
      // Registra atividade
      if (currentUser) {
        await logActivity({
          usuarioId: currentUser.id,
          usuarioNome: currentUser.nome,
          tipoAcao: ActionTypes.BOOK_UPDATE,
          detalhes: `Atualizou o livro: ${oldBook.titulo} - ${oldBook.autor} (ID: ${bookId})`
        });
      }
      
      return { success: true, book: updatedBook };
    }
  } catch (error) {
    console.error('Erro ao atualizar livro:', error);
    return { success: false, message: 'Erro ao atualizar livro' };
  }
};

/**
 * Exclui um livro
 * @param {number} id - ID do livro
 * @param {Object} currentUser - Usuário atual que está realizando a ação (opcional)
 * @returns {Object} { success: boolean, message?: string }
 */
export const deleteBook = async (id, currentUser = null) => {
  try {
    // Busca o livro antes de excluir para registrar a atividade
    const bookToDelete = await getBookById(id);
    
    const storedBooks = localStorage.getItem('biblioteca_livros');
    const localBooks = storedBooks ? JSON.parse(storedBooks) : [];
    
    const filteredBooks = localBooks.filter(b => b.id !== id);
    localStorage.setItem('biblioteca_livros', JSON.stringify(filteredBooks));
    
    // Registra atividade
    if (currentUser && bookToDelete) {
      await logActivity({
        usuarioId: currentUser.id,
        usuarioNome: currentUser.nome,
        tipoAcao: ActionTypes.BOOK_DELETE,
        detalhes: `Excluiu o livro: ${bookToDelete.titulo} - ${bookToDelete.autor} (ID: ${id})`
      });
    }
    
    return { success: true, message: 'Livro excluído com sucesso!' };
  } catch (error) {
    console.error('Erro ao excluir livro:', error);
    return { success: false, message: 'Erro ao excluir livro' };
  }
};

/**
 * Busca livros por título ou autor
 * @param {string} searchTerm - Termo de busca
 * @returns {Promise<Array>}
 */
export const searchBooks = async (searchTerm) => {
  const books = await getAllBooks();
  if (!searchTerm) return books;
  
  const term = searchTerm.toLowerCase();
  return books.filter(book => 
    book.titulo.toLowerCase().includes(term) ||
    book.autor.toLowerCase().includes(term)
  );
};

/**
 * Filtra livros por status
 * @param {string} status - Filtro de status
 * @returns {Promise<Array>}
 */
export const filterBooksByStatus = async (status) => {
  const books = await getAllBooks();
  if (!status || status === 'Todos') return books;
  return books.filter(book => book.status === status);
};

