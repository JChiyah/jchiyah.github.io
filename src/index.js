import React from 'react';
// import ReactDOM from 'react-dom';
import * as serviceWorker from './serviceWorker';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from "react-router-dom";

// import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';

import Home from './views/Home';
import About from './views/About';
import Projects from './views/Projects';
import Publications from './views/Publications';
import Activities from './views/Activities';
import Contact from './views/Contact';
import PageNotFound from './views/PageNotFound';

import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';

library.add(fas);

// Define routes using the new createBrowserRouter
const router = createBrowserRouter([
	{
		path: "/",
		element: <Home />,
	},
	{
		path: "/home",
		element: <Home />,
	},
	{
		path: "/about",
		element: <About />,
	},
	{
		path: "/projects",
		element: <Projects />,
	},
	{
		path: "/publications",
		element: <Publications />,
	},
	{
		path: "/professional-activities",
		element: <Activities />,
	},
	{
		path: "/contact",
		element: <Contact />,
	},
	{
		path: "*",
		element: <PageNotFound />,
	},
]);

// Create root and render
const root = createRoot(document.getElementById('root'));
root.render(
	<React.StrictMode>
		<RouterProvider router={router} />
	</React.StrictMode>
);

// ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
