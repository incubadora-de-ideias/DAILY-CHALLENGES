import {CardTask} from "../components/CardTask";
import Init from "../components/init";
import { useTasks } from "../hooks/useTasks";
import { OutOfTask } from "../components/outOfTask";

export default function ListaTarefas() {
  const { tasks } = useTasks();

  if (tasks.length === 0) { 
     return <Init>
              <OutOfTask></OutOfTask>
            </Init> }

  return (
    <Init>
          
        <div className="p-2">
        <h2 className="border-b-3 border-blue-600 text-2xl font-bold mb-4 p-4">Todas as Tarefas</h2>
        <ul className="space-y-3 gap-5 gap-y-2 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
            {tasks.map((task) => (
            <li key={task.id} className="flex p-3 rounded-lg justify-center">
                <CardTask id={task.id} title={task.title} description={task.description || "Sem descrição"} dueDate={new Date(task.dueDate).toLocaleDateString()} done={task.done} priority={task.priority || "low"}></CardTask>
                
            </li>
            ))}
        </ul>
        </div>

    </Init>
  );
}
