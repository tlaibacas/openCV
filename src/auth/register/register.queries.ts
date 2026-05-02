import { query } from "../../db/index.js";

export const registerUser = async (
  email: string,
  password: string,
  name?: string,
  role?: string,
  agency?: string,
  sex?: string,
) =>
  query(
    "INSERT INTO users (email, password, name, role, agency, sex) VALUES ($1, $2, $3, $4, $5, $6)",
    [
      email,
      password,
      name ?? null,
      role ?? "visitor",
      agency ?? null,
      sex ?? null,
    ],
  );
