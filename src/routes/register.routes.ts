import type { FastifyInstance } from "fastify";
import { bruteShield } from "../middleware/bruteShield.js";
type RegisterBody = {
  email: string;
  password: string;
  name?: string;
  lastName?: string;
  role?: string;
  agency?: string;
  sex?: string;
};

export async function registerRoutes(fastify: FastifyInstance) {
  fastify.addHook("preHandler", async (request, reply) => {
    if (request.url === "/check") return;
    const ip = request.ip;
    const result = bruteShield(ip);
    if (result.blocked) {
      return reply.code(429).send("Too many requests");
    }
  });
  fastify.post<{
    Body: RegisterBody;
  }>("/register", async (_request) => {
    return {
      success: true,
    };
  });
}
