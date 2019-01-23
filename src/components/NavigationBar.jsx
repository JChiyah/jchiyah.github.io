import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faTimes } from '@fortawesome/free-solid-svg-icons';


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
	constructor(props) {
		super(props);

		this.state = {
			isDrawerOpen: false,
		}

		this.menuButtonRef = React.createRef();
	}

	toggleDrawer() {
		this.setState({isDrawerOpen: !this.state.isDrawerOpen});
	}

	// this is just to trigger a rendering on window resize
	updateDrawer() {
		this.setState({isDrawerOpen: this.state.isDrawerOpen});
	}

	showMenu() {
		let width = window.innerWidth;
		if (width <= 500) {
			return this.state.isDrawerOpen;
		}

		return true;
	}

	// add an event listener so the component is re-rendered on window resize
	componentDidMount() {
		this.updateDrawer();
		window.addEventListener("resize", this.updateDrawer.bind(this));
	}

	componentWillUnmount() {
		window.removeEventListener("resize", this.updateDrawer.bind(this));
	}

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
				<div 
					id="responsive-title" 
					className="navbar-elem"
					style={this.state.isDrawerOpen ? {display: 'none'} : {}}
				>
					<a href={"/" + (this.props.currentPage).toLowerCase().replace(" ", "-")} className="active">{this.props.currentPage}</a>
				</div>

				<ul style={{display: (this.showMenu() ? 'block' : 'none')}}>
					{this.renderElement('Home')}
					{this.renderElement('About')}
					{this.renderElement('Projects')}
					{this.renderElement('Publications')}
					{this.renderElement('Professional Activities')}
					{this.renderElement('Contact')}
				</ul>

				<div 
					id="responsive-menu-button" 
					onClick={() => this.toggleDrawer()} 
					ref={this.menuButtonRef}
				>
					<FontAwesomeIcon className="fa-icon" icon={this.state.isDrawerOpen ? faTimes : faBars} />
				</div>
			</nav>
		);
	}
}


export default NavigationBar;
