import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
	plugins: [react()],
	// Served from the root of jchiyah.github.io.
	base: '/',
	build: {
		// Keep CRA's output folder so `gh-pages -d build` and .gitignore are unchanged.
		outDir: 'build',
	},
	css: {
		preprocessorOptions: {
			scss: {
				// Bootstrap 5.3 and src/_Variables.scss still use @import and Sass's
				// global colour functions. Dart Sass 1.x supports both but warns on
				// every compile; moving to @use is tracked in AGENTS.md.
				quietDeps: true,
				silenceDeprecations: ['import', 'global-builtin', 'color-functions', 'if-function'],
			},
		},
	},
	server: {
		// Same port and behaviour as `react-scripts start`.
		port: 3000,
		open: true,
	},
});
