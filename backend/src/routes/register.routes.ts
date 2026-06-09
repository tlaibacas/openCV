import type { FastifyInstance } from "fastify";
import {
  register,
  users,
  checkUser,
  deleteUser,
  updateUser,
  checkTest,
} from "../auth/register/register.services.js";
import { bruteShield } from "../middleware/bruteShield.js";
import type { Register } from "../types.js";

export async function registerRoutes(fastify: FastifyInstance) {
  fastify.addHook("preHandler", async (request, reply) => {
    const result = bruteShield(request.ip);
    if (result.blocked) {
      return reply.status(429).send({ message: result.message });
    }
  });

  fastify.post<{ Body: Register }>("/register", async (request, reply) => {
    const result = await register(request.body);
    if (!result.success) {
      return reply.status(400).send(result.error?.message);
    }
    return reply.send(result.user);
  });

  fastify.get("/users", async (_request, reply) => {
    const check = await users();
    return reply.send(check);
  });

  fastify.get("/users/:id", async (request, reply) => {
    const { id } = request.params as { id: string };
    const user = await checkUser(id);
    if (!user.success) {
      return reply.status(400).send(user.error);
    }
    return reply.code(200).send(user.userExists);
  });

  fastify.delete("/users/:id", async (request, reply) => {
    const { id } = request.params as { id: string };
    const user = await deleteUser(id);
    if (!user.success) {
      return reply.status(400).send(user.error);
    }
    return reply.code(200).send(user.userDeleted);
  });

  fastify.put("/users/:id", async (request, reply) => {
    const { id } = request.params as { id: string };
    const user = await updateUser(id, request.body);
    if (!user.success) {
      return reply.status(400).send(user);
    }
    return reply.code(200).send(user);
  });

  // TO DELETE!!!!
  fastify.get("/checkTest", async (request, reply) => {
    const check = await checkTest();
    return reply.send({
      message: "ok",
      check,
    });
  });
}
