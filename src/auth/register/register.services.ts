export function validateEmail(email: string) {
  const cleaned = email.trim().toLowerCase();
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!cleaned) {
    throw new Error("Email cannot be empty");
  }
  if (!regex.test(cleaned)) {
    throw new Error("Invalid email format");
  }
  return cleaned;
}
export function validatePassword(password: string) {
  const cleaned = password.trim();
  if (cleaned.length < 8) {
    throw new Error("Password must be at least 8 characters");
  }
  if (!/[A-Z]/.test(cleaned)) {
    throw new Error("Password must contain at least one uppercase letter");
  }
  if (!/[0-9]/.test(cleaned)) {
    throw new Error("Password must contain at least one number");
  }
  if (!/[!@#$%^&*(),.?":{}|<>]/.test(cleaned)) {
    throw new Error("Password must contain at least one special character");
  }
  return cleaned;
}
