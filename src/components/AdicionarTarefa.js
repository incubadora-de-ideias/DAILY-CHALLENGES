import { useEffect, useState } from "react"
import MostrarTarefas from "./MostrarTarefa"

function AdicionarTarefa(){
    const [tarefa, settarefa] = useState("")
    const [lista, setLista] = useState([])

    useEffect(() => {
        const tarefasguardada = JSON.parse(localStorage.getItem("tarefas") || "[]")
        setLista(tarefasguardada)
    }, [])
    function adicionar(e){
        e.preventDefault()
        if(tarefa.trim() === "") return;
        const tarefasguardada = JSON.parse(localStorage.getItem("tarefas") || "[]")
        tarefasguardada.push(tarefa)
        localStorage.setItem("tarefas", JSON.stringify(tarefasguardada))
        setLista(tarefasguardada)
        settarefa("")
        alert("Tarefa adicionada com sucesso");
    }

    function excluirTarefa(index) {
  const novaLista = [...lista];
  novaLista.splice(index, 1); 

  setLista(novaLista);
  localStorage.setItem("tarefas", JSON.stringify(novaLista));
}


    return(
        <div>
            <form onSubmit={adicionar}>
                <div>
                    <input type="text" placeholder="Insira a Tarefa" value={tarefa} onChange={(e) => settarefa(e.target.value)}/>
                    <button type="submit">Adicionar Tarefa</button>
                </div>
            </form>
            <MostrarTarefas tarefas={lista} aoExcluir = {excluirTarefa} />
        </div>
    )
}

export default AdicionarTarefa