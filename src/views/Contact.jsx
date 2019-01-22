import React, { Component } from 'react';
import './../App.scss';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faGraduationCap } from '@fortawesome/free-solid-svg-icons';
import { faGithub, faLinkedin } from '@fortawesome/free-brands-svg-icons';

import NavigationBar from './../components/NavigationBar';
import Footer from './../components/Footer';


class Contact extends Component {
	render() {
		return (
			<div className="App">
				<NavigationBar currentPage='Contact' />

				<div className="app-body contact">
					<h1>Contact</h1>
					<p>The easiest way to contact me is through email, and then we can arrange something else (e.g. Skype, phone or in person). <br/><br/>I might not see messages sent to LinkedIn or through other means.</p>
					
					<hr/>
					<div className="email-box">
						<h2><FontAwesomeIcon className="fa-icon" icon={faEnvelope} />&nbsp; Email</h2>
						<p>Preferable email for contact:</p>

						<a href="mailto:jchiyah@outlook.com">jchiyah@outlook.com</a>
					</div>
					<hr/>
					<div className="email-box">
						<h2><FontAwesomeIcon className="fa-icon" icon={faEnvelope} />&nbsp; Alternative Email</h2>
						<p>Feel free to contact me at my university email if appropriate. My current university email is below:</p>

						<a href="mailto:jchiyah@outlook.com">fjc3@hw.ac.uk</a><br/><br/>
						<p>Note that this email may change over time!</p>
					</div>
					<hr/>
					<h2>Other related pages:</h2>
					<ul>
						<li><a href="https://github.com/jchiyah"><FontAwesomeIcon className="fa-icon" icon={faGithub} /> GitHub profile</a></li>
						<li><a href="https://www.linkedin.com/in/javier-chiyah-garcia-469045a6/"><FontAwesomeIcon className="fa-icon" icon={faLinkedin} /> LinkedIn profile</a></li>
						<li><a href="https://scholar.google.co.uk/citations?hl=en&user=NQyCFjYAAAAJ#"><FontAwesomeIcon className="fa-icon" icon={faGraduationCap} /> Google Scholar</a></li>
					</ul>
				</div>

				<Footer />
			</div>
		);
	}
}

export default Contact;
