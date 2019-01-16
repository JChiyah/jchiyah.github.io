import React from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import App from './App';
import TwoApp from './TwoApp';
import ThreeApp from './ThreeApp';
// import Contact from './contact';

export default (
	<Router path='/'>
		<Route path="/" exact component={TwoApp} />
		<Route path='contact' component={ThreeApp} />
		// <Route path='*'       component={TwoApp} />
	</Router>
);
