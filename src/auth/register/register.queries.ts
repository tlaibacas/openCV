import { query } from "../../db/index.js";
import {
  validateEmail,
  validatePassword,
  validateRole,
} from "./register.services.js";

function handlePgError(err: unknown): err is { code: string } {
  return typeof err === "object" && err !== null && "code" in err;
}

export const registerUser = async (
  email: string,
  password: string,
  name?: string,
  role?: string,
  agency?: string,
  sex?: string,
) => {
  email = validateEmail(email);
  password = validatePassword(password);
  role = validateRole(role);

  const payload = [
    email,
    password,
    name ?? null,
    role,
    agency ?? null,
    sex ?? null,
  ];
  try {
    return await query(
      "INSERT INTO users (email, password, name, role, agency, sex) VALUES ($1, $2, $3, $4, $5, $6)",
      payload,
    );
  } catch (err: unknown) {
    if (handlePgError(err) && err.code === "23505") {
      throw new Error("Email already exists", { cause: err });
    }
    throw err;
  }
};
