import { $ZodIssue } from "zod/v4/core";

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

type User = {
  id: string;
  email: string;
  name: string | null;
  role: "visitor" | "recruiter" | "admin";
};

type UserArray = { success: true; users: User[] };

export type UserResponse = {
  success: true;
  user: User;
};

export type ErrorResponse = {
  success: false;
  error: $ZodIssue | undefined | string;
};

export type Result = ErrorResponse | UserResponse;
export type ArrayResult = ErrorResponse | UserArray;
