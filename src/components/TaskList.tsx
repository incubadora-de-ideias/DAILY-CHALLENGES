import { Link } from "react-router-dom";
import { Task } from "../types/Task";

interface Props {
  tasks: Task[];
  onToggle: (id: number) => void;
  onDelete: (id: number) => void;
}

export default function TaskList({ tasks, onToggle, onDelete }: Props) {
  return (
    <ul className="space-y-2">
      {tasks.map((task) => (
        <li
          key={task.id}
          className="flex items-center justify-between bg-gray-100 p-2 rounded"
        >
          <Link
            to={`/dashboard/${task.id}`}
            className={`flex-grow cursor-pointer`}
          >
            {task.nome}
          </Link>

          
          <button
            onClick={() => onDelete(task.id)}
            className="ml-2 text-red-500 hover:text-red-700"
          >
            ✖
          </button>
        </li>
      ))}
    </ul>
  );
}
