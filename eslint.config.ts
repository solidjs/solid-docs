import eslint from "@eslint/js";
import solid from "eslint-plugin-solid";
import * as globals from "globals";
import tseslint from "typescript-eslint";
import tsParser from "@typescript-eslint/parser";

export default [
	{
		name: "global-ignores",
		ignores: [
			"**/dist/**",
			"**/node_modules/**",
			".github/",
			".solid/",
			".vinxi/",
			".netlify/",
			"public/",
			"scripts/",
		],
	},
	eslint.configs.recommended,
	...tseslint.configs.recommended,
	{
		files: ["**/*.{ts,tsx}"],
		languageOptions: {
			parser: tsParser,
			parserOptions: {
				project: "tsconfig.json",
				ecmaVersion: "latest",
				sourceType: "module",
			},
			globals: {
				...globals.browser,
				...globals.node,
			},
		},
		plugins: {
			solid,
		},
		rules: {
			quotes: ["error", "double"],
			semi: "warn",
			"@typescript-eslint/no-unused-vars": [
				"error",
				{
					args: "all",
					argsIgnorePattern: "^_",
					caughtErrors: "all",
					caughtErrorsIgnorePattern: "^_",
					destructuredArrayIgnorePattern: "^_",
					varsIgnorePattern: "^_",
					ignoreRestSiblings: true,
				},
			],
		},
	},
];
