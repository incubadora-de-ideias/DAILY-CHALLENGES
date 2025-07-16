import { taskService } from "@/modules/services/task";
import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";

export async function serverRoutes(app: FastifyInstance) {
  app.post("/task/create", taskService.create);
  app.get("/task", taskService.getAll);
  app.get("/task/:id", taskService.getById);
  app.put("/task/:id", taskService.update);
  app.delete("/task/:id", taskService.delete);
}
