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

export async function registerRoutes(fastify: FastifyInstance) {
  fastify.addHook("preHandler", async (request, reply) => {
    if (request.url === "/check") return;
    const result = bruteShield(request.ip);
    if (result.blocked) {
      return reply.send({ message: result.message });
    }
  });

  fastify.post("/register", async (request, reply) => {
    const result = await register(request.body);
    return reply.send(result);
  });

  fastify.get("/users", async (_request, reply) => {
    const check = await users();
    return reply.send(check);
  });

  fastify.get("/users/:id", async (request, reply) => {
    const { id } = request.params as { id: string };
    const user = await checkUser(id);
    return reply.send(user);
  });

  fastify.delete("/users/:id", async (request, reply) => {
    const { id } = request.params as { id: string };
    const user = await deleteUser(id);
    return reply.send(user);
  });

  fastify.put("/users/:id", async (request, reply) => {
    const { id } = request.params as { id: string };
    const user = await updateUser(id, request.body);
    return reply.send(user);
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
