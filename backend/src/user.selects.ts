import { Prisma } from "./generated/prisma/client.js";

export const userSelect: Prisma.UserSelect = {
  id: true,
  email: true,
  name: true,
  lastName: true,
  sex: true,
  role: true,
  agency: true,
  confirmationCode: true,
  createdAt: true,
};
