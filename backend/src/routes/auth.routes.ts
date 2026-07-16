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
  JwtPayload,
  Login,
} from "../types.js";
import { rateLimits } from "../infra/fastify/rateLimit.js";
import { validateUser } from "../auth/validation/validator.js";
import { login } from "../auth/login/login.js";

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

  fastify.get<{ Body: Login; Reply: JwtPayload | ErrorResponse }>(
    "/login",
    {
      config: {
        rateLimit: rateLimits.auth,
      },
    },
    async (request, reply) => {
      const auth: Login = request.body;
      const result = await login(auth);
      return result.success
        ? reply.send(result)
        : reply.status(400).send(result);
    },
  );

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

  fastify.get<{ Params: { id: string }; Reply: UserResponse | ErrorResponse }>(
    "/users/:id",
    {
      config: {
        rateLimit: rateLimits.read,
      },
    },
    async (request, reply) => {
      const { id } = request.params;
      const result = await checkUser(id);
      return result.success ? reply.send(result) : reply.code(400).send(result);
    },
  );

  fastify.get("/checkTest", async (_, reply) => {
    const check = await getUsers();
    return reply.send(check);
  });

  fastify.get<{ Params: { id: string }; Reply: UserResponse | ErrorResponse }>(
    "/validateUser/:id",
    {
      config: {
        rateLimit: rateLimits.read,
      },
    },
    async (request, reply) => {
      const { id } = request.params;
      const check = await validateUser(id);
      return reply.send(check);
    },
  );

  // deletes.

  fastify.delete<{
    Params: { id: string };
    Reply: UserResponse | ErrorResponse;
  }>(
    "/users/:id",
    {
      config: {
        rateLimit: rateLimits.write,
      },
    },
    async (request, reply) => {
      const { id } = request.params;
      const result = await deleteUser(id);
      return result.success
        ? reply.send(result)
        : reply.status(400).send(result);
    },
  );

  // updates.

  fastify.put<{
    Params: { id: string };
    Body: UpdateUser;
    Reply: UserResponse | ErrorResponse;
  }>(
    "/users/:id",
    {
      config: {
        rateLimit: rateLimits.write,
      },
    },
    async (request, reply) => {
      const { id } = request.params;
      const result = await updateUser(id, request.body);
      return result.success
        ? reply.send(result)
        : reply.status(400).send(result);
    },
  );
};
