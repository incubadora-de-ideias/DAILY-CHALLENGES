import { useState } from "react";
import { assets } from "../../assets/assets";
import style from "./TodoList.module.css";
import {TrashIcon} from "@phosphor-icons/react";

const CustonButtom = ({
  onClick,
  disable,
}: {
  onClick: () => void;
  disable: boolean;
}) => {
  return (
    <button className={style.button} onClick={onClick} disabled={disable}>
      Criar
    </button>
  );
};
const CreatedTasks = ({ counterValue }: { counterValue: number }) => {
  return (
    <div className={style.createdTasks}>
      <strong>Tarefas criadas</strong>
      <span className={style.counter}>{counterValue}</span>
    </div>
  );
};
const FineshTasks = ({
  fineshCounter,
  taskCounter,
}: {
  fineshCounter: number;
  taskCounter: number;
}) => {
  const Counter =
    fineshCounter == 0 || fineshCounter == taskCounter
      ? fineshCounter
      : fineshCounter + " de " + taskCounter;
  return (
    <div className={style.fineshTasks}>
      <strong>Concluidas</strong>
      <span className={style.counter}>{Counter}</span>
    </div>
  );
};
const Task = ({
  name,
  isfinesh,
  onDelect,
  onChange
}: {
  name: string;
  isfinesh?: boolean;
  onDelect?: () => void;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}) => {
  return (
    <div className={style.task}>
      <label className={style.checkboxLabel}>
        <input
          type="checkbox"
          title={
            isfinesh ? "Marcar como não concluída" : "Marcar como concluída"
          }
          aria-label={
            isfinesh ? "Marcar como não concluída" : "Marcar como concluída"
          }
          checked={isfinesh}
          onChange={onChange}
        />
        <span className={style.checkboxIndicator} />
      </label>
      <span className={isfinesh ? style.fineshTask : ""}>{name}</span>
      <button
        className={style.deleteButton}
        onClick={onDelect}
        title="Deletar tarefa"
        aria-label="Deletar tarefa"
      >
        <TrashIcon size={24} weight="bold" />
      </button>
    </div>
  );
};

function TodoList() {
  const [taskName, setTaskName] = useState<string>("");
  const [tasks, setTasks] = useState<{
    name: string;
    isFinished?: boolean;
  }[]>([]);
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
      return
    };

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
        task.name === taskName ? { ...task, isFinished: !task.isFinished } : task
      )
    );
    setCounterValue((prev) => ({
      ...prev,
      finished: prev.finished + (tasks.find((task) => task.name === taskName)?.isFinished ? -1 : 1),
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

export { TodoList };
