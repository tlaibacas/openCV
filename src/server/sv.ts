import fastify from "fastify";
import { rootRoutes } from "../routes/root.routes.js";

export function buildsv() {
  const app = fastify();
  app.register(rootRoutes, { prefix: "api" });
  return app;
}
