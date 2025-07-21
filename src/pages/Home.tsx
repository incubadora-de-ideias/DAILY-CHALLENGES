import { useState, useMemo } from "react"
import { Link } from 'react-router-dom'
import { useTasks } from "../hooks/useTasks"
import { Task } from "../types/Task"
import TaskItem from "../components/TaskItem"
import TaskForm from "../components/TaskForm"
import TaskList from "../components/TaskList"



export default function Home() {
  const { tasks } = useTasks();
  const [status, setStatus] = useState<"todas" | "completas" | "incompletas">("todas");
  const [busca, setBusca] = useState("");
  const [prioridade, setPrioridade] = useState<string>("");
  const [ordenarPor, setOrdenarPor] = useState<"criado" | "prazo" | "prioridade">("criado")

    const home = () => {
    return (
        <div className='p-4'>
            <h1 className='text-2xl font-bold'>Bem-vindo ao TaskMaster,Crie as suas tarefas</h1>
            <p>Gerencie suas tarefas de forma simples e eficiente!</p>
            
           
        </div>
    )
}



function Tarefa() {

  const { tasks } = useTasks();

  return (
    <div className="p-4 space-y-6">
      <h1 className="text-2xl font-bold">Lista de Tarefas</h1>

      <TaskForm />

      <TaskList />
    </div>
  )
}

 
  function  Home() {
  const { tasks } = useTasks();
  const [statusFilter, setStatusFilter] = useState<"todas" | "completas" | "incompletas">("todas");
  const [search, setSearch] = useState("");
  const [prioridade, setPrioridade] = useState("");
  const [ordenarPor, setOrdenarPor] = useState<"criado" | "prazo" | "prioridade">("criado");

  // 🔍 Filtro e ordenação
  const tarefasFiltradas = useMemo(() => {
    let filtradas = [...tasks];

    if (statusFilter !== "todas") {
      filtradas = filtradas.filter(t => t.completa === (statusFilter === "completas"));
    }

    if (search.trim()) {
      filtradas = filtradas.filter(t => t.descricao.toLowerCase().includes(search.toLowerCase()));
    }

    if (prioridade) {
      filtradas = filtradas.filter(t => t.Prioridade === prioridade);
    }

    // Ordenação
    filtradas.sort((a, b) => {
      if (ordenarPor === "criado") {
        return new Date(b.datacriacao).getTime() - new Date(a.datacriacao).getTime();
      } else if (ordenarPor === "prazo") {
        return new Date(a.prazo).getTime() - new Date(b.prazo).getTime();
      } else if (ordenarPor === "prioridade") {
        const ordem = { alta: 1, media: 2, baixa: 3 };
        
      }
      return 0;
    });

    return filtradas;
  }, [tasks, statusFilter, search, prioridade, ordenarPor]);

  return (
    <div className="p-4 space-y-6">
      <h1 className="text-2xl font-bold">Lista de Tarefas</h1>

      <TaskForm />

      {/* Filtros */}
      <div className="flex flex-wrap gap-4 items-center">
        <input
          type="text"
          placeholder="Buscar por descrição"
          className="border rounded px-3 py-1"
          value={search}
          onChange={e => setSearch(e.target.value)}
        />

        <select value={statusFilter} onChange={e => setStatusFilter(e.target.value as any)} className="border rounded px-3 py-1">
          <option value="todas">Todas</option>
          <option value="completas">Completas</option>
          <option value="incompletas">Incompletas</option>
        </select>

        <select value={prioridade} onChange={e => setPrioridade(e.target.value)} className="border rounded px-3 py-1">
          <option value="">Todas as Prioridades</option>
          <option value="alta">Alta</option>
          <option value="media">Média</option>
          <option value="baixa">Baixa</option>
        </select>

        <select value={ordenarPor} onChange={e => setOrdenarPor(e.target.value as any)} className="border rounded px-3 py-1">
          <option value="criado">Criado</option>
          <option value="prazo">Prazo</option>
          <option value="prioridade">Prioridade</option>
        </select>
      </div>

      
      <TaskList />
    </div>
  );
}


 <Link to='/TarefaDone' className='text-blue-500 hover:underline ml-4'>
                Ver Tarefas Concluídas
  </Link>

}
