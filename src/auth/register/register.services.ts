import { registerSchema } from "./register.schema.js";
import { prisma } from "../../lib/prisma.js";
import * as argon2 from "argon2";

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
  if (!id) {
    return {
      success: false,
      message: "Invalid ID",
    };
  }
  const user = await prisma.user.findUnique({
    where: { id },
    select: { id: true, name: true, email: true, role: true },
  });
  if (!user) {
    return {
      success: false,
      message: "User not found",
    };
  }
  return {
    success: true,
    user,
  };
}

export async function deleteUser(id: string) {
  if (!id) {
    return {
      success: false,
      message: "Invalid ID",
    };
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

// TO DELETE!!!!
export async function checkTest() {
  const users = await prisma.user.findMany();
  return users;
}
