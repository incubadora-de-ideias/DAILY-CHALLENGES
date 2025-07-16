import { useState } from "react";
import { assets } from "./assets/assets";
import style from "./style/TodoList.module.css";
import { CustonButtom } from "./components/CustonButtom";
import { CreatedTasks } from "./components/CreateTasks";
import { FineshTasks } from "./components/FineshTasks";
import { Task } from "./components/Task";

function App() {
  const [taskName, setTaskName] = useState<string>("");
  const [tasks, setTasks] = useState<
    {
      name: string;
      isFinished?: boolean;
    }[]
  >([]);
  const [counterValue, setCounterValue] = useState<{
    created: number;
    finished: number;
  }>({
    created: tasks.length,
    finished: 0,
  });

  const handleAddTask = (taskName: string) => {
    event?.preventDefault();

    if (tasks.some((task) => task.name === taskName)) {
      alert("Tarefa já existe na lista!");
      setTaskName("");
      return;
    }

    if (taskName.trim() === "") return;
    setTasks((prev) => [...prev, { name: taskName, isFinished: false }]);
    setCounterValue((prev) => ({
      ...prev,
      created: prev.created + 1,
    }));
    setTaskName("");
  };

  const handleDeleteTask = (taskName: string) => {
    setTasks(tasks.filter((task) => task.name !== taskName));
    setCounterValue((prev) => ({
      ...prev,
      created: prev.created - 1,
    }));
  };

  const handleToggleTask = (taskName: string) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.name === taskName
          ? { ...task, isFinished: !task.isFinished }
          : task
      )
    );
    setCounterValue((prev) => ({
      ...prev,
      finished:
        prev.finished +
        (tasks.find((task) => task.name === taskName)?.isFinished ? -1 : 1),
    }));
  };

  return (
    <div className={style.container}>
      <header className={style.header}>
        <img src={assets.logo} alt="" />
      </header>
      <form className={style.form}>
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
          <CreatedTasks counterValue={counterValue.created} />
          <FineshTasks
            fineshCounter={counterValue.finished}
            taskCounter={counterValue.created}
          />
        </div>
        <div>
          {tasks.length > 0 ? (
            <div className={style.tasksList}>
              {tasks.map((task, index) => (
                <Task
                  key={index}
                  name={task.name}
                  onDelect={() => handleDeleteTask(task.name)}
                  isfinesh={task.isFinished}
                  onChange={() => handleToggleTask(task.name)}
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
