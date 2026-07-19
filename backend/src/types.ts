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

export type JwtResponse = {
  success: true;
  token: string;
};

export type Jwt = {
  id: string;
  isVerified: boolean;
  role: Role;
};

export type Login = {
  email: string;
  password: string;
};
