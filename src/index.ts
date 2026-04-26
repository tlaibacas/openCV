import { buildsv } from "./server/sv.js";
import { config } from "dotenv";
import { dataCleaner } from "./middleware/bruteShield.js";

config();
dataCleaner();

const port: number = Number(process.env.PORT);
const host: string = process.env.HOST || "localhost";

const server = buildsv();
server.listen({ port: port, host: host }, (err, address) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  console.info(`Server started at ${address}`);
});
