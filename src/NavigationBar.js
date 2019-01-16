import React, { Component } from 'react';


class NavigationElement extends Component {
	render() {
		const isActive = this.props.isActive;
		const activeClass = isActive ? 'active' : '';

		const url = "/" + (this.props.text).toLowerCase().replace(" ", "-");

		return (
			<li className="navbar-elem">
				<a href={url} className={activeClass}>{this.props.text}</a>
			</li>
		);
	}
}


class NavigationBar extends Component {
	renderElement(title) {
		return (
			<NavigationElement
				text={title}
				isActive={this.props.currentPage === title}
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
