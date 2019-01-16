import React, { Component } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGraduationCap } from '@fortawesome/free-solid-svg-icons';
import { faGithub, faLinkedin } from '@fortawesome/free-brands-svg-icons';

import NavigationBar from './NavigationBar';


class Landing extends Component {
	render() {
		return (
			<div className="landing">
      			<NavigationBar 
      				currentPage='Home'
      			/>
      			<div className="landing-wrapper">
					<div className="header">
						<h1>Francisco Javier<br/>Chiyah Garcia</h1>
						<h3>Software Engineer | Explainable Autonomy | Human-Computer Interaction</h3>
					</div>
					<div className="subheader">
						<ul>
							<li><a href="https://github.com/jchiyah"><FontAwesomeIcon className="fa-icon" icon={faGithub} /></a></li>
							<li><a href="https://www.linkedin.com/in/javier-chiyah-garcia-469045a6/"><FontAwesomeIcon className="fa-icon" icon={faLinkedin} /></a></li>
							<li><a href="https://scholar.google.co.uk/citations?hl=en&user=NQyCFjYAAAAJ#"><FontAwesomeIcon className="fa-icon" icon={faGraduationCap} /></a></li>
						</ul>
					</div>
				</div>
			</div>
		);
	}
}


export default Landing;
