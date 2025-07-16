import React, {useState, useEffect} from 'react';
import './TodoList.css';


type Tarefa = {
    id: number,
    titulo: string,
    completo: boolean
}

export const TodoList: React.FC = () => {
    const [tarefa, enviarTarefa] = useState<Tarefa[]>([]);
    const [novaTarefa, enviarNovaTarefa] = useState('');

    useEffect(() => {
        const salvo = localStorage.getItem('tarefa');
        if (salvo) {
            enviarTarefa(JSON.parse(salvo));
        }
    }, []);

    useEffect(() => {
        localStorage.setItem('tarefa', JSON.stringify(tarefa));
    }, [tarefa]);

    const addNovaTarefa = () =>{
        if (novaTarefa.trim() === '') return;

        const novoItem: Tarefa = {
            id: Date.now(),
            titulo: novaTarefa,
            completo: false,
        }

        enviarTarefa([...tarefa, novoItem]);
        enviarNovaTarefa('');

    };

    const completado = (id: number) => {
        enviarTarefa(tarefa.map(t => t.id === id? {...t, completo: !t.completo} : t
            ));
    }

    const remover = (id: number) => {
        enviarTarefa(tarefa.filter(tarefa => tarefa.id !== id));
    }

    return(
        <div className="todo-container">
        <h2>Lista de Tarefas</h2>
        <div className="todo-input">
          <input
            type="text"
            placeholder="Nova tarefa"
            value={novaTarefa}
            onChange={(e) => enviarNovaTarefa(e.target.value)}
          />
          <button onClick={addNovaTarefa}>Adicionar</button>
        </div>
  
        <ul className="todo-list">
          {tarefa.map(t => (
            <li key={t.id} className={t.completo ? 'completo' : ''}>
              <span onClick={() => completado(t.id)}>
                {t.titulo}
              </span>
              <button onClick={() => remover(t.id)}>Remover</button>
            </li>
          ))}
        </ul>
      </div>
    );

}