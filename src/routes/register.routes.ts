import type { FastifyInstance } from "fastify";
import { bruteShield } from "../middleware/bruteShield.js";
import { registerUser } from "../auth/register/register.queries.js";

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
    Body: {
      email: string;
      password: string;
      name?: string;
      lastName?: string;
      role?: string;
      agency?: string;
      sex?: string;
    };
  }>("/register", async (request) => {
    const { email, password, name, lastName, role, agency, sex } = request.body;
    await registerUser(email, password, name, lastName, role, agency, sex);
    return {
      success: true,
    };
  });
  fastify.delete("/users", async () => {
    await query("DELETE FROM users");
    return { ok: true };
  });
  fastify.get("/users", async () => {
    const result = await query("SELECT * FROM users");
    return result.rows;
  });
}
