// @ts-check

import { terser } from "rollup-plugin-terser";
import typescript2 from "rollup-plugin-typescript2";
import pkg from "./package.json" assert { type: "json" };

const banner = `/*!
 * Obelisk (TS) v${pkg.version}
 * Copyright (c) Max Huang, Storiny
 * Fork (https://github.com/storiny/obelisk) of https://github.com/nosir/obelisk.js
 * Released under the MIT License.
 */
`;

/**
 * @param {import('rollup').OutputOptions} options
 * @returns {import('rollup').OutputOptions}
 */
function createOutputOptions(options) {
  return {
    banner,
    name: "obelisk",
    exports: "named",
    sourcemap: true,
    ...options,
  };
}

/**
 * @type {import('rollup').RollupOptions}
 */
const options = {
  input: "./src/index.ts",
  output: [
    createOutputOptions({
      file: "./dist/index.js",
      format: "commonjs",
    }),
    createOutputOptions({
      file: "./dist/index.cjs",
      format: "commonjs",
    }),
    createOutputOptions({
      file: "./dist/index.mjs",
      format: "esm",
    }),
    createOutputOptions({
      file: "./dist/index.esm.js",
      format: "esm",
    }),
    createOutputOptions({
      file: "./dist/index.umd.js",
      format: "umd",
    }),
    createOutputOptions({
      file: "./dist/index.umd.min.js",
      format: "umd",
      plugins: [terser()],
    }),
  ],
  plugins: [
    typescript2({
      clean: true,
      useTsconfigDeclarationDir: true,
      tsconfig: "./tsconfig.bundle.json",
    }),
  ],
};

export default options;
