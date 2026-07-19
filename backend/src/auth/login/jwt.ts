import jwt from "jsonwebtoken";
import { Jwt } from "../../types";

export const generateToken = (auth: Jwt): string => {
  return jwt.sign(auth, process.env.JWT_SECRET!, {
    expiresIn: "1h",
  });
};

export const verifyToken = (token: string): Jwt | null => {
  try {
    return jwt.verify(token, process.env.JWT_SECRET!) as Jwt;
  } catch {
    return null;
  }
};
