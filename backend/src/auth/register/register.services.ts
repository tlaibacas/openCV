import { registerSchema } from "./register.schema.js";
import { prisma } from "../../lib/prisma.js";
import * as argon2 from "argon2";

function checkId(id: string) {
  if (!id) {
    return {
      success: false,
      error: "ID is required",
    };
  }
  const user = prisma.user.findUnique({
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

export async function register(data: unknown) {
  const result = registerSchema.safeParse(data);
  if (!result.success) {
    return {
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
  const idCheck = checkId(id);
  if (!idCheck.success) {
    return { success: idCheck.success, error: idCheck.error };
  }
  return {
    success: idCheck.success,
    userExists: idCheck.user,
  };
}

export async function deleteUser(id: string) {
  const idCheck = checkId(id);
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
  const idCheck = checkId(id);
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
export async function checkTest() {
  const users = await prisma.user.findMany();
  return users;
}
