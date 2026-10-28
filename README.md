# jchiyah.github.io

My personal website!

__2026-10-28__
- System: macOS (Darwin 27)
- Node version: 24.22.1 (Homebrew `node@24`). Node 20 is end-of-life since April 2026.
- NPM version: 11.19.1
- Added unit tests (Vitest) and browser tests (Playwright). See "Available Scripts" below.

__2026-10-27__
- System: macOS (Darwin 27)
- Node version: 20.20.2 (Homebrew `node@20`)
- NPM version: 10.8.2
- Migrated from Create React App to Vite 8 and Dart Sass. The Node 20 pin from `node-sass` is gone; Vite 8 needs Node ^20.19 or >=22.12.
- Warning: npm 10.8.x crashes (`edgesOut`) when *adding* Vite 8 packages. `npm install` from the lockfile is fine; to add dev dependencies use `npx npm@11 install -D <pkg>`.

__2025-02-17__
- System: Windows 11
- Node version: 20.11.0
- NPM version: 10.9.0
- Python 3.13.7
- Warning: it was tricky to make it work, had to use Chocolatey + nvm + installing VS to make it work in this particular version in Windows. Anything above NodeJS 20 did not work.


__2025-02-17__
- System: MacOS 15.3
- Node version: 20.11.0
- NPM version: 10.9.0


__2023-03-29__
- System: Windows 11
- Node version: 17.7.1
- NPM version: 8.5.5
- Warning: getting some errors when trying to update packages. Fixed now.


__2022-03-18__
- System: Ubuntu 20.04 WSL2 and Windows 11
- Node version: 17.7.1
- NPM version: 8.5.5


## Installation

```shell script
# Install NPM if first time
npm install

# Update packages if needed, see below for major changes
npm update
```

## Run

```shell script
npm start
```

## Deploy

```shell script
npm run build

npm run deploy
```


## Update

Check: https://flaviocopes.com/update-npm-dependencies/

To update to a new major version all the packages, install the npm-check-updates package globally:

`npm install -g npm-check-updates`

then run it:

`ncu -u`

this will upgrade all the version hints in the package.json file, to dependencies and devDependencies, so npm can install the new major version.

You are now ready to run the update:

`npm update`

If you just downloaded the project without the node_modules dependencies and you want to install the shiny new versions first, just run

`npm install`



## Favicon

See this: 

- https://favicomatic.com/ generate favicon from image
- https://github.com/audreyfeldroy/favicon-cheat-sheet extra info


---------------------------

## Available Scripts

Built with [Vite](https://vite.dev/). Configuration is in `vite.config.js`.

- `npm start` runs the dev server at [http://localhost:3000](http://localhost:3000) with hot reload.
- `npm run build` writes the production build to `build/`.
- `npm run preview` serves that production build locally, to check it before deploying.
- `npm run deploy` builds and publishes `build/` to the `master` branch with `gh-pages`.
- `npm test` runs the unit tests: citations, icons and content files.
- `npm run test:e2e` builds the site and runs the browser tests against it, served the way GitHub Pages serves it.
- `npm run test:visual:update` records new screenshot baselines. Do this on a version you trust, before making changes.

The first time on a new machine, install the browser with `npx playwright install chromium`.
