import type { FastifyInstance } from "fastify";
import {
  register,
  checkUsers,
  checkTest,
  deleteTest,
} from "../auth/register/register.services.js";
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

    if (!result.success || !result.user) {
      return reply.code(400).send(result);
    }

    const { password, ...safeUser } = result.user;

    return reply.code(201).send({
      sucess: true,
      user: safeUser,
    });
  });
  fastify.get("/check", async (request, reply) => {
    const check = await checkUsers();

    return reply.send({
      message: "ok",
      check,
    });
  });

  // TO DELETE!!!!
  fastify.get("/checkTest", async (request, reply) => {
    const check = await checkTest();

    return reply.send({
      message: "ok",
      check,
    });
  });
  fastify.delete("/deleteTest", async (request, reply) => {
    const check = await deleteTest();

    return reply.send({
      message: "ok",
      check,
    });
  });
}
