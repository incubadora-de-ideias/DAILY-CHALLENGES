import React, {useState} from 'react';
import logo from './logo.svg';
import './App.css';

function App() {
  
  if (!localStorage.getItem('tarefas')) {localStorage.setItem('tarefas', JSON.stringify([]));}  
  const [tarefas, setTarefas] = useState<string[]>(JSON.parse(localStorage.getItem('tarefas') || '[]'));
  
 if (!localStorage.getItem('concluidas')) {localStorage.setItem('concluidas', JSON.stringify([]));}  
  const [concluidas, setTarefasConcluidas] = useState<string[]>(JSON.parse(localStorage.getItem('concluidas') || '[]'));

  const adicionarTarefa = (tarefa: string) => {
    const novasTarefas = [...tarefas, tarefa];
    setTarefas(novasTarefas);
    localStorage.setItem('tarefas', JSON.stringify(novasTarefas));
    setInputTarefa('');};

  const adicionarconcluida = (conclud: string) => {
    const novasconcluidas = [...concluidas, conclud];
    setTarefasConcluidas(novasconcluidas);
    localStorage.setItem('concluidas', JSON.stringify(novasconcluidas));
    setInputTarefa('');};

  const removerTarefaPorNome = (nome: string) => {
    const novasTarefas = tarefas.filter(tarefa => tarefa !== nome);
    setTarefas(novasTarefas);
    localStorage.setItem('tarefas', JSON.stringify(novasTarefas));};
  

  const [inputTarefa, setInputTarefa] = useState('');


  return (
    <div className="App">
      <header className="App-header">
        <h1>To-do List</h1>

        <p>Organize suas tarefas diárias!</p>

      </header>

      <section>
        <section className='concl'>
          <div>
            <h2>Tarefas:</h2>
            <ul>
              {tarefas.map((tarefa:string, index:number) => (
                <li key={index}>{tarefa}</li>
              ))}
            </ul>
          </div>
          
          <div>
            <h2> Concluídas:</h2>
            <ul>
              {concluidas.map((conclud:string, ind:number) => (
                <li key={ind}>{conclud}</li>
              ))}
            </ul>
          </div>
        </section>
        <div>
          <h2>Adicionar Tarefa:</h2>
          <input type="text" value={inputTarefa} onChange={(e) => setInputTarefa(e.target.value)}
 placeholder="Digite uma nova tarefa"/>
          <button onClick={() => adicionarTarefa(inputTarefa)} >Add</button>
        </div>

        <div>
          <h2>Remover Tarefa:</h2>
          <datalist id="tarefas">{tarefas.map((tarefa: string, index: number) => (<option key={index} value={tarefa} />))}</datalist>

          <input list='tarefas' value={inputTarefa} onChange={(e) => setInputTarefa(e.target.value)}
 placeholder="Remova uma tarefa"/>
          <button onClick={() => removerTarefaPorNome(inputTarefa)} >remove</button>
        </div>

        <div>
          <h2>Concluir Tarefa:</h2>
          <datalist id="tarefas">{tarefas.map((tarefa: string, index: number) => (<option key={index} value={tarefa} />))}</datalist>

          <input list='tarefas' value={inputTarefa} onChange={(e) => setInputTarefa(e.target.value)}
 placeholder="Conclua uma tarefa"/>
          <button onClick={() => {adicionarconcluida(inputTarefa); removerTarefaPorNome(inputTarefa);}} >concluir</button>
        </div>
        
        <button onClick={() => localStorage.clear()}>Limpar Tudo</button>

      </section>

    </div>
  );
}

export default App;
