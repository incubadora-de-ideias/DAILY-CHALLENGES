import React, { createContext, useState, useEffect } from "react";
import { Task } from "../types/Task";

export type TaskContextType = {
  tasks: Task[];
  addTask: (task: Task) => void;
  updateTask: (updated: Task) => void;
  deleteTask: (id: string) => void;
  toggleComplete: (id: string) => void;
};

export const TaskContext = createContext<TaskContextType | undefined>(undefined);

export const TaskProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [tasks, setTasks] = useState<Task[]>([]);

  // Carregar do localStorage no início
  useEffect(() => {
    const armazenado = localStorage.getItem("tarefas");
    if (armazenado) {
      setTasks(JSON.parse(armazenado));
    }
  }, []);

  // Salvar no localStorage sempre que tasks mudar
  useEffect(() => {
    localStorage.setItem("tarefas", JSON.stringify(tasks));
  }, [tasks]);

  const addTask = (task: Task) => {
    setTasks((prev) => [...prev, task]);
  };

  const updateTask = (updated: Task) => {
    setTasks((prev) =>
      prev.map((t) => (t.id === updated.id ? updated : t))
    );
  };

  const deleteTask = (id: string) => {
    setTasks((prev) => prev.filter((t) => t.id !== id));
  };

  const toggleComplete = (id: string) => {
    setTasks((prev) =>
      prev.map((t) =>
        t.id === id ? { ...t, completa: !t.completa } : t
      )
    );
  };

  return (
    <TaskContext.Provider
      value={{ tasks, addTask, updateTask, deleteTask, toggleComplete }}
    >
      {children}
    </TaskContext.Provider>
  );
};
