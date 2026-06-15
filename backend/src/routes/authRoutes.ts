import type { FastifyInstance } from "fastify";
import {
  register,
  users,
  checkUser,
  deleteUser,
  updateUser,
  checkAll,
} from "../auth/register/register.services.js";
import type { check, Register } from "../types.js";

export async function authRoutes(fastify: FastifyInstance) {
  fastify.post<{ Body: Register }>("/register", async (request, reply) => {
    const result = await register(request.body);
    return result.success
      ? reply.send(result.user)
      : reply.status(400).send(result.error?.message);
  });

  fastify.get<{ Reply: check }>("/users", async (_request, reply) => {
    const check = await users();
    return reply.send(check);
  });

  fastify.get("/users/:id", async (request, reply) => {
    const { id } = request.params as { id: string };
    const result = await checkUser(id);
    return result.success
      ? reply.send(result.userExists)
      : reply.code(400).send(result.error);
  });

  fastify.delete("/users/:id", async (request, reply) => {
    const { id } = request.params as { id: string };
    const result = await deleteUser(id);
    return result.success
      ? reply.send(result.userDeleted)
      : reply.status(400).send(result.error);
  });

  fastify.put("/users/:id", async (request, reply) => {
    const { id } = request.params as { id: string };
    const result = await updateUser(id, request.body);
    return result.success ? reply.send(result) : reply.status(400).send(result);
  });

  // TO DELETE!!!!
  fastify.get("/checkTest", async (_request, reply) => {
    const check = await checkAll();
    return reply.send(check);
  });
}
