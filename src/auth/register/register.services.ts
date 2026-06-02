import { registerSchema } from "./register.schema.js";
import { prisma } from "../../lib/prisma.js";
import * as argon2 from "argon2";

function checkId(id: string | undefined) {
  if (!id || undefined) {
    return {
      success: false,
      message: "Invalid ID",
    };
  }
  return { success: true };
}

function findUniqueUserById(id: string) {
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

  return {
    success: true,
    user,
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
  const userExists = findUniqueUserById(id);
  if (!userExists.success) {
    return userExists;
  }
  return {
    success: true,
    userExists: userExists.user,
  };
}

export async function deleteUser(id: string) {
  const idCheck = checkId(id);
  if (!idCheck.success) {
    return idCheck;
  }
  const exists = await prisma.user.findUnique({
    where: { id },
    select: {
      id: true,
      email: true,
    },
  });

  if (!exists) {
    return {
      success: false,
      message: "User not found",
    };
  }

  await prisma.user.delete({
    where: { id },
  });

  return {
    success: true,
    message: "User deleted successfully",
    id: exists.id,
    email: exists.email,
  };
}

export async function updateUser(id: string, data: unknown) {
  const idCheck = checkId(id);
  if (!idCheck.success) {
    return idCheck;
  }
  const exists = await prisma.user.findUnique({
    where: { id },
    select: {
      id: true,
      email: true,
    },
  });

  if (!exists) {
    return {
      success: false,
      message: "User not found",
    };
  }
  // TODO
}

// TO DELETE!!!!
export async function checkTest() {
  const users = await prisma.user.findMany();
  return users;
}
