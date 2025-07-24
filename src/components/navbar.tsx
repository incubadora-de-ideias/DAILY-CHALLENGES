import React from "react";
import { Link } from "react-router-dom";

const Navbar: React.FC = () => {
  return (
    <nav className="bg-blue-400 text-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
        <div className="text-lg font-semibold">
          <Link to="/">Home</Link>
        </div>
        <div className="space-x-4">
          <Link to="/dashboard/atrasadas" className="hover:underline">
            Atrasados
          </Link>
          <Link to="/dashboard/concluidas" className="hover:underline">
            Concluídos
          </Link>
          <Link to="/dashboard/tarefas" className="hover:underline">
            Todas
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
