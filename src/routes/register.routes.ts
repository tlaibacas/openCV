import type { FastifyInstance } from "fastify";
import { register } from "../auth/register/register.services.js";
import { bruteShield } from "../middleware/bruteShield.js";

export async function registerRoutes(fastify: FastifyInstance) {
  fastify.addHook("preHandler", async (request, reply) => {
    if (request.url === "/check") return;
    const ip = request.ip;
    const result = bruteShield(ip);
    if (result.blocked) {
      return reply.code(429).send("Too many requests");
    }
  });
  fastify.post("/register", async (request, reply) => {
    const result = await register(request.body);

    if (!result.success) {
      return reply.code(400).send(result);
    }

    return reply.code(201).send(result);
  });
}
