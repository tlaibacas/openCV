import { type FastifyInstance } from "fastify";
import {
  register,
  users,
  checkUser,
  deleteUser,
  updateUser,
  getUsers,
} from "../auth/register/register.services.js";
import type { ArrayResult, Register, Result, UpdateUser } from "../types.js";
import { rateLimits } from "../infra/fastify/rateLimit.js";

export const authRoutes = async (fastify: FastifyInstance) => {
  fastify.post<{ Body: Register; Reply: Result }>(
    "/register",
    {
      config: {
        rateLimit: rateLimits.auth,
      },
    },
    async (request, reply) => {
      const result = await register(request.body);
      return result.success
        ? reply.send(result)
        : reply.status(400).send(result);
    },
  );

  fastify.get<{ Reply: ArrayResult }>(
    "/users",
    {
      config: {
        rateLimit: rateLimits.read,
      },
    },
    async (_, reply) => {
      const result = await users();
      return result.success
        ? reply.send(result)
        : reply.status(400).send(result);
    },
  );

  fastify.get<{ Reply: Result }>(
    "/users/:id",
    {
      config: {
        rateLimit: rateLimits.read,
      },
    },
    async (request, reply) => {
      const { id } = request.params as { id: string };
      const result = await checkUser(id);
      return result.success ? reply.send(result) : reply.code(400).send(result);
    },
  );

  fastify.delete<{ Reply: Result }>(
    "/users/:id",
    {
      config: {
        rateLimit: rateLimits.write,
      },
    },
    async (request, reply) => {
      const { id } = request.params as { id: string };
      const result = await deleteUser(id);
      return result.success
        ? reply.send(result)
        : reply.status(400).send(result);
    },
  );

  fastify.put<{ Body: UpdateUser; Reply: Result }>(
    "/users/:id",
    {
      config: {
        rateLimit: rateLimits.write,
      },
    },
    async (request, reply) => {
      const { id } = request.params as { id: string; user: UpdateUser };
      const result = await updateUser(id, request.body);
      return result.success
        ? reply.send(result)
        : reply.status(400).send(result);
    },
  );

  // TO DELETE!!!!
  fastify.get("/checkTest", async (_request, reply) => {
    const check = await getUsers();
    return reply.send(check);
  });
};
