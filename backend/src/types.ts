import { Sex, Role, User } from "../src/generated/prisma/client.js";

export type RegisterRole = "visitor" | "recruiter";

export type Register = {
  email: string;
  password: string;
  confirmPassword: string;
  name?: string | null;
  lastName?: string | null;
  role?: RegisterRole;
  agency?: string | null;
  sex?: Sex | null;
};

export type UpdateUser = {
  id?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
  name?: string;
  lastName?: string;
  role?: Role;
  agency?: string;
  sex?: Sex;
};

export type UserResponse = {
  success: true;
  user: User;
  message?: string;
};

export type UsersResponse = {
  success: true;
  users: User[];
  message?: string;
};

export type ErrorResponse = {
  success: false;
  error: string;
};

export const uuidRegex: RegExp =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
