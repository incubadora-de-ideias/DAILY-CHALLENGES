import { createContext, useEffect, useState } from "react";
import type { Task } from "../types/task";

type TasksContextType = {
  tasks: Task[];
  addTask: (title: string, dueDate: Date, tag?: string, description?: string, priority?: string) => void;
  toggleTask: (id: number) => void;
  removeTask: (id: number) => void;
  editTask: (id: number, title: string, dueDate: Date, tag?: string, description?: string, priority?: string) => void;
};

export const TasksContext = createContext<TasksContextType | undefined>(undefined);

export const TasksProvider = ({ children }: { children: React.ReactNode }) => {
  const [tasks, setTasks] = useState<Task[]>(() => {
    const saved = localStorage.getItem("tasks");
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const addTask = (title: string, dueDate: Date, tag?: string, description?: string, priority?: string) => {
    const newTask: Task = {
      id: Date.now(),
      title,
      done: false,
      description,
      createdAt: new Date(),
      priority,
      tag,
      dueDate,
      
    };
    setTasks((prev) => [...prev, newTask]);
  };

  const toggleTask = (id: number) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id ? { ...task, done: !task.done } : task
      )
    );
  };

  const removeTask = (id: number) => {
    setTasks((prev) => prev.filter((task) => task.id !== id));
  };

  const editTask = (id: number, title: string, dueDate: Date, tag?: string, description?: string, priority?: string) => {
    const taskToEdit = tasks.find((task) => task.id === id);
    const newTask: Task = {
      id: Date.now(),
      title,
      done: false,
      description,
      createdAt: new Date(),
      priority,
      tag,
      dueDate, 
    };
    if (taskToEdit) {
      setTasks((prev) =>
        prev.map((task) => (task.id === id ? newTask : task))
      );
    } else {
      console.error("Tarefa não encontrada para editar!");
    }}

  return (
    <TasksContext.Provider value={{ tasks, addTask, toggleTask, removeTask, editTask }}>
      {children}
    </TasksContext.Provider>
  );
};
