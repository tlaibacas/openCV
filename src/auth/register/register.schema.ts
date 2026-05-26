import { z } from "zod";

const normalizeString = z.preprocess((val) => {
  if (val === "") return undefined;
  if (typeof val === "string") return val.trim().toLowerCase();
  return undefined;
}, z.string().optional());

const passRegex = z
  .string()
  .min(8, "Password must be at least 8 characters")
  .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
  .regex(/[a-z]/, "Must contain lowercase")
  .regex(/\d/, "Must contain number")
  .regex(/[^A-Za-z0-9]/, "Must contain symbol");

const normalizeRole = z.preprocess(
  (val) => {
    if (val === "") return undefined;
    if (typeof val === "string") return val.trim().toLowerCase();
    return undefined;
  },
  z
    .enum(
      ["visitor", "recruiter", "admin"],
      "Role doesn't match any of the allowed values",
    )
    .default("visitor"),
);

const normalizeEmail = z.preprocess((val) => {
  if (val === "") return undefined;
  if (typeof val === "string") return val.trim().toLowerCase();
  return undefined;
}, z.email("Invalid email format"));

export const registerSchema = z
  .object({
    email: normalizeEmail,
    password: passRegex,
    confirmPassword: z.string(),
    name: normalizeString,
    lastName: normalizeString,
    role: normalizeRole,
    agency: normalizeString,
    sex: normalizeString.pipe(z.enum(["male", "female", "other"])).optional(),
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
  });

export type RegisterSchema = z.infer<typeof registerSchema>;
