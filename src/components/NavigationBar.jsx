import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faTimes, faHouse, faUser, faCubes, faBriefcase, faFileLines, faEnvelope } from '@fortawesome/free-solid-svg-icons';
// import { faHouse as faHouseRegular, faUser as faUserRegular, faCubes as faCubesRegular, faBriefcase as faBriefcaseRegular, faFile as faFileRegular, faEnvelope as faEnvelopeRegular } from '@fortawesome/free-regular-svg-icons';


class NavigationElement extends Component {
	constructor(props) {
		super(props);
		this.state = {
			isHovered: false,
		};
	}

	handleMouseEnter = () => {
		this.setState({ isHovered: true });
	};

	handleMouseLeave = () => {
		this.setState({ isHovered: false });
	};

	render() {
		const { isActive, icon, text } = this.props;
		const { isHovered } = this.state;
		const activeClass = isActive ? 'active' : '';

		const url = "/" + (this.props.text).toLowerCase().replace(" ", "-");

		return (
			<li className="navbar-elem">
				{/* <a href={url} className={activeClass} onMouseEnter={this.handleMouseEnter} onMouseLeave={this.handleMouseLeave}>
					<FontAwesomeIcon
						icon={icon} bounce={isHovered}
						style={{ marginRight: '5px', fontSize: '0.8em' }} />{text}
				</a> */}
				<Link to={url} className={activeClass} onMouseEnter={this.handleMouseEnter} onMouseLeave={this.handleMouseLeave}>
					<FontAwesomeIcon
						icon={icon} bounce={isHovered}
						style={{ marginRight: '5px', fontSize: '0.8em' }} />{text}
				</Link>
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
		this.setState({ isDrawerOpen: !this.state.isDrawerOpen });
	}

	// this is just to trigger a rendering on window resize
	updateDrawer() {
		this.setState({ isDrawerOpen: this.state.isDrawerOpen });
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

	renderElement(title, icon) {
		return (
			<NavigationElement
				text={title}
				icon={icon}
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
					style={this.state.isDrawerOpen ? { display: 'none' } : {}}
				>
					{/* <a href={"/" + (this.props.currentPage).toLowerCase().replace(" ", "-")} className="active">{this.props.currentPage}</a> */}
					<Link to={"/" + (this.props.currentPage).toLowerCase().replace(" ", "-")} className="active">{this.props.currentPage}</Link>
				</div>

				<ul style={{ display: (this.showMenu() ? 'block' : 'none') }}>
					{this.renderElement('Home', faHouse)}
					{this.renderElement('About', faUser)}
					{this.renderElement('Projects', faCubes)}
					{this.renderElement('Publications', faFileLines)}
					{this.renderElement('Professional Activities', faBriefcase)}
					{this.renderElement('Contact', faEnvelope)}
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
