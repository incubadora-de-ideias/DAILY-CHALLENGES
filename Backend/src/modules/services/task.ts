import { FastifyReply, FastifyRequest } from "fastify";
import { taskValidation } from "../validations/task";
import { taskModel } from "../models/task";
import { Tarefa } from "@/generated/client";

class TaskService {
  async create(req: FastifyRequest, res: FastifyReply) {
    const data = taskValidation.getData.parse(req.body) as Omit<Tarefa, "id" | "estado">;

    const task = await taskModel.create(data);
    return task;
  }

  async getById(req: FastifyRequest, res: FastifyReply) {
    const { id } = taskValidation.getId.parse(req.params);

    const task = await taskModel.getById(id);
    return task;
  }

  async getAll(req: FastifyRequest, res: FastifyReply) {
    const tasks = await taskModel.getAll({});

    return tasks;
  }

  async update(req: FastifyRequest, res: FastifyReply) {
    const { id } = taskValidation.getId.parse(req.params);
    const data = taskValidation.getDataToUpdate.parse(req.body);

    const updatedTask = await taskModel.update(id, data);

    return updatedTask;
  }

  async delete(req: FastifyRequest, res: FastifyReply) {
    const { id } = taskValidation.getId.parse(req.params);
    const task = await taskModel.delete(id);
    return task;
  }
}

export const taskService = new TaskService();
