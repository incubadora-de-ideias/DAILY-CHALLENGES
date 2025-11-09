import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { getAllBooks, deleteBook } from '../services/booksService';
import BookForm from '../components/BookForm';
import { FaEdit, FaTrash } from 'react-icons/fa';
import '../styles/tables.css';

const BooksPage = () => {
  const [books, setBooks] = useState([]);
  const [filteredBooks, setFilteredBooks] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('Todos');
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingBookId, setEditingBookId] = useState(null);
  const [error, setError] = useState('');
  const { isAdmin, user: currentUser } = useAuth();

  useEffect(() => {
    loadBooks();
  }, []);

  useEffect(() => {
    applyFilters();
  }, [books, searchTerm, statusFilter]);

  const loadBooks = async () => {
    try {
      setLoading(true);
      const allBooks = await getAllBooks();
      setBooks(allBooks);
      setFilteredBooks(allBooks);
    } catch (err) {
      setError('Erro ao carregar livros');
      console.error('Erro ao carregar livros:', err);
    } finally {
      setLoading(false);
    }
  };

  const applyFilters = () => {
    try {
      let filtered = [...books];

      // Aplica filtro de busca
      if (searchTerm) {
        const term = searchTerm.toLowerCase();
        filtered = filtered.filter(book => 
          book.titulo.toLowerCase().includes(term) ||
          book.autor.toLowerCase().includes(term)
        );
      }

      // Aplica filtro de status
      if (statusFilter && statusFilter !== 'Todos') {
        filtered = filtered.filter(book => book.status === statusFilter);
      }

      setFilteredBooks(filtered);
    } catch (err) {
      console.error('Erro ao aplicar filtros:', err);
    }
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleStatusFilter = (e) => {
    setStatusFilter(e.target.value);
  };

  const handleCreate = () => {
    setEditingBookId(null);
    setShowForm(true);
  };

  const handleEdit = (bookId) => {
    setEditingBookId(bookId);
    setShowForm(true);
  };

  const handleDelete = async (bookId) => {
    if (!isAdmin) {
      alert('Apenas administradores podem excluir livros.');
      return;
    }

    const book = books.find(b => b.id === bookId);
    const confirmMessage = `Tem certeza que deseja excluir o livro "${book?.titulo}"?`;
    
    if (window.confirm(confirmMessage)) {
      try {
        const result = await deleteBook(bookId, currentUser);
        if (result.success) {
          await loadBooks();
        } else {
          alert(result.message || 'Erro ao excluir livro');
        }
      } catch (err) {
        alert('Erro ao excluir livro');
        console.error('Erro ao excluir livro:', err);
      }
    }
  };

  const handleFormSuccess = () => {
    setShowForm(false);
    setEditingBookId(null);
    loadBooks();
  };

  const handleFormCancel = () => {
    setShowForm(false);
    setEditingBookId(null);
  };

  if (showForm) {
    return (
      <div style={{ padding: '20px' }}>
        <BookForm
          bookId={editingBookId}
          onSuccess={handleFormSuccess}
          onCancel={handleFormCancel}
        />
      </div>
    );
  }

  return (
    <div style={{ padding: '20px', boxSizing: 'border-box' }}>
      <div style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center',
        marginBottom: '20px',
        flexWrap: 'wrap',
        gap: '15px'
      }}>
        <h1 style={{ margin: 0, fontSize: '28px' }}>Gestão de Livros</h1>
        <button 
          onClick={handleCreate}
          className="btn btn-primary"
          style={{ whiteSpace: 'nowrap' }}
        >
          + Novo Livro
        </button>
      </div>

      {error && (
        <div style={{ 
          color: '#dc3545', 
          marginBottom: '15px', 
          padding: '10px',
          backgroundColor: '#f8d7da',
          borderRadius: '4px'
        }}>
          {error}
        </div>
      )}

      {/* Barra de Busca e Filtro */}
      <div style={{ 
        marginBottom: '20px',
        display: 'flex',
        gap: '10px',
        flexWrap: 'wrap'
      }}>
        <input
          type="text"
          placeholder="Buscar por título ou autor..."
          value={searchTerm}
          onChange={handleSearch}
          style={{
            flex: '1',
            minWidth: '200px',
            backgroundColor: 'white',
            padding: '10px',
            color: 'black',
            border: '1px solid #0762d0c8',
            borderRadius: '15px',
            fontSize: '14px'
          }}
        />
        <select
          value={statusFilter}
          onChange={handleStatusFilter}
          style={{
            padding: '10px',
            border: '1px solid #0762d0c8',
            backgroundColor: 'white',
            color: 'black',
            borderRadius: '15px',
            fontSize: '14px',
            cursor: 'pointer'
          }}
        >
          <option value="Todos">Todos os Status</option>
          <option value="Disponível">Disponível</option>
          <option value="Emprestado">Emprestado</option>
          <option value="Reservado">Reservado</option>
          <option value="Manutenção">Manutenção</option>
        </select>
      </div>

      {/* Tabela de Livros */}
      {loading ? (
        <p>Carregando livros...</p>
      ) : filteredBooks.length === 0 ? (
        <p>Nenhum livro encontrado.</p>
      ) : (
        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Título</th>
                <th>Autor</th>
                <th>Ano</th>
                <th>Gênero</th>
                <th>Status</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {filteredBooks.map(book => (
                <tr key={book.id}>
                  <td style={{color: "black"}}>{book.id}</td>
                  <td style={{color: "black"}}>{book.titulo}</td>
                  <td style={{color: "black"}}>{book.autor}</td>
                  <td style={{color: "black"}}>{book.ano}</td>
                  <td style={{color: "black"}}>{book.genero}</td>
                  <td>
                    <span style={{
                      padding: '4px 8px',
                      borderRadius: '4px',
                      fontSize: '12px',
                      fontWeight: '500',
                      backgroundColor: 
                        book.status === 'Disponível' ? '#d4edda' :
                        book.status === 'Emprestado' ? '#fff3cd' :
                        book.status === 'Reservado' ? '#cce5ff' : '#f8d7da',
                      color: 
                        book.status === 'Disponível' ? '#155724' :
                        book.status === 'Emprestado' ? '#856404' :
                        book.status === 'Reservado' ? '#004085' : '#721c24'
                    }}>
                      {book.status}
                    </span>
                  </td>
                  <td>
                    <div className="table-actions">
                      <button
                        onClick={() => handleEdit(book.id)}
                        className="btn-edit"
                        title="Editar"
                        style={{ display: 'flex', alignItems: 'center', gap: '5px' }}
                      >
                        <FaEdit />
                        Editar
                      </button>
                      {isAdmin && (
                        <button
                          onClick={() => handleDelete(book.id)}
                          className="btn-delete"
                          title="Excluir"
                          style={{ display: 'flex', alignItems: 'center', gap: '5px' }}
                        >
                          <FaTrash />
                          Excluir
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <div style={{ marginTop: '20px', color: '#6c757d' }}>
        <p>Total de livros: {filteredBooks.length} de {books.length}</p>
      </div>
    </div>
  );
};

export default BooksPage;
