import fastify, { FastifyInstance } from "fastify";
import cors from "@fastify/cors";
import { serverRoutes } from "./routes";

const app: FastifyInstance = fastify({
  logger: {
    level: process.env.NODE_ENV === "production" ? "warn" : "debug",
  },
});

const port = Number(process.env.PORT) || 5000;

const start = async () => {
  try {
    const allowedOrigins = process.env.CROSS_ORIGIN;

    await app.register(cors, {
      origin: allowedOrigins,
      credentials: true,
    });

    await app.register(serverRoutes);

    await app.listen({ port, host: "0.0.0.0" });
  } catch (err) {
    console.log(err);
    app.log.error(err);
    process.exit(1);
  }
};

start();
