import React, { Component } from 'react';


class NavigationElement extends Component {
	render() {
		return (
			<li className="navbar-elem">
				<a href="#">
					{this.props.text}
				</a>
			</li>
		);
	}
}


class NavigationBar extends Component {
	renderElement(title) {
		return (
			<NavigationElement
				text={title}
		 	/>
		 );
	}

	render() {
		return (
			<nav className="navbar">
				<ul>
					{this.renderElement('Home')}
					{this.renderElement('About')}
					{this.renderElement('Projects')}
					{this.renderElement('Publications')}
					{this.renderElement('Professional Activity')}
					{this.renderElement('Contact')}
				</ul>
			</nav>
		);
	}
}


export default NavigationBar;
