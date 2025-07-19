import {CardTask} from "../components/CardTask";
import Init from "../components/init";
import { useTasks } from "../hooks/useTasks";

export default function ListaTarefas() {
  const { tasks } = useTasks();

  if (tasks.length === 0) {
    return <Init> <p className="text-gray-300">Nenhuma tarefa cadastrada.</p> </Init> }

  return (
    <Init>
          
        <div className="p-2">
        <h2 className="text-2xl font-bold mb-4 p-4">Todas as Tarefas</h2>
        <ul className="space-y-3 gap-85 gap-y-2 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
            {tasks.map((task) => (
            <li key={task.id} className="p-3 rounded-lg">
                <CardTask id={task.id} title={task.title} description={task.description || "Sem descrição"} dueDate={new Date(task.dueDate).toLocaleDateString()} ></CardTask>
                
                {/* <h3 className="text-xl font-semibold text-white">{task.title}</h3>
                <p className="text-gray-400">{task.description || "Sem descrição"}</p>
                <p className="text-sm text-gray-500">Prioridade: {task.priority}</p>
                <p className="text-sm text-gray-500">Vence em: {new Date(task.dueDate).toLocaleDateString()}</p>
                <p className="text-sm text-gray-500">Tag: {task.tag || "Nenhuma"}</p>
                <p className="text-sm text-gray-500">Status: {task.done ? "Concluída" : "Pendente"}</p>*/}
                
            </li>
            ))}
        </ul>
        </div>

    </Init>
  );
}
