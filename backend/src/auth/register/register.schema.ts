import { z } from "zod";

const normalEmail = z.preprocess((val: unknown) => {
  if (typeof val !== "string") return null;
  return val.trim().toLowerCase() || null;
}, z.email("Invalid email address"));

const passRegex = z
  .string()
  .min(8, "Password must be at least 8 characters")
  .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
  .regex(/[a-z]/, "Must contain lowercase")
  .regex(/\d/, "Must contain number")
  .regex(/[^A-Za-z0-9]/, "Must contain symbol");

const normalizeString = z.preprocess((val: unknown) => {
  if (typeof val !== "string") return null;
  const trimmed = val.trim();
  return trimmed === "" ? null : trimmed;
}, z.string().nullable());

const roles = ["visitor", "recruiter", "admin"] as const;
const roleSchema = z.enum(roles).default("visitor");

const normalizeRole = z
  .preprocess((val: unknown) => {
    if (typeof val !== "string") return null;
    return val.trim().toLowerCase();
  }, roleSchema)
  .default("visitor");

export const registerSchema = z
  .object({
    email: normalEmail,
    password: passRegex,
    confirmPassword: z.string(),
    name: normalizeString,
    lastName: normalizeString,
    role: normalizeRole,
    agency: normalizeString,
    sex: normalizeString.pipe(z.enum(["male", "female", "other"])),
  })
  .superRefine((data, ctx) => {
    if (!data.role) return;

    const add = (path: string[], message: string) =>
      ctx.addIssue({ code: "custom", path, message });

    if (data.password !== data.confirmPassword) {
      add(["confirmPassword"], "Passwords do not match");
    }

    if (data.role === "visitor") {
      if (!data.name) add(["name"], "Name is required for visitors");
      if (!data.sex) add(["sex"], "Sex is required for visitors");
    }

    if (data.role === "recruiter") {
      if (!data.agency) add(["agency"], "Agency is required for recruiters");
    }
  })
  .transform(({ confirmPassword, ...rest }) => rest);

export type RegisterSchema = z.infer<typeof registerSchema>;
