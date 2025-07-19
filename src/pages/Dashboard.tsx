
import { Link } from 'react-router-dom'
import TaskForm from '../components/TaskForm'
import TaskList from '../components/TaskList'

export const Dashboard = () => {
    return (
        <div className='p-4'>
            <h1 className='text-2xl font-bold'>Bem-vindo ao TaskMaster</h1>
            <p>Gerencie suas tarefas de forma simples e eficiente!</p>
            <Link to='/Home' className='text-blue-500 hover:underline'>
                Ir para o Home
            </Link>
            <TaskForm />
            <TaskList />
        </div>
    )

}

    
export default Dashboard