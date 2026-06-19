import { registerSchema } from "./register.schema.js";
import { prisma } from "../../lib/prisma.js";
import * as argon2 from "argon2";
import type { ArrayResult, Register, Result } from "../../types.js";

const uuidRegex: RegExp =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

const isUuid = (v: string) => uuidRegex.test(v);

export const checkId = async (id: string): Promise<Result> =>
  !id
    ? { success: false, error: "ID is required" }
    : !isUuid(id)
      ? { success: false, error: "Invalid ID format" }
      : ((user) =>
          !user
            ? { success: false, error: "User not found" }
            : { success: true, user })(
          await prisma.user.findUnique({
            where: { id },
            select: {
              id: true,
              name: true,
              email: true,
              role: true,
            },
          }),
        );

export const register = async (data: Register): Promise<Result> =>
  (async () => {
    const parsed = registerSchema.safeParse(data);

    return !parsed.success
      ? { success: false, error: parsed.error.issues[0] }
      : await (async () => {
          const existingUser = await prisma.user.findUnique({
            where: { email: parsed.data.email },
            select: { email: true },
          });

          return existingUser
            ? { success: false, error: "Email already exists" }
            : await (async () => {
                const hash = await argon2.hash(parsed.data.password);

                const user = await prisma.user.create({
                  data: { ...parsed.data, password: hash },
                });

                return {
                  success: true,
                  user: {
                    id: user.id,
                    name: user.name,
                    email: user.email,
                    role: user.role,
                  },
                };
              })();
        })();
  })();

export const users = async (): Promise<ArrayResult> => {
  const users = await prisma.user.findMany({
    select: { id: true, name: true, email: true, role: true },
  });
  return users.length > 0
    ? { success: true, users }
    : { success: false, error: "No users found at DB" };
};

export const checkUser = async (id: string): Promise<Result> => {
  const idCheck = await checkId(id);
  return idCheck;
};

export const deleteUser = async (id: string): Promise<Result> => {
  const result = await checkId(id);

  return !result.success
    ? { success: false, error: result.error }
    : { success: true, user: await prisma.user.delete({ where: { id } }) };
};

export async function updateUser(id: string, data: unknown) {
  const idCheck = await checkId(id);
  if (!idCheck.success) {
    return idCheck;
  }
  return {
    success: idCheck.success,
    data,
    message: "User updated",
  };
  // TODO
}

// TO DELETE!!!!
export async function checkAll() {
  const users = await prisma.user.findMany();
  return { sucess: true, users };
}
