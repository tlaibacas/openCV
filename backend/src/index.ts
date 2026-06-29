// Comments only made to separate functions from types and variables for better readability. They're removed on build.

import { buildServer } from "./server/server.js";
import donenv from "dotenv";
donenv.config();

export const isDev = process.env.IS_DEV === "true";
const server = buildServer();
server.listen({ port: 1111, host: "0.0.0.0" }, (err, address) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  console.info(
    isDev
      ? `Server running in development mode address = ${address}`
      : `Server running  at ${address}`,
  );
});
