import { z } from "zod";

// Enums
export const sexEnum = z.enum(["male", "female", "other"]);
export const roleEnum = z.enum(["admin", "visitor", "recruiter"]);

// Utils
const normalize = (value: string) => value.trim().toLowerCase();

// Password schema
const passwordSchema = z
  .string()
  .min(8, "Password must be at least 8 characters")
  .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
  .regex(/[a-z]/, "Password must contain at least one lowercase letter")
  .regex(/[0-9]/, "Password must contain at least one number")
  .regex(
    /[!@#$%^&*(),.?":{}|<>]/,
    "Password must contain at least one special character",
  );

// Password check
function checkPasswords(
  data: { password: string; confirmPassword: string },
  ctx: z.RefinementCtx,
) {
  if (data.password !== data.confirmPassword) {
    ctx.addIssue({
      code: "custom",
      path: ["confirmPassword"],
      message: "Passwords do not match",
    });
  }
}

// Role rules
function checkRoleNeeds(
  data: {
    name: string;
    lastName: string;
    role: string;
    agency: string;
    sex: string;
  },
  ctx: z.RefinementCtx,
) {
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

  if (data.role === "recruiter") {
    if (!data.agency) {
      ctx.addIssue({
        code: "custom",
        path: ["agency"],
        message: "Company of agency is required for recruiters",
      });
    }
  }
}

// Schema
const registerSchema = z
  .object({
    email: z.email().transform(normalize),

    password: passwordSchema,

    confirmPassword: z.string(),

    name: z.string().trim(),

    lastName: z.string().trim(),

    role: z.string().transform(normalize).pipe(roleEnum),

    agency: z.string().trim(),

    sex: z.string().transform(normalize).pipe(sexEnum),
  })
  .superRefine(checkPasswords)
  .superRefine(checkRoleNeeds)
  .transform(({ confirmPassword, ...data }) => data);
//Functions
export function register(data: unknown) {
  const { success, data: parsed, error } = registerSchema.safeParse(data);

  if (!success) {
    return {
      success: false as const,
      error: error.issues[0]?.message ?? "Invalid input",
    };
  }
  return { success: true as const, data: parsed };
}
