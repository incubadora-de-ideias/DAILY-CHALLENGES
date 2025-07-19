
import {Link} from 'react-router-dom'


const TarefaDelay = () => {
    return (
        <div className='p-4'>
            <h1 className='text-2xl font-bold'>Tarefa atrasadas</h1>
            <p>Esta página demonstra as tarefas atrasadas.</p>
            <Link to='/dashboard' className='text-blue-500 hover:underline'>
                Ir para o Dashboard
            </Link>
        </div>
    )
}
export { TarefaDelay };
export default TarefaDelay;