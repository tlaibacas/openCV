import type { FastifyInstance } from "fastify";
import { bruteShield } from "../middleware/bruteShield.js";

export async function rootRoutes(fastify: FastifyInstance) {
  fastify.addHook("preHandler", async (request, reply) => {
    if (request.url === "/health") return;
    const ip = request.ip;
    const result = bruteShield(ip);
    if (result.blocked) {
      return reply.code(429).send("Too many requests");
    }
  });
  fastify.get("/root", async () => {
    return "Hello, World!";
  });
  fastify.get("/health", async () => {
    return "OK";
  });
}
