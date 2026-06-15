import fastify from "fastify";
import { rootRoutes } from "../routes/root.routes.js";
import { registerRoutes } from "../routes/register.routes.js";
import { loginRoutes } from "../routes/login.routes.js";

export function buildServer() {
  const app = fastify();
  app.register(rootRoutes, { prefix: "api/v1" });
  app.register(registerRoutes, { prefix: "api/auth/v1" });
  app.register(loginRoutes, { prefix: "api/auth/v1" });
  return app;
}
