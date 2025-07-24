import { useParams } from "react-router-dom";
import { Task } from "../types/Task";
import EditarTarefaModal from "../components/editarTarefa";
import { useEffect, useState } from "react";

export default function DetalhesTarefa() {
  const { id } = useParams();
  const [tasks, setTasks] = useState<Task[]>([]);
  const [task, setTask] = useState<Task | null>(null);
  const [editingTask, setEditingTask] = useState<Task | null>(null); // Para poder editar

  useEffect(() => {
    const stored = localStorage.getItem("tarefas");
    if (stored) {
      const tasks: Task[] = JSON.parse(stored);
      const found = tasks.find((t) => t.id === Number(id));
      if (found) setTask(found);
    }
  }, [id]);

  // Carrega tarefas do localStorage ao iniciar
  useEffect(() => {
    const storedTasks = localStorage.getItem("tarefas");
    if (storedTasks) {
      setTasks(JSON.parse(storedTasks));
    }
  }, []);

  if (!task) {
    return (
      <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded shadow text-center">
        <p className="text-red-500">Tarefa não encontrada</p>
      </div>
    );
  }

  const onToggle = (id: number) => {
    const updatedTasks1 = tasks.map((task) =>
      task.id === id ? { ...task, completo: true } : task
    );
    setTasks(updatedTasks1);

    localStorage.setItem("tarefas", JSON.stringify(updatedTasks1));

    // Recarrega a página
    window.location.reload();
  };

  const onDelete = (id: number) => {
    const updatedTasks = tasks.filter((task) => task.id !== id);
    setTasks(updatedTasks);
    localStorage.setItem("tarefas", JSON.stringify(updatedTasks));

    // Recarrega a página
    window.location.reload();
  };

  const saveTasks = (updatedTasks: Task[]) => {
    setTasks(updatedTasks);
    localStorage.setItem("tarefas", JSON.stringify(updatedTasks));
  };

  const handleEdit = (updatedTask: Task) => {
    const updatedTasks = tasks.map((editartask) =>
      editartask.id === updatedTask.id ? updatedTask : editartask
    );
    saveTasks(updatedTasks);

    window.location.reload();
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded shadow">
      <h2 className="text-xl font-bold mb-4">Detalhes da Tarefa</h2>
      <p>ID da Tarefa: {task.id}</p>
      <p>Nome da Tarefa: {task.nome}</p>
      <p>Descrição da Tarefa: {task.descricao}</p>
      <p>Tarefa criado em: {task.criado}</p>
      <p>Prazo da Tarefa: {task.prazo}</p>
      <p>Prioridade da Tarefa: {task.prioridade}</p>
      {!task.completo && (
        <div>
          <button
            className={`flex-grow cursor-pointer bg-sky-950 text-white font-semibold rounded shadow py-2 px-4 m-1`}
            onClick={() => onToggle(task.id)}
          >
            Completar tarefa
          </button>
        </div>
      )}

      <div>
        <button
          className="bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded shadow-md hover:shadow-lg transition duration-300 m-1"
          onClick={() => onDelete(task.id)}
        >
          Eliminar
        </button>
        <button
          className="bg-sky-600 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded shadow-md hover:shadow-lg transition duration-300 m-1"
          onClick={() => setEditingTask(task)}
        >
          Editar
        </button>
      </div>

      {editingTask && (
        <EditarTarefaModal
          task={editingTask}
          isOpen={true}
          onClose={() => setEditingTask(null)}
          onSave={handleEdit}
        />
      )}
    </div>
  );
}
