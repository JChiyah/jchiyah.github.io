// A FontAwesome icon that no longer exists does not throw: the import or lookup
// returns undefined and <FontAwesomeIcon> renders nothing. These tests make a
// FontAwesome upgrade that drops or renames an icon fail loudly instead.
import { readFileSync, readdirSync } from 'node:fs';
import { describe, expect, test } from 'vitest';
import * as Solid from '@fortawesome/free-solid-svg-icons';
import * as Regular from '@fortawesome/free-regular-svg-icons';
import * as Brands from '@fortawesome/free-brands-svg-icons';
import timelineIcons from './timelineIcons';

const packages = {
	'@fortawesome/free-solid-svg-icons': Solid,
	'@fortawesome/free-regular-svg-icons': Regular,
	'@fortawesome/free-brands-svg-icons': Brands,
};
const isIcon = (value) => Boolean(value?.iconName && Array.isArray(value.icon));

const srcDir = new URL('./', import.meta.url);
const sourceFiles = readdirSync(srcDir, { recursive: true })
	.filter((file) => /\.jsx?$/.test(file) && !/\.test\.jsx?$/.test(file));

// Every `import { faX, faY } from '@fortawesome/free-*-svg-icons'` in the site.
const namedImports = sourceFiles.flatMap((file) => {
	const code = readFileSync(new URL(file, srcDir), 'utf8');
	return [...code.matchAll(/import\s*\{([^}]+)\}\s*from\s*['"](@fortawesome\/free-[a-z]+-svg-icons)['"]/g)]
		.flatMap(([, names, pkg]) => names.split(',')
			.map((name) => name.trim().split(/\s+as\s+/)[0])
			.filter((name) => name.startsWith('fa'))
			.map((name) => ({ file, pkg, name })));
});

describe('icons imported in source', () => {
	test('the scan finds the imports', () => {
		expect(namedImports.length).toBeGreaterThan(40);
	});

	test.each(namedImports.map(({ file, pkg, name }) => [`${name} (${file})`, pkg, name]))('%s exists', (_, pkg, name) => {
		expect(isIcon(packages[pkg][name])).toBe(true);
	});

	// Importing a whole icon set (`fas`, `import * as`) bundles ~2,000 icons.
	test('no file imports a whole icon set', () => {
		const wholeSets = sourceFiles.filter((file) => {
			const code = readFileSync(new URL(file, srcDir), 'utf8');
			return /import\s*\*\s*as\s+\w+\s+from\s*['"]@fortawesome\/free-/.test(code)
				|| /\b(fas|far|fab)\b[^;]*from\s*['"]@fortawesome\/free-/.test(code);
		});
		expect(wholeSets, 'import individual icons instead (see src/timelineIcons.js)').toEqual([]);
	});
});

// activities.json names icons as strings, and Timeline.jsx resolves them through
// src/timelineIcons.js. Only icons listed there are bundled.
describe('icons named in activities.json', () => {
	const sections = JSON.parse(readFileSync(new URL('../public/activities.json', import.meta.url), 'utf8'));
	const items = sections.flatMap((section) => section.list.map((item) => [`${section.id}: ${item.title}`, item.icon]));

	test.each(items)('%s has an icon listed in src/timelineIcons.js', (_, icon) => {
		expect(icon).toEqual(expect.any(String));
		expect(isIcon(timelineIcons[icon]), `add ${icon} to src/timelineIcons.js`).toBe(true);
	});

	test('src/timelineIcons.js lists no icons that activities.json does not use', () => {
		const used = new Set(items.map(([, icon]) => icon));
		const unused = Object.keys(timelineIcons).filter((name) => !used.has(name));
		expect(unused, 'remove these from src/timelineIcons.js; they are bundled for nothing').toEqual([]);
	});
});

// FontAwesome 7 forces every icon to `width: var(--fa-width, 1.25em)`, which
// widened the navbar and button rows. App.scss sets --fa-width: auto to restore
// FontAwesome 6's natural widths; that only works while FontAwesome uses the variable.
describe('icon width override', () => {
	test('FontAwesome still sizes icons through --fa-width', () => {
		const css = readFileSync(new URL('../node_modules/@fortawesome/fontawesome-svg-core/styles.css', import.meta.url), 'utf8');
		const rule = css.match(/\.svg-inline--fa\s*\{([^}]*)\}/)[1];
		expect(rule).toMatch(/width:\s*var\(--fa-width/);
	});

	test('App.scss sets --fa-width: auto', () => {
		const scss = readFileSync(new URL('./App.scss', import.meta.url), 'utf8');
		expect(scss).toMatch(/--fa-width:\s*auto/);
	});
});
