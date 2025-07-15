import { useState } from 'react';

function App() {
  const [contador, setContador] = useState(0);

  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h1>Contador</h1>
      <h2>{contador}</h2>
      <button onClick={() => setContador(contador + 1)}>+1</button>
      <button onClick={() => setContador(0)}>Refresh</button>
      <button onClick={() => setContador(contador - 1)}>-1</button>
    </div>
  );
}

export default App;