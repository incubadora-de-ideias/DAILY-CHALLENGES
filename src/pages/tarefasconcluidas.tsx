import { useState, useEffect } from "react";
import { Task } from "../types/Task";

export default function TarefasConcluidas() {
  const [concluidas, setConcluidas] = useState<Task[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem("tarefas");
    if (stored) {
      const allTasks: Task[] = JSON.parse(stored);
      const somenteConcluidas = allTasks.filter((t) => t.completo);
      setConcluidas(somenteConcluidas);
    }
  }, []);

  const onDelete = (id: number) => {
    const updatedTasks = concluidas.filter((task) => task.id !== id);
    setConcluidas(updatedTasks);
    localStorage.setItem("tarefas", JSON.stringify(updatedTasks));

    // Recarrega a página
    window.location.reload();
  };

  const onDeleteAll = () => {
    const updatedTasks = concluidas.filter((task) => task.completo !== true);
    setConcluidas(updatedTasks);
    localStorage.setItem("tarefas", JSON.stringify(updatedTasks));

    // Recarrega a página
    window.location.reload();
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded shadow">
      <h1 className="text-2xl font-bold mb-4 text-center">
        Tarefas concluídas
      </h1>
      {concluidas.length === 0 ? (
        <p className="text-gray-500">Nenhuma tarefa concluída ainda.</p>
      ) : (
        <>
          <div>
            <button
              className="bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded shadow-md hover:shadow-lg transition duration-300 m-3"
              onClick={() => onDeleteAll()}
            >
              Eliminar todos
            </button>
          </div>
          <ul className="space-y-4">
            {concluidas.map((task) => (
              <li
                key={task.id}
                className="bg-gray-100 p-4 rounded text-gray-500"
              >
                <h2 className="font-semibold">{task.nome}</h2>
                <p className="text-sm">{task.descricao}</p>
                <p>Tarefa criado em: {task.criado}</p>
                <p>Prazo da Tarefa: {task.prazo}</p>
                <p>
                  <button
                    className="bg-red-500 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded shadow-md hover:shadow-lg transition duration-300"
                    onClick={() => onDelete(task.id)}
                  >
                    Eliminar
                  </button>
                </p>
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
}
