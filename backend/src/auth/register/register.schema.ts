import { z } from "zod";

export const registerSchema = z
  .object({
    email: z
      .email({ error: "Email must be a valid email address" })
      .min(1, "Email is required for registration")
      .toLowerCase()
      .trim(),
    password: z
      .string({ error: "Password must be a string" })
      .min(1, "Password is required")
      .min(8, "Password must be at least 8 characters long.")
      .regex(/[a-z]/, "Must contain lowercase")
      .regex(/[A-Z]/, "Must contain uppercase")
      .regex(/\d/, "Must contain number")
      .regex(/[^A-Za-z0-9]/, "Must contain symbol"),
    confirmPassword: z
      .string({ error: "Confirm password must be a string" })
      .min(1, "You must confirm password"),
    name: z
      .string({ error: "Name must be a string" })
      .trim()
      .optional()
      .nullable(),
    lastName: z
      .string({ error: "Last name must be a string" })
      .trim()
      .optional()
      .nullable(),
    role: z.enum(["visitor", "recruiter"]),
    agency: z
      .string({ error: "Agency must be a string" })
      .optional()
      .nullable(),
    sex: z.enum(["male", "female", "other"]).optional(),
  })
  .superRefine((data, ctx) => {
    if (data.password !== data.confirmPassword) {
      ctx.addIssue({
        code: "custom",
        path: ["confirmPassword"],
        message: "Passwords do not match!",
      });
    }

    if (data.role === "visitor") {
      if (!data.name) {
        ctx.addIssue({
          code: "custom",
          path: ["name"],
          message: "Name is required for visitors",
        });
      }

      if (!data.lastName) {
        ctx.addIssue({
          code: "custom",
          path: ["lastName"],
          message: "Last name is required for visitors",
        });
      }

      if (!data.sex) {
        ctx.addIssue({
          code: "custom",
          path: ["sex"],
          message: "Sex is required for visitors",
        });
      }
    }
    if (data.role === "recruiter" && !data.agency) {
      ctx.addIssue({
        code: "custom",
        path: ["role"],
        message: "Agency is required for recruiters",
      });
    }
  })
  .transform(({ confirmPassword, ...data }) => ({
    ...data,
    name: data.name ?? null,
    lastName: data.lastName ?? null,
    agency: data.agency ?? null,
    sex: data.sex ?? null,
  }));
