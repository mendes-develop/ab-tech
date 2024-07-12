/** @type {import("eslint").Linter.Config} */
module.exports = {
	root: true,
	extends: ['@ab-labs/eslint-config/react-internal.js', 'plugin:storybook/recommended'],
	parser: '@typescript-eslint/parser',
	parserOptions: {
		project: './tsconfig.lint.json',
		tsconfigRootDir: __dirname,
	},
};
