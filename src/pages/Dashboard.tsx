import { useState, useEffect } from "react";
import { Task } from "../types/Task";
import TaskInput from "../components/TaskInput";
import TaskList from "../components/TaskList";

export default function Dashboard() {
  const [tasks, setTasks] = useState<Task[]>(() => {
    // leitura inicial do localStorage ao montar o componente
    const stored = localStorage.getItem("tarefas");
    return stored ? JSON.parse(stored) : [];
  });

  useEffect(() => {
    const stored = localStorage.getItem("tarefas");
    if (stored) {
      setTasks(JSON.parse(stored));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("tarefas", JSON.stringify(tasks));
  }, [tasks]);

  const addTask = ({
    nome,
    descricao,
    prazo,
    prioridade,
    notas,
    tags,
    criado,
    completo
  }: {
    nome: string;
    descricao: string;
    prazo: string;
    prioridade: string;
    notas: string;
    tags: string;
    criado: string;
    completo: boolean;
  }) => {
    const newTask: Task = {
      id: Math.floor(Math.random() * 1000000),
      nome,
      descricao,
      prazo,
      prioridade,
      notas,
      tags,
      criado,
      completo,
    };
    setTasks((prev) => [...prev, newTask]);
  };

  const toggleTask = (id: number) => {
    setTasks((prev) =>
      prev.map((task) => (task.id === id ? { ...task, completo: true  } : task))
    );
  };

  const deleteTask = (id: number) => {
    setTasks((prev) => prev.filter((task) => task.id !== id));
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded shadow">
      <h1 className="text-2xl font-bold mb-4 text-center">Task Manager</h1>
      <TaskInput onAdd={addTask} />
      <TaskList tasks={tasks} onToggle={toggleTask} onDelete={deleteTask} />
    </div>
  );
}
