import {CardTask} from "../components/CardTask";
import Init from "../components/init";
import { useTasks } from "../hooks/useTasks";

export default function ListaTarefas() {
  const { tasks } = useTasks();

  if (tasks.length === 0) { return <Init> <p className="text-gray-300">Nenhuma tarefa cadastrada.</p> </Init> }

  return (
    <Init>
          
        <div className="p-2">
        <h2 className="text-2xl font-bold mb-4 p-4">Todas as Tarefas</h2>
        <ul className="space-y-3 gap-85 gap-y-2 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
            {tasks.map((task) => (
            <li key={task.id} className="p-3 rounded-lg">
                <CardTask id={task.id} title={task.title} description={task.description || "Sem descrição"} dueDate={new Date(task.dueDate).toLocaleDateString()} done={task.done} priority={task.priority || "low"}></CardTask>
                
            </li>
            ))}
        </ul>
        </div>

    </Init>
  );
}
