import React, { useState, useEffect } from 'react';
import { getUserById, createUser, updateUser } from '../services/usersService';
import { useAuth } from '../context/AuthContext';
import '../styles/forms.css';

const UserForm = ({ userId, onSuccess, onCancel }) => {
  const { user: currentUser } = useAuth();
  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    senha: '',
    confirmarSenha: '',
    tipo: 'Comum'
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    if (userId) {
      loadUser();
      setIsEditing(true);
    }
  }, [userId]);

  const loadUser = async () => {
    try {
      const user = await getUserById(userId);
      if (user) {
        setFormData({
          nome: user.nome || '',
          email: user.email || '',
          senha: '',
          confirmarSenha: '',
          tipo: user.tipo || 'Comum'
        });
      }
    } catch (err) {
      setError('Erro ao carregar usuário');
      console.error('Erro ao carregar usuário:', err);
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

    // Validação
    if (!formData.nome || !formData.email) {
      setError('Nome e email são obrigatórios');
      setLoading(false);
      return;
    }

    // Se estiver criando novo usuário ou alterando senha, valida senha
    if (!isEditing || formData.senha) {
      if (!formData.senha) {
        setError('Senha é obrigatória');
        setLoading(false);
        return;
      }
      if (formData.senha.length < 6) {
        setError('A senha deve ter pelo menos 6 caracteres');
        setLoading(false);
        return;
      }
      if (formData.senha !== formData.confirmarSenha) {
        setError('As senhas não coincidem');
        setLoading(false);
        return;
      }
    }

    try {
      let result;
      if (isEditing) {
        // Atualiza usuário (envia senha apenas se fornecida)
        const updateData = {
          nome: formData.nome,
          email: formData.email,
          tipo: formData.tipo
        };
        if (formData.senha) {
          updateData.senha = formData.senha;
        }
        result = await updateUser(userId, updateData, currentUser);
      } else {
        // Cria novo usuário
        result = await createUser({
          nome: formData.nome,
          email: formData.email,
          senha: formData.senha,
          tipo: formData.tipo
        }, currentUser);
      }

      if (result.success) {
        // Reseta formulário se estiver criando novo usuário
        if (!isEditing) {
          setFormData({
            nome: '',
            email: '',
            senha: '',
            confirmarSenha: '',
            tipo: 'Comum'
          });
        } else {
          // Limpa campos de senha após atualização
          setFormData(prev => ({
            ...prev,
            senha: '',
            confirmarSenha: ''
          }));
        }
        if (onSuccess) {
          onSuccess(result.user || result);
        }
      } else {
        setError(result.message || 'Erro ao salvar usuário');
      }
    } catch (err) {
      setError('Erro ao salvar usuário. Tente novamente.');
      console.error('Erro ao salvar usuário:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="form-container" style={{ maxWidth: '600px', margin: '0 auto' }}>
      <h2 style={{ fontSize: '24px', marginBottom: '20px' }}>
        {isEditing ? 'Editar Usuário' : 'Cadastrar Novo Usuário'}
      </h2>
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
          <label htmlFor="nome">Nome Completo: *</label>
          <input
            type="text"
            id="nome"
            name="nome"
            value={formData.nome}
            onChange={handleChange}
            placeholder="Ex: João Silva"
            disabled={loading}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="email">Email: *</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="seu@email.com"
            disabled={loading}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="senha">
            Senha: {isEditing ? '(deixe em branco para não alterar)' : '*'}
          </label>
          <input
            type="password"
            id="senha"
            name="senha"
            value={formData.senha}
            onChange={handleChange}
            placeholder={isEditing ? "Deixe em branco para manter a senha atual" : "Mínimo 6 caracteres"}
            disabled={loading}
            required={!isEditing}
            minLength={isEditing ? 0 : 6}
          />
        </div>

        {(!isEditing || formData.senha) && (
          <div className="form-group">
            <label htmlFor="confirmarSenha">Confirmar Senha: *</label>
            <input
              type="password"
              id="confirmarSenha"
              name="confirmarSenha"
              value={formData.confirmarSenha}
              onChange={handleChange}
              placeholder="Digite a senha novamente"
              disabled={loading}
              required={!isEditing || !!formData.senha}
              minLength={6}
            />
          </div>
        )}

        <div className="form-group">
          <label htmlFor="tipo">Tipo de Usuário: *</label>
          <select
            id="tipo"
            name="tipo"
            value={formData.tipo}
            onChange={handleChange}
            disabled={loading}
            required
          >
            <option value="Comum">Comum</option>
            <option value="Admin">Administrador</option>
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

export default UserForm;

