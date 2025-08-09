import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/home";
import NovaTarefa from "./pages/novatarefa";
import ListaTarefas from "./pages/tarefas";
import EditarTarefa from "./pages/editartask";
import { Concluidas } from "./pages/concluidas";
import { Atrasadas } from "./pages/atrasadas";


export function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/novatarefa" element={<NovaTarefa />} />
        <Route path="/listatarefas" element={<ListaTarefas />} />
        <Route path="/editar/:id" element={<EditarTarefa />} />
        <Route path="/concluidas" element={<Concluidas />} />
        <Route path="/atrasadas" element={<Atrasadas />} />
        <Route path="*" element={<h1>404 - Página não encontrada</h1>} />
      </Routes>
    </BrowserRouter>
  );
}
