import fastify from "fastify";
import { rootRoutes } from "../routes/root.routes.js";
import { authRoutes } from "../routes/auth.routes.js";
import rateLimit from "@fastify/rate-limit";

export function buildServer() {
  const app = fastify();
  app.register(rateLimit);
  app.register(rootRoutes, { prefix: "api/v1" });
  app.register(authRoutes, { prefix: "api/auth/v1" });
  return app;
}
