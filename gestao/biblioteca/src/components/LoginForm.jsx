import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { authenticateUser } from '../services/authService';
import '../styles/authForms.css';

// Este componente LoginForm cuida do estado e da lógica do formulário de login.
// Ele define variáveis de estado para email, senha, erro e loading.
// Também obtém funções de autenticação (login) e navegação (navigate) dos hooks/contextos necessários.
const LoginForm = () => {
  // email e setEmail: armazenam e atualizam o valor do campo de email.
  const [email, setEmail] = useState('');
  // password e setPassword: armazenam e atualizam o valor do campo de senha.
  const [password, setPassword] = useState('');
  // error e setError: gerenciam mensagens de erro ao tentar fazer login.
  const [error, setError] = useState('');
  // loading e setLoading: controlam o estado de carregamento ao enviar o formulário de login.
  const [loading, setLoading] = useState(false);
  // showPassword: controla a visibilidade da senha
  const [showPassword, setShowPassword] = useState(false);
  // login: função para autenticar o usuário e atualizar o contexto de autenticação.
  const { login } = useAuth();
  // navigate: função para redirecionar para outra página após login bem-sucedido.
  const navigate = useNavigate();

  // handleSubmit: função para lidar com o envio do formulário de login.
  // Ela previne o comportamento padrão do formulário, limpa mensagens de erro e define loading como true.
  // Em seguida, realiza a autenticação do usuário e atualiza o contexto de autenticação.
  // Se a autenticação for bem-sucedida, redireciona para a página de dashboard.
  // Caso contrário, exibe uma mensagem de erro.
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    // Validação básica
    if (!email || !password) {
      setError('Por favor, preencha todos os campos');
      setLoading(false);
      return;
    }

    // Validação: senha deve conter letras e números
    const hasLetter = /[A-Za-z]/.test(password);
    const hasNumber = /[0-9]/.test(password);
    if (!hasLetter || !hasNumber) {
      setError('A senha deve conter letras e números');
      setLoading(false);
      return;
    }

    try {
      const result = await authenticateUser(email, password);

      if (result.success) {
        // Autenticação bem-sucedida
        login(result.user);
        navigate('/dashboard');
      } else {
        // Autenticação falhou
        setError(result.message || 'Credenciais inválidas');
      }
    } catch (err) {
      setError('Erro ao fazer login. Por favor, tente novamente.');
      console.error('Erro ao fazer login:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-form-container">
      <h2>LOGIN</h2>

      <form onSubmit={handleSubmit}>
        {error && (
          <div className="error-message">
            {error}
          </div>
        )}

        <div className="auth-form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="seu@email.com"
            disabled={loading}
            required
          />
        </div>

        <div className="auth-form-group">
          <label htmlFor="password">Senha:</label>
          <div className="auth-password-wrapper">
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              value={password}
              onChange={(e) => {
                const value = e.target.value;
                // Permite apenas letras e números
                if (/^[A-Za-z0-9]*$/.test(value)) {
                  setPassword(value);
                  // Limpa erro quando o usuário começa a digitar
                  if (error) setError('');
                }
              }}
              placeholder="Letras e números"
              disabled={loading}
              required
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

        <div className="auth-form-actions">
          <button 
            type="submit" 
            className="auth-btn auth-btn-primary"
            disabled={loading}
          >
            {loading ? 'Entrando...' : 'Entrar'}
          </button>
        </div>

        <p>
          Não tem uma conta?{' '}
          <Link to="/register">
            Criar conta
          </Link>
        </p>
      </form>
    </div>
  );
};

export default LoginForm;

