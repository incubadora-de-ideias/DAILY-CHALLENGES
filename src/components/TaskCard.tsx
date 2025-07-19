import React from "react";
import { Task } from "../types/Task";
import { FaCheck, FaEdit, FaTrash } from "react-icons/fa";

type TaskCardProps = {
  task: Task;
  onComplete: (id: string) => void;
  onEdit: (task: Task) => void;
  onDelete: (id: string) => void;
};

export const TaskCard: React.FC<TaskCardProps> = ({
  task,
  onComplete,
  onEdit,
  onDelete,
}) => {
  return (
    <div className="bg-white p-4 rounded-lg shadow flex justify-between items-start border hover:border-blue-500 transition-all duration-300">
      <div>
        <span
          className={`text-lg font-medium transition-all duration-300 ${
            task.completa ? "line-through text-gray-400 opacity-60" : ""
          }`}
        >
          {task.descricao}
        </span>
        <div className="text-sm text-gray-600 mt-1">
          Prazo: {new Date(task.prazo).toLocaleDateString()}
        </div>
        <div className="text-sm mt-1">
          Prioridade:{" "}
          <span
          className={`text-xs font-bold px-2 py-1 rounded ${
            task.prioridade === "Alta"
              ? "bg-red-500 text-white"
              : task.prioridade === "Média"
              ? "bg-yellow-400 text-black"
              : "bg-green-500 text-white"
          }`}
        >
          {task.prioridade}
        </span>
        </div>
        {task.notas && (
          <div className="text-sm mt-1 text-gray-500">Notas: {task.notas}</div>
        )}
        {task.tags && task.tags.length > 0 && (
          <div className="mt-2 text-xs text-blue-500 flex flex-wrap gap-1">
            {task.tags.map((tag, index) => (
              <span
                key={index}
                className="bg-blue-100 px-2 py-0.5 rounded-full text-xs"
              >
                #{tag}
              </span>
            ))}
          </div>
        )}
      </div>

      <div className="flex space-x-2 mt-1">
        <button
          onClick={() => onComplete(task.id)}
          className={`p-2 rounded ${
            task.completa
              ? "bg-green-300 hover:bg-green-400"
              : "bg-gray-200 hover:bg-green-200"
          }`}
          title="Marcar como concluída"
        >
          <FaCheck />
        </button>

        <button
          onClick={() => onEdit(task)}
          className="p-2 rounded bg-yellow-200 hover:bg-yellow-300"
          title="Editar"
        >
          <FaEdit />
        </button>

        <button
          onClick={() => onDelete(task.id)}
          className="p-2 rounded bg-red-200 hover:bg-red-300"
          title="Apagar"
        >
          <FaTrash />
        </button>
      </div>
    </div>
  );
};
