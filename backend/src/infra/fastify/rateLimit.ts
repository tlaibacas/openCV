export const rateLimits = {
  auth: { max: 5, timeWindow: "1 minute" },
  write: { max: 30, timeWindow: "1 minute" },
  read: { max: 120, timeWindow: "1 minute" },
  heavy: { max: 10, timeWindow: "1 minute" },
};
