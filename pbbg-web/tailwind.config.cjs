const plugin = require('tailwindcss/plugin');

// System font stack from https://github.com/sindresorhus/modern-normalize/blob/1fc6b5a86676b7ac8abc62d04d6080f92debc70f/modern-normalize.css#L43-L52
const systemFontStack = `system-ui, -apple-system, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji'`;

module.exports = {
	content: [
		'src/app.html',
		'src/**/*.{svelte,ts}',
	],
	theme: {
		extend: {
			screens: {
				xs: '480px',
			},
			fontFamily: {
				body: `'Work Sans', ${ systemFontStack }`,
			},
		},
	},
	plugins: [
		plugin(function ({ addVariant }) {
			addVariant('hocus', ['&:hover', '&:focus', '&:active']);
			addVariant('group-hocus', ['.group:hover &', '.group:focus &', '.group:active &']);
		}),
	],
};
