
import useTask from '../hooks/useTasks'
import clearCompletedTasks from '../utils/clearCompletedTasks'
const TaskList = () => {

    const { tasks, deleteTask, toggleTask, clearCompleted} = useTask()

    if(tasks.length === 0){
        return <p className='text-center mt-4 text-gray-500'>Nenhuma tarefa encontrada</p>
        
        {tasks.some((tasks) => tasks.completa) && (
            <div className='text-riht mb-4'>
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
        {tasks.map(tasks) => (

            <li key={tasks.id} className='border p-4 rounded-lg shadow-sm bg-white'>
                <div className='flex justify-between items-center'>
                    <div>
                        <h3 className='font-semibold text-lg'>{tasks.descricao} </h3>
                        <p className='text-sm text-gray-500'>Prazo: {tasks.prazo}</p>
                        <p className='text-sm text-gray-600 mt-1'>Prioridade:{tasks.prioridade}</p>
                        {tasks.notas && <p className='text-sm mt-1'>Notas: {tasks.notas}</p>}
                        {tasks.tags.length > 0 && (
                            <div className='text-sm mt-1 text-blue-500'>
                                Tags: {tasks.tags.join(', ')}
                            </div>
                        )}
                    </div>

                </div>
                
            </li>
        )}

       </ul> 
    )
}
export default TaskList