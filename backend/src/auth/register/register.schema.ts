import { z } from "zod";

const email = z.preprocess(
  (val: unknown) =>
    typeof val !== "string"
      ? undefined
      : val.trim().toLocaleLowerCase() === ""
        ? undefined
        : val,
  z.email("Invalid email").min(1, "Email is required dor registration"),
);

const password = z.preprocess(
  (val: unknown) => (typeof val !== "string" ? undefined : val),
  z
    .string()
    .min(8, "Password must be at least 8 characters long.")
    .regex(/[a-z]/, "Must contain lowercase")
    .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
    .regex(/\d/, "Must contain number")
    .regex(/[^A-Za-z0-9]/, "Must contain symbol"),
);

const confirmPassword = z.preprocess(
  (val: unknown) => (typeof val !== "string" ? undefined : val),
  z.string().min(1, "You must confirm password"),
);

const name = z.preprocess(
  (val: unknown) =>
    typeof val !== "string"
      ? undefined
      : ((v) => (v === "" ? undefined : v))(val.trim()),
  z.string().optional(),
);

const lastName = z.preprocess(
  (val: unknown) =>
    typeof val !== "string"
      ? undefined
      : ((v) => (v === "" ? undefined : v))(val.trim()),
  z.string().optional(),
);

const role = z.preprocess(
  (val: unknown) =>
    typeof val !== "string"
      ? undefined
      : ((v) => (v === "" ? undefined : v))(val.trim().toLocaleLowerCase()),
  z.enum(["visitor", "recruiter", "admin"]),
);

const agency = z.preprocess(
  (val: unknown) =>
    typeof val !== "string"
      ? undefined
      : ((v) => (v === "" ? undefined : v))(val.trim()),
  z.string().optional(),
);

const sex = z.preprocess(
  (val: unknown) =>
    typeof val !== "string"
      ? undefined
      : ((v) => (v === "" ? undefined : v))(val.trim().toLocaleLowerCase()),
  z.enum(["male", "female", "other"]),
);

export const registerSchema = z
  .object({
    email: email,
    password: password,
    confirmPassword: confirmPassword,
    name: name,
    lastName: lastName,
    role: role,
    agency: agency,
    sex: sex,
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
  }));
