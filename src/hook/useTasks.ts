import { useState, useEffect } from "react";

export type Task = {
  name: string;
  isFinished?: boolean;
};

export function useTasks() {
  const [tasks, setTasks] = useState<Task[]>(() => {
    const stored = localStorage.getItem("tasks");
    return stored ? JSON.parse(stored) : [];
  });

  useEffect(() => {
    const stored = localStorage.getItem("tasks");
    if (stored) setTasks(JSON.parse(stored));
  }, []);

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const addTask = (name: string) => {
    if (tasks.some((t) => t.name === name) || name.trim() === "") return false;
    setTasks([...tasks, { name, isFinished: false }]);
    return true;
  };

  const deleteTask = (name: string) => {
    setTasks(tasks.filter((t) => t.name !== name));
  };

  const toggleTask = (name: string) => {
    setTasks(
      tasks.map((t) =>
        t.name === name ? { ...t, isFinished: !t.isFinished } : t
      )
    );
  };

  const counters = {
    created: tasks.length,
    finished: tasks.filter((t) => t.isFinished).length,
  };

  return { tasks, addTask, deleteTask, toggleTask, counters };
}
