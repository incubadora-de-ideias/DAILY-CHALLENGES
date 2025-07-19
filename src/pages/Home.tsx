
import { Link } from 'react-router-dom'


const Home = () => {
    return (
        <div className='p-4'>
            <h1 className='text-2xl font-bold'>Bem-vindo ao TaskMaster</h1>
            <p>Gerencie suas tarefas de forma simples e eficiente!</p>
            <Link to='/dashboard' className='text-blue-500 hover:underline'>
                Ir para o Dashboard
            </Link>
        </div>
    )
}
export default Home;