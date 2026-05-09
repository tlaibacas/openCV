import { query } from "../../db/index.js";
import {
  validateEmail,
  validatePassword,
  validateRole,
  validateName,
  validateSex,
} from "./register.services.js";
// Check if error is a PostgreSQL error
function handlePgError(err: unknown): err is { code: string } {
  return typeof err === "object" && err !== null && "code" in err;
}

export const registerUser = async (
  email: string,
  password: string,
  name?: string,
  lastName?: string,
  role?: string,
  agency?: string,
  sex?: string,
) => {
  // Clean input
  const cleanedEmail = validateEmail(email);
  const cleanedPassword = validatePassword(password);
  const cleanedName = validateName(name);
  const cleanedLastName = validateName(lastName);
  const cleanedRole = validateRole(role);
  const cleanedAgency = agency?.toLowerCase() ?? null;
  const cleanedSex = validateSex(sex);
  // Payload
  const payload = [
    cleanedEmail,
    cleanedPassword,
    cleanedName,
    cleanedLastName,
    cleanedRole,
    cleanedAgency,
    cleanedSex,
  ];
  try {
    return await query(
      "INSERT INTO users (email, password, name, lastName, role, agency, sex) VALUES ($1, $2, $3, $4, $5, $6, $7)",
      payload,
    );
  } catch (err: unknown) {
    if (handlePgError(err) && err.code === "23505") {
      throw new Error("Email already exists", { cause: err });
    }
    throw err;
  }
};
