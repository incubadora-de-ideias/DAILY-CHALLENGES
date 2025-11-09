import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { getAllUsers, deleteUser } from '../services/usersService';
import UserForm from '../components/UserForm';
import { FaEdit, FaTrash, FaCrown, FaUser } from 'react-icons/fa';
import '../styles/tables.css';

const UsersPage = () => {
  const { user: currentUser, isAdmin } = useAuth();
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingUserId, setEditingUserId] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!isAdmin) {
      setError('Apenas administradores podem acessar esta página');
      return;
    }
    loadUsers();
  }, [isAdmin]);

  useEffect(() => {
    applyFilters();
  }, [users, searchTerm]);

  const loadUsers = async () => {
    try {
      setLoading(true);
      const allUsers = await getAllUsers();
      setUsers(allUsers);
      setFilteredUsers(allUsers);
    } catch (err) {
      setError('Erro ao carregar usuários');
      console.error('Erro ao carregar usuários:', err);
    } finally {
      setLoading(false);
    }
  };

  const applyFilters = () => {
    try {
      let filtered = [...users];

      // Aplica filtro de busca
      if (searchTerm) {
        const term = searchTerm.toLowerCase();
        filtered = filtered.filter(user => 
          user.nome.toLowerCase().includes(term) ||
          user.email.toLowerCase().includes(term) ||
          user.tipo.toLowerCase().includes(term)
        );
      }

      setFilteredUsers(filtered);
    } catch (err) {
      console.error('Erro ao aplicar filtros:', err);
    }
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleCreate = () => {
    setEditingUserId(null);
    setShowForm(true);
  };

  const handleEdit = (userId) => {
    setEditingUserId(userId);
    setShowForm(true);
  };

  const handleDelete = async (userId) => {
    // Impede excluir o usuário atual
    if (currentUser && currentUser.id === userId) {
      alert('Você não pode excluir seu próprio usuário!');
      return;
    }

    const user = users.find(u => u.id === userId);
    const confirmMessage = `Tem certeza que deseja excluir o usuário "${user?.nome}" (${user?.email})?`;
    
    if (window.confirm(confirmMessage)) {
      try {
        const result = await deleteUser(userId, currentUser);
        if (result.success) {
          await loadUsers();
        } else {
          alert(result.message || 'Erro ao excluir usuário');
        }
      } catch (err) {
        alert('Erro ao excluir usuário');
        console.error('Erro ao excluir usuário:', err);
      }
    }
  };

  const handleFormSuccess = () => {
    setShowForm(false);
    setEditingUserId(null);
    loadUsers();
  };

  const handleFormCancel = () => {
    setShowForm(false);
    setEditingUserId(null);
  };

  if (!isAdmin) {
    return (
      <div style={{ padding: '30px', textAlign: 'center' }}>
        <h1 style={{ color: '#dc3545' }}>Acesso Negado</h1>
        <p>Apenas administradores podem acessar a gestão de usuários.</p>
      </div>
    );
  }

  if (showForm) {
    return (
      <div style={{ padding: '20px' }}>
        <UserForm
          userId={editingUserId}
          onSuccess={handleFormSuccess}
          onCancel={handleFormCancel}
        />
      </div>
    );
  }

  return (
    <div style={{ padding: '30px', boxSizing: 'border-box' }}>
      <div style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center',
        marginBottom: '20px',
        flexWrap: 'wrap',
        gap: '15px'
      }}>
        <h1 style={{ margin: 0, fontSize: '28px' }}>Gestão de Usuários</h1>
        <button 
          onClick={handleCreate}
          className="btn btn-primary"
          style={{ whiteSpace: 'nowrap' }}
        >
          + Novo Usuário
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

      {/* Barra de Busca */}
      <div style={{ 
        marginBottom: '20px'
      }}>
        <input
          type="text"
          placeholder="Buscar por nome, email ou tipo..."
          value={searchTerm}
          onChange={handleSearch}
          style={{
            width: '100%',
            backgroundColor: 'white',
            color: 'black',
            maxWidth: '400px',
            padding: '10px',
            border: '1px solid #0762d0c8',
            borderRadius: '15px',
            fontSize: '14px'
          }}
        />
      </div>

      {/* Tabela de Usuários */}
      {loading ? (
        <p>Carregando usuários...</p>
      ) : filteredUsers.length === 0 ? (
        <p>Nenhum usuário encontrado.</p>
      ) : (
        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Nome</th>
                <th>Email</th>
                <th>Tipo</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map(user => {
                const isCurrentUser = currentUser && currentUser.id === user.id;
                
                return (
                  <tr 
                    key={user.id}
                    style={{
                      backgroundColor: isCurrentUser ? '#e3f2fd' : 'white'
                    }}
                  >
                    <td>{user.id}</td>
                    <td>
                      {user.nome}
                      {isCurrentUser && (
                        <span style={{ 
                          marginLeft: '8px',
                          fontSize: '12px',
                          color: '#1976d2',
                          fontWeight: 'bold'
                        }}>
                          (Você)
                        </span>
                      )}
                    </td>
                    <td>{user.email}</td>
                    <td>
                      <span style={{
                        padding: '4px 8px',
                        borderRadius: '4px',
                        fontSize: '12px',
                        fontWeight: '500',
                        backgroundColor: user.tipo === 'Admin' ? '#fff3cd' : '#d4edda',
                        color: user.tipo === 'Admin' ? '#856404' : '#155724'
                      }}                      >
                        {user.tipo === 'Admin' ? (
                          <>
                            <FaCrown style={{ marginRight: '5px' }} />
                            Admin
                          </>
                        ) : (
                          <>
                            <FaUser style={{ marginRight: '5px' }} />
                            Comum
                          </>
                        )}
                      </span>
                    </td>
                    <td>
                      <div className="table-actions">
                        <button
                          onClick={() => handleEdit(user.id)}
                          className="btn-edit"
                          title="Editar"
                          style={{ display: 'flex', alignItems: 'center', gap: '5px' }}
                        >
                          <FaEdit />
                          Editar
                        </button>
                        {!isCurrentUser && (
                          <button
                            onClick={() => handleDelete(user.id)}
                            className="btn-delete"
                            title="Excluir"
                            style={{ display: 'flex', alignItems: 'center', gap: '5px' }}
                          >
                            <FaTrash />
                            Excluir
                          </button>
                        )}
                        {isCurrentUser && (
                          <span style={{ 
                            fontSize: '12px', 
                            color: '#6c757d',
                            fontStyle: 'italic'
                          }}>
                            Não pode excluir
                          </span>
                        )}
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
        <p>Total de usuários: {filteredUsers.length} de {users.length}</p>
      </div>
    </div>
  );
};

export default UsersPage;
