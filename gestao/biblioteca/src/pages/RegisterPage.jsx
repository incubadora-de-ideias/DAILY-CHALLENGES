import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import RegisterForm from '../components/RegisterForm';
import View from '../components/view';

const RegisterPage = () => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  // Redireciona para dashboard se já estiver logado
  useEffect(() => {
    if (isAuthenticated) {
      navigate('/dashboard', { replace: true });
    }
  }, [isAuthenticated, navigate]);

  // Desabilita scroll na página de registro
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    document.documentElement.style.overflow = 'hidden';
    
    return () => {
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
    };
  }, []);

  return (
    <div className="register-page-container" style={{
      height: '100vh',
      width: '100vw',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#0a0345',
      padding: '10px',
      overflow: 'hidden',
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      boxSizing: 'border-box',
      margin: 0
    }}>
      {/* Decorative circles */}
      <div className="bubble bubble-1" style={{
        position: 'absolute',
        top: '-30px',
        right: '-30px',
        width: '120px',
        height: '120px',
        borderRadius: '50%',
        background: 'rgba(5, 90, 175, 0.4)',
        zIndex: 0,
      }} />
      <div className="bubble bubble-2" style={{
        position: 'absolute',
        bottom: '-40px',
        left: '-40px',
        width: '150px',
        height: '150px',
        borderRadius: '50%',
        background: 'rgba(137, 218, 255, 0.3)',
        zIndex: 0,
      }} />
      <div className="bubble bubble-3" style={{
        position: 'absolute',
        top: '50%',
        right: '-20px',
        width: '80px',
        height: '80px',
        borderRadius: '50%',
        background: 'rgba(5, 90, 175, 0.4)',
        zIndex: 0,
        transform: 'translateY(-50%)',
      }} />
      <div className="bubble bubble-4" style={{
        position: 'absolute',
        top: '20%',
        left: '-30px',
        width: '100px',
        height: '100px',
        borderRadius: '50%',
        background: 'rgba(13, 147, 249, 0.3)',
        zIndex: 0,
      }} />
      <div className="bubble bubble-5" style={{
        position: 'absolute',
        bottom: '20%',
        right: '10%',
        width: '60px',
        height: '60px',
        borderRadius: '50%',
        background: 'rgba(137, 218, 255, 0.4)',
        zIndex: 0,
      }} />
    
      <div className="register-form-container" style={{
        backgroundColor: 'rgba(255, 255, 255, 0.95)',
        padding: '30px',
        borderRadius: '16px',
        boxShadow: '0 8px 32px rgba(0,0,0,0.15)',
        width: '95%',
        maxWidth: '600px',
        maxHeight: 'calc(100vh - 20px)',
        overflow: 'hidden',
        boxSizing: 'border-box',
        position: 'relative',
        zIndex: 1,
        border: '1px solid rgba(13, 147, 249, 0.2)',
        display: 'flex',
        flexDirection: 'column',
      }}>
        <RegisterForm />
      </div>
    </div>
  );
};

export default RegisterPage;

