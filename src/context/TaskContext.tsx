
import {createContext, useEffect, useState } from 'react' 
import { Task }   from '../types/Task'


interface TaskContextType{
    tasks: Task[]
    addTask: (task: Task) => void
    updateTask:(task: Task) => void
    deleteTask: (id: string) => void
    toggleTask: (id: string) => void
    clearCompleted: () => void
}

export const TaskContext = createContext({} as TaskContextType)
export const TaskProvider = ({children}: {children:React.ReactNode}) => {

    const [tasks,setTasks] = useState<Task[]>([])

    // Carregar as tarefas do localStore ao iniciar

    useEffect(() => {
        const data = localStorage.getItem('tasks')
        if (data) {
            setTasks(JSON.parse(data))
        }
    }

   )

 // Salvar tarefas no localStorage sempre que mudar

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks])

  const addTask = (task: Task) => setTasks((prev) => [...prev, task]);

  const updateTask = (updated: Task) =>
    setTasks((prev) =>
      prev.map((t) => (t.id === updated.id ? updated : t))
    )

  const deleteTask = (id: string) =>
    setTasks((prev) => prev.filter((t) => t.id !== id));

  const toggleTask = (id: string) =>
    setTasks((prev) =>
      prev.map((t) =>
        t.id === id ? { ...t, completa: !t.completa } : t
      )
    )

  const clearCompleted = () =>
    setTasks((prev) => prev.filter((t) => !t.completa));

  return (
    <TaskContext.Provider
      value = {{ tasks, addTask, updateTask, deleteTask, toggleTask, clearCompleted }}
    >
      {children}
    </TaskContext.Provider>
  )
  useEffect ( ()=>{
    const data = localStorage.getItem('tasks')
    if (data){
      setTasks(JSON.parse(data))
     }
     
  }, [])
    useEffect(()=> {
      localStorage.setItem("tasks",JSON.stringify(tasks))
    }, [tasks]

    )
}


