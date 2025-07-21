import TaskList from "../components/TaskList"
import { useTasks } from "../hooks/useTasks"
import {Link} from 'react-router-dom'




const TarefaDelay = () => {
    return (
        <div className='p-4'>
            <h1 className='text-2xl font-bold'>Tarefa atrasadas</h1>
            <p>Esta página demonstra as tarefas atrasadas.</p>
            
        </div>
    )
}

export default function TarefasAtrasadas() {
  const { tasks } = useTasks();
  const hoje = new Date();

  const atrasadas = tasks.filter((t) => {
    const vencimento = new Date(t.prazo);
    return !t.completa && vencimento < hoje;
  });

  return (
    <div className="p-4 space-y-6">
      <h1 className="text-2xl font-bold">Tarefas Atrasadas</h1>
      {atrasadas.length === 0 ? (
        <p className="text-gray-500">Nenhuma tarefa atrasada.</p>
      ) : (
        <TaskList  />
      )}
    </div>
  );
}



<Link to='/TarefaDone' className='text-blue-500 hover:underline'>
                Ir para as Tarefas Concluídas
            </Link>

export { TarefaDelay }
