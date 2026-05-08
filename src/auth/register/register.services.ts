export function validateEmail(email: string) {
  const cleanedEmail = email.trim().toLowerCase();
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!cleanedEmail) {
    throw new Error("Email cannot be empty");
  }
  if (!regex.test(cleanedEmail)) {
    throw new Error("Invalid email format");
  }
  return cleanedEmail;
}
