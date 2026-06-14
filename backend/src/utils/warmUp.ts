import { prisma } from "../lib/prisma";

export async function warmUp() {
  return await prisma.$queryRaw`SELECT 1`.then(() => true).catch(() => false);
}
