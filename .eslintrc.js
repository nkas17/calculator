module.exports = {
	extends: [
		"airbnb",
		"prettier",
		"prettier/react"
	],
	plugins: [
		"prettier"
	],
	env: {
		browser: true,
		commonjs: true,
		node: true,
		jest: true,
	},
	rules: {
		indent: [
			"error",
			"tab",
			{ "SwitchCase": 1 },
		],
		"react/jsx-indent": [
			"error",
			"tab",
		],
		"react/jsx-indent-props": [
			"error",
			"tab",
		],
		"no-tabs": "off",
		"prettier/prettier": [
			"error",
			{
				trailingComma: "es5",
				singleQuote: true,
				printWidth: 80,
				useTabs: true
			}
		],
	}
}
