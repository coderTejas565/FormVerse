import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["./src/index.ts"],

  format: ["cjs"],

  bundle: true,

  splitting: false,

  clean: true,

  outDir: "./dist",

  minify: true,

  sourcemap: false,

  external: [],

  // IMPORTANT FIX FOR MONOREPO
  noExternal: ["@repo/*"],
});