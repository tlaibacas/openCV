import type { FastifyInstance } from "fastify";
import { warmUp } from "../utils/warmUp.js";

export async function rootRoutes(fastify: FastifyInstance) {
  fastify.get("/warmUp", async () => {
    const isAlive = await warmUp();
    return { success: isAlive };
  });
}
