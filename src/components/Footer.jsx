import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAtom } from '@fortawesome/free-solid-svg-icons';


class Footer extends Component {
	renderLink(title) {
		const url = "/" + (title).toLowerCase().replace(" ", "-");

		return (<li>
			<a href={url}>{title}</a></li>
		 );
	}

	render() {
		return (
			<footer className="footer">

				<div className="footer-text">
					<p>
						Website created by myself using <a href="https://reactjs.org/"><FontAwesomeIcon className="fa-icon" icon={faAtom} /> React</a>.
					</p>
					<p>
						This website does not use cookies or collect information on visitors. 
						However, it is hosted by GitHub and thus <a href="https://github.com/">GitHub</a> itself may do.
					</p>
				</div>

				<div className="quick-links">
					<ul>
						{this.renderLink('Home')}
						{this.renderLink('About')}
						{this.renderLink('Projects')}
						{this.renderLink('Publications')}
						{this.renderLink('Professional Activities')}
						{this.renderLink('Contact')}
					</ul>
				</div>

			</footer>
		);
	}
}


export default Footer;
