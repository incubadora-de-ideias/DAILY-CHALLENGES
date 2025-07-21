
import { Link } from 'react-router-dom'
import TaskForm from '../components/TaskForm'
import TaskList from '../components/TaskList'
import { useTasks } from "../hooks/useTasks";

export const intro= () => {
    return (
        <div className='p-4'>
        <h1 className='text-2xl font-bold'>Bem-vindo ao TaskMaster</h1>
        <p>Gerencie suas tarefas de forma simples e eficiente!</p>
         <TaskForm />
         <TaskList />
        </div>
    )

}

 function Dashboard() {
  const { tasks } = useTasks();
  const total = tasks.length;
  const concluidas = tasks.filter(t => t.completa).length;
  const atrasadas = tasks.filter(t => !t.completa && new Date(t.prazo) < new Date()).length;

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-3xl font-bold">Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="p-4 bg-blue-100 rounded-xl shadow">
          <p className="text-xl font-semibold">Total de Tarefas</p>
          <p className="text-3xl">{total}</p>
        </div>
        <div className="p-4 bg-green-100 rounded-xl shadow">
          <p className="text-xl font-semibold">Concluídas</p>
          <p className="text-3xl">{concluidas}</p>
        </div>
        <div className="p-4 bg-red-100 rounded-xl shadow">
          <p className="text-xl font-semibold">Atrasadas</p>
          <p className="text-3xl">{atrasadas}</p>
        </div>
      </div>

      <div className="space-y-3">
        <h2 className="text-xl font-semibold">Filtros rápidos</h2>
        <div className="flex gap-3 flex-wrap">
          <Link to="/Home" className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300">Todas</Link>
          <Link to="/TarefaDone" className="px-4 py-2 bg-green-200 rounded hover:bg-green-300">Concluídas</Link>
          <Link to="/TarefaDelay" className="px-4 py-2 bg-red-200 rounded hover:bg-red-300">Atrasadas</Link>
        </div>
      </div>
    </div>
  );
}


    
export default Dashboard