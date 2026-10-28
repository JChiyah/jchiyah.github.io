// Serves build/ the way GitHub Pages does: files are served as-is, and any
// other path gets HTTP 404 with the body of 404.html. That is what makes the
// site's deep links work in production (404.html redirects back into the app),
// so the browser tests exercise the same path real visitors take.
// Unlike `vite preview`, there is deliberately no single-page-app fallback.
import { createServer } from 'node:http';
import { readFile, stat } from 'node:fs/promises';
import { extname, join, normalize, resolve } from 'node:path';

const root = resolve('build');
const port = Number(process.env.PORT ?? 4180);

const types = {
	'.html': 'text/html; charset=utf-8',
	'.js': 'text/javascript',
	'.css': 'text/css',
	'.json': 'application/json',
	'.bib': 'text/plain; charset=utf-8',
	'.csl': 'application/xml',
	'.ico': 'image/x-icon',
	'.png': 'image/png',
	'.jpg': 'image/jpeg',
	'.jpeg': 'image/jpeg',
	'.webp': 'image/webp',
	'.svg': 'image/svg+xml',
	'.pdf': 'application/pdf',
};

async function resolveFile(urlPath) {
	const path = normalize(join(root, decodeURIComponent(urlPath)));
	if (!path.startsWith(root)) return null;
	try {
		const info = await stat(path);
		if (info.isFile()) return path;
		if (info.isDirectory()) {
			const index = join(path, 'index.html');
			if ((await stat(index)).isFile()) return index;
		}
	} catch {
		// fall through to the 404 page
	}
	return null;
}

createServer(async (req, res) => {
	const file = await resolveFile(new URL(req.url, 'http://localhost').pathname);
	if (file) {
		res.writeHead(200, { 'Content-Type': types[extname(file)] ?? 'application/octet-stream' });
		res.end(await readFile(file));
	} else {
		res.writeHead(404, { 'Content-Type': types['.html'] });
		res.end(await readFile(join(root, '404.html')));
	}
}).listen(port, () => console.log(`GitHub Pages-style server on http://localhost:${port}`));
