import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["./src/index.ts"],

  // IMPORTANT: bundle monorepo workspace packages
  bundle: true,

  // THIS is the key fix for Render issue
  external: [],

  splitting: false,
  clean: true,

  outDir: "./dist",

  minify: true,
  sourcemap: false,

  env: {
    IS_SERVER_BUILD: "true",
  },

  loader: {
    ".json": "copy",
  },
});