import { Pool } from "pg";
import dotenv from "dotenv";
dotenv.config();
const db = process.env.DATABASE_URL;
const pool = new Pool({
  connectionString: db,
  ssl: { rejectUnauthorized: true },
});

export const query = async (text: string, params?: unknown[]) => {
  return pool.query(text, params);
};

export default pool;
