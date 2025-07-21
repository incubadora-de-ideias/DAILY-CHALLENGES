import { Task } from "../types/Task";
import { CheckCircle, Circle, Trash2 } from "lucide-react";
import { useTasks } from "../hooks/useTasks";
import PriorityBadge from "./PriorityBadge";

export default function TaskItem({ task }: { task: Task }) {
  const { toggleTask, deleteTask } = useTasks();

  const vencida = !task.completa && new Date(task.prazo) < new Date();

  return (
    <div className={`p-4 rounded-xl shadow flex items-center justify-between ${vencida ? "bg-red-100" : "bg-white"}`}>
      <div>
        <div className="flex items-center gap-2">
          <button onClick={() => toggleTask(task.id)}>
            {task.completa ? (
              <CheckCircle className="text-green-600" />
            ) : (
              <Circle className="text-gray-400" />
            )}
          </button>
          <p className={`text-lg font-medium ${task.completa ? "line-through text-gray-400" : ""}`}>
            {task.descricao}
          </p>
        </div>
        <p className="text-sm text-gray-500">Prazo: {new Date(task.prazo).toLocaleDateString()}</p>
        <div className="flex gap-2 mt-1">
          <PriorityBadge Prioridade={task.Prioridade} />
          {task.tags.map(tag => (
            <span key={tag} className="bg-blue-100 text-blue-800 px-2 py-0.5 text-xs rounded">
              #{tag}
            </span>
          ))}
        </div>
      </div>

      <button onClick={() => deleteTask(task.id)}>
        <Trash2 className="text-red-500 hover:text-red-700" />
      </button>
    </div>
  );
}
