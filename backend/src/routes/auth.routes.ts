import { type FastifyInstance } from "fastify";
import {
  register,
  users,
  checkUser,
  deleteUser,
  updateUser,
  getUsers,
} from "../auth/register/register.services.js";
import type {
  Register,
  UpdateUser,
  UserResponse,
  ErrorResponse,
  UsersResponse,
} from "../types.js";
import { rateLimits } from "../infra/fastify/rateLimit.js";
import { validateUser } from "../auth/register/register.services.js";

export const authRoutes = async (fastify: FastifyInstance) => {
  // posts.

  fastify.post<{ Body: Register; Reply: UserResponse | ErrorResponse }>(
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

  // gets.

  fastify.get<{ Reply: UsersResponse | ErrorResponse }>(
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

  fastify.get<{ Reply: UserResponse | ErrorResponse }>(
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

  fastify.get("/checkTest", async (_request, reply) => {
    const check = await getUsers();
    return reply.send(check);
  });

  fastify.get("/validateUser", async (_request, _reply) => {});

  // deletes.

  fastify.delete<{ Reply: UserResponse | ErrorResponse }>(
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

  // updates.

  fastify.put<{ Body: UpdateUser; Reply: UserResponse | ErrorResponse }>(
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
};
