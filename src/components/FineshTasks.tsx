import style from "../style/TodoList.module.css";

export function FineshTasks({
  fineshCounter,
  taskCounter,
}: {
  fineshCounter: number;
  taskCounter: number;
}) {
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
