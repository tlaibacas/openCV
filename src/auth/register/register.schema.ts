import { z } from "zod";

const normalizeString = z.preprocess(
  (val) => (typeof val === "string" ? val.trim().toLowerCase() : val),
  z.string(),
);

export const registerSchema = z
  .object({
    email: z.email("Invalid email format").trim().toLowerCase(),
    password: z
      .string()
      .min(8, "Password must be at least 8 characters")
      .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
      .regex(/[a-z]/, "Must contain lowercase")
      .regex(/\d/, "Must contain number")
      .regex(/[^A-Za-z0-9]/, "Must contain symbol"),
    confirmPassword: z.string(),
    name: z.string().trim().optional(),
    lastName: z.string().trim().optional(),
    role: normalizeString
      .pipe(z.enum(["visitor", "recruiter", "admin"]))
      .default("visitor"),
    agency: z.string().optional(),
    sex: normalizeString.pipe(z.enum(["male", "female", "other"])).optional(),
  })
  .superRefine((data, ctx) => {
    if (data.password !== data.confirmPassword) {
      ctx.addIssue({
        code: "custom",
        message: "Passwords do not match",
        path: ["confirmPassword"],
      });
    }

    if (data.role === "visitor") {
      if (!data.name) {
        ctx.addIssue({
          code: "custom",
          message: "Name is required for visitors",
          path: ["name"],
        });
      }

      if (!data.sex) {
        ctx.addIssue({
          code: "custom",
          message: "Sex is required for visitors",
          path: ["sex"],
        });
      }
    }

    if (data.role === "recruiter") {
      if (!data.agency) {
        ctx.addIssue({
          code: "custom",
          message: "Agency is required for recruiters",
          path: ["agency"],
        });
      }
    }
  });

export type RegisterSchema = z.infer<typeof registerSchema>;
