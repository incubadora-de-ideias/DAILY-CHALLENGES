
import { useState } from "react"
import { useTasks } from "../hooks/useTasks"
import { Task,Priority } from "./types/Task"

const TaskForm = () => {

    const {addTask} = useTasks()

    const [descricao, setDescricao] = useState("")
    const [prazo, setPrazo] = useState("")
    const [prioridade, setPrioridade] = useState<Priority>("Baixa")
    const [notas, setNotas] = useState("")
    const [tags, setTags] = useState("")


    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()

        if (!descricao.trim() || !prazo) {

            alert("Descrição e prazo são obrigatórios");
            return;
        }

        const novaTarefa: Task = {

            id: crypto.randomUUID(),
            descricao,
            prazo,
            Prioridade: prioridade,
            notas:notas.trim() || undefined,
            tags: tags.split(",").map((t) => t.trim()).filter(Boolean),
            datacriacao: new Date().toISOString(),
            completa: false,
        }

        addTask(novaTarefa)

        // Limpar os campos do formulário
        setDescricao("");
        setPrazo("");
        setPrioridade("Baixa");
        setNotas("");
        setTags("");
    }
    return (

        <form onSubmit={handleSubmit} className="space-y-4 p-4 bg-white rounded shadow">
            <div>
                <label className="block text-sm font-medium">Descrição *</label>
                <input 
                type="text"
                value= {descricao}
                onChange={(e)=> setDescricao(e.target.value)}
                className="w-full p-2 border rounded"
                placeholder="Descrição da tarefa"
                />
            </div>

            <div>
                <label className="block text-sm font-medium">Prazo *</label>
                <input 
                type="date"
                value={prazo}
                onChange={(e)=> setPrazo(e.target.value)}
                className="w-full p-2 border rounded"
                />
            </div>

            <div>
                <label className="block text-sm font-medium">Prioridade</label>
                <select 
                value={prioridade}
                onChange={(e)=> setPrioridade(e.target.value as Priority)}
                className="w-full p-2 border rounded"
                >
                    <option value="Baixa">Baixa</option>
                    <option value="Média">Média</option>
                    <option value="Alta">Alta</option>
                </select>

            </div>

            <div>
                <label className="block text-sm font-medium">Notas</label>
                <textarea 
                value={notas}
                onChange={(e)=> setNotas(e.target.value)}
                className="w-full p-2 border rounded"
                placeholder="Notas adicionais"
    
                />
            </div>

            <div>
                <label className="block text-sm font-medium">Tags(Separadas por virgula)</label>
                <input 
                type="text"
                value={tags}
                onChange={(e)=> setTags(e.target.value)}
                className="w-full p-2 border rounded"
                placeholder="Ex: trabalho, pessoal, urgente"
                />
            </div>

            <button
            type= "submit"
            className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition"
            >
                Adicionar Tarefa
            </button>
        </form>

    )


}
export default TaskForm


