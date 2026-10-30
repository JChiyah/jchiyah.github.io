// Shape checks for the content files in public/. The pages read these fields
// directly, so a typo or a missing field shows up as a blank or broken entry.
import { readFileSync } from 'node:fs';
import { describe, expect, test } from 'vitest';

const load = (file) => JSON.parse(readFileSync(new URL(`../public/${file}`, import.meta.url), 'utf8'));

describe('activities.json', () => {
	const sections = load('activities.json');

	test('section ids are unique (they are the sidebar anchors)', () => {
		const ids = sections.map((section) => section.id);
		expect(new Set(ids).size).toBe(ids.length);
	});

	test.each(sections.map((section) => [section.id, section]))('section %s has a title and a list', (_, section) => {
		expect(section.title).toBeTruthy();
		expect(Array.isArray(section.list)).toBe(true);
	});

	const items = sections.flatMap((section) => section.list.map((item) => [`${section.id}: ${item.title}`, item]));
	test.each(items)('%s has a title, date and description', (_, item) => {
		expect(item.title).toBeTruthy();
		expect(item.date).toBeTruthy();
		expect(item.description).toEqual(expect.any(String));
		if (item.description_items) expect(Array.isArray(item.description_items)).toBe(true);
		if (item.image) expect(readFileSync(new URL(`../public/${item.image.replace(/^\//, '')}`, import.meta.url))).toBeTruthy();
		// Timeline reads image_alt: any other spelling renders the alt text as "undefined"
		if (item.image) expect(item.image_alt).toBeTruthy();
	});
});

describe('projects.json', () => {
	const projects = load('projects.json');

	test('project ids are unique', () => {
		const ids = projects.map((project) => project.id);
		expect(new Set(ids).size).toBe(ids.length);
	});

	test.each(projects.map((project) => [project.id, project]))('%s has the fields ProjectItem reads', (_, project) => {
		expect(project.title).toBeTruthy();
		expect(project.description).toBeTruthy();
		// ProjectItem calls .join() on these without a guard.
		expect(Array.isArray(project.topics)).toBe(true);
		expect(Array.isArray(project.skills)).toBe(true);
		// An empty url is allowed: it hides the "Visit Project" button.
		expect(project.url).toMatch(/^$|^https?:\/\/|^\//);
	});
});
