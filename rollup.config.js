import json from '@rollup/plugin-json';
import { terser } from "rollup-plugin-terser";
import resolve from "@rollup/plugin-node-resolve";
import babel from "rollup-plugin-babel";
import typescript from 'rollup-plugin-typescript2';
import { DEFAULT_EXTENSIONS } from '@babel/core';

let config1 = {
  input: 'src/index.ts',
  output: [
    {
      file: "dist/simpleslider.amd.js",
      format: "amd"
    },
    {
      file: "dist/simpleslider.amd.min.js",
      format: "amd",
      plugins: [terser()]
    },

    {
      file: "dist/simpleslider.iife.js",
      name: "SimpleSlider",
      format: "iife"
    },
    {
      file: "dist/simpleslider.iife.min.js",
      name: "SimpleSlider",
      format: "iife",
      plugins: [terser()]
    },
    {
      file: "dist/simpleslider.js",
      name: "SimpleSlider",
      format: "umd"
    },
    {
      file: "dist/simpleslider.min.js",
      name: "SimpleSlider",
      format: "umd",
      plugins: [terser()]
    }
  ],
  plugins: [
    json(),
    resolve(),
    typescript(),
    babel({
      exclude: "node_modules/**",
      extensions: [
        ...DEFAULT_EXTENSIONS,
        '.ts',
        '.tsx'
      ]
    })
  ]
};

let config2 = {
  input: "src/index.ts",
  output: [
    {
      file: "dist/simpleslider.esm.js",
      format: "esm"
    },
    {
      file: "dist/simpleslider.esm.min.js",
      format: "esm",
      plugins: [terser()]
    }
  ],
  plugins: [json(),typescript()]
}

module.exports = [config1,config2];