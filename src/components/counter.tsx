
import React, { useState } from 'react'

type CounterProps = {
  initialValue: number
  step: number
}

const Counter: React.FC<CounterProps> = ({ initialValue, step }) => {
  const [count, setCount] = useState<number>(initialValue)

  const incremento = () => setCount(count + step)
  const decremento = () => setCount(count - step)
  const resetar = () => setCount(initialValue)

  return (
    <div className="main">
      <h2 className="secomd">Contador: {count}</h2>
      <div className="third">
        <button onClick={decremento} className="btn1">decrementar</button>
        <button onClick={resetar} className="btn2" color='#10b981'>Resetar</button>
        <button onClick={incremento} className="btn3">incrementar</button>
      </div>
    </div>
  )
}

export default Counter
