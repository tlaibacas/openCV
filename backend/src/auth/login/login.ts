import jwt from "jsonwebtoken";
import { JwtPayload } from "../../types";

export function generateToken(payload: JwtPayload) {
  return jwt.sign(payload, process.env.JWT_SECRET!, {
    expiresIn: "7d",
  });
}
