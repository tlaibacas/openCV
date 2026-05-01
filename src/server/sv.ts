import fastify from "fastify";
import { rootRoutes } from "../routes/root.routes.js";
import { registerRoutes } from "../routes/register.routes.js";

export function buildsv() {
  const app = fastify();
  app.register(rootRoutes, { prefix: "api" });
  app.register(registerRoutes, { prefix: "auth" });
  return app;
}
