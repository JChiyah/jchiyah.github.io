# jchiyah.github.io

Personal academic website. Static single-page app, no backend.

## Stack

**Vite** — *not* Next.js, and no longer Create React App. React 19, `react-router` v7, Bootstrap 5 + `react-bootstrap`, SCSS via Dart Sass (`sass`), `citation-js` for publications.

Requires **Node `^20.19` or `>=22.12`** (Vite 8's engine range). Config is in `vite.config.js`.

npm 10.8.x cannot *add* Vite 8 packages (an arborist `edgesOut` crash in peer resolution); `npm install`/`npm ci` from the existing lockfile works fine. To add or upgrade a dev dependency, use `npx npm@11 install -D <pkg>` or upgrade npm.

## Commands

```shell
npm start       # Vite dev server on :3000
npm run build   # production build to build/
npm run preview # serve the production build locally
npm run deploy  # gh-pages: pushes build/ to the master branch
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

## Known warts

- SCSS still uses `@import` and global colour functions (`darken`, `map-get`), as does Bootstrap 5.3. Dart Sass 1.x supports them; the deprecation warnings are silenced in `vite.config.js`. Dart Sass 3.0 will remove `@import`, so moving to `@use` is the eventual fix.
- Nothing runs ESLint any more (CRA did it during build). There is no test runner: `src/referenceUtils.test.js` only tests `referenceUtils.js`, which nothing imports.
- The JS bundle is ~1.5 MB gzipped, mostly the full FontAwesome solid and brand sets (`library.add(fas)` in `src/index.jsx`, `import * as Icons` in `Timeline.jsx`).
