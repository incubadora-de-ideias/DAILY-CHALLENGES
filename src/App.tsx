import React from 'react';
import Counter from './components/Counter';
import './App.css';

const App: React.FC = () => {

  const appstyle: React.CSSProperties = {
    textAlign: 'center'
  }

  return(
    <div style={appstyle}>
      <h1>Contador com React</h1>
      <Counter initialValue={1} step={1}/>
    </div>
  );
};

export default App;
