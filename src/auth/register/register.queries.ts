import { query } from "../../db/index.js";

export const registerUser = async (email: string, password: string) =>
  query("INSERT INTO users (email, password) VALUES ($1, $2)", [
    email,
    password,
  ]);
