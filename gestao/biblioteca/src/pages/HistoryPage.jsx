import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { getAllHistory, filterHistoryByAction, ActionTypes, clearHistory } from '../services/historyService';
import { FaHistory, FaFilter, FaTrash, FaClock } from 'react-icons/fa';
import '../styles/tables.css';

const HistoryPage = () => {
  const { isAdmin } = useAuth();
  const [activities, setActivities] = useState([]);
  const [filteredActivities, setFilteredActivities] = useState([]);
  const [actionFilter, setActionFilter] = useState('Todos');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!isAdmin) {
      setError('Apenas administradores podem acessar esta página');
      return;
    }
    loadHistory();
  }, [isAdmin]);

  useEffect(() => {
    applyFilter();
  }, [activities, actionFilter]);

  const loadHistory = async () => {
    try {
      setLoading(true);
      const data = await getAllHistory();
      setActivities(data);
    } catch (err) {
      console.error('Erro ao carregar histórico:', err);
      setError('Erro ao carregar histórico de atividades.');
    } finally {
      setLoading(false);
    }
  };

  const applyFilter = async () => {
    try {
      if (actionFilter === 'Todos') {
        setFilteredActivities(activities);
      } else {
        const filtered = await filterHistoryByAction(actionFilter);
        setFilteredActivities(filtered);
      }
    } catch (err) {
      console.error('Erro ao aplicar filtro:', err);
    }
  };

  const handleFilterChange = (e) => {
    setActionFilter(e.target.value);
  };

  const handleClearHistory = async () => {
    if (window.confirm('Tem certeza que deseja limpar todo o histórico? Esta ação não pode ser desfeita.')) {
      try {
        const result = await clearHistory();
        if (result.success) {
          loadHistory();
          alert('Histórico limpo com sucesso!');
        } else {
          alert(result.message || 'Erro ao limpar histórico.');
        }
      } catch (err) {
        console.error('Erro ao limpar histórico:', err);
        alert('Erro ao limpar histórico. Tente novamente.');
      }
    }
  };

  const formatDateTime = (dateTimeString) => {
    if (!dateTimeString) return '-';
    const date = new Date(dateTimeString);
    return date.toLocaleString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    });
  };

  const getActionBadgeColor = (tipoAcao) => {
    switch (tipoAcao) {
      case ActionTypes.LOGIN:
      case ActionTypes.REGISTER:
        return '#28a745'; // Verde
      case ActionTypes.USER_DELETE:
      case ActionTypes.BOOK_DELETE:
      case ActionTypes.LOAN_DELETE:
        return '#dc3545'; // Vermelho
      case ActionTypes.USER_UPDATE:
      case ActionTypes.BOOK_UPDATE:
        return '#ffc107'; // Amarelo
      case ActionTypes.BOOK_CREATE:
      case ActionTypes.LOAN_CREATE:
        return '#17a2b8'; // Azul claro
      case ActionTypes.LOAN_RETURN:
        return '#6f42c1'; // Roxo
      case ActionTypes.LOGOUT:
        return '#6c757d'; // Cinza
      default:
        return '#007bff'; // Azul
    }
  };

  if (!isAdmin) {
    return (
      <div style={{ padding: '30px' }}>
        <h1 style={{ color: '#dc3545' }}>Acesso Negado</h1>
        <p>Apenas administradores podem acessar esta página.</p>
      </div>
    );
  }

  return (
    <div style={{ padding: '30px' }}>
      <div className="history-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px', flexWrap: 'wrap', gap: '15px' }}>
        <div>
          <h1 style={{ margin: 0, color: '#ffffff', display: 'flex', alignItems: 'center', gap: '10px' }}>
      
            Histórico de Atividades
          </h1>
        
        </div>
        <button
          onClick={handleClearHistory}
          className="btn-clear-history"
          style={{
            padding: '10px',
            backgroundColor: '#dc3545',
            color: 'white',
            border: 'none',
            borderRadius: '6px',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontWeight: '500',
            transition: 'background-color 0.3s',
            width: '40px',
            height: '40px'
          }}
          onMouseOver={(e) => e.target.style.backgroundColor = '#c0392b'}
          onMouseOut={(e) => e.target.style.backgroundColor = '#dc3545'}
          title="Limpar Histórico"
        >
          <FaTrash />
        </button>
      </div>

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

      {/* Filtro */}
      <div className="history-filters" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', flexWrap: 'wrap', gap: '15px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <FaFilter style={{ color: '#ffffff' }} />
          <select
            value={actionFilter}
            onChange={handleFilterChange}
            style={{
              padding: '10px',
              border: '1px solid #ddd',
              backgroundColor: '#ffffff',
              borderRadius: '15px',
              fontSize: '14px',
              cursor: 'pointer',
              minWidth: '200px',
              color: '#000000'
            }}
          >
            <option value="Todos">Todas as Ações</option>
            <option value={ActionTypes.LOGIN}>Login</option>
            <option value={ActionTypes.REGISTER}>Cadastro de Usuário</option>
            <option value={ActionTypes.USER_UPDATE}>Atualização de Usuário</option>
            <option value={ActionTypes.USER_DELETE}>Exclusão de Usuário</option>
            <option value={ActionTypes.BOOK_CREATE}>Cadastro de Livro</option>
            <option value={ActionTypes.BOOK_UPDATE}>Atualização de Livro</option>
            <option value={ActionTypes.BOOK_DELETE}>Exclusão de Livro</option>
            <option value={ActionTypes.LOAN_CREATE}>Empréstimo</option>
            <option value={ActionTypes.LOAN_RETURN}>Devolução</option>
            <option value={ActionTypes.LOAN_DELETE}>Exclusão de Empréstimo</option>
            <option value={ActionTypes.LOGOUT}>Logout</option>
          </select>
        </div>
        <p className="history-total" style={{ margin: 0, color: '#f5f0f0', fontSize: '14px' }}>
          Total: {filteredActivities.length}
        </p>
      </div>

      {/* Tabela de Histórico */}
      {loading ? (
        <p>Carregando histórico...</p>
      ) : filteredActivities.length === 0 ? (
        <div style={{
          textAlign: 'center',
          padding: '40px',
          backgroundColor: 'white',
          borderRadius: '8px',
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
        }}>
          <FaHistory style={{ fontSize: '48px', color: '#bdc3c7', marginBottom: '15px' }} />
          <p style={{ color: '#787777', fontSize: '16px' }}>
            Nenhuma atividade registrada ainda.
          </p>
        </div>
      ) : (
        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Usuário</th>
                <th>Tipo de Ação</th>
                <th>Detalhes</th>
                <th>Data e Hora</th>
              </tr>
            </thead>
            <tbody>
              {filteredActivities.map(activity => (
                <tr key={activity.id}>
                  <td>{activity.id}</td>
                  <td>
                    <strong>{activity.usuarioNome}</strong>
                    <br />
                    <small style={{ color: '#6c757d' }}>ID: {activity.usuarioId}</small>
                  </td>
                  <td>
                    <span style={{
                      backgroundColor: getActionBadgeColor(activity.tipoAcao),
                      color: 'white',
                      padding: '4px 12px',
                      borderRadius: '12px',
                      fontSize: '0.85em',
                      fontWeight: 'bold'
                    }}>
                      {activity.tipoAcao}
                    </span>
                  </td>
                  <td>
                    {activity.detalhes ? (
                      <span style={{ color: '#555', fontSize: '0.9em' }}>
                        {activity.detalhes}
                      </span>
                    ) : (
                      <span style={{ color: '#999', fontStyle: 'italic' }}>-</span>
                    )}
                  </td>
                  <td>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                      <FaClock style={{ color: '#6c757d', fontSize: '12px' }} />
                      <span style={{ fontSize: '0.9em' }}>
                        {formatDateTime(activity.dataHora)}
                      </span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default HistoryPage;
