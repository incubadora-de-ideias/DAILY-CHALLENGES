import { useNavigate } from "react-router-dom";
import Init from "../components/init";
import { useTasks } from "../hooks/useTasks";
import { useState } from "react";


export default function NovaTarefa() {
    const {addTask} = useTasks();
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [dueDate, setDueDate] = useState("");
    const [priority, setPriority] = useState("low");
    const [tag, setTag] = useState("");

    const navigate = useNavigate();

    return(
        <Init>
            <div>
                <h1 className="text-2xl font-bold mb-4 pt-5">Criar Nova Tarefa</h1>
                <div className="bg-stone-760 p-6 rounded-xl shadow-md w-fit h-fit">
                    <div className="mb-4 flex gap-8">
                        <div className="mb-4">
                            <label className="block text-gray-300 mb-2" htmlFor="title">Título</label>
                            <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} id="title" placeholder="Obrigatório" className="w-1xl p-2 bg-neutral-700 border border-gray-600 rounded-lg" required />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-300 mb-2" htmlFor="description">Descrição(Notas)</label>
                            <textarea value={description} onChange={(e) => setDescription(e.target.value)} id="description" placeholder="Opcional" rows={5} className="w-180 p-2 bg-neutral-700 border border-gray-600 rounded-lg"></textarea>
                        </div >
                    </div>
                    <div className="mb-4 flex gap-8">
                        <div className="mb-4">
                            <label className="block text-gray-300 mb-2" htmlFor="description">Data de Vencimento</label>
                            <input type="date" value={dueDate} onChange={(e) => setDueDate(e.target.value)} id="dueDate" className="p-2 bg-neutral-700 border border-gray-600 rounded-lg" />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-300 mb-2" htmlFor="priority">Prioridade</label>
                            <select value={priority} onChange={(e) => setPriority(e.target.value)} id="priority" className="p-2 bg-neutral-700 border border-gray-600 rounded-lg">
                                <option value="low">Baixa</option>
                                <option value="medium">Média</option>
                                <option value="high">Alta</option>
                            </select>
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-300 mb-2" htmlFor="title">Tag</label>
                            <input type="text" value={tag} onChange={(e) => setTag(e.target.value)} id="tag" placeholder="Opcional" className="w-1xl p-2 bg-neutral-700 border border-gray-600 rounded-lg" required />
                        </div>
                    </div>
                    <button onClick={() => {
                        if (!title.trim()) {
                            alert("Título é obrigatório");
                            return;
                        }
                        if (!dueDate.trim()) {
                            alert("Data de Vencimento é obrigatório");
                            return;
                        }
                        addTask(title, new Date(dueDate), tag, description, priority)
                        alert('Tarefa adicionada com Sucesso.')
                        navigate("/listatarefas")} }
                        className="bg-blue-600 w-full hover:bg-blue-700 hover:cursor-pointer text-white font-bold py-2 px-4 rounded-lg">Criar Tarefa</button>
                </div>
            </div>
        </Init>
    )
}