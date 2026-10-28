// Serve the site's own public/ files to fetch(), the way the browser gets them
// from the web server. Tests then run against the real content, offline.
import { readFile } from 'node:fs/promises';
import { join } from 'node:path';

// Vitest runs from the project root.
const publicDir = join(process.cwd(), 'public/');

globalThis.fetch = async (input) => {
	const url = String(input);
	if (/^[a-z]+:\/\//i.test(url)) {
		throw new Error(`Tests must not hit the network: ${url}`);
	}
	try {
		const body = await readFile(publicDir + url.replace(/^\//, ''));
		return new Response(body);
	} catch {
		return new Response('Not found', { status: 404 });
	}
};
