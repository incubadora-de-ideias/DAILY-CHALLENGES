import { formatDate, getPriorityColor } from "@/lib/utils";
import { Check, Clock, Edit, Trash2 } from "lucide-react";

export type TaskListProps = {
  tasks?: Task[];
  onEdit: (task: Task) => void;
  onDelete: (task: Task) => void;
};

export default function TaskList({ tasks, onDelete, onEdit }: TaskListProps) {
  return (
    <div>
      {tasks ? (
        tasks.map((task) => (
          <div
            key={task.id}
            className={`bg-white p-6 rounded-lg shadow-sm border transition-all hover:shadow-md ${
              task.estado ? "opacity-75" : ""
            }`}
          >
            <div className="flex items-start justify-between">
              <div className="flex items-start space-x-4 flex-1">
                <div className="flex-1">
                  <h3
                    className={`text-lg font-semibold ${
                      task.estado
                        ? "line-through text-gray-500"
                        : "text-gray-900"
                    }`}
                  >
                    {task.nome}
                  </h3>
                  {task.descricao && (
                    <p
                      className={`mt-2 text-sm ${
                        task.estado ? "text-gray-400" : "text-gray-600"
                      }`}
                    >
                      {task.descricao}
                    </p>
                  )}

                  {/* Metadados */}
                  <div className="flex items-center space-x-4 mt-3">
                    {/* Prioridade */}
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${getPriorityColor(
                        task.prioridade
                      )}`}
                    >
                      {task.prioridade}
                    </span>

                    {/* Data de vencimento */}
                    {task.data_vencimento && (
                      <span className="text-xs text-gray-500 flex items-center">
                        <Clock className="h-3 w-3 mr-1" />
                        Vence em: {formatDate(task.data_vencimento)}
                      </span>
                    )}

                    <span className="text-xs text-gray-400">
                      Criada em: {formatDate(task.data_criacao)}
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex items-center space-x-2 ml-4">
                <button
                  onClick={() => onEdit(task)}
                  className="p-2 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded transition-colors"
                  title="Editar tarefa"
                >
                  <Edit className="h-4 w-4" />
                </button>
                <button
                  onClick={() => onDelete(task)}
                  className="p-2 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded transition-colors"
                  title="Excluir tarefa"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        ))
      ) : (
        <div className="text-center py-12">
          <div className="max-w-sm mx-auto">
            <div className="mx-auto h-12 w-12 text-gray-400">
              <Check className="h-12 w-12" />
            </div>
            <h3 className="mt-4 text-lg font-medium text-gray-900">
              Nenhuma tarefa encontrada
            </h3>
          </div>
        </div>
      )}
    </div>
  );
}
