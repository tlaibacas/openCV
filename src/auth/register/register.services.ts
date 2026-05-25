import { registerSchema } from "./register.schema.js";

export function register(data: unknown) {
  const result = registerSchema.safeParse(data);
  if (!result.success) {
    return {
      success: false,
      error: result.error.issues[0],
    };
  }
  return {
    success: true,
    data: result.data,
  };
}
