module.exports = {
	plugins: [
		"postcss-flexbugs-fixes",
		[
			"postcss-preset-env",
			{
				autoprefixer: {
					flexbox: "no-2009",
				},
				stage: 3,
				features: {
					"custom-properties": false,
				},
			},
		],
		[
			"@fullhuman/postcss-purgecss",
			{
				content: [
					"./node_modules/react-bootstrap/**/*.{js,jsx,ts,tsx}",
					"./pages/**/*.{js,jsx,ts,tsx}",
					"./components/**/*.{js,jsx,ts,tsx}",
				],
				safelist: [
					"html",
					"body",
					"btn-primary",
					"btn-dark",
					"btn-danger",
					"btn-secondary",
					/col-*/,
				],
				defaultExtractor: (content) =>
					content.match(/[\w-/:]+(?<!:)/g) || [],
			},
		],
		"postcss-combine-media-query",
	],
};
