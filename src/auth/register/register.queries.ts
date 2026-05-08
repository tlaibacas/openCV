import { query } from "../../db/index.js";
import { validateEmail } from "./register.services.js";

export const registerUser = async (
  email: string,
  password: string,
  name?: string,
  role?: string,
  agency?: string,
  sex?: string,
) => {
  email = validateEmail(email);

  const payload = [
    email,
    password,
    name ?? null,
    role ?? "visitor",
    agency ?? null,
    sex ?? null,
  ];

  return query(
    "INSERT INTO users (email, password, name, role, agency, sex) VALUES ($1, $2, $3, $4, $5, $6)",
    payload,
  );
};
