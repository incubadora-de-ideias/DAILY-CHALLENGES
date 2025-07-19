import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import { useTasks } from "../hooks/useTasks";
import { Task } from "../types/Task";

export const TaskForm: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { tasks, addTask, updateTask } = useTasks();

  const [descricao, setDescricao] = useState("");
  const [prazo, setPrazo] = useState("");
  const [prioridade, setPrioridade] = useState<"Alta" | "Média" | "Baixa">("Média");
  const [notas, setNotas] = useState("");
  const [tags, setTags] = useState("");

  useEffect(() => {
    if (id) {
      const tarefaExistente = tasks.find((t) => t.id === id);
      if (tarefaExistente) {
        setDescricao(tarefaExistente.descricao);
        setPrazo(tarefaExistente.prazo);
        setPrioridade(tarefaExistente.prioridade);
        setNotas(tarefaExistente.notas || "");
        setTags(tarefaExistente.tags?.join(", ") || "");
      }
    }
  }, [id, tasks]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!descricao || !prazo) {
      alert("Descrição e prazo são obrigatórios.");
      return;
    }

    const novaTarefa: Task = {
      id: id || uuidv4(),
      descricao,
      prazo,
      prioridade,
      notas,
      tags: tags.split(",").map((tag) => tag.trim()).filter(Boolean),
      criadoEm: id
        ? tasks.find((t) => t.id === id)?.criadoEm || new Date().toISOString()
        : new Date().toISOString(),
      completa: id
        ? tasks.find((t) => t.id === id)?.completa || false
        : false,
    };

    if (id) {
      updateTask(novaTarefa);
    } else {
      addTask(novaTarefa);
    }

    navigate("/");
  };

  return (
    <div className="max-w-xl mx-auto mt-8 p-6 bg-gray-800 rounded shadow text-white">
      <h2 className="text-2xl font-bold mb-4 " >{id ? "Editar Tarefa" : "Nova Tarefa"}</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-1">Descrição</label>
          <input
            type="text"
            value={descricao}
            onChange={(e) => setDescricao(e.target.value)}
            className="w-full border border-gray-300 rounded px-3 py-2"
            required
          />
        </div>
        <div>
          <label className="block mb-1">Prazo</label>
          <input
            type="date"
            value={prazo}
            onChange={(e) => setPrazo(e.target.value)}
            className="w-full border border-gray-300 rounded px-3 py-2"
            required
          />
        </div>
        <div>
          <label className="block mb-1">Prioridade</label>
          <select
            value={prioridade}
            onChange={(e) => setPrioridade(e.target.value as "Alta" | "Média" | "Baixa")}
            className="w-full border border-gray-300 rounded px-3 py-2"
          >
            <option value="Alta">Alta</option>
            <option value="Média">Média</option>
            <option value="Baixa">Baixa</option>
          </select>
        </div>
        <div>
          <label className="block mb-1">Notas</label>
          <textarea
            value={notas}
            onChange={(e) => setNotas(e.target.value)}
            className="w-full border border-gray-300 rounded px-3 py-2"
          />
        </div>
        <div>
          <label className="block mb-1">Tags (separadas por vírgula)</label>
          <input
            type="text"
            value={tags}
            onChange={(e) => setTags(e.target.value)}
            className="w-full border border-gray-300 rounded px-3 py-2"
          />
        </div>
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          {id ? "Atualizar" : "Criar"} Tarefa
        </button>
      </form>
    </div>
  );
};
