import { z } from "zod";

const normalize = (value: string) => value.trim().toLowerCase();
const normalizeName = (value: string) =>
  normalize(value)
    .split(" ")
    .filter(Boolean)
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");

export const sexEnum: string = z.enum(["male", "female", "other"]);

export const roleEnum: string = z.enum(["admin", "visitor", "recruiter"]);

export const registerSchema = z.object({
  email: z.email().transform(normalize),

  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
    .regex(/[a-z]/, "Password must contain at least one lowercase letter")
    .regex(/[0-9]/, "Password must contain at least one number")
    .regex(
      /[!@#$%^&*(),.?":{}|<>]/,
      "Password must contain at least one special character",
    ),

  confirmPassword: z.string(),

  name: z.string().min(1, "Name is required").transform(normalizeName),

  lastName: z.string().min(1, "Last name is required").transform(normalizeName),

  role: roleEnum.transform(normalize).min(1, "Role is required"),

  agency: z.string().transform(normalize).min(1, "Agency is required"),

  sex: sexEnum.transform(normalize),
});
