import { registerSchema } from "./register.schema.js";
import { prisma } from "../../lib/prisma.js";

export async function register(data: unknown) {
  const result = registerSchema.safeParse(data);

  if (!result.success) {
    return {
      success: false,
      error: result.error.issues[0],
    };
  }

  const user = await prisma.user.create({
    data: result.data,
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
    sucess: true,
    users,
  };
}

export async function checkUser(id: string) {
  const user = await prisma.user.findUnique({
    where: { id },
    select: { id: true, name: true, email: true, role: true },
  });
  if (!id || user === null) {
    return {
      sucess: false,
      message: "User not found",
    };
  }
  return {
    sucess: true,
    user,
  };
}

export async function deleteUser(id: string) {
  const user = await prisma.user.delete({
    where: { id },
  });
  if (!id || null) {
    return {
      sucess: false,
      message: "User not found",
    };
  }
  return {
    sucess: true,
    message: "User deleted successfully",
    id: user.id,
    email: user.email,
  };
}

// TO DELETE!!!!
export async function checkTest() {
  const users = await prisma.user.findMany();
  return users;
}

export async function deleteTest() {
  const users = await prisma.user.deleteMany();
  return users;
}
