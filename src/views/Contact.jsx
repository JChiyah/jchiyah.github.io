import React, { Component } from 'react';
import './../App.scss';

import NavigationBar from './../components/NavigationBar';


class Contact extends Component {
	render() {
		return (
			<div className="App">
				<NavigationBar currentPage='Contact' />

				<div className="app-body">
					<h1>Professional Activities</h1>
					<h2>Work in progress, sorry!</h2>
					<p>Contact me at <strong><tt>jchiyah@outlook.com</tt></strong></p>
					<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
				</div>
			</div>
		);
	}
}

export default Contact;
