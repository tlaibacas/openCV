import { buildsv } from "./server/server.js";
import { dataCleaner } from "./middleware/bruteShield.js";

dataCleaner();

const server = buildsv();
server.listen({ port: 1111, host: "0.0.0.0" }, (err, address) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  console.info(`Server running at ${address}`);
});
