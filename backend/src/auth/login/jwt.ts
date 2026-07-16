import jwt from "jsonwebtoken";
import { JwtPayload, Payload } from "../../types";

export const generateToken = (payload: Payload): string => {
  return jwt.sign(payload, process.env.JWT_SECRET!, {
    expiresIn: "1h",
  });
};

export const verifyToken = (token: string): JwtPayload | null => {
  try {
    return jwt.verify(token, process.env.JWT_SECRET!) as JwtPayload;
  } catch {
    return null;
  }
};
