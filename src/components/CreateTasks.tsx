import style from "../style/TodoList.module.css";


export function CreatedTasks({ counterValue }: { counterValue: number }) {
  return (
    <div className={style.createdTasks}>
      <strong>Tarefas criadas</strong>
      <span className={style.counter}>{counterValue}</span>
    </div>
  );
};
