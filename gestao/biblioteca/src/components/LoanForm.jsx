import React, { useState, useEffect } from 'react';
import { getAllBooks } from '../services/booksService';
import { getAllUsers } from '../services/usersService';
import { createLoan } from '../services/loansService';
import { useAuth } from '../context/AuthContext';
import { addDays } from '../utils/dateUtils';
import '../styles/forms.css';

const LoanForm = ({ onSuccess, onCancel }) => {
  const { user: currentUser } = useAuth();
  const [formData, setFormData] = useState({
    livroId: '',
    usuarioId: '',
    dataEmprestimo: new Date().toISOString().split('T')[0],
    dataPrevistaDevolucao: addDays(new Date(), 14).toISOString().split('T')[0]
  });
  const [books, setBooks] = useState([]);
  const [users, setUsers] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [loadingData, setLoadingData] = useState(true);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const [booksData, usersData] = await Promise.all([
        getAllBooks(),
        getAllUsers()
      ]);
      
      // Filtra apenas livros disponíveis
      const availableBooks = booksData.filter(b => b.status === 'Disponível');
      setBooks(availableBooks);
      setUsers(usersData);
    } catch (err) {
      setError('Erro ao carregar dados');
      console.error('Erro ao carregar dados:', err);
    } finally {
      setLoadingData(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    if (error) setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    if (!formData.livroId || !formData.usuarioId || !formData.dataEmprestimo) {
      setError('Por favor, preencha todos os campos obrigatórios');
      setLoading(false);
      return;
    }

    try {
      const result = await createLoan(formData, currentUser);

      if (result.success) {
        // Reseta formulário
        setFormData({
          livroId: '',
          usuarioId: '',
          dataEmprestimo: new Date().toISOString().split('T')[0],
          dataPrevistaDevolucao: addDays(new Date(), 14).toISOString().split('T')[0]
        });
        if (onSuccess) {
          onSuccess(result.loan);
        }
      } else {
        setError(result.message || 'Erro ao registrar empréstimo');
      }
    } catch (err) {
      setError('Erro ao registrar empréstimo. Tente novamente.');
      console.error('Erro ao registrar empréstimo:', err);
    } finally {
      setLoading(false);
    }
  };

  if (loadingData) {
    return <div>Carregando dados...</div>;
  }

  return (
    <div className="form-container">
      <h2>Registrar Novo Empréstimo</h2>
      <form onSubmit={handleSubmit}>
        {error && (
          <div style={{ 
            color: '#dc3545', 
            marginBottom: '15px', 
            padding: '10px',
            backgroundColor: '#f8d7da',
            borderRadius: '4px',
            border: '1px solid #f5c6cb'
          }}>
            {error}
          </div>
        )}

        <div className="form-group">
          <label htmlFor="livroId">Livro: *</label>
          <select
            id="livroId"
            name="livroId"
            value={formData.livroId}
            onChange={handleChange}
            disabled={loading}
            required
          >
            <option value="">Selecione um livro</option>
            {books.map(book => (
              <option key={book.id} value={book.id}>
                {book.titulo} - {book.autor} ({book.status})
              </option>
            ))}
          </select>
          {books.length === 0 && (
            <small style={{ color: '#dc3545', display: 'block', marginTop: '5px' }}>
              Nenhum livro disponível no momento
            </small>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="usuarioId">Usuário: *</label>
          <select
            id="usuarioId"
            name="usuarioId"
            value={formData.usuarioId}
            onChange={handleChange}
            disabled={loading}
            required
          >
            <option value="">Selecione um usuário</option>
            {users.map(user => (
              <option key={user.id} value={user.id}>
                {user.nome} ({user.email})
              </option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="dataEmprestimo">Data de Empréstimo: *</label>
          <input
            type="date"
            id="dataEmprestimo"
            name="dataEmprestimo"
            value={formData.dataEmprestimo}
            onChange={handleChange}
            disabled={loading}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="dataPrevistaDevolucao">Data Prevista de Devolução:</label>
          <input
            type="date"
            id="dataPrevistaDevolucao"
            name="dataPrevistaDevolucao"
            value={formData.dataPrevistaDevolucao}
            onChange={handleChange}
            disabled={loading}
          />
          <small style={{ display: 'block', marginTop: '5px', color: '#6c757d' }}>
            Padrão: 14 dias a partir da data de empréstimo
          </small>
        </div>

        <div className="form-actions">
          <button 
            type="submit" 
            className="btn btn-primary"
            disabled={loading || books.length === 0}
          >
            {loading ? 'Registrando...' : 'Registrar Empréstimo'}
          </button>
          {onCancel && (
            <button 
              type="button" 
              className="btn btn-secondary"
              onClick={onCancel}
              disabled={loading}
            >
              Cancelar
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default LoanForm;

