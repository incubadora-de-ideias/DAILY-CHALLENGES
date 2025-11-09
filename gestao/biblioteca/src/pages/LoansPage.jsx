import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { getAllLoans, getActiveLoans, getReturnedLoans, returnLoan, deleteLoan } from '../services/loansService';
import { getAllBooks } from '../services/booksService';
import { getAllUsers } from '../services/usersService';
import LoanForm from '../components/LoanForm';
import { formatDate, isOverdue } from '../utils/dateUtils';
import { FaCheckCircle, FaTrash } from 'react-icons/fa';
import '../styles/tables.css';

const LoansPage = () => {
  const { isAdmin, user: currentUser } = useAuth();
  const [loans, setLoans] = useState([]);
  const [books, setBooks] = useState([]);
  const [users, setUsers] = useState([]);
  const [filter, setFilter] = useState('Todos'); // Todos, Ativos, Finalizados
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!isAdmin) {
      setError('Apenas administradores podem acessar esta página');
      return;
    }
    loadData();
  }, [isAdmin]);

  const loadData = async () => {
    try {
      setLoading(true);
      const [loansData, booksData, usersData] = await Promise.all([
        getAllLoans(),
        getAllBooks(),
        getAllUsers()
      ]);
      
      setLoans(loansData);
      setBooks(booksData);
      setUsers(usersData);
    } catch (err) {
      setError('Erro ao carregar dados');
      console.error('Erro ao carregar dados:', err);
    } finally {
      setLoading(false);
    }
  };

  const getFilteredLoans = () => {
    if (filter === 'Ativos') {
      return loans.filter(l => !l.dataDevolucao);
    } else if (filter === 'Finalizados') {
      return loans.filter(l => l.dataDevolucao);
    }
    return loans;
  };

  const getBookName = (bookId) => {
    const book = books.find(b => b.id === bookId);
    return book ? `${book.titulo} - ${book.autor}` : 'Livro não encontrado';
  };

  const getUserName = (userId) => {
    const user = users.find(u => u.id === userId);
    return user ? user.nome : 'Usuário não encontrado';
  };

  const handleReturn = async (loanId) => {
    if (!window.confirm('Tem certeza que deseja registar a devolução deste empréstimo?')) {
      return;
    }

    try {
        const result = await returnLoan(loanId, currentUser);
      if (result.success) {
        await loadData();
      } else {
        alert(result.message || 'Erro ao registrar devolução');
      }
    } catch (err) {
      alert('Erro ao registrar devolução');
      console.error('Erro ao registrar devolução:', err);
    }
  };

  const handleDelete = async (loanId) => {
    if (!window.confirm('Tem certeza que deseja excluir este empréstimo?')) {
      return;
    }

    try {
        const result = await deleteLoan(loanId, currentUser);
      if (result.success) {
        await loadData();
      } else {
        alert(result.message || 'Erro ao excluir empréstimo');
      }
    } catch (err) {
      alert('Erro ao excluir empréstimo');
      console.error('Erro ao excluir empréstimo:', err);
    }
  };

  const handleFormSuccess = () => {
    setShowForm(false);
    loadData();
  };

  const handleFormCancel = () => {
    setShowForm(false);
  };

  if (!isAdmin) {
    return (
      <div style={{ padding: '30px', textAlign: 'center' }}>
        <h1 style={{ color: '#dc3545' }}>Acesso Negado</h1>
        <p>Apenas administradores podem acessar a gestão de empréstimos.</p>
      </div>
    );
  }

  if (showForm) {
    return (
      <div style={{ padding: '20px' }}>
        <LoanForm
          onSuccess={handleFormSuccess}
          onCancel={handleFormCancel}
        />
      </div>
    );
  }

  const filteredLoans = getFilteredLoans();
  const activeLoans = loans.filter(l => !l.dataDevolucao).length;
  const returnedLoans = loans.filter(l => l.dataDevolucao).length;

  return (
    <div style={{ padding: '30px', boxSizing: 'border-box' }}>
      <div style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center',
        marginBottom: '16px',
        flexWrap: 'wrap',
        gap: '15px'
      }}>
        <h1 style={{ margin: 0, fontSize: '28px' }}>Gestão de Empréstimos</h1>
        <button 
          onClick={() => setShowForm(true)}
          className="btn btn-primary"
          style={{ whiteSpace: 'nowrap' }}
        >
          + Novo Empréstimo
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

      {/* Local onde aparece as Estatísticas */}
      <div className="loans-stats-grid" style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
        gap: '15px',
        marginBottom: '20px'
      }}>
        <div style={{
          backgroundColor: 'white',
          padding: '15px',
          borderRadius: '8px',
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
          textAlign: 'center'
        }}>
          <h3 style={{ margin: 0, color: '#2c3e50', fontSize: '14px' }}>Total</h3>
          <p style={{ margin: '5px 0 0 0', fontSize: '24px', fontWeight: 'bold', color: '#3498db' }}>
            {loans.length}
          </p>
        </div>
        <div style={{
          backgroundColor: 'white',
          padding: '15px',
          borderRadius: '8px',
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
          textAlign: 'center'
        }}>
          <h3 style={{ margin: 0, color: '#2c3e50', fontSize: '14px' }}>Ativos</h3>
          <p style={{ margin: '5px 0 0 0', fontSize: '24px', fontWeight: 'bold', color: '#f39c12' }}>
            {activeLoans}
          </p>
        </div>
        <div style={{
          backgroundColor: 'white',
          padding: '15px',
          borderRadius: '8px',
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
          textAlign: 'center'
        }}>
          <h3 style={{ margin: 0, color: '#2c3e50', fontSize: '14px' }}>Devolvidos</h3>
          <p style={{ margin: '5px 0 0 0', fontSize: '24px', fontWeight: 'bold', color: '#27ae60' }}>
            {returnedLoans}
          </p>
        </div>
      </div>

      {/* Filtro */}
      <div style={{ marginBottom: '20px' }}>
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          style={{
            padding: '10px',
            border: '1px solid #ddd',
            backgroundColor: 'white',
            color: 'black',
            borderRadius: '15px',
            fontSize: '14px',
            cursor: 'pointer'
          }}
        >
          <option value="Todos">Todos os Empréstimos</option>
          <option value="Ativos">Empréstimos Ativos</option>
          <option value="Finalizados">Empréstimos Finalizados</option>
        </select>
      </div>

      {/* Tabela de Empréstimos */}
      {loading ? (
        <p>Carregando empréstimos...</p>
      ) : filteredLoans.length === 0 ? (
        <p>Nenhum empréstimo encontrado.</p>
      ) : (
        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Livro</th>
                <th>Usuário</th>
                <th>Data Empréstimo</th>
                <th>Data Prevista</th>
                <th>Data Devolução</th>
                <th>Status</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {filteredLoans.map(loan => {
                const isOverdueLoan = !loan.dataDevolucao && loan.dataPrevistaDevolucao && 
                  isOverdue(loan.dataPrevistaDevolucao);
                
                return (
                  <tr key={loan.id} style={{
                    backgroundColor: isOverdueLoan ? '#fff3cd' : 'white'
                  }}>
                    <td>{loan.id}</td>
                    <td>{getBookName(loan.livroId)}</td>
                    <td>{getUserName(loan.usuarioId)}</td>
                    <td>{formatDate(loan.dataEmprestimo)}</td>
                    <td>{loan.dataPrevistaDevolucao ? formatDate(loan.dataPrevistaDevolucao) : '-'}</td>
                    <td>{loan.dataDevolucao ? formatDate(loan.dataDevolucao) : '-'}</td>
                    <td>
                      {loan.dataDevolucao ? (
                        <span style={{
                          padding: '4px 8px',
                          borderRadius: '4px',
                          fontSize: '12px',
                          fontWeight: '500',
                          backgroundColor: '#d4edda',
                          color: '#155724'
                        }}>
                          Devolvido
                        </span>
                      ) : isOverdueLoan ? (
                        <span style={{
                          padding: '4px 8px',
                          borderRadius: '4px',
                          fontSize: '12px',
                          fontWeight: '500',
                          backgroundColor: '#f8d7da',
                          color: '#721c24'
                        }}>
                          Atrasado
                        </span>
                      ) : (
                        <span style={{
                          padding: '4px 8px',
                          borderRadius: '4px',
                          fontSize: '12px',
                          fontWeight: '500',
                          backgroundColor: '#fff3cd',
                          color: '#856404'
                        }}>
                          Ativo
                        </span>
                      )}
                    </td>
                    <td>
                      <div className="table-actions">
                        {!loan.dataDevolucao && (
                          <button
                            onClick={() => handleReturn(loan.id)}
                            className="btn-edit"
                            title="Registrar Devolução"
                            style={{ display: 'flex', alignItems: 'center', gap: '5px' }}
                          >
                            <FaCheckCircle />
                            Devolver
                          </button>
                        )}
                        <button
                          onClick={() => handleDelete(loan.id)}
                          className="btn-delete"
                          title="Excluir"
                          style={{ display: 'flex', alignItems: 'center', gap: '5px' }}
                        >
                          <FaTrash />
                          Excluir
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}

      <div style={{ marginTop: '20px', color: '#6c757d' }}>
        <p>Total: {filteredLoans.length} de {loans.length} empréstimos</p>
      </div>
    </div>
  );
};

export default LoansPage;
