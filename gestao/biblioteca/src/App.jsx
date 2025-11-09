import { Outlet, useLocation } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { useAuth } from './context/AuthContext';
import Navbar from './components/Navbar';
import './App.css';
import './styles/global.css';
import './styles/forms.css';
import './styles/tables.css';
import './styles/responsive.css';

const AppContent = () => {
  const location = useLocation();
  const { isAuthenticated } = useAuth();
  
  // Não mostra navbar nas páginas de login/cadastro
  const showNavbar = isAuthenticated && location.pathname !== '/login' && location.pathname !== '/register';

  return (
    <div className="app">
      {showNavbar && <Navbar />}
      <div style={{ minHeight: showNavbar ? 'calc(100vh - 60px)' : '100vh' }}>
        <Outlet />
      </div>
    </div>
  );
};

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App;
