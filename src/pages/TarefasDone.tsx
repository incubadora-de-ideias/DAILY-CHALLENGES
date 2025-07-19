import { Link } from "react-router-dom";

const TarefasDone = () => {
    return (
        <div className='p-4'>
            <h1 className='text-2xl font-bold'>Tarefas Concluídas</h1>
            <p>Esta página demonstra as tarefas concluídas.</p>
            <Link to='/dashboard' className='text-blue-500 hover:underline'>
                Ir para o Dashboard
            </Link>
        </div>
    )
}
export default TarefasDone;
export { TarefasDone }