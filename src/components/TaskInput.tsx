import React, { useState } from "react";

interface Props {
  onAdd: (task: {
    nome: string;
    descricao: string;
    prazo: string;
    prioridade: string;
    notas: string;
    tags: string;
    criado: string;
    completo: boolean;
  }) => void;
}

export default function TaskInput({ onAdd }: Props) {
  /**
   * Campos que deverão ser preenchidos
   */
  const [nome, setText] = useState("");
  const [descricao, setDescription] = useState("");
  const [prazo, setDeadline] = useState("");
  const [prioridade, setPrioridade] = useState("");
  const [notas, setNotas] = useState("");
  const [tags, setTags] = useState("");

  const EnviarDados = (e: React.FormEvent) => {
    e.preventDefault();
    if (nome.trim()) {
      let data = new Date();

      let dia = data.getDate();
      let mes = data.getMonth() + 1;
      let ano = data.getFullYear();
      let criado = `${dia}/${mes}/${ano}`;

      let completo = false;

      onAdd({
        nome,
        descricao,
        prazo,
        prioridade,
        notas,
        tags,
        criado,
        completo,
      });

      setText("");
      setDescription("");
      setDeadline("");
      setPrioridade("");
      setNotas("");
      setTags("");
    }
  };

  return (
    <form onSubmit={EnviarDados} className="space-y-2 mb-4">
      <label htmlFor="tarefa" className="font-bold text-lg">
        Tarefa:
      </label>
      <input
        type="text"
        value={nome}
        id="tarefa"
        onChange={(e) => setText(e.target.value)}
        placeholder="Nova tarefa"
        className="w-full px-4 py-2 border rounded"
        required
      />
      <label htmlFor="desc" className="font-bold text-lg">
        Descrição da tarefa:
      </label>
      <textarea
        value={descricao}
        id="desc"
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Descrição"
        className="w-full px-4 py-2 border rounded"
        required
      />
      <label htmlFor="prazo" className="font-bold text-lg">
        Prazo da tarefa:
      </label>
      <input
        type="date"
        value={prazo}
        id="prazo"
        onChange={(e) => setDeadline(e.target.value)}
        className="w-full px-4 py-2 border rounded"
        required
      />
      <label htmlFor="prioridade" className="font-bold text-lg">
        Prioridade da tarefa:
      </label>
      <select
        onChange={(e) => setPrioridade(e.target.value)}
        id="prioridade"
        className="w-full px-4 py-2 border rounded"
        required
      >
        <option disabled>Prioridade</option>
        <option value="Alta">Alta</option>
        <option value="Média">Média</option>
        <option value="Baixa">baixa</option>
      </select>
      <label htmlFor="tag" className="font-bold text-lg">
        Tag da tarefa:
      </label>
      <select
        onChange={(e) => setTags(e.target.value)}
        id="tag"
        className="w-full px-4 py-2 border rounded"
        required
      >
        <option value="Escola">Escola</option>
        <option value="Casa">Casa</option>
        <option value="Trabalho">Trabalho</option>
        <option value="Pessoal">Pessoal</option>
      </select>
      <label htmlFor="nota" className="font-bold text-lg">
        Nota:
      </label>
      <input
        type="text"
        value={notas}
        id="nota"
        onChange={(e) => setNotas(e.target.value)}
        className="w-full px-4 py-2 border rounded"
        placeholder="Notas"
        required
      />
      <button
        type="submit"
        className="px-4 py-2 bg-blue-500 text-white rounded"
      >
        Adicionar
      </button>
    </form>
  );
}
