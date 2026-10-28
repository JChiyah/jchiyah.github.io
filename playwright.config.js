import { defineConfig } from '@playwright/test';

// Browser tests against the production build, served like GitHub Pages.
// `npm run test:e2e` builds first, so these always test current code.
export default defineConfig({
	testDir: 'tests/e2e',
	fullyParallel: true,
	reporter: 'list',
	use: {
		browserName: 'chromium',
		baseURL: 'http://localhost:4180',
	},
	// Visual baselines are recorded locally (see AGENTS.md) and not committed.
	snapshotPathTemplate: '.screenshots/visual/{arg}-{projectName}{ext}',
	expect: {
		toHaveScreenshot: { maxDiffPixels: 0 },
	},
	projects: [
		{ name: 'desktop', use: { viewport: { width: 1440, height: 900 } } },
		// Behaviour is covered on desktop; mobile only checks the layout.
		{ name: 'mobile', use: { viewport: { width: 390, height: 844 } }, testMatch: /visual\.spec\.js/ },
	],
	webServer: {
		command: 'node tests/e2e/github-pages-server.js',
		url: 'http://localhost:4180',
		reuseExistingServer: true,
	},
});
