import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["src/index.ts"], 
  splitting: false, 
  minify: true, 
  // target: "esnext",
  external: [], 
  sourcemap: true, 
  dts: true, 
  clean: true,
  skipNodeModulesBundle: true,
  format: ["esm", "cjs"], 
  shims: true, 
  treeshake: true, 
});
