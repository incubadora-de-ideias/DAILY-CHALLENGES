import React, {useState} from "react";

interface CounterProps{
    initialValue: number;
    step: number;
}

const Counter: React.FC<CounterProps> = ({ initialValue, step}) =>{
    const [count, setCount] = useState(initialValue);

    const incremento = () => setCount((prev) => prev + step);
    const decremento = () => setCount((prev) => prev - step);
    const resetar = () => setCount(initialValue);

    const btnStyle:React.CSSProperties = {
        padding: '8px 12px',
        borderRadius: '6px',
        backgroundColor: '#4CAF50',
        color: 'white',
        border: 'none',
        cursor: 'pointer',
        margin:'0 5px'
    };
    const telaStyle:React.CSSProperties = {
        padding: '18px',
        border:'1px solid #ccc',
        borderRadius: '16px',
        boxShadow: '0 2px 8px gray',
        width: '300px',
        textAlign: 'center',
        margin:'0 auto'
    };

    return(
        <div style={telaStyle}>

            <h2>Conntador: {count}</h2>
            <button style={btnStyle} onClick={incremento}>Incrementar</button>
            <button style={btnStyle} onClick={decremento}>Decrementar</button>
            <button style={btnStyle} onClick={resetar}>Resetar</button>

        </div>      
    );
};

export default Counter;