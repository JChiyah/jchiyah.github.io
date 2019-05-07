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
							I am currently a 5th Year student of an MEng in Software Engineering at Heriot-Watt University, Edinburgh (UK).
							<br/><br/>

							I have worked in a few cool projects during internships within the industry that have led to research output.
							I have also published a couple of articles from my 4th Year thesis and co-authored some more from university research projects.
							<br/><br/>

							Python, PHP, C++, JavaScript and Java are my strongest programming languages. Most of my important projects involved one or more of these. 
							I like to use stable and modern technology stacks. I am also familiar with many frameworks in these languages 
							(e.g. Vue, React, Laravel, etc.) and other tools (Gulp, CMake, Hunter, etc.). 
							<br/><br/>

							My interests include human-computer interaction, autonomous systems, natural language (e.g. chatbots) and explainability.
							<br/><br/>

							I finish my MEng studies in May 2019 and I will start an iCASE PhD in September 2019 with Siemens in
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
