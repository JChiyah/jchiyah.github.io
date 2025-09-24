# jchiyah.github.io

My personal website!

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

If you are having issues with npm start due to "envelope routines::unsupported" then check https://stackoverflow.com/questions/69692842/error-message-error0308010cdigital-envelope-routinesunsupported


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

Everything below this line was automatically written from the React README.

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br>
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br>
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run deploy`

Deploy to GitHub pages, run after build.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (Webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: https://facebook.github.io/create-react-app/docs/code-splitting

### Analyzing the Bundle Size

This section has moved here: https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size

### Making a Progressive Web App

This section has moved here: https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app

### Advanced Configuration

This section has moved here: https://facebook.github.io/create-react-app/docs/advanced-configuration

### Deployment

This section has moved here: https://facebook.github.io/create-react-app/docs/deployment

### `npm run deploy`

### `npm run build` fails to minify

This section has moved here: https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify
