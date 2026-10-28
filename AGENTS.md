# jchiyah.github.io

Personal academic website. Static single-page app, no backend.

## Stack

**Vite** — *not* Next.js, and no longer Create React App. React 19, `react-router` v7, Bootstrap 5 + `react-bootstrap`, SCSS via Dart Sass (`sass`), `citation-js` for publications.

Requires **Node >=22.12** (`engines` in package.json); developed on **Node 26 LTS** with npm 11. Config is in `vite.config.js`.

Use npm 11+. npm 10.8.x crashes (`edgesOut`, in peer resolution) when *adding* Vite 8 packages.

## Commands

```shell
npm start       # Vite dev server on :3000
npm run build   # production build to build/
npm run preview # serve the production build locally
npm run deploy  # gh-pages: pushes build/ to the master branch

npm test                    # unit tests (Vitest), ~1s
npm run test:e2e            # build, then browser tests (Playwright), ~10s
npm run test:visual:update  # build, then re-record the visual baselines
```

Source lives on `master-source`; `npm run deploy` publishes the built output to `master`. Don't commit to `master` by hand.

## Content lives in `public/`, not in JSX

The views `fetch()` these at runtime, so adding content means editing data files:

| File | Feeds | Via |
|---|---|---|
| `publications.bib` | `/publications` | `src/references.js` → citation-js |
| `projects.json` | `/projects` | `src/views/Projects.jsx` |
| `activities.json` | `/experience` | `src/views/Activities.jsx` |
| `papers/`, `*.pdf` | direct links | — |

`association-for-computational-linguistics.csl` is the citation style, fetched and registered at runtime.

## Routing

Every route is declared in one place: the `createBrowserRouter` call in `src/index.jsx`. That includes `ExternalRedirect` entries that bounce `/cv`, `/phd`, `/thesis` to PDFs in `public/`.

GitHub Pages has no server-side rewrite, so deep links work through the `spa-github-pages` redirect hack in `public/404.html` (paired with the decoder script in the root `index.html`). New routes need no extra config, but don't remove that script.

## Styling

- `src/App.scss` — the global stylesheet, imported once in `src/index.jsx`. Most styles go here.
- `src/_Variables.scss` — theme colour maps and the `getColour()` helper. Change `$_theme` to switch palette.
- Component-scoped SCSS exists only for `Timeline` and `VerticalNav`.
- Every stylesheet imports `_Variables.scss`, which imports *all* of Bootstrap, so Bootstrap's CSS is emitted three times. Harmless to rendering today, but it inflates the CSS.

**Do not edit `src/App.css`, `src/App.css.map`, or `src/index.css`.** They are stale committed artifacts that nothing imports; SCSS is compiled at build time.

## Conventions

- **Tabs** for indentation.
- Mixed class and function components. Function components with hooks for anything new.
- `New*`-prefixed files (`NewHome`, `NewNavBar`, `NewModal`) are the current generation; their predecessors are still in the tree but commented out of `src/index.jsx`. Prefer the `New*` ones.
- Pages wrap content in `src/views/PageLayout.jsx`, which handles the Bootstrap grid and the optional right-hand `VerticalNav`.
- **Icons are imported one by one**, never as whole sets (`fas`, `import * as`): a whole set adds ~2,000 icons to the bundle, and a test fails if one appears. Icons named in `activities.json` (`"icon": "faRobot"`) must be listed in `src/timelineIcons.js`; the icon tests name any that are missing.

## Testing

Run `npm test` and `npm run test:e2e` before handing over any change.

| Layer | Files | Catches |
|---|---|---|
| Unit | `src/references.test.js` | Any change to citation output: golden snapshots of every entry in every Cite-modal style, shown and copied. Also the ACL style really being applied (citation-js 0.7 silently falls back to APA) and BibTeX copy matching what is shown. |
| Unit | `src/icons.test.js` | FontAwesome icons that no longer exist (they render as nothing, without an error), in imports and in `activities.json`; the `--fa-width` override losing its effect. |
| Unit | `src/content.test.js` | Missing or malformed fields in `activities.json` / `projects.json`. |
| Browser | `tests/e2e/site.spec.js` | Routing through the GitHub Pages 404 flow, PDF redirects, Cite modal, clipboard, `?link=` shortlinks, Experience truncation, icons rendering. Fails on any page error. |
| Browser | `tests/e2e/visual.spec.js` | Any pixel change on the four pages, desktop and mobile. |

- **Citation snapshots** (`src/__snapshots__/`) are committed. When a change *should* alter citations, check the diff, then accept it with `npx vitest run -u`.
- **Visual baselines** (`.screenshots/visual/`) are local and gitignored (~5 MB). Record them on a commit you trust (`npm run test:visual:update`) *before* a change that could affect layout, then run `npm run test:e2e` after.
- `tests/e2e/github-pages-server.js` serves `build/` like GitHub Pages: unknown paths return HTTP 404 with `404.html`, with no single-page-app fallback. `vite preview` would hide breakage in the deep-link redirect.
- One expected failure is marked `test.fail()`: the `sigdial2023` poster shortlink, which points at a citation key that is not in `publications.bib`. It is a known issue, left as-is on purpose.

## Known warts

- SCSS still uses `@import` and global colour functions (`darken`, `map-get`), as does Bootstrap 5.3. Dart Sass 1.x supports them; the deprecation warnings are silenced in `vite.config.js`. Dart Sass 3.0 will remove `@import`, so moving to `@use` is the eventual fix.
- Nothing runs ESLint any more (CRA did it during build).
- The JS bundle is ~360 kB gzipped; the largest parts are citeproc (citation formatting, only needed on `/publications`) and React. Everything is one chunk, so the home page downloads citation code it doesn't use.
