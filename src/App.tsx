import React from 'react';


import { useState } from 'react'; 
type tarefas ={
  id: number;
  tarefa: string;
  Pronto: boolean;
}


function App() {
  const [count, setcount] = useState(0)
  const [tarefas, setTarefas] = useState<tarefas[]>([])
  const inputref = React.useRef<HTMLInputElement>(null)

const criarTarefa = () => {
   console.log(inputref)
  if (inputref.current)
    setTarefas([{id:Math.random(), tarefa: inputref.current.value, Pronto: false},
  ...tarefas, ])
}

// inputref.current.value=""


const Tarefapronta=(id:number)=> {
  setTarefas(tarefas.map((tarefa) => {
    if (tarefa.id === id) {
      return {...tarefa, Pronto: true}
    }
    return tarefa;
    
  
  }))

 

}


  return(
    <div className='min-h-scream bg-slate700'>
      <div className=''>
        <h1>Tarefas</h1>
        <div className='flex flex-col gap-2'>

        {tarefas.map((tarefa) => 
           <div key= {tarefa.id}>
            <span >{tarefa.tarefa}</span>

            <div>
          <button onClick={()=>Tarefapronta(tarefa.id)}>Pronto</button>
            <button>Deletar</button>
            </div>

           </div>
        )}
           </div>
        
      



      <form onSubmit={(e)=>{
        e.preventDefault()
        criarTarefa()
      }} action="">
        <input ref={inputref} type="text" required />
        <button>Criar Tarefas</button>
        </form>  
      </div>
    </div>

    



  )

}

export default App;
