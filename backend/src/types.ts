import { z } from "zod";
import { registerSchema } from "./auth/register/register.schema";

export type Register = {
  email: string;
  password: string;
  confirmPassword: string;
  name: string;
  lastName: string;
  role: string;
  agency: string;
  sex: string;
};
export type newData = {
  attempts: number;
  lastAttempt: number;
  blockedUntil?: number | undefined;
};
export type RegisterSchema = z.infer<typeof registerSchema>;
