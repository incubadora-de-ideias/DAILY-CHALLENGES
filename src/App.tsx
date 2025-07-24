import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Navbar from "./components/navbar";
import Dashboard from "./pages/Dashboard";
import DetalhesTarefa from "./pages/tarefa";
import TodasTarefas from "./pages/tarefas";
import TarefasAtrasadas from "./pages/tarefasatrasadas";
import TarefasConcluidas from "./pages/tarefasconcluidas";

function App() {
  return (
    <Router>
      <Navbar />
      <div className="p-5">
        <Routes>
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/dashboard/:id" element={<DetalhesTarefa />} />
          <Route path="/dashboard/atrasadas" element={<TarefasAtrasadas />} />
          <Route path="/dashboard/concluidas" element={<TarefasConcluidas />} />
          <Route path="/dashboard/tarefas" element={<TodasTarefas />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
