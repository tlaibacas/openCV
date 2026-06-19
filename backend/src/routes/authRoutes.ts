import { type FastifyInstance } from "fastify";
import {
  register,
  users,
  checkUser,
  deleteUser,
  updateUser,
  checkAll,
} from "../auth/register/register.services.js";
import type { ArrayResult, Register, Result } from "../types.js";

export const authRoutes = async (fastify: FastifyInstance) => {
  fastify.post<{ Body: Register; Reply: Result }>(
    "/register",
    async (request, reply) => {
      const result = await register(request.body);
      return result.success
        ? reply.send(result)
        : reply.status(400).send(result);
    },
  );

  fastify.get<{ Reply: ArrayResult }>("/users", async (_, reply) => {
    const result = await users();
    return result.success ? reply.send(result) : reply.status(400).send(result);
  });

  fastify.get<{ Reply: Result }>("/users/:id", async (request, reply) => {
    const { id } = request.params as { id: string };
    const result = await checkUser(id);
    return result.success ? reply.send(result) : reply.code(400).send(result);
  });

  fastify.delete<{ Reply: Result }>("/users/:id", async (request, reply) => {
    const { id } = request.params as { id: string };
    const result = await deleteUser(id);
    return result.success ? reply.send(result) : reply.status(400).send(result);
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
};
