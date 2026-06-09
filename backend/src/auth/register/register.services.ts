import { registerSchema } from "./register.schema.js";
import { prisma } from "../../lib/prisma.js";
import * as argon2 from "argon2";
import type { Register } from "../../types.js";

const uuidRegex: RegExp =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

const isUuid = (v: string) => uuidRegex.test(v);

async function checkId(id: string) {
  if (!id) {
    return {
      success: false,
      error: "ID is required",
    };
  }
  if (!isUuid(id)) {
    return {
      success: false,
      error: "Invalid ID format",
    };
  }
  const user = await prisma.user.findUnique({
    where: { id },
    select: { id: true, name: true, email: true, role: true },
  });
  if (!user) {
    return {
      success: false,
      error: "User not found",
    };
  }
  return { success: true, user };
}

export async function register(data: Register) {
  const result = registerSchema.safeParse(data);
  if (!result.success) {
    return {
      success: false,
      error: result.error.issues[0],
    };
  }
  const hash = await argon2.hash(result.data.password);
  const user = await prisma.user.create({
    data: { ...result.data, password: hash },
  });
  const safeUser = {
    id: user.id,
    name: user.name,
    email: user.email,
    role: user.role,
  };
  return { success: true, user: safeUser };
}

export async function users() {
  const users = await prisma.user.findMany({
    select: { id: true, name: true, email: true, role: true },
  });

  return {
    success: true,
    users,
  };
}

export async function checkUser(id: string) {
  const idCheck = await checkId(id);
  if (!idCheck.success) {
    return { success: idCheck.success, error: idCheck.error };
  }
  return {
    success: idCheck.success,
    userExists: idCheck.user,
  };
}

export async function deleteUser(id: string) {
  const idCheck = await checkId(id);
  if (!idCheck.success) {
    return { success: idCheck.success, error: idCheck.error };
  }
  await prisma.user.delete({
    where: { id },
  });
  return {
    success: idCheck.success,
    userDeleted: idCheck.user,
    message: "User deleted",
  };
}

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
