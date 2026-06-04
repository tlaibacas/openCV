// Comments only made to separate functions from types and variables for better readability. They're removed on build.

import { buildServer } from "./server/server.js";
import { dataCleaner } from "./middleware/bruteShield.js";

dataCleaner();

const server = buildServer();
server.listen({ port: 1111, host: "0.0.0.0" }, (err, address) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  console.info(`Server running at ${address}`);
});
