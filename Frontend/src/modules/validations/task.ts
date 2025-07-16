import { z } from "zod";

export const taskSchema = z.object({
  nome: z.string(),
  descricao: z.string().optional(),
  prioridade: z.enum(["Baixa", "Media", "Alta"]).optional(),
  data_vencimento: z.coerce.date(),
});