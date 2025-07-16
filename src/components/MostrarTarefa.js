function MostrarTarefas({tarefas, aoExcluir}){

    return(
        <div>
            <h3>Lista das tarefas</h3>
            <ul>{tarefas.map((item, index) => (<li key={index}>{item}
                <button onClick={() => aoExcluir(index)}
            >
              x
            </button>
            </li>))}
            </ul>
        </div>
    )

}

export default MostrarTarefas