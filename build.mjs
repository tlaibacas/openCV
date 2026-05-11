import { build } from "esbuild";
import fs from "fs";

const start = [
  "dist",
  "LICENSE",
  "users.sql",
  "package-lock.json",
  "README.md",
];

const finish = ["src", "tsconfig.json", ".gitignore"];

for (const target of start) {
  fs.rmSync(target, {
    recursive: true,
    force: true,
  });
}

await build({
  entryPoints: ["src/index.ts"],
  outfile: "dist/index.js",
  bundle: true,
  platform: "node",
  target: "node18",
  format: "esm",
  sourcemap: false,
  minify: true,
  external: ["fastify", "dotenv", "pg"],
});

for (const target of finish) {
  fs.rmSync(target, {
    recursive: true,
    force: true,
  });
}
