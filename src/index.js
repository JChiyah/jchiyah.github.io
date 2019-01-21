import React from 'react';
import ReactDOM from 'react-dom';
import * as serviceWorker from './serviceWorker';

import './index.css';

import { Switch, BrowserRouter as Router, Route } from "react-router-dom";

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


ReactDOM.render(
	<Router>
		<Switch>
			<Route exact path="/" component={Home}/>
			<Route exact path="/home" component={Home}/>
			<Route exact path="/about" component={About}/>
			<Route exact path="/projects" component={Projects}/>
			<Route exact path="/publications" component={Publications}/>
			<Route exact path="/professional-activities" component={Activities}/>
			<Route exact path="/contact" component={Contact}/>
			<Route component={PageNotFound} />
		</Switch>
	</Router>,
	document.getElementById('root'));

// ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
