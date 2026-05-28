import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["src/index.ts"],
  splitting: false,
  bundle: true,
  clean: true,
  minify: true,
  sourcemap: false,
  outDir: "dist",

  noExternal: [
    "@repo/database",
    "@repo/services",
    "@repo/trpc"
  ],

  loader: {
    ".json": "copy",
  },

  env: {
    IS_SERVER_BUILD: "true",
  },
});