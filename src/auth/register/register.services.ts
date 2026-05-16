import { registerSchema } from "./register.schema.js";
import argon2 from "argon2";
import { prisma } from "../../lib/prisma.js";

export async function register(data: unknown) {
  const { success, data: parsed, error } = registerSchema.safeParse(data);

  if (!success) {
    return {
      success: false as const,
      error: error.issues[0]?.message ?? "Invalid input",
    };
  }
  const hashedPassword: string = await hashPassword(parsed.password);

  const user = await prisma.user.create({
    data: {
      email: parsed.email,
      password: hashedPassword,
      name: parsed.name,
      lastName: parsed.lastName,
      role: parsed.role,
      agency: parsed.agency || null,
      sex: parsed.sex || null,
    },
  });

  return {
    success: true as const,
    data: { user },
  };
}

async function hashPassword(password: string): Promise<string> {
  return argon2.hash(password);
}

export const normalize = (value: string) => value.trim().toLowerCase();
