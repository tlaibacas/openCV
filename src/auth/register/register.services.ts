// Types
type Role = (typeof allowedRoles)[number];
type Sex = (typeof allowedSex)[number];
// Vars
const allowedRoles = ["visitor", "agent", "admin"];
const allowedSex = ["male", "female", "other"];
// Email validator
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
// Password validator
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

// Role validator
function isRole(role: string): role is Role {
  return allowedRoles.includes(role);
}
// Validator for role
export function validateRole(role?: string): Role {
  const cleaned = role?.trim().toLowerCase() ?? "visitor";
  if (!isRole(cleaned)) {
    throw new Error("Invalid role");
  }
  return cleaned as Role;
}
// Validator for name
export function validateName(name?: string) {
  const cleaned = name?.trim().toLowerCase();
  if (!cleaned) return null;
  return cleaned.charAt(0).toUpperCase() + cleaned.slice(1);
}
function isSex(sex: string): sex is Sex {
  return allowedSex.includes(sex);
}
// Validator for sex
export function validateSex(sex?: string): Sex | null {
  const cleaned = sex?.trim().toLowerCase() ?? null;
  if (!cleaned) return null;
  if (!isSex(cleaned)) throw new Error("Invalid sex");
  return cleaned;
}
