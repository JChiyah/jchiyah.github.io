import React, { Component } from 'react';
import './../App.scss';

import NavigationBar from './../components/NavigationBar';
import Footer from './../components/Footer';


class About extends Component {
	render() {
		return (
			<div className="App">
				<NavigationBar currentPage='About' />

				<div className="app-body">
					<h1>About Me</h1>
					<div className="about">
						<div className="about-img-wrapper">
							<img src="about_photo.jpg" alt="selfie" />
						</div>
						<p>
							I am currently a 1st Year PhD student at Heriot-Watt University, Edinburgh (UK), mainly interested in human-robot interaction through natural language.
							<br/><br/>

							I have worked in a few cool projects during internships and placements with industry that have led to considerable research output and commercial applications.
							I have also published a couple of articles from my 4th Year thesis and co-authored some more from university research projects.
							<br/><br/>

							Python, C++, JavaScript, Java and PHP are my strongest programming languages, but I learn quite quickly as needed. Most of my important projects involved one or more of these.
							I also like to use stable and modern technology stacks, thus I am familiar with many frameworks in these languages
							(e.g. ROS, Flask, React, Laravel, etc.) and other tools (CMake, Hunter, Gulp, etc.).
							<br/><br/>

							My interests include human-computer interaction, autonomous systems, natural language (e.g. chatbots) and explainability.
							<br/><br/>

							I graduated from an MEng in May and started an iCASE PhD with Siemens in
							the field of monitoring and control of systems using natural language.
						</p>
					</div>
				</div>

				<Footer />
			</div>
		);
	}
}

export default About;
