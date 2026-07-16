import { JwtPayload } from "jsonwebtoken";
import { prisma } from "../../lib/prisma";
import { Login, ErrorResponse } from "../../types";
import { generateToken } from "./jwt";

export const login = async (
  auth: Login,
): Promise<JwtPayload | ErrorResponse> => {
  const { email, password } = auth;
  const user = await prisma.user.findUnique({
    where: { email },
    select: {
      id: true,
      password: true,
      isVerified: true,
      role: true,
    },
  });

  if (!user) {
    return { success: false, error: "Invalid email or password" };
  }

  const isPasswordValid = user.password === password; // Replace with proper password hashing check

  if (!isPasswordValid) {
    return { success: false, error: "Invalid email or password" };
  }

  const result = {
    id: user.id,
    isVerified: user.isVerified,
    role: user.role,
  };
  const token: string = generateToken(result);

  return {
    success: true,
    token,
  };
};
