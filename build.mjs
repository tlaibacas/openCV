import { rmSync } from "node:fs";
const toDelete1 = [
  "dist",
  "README.md",
  "LICENSE",
  "users.sql",
  ".gitignore",
  "pnpm-lock.yaml",
];
for (const path of toDelete1) {
  rmSync(path, { recursive: true, force: true });
}
const { build } = await import("esbuild");
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
const toDelete2 = ["src", "node_modules"];
for (const path of toDelete2) {
  rmSync(path, { recursive: true, force: true });
}
