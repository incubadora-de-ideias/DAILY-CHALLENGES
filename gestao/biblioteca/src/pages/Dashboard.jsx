import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { getAllBooks } from '../services/booksService';
import { getAllUsers } from '../services/usersService';
import { FaBook, FaCheckCircle, FaBookOpen, FaUsers, FaPlus, FaSearch, FaChartBar } from 'react-icons/fa';

const Dashboard = () => {
  const { user, isAdmin } = useAuth();
  const [stats, setStats] = useState({
    totalBooks: 0,
    availableBooks: 0,
    borrowedBooks: 0,
    totalUsers: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadStats();
  }, []);

  const loadStats = async () => {
    try {
      const books = await getAllBooks();
      const users = await getAllUsers();
      
      const available = books.filter(b => b.status === 'Disponível').length;
      const borrowed = books.filter(b => b.status === 'Emprestado').length;

      setStats({
        totalBooks: books.length,
        availableBooks: available,
        borrowedBooks: borrowed,
        totalUsers: users.length
      });
    } catch (error) {
      console.error('Erro ao carregar estatísticas:', error);
    } finally {
      setLoading(false);
    }
  };

  const StatCard = ({ title, value, icon, color, link }) => {
    const content = (
      <div style={{
        backgroundColor: 'white',
        padding: '20px',
        borderRadius: '8px',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
        display: 'flex',
        alignItems: 'center',
        gap: '15px',
        transition: 'transform 0.2s',
        cursor: link ? 'pointer' : 'default'
      }}
      onMouseOver={(e) => link && (e.currentTarget.style.transform = 'translateY(-2px)')}
      onMouseOut={(e) => link && (e.currentTarget.style.transform = 'translateY(0)')}
      >
        <div style={{
          width: '60px',
          height: '60px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: color + '20',
          borderRadius: '8px'
        }}>
          <span style={{ fontSize: '32px', color: color }}>
            {icon}
          </span>
        </div>
        <div>
          <h3 style={{ margin: 0, color: '#114de3', fontSize: '14px', fontWeight: '500' }}>
            {title}
          </h3>
          <p style={{ margin: '5px 0 0 0', fontSize: '28px', fontWeight: 'bold', color: color }}>
            {loading ? '...' : value}
          </p>
        </div>
      </div>
    );

    if (link) {
      return <Link to={link} style={{ textDecoration: 'none', color: 'inherit' }}>{content}</Link>;
    }
    return content;
  };

  return (
    <div style={{ padding: '30px', boxSizing: 'border-box' }}>
      <div style={{ marginBottom: '30px' }}>
        <p style={{ color: '#ecf0f0', marginTop: '5px', fontSize: '16px' }}>
          {isAdmin ? 'Painel de Administração' : 'Painel do Usuário'}
        </p>
      </div>

      {/* Cards de Estatísticas */}
      <div className="dashboard-stats-grid" style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
        gap: '20px',
        marginBottom: '30px'
      }}>
        <StatCard
          title="Total de Livros"
          value={stats.totalBooks}
          icon={<FaBook />}
          color="#3498db"
          link="/books"
        />
        <StatCard
          title="Disponíveis"
          value={stats.availableBooks}
          icon={<FaCheckCircle />}
          color="#27ae60"
          link="/books"
        />
        <StatCard
          title="Emprestados"
          value={stats.borrowedBooks}
          icon={<FaBookOpen />}
          color="#f39c12"
          link="/loans"
        />
        {isAdmin && (
          <StatCard
            title="Usuários"
            value={stats.totalUsers}
            icon={<FaUsers />}
            color="#9b59b6"
            link="/users"
          />
        )}
      </div>

      {/* Ações Rápidas */}
      <div style={{
        backgroundColor: 'white',
        padding: '25px',
        borderRadius: '8px',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
      }}>
        <h2 style={{ marginTop: 0, color: '#2c3e50', marginBottom: '20px' }}>Ações Rápidas</h2>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '15px'
        }}>
          <Link
            to="/books"
            style={{
              padding: '15px',
              backgroundColor: '#3498db',
              color: 'white',
              textDecoration: 'none',
              borderRadius: '6px',
              textAlign: 'center',
              fontWeight: '500',
              transition: 'background-color 0.3s',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px'
            }}
            onMouseOver={(e) => e.target.style.backgroundColor = '#2980b9'}
            onMouseOut={(e) => e.target.style.backgroundColor = '#3498db'}
          >
            <FaPlus />
            Cadastrar Livro
          </Link>
          
          <Link
            to="/loans"
            style={{
              padding: '15px',
              backgroundColor: '#27ae60',
              color: 'white',
              textDecoration: 'none',
              borderRadius: '6px',
              textAlign: 'center',
              fontWeight: '500',
              transition: 'background-color 0.3s',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px'
            }}
            onMouseOver={(e) => e.target.style.backgroundColor = '#229954'}
            onMouseOut={(e) => e.target.style.backgroundColor = '#27ae60'}
          >
            <FaBookOpen />
            Novo Empréstimo
          </Link>
          
          <Link
            to="/books"
            style={{
              padding: '15px',
              backgroundColor: '#f39c12',
              color: 'white',
              textDecoration: 'none',
              borderRadius: '6px',
              textAlign: 'center',
              fontWeight: '500',
              transition: 'background-color 0.3s',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px'
            }}
            onMouseOver={(e) => e.target.style.backgroundColor = '#e67e22'}
            onMouseOut={(e) => e.target.style.backgroundColor = '#f39c12'}
          >
            <FaSearch />
            Buscar Livros
          </Link>
          
          <Link
            to="/reports"
            style={{
              padding: '15px',
              backgroundColor: '#9b59b6',
              color: 'white',
              textDecoration: 'none',
              borderRadius: '6px',
              textAlign: 'center',
              fontWeight: '500',
              transition: 'background-color 0.3s',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px'
            }}
            onMouseOver={(e) => e.target.style.backgroundColor = '#8e44ad'}
            onMouseOut={(e) => e.target.style.backgroundColor = '#9b59b6'}
          >
            <FaChartBar />
            Ver Relatórios
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

