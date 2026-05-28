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

export async function main() {
  const users = await prisma.user.findMany({ select: { password: false } });

  return users;
}
