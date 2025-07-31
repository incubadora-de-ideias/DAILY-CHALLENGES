import { NavLink } from "react-router-dom";

const Sidebar = () => {
  return (
    <aside className="bg-gray-900 rounded-bl-2xl text-gray-300 w-64 p-4 border-x border-gray-400">
      <nav className="flex flex-col gap-2">

        <NavLink to="/" className="text-xl font-bold text-white mb-8 mt-5 text-center hover:text-blue-200">TaskMaster</NavLink>

        <NavLink to="/novatarefa" className="font-bold text-center bg-blue-300 text-black p-2 rounded-xl hover:bg-blue-500">Nova tarefa</NavLink>

        <NavLink to="/listatarefas" className="font-bold text-center bg-blue-300 text-black p-2 rounded-xl hover:bg-blue-500">Exibir tarefas</NavLink>

      </nav>
    </aside>
  );
};

export default Sidebar;
