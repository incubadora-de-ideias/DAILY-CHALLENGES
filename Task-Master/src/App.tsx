import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/home";
import NovaTarefa from "./pages/novatarefa";
import ListaTarefas from "./pages/tarefas";


export function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/novatarefa" element={<NovaTarefa />} />
        <Route path="/listatarefas" element={<ListaTarefas />} />
      </Routes>
    </BrowserRouter>
  );
}
