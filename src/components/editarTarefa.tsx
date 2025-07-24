import { useState } from "react";
import { Task } from "../types/Task";

interface EditarTarefaModalProps {
  task: Task;
  isOpen: boolean;
  onClose: () => void;
  onSave: (updatedTask: Task) => void;
}

const EditarTarefaModal: React.FC<EditarTarefaModalProps> = ({
  task,
  isOpen,
  onClose,
  onSave,
}) => {
  const [nome, setNome] = useState(task.nome);

  if (!isOpen) return null;

  const handleSubmit = () => {
    onSave({ ...task, nome });
    onClose();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded shadow-md w-full max-w-md">
        <h2 className="text-lg font-bold mb-4">Editar Tarefa</h2>
        <input
          className="border w-full p-2 mb-4"
          type="text"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
        />
        <div className="flex justify-end space-x-2">
          <button className="px-4 py-2 bg-gray-300 rounded" onClick={onClose}>
            Cancelar
          </button>
          <button
            className="px-4 py-2 bg-blue-500 text-white rounded"
            onClick={handleSubmit}
          >
            Salvar
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditarTarefaModal;
