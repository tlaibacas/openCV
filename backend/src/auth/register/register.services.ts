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
import { isDev } from "../../index.js";
import { checkId } from "../../utils/checks.js";

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
            isVerified: false,
            confirmationCode: crypto.randomUUID(),
          },
          select: userSelect,
        })
        .then((user): UserResponse | ErrorResponse => ({
          success: true,
          user,
        }))
        .catch((error: unknown) =>
          isDev
            ? {
                success: false,
                error:
                  error instanceof Error ? error.message : "Internal error",
              }
            : error instanceof Prisma.PrismaClientKnownRequestError &&
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
        .delete({ where: { id }, select: userSelect })
        .then(
          (user): UserResponse => ({
            success: true,
            user,
          }),
        )
        .catch(
          (): ErrorResponse => ({
            success: false,
            error: "Internal error",
          }),
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
          select: userSelect,
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
