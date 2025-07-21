import { Link } from "react-router-dom";
import TaskList from "../components/TaskList"
import { useTasks } from "../hooks/useTasks"





const TarefasDone = () => {
    return (
        <div className='p-4'>
            <h1 className='text-2xl font-bold'>Tarefas Concluídas</h1>
            <p>Esta página demonstra as tarefas concluídas.</p>
           
        </div>
    )
 }

export default function TarefasConcluidas() {
  const { tasks } = useTasks();
  const concluídas = tasks.filter((t) => t.completa);

  return (
    <div className="p-4 space-y-6">
      <h1 className="text-2xl font-bold">Tarefas Concluídas</h1>
      {concluídas.length === 0 ? (
        <p className="text-gray-500">Nenhuma tarefa concluída.</p>
      ) : (
        <TaskList/>
      )}
    </div>
  );
}

  <Link to='/TarefaDelay' className='text-blue-500 hover:underline'>
                Ir para as Tarefas Atrasadas
            </Link>
export { TarefasDone }