// @vitest-environment jsdom
//
// Pins down everything the publications page gets from citation-js, so that a
// citation-js upgrade shows exactly which citations changed instead of breaking
// the page quietly. If an upgrade changes output on purpose, review the diff and
// run `npx vitest run -u` to accept it.
import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { describe, expect, test } from 'vitest';
import { plugins } from '@citation-js/core';
import Reference, { parseBibtexFile } from './references';

// The ACL style is fetched and registered asynchronously when references.js loads.
async function aclStyleRegistered() {
	const styles = plugins.config.get('@csl').styles;
	for (let i = 0; i < 100 && !styles.has('acl'); i++) {
		await new Promise((resolve) => setTimeout(resolve, 20));
	}
	return styles.has('acl');
}
const aclReady = await aclStyleRegistered();
const references = await parseBibtexFile('/publications.bib');

// The citation formats the Cite modal offers, read from the page itself so this
// test follows any change to that list. Commented-out styles are ignored.
const citationStyles = readFileSync(join(process.cwd(), 'src/views/Publications.jsx'), 'utf8')
	.split('\n')
	.filter((line) => !line.trim().startsWith('//'))
	.join('\n')
	.matchAll(/name: '([^']+)', func: '(\w+)'/g)
	.toArray()
	.map(([, name, func]) => ({ name, func }));

const byKey = (key) => references.find((ref) => ref.getCitationKey() === key);
const htmlToText = (html) => html
	.replace(/<br\s*\/?>/g, '\n')
	.replace(/<[^>]+>/g, '')
	.replace(/&nbsp;/g, ' ');
const squash = (text) => text.replace(/\s+/g, ' ').trim();

describe('publications.bib', () => {
	test('parses every entry', () => {
		const declared = readFileSync(join(process.cwd(), 'public/publications.bib'), 'utf8')
			.match(/^@\w+\{/gm).length;
		expect(references).toHaveLength(declared);
	});

	test('citation keys are unique', () => {
		const keys = references.map((ref) => ref.getCitationKey());
		expect(new Set(keys).size).toBe(keys.length);
	});

	// PublicationItem and getACLBibkey() read these unguarded, so a missing one
	// crashes the whole publications page rather than one entry.
	test.each(references.map((ref) => [ref.getCitationKey(), ref]))('%s has the fields the page needs', (_, ref) => {
		expect(ref.getTitle()).toBeTruthy();
		expect(ref.getAuthors()).toBeTruthy();
		expect(Number.isInteger(ref.getYear())).toBe(true);
		expect(ref.getURL()).toEqual(expect.any(String));
	});
});

describe('citation styles', () => {
	test('the Cite modal still offers the expected styles', () => {
		expect(citationStyles.map((style) => style.func)).toEqual([
			'getACLCitation',
			'getHarvardCitation',
			'getMarkdownCitation',
			'getACLBibkey',
			'getBibtexCitation',
		]);
	});

	test('the custom ACL style is registered', () => {
		expect(aclReady).toBe(true);
	});

	// citation-js 0.7 silently fell back to APA for unknown style names, so a
	// broken ACL registration looked like working output. 0.8+ throws instead;
	// this still guards against a downgrade or a regression.
	test('ACL output really uses the ACL style, not a fallback', () => {
		const ref = byKey('chiyah-garcia-etal-2024-repairs');
		expect(ref.getACLCitation('text')).not.toBe(ref.getAPACitation('text'));
	});

	// citation-js 0.8+ throws on unknown style names, so if a future release stops
	// bundling `harvard1`, this names the cause before every Harvard snapshot fails.
	test('Harvard style is available', () => {
		expect(plugins.config.get('@csl').styles.has('harvard1')).toBe(true);
	});

	test('ACL Bibkey appears only for ACL Anthology papers', () => {
		expect(byKey('chiyah-garcia-etal-2024-repairs').getACLBibkey('text')).toBe('chiyah-garcia-etal-2024-repairs');
		expect(byKey('chiyah-garcia-2025-thesis').getACLBibkey('text')).toBeFalsy();
	});
});

describe('BibTeX copy', () => {
	test.each(references.map((ref) => [ref.getCitationKey(), ref]))('%s: copied text has no abstract and matches what is shown', (_, ref) => {
		const copied = ref.getBibtexCitation('text');
		expect(copied).not.toMatch(/\babstract\s*=/i);
		expect(squash(copied)).toBe(squash(htmlToText(ref.getBibtexCitation('html'))));
	});

	test('stripping an abstract leaves valid BibTeX in every position', () => {
		const strip = (bibtex) => Reference.prototype.getBibtexString.call({ data: { _graph: [{ data: bibtex }] } });
		expect(strip('@misc{a,\n    title = "T",\n    abstract = "Long."\n}')).toBe('@misc{a,\n    title = "T"\n}');
		expect(strip('@misc{a,\n    abstract = {Long.},\n    title = "T"\n}')).toBe('@misc{a,\n    title = "T"\n}');
	});
});

// Golden output: every entry, in every style the modal offers, both as shown
// (html) and as copied (text). Changes here are what visitors would see.
describe('golden citations', () => {
	test.each(references.map((ref) => [ref.getCitationKey(), ref]))('%s', (_, ref) => {
		const output = {
			title: ref.getTitle(),
			authors: ref.getAuthors(),
			year: ref.getYear(),
			venue: ref.getJournal(),
			series: ref.getShortJournal({ year: true }),
			address: ref.getAddress(),
			doi: ref.getDOI(),
			url: ref.getURL(),
		};
		for (const { name, func } of citationStyles) {
			output[name] = { shown: ref[func]('html') ?? null, copied: ref[func]('text') ?? null };
		}
		expect(output).toMatchSnapshot();
	});
});
