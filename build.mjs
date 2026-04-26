import { build } from "esbuild";

await build({
  entryPoints: ["src/index.ts"],
  outfile: "dist/index.js",

  bundle: true,
  platform: "node",
  target: "node20",

  format: "esm",
  sourcemap: false,
  minify: true,

  external: ["fastify", "dotenv"],
});
