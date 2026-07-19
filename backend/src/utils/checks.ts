import { prisma } from "../lib/prisma";
import { ErrorResponse, UserResponse } from "../types";
import { userSelect } from "../user.selects";
import { isUuid } from "./uuid";

export const checkId = async (
  id: string,
): Promise<UserResponse | ErrorResponse> =>
  !id
    ? { success: false, error: "ID is required" }
    : !isUuid(id)
      ? { success: false, error: "Invalid ID format" }
      : await prisma.user
          .findUnique({
            where: { id },
            select: userSelect,
          })
          .then((user: any): UserResponse | ErrorResponse =>
            !user
              ? { success: false, error: "User not found" }
              : { success: true, user },
          )
          .catch(() => ({
            success: false,
            error: "Internal error",
          }));
