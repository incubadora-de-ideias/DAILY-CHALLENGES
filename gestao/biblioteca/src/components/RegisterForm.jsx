import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { createUser } from '../services/usersService';
import '../styles/authForms.css';


const RegisterForm = () => {
  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    senha: '',
    confirmarSenha: '',
    tipo: 'Comum'
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);
  ///Os Olhos para mostrar a senha
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    // Para campos de senha, permite apenas letras e números
    let filteredValue = value;
    if (name === 'senha' || name === 'confirmarSenha') {
      filteredValue = value.replace(/[^A-Za-z0-9]/g, '');
    }
    setFormData(prev => ({
      ...prev,
      [name]: filteredValue
    }));
    // Limpa erros quando o usuário digita
    if (error) setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);

    // Validação
    if (!formData.nome || !formData.email || !formData.senha || !formData.confirmarSenha) {
      setError('Por favor, preencha todos os campos');
      setLoading(false);
      return;
    }

    if (formData.senha !== formData.confirmarSenha) {
      setError('As senhas não coincidem');
      setLoading(false);
      return;
    }

    if (formData.senha.length < 6 ) {
      setError('A senha deve ter pelo menos 6 caracteres');
      setLoading(false);
      return;
    }

    // Validação: senha deve conter letras e números
    const hasLetter = /[A-Za-z]/.test(formData.senha);
    const hasNumber = /[0-9]/.test(formData.senha);
    if (!hasLetter || !hasNumber) {
      setError('A senha deve conter letras e números');
      setLoading(false);
      return;
    }

    try {
      const result = await createUser({
        nome: formData.nome,
        email: formData.email,
        senha: formData.senha,
        tipo: formData.tipo
      });

      if (result.success) {
        setSuccess('Cadastro realizado com sucesso! Redirecionando...');
        // Login automático após cadastro
        login(result.user);
        // Redireciona para dashboard após 1.5 segundos
        setTimeout(() => {
          navigate('/dashboard');
        }, 2000);
      } else {
        setError(result.message || 'Erro ao cadastrar usuário');
      }
    } catch (err) {
      setError('Erro ao fazer cadastro. Tente novamente.');
      console.error('Erro ao fazer cadastro:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-form-container">
      <h2>CRIAR CONTA</h2>

      <form onSubmit={handleSubmit}>
        {error && (
          <div className="error-message">
            {error}
          </div>
        )}

        {success && (
          <div className="success-message">
            {success}
          </div>
        )}

        <div className="auth-form-group">
          <label htmlFor="nome">Nome Completo:</label>
          <input
            type="text"
            id="nome"
            name="nome"
            value={formData.nome}
            onChange={handleChange}
            placeholder="Digite seu nome completo"
            disabled={loading}
            required
          />
        </div>

        <div className="auth-form-group">
          <label htmlFor="email">Email:</label>
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

        <div className="auth-form-group">
          <label htmlFor="senha">Senha:</label>
          <div className="auth-password-wrapper">
            <input
              type={showPassword ? "text" : "password"}
              id="senha"
              name="senha"
              value={formData.senha}
              onChange={handleChange}
              placeholder="Letras e números (mín. 6)"
              disabled={loading}
              required
              minLength={6}
              pattern="[A-Za-z0-9]+"
              title="A senha deve conter apenas letras e números"
            />
            <button
              type="button"
              className="auth-password-toggle"
              onClick={() => setShowPassword(!showPassword)}
              disabled={loading}
            >
              {showPassword ? (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path>
                  <line x1="1" y1="1" x2="23" y2="23"></line>
                </svg>
              ) : (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                  <circle cx="12" cy="12" r="3"></circle>
                </svg>
              )}
            </button>
          </div>
        </div>

        <div className="auth-form-group">
          <label htmlFor="confirmarSenha">Confirmar Senha:</label>
          <div className="auth-password-wrapper">
            <input
              type={showConfirmPassword ? "text" : "password"}
              id="confirmarSenha"
              name="confirmarSenha"
              value={formData.confirmarSenha}
              onChange={handleChange}
              placeholder="Confirme a senha"
              disabled={loading}
              required
              minLength={6}
              pattern="[A-Za-z0-9]+"
              title="A senha deve conter apenas letras e números"
            />
            <button
              type="button"
              className="auth-password-toggle"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              disabled={loading}
            >
              {showConfirmPassword ? (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path>
                  <line x1="1" y1="1" x2="23" y2="23"></line>
                </svg>
              ) : (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                  <circle cx="12" cy="12" r="3"></circle>
                </svg>
              )}
            </button>
          </div>
        </div>

        <div className="auth-form-group">
          <label htmlFor="tipo">Tipo de Usuário:</label>
          <select
            id="tipo"
            name="tipo"
            value={formData.tipo}
            onChange={handleChange}
            disabled={loading}
          >
            <option value="Comum">Comum</option>
            <option value="Admin">Admin</option>
          </select>
          <small>
            Nota: Em produção, apenas administradores podem criar contas Admin
          </small>
        </div>

        <div className="auth-form-actions">
          <button 
            type="submit" 
            className="auth-btn auth-btn-primary"
            disabled={loading}
          >
            {loading ? 'Cadastrando...' : 'Cadastrar'}
          </button>
        </div>

        <p>
          Já tem uma conta?{' '}
          <Link to="/login">
            Fazer login
          </Link>
        </p>
      </form>
    </div>
  );
};

export default RegisterForm;

