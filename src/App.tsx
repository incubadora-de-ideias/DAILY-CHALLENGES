import React, { useState } from 'react';
import './App.css';

function App() {
  const [count, setCount] = useState(0);
  const [inputValue, setInputValue] = useState(0);
  const [initialValue, setInitialValue] = useState(0);


  const increment = () => setCount(count + inputValue);
  const decrement = () => setCount(count - inputValue);
  const reset = () => setCount(initialValue);

  const setInitial = () => setCount(initialValue);

  return (
    <div className="App">
      <header className="App-header">
        <h1>Contador</h1>
        <p>Valor atual: {count}</p>

        <p>Valor inicial:</p>

        <input
          style={{ width: '50px', margin: '20px', borderRadius: '15px', height: '30px', textAlign: 'center',
          }}
          type="number"
          value={initialValue}
          onChange={(e) => setInitialValue(Number(e.target.value))}
          placeholder="Valor inicial"
        />

        <p>Incremento:</p>

        <input style={{ width: '50px', margin: '20px', borderRadius: '15px', height:'30px', textAlign: 'center' }}
        type="text"
         value={inputValue}
         onChange={(e) => setInputValue(Number(e.target.value))} />

        <div style={{ display: 'flex', gap: '10px', marginTop: '20px' }}>
          <button style={{height: '40px', borderRadius: '15px'}} onClick={increment}>Incrementar</button>
          <button style={{height: '40px', borderRadius: '15px'}} onClick={decrement}>Decrementar</button>
          <button style={{height: '40px', borderRadius: '15px'}} onClick={reset}>Reiniciar.</button>
        </div>
      </header>
    </div>
  );
}

<style></style>

export default App;