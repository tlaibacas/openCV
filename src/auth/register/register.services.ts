export function validateEmail(email: string) {
  const cleanedEmail = email.trim();
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!cleanedEmail) return false;
  return cleanedEmail.match(regex);
}
