
import {useTasks} from '../hooks/useTasks'
import { Task } from './types/Task'
import TaskCard from "./TaskCard"



const TaskList = () => {

    const { tasks, deleteTask,toggleTask, clearCompleted} = useTasks()

    if(tasks.length === 0){
        return <p className='text-center mt-4 text-gray-500'>Nenhuma tarefa encontrada</p>
        
        {tasks.some(() => Task.completa) && (
            <div className='text-right mb-4'>
                <button 
                onClick={clearCompleted}
                className='text-sm text-white hover:bg-red-700'>
                    Limpar tarefas concluídas
                </button>

            </div>
        )

        }
    }

    return (
       <ul className='space-y-4 mt-6'>
        {Task.map(tasks)  (

            <li key={Task.id} className='border p-4 rounded-lg shadow-sm bg-white'>
                <div className='flex justify-between items-center'>
                    <div>
                        <h3 className='font-semibold text-lg'>{Task.descricao} </h3>
                        <p className='text-sm text-gray-500'>Prazo: {Task.prazo}</p>
                        <p className='text-sm text-gray-600 mt-1'>Prioridade:{Task.prioridade}</p>
                        {Task.notas && <p className='text-sm mt-1'>Notas: {Task.notas}</p>}
                        {Task.tags.length > 0 && (
                            <div className='text-sm mt-1 text-blue-500'>
                                Tags: {Task.tags.join(', ')}
                            </div>
                        )}
                    </div>

                </div>
                
            </li>
        )}

       </ul> 
    )
}
type Props = {
  tasks: Task[];
};

 function btn({ tasks }: Props) {
  const { updateTask, deleteTask } = useTasks();

  if (tasks.length === 0) {
    return <p className="text-gray-500">Nenhuma tarefa encontrada.</p>;
  }

  return (
    <ul className="space-y-3">
      {tasks.map(task => (
        <li key={task.id} className="p-4 border rounded-xl shadow flex flex-col md:flex-row md:justify-between md:items-center gap-3">
          <div>
            <h3 className={`text-lg font-semibold ${task.completa ? "line-through text-gray-400" : ""}`}>
              {task.descricao}
            </h3>
            <p className="text-sm text-gray-500">
              Prazo: {new Date(task.prazo).toLocaleDateString()} — Prioridade: {task.prioridade}
            </p>
            {task.tags.length > 0 && (
              <div className="mt-1 flex gap-2 flex-wrap">
                {task.tags.map((tag,i) => (
                  <span key={i} className="text-xs bg-gray-200 px-2 py-0.5 rounded">{tag}</span>
                ))}
              </div>
            )}
          </div>

          <div className="flex gap-2">
            <button
              onClick={() => updateTask({ ...task, completa: !task.completa })}
              className={`px-3 py-1 rounded text-sm ${task.completa ? "bg-yellow-300" : "bg-green-300"}`}
            >
              {task.completa ? "Marcar como pendente" : "Concluir"}
            </button>

            <button
              onClick={() => deleteTask(task.id)}
              className="px-3 py-1 rounded text-sm bg-red-300"
            >
              Deletar
            </button>

            {/* Em breve: editar tarefa */}
          </div>
        </li>
      ))}
    </ul>
  );
}


export default TaskList