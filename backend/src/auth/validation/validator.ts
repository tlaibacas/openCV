import { prisma } from "../../lib/prisma.js";
import { isUuid } from "../../utils/uuid.js";
import { userSelect } from "../../user.selects.js";
import { ErrorResponse, UserResponse } from "../../types.js";

export const validateUser = async (
  value: string,
): Promise<UserResponse | ErrorResponse> => {
  if (!isUuid(value)) {
    return { success: false, error: "Invalid UUID format" };
  }

  try {
    const user = await prisma.user.findFirst({
      where: { confirmationCode: value },
      select: userSelect,
    });

    if (!user) {
      return { success: false, error: "User not found" };
    }
    const updatedUser = await prisma.user.update({
      where: { id: user.id },
      data: { isConfirmed: true, confirmationCode: null },
      select: userSelect,
    });

    return {
      success: true,
      user: updatedUser,
      message: "User validated successfully",
    };
  } catch {
    return { success: false, error: "Internal error" };
  }
};
