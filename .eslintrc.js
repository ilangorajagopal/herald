module.exports = {
	env: {
		browser: true,
		es2021: true,
		node: true,
	},
	extends: [
		'eslint:recommended',
		'plugin:react/recommended',
		'plugin:@typescript-eslint/recommended',
		'prettier',
	],
	parser: '@typescript-eslint/parser',
	parserOptions: {
		ecmaFeatures: {
			jsx: true,
		},
		ecmaVersion: 13,
		sourceType: 'module',
	},
	plugins: ['react', '@typescript-eslint'],
	rules: {
		'react/prop-types': 'off',
		'react/react-in-jsx-scope': 'off',
		'react/display-name': 'off',
		'@typescript-eslint/ban-ts-comment': 'off',
		'@typescript-eslint/no-namespace': 'off',
		'@typescript-eslint/no-explicit-any': 'off',
	},
};
