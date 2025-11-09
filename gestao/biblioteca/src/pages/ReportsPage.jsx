import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { getAllBooks } from '../services/booksService';
import { getAllLoans, getActiveLoans } from '../services/loansService';
import { getAllUsers } from '../services/usersService';
import { exportToCSV } from '../utils/exportUtils';
import { FaBook, FaCheckCircle, FaBookOpen, FaUsers, FaFileCsv, FaFilePdf, FaChartBar } from 'react-icons/fa';
import '../styles/tables.css';

const ReportsPage = () => {
  const { isAdmin } = useAuth();
  const [stats, setStats] = useState({
    totalBooks: 0,
    availableBooks: 0,
    borrowedBooks: 0,
    activeLoans: 0,
    totalLoans: 0
  });
  const [topUsers, setTopUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!isAdmin) {
      setError('Apenas administradores podem acessar esta página');
      return;
    }
    loadReports();
  }, [isAdmin]);

  const loadReports = async () => {
    try {
      setLoading(true);
      const [books, loans, users] = await Promise.all([
        getAllBooks(),
        getAllLoans(),
        getAllUsers()
      ]);

      // Calcula estatísticas de livros
      const available = books.filter(b => b.status === 'Disponível').length;
      const borrowed = books.filter(b => b.status === 'Emprestado').length;

      // Calcula empréstimos ativos
      const activeLoans = loans.filter(l => !l.dataDevolucao).length;

      // Calcula top 5 usuários com mais empréstimos
      const userLoanCounts = {};
      loans.forEach(loan => {
        const userId = loan.usuarioId;
        if (!userLoanCounts[userId]) {
          userLoanCounts[userId] = 0;
        }
        userLoanCounts[userId]++;
      });

      const topUsersData = Object.entries(userLoanCounts)
        .map(([userId, count]) => {
          const user = users.find(u => u.id === parseInt(userId));
          return {
            userId: parseInt(userId),
            nome: user ? user.nome : 'Usuário Desconhecido',
            email: user ? user.email : '',
            totalEmprestimos: count
          };
        })
        .sort((a, b) => b.totalEmprestimos - a.totalEmprestimos)
        .slice(0, 5);

      setStats({
        totalBooks: books.length,
        availableBooks: available,
        borrowedBooks: borrowed,
        activeLoans: activeLoans,
        totalLoans: loans.length
      });

      setTopUsers(topUsersData);
    } catch (err) {
      console.error('Erro ao carregar relatórios:', err);
      setError('Erro ao carregar dados dos relatórios.');
    } finally {
      setLoading(false);
    }
  };

  const exportReportsToCSV = () => {
    const reportData = [
      {
        'Métrica': 'Total de Livros',
        'Valor': stats.totalBooks
      },
      {
        'Métrica': 'Livros Disponíveis',
        'Valor': stats.availableBooks
      },
      {
        'Métrica': 'Livros Emprestados',
        'Valor': stats.borrowedBooks
      },
      {
        'Métrica': 'Empréstimos Ativos',
        'Valor': stats.activeLoans
      },
      {
        'Métrica': 'Total de Empréstimos',
        'Valor': stats.totalLoans
      }
    ];

    exportToCSV(reportData, 'relatorio_biblioteca.csv');
  };

  const exportTopUsersToCSV = () => {
    const topUsersData = topUsers.map((user, index) => ({
      'Posição': index + 1,
      'Nome': user.nome,
      'Email': user.email,
      'Total de Empréstimos': user.totalEmprestimos
    }));

    exportToCSV(topUsersData, 'top_usuarios.csv');
  };

  const exportToPDF = () => {
    // Cria um documento HTML para impressão/PDF
    const printWindow = window.open('', '_blank');
    const htmlContent = `
      <!DOCTYPE html>
      <html>
        <head>
          <title>Relatório da Biblioteca</title>
          <style>
            body {
              font-family: Arial, sans-serif;
              padding: 20px;
              color: #333;
            }
            h1 {
              color: #2c3e50;
              border-bottom: 3px solid #3498db;
              padding-bottom: 10px;
            }
            h2 {
              color: #34495e;
              margin-top: 30px;
            }
            .stats-grid {
              display: grid;
              grid-template-columns: repeat(2, 1fr);
              gap: 20px;
              margin: 20px 0;
            }
            .stat-card {
              border: 1px solid #ddd;
              padding: 15px;
              border-radius: 8px;
              background-color: #f9f9f9;
            }
            .stat-label {
              font-size: 14px;
              color: #666;
              margin-bottom: 5px;
            }
            .stat-value {
              font-size: 24px;
              font-weight: bold;
              color: #2c3e50;
            }
            table {
              width: 100%;
              border-collapse: collapse;
              margin: 20px 0;
            }
            th, td {
              border: 1px solid #ddd;
              padding: 12px;
              text-align: left;
            }
            th {
              background-color: #3498db;
              color: white;
            }
            tr:nth-child(even) {
              background-color: #f2f2f2;
            }
            .footer {
              margin-top: 40px;
              text-align: center;
              color: #666;
              font-size: 12px;
            }
          </style>
        </head>
        <body>
          <h1>Relatório da Biblioteca</h1>
          <p><strong>Data do Relatório:</strong> ${new Date().toLocaleDateString('pt-BR')}</p>
          
          <h2>Estatísticas Gerais</h2>
          <div class="stats-grid">
            <div class="stat-card">
              <div class="stat-label">Total de Livros</div>
              <div class="stat-value">${stats.totalBooks}</div>
            </div>
            <div class="stat-card">
              <div class="stat-label">Livros Disponíveis</div>
              <div class="stat-value">${stats.availableBooks}</div>
            </div>
            <div class="stat-card">
              <div class="stat-label">Livros Emprestados</div>
              <div class="stat-value">${stats.borrowedBooks}</div>
            </div>
            <div class="stat-card">
              <div class="stat-label">Empréstimos Ativos</div>
              <div class="stat-value">${stats.activeLoans}</div>
            </div>
            <div class="stat-card">
              <div class="stat-label">Total de Empréstimos</div>
              <div class="stat-value">${stats.totalLoans}</div>
            </div>
          </div>

          <h2>Top 5 Usuários com Mais Empréstimos</h2>
          <table>
            <thead>
              <tr>
                <th>Posição</th>
                <th>Nome</th>
                <th>Email</th>
                <th>Total de Empréstimos</th>
              </tr>
            </thead>
            <tbody>
              ${topUsers.length > 0 
                ? topUsers.map((user, index) => `
                  <tr>
                    <td>${index + 1}º</td>
                    <td>${user.nome}</td>
                    <td>${user.email}</td>
                    <td>${user.totalEmprestimos}</td>
                  </tr>
                `).join('')
                : '<tr><td colspan="4" style="text-align: center;">Nenhum empréstimo registrado ainda.</td></tr>'
              }
            </tbody>
          </table>

          <div class="footer">
            <p>Relatório gerado automaticamente pelo Sistema de Gestão de Biblioteca</p>
          </div>
        </body>
      </html>
    `;

    printWindow.document.write(htmlContent);
    printWindow.document.close();
    printWindow.print();
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
      <div className="reports-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px', flexWrap: 'wrap', gap: '15px' }}>
        <div>
          <h1 style={{ margin: 0, color: '#ffffff', display: 'flex', alignItems: 'center', gap: '10px' }}>
        
            Relatórios e Estatísticas
          </h1>
          
        </div>
        <div className="export-buttons" style={{ display: 'flex', gap: '10px' }}>
          <button
            onClick={exportReportsToCSV}
            className="btn-export-csv"
            style={{
              padding: '10px 20px',
              backgroundColor: '#27ae60',
              color: 'white',
              border: 'none',
              borderRadius: '6px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              fontWeight: '500',
              transition: 'background-color 0.3s'
            }}
            onMouseOver={(e) => e.target.style.backgroundColor = '#229954'}
            onMouseOut={(e) => e.target.style.backgroundColor = '#27ae60'}
          >
            <FaFileCsv />
            Exportar CSV
          </button>
          <button
            onClick={exportToPDF}
            className="btn-export-pdf"
            style={{
              padding: '10px 20px',
              backgroundColor: '#e74c3c',
              color: 'white',
              border: 'none',
              borderRadius: '6px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              fontWeight: '500',
              transition: 'background-color 0.3s'
            }}
            onMouseOver={(e) => e.target.style.backgroundColor = '#c0392b'}
            onMouseOut={(e) => e.target.style.backgroundColor = '#e74c3c'}
          >
            <FaFilePdf />
            Exportar PDF
          </button>
        </div>
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

      {loading ? (
        <p>Carregando relatórios...</p>
      ) : (
        <>
          {/* Cards de Estatsticas */}
          <div className="reports-stats-grid" style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: '20px',
            marginBottom: '30px'
          }}>
            <div style={{
              backgroundColor: 'white',
              padding: '20px',
              borderRadius: '8px',
              boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
              display: 'flex',
              alignItems: 'center',
              gap: '15px'
            }}>
              <div style={{
                width: '60px',
                height: '60px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: '#3498db20',
                borderRadius: '8px'
              }}>
                <span style={{ fontSize: '32px', color: '#3498db' }}>
                  <FaBook />
                </span>
              </div>
              <div className="stat-text">
                <h3 className="stat-title" style={{ margin: 0, color: '#2c3e50', fontSize: '14px', fontWeight: '500' }}>
                  Total de Livros
                </h3>
                <p className="stat-value" style={{ margin: '5px 0 0 0', fontSize: '28px', fontWeight: 'bold', color: '#3498db' }}>
                  {stats.totalBooks}
                </p>
              </div>
            </div>

            <div style={{
              backgroundColor: 'white',
              padding: '20px',
              borderRadius: '8px',
              boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
              display: 'flex',
              alignItems: 'center',
              gap: '15px'
            }}>
              <div style={{
                width: '60px',
                height: '60px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: '#27ae6020',
                borderRadius: '8px'
              }}>
                <span style={{ fontSize: '32px', color: '#27ae60' }}>
                  <FaCheckCircle />
                </span>
              </div>
              <div className="stat-text">
                <h3 className="stat-title" style={{ margin: 0, color: '#2c3e50', fontSize: '14px', fontWeight: '500' }}>
                  Livros Disponíveis
                </h3>
                <p className="stat-value" style={{ margin: '5px 0 0 0', fontSize: '28px', fontWeight: 'bold', color: '#27ae60' }}>
                  {stats.availableBooks}
                </p>
              </div>
            </div>

            <div style={{
              backgroundColor: 'white',
              padding: '20px',
              borderRadius: '8px',
              boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
              display: 'flex',
              alignItems: 'center',
              gap: '15px'
            }}>
              <div style={{
                width: '60px',
                height: '60px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: '#f39c1220',
                borderRadius: '8px'
              }}>
                <span style={{ fontSize: '32px', color: '#f39c12' }}>
                  <FaBookOpen />
                </span>
              </div>
              <div className="stat-text">
                <h3 className="stat-title" style={{ margin: 0, color: '#2c3e50', fontSize: '14px', fontWeight: '500' }}>
                  Livros Emprestados
                </h3>
                <p className="stat-value" style={{ margin: '5px 0 0 0', fontSize: '28px', fontWeight: 'bold', color: '#f39c12' }}>
                  {stats.borrowedBooks}
                </p>
              </div>
            </div>

            <div style={{
              backgroundColor: 'white',
              padding: '20px',
              borderRadius: '8px',
              boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
              display: 'flex',
              alignItems: 'center',
              gap: '15px'
            }}>
              <div style={{
                width: '60px',
                height: '60px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: '#9b59b620',
                borderRadius: '8px'
              }}>
                <span style={{ fontSize: '32px', color: '#9b59b6' }}>
                  <FaUsers />
                </span>
              </div>
              <div className="stat-text">
                <h3 className="stat-title" style={{ margin: 0, color: '#2c3e50', fontSize: '14px', fontWeight: '500' }}>
                  Empréstimos Ativos
                </h3>
                <p className="stat-value" style={{ margin: '5px 0 0 0', fontSize: '28px', fontWeight: 'bold', color: '#9b59b6' }}>
                  {stats.activeLoans}
                </p>
              </div>
            </div>
          </div>

          {/* Top 5 Usuários */}
          <div style={{
            backgroundColor: 'white',
            padding: '25px',
            borderRadius: '8px',
            boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
            marginBottom: '20px'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
              <h2 style={{ margin: 0, color: '#2c3e50' }}>Top 5 Usuários com Mais Empréstimos</h2>
              <button
                onClick={exportTopUsersToCSV}
                style={{
                  padding: '8px 15px',
                  backgroundColor: '#27ae60',
                  color: 'white',
                  border: 'none',
                  borderRadius: '6px',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  fontSize: '14px',
                  fontWeight: '500',
                  transition: 'background-color 0.3s'
                }}
                onMouseOver={(e) => e.target.style.backgroundColor = '#229954'}
                onMouseOut={(e) => e.target.style.backgroundColor = '#27ae60'}
              >
                <FaFileCsv />
                Exportar CSV
              </button>
            </div>

            {topUsers.length === 0 ? (
              <p style={{ color: '#666', textAlign: 'center', padding: '20px' }}>
                Nenhum empréstimo registrado ainda.
              </p>
            ) : (
              <div className="table-container">
                <table>
                  <thead>
                    <tr>
                      <th>Posição</th>
                      <th>Nome</th>
                      <th>Email</th>
                      <th>Total de Empréstimos</th>
                    </tr>
                  </thead>
                  <tbody>
                    {topUsers.map((user, index) => (
                      <tr key={user.userId}>
                        <td>
                          <span style={{
                            display: 'inline-block',
                            width: '30px',
                            height: '30px',
                            borderRadius: '50%',
                            backgroundColor: index === 0 ? '#ffd700' : index === 1 ? '#c0c0c0' : index === 2 ? '#cd7f32' : '#3498db',
                            color: 'white',
                            textAlign: 'center',
                            lineHeight: '30px',
                            fontWeight: 'bold',
                            fontSize: '14px'
                          }}>
                            {index + 1}
                          </span>
                        </td>
                        <td>{user.nome}</td>
                        <td>{user.email}</td>
                        <td>
                          <span style={{
                            backgroundColor: '#3498db',
                            color: 'white',
                            padding: '4px 12px',
                            borderRadius: '12px',
                            fontSize: '0.9em',
                            fontWeight: 'bold'
                          }}>
                            {user.totalEmprestimos}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default ReportsPage;
