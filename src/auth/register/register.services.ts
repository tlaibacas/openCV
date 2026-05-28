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

export async function checkUsers() {
  const users = await prisma.user.findMany({
    select: { id: true, name: true, email: true, role: true },
  });

  return users;
}

export async function checkTest() {
  const users = await prisma.user.findMany();
  return users;
}

export async function deleteTest() {
  const users = await prisma.user.deleteMany();
  return users;
}
