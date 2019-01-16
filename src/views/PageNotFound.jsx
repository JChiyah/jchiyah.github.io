import React, { Component } from 'react';
import './../App.scss';

import NavigationBar from './../components/NavigationBar';


class PageNotFound extends Component {

	render() {
		return (
			<div className="App">
				<h1>404 Error</h1>

				<h2>It seems that this page does not exists</h2>
			</div>
		);
	}
}

export default PageNotFound;
