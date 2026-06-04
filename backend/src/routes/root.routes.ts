import type { FastifyInstance } from "fastify";
import { bruteShield } from "../middleware/bruteShield.js";

export async function rootRoutes(fastify: FastifyInstance) {
  fastify.addHook("preHandler", async (request) => {
    if (request.url === "/") return;
    const result = bruteShield(request.ip);
    return result;
  });
  fastify.get("/", async () => {
    return true;
  });
}
