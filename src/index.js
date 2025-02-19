import React from 'react';
// import ReactDOM from 'react-dom';
import * as serviceWorker from './serviceWorker';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider, Outlet, useLocation } from "react-router-dom";
import NavigationBar from './components/NavigationBar';
import Footer from './components/Footer';

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

// Layout component that will persist across routes
const RootLayout = () => {
	const location = useLocation();

	// Map paths to page titles
	const pathToTitle = {
		'/': 'Home',
		'/home': 'Home',
		'/about': 'About',
		'/projects': 'Projects',
		'/publications': 'Publications',
		'/professional-activities': 'Professional Activities',
		'/contact': 'Contact'
	};

	const currentPage = pathToTitle[location.pathname] || 'Page Not Found';

	return (
		<>
			<NavigationBar currentPage={currentPage} />
			<Outlet />
			<Footer />
		</>
	);
};

// Define routes using createBrowserRouter with a parent layout
const router = createBrowserRouter([
	{
		path: "/",
		element: <RootLayout />,
		children: [
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
		],
	},
]);

// Create root and render
const root = createRoot(document.getElementById('root'));
root.render(
	// <React.StrictMode>
	<RouterProvider router={router} />
	// </React.StrictMode>
);

// ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
