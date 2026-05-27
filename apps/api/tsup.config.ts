import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["./src/index.ts"],
  bundle: true,
  external: [], // IMPORTANT
  splitting: false,
  clean: true,
  outDir: "./dist",
  minify: true,
  sourcemap: false,
});