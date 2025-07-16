type Task = {
  id: string;
  nome: string;
  descricao?: string;
  prioridade: string;
  data_criacao?: string;
  data_vencimento: string;
  data_conclusao: string;
  estado: boolean;
};

type TaskToCreate = Omit<Task, "id" | "data_criacao" | "data_conclusao">;

type TaskToUpdate = Partial<TaskToCreate>;
