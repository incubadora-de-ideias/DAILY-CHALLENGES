import React from 'react';
import { FaBook } from 'react-icons/fa';

const ViewLogin = () => {
    return (
        <div
            style={{
                flex: 1,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '5px',
                color: 'white',
                textAlign: 'center',
                backgroundColor: '#022851',
                position: 'relative',
                overflow: 'hidden',
            }}
        >
            {/* Decorative circles */}
            <div style={{
                position: 'absolute',
                top: '-50px',
                right: '-50px',
                width: '200px',
                height: '200px',
                borderRadius: '50%',
                background: 'rgba(18, 81, 207, 0.678)',
            }} />
            <div style={{
                position: 'absolute',
                bottom: '-80px',
                left: '-80px',
                width: '250px',
                height: '250px',
                borderRadius: '50%',
                background: 'rgba(1, 62, 90, 0.474)',
            }} />

            <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '15px',
                marginBottom: '40px',
                position: 'relative',
                zIndex: 1,
            }}>
                <h2 style={{
                    margin: 0,
                    fontSize: '48px',
                    fontWeight: '700',
                    color: '#ffffff',
                    textShadow: '2px 2px 8px rgba(0, 0, 0, 0.3)',
                    letterSpacing: '1px',
                    marginBottom: '-30px',
                }}>
                    Faça seu Login
                </h2>
            </div>

            <div style={{
                maxWidth: '500px',
                lineHeight: '1.9',
                position: 'relative',
                zIndex: 1,
            }}>
                <FaBook style={{ fontSize: '42px', color: '#ffffff', marginBottom: '20px' }} />
                <p style={{
                    fontSize: '22px',
                    marginBottom: '25px',
                    color: '#ffffff',
                    fontWeight: '500',
                    textShadow: '1px 1px 3px rgba(0, 0, 0, 0.2)',
                }}>
                    Bem-vindo de volta!
                </p>
                <p style={{
                    fontSize: '17px',
                    marginBottom: '0',
                    color: '#f5f5f5',
                    fontWeight: '300',
                    textShadow: '1px 1px 2px rgba(0, 0, 0, 0.2)',
                }}>
                    Acesse sua conta e continue gerenciando sua biblioteca.
                </p>
            </div>
        </div>
    );
};

export default ViewLogin;

