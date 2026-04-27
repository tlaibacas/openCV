import { rmSync } from "node:fs";

const toDelete = [
  "src",
  "build.mjs",
  "tsconfig.json",
  "eslint.config.js",
  "README.md",
  "LICENSE",
];

for (const path of toDelete) {
  rmSync(path, { recursive: true, force: true });
}

console.log("Cleanup complete");
