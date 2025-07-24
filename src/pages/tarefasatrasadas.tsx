import { useState, useEffect } from "react";
import { Task } from "../types/Task";

export default function TarefasAtrasadas() {
  const [atrasadas, setAtrasadas] = useState<Task[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem("tarefas");
    if (stored) {
      const allTasks: Task[] = JSON.parse(stored);
      const hoje = new Date();

      const apenasAtrasadas = allTasks.filter((task) => {
        const prazo = new Date(task.prazo);
        console.log(prazo);
        console.log(hoje);
        return !task.completo && prazo < hoje;
      });

      setAtrasadas(apenasAtrasadas);
    }
  }, []);

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded shadow">
      <h1 className="text-2xl font-bold mb-4 text-center">Tarefas Atrasadas</h1>
      {atrasadas.length === 0 ? (
        <p className="text-gray-500">Nenhuma tarefa atrasada ainda.</p>
      ) : (
        <ul className="space-y-4">
          {atrasadas.map((task) => (
            <li key={task.id} className="bg-gray-100 p-4 rounded text-gray-500">
              <h2 className="font-semibold">{task.nome}</h2>
              <p className="text-sm">{task.descricao}</p>
              <p>Tarefa criado em: {task.criado}</p>
              <p>Prazo da Tarefa: {task.prazo}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
