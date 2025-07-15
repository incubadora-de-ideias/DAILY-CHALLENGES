import { useState } from "react";
import style from "./App.module.css";
import Counter from "./Count";
function App() {
  const [count, setCount] = useState(0);

  const increment = () => {
    setCount(prev => prev + 1);
    console.log(count);
  };
  const decrement = () => {
    setCount((prev) => prev - 1);
    console.log(count);
  };
  const reset = () => {
    setCount(0);
    console.log(count);
  };
  return (
    <>
      <div className={style.card}>
        <h1>Counter App</h1>
        <p>Click the buttons to change the count</p>
        <div className={style.counter}>
          <Counter value={count} increment={increment} decrement={decrement} reset={ reset} />
        </div>
      </div>
    </>
  );
}

export default App;
