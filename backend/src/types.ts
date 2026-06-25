export type Role = "visitor" | "recruiter" | "admin";
export type Sex = "male" | "female" | "other";

export type Register = {
  id: string;
  email: string;
  password: string;
  confirmPassword: string;
  name?: string | null;
  lastName?: string | null;
  role: Role;
  isConfirmed: boolean;
  confirmationCode: string;
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

export type User = {
  id: string;
  email: string;
  name: string | null;
  lastName: string | null;
  sex: string | null;
  agency: string | null;
  confirmationCode: string;
  role: Role;
  createdAt: Date;
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
