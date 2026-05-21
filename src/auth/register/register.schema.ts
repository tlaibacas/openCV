import { z } from "zod";
function normalizeEmptyToUndefined<T extends Record<string, unknown>>(
  data: T,
): T {
  const result: Record<string, unknown> = {};

  for (const key in data) {
    const value = data[key];

    if (typeof value === "string") {
      const trimmed = value.trim();
      result[key] = trimmed === "" ? undefined : trimmed;
    } else {
      result[key] = value;
    }
  }

  return result as T;
}

function preRegister(
  data: {
    password: string;
    confirmPassword: string;
    name: string;
    lastName: string;
    sex: string;
    agency: string;
    role: string;
  },
  ctx: z.RefinementCtx,
) {
  const clean = normalizeEmptyToUndefined(data);

  if (clean.password !== clean.confirmPassword) {
    ctx.addIssue({
      code: "custom",
      path: ["confirmPassword"],
      message: "Passwords do not match",
    });
  }

  if (clean.role === "recruiter" && !clean.agency) {
    ctx.addIssue({
      code: "custom",
      path: ["agency"],
      message: "Company of agency is required for recruiters",
    });
  }

  if (clean.role === "visitor") {
    if (!clean.name) {
      ctx.addIssue({
        code: "custom",
        path: ["name"],
        message: "Name is required for visitors",
      });
    }

    if (!clean.lastName) {
      ctx.addIssue({
        code: "custom",
        path: ["lastName"],
        message: "Last name is required for visitors",
      });
    }

    if (!clean.sex) {
      ctx.addIssue({
        code: "custom",
        path: ["sex"],
        message: "Sex is required for visitors",
      });
    }
  }
}

// Register schema
export const registerSchema = z
  .object({
    email: z.email("Invalid email").trim().toLowerCase(),

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

    name: z.string().trim(),

    lastName: z.string().trim(),

    role: z
      .string()
      .trim()
      .toLowerCase()
      .pipe(z.enum(["visitor", "recruiter", "admin"])),

    agency: z.string().trim(),

    sex: z
      .string()
      .trim()
      .toLowerCase()
      .pipe(z.enum(["male", "female", "other"])),
  })

  .superRefine(preRegister)
  .transform(({ confirmPassword, ...data }) => data);
