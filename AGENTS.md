# jchiyah.github.io

Personal academic website. Static single-page app, no backend.

## Stack

**Create React App** (`react-scripts` 5) — *not* Next.js. React 19, `react-router` v7, Bootstrap 5 + `react-bootstrap`, SCSS via `node-sass`, `citation-js` for publications.

Requires **Node 20**. `node-sass@9` has no prebuilt binary for Node 22+.

## Commands

```shell
npm start     # dev server on :3000
npm run build # production build to build/
npm run deploy # gh-pages: pushes build/ to the master branch
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

Every route is declared in one place: the `createBrowserRouter` call in `src/index.js`. That includes `ExternalRedirect` entries that bounce `/cv`, `/phd`, `/thesis` to PDFs in `public/`.

GitHub Pages has no server-side rewrite, so deep links work through the `spa-github-pages` redirect hack in `public/404.html` (paired with the decoder in `public/index.html`). New routes need no extra config, but don't remove that script.

## Styling

- `src/App.scss` — the global stylesheet, imported once in `src/index.js`. Most styles go here.
- `src/_Variables.scss` — theme colour maps and the `getColour()` helper. Change `$_theme` to switch palette.
- Component-scoped SCSS exists only for `Timeline` and `VerticalNav`.

**Do not edit `src/App.css`, `src/App.css.map`, or `src/index.css`.** They are stale committed artifacts that nothing imports; SCSS is compiled at build time.

## Conventions

- **Tabs** for indentation.
- Mixed class and function components. Function components with hooks for anything new.
- `New*`-prefixed files (`NewHome`, `NewNavBar`, `NewModal`) are the current generation; their predecessors are still in the tree but commented out of `src/index.js`. Prefer the `New*` ones.
- Pages wrap content in `src/views/PageLayout.jsx`, which handles the Bootstrap grid and the optional right-hand `VerticalNav`.

## Known warts

- The `start` script uses Windows syntax (`set NODE_OPTIONS=...`), which is a silent no-op on macOS/Linux. Harmless — CRA 5 on Node 20 doesn't need the flag.
- `react-scripts` pulls a second, older `node-sass@7` transitively. Both copies are deprecated; migrating to `sass` is the real fix.
- A few unused-variable lint warnings are pre-existing.
