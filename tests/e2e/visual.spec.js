// Full-page screenshots of every page at desktop and mobile widths, compared
// pixel-for-pixel against baselines recorded from a known-good build.
//
// Baselines live in .screenshots/visual/ and are not committed. Record them on
// a commit you trust with `npm run test:visual:update`, then make your change
// and run `npm run test:e2e`; any visual difference fails with a diff image.
import { test, expect } from '@playwright/test';

const pages = { home: '/', projects: '/projects', publications: '/publications', experience: '/experience' };

for (const [name, path] of Object.entries(pages)) {
	test(`${name} looks unchanged`, async ({ page }) => {
		await page.goto(path);
		await page.waitForLoadState('networkidle');
		if (name === 'publications') await expect(page.locator('.publication-item').first()).toBeVisible();
		await page.evaluate(() => document.fonts.ready);
		await page.waitForFunction(() => [...document.images].every((image) => image.complete));
		await page.waitForTimeout(700); // let Timeline's max-height transition settle

		await expect(page).toHaveScreenshot(`${name}.png`, {
			fullPage: true,
			animations: 'disabled',
			// The skill carousel shuffles on every load; its icons are checked in site.spec.js.
			mask: [page.locator('.skill-carousel')],
		});
	});
}
