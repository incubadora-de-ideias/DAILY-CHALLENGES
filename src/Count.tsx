import style from "./Count.module.css";

function Counter({
  value,
  increment,
  decrement,
  reset,
}: {
  value: number;
  increment: () => void;
  decrement: () => void;
  reset: () => void;
}) {

  return (
    <>
      <div className={style.card}>
        <div className={style.counter}>
          <span>{value}</span>
        </div>
        <div className={style.buttons}>
          <button onClick={increment}>+</button>
          <button onClick={reset}>Reset</button>
          <button onClick={decrement}>-</button>
        </div>
      </div>
    </>
  );
}

export default Counter;
