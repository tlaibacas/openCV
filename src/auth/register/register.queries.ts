import { query } from "../../db/index.js";

export const registerUser = async (
  email: string,
  password: string,
  name?: string,
  role?: string,
  agency?: string,
  sex?: string,
) => {
  const payload = [
    email,
    password,
    name ?? null,
    role ?? "visitor",
    agency ?? null,
    sex ?? null,
  ];

  console.log("REGISTER USER PAYLOAD:", {
    email,
    password,
    name,
    role,
    agency,
    sex,
  });

  console.log("FINAL SQL VALUES:", payload);

  return query(
    "INSERT INTO users (email, password, name, role, agency, sex) VALUES ($1, $2, $3, $4, $5, $6)",
    payload,
  );
};
