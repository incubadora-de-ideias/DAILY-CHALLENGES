import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { FaBook, FaCrown, FaUser, FaBars, FaTimes, FaLock } from 'react-icons/fa';

const Navbar = () => {
  const { user, isAdmin, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
      if (window.innerWidth > 768) {
        setIsMenuOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const isActive = (path) => {
    return location.pathname === path ? 'active' : '';
  };

  return (
    <>
      <nav style={{
        backgroundColor: '#5fb4e9',
        color: 'white',
        padding: '12px 20px',
        borderRadius: '15px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: '-10px',
        boxShadow: '0 2px 4px rgba(5, 109, 128, 0.689)',
        position: 'relative',
        zIndex: 1000
      }}>
        {/* Logo e Hamburger */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
          {isMobile && (
            <button
              onClick={toggleMenu}
              style={{
                backgroundColor: 'transparent',
                border: 'none',
                color: 'white',
                cursor: 'pointer',
                padding: '8px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '20px'
              }}
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <FaTimes /> : <FaBars />}
            </button>
          )}
          <Link 
            to="/dashboard" 
            onClick={isMobile ? closeMenu : undefined}
            style={{ 
              color: 'white', 
              textDecoration: 'none', 
              fontSize: isMobile ? '18px' : '20px',
              fontWeight: 'bold',
              whiteSpace: 'nowrap',
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}
          >
            <FaBook style={{ fontSize: isMobile ? '18px' : '20px' }} />
            Biblioteca
          </Link>
        </div>

        {/* Desktop Menu */}
        {!isMobile && (
          <>
            <div style={{ display: 'flex', gap: '15px', alignItems: 'center' }}>
              <Link
                to="/dashboard"
                style={{
                  color: 'white',
                  textDecoration: 'none',
                  padding: '8px 15px',
                  borderRadius: '17px',
                  backgroundColor: location.pathname === '/dashboard' ? '#094ad4' : 'transparent',
                  transition: 'background-color 0.3s',
                  fontSize: '14px'
                }}
              >
                Dashboard
              </Link>
              
              <Link
                to="/books"
                style={{
                  color: 'white',
                  textDecoration: 'none',
                  padding: '8px 15px',
                  borderRadius: '17px',
                  backgroundColor: location.pathname === '/books' ? '#094ad4' : 'transparent',
                  transition: 'background-color 0.3s',
                  fontSize: '14px'
                }}
              >
                Livros
              </Link>
              
              {isAdmin ? (
                <Link
                  to="/users"
                  style={{
                    color: 'white',
                    textDecoration: 'none',
                    padding: '8px 15px',
                    borderRadius: '17px',
                    backgroundColor: location.pathname === '/users' ? '#094ad4' : 'transparent',
                    transition: 'background-color 0.3s',
                    fontSize: '14px'
                  }}
                >
                  Usuários
                </Link>
              ) : (
                <div
                  style={{
                    color: 'rgba(255, 255, 255, 0.6)',
                    padding: '8px 15px',
                    borderRadius: '17px',
                    fontSize: '14px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    cursor: 'not-allowed'
                  }}
                  title="Apenas administradores"
                >
                  <FaLock style={{ fontSize: '12px' }} />
                  Usuários
                </div>
              )}
              
              {isAdmin ? (
                <Link
                  to="/loans"
                  style={{
                    color: 'white',
                    textDecoration: 'none',
                    padding: '8px 15px',
                    borderRadius: '17px',
                    backgroundColor: location.pathname === '/loans' ? '#094ad4' : 'transparent',
                    transition: 'background-color 0.3s',
                    fontSize: '14px'
                  }}
                >
                  Empréstimos
                </Link>
              ) : (
                <div
                  style={{
                    color: 'rgba(255, 255, 255, 0.6)',
                    padding: '8px 15px',
                    borderRadius: '17px',
                    fontSize: '14px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    cursor: 'not-allowed'
                  }}
                  title="Apenas administradores"
                >
                  <FaLock style={{ fontSize: '12px' }} />
                  Empréstimos
                </div>
              )}
              
              {isAdmin ? (
                <Link
                  to="/reports"
                  style={{
                    color: 'white',
                    textDecoration: 'none',
                    padding: '8px 15px',
                    borderRadius: '17px',
                    backgroundColor: location.pathname === '/reports' ? '#094ad4' : 'transparent',
                    transition: 'background-color 0.3s',
                    fontSize: '14px'
                  }}
                >
                  Relatórios
                </Link>
              ) : (
                <div
                  style={{
                    color: 'rgba(255, 255, 255, 0.6)',
                    padding: '8px 15px',
                    borderRadius: '17px',
                    fontSize: '14px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    cursor: 'not-allowed'
                  }}
                  title="Apenas administradores"
                >
                  <FaLock style={{ fontSize: '12px' }} />
                  Relatórios
                </div>
              )}
              
              {isAdmin ? (
                <Link
                  to="/history"
                  style={{
                    color: 'white',
                    textDecoration: 'none',
                    padding: '8px 15px',
                    borderRadius: '17px',
                    backgroundColor: location.pathname === '/history' ? '#094ad4' : 'transparent',
                    transition: 'background-color 0.3s',
                    fontSize: '14px'
                  }}
                >
                  Histórico
                </Link>
              ) : (
                <div
                  style={{
                    color: 'rgba(255, 255, 255, 0.6)',
                    padding: '8px 15px',
                    borderRadius: '17px',
                    fontSize: '14px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    cursor: 'not-allowed'
                  }}
                  title="Apenas administradores"
                >
                  <FaLock style={{ fontSize: '12px' }} />
                  Histórico
                </div>
              )}
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>
                <span style={{ fontSize: '14px', fontWeight: '500', whiteSpace: 'nowrap' }}>
                  {user?.nome}
                </span>
                <span style={{ fontSize: '12px', color: '#624b00', display: 'flex', alignItems: 'center', gap: '4px', whiteSpace: 'nowrap' }}>
                  {isAdmin ? (
                    <>
                      Administrador <FaCrown style={{ fontSize: '12px' }} />
                    </>
                  ) : (
                    <>
                      Usuário <FaUser style={{ fontSize: '12px' }} />
                    </>
                  )}
                </span>
              </div>
              <button
                onClick={handleLogout}
                style={{
                  backgroundColor: '#e74c3c',
                  color: 'white',
                  border: 'none',
                  padding: '8px 15px',
                  borderRadius: '4px',
                  cursor: 'pointer',
                  fontSize: '14px',
                  fontWeight: '500',
                  transition: 'background-color 0.3s',
                  whiteSpace: 'nowrap'
                }}
                onMouseOver={(e) => e.target.style.backgroundColor = '#c0392b'}
                onMouseOut={(e) => e.target.style.backgroundColor = '#e74c3c'}
              >
                Sair
              </button>
            </div>
          </>
        )}

        {/* Mobile User Info */}
        {isMobile && (
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>
              <span style={{ fontSize: '12px', fontWeight: '500', whiteSpace: 'nowrap' }}>
                {user?.nome}
              </span>
              <span style={{ fontSize: '10px', color: '#624b00', display: 'flex', alignItems: 'center', gap: '3px', whiteSpace: 'nowrap' }}>
                {isAdmin ? (
                  <>
                    Admin <FaCrown style={{ fontSize: '10px' }} />
                  </>
                ) : (
                  <>
                    Usuário <FaUser style={{ fontSize: '10px' }} />
                  </>
                )}
              </span>
            </div>
          </div>
        )}
      </nav>

      {/* Mobile Menu */}
      {isMobile && (
        <div
          style={{
            position: 'fixed',
            top: isMenuOpen ? '70px' : '-100%',
            left: 0,
            right: 0,
            backgroundColor: '#5fb4e9',
            transition: 'top 0.3s ease-in-out',
            zIndex: 999,
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
            padding: '20px',
            maxHeight: 'calc(100vh - 70px)',
            overflowY: 'auto'
          }}
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <Link
              to="/dashboard"
              onClick={closeMenu}
              style={{
                color: 'white',
                textDecoration: 'none',
                padding: '12px 15px',
                borderRadius: '10px',
                backgroundColor: location.pathname === '/dashboard' ? '#094ad4' : 'transparent',
                transition: 'background-color 0.3s',
                fontSize: '15px',
                fontWeight: '500',
                display: 'flex',
                alignItems: 'center'
              }}
            >
              Dashboard
            </Link>
            
            <Link
              to="/books"
              onClick={closeMenu}
              style={{
                color: 'white',
                textDecoration: 'none',
                padding: '12px 15px',
                borderRadius: '10px',
                backgroundColor: location.pathname === '/books' ? '#094ad4' : 'transparent',
                transition: 'background-color 0.3s',
                fontSize: '15px',
                fontWeight: '500',
                display: 'flex',
                alignItems: 'center'
              }}
            >
              Livros
            </Link>
            
            <Link
              to="/loans"
              onClick={closeMenu}
              style={{
                color: 'white',
                textDecoration: 'none',
                padding: '12px 15px',
                borderRadius: '10px',
                backgroundColor: location.pathname === '/loans' ? '#094ad4' : 'transparent',
                transition: 'background-color 0.3s',
                fontSize: '15px',
                fontWeight: '500',
                display: 'flex',
                alignItems: 'center'
              }}
            >
              Empréstimos
            </Link>
            
            {isAdmin ? (
              <Link
                to="/users"
                onClick={closeMenu}
                style={{
                  color: 'white',
                  textDecoration: 'none',
                  padding: '12px 15px',
                  borderRadius: '10px',
                  backgroundColor: location.pathname === '/users' ? '#094ad4' : 'transparent',
                  transition: 'background-color 0.3s',
                  fontSize: '15px',
                  fontWeight: '500',
                  display: 'flex',
                  alignItems: 'center'
                }}
              >
                Usuários
              </Link>
            ) : (
              <div
                style={{
                  color: 'rgba(255, 255, 255, 0.6)',
                  padding: '12px 15px',
                  borderRadius: '10px',
                  fontSize: '15px',
                  fontWeight: '500',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  cursor: 'not-allowed'
                }}
                title="Apenas administradores"
              >
                <FaLock style={{ fontSize: '13px' }} />
                Usuários
              </div>
            )}
            
            {isAdmin ? (
              <Link
                to="/loans"
                onClick={closeMenu}
                style={{
                  color: 'white',
                  textDecoration: 'none',
                  padding: '12px 15px',
                  borderRadius: '10px',
                  backgroundColor: location.pathname === '/loans' ? '#094ad4' : 'transparent',
                  transition: 'background-color 0.3s',
                  fontSize: '15px',
                  fontWeight: '500',
                  display: 'flex',
                  alignItems: 'center'
                }}
              >
                Empréstimos
              </Link>
            ) : (
              <div
                style={{
                  color: 'rgba(255, 255, 255, 0.6)',
                  padding: '12px 15px',
                  borderRadius: '10px',
                  fontSize: '15px',
                  fontWeight: '500',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  cursor: 'not-allowed'
                }}
                title="Apenas administradores"
              >
                <FaLock style={{ fontSize: '13px' }} />
                Empréstimos
              </div>
            )}
            
            {isAdmin ? (
              <Link
                to="/reports"
                onClick={closeMenu}
                style={{
                  color: 'white',
                  textDecoration: 'none',
                  padding: '12px 15px',
                  borderRadius: '10px',
                  backgroundColor: location.pathname === '/reports' ? '#094ad4' : 'transparent',
                  transition: 'background-color 0.3s',
                  fontSize: '15px',
                  fontWeight: '500',
                  display: 'flex',
                  alignItems: 'center'
                }}
              >
                Relatórios
              </Link>
            ) : (
              <div
                style={{
                  color: 'rgba(255, 255, 255, 0.6)',
                  padding: '12px 15px',
                  borderRadius: '10px',
                  fontSize: '15px',
                  fontWeight: '500',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  cursor: 'not-allowed'
                }}
                title="Apenas administradores"
              >
                <FaLock style={{ fontSize: '13px' }} />
                Relatórios
              </div>
            )}
            
            {isAdmin ? (
              <Link
                to="/history"
                onClick={closeMenu}
                style={{
                  color: 'white',
                  textDecoration: 'none',
                  padding: '12px 15px',
                  borderRadius: '10px',
                  backgroundColor: location.pathname === '/history' ? '#094ad4' : 'transparent',
                  transition: 'background-color 0.3s',
                  fontSize: '15px',
                  fontWeight: '500',
                  display: 'flex',
                  alignItems: 'center'
                }}
              >
                Histórico
              </Link>
            ) : (
              <div
                style={{
                  color: 'rgba(255, 255, 255, 0.6)',
                  padding: '12px 15px',
                  borderRadius: '10px',
                  fontSize: '15px',
                  fontWeight: '500',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  cursor: 'not-allowed'
                }}
                title="Apenas administradores"
              >
                <FaLock style={{ fontSize: '13px' }} />
                Histórico
              </div>
            )}

            <div style={{ marginTop: '15px', paddingTop: '15px', borderTop: '1px solid rgba(255, 255, 255, 0.2)' }}>
              <button
                onClick={() => {
                  closeMenu();
                  handleLogout();
                }}
                style={{
                  backgroundColor: '#e74c3c',
                  color: 'white',
                  border: 'none',
                  padding: '12px 20px',
                  borderRadius: '10px',
                  cursor: 'pointer',
                  fontSize: '15px',
                  fontWeight: '500',
                  width: '100%',
                  transition: 'background-color 0.3s'
                }}
                onMouseOver={(e) => e.target.style.backgroundColor = '#c0392b'}
                onMouseOut={(e) => e.target.style.backgroundColor = '#e74c3c'}
              >
                Sair
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Overlay para fechar menu em mobile */}
      {isMobile && isMenuOpen && (
        <div
          onClick={closeMenu}
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.3)',
            zIndex: 998
          }}
        />
      )}
    </>
  );
};

export default Navbar;

