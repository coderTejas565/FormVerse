import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["./src/index.ts"],
  outDir: "dist",
  clean: true,

  bundle: true,
  splitting: false,
  sourcemap: false,
  minify: false,

  // IMPORTANT: keep monorepo imports working
  noExternal: [
    "@repo/*",
  ],
});