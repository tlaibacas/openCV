import type { FastifyInstance } from "fastify";
import { bruteShield } from "../middleware/bruteShield.js";
import { warmUp } from "../utils/warmUp.js";

export async function rootRoutes(fastify: FastifyInstance) {
  fastify.addHook("preHandler", async (request) => {
    if (request.url === "/") return;
    const result = bruteShield(request.ip);
    return result;
  });
  fastify.get("/warmUp", async () => {
    const isAlive = await warmUp();
    return { success: isAlive };
  });
}
