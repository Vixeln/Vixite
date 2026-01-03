/**
 * To configure the eslint rules with ease, run this in the terminal:
 * npx eslint --inspect-config
 *
 * Blog Post about this new config system (flat config): https://eslint.org/blog/2022/08/new-config-system-part-2/
 * ESLint's Docs on Configuration: https://eslint.org/docs/latest/use/configure/
 * Typescript ESLint Docs on config: https://typescript-eslint.io/getting-started/typed-linting
 *
 * The comments above were copied from my sf hacks's project configuration
 */

import pluginVue from "eslint-plugin-vue";
import vueTsEslintConfig from "@vue/eslint-config-typescript";
import skipFormatting from "@vue/eslint-config-prettier/skip-formatting";

export default [
	{
		name: "app/files-to-lint",
		files: ["**/*.{ts,mts,tsx,vue}"],
	},

	{
		name: "app/files-to-ignore",
		ignores: ["**/dist/**", "**/dist-ssr/**", "**/coverage/**"],
	},

	...pluginVue.configs["flat/essential"],
	...vueTsEslintConfig(),
	skipFormatting,

	// This configuration was copied from sf hacks's configuration so it might be outdated or partially incompatible
	{
		name: "config-vixeln",
		ignores: [],
		rules: {
			"no-compare-neg-zero": "error",
			"prefer-const": "error",
		},
		languageOptions: {
			parserOptions: {
				tsconfigRootDir: import.meta.dirname,
			},
		},
	},
];
