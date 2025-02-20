// import React, { Component } from 'react';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faAtom } from '@fortawesome/free-solid-svg-icons';


// class Footer extends Component {
// 	renderLink(title) {
// 		const url = "/" + (title).toLowerCase().replace(" ", "-");

// 		return (<li>
// 			<a href={url}>{title}</a></li>
// 		 );
// 	}

// 	render() {
// 		return (
// 			<footer className="footer">

// 				<div className="footer-text">
// 					<p>
// 						Website created by myself using <a href="https://reactjs.org/"><FontAwesomeIcon className="fa-icon" icon={faAtom} /> React</a>.
// 					</p>
// 					<p>
// 						This website does not use cookies or collect information on visitors. 
// 						However, it is hosted by GitHub and thus <a href="https://github.com/">GitHub</a> itself may do.
// 					</p>
// 				</div>

// 				<div className="quick-links">
// 					<ul>
// 						{this.renderLink('Home')}
// 						{this.renderLink('About')}
// 						{this.renderLink('Projects')}
// 						{this.renderLink('Publications')}
// 						{this.renderLink('Professional Activities')}
// 						{this.renderLink('Contact')}
// 					</ul>
// 				</div>

// 			</footer>
// 		);
// 	}
// }


// export default Footer;


import React from 'react';
import { Link } from 'react-router-dom';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub, faLinkedin, faReact } from '@fortawesome/free-brands-svg-icons';
import { faGraduationCap } from '@fortawesome/free-solid-svg-icons';


const Footer = () => {
	return (
		<footer className="footer py-3">
			<div className="container">
				<div className="row align-items-center text-center text-md-start">
					<div className="col-md-7 mb-7 mb-md-0">
						<p className="m-0">
							Developed by myself using <FontAwesomeIcon className="fa-icon" icon={faReact} /> React and hosted on <FontAwesomeIcon icon={faGithub} />
						</p>
					</div>
					<div className="col-md-3 mb-2 mb-md-0">
						<p className="m-0 text-md-end">Copyright © {new Date().getFullYear()}</p>
					</div>
					<div className="col-md-2">
						<div className="social-links d-flex justify-content-center justify-content-md-end">
							<Link
								to="https://github.com/jchiyah"
								target="_blank"
								rel="noopener noreferrer"
								className="me-4"
							>
								<FontAwesomeIcon icon={faGithub} />
							</Link>
							<Link
								to="https://www.linkedin.com/in/javier-chiyah-garcia-469045a6/"
								target="_blank"
								rel="noopener noreferrer"
								className="me-4"
							>
								<FontAwesomeIcon icon={faLinkedin} />
							</Link>
							<Link
								to="https://scholar.google.co.uk/citations?hl=en&user=NQyCFjYAAAAJ#"
								target="_blank"
								rel="noopener noreferrer"
							>
								<FontAwesomeIcon icon={faGraduationCap} />
							</Link>
						</div>
					</div>
				</div>
			</div>
		</footer>
	);
};

export default Footer;