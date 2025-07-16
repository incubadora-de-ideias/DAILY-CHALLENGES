import { useState } from "react";
import { CustonButtom } from "./components/CustonButtom";
import { CreatedTasks } from "./components/CreateTasks";
import { FineshTasks } from "./components/FineshTasks";
import style from "./style/TodoList.module.css";
import { assets } from "./assets/assets";
import { Task } from "./components/Task";
import { useTasks } from "./hook/useTasks";

function App() {
  const [taskName, setTaskName] = useState<string>("");
  const { tasks, addTask, deleteTask, toggleTask, counters } = useTasks();

  const handleAddTask = (name: string) => {
    if (!addTask(name)) {
      alert("Tarefa já existe ou nome inválido!");
      setTaskName("");
      return;
    }
    setTaskName("");
  };

  return (
    <div className={style.container}>
      <header className={style.header}>
        <img src={assets.logo} alt="" />
      </header>
      <form
        className={style.form}
        onSubmit={(e) => {
          e.preventDefault();
          handleAddTask(taskName);
        }}
      >
        <input
          placeholder="Adicione uma nova tarefa"
          className={style.input}
          value={taskName}
          onChange={(e) => setTaskName(e.target.value)}
        />
        <CustonButtom
          onClick={() => handleAddTask(taskName)}
          disable={taskName === ""}
        />
      </form>
      <main className={style.main}>
        <div className={style.tasks}>
          <CreatedTasks counterValue={counters.created} />
          <FineshTasks
            fineshCounter={counters.finished}
            taskCounter={counters.created}
          />
        </div>
        <div>
          {tasks.length > 0 ? (
            <div className={style.tasksList}>
              {tasks.map((task, index) => (
                <Task
                  key={index}
                  name={task.name}
                  onDelect={() => deleteTask(task.name)}
                  isfinesh={task.isFinished}
                  onChange={() => toggleTask(task.name)}
                />
              ))}
            </div>
          ) : (
            <div className={style.emptyList}>
              <img src={assets.clipboard} alt="Clipboard" />
              <p>Você ainda não tem tarefas cadastradas</p>
              <p>Crie tarefas e organize seus itens a fazer</p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

export default App;
