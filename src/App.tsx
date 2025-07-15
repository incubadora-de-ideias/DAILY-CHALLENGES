
import React from 'react'
import Counter from './components/counter';


const App: React.FC = () => {
  return (
    <div className="">
      <Counter initialValue={0} step={1} />
    </div>
  );
};

export default App
