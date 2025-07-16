import { useState } from "react";
import { Plus, Check, Clock, AlertCircle } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { taskService } from "@/modules/services/task";
import { toastErrorConfig } from "@/components/config/toast";
import FormDialog from "@/components/custom/form-dialog";
import TaskAddForm from "@/components/modals/add-task-modal";
import TaskList from "@/components/lists/tasks";
import TaskEditForm from "@/components/modals/edit-task-modal";
import AlertDeleteDialog from "@/components/custom/alert-delete";

export function TaskPages() {
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedTask, setSelectedTask] = useState<Task | undefined>(undefined);

  const {
    data: tasks,
    error,
    refetch,
  } = useQuery({
    queryKey: ["task"],
    queryFn: () => taskService.getAll({}),
  });

  if (error) toastErrorConfig("Erro ao carregar as tarefas: ", error);

  const handleOnAddDialogSubmit = async (data: TaskToCreate) => {
    await taskService.create(data);
    await refetch();
    setShowAddModal(false);
  };

  const handleOnEditDialogSubmit = async (data: TaskToUpdate) => {
    await taskService.update(selectedTask!.id, data);
    await refetch();
    setShowAddModal(false);
  };

  const handleOnDelete = async () => {
    await taskService.delete(selectedTask!.id);
    await refetch();
    setShowDeleteModal(false);
  };

  const concluidas = tasks?.filter((task) => task.estado);
  const pendentes = tasks?.filter((task) => !task.estado);

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Minhas Tarefas
          </h1>
          <p className="text-gray-600">
            Gerencie suas tarefas de forma eficiente
          </p>
        </div>

        {/* Estatísticas */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <div className="flex items-center">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Clock className="h-6 w-6 text-blue-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total</p>
                <p className="text-2xl font-bold text-gray-900">
                  {tasks?.length}
                </p>
              </div>
            </div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <div className="flex items-center">
              <div className="p-2 bg-green-100 rounded-lg">
                <Check className="h-6 w-6 text-green-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Concluídas</p>
                <p className="text-2xl font-bold text-gray-900">
                  {concluidas?.length}
                </p>
              </div>
            </div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <div className="flex items-center">
              <div className="p-2 bg-orange-100 rounded-lg">
                <AlertCircle className="h-6 w-6 text-orange-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Pendentes</p>
                <p className="text-2xl font-bold text-gray-900">
                  {pendentes?.length}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Botão Adicionar */}
        <div className="mb-6">
          <button
            onClick={() => setShowAddModal(true)}
            className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Plus className="h-5 w-5 mr-2" />
            Adicionar Tarefa
          </button>
        </div>

        <TaskList
          tasks={tasks}
          onEdit={(task) => {
            setSelectedTask(task);
            setShowEditModal(true);
          }}
          onDelete={(task) => {
            setSelectedTask(task);
            setShowDeleteModal(true);
          }}
        />

        <FormDialog
          onSubmit={handleOnAddDialogSubmit}
          open={showAddModal}
          onCloseClick={() => setShowAddModal(false)}
          form={TaskAddForm}
          subject="Tarefa"
          description="Adicionar tarefa"
        />
        <FormDialog
          onSubmit={handleOnEditDialogSubmit}
          open={showEditModal}
          onCloseClick={() => setShowEditModal(false)}
          data={selectedTask}
          form={TaskEditForm}
          subject="Tarefa"
          description="Editar tarefa"
        />

        <AlertDeleteDialog
          subject="Tarefa"
          message="Ao eliminar esta tarefa, perderá o acesso a todos os dados relacionados à mesma. "
          open={showDeleteModal}
          onConfirm={handleOnDelete}
          onCancelClick={() => setShowDeleteModal(false)}
        />
      </div>
    </div>
  );
}
