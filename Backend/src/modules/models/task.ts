import { Tarefa } from "@/generated/client";
import { prisma } from "../lib/prisma";

type GetAllParams = {
  filter?: string;
};
class TaskModel {
  async create(data: Omit<Tarefa, "id" | "estado" | "data_criacao" | "data_conclusao">) {
    return prisma.tarefa.create({
      data,
    });
  }

  async getById(id: string) {
    return prisma.tarefa.findUnique({
      where: {
        id,
      },
    });
  }

  async getAll({ filter }: GetAllParams) {
    return prisma.tarefa.findMany({
      where: {
        OR: filter
          ? [
              {
                nome: {
                  contains: filter,
                },
              },
              {
                descricao: {
                  contains: filter,
                },
              },
            ]
          : undefined,
      },
    });
  }
  async update(id: string, dataToUpdate: Partial<Tarefa>) {
    return prisma.tarefa.update({
      where: {
        id,
      },
      data: dataToUpdate,
    });
  }

  async delete(id: string) {
    return prisma.tarefa.delete({
      where: {
        id,
      },
    });
  }
}

export const taskModel = new TaskModel();
