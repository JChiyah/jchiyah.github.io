import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import * as serviceWorker from './serviceWorker';

import { Switch, BrowserRouter as Router, Route, Link } from "react-router-dom";

import App from './App';
import TwoApp from './TwoApp';
import ThreeApp from './ThreeApp';
import PageNotFound from './PageNotFound';


ReactDOM.render(
	<Router>
		<Switch>
			<Route exact path="/" component={App}/>
			<Route path="/home" component={App}/>
			<Route path="/about" component={TwoApp}/>
			<Route path="/projects" component={ThreeApp}/>
			<Route component={PageNotFound} />
		</Switch>
	</Router>,
	document.getElementById('root'));

// ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
