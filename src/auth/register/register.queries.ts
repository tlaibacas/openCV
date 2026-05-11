import {
  validateEmail,
  validatePassword,
  validateRole,
  validateName,
  validateSex,
} from "./register.services.js";

export const registerUser = async (
  email: string,
  password: string,
  name?: string,
  lastName?: string,
  role?: string,
  agency?: string,
  sex?: string,
) => {
  const cleanedEmail = validateEmail(email);
  const cleanedPassword = validatePassword(password);
  const cleanedName = validateName(name);
  const cleanedLastName = validateName(lastName);
  const cleanedRole = validateRole(role);
  const cleanedAgency = agency?.toLowerCase() ?? null;
  const cleanedSex = validateSex(sex);

  return await prisma.user.create({
    data: {
      email: cleanedEmail,
      password: cleanedPassword,
      name: cleanedName,
      lastName: cleanedLastName,
      role: cleanedRole,
      agency: cleanedAgency,
      sex: cleanedSex,
    },
  });
};
