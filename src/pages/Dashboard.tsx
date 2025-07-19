// src/pages/Dashboard.tsx
import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { TaskContext } from "../context/TaskContext";
import { StatCard } from "../components/StatCard";
import {
  FaClipboardList,
  FaCheckCircle,
  FaHourglassHalf,
  FaExclamationTriangle,
  FaPlus,
  FaListUl,
} from "react-icons/fa";

export const Dashboard: React.FC = () => {
  const context = useContext(TaskContext);

  if (!context) {
    return <div className="text-red-500">Erro: TaskContext não está disponível.</div>;
  }

  const { tasks } = context;

  const total = tasks.length;
  const concluidas = tasks.filter(t => t.completa).length;
  const pendentes = tasks.filter(t => !t.completa).length;
  const atrasadas = tasks.filter(t => {
    const hoje = new Date();
    const prazo = new Date(t.prazo);
    return !t.completa && prazo < hoje;
  }).length;

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-white">Página Inicial</h1>

        <div className="space-x-3">
          <Link
            to="/nova"
            className="inline-flex items-center bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded shadow"
          >
            <FaPlus className="mr-2" /> Nova Tarefa
          </Link>

          <Link
            to="/lista"
            className="inline-flex items-center bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded shadow"
          >
            <FaListUl className="mr-2" /> Ver Tarefas
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard title="Tarefas Totais" value={total} icon={FaClipboardList} color="bg-blue-500" />
        <StatCard title="Concluídas" value={concluidas} icon={FaCheckCircle} color="bg-green-500" />
        <StatCard title="Pendentes" value={pendentes} icon={FaHourglassHalf} color="bg-yellow-500" />
        <StatCard title="Atrasadas" value={atrasadas} icon={FaExclamationTriangle} color="bg-red-500" />
      </div>
    </div>
  );
};
