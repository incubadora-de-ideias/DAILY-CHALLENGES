import React, { useState, useEffect } from 'react';
import { createBook, updateBook, getBookById } from '../services/booksService';
import { useAuth } from '../context/AuthContext';
import '../styles/forms.css';

const BookForm = ({ bookId, onSuccess, onCancel }) => {
  const { user: currentUser } = useAuth();
  const [formData, setFormData] = useState({
    titulo: '',
    autor: '',
    ano: '',
    genero: '',
    status: 'Disponível'
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    if (bookId) {
      loadBook();
      setIsEditing(true);
    }
  }, [bookId]);

  const loadBook = async () => {
    try {
      const book = await getBookById(bookId);
      if (book) {
        setFormData({
          titulo: book.titulo || '',
          autor: book.autor || '',
          ano: book.ano?.toString() || '',
          genero: book.genero || '',
          status: book.status || 'Disponível'
        });
      }
    } catch (err) {
      setError('Erro ao carregar livro');
      console.error('Erro ao carregar livro:', err);
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

    try {
      let result;
      if (isEditing) {
        result = await updateBook(bookId, formData, currentUser);
      } else {
        result = await createBook(formData, currentUser);
      }

      if (result.success) {
        // Reseta formulário se estiver criando novo livro
        if (!isEditing) {
          setFormData({
            titulo: '',
            autor: '',
            ano: '',
            genero: '',
            status: 'Disponível'
          });
        }
        if (onSuccess) {
          onSuccess(result.book || result);
        }
      } else {
        setError(result.message || 'Erro ao salvar livro');
      }
    } catch (err) {
      setError('Erro ao salvar livro. Tente novamente.');
      console.error('Erro ao salvar livro:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="form-container">
      <h2>{isEditing ? 'Editar Livro' : 'Cadastrar Novo Livro'}</h2>
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
          <label htmlFor="titulo">Título:</label>
          <input
            type="text"
            id="titulo"
            name="titulo"
            value={formData.titulo}
            onChange={handleChange}
            placeholder="Ex: Dom Casmurro"
            disabled={loading}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="autor">Autor:</label>
          <input
            type="text"
            id="autor"
            name="autor"
            value={formData.autor}
            onChange={handleChange}
            placeholder="Ex: Machado de Assis"
            disabled={loading}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="ano">Ano de Publicação:</label>
          <input
            type="number"
            id="ano"
            name="ano"
            value={formData.ano}
            onChange={handleChange}
            placeholder="Ex: 1899"
            disabled={loading}
            required
            min="0"
            max={new Date().getFullYear() + 1}
          />
        </div>

        <div className="form-group">
          <label htmlFor="genero">Gênero:</label>
          <input
            type="text"
            id="genero"
            name="genero"
            value={formData.genero}
            onChange={handleChange}
            placeholder="Ex: Romance, Ficção, Drama..."
            disabled={loading}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="status">Status:</label>
          <select
            id="status"
            name="status"
            value={formData.status}
            onChange={handleChange}
            disabled={loading}
          >
            <option value="Disponível">Disponível</option>
            <option value="Emprestado">Emprestado</option>
            <option value="Reservado">Reservado</option>
            <option value="Manutenção">Manutenção</option>
          </select>
        </div>

        <div className="form-actions">
          <button 
            type="submit" 
            className="btn btn-primary"
            disabled={loading}
          >
            {loading ? 'Salvando...' : (isEditing ? 'Atualizar' : 'Cadastrar')}
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

export default BookForm;
