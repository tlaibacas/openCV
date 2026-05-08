import { query } from "../../db/index.js";
import { validateEmail } from "./register.services.js";

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

  const payload = [
    email,
    password,
    name ?? null,
    role ?? "visitor",
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
