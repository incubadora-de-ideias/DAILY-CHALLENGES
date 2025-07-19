import React, { useContext, useState } from "react";
import { TaskContext } from "../context/TaskContext";
import { TaskCard } from "../components/TaskCard";
import { Link } from "react-router-dom";

export const TaskList: React.FC = () => {
  const context = useContext(TaskContext);

  if (!context) {
    throw new Error("TaskContext não foi providenciado!");
  }

  const { tasks, toggleComplete, deleteTask } = context;

  const [statusFiltro, setStatusFiltro] = useState<"todos" | "pendente" | "completo">("todos");
  const [prioridadeFiltro, setPrioridadeFiltro] = useState<"todas" | "Alta" | "Média" | "Baixa">("todas");

  const tarefasFiltradas = tasks.filter(task => {
    const porStatus =
      statusFiltro === "todos"
        ? true
        : statusFiltro === "completo"
        ? task.completa
        : !task.completa;

    const porPrioridade =
      prioridadeFiltro === "todas" ? true : task.prioridade === prioridadeFiltro;

    return porStatus && porPrioridade;
  });

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-white">Minhas Tarefas</h1>
        <Link
          to="/nova"
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded shadow"
        >
          + Nova Tarefa
        </Link>
      </div>

      <div className="flex flex-wrap gap-4">
        <select
          className="border border-gray-300 p-2 rounded"
          value={statusFiltro}
          onChange={(e) => setStatusFiltro(e.target.value as any)}
        >
          <option value="todos">Todos</option>
          <option value="pendente">Pendentes</option>
          <option value="completo">Concluídas</option>
        </select>

        <select
          className="border border-gray-300 p-2 rounded"
          value={prioridadeFiltro}
          onChange={(e) => setPrioridadeFiltro(e.target.value as any)}
        >
          <option value="todas">Todas</option>
          <option value="Alta">Alta</option>
          <option value="Média">Média</option>
          <option value="Baixa">Baixa</option>
        </select>
      </div>

      <div className="grid gap-4">
        {tarefasFiltradas.length === 0 ? (
          <p className="text-gray-500">Nenhuma tarefa encontrada com os filtros aplicados.</p>
        ) : (
          tarefasFiltradas.map((task) => (
            <TaskCard
              key={task.id}
              task={task}
              onComplete={toggleComplete}
              onEdit={(task) => console.log("Editar tarefa:", task)}
              onDelete={deleteTask}
            />
          ))
        )}
      </div>
    </div>
  );
};
