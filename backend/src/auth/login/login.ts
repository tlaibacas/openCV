import { prisma } from "../../lib/prisma";
import argon2 from "argon2";
import { Login, ErrorResponse, JwtResponse } from "../../types";
import { generateToken } from "./jwt";

export const login = async (
  auth: Login,
): Promise<JwtResponse | ErrorResponse> => {
  const user = await prisma.user.findUnique({
    where: { email: auth.email },
    select: {
      id: true,
      password: true,
      isVerified: true,
      role: true,
    },
  });
  return !user
    ? { success: false, error: "Invalid email or password" }
    : !(await argon2.verify(user.password, auth.password))
      ? { success: false, error: "Invalid email or password" }
      : {
          success: true,
          token: generateToken({
            id: user.id,
            isVerified: user.isVerified,
            role: user.role,
          }),
        };
};
