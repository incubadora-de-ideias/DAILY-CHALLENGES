import z from "zod";

class TaskValidation {
  getData = z.object({
    nome: z.string(),
    descricao: z.string().optional(),
    prioridade: z.enum(["Baixa", "Media", "Alta"]).optional(),
    data_vencimento: z.coerce.date(),
  });

  getDataToUpdate = this.getData.partial();

  getId = z.object({
    id: z.string(),
  });
}

export const taskValidation = new TaskValidation();
