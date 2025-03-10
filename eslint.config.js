import typescriptEslint from "@typescript-eslint/eslint-plugin";
import globals from "globals";
import tsParser from "@typescript-eslint/parser";
import path from "node:path";
import { fileURLToPath } from "node:url";
import js from "@eslint/js";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
	baseDirectory: __dirname,
	recommendedConfig: js.configs.recommended,
	allConfig: js.configs.all,
});

export default [
	{
		ignores: ["**/node_modules/", "**/dist/"],
	},
	...compat.extends(
		"eslint:recommended",
		"plugin:@typescript-eslint/recommended",
		"plugin:solid/typescript",
		"plugin:mdx/recommended",
	),
	{
		plugins: {
			"@typescript-eslint": typescriptEslint,
		},

		languageOptions: {
			globals: {
				...globals.browser,
			},

			parser: tsParser,
			ecmaVersion: "latest",
			sourceType: "script",
		},
		rules: {
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
	{
		files: ["**/*.mdx"],
		extends: ["plugin:mdx/recommended"],
		settings: {
			"mdx/code-blocks": true,
		},
		extensions: ["mdx"],
		overrides: [
			{
				files: ["*.mdx"],
				extends: ["plugin:mdx/overrides"],
			},
			{
				files: "**/*.mdx",
				extends: "plugin:mdx/code-blocks",
			},
		],
	},
	{
		files: ["**/.eslintrc.{js,cjs}"],
		languageOptions: {
			globals: {
				...globals.node,
			},

			ecmaVersion: 5,
			sourceType: "commonjs",
		},
	},
];
