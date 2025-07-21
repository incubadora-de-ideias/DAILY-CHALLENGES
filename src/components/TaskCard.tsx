
import { Task } from "../types/Task";

type Props = {
  task: Task;
};

export default function TaskCard({ task }: Props) {
  return (
    <div className="p-3 bg-white shadow rounded">
      <h2 className="font-semibold">{task.descricao}</h2>
      <p className="text-sm text-gray-600">Prazo: {task.prazo}</p>
    </div>
  );
}
