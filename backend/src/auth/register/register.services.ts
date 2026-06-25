import { registerSchema } from "./register.schema.js";
import { prisma } from "../../lib/prisma.js";
import * as argon2 from "argon2";
import type {
  Register,
  UserResponse,
  UsersResponse,
  ErrorResponse,
  UpdateUser,
} from "../../types.js";
import { userSelect } from "../../user.selects.js";
import { Prisma } from "../../generated/prisma/client.js";

const uuidRegex: RegExp =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

const isUuid = (v: string) => uuidRegex.test(v);

export const checkId = async (
  id: string,
): Promise<UserResponse | ErrorResponse> =>
  !id
    ? { success: false, error: "ID is required" }
    : !isUuid(id)
      ? { success: false, error: "Invalid ID format" }
      : await prisma.user
          .findUnique({
            where: { id },
            select: userSelect,
          })
          .then((user): UserResponse | ErrorResponse =>
            !user
              ? { success: false, error: "User not found" }
              : { success: true, user },
          )
          .catch(() => ({
            success: false,
            error: "Internal error",
          }));

export const register = async (
  data: Register,
): Promise<UserResponse | ErrorResponse> => {
  const parsed = registerSchema.safeParse(data);

  return !parsed.success
    ? {
        success: false,
        error: parsed.error.issues[0]?.message ?? "Validation error",
      }
    : await prisma.user
        .create({
          data: {
            ...parsed.data,
            password: await argon2.hash(parsed.data.password),
            confirmationCode: crypto.randomUUID(),
          },
          select: userSelect,
        })
        .then((user): UserResponse | ErrorResponse => ({
          success: true,
          user,
        }))
        .catch((error: unknown) =>
          error instanceof Prisma.PrismaClientKnownRequestError &&
          error.code === "P2002"
            ? { success: false, error: "Email already exists" }
            : { success: false, error: "Internal error" },
        );
};

export const users = async (): Promise<UsersResponse | ErrorResponse> => {
  const users = await prisma.user.findMany({
    select: userSelect,
  });
  return users.length > 0
    ? { success: true, users }
    : { success: false, error: "No users found at DB" };
};

export const checkUser = async (
  id: string,
): Promise<UserResponse | ErrorResponse> => {
  const idCheck = await checkId(id);
  return idCheck;
};

export const deleteUser = async (
  id: string,
): Promise<UserResponse | ErrorResponse> => {
  const result = await checkId(id);

  return !result.success
    ? { success: false, error: result.error }
    : await prisma.user
        .delete({ where: { id } })
        .then((user): UserResponse | ErrorResponse => ({
          success: true,
          user: user,
        }))
        .catch((error: unknown) =>
          error instanceof Prisma.PrismaClientKnownRequestError &&
          error.code === "P2025"
            ? { success: false, error: "User not found" }
            : { success: false, error: "Internal error" },
        );
};

export const updateUser = async (
  id: string,
  data: UpdateUser,
): Promise<UserResponse | ErrorResponse> => {
  const idCheck = await checkId(id);

  return idCheck.success
    ? {
        success: true,
        user: await prisma.user.update({
          where: { id },
          data,
        }),
      }
    : {
        success: idCheck.success,
        error: idCheck.error,
      };
};

// TO DELETE!!!!
export const getUsers = async (): Promise<UsersResponse | ErrorResponse> => {
  return await prisma.user
    .findMany({
      select: userSelect,
    })
    .then((users): UsersResponse | ErrorResponse =>
      users.length > 0
        ? { success: true, users }
        : { success: false, error: "No users found at DB" },
    )
    .catch(() => ({
      success: false,
      error: "Internal error",
    }));
};
