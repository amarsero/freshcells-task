import { defineConfig } from "vite";
import react, { reactCompilerPreset } from "@vitejs/plugin-react";
import babel from "@rolldown/plugin-babel";
import eslint from "vite-plugin-eslint2";
import codegen from "vite-plugin-graphql-codegen";

// https://vite.dev/config/
export default defineConfig({
	plugins: [
		react(),
		babel({ presets: [reactCompilerPreset()] }),
		eslint({ fix: true }),
		codegen({ runOnBuild: false }),
	],
});
