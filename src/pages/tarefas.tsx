import { useState, useEffect } from "react";
import { Task } from "../types/Task";
import TaskList from "../components/TaskList";

export default function TodasTarefas() {
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem("tarefas");
    if (stored) {
      const tasks: Task[] = JSON.parse(stored);
      const found = tasks;
      if (found) setTasks(found);
    }
  }, []);

  if (!tasks) {
    return (
      <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded shadow text-center">
        <p className="text-red-500">Tarefas não encontradas</p>
      </div>
    );
  }

  const toggleTask = (id: number) => {
    setTasks((prev) =>
      prev.map((task) => (task.id === id ? { ...task, completo: true } : task))
    );
  };

  const deleteTask = (id: number) => {
    setTasks((prev) => prev.filter((task) => task.id !== id));
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded shadow">
      <h1 className="text-2xl font-bold mb-4 text-center">Todas as tarefas</h1>
      <TaskList tasks={tasks} onToggle={toggleTask} onDelete={deleteTask} />
    </div>
  );
}
