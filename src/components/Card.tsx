import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import { useTasks } from "../hooks/useTasks";
import { Task } from "../types/Task";

export const TaskCard: React.FC = () => {
  const { id } = useParams(); // pega o id da URL (se estiver em modo de edição)
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

    navigate("/"); // volta à dashboard após salvar
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto bg-white p-6 rounded-xl shadow-md">
      <h2 className="text-xl font-bold mb-4">{id ? "Editar Tarefa" : "Nova Tarefa"}</h2>

      <div className="mb-4">
        <label className="block font-medium mb-1">Descrição</label>
        <input
          type="text"
          value={descricao}
          onChange={(e) => setDescricao(e.target.value)}
          className="w-full border border-gray-300 rounded px-3 py-2"
          required
        />
      </div>

      <div className="mb-4">
        <label className="block font-medium mb-1">Prazo</label>
        <input
          type="date"
          value={prazo}
          onChange={(e) => setPrazo(e.target.value)}
          className="w-full border border-gray-300 rounded px-3 py-2"
          required
        />
      </div>

      <div className="mb-4">
        <label className="block font-medium mb-1">Prioridade</label>
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

      <div className="mb-4">
        <label className="block font-medium mb-1">Notas</label>
        <textarea
          value={notas}
          onChange={(e) => setNotas(e.target.value)}
          className="w-full border border-gray-300 rounded px-3 py-2"
        />
      </div>

      <div className="mb-6">
        <label className="block font-medium mb-1">Tags (separadas por vírgula)</label>
        <input
          type="text"
          value={tags}
          onChange={(e) => setTags(e.target.value)}
          className="w-full border border-gray-300 rounded px-3 py-2"
        />
      </div>

      <button
        type="submit"
        className="w-full bg-blue-600 text-white font-semibold py-2 px-4 rounded hover:bg-blue-700 transition"
      >
        {id ? "Atualizar" : "Criar"} Tarefa
      </button>
    </form>
  );
};
