import { registerSchema } from "./register.schema.js";
import { prisma } from "../../lib/prisma.js";
import * as argon2 from "argon2";

function checkId(id: string) {
  if (!id) {
    return {
      success: false,
      message: "ID is required",
    };
  }
  const user = prisma.user.findUnique({
    where: { id },
    select: { id: true, name: true, email: true, role: true },
  });
  if (!user) {
    return {
      success: false,
      message: "User not found",
    };
  }
  return { success: true, user };
}

export async function register(data: unknown) {
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
  return {
    success: true,
    safeUser,
  };
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
    return idCheck;
  }
  return {
    success: true,
    userExists: idCheck.user,
  };
}

export async function deleteUser(id: string) {
  const idCheck = checkId(id);
  if (!idCheck.success) {
    return idCheck;
  }
  await prisma.user.delete({
    where: { id },
  });
  return {
    success: true,
    userDeleted: idCheck.user,
    message: "User deleted",
  };
}

export async function updateUser(id: string, data: unknown) {
  const idCheck = checkId(id);
  if (!idCheck.success) {
    return idCheck;
  }
  // TODO
}

// TO DELETE!!!!
export async function checkTest() {
  const users = await prisma.user.findMany();
  return users;
}
