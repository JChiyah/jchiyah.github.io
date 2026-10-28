// A FontAwesome icon that no longer exists does not throw: the import or lookup
// returns undefined and <FontAwesomeIcon> renders nothing. These tests make a
// FontAwesome upgrade that drops or renames an icon fail loudly instead.
import { readFileSync, readdirSync } from 'node:fs';
import { describe, expect, test } from 'vitest';
import * as Solid from '@fortawesome/free-solid-svg-icons';
import * as Regular from '@fortawesome/free-regular-svg-icons';
import * as Brands from '@fortawesome/free-brands-svg-icons';

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
		if (name === 'fas') {
			expect(Object.values(packages[pkg]).filter(isIcon).length).toBeGreaterThan(1000);
		} else {
			expect(isIcon(packages[pkg][name])).toBe(true);
		}
	});
});

// activities.json names icons as strings; Timeline.jsx resolves them with
// `Icons[icon] || BrandIcons[icon]`, so check them the same way.
describe('icons named in activities.json', () => {
	const sections = JSON.parse(readFileSync(new URL('../public/activities.json', import.meta.url), 'utf8'));
	const items = sections.flatMap((section) => section.list.map((item) => [`${section.id}: ${item.title}`, item.icon]));

	test.each(items)('%s has an icon that resolves', (_, icon) => {
		expect(icon).toEqual(expect.any(String));
		expect(isIcon(Solid[icon] || Brands[icon])).toBe(true);
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
