import type { FastifyInstance } from "fastify";
import { query } from "../db/index.js";

import { bruteShield } from "../middleware/bruteShield.js";

export async function rootRoutes(fastify: FastifyInstance) {
  fastify.addHook("preHandler", async (request, reply) => {
    if (request.routeOptions.url === "/health") return;
    const ip = request.ip;
    const result = bruteShield(ip);
    if (result.blocked) {
      return reply.code(429).send("Too many requests");
    }
  });
  fastify.get("/", async () => {
    return "Hello, World!";
  });
  fastify.get("/health", async () => {
    return true;
  });
  fastify.get("/dbhealth", async () => {
    const result = await query("SELECT NOW() as time");
    return { ok: true, time: result.rows[0].time };
  });
}
