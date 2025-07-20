
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Dashboard from "./pages/Dashboard"
import Home from "./pages/Home"
import TarefaDone from "./pages/TarefasDone"
import TarefaDelay from "./pages/TarefaDelay"
import { AppRoutes } from './routes.tsx'
import './App.css';

export default function App() {
  return (
    <Router>
      <div className="p-4">

      
        <nav className="mb-4 space-x-4">
          <Link to="/" className="text-blue-600 hover:underline">Dashboard</Link>
          <Link to="/tarefas" className="text-blue-600 hover:underline">Tarefas</Link>
          <Link to="/tarefas/concluidas" className="text-blue-600 hover:underline">Concluídas</Link>
          <Link to="/tarefas/atrasadas" className="text-blue-600 hover:underline">Atrasadas</Link>
        </nav>

        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/tarefas" element={<Home />} />
          <Route path="/tarefas/concluidas" element={<TarefaDone />} />
          <Route path="/tarefas/atrasadas" element={<TarefaDelay />} />
        </Routes>
      </div>
    </Router>
  );
}


