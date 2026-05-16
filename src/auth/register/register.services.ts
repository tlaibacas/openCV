import { registerSchema } from "./register.schema.js";
import argon2 from "argon2";

export function register(data: unknown) {
  const { success, data: parsed, error } = registerSchema.safeParse(data);

  if (!success) {
    return {
      success: false as const,
      error: error.issues[0]?.message ?? "Invalid input",
    };
  }
  const hashedPassword = hashPassword(parsed.password);
  return {
    success: true as const,
    data: { ...parsed, password: hashedPassword },
  };
}

async function hashPassword(password: string): Promise<string> {
  return argon2.hash(password);
}

export const normalize = (value: string) => value.trim().toLowerCase();
