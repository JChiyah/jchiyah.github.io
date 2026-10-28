// Behaviour of the built site, served the way GitHub Pages serves it.
import { test as base, expect } from '@playwright/test';

const pages = ['/', '/projects', '/publications', '/experience'];

// Fail any test whose page throws, or logs an error other than the 404 that
// every deep link produces before 404.html redirects it into the app.
const test = base.extend({
	page: async ({ page }, use) => {
		const errors = [];
		page.on('pageerror', (error) => errors.push(error.message));
		page.on('console', (message) => {
			if (message.type() === 'error' && !message.text().includes('status of 404')) errors.push(message.text());
		});
		await use(page);
		expect(errors, 'errors logged by the page').toEqual([]);
	},
});

async function openPublications(page) {
	await page.goto('/publications');
	await expect(page.locator('.publication-item').first()).toBeVisible();
}

test.describe('pages and routing', () => {
	for (const path of pages) {
		test(`${path} renders`, async ({ page }) => {
			await page.goto(path);
			await expect(page.locator('.navbar')).toBeVisible();
			await expect(page.locator('.app-body').first()).toBeVisible();
		});
	}

	test('deep links work through 404.html, as on GitHub Pages', async ({ page }) => {
		const response = await page.goto('/experience');
		expect(response.status(), 'server answers deep links with 404, like GitHub Pages').toBe(404);
		await expect(page).toHaveURL(/\/experience$/);
		await expect(page.locator('.timeline-item').first()).toBeVisible();
	});

	test('unknown paths show the site\'s 404 page', async ({ page }) => {
		await page.goto('/this-page-does-not-exist');
		await expect(page.locator('body')).toContainText(/not found|404/i);
	});

	for (const [path, pdf] of [['/cv', 'JChiyahGarcia_CV.pdf'], ['/phd', 'Chiyah-Garcia_Thesis.pdf'], ['/thesis', 'Chiyah-Garcia_Thesis.pdf']]) {
		test(`${path} opens ${pdf}`, async ({ page }) => {
			const pdfRequest = page.waitForRequest((request) => request.url().endsWith(`/${pdf}`));
			// Chromium downloads the PDF instead of navigating, which aborts goto.
			await page.goto(path).catch(() => {});
			await pdfRequest;
		});
	}
});

test.describe('publications', () => {
	test('every entry in publications.bib is listed', async ({ page }) => {
		await openPublications(page);
		const response = await page.request.get('/publications.bib');
		const entries = (await response.text()).match(/^@\w+\{/gm).length;
		await expect(page.locator('.publication-item')).toHaveCount(entries);
	});

	test('Cite shows all five styles for an ACL paper', async ({ page }) => {
		await openPublications(page);
		await page.locator('#chiyah-garcia-etal-2024-repairs').getByRole('button', { name: 'Cite' }).click();
		const rows = page.locator('.modal-body .row');
		await expect(rows).toHaveCount(5);
		for (const row of await rows.all()) {
			await expect(row.locator('.citation-text')).not.toBeEmpty();
		}
	});

	test('Cite on the thesis omits ACL Bibkey and still works', async ({ page }) => {
		await openPublications(page);
		await page.locator('#chiyah-garcia-2025-thesis').getByRole('button', { name: 'Cite' }).click();
		await expect(page.locator('.modal-body .row')).toHaveCount(4);
	});

	test.describe('BibTeX copy buttons', () => {
		test.use({ permissions: ['clipboard-read', 'clipboard-write'] });
		const squash = (text) => text.replace(/\s+/g, ' ').trim();

		test('copy what is shown, without an abstract', async ({ page }) => {
			await openPublications(page);
			const entry = page.locator('#chiyah-garcia-etal-2024-repairs');

			await entry.getByRole('button', { name: 'Cite' }).click();
			const bibtexRow = page.locator('.modal-body .row').last();
			const shown = await bibtexRow.locator('.citation-text').innerText();
			await bibtexRow.getByRole('button').click();
			const fromModal = await page.evaluate(() => navigator.clipboard.readText());
			expect(fromModal).not.toMatch(/\babstract\s*=/i);
			expect(squash(fromModal)).toBe(squash(shown));
			await page.keyboard.press('Escape');

			await entry.getByRole('button', { name: 'BibTeX' }).click();
			expect(await page.evaluate(() => navigator.clipboard.readText())).toBe(fromModal);
		});
	});

	test.describe('?link= shortlinks', () => {
		test('redirect to the paper\'s own page', async ({ page }) => {
			const redirect = page.waitForRequest('https://aclanthology.org/2024.emnlp-main.643/');
			await page.route('https://aclanthology.org/**', (route) => route.fulfill({ body: 'stub' }));
			await page.goto('/publications?link=chiyah-garcia-etal-2024-repairs');
			await redirect;
		});

		// Known issue, deliberately left as-is: the SIGDIAL poster's shortlink maps
		// to a citation key that is not in publications.bib. Marked as an expected
		// failure, so the suite starts failing here once it is fixed.
		test('sigdial2023 (poster QR code) reaches the SIGDIAL 2023 paper', async ({ page }) => {
			test.fail();
			await page.route('https://aclanthology.org/**', (route) => route.fulfill({ body: 'stub' }));
			const redirect = page.waitForRequest(/aclanthology\.org\/2023\.sigdial/, { timeout: 5000 });
			await page.goto('/publications?link=sigdial2023');
			await redirect;
		});
	});
});

test.describe('experience', () => {
	// Timeline items measure themselves once, so an image that loads late used to
	// leave its item untruncated on a first visit but truncated on a return visit.
	test('items with photos are truncated however fast the photo loads', async ({ page }) => {
		const heightWith = async (delayImages) => {
			await page.unrouteAll();
			if (delayImages) {
				await page.route(/\.(jpe?g|png|webp)$/, async (route) => {
					await new Promise((resolve) => setTimeout(resolve, 2000));
					await route.continue();
				});
			}
			await page.goto('/experience');
			await page.waitForFunction(() => [...document.images].every((image) => image.complete));
			await page.waitForTimeout(700); // max-height transition
			const photoItems = page.locator('.timeline-description-wrapper', { has: page.locator('img') });
			await expect(photoItems.first()).toHaveClass(/\btruncated\b/);
			return page.evaluate(() => document.documentElement.scrollHeight);
		};
		expect(await heightWith(true)).toBe(await heightWith(false));
	});

	test('Show more and Show less toggle an item', async ({ page }) => {
		await page.goto('/experience');
		const item = page.locator('.timeline-description-wrapper.truncated').first();
		const height = () => item.evaluate((element) => element.getBoundingClientRect().height);
		const collapsed = await height();

		await item.getByRole('button', { name: 'Show more' }).click();
		await expect(item.getByRole('button', { name: 'Show less' })).toBeVisible();
		await expect.poll(height).toBeGreaterThan(collapsed * 1.5);

		await item.getByRole('button', { name: 'Show less' }).click();
		await expect.poll(height).toBeCloseTo(collapsed, 0);
	});
});

// A missing FontAwesome icon renders nothing rather than erroring.
test.describe('icons', () => {
	test('every navbar link has an icon', async ({ page }) => {
		await page.goto('/');
		const links = page.locator('.navbar .nav-link');
		await expect(links).not.toHaveCount(0);
		for (const link of await links.all()) {
			await expect(link.locator('svg.svg-inline--fa path')).not.toHaveCount(0);
		}
	});

	test('every skill box has an icon', async ({ page }) => {
		await page.goto('/');
		const boxes = page.locator('.skill-box');
		await expect(boxes.first()).toBeVisible();
		for (const box of await boxes.all()) {
			await expect(box.locator('svg.svg-inline--fa')).toHaveCount(1);
		}
	});

	test('every Experience item has an icon', async ({ page }) => {
		await page.goto('/experience');
		const items = page.locator('.timeline-item');
		await expect(items.first()).toBeVisible();
		for (const item of await items.all()) {
			await expect(item.locator('.timeline-icon svg.svg-inline--fa')).toHaveCount(1);
		}
	});

	test('the FontAwesome 7 width override is in the built CSS', async ({ page }) => {
		await page.goto('/');
		const width = await page.evaluate(() => getComputedStyle(document.documentElement).getPropertyValue('--fa-width').trim());
		expect(width).toBe('auto');
	});
});
